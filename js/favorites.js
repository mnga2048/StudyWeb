// 收藏 / 浏览历史 模块
const Favorites = {
  STORAGE_KEY: 'studyweb_favorites',

  // 分类存储（并行映射，不影响现有 favorites 数组）
  CAT_KEY: 'studyweb_fav_categories',
  // 分类定义：key → 中文标签
  CATS: { review: '待复习', mastered: '已掌握', mistakes: '易错点' },

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

  // 查找标题/图标：遍历全部 18 个板块分组（v0.9.2 修复：原来只遍历 7 个，导致新增板块收藏显示原始 id）
  getInfo(id) {
    const groups = ['advanced-math', 'linear-algebra', 'probability',
      'circuit-basics', 'analog-circuit', 'digital-circuit', 'power-electronics',
      'motor-drive', 'control', 'modern-control',
      'embedded-sys', 'sensor', 'robotics',
      'data-structure', 'signals', 'cpp', 'os', 'network'];
    for (const g of groups) {
      const section = CourseData[g]?.sections?.find(s => s.id === id);
      if (section) return { id, title: section.title, icon: section.icon, page: g };
    }
    // 可能是板块入口本身
    if (CourseData[id]) return { id, title: CourseData[id].title, icon: CourseData[id].icon, page: id };
    return { id, title: id, icon: '📄', page: 'home' };
  },

  // —— 分类方法（v0.9.2 新增）——
  // 读取某条收藏的分类，无分类时返回 null（UI 侧默认按 'review' 处理）
  getCategory(id) {
    try { return JSON.parse(localStorage.getItem(this.CAT_KEY) || '{}')[id] || null; }
    catch { return null; }
  },

  // 设置/清除分类；cat 为 null 或空则删除
  setCategory(id, cat) {
    try {
      const data = JSON.parse(localStorage.getItem(this.CAT_KEY) || '{}');
      if (cat) data[id] = cat; else delete data[id];
      localStorage.setItem(this.CAT_KEY, JSON.stringify(data));
    } catch (e) { console.warn('分类写入失败:', e); }
  },

  // 返回某分类下的全部收藏 id（无分类的按 'review' 计）
  getByCategory(cat) {
    return this.getAll().filter(id => (this.getCategory(id) || 'review') === cat);
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
