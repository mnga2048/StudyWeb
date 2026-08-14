// 笔记模块
// 存储格式：localStorage['studyweb_notes'] = { 知识点id: '笔记文本' }
// 每个知识点详情页底部展示笔记 textarea，blur 时自动保存，支持轻量 Markdown 预览
const Notes = {
  STORAGE_KEY: 'studyweb_notes',

  get(id) {
    try {
      const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
      return data[id] || '';
    } catch { return ''; }
  },

  set(id, text) {
    try {
      const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
      if (text && text.trim()) data[id] = text;
      else delete data[id];   // 空文本自动清除
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (e) { console.warn('笔记写入失败:', e); }
  },

  remove(id) {
    try {
      const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
      delete data[id];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch {}
  },

  getAll() {
    try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}'); } catch { return {}; }
  },

  // 渲染笔记区块（返回 HTML 字符串，类似 Quiz.render）
  render(id) {
    const content = this.get(id);
    const count = content.length;
    return `
      <div class="notes-block info-box info" style="display:block;margin-top:1.5rem">
        <div class="notes-toolbar">
          <strong>📝 我的笔记</strong>
          <span class="text-xs" style="color:var(--text-secondary)">
            <span id="notes-count-${id}">${count}</span> 字
          </span>
          <button onclick="Notes.togglePreview('${id}')" class="notes-toggle" id="notes-toggle-${id}">👁 预览</button>
        </div>
        <textarea id="notes-area-${id}" class="notes-textarea" rows="5" placeholder="在这里记录你的笔记…支持 **加粗**、*斜体*、\`代码\`、- 列表（失焦自动保存）"
          onblur="Notes.save('${id}', this.value)"
          oninput="Notes.updateCount('${id}', this.value)">${this.escapeHtml(content)}</textarea>
        <div id="notes-preview-${id}" class="notes-preview" style="display:none"></div>
      </div>`;
  },

  // 轻量 Markdown 渲染：先转义 HTML（防 XSS），再依次替换标记
  renderMarkdown(text) {
    if (!text || !text.trim()) return '';
    let s = this.escapeHtml(text);
    // **bold** → <strong>
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    // *italic* → <em>（前后不能紧邻 *，避免与 bold 冲突）
    s = s.replace(/(^|[^*])\*([^*\n]+)\*([^*]|$)/g, '$1<em>$2</em>$3');
    // `code` → <code>
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    // 连续的 "- xxx" 行 → <ul><li>
    s = s.replace(/(^|\n)((?:- .+(?:\n|$))+)/g, (m, pre, block) => {
      const items = block.trim().split('\n').map(l => `<li>${l.replace(/^- /, '').trim()}</li>`).join('');
      return `${pre}<ul>${items}</ul>`;
    });
    // 空行分段：连续非块级行 → <p>
    s = s.split(/\n{2,}/).map(p => {
      const t = p.trim();
      if (!t) return '';
      if (/^<(ul|h\d|blockquote)/.test(t)) return t;   // 已是块级标签，不再包 <p>
      return `<p>${p.replace(/\n/g, '<br>')}</p>`;
    }).join('');
    return s;
  },

  // HTML 转义（防 XSS 与 </textarea> 注入）
  escapeHtml(s) {
    return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  },

  // —— 暴露给 onclick / onblur 的事件方法 ——
  save(id, text) { this.set(id, text); },

  updateCount(id, val) {
    const el = document.getElementById('notes-count-' + id);
    if (el) el.textContent = (val || '').length;
  },

  togglePreview(id) {
    const area = document.getElementById('notes-area-' + id);
    const prev = document.getElementById('notes-preview-' + id);
    const btn = document.getElementById('notes-toggle-' + id);
    if (!area || !prev) return;
    if (prev.style.display === 'none') {
      // 切到预览：先把当前内容存盘，再渲染
      this.save(id, area.value);
      this.updateCount(id, area.value);
      const html = this.renderMarkdown(area.value);
      prev.innerHTML = html || '<em style="color:var(--text-secondary)">（空笔记）</em>';
      prev.style.display = 'block';
      area.style.display = 'none';
      if (btn) btn.textContent = '✏ 编辑';
    } else {
      // 切回编辑
      prev.style.display = 'none';
      area.style.display = 'block';
      area.focus();   // 光标回到末尾便于继续写
      if (btn) btn.textContent = '👁 预览';
    }
  },
};
