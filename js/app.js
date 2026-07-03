// 专业课学习平台 - 主应用逻辑
(function () {
  'use strict';
  let currentPage = 'home';

  // 所有板块分组（用于路由分发与查找），与 nav.children.id 对应
  const SECTION_GROUPS = ['advanced-math', 'linear-algebra', 'circuit-basics',
    'analog-circuit', 'digital-circuit', 'control', 'modern-control',
    'signals', 'sensor', 'embedded-sys', 'data-structure',
    'cpp', 'os', 'network'];
  // 分组中文名映射（用于面包屑）
  const GROUP_LABELS = {
    'advanced-math': '高等数学', 'linear-algebra': '线性代数',
    'circuit-basics': '电路基础', 'analog-circuit': '模拟电路',
    'digital-circuit': '数字电路', 'control': '自动控制原理',
    'modern-control': '现代控制理论', 'signals': '信号与系统',
    'sensor': '传感器与检测', 'embedded-sys': '嵌入式系统',
    'data-structure': '数据结构', 'cpp': 'C/C++ 程序设计',
    'os': '操作系统', 'network': '计算机网络',
  };

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

    // 收藏分区
    const favs = Favorites.getAll();
    if (favs.length > 0) {
      html += `<div class="sidebar-section-title">★ 我的收藏</div>`;
      favs.forEach(id => {
        const info = Favorites.getInfo(id);
        html += `<a class="nav-item" data-page="${id}" onclick="navigateTo('${id}')">
          <span class="nav-icon">${info.icon || '📄'}</span><span>${info.title}</span></a>`;
      });
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

    let html = `<div class="nav-section ${isOpen ? 'open' : ''}" onclick="toggleSectionGroup('${section.id}', this)">
      <span class="nav-section-label">${iconHtml} ${section.label} ${badge}</span>
      ${hasSections ? `<span class="flex items-center gap-1">
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
  function renderDetailPage(section) {
    const isFav = Favorites.has(section.id);
    const quiz = QuizData[section.id];
    const hasContent = section.content && section.content.trim();
    return `<div>
      <div class="page-hero">
        <div class="flex items-center gap-2 text-sm mb-2" style="color:var(--text-secondary)">
          <a href="#" onclick="navigateTo('${section.parent}');return false;" style="color:var(--primary)">${section.parentTitle}</a><span>/</span><span>${section.title}</span>
        </div>
        <h1><span style="font-size:1.5rem">${section.icon || ''}</span> ${section.title}</h1><p>${section.desc}</p>
      </div>
      ${hasContent ? `<div class="prose max-w-none">${section.content}</div>` : renderPlaceholder('本节内容建设中', '📝', '该知识点的详细讲解正在编写，可先收藏，或前往已完成的板块学习。')}
      ${quiz ? Quiz.render(section.id, quiz) : ''}
      <div class="mt-8 pt-6 border-t flex items-center justify-between" style="border-color:var(--border)">
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
        </div>
        <button class="text-sm hover:underline" style="color:var(--primary)" onclick="navigateTo('${section.parent}')">← 返回${section.parentTitle}</button>
      </div>
    </div>`;
  }

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

    return `<div>
      <div class="page-hero">
        <h1>学习路径</h1>
        <p>知识图谱 · 学习推荐 · 掌握度分析 · 学习统计</p>
      </div>

      <div class="roadmap-tabs">
        <button class="roadmap-tab active" onclick="switchRoadmapTab('graph', this)">📊 知识图谱</button>
        <button class="roadmap-tab" onclick="switchRoadmapTab('path', this)">🎯 学习推荐</button>
        <button class="roadmap-tab" onclick="switchRoadmapTab('heatmap', this)">🌡 掌握度</button>
        <button class="roadmap-tab" onclick="switchRoadmapTab('stats', this)">📈 学习统计</button>
      </div>

      <!-- Tab 1: 知识图谱 -->
      <div id="tab-graph" class="roadmap-panel active">
        <div class="knowledge-card mb-4">
          <p class="card-desc">7 大板块 × 96 个知识点的依赖关系图。节点颜色表示学习状态：<span style="color:#059669">绿色=已完成</span>、<span style="color:#d97706">橙色=学习中</span>、<span style="color:#cbd5e1">灰色=未开始</span>。点击节点跳转到对应知识点。</p>
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
            <div class="step-item"><div><strong>第一阶段 · 数学筑基</strong>：高等数学（微积分为核心）→ 线性代数（矩阵、特征值是后续电路/自控的工具）</div></div>
            <div class="step-item"><div><strong>第二阶段 · 电路入门</strong>：电路基础（KCL/KVL、暂态）→ 模拟电路（需电路基础+微积分）→ 数字电路（相对独立，可并行）</div></div>
            <div class="step-item"><div><strong>第三阶段 · 控制理论</strong>：自动控制原理（需拉氏变换、复数、电路基础，工程应用为主）</div></div>
            <div class="step-item"><div><strong>第四阶段 · 算法数据</strong>：数据结构（相对独立，计算机统考大纲与工程面试核心）</div></div>
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
      // 延迟渲染图表，确保容器可见
      requestAnimationFrame(() => { Charts.renderAll('page-container'); });
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
    Favorites.toggle(id);
    renderSidebar();
    renderPage(currentPage);
  };

  window.navigateTo = function (pageId) {
    renderPage(pageId);
    if (window.innerWidth < 1024) closeSidebar();
    return false;
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

  // 回到顶部 + 阅读进度条
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { backToTop?.classList.remove('opacity-0', 'pointer-events-none'); backToTop?.classList.add('opacity-100'); }
    else { backToTop?.classList.add('opacity-0', 'pointer-events-none'); backToTop?.classList.remove('opacity-100'); }
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
    const bar = document.getElementById('reading-bar-inner');
    if (bar) bar.style.width = Math.min(100, pct) + '%';
  });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ========== 初始化 ==========
  renderSidebar();
  Progress.updateGlobalBar();
  Search.init();
  renderPage('home');
})();
