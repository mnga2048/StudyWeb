// 图表与交互组件模块
// 支持 ECharts 渲染和自定义 SVG 交互图表

const Charts = {
  _charts: {},          // 图表类型注册表：{ 类型名: renderFn(el) }
  _instances: [],       // 运行中的 ECharts 实例（便于切换页面时 dispose）
  _timers: [],          // 运行中的动画定时器（便于切换页面时清除）

  // 扫描容器内所有 [data-chart] 元素并渲染（带 data-init 防重复）
  renderAll(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.querySelectorAll('[data-chart]').forEach(el => {
      if (el.dataset.init) return;       // 防重复渲染
      el.dataset.init = '1';
      const type = el.dataset.chart;
      const fn = this._charts[type];
      if (fn) {
        try { fn.call(this, el); }
        catch (e) { console.warn(`图表渲染失败 [${type}]:`, e); el.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--text-secondary)">图表渲染失败</div>'; }
      } else {
        el.innerHTML = `<div style="padding:2rem;text-align:center;color:var(--text-secondary)">图表类型 "${type}" 暂未实现（建设中）</div>`;
      }
    });
  },

  // 工具箱页的进度饼图（ECharts）
  renderProgressChart(elId) {
    const el = document.getElementById(elId);
    if (!el || typeof echarts === 'undefined') return;
    const stats = Progress.getStats();
    const inst = echarts.init(el);
    this._instances.push(inst);
    inst.setOption({
      tooltip: { trigger: 'item' },
      legend: { bottom: 0, textStyle: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary') } },
      series: [{
        type: 'pie', radius: ['45%', '70%'], avoidLabelOverlap: false,
        label: { show: true, formatter: '{b}: {c}' },
        data: [
          { value: stats.completed, name: '已完成', itemStyle: { color: '#059669' } },
          { value: stats.learning, name: '学习中', itemStyle: { color: '#d97706' } },
          { value: stats.pending, name: '未开始', itemStyle: { color: '#cbd5e1' } },
        ],
      }],
    });
  },

  // 切换页面前停止所有动画定时器、销毁 ECharts 实例
  stopAll() {
    this._timers.forEach(t => { clearInterval(t); clearTimeout(t); });
    this._timers = [];
  },

  // 注册新图表类型（供后续扩展调用）
  register(type, fn) { this._charts[type] = fn; },
};

// ==================== 注册图表类型 ====================

// 阶跃响应图（二阶系统）
Charts.register('step-response', function(el) {
  const zeta = parseFloat(el.dataset.zeta || '0.5');
  const omega = parseFloat(el.dataset.omega || '1');
  const title = el.dataset.title || '二阶系统阶跃响应';

  // 计算响应数据
  const data = [];
  const dt = 0.01;
  const tmax = Math.max(15/omega, 10);
  for (let t = 0; t <= tmax; t += dt) {
    let y;
    if (zeta < 1) {
      // 欠阻尼
      const wd = omega * Math.sqrt(1 - zeta*zeta);
      const sigma = zeta * omega;
      y = 1 - Math.exp(-sigma*t) * (Math.cos(wd*t) + (sigma/wd)*Math.sin(wd*t));
    } else if (zeta === 1) {
      // 临界阻尼
      y = 1 - (1 + omega*t) * Math.exp(-omega*t);
    } else {
      // 过阻尼
      const s1 = -omega*(zeta + Math.sqrt(zeta*zeta-1));
      const s2 = -omega*(zeta - Math.sqrt(zeta*zeta-1));
      y = 1 + (s2*Math.exp(s1*t) - s1*Math.exp(s2*t))/(s1-s2);
    }
    data.push([parseFloat(t.toFixed(3)), parseFloat(y.toFixed(4))]);
  }

  if (typeof echarts !== 'undefined') {
    const inst = echarts.init(el);
    Charts._instances.push(inst);
    inst.setOption({
      title: { text: title, textStyle: { fontSize: 14 } },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'value', name: 't', nameLocation: 'end' },
      yAxis: { type: 'value', name: 'y(t)', nameLocation: 'end', max: zeta < 1 ? undefined : 1.05 },
      series: [{
        type: 'line', data: data, showSymbol: false, lineStyle: { width: 2 },
        areaStyle: { opacity: 0.1 },
        markLine: { data: [{ yAxis: 1, lineStyle: { type: 'dashed', color: '#999' } }] }
      }],
      grid: { left: 50, right: 20, top: 40, bottom: 30 },
    });
    // 添加参数控制
    el.style.position = 'relative';
    const controls = document.createElement('div');
    controls.style.cssText = 'position:absolute;top:8px;right:8px;display:flex;gap:8px;align-items:center;font-size:12px';
    controls.innerHTML = `
      <label>ζ: <input type="range" id="sr-zeta" min="0" max="2" step="0.1" value="${zeta}" style="width:80px"> <span id="sr-zeta-val">${zeta}</span></label>
      <label>ωn: <input type="range" id="sr-omega" min="0.1" max="5" step="0.1" value="${omega}" style="width:80px"> <span id="sr-omega-val">${omega}</span></label>`;
    el.appendChild(controls);
    const update = () => {
      const z = parseFloat(document.getElementById('sr-zeta')?.value || zeta);
      const w = parseFloat(document.getElementById('sr-omega')?.value || omega);
      document.getElementById('sr-zeta-val').textContent = z.toFixed(1);
      document.getElementById('sr-omega-val').textContent = w.toFixed(1);
      const newData = [];
      const tmax2 = Math.max(15/w, 10);
      for (let t = 0; t <= tmax2; t += dt) {
        let y;
        if (z < 1) {
          const wd = w * Math.sqrt(1 - z*z);
          const sigma = z * w;
          y = 1 - Math.exp(-sigma*t) * (Math.cos(wd*t) + (sigma/wd)*Math.sin(wd*t));
        } else if (z === 1) {
          y = 1 - (1 + w*t) * Math.exp(-w*t);
        } else {
          const s1 = -w*(z + Math.sqrt(z*z-1));
          const s2 = -w*(z - Math.sqrt(z*z-1));
          y = 1 + (s2*Math.exp(s1*t) - s1*Math.exp(s2*t))/(s1-s2);
        }
        newData.push([parseFloat(t.toFixed(3)), parseFloat(y.toFixed(4))]);
      }
      inst.setOption({ series: [{ data: newData }] });
    };
    el.querySelector('#sr-zeta')?.addEventListener('input', update);
    el.querySelector('#sr-omega')?.addEventListener('input', update);
  }
});

