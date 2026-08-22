// 自测练习模块
// 答题记录：localStorage['studyweb_quiz'] = { sectionId: { 题号: {selected, correct} } }
// 错题本：  localStorage['studyweb_quiz_wrong'] = { sectionId: { 题号: {count, last} } }
const Quiz = {
  STORAGE_KEY: 'studyweb_quiz',

  // 错题刷题模式状态（内存，不持久化）
  wrongMode: null,       // 当前处于错题刷题模式的 sectionId
  _wrongSession: null,   // 本次刷题会话作答 { 题号: {selected, correct} }

  getResults() {
    try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}'); } catch { return {}; }
  },

  // 统一取题目的答题记录（兼容旧布尔格式与新对象格式）
  _getResultEntry(v) {
    if (v === null || v === undefined) return null;
    if (typeof v === 'boolean') return { selected: -1, correct: v };
    if (typeof v === 'object') return { selected: v.selected, correct: !!v.correct };
    return null;
  },

  saveResult(sectionId, questionIdx, correct) {
    const data = this.getResults();
    if (!data[sectionId]) data[sectionId] = {};
    data[sectionId][questionIdx] = correct;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  },

  // 获取某节的正确率（0~1），无答题记录返回 null
  getAccuracy(sectionId) {
    const results = this.getResults()[sectionId];
    if (!results) return null;
    let total = 0, correct = 0;
    Object.values(results).forEach(entry => {
      const e = this._getResultEntry(entry);
      if (e) { total++; if (e.correct) correct++; }
    });
    return total > 0 ? correct / total : null;
  },

  // 渲染一整组测验（若处于本节错题刷题模式则渲染错题重练）
  render(sectionId, quizData) {
    if (!quizData || quizData.length === 0) return '';
    if (this.wrongMode === sectionId) return this.renderWrongMode(sectionId, quizData);

    const rawResults = this.getResults()[sectionId] || {};
    const results = {};
    let answered = 0, correctCount = 0;
    Object.keys(rawResults).forEach(k => {
      const e = this._getResultEntry(rawResults[k]);
      if (e) { results[k] = e; answered++; if (e.correct) correctCount++; }
    });
    const wrongCount = WrongBook.getSectionCount(sectionId);

    return `
      <div class="mt-8 pt-6 border-t" style="border-color:var(--border)">
        <h2 class="text-lg font-semibold mb-4 flex items-center gap-2 flex-wrap">
          <svg class="w-5 h-5" style="color:var(--primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          自测练习
          <span class="quiz-kbd-hint">⌨ 1-4 作答 · Enter 下一题</span>
          <span class="quiz-score ${answered === 0 ? '' : (correctCount / answered >= 0.6 ? 'pass' : 'fail')} ml-auto" style="${answered === 0 ? 'display:none' : ''}">${correctCount}/${answered}</span>
          ${wrongCount > 0 ? `<button class="quiz-wrong-btn" onclick="Quiz.startWrongMode('${sectionId}')">📕 只刷错题 (${wrongCount})</button>` : ''}
        </h2>
        <div class="space-y-4">
          ${quizData.map((q, qi) => this.renderQuestion(sectionId, qi, q, results[qi])).join('')}
        </div>
      </div>`;
  },

  // opts.wrongCount 显示错误次数徽标；opts.wrongMode 时答题走错题通道；opts.resolved 标记已移出
  renderQuestion(sectionId, qi, q, prevResult, opts = {}) {
    const letterLabels = ['A', 'B', 'C', 'D'];
    const answered = prevResult !== null && prevResult !== undefined;
    const click = opts.wrongMode
      ? (oi) => `Quiz.answerWrong('${sectionId}',${qi},${oi},${q.answer})`
      : (oi) => `Quiz.answer('${sectionId}',${qi},${oi},${q.answer})`;
    const badges = [
      opts.wrongCount > 0 ? `<span class="wrong-count-badge">✗ 错 ${opts.wrongCount} 次</span>` : '',
      (opts.wrongMode && answered && prevResult.correct && opts.resolved) ? '<span class="wrong-resolved-badge">✓ 已移出错题本</span>' : '',
    ].filter(Boolean).join('');
    return `
      <div class="quiz-card" id="quiz-card-${sectionId}-${qi}" data-quiz-section="${sectionId}" data-quiz-q="${qi}" data-quiz-answer="${q.answer}">
        <div class="quiz-question">${qi + 1}. ${q.question} ${badges}</div>
        <div class="space-y-2">
          ${q.options.map((opt, oi) => {
            let cls = 'quiz-option';
            if (answered) {
              cls += ' disabled';
              if (oi === q.answer) cls += ' correct';
              else if (prevResult.selected === oi && oi !== q.answer) cls += ' wrong';
            }
            return `<div class="${cls}" onclick="${click(oi)}">
              <span class="font-medium" style="min-width:1.5rem">${letterLabels[oi]}</span>
              <span>${opt}</span>
            </div>`;
          }).join('')}
        </div>
        <div class="quiz-explanation ${answered ? 'visible' : ''}" id="quiz-exp-${sectionId}-${qi}">
          ${q.explanation || ''}
        </div>
      </div>`;
  },

  // 答题：已答过的题不再记录；答错进错题本，答对自动移出
  answer(sectionId, qi, selected, correct) {
    const data = this.getResults();
    if (data[sectionId]?.[qi]?.selected !== undefined) return;
    const isCorrect = selected === correct;
    if (!data[sectionId]) data[sectionId] = {};
    data[sectionId][qi] = { selected, correct: isCorrect };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    if (isCorrect) WrongBook.resolve(sectionId, qi);
    else WrongBook.record(sectionId, qi);
    // 重新渲染整页以更新得分；标记刚答的题，渲染后闪烁高亮
    window._quizJustAnswered = qi;
    navigateTo(sectionId);
  },

  // ============ 错题刷题模式 ============

  startWrongMode(sectionId) {
    if (WrongBook.getSectionCount(sectionId) === 0) return;
    this.wrongMode = sectionId;
    this._wrongSession = {};
    navigateTo(sectionId);
  },

  exitWrongMode(sectionId) {
    this.wrongMode = null;
    this._wrongSession = null;
    if (sectionId) navigateTo(sectionId);
  },

  // 错题模式答题：只影响错题本（答对移出、答错累计），不改常规答题记录
  answerWrong(sectionId, qi, selected, correct) {
    const isCorrect = selected === correct;
    if (isCorrect) WrongBook.resolve(sectionId, qi);
    else WrongBook.record(sectionId, qi);
    if (!this._wrongSession) this._wrongSession = {};
    this._wrongSession[qi] = { selected, correct: isCorrect };
    window._quizJustAnswered = qi;
    navigateTo(sectionId);
  },

  // ============ 键盘快捷键（app.js keydown 委托） ============

  // 1-4 / A-D 作答：作用于当前页第一个未作答的题（已答的题锁定不再记录）
  handleKey(optionIdx) {
    const sectionId = this.wrongMode || document.querySelector('.quiz-card')?.dataset.quizSection;
    if (!sectionId || !QuizData[sectionId]) return false;
    const cards = [...document.querySelectorAll(`.quiz-card[data-quiz-section="${sectionId}"]`)];
    const card = cards.find(c => !c.querySelector('.quiz-option.disabled'));
    if (!card) return false;
    if (optionIdx >= card.querySelectorAll('.quiz-option').length) return false;
    const qi = +card.dataset.quizQ;
    const ans = +card.dataset.quizAnswer;
    if (this.wrongMode === sectionId) this.answerWrong(sectionId, qi, optionIdx, ans);
    else this.answer(sectionId, qi, optionIdx, ans);
    return true;
  },

  // Enter：平滑滚动到下一个未作答的题（全部答完则到底部得分区）
  handleEnter() {
    const cards = [...document.querySelectorAll('.quiz-card')];
    if (!cards.length) return false;
    const unanswered = cards.filter(c => !c.querySelector('.quiz-option.disabled'));
    const pick = unanswered.find(c => c.getBoundingClientRect().top > 90) || unanswered[unanswered.length - 1];
    if (!pick) return false;
    window.scrollTo({ top: pick.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
    pick.classList.add('quiz-focus');
    setTimeout(() => pick.classList.remove('quiz-focus'), 1600);
    return true;
  },

  // 渲染错题重练：展示"当前错题 ∪ 本次会话已答"，答对的题保留展示并标记已移出
  renderWrongMode(sectionId, quizData) {
    const wrong = WrongBook.getSectionWrong(sectionId);
    const session = this._wrongSession || {};
    const showIdx = [...new Set([...Object.keys(wrong).map(Number), ...Object.keys(session).map(Number)])]
      .filter(qi => quizData[qi])
      .sort((a, b) => a - b);
    const remaining = Object.keys(wrong).length;

    const bodyHtml = showIdx.length === 0
      ? '<p class="card-desc">本节暂无错题。</p>'
      : showIdx.map(qi => {
        const wEntry = wrong[qi];
        return this.renderQuestion(sectionId, qi, quizData[qi], session[qi] || null, {
          wrongCount: wEntry ? wEntry.count : 0,
          wrongMode: true,
          resolved: !wEntry,
        });
      }).join('');

    return `
      <div class="mt-8 pt-6 border-t" style="border-color:var(--border)">
        <h2 class="text-lg font-semibold mb-4 flex items-center gap-2 flex-wrap">
          <svg class="w-5 h-5" style="color:var(--danger)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          错题重练
          <span class="quiz-kbd-hint">⌨ 1-4 作答 · Enter 下一题</span>
          <span class="wrong-mode-tag">${remaining === 0 ? '已清零' : `${remaining} 题待清`}</span>
          <button class="quiz-wrong-btn exit ml-auto" onclick="Quiz.exitWrongMode('${sectionId}')">← 返回全部题目</button>
        </h2>
        <div class="space-y-4">${bodyHtml}</div>
        ${remaining === 0 && showIdx.length > 0 ? `
        <div class="quiz-clear-banner">🎉 本节错题全部答对，已自动移出错题本——按 Esc 或点击上方按钮返回。</div>` : ''}
      </div>`;
  },
};

// 错题本模块：答错自动记录到 localStorage，答对自动移出
// 存储格式：localStorage['studyweb_quiz_wrong'] = { sectionId: { 题号: {count, last} } }
const WrongBook = {
  STORAGE_KEY: 'studyweb_quiz_wrong',

  getAll() {
    try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}'); } catch { return {}; }
  },
  _save(data) { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data)); },

  // 记录一次答错：错误次数 +1
  record(sectionId, questionIdx) {
    const data = this.getAll();
    if (!data[sectionId]) data[sectionId] = {};
    const entry = data[sectionId][questionIdx] || { count: 0, last: 0 };
    entry.count += 1;
    entry.last = Date.now();
    data[sectionId][questionIdx] = entry;
    this._save(data);
  },

  // 答对自动移出
  resolve(sectionId, questionIdx) {
    const data = this.getAll();
    if (!data[sectionId] || !(questionIdx in data[sectionId])) return;
    delete data[sectionId][questionIdx];
    if (Object.keys(data[sectionId]).length === 0) delete data[sectionId];
    this._save(data);
  },

  // 某节的错题表 { 题号: {count, last} }
  getSectionWrong(sectionId) { return this.getAll()[sectionId] || {}; },
  getSectionCount(sectionId) { return Object.keys(this.getSectionWrong(sectionId)).length; },

  // 全站板块列表（从 CourseData.nav 派生，与 app.js SECTION_GROUPS 等价）
  getBoards() {
    const boards = [];
    (CourseData.nav || []).forEach(item => {
      if (item.children) item.children.forEach(c => boards.push(c.id));
      else boards.push(item.id);
    });
    return boards.filter(id => CourseData[id] && CourseData[id].sections);
  },

  // 按板块分组：[{ groupId, groupTitle, groupIcon, sections: [{ sectionId, title, icon, questionCount, mistakeCount, maxCount }] }]
  groupByBoard() {
    const all = this.getAll();
    const groups = [];
    this.getBoards().forEach(gid => {
      const g = CourseData[gid];
      const sections = [];
      g.sections.forEach(s => {
        if (!all[s.id]) return;
        let mistakeCount = 0, maxCount = 0;
        Object.values(all[s.id]).forEach(e => {
          mistakeCount += e.count || 1;
          maxCount = Math.max(maxCount, e.count || 1);
        });
        sections.push({ sectionId: s.id, title: s.title, icon: s.icon, questionCount: Object.keys(all[s.id]).length, mistakeCount, maxCount });
      });
      if (sections.length > 0) groups.push({ groupId: gid, groupTitle: g.title, groupIcon: g.icon, sections });
    });
    return groups;
  },

  getStats() {
    const all = this.getAll();
    let questions = 0, mistakes = 0;
    Object.values(all).forEach(qs => {
      questions += Object.keys(qs).length;
      Object.values(qs).forEach(e => mistakes += e.count || 1);
    });
    return { questions, mistakes, sections: Object.keys(all).length };
  },

  clear() { localStorage.removeItem(this.STORAGE_KEY); },
};
