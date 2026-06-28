// 公式计算器模块
// 提供 9 个实用计算器工具，覆盖线性代数、电路、自控、数电等板块

const Calculator = {
  // 当前活动的计算器
  _active: null,

  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${this._list.map(c => `
          <div class="knowledge-card cursor-pointer" onclick="Calculator.open('${c.id}')">
            <h3 style="font-size:1rem">${c.icon} ${c.title}</h3>
            <p class="card-desc mb-3">${c.desc}</p>
            <div class="text-center py-2 text-sm font-medium" style="color:var(--primary)">
              点击使用 →
            </div>
          </div>
        `).join('')}
      </div>`;
  },

  // 打开指定计算器
  open(id) {
    const calc = this._calculators[id];
    if (!calc) return;
    this._active = id;
    // 创建模态框
    const modal = document.createElement('div');
    modal.id = 'calc-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
    modal.style.cssText = 'background:rgba(0,0,0,0.5);backdrop-filter:blur(4px)';
    modal.onclick = (e) => { if (e.target === modal) Calculator.close(); };
    modal.innerHTML = `
      <div class="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl" style="background:var(--bg);border:1px solid var(--border)">
        <div class="flex items-center justify-between p-4 border-b" style="border-color:var(--border)">
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

  // 计算器清单
  _list: [
    { id: 'matrix', title: '矩阵计算器', desc: '加/乘/逆/转置/行列式/特征值', icon: '⊞' },
    { id: 'laplace', title: '拉氏变换查表', desc: '常用函数 ↔ s 域，可查可搜', icon: 'ℒ' },
    { id: 'opamp-gain', title: '运放增益计算', desc: '反相/同相/差分放大', icon: '🔺' },
    { id: 'rc-rl', title: 'RC/RL 时间常数', desc: '一阶电路时间常数、截止频率', icon: '⏱' },
    { id: 'num-convert', title: '数制转换', desc: '十/二/十六进制 + 原码补码', icon: '0️⃣' },
    { id: 'routh', title: '劳斯表生成器', desc: '输入特征方程，自动判稳', icon: '⚖' },
    { id: 'kmap', title: '卡诺图化简器', desc: '输入真值表，输出最简式', icon: '▦' },
    { id: 'pid-tune', title: 'PID 整定计算', desc: 'Ziegler-Nichols 参数计算', icon: '🔧' },
    { id: 'sort-vis', title: '排序复杂度对比', desc: '各排序算法步数估算', icon: '↕' },
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
  },
};