// 伯德图（一阶系统，带交互滑块）
Charts.register('bode-plot', function(el) {
  const initK = parseFloat(el.dataset.gain || '1');
  const initT = parseFloat(el.dataset.timeconst || '1');
  const title = el.dataset.title || '一阶系统伯德图';

  function calcData(K, T) {
    const freqData = [], phaseData = [];
    for (let logw = -2; logw <= 2; logw += 0.05) {
      const w = Math.pow(10, logw);
      const mag = 20 * Math.log10(K / Math.sqrt(1 + (w*T)*(w*T)));
      const phase = -Math.atan(w*T) * 180 / Math.PI;
      freqData.push([parseFloat(logw.toFixed(2)), parseFloat(mag.toFixed(2))]);
      phaseData.push([parseFloat(logw.toFixed(2)), parseFloat(phase.toFixed(2))]);
    }
    return { freqData, phaseData };
  }

  // 创建滑块控件
  const controls = document.createElement('div');
  controls.style.cssText = 'display:flex;gap:1.5rem;align-items:center;padding:0.75rem;background:var(--bg-secondary);border-radius:0.5rem;margin-top:0.5rem;font-size:0.8rem;flex-wrap:wrap;';
  controls.innerHTML = `
    <label style="display:flex;align-items:center;gap:0.5rem">
      <span>K (增益):</span>
      <input type="range" id="bode-k" min="0.1" max="10" step="0.1" value="${initK}" style="width:120px">
      <span id="bode-k-val" style="min-width:2.5rem;font-weight:600">${initK}</span>
    </label>
    <label style="display:flex;align-items:center;gap:0.5rem">
      <span>T (时间常数):</span>
      <input type="range" id="bode-t" min="0.1" max="5" step="0.1" value="${initT}" style="width:120px">
      <span id="bode-t-val" style="min-width:2.5rem;font-weight:600">${initT}</span>
    </label>
    <span style="color:var(--text-secondary)">转折频率 ωc = <span id="bode-wc" style="font-weight:600">${(1/initT).toFixed(2)}</span> rad/s</span>
  `;
  el.appendChild(controls);

  const { freqData, phaseData } = calcData(initK, initT);

  if (typeof echarts !== 'undefined') {
    const chartEl = document.createElement('div');
    chartEl.style.height = '350px';
    el.insertBefore(chartEl, controls);

    const inst = echarts.init(chartEl);
    Charts._instances.push(inst);
    inst.setOption({
      title: { text: title, textStyle: { fontSize: 14 } },
      tooltip: { trigger: 'axis' },
      legend: { data: ['幅频特性', '相频特性'], bottom: 0 },
      grid: [
        { left: 50, right: 20, top: 40, height: '35%' },
        { left: 50, right: 20, top: '55%', height: '35%' }
      ],
      xAxis: [
        { type: 'value', name: 'lg(ω)', gridIndex: 0, min: -2, max: 2 },
        { type: 'value', name: 'lg(ω)', gridIndex: 1, min: -2, max: 2 }
      ],
      yAxis: [
        { type: 'value', name: '20lg|G| (dB)', gridIndex: 0 },
        { type: 'value', name: '∠G (°)', gridIndex: 1, min: -95, max: 5 }
      ],
      series: [
        { name: '幅频特性', type: 'line', xAxisIndex: 0, yAxisIndex: 0, data: freqData, showSymbol: false, lineStyle: { width: 2, color: '#3b82f6' } },
        { name: '相频特性', type: 'line', xAxisIndex: 1, yAxisIndex: 1, data: phaseData, showSymbol: false, lineStyle: { width: 2, color: '#ef4444' } },
      ],
    });

    // 更新函数
    function update() {
      const K = parseFloat(document.getElementById('bode-k')?.value || initK);
      const T = parseFloat(document.getElementById('bode-t')?.value || initT);
      document.getElementById('bode-k-val').textContent = K.toFixed(1);
      document.getElementById('bode-t-val').textContent = T.toFixed(1);
      document.getElementById('bode-wc').textContent = (1/T).toFixed(2);
      const { freqData: fd, phaseData: pd } = calcData(K, T);
      inst.setOption({ series: [{ data: fd }, { data: pd }] });
    }
    el.querySelector('#bode-k')?.addEventListener('input', update);
    el.querySelector('#bode-t')?.addEventListener('input', update);
  }
});

