// 协议校验工具模块
var Validator = (() => {
  'use strict';

  // ========== 校验算法定义 ==========
  const algorithms = [
    { id: 'crc16', label: 'Modbus CRC-16', info: '多项式 <b>0x8005</b>（反转 0xA001）| 初始值 <b>0xFFFF</b> | 输入/输出反转: 是', bytes: 2 },
    { id: 'crc8', label: 'CRC-8', info: '多项式 <b>0x31</b> | 初始值 <b>0x00</b> | 常用于 1-Wire / DS18B20 等传感器协议', bytes: 1 },
    { id: 'crc32', label: 'CRC-32', info: '多项式 <b>0x04C11DB7</b> | 初始值 <b>0xFFFFFFFF</b> | 结果异或 <b>0xFFFFFFFF</b>，通用数据校验', bytes: 4 },
    { id: 'xor', label: 'XOR 校验', info: '所有字节逐位异或（BCC），最简单的校验方式', bytes: 1 },
    { id: 'sum', label: '累加和', info: '所有字节求和后 <b>& 0xFF</b>，常用于简单串口协议', bytes: 1 },
    { id: 'negate', label: '取反校验', info: '帧格式：<b>FF FF</b> 帧头 + 数据 + 校验字节。校验 = <b>~(数据求和) & 0xFF</b>', bytes: 1 },
    { id: 'modbus-parse', label: 'Modbus RTU 解析', info: '结构化解析一帧完整报文：<b>从站地址 + 功能码 + 数据 + CRC</b>，自动识别功能码含义、拆解字段、复核CRC、识别异常响应', special: true, bytes: 0 },
    { id: 'can-parse', label: 'CAN 帧解析', info: '解析 CAN 2.0 标准/扩展帧：<b>ID + DLC + 数据场</b>，识别 IDE/RTR 标志位，按位拆解 29 位扩展 ID', special: true, bytes: 0 },
  ];

  // Modbus 功能码含义表
  const modbusFuncCodes = {
    0x01: '读线圈(Read Coils)',
    0x02: '读离散输入(Read Discrete Inputs)',
    0x03: '读保持寄存器(Read Holding Registers)',
    0x04: '读输入寄存器(Read Input Registers)',
    0x05: '写单个线圈(Write Single Coil)',
    0x06: '写单个寄存器(Write Single Register)',
    0x0F: '写多个线圈(Write Multiple Coils)',
    0x10: '写多个寄存器(Write Multiple Registers)',
  };
  const modbusExceptCodes = {
    0x01: '非法功能码',
    0x02: '非法数据地址',
    0x03: '非法数据值',
    0x04: '从站故障',
    0x06: '从站忙',
  };

  // ========== CRC 查找表 ==========
  const crc16Table = (() => {
    const t = new Uint16Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) c = (c & 1) ? ((c >> 1) ^ 0xA001) : (c >> 1);
      t[i] = c;
    }
    return t;
  })();

  const crc8Table = (() => {
    const t = new Uint8Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) c = (c & 1) ? ((c >> 1) ^ 0x8C) : (c >> 1); // 0x31 reversed = 0x8C
      t[i] = c;
    }
    return t;
  })();

  const crc32Table = (() => {
    const t = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) c = (c & 1) ? ((c >>> 1) ^ 0xEDB88320) : (c >>> 1); // 0x04C11DB7 reversed
      t[i] = c;
    }
    return t;
  })();

  // ========== 校验计算函数 ==========
  function compute(id, data) {
    switch (id) {
      case 'crc16': {
        let crc = 0xFFFF;
        for (let i = 0; i < data.length; i++) crc = crc16Table[(crc ^ data[i]) & 0xFF] ^ (crc >> 8);
        return crc & 0xFFFF;
      }
      case 'crc8': {
        let crc = 0x00;
        for (let i = 0; i < data.length; i++) crc = crc8Table[(crc ^ data[i]) & 0xFF];
        return crc & 0xFF;
      }
      case 'crc32': {
        let crc = 0xFFFFFFFF;
        for (let i = 0; i < data.length; i++) crc = crc32Table[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
        return (crc ^ 0xFFFFFFFF) >>> 0;
      }
      case 'xor': {
        let r = 0;
        for (let i = 0; i < data.length; i++) r ^= data[i];
        return r & 0xFF;
      }
      case 'sum': {
        let s = 0;
        for (let i = 0; i < data.length; i++) s += data[i];
        return s & 0xFF;
      }
      case 'negate': {
        let s = 0;
        for (let i = 0; i < data.length; i++) s += data[i];
        return (~s) & 0xFF;
      }
    }
    return 0;
  }

  // ========== 格式化 ==========
  function hex2(v) { return (v & 0xFF).toString(16).toUpperCase().padStart(2, '0'); }
  function hexN(v, n) {
    const s = (v >>> 0).toString(16).toUpperCase().padStart(n * 2, '0');
    return s.match(/.{2}/g).join(' ');
  }
  function dataStr(data) { return data.map(hex2).join(' '); }

  // ========== 解析十六进制 ==========
  function parseHex(str) {
    str = str.trim().replace(/0x/gi, '').replace(/[,;，；\n\r]+/g, ' ');
    if (!str) return null;
    const parts = str.split(/\s+/);
    const bytes = [];
    for (const p of parts) {
      if (!p) continue;
      if (p.length > 2) {
        for (let i = 0; i < p.length; i += 2) {
          const b = p.substr(i, 2);
          if (/^[0-9a-fA-F]{1,2}$/.test(b)) bytes.push(parseInt(b, 16));
          else return null;
        }
      } else if (/^[0-9a-fA-F]{1,2}$/.test(p)) {
        bytes.push(parseInt(p, 16));
      } else return null;
    }
    return bytes.length > 0 ? bytes : null;
  }

  // ========== 历史记录 ==========
  const histories = {};
  function addHistory(algoId, entry) {
    if (!histories[algoId]) histories[algoId] = [];
    histories[algoId].unshift(entry);
    if (histories[algoId].length > 15) histories[algoId].length = 15;
    renderHistory(algoId);
  }
  function renderHistory(algoId) {
    const list = document.getElementById('val-history-' + algoId);
    const sec = document.getElementById('val-history-sec-' + algoId);
    const arr = histories[algoId] || [];
    if (!list || !sec) return;
    if (arr.length === 0) { sec.style.display = 'none'; return; }
    sec.style.display = 'block';
    list.innerHTML = arr.map((h, i) => {
      const status = h.mode === 'verify'
        ? (h.ok ? '<span style="color:var(--success);font-size:11px">PASS</span>' : '<span style="color:var(--danger);font-size:11px">FAIL</span>')
        : '';
      return `<div class="val-history-item" onclick="Validator.loadHistory('${algoId}',${i})">
        <span style="color:var(--text-secondary)">${h.data}</span>
        <span><span style="color:var(--success)">${h.chk}</span> ${status}</span>
      </div>`;
    }).join('');
  }

  // ========== 核心 UI ==========
  let currentAlgo = 'crc16';

  function render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
      <div class="val-tabs">
        ${algorithms.map(a => `<button class="val-tab-btn${a.id === currentAlgo ? ' active' : ''}" data-algo="${a.id}" onclick="Validator.switchAlgo('${a.id}')">${a.label}</button>`).join('')}
      </div>
      <div id="val-panel">${renderAlgoPanel(currentAlgo)}</div>
    `;
  }

  function renderAlgoPanel(algoId) {
    const algo = algorithms.find(a => a.id === algoId);
    if (!algo) return '';
    if (algo.special && algoId === 'modbus-parse') return renderModbusPanel();
    if (algo.special && algoId === 'can-parse') return renderCanPanel();
    return `
      <div class="formula-block text-sm mb-4">
        <div style="text-align:left">${algo.info}</div>
      </div>
      <div class="val-mode-row">
        <label><input type="radio" name="valMode" value="calc" checked> 计算</label>
        <label><input type="radio" name="valMode" value="verify"> 校验</label>
      </div>
      <label style="display:block;font-size:0.8125rem;font-weight:500;color:var(--text-secondary);margin-bottom:6px">
        输入十六进制数据${algoId === 'negate' ? '（不含帧头 FF FF）' : ''}
      </label>
      <textarea id="val-input" class="val-textarea" placeholder="示例：01 03 00 00 00 0A" rows="3"></textarea>
      <div class="val-btn-row">
        <button class="val-btn-primary" onclick="Validator.calculate()">计算 / 校验</button>
        <button class="val-btn-secondary" onclick="Validator.clear()">清空</button>
      </div>
      <div id="val-result" class="val-result-area">
        <div class="calc-result">
          <div class="val-result-row">
            <span class="val-result-title">校验值</span>
            <span class="val-result-value" id="val-chk"></span>
            <button class="val-copy-btn" onclick="Validator.copy('val-chk')">复制</button>
          </div>
          ${algo.bytes > 1 ? `<div class="val-result-row">
            <span class="val-result-title">字节序（高前低后）</span>
            <span class="val-result-value" id="val-hl"></span>
            <button class="val-copy-btn" onclick="Validator.copy('val-hl')">复制</button>
          </div>` : ''}
          ${algo.bytes === 2 ? `<div class="val-result-row">
            <span class="val-result-title">字节序（低前高后）Modbus</span>
            <span class="val-result-value" id="val-lh"></span>
            <button class="val-copy-btn" onclick="Validator.copy('val-lh')">复制</button>
          </div>` : ''}
          <div class="val-result-row">
            <span class="val-result-title">完整帧</span>
            <span class="val-result-value" id="val-frame"></span>
            <button class="val-copy-btn" onclick="Validator.copy('val-frame')">复制</button>
          </div>
          ${algoId === 'negate' ? '<div class="val-result-row"><span class="val-result-title">完整帧（含帧头 FF FF）</span><span class="val-result-value" id="val-frame-hdr"></span><button class="val-copy-btn" onclick="Validator.copy(\'val-frame-hdr\')">复制</button></div>' : ''}
          <div id="val-verify-row" class="val-result-row" style="display:none">
            <span class="val-result-title">校验结果</span>
            <span class="val-result-value" id="val-verify"></span>
          </div>
        </div>
      </div>
      <div id="val-history-sec-${algoId}" class="val-history-sec" style="display:none">
        <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:1rem;margin-bottom:0.5rem">历史记录</div>
        <div class="val-history-list" id="val-history-${algoId}"></div>
      </div>
    `;
    renderHistory(algoId);
  }

  function calculate() {
    const data = parseHex(document.getElementById('val-input')?.value || '');
    if (!data) { alert('请输入有效的十六进制数据'); return; }

    const mode = document.querySelector('input[name="valMode"]:checked')?.value || 'calc';
    const algo = algorithms.find(a => a.id === currentAlgo);
    const algoId = currentAlgo;
    const ds = dataStr(data);

    // Modbus RTU 帧解析（特殊模式）
    if (algoId === 'modbus-parse') {
      parseModbusFrame(data);
      return;
    }
    // CAN 帧解析（特殊模式）
    if (algoId === 'can-parse') {
      parseCanFrame(data);
      return;
    }

    // 取反校验的特殊处理
    if (algoId === 'negate') {
      if (mode === 'calc') {
        const chk = compute('negate', data);
        const sum = data.reduce((a, b) => a + b, 0);
        document.getElementById('val-chk').textContent = '0x' + hex2(chk);
        document.getElementById('val-frame').textContent = ds + ' ' + hex2(chk);
        document.getElementById('val-frame-hdr').textContent = 'FF FF ' + ds + ' ' + hex2(chk);
        document.getElementById('val-verify-row').style.display = 'none';
        addHistory(algoId, { data: ds, chk: hex2(chk), ok: true, mode: 'calc' });
      } else {
        let frame;
        if (data[0] === 0xFF && data[1] === 0xFF) {
          frame = data;
        } else {
          frame = [0xFF, 0xFF, ...data];
        }
        if (frame.length < 4) { alert('帧太短，至少需要 FF FF + 1字节数据 + 1字节校验'); return; }
        const payload = frame.slice(2, -1);
        const recvChk = frame[frame.length - 1];
        const calcChk = compute('negate', payload);
        const sum = payload.reduce((a, b) => a + b, 0);
        const vr = document.getElementById('val-verify');
        document.getElementById('val-chk').textContent = '0x' + hex2(calcChk);
        document.getElementById('val-frame').textContent = dataStr(payload);
        document.getElementById('val-frame-hdr').textContent = dataStr(frame);
        const vrRow = document.getElementById('val-verify-row');
        vrRow.style.display = 'flex';
        if (recvChk === calcChk) {
          vr.textContent = '通过  接收 0x' + hex2(recvChk) + ' = 计算 0x' + hex2(calcChk);
          vr.style.color = 'var(--success)';
        } else {
          vr.textContent = '失败  接收 0x' + hex2(recvChk) + ' != 计算 0x' + hex2(calcChk);
          vr.style.color = 'var(--danger)';
        }
        addHistory(algoId, { data: dataStr(payload), chk: hex2(recvChk), ok: recvChk === calcChk, mode: 'verify' });
      }
      document.getElementById('val-result').style.display = 'block';
      return;
    }

    // 通用校验逻辑（CRC-16, CRC-8, CRC-32, XOR, SUM）
    if (mode === 'calc') {
      const chk = compute(algoId, data);
      document.getElementById('val-chk').textContent = '0x' + (algo.bytes === 1 ? hex2(chk) : hexN(chk, algo.bytes));
      if (algo.bytes >= 2) {
        const hi = (chk >> 8) & 0xFF, lo = chk & 0xFF;
        document.getElementById('val-hl').textContent = hex2(hi) + ' ' + hex2(lo);
        if (algo.bytes === 2) {
          document.getElementById('val-lh').textContent = hex2(lo) + ' ' + hex2(hi);
          document.getElementById('val-frame').textContent = ds + ' ' + hex2(lo) + ' ' + hex2(hi);
        } else {
          const bytes = [];
          for (let i = algo.bytes - 1; i >= 0; i--) bytes.push((chk >> (i * 8)) & 0xFF);
          document.getElementById('val-frame').textContent = ds + ' ' + bytes.map(hex2).join(' ');
        }
      } else {
        document.getElementById('val-frame').textContent = ds + ' ' + hex2(chk);
      }
      document.getElementById('val-verify-row').style.display = 'none';
      const chkDisplay = algo.bytes === 1 ? hex2(chk) : hexN(chk, algo.bytes);
      addHistory(algoId, { data: ds, chk: chkDisplay, ok: true, mode: 'calc' });
    } else {
      if (data.length < algo.bytes + 1) { alert('数据太短，无法校验'); return; }
      const payload = data.slice(0, -algo.bytes);
      const recvBytes = data.slice(-algo.bytes);
      let recvVal = 0;
      for (let i = 0; i < algo.bytes; i++) recvVal |= recvBytes[i] << (i * 8); // 低字节在前
      const calcVal = compute(algoId, payload);
      const vr = document.getElementById('val-verify');
      document.getElementById('val-chk').textContent = '0x' + (algo.bytes === 1 ? hex2(calcVal) : hexN(calcVal, algo.bytes));
      if (algo.bytes >= 2) {
        const hi = (calcVal >> 8) & 0xFF, lo = calcVal & 0xFF;
        document.getElementById('val-hl').textContent = hex2(hi) + ' ' + hex2(lo);
        if (algo.bytes === 2) {
          document.getElementById('val-lh').textContent = hex2(lo) + ' ' + hex2(hi);
          document.getElementById('val-frame').textContent = dataStr(payload) + ' ' + hex2(lo) + ' ' + hex2(hi);
        } else {
          const bytes = [];
          for (let i = algo.bytes - 1; i >= 0; i--) bytes.push((calcVal >> (i * 8)) & 0xFF);
          document.getElementById('val-frame').textContent = dataStr(payload) + ' ' + bytes.map(hex2).join(' ');
        }
      } else {
        document.getElementById('val-frame').textContent = dataStr(payload) + ' ' + hex2(calcVal);
      }
      const vrRow = document.getElementById('val-verify-row');
      vrRow.style.display = 'flex';
      if (recvVal === calcVal) {
        vr.textContent = '通过  接收 0x' + (algo.bytes === 1 ? hex2(recvVal) : hexN(recvVal, algo.bytes)) + ' = 计算 0x' + (algo.bytes === 1 ? hex2(calcVal) : hexN(calcVal, algo.bytes));
        vr.style.color = 'var(--success)';
      } else {
        vr.textContent = '失败  接收 0x' + (algo.bytes === 1 ? hex2(recvVal) : hexN(recvVal, algo.bytes)) + ' != 计算 0x' + (algo.bytes === 1 ? hex2(calcVal) : hexN(calcVal, algo.bytes));
        vr.style.color = 'var(--danger)';
      }
      const chkDisplay = algo.bytes === 1 ? hexN(recvVal, 1) : hexN(recvVal, algo.bytes);
      addHistory(algoId, { data: dataStr(payload), chk: chkDisplay, ok: recvVal === calcVal, mode: 'verify' });
    }
    document.getElementById('val-result').style.display = 'block';
  }

  function clear() {
    const input = document.getElementById('val-input');
    if (input) input.value = '';
    const result = document.getElementById('val-result');
    if (result) result.style.display = 'none';
  }

  function copy(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const text = el.textContent.replace(/\s+/g, ' ');
    navigator.clipboard.writeText(text).then(() => {
      const btn = el.parentElement.querySelector('.val-copy-btn');
      if (btn) { btn.textContent = '已复制'; setTimeout(() => { btn.textContent = '复制'; }, 1200); }
    });
  }

  function switchAlgo(algoId) {
    currentAlgo = algoId;
    document.querySelectorAll('.val-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.algo === algoId));
    const panel = document.getElementById('val-panel');
    if (panel) panel.innerHTML = renderAlgoPanel(algoId);
  }

  function loadHistory(algoId, idx) {
    const h = histories[algoId]?.[idx];
    if (!h) return;
    const input = document.getElementById('val-input');
    if (input) input.value = h.data;
    const calcRadio = document.querySelector('input[name="valMode"][value="calc"]');
    if (calcRadio) calcRadio.checked = true;
    calculate();
  }

  // ========== Modbus RTU 帧解析面板 ==========
  function renderModbusPanel() {
    return `
      <div class="formula-block text-sm mb-4">
        <div style="text-align:left">输入一帧<strong>完整 Modbus RTU 报文</strong>（含 CRC），自动拆解字段、识别功能码、复核 CRC。<br>支持正常响应与异常响应（功能码最高位置1）。功能码 03/04/06/10 字段已结构化解析。</div>
      </div>
      <label style="display:block;font-size:0.8125rem;font-weight:500;color:var(--text-secondary);margin-bottom:6px">
        输入完整帧（十六进制）
      </label>
      <textarea id="val-input" class="val-textarea" placeholder="示例：01 03 02 00 0A 38 43&#10;(从站01 功能码03 读1个寄存器 值=000A)" rows="3">01 03 02 00 0A 38 43</textarea>
      <div class="val-btn-row">
        <button class="val-btn-primary" onclick="Validator.calculate()">解析帧</button>
        <button class="val-btn-secondary" onclick="Validator.loadModbusExample('read')">示例:读</button>
        <button class="val-btn-secondary" onclick="Validator.loadModbusExample('write')">示例:写</button>
        <button class="val-btn-secondary" onclick="Validator.loadModbusExample('except')">示例:异常</button>
        <button class="val-btn-secondary" onclick="Validator.clear()">清空</button>
      </div>
      <div id="val-result" class="val-result-area"></div>
    `;
  }

  const modbusExamples = {
    read:    '01 03 00 00 00 0A CD C5',   // 读保持寄存器请求(读10个)
    write:   '01 06 00 01 00 05 18 09',   // 写单寄存器请求(地址1=值5)
    except:  '01 83 02 C0 F1',            // 异常响应(功能码03|0x80, 非法地址)
  };

  function loadModbusExample(type) {
    const input = document.getElementById('val-input');
    if (input && modbusExamples[type]) input.value = modbusExamples[type];
    calculate();
  }

  function parseModbusFrame(data) {
    const result = document.getElementById('val-result');
    if (!result) return;
    result.style.display = 'block';

    // 最小长度校验：从站(1)+功能码(1)+CRC(2) = 4字节
    if (data.length < 4) {
      result.innerHTML = `<div style="color:var(--danger);padding:10px;border:1px solid var(--danger);border-radius:6px;font-size:13px">帧太短：Modbus RTU 至少 4 字节（从站+功能码+CRC），当前 ${data.length} 字节</div>`;
      return;
    }

    const slave = data[0];
    const funcRaw = data[1];
    const isException = (funcRaw & 0x80) !== 0;
    const funcCode = funcRaw & 0x7F;
    const payload = data.slice(0, -2);          // 去 CRC 部分
    const recvCrc = data[data.length - 2] | (data[data.length - 1] << 8);  // 低字节在前
    const calcCrc = compute('crc16', payload);

    // 构建解析结果行
    const rows = [];
    rows.push({ k: '从站地址', v: `${slave} (0x${hex2(slave)})`, note: slave === 0 ? '广播(所有从站响应)' : (slave > 247 ? '非法(应≤247)' : '') });
    rows.push({ k: '功能码', v: `0x${hex2(funcRaw)}`, note: isException ? `<span style="color:var(--danger)">异常响应！基础功能码 0x${hex2(funcCode)} = ${modbusFuncCodes[funcCode] || '未知'}</span>` : (modbusFuncCodes[funcCode] || '非标准功能码') });

    // 数据区解析（按功能码）
    const dataField = data.slice(2, -2);  // 去掉从站、功能码、CRC
    if (isException) {
      const errCode = dataField[0];
      rows.push({ k: '异常码', v: `0x${hex2(errCode)}`, note: modbusExceptCodes[errCode] || '未知异常' });
    } else {
      // 03/04 请求：起始地址(2)+数量(2)
      if ((funcCode === 0x03 || funcCode === 0x04) && dataField.length === 4) {
        const startReg = (dataField[0] << 8) | dataField[1];
        const qty = (dataField[2] << 8) | dataField[3];
        rows.push({ k: '起始寄存器', v: `${startReg} (0x${hexN(startReg, 1).replace(' ', '')})`, note: '请求帧：读操作' });
        rows.push({ k: '寄存器数量', v: `${qty} 个`, note: qty > 125 ? '超出上限(125)' : '' });
      }
      // 03/04 响应：字节数(1)+数据(N)
      else if ((funcCode === 0x03 || funcCode === 0x04) && dataField.length >= 1) {
        const byteCount = dataField[0];
        const regData = dataField.slice(1, 1 + byteCount);
        const regVals = [];
        for (let i = 0; i + 1 < regData.length; i += 2) regVals.push((regData[i] << 8) | regData[i + 1]);
        rows.push({ k: '数据字节数', v: `${byteCount}`, note: '响应帧' });
        rows.push({ k: '寄存器值', v: regVals.length ? regVals.map(v => '0x' + hexN(v, 1).replace(' ', '') + '(' + v + ')').join(' ') : '-', note: `${regVals.length} 个寄存器` });
      }
      // 06 写单个寄存器：地址(2)+数据(2)
      else if (funcCode === 0x06 && dataField.length === 4) {
        const regAddr = (dataField[0] << 8) | dataField[1];
        const regVal = (dataField[2] << 8) | dataField[3];
        rows.push({ k: '寄存器地址', v: `${regAddr} (0x${hexN(regAddr, 1).replace(' ', '')})`, note: '写单个寄存器' });
        rows.push({ k: '写入值', v: `${regVal} (0x${hexN(regVal, 1).replace(' ', '')})`, note: '请求与响应帧相同(回显)' });
      }
      // 10 写多个寄存器：请求 地址(2)+数量(2)+字节数(1)+数据(N)
      else if (funcCode === 0x10 && dataField.length >= 5) {
        const startReg = (dataField[0] << 8) | dataField[1];
        const qty = (dataField[2] << 8) | dataField[3];
        rows.push({ k: '起始寄存器', v: `${startReg}`, note: '写多个寄存器请求' });
        rows.push({ k: '写入数量', v: `${qty} 个`, note: '' });
      }
      // 10 响应：地址(2)+数量(2)
      else if (funcCode === 0x10 && dataField.length === 4) {
        const startReg = (dataField[0] << 8) | dataField[1];
        const qty = (dataField[2] << 8) | dataField[3];
        rows.push({ k: '起始寄存器', v: `${startReg}`, note: '写多个寄存器响应' });
        rows.push({ k: '已写数量', v: `${qty} 个`, note: '' });
      }
      else {
        rows.push({ k: '数据区', v: dataField.length ? dataStr(dataField) : '(空)', note: `共 ${dataField.length} 字节，未自动结构化` });
      }
    }

    // CRC 校验
    const crcOk = recvCrc === calcCrc;
    rows.push({ k: 'CRC校验', v: `接收 0x${hexN(recvCrc,1).replace(' ','')} | 计算 0x${hexN(calcCrc,1).replace(' ','')}`, note: crcOk ? '<span style="color:var(--success)">✓ 通过</span>' : '<span style="color:var(--danger)">✗ 不匹配</span>' });
    rows.push({ k: '完整帧', v: dataStr(data), note: `共 ${data.length} 字节` });

    result.innerHTML = `
      <div style="padding:4px 0">
        ${rows.map((r, i) => `
          <div class="val-result-row" style="${i === rows.length - 1 ? 'border-bottom:none' : ''}">
            <span class="val-result-title">${r.k}</span>
            <span class="val-result-value" style="font-family:Consolas,monospace">${r.v}</span>
            <span style="font-size:12px;color:var(--text-secondary);flex:1">${r.note || ''}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ========== CAN 帧解析面板 ==========
  function renderCanPanel() {
    return `
      <div class="formula-block text-sm mb-4">
        <div style="text-align:left">输入一帧 <strong>CAN 报文</strong>，自动拆解帧类型与字段。<br>
        <strong>标准帧</strong>：2字节ID(11位有效) + 1字节DLC + 0~8字节数据<br>
        <strong>扩展帧</strong>：4字节ID(29位有效,IDE=1) + 1字节DLC + 0~8字节数据<br>
        RTR位(远程帧)在DLC字节的最高位(bit4)，IDE位在ID区。</div>
      </div>
      <label style="display:block;font-size:0.8125rem;font-weight:500;color:var(--text-secondary);margin-bottom:6px">
        输入CAN帧（十六进制，标准帧示例：ID DLC 数据）
      </label>
      <textarea id="val-input" class="val-textarea" placeholder="标准帧示例：01 8F 04 01 02 03 04&#10;(ID=0x018F DLC=4 数据=01020304)&#10;扩展帧示例：18 FE F0 00 08 11 22" rows="3">01 8F 04 01 02 03 04</textarea>
      <div class="val-btn-row">
        <button class="val-btn-primary" onclick="Validator.calculate()">解析帧</button>
        <button class="val-btn-secondary" onclick="Validator.loadCanExample('std')">标准帧</button>
        <button class="val-btn-secondary" onclick="Validator.loadCanExample('ext')">扩展帧</button>
        <button class="val-btn-secondary" onclick="Validator.loadCanExample('rtr')">远程帧</button>
        <button class="val-btn-secondary" onclick="Validator.clear()">清空</button>
      </div>
      <div id="val-result" class="val-result-area"></div>
    `;
  }

  const canExamples = {
    std: '01 8F 04 01 02 03 04',           // 标准帧 ID=0x018F DLC=4 数据4字节
    ext: '00 18 FE F0 08 11 22 33 44 55 66 77 88',  // 扩展帧 29位ID=0x18FEF0 DLC=8 + 8字节
    rtr: '02 01 80',                       // 远程帧 RTR=1 ID=0x0201 DLC=8 无数据
  };

  function loadCanExample(type) {
    const input = document.getElementById('val-input');
    if (input && canExamples[type]) input.value = canExamples[type];
    calculate();
  }

  function parseCanFrame(data) {
    const result = document.getElementById('val-result');
    if (!result) return;
    result.style.display = 'block';

    if (data.length < 3) {
      result.innerHTML = `<div style="color:var(--danger);padding:10px;border:1px solid var(--danger);border-radius:6px;font-size:13px">帧太短：CAN帧至少需 ID(2字节) + DLC(1字节)，当前 ${data.length} 字节</div>`;
      return;
    }

    const rows = [];
    let idBytes, id, dlc, dataField, isExtended, isRTR;

    // 判断标准帧(2字节ID)还是扩展帧(4字节ID)：看第3字节高半字节
    // 约定：标准帧ID占2字节，扩展帧ID占4字节。用数据长度启发式判断：
    // 标准：[ID_H ID_L] [DLC] [data...]   扩展：[ID0 ID1 ID2 ID3] [DLC] [data...]
    // 启发：若 data.length-3<=8 视为标准帧，data.length-5<=8 视为扩展帧
    const tryStd = data.length - 3;
    const tryExt = data.length - 5;
    if (tryStd >= 0 && tryStd <= 8) {
      // 标准帧
      isExtended = false;
      id = (data[0] << 8) | data[1];   // 16位，有效11位
      const dlcByte = data[2];
      isRTR = (dlcByte & 0x10) !== 0;   // bit4 = RTR
      dlc = dlcByte & 0x0F;
      dataField = data.slice(3, 3 + dlc);
      idBytes = 2;
    } else if (tryExt >= 0 && tryExt <= 8) {
      // 扩展帧
      isExtended = true;
      id = (data[0] << 24) | (data[1] << 16) | (data[2] << 8) | data[3];  // 32位，有效29位
      const dlcByte = data[4];
      isRTR = (dlcByte & 0x10) !== 0;
      dlc = dlcByte & 0x0F;
      dataField = data.slice(5, 5 + dlc);
      idBytes = 4;
    } else {
      result.innerHTML = `<div style="color:var(--danger);padding:10px;border:1px solid var(--danger);border-radius:6px;font-size:13px">无法识别帧格式：数据长度 ${data.length} 不符合标准帧(3~11字节)或扩展帧(5~13字节)</div>`;
      return;
    }

    rows.push({ k: '帧类型', v: isExtended ? '扩展帧 (Extended, IDE=1)' : '标准帧 (Standard, IDE=0)', note: isExtended ? '29位ID' : '11位ID' });
    rows.push({ k: '帧种类', v: isRTR ? '远程帧 (Remote, RTR=1)' : '数据帧 (Data, RTR=0)', note: isRTR ? '请求数据，无数据场' : '携带数据' });
    rows.push({ k: 'CAN ID', v: `0x${id.toString(16).toUpperCase()} (${id})`, note: isExtended ? `29位有效，${id <= 0x1FFFFFFF ? '✓合法' : '✗超范围'}` : `11位有效，${id <= 0x7FF ? '✓合法' : '✗超范围'}` });
    rows.push({ k: 'DLC(数据长度)', v: `${dlc}`, note: dlc > 8 ? '✗CAN最多8字节' : (dlc === 8 && isExtended ? 'CAN-FD可达64字节' : '') });

    if (isRTR) {
      rows.push({ k: '数据场', v: '(无 - 远程帧)', note: '远程帧只声明请求长度(DLC)，不含数据' });
    } else if (dataField.length > 0) {
      rows.push({ k: '数据场', v: dataStr(dataField), note: `${dataField.length} 字节: ${dataField.map(b => '0x' + hex2(b)).join(' ')}` });
    } else {
      rows.push({ k: '数据场', v: '(空)', note: 'DLC=0 无数据' });
    }
    rows.push({ k: '原始帧', v: dataStr(data), note: `共 ${data.length} 字节` });

    result.innerHTML = `
      <div style="padding:4px 0">
        ${rows.map((r, i) => `
          <div class="val-result-row" style="${i === rows.length - 1 ? 'border-bottom:none' : ''}">
            <span class="val-result-title">${r.k}</span>
            <span class="val-result-value" style="font-family:Consolas,monospace">${r.v}</span>
            <span style="font-size:12px;color:var(--text-secondary);flex:1">${r.note || ''}</span>
          </div>
        `).join('')}
      </div>
      <div class="info-box tip mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>CAN帧无软件CRC</strong>：CAN控制器硬件自动处理仲裁、CRC15、ACK和错误帧，软件看不到这些位。这里的解析只拆解应用层可见的 ID/DLC/Data。RTR远程帧用于主动请求数据(如主节点请求从节点发送)；CANopen/UDS 协议基于这些字段进一步定义语义。</div></div>
    `;
  }

  return { render, calculate, clear, copy, switchAlgo, loadHistory, loadModbusExample, loadCanExample };
})();
