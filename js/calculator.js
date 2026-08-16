// 公式计算器模块
// 提供 33 个实用计算器工具，覆盖电路、控制、信号、数电、计算机、协议、电机、嵌入式、制造工艺等领域

const Calculator = {
  // 当前活动的计算器
  _active: null,

  // 分类顺序
  _categoryOrder: ['电路基础', '模拟电路', '数字电路', '信号处理', '自动控制', '计算机', '工程协议', '电机驱动', '嵌入式', '制造与工艺', '人工智能'],

  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    // 按 category 分组
    let html = '';
    for (const cat of this._categoryOrder) {
      const tools = this._list.filter(t => t.category === cat);
      if (tools.length === 0) continue;
      html += `<div class="tool-category-title">${this._categoryIcon(cat)} ${cat} <span class="tool-category-count">${tools.length}</span></div>`;
      html += `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">`;
      html += tools.map(c => `
        <div class="knowledge-card cursor-pointer" onclick="Calculator.open('${c.id}')">
          <h3 style="font-size:1rem">${c.icon} ${c.title}</h3>
          <p class="card-desc mb-3">${c.desc}</p>
          <div class="text-center py-2 text-sm font-medium" style="color:var(--primary)">
            点击使用 →
          </div>
        </div>
      `).join('');
      html += `</div>`;
    }
    container.innerHTML = html;
  },

  _categoryIcon(cat) {
    const icons = {'电路基础':'🔵','模拟电路':'🟢','数字电路':'🟡','信号处理':'📡','自动控制':'🟣','计算机':'💻','工程协议':'🔌','电机驱动':'⚡','嵌入式':'🔩','制造与工艺':'🖨️','人工智能':'🧠'};
    return icons[cat] || '🔧';
  },

  // 打开指定计算器
  open(id) {
    // 协议校验特殊处理：使用 Validator 模块
    if (id === 'validator') {
      this._active = id;
      const meta = this._list.find(c => c.id === id);
      const modal = document.createElement('div');
      modal.id = 'calc-modal';
      modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
      modal.style.cssText = 'background:rgba(0,0,0,0.5);backdrop-filter:blur(4px)';
      modal.innerHTML = `
        <div class="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl" style="background:var(--bg);border:1px solid var(--border)">
          <div class="flex items-center justify-between p-4 border-b sticky top-0 z-10" style="border-color:var(--border);background:var(--bg)">
            <h2 class="text-lg font-semibold">${meta?.icon || ''} ${meta?.title || ''}</h2>
            <button onclick="Calculator.close()" class="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div id="calc-content" class="p-4"></div>
        </div>`;
      document.body.appendChild(modal);
      if (window.Validator) Validator.render('calc-content');
      this._bindEsc();
      return;
    }
    // 将 kebab-case 转换为 camelCase（如 opamp-gain -> opampGain）
    const camelId = id.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const calc = this._calculators[camelId] || this._calculators[id];
    if (!calc) { console.warn('Calculator not found:', id); return; }
    this._active = id;
    // 创建模态框
    const modal = document.createElement('div');
    modal.id = 'calc-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
    modal.style.cssText = 'background:rgba(0,0,0,0.5);backdrop-filter:blur(4px)';
    modal.innerHTML = `
      <div class="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl" style="background:var(--bg);border:1px solid var(--border)">
        <div class="flex items-center justify-between p-4 border-b sticky top-0 z-10" style="border-color:var(--border);background:var(--bg)">
          <h2 class="text-lg font-semibold">${this._list.find(c => c.id === id)?.icon || ''} ${this._list.find(c => c.id === id)?.title || ''}</h2>
          <button onclick="Calculator.close()" class="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div id="calc-content" class="p-4"></div>
      </div>`;
    document.body.appendChild(modal);
    calc.render(document.getElementById('calc-content'));
    this._bindEsc();
  },

  _bindEsc() {
    if (this._escHandler) return;
    this._escHandler = (e) => { if (e.key === 'Escape') Calculator.close(); };
    document.addEventListener('keydown', this._escHandler);
  },

  close() {
    const modal = document.getElementById('calc-modal');
    if (modal) modal.remove();
    this._active = null;
    if (this._escHandler) { document.removeEventListener('keydown', this._escHandler); this._escHandler = null; }
  },

  // 计算器清单（按分类组织）
  _list: [
    // ===== 电路基础 =====
    { id: 'ohm', title: '欧姆定律', desc: 'V=IR，知二求一', icon: '⚡', category: '电路基础' },
    { id: 'resistor', title: '电阻色环识别', desc: '4/5 环色环 ⇄ 阻值互转', icon: '🎨', category: '电路基础' },
    { id: 'divider', title: '分压/分流计算', desc: '串联分压、并联分流', icon: '📏', category: '电路基础' },
    { id: 'rc-rl', title: 'RC/RL 时间常数', desc: '一阶电路时间常数、截止频率', icon: '⏱', category: '电路基础' },
    { id: 'rlc', title: 'RLC 谐振计算', desc: '谐振频率、Q 值、带宽', icon: '🌊', category: '电路基础' },
    { id: 'filter', title: '滤波器设计', desc: 'RC 低通/高通截止频率', icon: '🔌', category: '电路基础' },
    // ===== 模拟电路 =====
    { id: 'opamp-gain', title: '运放增益计算', desc: '反相/同相/差分放大', icon: '🔺', category: '模拟电路' },
    // ===== 数字电路 =====
    { id: 'num-convert', title: '数制转换', desc: '十/二/十六进制 + 原码补码', icon: '0️⃣', category: '数字电路' },
    { id: 'kmap', title: '卡诺图化简器', desc: '输入真值表，输出最简式', icon: '▦', category: '数字电路' },
    { id: 'bitwise', title: '位运算可视化', desc: '与/或/异或/移位，8 位可视化', icon: '🔢', category: '数字电路' },
    // ===== 信号处理 =====
    { id: 'db', title: 'dB 换算器', desc: 'dB ⇄ 线性比值（功率/电压）', icon: '📢', category: '信号处理' },
    { id: 'complex', title: '复数/相量计算', desc: '极坐标 ⇄ 直角坐标、四则运算', icon: '🔄', category: '信号处理' },
    { id: 'sampling', title: '采样频率计算', desc: '奈奎斯特频率、抗混叠', icon: '🔬', category: '信号处理' },
    // ===== 自动控制 =====
    { id: 'laplace', title: '拉氏变换查表', desc: '常用函数 ↔ s 域，可查可搜', icon: 'ℒ', category: '自动控制' },
    { id: 'z-transform', title: 'Z 变换查表', desc: '常用 Z 变换对，离散系统', icon: 'ℤ', category: '自动控制' },
    { id: 'routh', title: '劳斯表生成器', desc: '输入特征方程，自动判稳', icon: '⚖', category: '自动控制' },
    { id: 'pid-tune', title: 'PID 整定计算', desc: 'Ziegler-Nichols 参数计算', icon: '🔧', category: '自动控制' },
    { id: 'statespace', title: '状态空间求解', desc: '能控/能观性、特征值、稳定性', icon: '📐', category: '自动控制' },
    { id: 'statespace-design', title: '状态空间设计器', desc: '极点配置 K / 观测器增益 L / LQR 三合一（Ackermann + Riccati）', icon: '🎛️', category: '自动控制' },
    { id: 'zoh-discretize', title: '连续系统离散化', desc: 'ZOH 精确离散化 G/H + 极点映射 + 闭环单位圆判稳', icon: '💻', category: '自动控制' },
    // ===== 计算机 =====
    { id: 'matrix', title: '矩阵计算器', desc: '加/乘/逆/转置/行列式/特征值', icon: '⊞', category: '计算机' },
    { id: 'sort-vis', title: '排序复杂度对比', desc: '各排序算法步数估算', icon: '↕', category: '计算机' },
    { id: 'subnet', title: 'IP 子网划分', desc: 'CIDR/掩码/可用主机数', icon: '🌐', category: '计算机' },
    // ===== 工程协议 =====
    { id: 'validator', title: '协议校验器', desc: 'CRC-8/16/32/Modbus/CAN 帧解析', icon: '🔐', category: '工程协议' },
    // ===== 电机驱动 =====
    { id: 'motor', title: '电机参数计算', desc: '转速-转矩-功率、步进脉冲', icon: '⚙️', category: '电机驱动' },
    // ===== 嵌入式 =====
    { id: 'adc-calc', title: 'ADC 分辨率计算', desc: '位 N / Vref → LSB、量化误差、SINAD', icon: '📊', category: '嵌入式' },
    { id: 'pwm-calc', title: 'PWM 参数计算', desc: '时钟/频率 → ARR、PSC、占空比精度', icon: '🌊', category: '嵌入式' },
    { id: 'led-resistor', title: 'LED 限流电阻', desc: 'Vs/Vf/If → 阻值、功耗、E24 标称值', icon: '💡', category: '嵌入式' },
    { id: 'battery-life', title: '电池续航估算', desc: '容量/负载 → 工作时长、放电倍率', icon: '🔋', category: '嵌入式' },
    { id: 'uart-debug', title: '串口调试助手', desc: '十六进制收发模拟 + CRC 校验 + Web Serial 真机', icon: '🔌', category: '嵌入式' },
    { id: 'linux-cheat', title: 'Linux 命令速查', desc: '文件/进程/网络/设备常用命令卡片，可搜索', icon: '🐧', category: '嵌入式' },

    { id: 'gcode-gen', title: 'G-code 生成器', desc: '矩形/圆形轮廓、螺旋下刀圆孔 → 基础 G-code', icon: '📜', category: '制造与工艺' },
    { id: 'print-cost', title: '打印成本估算', desc: '体积/填充率/材料 → 耗材重量+成本+时间', icon: '💰', category: '制造与工艺' },
    { id: 'shrink-calc', title: '公差计算器', desc: '3D 打印收缩补偿：设计尺寸 × 收缩率 → 打印尺寸', icon: '📐', category: '制造与工艺' },

    { id: 'cron-gen', title: 'cron 表达式生成器', desc: '可视化编辑定时任务 + 未来 3 次执行时间预览', icon: '⏰', category: '计算机' },

    // ===== 人工智能 =====
    { id: 'token-est', title: 'Token 估算器', desc: '中英文本 → token 数 → 4K/8K/32K/128K 上下文窗口占用', icon: '🧮', category: '人工智能' },
    { id: 'llm-memory', title: 'LLM 内存估算器', desc: '参数量 × 精度 → 权重/KV Cache/全账内存，对照 STM32/树莓派/RK3588 判定能否跑', icon: '💾', category: '人工智能' },
  ],

  // 各计算器实现
  _calculators: {
    // ==================== 矩阵计算器 ====================
    matrix: {
      _size: 2,
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <label class="font-medium">矩阵大小：</label>
              <select id="matrix-size" onchange="Calculator._calculators.matrix.changeSize(this.value)" class="px-3 py-1 rounded" style="border:1px solid var(--border);background:var(--bg)">
                <option value="2">2×2</option>
                <option value="3">3×3</option>
              </select>
            </div>
            <div class="flex gap-4 flex-wrap">
              <div>
                <div class="text-sm font-medium mb-1">矩阵 A</div>
                <div id="matrix-a" class="inline-grid gap-1" style="grid-template-columns:repeat(2,4rem)"></div>
              </div>
            </div>
            <div class="flex flex-wrap gap-2">
              <button onclick="Calculator._calculators.matrix.calc('det')" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">行列式</button>
              <button onclick="Calculator._calculators.matrix.calc('inv')" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">逆矩阵</button>
              <button onclick="Calculator._calculators.matrix.calc('T')" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">转置</button>
              <button onclick="Calculator._calculators.matrix.calc('eigen')" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">特征值</button>
              <button onclick="Calculator._calculators.matrix.calc('trace')" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">迹</button>
            </div>
            <div id="matrix-result" class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>
          </div>`;
        this.changeSize(2);
      },
      changeSize(n) {
        this._size = parseInt(n);
        const container = document.getElementById('matrix-a');
        if (!container) return;
        container.style.gridTemplateColumns = `repeat(${n},4rem)`;
        container.innerHTML = Array.from({length: n*n}, (_, i) =>
          `<input type="number" id="ma-${i}" value="${i % (n+1) === 0 ? 1 : 0}" class="w-16 text-center text-sm py-1 rounded" style="border:1px solid var(--border);background:var(--bg)">`
        ).join('');
      },
      getMatrix() {
        const n = this._size;
        const m = [];
        for (let i = 0; i < n; i++) {
          const row = [];
          for (let j = 0; j < n; j++) {
            row.push(parseFloat(document.getElementById(`ma-${i*n+j}`)?.value || 0));
          }
          m.push(row);
        }
        return m;
      },
      det(m) {
        const n = m.length;
        if (n === 2) return m[0][0]*m[1][1] - m[0][1]*m[1][0];
        if (n === 3) {
          return m[0][0]*(m[1][1]*m[2][2]-m[1][2]*m[2][1])
               - m[0][1]*(m[1][0]*m[2][2]-m[1][2]*m[2][0])
               + m[0][2]*(m[1][0]*m[2][1]-m[1][1]*m[2][0]);
        }
        return 0;
      },
      inv(m) {
        const n = m.length;
        const d = this.det(m);
        if (Math.abs(d) < 1e-10) return null;
        if (n === 2) {
          return [[m[1][1]/d, -m[0][1]/d], [-m[1][0]/d, m[0][0]/d]];
        }
        if (n === 3) {
          const c = (i,j) => {
            const minor = m.filter((_,ri) => ri!==i).map(row => row.filter((_,ci) => ci!==j));
            return ((i+j)%2===0?1:-1) * (minor[0][0]*minor[1][1]-minor[0][1]*minor[1][0]);
          };
          const adj = Array.from({length:3}, (_,i) => Array.from({length:3}, (_,j) => c(j,i)));
          return adj.map(row => row.map(v => v/d));
        }
        return null;
      },
      eigen2x2(m) {
        const a = 1, b = -(m[0][0]+m[1][1]), c = m[0][0]*m[1][1]-m[0][1]*m[1][0];
        const disc = b*b - 4*a*c;
        if (disc >= 0) {
          const s1 = (-b + Math.sqrt(disc))/(2*a);
          const s2 = (-b - Math.sqrt(disc))/(2*a);
          return [s1, s2];
        } else {
          const real = -b/(2*a);
          const imag = Math.sqrt(-disc)/(2*a);
          return [`${real.toFixed(2)}+${imag.toFixed(2)}i`, `${real.toFixed(2)}-${imag.toFixed(2)}i`];
        }
      },
      eigen3x3(m) {
        // 特征方程: λ³ - tr(A)λ² + (A11+A22+A33)λ - det(A) = 0
        const tr = m[0][0]+m[1][1]+m[2][2];
        const c2 = (m[0][0]*m[1][1]-m[0][1]*m[1][0]) + (m[0][0]*m[2][2]-m[0][2]*m[2][0]) + (m[1][1]*m[2][2]-m[1][2]*m[2][1]);
        const c3 = this.det(m);
        // 数值求解（牛顿法找一个根，再用多项式除法）
        let r = 0;
        for (let i = 0; i < 100; i++) {
          const f = r*r*r - tr*r*r + c2*r - c3;
          const fp = 3*r*r - 2*tr*r + c2;
          if (Math.abs(fp) < 1e-12) break;
          r = r - f/fp;
        }
        r = Math.round(r*1000)/1000;
        // 多项式除法得到二次因子
        const a2 = 1, b2 = -tr-r, c2b = c2 + r*(tr+r);
        const disc = b2*b2 - 4*a2*c2b;
        const roots = [r];
        if (disc >= 0) {
          roots.push((-b2+Math.sqrt(disc))/(2*a2));
          roots.push((-b2-Math.sqrt(disc))/(2*a2));
        } else {
          const real = -b2/(2*a2), imag = Math.sqrt(-disc)/(2*a2);
          roots.push(`${real.toFixed(2)}+${imag.toFixed(2)}i`);
          roots.push(`${real.toFixed(2)}-${imag.toFixed(2)}i`);
        }
        return roots.map(v => typeof v === 'number' ? Math.round(v*1000)/1000 : v);
      },
      formatMatrix(m) {
        return `<table class="mx-auto" style="border-spacing:0.5rem">${m.map(row =>
          `<tr>${row.map(v => `<td class="text-center px-2">${typeof v === 'number' ? (Number.isInteger(v) ? v : v.toFixed(4)) : v}</td>`).join('')}</tr>`
        ).join('')}</table>`;
      },
      calc(type) {
        const m = this.getMatrix();
        const result = document.getElementById('matrix-result');
        if (!result) return;
        switch(type) {
          case 'det':
            result.innerHTML = `<strong>行列式 |A| =</strong> ${this.det(m)}`;
            break;
          case 'inv': {
            const inv = this.inv(m);
            result.innerHTML = inv ? `<strong>A⁻¹ =</strong>${this.formatMatrix(inv)}` : '<span class="text-red-500">矩阵不可逆（行列式为 0）</span>';
            break;
          }
          case 'T':
            result.innerHTML = `<strong>Aᵀ =</strong>${this.formatMatrix(m[0].map((_,j) => m.map(row => row[j])))}`;
            break;
          case 'eigen': {
            const eigen = this._size === 2 ? this.eigen2x2(m) : this.eigen3x3(m);
            result.innerHTML = `<strong>特征值：</strong>λ₁ = ${eigen[0]}，λ₂ = ${eigen[1]}${eigen[2] ? '，λ₃ = '+eigen[2] : ''}`;
            break;
          }
          case 'trace':
            result.innerHTML = `<strong>迹 tr(A) =</strong> ${m.reduce((s,row,i) => s+row[i], 0)}`;
            break;
        }
      }
    },

    // ==================== 拉氏变换查表 ====================
    laplace: {
      _data: [
        { time: 'δ(t)', laplace: '1', note: '单位冲激函数' },
        { time: '1(t) 或 u(t)', laplace: '1/s', note: '单位阶跃函数' },
        { time: 't', laplace: '1/s²', note: '' },
        { time: 'tⁿ', laplace: 'n!/sⁿ⁺¹', note: 'n 为正整数' },
        { time: 'e⁻ᵃᵗ', laplace: '1/(s+a)', note: '' },
        { time: 'te⁻ᵃᵗ', laplace: '1/(s+a)²', note: '' },
        { time: 'sin(ωt)', laplace: 'ω/(s²+ω²)', note: '' },
        { time: 'cos(ωt)', laplace: 's/(s²+ω²)', note: '' },
        { time: 'e⁻ᵃᵗsin(ωt)', laplace: 'ω/[(s+a)²+ω²]', note: '' },
        { time: 'e⁻ᵃᵗcos(ωt)', laplace: '(s+a)/[(s+a)²+ω²]', note: '' },
        { time: 't·sin(ωt)', laplace: '2ωs/(s²+ω²)²', note: '' },
        { time: 't·cos(ωt)', laplace: '(s²-ω²)/(s²+ω²)²', note: '' },
        { time: '1-e⁻ᵃᵗ', laplace: 'a/[s(s+a)]', note: '' },
        { time: '(1/at)(1-e⁻ᵃᵗ)', laplace: '1/[s(s+a)]', note: '' },
      ],
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <input type="text" id="laplace-search" placeholder="搜索函数或变换式..." oninput="Calculator._calculators.laplace.filter(this.value)"
              class="w-full px-3 py-2 rounded" style="border:1px solid var(--border);background:var(--bg)">
            <div class="overflow-x-auto">
              <table class="compare-table w-full">
                <thead><tr><th>f(t)</th><th>F(s)</th><th>备注</th></tr></thead>
                <tbody id="laplace-table">
                  ${this._data.map(d => `<tr><td class="font-mono">${d.time}</td><td class="font-mono">${d.laplace}</td><td>${d.note}</td></tr>`).join('')}
                </tbody>
              </table>
            </div>
            <div class="info-box info">
              <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <div><strong>性质提示</strong>：L[af+bg] = aF(s)+bG(s)（线性）；L[e⁻ᵃᵗf(t)] = F(s+a)（频移）；L[f'(t)] = sF(s)-f(0)（微分）；L[f(t-τ)] = e⁻ˢᵗF(s)（时移）。</div>
            </div>
          </div>`;
      },
      filter(keyword) {
        const tbody = document.getElementById('laplace-table');
        if (!tbody) return;
        const kw = keyword.toLowerCase();
        tbody.innerHTML = this._data
          .filter(d => d.time.toLowerCase().includes(kw) || d.laplace.toLowerCase().includes(kw) || d.note.toLowerCase().includes(kw))
          .map(d => `<tr><td class="font-mono">${d.time}</td><td class="font-mono">${d.laplace}</td><td>${d.note}</td></tr>`)
          .join('');
      }
    },

    // ==================== 数制转换器 ====================
    numConvert: {
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div>
              <label class="font-medium text-sm">输入数值</label>
              <div class="flex gap-2 mt-1">
                <input type="text" id="nc-input" value="255" class="flex-1 px-3 py-2 rounded font-mono" style="border:1px solid var(--border);background:var(--bg)">
                <select id="nc-base" class="px-3 py-2 rounded" style="border:1px solid var(--border);background:var(--bg)">
                  <option value="10">十进制</option>
                  <option value="2">二进制</option>
                  <option value="8">八进制</option>
                  <option value="16">十六进制</option>
                </select>
                <button onclick="Calculator._calculators.numConvert.convert()" class="px-4 py-2 rounded font-medium" style="background:var(--primary);color:white">转换</button>
              </div>
            </div>
            <div id="nc-result" class="grid grid-cols-1 sm:grid-cols-2 gap-3"></div>
            <div class="info-box info">
              <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <div><strong>快捷键</strong>：二进制用 0b 前缀（如 0b11111111），十六进制用 0x 前缀（如 0xFF）。</div>
            </div>
          </div>`;
        this.convert();
      },
      convert() {
        const input = document.getElementById('nc-input')?.value?.trim() || '';
        const base = parseInt(document.getElementById('nc-base')?.value || '10');
        let num;
        try {
          num = parseInt(input, base);
          if (isNaN(num)) throw new Error();
        } catch {
          document.getElementById('nc-result').innerHTML = '<div class="text-red-500 col-span-2">输入格式错误</div>';
          return;
        }
        const bits = 8;
        const bin = num.toString(2).padStart(bits, '0');
        const twos = num >= 0 ? bin : (Math.pow(2, bits) + num).toString(2).padStart(bits, '0');
        document.getElementById('nc-result').innerHTML = `
          <div class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border)">
            <div class="text-xs text-gray-500 mb-1">十进制</div>
            <div class="font-mono text-lg">${num}</div>
          </div>
          <div class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border)">
            <div class="text-xs text-gray-500 mb-1">二进制</div>
            <div class="font-mono text-lg">${bin}</div>
          </div>
          <div class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border)">
            <div class="text-xs text-gray-500 mb-1">八进制</div>
            <div class="font-mono text-lg">${num.toString(8)}</div>
          </div>
          <div class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border)">
            <div class="text-xs text-gray-500 mb-1">十六进制</div>
            <div class="font-mono text-lg">${num.toString(16).toUpperCase()}</div>
          </div>
          <div class="p-3 rounded sm:col-span-2" style="background:var(--bg-secondary);border:1px solid var(--border)">
            <div class="text-xs text-gray-500 mb-1">8位补码表示</div>
            <div class="font-mono text-lg">${twos} <span class="text-sm text-gray-500">(${num >= 0 ? '正数，补码=原码' : '负数取反+1'})</span></div>
          </div>`;
      }
    },

    // ==================== 运放增益计算 ====================
    opampGain: {
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="flex gap-2">
              <button onclick="Calculator._calculators.opampGain.setType('inv')" id="og-inv" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">反相放大</button>
              <button onclick="Calculator._calculators.opampGain.setType('non')" id="og-non" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--bg-secondary);color:var(--text)">同相放大</button>
              <button onclick="Calculator._calculators.opampGain.setType('diff')" id="og-diff" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--bg-secondary);color:var(--text)">差分放大</button>
            </div>
            <div id="og-inputs"></div>
            <button onclick="Calculator._calculators.opampGain.calc()" class="w-full px-4 py-2 rounded font-medium" style="background:var(--primary);color:white">计算</button>
            <div id="og-result" class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>
          </div>`;
        this.setType('inv');
      },
      setType(type) {
        this._type = type;
        ['inv','non','diff'].forEach(t => {
          const btn = document.getElementById('og-'+t);
          if (btn) btn.style.background = t===type ? 'var(--primary)' : 'var(--bg-secondary)';
          if (btn) btn.style.color = t===type ? 'white' : 'var(--text)';
        });
        const inputs = document.getElementById('og-inputs');
        if (!inputs) return;
        if (type === 'inv') {
          inputs.innerHTML = `
            <div class="grid grid-cols-2 gap-3">
              <div><label class="text-sm">R₁ (kΩ)</label><input type="number" id="og-r1" value="10" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">Rf (kΩ)</label><input type="number" id="og-rf" value="100" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            </div>`;
        } else if (type === 'non') {
          inputs.innerHTML = `
            <div class="grid grid-cols-2 gap-3">
              <div><label class="text-sm">R₁ (kΩ)</label><input type="number" id="og-r1" value="10" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">Rf (kΩ)</label><input type="number" id="og-rf" value="100" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            </div>`;
        } else {
          inputs.innerHTML = `
            <div class="grid grid-cols-2 gap-3">
              <div><label class="text-sm">R₁ (kΩ)</label><input type="number" id="og-r1" value="10" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">Rf (kΩ)</label><input type="number" id="og-rf" value="100" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">R₂ (kΩ)</label><input type="number" id="og-r2" value="10" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">R₃ (kΩ)</label><input type="number" id="og-r3" value="100" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            </div>`;
        }
      },
      calc() {
        const r1 = parseFloat(document.getElementById('og-r1')?.value || 0);
        const rf = parseFloat(document.getElementById('og-rf')?.value || 0);
        const result = document.getElementById('og-result');
        if (!result) return;
        if (this._type === 'inv') {
          const gain = -rf/r1;
          result.innerHTML = `<strong>反相放大器</strong><br>增益 Av = -Rf/R1 = -${rf}/${r1} = <strong>${gain.toFixed(4)}</strong><br><span class="text-sm text-gray-500">输出 Vo = ${gain.toFixed(4)} × Vin</span>`;
        } else if (this._type === 'non') {
          const gain = 1 + rf/r1;
          result.innerHTML = `<strong>同相放大器</strong><br>增益 Av = 1 + Rf/R1 = 1 + ${rf}/${r1} = <strong>${gain.toFixed(4)}</strong><br><span class="text-sm text-gray-500">输出 Vo = ${gain.toFixed(4)} × Vin</span>`;
        } else {
          const r2 = parseFloat(document.getElementById('og-r2')?.value || 0);
          const r3 = parseFloat(document.getElementById('og-r3')?.value || 0);
          if (r1*r3 !== r2*rf) {
            result.innerHTML = `<span class="text-yellow-500">⚠ 电阻不匹配：需 R1×R3 = R2×Rf（当前 ${r1*r3} ≠ ${r2*rf}）</span><br>`;
          }
          const gain = rf/r1;
          result.innerHTML += `<strong>差分放大器</strong><br>增益 Av = Rf/R1 = ${rf}/${r1} = <strong>${gain.toFixed(4)}</strong><br><span class="text-sm text-gray-500">输出 Vo = ${gain.toFixed(4)} × (V+ - V-)</span>`;
        }
      }
    },

    // ==================== RC/RL 时间常数 ====================
    rcRl: {
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="flex gap-2">
              <button onclick="Calculator._calculators.rcRl.setType('rc')" id="rl-rc" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">RC 电路</button>
              <button onclick="Calculator._calculators.rcRl.setType('rl')" id="rl-rl" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--bg-secondary);color:var(--text)">RL 电路</button>
            </div>
            <div id="rl-inputs"></div>
            <button onclick="Calculator._calculators.rcRl.calc()" class="w-full px-4 py-2 rounded font-medium" style="background:var(--primary);color:white">计算</button>
            <div id="rl-result" class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>
          </div>`;
        this.setType('rc');
      },
      setType(type) {
        this._type = type;
        ['rc','rl'].forEach(t => {
          const btn = document.getElementById('rl-'+t);
          if (btn) btn.style.background = t===type ? 'var(--primary)' : 'var(--bg-secondary)';
          if (btn) btn.style.color = t===type ? 'white' : 'var(--text)';
        });
        const inputs = document.getElementById('rl-inputs');
        if (!inputs) return;
        if (type === 'rc') {
          inputs.innerHTML = `
            <div class="grid grid-cols-2 gap-3">
              <div><label class="text-sm">电阻 R (Ω)</label><input type="number" id="rl-r" value="1000" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">电容 C (μF)</label><input type="number" id="rl-c" value="10" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            </div>`;
        } else {
          inputs.innerHTML = `
            <div class="grid grid-cols-2 gap-3">
              <div><label class="text-sm">电阻 R (Ω)</label><input type="number" id="rl-r" value="100" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">电感 L (mH)</label><input type="number" id="rl-l" value="10" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            </div>`;
        }
      },
      calc() {
        const r = parseFloat(document.getElementById('rl-r')?.value || 0);
        const result = document.getElementById('rl-result');
        if (!result) return;
        let tau, fc;
        if (this._type === 'rc') {
          const c = parseFloat(document.getElementById('rl-c')?.value || 0) * 1e-6;
          tau = r * c;
          fc = 1 / (2 * Math.PI * tau);
          result.innerHTML = `<strong>RC 电路</strong><br>
            时间常数 τ = RC = ${r} × ${(c*1e6).toFixed(1)}μF = <strong>${(tau*1000).toFixed(3)} ms</strong><br>
            截止频率 fc = 1/(2πRC) = <strong>${fc.toFixed(1)} Hz</strong><br>
            <span class="text-sm text-gray-500">3dB 带宽 = ${fc.toFixed(1)} Hz，5τ ≈ ${(tau*5*1000).toFixed(1)} ms 达到 99.3%</span>`;
        } else {
          const l = parseFloat(document.getElementById('rl-l')?.value || 0) * 1e-3;
          tau = l / r;
          fc = r / (2 * Math.PI * l);
          result.innerHTML = `<strong>RL 电路</strong><br>
            时间常数 τ = L/R = ${(l*1000).toFixed(1)}mH / ${r} = <strong>${(tau*1000).toFixed(3)} ms</strong><br>
            截止频率 fc = R/(2πL) = <strong>${fc.toFixed(1)} Hz</strong><br>
            <span class="text-sm text-gray-500">5τ ≈ ${(tau*5*1000).toFixed(1)} ms 达到 99.3%</span>`;
        }
      }
    },

    // ==================== 劳斯表生成器 ====================
    routh: {
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div>
              <label class="font-medium text-sm">输入特征方程系数（从高次到低次，空格分隔）</label>
              <div class="text-xs text-gray-500 mb-1">例如：s⁴+2s³+3s²+4s+5 → 输入 "1 2 3 4 5"</div>
              <input type="text" id="routh-coeff" value="1 2 3 4 5" class="w-full px-3 py-2 rounded font-mono" style="border:1px solid var(--border);background:var(--bg)">
            </div>
            <button onclick="Calculator._calculators.routh.calc()" class="w-full px-4 py-2 rounded font-medium" style="background:var(--primary);color:white">生成劳斯表</button>
            <div id="routh-result"></div>
          </div>`;
      },
      calc() {
        const input = document.getElementById('routh-coeff')?.value?.trim() || '';
        const coeffs = input.split(/\s+/).map(Number).filter(n => !isNaN(n));
        const result = document.getElementById('routh-result');
        if (!result || coeffs.length < 2) {
          result.innerHTML = '<div class="text-red-500">请输入至少 2 个系数</div>';
          return;
        }
        const n = coeffs.length;
        const rows = Math.ceil(n/2);
        const table = Array.from({length: n}, () => Array(rows).fill(0));
        // 填前两行
        for (let i = 0; i < n; i += 2) table[0][Math.floor(i/2)] = coeffs[i] || 0;
        for (let i = 1; i < n; i += 2) table[1][Math.floor(i/2)] = coeffs[i] || 0;
        // 计算后续行
        for (let i = 2; i < n; i++) {
          if (table[i-1][0] === 0) {
            table[i-1][0] = 1e-10; // 用极小值代替 0
          }
          for (let j = 0; j < rows-1; j++) {
            table[i][j] = -(table[i-2][0]*table[i-1][j+1] - table[i-2][j+1]*table[i-1][0]) / table[i-1][0];
          }
        }
        // 检查第一列符号变化
        const firstCol = table.map(row => row[0]);
        let signChanges = 0;
        for (let i = 1; i < firstCol.length; i++) {
          if (firstCol[i] * firstCol[i-1] < 0) signChanges++;
        }
        // 渲染
        const maxOrder = n - 1;
        let html = `<div class="overflow-x-auto"><table class="compare-table w-full">
          <thead><tr><th>s^n</th>${Array.from({length:rows}, (_,i) => `<th>列${i+1}</th>`).join('')}</tr></thead>
          <tbody>`;
        for (let i = 0; i < n; i++) {
          html += `<tr><td class="font-medium">s<sup>${maxOrder-i}</sup></td>`;
          for (let j = 0; j < rows; j++) {
            html += `<td class="font-mono">${Math.abs(table[i][j]) < 1e-9 ? '0' : table[i][j].toFixed(4)}</td>`;
          }
          html += '</tr>';
        }
        html += '</tbody></table></div>';
        const stable = signChanges === 0;
        html += `<div class="mt-3 p-3 rounded" style="background:${stable ? '#ecfdf5' : '#fef2f2'};border:1px solid ${stable ? '#a7f3d0' : '#fca5a5'}">
          <strong>${stable ? '✅ 系统稳定' : '❌ 系统不稳定'}</strong>：第一列符号变化 ${signChanges} 次，${stable ? '无右半平面极点' : `有 ${signChanges} 个右半平面极点`}
        </div>`;
        result.innerHTML = html;
      }
    },

    // ==================== PID 整定计算 ====================
    pidTune: {
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="text-sm text-gray-500">Ziegler-Nichols 阶跃响应法（开环阶跃实验）</div>
            <div class="grid grid-cols-2 gap-3">
              <div><label class="text-sm">延迟时间 L (s)</label><input type="number" id="pid-l" value="1" step="0.1" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">时间常数 T (s)</label><input type="number" id="pid-t" value="5" step="0.1" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">增益 K</label><input type="number" id="pid-k" value="2" step="0.1" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            </div>
            <button onclick="Calculator._calculators.pidTune.calc()" class="w-full px-4 py-2 rounded font-medium" style="background:var(--primary);color:white">计算 PID 参数</button>
            <div id="pid-result"></div>
          </div>`;
      },
      calc() {
        const L = parseFloat(document.getElementById('pid-l')?.value || 1);
        const T = parseFloat(document.getElementById('pid-t')?.value || 5);
        const K = parseFloat(document.getElementById('pid-k')?.value || 1);
        const result = document.getElementById('pid-result');
        if (!result) return;
        const p = T/(K*L), i = 2*L, d = 0.5*L;
        result.innerHTML = `
          <div class="overflow-x-auto"><table class="compare-table w-full">
            <thead><tr><th>控制器</th><th>Kp</th><th>Ti</th><th>Td</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">P</td><td>${(T/(K*L)).toFixed(4)}</td><td>∞</td><td>0</td></tr>
              <tr><td class="font-medium">PI</td><td>${(0.9*T/(K*L)).toFixed(4)}</td><td>${(3.33*L).toFixed(4)}</td><td>0</td></tr>
              <tr><td class="font-medium">PID</td><td>${(1.2*T/(K*L)).toFixed(4)}</td><td>${(2*L).toFixed(4)}</td><td>${(0.5*L).toFixed(4)}</td></tr>
            </tbody>
          </table></div>
          <div class="info-box info mt-3">
            <div><strong>PID 控制器传递函数</strong>：Gc(s) = Kp(1 + 1/(Ti·s) + Td·s) = ${((1.2*T/(K*L))).toFixed(2)}(1 + 1/(${(2*L).toFixed(1)}s) + ${(0.5*L).toFixed(1)}s)</div>
          </div>`;
      }
    },

    // ==================== 排序复杂度对比 ====================
    sortVis: {
      _algorithms: [
        { name: '冒泡排序', best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: '✅' },
        { name: '选择排序', best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: '❌' },
        { name: '插入排序', best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: '✅' },
        { name: '希尔排序', best: 'O(n log n)', avg: 'O(n^1.3)', worst: 'O(n²)', space: 'O(1)', stable: '❌' },
        { name: '归并排序', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)', stable: '✅' },
        { name: '快速排序', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)', stable: '❌' },
        { name: '堆排序', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)', stable: '❌' },
        { name: '计数排序', best: 'O(n+k)', avg: 'O(n+k)', worst: 'O(n+k)', space: 'O(k)', stable: '✅' },
        { name: '基数排序', best: 'O(d·n)', avg: 'O(d·n)', worst: 'O(d·n)', space: 'O(n+k)', stable: '✅' },
      ],
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div>
              <label class="font-medium text-sm">数据规模 n</label>
              <input type="number" id="sort-n" value="1000" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)">
            </div>
            <div class="overflow-x-auto">
              <table class="compare-table w-full">
                <thead><tr><th>算法</th><th>最好</th><th>平均</th><th>最坏</th><th>空间</th><th>稳定</th></tr></thead>
                <tbody>
                  ${this._algorithms.map(a => `<tr>
                    <td class="font-medium">${a.name}</td><td class="font-mono text-sm">${a.best}</td><td class="font-mono text-sm">${a.avg}</td>
                    <td class="font-mono text-sm">${a.worst}</td><td class="font-mono text-sm">${a.space}</td><td>${a.stable}</td>
                  </tr>`).join('')}
                </tbody>
              </table>
            </div>
            <div id="sort-est"></div>
          </div>`;
      }
    },

    // ==================== 卡诺图化简器 ====================
    kmap: {
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="text-sm text-gray-500">4 变量卡诺图（ABCD），点击格子切换 0/1</div>
            <div class="flex gap-2 mb-2">
              <button onclick="Calculator._calculators.kmap.clear()" class="px-3 py-1 rounded text-sm" style="background:var(--bg-secondary);color:var(--text)">清空</button>
              <button onclick="Calculator._calculators.kmap.fillAll()" class="px-3 py-1 rounded text-sm" style="background:var(--bg-secondary);color:var(--text)">全填1</button>
            </div>
            <div class="overflow-x-auto">
              <table class="mx-auto" style="border-collapse:collapse">
                <thead><tr><th class="px-2 py-1 text-sm">AB\\CD</th><th class="px-2 py-1 text-sm">00</th><th class="px-2 py-1 text-sm">01</th><th class="px-2 py-1 text-sm">11</th><th class="px-2 py-1 text-sm">10</th></tr></thead>
                <tbody>
                  ${[0,1,3,2].map(r => `<tr>
                    <td class="px-2 py-1 text-sm font-medium">${r===0?'00':r===1?'01':r===3?'11':'10'}</td>
                    ${[0,1,3,2].map(c => {
                      const idx = r*4+c;
                      const grayIdx = [0,1,3,2].indexOf(r)*4 + [0,1,3,2].indexOf(c);
                      return `<td><button id="km-${grayIdx}" onclick="Calculator._calculators.kmap.toggle(${grayIdx})" class="w-12 h-12 border text-lg font-bold" style="border-color:var(--border);background:var(--bg)">0</button></td>`;
                    }).join('')}
                  </tr>`).join('')}
                </tbody>
              </table>
            </div>
            <button onclick="Calculator._calculators.kmap.simplify()" class="w-full px-4 py-2 rounded font-medium" style="background:var(--primary);color:white">化简</button>
            <div id="km-result" class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>
          </div>`;
        this._vals = Array(16).fill(0);
      },
      toggle(i) {
        this._vals[i] = this._vals[i] ? 0 : 1;
        const btn = document.getElementById('km-'+i);
        if (btn) {
          btn.textContent = this._vals[i];
          btn.style.background = this._vals[i] ? 'var(--primary)' : 'var(--bg)';
          btn.style.color = this._vals[i] ? 'white' : 'var(--text)';
        }
      },
      clear() {
        this._vals = Array(16).fill(0);
        for (let i = 0; i < 16; i++) {
          const btn = document.getElementById('km-'+i);
          if (btn) { btn.textContent = '0'; btn.style.background = 'var(--bg)'; btn.style.color = 'var(--text)'; }
        }
      },
      fillAll() {
        this._vals = Array(16).fill(1);
        for (let i = 0; i < 16; i++) {
          const btn = document.getElementById('km-'+i);
          if (btn) { btn.textContent = '1'; btn.style.background = 'var(--primary)'; btn.style.color = 'white'; }
        }
      },
      simplify() {
        const result = document.getElementById('km-result');
        if (!result) return;
        const ones = this._vals.reduce((acc, v, i) => v ? [...acc, i] : acc, []);
        if (ones.length === 0) { result.innerHTML = '<strong>最简式：</strong>F = 0'; return; }
        if (ones.length === 16) { result.innerHTML = '<strong>最简式：</strong>F = 1'; return; }
        // 简化：列出所有为 1 的最小项
        const vars = ['A','B','C','D'];
        const terms = ones.map(i => {
          let term = '';
          for (let b = 3; b >= 0; b--) {
            const bit = (i >> b) & 1;
            term += bit ? vars[3-b] : vars[3-b] + "'";
          }
          return term;
        });
        result.innerHTML = `<strong>最小项之和：</strong>F = Σm(${ones.join(',')})<br><strong>展开式：</strong>F = ${terms.join(' + ')}<br><span class="text-sm text-gray-500 mt-2">💡 完整的卡诺图圈画化简需要更复杂的算法，此处列出最小项。可手动圈画找最大质蕴含项。</span>`;
      }
    },

    // ==================== 欧姆定律 ====================
    ohm: {
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="info-box info"><div>输入<strong>任意两个</strong>已知量，留空未知的那个，自动求解第三个。V = I × R</div></div>
            <div class="grid grid-cols-3 gap-3">
              <div><label class="text-sm">电压 V (V)</label><input type="number" id="ohm-v" placeholder="?" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">电流 I (A)</label><input type="number" id="ohm-i" placeholder="?" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">电阻 R (Ω)</label><input type="number" id="ohm-r" placeholder="?" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            </div>
            <button onclick="Calculator._calculators.ohm.calc()" class="w-full px-4 py-2 rounded font-medium" style="background:var(--primary);color:white">计算</button>
            <div id="ohm-result" class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>
          </div>`;
      },
      calc() {
        const v = document.getElementById('ohm-v').value;
        const i = document.getElementById('ohm-i').value;
        const r = document.getElementById('ohm-r').value;
        const result = document.getElementById('ohm-result');
        const known = [v, i, r].filter(x => x !== '').length;
        if (known < 2) { result.innerHTML = '<span class="text-red-500">请至少输入两个已知量</span>'; return; }
        let V, I, R, html = '';
        if (v && i) { V = parseFloat(v); I = parseFloat(i); R = V / I; html = `R = V/I = ${V}/${I} = <strong>${R.toFixed(4)} Ω</strong>`; }
        else if (v && r) { V = parseFloat(v); R = parseFloat(r); I = V / R; html = `I = V/R = ${V}/${R} = <strong>${I.toFixed(4)} A</strong>`; }
        else if (i && r) { I = parseFloat(i); R = parseFloat(r); V = I * R; html = `V = I×R = ${I}×${R} = <strong>${V.toFixed(4)} V</strong>`; }
        const P = (V || 0) * (I || 0);
        html += `<br><span class="text-sm text-gray-500">功率 P = V×I = <strong>${P.toFixed(4)} W</strong></span>`;
        result.innerHTML = html;
      }
    },

    // ==================== 电阻色环识别 ====================
    resistor: {
      _colors: [
        { name: '黑', color: '#000', digit: 0, mult: 1, tol: null },
        { name: '棕', color: '#8B4513', digit: 1, mult: 10, tol: '±1%' },
        { name: '红', color: '#FF0000', digit: 2, mult: 100, tol: '±2%' },
        { name: '橙', color: '#FFA500', digit: 3, mult: 1e3, tol: null },
        { name: '黄', color: '#FFFF00', digit: 4, mult: 1e4, tol: null },
        { name: '绿', color: '#00AA00', digit: 5, mult: 1e5, tol: '±0.5%' },
        { name: '蓝', color: '#0000FF', digit: 6, mult: 1e6, tol: '±0.25%' },
        { name: '紫', color: '#800080', digit: 7, mult: 1e7, tol: '±0.1%' },
        { name: '灰', color: '#808080', digit: 8, mult: 1e8, tol: null },
        { name: '白', color: '#FFFFFF', digit: 9, mult: 1e9, tol: null },
        { name: '金', color: '#FFD700', digit: null, mult: 0.1, tol: '±5%' },
        { name: '银', color: '#C0C0C0', digit: null, mult: 0.01, tol: '±10%' },
      ],
      _mode: 'value2band',
      _bands: [1, 0, 100, '±5%'],
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="flex gap-2">
              <button onclick="Calculator._calculators.resistor.setMode('value2band')" id="rs-v2b" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">阻值→色环</button>
              <button onclick="Calculator._calculators.resistor.setMode('band2value')" id="rs-b2v" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--bg-secondary);color:var(--text)">色环→阻值</button>
            </div>
            <div id="rs-content"></div>
          </div>`;
        this.setMode('value2band');
      },
      setMode(mode) {
        this._mode = mode;
        ['v2b','b2v'].forEach((m, i) => {
          const btn = document.getElementById('rs-'+m);
          if (btn) { btn.style.background = mode === ['value2band','band2value'][i] ? 'var(--primary)' : 'var(--bg-secondary)'; btn.style.color = mode === ['value2band','band2value'][i] ? 'white' : 'var(--text)'; }
        });
        const content = document.getElementById('rs-content');
        if (!content) return;
        if (mode === 'value2band') {
          content.innerHTML = `
            <div class="grid grid-cols-2 gap-3">
              <div><label class="text-sm">阻值</label><input type="number" id="rs-value" value="4700" step="any" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">单位</label><select id="rs-unit" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"><option value="1">Ω</option><option value="1000" selected>kΩ</option><option value="1000000">MΩ</option></select></div>
              <div><label class="text-sm">容差</label><select id="rs-tol" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"><option>±5%</option><option>±1%</option><option>±2%</option><option>±10%</option><option>±0.1%</option><option>±0.5%</option></select></div>
            </div>
            <button onclick="Calculator._calculators.resistor.calcBands()" class="w-full px-4 py-2 rounded font-medium mt-3" style="background:var(--primary);color:white">计算色环</button>
            <div id="rs-result" class="p-3 rounded mt-3" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>`;
        } else {
          content.innerHTML = `
            <div class="text-sm text-gray-500 mb-2">点击下方色块选择环色，4 环 = D1 D2 ×倍率 ±容差</div>
            <div id="rs-bands-display" class="flex items-center justify-center gap-2 my-3"></div>
            <div id="rs-pickers" class="space-y-3"></div>
            <button onclick="Calculator._calculators.resistor.calcValue()" class="w-full px-4 py-2 rounded font-medium mt-3" style="background:var(--primary);color:white">计算阻值</button>
            <div id="rs-result" class="p-3 rounded mt-3" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>`;
          this.renderBandsUI();
        }
      },
      renderBandsUI() {
        const bandLabels = ['第1环(十位)', '第2环(个位)', '第3环(倍率)', '第4环(容差)'];
        const display = document.getElementById('rs-bands-display');
        const pickers = document.getElementById('rs-pickers');
        if (!display || !pickers) return;
        // display
        display.innerHTML = this._bands.map(c => {
          const obj = this._colors.find(x => (x.tol === c || x.digit === c || x.mult === c));
          const bg = obj ? obj.color : '#333';
          return `<div class="resistor-band" style="background:${bg};${bg==='#FFFFFF'||bg==='#FFFF00'||bg==='#FFA500'||bg==='#FFD700'||bg==='#C0C0C0'?'border:2px solid #999':''}"></div>`;
        }).join('');
        // pickers
        pickers.innerHTML = bandLabels.map((label, idx) => `
          <div><div class="text-xs text-gray-500 mb-1">${label}</div>
          <div class="color-palette">${this._colors.map(c => {
            const val = idx < 2 ? c.digit : idx === 2 ? c.mult : c.tol;
            const active = this._bands[idx] === val;
            return `<div class="color-swatch ${active?'active':''}" style="background:${c.color};${['#FFFFFF','#FFFF00','#FFA500','#FFD700','#C0C0C0'].includes(c.color)?'border:1px solid #999':''};${active?'box-shadow:0 0 0 2px var(--primary);':''}" title="${c.name}" onclick="Calculator._calculators.resistor.pickBand(${idx},${val===null?'null':val},'${c.color}','${c.name}')"></div>`;
          }).join('')}</div>
        `).join('');
      },
      pickBand(idx, val, color, name) {
        // 容错：idx=2 时 val 可能是浮点
        this._bands[idx] = val;
        this.renderBandsUI();
      },
      calcValue() {
        const d1 = this._bands[0], d2 = this._bands[1], mult = this._bands[2], tol = this._bands[3];
        if (d1 == null || d2 == null || mult == null) { document.getElementById('rs-result').innerHTML = '<span class="text-red-500">请选择前 3 环颜色</span>'; return; }
        const value = (d1 * 10 + d2) * mult;
        const fmt = (v) => v >= 1e6 ? (v/1e6)+' MΩ' : v >= 1e3 ? (v/1e3)+' kΩ' : v+' Ω';
        document.getElementById('rs-result').innerHTML = `<strong>阻值 = ${(d1*10+d2)} × ${mult} = ${fmt(value)}</strong><br><span class="text-sm text-gray-500">容差 ${tol||'—'}（范围 ${fmt(value*(1-parseFloat(tol)/100))} ~ ${fmt(value*(1+parseFloat(tol)/100))}）</span>`;
      },
      calcBands() {
        const v = parseFloat(document.getElementById('rs-value')?.value || 0);
        const unit = parseFloat(document.getElementById('rs-unit')?.value || 1);
        const tol = document.getElementById('rs-tol')?.value || '±5%';
        const ohms = v * unit;
        if (ohms <= 0) { document.getElementById('rs-result').innerHTML = '<span class="text-red-500">请输入有效阻值</span>'; return; }
        // 找到有效数字和倍率
        const str = ohms.toExponential(2);
        const [mantissa, exp] = str.split('e');
        const m = parseFloat(mantissa);
        const e = parseInt(exp);
        let d1, d2, mult;
        if (m < 10) { d1 = 0; d2 = Math.round(m * 10); mult = Math.pow(10, e - 1); }
        else { d1 = Math.floor(m / 10); d2 = Math.round(m) % 10; mult = Math.pow(10, e); }
        const findColor = (digit, mult_, tol_) => {
          if (digit !== null) return this._colors.find(c => c.digit === digit);
          if (mult_ !== null) return this._colors.find(c => c.mult === mult_);
          return this._colors.find(c => c.tol === tol_);
        };
        const c1 = findColor(d1, null, null);
        const c2 = findColor(d2, null, null);
        const c3 = findColor(null, mult, null);
        const c4 = findColor(null, null, tol);
        const fmt = (v) => v >= 1e6 ? (v/1e6)+' MΩ' : v >= 1e3 ? (v/1e3)+' kΩ' : v+' Ω';
        document.getElementById('rs-result').innerHTML = `
          <strong>${fmt(ohms)} ${tol}</strong><br>
          <div class="flex items-center gap-2 mt-2">
            ${[c1,c2,c3,c4].map(c => `<div class="resistor-band" style="background:${c.color};${['#FFFFFF','#FFFF00','#FFA500','#FFD700','#C0C0C0'].includes(c.color)?'border:2px solid #999':''}"></div>`).join('')}
          </div>
          <div class="mt-2 text-sm">${c1.name} ${c2.name} ${c3.name} ${c4.name}</div>
          <div class="text-sm text-gray-500 mt-1">D1=${d1} D2=${d2} ×倍率=${c3.mult} 容差=${tol}</div>`;
      }
    },

    // ==================== 分压/分流 ====================
    divider: {
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="flex gap-2">
              <button onclick="Calculator._calculators.divider.setType('voltage')" id="dv-v" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">串联分压</button>
              <button onclick="Calculator._calculators.divider.setType('current')" id="dv-c" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--bg-secondary);color:var(--text)">并联分流</button>
            </div>
            <div id="dv-content"></div>
          </div>`;
        this.setType('voltage');
      },
      setType(type) {
        this._type = type;
        ['v','c'].forEach((m, i) => {
          const btn = document.getElementById('dv-'+m);
          if (btn) { btn.style.background = type === ['voltage','current'][i] ? 'var(--primary)' : 'var(--bg-secondary)'; btn.style.color = type === ['voltage','current'][i] ? 'white' : 'var(--text)'; }
        });
        const content = document.getElementById('dv-content');
        if (!content) return;
        if (type === 'voltage') {
          content.innerHTML = `
            <div class="grid grid-cols-3 gap-3">
              <div><label class="text-sm">电源 V (V)</label><input type="number" id="dv-vs" value="5" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">R₁ (Ω)</label><input type="number" id="dv-r1" value="1000" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">R₂ (Ω)</label><input type="number" id="dv-r2" value="2000" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            </div>
            <button onclick="Calculator._calculators.divider.calc()" class="w-full px-4 py-2 rounded font-medium mt-3" style="background:var(--primary);color:white">计算</button>
            <div id="dv-result" class="p-3 rounded mt-3" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>`;
        } else {
          content.innerHTML = `
            <div class="grid grid-cols-3 gap-3">
              <div><label class="text-sm">总电流 I (A)</label><input type="number" id="dv-it" value="0.5" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">R₁ (Ω)</label><input type="number" id="dv-r1" value="100" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">R₂ (Ω)</label><input type="number" id="dv-r2" value="200" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            </div>
            <button onclick="Calculator._calculators.divider.calc()" class="w-full px-4 py-2 rounded font-medium mt-3" style="background:var(--primary);color:white">计算</button>
            <div id="dv-result" class="p-3 rounded mt-3" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>`;
        }
      },
      calc() {
        const r1 = parseFloat(document.getElementById('dv-r1')?.value || 0);
        const r2 = parseFloat(document.getElementById('dv-r2')?.value || 0);
        const result = document.getElementById('dv-result');
        if (!result || r1 <= 0 || r2 <= 0) { result.innerHTML = '<span class="text-red-500">请输入有效电阻值</span>'; return; }
        if (this._type === 'voltage') {
          const vs = parseFloat(document.getElementById('dv-vs')?.value || 0);
          const v1 = vs * r1 / (r1 + r2);
          const v2 = vs * r2 / (r1 + r2);
          result.innerHTML = `<strong>串联分压</strong><br>R₁ 压降 V₁ = V×R₁/(R₁+R₂) = <strong>${v1.toFixed(4)} V</strong><br>R₂ 压降 V₂ = V×R₂/(R₁+R₂) = <strong>${v2.toFixed(4)} V</strong><br><span class="text-sm text-gray-500">回路电流 I = V/(R₁+R₂) = ${(vs/(r1+r2)).toFixed(6)} A</span>`;
        } else {
          const it = parseFloat(document.getElementById('dv-it')?.value || 0);
          const i1 = it * r2 / (r1 + r2);
          const i2 = it * r1 / (r1 + r2);
          result.innerHTML = `<strong>并联分流</strong><br>R₁ 支路 I₁ = I×R₂/(R₁+R₂) = <strong>${i1.toFixed(4)} A</strong><br>R₂ 支路 I₂ = I×R₁/(R₁+R₂) = <strong>${i2.toFixed(4)} A</strong><br><span class="text-sm text-gray-500">并联等效 R = R₁R₂/(R₁+R₂) = ${(r1*r2/(r1+r2)).toFixed(4)} Ω</span>`;
        }
      }
    },

    // ==================== RLC 谐振计算 ====================
    rlc: {
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="grid grid-cols-3 gap-3">
              <div><label class="text-sm">电阻 R (Ω)</label><input type="number" id="rlc-r" value="10" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">电感 L (μH)</label><input type="number" id="rlc-l" value="100" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">电容 C (pF)</label><input type="number" id="rlc-c" value="100" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            </div>
            <button onclick="Calculator._calculators.rlc.calc()" class="w-full px-4 py-2 rounded font-medium" style="background:var(--primary);color:white">计算</button>
            <div id="rlc-result" class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>
          </div>`;
      },
      calc() {
        const R = parseFloat(document.getElementById('rlc-r')?.value || 0);
        const L = parseFloat(document.getElementById('rlc-l')?.value || 0) * 1e-6;
        const C = parseFloat(document.getElementById('rlc-c')?.value || 0) * 1e-12;
        const result = document.getElementById('rlc-result');
        if (!result || L <= 0 || C <= 0) { result.innerHTML = '<span class="text-red-500">请输入有效的 L 和 C</span>'; return; }
        const f0 = 1 / (2 * Math.PI * Math.sqrt(L * C));
        const w0 = 1 / Math.sqrt(L * C);
        const Q = w0 * L / R;
        const BW = f0 / Q;
        const Zmax = L / (R * C);
        const fmt = (f) => f >= 1e6 ? (f/1e6).toFixed(3)+' MHz' : f >= 1e3 ? (f/1e3).toFixed(3)+' kHz' : f.toFixed(2)+' Hz';
        result.innerHTML = `<strong>RLC 谐振参数</strong><br>
          谐振频率 f₀ = 1/(2π√LC) = <strong>${fmt(f0)}</strong><br>
          角频率 ω₀ = <strong>${(w0/1000).toFixed(3)} krad/s</strong><br>
          品质因数 Q = ω₀L/R = <strong>${Q.toFixed(3)}</strong> ${Q > 0.707 ? '(欠阻尼)' : Q === 0.707 ? '(临界)' : '(过阻尼)'}<br>
          带宽 BW = f₀/Q = <strong>${fmt(BW)}</strong><br>
          谐振阻抗 |Z|max = L/(RC) = <strong>${Zmax.toFixed(2)} Ω</strong>`;
      }
    },

    // ==================== 滤波器设计 ====================
    filter: {
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="flex gap-2">
              <button onclick="Calculator._calculators.filter.setType('lp')" id="fl-lp" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">RC 低通</button>
              <button onclick="Calculator._calculators.filter.setType('hp')" id="fl-hp" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--bg-secondary);color:var(--text)">RC 高通</button>
            </div>
            <div class="info-box info"><div>模式 1：输入 R 和 C，计算截止频率 fc<br>模式 2：输入目标 fc 和 R，反推 C</div></div>
            <div class="grid grid-cols-3 gap-3">
              <div><label class="text-sm">R (Ω)</label><input type="number" id="fl-r" value="1000" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">C (μF)</label><input type="number" id="fl-c" value="1" step="any" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">fc (Hz)</label><input type="number" id="fl-fc" placeholder="?" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            </div>
            <div class="flex gap-2">
              <button onclick="Calculator._calculators.filter.calc('fc')" class="flex-1 px-3 py-2 rounded text-sm font-medium" style="background:var(--primary);color:white">由 R,C → fc</button>
              <button onclick="Calculator._calculators.filter.calc('c')" class="flex-1 px-3 py-2 rounded text-sm font-medium" style="background:var(--primary);color:white">由 fc,R → C</button>
            </div>
            <div id="fl-result" class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>
          </div>`;
      },
      setType(type) {
        this._type = type;
        ['lp','hp'].forEach((m, i) => {
          const btn = document.getElementById('fl-'+m);
          if (btn) { btn.style.background = type === ['lp','hp'][i] ? 'var(--primary)' : 'var(--bg-secondary)'; btn.style.color = type === ['lp','hp'][i] ? 'white' : 'var(--text)'; }
        });
      },
      calc(mode) {
        const R = parseFloat(document.getElementById('fl-r')?.value || 0);
        const result = document.getElementById('fl-result');
        if (!result || R <= 0) { result.innerHTML = '<span class="text-red-500">请输入有效电阻</span>'; return; }
        if (mode === 'fc') {
          const C = parseFloat(document.getElementById('fl-c')?.value || 0) * 1e-6;
          if (C <= 0) { result.innerHTML = '<span class="text-red-500">请输入有效电容</span>'; return; }
          const fc = 1 / (2 * Math.PI * R * C);
          result.innerHTML = `<strong>截止频率 fc = 1/(2πRC)</strong><br>fc = 1/(2π × ${R} × ${(C*1e6).toFixed(2)}μF) = <strong>${fc.toFixed(2)} Hz</strong><br><span class="text-sm text-gray-500">${this._type === 'lp' ? '低通' : '高通'}滤波器，-3dB 点 = ${fc.toFixed(2)} Hz</span>`;
        } else {
          const fc = parseFloat(document.getElementById('fl-fc')?.value || 0);
          if (fc <= 0) { result.innerHTML = '<span class="text-red-500">请输入目标频率</span>'; return; }
          const C = 1 / (2 * Math.PI * R * fc);
          result.innerHTML = `<strong>所需电容 C = 1/(2π·R·fc)</strong><br>C = 1/(2π × ${R} × ${fc}) = <strong>${(C*1e6).toFixed(4)} μF</strong> = ${(C*1e9).toFixed(2)} nF<br><span class="text-sm text-gray-500">建议选用 E12 标准值：${this.nearestE12(C*1e6)} μF</span>`;
        }
      },
      nearestE12(v) {
        const e12 = [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2];
        const exp = Math.floor(Math.log10(v));
        const norm = v / Math.pow(10, exp);
        let best = e12[0], bd = Infinity;
        for (const e of e12) { const d = Math.abs(e - norm); if (d < bd) { bd = d; best = e; } }
        return (best * Math.pow(10, exp)).toFixed(2);
      }
    },

    // ==================== dB 换算 ====================
    db: {
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="info-box info"><div><strong>功率比</strong>：dB = 10·log₁₀(P₂/P₁)<br><strong>电压比</strong>：dB = 20·log₁₀(V₂/V₁)</div></div>
            <div class="flex gap-2">
              <button onclick="Calculator._calculators.db.setMode('l2d')" id="db-l2d" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">比值→dB</button>
              <button onclick="Calculator._calculators.db.setMode('d2l')" id="db-d2l" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--bg-secondary);color:var(--text)">dB→比值</button>
            </div>
            <div id="db-content"></div>
          </div>`;
        this.setMode('l2d');
      },
      setMode(mode) {
        this._mode = mode;
        ['l2d','d2l'].forEach((m, i) => {
          const btn = document.getElementById('db-'+m);
          if (btn) { btn.style.background = mode === ['l2d','d2l'][i] ? 'var(--primary)' : 'var(--bg-secondary)'; btn.style.color = mode === ['l2d','d2l'][i] ? 'white' : 'var(--text)'; }
        });
        const content = document.getElementById('db-content');
        if (!content) return;
        if (mode === 'l2d') {
          content.innerHTML = `
            <div class="grid grid-cols-2 gap-3">
              <div><label class="text-sm">输入值</label><input type="number" id="db-in" value="2" step="any" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">类型</label><select id="db-type" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"><option value="power">功率比</option><option value="voltage">电压比</option></select></div>
            </div>
            <button onclick="Calculator._calculators.db.calc()" class="w-full px-4 py-2 rounded font-medium mt-3" style="background:var(--primary);color:white">计算 dB</button>
            <div id="db-result" class="p-3 rounded mt-3" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>`;
        } else {
          content.innerHTML = `
            <div class="grid grid-cols-2 gap-3">
              <div><label class="text-sm">dB 值</label><input type="number" id="db-in" value="-3" step="any" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">类型</label><select id="db-type" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"><option value="power">功率比</option><option value="voltage" selected>电压比</option></select></div>
            </div>
            <button onclick="Calculator._calculators.db.calc()" class="w-full px-4 py-2 rounded font-medium mt-3" style="background:var(--primary);color:white">计算比值</button>
            <div id="db-result" class="p-3 rounded mt-3" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>`;
        }
      },
      calc() {
        const val = parseFloat(document.getElementById('db-in')?.value || 0);
        const type = document.getElementById('db-type')?.value || 'power';
        const result = document.getElementById('db-result');
        if (!result) return;
        const k = type === 'power' ? 10 : 20;
        if (this._mode === 'l2d') {
          const dB = k * Math.log10(val);
          result.innerHTML = `<strong>${type === 'power' ? '功率' : '电压'}比 ${val} → ${dB.toFixed(3)} dB</strong><br><span class="text-sm text-gray-500">${type === 'power' ? '10·log₁₀' : '20·log₁₀'}(${val}) = ${dB.toFixed(3)}</span>`;
        } else {
          const ratio = Math.pow(10, val / k);
          result.innerHTML = `<strong>${val} dB → ${type === 'power' ? '功率' : '电压'}比 ${ratio.toFixed(6)}</strong><br><span class="text-sm text-gray-500">10^(${val}/${k}) = ${ratio.toFixed(6)}</span>`;
        }
      }
    },

    // ==================== 复数/相量计算 ====================
    complex: {
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border)">
                <div class="text-sm font-medium mb-2">输入 A</div>
                <div class="grid grid-cols-2 gap-2">
                  <input type="number" id="cx-a-re" value="3" placeholder="实部" class="px-2 py-1 rounded text-sm" style="border:1px solid var(--border);background:var(--bg)">
                  <input type="number" id="cx-a-im" value="4" placeholder="虚部" class="px-2 py-1 rounded text-sm" style="border:1px solid var(--border);background:var(--bg)">
                </div>
                <div class="text-xs text-gray-500 mt-1" id="cx-a-polar"></div>
              </div>
              <div class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border)">
                <div class="text-sm font-medium mb-2">输入 B</div>
                <div class="grid grid-cols-2 gap-2">
                  <input type="number" id="cx-b-re" value="1" placeholder="实部" class="px-2 py-1 rounded text-sm" style="border:1px solid var(--border);background:var(--bg)">
                  <input type="number" id="cx-b-im" value="2" placeholder="虚部" class="px-2 py-1 rounded text-sm" style="border:1px solid var(--border);background:var(--bg)">
                </div>
                <div class="text-xs text-gray-500 mt-1" id="cx-b-polar"></div>
              </div>
            </div>
            <div class="flex flex-wrap gap-2">
              <button onclick="Calculator._calculators.complex.calc('add')" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">A+B</button>
              <button onclick="Calculator._calculators.complex.calc('sub')" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">A-B</button>
              <button onclick="Calculator._calculators.complex.calc('mul')" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">A×B</button>
              <button onclick="Calculator._calculators.complex.calc('div')" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">A/B</button>
            </div>
            <div id="cx-result" class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>
          </div>`;
        this.updatePolar();
      },
      updatePolar() {
        const a = this.get('a'), b = this.get('b');
        const pa = document.getElementById('cx-a-polar');
        const pb = document.getElementById('cx-b-polar');
        if (pa) pa.textContent = `|A|=${a.mag.toFixed(3)}, ∠A=${a.ang.toFixed(2)}°`;
        if (pb) pb.textContent = `|B|=${b.mag.toFixed(3)}, ∠B=${b.ang.toFixed(2)}°`;
      },
      get(id) {
        const re = parseFloat(document.getElementById(`cx-${id}-re`)?.value || 0);
        const im = parseFloat(document.getElementById(`cx-${id}-im`)?.value || 0);
        return { re, im, mag: Math.sqrt(re*re + im*im), ang: Math.atan2(im, re) * 180 / Math.PI };
      },
      calc(op) {
        this.updatePolar();
        const a = this.get('a'), b = this.get('b');
        let re, im, sym;
        switch(op) {
          case 'add': re = a.re + b.re; im = a.im + b.im; sym = 'A + B'; break;
          case 'sub': re = a.re - b.re; im = a.im - b.im; sym = 'A - B'; break;
          case 'mul': re = a.re*b.re - a.im*b.im; im = a.re*b.im + a.im*b.re; sym = 'A × B'; break;
          case 'div': { const d = b.re*b.re + b.im*b.im; re = (a.re*b.re + a.im*b.im)/d; im = (a.im*b.re - a.re*b.im)/d; sym = 'A / B'; break; }
        }
        const mag = Math.sqrt(re*re + im*im);
        const ang = Math.atan2(im, re) * 180 / Math.PI;
        const fmt = (x) => Math.abs(x) < 1e-10 ? '0' : x.toFixed(4);
        document.getElementById('cx-result').innerHTML = `<strong>${sym} = ${fmt(re)} ${im >= 0 ? '+' : '-'} ${fmt(Math.abs(im))}i</strong><br><span class="text-sm text-gray-500">极坐标：|Z| = ${mag.toFixed(4)}, ∠Z = ${ang.toFixed(2)}°</span>`;
      }
    },

    // ==================== 采样频率 ====================
    sampling: {
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="info-box info"><div>奈奎斯特采样定理：fs ≥ 2·fmax<br>抗混叠滤波器截止频率建议 ≤ fs/2</div></div>
            <div class="grid grid-cols-2 gap-3">
              <div><label class="text-sm">信号最高频率 fmax (Hz)</label><input type="number" id="sp-fmax" value="1000" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">ADC 采样率 fs (Hz)</label><input type="number" id="sp-fs" value="8000" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            </div>
            <button onclick="Calculator._calculators.sampling.calc()" class="w-full px-4 py-2 rounded font-medium" style="background:var(--primary);color:white">计算</button>
            <div id="sp-result" class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>
          </div>`;
      },
      calc() {
        const fmax = parseFloat(document.getElementById('sp-fmax')?.value || 0);
        const fs = parseFloat(document.getElementById('sp-fs')?.value || 0);
        const result = document.getElementById('sp-result');
        if (!result || fmax <= 0 || fs <= 0) { result.innerHTML = '<span class="text-red-500">请输入有效频率</span>'; return; }
        const nyquist = 2 * fmax;
        const ok = fs >= nyquist;
        const aliasRisk = fs < nyquist;
        const fcAlias = fs / 2;
        const fmt = (f) => f >= 1e6 ? (f/1e6).toFixed(2)+' MHz' : f >= 1e3 ? (f/1e3).toFixed(2)+' kHz' : f.toFixed(1)+' Hz';
        result.innerHTML = `<strong>采样分析</strong><br>
          奈奎斯特频率 = 2×fmax = <strong>${fmt(nyquist)}</strong><br>
          实际采样率 fs = <strong>${fmt(fs)}</strong><br>
          ${ok ? '<span style="color:var(--success)">✅ 满足奈奎斯特定理（fs ≥ 2·fmax）</span>' : '<span style="color:var(--danger)">❌ 不满足！会发生频谱混叠（fs < 2·fmax）</span>'}<br>
          抗混叠建议：低通滤波器 fc ≤ <strong>${fmt(fcAlias)}</strong>（fs/2）<br>
          <span class="text-sm text-gray-500">分辨率（1 位）= fs⁻¹ = ${(1000/fs).toFixed(3)} ms</span>`;
      }
    },

    // ==================== Z 变换查表 ====================
    zTransform: {
      _data: [
        { time: 'δ(n)', z: '1', note: '单位冲激' },
        { time: 'δ(n-k)', z: 'z⁻ᵏ', note: '延时 k 步' },
        { time: 'u(n) 或 1', z: 'z/(z-1)', note: '单位阶跃' },
        { time: 'aⁿu(n)', z: 'z/(z-a)', note: '指数序列' },
        { time: 'n·u(n)', z: 'z/(z-1)²', note: '斜坡序列' },
        { time: 'n·aⁿu(n)', z: 'az/(z-a)²', note: '' },
        { time: 'n²·u(n)', z: 'z(z+1)/(z-1)³', note: '' },
        { time: 'cos(ω₀n)u(n)', z: 'z(z-cosω₀)/(z²-2zcosω₀+1)', note: '' },
        { time: 'sin(ω₀n)u(n)', z: 'zsinω₀/(z²-2zcosω₀+1)', note: '' },
        { time: 'aⁿcos(ω₀n)u(n)', z: 'z(z-acosω₀)/(z²-2azcosω₀+a²)', note: '' },
        { time: 'aⁿsin(ω₀n)u(n)', z: 'azsinω₀/(z²-2azcosω₀+a²)', note: '' },
        { time: '(n+1)aⁿu(n)', z: 'z²/(z-a)²', note: '' },
      ],
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <input type="text" id="zt-search" placeholder="搜索时域或 Z 域函数..." oninput="Calculator._calculators.zTransform.filter(this.value)"
              class="w-full px-3 py-2 rounded" style="border:1px solid var(--border);background:var(--bg)">
            <div class="overflow-x-auto">
              <table class="compare-table w-full">
                <thead><tr><th>x(n)</th><th>X(z)</th><th>备注</th></tr></thead>
                <tbody id="zt-table">
                  ${this._data.map(d => `<tr><td class="font-mono">${d.time}</td><td class="font-mono">${d.z}</td><td>${d.note}</td></tr>`).join('')}
                </tbody>
              </table>
            </div>
            <div class="info-box info">
              <div><strong>常用性质</strong>：线性、时移（左移 z·X(z)-zx(0)、右移 z⁻¹X(z)）、z 域尺度 aⁿ→X(z/a)、初值 x(0)=lim X(z)（z→∞）、终值 x(∞)=lim (z-1)X(z)/z（z→1）</div>
            </div>
          </div>`;
      },
      filter(keyword) {
        const tbody = document.getElementById('zt-table');
        if (!tbody) return;
        const kw = keyword.toLowerCase();
        tbody.innerHTML = this._data
          .filter(d => d.time.toLowerCase().includes(kw) || d.z.toLowerCase().includes(kw) || d.note.toLowerCase().includes(kw))
          .map(d => `<tr><td class="font-mono">${d.time}</td><td class="font-mono">${d.z}</td><td>${d.note}</td></tr>`)
          .join('');
      }
    },

    // ==================== 状态空间求解 ====================
    statespace: {
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="info-box info"><div>输入 2×2 系统矩阵 A（二阶系统），自动计算特征值（极点）、迹、行列式、稳定性。</div></div>
            <div>
              <div class="text-sm font-medium mb-2">系统矩阵 A（2×2）</div>
              <div class="inline-grid gap-2" style="grid-template-columns:repeat(2,5rem)">
                <input type="number" id="ss-00" value="0" class="text-center py-1 rounded" style="border:1px solid var(--border);background:var(--bg)">
                <input type="number" id="ss-01" value="1" class="text-center py-1 rounded" style="border:1px solid var(--border);background:var(--bg)">
                <input type="number" id="ss-10" value="-2" class="text-center py-1 rounded" style="border:1px solid var(--border);background:var(--bg)">
                <input type="number" id="ss-11" value="-3" class="text-center py-1 rounded" style="border:1px solid var(--border);background:var(--bg)">
              </div>
            </div>
            <button onclick="Calculator._calculators.statespace.calc()" class="w-full px-4 py-2 rounded font-medium" style="background:var(--primary);color:white">分析系统</button>
            <div id="ss-result" class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>
          </div>`;
      },
      calc() {
        const a = parseFloat(document.getElementById('ss-00')?.value || 0);
        const b = parseFloat(document.getElementById('ss-01')?.value || 0);
        const c = parseFloat(document.getElementById('ss-10')?.value || 0);
        const d = parseFloat(document.getElementById('ss-11')?.value || 0);
        const result = document.getElementById('ss-result');
        if (!result) return;
        const tr = a + d;
        const det = a * d - b * c;
        const disc = tr * tr - 4 * det;
        let eigen, stable;
        if (disc >= 0) {
          const s1 = (tr + Math.sqrt(disc)) / 2;
          const s2 = (tr - Math.sqrt(disc)) / 2;
          eigen = [s1, s2];
          stable = s1 < 0 && s2 < 0;
        } else {
          const re = tr / 2;
          const im = Math.sqrt(-disc) / 2;
          eigen = [`${re.toFixed(4)}±${im.toFixed(4)}i`];
          stable = re < 0;
        }
        const eigenStr = disc >= 0 ? `λ₁ = ${eigen[0].toFixed(4)}, λ₂ = ${eigen[1].toFixed(4)}` : `λ = ${eigen[0]}`;
        result.innerHTML = `<strong>系统分析结果</strong><br>
          迹 tr(A) = <strong>${tr.toFixed(4)}</strong><br>
          行列式 |A| = <strong>${det.toFixed(4)}</strong><br>
          特征值（极点）：${eigenStr}<br>
          <span style="color:${stable?'var(--success)':'var(--danger)'}"><strong>${stable ? '✅ 系统渐近稳定' : '❌ 系统不稳定'}（所有特征值实部为负 ⟺ 稳定）</strong></span>`;
      }
    },

    // ==================== 状态空间设计器（极点配置 / 观测器 / LQR 三合一） ====================
    statespaceDesign: {
      _presets: {
        gantry: { A: [[0, 1], [0, -5]], B: [0, 2.5], C: [1, 0], cp: [[-10, 10], [-10, -10]], op: [[-15, 0], [-15, 0]], q1: 10000, q2: 4, r: 0.04, x0: [0.01, 0] },
        dblint: { A: [[0, 1], [0, 0]], B: [0, 1], C: [1, 0], cp: [[-1, 1], [-1, -1]], op: [[-3, 0], [-3, 0]], q1: 1, q2: 1, r: 1, x0: [1, 0] }
      },
      render(el) {
        const num = (id, v) => `<input type="number" step="any" id="${id}" value="${v}" class="w-full text-center py-1 rounded" style="border:1px solid var(--border);background:var(--bg)">`;
        el.innerHTML = `
          <div class="space-y-4">
            <div class="info-box info"><div>二阶单输入系统三合一设计：<strong>① 极点配置</strong>——Ackermann 公式求状态反馈增益 K；<strong>② 观测器</strong>——对偶极点配置求增益 L；<strong>③ LQR</strong>——Newton 迭代解 Riccati 方程求最优增益。默认值即写字机笔架例题，与 mct-06/07/08 正文数值一致。</div></div>
            <div class="flex gap-2 items-center flex-wrap">
              <select id="sd-preset" class="px-2 py-1.5 rounded text-sm" style="border:1px solid var(--border);background:var(--bg)">
                <option value="gantry">🖋️ 写字机笔架（mct-06/07/08 例题）</option>
                <option value="dblint">📐 双积分器（教材经典系统）</option>
              </select>
              <button onclick="Calculator._calculators.statespaceDesign.loadPreset()" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">载入预置</button>
            </div>
            <div class="grid grid-cols-3 gap-3">
              <div>
                <div class="text-xs text-gray-500 mb-1">系统矩阵 A（2×2）</div>
                <div class="grid grid-cols-2 gap-1">${num('sd-a00', 0)}${num('sd-a01', 1)}${num('sd-a10', 0)}${num('sd-a11', -5)}</div>
              </div>
              <div>
                <div class="text-xs text-gray-500 mb-1">输入矩阵 B（2×1）</div>
                <div class="grid grid-cols-1 gap-1">${num('sd-b0', 0)}${num('sd-b1', 2.5)}</div>
              </div>
              <div>
                <div class="text-xs text-gray-500 mb-1">输出矩阵 C（1×2）</div>
                <div class="grid grid-cols-2 gap-1">${num('sd-c0', 1)}${num('sd-c1', 0)}</div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <div class="text-xs text-gray-500 mb-1">控制器期望极点 μ₁ / μ₂（实部，虚部）</div>
                <div class="grid grid-cols-2 gap-1">${num('sd-p1r', -10)}${num('sd-p1i', 10)}${num('sd-p2r', -10)}${num('sd-p2i', -10)}</div>
                <div class="text-xs text-gray-500 mt-1">笔架默认 -10±j10（σ%≤5%、ts≤0.4s 反算）；共轭对虚部互为相反数，重根两行相同</div>
              </div>
              <div>
                <div class="text-xs text-gray-500 mb-1">观测器期望极点 ν₁ / ν₂（实部，虚部）</div>
                <div class="grid grid-cols-2 gap-1">${num('sd-o1r', -15)}${num('sd-o1i', 0)}${num('sd-o2r', -15)}${num('sd-o2i', 0)}</div>
                <div class="text-xs text-gray-500 mt-1">经验规则：比控制器主导极点快 2~5 倍（笔架取 -15, -15）</div>
              </div>
            </div>
            <div class="grid grid-cols-4 gap-2">
              <div><div class="text-xs text-gray-500 mb-1">LQR q₁</div>${num('sd-lq1', 10000)}</div>
              <div><div class="text-xs text-gray-500 mb-1">q₂</div>${num('sd-lq2', 4)}</div>
              <div><div class="text-xs text-gray-500 mb-1">R（&gt;0）</div>${num('sd-lr', 0.04)}</div>
              <div class="text-xs text-gray-500" style="align-self:end">Q = diag(q₁,q₂)，R 为标量</div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div><div class="text-xs text-gray-500 mb-1">初始状态 x₀(1)（笔架=位置偏差 m）</div>${num('sd-x01', 0.01)}</div>
              <div><div class="text-xs text-gray-500 mb-1">x₀(2)（笔架=速度 m/s）</div>${num('sd-x02', 0)}</div>
            </div>
            <button onclick="Calculator._calculators.statespaceDesign.calc()" class="w-full px-4 py-2 rounded font-medium" style="background:var(--primary);color:white">开始设计（K + L + LQR）</button>
            <div id="sd-result"></div>
          </div>`;
      },
      loadPreset() {
        const p = this._presets[document.getElementById('sd-preset')?.value || 'gantry'];
        if (!p) return;
        const set = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
        set('sd-a00', p.A[0][0]); set('sd-a01', p.A[0][1]); set('sd-a10', p.A[1][0]); set('sd-a11', p.A[1][1]);
        set('sd-b0', p.B[0]); set('sd-b1', p.B[1]); set('sd-c0', p.C[0]); set('sd-c1', p.C[1]);
        set('sd-p1r', p.cp[0][0]); set('sd-p1i', p.cp[0][1]); set('sd-p2r', p.cp[1][0]); set('sd-p2i', p.cp[1][1]);
        set('sd-o1r', p.op[0][0]); set('sd-o1i', p.op[0][1]); set('sd-o2r', p.op[1][0]); set('sd-o2i', p.op[1][1]);
        set('sd-lq1', p.q1); set('sd-lq2', p.q2); set('sd-lr', p.r);
        set('sd-x01', p.x0[0]); set('sd-x02', p.x0[1]);
        this.calc();
      },
      calc() {
        const result = document.getElementById('sd-result');
        if (!result) return;
        const val = id => parseFloat(document.getElementById(id)?.value);
        const A = [[val('sd-a00'), val('sd-a01')], [val('sd-a10'), val('sd-a11')]];
        const b = [val('sd-b0'), val('sd-b1')], c = [val('sd-c0'), val('sd-c1')];
        if (A.flat().some(isNaN) || b.some(isNaN) || c.some(isNaN)) {
          result.innerHTML = '<span class="text-red-500">请输入完整的 A、B、C 矩阵</span>'; return;
        }
        const x0 = [val('sd-x01'), val('sd-x02')];
        const link = (id, txt) => `<a href="javascript:void(0)" onclick="Calculator.close();App.loadDetail('${id}')" style="color:var(--primary)">${txt}</a>`;
        let html = '';

        // ① 极点配置（mct-06）
        const pk = this._ackermann2(A, b, { re: val('sd-p1r'), im: val('sd-p1i') }, { re: val('sd-p2r'), im: val('sd-p2i') });
        html += `<div class="p-3 rounded mb-3" style="background:var(--bg-secondary);border:1px solid var(--border)">
          <div class="font-medium mb-2" style="color:var(--primary)">① 极点配置 u = −Kx（mct-06）</div>`;
        if (pk.err) {
          html += `<span class="text-red-500">✗ ${pk.err}</span></div>`;
        } else {
          const [k1, k2] = pk.K;
          const Acl = [[A[0][0] - b[0] * k1, A[0][1] - b[0] * k2], [A[1][0] - b[1] * k1, A[1][1] - b[1] * k2]];
          const lam = this._eig2(Acl);
          html += `能控性：det[b, Ab] = ${this._fx(pk.detC)} ≠ 0 → rank 𝒞 = 2，<strong>完全能控 ✓</strong>（能控才能配）<br>
            Ackermann：K = [0 1]·𝒞⁻¹·α<sub>d</sub>(A) = <strong>[${this._fx(k1)}, ${this._fx(k2)}]</strong><br>
            闭环 A−BK = ${this._m2(Acl)}，极点 <strong>${lam.map(l => this._fc(l)).join('，')}</strong><br>
            ${this._perf(lam) ? this._perf(lam) + '<br>' : ''}初始偏差 x₀ = (${this._fx(x0[0])}, ${this._fx(x0[1])}) 时反馈量 u(0) = K·x₀ = <strong>${this._fx(k1 * x0[0] + k2 * x0[1])}</strong>（B 的输入单位，笔架为 N——增益是否激进一目了然）
            <div class="text-xs text-gray-500 mt-1">原理与手算过程：${link('mct-06', 'mct-06 状态反馈与极点配置')}</div></div>`;
        }

        // ② 观测器（mct-07，对偶极点配置）
        const AT = [[A[0][0], A[1][0]], [A[0][1], A[1][1]]];
        const ol = this._ackermann2(AT, c, { re: val('sd-o1r'), im: val('sd-o1i') }, { re: val('sd-o2r'), im: val('sd-o2i') });
        html += `<div class="p-3 rounded mb-3" style="background:var(--bg-secondary);border:1px solid var(--border)">
          <div class="font-medium mb-2" style="color:var(--primary)">② 观测器增益 L（mct-07，对偶原理）</div>`;
        if (ol.err) {
          html += `<span class="text-red-500">✗ ${ol.err.replace('不能控', '不能观').replace('det[b,Ab]', 'det[C;CA]')}</span></div>`;
        } else {
          const [l1, l2] = ol.K;
          const Aol = [[A[0][0] - l1 * c[0], A[0][1] - l1 * c[1]], [A[1][0] - l2 * c[0], A[1][1] - l2 * c[1]]];
          const lam = this._eig2(Aol);
          html += `能观性：det[C; CA] = ${this._fx(c[0] * (c[0] * A[0][1] + c[1] * A[1][1]) - c[1] * (c[0] * A[0][0] + c[1] * A[1][0]))} ≠ 0 → <strong>完全能观 ✓</strong><br>
            对偶设计：L = (Aᵀ, Cᵀ) 极点配置的 Kᵀ = <strong>[${this._fx(l1)}, ${this._fx(l2)}]ᵀ</strong><br>
            观测器闭环 A−LC = ${this._m2(Aol)}，极点 <strong>${lam.map(l => this._fc(l)).join('，')}</strong>（估计误差按此速率收敛）<br>
            分离原理：整个闭环极点 = {A−BK} ∪ {A−LC}，K 与 L 可独立设计
            <div class="text-xs text-gray-500 mt-1">原理与手算过程：${link('mct-07', 'mct-07 观测器设计')}</div></div>`;
        }

        // ③ LQR（mct-08）
        const lq = this._care2(A, b, val('sd-lq1'), val('sd-lq2'), val('sd-lr'));
        html += `<div class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border)">
          <div class="font-medium mb-2" style="color:var(--primary)">③ LQR 最优增益（mct-08，Riccati）</div>`;
        if (lq.err) {
          html += `<span class="text-red-500">✗ ${lq.err}</span></div>`;
        } else {
          const { P, K } = lq;
          const Acl = [[A[0][0] - b[0] * K[0], A[0][1] - b[0] * K[1]], [A[1][0] - b[1] * K[0], A[1][1] - b[1] * K[1]]];
          const lam = this._eig2(Acl);
          const Js = P[0][0] * x0[0] * x0[0] + 2 * P[0][1] * x0[0] * x0[1] + P[1][1] * x0[1] * x0[1];
          html += `Riccati 解 P = ${this._m2(P)}（正定 ✓）<br>
            最优增益 K = R⁻¹BᵀP = <strong>[${this._fx(K[0])}, ${this._fx(K[1])}]</strong><br>
            闭环 A−BK 极点 <strong>${lam.map(l => this._fc(l)).join('，')}</strong>，${this._perf(lam)}<br>
            最优代价 J* = x₀ᵀPx₀ = <strong>${this._fx(Js)}</strong>（任何其他线性控制律代价 ≥ 此值）<br>
            u(0) = K·x₀ = <strong>${this._fx(K[0] * x0[0] + K[1] * x0[1])}</strong>（笔架例：恰好用满 5N 推力预算——Bryson 权重的物理含义）
            <div class="text-xs text-gray-500 mt-1">Bryson 法则与调参方向：${link('mct-08', 'mct-08 最优控制基础')}</div></div>`;
        }
        result.innerHTML = html;
      },

      // ---- 纯数学方法（无 DOM，可独立测试） ----
      _fx(v) {
        if (v === null || v === undefined || !isFinite(v)) return '—';
        if (Math.abs(v) < 1e-12) return '0';
        const a = Math.abs(v);
        return a >= 1e5 || a < 1e-4 ? v.toExponential(3) : String(parseFloat(v.toPrecision(6)));
      },
      _fc(z) {
        if (Math.abs(z.im) < 1e-10) return this._fx(z.re);
        return `${this._fx(z.re)} ${z.im > 0 ? '+' : '-'} ${this._fx(Math.abs(z.im))}j`;
      },
      _m2(M) {
        return `[[${this._fx(M[0][0])}, ${this._fx(M[0][1])}], [${this._fx(M[1][0])}, ${this._fx(M[1][1])}]]`;
      },
      _eig2(M) {
        const tr = M[0][0] + M[1][1], det = M[0][0] * M[1][1] - M[0][1] * M[1][0];
        const d = tr * tr - 4 * det;
        if (d >= 0) { const s = Math.sqrt(d); return [{ re: (tr + s) / 2, im: 0 }, { re: (tr - s) / 2, im: 0 }]; }
        const s = Math.sqrt(-d);
        return [{ re: tr / 2, im: s / 2 }, { re: tr / 2, im: -s / 2 }];
      },
      _perf(lams) {
        const c = lams.find(l => Math.abs(l.im) > 1e-9);
        if (!c || c.re >= 0) return '';
        const wn = Math.hypot(c.re, c.im), z = -c.re / wn;
        if (z <= 0 || z >= 1) return '';
        return `ζ = ${this._fx(z)}，ωn = ${this._fx(wn)} rad/s，σ% = ${this._fx(100 * Math.exp(-Math.PI * z / Math.sqrt(1 - z * z)))}%，ts(2%) = ${this._fx(4 / (z * wn))}s`;
      },
      // Ackermann 公式（2×2 单输入）：K = [0 1]·Cm⁻¹·αd(A)，返回 {K, detC} 或 {err}
      _ackermann2(A, b, m1, m2) {
        const sumIm = m1.im + m2.im;
        const prodRe = m1.re * m2.re - m1.im * m2.im, prodIm = m1.re * m2.im + m1.im * m2.re;
        if (Math.abs(sumIm) > 1e-9 || Math.abs(prodIm) > 1e-9) return { err: '期望极点须为实数或共轭成对（两虚部互为相反数）' };
        const a1 = -(m1.re + m2.re), a0 = prodRe;
        const Ab = [A[0][0] * b[0] + A[0][1] * b[1], A[1][0] * b[0] + A[1][1] * b[1]];
        const detC = b[0] * Ab[1] - Ab[0] * b[1];
        if (Math.abs(detC) < 1e-10) return { detC, err: '系统不能控（det[b,Ab]≈0），极点不可任意配置' };
        const A2 = [
          [A[0][0] * A[0][0] + A[0][1] * A[1][0], A[0][0] * A[0][1] + A[0][1] * A[1][1]],
          [A[1][0] * A[0][0] + A[1][1] * A[1][0], A[1][0] * A[0][1] + A[1][1] * A[1][1]]
        ];
        const alpha = [
          [A2[0][0] + a1 * A[0][0] + a0, A2[0][1] + a1 * A[0][1]],
          [A2[1][0] + a1 * A[1][0], A2[1][1] + a1 * A[1][1] + a0]
        ];
        // Cm⁻¹ = (1/detC)·[[Ab1, -Ab0], [-b1, b0]]，K 取 Cm⁻¹·α(A) 的第 2 行
        const inv10 = -b[1] / detC, inv11 = b[0] / detC;
        return { K: [inv10 * alpha[0][0] + inv11 * alpha[1][0], inv10 * alpha[0][1] + inv11 * alpha[1][1]], detC };
      },
      // 2×2 单输入 CARE：AᵀP+PA−PBR⁻¹BᵀP+Q=0（Q 取对角），Newton 迭代 + 回溯
      _care2(A, b, q1, q2, r) {
        if (!isFinite(q1) || !isFinite(q2) || !(r > 0)) return { err: 'q₁、q₂、R 须为有效数值且 R > 0' };
        const resid = p => {
          const [p11, p12, p22] = p;
          const pb0 = p11 * b[0] + p12 * b[1], pb1 = p12 * b[0] + p22 * b[1];
          return [
            2 * (A[0][0] * p11 + A[1][0] * p12) - pb0 * pb0 / r + q1,
            A[0][1] * p11 + (A[0][0] + A[1][1]) * p12 + A[1][0] * p22 - pb0 * pb1 / r,
            2 * (A[0][1] * p12 + A[1][1] * p22) - pb1 * pb1 / r + q2
          ];
        };
        const det3 = M => M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
        // 多个起点依次尝试（量级悬殊的 Q/R 下初值影响收敛性）
        const starts = [
          [Math.max(Math.abs(q1), 1), 0, Math.max(Math.abs(q2), 1)],
          [Math.sqrt(Math.max(q1, 1)), 0, Math.sqrt(Math.max(q2, 1))],
          [1, 0, 1]
        ];
        let p = null;
        for (const p0 of starts) {
          let cur = p0.slice(), ok = false;
          const n0 = Math.hypot(...resid(cur));
          const tol = n0 * 1e-13 + 1e-12; // 尺度感知容差
          for (let it = 0; it < 300; it++) {
            const f0 = resid(cur), nf = Math.hypot(f0[0], f0[1], f0[2]);
            if (nf < tol) { ok = true; break; }
            const h = 1e-7 * Math.max(1, Math.hypot(cur[0], cur[1], cur[2]));
            const J = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            for (let j = 0; j < 3; j++) {
              const pp = cur.slice(); pp[j] += h;
              const fp = resid(pp);
              for (let i = 0; i < 3; i++) J[i][j] = (fp[i] - f0[i]) / h; // J[i][j] = ∂f_i/∂p_j
            }
            const D = det3(J);
            if (!isFinite(D) || Math.abs(D) < 1e-14) break;
            const dp = [0, 1, 2].map(i => {
              const M = J.map((row, k) => row.map((v, j) => j === i ? -f0[k] : v));
              return det3(M) / D;
            });
            let t = 1, stepped = false;
            for (let ls = 0; ls < 60; ls++) {
              const pn = [cur[0] + t * dp[0], cur[1] + t * dp[1], cur[2] + t * dp[2]];
              const fn = resid(pn);
              if (Math.hypot(fn[0], fn[1], fn[2]) < nf) { cur = pn; stepped = true; break; }
              t /= 2;
            }
            if (!stepped) break;
          }
          if (ok) { p = cur; break; }
        }
        if (!p) return { err: 'Riccati 迭代不收敛，请调整 Q/R 量级（或检查 (A,B) 是否可镇定）' };
        const [p11, p12, p22] = p;
        if (p11 <= 0 || p11 * p22 - p12 * p12 <= 0) return { err: 'Riccati 解非正定——(A,B) 可能不可镇定' };
        return {
          P: [[p11, p12], [p12, p22]],
          K: [(p11 * b[0] + p12 * b[1]) / r, (p12 * b[0] + p22 * b[1]) / r]
        };
      }
    },

    // ==================== 连续系统离散化（ZOH 精确） ====================
    zohDiscretize: {
      _presets: {
        gantry: { A: [[0, 1], [0, -5]], B: [0, 2.5], Ts: 0.01, K: [80, 6] },
        dblint: { A: [[0, 1], [0, 0]], B: [0, 1], Ts: 0.1, K: [1, 1.7320508] }
      },
      render(el) {
        const num = (id, v) => `<input type="number" step="any" id="${id}" value="${v}" class="w-full text-center py-1 rounded" style="border:1px solid var(--border);background:var(--bg)">`;
        el.innerHTML = `
          <div class="space-y-4">
            <div class="info-box info"><div>零阶保持器（ZOH）精确离散化：x<sub>k+1</sub> = G·x<sub>k</sub> + H·u<sub>k</sub>，其中 G = e<sup>ATs</sup>，H = ∫₀<sup>Ts</sup>e<sup>Aτ</sup>dτ·B。采用<strong>增广矩阵指数法</strong>——A 奇异（如含积分器的笔架模型）也精确，无需 A⁻¹。默认值即 mct-10 笔架例题（Ts=0.01s，100Hz）。</div></div>
            <div class="flex gap-2 items-center flex-wrap">
              <select id="zd-preset" class="px-2 py-1.5 rounded text-sm" style="border:1px solid var(--border);background:var(--bg)">
                <option value="gantry">🖋️ 写字机笔架 Ts=0.01s（mct-10 例题）</option>
                <option value="dblint">📐 双积分器 Ts=0.1s</option>
              </select>
              <button onclick="Calculator._calculators.zohDiscretize.loadPreset()" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">载入预置</button>
            </div>
            <div class="grid grid-cols-3 gap-3">
              <div>
                <div class="text-xs text-gray-500 mb-1">系统矩阵 A（2×2）</div>
                <div class="grid grid-cols-2 gap-1">${num('zd-a00', 0)}${num('zd-a01', 1)}${num('zd-a10', 0)}${num('zd-a11', -5)}</div>
              </div>
              <div>
                <div class="text-xs text-gray-500 mb-1">输入矩阵 B（2×1）</div>
                <div class="grid grid-cols-1 gap-1">${num('zd-b0', 0)}${num('zd-b1', 2.5)}</div>
              </div>
              <div>
                <div class="text-xs text-gray-500 mb-1">采样周期 Ts（s）</div>
                ${num('zd-ts', 0.01)}
                <div class="text-xs text-gray-500 mt-1">反馈增益 K₁ / K₂（留空跳过闭环）</div>
                <div class="grid grid-cols-2 gap-1 mt-1">${num('zd-k1', 80)}${num('zd-k2', 6)}</div>
              </div>
            </div>
            <button onclick="Calculator._calculators.zohDiscretize.calc()" class="w-full px-4 py-2 rounded font-medium" style="background:var(--primary);color:white">离散化</button>
            <div id="zd-result"></div>
          </div>`;
      },
      loadPreset() {
        const p = this._presets[document.getElementById('zd-preset')?.value || 'gantry'];
        if (!p) return;
        const set = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
        set('zd-a00', p.A[0][0]); set('zd-a01', p.A[0][1]); set('zd-a10', p.A[1][0]); set('zd-a11', p.A[1][1]);
        set('zd-b0', p.B[0]); set('zd-b1', p.B[1]);
        set('zd-ts', p.Ts); set('zd-k1', p.K[0]); set('zd-k2', p.K[1]);
        this.calc();
      },
      calc() {
        const result = document.getElementById('zd-result');
        if (!result) return;
        const val = id => parseFloat(document.getElementById(id)?.value);
        const A = [[val('zd-a00'), val('zd-a01')], [val('zd-a10'), val('zd-a11')]];
        const b = [val('zd-b0'), val('zd-b1')], Ts = val('zd-ts');
        if (A.flat().some(isNaN) || b.some(isNaN) || !(Ts > 0)) {
          result.innerHTML = '<span class="text-red-500">请输入有效的 A、B 矩阵和采样周期 Ts &gt; 0</span>'; return;
        }
        const { G, H } = this._zoh(A, b, Ts);
        const lamA = this._eig2(A), lamG = this._eig2(G);
        const maxAbsG = Math.max(...lamG.map(l => Math.hypot(l.re, l.im)));
        const openVerdict = maxAbsG < 1 - 1e-9 ? '<span style="color:var(--success)"><strong>✅ 单位圆内，渐近稳定</strong></span>'
          : maxAbsG > 1 + 1e-9 ? '<span style="color:var(--danger)"><strong>❌ 单位圆外，不稳定</strong></span>'
          : '<span style="color:#f59e0b"><strong>🟡 |λ|=1 临界（含积分器/虚轴极点属正常）</strong></span>';
        let html = `<div class="p-3 rounded mb-3" style="background:var(--bg-secondary);border:1px solid var(--border)">
          <div class="font-medium mb-2" style="color:var(--primary)">ZOH 离散化结果（mct-10）</div>
          G = e<sup>ATs</sup> = <strong>${this._m2(G)}</strong><br>
          H = ∫₀<sup>Ts</sup>e<sup>Aτ</sup>dτ·B = <strong>[${this._fx(H[0])}, ${this._fx(H[1])}]ᵀ</strong><br>
          离散方程：x<sub>k+1</sub> = G·x<sub>k</sub> + H·u<sub>k</sub>（u 在每个采样周期内保持不变——正是定时器中断里 u 的用法）
        </div>
        <div class="p-3 rounded mb-3" style="background:var(--bg-secondary);border:1px solid var(--border)">
          <div class="font-medium mb-2" style="color:var(--primary)">开环极点映射对拍</div>`;
        for (let i = 0; i < 2; i++) {
          const mapped = this._cexp({ re: lamA[i].re * Ts, im: lamA[i].im * Ts });
          html += `λ<sub>c${i + 1}</sub>(A) = ${this._fc(lamA[i])} → e<sup>λTs</sup> = ${this._fc(mapped)}，实际 λ<sub>d</sub>(G) = ${this._fc(lamG[i])} <span style="color:var(--success)">✓</span><br>`;
        }
        html += `|λ|<sub>max</sub> = ${this._fx(maxAbsG)}，${openVerdict}
          <div class="text-xs text-gray-500 mt-1">ZOH 的精确性质：离散极点恒等于 e^(连续极点×Ts)——两条路算出的数一致说明 G 算对了</div>
        </div>`;

        // 闭环（把连续 K 搬进定时器）
        const k1 = val('zd-k1'), k2 = val('zd-k2');
        if (!isNaN(k1) && !isNaN(k2)) {
          const K = [k1, k2];
          const Gcl = [[G[0][0] - H[0] * K[0], G[0][1] - H[0] * K[1]], [G[1][0] - H[1] * K[0], G[1][1] - H[1] * K[1]]];
          const lamD = this._eig2(Gcl);
          const maxAbsD = Math.max(...lamD.map(l => Math.hypot(l.re, l.im)));
          const clVerdict = maxAbsD < 1 ? '<span style="color:var(--success)"><strong>✅ 单位圆内，闭环稳定</strong></span>' : '<span style="color:var(--danger)"><strong>❌ 单位圆外，闭环不稳定</strong></span>';
          const Acl = [[A[0][0] - b[0] * K[0], A[0][1] - b[0] * K[1]], [A[1][0] - b[1] * K[0], A[1][1] - b[1] * K[1]]];
          const lamC = this._eig2(Acl);
          const maxAng = Math.max(...lamC.map(l => Math.hypot(l.re, l.im)));
          const fsNeed = 10 * maxAng / (2 * Math.PI), fs = 1 / Ts;
          html += `<div class="p-3 rounded mb-3" style="background:var(--bg-secondary);border:1px solid var(--border)">
            <div class="font-medium mb-2" style="color:var(--primary)">闭环 G−HK（emulation：连续 K 直接进定时器）</div>
            λ(G−HK) = <strong>${lamD.map(l => this._fc(l)).join('，')}</strong>，|λ|<sub>max</sub> = ${this._fx(maxAbsD)}，${clVerdict}<br>`;
          for (let i = 0; i < 2; i++) {
            const ref = this._cexp({ re: lamC[i].re * Ts, im: lamC[i].im * Ts });
            html += `对照连续设计：λ<sub>c</sub>(A−BK) = ${this._fc(lamC[i])} → e<sup>λTs</sup> = ${this._fc(ref)}（emulation 偏差 O(Ts²)，采样越快越吻合）<br>`;
          }
          html += `采样率校核：闭环 |λ<sub>c</sub>|<sub>max</sub> ≈ ${this._fx(maxAng)} rad/s → 建议 f<sub>s</sub> ≥ 10×带宽 ≈ <strong>${this._fx(fsNeed)} Hz</strong>；当前 f<sub>s</sub> = <strong>${this._fx(fs)} Hz</strong> ${fs >= fsNeed ? '<span style="color:var(--success)">✓ 达标</span>' : '<span style="color:var(--danger)">✗ 偏低</span>'}
          </div>`;
        }
        html += `<div class="text-xs text-gray-500 p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border)">推导、采样周期权衡与 1kHz 中断落地代码：<a href="javascript:void(0)" onclick="Calculator.close();App.loadDetail('mct-10')" style="color:var(--primary)">mct-10 离散状态空间</a>；K 从 <a href="javascript:void(0)" onclick="Calculator.close();App.loadDetail('mct-06')" style="color:var(--primary)">mct-06 极点配置</a> 或 <a href="javascript:void(0)" onclick="Calculator.close();App.loadDetail('mct-08')" style="color:var(--primary)">mct-08 LQR</a> 来，L 见 <a href="javascript:void(0)" onclick="Calculator.close();App.loadDetail('mct-07')" style="color:var(--primary)">mct-07 观测器</a>。</div>`;
        result.innerHTML = html;
      },

      // ---- 纯数学方法（无 DOM，可独立测试） ----
      _fx(v) {
        if (v === null || v === undefined || !isFinite(v)) return '—';
        if (Math.abs(v) < 1e-12) return '0';
        const a = Math.abs(v);
        return a >= 1e5 || a < 1e-4 ? v.toExponential(3) : String(parseFloat(v.toPrecision(6)));
      },
      _fc(z) {
        if (Math.abs(z.im) < 1e-10) return this._fx(z.re);
        return `${this._fx(z.re)} ${z.im > 0 ? '+' : '-'} ${this._fx(Math.abs(z.im))}j`;
      },
      _m2(M) {
        return `[[${this._fx(M[0][0])}, ${this._fx(M[0][1])}], [${this._fx(M[1][0])}, ${this._fx(M[1][1])}]]`;
      },
      _eig2(M) {
        const tr = M[0][0] + M[1][1], det = M[0][0] * M[1][1] - M[0][1] * M[1][0];
        const d = tr * tr - 4 * det;
        if (d >= 0) { const s = Math.sqrt(d); return [{ re: (tr + s) / 2, im: 0 }, { re: (tr - s) / 2, im: 0 }]; }
        const s = Math.sqrt(-d);
        return [{ re: tr / 2, im: s / 2 }, { re: tr / 2, im: -s / 2 }];
      },
      _cexp(z) {
        const e = Math.exp(z.re);
        return { re: e * Math.cos(z.im), im: e * Math.sin(z.im) };
      },
      _mul(X, Y) {
        const R = Array.from({ length: X.length }, () => new Array(Y[0].length).fill(0));
        for (let i = 0; i < X.length; i++)
          for (let j = 0; j < Y[0].length; j++)
            for (let l = 0; l < Y.length; l++) R[i][j] += X[i][l] * Y[l][j];
        return R;
      },
      _matExp(M) {
        const n = M.length;
        let nrm = 0;
        M.forEach(r => r.forEach(v => nrm = Math.max(nrm, Math.abs(v))));
        let k = 0;
        if (nrm > 0.5) k = Math.ceil(Math.log2(nrm / 0.5));
        const Ms = M.map(r => r.map(v => v / Math.pow(2, k)));
        let E = M.map((r, i) => r.map((_, j) => i === j ? 1 : 0));
        let T = M.map((r, i) => r.map((_, j) => i === j ? 1 : 0));
        for (let i = 1; i <= 40; i++) {
          T = this._mul(T, Ms).map(r => r.map(v => v / i));
          E = E.map((r, a) => r.map((v, b) => v + T[a][b]));
          let tmax = 0;
          T.forEach(r => r.forEach(v => tmax = Math.max(tmax, Math.abs(v))));
          if (tmax < 1e-18) break;
        }
        for (let i = 0; i < k; i++) E = this._mul(E, E);
        return E;
      },
      // 增广矩阵指数法：exp([[A,B],[0,0]]·Ts) 的右上块即 [G, H]
      _zoh(A, b, Ts) {
        const M = [
          [A[0][0] * Ts, A[0][1] * Ts, b[0] * Ts],
          [A[1][0] * Ts, A[1][1] * Ts, b[1] * Ts],
          [0, 0, 0]
        ];
        const E = this._matExp(M);
        return { G: [[E[0][0], E[0][1]], [E[1][0], E[1][1]]], H: [E[0][2], E[1][2]] };
      }
    },

    // ==================== 位运算可视化 ====================
    bitwise: {
      _a: 0b10110010,
      _b: 0b01101001,
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="space-y-3">
              <div><div class="text-sm font-medium">操作数 A</div><div id="bw-a-bits" class="flex flex-wrap"></div></div>
              <div><div class="text-sm font-medium">操作数 B</div><div id="bw-b-bits" class="flex flex-wrap"></div></div>
            </div>
            <div class="grid grid-cols-2 gap-3 text-center">
              <div><div class="text-xs text-gray-500">A (十进制)</div><input type="number" id="bw-a-val" value="178" class="w-full px-2 py-1 rounded text-center" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><div class="text-xs text-gray-500">B (十进制)</div><input type="number" id="bw-b-val" value="105" class="w-full px-2 py-1 rounded text-center" style="border:1px solid var(--border);background:var(--bg)"></div>
            </div>
            <button onclick="Calculator._calculators.bitwise.update()" class="w-full px-4 py-2 rounded font-medium" style="background:var(--primary);color:white">更新操作数</button>
            <div class="flex flex-wrap gap-2">
              <button onclick="Calculator._calculators.bitwise.op('and')" class="flex-1 px-3 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">A AND B</button>
              <button onclick="Calculator._calculators.bitwise.op('or')" class="flex-1 px-3 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">A OR B</button>
              <button onclick="Calculator._calculators.bitwise.op('xor')" class="flex-1 px-3 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">A XOR B</button>
              <button onclick="Calculator._calculators.bitwise.op('not')" class="flex-1 px-3 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">NOT A</button>
              <button onclick="Calculator._calculators.bitwise.op('shl')" class="flex-1 px-3 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">A&lt;&lt;1</button>
              <button onclick="Calculator._calculators.bitwise.op('shr')" class="flex-1 px-3 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">A&gt;&gt;1</button>
            </div>
            <div id="bw-result" class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>
          </div>`;
        this.renderBits('bw-a-bits', this._a);
        this.renderBits('bw-b-bits', this._b);
      },
      renderBits(id, val) {
        const el = document.getElementById(id);
        if (!el) return;
        let bits = '';
        for (let i = 7; i >= 0; i--) {
          const bit = (val >> i) & 1;
          bits += `<div class="bit-cell ${bit ? 'one' : 'zero'}">${bit}</div>`;
        }
        const hex = '0x' + (val & 0xFF).toString(16).toUpperCase().padStart(2, '0');
        el.innerHTML = bits + `<div class="ml-2 font-mono text-sm" style="align-self:center">${hex}</div>`;
      },
      update() {
        this._a = parseInt(document.getElementById('bw-a-val')?.value || 0) & 0xFF;
        this._b = parseInt(document.getElementById('bw-b-val')?.value || 0) & 0xFF;
        this.renderBits('bw-a-bits', this._a);
        this.renderBits('bw-b-bits', this._b);
      },
      op(type) {
        this.update();
        let r, sym, desc;
        switch(type) {
          case 'and': r = this._a & this._b; sym = 'A AND B'; desc = `逐位与：两个都为 1 才为 1`; break;
          case 'or': r = this._a | this._b; sym = 'A OR B'; desc = `逐位或：任一个为 1 即为 1`; break;
          case 'xor': r = this._a ^ this._b; sym = 'A XOR B'; desc = `逐位异或：不同为 1，相同为 0`; break;
          case 'not': r = (~this._a) & 0xFF; sym = 'NOT A'; desc = `逐位取反`; break;
          case 'shl': r = (this._a << 1) & 0xFF; sym = 'A << 1'; desc = `左移 1 位（乘 2）`; break;
          case 'shr': r = this._a >> 1; sym = 'A >> 1'; desc = `右移 1 位（整除 2）`; break;
        }
        const hex = '0x' + (r & 0xFF).toString(16).toUpperCase().padStart(2, '0');
        let bits = '';
        for (let i = 7; i >= 0; i--) bits += `<div class="bit-cell ${(r>>i)&1?'one':'zero'}">${(r>>i)&1}</div>`;
        document.getElementById('bw-result').innerHTML = `<strong>${sym}</strong><br><div class="flex flex-wrap mt-2">${bits}</div><div class="mt-2 font-mono">结果 = ${r} (${hex})</div><div class="text-sm text-gray-500">${desc}</div>`;
      }
    },

    // ==================== IP 子网划分 ====================
    subnet: {
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div><label class="text-sm">IP 地址</label><input type="text" id="sn-ip" value="192.168.1.100" class="w-full px-3 py-2 rounded mt-1 font-mono" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">CIDR 前缀 (/n)</label><input type="number" id="sn-cidr" value="24" min="1" max="32" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            </div>
            <button onclick="Calculator._calculators.subnet.calc()" class="w-full px-4 py-2 rounded font-medium" style="background:var(--primary);color:white">计算子网</button>
            <div id="sn-result" class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>
          </div>`;
      },
      calc() {
        const ipStr = document.getElementById('sn-ip')?.value?.trim() || '';
        const cidr = parseInt(document.getElementById('sn-cidr')?.value || 24);
        const result = document.getElementById('sn-result');
        if (!result) return;
        const parts = ipStr.split('.').map(Number);
        if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
          result.innerHTML = '<span class="text-red-500">IP 地址格式错误</span>'; return;
        }
        if (cidr < 1 || cidr > 32) { result.innerHTML = '<span class="text-red-500">CIDR 范围 1-32</span>'; return; }
        const ipInt = (parts[0]<<24) | (parts[1]<<16) | (parts[2]<<8) | parts[3];
        const mask = cidr === 0 ? 0 : (0xFFFFFFFF << (32 - cidr)) >>> 0;
        const net = (ipInt & mask) >>> 0;
        const broadcast = (net | (~mask >>> 0)) >>> 0;
        const hostBits = 32 - cidr;
        const totalHosts = hostBits === 0 ? 1 : Math.pow(2, hostBits);
        const usableHosts = totalHosts > 2 ? totalHosts - 2 : totalHosts;
        const ip2str = (v) => [(v>>>24)&0xFF, (v>>>16)&0xFF, (v>>>8)&0xFF, v&0xFF].join('.');
        const maskStr = ip2str(mask);
        const firstHost = hostBits >= 2 ? (net + 1) >>> 0 : net;
        const lastHost = hostBits >= 2 ? (broadcast - 1) >>> 0 : broadcast;
        result.innerHTML = `<strong>子网信息</strong><br>
          网络地址：<strong>${ip2str(net)}/${cidr}</strong><br>
          子网掩码：<strong>${maskStr}</strong><br>
          广播地址：<strong>${ip2str(broadcast)}</strong><br>
          主机范围：<strong>${ip2str(firstHost)} ~ ${ip2str(lastHost)}</strong><br>
          可用主机数：<strong>${usableHosts}</strong>（总 ${totalHosts}，去网络号和广播）`;
      }
    },

    // ==================== 电机参数 ====================
    motor: {
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="flex gap-2">
              <button onclick="Calculator._calculators.motor.setType('power')" id="mt-p" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">转速-转矩-功率</button>
              <button onclick="Calculator._calculators.motor.setType('stepper')" id="mt-s" class="px-3 py-1.5 rounded text-sm font-medium" style="background:var(--bg-secondary);color:var(--text)">步进脉冲</button>
            </div>
            <div id="mt-content"></div>
          </div>`;
        this.setType('power');
      },
      setType(type) {
        this._type = type;
        ['p','s'].forEach((m, i) => {
          const btn = document.getElementById('mt-'+m);
          if (btn) { btn.style.background = type === ['power','stepper'][i] ? 'var(--primary)' : 'var(--bg-secondary)'; btn.style.color = type === ['power','stepper'][i] ? 'white' : 'var(--text)'; }
        });
        const content = document.getElementById('mt-content');
        if (!content) return;
        if (type === 'power') {
          content.innerHTML = `
            <div class="info-box info"><div>公式：P = T × ω = T × 2πn / 60<br>P(W) = T(N·m) × n(RPM) × 2π / 60</div></div>
            <div class="grid grid-cols-2 gap-3">
              <div><label class="text-sm">转速 n (RPM)</label><input type="number" id="mt-rpm" value="3000" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">扭矩 T (N·m)</label><input type="number" id="mt-torque" value="0.5" step="any" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            </div>
            <button onclick="Calculator._calculators.motor.calc()" class="w-full px-4 py-2 rounded font-medium mt-3" style="background:var(--primary);color:white">计算功率</button>
            <div id="mt-result" class="p-3 rounded mt-3" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>`;
        } else {
          content.innerHTML = `
            <div class="info-box info"><div>步进电机：脉冲数 → 角度 / 转速<br>角度 = 脉冲数 × 步距角<br>转速 = 脉冲频率 × 步距角 × 60 / 360</div></div>
            <div class="grid grid-cols-2 gap-3">
              <div><label class="text-sm">步距角 (°)</label><input type="number" id="mt-angle" value="1.8" step="any" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">脉冲频率 (Hz)</label><input type="number" id="mt-freq" value="1000" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">脉冲数</label><input type="number" id="mt-pulses" value="200" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">细分数</label><input type="number" id="mt-micro" value="1" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            </div>
            <button onclick="Calculator._calculators.motor.calc()" class="w-full px-4 py-2 rounded font-medium mt-3" style="background:var(--primary);color:white">计算</button>
            <div id="mt-result" class="p-3 rounded mt-3" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>`;
        }
      },
      calc() {
        const result = document.getElementById('mt-result');
        if (!result) return;
        if (this._type === 'power') {
          const n = parseFloat(document.getElementById('mt-rpm')?.value || 0);
          const T = parseFloat(document.getElementById('mt-torque')?.value || 0);
          const P = T * n * 2 * Math.PI / 60;
          result.innerHTML = `<strong>机械功率</strong><br>P = T × 2πn / 60 = ${T} × 2π × ${n} / 60 = <strong>${P.toFixed(3)} W</strong> = ${(P/1000).toFixed(4)} kW<br><span class="text-sm text-gray-500">${(P/746).toFixed(4)} 马力 (HP)</span>`;
        } else {
          const angle = parseFloat(document.getElementById('mt-angle')?.value || 1.8);
          const freq = parseFloat(document.getElementById('mt-freq')?.value || 0);
          const pulses = parseFloat(document.getElementById('mt-pulses')?.value || 0);
          const micro = parseFloat(document.getElementById('mt-micro')?.value || 1);
          const effAngle = angle / micro;
          const totalAngle = pulses * effAngle;
          const revolutions = totalAngle / 360;
          const rpm = freq * effAngle * 60 / 360;
          result.innerHTML = `<strong>步进电机计算</strong><br>
            有效步距角 = ${angle}°/${micro} = <strong>${effAngle.toFixed(4)}°</strong><br>
            总角度 = ${pulses} × ${effAngle.toFixed(4)}° = <strong>${totalAngle.toFixed(2)}°</strong> (${revolutions.toFixed(3)} 圈)<br>
            转速 = ${freq} × ${effAngle.toFixed(2)} × 60 / 360 = <strong>${rpm.toFixed(2)} RPM</strong>`;
        }
      }
    },

    // ==================== ADC 分辨率计算（嵌入式） ====================
    adcCalc: {
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="info-box info"><div>ADC 位分辨率 N 决定量化精度：LSB = V<sub>ref</sub> / 2<sup>N</sup>。位每加 1，分辨率翻倍。理论动态范围 DR = 6.02N + 1.76 dB。</div></div>
            <div class="grid grid-cols-2 gap-3">
              <div><label class="text-sm">分辨率位数 N</label>
                <select id="adc-n" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)">
                  <option value="8">8 位</option><option value="10">10 位</option>
                  <option value="12" selected>12 位</option><option value="14">14 位</option>
                  <option value="16">16 位</option><option value="20">20 位</option><option value="24">24 位</option>
                </select></div>
              <div><label class="text-sm">参考电压 V<sub>ref</sub> (V)</label>
                <select id="adc-vref" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)">
                  <option value="5">5.0 (经典 5V)</option>
                  <option value="3.3" selected>3.3 (STM32)</option>
                  <option value="2.5">2.5 (精密基准)</option>
                  <option value="1.2">1.2 (带隙)</option>
                  <option value="custom">自定义...</option>
                </select></div>
            </div>
            <div id="adc-vref-custom" style="display:none"><label class="text-sm">自定义 V<sub>ref</sub> (V)</label>
              <input type="number" id="adc-vref-val" value="3.3" step="0.01" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            <div><label class="text-sm">输入模式</label>
              <select id="adc-mode" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)">
                <option value="single">单端（量程 0 ~ V<sub>ref</sub>）</option>
                <option value="diff">差分（量程 ±V<sub>ref</sub>）</option>
              </select></div>
            <button onclick="Calculator._calculators.adcCalc.calc()" class="w-full px-4 py-2 rounded font-medium" style="background:var(--primary);color:white">计算</button>
            <div id="adc-result" class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>
          </div>`;
        // 自定义 Vref 显隐
        document.getElementById('adc-vref')?.addEventListener('change', e => {
          document.getElementById('adc-vref-custom').style.display = (e.target.value === 'custom') ? 'block' : 'none';
        });
      },
      calc() {
        const N = parseInt(document.getElementById('adc-n')?.value || 12);
        const vrefSel = document.getElementById('adc-vref')?.value || '3.3';
        const Vref = vrefSel === 'custom' ? parseFloat(document.getElementById('adc-vref-val')?.value || 3.3) : parseFloat(vrefSel);
        const mode = document.getElementById('adc-mode')?.value || 'single';
        const result = document.getElementById('adc-result');
        if (!result || N <= 0 || Vref <= 0) { result.innerHTML = '<span class="text-red-500">请输入有效参数</span>'; return; }

        const levels = Math.pow(2, N);
        const LSB = Vref / levels;                          // 量化阶
        const quantErr = 0.5 * LSB;                          // 量化误差 ±0.5 LSB
        const DR = 6.02 * N + 1.76;                          // 理论 SINAD / 动态范围 (dB)
        const ENOB = (DR - 1.76) / 6.02;                     // 等效位数
        const range = mode === 'single' ? `0 ~ ${Vref} V` : `±${Vref} V`;

        // 格式化电压：μV / mV / V
        const fmtV = v => {
          if (v >= 1) return v.toFixed(4) + ' V';
          if (v >= 0.001) return (v * 1000).toFixed(3) + ' mV';
          return (v * 1e6).toFixed(2) + ' μV';
        };

        result.innerHTML = `
          <div class="space-y-1">
            <strong>核心结果（${N} 位 / V<sub>ref</sub>=${Vref}V / ${mode === 'single' ? '单端' : '差分'}）</strong><br>
            量化级数 2<sup>${N}</sup> = <strong>${levels.toLocaleString()}</strong> 级<br>
            量程 = <strong>${range}</strong><br>
            LSB = V<sub>ref</sub>/2<sup>${N}</sup> = ${Vref}/${levels.toLocaleString()} = <strong>${fmtV(LSB)}</strong><br>
            量化误差 ±½LSB = <strong>${fmtV(quantErr)}</strong>
          </div>
          <div class="mt-2 pt-2 border-t" style="border-color:var(--border)">
            <span class="text-sm text-gray-500">
              理论动态范围 DR = 6.02×${N} + 1.76 = <strong>${DR.toFixed(2)} dB</strong><br>
              （实际受噪声/非线性影响，等效位数 ENOB ≈ <strong>${ENOB.toFixed(2)} 位</strong>，通常比标称低 1~2 位）
            </span>
          </div>`;
      }
    },

    // ==================== LED 限流电阻（嵌入式） ====================
    ledResistor: {
      // E24 标称值基数（× 10^k）
      _e24: [1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1],
      // 找 ≥ r 的最小 E24 标称值
      _e24Pick(r) {
        if (r <= 0) return null;
        const decade = Math.pow(10, Math.floor(Math.log10(r)));
        const norm = r / decade;
        for (const d = 0; d < 3; d++) {  // 最多跨 3 个数量级
          for (const base of this._e24) {
            const v = base * decade * Math.pow(10, d);
            if (v >= r * 0.9999) return v;
          }
        }
        return null;
      },
      // 格式化电阻：Ω/kΩ/MΩ
      _fmtR(r) {
        if (r >= 1e6) return (r / 1e6).toFixed(2) + ' MΩ';
        if (r >= 1e3) return (r / 1e3).toFixed(2) + ' kΩ';
        return r.toFixed(2) + ' Ω';
      },
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="info-box info"><div>LED 限流电阻：R = (V<sub>s</sub> - n·V<sub>f</sub>) / I<sub>f</sub>。串联 LED 数 n 不能使 n·V<sub>f</sub> ≥ V<sub>s</sub>。</div></div>
            <div class="grid grid-cols-2 gap-3">
              <div><label class="text-sm">电源电压 V<sub>s</sub> (V)</label>
                <input type="number" id="lr-vs" value="5" step="0.1" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">LED 正向压降 V<sub>f</sub> (V)</label>
                <select id="lr-vf" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)">
                  <option value="2.0" selected>2.0 (红/黄)</option>
                  <option value="3.0">3.0 (绿/蓝)</option>
                  <option value="3.2">3.2 (白/蓝)</option>
                  <option value="custom">自定义...</option>
                </select></div>
            </div>
            <div id="lr-vf-custom" style="display:none"><label class="text-sm">自定义 V<sub>f</sub> (V)</label>
              <input type="number" id="lr-vf-val" value="2.0" step="0.1" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            <div class="grid grid-cols-2 gap-3">
              <div><label class="text-sm">正向电流 I<sub>f</sub> (mA)</label>
                <input type="number" id="lr-if" value="20" step="1" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">串联 LED 数 n</label>
                <input type="number" id="lr-n" value="1" min="1" step="1" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            </div>
            <button onclick="Calculator._calculators.ledResistor.calc()" class="w-full px-4 py-2 rounded font-medium" style="background:var(--primary);color:white">计算</button>
            <div id="lr-result" class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>
          </div>`;
        document.getElementById('lr-vf')?.addEventListener('change', e => {
          document.getElementById('lr-vf-custom').style.display = (e.target.value === 'custom') ? 'block' : 'none';
        });
      },
      calc() {
        const Vs = parseFloat(document.getElementById('lr-vs')?.value || 0);
        const vfSel = document.getElementById('lr-vf')?.value || '2.0';
        const Vf = vfSel === 'custom' ? parseFloat(document.getElementById('lr-vf-val')?.value || 0) : parseFloat(vfSel);
        const If_mA = parseFloat(document.getElementById('lr-if')?.value || 0);
        const n = parseInt(document.getElementById('lr-n')?.value || 1);
        const result = document.getElementById('lr-result');
        if (!result) return;
        if (Vs <= 0 || Vf <= 0 || If_mA <= 0 || n <= 0) {
          result.innerHTML = '<span class="text-red-500">请输入有效参数（均须 &gt; 0）</span>'; return;
        }
        const If = If_mA / 1000;  // A
        const VfTotal = n * Vf;
        if (Vs <= VfTotal) {
          result.innerHTML = `<span class="text-red-500">⚠ 电压不足：V<sub>s</sub>=${Vs}V ≤ n·V<sub>f</sub>=${VfTotal}V，无法点亮 ${n} 个 LED。请提高电源电压或减少串联数。</span>`;
          return;
        }
        const R = (Vs - VfTotal) / If;
        const P = If * If * R;
        const e24 = this._e24Pick(R);

        let html = `
          <div class="space-y-1">
            <strong>核心结果</strong><br>
            R = (V<sub>s</sub> - n·V<sub>f</sub>)/I<sub>f</sub> = (${Vs} - ${n}×${Vf})/${If_mA}mA<br>
            　 = (${Vs - VfTotal})/${If_mA}mA = <strong>${this._fmtR(R)}</strong><br>
            电阻功耗 P = I<sub>f</sub>²·R = ${If_mA}²×${this._fmtR(R)} = <strong>${(P * 1000).toFixed(2)} mW</strong>
          </div>`;
        if (e24) {
          const iE24 = (e24 * If * If).toFixed(4);
          const iReal = (Vs - VfTotal) / e24 * 1000;
          html += `
          <div class="mt-2 pt-2 border-t" style="border-color:var(--border)">
            <strong>选型建议</strong>（E24 标准系列）：<br>
            最近标称值 <strong>${this._fmtR(e24)}</strong>　<span class="text-sm text-gray-500">(取 ≥ 计算值，确保电流不过载)</span><br>
            <span class="text-sm text-gray-500">选用该值时：实际电流 I = ${(Vs - VfTotal)}/${this._fmtR(e24)} = <strong>${iReal.toFixed(2)} mA</strong>，功耗 ${(iE24 * 1000).toFixed(2)} mW</span>
          </div>`;
        }
        if (R < 10) {
          html += `<div class="mt-2"><span class="text-sm" style="color:#f59e0b">⚠ R &lt; 10Ω，电流接近或超过 LED 额定，建议加恒流驱动而非简单限流电阻。</span></div>`;
        }
        result.innerHTML = html;
      }
    },

    // ==================== 电池续航估算（嵌入式） ====================
    batteryLife: {
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="info-box info"><div>理论续航 t = 容量 × η / 负载电流。实际受放电倍率 C 影响：C &gt; 2 时有效容量下降。η 为转换效率（LDO ~60%，DC-DC ~90%）。</div></div>
            <div class="grid grid-cols-2 gap-3">
              <div><label class="text-sm">电池容量 (mAh)</label>
                <input type="number" id="bl-cap" value="2000" step="100" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">标称电压 (V)</label>
                <input type="number" id="bl-v" value="3.7" step="0.1" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div><label class="text-sm">平均负载 (mA)</label>
                <input type="number" id="bl-load" value="100" step="10" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">转换效率 η (%)</label>
                <input type="number" id="bl-eff" value="85" min="10" max="100" step="5" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            </div>
            <button onclick="Calculator._calculators.batteryLife.calc()" class="w-full px-4 py-2 rounded font-medium" style="background:var(--primary);color:white">计算</button>
            <div id="bl-result" class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>
          </div>`;
      },
      calc() {
        const cap = parseFloat(document.getElementById('bl-cap')?.value || 0);
        const V = parseFloat(document.getElementById('bl-v')?.value || 0);
        const load = parseFloat(document.getElementById('bl-load')?.value || 0);
        const eff = parseFloat(document.getElementById('bl-eff')?.value || 85);
        const result = document.getElementById('bl-result');
        if (!result) return;
        if (cap <= 0 || V <= 0 || load <= 0) {
          result.innerHTML = '<span class="text-red-500">请输入有效参数（均须 &gt; 0）</span>'; return;
        }
        const eta = Math.max(10, Math.min(100, eff)) / 100;
        const t_h = cap * eta / load;             // 理论时长（小时）
        const C = load / cap;                       // 放电倍率
        const Wh = cap * V / 1000;                  // 瓦时
        // 大电流下有效容量折减
        let effFactor = 1.0;
        let rateNote = '';
        if (C > 2) { effFactor = 0.7; rateNote = '⚠ 放电倍率 C &gt; 2（大电流），实际容量约打 7 折'; }
        else if (C > 0.5) { effFactor = 0.85; rateNote = 'ℹ 放电倍率 0.5 &lt; C ≤ 2（中等损耗），实际容量约打 85 折'; }
        else { rateNote = '✓ 放电倍率 C ≤ 0.5（小电流），基本无损耗'; }
        const t_real = t_h * effFactor;

        // 格式化时长：h / 天
        const fmtT = h => {
          if (h >= 72) return (h / 24).toFixed(2) + ' 天 (' + h.toFixed(1) + ' h)';
          if (h >= 1) return h.toFixed(2) + ' 小时';
          return (h * 60).toFixed(1) + ' 分钟';
        };

        result.innerHTML = `
          <div class="space-y-1">
            <strong>核心结果</strong><br>
            理论时长 t = 容量×η/负载 = ${cap}×${(eta*100).toFixed(0)}%/${load} = <strong>${fmtT(t_h)}</strong><br>
            电池能量 = 容量×电压 = ${cap}×${V}/1000 = <strong>${Wh.toFixed(2)} Wh</strong><br>
            放电倍率 C = 负载/容量 = ${load}/${cap} = <strong>${C.toFixed(2)}C</strong>
          </div>
          <div class="mt-2 pt-2 border-t" style="border-color:var(--border)">
            <strong>实际估算</strong>：<br>
            考虑倍率损耗后实际续航 ≈ <strong>${fmtT(t_real)}</strong><br>
            <span class="text-sm text-gray-500">${rateNote}</span><br>
            <span class="text-sm text-gray-500">注：另需扣除自放电（锂电 ~2%/月）、温度影响（低温容量降 10~30%）、老化（500 周期后约 80%）。</span>
          </div>`;
      }
    },

    // ==================== PWM 参数计算（嵌入式） ====================
    pwmCalc: {
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="info-box info"><div>PWM 频率 f = f<sub>clk</sub> / ((PSC+1)·(ARR+1))。占空比 = CCR/(ARR+1)。建议 ARR ≥ 100 以保证占空比精度，且 PSC、ARR 不超过定时器位宽（16 位 ≤ 65535）。</div></div>
            <div class="grid grid-cols-2 gap-3">
              <div><label class="text-sm">定时器时钟 (MHz)</label>
                <select id="pw-clk" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)">
                  <option value="72" selected>72 (STM32F1 APB1)</option>
                  <option value="84">84 (STM32F4 APB1)</option>
                  <option value="168">168 (STM32F4 APB2)</option>
                  <option value="16">16 (Arduino UNO)</option>
                  <option value="custom">自定义...</option>
                </select></div>
              <div><label class="text-sm">定时器位宽</label>
                <select id="pw-bits" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)">
                  <option value="16" selected>16 位 (max 65535)</option>
                  <option value="32">32 位 (max 4294967295)</option>
                  <option value="8">8 位 (max 255)</option>
                </select></div>
            </div>
            <div id="pw-clk-custom" style="display:none"><label class="text-sm">自定义时钟 (MHz)</label>
              <input type="number" id="pw-clk-val" value="72" step="1" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            <div><label class="text-sm">目标 PWM 频率 (Hz)</label>
              <select id="pw-freq-preset" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)">
                <option value="custom" selected>自定义...</option>
                <option value="50">50 (舵机/伺服)</option>
                <option value="1000">1k (电机调速)</option>
                <option value="10000">10k (开关电源)</option>
                <option value="20000">20k (BLDC/SMD 焊台)</option>
                <option value="38000">38k (IR 红外)</option>
              </select>
              <input type="number" id="pw-freq" value="1000" step="1" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg);margin-top:0.5rem"></div>
            <button onclick="Calculator._calculators.pwmCalc.calc()" class="w-full px-4 py-2 rounded font-medium" style="background:var(--primary);color:white">计算最佳 PSC / ARR</button>
            <div id="pw-result" class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>
          </div>`;
        document.getElementById('pw-clk')?.addEventListener('change', e => {
          document.getElementById('pw-clk-custom').style.display = (e.target.value === 'custom') ? 'block' : 'none';
        });
        document.getElementById('pw-freq-preset')?.addEventListener('change', e => {
          if (e.target.value !== 'custom') {
            document.getElementById('pw-freq').value = e.target.value;
          }
        });
      },
      calc() {
        const clkSel = document.getElementById('pw-clk')?.value || '72';
        const clk_MHz = clkSel === 'custom' ? parseFloat(document.getElementById('pw-clk-val')?.value || 72) : parseFloat(clkSel);
        const bits = parseInt(document.getElementById('pw-bits')?.value || 16);
        const freq = parseFloat(document.getElementById('pw-freq')?.value || 1000);
        const result = document.getElementById('pw-result');
        if (!result) return;
        if (clk_MHz <= 0 || freq <= 0) {
          result.innerHTML = '<span class="text-red-500">请输入有效参数（时钟和频率均须 &gt; 0）</span>'; return;
        }
        const clk = clk_MHz * 1e6;   // Hz
        const maxN = Math.pow(2, bits) - 1;   // PSC/ARR 上限
        // 总分频比
        const totalDiv = clk / freq;  // (PSC+1)(ARR+1)
        if (totalDiv < 1) {
          result.innerHTML = `<span class="text-red-500">⚠ 目标频率 ${freq}Hz 高于时钟 ${clk_MHz}MHz，无法实现。</span>`;
          return;
        }
        // 寻找最优 (PSC, ARR) 组合：优先 ARR 较大（占空比精度高），且 PSC 最小
        // 遍历 PSC，求 ARR = totalDiv/(PSC+1) - 1，取整后校验
        let best = null;
        for (let PSC = 0; PSC <= maxN; PSC++) {
          const arrIdeal = totalDiv / (PSC + 1) - 1;
          if (arrIdeal < 1) break;          // ARR 太小，停止（继续增大 PSC 只会更小）
          const ARR = Math.round(arrIdeal);
          if (ARR < 1 || ARR > maxN) continue;
          const fReal = clk / ((PSC + 1) * (ARR + 1));
          const err = Math.abs(fReal - freq) / freq;
          // 评分：误差小、ARR 大优先
          const score = err * 1e6 - ARR;    // 误差占主导，ARR 大者加分（score 小为优）
          if (!best || score < best.score) {
            best = { PSC, ARR, fReal, err, score };
          }
          // 若 ARR 已 ≥ 500（精度足够），且误差很小，可提前停止
          if (ARR >= 500 && err < 0.0005) break;
        }

        if (!best) {
          result.innerHTML = `<span class="text-red-500">⚠ 无法在 ${bits} 位定时器范围内找到合适的 PSC/ARR 组合（总分频比 ${totalDiv.toFixed(0)} 过大）。请降低目标频率或换 32 位定时器。</span>`;
          return;
        }

        const dutyStep = 100 / (best.ARR + 1);   // 占空比分辨率 %
        // 推荐 CCR 示例：50% 占空比
        const ccr50 = Math.round((best.ARR + 1) / 2);

        result.innerHTML = `
          <div class="space-y-1">
            <strong>推荐参数</strong>（${bits} 位定时器，时钟 ${clk_MHz} MHz，目标 ${freq} Hz）<br>
            <span style="font-size:1.1em">PSC = <strong>${best.PSC}</strong>　ARR = <strong>${best.ARR}</strong></span><br>
            实际频率 f = ${clk_MHz}e6/((PSC+1)(ARR+1)) = ${clk_MHz}e6/(${best.PSC+1}×${best.ARR+1})<br>
            　 = <strong>${best.fReal.toFixed(3)} Hz</strong>　<span class="text-sm text-gray-500">(误差 ${(best.err*100).toFixed(4)}%)</span>
          </div>
          <div class="mt-2 pt-2 border-t" style="border-color:var(--border)">
            <strong>占空比设置</strong>：<br>
            占空比分辨率 = 100/(ARR+1) = 100/${best.ARR+1} = <strong>${dutyStep.toFixed(3)}%</strong><br>
            <span class="text-sm text-gray-500">50% 占空比 → CCR = ${ccr50}（取值范围 0 ~ ${best.ARR}）</span>
          </div>`;
        if (best.ARR < 100) {
          result.innerHTML += `<div class="mt-2"><span class="text-sm" style="color:#f59e0b">⚠ ARR = ${best.ARR} 偏小，占空比精度仅 ${dutyStep.toFixed(2)}%，建议降低目标频率或提高时钟以增大 ARR。</span></div>`;
        }
      }
    },

    // ==================== 串口调试助手（嵌入式，双模式） ====================
    // 独立 CRC 查找表（不依赖 validator.js 闭包）
    uartDebug: {
      // —— 运行时状态 ——
      _mode: 'sim',              // 'sim' 模拟模式（默认） | 'real' Web Serial 真机模式
      _port: null,               // Web Serial 端口句柄
      _reader: null,             // 读循环引用
      _keepReading: false,
      _serialSupported: ('serial' in navigator),
      _txCount: 0, _rxCount: 0,
      _crc: 'crc16',             // 'none' | 'crc8' | 'crc16' | 'crc32'
      _appendCrc: true,          // 是否把 CRC 字节附加到帧末尾

      // —— CRC 算法（独立实现，复用 validator.js 的多项式约定）——
      // CRC-16/Modbus：多项式 0x8005（反转 0xA001），初值 0xFFFF
      _crc16Table: (() => {
        const t = new Uint16Array(256);
        for (let i = 0; i < 256; i++) {
          let crc = i;
          for (let j = 0; j < 8; j++) crc = (crc & 1) ? ((crc >> 1) ^ 0xA001) : (crc >> 1);
          t[i] = crc;
        }
        return t;
      })(),
      // CRC-8/Maxim-Dallas：多项式 0x31，反转 0x8C，初值 0x00（DS18B20/1-Wire）
      _crc8Table: (() => {
        const t = new Uint8Array(256);
        for (let i = 0; i < 256; i++) {
          let c = i;
          for (let j = 0; j < 8; j++) c = (c & 1) ? ((c >> 1) ^ 0x8C) : (c >> 1);
          t[i] = c;
        }
        return t;
      })(),
      // CRC-32：标准以太网/ZIP，多项式反转 0xEDB88320，初值 0xFFFFFFFF，结果异或 0xFFFFFFFF
      _crc32Table: (() => {
        const t = new Uint32Array(256);
        for (let i = 0; i < 256; i++) {
          let c = i;
          for (let j = 0; j < 8; j++) c = (c & 1) ? ((c >>> 1) ^ 0xEDB88320) : (c >>> 1);
          t[i] = c;
        }
        return t;
      })(),
      crc8(bytes)  { let c = 0x00;            for (const b of bytes) c = this._crc8Table[(c ^ b) & 0xFF];            return c & 0xFF; },
      crc16(bytes) { let c = 0xFFFF;          for (const b of bytes) c = this._crc16Table[(c ^ b) & 0xFF] ^ (c >> 8); return c & 0xFFFF; },
      crc32(bytes) { let c = 0xFFFFFFFF >>> 0; for (const b of bytes) c = this._crc32Table[(c ^ b) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; },

      // —— 工具：hex 字符串 ↔ 字节数组 ——
      parseHex(str) {
        // 支持 "01 03"、"01,03"、"0103"、混排；忽略 0x 前缀
        const cleaned = (str || '').replace(/0x/gi, '').replace(/[^0-9a-fA-F]/g, '');
        if (cleaned.length % 2 !== 0) return null;  // 奇数位
        const out = [];
        for (let i = 0; i < cleaned.length; i += 2) out.push(parseInt(cleaned.substr(i, 2), 16));
        return out;
      },
      bytesToHex(bytes, sep = ' ') {
        return bytes.map(b => (b & 0xFF).toString(16).toUpperCase().padStart(2, '0')).join(sep);
      },

      render(el) {
        el.innerHTML = `
          <div class="space-y-3">
            <div class="info-box info"><div><strong>双模式串口调试</strong>：<br>① <b>模拟模式</b>（默认）——纯前端，输入十六进制帧，自动附加 CRC，记录到日志。教学/协议调试。<br>② <b>真机模式</b>——通过 Web Serial API 连物理串口实时收发（仅 Chrome/Edge，需 HTTPS 或 localhost）。</div></div>

            <div class="flex gap-2">
              <button onclick="Calculator._calculators.uartDebug.setMode('sim')" id="ud-mode-sim" class="flex-1 px-3 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">📝 模拟模式</button>
              <button onclick="Calculator._calculators.uartDebug.setMode('real')" id="ud-mode-real" class="flex-1 px-3 py-1.5 rounded text-sm font-medium" style="background:var(--bg-secondary);color:var(--text)">🔗 真机模式</button>
            </div>

            <div id="ud-params" style="display:none">
              <div class="grid grid-cols-4 gap-2 text-xs">
                <div>波特率
                  <select id="ud-baud" class="w-full px-2 py-1 rounded mt-0.5" style="border:1px solid var(--border);background:var(--bg)">
                    <option>1200</option><option>4800</option><option selected>9600</option><option>19200</option><option>38400</option><option>57600</option><option>115200</option>
                  </select></div>
                <div>数据位
                  <select id="ud-data" class="w-full px-2 py-1 rounded mt-0.5" style="border:1px solid var(--border);background:var(--bg)">
                    <option>7</option><option selected>8</option>
                  </select></div>
                <div>停止位
                  <select id="ud-stop" class="w-full px-2 py-1 rounded mt-0.5" style="border:1px solid var(--border);background:var(--bg)">
                    <option selected>1</option><option>2</option>
                  </select></div>
                <div>校验位
                  <select id="ud-parity" class="w-full px-2 py-1 rounded mt-0.5" style="border:1px solid var(--border);background:var(--bg)">
                    <option value="none" selected>无</option><option value="even">偶</option><option value="odd">奇</option>
                  </select></div>
              </div>
            </div>

            <div>
              <div class="text-sm mb-1">CRC 校验</div>
              <div class="flex gap-1 flex-wrap">
                <button onclick="Calculator._calculators.uartDebug.setCrc('none')"  id="ud-crc-none"  class="px-2 py-1 rounded text-xs" style="background:var(--bg-secondary);color:var(--text);border:1px solid var(--border)">无</button>
                <button onclick="Calculator._calculators.uartDebug.setCrc('crc8')"  id="ud-crc-crc8"  class="px-2 py-1 rounded text-xs" style="background:var(--bg-secondary);color:var(--text);border:1px solid var(--border)">CRC-8</button>
                <button onclick="Calculator._calculators.uartDebug.setCrc('crc16')" id="ud-crc-crc16" class="px-2 py-1 rounded text-xs" style="background:var(--primary);color:white;border:1px solid var(--primary)">CRC-16/Modbus</button>
                <button onclick="Calculator._calculators.uartDebug.setCrc('crc32')" id="ud-crc-crc32" class="px-2 py-1 rounded text-xs" style="background:var(--bg-secondary);color:var(--text);border:1px solid var(--border)">CRC-32</button>
              </div>
              <label class="text-xs flex items-center gap-1 mt-1"><input type="checkbox" id="ud-append" checked onchange="Calculator._calculators.uartDebug._appendCrc=this.checked"> 校验码附加到帧末尾（小端，Modbus 习惯）</label>
            </div>

            <div>
              <div class="text-sm mb-1">发送区（十六进制，空格/逗号分隔）</div>
              <textarea id="ud-input" rows="3" class="w-full px-3 py-2 rounded font-mono text-sm" placeholder="如：01 03 00 00 00 01" style="border:1px solid var(--border);background:var(--bg)">01 03 00 00 00 01</textarea>
            </div>

            <div class="flex gap-2 flex-wrap">
              <button onclick="Calculator._calculators.uartDebug.send()" class="flex-1 px-4 py-2 rounded font-medium" style="background:var(--primary);color:white" id="ud-send-btn">▶ 发送（模拟）</button>
              <button onclick="Calculator._calculators.uartDebug.toggleConnect()" class="px-4 py-2 rounded font-medium" style="background:var(--bg-secondary);color:var(--text);border:1px solid var(--border);display:none" id="ud-connect-btn">🔗 连接串口</button>
              <button onclick="Calculator._calculators.uartDebug.clearLog()" class="px-3 py-2 rounded" style="background:var(--bg-secondary);color:var(--text);border:1px solid var(--border)">清空</button>
            </div>

            <div class="text-xs" style="color:var(--text-secondary)">
              TX: <span id="ud-tx" style="font-weight:600">0</span> 字节　RX: <span id="ud-rx" style="font-weight:600">0</span> 字节
            </div>

            <div>
              <div class="text-sm mb-1">收发日志</div>
              <div id="ud-log" class="p-2 rounded font-mono text-xs" style="background:#1e293b;color:#e2e8f0;min-height:140px;max-height:280px;overflow-y:auto;border:1px solid var(--border)"></div>
            </div>
          </div>`;
        // 真机模式按钮在不支持的浏览器中禁用
        if (!this._serialSupported) {
          const realBtn = document.getElementById('ud-mode-real');
          if (realBtn) { realBtn.disabled = true; realBtn.title = '当前浏览器不支持 Web Serial API（仅 Chrome/Edge）'; realBtn.style.opacity = '0.5'; }
        }
        this.setMode('sim');
      },

      setMode(mode) {
        this._mode = mode;
        // 模式按钮高亮
        const simBtn = document.getElementById('ud-mode-sim');
        const realBtn = document.getElementById('ud-mode-real');
        if (simBtn) {
          simBtn.style.background = mode === 'sim' ? 'var(--primary)' : 'var(--bg-secondary)';
          simBtn.style.color = mode === 'sim' ? 'white' : 'var(--text)';
        }
        if (realBtn) {
          realBtn.style.background = mode === 'real' ? 'var(--primary)' : 'var(--bg-secondary)';
          realBtn.style.color = mode === 'real' ? 'white' : 'var(--text)';
        }
        // 参数区与连接按钮显隐
        const params = document.getElementById('ud-params');
        const connBtn = document.getElementById('ud-connect-btn');
        if (params) params.style.display = (mode === 'real') ? 'block' : 'none';
        if (connBtn) connBtn.style.display = (mode === 'real') ? 'block' : 'none';
        // 发送按钮文案
        const sendBtn = document.getElementById('ud-send-btn');
        if (sendBtn) sendBtn.textContent = (mode === 'real') ? '▶ 发送（真机）' : '▶ 发送（模拟）';
      },

      setCrc(type) {
        this._crc = type;
        ['none','crc8','crc16','crc32'].forEach(t => {
          const btn = document.getElementById('ud-crc-' + t);
          if (!btn) return;
          if (t === type) {
            btn.style.background = 'var(--primary)'; btn.style.color = 'white'; btn.style.borderColor = 'var(--primary)';
          } else {
            btn.style.background = 'var(--bg-secondary)'; btn.style.color = 'var(--text)'; btn.style.borderColor = 'var(--border)';
          }
        });
      },

      // 构造完整帧：原始字节 +（可选）CRC 附加
      buildFrame(bytes) {
        if (this._crc === 'none' || !this._appendCrc) return bytes.slice();
        let crcBytes;
        if (this._crc === 'crc8') {
          const c = this.crc8(bytes);
          crcBytes = [c];                              // 1 字节
        } else if (this._crc === 'crc16') {
          const c = this.crc16(bytes);
          crcBytes = [c & 0xFF, (c >> 8) & 0xFF];      // 小端：低字节在前（Modbus 习惯）
        } else {
          const c = this.crc32(bytes);
          crcBytes = [c & 0xFF, (c >> 8) & 0xFF, (c >> 16) & 0xFF, (c >> 24) & 0xFF];
        }
        return bytes.concat(crcBytes);
      },

      // 统一发送入口
      async send() {
        if (this._mode === 'real') return this.sendReal();
        return this.sendSim();
      },

      // 模拟模式发送
      sendSim() {
        const input = document.getElementById('ud-input')?.value || '';
        if (!document.getElementById('ud-log')) return;
        const data = this.parseHex(input);
        if (!data || data.length === 0) {
          this.appendLog('ERR', '解析失败：十六进制格式错误（应为偶数位 0-9 a-f）', '#ef4444');
          return;
        }
        const frame = this.buildFrame(data);
        this._txCount += frame.length;
        const txEl = document.getElementById('ud-tx');
        if (txEl) txEl.textContent = this._txCount;
        // 显示原始 + CRC 信息
        let crcInfo = '';
        if (this._crc !== 'none') {
          const crcHex = this.bytesToHex(frame.slice(data.length));
          const crcName = this._crc.toUpperCase();
          crcInfo = `<span style="color:#fbbf24"> + ${crcName}: ${crcHex}</span>`;
        }
        this.appendLog('TX', this.bytesToHex(data) + crcInfo, '#60a5fa');
        // 首次发送时提示模拟模式语义
        if (this._txCount === frame.length) {
          this.appendLog('INFO', '提示：模拟模式不连接真实设备，仅演示帧构造与 CRC。切到"真机模式"连接物理串口实际收发。', '#94a3b8');
        }
      },

      // —— Web Serial 真机模式 ——
      async toggleConnect() {
        if (this._port) return this.disconnect();
        return this.connect();
      },
      async connect() {
        if (!this._serialSupported) {
          this.appendLog('ERR', '当前浏览器不支持 Web Serial API（仅 Chrome/Edge）', '#ef4444');
          return;
        }
        try {
          this._port = await navigator.serial.requestPort();
          const baud = parseInt(document.getElementById('ud-baud')?.value || '9600');
          const dataBits = parseInt(document.getElementById('ud-data')?.value || '8');
          const stopBits = parseInt(document.getElementById('ud-stop')?.value || '1');
          const parity = document.getElementById('ud-parity')?.value || 'none';
          await this._port.open({ baudRate: baud, dataBits, stopBits, parity });
          this._keepReading = true;
          this._readLoop();  // 异步启动读循环（不 await，避免阻塞）
          this.appendLog('INFO', `已连接：${baud} baud, ${dataBits}N${stopBits}`, '#94a3b8');
          const btn = document.getElementById('ud-connect-btn');
          if (btn) btn.textContent = '⛔ 断开';
        } catch (e) {
          this.appendLog('ERR', '连接失败：' + (e.message || e), '#ef4444');
          this._port = null;
        }
      },
      async disconnect() {
        this._keepReading = false;
        try {
          if (this._reader) { await this._reader.cancel(); this._reader.releaseLock(); this._reader = null; }
          if (this._port) { await this._port.close(); }
        } catch (e) { /* 忽略关闭异常 */ }
        this._port = null;
        this.appendLog('INFO', '已断开', '#94a3b8');
        const btn = document.getElementById('ud-connect-btn');
        if (btn) btn.textContent = '🔗 连接串口';
      },
      async _readLoop() {
        while (this._port && this._keepReading) {
          try {
            this._reader = this._port.readable.getReader();
            while (this._keepReading) {
              const { value, done } = await this._reader.read();
              if (done) break;
              if (value) {
                const bytes = Array.from(value);
                this._rxCount += bytes.length;
                const rxEl = document.getElementById('ud-rx');
                if (rxEl) rxEl.textContent = this._rxCount;
                this.appendLog('RX', this.bytesToHex(bytes), '#34d399');
              }
            }
            this._reader.releaseLock();
            this._reader = null;
          } catch (e) {
            this.appendLog('ERR', '读循环异常：' + (e.message || e), '#ef4444');
            break;
          }
        }
      },
      async sendReal() {
        if (!this._port || !this._port.writable) {
          this.appendLog('ERR', '未连接，请先点击"连接串口"', '#ef4444');
          return;
        }
        const input = document.getElementById('ud-input')?.value || '';
        const data = this.parseHex(input);
        if (!data || data.length === 0) {
          this.appendLog('ERR', '解析失败：十六进制格式错误', '#ef4444');
          return;
        }
        const frame = this.buildFrame(data);
        try {
          const writer = this._port.writable.getWriter();
          await writer.write(new Uint8Array(frame));
          writer.releaseLock();
          this._txCount += frame.length;
          const txEl = document.getElementById('ud-tx');
          if (txEl) txEl.textContent = this._txCount;
          let crcInfo = '';
          if (this._crc !== 'none') crcInfo = ` <span style="color:#fbbf24">+${this._crc.toUpperCase()}</span>`;
          this.appendLog('TX', this.bytesToHex(data) + crcInfo, '#60a5fa');
        } catch (e) {
          this.appendLog('ERR', '发送失败：' + (e.message || e), '#ef4444');
        }
      },

      // 日志追加：dir = 'TX'/'RX'/'INFO'/'ERR'
      appendLog(dir, content, color) {
        const log = document.getElementById('ud-log');
        if (!log) return;
        const t = new Date();
        const ts = `${String(t.getHours()).padStart(2,'0')}:${String(t.getMinutes()).padStart(2,'0')}:${String(t.getSeconds()).padStart(2,'0')}`;
        let arrow = '';
        if (dir === 'TX') arrow = '<span style="color:#60a5fa">TX &gt;&gt;</span>';
        else if (dir === 'RX') arrow = '<span style="color:#34d399">RX &lt;&lt;</span>';
        else if (dir === 'ERR') arrow = '<span style="color:#ef4444">ERR!!</span>';
        else arrow = '<span style="color:#94a3b8">INFO</span>';
        const line = document.createElement('div');
        line.style.borderBottom = '1px dashed rgba(148,163,184,0.2)';
        line.style.padding = '2px 0';
        line.innerHTML = `<span style="color:#64748b">[${ts}]</span> ${arrow} <span style="color:${dir==='ERR'?'#ef4444':(dir==='INFO'?'#94a3b8':'#e2e8f0')}">${content}</span>`;
        log.appendChild(line);
        log.scrollTop = log.scrollHeight;  // 自动滚到底
      },

      clearLog() {
        const log = document.getElementById('ud-log');
        if (log) log.innerHTML = '';
        this._txCount = 0; this._rxCount = 0;
        const txEl = document.getElementById('ud-tx');
        const rxEl = document.getElementById('ud-rx');
        if (txEl) txEl.textContent = '0';
        if (rxEl) rxEl.textContent = '0';
      },
    },

    // ==================== v1.0.5 新增：Linux 速查 / G-code / 打印成本 / 公差 / cron ====================

    // Linux 命令速查（分类卡片 + 搜索）
    linuxCheat: {
      _cmds: [
        ['文件与目录', 'ls -lh', '长格式列目录，大小人类可读'],
        ['文件与目录', 'cd / cd -', '切换目录 / 回上一个目录'],
        ['文件与目录', 'cp -a src dst', '递归复制并保留属性'],
        ['文件与目录', 'mv old new', '移动/重命名'],
        ['文件与目录', 'rm -rf dir', '递归强制删除（危险，想清楚再敲）'],
        ['文件与目录', 'mkdir -p a/b/c', '递归建目录'],
        ['文件与目录', 'ln -s target link', '建软链接'],
        ['文件与目录', 'df -h / du -sh .', '磁盘空间 / 当前目录占用'],
        ['文件与目录', 'tar czf x.tar.gz dir/', '打包压缩（xzf 解包）'],
        ['查找与文本', 'find / -name "*.dts"', '按名字全盘找文件'],
        ['查找与文本', 'grep -rn "TODO" src/', '递归列行号搜文本'],
        ['查找与文本', 'grep -iE "a|b" f', '忽略大小写 + 扩展正则'],
        ['查找与文本', 'awk \'{print $1,$3}\' f', '按列输出（空格分隔）'],
        ['查找与文本', "sed -i 's/old/new/g' f", '就地全局替换'],
        ['查找与文本', 'cat / head / tail -f log', '查看 / 追踪日志尾部'],
        ['查找与文本', 'wc -l / sort / uniq -c', '计数、排序、去重统计'],
        ['查找与文本', 'diff -u a b', '对比两个文件'],
        ['进程与系统', 'ps aux | grep app', '查进程（全用户 + 命令名过滤）'],
        ['进程与系统', 'top / htop', '交互式资源监视'],
        ['进程与系统', 'kill -9 PID', '强杀进程（先试 -15）'],
        ['进程与系统', 'systemctl status/start/stop svc', '服务管理三连'],
        ['进程与系统', 'journalctl -u svc -f', '跟踪某服务日志'],
        ['进程与系统', 'dmesg | tail -20', '内核最近日志（插拔设备先看它）'],
        ['进程与系统', 'uname -a / lsmod / free -h', '内核版本 / 模块 / 内存'],
        ['进程与系统', 'crontab -e / -l', '编辑 / 列出定时任务'],
        ['网络与远程', 'ip addr / ip route', '新式网卡与路由查看'],
        ['网络与远程', 'ping -c 4 host', '连通性测试'],
        ['网络与远程', 'ss -tulpn', '端口监听与进程对应'],
        ['网络与远程', 'ssh user@host', '远程登录（-L 端口转发）'],
        ['网络与远程', 'scp f user@host:/path', '远程拷贝（-r 递归）'],
        ['网络与远程', 'curl -X POST -d @f url', '发 HTTP 请求'],
        ['网络与远程', 'nmap -sn 192.168.1.0/24', '扫局域网存活主机'],
        ['设备与外设', 'lsusb / lspci', '列出 USB / PCI 设备'],
        ['设备与外设', 'lsblk / sudo fdisk -l', '看磁盘与分区'],
        ['设备与外设', 'dmesg | grep tty', '确认串口设备注册'],
        ['设备与外设', 'sudo i2cdetect -y 1', '扫描 I2C 总线器件'],
        ['设备与外设', 'gpiodetect / gpioinfo', '列出 GPIO 芯片与引脚状态'],
        ['设备与外设', 'vcgencmd measure_temp', '树莓派温度'],
        ['设备与外设', 'udevadm info -a -n /dev/ttyUSB0', '查设备属性（写规则用）'],
        ['设备与外设', 'sudo dd if=img of=/dev/sdX bs=4M', '烧写镜像（of 别写反！）'],
      ],
      _cats: ['全部', '文件与目录', '查找与文本', '进程与系统', '网络与远程', '设备与外设'],
      _cat: '全部',
      _kw: '',
      render(el) {
        el.innerHTML = `
          <div class="space-y-3">
            <input type="text" id="lc-kw" placeholder="搜索命令或说明，如：串口 / grep / 日志..." class="w-full px-3 py-2 rounded" style="border:1px solid var(--border);background:var(--bg)">
            <div id="lc-cats" class="flex flex-wrap gap-2"></div>
            <div id="lc-list" class="space-y-2"></div>
          </div>`;
        document.getElementById('lc-kw')?.addEventListener('input', e => {
          this._kw = e.target.value.trim().toLowerCase();
          this._refresh();
        });
        this._refreshCats();
        this._refresh();
      },
      _refreshCats() {
        const box = document.getElementById('lc-cats');
        if (!box) return;
        box.innerHTML = this._cats.map(c => `
          <button onclick="Calculator._calculators.linuxCheat._setCat('${c}')" class="px-3 py-1 rounded-full text-sm font-medium"
            style="border:1px solid var(--border);background:${this._cat === c ? 'var(--primary)' : 'var(--bg)'};color:${this._cat === c ? 'white' : 'inherit'}">${c}</button>`).join('');
      },
      _setCat(c) { this._cat = c; this._refreshCats(); this._refresh(); },
      _refresh() {
        const box = document.getElementById('lc-list');
        if (!box) return;
        const list = this._cmds.filter(([cat, cmd, d]) =>
          (this._cat === '全部' || cat === this._cat) &&
          (!this._kw || cmd.toLowerCase().includes(this._kw) || d.toLowerCase().includes(this._kw)));
        box.innerHTML = list.length === 0
          ? '<div class="text-sm text-gray-500 py-4 text-center">没有匹配的命令</div>'
          : list.map(([cat, cmd, d]) => `
            <div class="p-2 rounded" style="background:var(--bg-secondary);border:1px solid var(--border)">
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <code class="text-sm font-medium" style="color:var(--primary)">${cmd.replace(/</g, '&lt;')}</code>
                <span class="text-xs px-2 py-0.5 rounded-full" style="background:var(--bg);border:1px solid var(--border)">${cat}</span>
              </div>
              <div class="text-sm mt-1" style="color:var(--text-secondary)">${d}</div>
            </div>`).join('');
      },
    },

    // G-code 生成器（矩形/圆形轮廓 + 螺旋下刀圆孔）
    gcodeGen: {
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="info-box info"><div>基础轮廓 G-code 生成：适用于雕刻机 / 写字机扩展练习。下刀半速进给，生成后请按机床实际配置核对 F/S 与安全高度。</div></div>
            <div class="grid grid-cols-2 gap-3">
              <div><label class="text-sm">轮廓类型</label>
                <select id="gg-shape" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)">
                  <option value="rect">矩形轮廓（长 × 宽）</option>
                  <option value="circle">圆形轮廓（整圆 IJ）</option>
                  <option value="hole">圆孔（螺旋下刀）</option>
                </select></div>
              <div><label class="text-sm">安全高度 Z (mm)</label>
                <input type="number" id="gg-safe" value="5" step="0.5" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div id="gg-rect-a"><label class="text-sm">长 L (mm)</label>
                <input type="number" id="gg-len" value="80" step="1" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div id="gg-rect-b"><label class="text-sm">宽 W (mm)</label>
                <input type="number" id="gg-wid" value="50" step="1" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div id="gg-circ-a" style="display:none"><label class="text-sm">半径 R (mm)</label>
                <input type="number" id="gg-rad" value="20" step="1" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">总深度 (mm)</label>
                <input type="number" id="gg-depth" value="2" step="0.5" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            </div>
            <div class="grid grid-cols-3 gap-3">
              <div><label class="text-sm">每层切深 (mm)</label>
                <input type="number" id="gg-ap" value="0.5" step="0.1" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">进给 F (mm/min)</label>
                <input type="number" id="gg-feed" value="600" step="10" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">主轴 S (rpm)</label>
                <input type="number" id="gg-spindle" value="10000" step="500" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            </div>
            <button onclick="Calculator._calculators.gcodeGen.calc()" class="w-full px-4 py-2 rounded font-medium" style="background:var(--primary);color:white">生成 G-code</button>
            <div id="gg-result"></div>
          </div>`;
        document.getElementById('gg-shape')?.addEventListener('change', e => {
          const isRect = e.target.value === 'rect';
          document.getElementById('gg-rect-a').style.display = isRect ? 'block' : 'none';
          document.getElementById('gg-rect-b').style.display = isRect ? 'block' : 'none';
          document.getElementById('gg-circ-a').style.display = isRect ? 'none' : 'block';
        });
      },
      calc() {
        const shape = document.getElementById('gg-shape')?.value || 'rect';
        const safe = parseFloat(document.getElementById('gg-safe')?.value || 5);
        const L = parseFloat(document.getElementById('gg-len')?.value || 0);
        const W = parseFloat(document.getElementById('gg-wid')?.value || 0);
        const R = parseFloat(document.getElementById('gg-rad')?.value || 0);
        const depth = parseFloat(document.getElementById('gg-depth')?.value || 0);
        const ap = parseFloat(document.getElementById('gg-ap')?.value || 0);
        const F = parseFloat(document.getElementById('gg-feed')?.value || 0);
        const S = parseFloat(document.getElementById('gg-spindle')?.value || 0);
        const result = document.getElementById('gg-result');
        if (!result) return;
        if (!(depth > 0 && ap > 0 && F > 0 && S > 0 && safe > 0) ||
            (shape === 'rect' ? !(L > 0 && W > 0) : !(R > 0))) {
          result.innerHTML = '<span class="text-red-500">请输入有效参数（均须 &gt; 0）</span>';
          return;
        }
        const g = [];
        g.push('(StudyWeb gcode-gen)');
        g.push('G21 G90 G17        (mm / 绝对坐标 / XY 平面)');
        g.push('M3 S' + S);
        if (shape === 'rect') {
          g.push('G0 X0 Y0');
          g.push('G0 Z' + safe.toFixed(1));
          const layers = Math.ceil(depth / ap);
          for (let i = 1; i <= layers; i++) {
            const z = Math.min(depth, i * ap).toFixed(2);
            g.push('G1 Z-' + z + ' F' + Math.round(F / 2));
            g.push('G1 X' + L.toFixed(2) + ' Y0 F' + F);
            g.push('G1 X' + L.toFixed(2) + ' Y' + W.toFixed(2));
            g.push('G1 X0 Y' + W.toFixed(2));
            g.push('G1 X0 Y0');
          }
        } else {
          g.push('G0 X' + R.toFixed(2) + ' Y0');
          g.push('G0 Z' + safe.toFixed(1));
          const layers = Math.ceil(depth / ap);
          for (let i = 1; i <= layers; i++) {
            const z = Math.min(depth, i * ap).toFixed(2);
            g.push('G1 Z-' + z + ' F' + Math.round(F / 2));
            g.push((shape === 'hole' ? 'G2 ' : 'G3 ') + 'X' + R.toFixed(2) + ' Y0 I-' + R.toFixed(2) + ' J0 F' + F);
          }
        }
        g.push('G0 Z' + safe.toFixed(1));
        g.push('M5');
        g.push('M30');
        const code = g.join('\n');
        result.innerHTML = `
          <div class="text-sm mb-2">共 ${g.length} 行</div>
          <pre id="gg-pre" class="p-3 rounded text-xs overflow-x-auto" style="background:var(--bg-secondary);border:1px solid var(--border);max-height:300px">${code.replace(/</g, '&lt;')}</pre>
          <button onclick="Calculator._calculators.gcodeGen.copy()" class="mt-2 px-4 py-1.5 rounded text-sm font-medium" style="background:var(--primary);color:white">复制代码</button>`;
        this._code = code;
      },
      copy() {
        if (this._code && navigator.clipboard) navigator.clipboard.writeText(this._code).catch(() => {});
      },
    },

    // 3D 打印成本估算
    printCost: {
      _mats: { 'PLA': 1.24, 'PETG': 1.27, 'ABS': 1.04, 'TPU': 1.21, 'PC': 1.20 },
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="info-box info"><div>模型体积可由切片软件读取（STL 属性），或用长×宽×高 × 0.4 粗估实心外壳件。实际耗材量 ≈ 体积 ×（填充率 + 壳体系数）。</div></div>
            <div class="grid grid-cols-2 gap-3">
              <div><label class="text-sm">模型体积 (cm³)</label>
                <input type="number" id="pc-v" value="50" step="1" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">材料</label>
                <select id="pc-mat" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)">
                  ${Object.keys(this._mats).map(m => `<option value="${m}">${m}</option>`).join('')}
                </select></div>
            </div>
            <div class="grid grid-cols-3 gap-3">
              <div><label class="text-sm">填充率 (%)</label>
                <input type="number" id="pc-infill" value="20" min="0" max="100" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">壳体系数</label>
                <input type="number" id="pc-shell" value="0.15" step="0.05" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">线材单价 (¥/kg)</label>
                <input type="number" id="pc-price" value="60" step="1" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            </div>
            <div class="grid grid-cols-3 gap-3">
              <div><label class="text-sm">层高 (mm)</label>
                <input type="number" id="pc-layer" value="0.2" step="0.05" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">喷嘴 (mm)</label>
                <input type="number" id="gc-nozzle" value="0.4" step="0.1" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div><label class="text-sm">速度 (mm/s)</label>
                <input type="number" id="pc-speed" value="60" step="5" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            </div>
            <button onclick="Calculator._calculators.printCost.calc()" class="w-full px-4 py-2 rounded font-medium" style="background:var(--primary);color:white">估算</button>
            <div id="pc-result" class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>
          </div>`;
      },
      calc() {
        const V = parseFloat(document.getElementById('pc-v')?.value || 0);
        const mat = document.getElementById('pc-mat')?.value || 'PLA';
        const infill = parseFloat(document.getElementById('pc-infill')?.value || 0);
        const shell = parseFloat(document.getElementById('pc-shell')?.value || 0);
        const price = parseFloat(document.getElementById('pc-price')?.value || 0);
        const layer = parseFloat(document.getElementById('pc-layer')?.value || 0);
        const nozzle = parseFloat(document.getElementById('gc-nozzle')?.value || 0);
        const speed = parseFloat(document.getElementById('pc-speed')?.value || 0);
        const result = document.getElementById('pc-result');
        if (!result) return;
        if (!(V > 0 && price > 0 && layer > 0 && nozzle > 0 && speed > 0) || !(infill >= 0 && shell >= 0)) {
          result.innerHTML = '<span class="text-red-500">请输入有效参数</span>'; return;
        }
        const ratio = Math.min(1, infill / 100 + shell);
        const Veff = V * ratio;                     // 实际耗材体积 cm³
        const weight = Veff * this._mats[mat];      // g
        const lenM = (Veff * 1000) / (Math.PI * 0.875 * 0.875) / 1000;  // 1.75mm 线长 m
        const flow = nozzle * layer * speed;        // mm³/s
        const timeS = (Veff * 1000) / flow * 1.15;  // 15% 空程系数
        const cost = weight / 1000 * price;
        const perRoll = Math.floor(1000 / weight);
        const h = Math.floor(timeS / 3600), m = Math.round(timeS % 3600 / 60);
        result.innerHTML = `
          <div class="space-y-1">
            <div>实际耗材体积：<strong>${Veff.toFixed(1)} cm³</strong>（体积利用率 ${(ratio * 100).toFixed(0)}%）</div>
            <div>耗材重量：<strong>${weight.toFixed(1)} g</strong>　线长：约 <strong>${lenM.toFixed(1)} m</strong></div>
            <div>材料成本：<strong style="color:var(--primary)">¥${cost.toFixed(2)}</strong>　一卷 1kg 约打 <strong>${perRoll}</strong> 件</div>
            <div>预计时间：约 <strong>${h} 小时 ${m} 分</strong>（流量 ${flow.toFixed(1)} mm³/s，含 15% 空程）</div>
            <div class="text-xs text-gray-500 mt-1">估算模型不含支撑与失败重打；复杂件建议再加 10~20% 余量</div>
          </div>`;
      },
    },

    // 3D 打印收缩公差计算器
    shrinkCalc: {
      _eps: { 'PLA（0.4%）': 0.4, 'PETG（0.5%）': 0.5, 'ABS（0.8%）': 0.8, 'PC（0.8%）': 0.8, '自定义': -1 },
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="info-box info"><div>正向：D<sub>打印</sub> = D<sub>目标</sub> × (1 + ε) + c（孔再加 c，外轮廓 c=0）。反向：用实测偏差反推 c，配合阶梯试块一次标定（print-06 六步法）。</div></div>
            <div class="grid grid-cols-2 gap-3">
              <div><label class="text-sm">模式</label>
                <select id="sc-mode" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)">
                  <option value="fwd">正向：设计尺寸 → 打印尺寸</option>
                  <option value="rev">反向：实测 → 修正建议</option>
                </select></div>
              <div><label class="text-sm">材料（线收缩率 ε）</label>
                <select id="sc-mat" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)">
                  ${Object.keys(this._eps).map(m => `<option value="${m}">${m}</option>`).join('')}
                </select></div>
            </div>
            <div id="sc-eps-custom" style="display:none"><label class="text-sm">自定义 ε (%)</label>
              <input type="number" id="sc-eps-val" value="0.4" step="0.05" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            <div class="grid grid-cols-2 gap-3">
              <div id="sc-d-wrap"><label class="text-sm">目标尺寸 D (mm)</label>
                <input type="number" id="sc-d" value="22" step="0.1" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div id="sc-c-wrap"><label class="text-sm">孔工艺常量 c (mm)</label>
                <input type="number" id="sc-c" value="0.3" step="0.05" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
              <div id="sc-a-wrap" style="display:none"><label class="text-sm">实测尺寸 A (mm)</label>
                <input type="number" id="sc-a" value="21.8" step="0.01" class="w-full px-3 py-2 rounded mt-1" style="border:1px solid var(--border);background:var(--bg)"></div>
            </div>
            <button onclick="Calculator._calculators.shrinkCalc.calc()" class="w-full px-4 py-2 rounded font-medium" style="background:var(--primary);color:white">计算</button>
            <div id="sc-result" class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>
          </div>`;
        document.getElementById('sc-mat')?.addEventListener('change', e => {
          document.getElementById('sc-eps-custom').style.display = (this._eps[e.target.value] < 0) ? 'block' : 'none';
        });
        document.getElementById('sc-mode')?.addEventListener('change', e => {
          const rev = e.target.value === 'rev';
          document.getElementById('sc-a-wrap').style.display = rev ? 'block' : 'none';
          document.getElementById('sc-c-wrap').style.display = rev ? 'none' : 'block';
        });
      },
      calc() {
        const mode = document.getElementById('sc-mode')?.value || 'fwd';
        const mat = document.getElementById('sc-mat')?.value || 'PLA（0.4%）';
        let eps = this._eps[mat];
        if (eps < 0) eps = parseFloat(document.getElementById('sc-eps-val')?.value || 0);
        const D = parseFloat(document.getElementById('sc-d')?.value || 0);
        const result = document.getElementById('sc-result');
        if (!result) return;
        if (!(D > 0) || !(eps >= 0)) {
          result.innerHTML = '<span class="text-red-500">请输入有效参数</span>'; return;
        }
        if (mode === 'fwd') {
          const c = parseFloat(document.getElementById('sc-c')?.value || 0);
          const out = D * (1 + eps / 100) + c;
          result.innerHTML = `
            <div class="space-y-1">
              <div>打印尺寸：<strong style="color:var(--primary)">${out.toFixed(3)} mm</strong>　（D=${D}，ε=${eps}%${c ? '，c=' + c : ''}）</div>
              <div>阶梯试块建议：同板打 <strong>${(out - 0.1).toFixed(2)} / ${out.toFixed(2)} / ${(out + 0.1).toFixed(2)}</strong> 三档，实测选型（print-06）</div>
              <div class="text-xs text-gray-500 mt-1">配合性质参考：压入 +0.2~0.4 / 滑动 +0.3~0.5 / 快换 +0.5</div>
            </div>`;
        } else {
          const A = parseFloat(document.getElementById('sc-a')?.value || 0);
          if (!(A > 0)) { result.innerHTML = '<span class="text-red-500">请输入实测尺寸</span>'; return; }
          const dev = A - D;
          const cAdj = -dev;  // 下次在该打印值上加的修正量
          result.innerHTML = `
            <div class="space-y-1">
              <div>实测偏差：<strong style="color:${Math.abs(dev) <= 0.2 ? '#059669' : '#d97706'}">${dev >= 0 ? '+' : ''}${dev.toFixed(3)} mm</strong>（${Math.abs(dev) <= 0.2 ? '公差内，可用' : '超差，需修正'}）</div>
              <div>修正建议：当前打印值 ${A}mm，下版改为 <strong>${A.toFixed(2)} ${cAdj >= 0 ? '+' : '−'} ${Math.abs(cAdj).toFixed(2)} = ${(A + cAdj).toFixed(2)} mm</strong></div>
              <div class="text-xs text-gray-500 mt-1">即把 c 值调整 ${cAdj >= 0 ? '+' : '−'}${Math.abs(cAdj).toFixed(2)}mm 后重打首件复验；偏差 &gt; 1% 先查机械（皮带/带轮）</div>
            </div>`;
        }
      },
    },

    // cron 表达式生成器 + 未来 3 次执行预览
    cronGen: {
      _fields: [['min', '分 (0-59)'], ['hour', '时 (0-23)'], ['dom', '日 (1-31)'], ['mon', '月 (1-12)'], ['dow', '周 (0-6)']],
      _presets: [
        ['每 5 分钟', '*/5 * * * *'],
        ['每小时 30 分', '30 * * * *'],
        ['每天 09:00', '0 9 * * *'],
        ['每周一 08:30', '30 8 * * 1'],
        ['每月 1 号 00:00', '0 0 1 * *'],
        ['每季度首日', '0 0 1 */3 *'],
      ],
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="info-box info"><div>五个字段依次为：分 时 日 月 周。支持 <code>*</code> / <code>*/n</code> / <code>a-b</code> / <code>a,b</code> 组合，如 <code>0,30 8-18 * * 1-5</code> = 工作日 8~18 点的整点与半点。</div></div>
            <div class="flex flex-wrap gap-2">
              ${this._presets.map(([n, e]) => `<button onclick="Calculator._calculators.cronGen._preset('${e}')" class="px-3 py-1 rounded-full text-sm" style="border:1px solid var(--border);background:var(--bg)">${n}</button>`).join('')}
            </div>
            <div class="grid grid-cols-5 gap-2">
              ${this._fields.map(([k, label]) => `
                <div><label class="text-xs">${label}</label>
                  <input type="text" id="cg-${k}" value="*" class="w-full px-2 py-2 rounded mt-1 text-sm text-center" style="border:1px solid var(--border);background:var(--bg)"></div>`).join('')}
            </div>
            <button onclick="Calculator._calculators.cronGen.calc()" class="w-full px-4 py-2 rounded font-medium" style="background:var(--primary);color:white">解析并预览</button>
            <div id="cg-result" class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>
          </div>`;
      },
      _preset(e) {
        const parts = e.split(' ');
        this._fields.forEach(([k], i) => {
          const input = document.getElementById('cg-' + k);
          if (input) input.value = parts[i] || '*';
        });
        this.calc();
      },
      _match(val, expr, min, max) {
        if (!expr || expr.trim() === '*') return true;
        return expr.split(',').some(part => {
          part = part.trim();
          if (!part) return false;
          const seg = part.split('/');
          const step = seg.length === 2 ? parseInt(seg[1]) : 1;
          if (!(step > 0)) return false;
          let lo, hi;
          if (seg[0] === '*') { lo = min; hi = max; }
          else if (seg[0].includes('-')) { const [a, b] = seg[0].split('-'); lo = parseInt(a); hi = parseInt(b); }
          else { lo = hi = parseInt(seg[0]); }
          if (isNaN(lo) || isNaN(hi) || val < lo || val > hi) return false;
          return step === 1 || (val - lo) % step === 0;
        });
      },
      _describe(fields) {
        const names = ['分', '时', '日', '月', '周'];
        const parts = fields.map((f, i) => f.trim() === '*' ? null : `${names[i]}=${f.trim()}`).filter(Boolean);
        return parts.length === 0 ? '每分钟执行' : parts.join('，');
      },
      calc() {
        const fields = this._fields.map(([k]) => document.getElementById('cg-' + k)?.value.trim() || '*');
        const result = document.getElementById('cg-result');
        if (!result) return;
        const expr = fields.join(' ');
        // 未来 3 次执行时间：逐分钟匹配，最多向前找 3 年
        const now = new Date();
        now.setSeconds(0, 0);
        now.setMinutes(now.getMinutes() + 1);
        const runs = [];
        const limit = 3 * 366 * 24 * 60;
        for (let i = 0; i < limit && runs.length < 3; i++) {
          const dow = now.getDay();
          if (this._match(now.getMinutes(), fields[0], 0, 59) &&
              this._match(now.getHours(), fields[1], 0, 23) &&
              this._match(now.getDate(), fields[2], 1, 31) &&
              this._match(now.getMonth() + 1, fields[3], 1, 12) &&
              this._match(dow === 0 && fields[4].includes('7') ? 7 : dow, fields[4], 0, 7)) {
            runs.push(new Date(now));
          }
          now.setMinutes(now.getMinutes() + 1);
        }
        if (runs.length === 0) {
          result.innerHTML = `<div class="text-red-500">⚠ 3 年内无匹配时刻——请检查字段合法性（如 2 月 30 日）</div>`;
          return;
        }
        const fmt = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}（${'日一二三四五六'[d.getDay()]}）`;
        result.innerHTML = `
          <div class="space-y-1">
            <div>表达式：<code style="color:var(--primary);font-size:1.05em">${expr.replace(/</g, '&lt;')}</code></div>
            <div>含义：${this._describe(fields)}</div>
            <div class="mt-1">未来 3 次执行：</div>
            ${runs.map(d => `<div class="pl-2">▸ ${fmt(d)}</div>`).join('')}
            <div class="text-xs text-gray-500 mt-1">写入 crontab：crontab -e 后追加该行（脚本路径替换为绝对路径）</div>
          </div>`;
      },
    },

    // ===== 人工智能 =====
    tokenEst: {
      _windows: [[4096, '4K'], [8192, '8K'], [32768, '32K'], [131072, '128K']],
      _sample: '请把笔移动到坐标 (100, 50)，然后画一条直线到 (150, 80)。Move the pen to (100, 50), then draw a line to (150, 80).',
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="info-box info"><div>经验法则：中文 1 字 ≈ 1~1.5 token，英文 1 词 ≈ 1.3 token。本工具按此估算并给出区间——精确值取决于具体模型的分词器（Qwen/GLM/Llama 各不相同），工程估算够用。</div></div>
            <textarea id="te-input" rows="6" placeholder="粘贴中英文混合文本……" class="w-full px-3 py-2 rounded text-sm" style="border:1px solid var(--border);background:var(--bg);resize:vertical;font-family:inherit"></textarea>
            <div class="flex gap-2 flex-wrap">
              <button onclick="Calculator._calculators.tokenEst.calc()" class="px-4 py-2 rounded font-medium" style="background:var(--primary);color:white">估算 token</button>
              <button onclick="Calculator._calculators.tokenEst.sample()" class="px-4 py-2 rounded text-sm" style="border:1px solid var(--border);background:var(--bg)">填入示例</button>
              <button onclick="Calculator._calculators.tokenEst.clear()" class="px-4 py-2 rounded text-sm" style="border:1px solid var(--border);background:var(--bg)">清空</button>
            </div>
            <div id="te-result" class="p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border);min-height:3rem"></div>
          </div>`;
      },
      sample() {
        const input = document.getElementById('te-input');
        if (input) input.value = this._sample;
        this.calc();
      },
      clear() {
        const input = document.getElementById('te-input');
        if (input) input.value = '';
        this.calc();
      },
      calc() {
        const text = document.getElementById('te-input')?.value || '';
        const result = document.getElementById('te-result');
        if (!result) return;
        if (!text.trim()) { result.innerHTML = '<div class="text-gray-500">请先输入文本，或点击"填入示例"</div>'; return; }
        // 字符构成：CJK 汉字 / 英文单词 / 数字串 / 其他符号（空白不计）
        const cjk = (text.match(/[\u3400-\u9fff]/g) || []).length;
        const words = (text.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) || []).length;
        const digitRuns = (text.match(/\d+/g) || []).length;
        const otherChars = text.replace(/[\u3400-\u9fff]/g, '').replace(/[A-Za-z']/g, '').replace(/\d/g, '').replace(/\s/g, '').length;
        const est = cjk * 1.1 + words * 1.3 + digitRuns * 0.5 + otherChars * 0.4;
        const lo = Math.round(est * 0.8), hi = Math.round(est * 1.25);
        result.innerHTML = `
          <div class="space-y-2">
            <div>字符数 <b>${text.length}</b>（汉字 ${cjk} / 英文单词 ${words} / 数字串 ${digitRuns} / 符号 ${otherChars}）</div>
            <div>估算 token：<b style="color:var(--primary);font-size:1.15em">${lo} ~ ${hi}</b>（中值 ${Math.round(est)}）</div>
            <div class="pt-1">上下文窗口占用：</div>
            ${this._windows.map(([w, label]) => {
              const p = est / w * 100;
              const color = p >= 90 ? '#ef4444' : p >= 60 ? '#f59e0b' : '#059669';
              return `<div>
                <div class="flex justify-between text-xs mb-0.5"><span>${label}（${w.toLocaleString()}）</span><span style="color:${color}">${p.toFixed(1)}%</span></div>
                <div style="height:0.5rem;background:var(--border);border-radius:9999px;overflow:hidden"><div style="height:100%;width:${Math.min(100, p).toFixed(1)}%;background:${color};border-radius:9999px"></div></div>
              </div>`;
            }).join('')}
            <div class="text-xs text-gray-500">上下文窗口 = 提示词 + 模型已生成部分之和；排 Agent 时工具定义与检索片段同样消耗这份预算（详见 ai-04）。</div>
          </div>`;
      },
    },

    // LLM 内存估算器：参数量×精度 → 权重/KV/全账 → 对照硬件判定
    llmMemory: {
      _presets: [
        { label: '0.5B（Qwen 0.5B 级）', n: 0.5e9, layers: 24, dmodel: 896 },
        { label: '1.5B（Qwen 1.5B 级）', n: 1.5e9, layers: 28, dmodel: 1536 },
        { label: '3B', n: 3e9, layers: 36, dmodel: 2048 },
        { label: '7B（Qwen/Llama 7B 级）', n: 7e9, layers: 32, dmodel: 4096 },
        { label: '14B', n: 14e9, layers: 48, dmodel: 5120 },
        { label: '32B', n: 32e9, layers: 64, dmodel: 6400 },
        { label: '70B', n: 70e9, layers: 80, dmodel: 8192 },
      ],
      _hw: [
        { label: 'STM32F4（192KB RAM / 1MB Flash）', ram: 192 * 1024, usable: 0.8 },
        { label: 'ESP32-S3（512KB + 8MB PSRAM）', ram: 8 * 1024 * 1024, usable: 0.7 },
        { label: '树莓派 Zero 2（512MB）', ram: 512 * 1024 * 1024, usable: 0.55 },
        { label: '树莓派 4B（4GB）', ram: 4 * 1024 ** 3, usable: 0.75 },
        { label: '树莓派 5（8GB）', ram: 8 * 1024 ** 3, usable: 0.75 },
        { label: 'RK3588（16GB）', ram: 16 * 1024 ** 3, usable: 0.8 },
      ],
      _bytes: { fp32: 4, fp16: 2, int8: 1, int4: 0.5 },
      _kvBytes: { fp32: 4, fp16: 2, int8: 1, int4: 0.5 },
      render(el) {
        el.innerHTML = `
          <div class="space-y-4">
            <div class="info-box info"><div>公式：权重内存 ≈ 参数量 × 每参数字节（fp16=2 / int8=1 / int4=0.5）；KV Cache = 2×每元素字节×层数×d<sub>model</sub>×上下文长度（ai-04）；全账再 +20% 运行开销。选型口诀：先算显存再挑模型，留 20% 余量。</div></div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div class="text-xs text-gray-500 mb-1">模型规模</div>
                <select id="lm-model" class="w-full px-3 py-2 rounded text-sm" style="border:1px solid var(--border);background:var(--bg)">
                  <option value="custom">自定义…</option>
                  ${this._presets.map((p, i) => `<option value="${i}">${p.label}</option>`).join('')}
                </select>
              </div>
              <div>
                <div class="text-xs text-gray-500 mb-1">参数量（十亿 B）</div>
                <input id="lm-n" type="number" value="0.5" min="0.01" step="0.1" class="w-full px-3 py-2 rounded text-sm" style="border:1px solid var(--border);background:var(--bg)">
              </div>
              <div>
                <div class="text-xs text-gray-500 mb-1">权重精度</div>
                <select id="lm-prec" class="w-full px-3 py-2 rounded text-sm" style="border:1px solid var(--border);background:var(--bg)">
                  <option value="fp32">fp32（4 B/参数）</option>
                  <option value="fp16">fp16（2 B/参数）</option>
                  <option value="int8">int8（1 B/参数）</option>
                  <option value="int4" selected>int4（0.5 B/参数，GGUF Q4）</option>
                </select>
              </div>
              <div>
                <div class="text-xs text-gray-500 mb-1">上下文长度（token）</div>
                <select id="lm-ctx" class="w-full px-3 py-2 rounded text-sm" style="border:1px solid var(--border);background:var(--bg)">
                  <option value="512">512</option>
                  <option value="2048" selected>2048</option>
                  <option value="8192">8192</option>
                  <option value="32768">32768</option>
                </select>
              </div>
              <div class="sm:col-span-2">
                <div class="text-xs text-gray-500 mb-1">目标硬件</div>
                <select id="lm-hw" class="w-full px-3 py-2 rounded text-sm" style="border:1px solid var(--border);background:var(--bg)">
                  ${this._hw.map((h, i) => `<option value="${i}" ${i === 3 ? 'selected' : ''}>${h.label}</option>`).join('')}
                </select>
              </div>
            </div>
            <button onclick="Calculator._calculators.llmMemory.calc()" class="px-4 py-2 rounded font-medium w-full sm:w-auto" style="background:var(--primary);color:white">估算内存</button>
            <div id="lm-result"></div>
          </div>`;
        const self = this;
        document.getElementById('lm-model').addEventListener('change', function () {
          if (this.value !== 'custom') {
            const p = self._presets[+this.value];
            document.getElementById('lm-n').value = (p.n / 1e9).toString();
          }
        });
        this.calc();
      },
      fmt(b) {
        if (b >= 1024 ** 3) return (b / 1024 ** 3).toFixed(2) + ' GB';
        if (b >= 1024 ** 2) return (b / 1024 ** 2).toFixed(1) + ' MB';
        return (b / 1024).toFixed(1) + ' KB';
      },
      calc() {
        const result = document.getElementById('lm-result');
        if (!result) return;
        const $ = id => document.getElementById(id);
        const nB = parseFloat($('lm-n').value);
        const prec = $('lm-prec').value;
        const ctxLen = +$('lm-ctx').value;
        const hw = this._hw[+$('lm-hw').value];
        const modelSel = $('lm-model').value;
        if (!nB || nB <= 0) { result.innerHTML = '<div class="text-gray-500 p-2">请输入有效参数量</div>'; return; }
        // 层数/d_model：预置模型查表，自定义按 7B 比例估算
        let layers = 32, dmodel = 4096;
        if (modelSel !== 'custom') { ({ layers, dmodel } = this._presets[+modelSel]); }
        else { const scale = (nB * 1e9) / 7e9; layers = Math.max(4, Math.round(32 * Math.pow(scale, 1 / 3))); dmodel = Math.max(256, Math.round(4096 * Math.pow(scale, 1 / 3) / 64) * 64); }
        const weights = nB * 1e9 * this._bytes[prec];
        // KV Cache：int4 模型 KV 通常降到 q8（保守按 int8 算）
        const kvB = prec === 'int4' ? this._kvBytes.int8 : this._kvBytes[prec];
        const kv = 2 * kvB * layers * dmodel * ctxLen;
        const total = (weights + kv) * 1.2;
        const avail = hw.ram * hw.usable;
        const verdict = total < avail * 0.6
          ? { t: '✅ 富余', c: '#059669', d: '内存占用不到可用内存六成，可正常跑' }
          : total <= avail
          ? { t: '🟡 勉强', c: '#f59e0b', d: '接近可用上限：缩短上下文或降精度更稳' }
          : { t: '❌ 放不下', c: '#ef4444', d: '超出可用内存，换更小模型 / 更低精度 / 更大内存板' };
        result.innerHTML = `
          <div class="space-y-2 p-3 rounded" style="background:var(--bg-secondary);border:1px solid var(--border)">
            <div class="flex justify-between flex-wrap gap-2 items-center">
              <b>判定（${hw.label.split('（')[0]}）</b>
              <span style="color:${verdict.c};font-weight:700;font-size:1.1em">${verdict.t}</span>
            </div>
            <div class="text-xs text-gray-500">${verdict.d}（可用内存 ≈ ${this.fmt(avail)}，占用 ${(total / avail * 100).toFixed(0)}%）</div>
            <div class="text-sm">权重内存：<b>${this.fmt(weights)}</b>（${nB}B × ${this._bytes[prec]} B/参数）</div>
            <div class="text-sm">KV Cache：<b>${this.fmt(kv)}</b>（${layers} 层 × d=${dmodel} × ${ctxLen.toLocaleString()} token${prec === 'int4' ? '，KV 按 int8 计' : ''}）</div>
            <div class="text-sm">全账（+20% 开销）：<b style="color:var(--primary)">${this.fmt(total)}</b></div>
            ${modelSel === 'custom' ? '<div class="text-xs text-gray-500">自定义规模的层数/d_model 按 7B 立方根比例估算，仅数量级参考</div>' : ''}
            <div class="text-xs text-gray-500">依据：ai-04（KV Cache 公式）与 ai-12（内存全账与量化）。MCU 跑 LLM 目前不现实——MCU 端 AI 请走 TinyML 小模型路线（ai-11/13）。</div>
          </div>`;
      },
    },
  },
};