// 根轨迹图（带交互控件）
Charts.register('root-locus', function(el) {
  const title = el.dataset.title || '根轨迹示意图';

  // 计算根轨迹数据
  function calcLocus(p1, p2) {
    const data = [];
    for (let K = 0; K <= 200; K += 0.3) {
      // (s-p1)(s-p2) + K = 0 => s² - (p1+p2)s + p1*p2 + K = 0
      const b = -(p1 + p2);
      const c = p1 * p2 + K;
      const disc = b*b - 4*c;
      if (disc >= 0) {
        const s1 = (-b + Math.sqrt(disc))/2;
        const s2 = (-b - Math.sqrt(disc))/2;
        data.push([s1, 0]);
        data.push([s2, 0]);
      } else {
        const real = -b/2;
        const imag = Math.sqrt(-disc)/2;
        data.push([real, imag]);
        data.push([real, -imag]);
      }
    }
    return data;
  }

  // 创建滑块控件
  const controls = document.createElement('div');
  controls.style.cssText = 'display:flex;gap:1.5rem;align-items:center;padding:0.75rem;background:var(--bg-secondary);border-radius:0.5rem;margin-top:0.5rem;font-size:0.8rem;flex-wrap:wrap;';
  controls.innerHTML = `
    <label style="display:flex;align-items:center;gap:0.5rem">
      <span>极点 p₁:</span>
      <input type="range" id="rl-p1" min="-5" max="0" step="0.1" value="0" style="width:120px">
      <span id="rl-p1-val" style="min-width:2.5rem;font-weight:600">0</span>
    </label>
    <label style="display:flex;align-items:center;gap:0.5rem">
      <span>极点 p₂:</span>
      <input type="range" id="rl-p2" min="-5" max="0" step="0.1" value="-2" style="width:120px">
      <span id="rl-p2-val" style="min-width:2.5rem;font-weight:600">-2</span>
    </label>
    <span style="color:var(--text-secondary)">G(s) = K / [(s-p₁)(s-p₂)]</span>
  `;
  el.appendChild(controls);

  if (typeof echarts !== 'undefined') {
    const chartEl = document.createElement('div');
    chartEl.style.height = '400px';
    el.insertBefore(chartEl, controls);

    const initP1 = 0, initP2 = -2;
    const locusData = calcLocus(initP1, initP2);

    const inst = echarts.init(chartEl);
    Charts._instances.push(inst);
    inst.setOption({
      title: { text: title, subtext: `G(s) = K / [(s-(${initP1}))(s-(${initP2}))]`, textStyle: { fontSize: 14 } },
      tooltip: { trigger: 'item' },
      xAxis: { type: 'value', name: 'σ', min: -6, max: 2 },
      yAxis: { type: 'value', name: 'jω', min: -5, max: 5 },
      series: [
        {
          type: 'line', data: locusData, showSymbol: false,
          lineStyle: { width: 2, color: '#3b82f6' },
          name: '根轨迹'
        },
        {
          type: 'scatter', data: [[initP1, 0], [initP2, 0]],
          symbol: 'cross', symbolSize: 15, name: '极点',
          itemStyle: { color: '#ef4444' },
          label: { show: true, formatter: (p) => p.dataIndex === 0 ? 'p₁' : 'p₂', position: 'top' }
        },
      ],
      grid: { left: 50, right: 20, top: 60, bottom: 30 },
    });

    // 更新函数
    function update() {
      const p1 = parseFloat(document.getElementById('rl-p1')?.value || 0);
      const p2 = parseFloat(document.getElementById('rl-p2')?.value || -2);
      document.getElementById('rl-p1-val').textContent = p1.toFixed(1);
      document.getElementById('rl-p2-val').textContent = p2.toFixed(1);
      const data = calcLocus(p1, p2);
      inst.setOption({
        title: { subtext: `G(s) = K / [(s-(${p1.toFixed(1)}))(s-(${p2.toFixed(1)}))]` },
        series: [
          { data: data },
          { data: [[p1, 0], [p2, 0]] }
        ]
      });
    }
    el.querySelector('#rl-p1')?.addEventListener('input', update);
    el.querySelector('#rl-p2')?.addEventListener('input', update);
  }
});

// 排序算法可视化
Charts.register('sort-compare', function(el) {
  const n = parseInt(el.dataset.n || '16');
  const title = el.dataset.title || '排序算法对比';

  // 生成随机数组
  const arr = Array.from({length: n}, () => Math.floor(Math.random() * 100) + 1);
  const sorted = [...arr].sort((a,b) => a-b);

  // 渲染柱状图
  el.innerHTML = `
    <div style="text-align:center;margin-bottom:8px">
      <strong>${title}</strong>
      <div style="font-size:12px;color:var(--text-secondary)">数据规模: n=${n}</div>
    </div>
    <div id="sort-bars" style="display:flex;align-items:flex-end;justify-content:center;gap:2px;height:200px;border-bottom:1px solid var(--border)"></div>
    <div style="display:flex;gap:8px;justify-content:center;margin-top:12px;flex-wrap:wrap">
      <button onclick="Charts._sortAnimate('bubble')" class="px-3 py-1 rounded text-sm" style="background:var(--primary);color:white">冒泡排序</button>
      <button onclick="Charts._sortAnimate('insertion')" class="px-3 py-1 rounded text-sm" style="background:var(--primary);color:white">插入排序</button>
      <button onclick="Charts._sortAnimate('selection')" class="px-3 py-1 rounded text-sm" style="background:var(--primary);color:white">选择排序</button>
      <button onclick="Charts._sortAnimate('quick')" class="px-3 py-1 rounded text-sm" style="background:var(--primary);color:white">快速排序</button>
    </div>
    <div id="sort-info" style="text-align:center;margin-top:8px;font-size:13px;color:var(--text-secondary)"></div>`;

  // 存储数据
  Charts._sortData = [...arr];
  Charts._sortN = n;

  // 渲染函数
  Charts._renderBars = function(highlights = {}) {
    const container = document.getElementById('sort-bars');
    if (!container) return;
    const maxVal = Math.max(...Charts._sortData);
    container.innerHTML = Charts._sortData.map((v, i) => {
      const color = highlights.comparing?.includes(i) ? '#f59e0b' :
                    highlights.swapping?.includes(i) ? '#ef4444' :
                    highlights.sorted?.includes(i) ? '#10b981' : 'var(--primary)';
      return `<div style="flex:1;background:${color};height:${(v/maxVal)*100}%;transition:height 0.1s;border-radius:2px 2px 0 0"></div>`;
    }).join('');
  };

  Charts._renderBars();

  // 排序动画
  Charts._sortAnimate = async function(type) {
    const arr = Charts._sortData;
    const n = Charts._sortN;
    let steps = 0;
    const info = document.getElementById('sort-info');

    const swap = async (i, j) => {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      steps++;
      Charts._renderBars({ swapping: [i, j] });
      if (info) info.textContent = `步骤: ${steps}`;
      await new Promise(r => { const t = setTimeout(r, 30); Charts._timers.push(t); });
    };

    const compare = async (i, j) => {
      steps++;
      Charts._renderBars({ comparing: [i, j] });
      if (info) info.textContent = `步骤: ${steps}`;
      await new Promise(r => { const t = setTimeout(r, 15); Charts._timers.push(t); });
      return arr[i] - arr[j];
    };

    if (type === 'bubble') {
      for (let i = 0; i < n-1; i++) {
        for (let j = 0; j < n-1-i; j++) {
          if (await compare(j, j+1) > 0) await swap(j, j+1);
        }
      }
    } else if (type === 'insertion') {
      for (let i = 1; i < n; i++) {
        let j = i;
        while (j > 0 && await compare(j-1, j) > 0) {
          await swap(j-1, j);
          j--;
        }
      }
    } else if (type === 'selection') {
      for (let i = 0; i < n-1; i++) {
        let min = i;
        for (let j = i+1; j < n; j++) {
          await compare(min, j);
          if (arr[j] < arr[min]) min = j;
        }
        if (min !== i) await swap(i, min);
      }
    } else if (type === 'quick') {
      async function qs(lo, hi) {
        if (lo >= hi) return;
        const pivot = arr[hi];
        let i = lo;
        for (let j = lo; j < hi; j++) {
          await compare(j, hi);
          if (arr[j] < pivot) {
            if (i !== j) await swap(i, j);
            i++;
          }
        }
        if (i !== hi) await swap(i, hi);
        await qs(lo, i-1);
        await qs(i+1, hi);
      }
      await qs(0, n-1);
    }

    Charts._renderBars({ sorted: Array.from({length: n}, (_, i) => i) });
    if (info) info.textContent = `排序完成！共 ${steps} 步`;
  };
});

