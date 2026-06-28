// 图表与交互组件模块
// 第 0 期为占位实现：只提供接口骨架，避免 app.js 调用时抛错。
// 后续各板块（自控伯德图、数电卡诺图、电路暂态波形等）在这里逐步填充 _charts 字典。

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
    // ECharts 实例由 app.js 的 cleanupPageResources 统一 dispose，这里不重复处理
  },

  // 注册新图表类型（供后续扩展调用）
  register(type, fn) { this._charts[type] = fn; },
};
