// 公式计算器模块
// 第 0 期占位：渲染一个"建设中"提示。后续逐板块填充具体计算器
// （运放增益、RC 时间常数、矩阵运算、拉氏变换查表、数制转换、劳斯表等）。

const Calculator = {
  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${this._list.map(c => `
          <div class="knowledge-card">
            <h3 style="font-size:1rem">${c.icon} ${c.title}</h3>
            <p class="card-desc mb-3">${c.desc}</p>
            <div class="text-center py-6 text-sm" style="color:var(--text-secondary);border:1px dashed var(--border);border-radius:0.5rem">
              🚧 建设中
            </div>
          </div>
        `).join('')}
      </div>
      <div class="info-box info mt-4">
        <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <div>计算器将随各板块内容同步上线。计划包括：矩阵运算、拉普拉斯变换查表、运放增益、RC/RL 时间常数、数制转换、劳斯表生成器、卡诺图化简器等 9+ 个工具。</div>
      </div>`;
  },

  // 计算器清单（第 0 期占位，后续每个实现为独立函数）
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
};