// RC 电路充放电波形
Charts.register('rc-waveform', function(el) {
  const initR = parseFloat(el.dataset.resistance || '1000');
  const initC = parseFloat(el.dataset.capacitance || '1e-6');
  const V0 = parseFloat(el.dataset.voltage || '5');
  const title = el.dataset.title || 'RC 充放电波形';

  function calcData(R, C) {
    const tau = R * C;
    const tmax = 5 * tau;
    const chargeData = [], dischargeData = [];
    for (let t = 0; t <= tmax; t += tmax/200) {
      chargeData.push([parseFloat((t*1000).toFixed(2)), parseFloat((V0*(1-Math.exp(-t/tau))).toFixed(3))]);
      dischargeData.push([parseFloat((t*1000).toFixed(2)), parseFloat((V0*Math.exp(-t/tau)).toFixed(3))]);
    }
    return { chargeData, dischargeData, tau };
  }

  // 创建滑块控件
  const controls = document.createElement('div');
  controls.style.cssText = 'display:flex;gap:1.5rem;align-items:center;padding:0.75rem;background:var(--bg-secondary);border-radius:0.5rem;margin-top:0.5rem;font-size:0.8rem;flex-wrap:wrap;';
  controls.innerHTML = `
    <label style="display:flex;align-items:center;gap:0.5rem">
      <span>R (Ω):</span>
      <input type="range" id="rc-r" min="100" max="10000" step="100" value="${initR}" style="width:120px">
      <span id="rc-r-val" style="min-width:3.5rem;font-weight:600">${initR}</span>
    </label>
    <label style="display:flex;align-items:center;gap:0.5rem">
      <span>C (μF):</span>
      <input type="range" id="rc-c" min="0.1" max="100" step="0.1" value="${initC*1e6}" style="width:120px">
      <span id="rc-c-val" style="min-width:3rem;font-weight:600">${initC*1e6}</span>
    </label>
    <span style="color:var(--text-secondary)">τ = <span id="rc-tau" style="font-weight:600">${(initR*initC*1000).toFixed(2)}</span> ms | 5τ = <span id="rc-5tau" style="font-weight:600">${(initR*initC*5000).toFixed(2)}</span> ms</span>
  `;
  el.appendChild(controls);

  if (typeof echarts !== 'undefined') {
    const chartEl = document.createElement('div');
    chartEl.style.height = '350px';
    el.insertBefore(chartEl, controls);

    const { chargeData, dischargeData, tau } = calcData(initR, initC);

    const inst = echarts.init(chartEl);
    Charts._instances.push(inst);
    inst.setOption({
      title: { text: title, subtext: `τ = RC = ${(tau*1000).toFixed(2)} ms`, textStyle: { fontSize: 14 } },
      tooltip: { trigger: 'axis' },
      legend: { data: ['充电', '放电'], bottom: 0 },
      xAxis: { type: 'value', name: 't (ms)', nameLocation: 'end' },
      yAxis: { type: 'value', name: 'Vc (V)', nameLocation: 'end', max: V0 * 1.1 },
      series: [
        { name: '充电', type: 'line', data: chargeData, showSymbol: false, lineStyle: { width: 2, color: '#3b82f6' } },
        { name: '放电', type: 'line', data: dischargeData, showSymbol: false, lineStyle: { width: 2, color: '#ef4444', type: 'dashed' } },
      ],
      grid: { left: 60, right: 20, top: 60, bottom: 40 },
    });

    // 更新函数
    function update() {
      const R = parseFloat(document.getElementById('rc-r')?.value || initR);
      const C_uF = parseFloat(document.getElementById('rc-c')?.value || initC*1e6);
      const C = C_uF * 1e-6;
      document.getElementById('rc-r-val').textContent = R.toFixed(0);
      document.getElementById('rc-c-val').textContent = C_uF.toFixed(1);
      const tau = R * C;
      document.getElementById('rc-tau').textContent = (tau*1000).toFixed(2);
      document.getElementById('rc-5tau').textContent = (tau*5000).toFixed(2);
      const { chargeData: cd, dischargeData: dd } = calcData(R, C);
      inst.setOption({
        title: { subtext: `τ = RC = ${(tau*1000).toFixed(2)} ms` },
        series: [{ data: cd }, { data: dd }]
      });
    }
    el.querySelector('#rc-r')?.addEventListener('input', update);
    el.querySelector('#rc-c')?.addEventListener('input', update);
  }
});

// ==================== 学习路径图表 ====================

