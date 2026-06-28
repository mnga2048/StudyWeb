// 学习进度管理模块
// 存储格式：localStorage['studyweb_progress'] = { 知识点id: 'pending'|'learning'|'completed' }
const Progress = {
  STORAGE_KEY: 'studyweb_progress',

  get(key) {
    try {
      const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
      return data[key] || null;
    } catch { return null; }
  },

  set(key, status) {
    try {
      const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
      data[key] = status;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (e) { console.warn('localStorage 写入失败:', e); }
  },

  remove(key) {
    try {
      const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
      delete data[key];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch {}
  },

  getAll() {
    try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}'); } catch { return {}; }
  },

  // 统计全部知识点进度（AllKnowledgeIds 在 data.js 定义）
  getStats() {
    const data = this.getAll();
    const total = AllKnowledgeIds.length;
    let completed = 0, learning = 0;
    AllKnowledgeIds.forEach(id => {
      if (data[id] === 'completed') completed++;
      else if (data[id] === 'learning') learning++;
    });
    return { total, completed, learning, pending: total - completed - learning };
  },

  // 三态循环：未开始 → 学习中 → 已完成 → 未开始
  toggleStatus(key) {
    const current = this.get(key);
    if (!current || current === 'pending') { this.set(key, 'learning'); return 'learning'; }
    if (current === 'learning') { this.set(key, 'completed'); return 'completed'; }
    this.remove(key); return 'pending';
  },

  // 更新顶栏全局进度条
  updateGlobalBar() {
    const stats = this.getStats();
    const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
    const bar = document.getElementById('global-progress-bar');
    const text = document.getElementById('global-progress-text');
    if (bar) bar.style.width = pct + '%';
    if (text) text.textContent = pct + '%';
  },
};
