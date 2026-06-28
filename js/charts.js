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

  const SECTION_GROUPS = ['advanced-math', 'linear-algebra', 'circuit-basics', 'analog-circuit', 'digital-circuit', 'control', 'data-structure'];
  const groupColors = {
    'advanced-math': '#dc2626', 'linear-algebra': '#d97706', 'circuit-basics': '#2563eb',
    'analog-circuit': '#059669', 'digital-circuit': '#eab308', 'control': '#7c3aed', 'data-structure': '#475569'
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

  const SECTION_GROUPS = ['advanced-math', 'linear-algebra', 'circuit-basics', 'analog-circuit', 'digital-circuit', 'control', 'data-structure'];

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

  const SECTION_GROUPS = ['advanced-math', 'linear-algebra', 'circuit-basics', 'analog-circuit', 'digital-circuit', 'control', 'data-structure'];
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

  const SECTION_GROUPS = ['advanced-math', 'linear-algebra', 'circuit-basics', 'analog-circuit', 'digital-circuit', 'control', 'data-structure'];
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