// 知识图谱（ECharts graph 力导向布局）
Charts.register('knowledge-graph', function(el) {
  if (typeof echarts === 'undefined' || typeof KnowledgeDeps === 'undefined') return;

  const SECTION_GROUPS = ['advanced-math','linear-algebra','probability','circuit-basics','analog-circuit','digital-circuit','power-electronics','motor-drive','control','modern-control','embedded-sys','sensor','robotics','data-structure','signals','cpp','os','network'];
  const groupColors = {
    'advanced-math': '#dc2626', 'linear-algebra': '#d97706', 'probability': '#be185d',
    'circuit-basics': '#2563eb', 'analog-circuit': '#059669', 'digital-circuit': '#eab308',
    'power-electronics': '#0d9488', 'motor-drive': '#ea580c',
    'control': '#7c3aed', 'modern-control': '#6d28d9',
    'embedded-sys': '#475569', 'sensor': '#0891b2', 'robotics': '#be123c',
    'data-structure': '#1e293b', 'signals': '#0369a1',
    'cpp': '#b91c1c', 'os': '#15803d', 'network': '#1d4ed8'
  };
  const statusColors = { completed: '#059669', learning: '#d97706', pending: '#cbd5e1' };

  function getMasteryScore(sectionId) {
    const status = Progress.get(sectionId) || 'pending';
    const accuracy = Quiz.getAccuracy(sectionId);
    let base = status === 'completed' ? 60 : status === 'learning' ? 20 : 0;
    if (accuracy !== null) base += accuracy * 40;
    return Math.round(base);
  }

  const nodes = [];
  const links = [];
  const categories = SECTION_GROUPS.map(gId => ({ name: CourseData[gId]?.title || gId }));

  // 板块节点
  SECTION_GROUPS.forEach((gId, i) => {
    const g = CourseData[gId];
    if (!g) return;
    nodes.push({
      id: gId, name: g.title, symbolSize: 45, category: i,
      itemStyle: { color: groupColors[gId], borderColor: '#fff', borderWidth: 2 },
      label: { show: true, fontSize: 11, fontWeight: 'bold' }
    });
  });

  // 知识点节点
  SECTION_GROUPS.forEach((gId, i) => {
    const g = CourseData[gId];
    if (!g?.sections) return;
    g.sections.forEach(s => {
      const mastery = getMasteryScore(s.id);
      const status = Progress.get(s.id) || 'pending';
      nodes.push({
        id: s.id, name: s.title, symbolSize: 12 + mastery * 0.15, category: i,
        itemStyle: { color: statusColors[status], borderColor: '#fff', borderWidth: 1 },
        label: { show: false }
      });
      links.push({ source: gId, target: s.id, lineStyle: { opacity: 0.1, width: 0.5 } });
    });
  });

  // 依赖关系连线
  Object.entries(KnowledgeDeps).forEach(([target, sources]) => {
    if (Array.isArray(sources)) {
      sources.forEach(src => {
        links.push({
          source: src, target,
          lineStyle: { color: '#94a3b8', type: 'dashed', width: 1, opacity: 0.4 }
        });
      });
    }
  });

  const inst = echarts.init(el);
  Charts._instances.push(inst);
  inst.setOption({
    tooltip: {
      formatter: function(params) {
        if (params.dataType === 'node') {
          const s = params.data;
          const status = Progress.get(s.id) || 'pending';
          const accuracy = Quiz.getAccuracy(s.id);
          const statusText = status === 'completed' ? '✅ 已完成' : status === 'learning' ? '📖 学习中' : '⏳ 未开始';
          const accText = accuracy !== null ? `正确率: ${Math.round(accuracy*100)}%` : '暂无答题';
          return `<strong>${s.name}</strong><br/>${statusText}<br/>${accText}`;
        }
        return '';
      }
    },
    series: [{
      type: 'graph',
      layout: 'force',
      data: nodes,
      links: links,
      categories: categories,
      roam: true,
      draggable: true,
      force: { repulsion: 200, gravity: 0.1, edgeLength: 80, layoutAnimation: true },
      lineStyle: { curveness: 0.1 },
      emphasis: { focus: 'adjacency', lineStyle: { width: 3 } },
      label: { position: 'right', fontSize: 10 }
    }]
  });

  inst.on('click', function(params) {
    if (params.dataType === 'node' && params.data.id) {
      const id = params.data.id;
      if (AllKnowledgeIds.includes(id)) navigateTo(id);
    }
  });
});

// 掌握度热力图
Charts.register('mastery-heatmap', function(el) {
  if (typeof echarts === 'undefined') return;

  const SECTION_GROUPS = ['advanced-math','linear-algebra','probability','circuit-basics','analog-circuit','digital-circuit','power-electronics','motor-drive','control','modern-control','embedded-sys','sensor','robotics','data-structure','signals','cpp','os','network'];

  function getMasteryScore(sectionId) {
    const status = Progress.get(sectionId) || 'pending';
    const accuracy = Quiz.getAccuracy(sectionId);
    let base = status === 'completed' ? 60 : status === 'learning' ? 20 : 0;
    if (accuracy !== null) base += accuracy * 40;
    return Math.round(base);
  }

  const yLabels = [];
  const data = [];
  let maxX = 0;

  SECTION_GROUPS.forEach((gId, row) => {
    const g = CourseData[gId];
    if (!g) return;
    yLabels.push(g.title);
    if (g.sections.length > maxX) maxX = g.sections.length;
    g.sections.forEach((s, col) => {
      data.push([col, row, getMasteryScore(s.id)]);
    });
  });

  const xLabels = Array.from({length: maxX}, () => '');

  const inst = echarts.init(el);
  Charts._instances.push(inst);
  inst.setOption({
    tooltip: {
      formatter: function(params) {
        const gId = SECTION_GROUPS[params.value[1]];
        const s = CourseData[gId]?.sections[params.value[0]];
        if (!s) return '';
        const status = Progress.get(s.id) || 'pending';
        const accuracy = Quiz.getAccuracy(s.id);
        const statusText = status === 'completed' ? '✅ 已完成' : status === 'learning' ? '📖 学习中' : '⏳ 未开始';
        const accText = accuracy !== null ? `正确率: ${Math.round(accuracy*100)}%` : '暂无答题';
        return `<strong>${s.title}</strong><br/>${statusText}<br/>掌握度: ${params.value[2]}%<br/>${accText}`;
      }
    },
    grid: { left: 100, right: 20, top: 10, bottom: 30 },
    xAxis: { type: 'category', data: xLabels, splitArea: { show: true }, axisLabel: { show: false } },
    yAxis: { type: 'category', data: yLabels, splitArea: { show: true } },
    visualMap: {
      min: 0, max: 100, calculable: false, orient: 'horizontal', left: 'center', bottom: 0,
      inRange: { color: ['#e2e8f0', '#fef3c7', '#fbbf24', '#34d399', '#059669'] },
      text: ['100%', '0%'], textStyle: { fontSize: 11 }
    },
    series: [{
      type: 'heatmap',
      data: data,
      label: {
        show: true,
        formatter: function(params) { return params.value[2] > 0 ? params.value[2] + '%' : ''; },
        fontSize: 10
      },
      emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
    }]
  });

  inst.on('click', function(params) {
    const gId = SECTION_GROUPS[params.value[1]];
    const s = CourseData[gId]?.sections[params.value[0]];
    if (s) navigateTo(s.id);
  });
});

