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

  const SECTION_GROUPS = ['advanced-math','linear-algebra','probability','circuit-basics','analog-circuit','digital-circuit','power-electronics','motor-drive','control','modern-control','embedded-sys','sensor','linux-dev','robotics','digital-mfg','data-structure','signals','cpp','os','network','ai'];
  const groupColors = {
    'advanced-math': '#dc2626', 'linear-algebra': '#d97706', 'probability': '#be185d',
    'circuit-basics': '#2563eb', 'analog-circuit': '#059669', 'digital-circuit': '#eab308',
    'power-electronics': '#0d9488', 'motor-drive': '#ea580c',
    'control': '#7c3aed', 'modern-control': '#6d28d9',
    'embedded-sys': '#475569', 'sensor': '#0891b2', 'robotics': '#be123c',
    'linux-dev': '#111827', 'digital-mfg': '#c026d3',
    'data-structure': '#1e293b', 'signals': '#0369a1',
    'cpp': '#b91c1c', 'os': '#15803d', 'network': '#1d4ed8',
    'ai': '#7c3aed'
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

  const SECTION_GROUPS = ['advanced-math','linear-algebra','probability','circuit-basics','analog-circuit','digital-circuit','power-electronics','motor-drive','control','modern-control','embedded-sys','sensor','linux-dev','robotics','digital-mfg','data-structure','signals','cpp','os','network','ai'];

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

  const SECTION_GROUPS = ['advanced-math','linear-algebra','probability','circuit-basics','analog-circuit','digital-circuit','power-electronics','motor-drive','control','modern-control','embedded-sys','sensor','linux-dev','robotics','digital-mfg','data-structure','signals','cpp','os','network','ai'];
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

  const SECTION_GROUPS = ['advanced-math','linear-algebra','probability','circuit-basics','analog-circuit','digital-circuit','power-electronics','motor-drive','control','modern-control','embedded-sys','sensor','linux-dev','robotics','digital-mfg','data-structure','signals','cpp','os','network','ai'];
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

// RLC 二阶电路暂态响应（circ-05）
// 复用 step-response 的二阶 ODE 解析解，参数从 R/L/C 推导
Charts.register('rlc-waveform', function(el) {
  if (typeof echarts === 'undefined') return;

  // 初始参数：与正文实例一致 R=100Ω, L=10mH, C=1μF
  const initR = parseFloat(el.dataset.r || '100');    // Ω
  const initL = parseFloat(el.dataset.l || '0.01');   // H (10mH)
  const initC = parseFloat(el.dataset.c || '1e-6');   // F (1μF)
  const title = el.dataset.title || 'RLC 串联电路暂态响应';

  // 根据 R/L/C 计算 ζ、ω0；返回 { zeta, omega, alpha, label }
  function derive(R, L, C) {
    const omega = 1 / Math.sqrt(L * C);           // 无阻尼自然频率
    const alpha = R / (2 * L);                    // 衰减常数
    const zeta = (R / 2) * Math.sqrt(C / L);      // 阻尼比 = α/ω0
    let label;
    if (zeta > 1.02)      label = '过阻尼（单调衰减）';
    else if (zeta < 0.98) label = '欠阻尼（衰减振荡）';
    else                  label = '临界阻尼（最快无振荡）';
    return { zeta, omega, alpha, label };
  }

  // 计算 t=0 时刻电容电压单位阶跃响应，归一化到稳态=1
  // 复用 step-response 的解析公式
  function calcData(zeta, omega) {
    const data = [];
    const dt = 0.0005;  // 时间步长（s）
    const tmax = Math.max(10 / omega, 5 * (zeta > 1 ? 1 / (omega * (zeta - Math.sqrt(zeta*zeta-1))) : 1 / (zeta * omega || omega)));
    for (let t = 0; t <= tmax; t += dt) {
      let y;
      if (zeta < 1) {
        const wd = omega * Math.sqrt(1 - zeta*zeta);
        const sigma = zeta * omega;
        y = 1 - Math.exp(-sigma*t) * (Math.cos(wd*t) + (sigma/wd)*Math.sin(wd*t));
      } else if (Math.abs(zeta - 1) < 1e-6) {
        y = 1 - (1 + omega*t) * Math.exp(-omega*t);
      } else {
        const s1 = -omega*(zeta + Math.sqrt(zeta*zeta-1));
        const s2 = -omega*(zeta - Math.sqrt(zeta*zeta-1));
        y = 1 + (s2*Math.exp(s1*t) - s1*Math.exp(s2*t))/(s1-s2);
      }
      data.push([parseFloat((t*1000).toFixed(4)), parseFloat(y.toFixed(4))]);  // t 转 ms
    }
    return data;
  }

  // 创建控件
  const controls = document.createElement('div');
  controls.style.cssText = 'display:flex;gap:1.5rem;align-items:center;padding:0.75rem;background:var(--bg-secondary);border-radius:0.5rem;margin-top:0.5rem;font-size:0.8rem;flex-wrap:wrap;';
  controls.innerHTML = `
    <label style="display:flex;align-items:center;gap:0.5rem">
      <span>R (Ω):</span>
      <input type="range" id="rlc-r" min="1" max="1000" step="1" value="${initR}" style="width:100px">
      <span id="rlc-r-val" style="min-width:2.5rem;font-weight:600">${initR}</span>
    </label>
    <label style="display:flex;align-items:center;gap:0.5rem">
      <span>L (mH):</span>
      <input type="range" id="rlc-l" min="0.1" max="50" step="0.1" value="${(initL*1000).toFixed(1)}" style="width:100px">
      <span id="rlc-l-val" style="min-width:2.5rem;font-weight:600">${(initL*1000).toFixed(1)}</span>
    </label>
    <label style="display:flex;align-items:center;gap:0.5rem">
      <span>C (μF):</span>
      <input type="range" id="rlc-c" min="0.1" max="50" step="0.1" value="${(initC*1e6).toFixed(1)}" style="width:100px">
      <span id="rlc-c-val" style="min-width:2.5rem;font-weight:600">${(initC*1e6).toFixed(1)}</span>
    </label>
    <span style="color:var(--text-secondary)">ζ = <span id="rlc-zeta" style="font-weight:600;color:var(--primary)"></span>，<span id="rlc-label"></span></span>
  `;
  el.appendChild(controls);

  const chartEl = document.createElement('div');
  chartEl.style.height = '350px';
  el.insertBefore(chartEl, controls);

  const inst = echarts.init(chartEl);
  Charts._instances.push(inst);
  inst.setOption({
    title: { text: title, textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'axis', formatter: p => `t = ${p[0].data[0]} ms<br>u_C = ${p[0].data[1]} (归一化)` },
    grid: { left: 50, right: 20, top: 40, bottom: 30 },
    xAxis: { type: 'value', name: 't (ms)', nameLocation: 'middle', nameGap: 25 },
    yAxis: { type: 'value', name: 'u_C / U_∞', nameLocation: 'end', max: 1.6, min: -0.3 },
    series: [{
      type: 'line', data: [], showSymbol: false, lineStyle: { width: 2, color: '#3b82f6' },
      areaStyle: { opacity: 0.1 },
      markLine: { data: [{ yAxis: 1, lineStyle: { type: 'dashed', color: '#999' } }] }
    }]
  });

  function update() {
    const R = parseFloat(document.getElementById('rlc-r')?.value || initR);
    const LmH = parseFloat(document.getElementById('rlc-l')?.value || initL*1000);
    const CuF = parseFloat(document.getElementById('rlc-c')?.value || initC*1e6);
    const L = LmH / 1000;
    const C = CuF / 1e-6;
    document.getElementById('rlc-r-val').textContent = R.toFixed(0);
    document.getElementById('rlc-l-val').textContent = LmH.toFixed(1);
    document.getElementById('rlc-c-val').textContent = CuF.toFixed(1);
    const { zeta, omega, label } = derive(R, L, C);
    document.getElementById('rlc-zeta').textContent = zeta.toFixed(2);
    document.getElementById('rlc-label').textContent = label;
    const newData = calcData(zeta, omega);
    inst.setOption({ series: [{ data: newData }] });
  }
  update();
  el.querySelector('#rlc-r')?.addEventListener('input', update);
  el.querySelector('#rlc-l')?.addEventListener('input', update);
  el.querySelector('#rlc-c')?.addEventListener('input', update);
});

// 二叉树遍历动画（ds-06）：固定 7 节点完全二叉树，演示前/中/后/层序
Charts.register('tree-traversal', function(el) {
  if (typeof echarts === 'undefined') return;

  const title = el.dataset.title || '二叉树遍历动画演示';

  // 固定 7 节点完全二叉树（值与索引 1..7 一一对应，便于层序）
  // 索引 1=A根，2=B左子，3=C右子，4=D，5=E，6=F，7=G
  const labels = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];
  // 节点坐标（手绘完全二叉树位置，归一化 0-10 横轴，0-5 纵轴倒置）
  const positions = {
    1: [5, 5],     // 根
    2: [2.5, 3.3], // 左子
    3: [7.5, 3.3], // 右子
    4: [1, 1.6],   5: [4, 1.6], 6: [6, 1.6], 7: [9, 1.6]
  };
  // 边：父子关系
  const edges = [[1,2],[1,3],[2,4],[2,5],[3,6],[3,7]];

  // 计算四种遍历顺序（返回节点索引数组）
  function traverse(order) {
    const result = [];
    function pre(i)  { if (!i) return; result.push(i); pre(2*i); pre(2*i+1); }
    function ino(i)  { if (!i) return; ino(2*i); result.push(i); ino(2*i+1); }
    function post(i) { if (!i) return; post(2*i); post(2*i+1); result.push(i); }
    function level() {
      const q = [1];
      while (q.length) {
        const i = q.shift();
        if (!i) continue;
        result.push(i);
        if (2*i   <= 7) q.push(2*i);
        if (2*i+1 <= 7) q.push(2*i+1);
      }
    }
    if (order === 'pre')       pre(1);
    else if (order === 'in')   ino(1);
    else if (order === 'post') post(1);
    else                       level();
    return result;
  }

  // 构建 ECharts graph 数据
  function buildNodes(highlightSet = new Set(), visitedSet = new Set(), currentNode = -1) {
    const nodes = [];
    for (let i = 1; i <= 7; i++) {
      let color = '#cbd5e1';        // 默认灰
      let borderColor = '#94a3b8';
      if (visitedSet.has(i))        { color = '#3b82f6'; borderColor = '#1d4ed8'; }       // 已访问：蓝
      if (highlightSet.has(i))      { color = '#f59e0b'; borderColor = '#b45309'; }       // 当前路径高亮：琥珀
      if (currentNode === i)        { color = '#ef4444'; borderColor = '#b91c1c'; }       // 正在访问：红
      nodes.push({
        id: String(i), name: labels[i], x: positions[i][0], y: positions[i][1],
        symbolSize: 38, draggable: false,
        itemStyle: { color, borderColor, borderWidth: 2 },
        label: { show: true, color: '#fff', fontWeight: 'bold' }
      });
    }
    return nodes;
  }

  function buildLinks() {
    return edges.map(([a, b]) => ({ source: String(a), target: String(b) }));
  }

  // 创建控件：4 单选按钮 + 播放 + 速度
  const controls = document.createElement('div');
  controls.style.cssText = 'display:flex;gap:1rem;align-items:center;padding:0.75rem;background:var(--bg-secondary);border-radius:0.5rem;margin-top:0.5rem;font-size:0.8rem;flex-wrap:wrap;';
  controls.innerHTML = `
    <div style="display:flex;gap:0.25rem">
      <button type="button" data-order="pre" class="tt-btn" style="padding:0.25rem 0.6rem;border:1px solid var(--border);border-radius:0.25rem;background:var(--bg-primary);cursor:pointer">前序</button>
      <button type="button" data-order="in" class="tt-btn" style="padding:0.25rem 0.6rem;border:1px solid var(--border);border-radius:0.25rem;background:var(--bg-primary);cursor:pointer">中序</button>
      <button type="button" data-order="post" class="tt-btn" style="padding:0.25rem 0.6rem;border:1px solid var(--border);border-radius:0.25rem;background:var(--bg-primary);cursor:pointer">后序</button>
      <button type="button" data-order="level" class="tt-btn" style="padding:0.25rem 0.6rem;border:1px solid var(--border);border-radius:0.25rem;background:var(--bg-primary);cursor:pointer">层序</button>
    </div>
    <button type="button" id="tt-play" style="padding:0.25rem 0.8rem;border:1px solid var(--primary);border-radius:0.25rem;background:var(--primary);color:#fff;cursor:pointer;font-weight:600">▶ 播放</button>
    <label style="display:flex;align-items:center;gap:0.5rem">
      <span>速度:</span>
      <input type="range" id="tt-speed" min="200" max="1500" step="100" value="700" style="width:100px">
      <span id="tt-speed-val" style="min-width:3rem;font-weight:600">700ms</span>
    </label>
    <span style="color:var(--text-secondary)">输出序列：<span id="tt-output" style="font-weight:600;color:var(--primary);font-family:monospace"></span></span>
  `;
  el.appendChild(controls);

  const chartEl = document.createElement('div');
  chartEl.style.height = '350px';
  el.insertBefore(chartEl, controls);

  const inst = echarts.init(chartEl);
  Charts._instances.push(inst);
  inst.setOption({
    title: { text: title, textStyle: { fontSize: 14 } },
    tooltip: { show: false },
    animation: false,
    xAxis: { show: false, min: -0.5, max: 10.5 },
    yAxis: { show: false, min: 0.5, max: 6 },
    series: [{
      type: 'graph', layout: 'none', roam: false,
      data: buildNodes(), links: buildLinks(),
      lineStyle: { color: '#64748b', width: 2, curveness: 0 }
    }]
  });

  let currentOrder = 'pre';
  let animTimer = null;
  const visited = [];

  function highlightButtons() {
    el.querySelectorAll('.tt-btn').forEach(b => {
      if (b.dataset.order === currentOrder) {
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

  function reset() {
    if (animTimer) { clearInterval(animTimer); animTimer = null; Charts.stopAll(); }
    visited.length = 0;
    inst.setOption({ series: [{ data: buildNodes() }] });
    document.getElementById('tt-output').textContent = '';
  }

  function playAnimation() {
    reset();
    const order = traverse(currentOrder);
    let step = 0;
    animTimer = setInterval(() => {
      if (step >= order.length) {
        clearInterval(animTimer);
        animTimer = null;
        return;
      }
      const node = order[step];
      visited.push(node);
      // 当前节点用红，已访问（含当前）用蓝
      const visitedSet = new Set(visited);
      inst.setOption({ series: [{ data: buildNodes(new Set(), visitedSet, node) }] });
      // 输出序列
      document.getElementById('tt-output').textContent = visited.map(i => labels[i]).join(' → ');
      step++;
    }, parseInt(document.getElementById('tt-speed')?.value || '700'));
    // 注册 timer 以便页面切换时清除
    Charts._timers.push(animTimer);
  }

  highlightButtons();

  el.querySelectorAll('.tt-btn').forEach(b => {
    b.addEventListener('click', () => {
      currentOrder = b.dataset.order;
      highlightButtons();
      reset();
      // 静态显示完整遍历结果（不动画，便于对比）
      const order = traverse(currentOrder);
      document.getElementById('tt-output').textContent = order.map(i => labels[i]).join(' → ');
      const visitedSet = new Set(order);
      inst.setOption({ series: [{ data: buildNodes(new Set(), visitedSet, -1) }] });
    });
  });
  el.querySelector('#tt-play')?.addEventListener('click', playAnimation);
  el.querySelector('#tt-speed')?.addEventListener('input', e => {
    document.getElementById('tt-speed-val').textContent = e.target.value + 'ms';
  });

  // 初始：显示完整前序遍历结果
  const initOrder = traverse('pre');
  document.getElementById('tt-output').textContent = initOrder.map(i => labels[i]).join(' → ');
  inst.setOption({ series: [{ data: buildNodes(new Set(), new Set(initOrder), -1) }] });
});

// PID 闭环阶跃响应仿真器（act-14）
// 被控对象：二阶 plant G(s)=ωn²/(s²+2ζωn·s+ωn²)；PID 用欧拉法离散
Charts.register('pid-sim', function(el) {
  if (typeof echarts === 'undefined') return;

  const initKp = parseFloat(el.dataset.kp || '1.5');
  const initKi = parseFloat(el.dataset.ki || '0.8');
  const initKd = parseFloat(el.dataset.kd || '0.3');
  const title = el.dataset.title || 'PID 闭环阶跃响应仿真';

  // 被控对象参数（固定）
  const wn = 2.0;       // 自然频率
  const zetaPlant = 0.6; // 阻尼比
  const dt = 0.005;
  const tmax = 15;

  // PID 闭环仿真，返回阶跃响应曲线 + 性能指标
  function simulate(Kp, Ki, Kd) {
    // 状态空间化二阶对象：ẍ = -2ζωn·ẋ + ωn²·(u)，y=x
    let x1 = 0, x2 = 0;        // x1=y, x2=ẏ
    let integral = 0, prevErr = 1; // PID 状态
    const setpoint = 1;
    const data = [];
    let peak = 0, ts = null, lastCross = 0;
    let lastErr = 1;
    data.push([0, 0]);

    for (let t = dt; t <= tmax; t += dt) {
      const err = setpoint - x1;
      integral += err * dt;
      // 积分饱和限幅
      integral = Math.max(-5, Math.min(5, integral));
      const deriv = (err - prevErr) / dt;
      const u = Kp * err + Ki * integral + Kd * deriv;
      // 输出限幅（模拟实际执行机构）
      const uLim = Math.max(-10, Math.min(10, u));
      // 二阶对象离散更新（欧拉）
      const dx2 = -2 * zetaPlant * wn * x2 + wn * wn * uLim;
      x2 += dx2 * dt;
      x1 += x2 * dt;
      prevErr = err;
      data.push([parseFloat(t.toFixed(3)), parseFloat(x1.toFixed(4))]);

      // 性能指标
      if (x1 > peak) peak = x1;
      // 调节时间：进入 ±2% 带后不再出来的最后时刻
      if (Math.abs(x1 - setpoint) <= 0.02) ts = t;
      else ts = null;  // 一旦再次超出，重置
    }
    // 超调量
    const overshoot = peak > setpoint ? ((peak - setpoint) / setpoint) * 100 : 0;
    // 稳态误差（用末段均值近似）
    const tail = data.slice(-200).map(d => d[1]);
    const ess = setpoint - tail.reduce((a, b) => a + b, 0) / tail.length;
    return { data, overshoot, ts, ess };
  }

  // 控件
  const controls = document.createElement('div');
  controls.style.cssText = 'display:flex;gap:1.5rem;align-items:center;padding:0.75rem;background:var(--bg-secondary);border-radius:0.5rem;margin-top:0.5rem;font-size:0.8rem;flex-wrap:wrap;';
  controls.innerHTML = `
    <label style="display:flex;align-items:center;gap:0.5rem">
      <span>K<sub>p</sub>:</span>
      <input type="range" id="pid-kp" min="0" max="10" step="0.1" value="${initKp}" style="width:100px">
      <span id="pid-kp-val" style="min-width:2.5rem;font-weight:600">${initKp}</span>
    </label>
    <label style="display:flex;align-items:center;gap:0.5rem">
      <span>K<sub>i</sub>:</span>
      <input type="range" id="pid-ki" min="0" max="5" step="0.1" value="${initKi}" style="width:100px">
      <span id="pid-ki-val" style="min-width:2.5rem;font-weight:600">${initKi}</span>
    </label>
    <label style="display:flex;align-items:center;gap:0.5rem">
      <span>K<sub>d</sub>:</span>
      <input type="range" id="pid-kd" min="0" max="5" step="0.1" value="${initKd}" style="width:100px">
      <span id="pid-kd-val" style="min-width:2.5rem;font-weight:600">${initKd}</span>
    </label>
    <span style="color:var(--text-secondary)">超调 <span id="pid-os" style="font-weight:600;color:#ef4444"></span>%　ts <span id="pid-ts" style="font-weight:600;color:#f59e0b"></span>s　ess <span id="pid-ess" style="font-weight:600;color:#059669"></span></span>
  `;
  el.appendChild(controls);

  const chartEl = document.createElement('div');
  chartEl.style.height = '350px';
  el.insertBefore(chartEl, controls);

  const inst = echarts.init(chartEl);
  Charts._instances.push(inst);
  inst.setOption({
    title: { text: title, textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'axis' },
    legend: { data: ['阶跃响应 y(t)', '设定值 r=1'], bottom: 0 },
    grid: { left: 50, right: 20, top: 40, bottom: 40 },
    xAxis: { type: 'value', name: 't (s)', nameLocation: 'middle', nameGap: 25, min: 0, max: tmax },
    yAxis: { type: 'value', name: 'y', nameLocation: 'end', min: 0, max: 2 },
    series: [
      { name: '阶跃响应 y(t)', type: 'line', data: [], showSymbol: false, lineStyle: { width: 2, color: '#3b82f6' }, areaStyle: { opacity: 0.08 } },
      { name: '设定值 r=1', type: 'line', data: [], showSymbol: false, lineStyle: { width: 1.5, color: '#94a3b8', type: 'dashed' } }
    ]
  });

  function update() {
    const Kp = parseFloat(document.getElementById('pid-kp')?.value || initKp);
    const Ki = parseFloat(document.getElementById('pid-ki')?.value || initKi);
    const Kd = parseFloat(document.getElementById('pid-kd')?.value || initKd);
    document.getElementById('pid-kp-val').textContent = Kp.toFixed(1);
    document.getElementById('pid-ki-val').textContent = Ki.toFixed(1);
    document.getElementById('pid-kd-val').textContent = Kd.toFixed(1);
    const { data, overshoot, ts, ess } = simulate(Kp, Ki, Kd);
    const setpointData = data.map(d => [d[0], 1]);
    inst.setOption({ series: [{ data }, { data: setpointData }] });
    document.getElementById('pid-os').textContent = overshoot.toFixed(1);
    document.getElementById('pid-ts').textContent = ts !== null ? ts.toFixed(2) : '∞';
    document.getElementById('pid-ess').textContent = Math.abs(ess) < 0.001 ? '≈0' : ess.toFixed(3);
  }
  update();
  el.querySelector('#pid-kp')?.addEventListener('input', update);
  el.querySelector('#pid-ki')?.addEventListener('input', update);
  el.querySelector('#pid-kd')?.addEventListener('input', update);
});

// 图算法动画（ds-12）：BFS / DFS / Dijkstra 三种算法逐步执行
// 固定 7 顶点带权无向图（导航场景），红=当前、琥珀=队列/栈/候选、蓝=已访问/已确定、蓝粗边=生成树/最短路径树
Charts.register('graph-algo', function(el) {
  if (typeof echarts === 'undefined') return;

  const title = el.dataset.title || '图算法动画：BFS / DFS / Dijkstra';

  // ---- 图数据（顶点坐标手工布局，权重为非负整数）----
  const NODES = [
    { id: 'A', x: 0.8, y: 5.4 },
    { id: 'B', x: 4.2, y: 3.4 },
    { id: 'C', x: 1.5, y: 1.6 },
    { id: 'D', x: 7.5, y: 5.4 },
    { id: 'E', x: 6.0, y: 0.8 },
    { id: 'F', x: 9.0, y: 2.8 },
    { id: 'G', x: 10.8, y: 5.0 },
  ];
  const EDGES = [
    ['A','B',4], ['A','C',3], ['B','C',2], ['B','D',7], ['B','E',3],
    ['C','E',5], ['D','F',4], ['D','G',3], ['E','F',6], ['F','G',5],
  ];
  // 邻接表（按顶点字母序，保证动画顺序确定）
  const ADJ = {};
  NODES.forEach(n => ADJ[n.id] = []);
  EDGES.forEach(([a, b, w]) => { ADJ[a].push([b, w]); ADJ[b].push([a, w]); });
  const edgeKey = (a, b) => [a, b].sort().join('-');

  // ---- 步骤生成器：每步记录 settled(蓝)/active(琥珀)/current/target/edgesActive/edgeCurrent/order/stateHtml ----

  // BFS：队列，逐层扩展；入队即标记，出队时访问
  function bfsSteps(start) {
    const steps = [];
    const visited = new Set([start]);
    const queue = [start];
    const order = [start];
    const tree = new Set();
    const snap = (desc, extra = {}) => {
      steps.push({
        desc,
        settled: new Set([...visited].filter(n => !queue.includes(n))),
        active: new Set(queue),
        edgesActive: new Set(tree),
        order: [...order],
        stateHtml: `队列：[${queue.join(', ')}]`,
        ...extra,
      });
    };
    snap(`起点 ${start} 入队并标记已访问`);
    while (queue.length) {
      const u = queue.shift();
      snap(`出队 ${u}，依次检查其邻居`, { current: u });
      for (const [v] of ADJ[u]) {
        if (!visited.has(v)) {
          visited.add(v); queue.push(v); order.push(v);
          const ek = edgeKey(u, v); tree.add(ek);
          snap(`发现未访问顶点 ${v} → 入队并标记（经边 ${u}-${v}）`, { current: u, target: v, edgeCurrent: ek });
        }
      }
    }
    snap('队列已空，BFS 结束：按层访问完成，蓝边为 BFS 生成树', { done: true });
    return steps;
  }

  // DFS：递归（等价递归栈），沿边深入，无路可走时回溯
  function dfsSteps(start) {
    const steps = [];
    const visited = new Set();
    const stack = [];
    const order = [];
    const tree = new Set();
    const snap = (desc, extra = {}) => {
      steps.push({
        desc,
        settled: new Set([...visited].filter(n => !stack.includes(n))),
        active: new Set(stack),
        edgesActive: new Set(tree),
        order: [...order],
        stateHtml: `递归栈：[${stack.join(' → ')}]`,
        ...extra,
      });
    };
    (function dfs(u, via) {
      visited.add(u); stack.push(u); order.push(u);
      if (via) tree.add(via);
      snap(via ? `沿边 ${via} 深入，访问 ${u}` : `从起点 ${u} 开始访问`, { current: u, edgeCurrent: via });
      for (const [v] of ADJ[u]) {
        if (!visited.has(v)) dfs(v, edgeKey(u, v));
      }
      stack.pop();
      snap(`${u} 的邻居全部处理完，回溯${stack.length ? `到 ${stack[stack.length - 1]}` : '（栈空）'}`, { current: stack[stack.length - 1] });
    })(start, null);
    snap('递归栈空，DFS 结束：一路深入再回溯，蓝边为 DFS 生成树', { done: true });
    return steps;
  }

  // Dijkstra：贪心选最近未确定点 + 松弛邻边；换前驱时更新最短路径树
  function dijkstraSteps(start) {
    const steps = [];
    const ids = NODES.map(n => n.id);
    const dist = {}; ids.forEach(n => dist[n] = Infinity); dist[start] = 0;
    const determined = new Set();
    const tree = new Set();
    const pred = {};
    const fmt = v => dist[v] === Infinity ? '∞' : String(dist[v]);
    const snap = (desc, extra = {}) => {
      steps.push({
        desc,
        settled: new Set(determined),
        active: new Set(ids.filter(n => !determined.has(n) && dist[n] < Infinity)),
        edgesActive: new Set(tree),
        dist: { ...dist },
        order: [...determined],
        stateHtml: 'dist：' + ids.map(n => {
          const color = determined.has(n) ? '#059669;font-weight:700'
            : dist[n] < Infinity ? '#d97706' : '#94a3b8';
          return `<span style="color:${color}">${n}=${fmt(n)}</span>`;
        }).join(' '),
        ...extra,
      });
    };
    snap(`初始化：dist[${start}]=0，其余均为 ∞`, { current: start });
    while (determined.size < ids.length) {
      let u = null, best = Infinity;
      for (const n of ids) if (!determined.has(n) && dist[n] < best) { best = dist[n]; u = n; }
      if (!u) break;
      determined.add(u);
      snap(`贪心：未确定顶点中 ${u} 最近（dist=${best}），标记为已确定`, { current: u });
      for (const [v, w] of ADJ[u]) {
        if (determined.has(v)) continue;
        const nd = dist[u] + w;
        if (nd < dist[v]) {
          const old = fmt(v);
          dist[v] = nd;
          const ek = edgeKey(u, v);
          if (pred[v]) tree.delete(pred[v]);
          pred[v] = ek; tree.add(ek);
          snap(`松弛 ${u}-${v}：dist[${u}]+${w}=${nd} &lt; ${old}，更新 dist[${v}]=${nd}（换前驱边）`, { current: u, target: v, edgeCurrent: ek });
        }
      }
    }
    snap('全部顶点已确定，dist[] 即单源最短距离，蓝边为最短路径树', { done: true });
    return steps;
  }

  // ---- 渲染 ----
  function buildLinks(step) {
    return EDGES.map(([a, b, w]) => {
      const k = edgeKey(a, b);
      const isActive = step?.edgesActive?.has(k);
      const isCur = step?.edgeCurrent === k;
      return {
        source: a, target: b,
        lineStyle: { color: isCur ? '#ef4444' : isActive ? '#3b82f6' : '#94a3b8', width: isCur ? 4 : isActive ? 3 : 1.5, curveness: 0 },
        label: { show: true, formatter: String(w), fontSize: 11, color: isCur ? '#ef4444' : isActive ? '#1d4ed8' : '#64748b', fontWeight: isCur || isActive ? 'bold' : 'normal' },
      };
    });
  }

  function renderStep(step) {
    const settled = step?.settled || new Set();
    const active = step?.active || new Set();
    const isDij = currentAlgo === 'dijkstra';
    const data = NODES.map(n => {
      let color = '#cbd5e1', borderColor = '#94a3b8';
      if (settled.has(n.id)) { color = '#3b82f6'; borderColor = '#1d4ed8'; }
      if (active.has(n.id))  { color = '#f59e0b'; borderColor = '#b45309'; }
      if (step?.target === n.id) { color = '#f97316'; borderColor = '#c2410c'; }
      if (step?.current === n.id) { color = '#ef4444'; borderColor = '#b91c1c'; }
      const isStart = n.id === startNode;
      let name = n.id;
      if (isDij && step?.dist) name = `${n.id}\n${step.dist[n.id] === Infinity ? '∞' : step.dist[n.id]}`;
      return {
        id: n.id, name, x: n.x, y: n.y,
        symbolSize: isDij ? 46 : 38, draggable: false,
        itemStyle: { color, borderColor: isStart ? '#059669' : borderColor, borderWidth: isStart ? 3.5 : 2 },
        label: { show: true, color: '#fff', fontWeight: 'bold', fontSize: isDij ? 11 : 13 },
      };
    });
    inst.setOption({ series: [{ data, links: buildLinks(step) }] });
  }

  // ---- DOM：图表 + 状态面板 + 控件 + 图例 ----
  const chartEl = document.createElement('div');
  chartEl.style.height = '330px';
  el.appendChild(chartEl);

  const statePanel = document.createElement('div');
  statePanel.style.cssText = 'margin-top:0.5rem;padding:0.6rem 0.75rem;background:var(--bg-secondary);border-radius:0.5rem;font-size:0.8rem;min-height:3.4rem;';
  statePanel.innerHTML = `
    <div id="ga-desc" style="font-weight:600"></div>
    <div id="ga-state" style="margin-top:0.25rem;font-family:monospace;font-size:0.78rem;color:var(--text-secondary)"></div>
    <div id="ga-order" style="margin-top:0.15rem;font-size:0.75rem;color:var(--primary)"></div>`;
  el.appendChild(statePanel);

  const controls = document.createElement('div');
  controls.style.cssText = 'display:flex;gap:1rem;align-items:center;padding:0.6rem 0.75rem;background:var(--bg-secondary);border-radius:0.5rem;margin-top:0.5rem;font-size:0.8rem;flex-wrap:wrap;';
  controls.innerHTML = `
    <div style="display:flex;gap:0.25rem">
      <button type="button" data-algo="bfs" class="ga-btn" style="padding:0.25rem 0.6rem;border:1px solid var(--border);border-radius:0.25rem;background:var(--bg-primary);cursor:pointer">BFS</button>
      <button type="button" data-algo="dfs" class="ga-btn" style="padding:0.25rem 0.6rem;border:1px solid var(--border);border-radius:0.25rem;background:var(--bg-primary);cursor:pointer">DFS</button>
      <button type="button" data-algo="dijkstra" class="ga-btn" style="padding:0.25rem 0.6rem;border:1px solid var(--border);border-radius:0.25rem;background:var(--bg-primary);cursor:pointer">Dijkstra</button>
    </div>
    <label style="display:flex;align-items:center;gap:0.4rem">
      <span>起点:</span>
      <select id="ga-start" style="padding:0.2rem;border:1px solid var(--border);border-radius:0.25rem;background:var(--bg-primary);color:inherit">
        ${NODES.map(n => `<option value="${n.id}">${n.id}</option>`).join('')}
      </select>
    </label>
    <button type="button" id="ga-play" style="padding:0.25rem 0.8rem;border:1px solid var(--primary);border-radius:0.25rem;background:var(--primary);color:#fff;cursor:pointer;font-weight:600">▶ 播放</button>
    <button type="button" id="ga-step" style="padding:0.25rem 0.6rem;border:1px solid var(--border);border-radius:0.25rem;background:var(--bg-primary);cursor:pointer">⏭ 单步</button>
    <button type="button" id="ga-reset" style="padding:0.25rem 0.6rem;border:1px solid var(--border);border-radius:0.25rem;background:var(--bg-primary);cursor:pointer">↺ 重置</button>
    <label style="display:flex;align-items:center;gap:0.4rem">
      <span>速度:</span>
      <input type="range" id="ga-speed" min="300" max="1500" step="100" value="800" style="width:90px">
      <span id="ga-speed-val" style="min-width:3rem;font-weight:600">800ms</span>
    </label>`;
  el.appendChild(controls);

  const legendEl = document.createElement('div');
  legendEl.style.cssText = 'margin-top:0.4rem;font-size:0.72rem;color:var(--text-secondary);line-height:1.7;';
  el.appendChild(legendEl);

  const inst = echarts.init(chartEl);
  Charts._instances.push(inst);
  inst.setOption({
    title: { text: title, textStyle: { fontSize: 14 } },
    tooltip: { show: false },
    animation: false,
    xAxis: { show: false, min: -0.3, max: 11.6 },
    yAxis: { show: false, min: 0.2, max: 6.2 },
    series: [{
      type: 'graph', layout: 'none', roam: false,
      data: [], links: buildLinks(null),
      lineStyle: { curveness: 0 },
    }],
  });

  // ---- 状态与交互 ----
  let currentAlgo = 'dijkstra';
  let startNode = 'A';
  let steps = [];
  let stepIdx = -1;
  let timer = null;

  const $ = id => el.querySelector('#' + id);
  const descEl = $('ga-desc'), stateEl = $('ga-state'), orderEl = $('ga-order');
  const playBtn = $('ga-play'), stepBtn = $('ga-step'), resetBtn = $('ga-reset');

  const ALGO_NAMES = { bfs: 'BFS 广度优先遍历', dfs: 'DFS 深度优先遍历', dijkstra: 'Dijkstra 单源最短路' };
  const dot = c => `<span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${c};vertical-align:-1px"></span>`;
  const ring = `<span style="display:inline-block;width:9px;height:9px;border-radius:50%;border:2px solid #059669;vertical-align:-1px"></span>`;
  const LEGENDS = {
    bfs: `${dot('#f59e0b')} 队列中(已标记) ｜ ${dot('#3b82f6')} 已出队 ｜ ${dot('#ef4444')} 正在出队 ｜ ${dot('#f97316')} 新入队 ｜ ${ring} 起点 ｜ <b style="color:#3b82f6">蓝粗边</b>=BFS 生成树(按层扩展)`,
    dfs: `${dot('#f59e0b')} 递归栈中 ｜ ${dot('#3b82f6')} 已回溯 ｜ ${dot('#ef4444')} 正在访问 ｜ ${ring} 起点 ｜ <b style="color:#3b82f6">蓝粗边</b>=DFS 生成树(一路深入)`,
    dijkstra: `${dot('#f59e0b')} 候选(未确定) ｜ ${dot('#3b82f6')} 已确定 ｜ ${dot('#ef4444')} 贪心选中 ｜ ${dot('#f97316')} 松弛目标 ｜ ${ring} 起点 ｜ <b style="color:#3b82f6">蓝粗边</b>=最短路径树`,
  };

  function genSteps() {
    steps = currentAlgo === 'bfs' ? bfsSteps(startNode)
          : currentAlgo === 'dfs' ? dfsSteps(startNode)
          : dijkstraSteps(startNode);
  }

  function getSpeed() { return parseInt($('ga-speed')?.value || '800'); }

  function stopPlay() {
    if (timer) {
      clearInterval(timer);
      Charts._timers = Charts._timers.filter(t => t !== timer);
      timer = null;
    }
    playBtn.textContent = '▶ 播放';
  }

  function startPlay() {
    if (timer) return;
    if (stepIdx >= steps.length - 1) stepIdx = -1;   // 播完再按播放 → 从头重播
    timer = setInterval(() => {
      if (stepIdx >= steps.length - 1) { stopPlay(); return; }
      showStep(stepIdx + 1);
    }, getSpeed());
    Charts._timers.push(timer);
    playBtn.textContent = '⏸ 暂停';
  }

  function showStep(i) {
    stepIdx = Math.max(0, Math.min(i, steps.length - 1));
    const s = steps[stepIdx];
    renderStep(s);
    descEl.textContent = `【${stepIdx + 1}/${steps.length}】${s.desc}`;
    stateEl.innerHTML = s.stateHtml || '';
    orderEl.textContent = s.order?.length ? (currentAlgo === 'dijkstra' ? `确定顺序：${s.order.join(' → ')}` : `访问序列：${s.order.join(' → ')}`) : '';
  }

  function resetAll() {
    stopPlay();
    genSteps();
    stepIdx = -1;
    renderStep(null);
    descEl.textContent = `已选择「${ALGO_NAMES[currentAlgo]}」（起点 ${startNode}），点击 ▶播放 或 ⏭单步 观察执行过程`;
    stateEl.innerHTML = currentAlgo === 'dijkstra' ? 'dist：' + NODES.map(n => `<span style="color:#94a3b8">${n.id}=∞</span>`).join(' ') : '';
    orderEl.textContent = '';
  }

  function highlightAlgo() {
    el.querySelectorAll('.ga-btn').forEach(b => {
      if (b.dataset.algo === currentAlgo) {
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

  el.querySelectorAll('.ga-btn').forEach(b => {
    b.addEventListener('click', () => {
      if (currentAlgo === b.dataset.algo) return;
      currentAlgo = b.dataset.algo;
      highlightAlgo();
      legendEl.innerHTML = LEGENDS[currentAlgo];
      resetAll();
    });
  });
  $('ga-start')?.addEventListener('change', e => { startNode = e.target.value; resetAll(); });
  playBtn.addEventListener('click', () => timer ? stopPlay() : startPlay());
  stepBtn.addEventListener('click', () => { stopPlay(); if (stepIdx < steps.length - 1) showStep(stepIdx + 1); });
  resetBtn.addEventListener('click', resetAll);
  $('ga-speed')?.addEventListener('input', e => {
    $('ga-speed-val').textContent = e.target.value + 'ms';
    if (timer) { stopPlay(); startPlay(); }   // 播放中调速：重启定时器
  });

  // 初始状态
  highlightAlgo();
  legendEl.innerHTML = LEGENDS[currentAlgo];
  resetAll();
});

// 注意力权重热力图（ai-03）：玩具级 QKV 计算 + softmax 可视化
// 切换例句 / 调 dk 与温度 / 开关 √dk 缩放与因果掩码，直观观察"谁关注谁"以及 softmax 饱和现象
Charts.register('attention-vis', function(el) {
  const SENTENCES = [
    { name: '猫追老鼠', tokens: ['小猫', '追', '一只', '老鼠'] },
    { name: '调参数', tokens: ['工程师', '把', 'PID', '调', '稳', '了'] },
    { name: '写字机', tokens: ['写字机', '把', '笔', '移', '到', '原点'] },
    { name: '注意力', tokens: ['注意力', '就是', '一切', '的', '关键'] },
  ];

  // 确定性哈希 + 伪随机：同一 token 恒得同一向量，热力图可复现
  function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { return function () { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  // 每个 token 派生 q/k 向量：共享"本体"随机源、各自叠加小噪声 → 自己对自己的点积天然偏大（对角亮带）
  function vec(token, role, dk) {
    const base = rng(hash(token));
    const noise = rng(hash(token + '#' + role));
    const v = [];
    for (let i = 0; i < dk; i++) v.push((base() * 2 - 1) + (noise() * 2 - 1) * (role === 'q' ? 0.45 : 0.55));
    return v;
  }
  function dot(a, b) { let s = 0; for (let i = 0; i < a.length; i++) s += a[i] * b[i]; return s; }

  let sentIdx = 0;
  const state = { dk: 16, temp: 1, scale: true, mask: false };

  el.innerHTML = `
    <div style="padding:0.5rem 0 0">
      <div id="attn-btns" style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.5rem">
        ${SENTENCES.map((s, i) => `<button data-i="${i}" class="attn-s" style="padding:0.3rem 0.85rem;border-radius:9999px;font-size:0.8rem;border:1px solid var(--border);background:var(--bg-primary);cursor:pointer">${s.name}</button>`).join('')}
      </div>
      <div style="display:flex;gap:1.2rem;flex-wrap:wrap;align-items:center;padding:0.6rem 0.75rem;background:var(--bg-secondary);border-radius:0.5rem;font-size:0.8rem">
        <label style="display:flex;align-items:center;gap:0.4rem">d<sub>k</sub>
          <select id="attn-dk" style="padding:0.15rem 0.3rem;border:1px solid var(--border);background:var(--bg);border-radius:0.25rem">
            <option value="4">4</option><option value="16" selected>16</option><option value="64">64</option>
          </select>
        </label>
        <label style="display:flex;align-items:center;gap:0.5rem">温度 T
          <input type="range" id="attn-temp" min="0.3" max="3" step="0.1" value="1" style="width:90px">
          <span id="attn-temp-v" style="min-width:1.8rem;font-weight:600">1.0</span>
        </label>
        <label style="display:flex;align-items:center;gap:0.35rem;cursor:pointer"><input type="checkbox" id="attn-scale" checked> ÷√d<sub>k</sub> 缩放</label>
        <label style="display:flex;align-items:center;gap:0.35rem;cursor:pointer"><input type="checkbox" id="attn-mask"> 因果掩码</label>
        <span id="attn-stat" style="color:var(--text-secondary)"></span>
      </div>
      <div id="attn-grid" style="margin-top:0.75rem;overflow-x:auto"></div>
      <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:0.5rem;line-height:1.5">每行 = 一个 Query 词对全部 Key 词的注意力权重（行和为 1），颜色越深权重越高，对角亮带即"主要关注自己"。试试：勾掉 ÷√d<sub>k</sub> 并把 d<sub>k</sub> 调到 64 → softmax 饱和，权重锁死个别词；勾上因果掩码 → 上三角（未来词）全黑，这就是 decoder-only 的"不许偷看"。</div>
    </div>`;

  const $ = id => el.querySelector('#' + id);

  // 计算 n×n 注意力矩阵：score = q·k /(√dk)，可关缩放；温度在 softmax 前作用；掩码置 -1e9
  function compute() {
    const { tokens } = SENTENCES[sentIdx];
    const n = tokens.length, dk = state.dk;
    const Q = tokens.map(t => vec(t, 'q', dk));
    const K = tokens.map(t => vec(t, 'k', dk));
    const W = [];
    for (let i = 0; i < n; i++) {
      const scores = K.map((k, j) => {
        let s = dot(Q[i], k) / (state.scale ? Math.sqrt(dk) : 1);
        if (state.mask && j > i) return -1e9;
        return s / state.temp;
      });
      const m = Math.max(...scores);
      const exps = scores.map(s => Math.exp(s - m));
      const sum = exps.reduce((a, b) => a + b, 0);
      W.push(exps.map(e => e / sum));
    }
    return W;
  }

  function render() {
    const { tokens } = SENTENCES[sentIdx];
    const n = tokens.length;
    const W = compute();
    let html = `<div style="display:grid;grid-template-columns:4.5rem repeat(${n}, minmax(2.6rem,1fr));gap:3px;min-width:${(4.5 + n * 2.9).toFixed(1)}rem">`;
    html += '<div></div>' + tokens.map(t => `<div style="font-size:0.72rem;text-align:center;color:var(--text-secondary);align-self:end;padding-bottom:2px">${t}</div>`).join('');
    for (let i = 0; i < n; i++) {
      html += `<div style="font-size:0.75rem;display:flex;align-items:center;justify-content:flex-end;padding-right:0.4rem;color:var(--text-secondary)">${tokens[i]}</div>`;
      for (let j = 0; j < n; j++) {
        const w = W[i][j];
        const a = Math.pow(Math.max(0, (w - 1 / n) / (1 - 1 / n)), 1.1);  // 均匀→0，one-hot→1
        const show = w >= 0.2;
        html += `<div title="${tokens[i]} 关注 ${tokens[j]}：${(w * 100).toFixed(1)}%" style="height:2.4rem;border-radius:4px;background:rgba(124,58,237,${a.toFixed(3)});display:flex;align-items:center;justify-content:center;font-size:0.68rem;color:${a > 0.55 ? '#fff' : 'var(--text-secondary)'}">${show ? Math.round(w * 100) + '%' : ''}</div>`;
      }
    }
    html += '</div>';
    $('attn-grid').innerHTML = html;

    let maxSum = 0, entSum = 0;
    for (let i = 0; i < n; i++) {
      maxSum += Math.max(...W[i]);
      let H = 0; W[i].forEach(w => { if (w > 0) H -= w * Math.log(w); });
      entSum += H / Math.log(n);
    }
    $('attn-stat').innerHTML = `平均最大权重 <b style="color:#7c3aed">${(maxSum / n * 100).toFixed(0)}%</b>　相对熵 <b>${(entSum / n * 100).toFixed(0)}%</b>（100% = 完全均匀）`;
  }

  function highlightBtns() {
    el.querySelectorAll('.attn-s').forEach(b => {
      const on = +b.dataset.i === sentIdx;
      b.style.background = on ? 'var(--primary)' : 'var(--bg-primary)';
      b.style.color = on ? '#fff' : '';
      b.style.borderColor = on ? 'var(--primary)' : 'var(--border)';
    });
  }

  el.querySelectorAll('.attn-s').forEach(b => b.addEventListener('click', () => { sentIdx = +b.dataset.i; highlightBtns(); render(); }));
  $('attn-dk').addEventListener('change', e => { state.dk = +e.target.value; render(); });
  $('attn-temp').addEventListener('input', e => { state.temp = +e.target.value; $('attn-temp-v').textContent = state.temp.toFixed(1); render(); });
  $('attn-scale').addEventListener('change', e => { state.scale = e.target.checked; render(); });
  $('attn-mask').addEventListener('change', e => { state.mask = e.target.checked; render(); });

  highlightBtns();
  render();
});

// Agent 循环状态机动画（ai-08 / ai-09）：思考→工具调用→执行→观察 循环 + 上下文增长条 + 停止条件
// 四个场景：画正方形（正常完成）/ 电机故障排查（多轮推理）/ RAG 问答（一轮即答）/ 失控循环（看门狗救场）
Charts.register('agent-loop', function(el) {
  const CTX_WINDOW = 32000, CTX_BASE = 2600;   // 玩具数字：32K 窗口，系统提示+工具定义占 2.6K
  // stage: user(任务) thought(思考) action(调用) exec(执行) obs(观察) compaction(压缩) stop(停止/答案)
  const SCEN = [
    { name: '🎯 画正方形', steps: [
      { stage: 'user', ctx: 30, text: '用户：画一个边长 20mm 的正方形' },
      { stage: 'thought', ctx: 110, text: 'Thought：工作台原点在左下角。计划：先回零，再依次画 (0,0)→(20,0)→(20,20)→(0,20)→(0,0) 四条边' },
      { stage: 'action', ctx: 40, text: 'Action：home()' },
      { stage: 'exec', ctx: 0, text: '执行：协议帧 0x01 → 串口 → STM32，笔架回原点' },
      { stage: 'obs', ctx: 130, text: 'Obs：{"ok": true, "pos": [0, 0]}' },
      { stage: 'action', ctx: 45, text: 'Action：draw_line(20, 0)' },
      { stage: 'exec', ctx: 0, text: '执行：落笔，梯形速度剖面插补 20mm' },
      { stage: 'obs', ctx: 120, text: 'Obs：{"ok": true, "ms": 310}' },
      { stage: 'action', ctx: 45, text: 'Action：draw_line(20, 20)' },
      { stage: 'exec', ctx: 0, text: '执行：第 2 条边' },
      { stage: 'obs', ctx: 115, text: 'Obs：{"ok": true, "ms": 302}' },
      { stage: 'action', ctx: 45, text: 'Action：draw_line(0, 20)' },
      { stage: 'exec', ctx: 0, text: '执行：第 3 条边' },
      { stage: 'obs', ctx: 115, text: 'Obs：{"ok": true, "ms": 305}' },
      { stage: 'action', ctx: 45, text: 'Action：draw_line(0, 0)' },
      { stage: 'exec', ctx: 0, text: '执行：第 4 条边，回到起点' },
      { stage: 'obs', ctx: 118, text: 'Obs：{"ok": true, "ms": 308}' },
      { stage: 'thought', ctx: 85, text: 'Thought：四条边全部成功且首尾闭合，边长 20 ✔ 任务完成' },
      { stage: 'stop', ctx: 60, text: '🏁 停止条件①：任务完成 → 输出最终答案"已画完 20mm 正方形，耗时约 3.2s"', ok: true },
    ] },
    { name: '🔧 故障排查', steps: [
      { stage: 'user', ctx: 28, text: '用户：X 轴电机声音不对，帮我查一下' },
      { stage: 'thought', ctx: 95, text: 'Thought：先读 X 轴相电流 RMS，与正常基线对比' },
      { stage: 'action', ctx: 38, text: 'Action：read_current("X")' },
      { stage: 'exec', ctx: 0, text: '执行：ADC 采样 256 点 → 滑窗 RMS' },
      { stage: 'obs', ctx: 125, text: 'Obs：RMS 2.3A（基线 1.1A，偏高 109%）' },
      { stage: 'thought', ctx: 88, text: 'Thought：电流翻倍像机械卡滞，再看跟随误差确认是否丢步' },
      { stage: 'action', ctx: 40, text: 'Action：read_pos_err("X")' },
      { stage: 'exec', ctx: 0, text: '执行：读编码器反馈，比对目标位置' },
      { stage: 'obs', ctx: 120, text: 'Obs：跟随误差 8.4mm（正常 &lt; 0.5mm）——确已丢步' },
      { stage: 'thought', ctx: 90, text: 'Thought：继续运行有撞限位风险，先安全停机再上报' },
      { stage: 'action', ctx: 35, text: 'Action：stop_motor("X")' },
      { stage: 'exec', ctx: 0, text: '执行：减速曲线停机，保持位置' },
      { stage: 'obs', ctx: 110, text: 'Obs：{"ok": true, "state": "idle"}' },
      { stage: 'stop', ctx: 65, text: '🏁 停止条件①：任务完成 → "X 轴皮带疑似卡滞丢步，已停机，请检查从动轮"', ok: true },
    ] },
    { name: '📚 RAG 问答', steps: [
      { stage: 'user', ctx: 26, text: '用户：KV Cache 的显存怎么算？' },
      { stage: 'thought', ctx: 80, text: 'Thought：概念题，先检索课程库拿一手资料' },
      { stage: 'action', ctx: 36, text: 'Action：search("KV Cache 显存")' },
      { stage: 'exec', ctx: 0, text: '执行：问题向量化 → 向量库 top-20 → RRF 融合 → 重排' },
      { stage: 'obs', ctx: 1450, text: 'Obs：top-4 片段 = ai-04（KV 公式块）+ ai-12（量化）+ …（共 1,400 token）' },
      { stage: 'thought', ctx: 85, text: 'Thought：ai-04 公式块直接命中，直接引用作答，无需再检索' },
      { stage: 'stop', ctx: 320, text: '🏁 停止条件①：任务完成 → 按公式作答并附引用 [ai-04]', ok: true },
    ] },
    { name: '💥 失控循环', steps: [
      { stage: 'user', ctx: 30, text: '用户：找到课程里关于"模糊控制"的内容并总结' },
      { stage: 'thought', ctx: 90, text: 'Thought：检索"模糊控制"' },
      { stage: 'action', ctx: 40, text: 'Action：search("模糊控制")' },
      { stage: 'exec', ctx: 0, text: '执行：向量检索 + BM25' },
      { stage: 'obs', ctx: 3600, text: 'Obs：0 条结果（库里其实没有这个词）' },
      { stage: 'thought', ctx: 95, text: 'Thought：换个关键词"模糊 PID"再试' },
      { stage: 'action', ctx: 42, text: 'Action：search("模糊 PID")' },
      { stage: 'exec', ctx: 0, text: '执行：向量检索 + BM25' },
      { stage: 'obs', ctx: 3500, text: 'Obs：0 条结果' },
      { stage: 'thought', ctx: 95, text: 'Thought：大小写问题？改用英文 "FUZZY"' },
      { stage: 'action', ctx: 40, text: 'Action：search("FUZZY")' },
      { stage: 'exec', ctx: 0, text: '执行：向量检索 + BM25' },
      { stage: 'obs', ctx: 3480, text: 'Obs：0 条结果' },
      { stage: 'thought', ctx: 100, text: 'Thought：一定是索引坏了，重建索引试试' },
      { stage: 'action', ctx: 45, text: 'Action：reindex()' },
      { stage: 'exec', ctx: 0, text: '执行：全量重建向量索引（4.2s）' },
      { stage: 'obs', ctx: 5200, text: 'Obs：重建完成，仍然 0 条' },
      { stage: 'thought', ctx: 98, text: 'Thought：再试一次"模糊控制"……' },
      { stage: 'action', ctx: 40, text: 'Action：search("模糊控制")' },
      { stage: 'exec', ctx: 0, text: '执行：向量检索 + BM25' },
      { stage: 'obs', ctx: 3550, text: 'Obs：0 条结果' },
      { stage: 'compaction', ctx: 0, text: '⚠️ Harness：上下文达 82% → 触发压缩，早期轮次摘要化', compact: true },
      { stage: 'thought', ctx: 95, text: 'Thought：（压缩后）继续尝试其他关键词' },
      { stage: 'action', ctx: 40, text: 'Action：search("模糊控制器")' },
      { stage: 'exec', ctx: 0, text: '执行：向量检索 + BM25' },
      { stage: 'obs', ctx: 3500, text: 'Obs：0 条结果' },
      { stage: 'stop', ctx: 60, text: '🏁 停止条件②：轮数上限 6 轮触发，强制停止并上报失败——模型自己不会喊停，看门狗是 harness 的', ok: false },
    ] },
  ];

  const STAGES = [
    { key: 'user', icon: '📋', label: '用户任务' },
    { key: 'thought', icon: '💭', label: '思考 Thought' },
    { key: 'action', icon: '🔧', label: '工具调用' },
    { key: 'exec', icon: '⚙️', label: '执行' },
    { key: 'obs', icon: '👁', label: '观察 Obs' },
  ];

  el.innerHTML = `
    <div style="padding:0.5rem 0 0">
      <div id="alp-scens" style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.6rem"></div>
      <div id="alp-flow" style="display:flex;align-items:stretch;gap:4px;flex-wrap:nowrap;overflow-x:auto;padding:0.2rem 0"></div>
      <div style="font-size:0.72rem;color:var(--text-secondary);margin:0.15rem 0 0.5rem;display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.4rem">
        <span>← 观察结果回注上下文，回到思考（下一轮）　·　思考 → 满足条件直接输出答案（退出循环）→</span>
        <span id="alp-round"></span>
      </div>
      <div style="display:flex;gap:0.75rem;flex-wrap:wrap">
        <div id="alp-log" style="flex:1 1 320px;min-width:280px;height:170px;overflow-y:auto;background:var(--bg-secondary);border-radius:0.5rem;padding:0.5rem 0.65rem;font-family:ui-monospace,Consolas,monospace;font-size:0.72rem;line-height:1.65"></div>
        <div style="flex:0 0 250px;display:flex;flex-direction:column;gap:0.5rem">
          <div style="background:var(--bg-secondary);border-radius:0.5rem;padding:0.55rem 0.7rem;font-size:0.75rem">
            上下文窗口 <span id="alp-ctxn" style="float:right;font-weight:600"></span>
            <div style="height:10px;border-radius:5px;background:var(--border);margin-top:5px;overflow:hidden"><div id="alp-ctxbar" style="height:100%;width:8%;border-radius:5px;background:#10b981;transition:width .4s"></div></div>
            <div style="display:flex;justify-content:space-between;color:var(--text-secondary);font-size:0.68rem;margin-top:3px"><span>0</span><span id="alp-ctxp"></span><span>32K</span></div>
          </div>
          <div id="alp-stop" style="background:var(--bg-secondary);border-radius:0.5rem;padding:0.55rem 0.7rem;font-size:0.75rem;color:var(--text-secondary)">停止条件：<span style="opacity:.6">等待中</span></div>
        </div>
      </div>
      <div style="display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap;margin-top:0.6rem">
        <button id="alp-play" style="padding:0.3rem 0.9rem;border-radius:0.4rem;border:1px solid var(--primary);background:var(--primary);color:#fff;cursor:pointer;font-size:0.8rem">▶ 播放</button>
        <button id="alp-step" style="padding:0.3rem 0.9rem;border-radius:0.4rem;border:1px solid var(--border);background:var(--bg-primary);cursor:pointer;font-size:0.8rem">⏭ 单步</button>
        <button id="alp-reset" style="padding:0.3rem 0.9rem;border-radius:0.4rem;border:1px solid var(--border);background:var(--bg-primary);cursor:pointer;font-size:0.8rem">↺ 重置</button>
        <label style="display:flex;align-items:center;gap:0.4rem;font-size:0.78rem;color:var(--text-secondary)">速度
          <input type="range" id="alp-speed" min="60" max="2000" step="20" value="800" style="width:100px">
        </label>
      </div>
      <div style="font-size:0.72rem;color:var(--text-secondary);margin-top:0.45rem;line-height:1.55">四个场景各看一遍：正常任务如何"思考→调用→观察"推进；RAG 为什么一轮就停；以及"💥 失控循环"——同一工具反复失败时模型不会自己喊停，轮数上限（看门狗）和上下文压缩（先亮 ⚠️）才是 harness 的安全件。</div>
    </div>`;

  const $ = id => el.querySelector('#' + id);
  const ICON = { user: '📋', thought: '💭', action: '🔧', exec: '⚙️', obs: '👁', compaction: '⚠️', stop: '🏁' };
  const LOGC = { user: '#2563eb', thought: '#7c3aed', action: '#0891b2', exec: '#666', obs: '#059669', compaction: '#d97706', stop: '#dc2626' };

  // 状态机管线
  $('alp-flow').innerHTML = STAGES.map(s => `
    <div data-st="${s.key}" style="flex:1;min-width:92px;border:1.5px solid var(--border);border-radius:0.55rem;padding:0.45rem 0.3rem;text-align:center;transition:all .25s">
      <div style="font-size:1.25rem">${s.icon}</div>
      <div style="font-size:0.72rem;color:var(--text-secondary);margin-top:2px">${s.label}</div>
    </div>`).join('') + `
    <div data-st="stop" style="flex:0 0 96px;border:1.5px dashed var(--border);border-radius:0.55rem;padding:0.45rem 0.3rem;text-align:center;transition:all .25s">
      <div style="font-size:1.25rem">🏁</div><div style="font-size:0.72rem;color:var(--text-secondary);margin-top:2px">停止条件</div>
    </div>`;
  $('alp-scens').innerHTML = SCEN.map((s, i) => `<button data-i="${i}" style="padding:0.28rem 0.8rem;border-radius:9999px;font-size:0.78rem;border:1px solid var(--border);background:var(--bg-primary);cursor:pointer">${s.name}</button>`).join('');

  let scenIdx = 0, idx = 0, ctx = CTX_BASE, round = 0, playing = false, timer = null;

  function highlight(stage) {
    el.querySelectorAll('[data-st]').forEach(b => {
      const on = b.dataset.st === stage;
      b.style.background = on ? 'var(--primary)' : 'transparent';
      b.style.borderColor = on ? 'var(--primary)' : 'var(--border)';
      b.style.transform = on ? 'translateY(-2px)' : '';
      b.querySelectorAll('div')[1].style.color = on ? '#fff' : 'var(--text-secondary)';
    });
  }
  function statusCtx() {
    const p = ctx / CTX_WINDOW * 100;
    $('alp-ctxbar').style.width = Math.min(100, p).toFixed(1) + '%';
    $('alp-ctxbar').style.background = p > 80 ? '#ef4444' : p > 60 ? '#f59e0b' : '#10b981';
    $('alp-ctxn').textContent = (ctx / 1000).toFixed(1) + 'K';
    $('alp-ctxp').textContent = p.toFixed(0) + '%';
  }
  function log(step) {
    const d = document.createElement('div');
    d.innerHTML = `<span style="color:${LOGC[step.stage]}">${ICON[step.stage]}</span> <span style="color:var(--text-primary)">${step.text}</span>`;
    $('alp-log').appendChild(d);
    $('alp-log').scrollTop = $('alp-log').scrollHeight;
  }
  function tick() {
    const steps = SCEN[scenIdx].steps;
    if (idx >= steps.length) { stopPlay(); return; }
    const st = steps[idx++];
    if (st.stage === 'thought') { round++; $('alp-round').textContent = '第 ' + round + ' 轮'; }
    if (st.compact) ctx = Math.round(ctx * 0.42);
    ctx += st.ctx;
    highlight(st.stage === 'stop' ? 'stop' : st.stage);
    log(st);
    statusCtx();
    if (st.stage === 'stop') {
      $('alp-stop').innerHTML = `<span style="color:${st.ok ? '#059669' : '#dc2626'};font-weight:600">${st.ok ? '✅ 正常结束' : '⛔ 强制停止'}</span><br><span style="font-size:0.7rem">${st.text.replace(/^🏁 /, '')}</span>`;
      stopPlay();
    }
  }
  function stopPlay() { playing = false; clearInterval(timer); timer = null; $('alp-play').textContent = '▶ 播放'; }
  function startPlay() {
    if (idx >= SCEN[scenIdx].steps.length) reset();
    playing = true; $('alp-play').textContent = '⏸ 暂停';
    clearInterval(timer);
    timer = setInterval(tick, 2050 - (+$('alp-speed').value));
  }
  function reset() {
    stopPlay(); idx = 0; ctx = CTX_BASE; round = 0;
    $('alp-log').innerHTML = ''; $('alp-round').textContent = '';
    $('alp-stop').innerHTML = '停止条件：<span style="opacity:.6">等待中</span>';
    highlight(null); statusCtx();
  }
  function pickScen(i) { scenIdx = i; reset(); }

  el.querySelectorAll('#alp-scens button').forEach(b => {
    b.addEventListener('click', () => {
      el.querySelectorAll('#alp-scens button').forEach(x => { x.style.background = 'var(--bg-primary)'; x.style.borderColor = 'var(--border)'; x.style.color = ''; });
      b.style.background = 'var(--primary)'; b.style.borderColor = 'var(--primary)'; b.style.color = '#fff';
      pickScen(+b.dataset.i);
    });
  });
  $('alp-play').addEventListener('click', () => playing ? stopPlay() : startPlay());
  $('alp-step').addEventListener('click', () => { stopPlay(); tick(); });
  $('alp-reset').addEventListener('click', reset);
  $('alp-speed').addEventListener('input', () => { if (playing) startPlay(); });

  el.querySelector('#alp-scens button').click();
});

// 奈奎斯特图（act-10）：预置开环传函 + K 滑块，画 Nyquist 曲线，N/P/Z 判稳
Charts.register('nyquist-plot', function(el) {
  const SYS = [
    { name: '三阶 I 型', P: 0, f: (s, K) => K / (s * (s + 1) * (s + 2)) },
    { name: '二阶振荡', P: 0, f: (s, K) => K / (s * s + s + 1) },
    { name: '带积分二阶', P: 0, f: (s, K) => K / (s * s * (s + 0.5)) },
    { name: '不稳定开环', P: 1, f: (s, K) => K / ((s - 1) * (s + 2) * (s + 3)) },
  ];
  let sysIdx = 0, K = 2;

  el.innerHTML = `
    <div style="padding:0.5rem 0 0">
      <div id="nyq-btns" style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.5rem"></div>
      <div style="display:flex;gap:1.2rem;flex-wrap:wrap;align-items:center;padding:0.5rem 0.75rem;background:var(--bg-secondary);border-radius:0.5rem;font-size:0.8rem">
        <label style="display:flex;align-items:center;gap:0.5rem">增益 K
          <input type="range" id="nyq-k" min="0.3" max="12" step="0.1" value="2" style="width:120px">
          <span id="nyq-kv" style="min-width:2.2rem;font-weight:600">2.0</span>
        </label>
        <span style="color:var(--text-secondary)">P（开环右极点）=<b id="nyq-p"></b></span>
        <span style="color:var(--text-secondary)">N（-1 点顺时针包围圈数）=<b id="nyq-n"></b></span>
        <span style="color:var(--text-secondary)">Z=N+P（闭环右极点）=<b id="nyq-z"></b></span>
        <b id="nyq-verdict"></b>
      </div>
      <canvas id="nyq-cv" width="640" height="420" style="width:100%;max-width:680px;height:auto;margin-top:0.6rem"></canvas>
      <div style="font-size:0.72rem;color:var(--text-secondary);margin-top:0.4rem;line-height:1.55">红点 (-1, j0) 是判据核心：实线为 ω: 0⁺→+∞ 分支，虚线为其镜像（ω: -∞→0⁻）。Z = N + P = 0 ⇔ 闭环稳定。拖大 K 看三阶系统由稳转不稳的全过程；"不稳定开环"预置 P=1，必须反向包围一圈才能稳。</div>
    </div>`;
  const $ = id => el.querySelector('#' + id);
  $('nyq-btns').innerHTML = SYS.map((s, i) => `<button data-i="${i}" style="padding:0.28rem 0.8rem;border-radius:9999px;font-size:0.78rem;border:1px solid var(--border);background:var(--bg-primary);cursor:pointer">${s.name}</button>`).join('');

  // 复数辅助
  const cmul = (a, b) => ({ r: a.r * b.r - a.i * b.i, i: a.r * b.i + a.i * b.r });
  const cadd = (a, b) => ({ r: a.r + b.r, i: a.i + b.i });
  const cscale = (a, k) => ({ r: a.r * k, i: a.i * k });
  const cdiv = (a, b) => { const d = b.r * b.r + b.i * b.i; return { r: (a.r * b.r + a.i * b.i) / d, i: (a.i * b.r - a.r * b.i) / d }; };
  const csub = (a, b) => ({ r: a.r - b.r, i: a.i - b.i });

  function draw() {
    const cv = $('nyq-cv'), ctx = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    const sys = SYS[sysIdx];
    // 采样 ω（对数分布），正负分支
    const NPT = 600, pos = [];
    for (let i = 0; i < NPT; i++) pos.push(Math.pow(10, -2 + 4.5 * i / (NPT - 1)));
    const evalG = w => { const jw = { r: 0, i: w }; return sys.f(jw, K); };
    const pts = pos.map(evalG);
    // 全闭曲线：正分支 + 镜像反向（ω: +∞ → -∞ 经共轭）
    const curve = pts.concat(pts.slice().reverse().map(p => ({ r: p.r, i: -p.i })));
    // 包围圈数：绕 (-1,0) 的累计幅角
    let ang = 0;
    for (let i = 0; i < curve.length; i++) {
      const a = csub(curve[i], { r: -1, i: 0 }), b = csub(curve[(i + 1) % curve.length], { r: -1, i: 0 });
      let d = Math.atan2(b.r * a.i - b.i * a.r, b.r * a.r + b.i * a.i);
      if (d > Math.PI) d -= 2 * Math.PI;
      if (d < -Math.PI) d += 2 * Math.PI;
      ang += d;
    }
    const Nw = Math.round(-ang / (2 * Math.PI));   // 逆时针为正 → 顺时针 N 取负
    const N = Nw, P = sys.P, Z = N + P;

    // 视窗：包含曲线与 (-1,0)
    let xmax = 1.5, ymax = 1.5;
    pts.forEach(p => { xmax = Math.max(xmax, Math.abs(p.r)); ymax = Math.max(ymax, Math.abs(p.i)); });
    xmax = Math.min(xmax, 12); ymax = Math.min(ymax, 12);
    const scale = Math.min(W / (2 * xmax * 1.15), H / (2 * ymax * 1.15));
    const cx = W / 2, cy = H / 2;
    const X = p => cx + p.r * scale, Y = p => cy - p.i * scale;

    const dark = document.body.classList.contains('dark');
    const cAxis = dark ? '#555' : '#bbb', cText = dark ? '#aaa' : '#666';
    ctx.clearRect(0, 0, W, H);
    // 网格与轴
    ctx.strokeStyle = cAxis; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();
    // 刻度
    ctx.fillStyle = cText; ctx.font = '10px sans-serif';
    for (let v = -Math.floor(xmax); v <= xmax; v++) {
      if (v === 0) continue;
      ctx.fillText(v, X({ r: v, i: 0 }) - 5, cy + 12);
    }
    for (let v = -Math.floor(ymax); v <= ymax; v++) {
      if (v === 0) continue;
      ctx.fillText(v, cx + 4, Y({ r: 0, i: v }) + 3);
    }
    // 单位圆
    ctx.strokeStyle = cAxis; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.arc(cx, cy, scale, 0, Math.PI * 2); ctx.stroke();
    // Nyquist 正分支（实线）
    ctx.setLineDash([]); ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2;
    ctx.beginPath();
    pts.forEach((p, i) => i ? ctx.lineTo(X(p), Y(p)) : ctx.moveTo(X(p), Y(p)));
    ctx.stroke();
    // 镜像分支（虚线）
    ctx.setLineDash([6, 4]); ctx.lineWidth = 1.3;
    ctx.beginPath();
    pts.forEach((p, i) => { const q = { r: p.r, i: -p.i }; i ? ctx.lineTo(X(q), Y(q)) : ctx.moveTo(X(q), Y(q)); });
    ctx.stroke();
    ctx.setLineDash([]);
    // (-1, 0) 判据点
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(X({ r: -1, i: 0 }), cy, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = cText; ctx.fillText('(-1, j0)', X({ r: -1, i: 0 }) - 14, cy - 10);
    ctx.fillText('Re', W - 18, cy - 6); ctx.fillText('Im', cx + 6, 14);

    $('nyq-p').textContent = P; $('nyq-n').textContent = N; $('nyq-z').textContent = Z;
    const ok = Z === 0;
    const vd = $('nyq-verdict');
    vd.textContent = ok ? '✅ 闭环稳定' : '❌ 闭环不稳定';
    vd.style.color = ok ? '#059669' : '#ef4444';
  }

  el.querySelectorAll('#nyq-btns button').forEach(b => b.addEventListener('click', () => {
    el.querySelectorAll('#nyq-btns button').forEach(x => { x.style.background = 'var(--bg-primary)'; x.style.borderColor = 'var(--border)'; x.style.color = ''; });
    b.style.background = 'var(--primary)'; b.style.borderColor = 'var(--primary)'; b.style.color = '#fff';
    sysIdx = +b.dataset.i; draw();
  }));
  $('nyq-k').addEventListener('input', e => { K = +e.target.value; $('nyq-kv').textContent = K.toFixed(1); draw(); });
  el.querySelector('#nyq-btns button').click();
});

// 卷积动画（sig-02）：x(τ) 固定、h(t-τ) 翻转平移，乘积积分逐点生成 y(t)
Charts.register('convolution', function(el) {
  const SIG = {
    rect: { name: '矩形脉冲', f: t => (t >= 0 && t <= 2) ? 1 : 0 },
    tri: { name: '三角脉冲', f: t => (t >= 0 && t <= 2) ? (t < 1 ? t : 2 - t) : 0 },
    exp: { name: '单边指数', f: t => t >= 0 ? Math.exp(-t) : 0 },
    sin: { name: '截断正弦', f: t => (t >= 0 && t <= 4) ? Math.sin(Math.PI * t / 2) : 0 },
  };
  let xk = 'rect', hk = 'exp', t = 0, playing = false, timer = null;

  el.innerHTML = `
    <div style="padding:0.5rem 0 0">
      <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:center;padding:0.5rem 0.75rem;background:var(--bg-secondary);border-radius:0.5rem;font-size:0.8rem">
        <label>x(τ) <select id="cvx" style="padding:0.15rem 0.3rem;border:1px solid var(--border);background:var(--bg);border-radius:0.25rem">
          ${Object.entries(SIG).map(([k, s]) => `<option value="${k}">${s.name}</option>`).join('')}</select></label>
        <label>h(τ) <select id="cvh" style="padding:0.15rem 0.3rem;border:1px solid var(--border);background:var(--bg);border-radius:0.25rem">
          ${Object.entries(SIG).map(([k, s], i) => `<option value="${k}" ${i === 1 ? 'selected' : ''}>${s.name}</option>`).join('')}</select></label>
        <label style="display:flex;align-items:center;gap:0.5rem">t = <span id="cvt-v" style="min-width:2.4rem;font-weight:600;color:var(--primary)">0.0</span></label>
        <label style="display:flex;align-items:center;gap:0.4rem">平移
          <input type="range" id="cvt" min="0" max="8" step="0.05" value="0" style="width:130px"></label>
        <button id="cv-play" style="padding:0.25rem 0.8rem;border-radius:0.4rem;border:1px solid var(--primary);background:var(--primary);color:#fff;cursor:pointer;font-size:0.78rem">▶ 播放</button>
      </div>
      <canvas id="cv-cv" width="640" height="430" style="width:100%;max-width:680px;height:auto;margin-top:0.6rem"></canvas>
      <div style="font-size:0.72rem;color:var(--text-secondary);margin-top:0.4rem;line-height:1.55">上图：x(τ)（蓝）与翻转平移的 h(t-τ)（绿），重叠区乘积曲线（紫，即被积函数）；下图：y(t) = ∫ x(τ)h(t-τ)dτ 随 t 增长逐步"扫"出来，圆点为当前值。换信号组合观察：矩形×指数 = 单边充电曲线；三角×三角 = 光滑钟形。</div>
    </div>`;
  const $ = id => el.querySelector('#' + id);

  function draw() {
    const cv = $('cv-cv'), ctx = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    const T = 8, dt = 0.02;
    const fx = SIG[xk].f, fh = SIG[hk].f;
    const dark = document.body.classList.contains('dark');
    const cAxis = dark ? '#555' : '#bbb', cText = dark ? '#aaa' : '#666';
    ctx.clearRect(0, 0, W, H);

    // ---- 上图：τ 域 ----
    const H1 = 190, x0 = 40, x1 = W - 12, yAmax = 1.35;
    const px = tau => x0 + (tau / T) * (x1 - x0);
    const pyA = v => H1 - 18 - v / yAmax * (H1 - 40);
    ctx.strokeStyle = cAxis; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x0, H1 - 18); ctx.lineTo(x1, H1 - 18); ctx.stroke();
    ctx.fillStyle = cText; ctx.font = '10px sans-serif';
    for (let tv = 0; tv <= T; tv += 1) ctx.fillText(tv, px(tv) - 3, H1 - 5);
    ctx.fillText('τ', x1 - 8, H1 - 5);

    // x(τ)
    ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 2; ctx.beginPath(); let st = false;
    for (let tau = -3; tau <= T + 3; tau += dt) { const v = fx(tau); const X = px(tau), Y = pyA(v); st ? ctx.lineTo(X, Y) : (ctx.moveTo(X, Y), st = true); }
    ctx.stroke();
    // h(t-τ)
    ctx.strokeStyle = '#059669'; ctx.lineWidth = 2; ctx.beginPath(); st = false;
    for (let tau = -3; tau <= T + 3; tau += dt) { const v = fh(t - tau); const X = px(tau), Y = pyA(v); st ? ctx.lineTo(X, Y) : (ctx.moveTo(X, Y), st = true); }
    ctx.stroke();
    // 乘积曲线（紫色）+ 填充
    ctx.beginPath(); st = false;
    for (let tau = -3; tau <= T + 3; tau += dt) { const v = fx(tau) * fh(t - tau); const X = px(tau), Y = pyA(v); st ? ctx.lineTo(X, Y) : (ctx.moveTo(X, Y), st = true); }
    ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 1.6; ctx.stroke();
    ctx.lineTo(px(T + 3), H1 - 18); ctx.lineTo(px(-3), H1 - 18); ctx.closePath();
    ctx.fillStyle = 'rgba(124,58,237,0.18)'; ctx.fill();
    ctx.fillStyle = cText; ctx.font = '11px sans-serif';
    ctx.fillText('x(τ)', x0 + 4, 14); ctx.fillStyle = '#059669'; ctx.fillText('h(t-τ)', x0 + 46, 14);
    ctx.fillStyle = '#7c3aed'; ctx.fillText('乘积（被积函数）', x0 + 108, 14);

    // ---- 下图：y(t) ----
    const H2 = H, y0 = H2 - (H2 - H1 - 16), yTop = H1 + 26;
    ctx.strokeStyle = cAxis; ctx.beginPath(); ctx.moveTo(x0, H2 - 24); ctx.lineTo(x1, H2 - 24); ctx.stroke();
    ctx.fillStyle = cText;
    for (let tv = 0; tv <= T; tv += 1) ctx.fillText(tv, px(tv) - 3, H2 - 11);
    ctx.fillText('t', x1 - 8, H2 - 11);
    // 数值卷积（梯形）
    let ymax = 1e-6;
    const ys = [];
    for (let ti = 0; ti <= t + 1e-9; ti += dt) {
      let s = 0;
      for (let tau = 0; tau <= T; tau += dt) s += fx(tau) * fh(ti - tau) * dt;
      ys.push([ti, s]); ymax = Math.max(ymax, s);
    }
    ymax *= 1.15;
    const pyB = v => (H2 - 24) - v / ymax * (H2 - 24 - yTop);
    ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2.2; ctx.beginPath();
    ys.forEach(([ti, v], i) => i ? ctx.lineTo(px(ti), pyB(v)) : ctx.moveTo(px(ti), pyB(v)));
    ctx.stroke();
    if (ys.length) {
      const last = ys[ys.length - 1];
      ctx.fillStyle = '#dc2626';
      ctx.beginPath(); ctx.arc(px(last[0]), pyB(last[1]), 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = cText; ctx.font = '11px sans-serif';
      ctx.fillText('y(' + last[0].toFixed(2) + ') = ' + last[1].toFixed(3), Math.min(px(last[0]) + 8, x1 - 90), pyB(last[1]) - 8);
    }
    ctx.fillStyle = cText; ctx.fillText('y(t) = (x * h)(t)', x0 + 4, yTop + 4);
    $('cvt-v').textContent = t.toFixed(1);
  }

  function stop() { playing = false; clearInterval(timer); $('cv-play').textContent = '▶ 播放'; }
  $('cv-play').addEventListener('click', () => {
    if (playing) { stop(); return; }
    playing = true; $('cv-play').textContent = '⏸ 暂停';
    if (t >= 8) t = 0;
    timer = setInterval(() => { t = +(t + 0.04).toFixed(2); if (t >= 8) { t = 8; stop(); } $('cvt').value = t; draw(); }, 40);
  });
  $('cvt').addEventListener('input', e => { stop(); t = +e.target.value; draw(); });
  $('cvx').addEventListener('change', e => { xk = e.target.value; draw(); });
  $('cvh').addEventListener('change', e => { hk = e.target.value; draw(); });
  draw();
});

// FFT 频谱（sig-04）：方波/三角/锯齿的傅里叶级数重构 + 谐波振幅谱
Charts.register('fft-spectrum', function(el) {
  const WAVES = {
    square: { name: '方波', coef: k => (k % 2 === 1) ? 4 / (Math.PI * k) : 0 },
    triangle: { name: '三角波', coef: k => (k % 2 === 1) ? 8 / (Math.PI * Math.PI * k * k) * (((k - 1) / 2) % 2 === 0 ? 1 : -1) : 0 },
    sawtooth: { name: '锯齿波', coef: k => (k % 2 === 1 ? 1 : -1) * 2 / (Math.PI * k) },
    sine: { name: '正弦波', coef: k => k === 1 ? 1 : 0 },
  };
  let wv = 'square', nh = 3;

  el.innerHTML = `
    <div style="padding:0.5rem 0 0">
      <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:center;padding:0.5rem 0.75rem;background:var(--bg-secondary);border-radius:0.5rem;font-size:0.8rem">
        <label>波形 <select id="ff-w" style="padding:0.15rem 0.3rem;border:1px solid var(--border);background:var(--bg);border-radius:0.25rem">
          ${Object.entries(WAVES).map(([k, w]) => `<option value="${k}">${w.name}</option>`).join('')}</select></label>
        <label style="display:flex;align-items:center;gap:0.5rem">谐波数 N = <span id="ff-nv" style="min-width:1.4rem;font-weight:600;color:var(--primary)">3</span>
          <input type="range" id="ff-n" min="1" max="41" step="2" value="3" style="width:130px"></label>
        <span id="ff-note" style="color:var(--text-secondary)"></span>
      </div>
      <canvas id="ff-cv" width="640" height="430" style="width:100%;max-width:680px;height:auto;margin-top:0.6rem"></canvas>
      <div style="font-size:0.72rem;color:var(--text-secondary);margin-top:0.4rem;line-height:1.55">上图：前 N 次谐波合成的时域波形（灰为理想波形）；下图：各次谐波振幅 |c_k|。方波只含奇次谐波、幅度 1/k 衰减——把 N 拉满观察吉布斯现象：跳变沿附近 ~9% 的过冲不随 N 消失；三角波幅度 1/k² 衰减，收敛快得多（这也是同一系统方波比三角波"刺耳"的原因）。</div>
    </div>`;
  const $ = id => el.querySelector('#' + id);

  function draw() {
    const cv = $('ff-cv'), ctx = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    const wave = WAVES[wv];
    const dark = document.body.classList.contains('dark');
    const cAxis = dark ? '#555' : '#bbb', cText = dark ? '#aaa' : '#666';
    ctx.clearRect(0, 0, W, H);
    const x0 = 40, x1 = W - 14;

    // ---- 上图：时域（两个周期） ----
    const H1 = 200, yA = 40, tMax = 4 * Math.PI;
    const px = th => x0 + th / tMax * (x1 - x0);
    const ideal = th => wv === 'square' ? Math.sign(Math.sin(th)) : wv === 'sawtooth' ? (((th / Math.PI) % 2 + 2) % 2 - 1) : wv === 'sine' ? Math.sin(th) : (() => { const u = ((th / Math.PI) % 2 + 2) % 2; return u < 1 ? u : 2 - u; })();
    const recon = th => { let s = 0; for (let k = 1; k <= nh; k++) s += wave.coef(k) * Math.sin(k * th); return s; };
    ctx.strokeStyle = cAxis; ctx.beginPath(); ctx.moveTo(x0, H1 / 2 + 6); ctx.lineTo(x1, H1 / 2 + 6); ctx.stroke();
    ctx.fillStyle = cText; ctx.font = '10px sans-serif';
    ctx.fillText('t（两个周期）', x1 - 70, H1 / 2 + 18);
    // 理想波形（灰）
    ctx.strokeStyle = cAxis; ctx.lineWidth = 1; ctx.setLineDash([3, 3]); ctx.beginPath();
    for (let th = 0; th <= tMax; th += 0.02) { const X = px(th), Y = H1 / 2 + 6 - ideal(th) * yA * 0.85; th ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }
    ctx.stroke(); ctx.setLineDash([]);
    // 合成波形（紫）
    ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2; ctx.beginPath();
    for (let th = 0; th <= tMax; th += 0.02) { const X = px(th), Y = H1 / 2 + 6 - recon(th) * yA * 0.85; th ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }
    ctx.stroke();
    ctx.fillStyle = '#7c3aed'; ctx.font = '11px sans-serif'; ctx.fillText('前 ' + nh + ' 次谐波合成', x0 + 4, 14);

    // ---- 下图：频谱 stem ----
    const y0 = H - 26, yTop = H1 + 30, maxC = 4 / Math.PI;
    const KMAX = 21;
    const kx = k => x0 + (k - 0.5) / KMAX * (x1 - x0);
    ctx.strokeStyle = cAxis; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y0); ctx.stroke();
    ctx.fillStyle = cText;
    for (let k = 1; k <= KMAX; k += 2) ctx.fillText(k, kx(k) - 4, y0 + 14);
    ctx.fillText('谐波序次 k', x1 - 60, y0 + 14);
    for (let k = 1; k <= KMAX; k++) {
      const c = wave.coef(k);
      if (c === 0) continue;
      const X = kx(k), Yk = y0 - Math.abs(c) / maxC * (y0 - yTop);
      ctx.strokeStyle = k <= nh ? '#dc2626' : '#999';
      ctx.lineWidth = k <= nh ? 3 : 2;
      ctx.beginPath(); ctx.moveTo(X, y0); ctx.lineTo(X, Yk); ctx.stroke();
      ctx.fillStyle = k <= nh ? '#dc2626' : '#aaa';
      ctx.beginPath(); ctx.arc(X, Yk, 3, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = cText; ctx.font = '11px sans-serif';
    ctx.fillText('|c_k|（谐波振幅）', x0 + 4, yTop - 6);

    const notes = {
      square: '奇次谐波，幅度 ∝ 1/k；跳变沿过冲 ≈ 9%（吉布斯现象）',
      triangle: '奇次谐波，幅度 ∝ 1/k²，收敛最快',
      sawtooth: '奇偶次都有，幅度 ∝ 1/k',
      sine: '单一谱线——正弦是唯一"纯净"的波形',
    };
    $('ff-note').textContent = notes[wv];
    $('ff-nv').textContent = nh;
  }

  $('ff-w').addEventListener('change', e => { wv = e.target.value; draw(); });
  $('ff-n').addEventListener('input', e => { nh = +e.target.value; draw(); });
  draw();
});

// 散列表冲突处理动画（ds-13）：线性探测 vs 链地址法，逐步插入
Charts.register('hashtable-vis', function(el) {
  const KEYSETS = {
    '基础': ['PID', 'PLC', 'ADC', 'PWM', 'KVL', 'RAM', 'ROM', 'CRC', 'DMA', 'ALU'],
    '冲突多': ['AA', 'AB', 'BA', 'BB', 'CA', 'AC', 'DA', 'AD', 'EA', 'AE'],
  };
  let method = 'linear', m = 7, keys = KEYSETS['基础'].slice(), step = 0, playing = false, timer = null;

  el.innerHTML = `
    <div style="padding:0.5rem 0 0">
      <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:center;padding:0.5rem 0.75rem;background:var(--bg-secondary);border-radius:0.5rem;font-size:0.8rem">
        <div id="ht-mth" style="display:flex;gap:0.4rem">
          <button data-m="linear" style="padding:0.28rem 0.8rem;border-radius:9999px;font-size:0.78rem;border:1px solid var(--border);background:var(--bg-primary);cursor:pointer">线性探测</button>
          <button data-m="chain" style="padding:0.28rem 0.8rem;border-radius:9999px;font-size:0.78rem;border:1px solid var(--border);background:var(--bg-primary);cursor:pointer">链地址法</button>
        </div>
        <label>表长 m
          <select id="ht-m" style="padding:0.15rem 0.3rem;border:1px solid var(--border);background:var(--bg);border-radius:0.25rem">
            <option>7</option><option>11</option><option>13</option>
          </select></label>
        <label>键集
          <select id="ht-ks" style="padding:0.15rem 0.3rem;border:1px solid var(--border);background:var(--bg);border-radius:0.25rem">
            <option>基础</option><option>冲突多</option>
          </select></label>
        <button id="ht-play" style="padding:0.25rem 0.8rem;border-radius:0.4rem;border:1px solid var(--primary);background:var(--primary);color:#fff;cursor:pointer;font-size:0.78rem">▶ 逐步插入</button>
        <button id="ht-reset" style="padding:0.25rem 0.8rem;border-radius:0.4rem;border:1px solid var(--border);background:var(--bg-primary);cursor:pointer;font-size:0.78rem">↺ 重置</button>
        <span id="ht-stat" style="color:var(--text-secondary)"></span>
      </div>
      <div id="ht-log" style="margin-top:0.6rem;font-family:ui-monospace,Consolas,monospace;font-size:0.74rem;line-height:1.7;background:var(--bg-secondary);border-radius:0.5rem;padding:0.5rem 0.65rem;height:120px;overflow-y:auto"></div>
      <div id="ht-table" style="margin-top:0.5rem"></div>
      <div style="font-size:0.72rem;color:var(--text-secondary);margin-top:0.4rem;line-height:1.55">哈希函数 h(k) = (各字符 ASCII 之和) mod m。线性探测：冲突后 +1 逐格找空位（注意"聚集"如何形成）；链地址法：同槽挂链表，永不溢出但链长影响查找。切到"冲突多"键集（首字母相同的键哈希相近）对比两种方法的代价。</div>
    </div>`;
  const $ = id => el.querySelector('#' + id);

  const hash = k => [...k].reduce((s, c) => s + c.charCodeAt(0), 0) % m;
  let slots = [], chains = [], logLines = [], collisions = 0, probes = 0;

  function reset() {
    stop(); step = 0;
    slots = Array.from({ length: m }, () => null);
    chains = Array.from({ length: m }, () => []);
    logLines = []; collisions = 0; probes = 0;
    $('ht-log').innerHTML = '';
    render();
  }
  function stop() { playing = false; clearInterval(timer); timer = null; $('ht-play').textContent = '▶ 逐步插入'; }

  function insertOne(k) {
    const h = hash(k);
    let line = '插入 ' + k + ' → h(' + k + ') = ' + h;
    if (method === 'linear') {
      let i = h, n = 0;
      while (slots[i] !== null && n < m) { line += '，槽 ' + i + ' 被 ' + slots[i] + ' 占用'; i = (i + 1) % m; n++; collisions++; probes++; }
      if (n >= m) { line += ' → 表满！'; }
      else { slots[i] = k; line += ' → 落位槽 ' + i + (n ? '（探测 ' + n + ' 次）' : ''); }
    } else {
      if (chains[h].length) { line += '，链上已有 ' + chains[h].length + ' 个：' + chains[h].join('→'); collisions++; probes += chains[h].length; }
      chains[h].push(k);
      line += ' → 链尾追加（链长 ' + chains[h].length + '）';
    }
    logLines.push(line);
    const d = document.createElement('div');
    d.textContent = (step + 1) + '. ' + line;
    $('ht-log').appendChild(d);
    $('ht-log').scrollTop = $('ht-log').scrollHeight;
  }

  function render() {
    let html = '';
    if (method === 'linear') {
      html = '<div style="display:grid;grid-template-columns:repeat(' + m + ',minmax(3.4rem,1fr));gap:5px">';
      for (let i = 0; i < m; i++) {
        const k = slots[i];
        const isHash = keys.slice(0, step).some(key => hash(key) === i);
        html += '<div style="text-align:center"><div style="font-size:0.66rem;color:var(--text-secondary);margin-bottom:2px">' + i + '</div>' +
          '<div style="border:1.5px solid ' + (k ? '#7c3aed' : isHash ? '#f59e0b' : 'var(--border)') + ';border-radius:0.45rem;padding:0.5rem 0.15rem;font-size:0.78rem;font-weight:600;background:' + (k ? 'rgba(124,58,237,0.12)' : 'transparent') + '">' + (k || '·') + '</div></div>';
      }
      html += '</div>';
    } else {
      html = '<div style="display:flex;flex-direction:column;gap:4px">';
      for (let i = 0; i < m; i++) {
        const list = chains[i];
        html += '<div style="display:flex;align-items:center;gap:6px">' +
          '<div style="flex:0 0 2.2rem;font-size:0.7rem;color:var(--text-secondary);text-align:right">' + i + '</div>' +
          '<div style="flex:0 0 2.6rem;border:1.5px solid var(--border);border-radius:0.35rem;padding:0.3rem 0;text-align:center;font-size:0.75rem">头</div>' +
          list.map((k, j) => '<span style="color:var(--text-secondary)">→</span><div style="flex:0 0 3.4rem;border:1.5px solid #7c3aed;border-radius:0.35rem;padding:0.3rem 0;text-align:center;font-size:0.75rem;font-weight:600;background:rgba(124,58,237,0.12)">' + k + '</div>').join('') +
          '</div>';
      }
      html += '</div>';
    }
    $('ht-table').innerHTML = html;
    $('ht-stat').textContent = '已插入 ' + step + '/' + keys.length + '　冲突 ' + collisions + '　累计探测 ' + probes;
  }

  function tick() {
    if (step >= keys.length) { stop(); return; }
    insertOne(keys[step]); step++; render();
  }

  $('ht-mth').querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
    method = b.dataset.m;
    $('ht-mth').querySelectorAll('button').forEach(x => { x.style.background = 'var(--bg-primary)'; x.style.borderColor = 'var(--border)'; x.style.color = ''; });
    b.style.background = 'var(--primary)'; b.style.borderColor = 'var(--primary)'; b.style.color = '#fff';
    reset();
  }));
  $('ht-m').addEventListener('change', e => { m = +e.target.value; reset(); });
  $('ht-ks').addEventListener('change', e => { keys = KEYSETS[e.target.value].slice(); reset(); });
  $('ht-play').addEventListener('click', () => {
    if (playing) { stop(); return; }
    playing = true; $('ht-play').textContent = '⏸ 暂停';
    if (step >= keys.length) reset();
    timer = setInterval(tick, 700);
  });
  $('ht-reset').addEventListener('click', reset);
  el.querySelector('#ht-mth button').click();
});

// 机械臂正运动学可视化（嵌入 robo-02）：2R/3R 平面机械臂，关节角/连杆长度滑块可调，
// Canvas 实时绘制连杆、关节角弧线与末端轨迹，同步显示 DH 参数表与末端位姿
Charts.register('robot-arm-fk', function(el) {
  let nJoints = 2;
  const state = { th: [30, -70, 40], a: [1.0, 0.8, 0.6] };   // 角度制 / 单位长度
  let trail = [];

  el.innerHTML = `
    <div style="padding:0.5rem 0 0">
      <div style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;padding:0.5rem 0.75rem;background:var(--bg-secondary);border-radius:0.5rem;font-size:0.8rem">
        <div id="fk-nj" style="display:flex;gap:0.4rem">
          <button data-n="2" style="padding:0.28rem 0.85rem;border-radius:9999px;font-size:0.78rem;border:1px solid var(--border);background:var(--bg-primary);cursor:pointer">2R 机械臂</button>
          <button data-n="3" style="padding:0.28rem 0.85rem;border-radius:9999px;font-size:0.78rem;border:1px solid var(--border);background:var(--bg-primary);cursor:pointer">3R 机械臂</button>
        </div>
        <button id="fk-clear" style="padding:0.28rem 0.8rem;border-radius:0.4rem;border:1px solid var(--border);background:var(--bg-primary);cursor:pointer;font-size:0.78rem">✕ 清除轨迹</button>
        <span id="fk-info" style="color:var(--text-secondary);font-family:ui-monospace,Consolas,monospace;font-size:0.74rem"></span>
      </div>
      <canvas id="fk-canvas" width="680" height="420" style="width:100%;max-width:680px;display:block;margin:0.6rem auto 0;border:1px solid var(--border);border-radius:0.5rem"></canvas>
      <div id="fk-ctrls" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:0.35rem 1.5rem;padding:0.35rem 0.25rem 0"></div>
      <div id="fk-dh" style="margin-top:0.7rem;overflow-x:auto"></div>
      <div style="font-size:0.72rem;color:var(--text-secondary);margin-top:0.45rem;line-height:1.55">拖动 θ 滑块观察末端描出的轨迹：2R 臂的工作空间是圆环 <strong>r<sub>max</sub> = a₁+a₂</strong>、<strong>r<sub>min</sub> = |a₁−a₂|</strong>；3R 臂若 a₃ 足够小则可覆盖整个圆盘。末端位姿由 DH 矩阵连乘得到（对应正文 $^0T_n$ 公式），姿态角 φ = θ₁+θ₂(+θ₃)。连杆长度 a 变化时坐标自动缩放。</div>
    </div>`;
  const $ = id => el.querySelector('#' + id);
  const canvas = $('fk-canvas'), ctx = canvas.getContext('2d');

  function cssVar(name, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  // 平面正运动学：连乘各连杆变换，返回各关节坐标与末端位姿
  function fk() {
    const pts = [{ x: 0, y: 0 }];
    let ang = 0, x = 0, y = 0;
    for (let i = 0; i < nJoints; i++) {
      ang += state.th[i] * Math.PI / 180;
      x += state.a[i] * Math.cos(ang);
      y += state.a[i] * Math.sin(ang);
      pts.push({ x, y });
    }
    return { pts, end: { x, y }, phi: ang };
  }

  function render() {
    const { pts, end, phi } = fk();
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const Lsum = state.a.slice(0, nJoints).reduce((s, v) => s + v, 0);
    const scale = Math.min(W / 2, H / 2 - 12) / (Lsum + 0.35);
    const toScr = p => ({ x: cx + p.x * scale, y: cy - p.y * scale });

    ctx.clearRect(0, 0, W, H);
    const cGrid = cssVar('--border', '#e2e8f0'), cAxis = cssVar('--text-secondary', '#64748b');
    const cText = cssVar('--text', '#1e293b'), cPrimary = cssVar('--primary', '#2563eb');

    // 网格
    ctx.strokeStyle = cGrid; ctx.lineWidth = 1; ctx.globalAlpha = 0.45;
    for (let g = 0; g <= Math.ceil(Lsum) + 1; g++) {
      const r = g * scale;
      ctx.beginPath(); ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy - r); ctx.lineTo(cx, cy + r); ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // 工作空间边界（圆环）
    const Lmax = Math.max(...state.a.slice(0, nJoints)), Lrest = Lsum - Lmax;
    ctx.setLineDash([5, 5]); ctx.strokeStyle = cAxis; ctx.globalAlpha = 0.5;
    ctx.beginPath(); ctx.arc(cx, cy, Lsum * scale, 0, 2 * Math.PI); ctx.stroke();
    if (Lrest > 0.01) { ctx.beginPath(); ctx.arc(cx, cy, Lrest * scale, 0, 2 * Math.PI); ctx.stroke(); }
    ctx.setLineDash([]); ctx.globalAlpha = 1;

    // 坐标轴与刻度
    ctx.strokeStyle = cAxis; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(20, cy); ctx.lineTo(W - 20, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, 14); ctx.lineTo(cx, H - 14); ctx.stroke();
    ctx.fillStyle = cAxis; ctx.font = '11px ui-monospace, Consolas, monospace';
    ctx.fillText('x', W - 30, cy - 6); ctx.fillText('y', cx + 6, 24);
    ctx.fillText('1', cx + scale + 2, cy + 13);

    // 末端轨迹
    if (trail.length > 1) {
      ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 1.6;
      for (let i = 1; i < trail.length; i++) {
        const p0 = toScr(trail[i - 1]), p1 = toScr(trail[i]);
        ctx.globalAlpha = 0.25 + 0.75 * i / trail.length;
        ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    // 关节角弧线（θ₁ 从 x 正方向起）
    const r0 = 0.42 * scale;
    ctx.strokeStyle = cPrimary; ctx.lineWidth = 1.4; ctx.globalAlpha = 0.7;
    const th1 = state.th[0] * Math.PI / 180;
    ctx.beginPath(); ctx.arc(cx, cy, r0, -th1, 0, th1 > 0);
    ctx.stroke(); ctx.globalAlpha = 1;
    ctx.fillStyle = cPrimary; ctx.font = '11px ui-monospace, Consolas, monospace';
    ctx.fillText('θ₁', cx + r0 * Math.cos(th1 / 2) - 6, cy - r0 * Math.sin(th1 / 2) - 4);

    // 连杆与关节
    const scr = pts.map(toScr);
    ctx.lineCap = 'round';
    for (let i = 0; i < scr.length - 1; i++) {
      ctx.strokeStyle = i === 0 ? cPrimary : cssVar('--warning', '#d97706');
      ctx.lineWidth = 9 - i * 1.5;
      ctx.globalAlpha = 0.85;
      ctx.beginPath(); ctx.moveTo(scr[i].x, scr[i].y); ctx.lineTo(scr[i + 1].x, scr[i + 1].y); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    // 基座三角形
    ctx.fillStyle = cText;
    ctx.beginPath(); ctx.moveTo(cx - 11, cy + 16); ctx.lineTo(cx + 11, cy + 16); ctx.lineTo(cx, cy + 3); ctx.closePath(); ctx.fill();
    // 关节圆点
    scr.slice(0, -1).forEach((p, i) => {
      if (i === 0) return;
      ctx.fillStyle = cssVar('--bg', '#fff'); ctx.strokeStyle = cText; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI); ctx.fill(); ctx.stroke();
    });
    // 末端点 + 姿态箭头
    const pe = scr[scr.length - 1];
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(pe.x, pe.y, 6, 0, 2 * Math.PI); ctx.fill();
    const ax = pe.x + 22 * Math.cos(-phi), ay = pe.y + 22 * Math.sin(-phi);
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(pe.x, pe.y); ctx.lineTo(ax, ay); ctx.stroke();
    ctx.beginPath(); ctx.arc(ax, ay, 2.5, 0, 2 * Math.PI); ctx.fill();
    ctx.fillStyle = '#ef4444'; ctx.font = '11px ui-monospace, Consolas, monospace';
    ctx.fillText('φ', ax + 4, ay - 4);

    // 信息行
    const deg = a => ((a * 180 / Math.PI + 540) % 360 - 180);
    $('fk-info').textContent = `末端 (${end.x.toFixed(3)}, ${end.y.toFixed(3)}) · φ=${deg(phi).toFixed(1)}° · 可达域 [${Lrest.toFixed(2)}, ${Lsum.toFixed(2)}] · 轨迹 ${trail.length} 点`;

    // DH 参数表
    let rows = '';
    for (let i = 0; i < nJoints; i++) {
      rows += `<tr><td class="font-medium">${i + 1}</td><td>0</td><td>${state.a[i].toFixed(2)}</td><td>0</td><td>${state.th[i]}°</td></tr>`;
    }
    $('fk-dh').innerHTML = `<table class="compare-table" style="font-size:0.8rem">
      <thead><tr><th>连杆 i</th><th>α<sub>i</sub>（扭角）</th><th>a<sub>i</sub>（长度）</th><th>d<sub>i</sub>（偏距）</th><th>θ<sub>i</sub>（关节角）</th></tr></thead>
      <tbody>${rows}</tbody></table>`;
  }

  function buildCtrls() {
    let html = '';
    for (let i = 0; i < nJoints; i++) {
      html += `<label style="font-size:0.78rem;color:var(--text-secondary)">θ<sub>${i + 1}</sub> 关节角 <span id="fk-thv-${i}" style="color:var(--primary);font-weight:600">${state.th[i]}°</span>
        <input type="range" id="fk-th-${i}" min="-180" max="180" step="1" value="${state.th[i]}" style="width:100%;accent-color:var(--primary)"></label>
        <label style="font-size:0.78rem;color:var(--text-secondary)">a<sub>${i + 1}</sub> 连杆长 <span id="fk-av-${i}" style="color:var(--primary);font-weight:600">${state.a[i].toFixed(2)}</span>
        <input type="range" id="fk-a-${i}" min="0.2" max="2" step="0.05" value="${state.a[i]}" style="width:100%;accent-color:var(--primary)"></label>`;
    }
    $('fk-ctrls').innerHTML = html;
    for (let i = 0; i < nJoints; i++) {
      $('fk-th-' + i).addEventListener('input', e => {
        state.th[i] = +e.target.value;
        $('fk-thv-' + i).textContent = state.th[i] + '°';
        const { end } = fk();
        const last = trail[trail.length - 1];
        if (!last || Math.hypot(end.x - last.x, end.y - last.y) > 0.004) {
          trail.push({ ...end });
          if (trail.length > 900) trail.shift();
        }
        render();
      });
      $('fk-a-' + i).addEventListener('input', e => {
        state.a[i] = +e.target.value;
        $('fk-av-' + i).textContent = state.a[i].toFixed(2);
        trail = [];
        render();
      });
    }
  }

  $('fk-nj').querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
    nJoints = +b.dataset.n;
    $('fk-nj').querySelectorAll('button').forEach(x => { x.style.background = 'var(--bg-primary)'; x.style.borderColor = 'var(--border)'; x.style.color = ''; });
    b.style.background = 'var(--primary)'; b.style.borderColor = 'var(--primary)'; b.style.color = '#fff';
    trail = [];
    buildCtrls();
    render();
  }));
  $('fk-clear').addEventListener('click', () => { trail = []; render(); });
  el.querySelector('#fk-nj button').click();
});
