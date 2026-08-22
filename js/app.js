// 专业课学习平台 - 主应用逻辑
(function () {
  'use strict';
  let currentPage = 'home';

  // 所有板块分组（用于路由分发与查找），与 nav.children.id 对应
  const SECTION_GROUPS = ['advanced-math', 'linear-algebra', 'probability',
    'circuit-basics', 'analog-circuit', 'digital-circuit', 'power-electronics',
    'motor-drive', 'control', 'modern-control',
    'embedded-sys', 'sensor', 'linux-dev', 'robotics',
    'digital-mfg',
    'data-structure', 'signals', 'cpp', 'os', 'network',
    'ai'];
  // 分组中文名映射（用于面包屑）
  const GROUP_LABELS = {
    'advanced-math': '高等数学', 'linear-algebra': '线性代数',
    'probability': '概率论与数理统计',
    'circuit-basics': '电路基础', 'analog-circuit': '模拟电路',
    'digital-circuit': '数字电路', 'power-electronics': '电力电子技术',
    'motor-drive': '电机与拖动',
    'control': '自动控制原理', 'modern-control': '现代控制理论',
    'embedded-sys': '嵌入式系统', 'sensor': '传感器与检测',
    'linux-dev': 'Linux 开发板实战',
    'robotics': '机器人学导论',
    'digital-mfg': '3D 打印与数字化制造',
    'data-structure': '数据结构', 'signals': '信号与系统',
    'cpp': 'C/C++ 程序设计', 'os': '操作系统', 'network': '计算机网络',
    'ai': '人工智能与边缘部署',
  };

  // ========== 主线学习链（第〇章总纲：pwr→motor→mct→sns→emb→robo→linux→print→ai） ==========
  const MAINLINE_GROUPS = ['power-electronics', 'motor-drive', 'modern-control',
    'sensor', 'embedded-sys', 'robotics', 'linux-dev', 'digital-mfg', 'ai'];
  const mainlineIds = (function () {
    const ids = [];
    MAINLINE_GROUPS.forEach(g => (CourseData[g]?.sections || []).forEach(s => ids.push(s.id)));
    return ids;
  })();
  const MAINLINE_SET = new Set(mainlineIds);

  // 板块内拓扑排序：只看组内依赖边，同层稳定按原始编号序（如 linux-10 整机联调依赖 12/13/14，排到 14 之后）
  function topoSortGroup(groupId) {
    const sections = CourseData[groupId]?.sections || [];
    const ids = sections.map(s => s.id);
    const idx = {}; ids.forEach((id, i) => idx[id] = i);
    const idSet = new Set(ids);
    const inDeg = {}, adj = {};
    ids.forEach(id => { inDeg[id] = 0; adj[id] = []; });
    ids.forEach(id => {
      (KnowledgeDeps[id] || []).forEach(d => {
        if (idSet.has(d) && d !== id && !adj[d].includes(id)) { adj[d].push(id); inDeg[id]++; }
      });
    });
    const ready = ids.filter(id => inDeg[id] === 0);
    const result = [];
    while (ready.length) {
      ready.sort((a, b) => idx[a] - idx[b]);
      const cur = ready.shift();
      result.push(cur);
      adj[cur].forEach(n => { if (--inDeg[n] === 0) ready.push(n); });
    }
    ids.forEach(id => { if (!result.includes(id)) result.push(id); });  // 环兜底
    return result.map(id => sections[idx[id]]);
  }

  // 主线下一节推荐：主线链顺序中第一个未完成、且主线前置（跨板块前置也计入）全部完成的节
  function getMainlineNext() {
    for (const gid of MAINLINE_GROUPS) {
      for (const s of topoSortGroup(gid)) {
        if (Progress.get(s.id) === 'completed') continue;
        const unmet = (KnowledgeDeps[s.id] || []).filter(d => MAINLINE_SET.has(d) && Progress.get(d) !== 'completed');
        if (unmet.length === 0) return { section: s, groupId: gid };
      }
    }
    return null;
  }

  // ========== 侧边栏渲染 ==========
  // 容错解析 sessionStorage
  let collapsedGroups = {};
  try { collapsedGroups = JSON.parse(sessionStorage.getItem('sw_collapsed') || '{}'); } catch { collapsedGroups = {}; }

  function renderSidebar() {
    const nav = document.getElementById('sidebar-nav');
    if (!nav) return;
    let html = '';
    CourseData.nav.forEach(item => {
      if (item.children) {
        // 一级：大类（数学/电子电路）—— 折叠分组
        const isCollapsed = !!collapsedGroups[item.id];
        html += `<div class="nav-section-title nav-group-toggle" onclick="toggleNavGroup('${item.id}')">
          <span class="flex items-center gap-1">${CourseData.icons[item.icon] || ''} ${item.label}</span>
          <svg class="w-3.5 h-3.5 transition-transform ${isCollapsed ? '' : 'rotate-90'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </div>`;
        html += `<div class="nav-children ${isCollapsed ? 'hidden' : ''}">`;
        item.children.forEach(child => {
          // 二级：板块项 —— 可折叠，展开后显示三级章节
          html += renderSectionNavItem(child);
        });
        html += `</div>`;
      } else {
        // 首页特殊处理：直接导航
        if (item.id === 'home') {
          html += `<a class="nav-item" data-page="home" onclick="navigateTo('home')">
            <span class="nav-icon">${CourseData.icons[item.icon] || ''}</span><span>${item.label}</span></a>`;
        } else {
          // 一级且无子项：自动控制/数据结构/工具箱/学习路径
          const isSection = CourseData[item.id] && CourseData[item.id].sections;
          if (isSection) {
            html += renderSectionNavItem({ id: item.id, label: item.label, icon: item.icon, badge: item.badge, badgeClass: item.badgeClass });
          } else {
            html += `<a class="nav-item" data-page="${item.id}" onclick="navigateTo('${item.id}')">
              <span class="nav-icon">${CourseData.icons[item.icon] || ''}</span><span>${item.label}</span>
              ${item.badge ? `<span class="nav-badge ${item.badgeClass}">${item.badge}</span>` : ''}</a>`;
          }
        }
      }
    });

    // 收藏分区（按 3 分类分组：待复习/已掌握/易错点）
    const favs = Favorites.getAll();
    if (favs.length > 0) {
      const catIcons = { review: '🔁', mastered: '✅', mistakes: '⚠️' };
      for (const [k, label] of Object.entries(Favorites.CATS)) {
        const items = Favorites.getByCategory(k);
        if (items.length === 0) continue;
        html += `<div class="sidebar-section-title">${catIcons[k]} ${label} <span class="text-xs" style="opacity:0.6">${items.length}</span></div>`;
        items.forEach(id => {
          const info = Favorites.getInfo(id);
          html += `<a class="nav-item" data-page="${id}" onclick="navigateTo('${id}')">
            <span class="nav-icon">${info.icon || '📄'}</span><span>${info.title}</span></a>`;
        });
      }
    }

    // 最近浏览分区
    const history = History.getAll();
    if (history.length > 0) {
      html += `<div class="sidebar-section-title">⏱ 最近浏览</div>`;
      history.forEach(h => {
        html += `<a class="nav-item" data-page="${h.id}" onclick="navigateTo('${h.id}')">
          <span class="nav-icon">${h.icon || '📄'}</span><span style="font-size:0.8rem">${h.title}</span></a>`;
      });
    }
    nav.innerHTML = html;
  }

  // 渲染二级板块项（可折叠，展开后列出三级章节）
  function renderSectionNavItem(section) {
    const data = CourseData[section.id];
    const hasSections = data && data.sections && data.sections.length > 0;
    const isOpen = !collapsedGroups['sec_' + section.id];   // 默认展开
    const iconHtml = CourseData.icons[section.icon] || '';
    const badge = section.badge ? `<span class="nav-badge ${section.badgeClass}">${section.badge}</span>` : '';

    let html = `<div class="nav-section ${isOpen ? 'open' : ''}">
      <span class="nav-section-label" onclick="navigateTo('${section.id}');event.stopPropagation();">${iconHtml} ${section.label} ${badge}</span>
      ${hasSections ? `<span class="flex items-center gap-1" onclick="toggleSectionGroup('${section.id}', this.parentElement);event.stopPropagation();">
        <span class="nav-section-count">${data.sections.length}节</span>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </span>` : ''}
    </div>`;

    if (hasSections) {
      html += `<div class="nav-chapters ${isOpen ? '' : 'hidden'}" data-section="${section.id}">`;
      data.sections.forEach(s => {
        html += `<a class="nav-chapter" data-page="${s.id}" onclick="navigateTo('${s.id}');event.stopPropagation();">
          <span class="nav-chapter-icon">${s.icon || '📄'}</span>
          <span class="nav-chapter-title">${s.title}</span>
        </a>`;
      });
      html += `</div>`;
    }
    return html;
  }

  // 折叠/展开某个板块的章节列表
  window.toggleSectionGroup = function (sectionId, el) {
    const key = 'sec_' + sectionId;
    collapsedGroups[key] = !collapsedGroups[key];
    sessionStorage.setItem('sw_collapsed', JSON.stringify(collapsedGroups));
    const chapters = el.nextElementSibling;
    if (chapters) chapters.classList.toggle('hidden');
    el.classList.toggle('open');
  };

  window.toggleNavGroup = function (groupId) {
    collapsedGroups[groupId] = !collapsedGroups[groupId];
    sessionStorage.setItem('sw_collapsed', JSON.stringify(collapsedGroups));
    renderSidebar();
  };

  function updateActiveNav(pageId) {
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.page === pageId);
    });
  }

  // ========== 页面渲染 ==========
  function cleanupPageResources() {
    const container = document.getElementById('page-container');
    if (!container) return;
    if (typeof echarts !== 'undefined') {
      container.querySelectorAll('*').forEach(el => {
        if (el.getAttribute && el.getAttribute('_echarts_instance_')) {
          const inst = echarts.getInstanceByDom(el);
          if (inst) inst.dispose();
        }
      });
    }
    if (typeof Charts !== 'undefined' && Charts.stopAll) Charts.stopAll();
  }

  function renderPage(pageId) {
    const container = document.getElementById('page-container');
    if (!container) return;
    cleanupPageResources();
    // 导航离开错题刷题模式的节时自动退出（回来默认恢复常规测验视图）
    if (typeof Quiz !== 'undefined' && Quiz.wrongMode && pageId !== Quiz.wrongMode) {
      Quiz.wrongMode = null;
      Quiz._wrongSession = null;
    }

    if (currentPage) sessionStorage.setItem('sw_scroll_' + currentPage, window.scrollY);
    History.add(pageId);
    currentPage = pageId;

    container.style.opacity = '0';
    container.style.transform = 'translateY(6px)';

    setTimeout(() => {
      let html = '';
      switch (pageId) {
        case 'home': html = renderHomePage(); break;
        case 'tools': html = renderToolsPage(); break;
        case 'roadmap': html = renderRoadmapPage(); break;
        default:
          // 板块分组页
          if (SECTION_GROUPS.includes(pageId) || CourseData[pageId]) {
            html = renderSectionPage(CourseData[pageId], pageId);
          } else {
            // 知识点详情页
            const section = findSection(pageId);
            if (section) html = renderDetailPage(section);
            else html = renderHomePage();
          }
      }
      container.innerHTML = html;
      // 复制按钮注入（须在下方 renderMathInElement 之前，公式 LaTeX 源尚未被 KaTeX 替换）
      enhanceContentBlocks(container);

      requestAnimationFrame(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      });

      updateActiveNav(pageId);
      Progress.updateGlobalBar();
      renderSidebar();

      // KaTeX 公式渲染
      if (typeof renderMathInElement === 'function') {
        renderMathInElement(container, {
          delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
          throwOnError: false,
        });
      }

      // 恢复滚动位置
      const savedY = sessionStorage.getItem('sw_scroll_' + pageId);
      if (savedY && !isNaN(parseInt(savedY))) {
        requestAnimationFrame(() => window.scrollTo(0, parseInt(savedY)));
      } else {
        window.scrollTo(0, 0);
      }

      // TOC 高亮初始化 + 键盘答题后的闪烁提示（错题模式与常规模式卡片 id 同构）
      requestAnimationFrame(() => {
        updateTocSpy();
        if (typeof window._quizJustAnswered === 'number') {
          const card = document.getElementById(`quiz-card-${pageId}-${window._quizJustAnswered}`);
          window._quizJustAnswered = null;
          if (card) { card.classList.add('just-answered'); setTimeout(() => card.classList.remove('just-answered'), 1800); }
        }
      });

      // 搜索高亮
      if (window._lastSearchKeyword) Search.highlightContent(window._lastSearchKeyword);

      // 图表/计算器初始化
      requestAnimationFrame(() => {
        Charts.renderAll('page-container');
        if (pageId === 'tools') {
          Calculator.render('calculators-container');
          const progressEl = document.getElementById('progress-chart');
          if (progressEl) Charts.renderProgressChart('progress-chart');
        }
        if (pageId === 'home') animateCounters();
      });
    }, 150);
  }

  // 在所有板块分组里查找知识点
  function findSection(id) {
    for (const groupId of SECTION_GROUPS) {
      const found = CourseData[groupId]?.sections?.find(s => s.id === id);
      if (found) return { ...found, parent: groupId, parentTitle: GROUP_LABELS[groupId] };
    }
    return null;
  }

  // ========== 首页 ==========
  function renderHomePage() {
    const d = CourseData.home;
    return `<div>
      <div class="page-hero"><h1>${d.title}</h1><p>${d.subtitle}</p></div>

      <!-- 网站介绍 -->
      <div class="home-intro">
        <p style="font-size:1.05rem;line-height:1.85;color:var(--text);max-width:50rem;margin-bottom:1.5rem">${d.intro}</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          ${d.features.map(f => `<div class="home-feature-card">
            <div class="feature-icon">${f.icon}</div>
            <div class="feature-label">${f.label}</div>
            <div class="feature-desc">${f.desc}</div>
          </div>`).join('')}
        </div>
      </div>

      <!-- 统计 -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        ${d.stats.map(s => `<div class="text-center p-4 rounded-xl border" style="background:var(--bg-card);border-color:var(--border)">
          <div class="text-2xl font-bold stat-number" data-target="${s.value}" style="color:var(--primary)">0</div>
          <div class="text-sm mt-1" style="color:var(--text-secondary)">${s.label}</div>
        </div>`).join('')}
      </div>

      <!-- 板块入口 -->
      <h2 class="text-xl font-semibold mb-4">课程板块</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        ${d.sections.map(s => {
          const group = SECTION_GROUPS.find(g => CourseData[g] && CourseData[g].title === s.title);
          const groupId = group || s.id;
          const count = CourseData[groupId]?.sections?.length || 0;
          const levelClass = s.level === '应试' ? 'badge-exam' : s.level === '工程' ? 'badge-eng' : 'badge-tool';
          return `<div class="section-entry" onclick="navigateTo('${groupId}')">
            <span class="entry-icon">${s.icon}</span>
            <div class="entry-title">${s.title}</div>
            <div class="entry-desc">${s.desc}</div>
            <div class="entry-meta">
              <span class="nav-badge ${levelClass}">${s.level}</span>
              ${count > 0 ? `<span>· ${count} 节</span>` : '<span>· 规划中</span>'}
            </div>
          </div>`;
        }).join('')}
      </div>

      <!-- 知识图谱 -->
      <h2 class="text-xl font-semibold mb-4">知识图谱</h2>
      <div class="knowledge-card mb-8">
        <p class="text-sm mb-3" style="color:var(--text-secondary)">21 板块 × 229 个知识点的依赖关系全景。节点颜色表示学习状态：<span style="color:#059669">绿色=已完成</span> · <span style="color:#d97706">橙色=学习中</span> · <span style="color:#cbd5e1">灰色=未开始</span>。点击节点跳转。</p>
        <div class="chart-container chart-container-lg" data-chart="knowledge-graph"></div>
      </div>
    </div>`;
  }

  // 数字计数动画
  function animateCounters() {
    document.querySelectorAll('.stat-number[data-target]').forEach(el => {
      const raw = el.dataset.target;
      const num = parseInt(raw);
      if (isNaN(num)) { el.textContent = raw; return; }
      const suffix = raw.replace(/\d+/g, '');
      let current = 0;
      const step = Math.max(1, Math.ceil(num / 40));
      const timer = setInterval(() => {
        current += step;
        if (current >= num) { current = num; clearInterval(timer); }
        el.textContent = current + suffix;
      }, 30);
    });
  }

  // ========== 板块分组列表页 ==========
  function renderSectionPage(sectionData, groupId) {
    if (!sectionData) return renderPlaceholder('内容加载中', '⏳');
    const hasContent = sectionData.sections.some(s => s.content && s.content.trim());
    return `<div>
      <div class="page-hero">
        <div class="flex items-center gap-2 text-sm mb-2" style="color:var(--text-secondary)">
          <a href="#" onclick="navigateTo('home');return false;" style="color:var(--primary)">首页</a><span>/</span><span>${sectionData.title}</span>
        </div>
        <h1><span style="font-size:1.5rem">${sectionData.icon || ''}</span> ${sectionData.title}</h1><p>${sectionData.subtitle}</p>
      </div>
      ${!hasContent ? renderPlaceholder('该板块内容正在建设中', '🚧', `按计划将逐步填充 ${sectionData.sections.length} 个知识点，敬请期待。可先从已完成的板块开始学习。`) : ''}
      <div class="space-y-1">
        ${sectionData.sections.map(s => renderKnowledgeCard(s, groupId)).join('')}
      </div>
    </div>`;
  }

  // 单张知识卡片（列表页与详情页复用）
  function renderKnowledgeCard(s, groupId) {
    const status = Progress.get(s.id);
    const statusClass = status === 'completed' ? 'completed' : status === 'learning' ? 'learning' : '';
    const statusBtnClass = status === 'completed' ? 'status-completed' : status === 'learning' ? 'status-learning' : '';
    const statusText = status === 'completed' ? '已完成' : status === 'learning' ? '学习中' : '标记学习';
    const statusIcon = status === 'completed' ? '✓' : status === 'learning' ? '◐' : '○';
    const isFav = Favorites.has(s.id);
    const hasQuiz = QuizData[s.id]?.length > 0;
    const hasContent = s.content && s.content.trim();
    return `<div class="knowledge-card ${statusClass}">
      <div class="flex items-start justify-between gap-3">
        <div class="flex-1 min-w-0">
          <h3><span>${s.icon}</span>
            <a href="#" onclick="navigateTo('${s.id}');return false;" style="color:var(--primary)">${s.title}</a>
            ${hasQuiz ? '<span class="text-xs px-1.5 py-0.5 rounded ml-1" style="background:rgba(37,99,235,0.1);color:var(--primary)">测验</span>' : ''}
          </h3>
          <p class="card-desc">${s.desc}</p>
          ${s.tags?.length ? `<div class="card-tags">${s.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}
            ${s.goals?.exam ? '<span class="card-tag tag-exam">应试</span>' : ''}
            ${s.goals?.eng ? '<span class="card-tag tag-eng">工程</span>' : ''}
          </div>` : ''}
        </div>
        <div class="flex items-center gap-1">
          <button class="star-btn ${isFav ? 'starred' : ''}" onclick="toggleFav('${s.id}')">${isFav ? '★' : '☆'}</button>
          <button class="status-btn ${statusBtnClass}" onclick="toggleProgress('${s.id}',this)">
            <span>${statusIcon}</span><span class="hidden sm:inline">${statusText}</span>
          </button>
        </div>
      </div>
    </div>`;
  }

  // ========== 知识点详情页 ==========
  // 阅读时长估算：技术正文（公式/代码/表格混合）按 400 字/分钟
  const READ_CPM = 400;

  function renderDetailPage(section) {
    const isFav = Favorites.has(section.id);
    const quiz = QuizData[section.id];
    const hasContent = section.content && section.content.trim();

    // 解析正文：给 h3/h4 编锚点 id（供 TOC 跳转），顺便统计字数
    let contentHtml = section.content || '';
    const tocEntries = [];
    let headingCount = 0, readMinutes = 0, charCount = 0;
    if (hasContent) {
      const tmp = document.createElement('div');
      tmp.innerHTML = section.content;
      charCount = (tmp.textContent || '').replace(/\s+/g, '').length;
      readMinutes = Math.max(1, Math.ceil(charCount / READ_CPM));
      tmp.querySelectorAll('h3, h4').forEach((h, i) => {
        const text = h.textContent.trim();
        if (!text) return;
        h.id = 'toc-' + i;
        headingCount++;
        tocEntries.push({ id: h.id, text, level: h.tagName === 'H3' ? 1 : 2 });
      });
      contentHtml = tmp.innerHTML;
    }
    if (quiz) tocEntries.push({ id: 'toc-quiz-block', text: '自测练习', level: 1 });
    tocEntries.push({ id: 'toc-notes-block', text: '我的笔记', level: 1 });
    const hasToc = tocEntries.length >= 3;

    // 上一篇/下一篇（板块内顺序）
    const siblings = CourseData[section.parent]?.sections || [];
    const sIdx = siblings.findIndex(s => s.id === section.id);
    const prev = siblings[sIdx - 1];
    const next = siblings[sIdx + 1];

    const tocHtml = hasToc ? tocEntries.map(t =>
      `<a class="toc-link level-${t.level}" data-target="${t.id}" onclick="scrollToToc('${t.id}')">${t.text}</a>`).join('') : '';
    const metaHtml = hasContent ? `<div class="detail-meta">
        <span>⏱ 约 ${readMinutes} 分钟</span><span class="dm-dot">·</span><span>${charCount.toLocaleString()} 字</span>${headingCount > 0 ? `<span class="dm-dot">·</span><span>${headingCount} 个小节</span>` : ''}
      </div>` : '';

    return `<div class="detail-layout">
      <div class="detail-main">
        <div class="page-hero">
          <div class="flex items-center gap-2 text-sm mb-2" style="color:var(--text-secondary)">
            <a href="#" onclick="navigateTo('${section.parent}');return false;" style="color:var(--primary)">${section.parentTitle}</a><span>/</span><span>${section.title}</span>
          </div>
          <h1><span style="font-size:1.5rem">${section.icon || ''}</span> ${section.title}</h1><p>${section.desc}</p>
          ${metaHtml}
        </div>
        ${hasToc ? `<details class="detail-toc-inline"><summary>📑 本页目录（${headingCount} 个小节）</summary>${tocHtml}</details>` : ''}
        ${hasContent ? `<div class="prose max-w-none">${contentHtml}</div>` : renderPlaceholder('本节内容建设中', '📝', '该知识点的详细讲解正在编写，可先收藏，或前往已完成的板块学习。')}
        ${quiz ? `<div id="toc-quiz-block">${Quiz.render(section.id, quiz)}</div>` : ''}
        <div id="toc-notes-block">${Notes.render(section.id)}</div>
        <div class="mt-8 pt-6 border-t flex items-center justify-between flex-wrap gap-2" style="border-color:var(--border)">
          <div class="flex items-center gap-2 text-sm" style="color:var(--text-secondary)">
            <span>学习状态：</span>
            ${['pending', 'learning', 'completed'].map(s => {
              const cur = Progress.get(section.id);
              const label = { pending: '未开始', learning: '学习中', completed: '已完成' }[s];
              const cls = cur === s ? (s === 'completed' ? 'status-completed' : s === 'learning' ? 'status-learning' : '') : '';
              return `<button class="status-btn ${cls}" onclick="setProgress('${section.id}','${s}',this)">${label}</button>`;
            }).join('')}
            <span class="mx-1">|</span>
            <button class="star-btn ${isFav ? 'starred' : ''}" onclick="toggleFav('${section.id}')">${isFav ? '★ 已收藏' : '☆ 收藏'}</button>
            ${isFav ? `<span class="mx-1">|</span><span class="text-xs">分类：</span>${Object.entries(Favorites.CATS).map(([k, label]) => {
              const cur = Favorites.getCategory(section.id) || 'review';
              const active = cur === k;
              return `<button class="fav-cat-btn ${active ? 'fav-cat-active' : ''}" onclick="setFavCategory('${section.id}','${k}')">${label}</button>`;
            }).join('')}` : ''}
          </div>
          <button class="text-sm hover:underline" style="color:var(--primary)" onclick="navigateTo('${section.parent}')">← 返回${section.parentTitle}</button>
        </div>
        <div class="prev-next-nav">
          ${prev ? `<a class="pn-card" onclick="navigateTo('${prev.id}')"><span class="pn-label">← 上一篇</span><span class="pn-title">${prev.icon || '📄'} ${prev.title}</span></a>` : '<span class="pn-card pn-empty"></span>'}
          ${next ? `<a class="pn-card pn-next" onclick="navigateTo('${next.id}')"><span class="pn-label">下一篇 →</span><span class="pn-title">${next.icon || '📄'} ${next.title}</span></a>` : '<span class="pn-card pn-empty"></span>'}
        </div>
      </div>
      ${hasToc ? `<aside class="detail-toc"><div class="toc-box"><div class="toc-title">📑 本页目录</div>${tocHtml}</div></aside>` : ''}
    </div>`;
  }

  // ========== 代码块/公式块复制按钮 ==========
  // 必须在 KaTeX 渲染前注入：公式块要在源码被替换成 KaTeX DOM 前抓取 LaTeX 文本
  function enhanceContentBlocks(container) {
    container.querySelectorAll('.code-block, .formula-block').forEach(block => {
      if (block.querySelector('.copy-btn')) return;
      let payload;
      if (block.classList.contains('formula-block')) {
        const clone = block.cloneNode(true);
        clone.querySelectorAll('.formula-text').forEach(n => n.remove());
        payload = (clone.textContent || '').trim();   // 含 $$ 定界符的 LaTeX 源
      } else {
        payload = (block.textContent || '').trim();   // 高亮 span 的 textContent 即纯代码
      }
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.type = 'button';
      btn.textContent = '复制';
      btn.title = '复制到剪贴板';
      btn.dataset.payload = payload;   // 挂到 DOM 便于调试与测试
      btn.addEventListener('click', () => copyText(payload, btn));
      block.appendChild(btn);
    });
  }

  function copyText(text, btn) {
    const done = ok => {
      btn.textContent = ok ? '✓ 已复制' : '✗ 失败';
      btn.classList.toggle('copied', !!ok);
      setTimeout(() => { btn.textContent = '复制'; btn.classList.remove('copied'); }, 1600);
    };
    const fallback = () => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch { ok = false; }
      ta.remove();
      return ok;
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => done(true), () => done(fallback()));
    } else {
      done(fallback());
    }
  }

  // ========== TOC 滚动高亮（scroll-spy） ==========
  function updateTocSpy() {
    const links = document.querySelectorAll('.toc-link[data-target]');
    if (!links.length) return;
    const seen = new Set();
    const ids = [];
    links.forEach(l => { if (!seen.has(l.dataset.target)) { seen.add(l.dataset.target); ids.push(l.dataset.target); } });
    let active = null;
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 110) active = id;
    }
    if (!active && ids.length) active = ids[0];   // 页面顶部时高亮第一项
    links.forEach(l => l.classList.toggle('active', l.dataset.target === active));
  }
  window.updateTocSpy = updateTocSpy;

  window.scrollToToc = function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 84, behavior: 'smooth' });
  };

  // ========== 工具箱页 ==========
  function renderToolsPage() {
    return `<div>
      <div class="page-hero"><h1>工具箱</h1><p>公式计算器、矩阵运算、数制转换等实用学习工具</p></div>
      <div class="tab-nav">
        <button class="tab-btn active" onclick="switchTab('tab-calculators',this)">公式计算器</button>
        <button class="tab-btn" onclick="switchTab('tab-progress',this)">学习进度</button>
      </div>
      <div id="tab-calculators" class="tab-panel active"><div id="calculators-container"></div></div>
      <div id="tab-progress" class="tab-panel">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="knowledge-card"><h3>进度概览</h3><div id="progress-chart" class="chart-container"></div></div>
          <div class="knowledge-card"><h3>详细进度</h3><div class="space-y-2 mt-3" id="progress-detail">${renderProgressDetail()}</div>
            <div class="mt-4 pt-3 border-t" style="border-color:var(--border)">
              <button class="text-sm hover:underline" style="color:var(--danger)" onclick="if(confirm('确定重置所有进度？此操作不可恢复。')){localStorage.removeItem('studyweb_progress');navigateTo('tools');}">重置所有进度</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  function renderProgressDetail() {
    return SECTION_GROUPS.map(groupId => {
      const group = CourseData[groupId];
      if (!group?.sections) return '';
      const items = group.sections.map(s => {
        const st = Progress.get(s.id);
        const dot = st === 'completed' ? 'var(--success)' : st === 'learning' ? 'var(--warning)' : 'var(--border)';
        const label = st === 'completed' ? '已完成' : st === 'learning' ? '学习中' : '未开始';
        return `<div class="flex items-center gap-3 py-1">
          <span class="w-2 h-2 rounded-full flex-shrink-0" style="background:${dot}"></span>
          <span class="text-sm flex-1">${s.icon} ${s.title}</span>
          <button class="text-xs hover:underline" style="color:var(--primary)" onclick="toggleProgress('${s.id}',null)">${label}</button>
        </div>`;
      }).join('');
      return `<div class="mb-3"><div class="text-xs font-semibold mb-1" style="color:var(--text-secondary)">${group.icon} ${group.title}</div>${items}</div>`;
    }).join('');
  }

  // ========== 学习路径页 ==========
  function renderRoadmapPage() {
    const stats = Progress.getStats();
    const completionRate = Math.round(stats.completed / stats.total * 100);

    // 计算学习路径推荐
    function getRecommendedPath() {
      const learning = [];
      const unlocked = [];
      const locked = [];

      AllKnowledgeIds.forEach(id => {
        const status = Progress.get(id) || 'pending';
        const section = findSection(id);
        if (!section) return;

        const deps = KnowledgeDeps[id] || [];
        const depsCompleted = deps.filter(d => Progress.get(d) === 'completed').length;
        const allDepsMet = deps.length === 0 || depsCompleted === deps.length;

        const item = { id, title: section.title, icon: section.icon, deps, depsCompleted, allDepsMet };

        if (status === 'learning') {
          learning.push(item);
        } else if (status === 'pending' && allDepsMet) {
          unlocked.push(item);
        } else if (status === 'pending') {
          locked.push(item);
        }
      });

      return { learning, unlocked, locked };
    }

    function findSection(id) {
      for (const gId of SECTION_GROUPS) {
        const g = CourseData[gId];
        if (!g?.sections) continue;
        const s = g.sections.find(s => s.id === id);
        if (s) return s;
      }
      return null;
    }

    // 计算薄弱环节
    function getWeakSections() {
      const weak = [];
      AllKnowledgeIds.forEach(id => {
        const accuracy = Quiz.getAccuracy(id);
        if (accuracy !== null && accuracy < 0.6) {
          const section = findSection(id);
          if (section) weak.push({ id, title: section.title, accuracy: Math.round(accuracy * 100) });
        }
      });
      return weak.sort((a, b) => a.accuracy - b.accuracy);
    }

    const { learning, unlocked } = getRecommendedPath();
    const weakSections = getWeakSections();
    const wrongStats = WrongBook.getStats();

    return `<div>
      <div class="page-hero">
        <h1>学习路径</h1>
        <p>主线学习 · 知识图谱 · 学习推荐 · 错题本 · 掌握度分析 · 学习统计</p>
      </div>

      <div class="roadmap-tabs">
        <button class="roadmap-tab active" onclick="switchRoadmapTab('mainline', this)">🧭 主线学习</button>
        <button class="roadmap-tab" onclick="switchRoadmapTab('graph', this)">📊 知识图谱</button>
        <button class="roadmap-tab" onclick="switchRoadmapTab('path', this)">🎯 学习推荐</button>
        <button class="roadmap-tab" onclick="switchRoadmapTab('wrongbook', this)">📕 错题本${wrongStats.questions > 0 ? ` (${wrongStats.questions})` : ''}</button>
        <button class="roadmap-tab" onclick="switchRoadmapTab('heatmap', this)">🌡 掌握度</button>
        <button class="roadmap-tab" onclick="switchRoadmapTab('stats', this)">📈 学习统计</button>
      </div>

      <!-- Tab 0: 主线学习 -->
      <div id="tab-mainline" class="roadmap-panel active">${renderMainlineTab()}</div>

      <!-- Tab 1: 知识图谱 -->
      <div id="tab-graph" class="roadmap-panel">
        <div class="knowledge-card mb-4">
          <p class="card-desc">${SECTION_GROUPS.length} 大板块 × ${AllKnowledgeIds.length} 个知识点的依赖关系图。节点颜色表示学习状态：<span style="color:#059669">绿色=已完成</span>、<span style="color:#d97706">橙色=学习中</span>、<span style="color:#cbd5e1">灰色=未开始</span>。点击节点跳转到对应知识点。</p>
        </div>
        <div class="chart-container chart-container-lg" data-chart="knowledge-graph"></div>
      </div>

      <!-- Tab 2: 学习路径推荐 -->
      <div id="tab-path" class="roadmap-panel">
        ${learning.length > 0 ? `
        <div class="knowledge-card mb-4">
          <h3>📖 继续学习（当前进度）</h3>
          <p class="card-desc mb-3">这些章节你已经开始学习，建议优先完成：</p>
          ${learning.map(item => `
            <div class="path-card" onclick="navigateTo('${item.id}')">
              <div class="path-icon">${item.icon}</div>
              <div class="flex-1">
                <div class="path-title">${item.title}</div>
                <div class="path-desc">前置知识已就绪</div>
              </div>
              <span class="path-badge path-badge-unlocked">继续</span>
            </div>
          `).join('')}
        </div>` : ''}

        <div class="knowledge-card mb-4">
          <h3>🔓 推荐下一步</h3>
          <p class="card-desc mb-3">前置知识已全部完成，可以开始学习：</p>
          ${unlocked.length > 0 ? unlocked.slice(0, 10).map(item => `
            <div class="path-card" onclick="navigateTo('${item.id}')">
              <div class="path-icon">${item.icon}</div>
              <div class="flex-1">
                <div class="path-title">${item.title}</div>
                <div class="path-desc">前置 ${item.depsCompleted}/${item.deps.length} 已完成</div>
              </div>
              <span class="path-badge path-badge-unlocked">可学</span>
            </div>
          `).join('') : '<p class="text-gray-500 text-sm">暂无可推荐的新章节</p>'}
        </div>

        <div class="knowledge-card">
          <h3>💡 学习建议</h3>
          <div class="step-list">
            <div class="step-item"><div><strong>第一阶段 · 数学筑基</strong>：高等数学（微积分为核心）→ 线性代数（矩阵、特征值是后续电路/自控的工具）→ 概率论与数理统计（随机变量、参数估计，卡尔曼滤波与机器学习的基础）</div></div>
            <div class="step-item"><div><strong>第二阶段 · 电路入门</strong>：电路基础（KCL/KVL、暂态）→ 模拟电路（需电路基础+微积分）→ 数字电路（相对独立，可并行）→ 电力电子技术（DC-DC、逆变、H 桥，电机驱动基础）</div></div>
            <div class="step-item"><div><strong>第三阶段 · 控制理论</strong>：自动控制原理（需拉氏变换、复数、电路基础，工程应用为主）→ 现代控制理论（状态空间、能控能观、LQR、卡尔曼滤波，机器人控制核心）</div></div>
            <div class="step-item"><div><strong>第四阶段 · 信号与嵌入式</strong>：信号与系统（傅里叶/拉氏/Z 变换、采样定理）→ 嵌入式系统（ARM、GPIO、PWM、RTOS）→ 传感器与检测（编码器、IMU、信号调理）</div></div>
            <div class="step-item"><div><strong>第五阶段 · 电机与机器人</strong>：电机与拖动（直流/PMSM/步进/伺服）→ 机器人学导论（DH 参数、运动学、雅可比、动力学、力控制）</div></div>
            <div class="step-item"><div><strong>第六阶段 · 计算机基础</strong>：数据结构（统考与工程面试核心）→ C/C++ 程序设计（嵌入式主力语言）→ 操作系统（RTOS/进程调度）→ 计算机网络（TCP/IP、工业网络、ROS 通信）</div></div>
          </div>
        </div>
      </div>

      <!-- Tab 3: 掌握度热力图 -->
      <div id="tab-heatmap" class="roadmap-panel">
        <div class="knowledge-card mb-4">
          <p class="card-desc">每个格子代表一个知识点，颜色越深掌握度越高。掌握度 = 学习状态(60%) + 自测正确率(40%)。点击格子跳转到对应知识点。</p>
        </div>
        <div class="chart-container chart-container-lg" data-chart="mastery-heatmap"></div>
      </div>

      <!-- Tab 4: 学习统计 -->
      <div id="tab-stats" class="roadmap-panel">
        <div class="stat-card-grid mb-4">
          <div class="stat-card">
            <div class="stat-value">${stats.completed}</div>
            <div class="stat-label">已完成章节</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${stats.learning}</div>
            <div class="stat-label">学习中</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${completionRate}%</div>
            <div class="stat-label">完成率</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${stats.total}</div>
            <div class="stat-label">总知识点</div>
          </div>
        </div>

        <div class="knowledge-card mb-4">
          <h3>📊 整体进度</h3>
          <div class="chart-container" data-chart="progress-ring" style="height:300px"></div>
        </div>

        <div class="knowledge-card mb-4">
          <h3>📊 各板块完成情况</h3>
          <div class="chart-container" data-chart="group-progress-bar" style="height:350px"></div>
        </div>

        ${weakSections.length > 0 ? `
        <div class="knowledge-card mb-4">
          <h3>⚠️ 薄弱环节（正确率 &lt; 60%）</h3>
          <p class="card-desc mb-3">建议重点复习以下章节：</p>
          <div>
            ${weakSections.map(s => `
              <span class="weak-tag" onclick="navigateTo('${s.id}')" style="cursor:pointer">${s.title} (${s.accuracy}%)</span>
            `).join('')}
          </div>
        </div>` : ''}

        <div class="knowledge-card">
          <h3>📊 自测正确率分布</h3>
          <div class="chart-container chart-container-lg" data-chart="accuracy-bar"></div>
        </div>
      </div>

      <!-- Tab 5: 错题本 -->
      <div id="tab-wrongbook" class="roadmap-panel">${renderWrongBookTab()}</div>
    </div>`;
  }

  // ========== 主线学习视图（总纲第〇章招牌功能） ==========
  function renderMainlineTab() {
    const total = mainlineIds.length;
    let completed = 0;
    mainlineIds.forEach(id => { if (Progress.get(id) === 'completed') completed++; });
    const pct = total ? Math.round(completed / total * 100) : 0;

    // 全链线性序（板块顺序 × 组内拓扑序），用于"第 X/N 节"定位
    const flat = [];
    MAINLINE_GROUPS.forEach(gid => topoSortGroup(gid).forEach(s => flat.push({ id: s.id, gid })));
    const next = getMainlineNext();
    const nextPos = next ? flat.findIndex(x => x.id === next.section.id) + 1 : 0;

    const nextCard = next ? `
      <div class="mainline-next-card">
        <div class="mnc-label">🧭 下一节推荐 · 主线第 ${nextPos}/${total} 节</div>
        <div class="mnc-title">${next.section.icon || '📄'} ${next.section.title}</div>
        <div class="mnc-meta">${GROUP_LABELS[next.groupId]} · 主线整体 ${completed}/${total} 节（${pct}%）${Progress.get(next.section.id) === 'learning' ? ' · 继续上次未完成的节' : ''}</div>
        <button class="mnc-btn" onclick="navigateTo('${next.section.id}')">继续学习 →</button>
      </div>` : `
      <div class="mainline-next-card done">
        <div class="mnc-label">🧭 下一节推荐</div>
        <div class="mnc-title">🎉 主线 9 板块已全部学完！</div>
        <div class="mnc-meta">去错题本清错题、或回查阅区（hm/la/circ/ana/dig/ds/sig/cpp/os/net）按需巩固。</div>
      </div>`;

    const chain = MAINLINE_GROUPS.map((gid, gi) => {
      const g = CourseData[gid];
      const sorted = topoSortGroup(gid);
      const done = sorted.filter(s => Progress.get(s.id) === 'completed').length;
      const gpct = sorted.length ? Math.round(done / sorted.length * 100) : 0;
      const nodes = sorted.map(s => {
        const st = Progress.get(s.id);
        const statusCls = st === 'completed' ? 'done' : st === 'learning' ? 'learning' : '';
        const isNext = next && next.section.id === s.id;
        const unmet = (KnowledgeDeps[s.id] || []).filter(d => MAINLINE_SET.has(d) && Progress.get(d) !== 'completed');
        const acc = Quiz.getAccuracy(s.id);
        return `<a class="mainline-node ${statusCls} ${isNext ? 'current' : ''}" onclick="navigateTo('${s.id}')">
          <span class="mln-status">${st === 'completed' ? '✓' : st === 'learning' ? '◐' : '○'}</span>
          <span class="mln-title">${s.title}</span>
          ${acc !== null ? `<span class="mln-quiz ${acc >= 0.6 ? 'ok' : 'bad'}">测 ${Math.round(acc * 100)}%</span>` : ''}
          ${unmet.length > 0 ? `<span class="mln-blocked" title="主线前置未完成：${unmet.join('、')}">前置待学</span>` : ''}
          ${isNext ? '<span class="mln-here">📍 你在这里</span>' : ''}
        </a>`;
      }).join('');
      return `${gi > 0 ? '<div class="mainline-arrow">↓</div>' : ''}
        <div class="mainline-board">
          <div class="mlb-head" onclick="navigateTo('${gid}')">
            <span class="mlb-icon">${g.icon || ''}</span>
            <span class="mlb-title">${g.title}</span>
            <span class="mlb-count ${done === sorted.length && sorted.length > 0 ? 'alldone' : ''}">${done}/${sorted.length} 节</span>
            <div class="mlb-bar"><div class="mlb-bar-inner" style="width:${gpct}%"></div></div>
          </div>
          <div class="mlb-nodes">${nodes}</div>
        </div>`;
    }).join('');

    return `
      ${nextCard}
      <div class="knowledge-card mb-4">
        <p class="card-desc"><strong>主线区</strong>（没学过的知识，从头系统精学）：按 <strong>电力电子 → 电机与拖动 → 现代控制 → 传感器 → 嵌入式 → 机器人学 → Linux 实战 → 3D 打印 → AI</strong> 推进——读正文 → 做自测 → 能推导。板块内按 KnowledgeDeps 拓扑排序（如 linux-10 整机联调排在 12/13/14 之后）；跨板块前置未完成（如 mct-11 需 sns-07）会标 <span class="mln-blocked">前置待学</span> 并自动跳过推荐。📍 当前位置 = 第一个未完成且前置就绪的节。查阅区（学校已学板块）按需速查，不在主线链内。</p>
      </div>
      ${chain}`;
  }

  // ========== 错题本视图 ==========
  function renderWrongBookTab() {
    const stats = WrongBook.getStats();
    const groups = WrongBook.groupByBoard();

    if (stats.questions === 0) {
      return `<div class="knowledge-card">
        <h3>📕 错题本</h3>
        <p class="card-desc">做自测时答错的题会自动记录到这里；点击"刷错题"只重练本节错题，答对自动移出、答错次数继续累计。目前还没有错题——去任意章节做几道自测吧。</p>
      </div>`;
    }

    const groupHtml = groups.map(g => `
      <div class="wrongbook-board">
        <div class="wbb-head">
          <span>${g.groupIcon || ''} ${g.groupTitle}</span>
          <span class="wbb-count">${g.sections.reduce((a, s) => a + s.questionCount, 0)} 题</span>
        </div>
        ${g.sections.map(s => `
          <div class="wrongbook-row">
            <span class="wbr-icon">${s.icon || '📄'}</span>
            <span class="wbr-title" onclick="navigateTo('${s.sectionId}')">${s.title}</span>
            <span class="wbr-meta">错 ${s.questionCount} 题 · 累计 ${s.mistakeCount} 次${s.maxCount > 1 ? ` · 最多 ${s.maxCount} 次` : ''}</span>
            <button class="wbr-btn" onclick="Quiz.startWrongMode('${s.sectionId}')">刷错题</button>
          </div>`).join('')}
      </div>`).join('');

    return `
      <div class="stat-card-grid mb-4">
        <div class="stat-card"><div class="stat-value">${stats.questions}</div><div class="stat-label">待清错题</div></div>
        <div class="stat-card"><div class="stat-value">${stats.sections}</div><div class="stat-label">涉及章节</div></div>
        <div class="stat-card"><div class="stat-value">${stats.mistakes}</div><div class="stat-label">累计答错次数</div></div>
        <div class="stat-card"><div class="stat-value">${groups.length}</div><div class="stat-label">涉及板块</div></div>
      </div>
      <div class="knowledge-card mb-4">
        <p class="card-desc">按板块分组（仅显示有错题的板块）。点击"刷错题"进入该节错题重练：答对即移出、答错次数 +1，全部清零后自动提示返回。</p>
      </div>
      ${groupHtml}
      <div class="mt-4 pt-3 border-t text-right" style="border-color:var(--border)">
        <button class="text-sm hover:underline" style="color:var(--danger)" onclick="if(confirm('确定清空整个错题本？此操作不可恢复。')){WrongBook.clear();navigateTo('roadmap');}">清空错题本</button>
      </div>`;
  }

  // ========== 占位提示 ==========
  function renderPlaceholder(title, icon, desc) {
    return `<div class="placeholder-box">
      <div class="ph-icon">${icon}</div>
      <div class="ph-title">${title}</div>
      <div class="ph-desc">${desc || '该功能正在建设中，敬请期待。'}</div>
    </div>`;
  }

  // ========== 学习路径 Tab 切换 ==========
  window.switchRoadmapTab = function(tabId, btn) {
    document.querySelectorAll('.roadmap-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.roadmap-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById('tab-' + tabId);
    if (panel) {
      panel.classList.add('active');
      // 清除该面板内图表的初始化标记，强制重新渲染（解决 display:none 容器尺寸为 0 的问题）
      panel.querySelectorAll('[data-chart]').forEach(el => { delete el.dataset.init; });
      requestAnimationFrame(() => {
        Charts.renderAll('page-container');
        // 渲染后强制所有 ECharts 实例 resize 到正确尺寸
        Charts._instances.forEach(inst => { try { inst.resize(); } catch {} });
      });
    }
  };

  // ========== 交互功能 ==========
  window.toggleAccordion = function (btn) {
    const body = btn.nextElementSibling;
    const isOpen = body.classList.contains('open');
    btn.parentElement.parentElement.querySelectorAll('.accordion-body.open').forEach(el => {
      el.style.maxHeight = el.scrollHeight + 'px';
      el.offsetHeight;
      el.style.maxHeight = '0';
      el.classList.remove('open');
      el.previousElementSibling.classList.remove('open');
    });
    if (!isOpen) {
      body.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
      btn.classList.add('open');
      body.addEventListener('transitionend', () => { if (body.classList.contains('open')) body.style.maxHeight = 'none'; }, { once: true });
      if (typeof renderMathInElement === 'function') {
        renderMathInElement(body, { delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }], throwOnError: false });
      }
    }
  };

  window.switchTab = function (tabId, btn) {
    const parent = btn.closest('.tab-nav').parentElement;
    parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    parent.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(tabId)?.classList.add('active');
    if (tabId === 'tab-calculators') Calculator.render('calculators-container');
    if (tabId === 'tab-progress') {
      const el = document.getElementById('progress-chart');
      if (el && !el.dataset.init) { el.dataset.init = '1'; Charts.renderProgressChart('progress-chart'); }
    }
  };

  window.toggleProgress = function (id, btn) {
    const s = Progress.toggleStatus(id);
    Progress.updateGlobalBar();
    if (btn) {
      const labels = { pending: ['○', '标记学习', ''], learning: ['◐', '学习中', 'status-learning'], completed: ['✓', '已完成', 'status-completed'] };
      const [icon, text, cls] = labels[s];
      btn.innerHTML = `<span>${icon}</span><span class="hidden sm:inline">${text}</span>`;
      btn.className = 'status-btn ' + cls;
      const card = btn.closest('.knowledge-card');
      if (card) { card.classList.remove('completed', 'learning'); if (s === 'completed') card.classList.add('completed'); else if (s === 'learning') card.classList.add('learning'); }
    }
  };

  window.setProgress = function (id, status, btn) {
    Progress.set(id, status);
    Progress.updateGlobalBar();
    if (btn) {
      btn.parentElement.querySelectorAll('.status-btn').forEach(b => b.classList.remove('status-completed', 'status-learning'));
      btn.classList.add(status === 'completed' ? 'status-completed' : status === 'learning' ? 'status-learning' : '');
    }
  };

  window.toggleFav = function (id) {
    const nowFav = Favorites.toggle(id);
    // 收藏时默认归入"待复习"；取消收藏时清除分类
    if (nowFav && !Favorites.getCategory(id)) Favorites.setCategory(id, 'review');
    if (!nowFav) Favorites.setCategory(id, null);
    renderSidebar();
    renderPage(currentPage);
  };

  window.setFavCategory = function (id, cat) {
    Favorites.setCategory(id, cat);
    renderSidebar();
    renderPage(currentPage);
  };

  window.navigateTo = function (pageId) {
    renderPage(pageId);
    if (window.innerWidth < 1024) closeSidebar();
    return false;
  };

  // 跨节互链入口（v0.9.3 修复：data.js 全站 570+ 处 onclick="App.loadDetail(...)" 此前未定义，点击无效）
  window.App = {
    loadDetail(id) {
      renderPage(id);            // renderPage 对知识点 id 自动走 renderDetailPage 分支
      window.scrollTo({ top: 0 });
      return false;
    }
  };

  // ========== 侧边栏（桌面折叠 + 移动抽屉） ==========
  let sidebarCollapsed = localStorage.getItem('sw_sidebar_collapsed') === 'true';
  let mobileSidebarOpen = false;
  function isDesktop() { return window.innerWidth >= 1024; }

  function applySidebarState() {
    const sidebar = document.getElementById('sidebar');
    const main = document.getElementById('main-content');
    const toggle = document.getElementById('sidebar-toggle');
    if (!sidebar || !main) return;
    if (!isDesktop()) {
      main.style.marginLeft = '0';
      if (toggle) toggle.style.display = 'none';
      if (!mobileSidebarOpen) sidebar.style.transform = 'translateX(-100%)';
      return;
    }
    if (toggle) toggle.style.display = '';
    if (sidebarCollapsed) {
      sidebar.style.transform = 'translateX(-100%)';
      main.style.marginLeft = '0';
      if (toggle) { toggle.style.left = '0'; toggle.classList.add('sidebar-collapsed'); }
    } else {
      sidebar.style.transform = '';
      main.style.marginLeft = '16rem';
      if (toggle) { toggle.style.left = '16rem'; toggle.classList.remove('sidebar-collapsed'); }
    }
  }

  window.closeSidebar = function () {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    mobileSidebarOpen = false;
    if (sidebar) sidebar.style.transform = 'translateX(-100%)';
    overlay?.classList.add('hidden');
  };
  document.getElementById('menu-toggle')?.addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (!sidebar) return;
    mobileSidebarOpen = !mobileSidebarOpen;
    sidebar.style.transform = mobileSidebarOpen ? 'translateX(0)' : 'translateX(-100%)';
    overlay?.classList.toggle('hidden', !mobileSidebarOpen);
  });
  document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
    sidebarCollapsed = !sidebarCollapsed;
    localStorage.setItem('sw_sidebar_collapsed', sidebarCollapsed);
    applySidebarState();
  });
  applySidebarState();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      applySidebarState();
      if (isDesktop() && mobileSidebarOpen) {
        mobileSidebarOpen = false;
        document.getElementById('sidebar-overlay')?.classList.add('hidden');
      }
    }, 150);
  });

  // ========== 主题切换 ==========
  function applyTheme(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('studyweb_theme', dark ? 'dark' : 'light');
  }
  const savedTheme = localStorage.getItem('studyweb_theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) applyTheme(true);
  document.getElementById('theme-toggle')?.addEventListener('click', () => applyTheme(document.documentElement.getAttribute('data-theme') !== 'dark'));

  // 帮助面板
  document.getElementById('help-btn')?.addEventListener('click', () => {
    const p = document.getElementById('help-panel');
    p.classList.toggle('hidden');
    p.classList.toggle('flex');
  });

  // 键盘快捷键
  document.addEventListener('keydown', (e) => {
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') {
      if (e.key === 'Escape') { e.target.blur(); document.getElementById('search-results')?.classList.add('hidden'); }
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const input = document.getElementById('search-input');
      if (input) { input.focus(); input.select(); }
    }
    // quiz 快捷键：1-4 / A-D 作答当前题，Enter 跳下一题（帮助面板打开或焦点在按钮/链接上时不响应）
    const helpOpen = !document.getElementById('help-panel')?.classList.contains('hidden');
    if (!helpOpen && typeof Quiz !== 'undefined') {
      const k = e.key.toLowerCase();
      if (['1', '2', '3', '4'].includes(k)) {
        if (Quiz.handleKey(+k - 1)) e.preventDefault();
      } else if (['a', 'b', 'c', 'd'].includes(k)) {
        if (Quiz.handleKey(k.charCodeAt(0) - 97)) e.preventDefault();
      } else if (e.key === 'Enter' && tag !== 'BUTTON' && tag !== 'A' && tag !== 'SELECT') {
        Quiz.handleEnter();
      }
    }
    if (e.key === 't' || e.key === 'T') applyTheme(document.documentElement.getAttribute('data-theme') !== 'dark');
    if (e.key === '?') {
      const p = document.getElementById('help-panel');
      p.classList.toggle('hidden');
      p.classList.toggle('flex');
    }
    if (e.key === 'Escape') {
      document.getElementById('search-results')?.classList.add('hidden');
      const hp = document.getElementById('help-panel');
      if (!hp.classList.contains('hidden')) { hp.classList.add('hidden'); hp.classList.remove('flex'); }
      closeSidebar();
    }
  });

  // 回到顶部 + 阅读进度条 + TOC 滚动高亮
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { backToTop?.classList.remove('opacity-0', 'pointer-events-none'); backToTop?.classList.add('opacity-100'); }
    else { backToTop?.classList.add('opacity-0', 'pointer-events-none'); backToTop?.classList.remove('opacity-100'); }
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
    const bar = document.getElementById('reading-bar-inner');
    if (bar) bar.style.width = Math.min(100, pct) + '%';
    updateTocSpy();
  }, { passive: true });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ========== 初始化 ==========
  renderSidebar();
  Progress.updateGlobalBar();
  Search.init();
  renderPage('home');
})();
