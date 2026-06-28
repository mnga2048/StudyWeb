// 自测练习模块
// 存储格式：localStorage['studyweb_quiz'] = { sectionId: { 题号: {selected, correct} } }
const Quiz = {
  STORAGE_KEY: 'studyweb_quiz',

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

  // 渲染一整组测验
  render(sectionId, quizData) {
    if (!quizData || quizData.length === 0) return '';
    const rawResults = this.getResults()[sectionId] || {};
    const results = {};
    let answered = 0, correctCount = 0;
    Object.keys(rawResults).forEach(k => {
      const e = this._getResultEntry(rawResults[k]);
      if (e) { results[k] = e; answered++; if (e.correct) correctCount++; }
    });

    return `
      <div class="mt-8 pt-6 border-t" style="border-color:var(--border)">
        <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <svg class="w-5 h-5" style="color:var(--primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          自测练习
          <span class="quiz-score ${answered === 0 ? '' : (correctCount / answered >= 0.6 ? 'pass' : 'fail')} ml-auto" style="${answered === 0 ? 'display:none' : ''}">${correctCount}/${answered}</span>
        </h2>
        <div class="space-y-4">
          ${quizData.map((q, qi) => this.renderQuestion(sectionId, qi, q, results[qi])).join('')}
        </div>
      </div>`;
  },

  renderQuestion(sectionId, qi, q, prevResult) {
    const letterLabels = ['A', 'B', 'C', 'D'];
    const answered = prevResult !== null && prevResult !== undefined;
    return `
      <div class="quiz-card">
        <div class="quiz-question">${qi + 1}. ${q.question}</div>
        <div class="space-y-2">
          ${q.options.map((opt, oi) => {
            let cls = 'quiz-option';
            if (answered) {
              cls += ' disabled';
              if (oi === q.answer) cls += ' correct';
              else if (prevResult.selected === oi && oi !== q.answer) cls += ' wrong';
            }
            return `<div class="${cls}" onclick="Quiz.answer('${sectionId}',${qi},${oi},${q.answer})">
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

  // 答题：已答过的题不再记录
  answer(sectionId, qi, selected, correct) {
    const data = this.getResults();
    if (data[sectionId]?.[qi]?.selected !== undefined) return;
    const isCorrect = selected === correct;
    if (!data[sectionId]) data[sectionId] = {};
    data[sectionId][qi] = { selected, correct: isCorrect };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    // 重新渲染整页以更新得分
    navigateTo(sectionId);
  },
};