// 进度环形图
Charts.register('progress-ring', function(el) {
  if (typeof echarts === 'undefined') return;

  const stats = Progress.getStats();
  const inst = echarts.init(el);
  Charts._instances.push(inst);
  inst.setOption({
    tooltip: { trigger: 'item' },
    legend: { bottom: 0, textStyle: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary') } },
    series: [{
      type: 'pie', radius: ['45%', '70%'], avoidLabelOverlap: false,
      label: { show: true, formatter: '{b}: {c}' },
      data: [
        { value: stats.completed, name: '已完成', itemStyle: { color: '#059669' } },
        { value: stats.learning, name: '学习中', itemStyle: { color: '#d97706' } },
        { value: stats.pending, name: '未开始', itemStyle: { color: '#cbd5e1' } },
      ],
    }],
  });
});

// 板块完成率柱状图
Charts.register('group-progress-bar', function(el) {
  if (typeof echarts === 'undefined') return;

  const SECTION_GROUPS = ['advanced-math','linear-algebra','probability','circuit-basics','analog-circuit','digital-circuit','power-electronics','motor-drive','control','modern-control','embedded-sys','sensor','robotics','data-structure','signals','cpp','os','network'];
  const labels = [];
  const completed = [];
  const learning = [];
  const pending = [];

  SECTION_GROUPS.forEach(gId => {
    const g = CourseData[gId];
    if (!g) return;
    labels.push(g.title);
    let c = 0, l = 0, p = 0;
    g.sections.forEach(s => {
      const status = Progress.get(s.id) || 'pending';
      if (status === 'completed') c++;
      else if (status === 'learning') l++;
      else p++;
    });
    completed.push(c);
    learning.push(l);
    pending.push(p);
  });

  const inst = echarts.init(el);
  Charts._instances.push(inst);
  inst.setOption({
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { data: ['已完成', '学习中', '未开始'], bottom: 0 },
    grid: { left: 80, right: 20, top: 10, bottom: 40 },
    xAxis: { type: 'value' },
    yAxis: { type: 'category', data: labels },
    series: [
      { name: '已完成', type: 'bar', stack: 'total', data: completed, itemStyle: { color: '#059669' } },
      { name: '学习中', type: 'bar', stack: 'total', data: learning, itemStyle: { color: '#d97706' } },
      { name: '未开始', type: 'bar', stack: 'total', data: pending, itemStyle: { color: '#e2e8f0' } },
    ]
  });
});

// 自测正确率柱状图
Charts.register('accuracy-bar', function(el) {
  if (typeof echarts === 'undefined') return;

  const SECTION_GROUPS = ['advanced-math','linear-algebra','probability','circuit-basics','analog-circuit','digital-circuit','power-electronics','motor-drive','control','modern-control','embedded-sys','sensor','robotics','data-structure','signals','cpp','os','network'];
  const data = [];

  SECTION_GROUPS.forEach(gId => {
    const g = CourseData[gId];
    if (!g) return;
    g.sections.forEach(s => {
      const accuracy = Quiz.getAccuracy(s.id);
      if (accuracy !== null) {
        data.push({ name: s.title, value: Math.round(accuracy * 100) });
      }
    });
  });

  data.sort((a, b) => a.value - b.value);

  const inst = echarts.init(el);
  Charts._instances.push(inst);
  inst.setOption({
    tooltip: { formatter: '{b}: {c}%' },
    grid: { left: 150, right: 30, top: 10, bottom: 30 },
    xAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%' } },
    yAxis: { type: 'category', data: data.map(d => d.name), axisLabel: { fontSize: 11 } },
      series: [{
      type: 'bar',
      data: data.map(d => ({
        value: d.value,
        itemStyle: { color: d.value < 60 ? '#ef4444' : d.value < 80 ? '#f59e0b' : '#059669' }
      })),
      label: { show: true, position: 'right', formatter: '{c}%', fontSize: 11 }
    }]
  });
});

// ==================== 新增交互图表（v0.9.1） ====================

// 二极管伏安特性曲线（ana-01）
// 公式：I = IS·(e^(U/UT) - 1)，UT = kT/q ≈ 26mV·(T/298)
Charts.register('diode-iv', function(el) {
  if (typeof echarts === 'undefined') return;

  // 初始参数（IS 用对数刻度的指数表示：logIS 范围 -12 ~ -9）
  const initLogIS = parseFloat(el.dataset.logis || '-12');
  const initT = parseFloat(el.dataset.temp || '25');
  const title = el.dataset.title || '二极管伏安特性曲线';

  // 击穿电压（反向，负值），用于击穿段绘制
  const U_BR = -20;

  // 计算伏安特性数据；参数：IS（A）、T（℃）
  // 返回 { forward: [[U, I_mA], ...], reverse: [...] }
  function calcData(IS, T) {
    const UT = 0.026 * (T + 273) / 298;  // 热电压 V
    const forward = [];
    const reverse = [];
    // 正向：0 ~ 0.9V，细步长（指数增长敏感）
    for (let U = 0; U <= 0.9; U += 0.005) {
      const expArg = U / UT;
      const I = IS * (Math.exp(Math.min(expArg, 40)) - 1);  // 防 e^ 溢出
      forward.push([parseFloat(U.toFixed(4)), parseFloat((I * 1000).toFixed(6))]);  // A → mA
    }
    // 反向：U_BR ~ 0V，反向饱和电流近似为 -IS（击穿前）
    for (let U = 0; U >= U_BR; U -= 0.2) {
      let I;
      if (U > U_BR + 0.5) {
        // 反向截止区：微小漏电流
        const expArg = U / UT;
        I = IS * (Math.exp(Math.min(expArg, 40)) - 1);  // U<0 时 e^(负) -1 ≈ -1，I ≈ -IS
      } else {
        // 反向击穿区：电流急剧增大（简化为指数）
        const overshoot = (U_BR - U) / 0.5;  // 超出击穿点的程度
        I = -IS * (1 + Math.exp(overshoot * 3));  // 击穿后急剧负向增大
      }
      reverse.push([parseFloat(U.toFixed(3)), parseFloat((I * 1000).toFixed(6))]);
    }
    return { forward, reverse };
  }

  // 创建滑块控件
  const controls = document.createElement('div');
  controls.style.cssText = 'display:flex;gap:1.5rem;align-items:center;padding:0.75rem;background:var(--bg-secondary);border-radius:0.5rem;margin-top:0.5rem;font-size:0.8rem;flex-wrap:wrap;';
  controls.innerHTML = `
    <label style="display:flex;align-items:center;gap:0.5rem">
      <span>lg(I<sub>S</sub>):</span>
      <input type="range" id="div-logis" min="-13" max="-9" step="0.5" value="${initLogIS}" style="width:120px">
      <span id="div-logis-val" style="min-width:3rem;font-weight:600">${initLogIS}</span>
    </label>
    <label style="display:flex;align-items:center;gap:0.5rem">
      <span>T (℃):</span>
      <input type="range" id="div-temp" min="-20" max="100" step="5" value="${initT}" style="width:120px">
      <span id="div-temp-val" style="min-width:2.5rem;font-weight:600">${initT}</span>
    </label>
    <span style="color:var(--text-secondary)">U<sub>T</sub> ≈ <span id="div-ut" style="font-weight:600">${(0.026*(initT+273)/298*1000).toFixed(1)}</span> mV</span>
  `;
  el.appendChild(controls);

  const IS0 = Math.pow(10, initLogIS);
  const { forward, reverse } = calcData(IS0, initT);

  const chartEl = document.createElement('div');
  chartEl.style.height = '350px';
  el.insertBefore(chartEl, controls);

  const inst = echarts.init(chartEl);
  Charts._instances.push(inst);
  inst.setOption({
    title: { text: title, textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'axis', formatter: p => `U = ${p[0].data[0]} V<br>I = ${p[0].data[1]} mA` },
    legend: { data: ['正向特性', '反向特性'], bottom: 0 },
    grid: { left: 60, right: 30, top: 40, bottom: 40 },
    xAxis: { type: 'value', name: 'U (V)', nameLocation: 'middle', nameGap: 25, min: U_BR, max: 1 },
    yAxis: { type: 'value', name: 'I (mA)', nameLocation: 'end' },
    series: [
      { name: '正向特性', type: 'line', data: forward, showSymbol: false, lineStyle: { width: 2, color: '#ef4444' }, smooth: true },
      { name: '反向特性', type: 'line', data: reverse, showSymbol: false, lineStyle: { width: 2, color: '#3b82f6' }, smooth: true }
    ]
  });

  // 更新函数
  function update() {
    const logIS = parseFloat(document.getElementById('div-logis')?.value || initLogIS);
    const T = parseFloat(document.getElementById('div-temp')?.value || initT);
    document.getElementById('div-logis-val').textContent = logIS.toFixed(1);
    document.getElementById('div-temp-val').textContent = T.toFixed(0);
    document.getElementById('div-ut').textContent = (0.026*(T+273)/298*1000).toFixed(1);
    const IS = Math.pow(10, logIS);
    const { forward: fd, reverse: rd } = calcData(IS, T);
    inst.setOption({ series: [{ data: fd }, { data: rd }] });
  }
  el.querySelector('#div-logis')?.addEventListener('input', update);
  el.querySelector('#div-temp')?.addEventListener('input', update);
});

// 运放电路交互（ana-09）：反相/同相/积分/微分四种电路，实时显示输入输出波形
Charts.register('opamp-circuit', function(el) {
  if (typeof echarts === 'undefined') return;

  const initRf = parseFloat(el.dataset.rf || '10');   // kΩ
  const initR1 = parseFloat(el.dataset.r1 || '1');    // kΩ
  const title = el.dataset.title || '运放电路输入输出波形对比';

  // 输入信号：方波 ±1V，周期 1s（频率 1Hz 便于观察）
  // t 范围 0~2s（两个周期）
  function inputAt(t) {
    // 方波：每 0.5s 翻转一次
    return Math.sin(2 * Math.PI * 1 * t) >= 0 ? 1 : -1;
  }

  // 按给定电路类型计算输出波形
  // mode: 'invert' | 'noninv' | 'integ' | 'diff'
  function calcData(mode, Rf, R1) {
    const dt = 0.005;
    const tmax = 2;
    const input = [], output = [];
    let integAcc = 0;       // 积分器累积量
    let prevU = inputAt(0); // 微分器前一刻输入
    // 积分器时间常数 τ = R*C，本仿真取 R=Rf(kΩ化作无量纲)·C=1μF，故 1/τ 系数取 Rf/10
    const integK = 1 / (Rf * 0.1);  // -1/(RC)·∫ui dt 的系数
    const diffK = Rf * 0.1;          // -RC·dui/dt 的系数

    for (let t = 0; t <= tmax + 1e-9; t += dt) {
      const ui = inputAt(t);
      let uo;
      switch (mode) {
        case 'invert':
          uo = -(Rf / R1) * ui;
          break;
        case 'noninv':
          uo = (1 + Rf / R1) * ui;
          break;
        case 'integ':
          // uo = -1/(RC) · ∫ui dt（梯形积分）
          integAcc += (ui + prevU) / 2 * dt;
          uo = -integK * integAcc;
          // 限幅防发散
          uo = Math.max(-15, Math.min(15, uo));
          break;
        case 'diff':
          // uo = -RC · dui/dt（差分近似）
          uo = -diffK * (ui - prevU) / dt;
          // 方波边缘会出尖峰，限幅
          uo = Math.max(-15, Math.min(15, uo));
          break;
      }
      input.push([parseFloat(t.toFixed(4)), ui]);
      output.push([parseFloat(t.toFixed(4)), parseFloat(uo.toFixed(4))]);
      prevU = ui;
    }
    return { input, output };
  }

  // 创建控件：模式按钮 + Rf/R1 滑块
  const controls = document.createElement('div');
  controls.style.cssText = 'display:flex;gap:1rem;align-items:center;padding:0.75rem;background:var(--bg-secondary);border-radius:0.5rem;margin-top:0.5rem;font-size:0.8rem;flex-wrap:wrap;';
  controls.innerHTML = `
    <div style="display:flex;gap:0.25rem;flex-wrap:wrap">
      <button type="button" data-mode="invert" class="opamp-btn" style="padding:0.25rem 0.6rem;border:1px solid var(--border);border-radius:0.25rem;background:var(--bg-primary);cursor:pointer">反相</button>
      <button type="button" data-mode="noninv" class="opamp-btn" style="padding:0.25rem 0.6rem;border:1px solid var(--border);border-radius:0.25rem;background:var(--bg-primary);cursor:pointer">同相</button>
      <button type="button" data-mode="integ" class="opamp-btn" style="padding:0.25rem 0.6rem;border:1px solid var(--border);border-radius:0.25rem;background:var(--bg-primary);cursor:pointer">积分</button>
      <button type="button" data-mode="diff" class="opamp-btn" style="padding:0.25rem 0.6rem;border:1px solid var(--border);border-radius:0.25rem;background:var(--bg-primary);cursor:pointer">微分</button>
    </div>
    <label style="display:flex;align-items:center;gap:0.5rem">
      <span>R<sub>f</sub> (kΩ):</span>
      <input type="range" id="op-rf" min="0.1" max="20" step="0.1" value="${initRf}" style="width:100px">
      <span id="op-rf-val" style="min-width:2.5rem;font-weight:600">${initRf}</span>
    </label>
    <label style="display:flex;align-items:center;gap:0.5rem">
      <span>R<sub>1</sub> (kΩ):</span>
      <input type="range" id="op-r1" min="0.1" max="20" step="0.1" value="${initR1}" style="width:100px">
      <span id="op-r1-val" style="min-width:2.5rem;font-weight:600">${initR1}</span>
    </label>
    <span id="op-gain-info" style="color:var(--text-secondary)"></span>
  `;
  el.appendChild(controls);

  let currentMode = 'invert';

  const chartEl = document.createElement('div');
  chartEl.style.height = '350px';
  el.insertBefore(chartEl, controls);

  const inst = echarts.init(chartEl);
  Charts._instances.push(inst);
  inst.setOption({
    title: { text: title, textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'axis', formatter: p => `t = ${p[0].data[0]}s<br>${p.map(x => `${x.seriesName}: ${x.data[1]}V`).join('<br>')}` },
    legend: { data: ['输入 u_i', '输出 u_o'], bottom: 0 },
    grid: { left: 50, right: 20, top: 40, bottom: 40 },
    xAxis: { type: 'value', name: 't (s)', nameLocation: 'middle', nameGap: 25, min: 0, max: 2 },
    yAxis: { type: 'value', name: 'u (V)', nameLocation: 'end', min: -15, max: 15 },
    series: [
      { name: '输入 u_i', type: 'line', data: [], showSymbol: false, step: 'end', lineStyle: { width: 1.5, color: '#94a3b8' } },
      { name: '输出 u_o', type: 'line', data: [], showSymbol: false, lineStyle: { width: 2, color: '#3b82f6' } }
    ]
  });

  // 更新按钮高亮 + 数据 + 增益信息
  function highlightButton() {
    el.querySelectorAll('.opamp-btn').forEach(b => {
      if (b.dataset.mode === currentMode) {
        b.style.background = 'var(--primary)';
        b.style.color = '#fff';
        b.style.borderColor = 'var(--primary)';
      } else {
        b.style.background = 'var(--bg-primary)';
        b.style.color = '';
        b.style.borderColor = 'var(--border)';
      }
    });
  }

  function update() {
    const Rf = parseFloat(document.getElementById('op-rf')?.value || initRf);
    const R1 = parseFloat(document.getElementById('op-r1')?.value || initR1);
    document.getElementById('op-rf-val').textContent = Rf.toFixed(1);
    document.getElementById('op-r1-val').textContent = R1.toFixed(1);
    const { input, output } = calcData(currentMode, Rf, R1);
    inst.setOption({ series: [{ data: input }, { data: output }] });

    // 增益信息文本
    let info = '';
    switch (currentMode) {
      case 'invert':  info = `A_v = -R_f/R_1 = ${(-Rf/R1).toFixed(2)}`; break;
      case 'noninv':  info = `A_v = 1+R_f/R_1 = ${(1+Rf/R1).toFixed(2)}`; break;
      case 'integ':   info = `u_o = -(1/RC)·∫u_i dt，方波→三角波`; break;
      case 'diff':    info = `u_o = -RC·du_i/dt，方波→尖峰`; break;
    }
    document.getElementById('op-gain-info').textContent = info;
  }

  highlightButton();
  update();

  // 模式切换
  el.querySelectorAll('.opamp-btn').forEach(b => {
    b.addEventListener('click', () => {
      currentMode = b.dataset.mode;
      highlightButton();
      update();
    });
  });
  el.querySelector('#op-rf')?.addEventListener('input', update);
  el.querySelector('#op-r1')?.addEventListener('input', update);
});
