// 公式计算器模块
// 提供 23 个实用计算器工具，覆盖电路、控制、信号、数电、计算机、协议、电机等领域

const Calculator = {
  // 当前活动的计算器
  _active: null,

  // 分类顺序
  _categoryOrder: ['电路基础', '模拟电路', '数字电路', '信号处理', '自动控制', '计算机', '工程协议', '电机驱动'],

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
    const icons = {'电路基础':'🔵','模拟电路':'🟢','数字电路':'🟡','信号处理':'📡','自动控制':'🟣','计算机':'💻','工程协议':'🔌','电机驱动':'⚡'};
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
      modal.onclick = (e) => { if (e.target === modal) Calculator.close(); };
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
    modal.onclick = (e) => { if (e.target === modal) Calculator.close(); };
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
  },

  close() {
    const modal = document.getElementById('calc-modal');
    if (modal) modal.remove();
    this._active = null;
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
    // ===== 计算机 =====
    { id: 'matrix', title: '矩阵计算器', desc: '加/乘/逆/转置/行列式/特征值', icon: '⊞', category: '计算机' },
    { id: 'sort-vis', title: '排序复杂度对比', desc: '各排序算法步数估算', icon: '↕', category: '计算机' },
    { id: 'subnet', title: 'IP 子网划分', desc: 'CIDR/掩码/可用主机数', icon: '🌐', category: '计算机' },
    // ===== 工程协议 =====
    { id: 'validator', title: '协议校验器', desc: 'CRC-8/16/32/Modbus/CAN 帧解析', icon: '🔐', category: '工程协议' },
    // ===== 电机驱动 =====
    { id: 'motor', title: '电机参数计算', desc: '转速-转矩-功率、步进脉冲', icon: '⚙️', category: '电机驱动' },
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
  },
};
