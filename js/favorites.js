// 收藏 / 浏览历史 模块
const Favorites = {
  STORAGE_KEY: 'studyweb_favorites',

  getAll() {
    try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]'); } catch { return []; }
  },

  // 切换收藏状态，返回切换后是否收藏
  toggle(id) {
    const list = this.getAll();
    const idx = list.indexOf(id);
    if (idx > -1) list.splice(idx, 1);
    else list.push(id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
    return idx > -1 ? false : true;
  },

  has(id) { return this.getAll().includes(id); },

  // 查找标题/图标：遍历 7 个板块分组
  getInfo(id) {
    const groups = ['advanced-math', 'linear-algebra', 'circuit-basics', 'analog-circuit', 'digital-circuit', 'control', 'data-structure'];
    for (const g of groups) {
      const section = CourseData[g]?.sections?.find(s => s.id === id);
      if (section) return { id, title: section.title, icon: section.icon, page: g };
    }
    // 可能是板块入口本身
    if (CourseData[id]) return { id, title: CourseData[id].title, icon: CourseData[id].icon, page: id };
    return { id, title: id, icon: '📄', page: 'home' };
  },
};

// 浏览历史（最近 8 条）
const History = {
  STORAGE_KEY: 'studyweb_history',
  MAX_ITEMS: 8,

  add(id) {
    let list = this.getAll().filter(h => h.id !== id);
    const info = Favorites.getInfo(id);
    list.unshift({ ...info, timestamp: Date.now() });
    if (list.length > this.MAX_ITEMS) list = list.slice(0, this.MAX_ITEMS);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
  },

  getAll() {
    try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]'); } catch { return []; }
  },
};
