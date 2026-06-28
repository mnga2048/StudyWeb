// 专业课学习平台 - 内容数据层
// 所有内容写在这个文件里，UI 只负责渲染。新增内容 = 往对应字段追加对象。
// id 命名规则：{板块缩写}-{序号}-{简写}，如 ana-09-opamp

const CourseData = {
  // ========== 导航结构 ==========
  nav: [
    { id: 'home', label: '首页', icon: 'home' },
    {
      id: 'math', label: '数学', icon: 'calculator', badge: '应试', badgeClass: 'badge-exam',
      children: [
        { id: 'advanced-math', label: '高等数学' },
        { id: 'linear-algebra', label: '线性代数' },
      ]
    },
    {
      id: 'circuit', label: '电子电路', icon: 'cpu',
      children: [
        { id: 'circuit-basics', label: '电路基础' },
        { id: 'analog-circuit', label: '模拟电路' },
        { id: 'digital-circuit', label: '数字电路' },
      ]
    },
    { id: 'control', label: '自动控制原理', icon: 'activity', badge: '工程', badgeClass: 'badge-eng' },
    { id: 'data-structure', label: '数据结构', icon: 'database' },
    { id: 'tools', label: '工具箱', icon: 'wrench', badge: '工具', badgeClass: 'badge-tool' },
    { id: 'roadmap', label: '学习路径', icon: 'map', badge: '导航', badgeClass: 'badge-tool' },
  ],

  // SVG 图标映射
  icons: {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"/></svg>',
    calculator: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h2M14 10h2M8 14h2M14 14h2M8 18h2M14 18h2"/></svg>',
    cpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/></svg>',
    activity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
    database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>',
    wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>',
  },

  // ========== 首页数据 ==========
  home: {
    title: '专业课学习平台 · StudyWeb',
    subtitle: '应试 + 工程双线并重，覆盖电子、自动化、电气专业核心课程，系统化学习笔试考点与工程实战知识',
    intro: '本项目把分散在课本、视频、真题里的专业课知识，系统化、可视化、可交互地组织在一个网站里。数学/数电/模电侧重学习笔试考点与计算训练，自动控制/电子电路侧重工程应用与实战仿真，数据结构兼顾计算机统考大纲与工程面试。配合交互图表、公式可视化、自测练习，做到"看得懂、记得牢、用得上"。',
    features: [
      { icon: '📚', label: '系统化知识', desc: '7 大板块、96+ 知识点按学习路径递进，应试与工程双标签筛选' },
      { icon: '🧮', label: '公式与计算', desc: 'KaTeX 渲染全部数学/控制公式，配套矩阵计算器、拉氏变换查表等工具' },
      { icon: '🎮', label: '交互可视化', desc: '伯德图、根轨迹、卡诺图、运放电路、排序算法等可交互原理图' },
      { icon: '✏️', label: '自测与真题', desc: '每节配自测题，数学/数电/模电含笔试真题模块，支持错题记录' },
    ],
    stats: [
      { label: '知识板块', value: '7', color: 'blue' },
      { label: '知识点', value: '96', color: 'green' },
      { label: '交互图表', value: '15+', color: 'purple' },
      { label: '计算工具', value: '9', color: 'orange' },
    ],
    sections: [
      { id: 'advanced-math', title: '高等数学', desc: '极限、微积分、级数、微分方程，工学类高数全考点', icon: '🔴', level: '应试' },
      { id: 'linear-algebra', label: '线性代数', title: '线性代数', desc: '行列式、矩阵、特征值、二次型，笔试线代核心', icon: '🟠', level: '应试' },
      { id: 'circuit-basics', title: '电路基础', desc: 'KCL/KVL、戴维南、一阶/二阶暂态、相量法', icon: '🔵', level: '应试+工程' },
      { id: 'analog-circuit', title: '模拟电路', desc: '二极管、三极管、运放、反馈、功率放大、电源', icon: '🟢', level: '应试+工程' },
      { id: 'digital-circuit', title: '数字电路', desc: '逻辑代数、组合/时序、卡诺图、触发器、HDL', icon: '🟡', level: '应试+工程' },
      { id: 'control', title: '自动控制原理', desc: '时域/频域/根轨迹/校正，工程应用侧重', icon: '🟣', level: '工程' },
      { id: 'data-structure', title: '数据结构', desc: '线性表→树→图→查找→排序，统考大纲与工程实战', icon: '⚫', level: '应试+工程' },
    ],
  },

  // ========== 高等数学 ==========
  'advanced-math': {
    title: '高等数学',
    subtitle: '工学类高等数学核心考点，覆盖极限、一元/多元微积分、级数、微分方程',
    icon: '🔴',
    sections: [
      { id: 'hm-01', title: '函数极限与连续', desc: '等价无穷小、夹逼准则、洛必达法则', icon: '📈', tags: ['高频考点'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">极限：微积分的地基</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          极限是整个微积分的起点——导数是极限，定积分是极限，级数收敛还是极限。掌握极限的计算方法，等于打通了高数的任督二脉。本节聚焦函数极限的定义、两大存在准则、四类计算利器，以及连续性与间断点分类。
        </p>

        <h4 class="font-medium mt-6 mb-2">极限的精确定义（ε-δ 语言）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          $\lim_{x \\to x_0} f(x) = A$ 的含义是：对任意 $\\varepsilon > 0$，存在 $\\delta > 0$，当 $0 < |x - x_0| < \\delta$ 时，恒有 $|f(x) - A| < \\varepsilon$。直观理解：当 $x$ 无限接近 $x_0$（但 $x \\ne x_0$）时，$f(x)$ 无限接近 $A$。
        </p>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>关键细节</strong>：定义中 $0 < |x - x_0|$ 排除了 $x = x_0$ 这一点，意味着 $\\lim_{x\\to x_0}f(x)$ 与 $f(x_0)$ 是否存在、等于多少<strong>完全无关</strong>。这是初学者最易混淆之处。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">两大存在准则（证明极限存在的工具）</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>夹逼准则</strong>：若 $g(x) \\le f(x) \\le h(x)$，且 $\\lim g(x) = \\lim h(x) = A$，则 $\\lim f(x) = A$。常用于求三角函数/带绝对值的极限，如 $\\lim_{x\\to 0}\\frac{\\sin x}{x}=1$ 的证明。</li>
          <li><strong>单调有界准则</strong>：单调且有界的数列（或函数）必有极限。常用于递推数列 $a_{n+1}=f(a_n)$ 求极限——先证单调、再证有界、最后令极限为 $A$ 代入递推式解方程。</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">计算利器一：等价无穷小替换</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          当 $x \\to 0$ 时，以下无穷小彼此等价（记作 $\\sim$），可在<strong>乘除因子</strong>中直接替换，是求极限最快的工具：
        </p>
        <div class="formula-block">
          $$\\sin x \\sim x,\\quad \\tan x \\sim x,\\quad \\arcsin x \\sim x,\\quad \\arctan x \\sim x$$
          $$1 - \\cos x \\sim \\tfrac{1}{2}x^2,\\quad e^x - 1 \\sim x,\\quad \\ln(1+x) \\sim x$$
          $$(1+x)^\\alpha - 1 \\sim \\alpha x,\\quad \\log_a(1+x) \\sim \\tfrac{x}{\\ln a}$$
        </div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>致命陷阱</strong>：等价无穷小<strong>只能在乘除中替换，加减中绝对不能</strong>！例如 $\\lim_{x\\to 0}\\frac{\\tan x - \\sin x}{x^3}$，若把 $\\tan x$ 和 $\\sin x$ 都换成 $x$，会得到 $0/x^3 = 0$（错误，正确答案是 $1/2$）。加减情形要用泰勒公式（见 <a href="#" onclick="navigateTo('hm-03');return false;" style="color:var(--primary)">泰勒公式</a>）。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">计算利器二：洛必达法则</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          针对 $\\frac{0}{0}$ 型和 $\\frac{\\infty}{\\infty}$ 型未定式，可对分子分母<strong>分别求导</strong>后再取极限：
        </p>
        <div class="formula-block">
          $$\\lim \\frac{f(x)}{g(x)} = \\lim \\frac{f'(x)}{g'(x)} \\quad (\\text{若右侧极限存在或为} \\infty)$$
          <div class="text-sm text-gray-500 mt-2">前提：f(x)、g(x) 在去心邻域可导，且 g'(x)≠0</div>
        </div>
        <div class="step-list">
          <div class="step-item"><div><strong>第一步：判断类型</strong>。代入后必须是 $\\frac{0}{0}$ 或 $\\frac{\\infty}{\\infty}$，否则不能用洛必达。</div></div>
          <div class="step-item"><div><strong>第二步：上下求导</strong>。是分别对分子、分母求导，不是对整个分式用商的求导法则。</div></div>
          <div class="step-item"><div><strong>第三步：可连续使用</strong>。若求导后仍是未定式，可再用一次，直到能算出确定值为止。每用一次前都要验证类型。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">计算利器三与四：两个重要极限</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>第一重要极限</strong>：$\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1$（夹逼准则证明，处理含三角函数的 $\\frac{0}{0}$ 型）</li>
          <li><strong>第二重要极限</strong>：$\\lim_{x\\to\\infty}(1+\\frac{1}{x})^x = e$，等价形式 $\\lim_{x\\to 0}(1+x)^{1/x} = e$（处理 $1^\\infty$ 型幂指未定式）</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">实例计算：综合运用</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          求 $\\lim_{x\\to 0}\\frac{e^{x^2} - 1 - x^2}{x^4}$。这是 $\\frac{0}{0}$ 型，且分子是<strong>加减结构</strong>，等价无穷小失效，用泰勒展开或洛必达：
        </p>
        <div class="formula-block">
          <div class="text-left">
            用洛必达（连续两次）：<br>
            原式 $= \\lim_{x\\to 0}\\frac{2x\\,e^{x^2} - 2x}{4x^3} = \\lim_{x\\to 0}\\frac{e^{x^2} - 1}{2x^2} = \\lim_{x\\to 0}\\frac{2x\\,e^{x^2}}{4x} = \\lim_{x\\to 0}\\frac{e^{x^2}}{2} = \\frac{1}{2}$
          </div>
        </div>

        <h4 class="font-medium mt-6 mb-2">连续性与间断点分类</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          $f(x)$ 在 $x_0$ 处连续 $\\iff \\lim_{x\\to x_0}f(x) = f(x_0)$。不连续的点称为间断点，按左右极限是否存在分为两类：
        </p>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>类型</th><th>特征</th><th>典型例子</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">可去间断点</td><td>左右极限存在且相等，但不等于函数值（或无定义）</td><td>$\\frac{\\sin x}{x}$ 在 $x=0$</td></tr>
            <tr><td class="font-medium">跳跃间断点</td><td>左右极限存在但不相等</td><td>符号函数 sgn(x) 在 $x=0$</td></tr>
            <tr><td class="font-medium">无穷间断点</td><td>极限为无穷</td><td>$\\frac{1}{x}$ 在 $x=0$</td></tr>
            <tr><td class="font-medium">振荡间断点</td><td>极限不存在且非无穷（振荡）</td><td>$\\sin\\frac{1}{x}$ 在 $x=0$</td></tr>
          </tbody>
        </table></div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>分类口诀</strong>：第一类间断点 = 左右极限都存在（可去、跳跃）；第二类 = 至少一侧极限不存在（无穷、振荡）。考试常考"判断间断点类型"，抓住"左右极限是否存在"这一关键。</div>
        </div>
      ` },
      { id: 'hm-02', title: '一元微分学', desc: '导数定义、微分中值定理', icon: '📉', tags: ['核心'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">导数：研究变化率的工具</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          导数的本质是<strong>变化率</strong>——瞬时速度、切线斜率、边际成本，都是导数。本节聚焦导数定义、求导法则、三大微分中值定理及其在证明题中的应用。中值定理是高数证明题的核心战场，务必熟练掌握。
        </p>

        <h4 class="font-medium mt-6 mb-2">导数的定义（极限形式）</h4>
        <div class="formula-block">
          $$f'(x_0) = \\lim_{\\Delta x \\to 0}\\frac{f(x_0 + \\Delta x) - f(x_0)}{\\Delta x} = \\lim_{x \\to x_0}\\frac{f(x) - f(x_0)}{x - x_0}$$
          <div class="text-sm text-gray-500 mt-2">两种写法等价，第二种把增量 x-x₀ 作为趋近变量，更常用</div>
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>几何意义</strong>：$f'(x_0)$ 是曲线 $y=f(x)$ 在点 $(x_0, f(x_0))$ 处切线的斜率。</li>
          <li><strong>物理意义</strong>：位移对时间的导数是速度，速度对时间的导数是加速度。</li>
          <li><strong>可导与连续的关系</strong>：可导必连续，但连续不一定可导（如 $y=|x|$ 在 $x=0$ 处连续但不可导）。</li>
        </ul>
        <div class="info-box info">
          <svg class="w-5 h--5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>左导数与右导数</strong>：$f'_-(x_0)$ 和 $f'_+(x_0)$ 分别用 $\\Delta x \\to 0^-$ 和 $\\Delta x \\to 0^+$ 定义。$f$ 在 $x_0$ 可导 $\\iff$ 左右导数都存在且相等。分段函数在分界点的可导性必用此判定。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">求导法则速查</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>法则</th><th>公式</th><th>说明</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">四则运算</td><td>$(u \\pm v)' = u' \\pm v'$，$(uv)'=u'v+uv'$，$(\\frac{u}{v})'=\\frac{u'v-uv'}{v^2}$</td><td>乘积法则和商法则易错，记口诀"前导后不导+前不导后导"</td></tr>
            <tr><td class="font-medium">复合函数（链式）</td><td>$[f(g(x))]' = f'(g(x)) \\cdot g'(x)$</td><td>由外向内逐层求导，不能漏层</td></tr>
            <tr><td class="font-medium">隐函数</td><td>对方程 $F(x,y)=0$ 两边对 x 求导，把 y 视作 x 的函数</td><td>解出 y' 即可</td></tr>
            <tr><td class="font-medium">参数方程</td><td>$\\frac{dy}{dx} = \\frac{y'(t)}{x'(t)}$</td><td>二阶导数要再除一次 $x'(t)$</td></tr>
            <tr><td class="font-medium">对数求导</td><td>先取对数再求导</td><td>适用于幂指函数 $u(x)^{v(x)}$ 和连乘连除式</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">三大微分中值定理（证明题核心）</h4>
        <div class="formula-block">
          <div class="text-left">
            <strong>罗尔定理</strong>：$f$ 在 $[a,b]$ 连续、$(a,b)$ 可导、$f(a)=f(b)$ $\\Rightarrow$ $\\exists\\,\\xi \\in (a,b)$，使 $f'(\\xi)=0$<br><br>
            <strong>拉格朗日中值定理</strong>：$f$ 在 $[a,b]$ 连续、$(a,b)$ 可导 $\\Rightarrow$ $\\exists\\,\\xi \\in (a,b)$，使<br>
            $$f'(\\xi) = \\frac{f(b)-f(a)}{b-a}$$<br>
            <strong>柯西中值定理</strong>：$f,g$ 在 $[a,b]$ 连续、$(a,b)$ 可导且 $g'(x)\\ne 0$ $\\Rightarrow$ $\\exists\\,\\xi$，使
            $$\\frac{f'(\\xi)}{g'(\\xi)} = \\frac{f(b)-f(a)}{g(b)-g(a)}$$
          </div>
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>三者关系</strong>：罗尔是拉格朗日 $f(a)=f(b)$ 的特例；拉格朗日是柯西 $g(x)=x$ 的特例。考试证明题套路：构造辅助函数（常含 $\\xi$ 的项移到一边构造 $F(x)$），再用罗尔/拉格朗日证明存在 $\\xi$。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">实例：用拉格朗日定理证明不等式</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          证明：当 $x > 0$ 时，$\\frac{x}{1+x} < \\ln(1+x) < x$。
        </p>
        <div class="step-list">
          <div class="step-item"><div><strong>构造函数</strong>：令 $f(t) = \\ln(1+t)$，在 $[0, x]$ 上用拉格朗日定理。</div></div>
          <div class="step-item"><div><strong>应用定理</strong>：$\\exists\\,\\xi \\in (0,x)$，使 $f'(\\xi) = \\frac{\\ln(1+x)-\\ln 1}{x-0} = \\frac{\\ln(1+x)}{x}$。而 $f'(\\xi) = \\frac{1}{1+\\xi}$。</div></div>
          <div class="step-item"><div><strong>利用 $\\xi$ 范围</strong>：因 $0 < \\xi < x$，故 $\\frac{1}{1+x} < \\frac{1}{1+\\xi} < 1$，即 $\\frac{1}{1+x} < \\frac{\\ln(1+x)}{x} < 1$，同乘 $x$ 得证。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">高阶导数与莱布尼茨公式</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          求 $n$ 阶导数时，乘积函数用<strong>莱布尼茨公式</strong>（类似二项式展开）：
        </p>
        <div class="formula-block">
          $$(uv)^{(n)} = \\sum_{k=0}^{n}\\binom{n}{k}u^{(k)}v^{(n-k)}$$
        </div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>常见误区</strong>：分段函数在分界点求导，不能用导数公式直接代入，必须用左/右导数定义判断。例如 $f(x)=x^2|x|$，在 $x=0$ 处要写 $f'_+(0)=\\lim_{x\\to 0^+}\\frac{x^3}{x}=0$，$f'_-(0)=\\lim_{x\\to 0^-}\\frac{-x^3}{x}=0$，相等故可导。</div>
        </div>
      ` },
      { id: 'hm-03', title: '泰勒公式与函数展开', desc: '麦克劳林展开、余项估计', icon: '📐', tags: ['高频'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">泰勒公式：用多项式逼近任意函数</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          泰勒公式的核心思想：任何"足够好"的函数都能用一个多项式来逼近，且可以精确到任意高的阶数。它是求高阶近似极限、证明不等式、近似计算的利器，也是 <a href="#" onclick="navigateTo('hm-01');return false;" style="color:var(--primary)">极限计算</a>中处理加减结构的终极武器。
        </p>

        <h4 class="font-medium mt-6 mb-2">泰勒公式与麦克劳林公式</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          若 $f(x)$ 在 $x_0$ 处有 $n+1$ 阶导数，则在 $x_0$ 附近：
        </p>
        <div class="formula-block">
          $$f(x) = f(x_0) + f'(x_0)(x-x_0) + \\frac{f''(x_0)}{2!}(x-x_0)^2 + \\cdots + \\frac{f^{(n)}(x_0)}{n!}(x-x_0)^n + R_n(x)$$
          <div class="text-sm text-gray-500 mt-2">$R_n(x)$ 为余项，决定逼近精度</div>
        </div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>麦克劳林公式</strong>是泰勒公式 $x_0 = 0$ 的特例，最常用：$f(x) = f(0) + f'(0)x + \\frac{f''(0)}{2!}x^2 + \\cdots + \\frac{f^{(n)}(0)}{n!}x^n + R_n(x)$。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">两种余项（决定使用场景）</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>余项类型</th><th>表达式</th><th>适用场景</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">皮亚诺余项</td><td>$R_n(x) = o((x-x_0)^n)$</td><td>求极限（只需知道是高阶无穷小）</td></tr>
            <tr><td class="font-medium">拉格朗日余项</td><td>$R_n(x) = \\frac{f^{(n+1)}(\\xi)}{(n+1)!}(x-x_0)^{n+1}$，$\\xi$ 在 $x_0$ 与 $x$ 之间</td><td>证明不等式、误差估计（需估计导数范围）</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">必背的七个麦克劳林展开式</h4>
        <div class="formula-block">
          <div class="text-left">
            $e^x = 1 + x + \\frac{x^2}{2!} + \\cdots + \\frac{x^n}{n!} + o(x^n)$<br><br>
            $\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\cdots + \\frac{(-1)^k x^{2k+1}}{(2k+1)!} + o(x^{2k+2})$<br><br>
            $\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\cdots + \\frac{(-1)^k x^{2k}}{(2k)!} + o(x^{2k+1})$<br><br>
            $\\ln(1+x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\cdots + \\frac{(-1)^{n-1}x^n}{n} + o(x^n)$<br><br>
            $\\frac{1}{1-x} = 1 + x + x^2 + \\cdots + x^n + o(x^n)$<br><br>
            $(1+x)^\\alpha = 1 + \\alpha x + \\frac{\\alpha(\\alpha-1)}{2!}x^2 + \\cdots + \\frac{\\alpha(\\alpha-1)\\cdots(\\alpha-n+1)}{n!}x^n + o(x^n)$<br><br>
            $\\tan x = x + \\frac{x^3}{3} + \\frac{2x^5}{15} + o(x^5)$（展开到 $x^5$ 即可）
          </div>
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>记忆技巧</strong>：$\\sin$/$\\cos$ 只有奇/偶次项且符号交替；$\\ln(1+x)$ 和 $\\frac{1}{1-x}$ 系数就是 $\\pm\\frac{1}{n}$；二项式 $(1+x)^\\alpha$ 系数是"下降阶乘除以阶乘"。展开<strong>必须背到能默写</strong>，否则极限题无法快速展开。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">实例一：用泰勒公式求极限（加减结构利器）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          求 $\\lim_{x\\to 0}\\frac{\\sin x - x\\cos x}{x^3}$。等价无穷小失效（加减），用泰勒展开：
        </p>
        <div class="formula-block">
          <div class="text-left">
            $\\sin x = x - \\frac{x^3}{6} + o(x^3)$，$\\cos x = 1 - \\frac{x^2}{2} + o(x^2)$<br>
            分子 $= (x - \\frac{x^3}{6}) - x(1 - \\frac{x^2}{2}) + o(x^3) = x - \\frac{x^3}{6} - x + \\frac{x^3}{2} + o(x^3) = \\frac{x^3}{3} + o(x^3)$<br>
            原式 $= \\lim_{x\\to 0}\\frac{x^3/3}{x^3} = \\frac{1}{3}$
          </div>
        </div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>展开阶数原则</strong>：展开到使分子非零的最低阶。本例分母是 $x^3$，分子各项要展开到 $x^3$。展开太低会全消得 0（误判极限），展开太高增加无谓计算。经验：分母几次，分子展开到几次。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">实例二：用泰勒公式证明不等式</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          证明：当 $x > 0$ 时，$e^x > 1 + x + \\frac{x^2}{2}$。
        </p>
        <div class="step-list">
          <div class="step-item"><div><strong>写出拉格朗日余项形式</strong>：$e^x = 1 + x + \\frac{x^2}{2} + \\frac{e^\\xi}{6}x^3$，其中 $\\xi \\in (0, x)$。</div></div>
          <div class="step-item"><div><strong>判断余项符号</strong>：因 $x > 0$ 且 $\\xi > 0$，故 $\\frac{e^\\xi}{6}x^3 > 0$。</div></div>
          <div class="step-item"><div><strong>得出结论</strong>：$e^x = 1 + x + \\frac{x^2}{2} + \\text{正数} > 1 + x + \\frac{x^2}{2}$，得证。</div></div>
        </div>
      ` },
      { id: 'hm-04', title: '导数应用', desc: '单调性、极值、凹凸性、渐近线、曲率', icon: '📊', tags: ['高频'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">用导数研究函数的性态</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          一阶导数看单调与极值，二阶导数看凹凸与拐点，加上渐近线和曲率，就能完整描绘函数图像的形状。这是分析函数性态的系统方法，也是 <a href="#" onclick="navigateTo('hm-02');return false;" style="color:var(--primary)">一元微分学</a> 的直接应用。
        </p>

        <h4 class="font-medium mt-6 mb-2">单调性判别</h4>
        <div class="formula-block">
          $$f'(x) > 0 \\Rightarrow f \\text{ 单调增};\\quad f'(x) < 0 \\Rightarrow f \\text{ 单调减}$$
          <div class="text-sm text-gray-500 mt-2">严格单调需 f'(x)>0 且不在任何子区间恒为 0</div>
        </div>
        <div class="step-list">
          <div class="step-item"><div><strong>第一步</strong>：求 $f'(x)$，找使 $f'(x)=0$ 或不存在的点（驻点/不可导点），这些点把定义域分成若干区间。</div></div>
          <div class="step-item"><div><strong>第二步</strong>：在每个区间内取一个测试点，代入 $f'(x)$ 判断正负。</div></div>
          <div class="step-item"><div><strong>第三步</strong>：列出单调区间表（$f'$ 正即增，负即减）。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">极值及其判别（两个充分条件）</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>判别法</th><th>条件</th><th>结论</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">第一充分条件（一阶导变号）</td><td>$f'(x_0)=0$，且 $f'$ 在 $x_0$ 左右变号：左正右负</td><td>$x_0$ 是极大值点</td></tr>
            <tr><td class="font-medium"></td><td>$f'(x_0)=0$，且 $f'$ 在 $x_0$ 左右变号：左负右正</td><td>$x_0$ 是极小值点</td></tr>
            <tr><td class="font-medium">第二充分条件（二阶导符号）</td><td>$f'(x_0)=0$ 且 $f''(x_0) < 0$</td><td>$x_0$ 是极大值点</td></tr>
            <tr><td class="font-medium"></td><td>$f'(x_0)=0$ 且 $f''(x_0) > 0$</td><td>$x_0$ 是极小值点</td></tr>
          </tbody>
        </table></div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>极值 vs 最值</strong>：极值是局部概念，最值是整体概念。求最值要把所有极值与区间端点值比较取最大/最小。<strong>极值的必要条件</strong>是 $f'(x_0)=0$ 或导数不存在，但满足必要条件的不一定是极值（如 $f(x)=x^3$ 在 $x=0$，$f'(0)=0$ 但不是极值）。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">凹凸性与拐点</h4>
        <div class="formula-block">
          $$f''(x) > 0 \\Rightarrow \\text{凹（下凸）};\\quad f''(x) < 0 \\Rightarrow \\text{凸（上凸）}$$
          <div class="text-sm text-gray-500 mt-2">凹：曲线在切线上方（碗口向上）；凸：曲线在切线下方（碗口向下）</div>
        </div>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          <strong>拐点</strong>：凹凸性发生改变的点 $(x_0, f(x_0))$。必要条件是 $f''(x_0)=0$ 或 $f''(x_0)$ 不存在；充分条件是 $f''$ 在 $x_0$ 左右变号。
        </p>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>极值点 vs 拐点</strong>：极值点看 $f'$ 变号、拐点看 $f''$ 变号，二者是不同概念。一个点可以既是极值点又不是拐点（如 $y=x^2$ 在原点是极值点非拐点）。判断拐点必须用二阶导。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">渐近线（三类）</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>类型</th><th>求法</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">水平渐近线</td><td>求 $\\lim_{x\\to+\\infty}f(x)$ 或 $\\lim_{x\\to-\\infty}f(x)$，若极限为常数 $A$，则 $y=A$ 是水平渐近线</td></tr>
            <tr><td class="font-medium">铅直（垂直）渐近线</td><td>找函数无定义的点或区间端点 $x_0$，若 $\\lim_{x\\to x_0}f(x)=\\infty$，则 $x=x_0$ 是铅直渐近线</td></tr>
            <tr><td class="font-medium">斜渐近线</td><td>求 $k=\\lim_{x\\to\\infty}\\frac{f(x)}{x}$，$b=\\lim_{x\\to\\infty}[f(x)-kx]$，若 $k,b$ 存在且 $k\\ne 0$，则 $y=kx+b$ 是斜渐近线</td></tr>
          </tbody>
        </table></div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>关系</strong>：若存在水平渐近线，则同侧不存在斜渐近线（二者互斥）。求渐近线要分别考虑 $x\\to+\\infty$ 和 $x\\to-\\infty$ 两个方向，可能不同。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">曲率（弯曲程度的度量）</h4>
        <div class="formula-block">
          $$K = \\frac{|y''|}{(1 + y'^2)^{3/2}}$$
          <div class="text-sm text-gray-500 mt-2">曲率越大越弯；曲率半径 R = 1/K；曲率圆的圆心在凹侧法线上</div>
        </div>
        <div class="info-box exam">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <div><strong>考点提示</strong>：曲率公式直接记忆即可，常考"求某点曲率/曲率半径"。注意曲率只与一阶、二阶导数有关，计算时先求 $y'$ 和 $y''$ 再代入。直线曲率为 0，圆各点曲率相等。</div>
        </div>
      ` },
      { id: 'hm-05', title: '不定积分', desc: '换元法、分部积分、特殊类型', icon: '➕', tags: ['计算重点'], goals: { exam: true }, content: '' },
      { id: 'hm-06', title: '定积分与反常积分', desc: '牛顿-莱布尼茨公式、判敛法', icon: '∫', tags: ['核心'], goals: { exam: true }, content: '' },
      { id: 'hm-07', title: '定积分应用', desc: '面积、体积、弧长、物理应用', icon: '📏', tags: [], goals: { exam: true }, content: '' },
      { id: 'hm-08', title: '常微分方程', desc: '一阶可分离/齐次/线性、二阶常系数', icon: '🔄', tags: ['高频'], goals: { exam: true }, content: '' },
      { id: 'hm-09', title: '多元函数微分学', desc: '偏导数、全微分、链式法则', icon: '🌐', tags: [], goals: { exam: true }, content: '' },
      { id: 'hm-10', title: '多元极值与拉格朗日乘数法', desc: '条件极值、无条件极值', icon: '⛰', tags: ['高频'], goals: { exam: true }, content: '' },
      { id: 'hm-11', title: '二重积分', desc: '直角坐标、极坐标计算', icon: '🔲', tags: ['核心'], goals: { exam: true }, content: '' },
      { id: 'hm-12', title: '三重积分与含参积分', desc: '柱坐标、球坐标、含参变量积分', icon: '🧊', tags: [], goals: { exam: true }, content: '' },
      { id: 'hm-13', title: '曲线积分', desc: '第一类/第二类、格林公式', icon: '〰', tags: ['高频'], goals: { exam: true }, content: '' },
      { id: 'hm-14', title: '曲面积分', desc: '高斯公式、斯托克斯公式', icon: '🔵', tags: ['难点'], goals: { exam: true }, content: '' },
      { id: 'hm-15', title: '无穷级数', desc: '常数项、幂级数收敛域、和函数', icon: '♾', tags: ['核心难点'], goals: { exam: true }, content: '' },
      { id: 'hm-16', title: '傅里叶级数', desc: '狄利克雷条件、周期函数展开', icon: '🎵', tags: [], goals: { exam: true }, content: '' },
    ]
  },

  // ========== 线性代数 ==========
  'linear-algebra': {
    title: '线性代数',
    subtitle: '笔试线代核心，行列式、矩阵、向量、特征值、二次型',
    icon: '🟠',
    sections: [
      { id: 'la-01', title: '行列式', desc: '性质、展开定理、克莱姆法则', icon: '|#', tags: ['基础'], goals: { exam: true }, content: '' },
      { id: 'la-02', title: '矩阵运算', desc: '乘法、逆、伴随、分块矩阵', icon: '⊞', tags: ['核心'], goals: { exam: true }, content: '' },
      { id: 'la-03', title: '初等变换与秩', desc: '行变换、矩阵秩的求法', icon: '⇅', tags: ['高频'], goals: { exam: true }, content: '' },
      { id: 'la-04', title: '线性方程组', desc: '解的结构、Ax=0/Ax=b', icon: '∀', tags: ['核心'], goals: { exam: true }, content: '' },
      { id: 'la-05', title: '向量组与向量空间', desc: '线性相关/无关、基与维数', icon: '→', tags: ['难点'], goals: { exam: true }, content: '' },
      { id: 'la-06', title: '特征值与特征向量', desc: '特征多项式、对角化条件', icon: 'λ', tags: ['高频核心'], goals: { exam: true }, content: '' },
      { id: 'la-07', title: '相似矩阵与对角化', desc: '相似条件、正交相似', icon: '≈', tags: ['核心'], goals: { exam: true }, content: '' },
      { id: 'la-08', title: '二次型及其标准形', desc: '配方法、正交变换化标准形', icon: '⊕', tags: ['高频'], goals: { exam: true }, content: '' },
      { id: 'la-09', title: '正交矩阵与正交变换', desc: '施密特正交化、正定二次型', icon: '⊥', tags: [], goals: { exam: true }, content: '' },
      { id: 'la-10', title: '线性空间与线性变换', desc: '抽象空间、变换矩阵（进阶）', icon: '⟨⟩', tags: ['进阶'], goals: { exam: true }, content: '' },
    ]
  },

  // ========== 电路基础 ==========
  'circuit-basics': {
    title: '电子电路基础',
    subtitle: '电路分析入门，所有电子课程的共同地基',
    icon: '🔵',
    sections: [
      { id: 'circ-01', title: '基尔霍夫定律', desc: 'KCL/KVL、节点法、网孔法', icon: '⚡', tags: ['基础必学'], goals: { exam: true, eng: true }, content: '' },
      { id: 'circ-02', title: '戴维南/诺顿等效', desc: '等效电源定理、等效电阻', icon: '🔀', tags: ['高频'], goals: { exam: true, eng: true }, content: '' },
      { id: 'circ-03', title: '叠加定理与齐次定理', desc: '线性电路叠加原理', icon: '➗', tags: [], goals: { exam: true }, content: '' },
      { id: 'circ-04', title: '一阶电路暂态', desc: 'RC/RL、三要素法', icon: '📈', tags: ['核心'], goals: { exam: true, eng: true }, content: '' },
      { id: 'circ-05', title: '二阶电路暂态', desc: 'RLC 过阻尼/临界/欠阻尼', icon: '〰', tags: ['难点'], goals: { exam: true }, content: '' },
      { id: 'circ-06', title: '正弦稳态分析', desc: '相量法、阻抗、导纳', icon: ' sinusoid', tags: ['核心'], goals: { exam: true, eng: true }, content: '' },
      { id: 'circ-07', title: '频率响应与滤波器', desc: 'RC 低通/高通、波特图入门', icon: '📶', tags: ['工程'], goals: { eng: true }, content: '' },
      { id: 'circ-08', title: '谐振电路', desc: '串联/并联谐振、品质因数', icon: '🎯', tags: ['高频'], goals: { exam: true }, content: '' },
      { id: 'circ-09', title: '三相电路', desc: '星形/三角形、功率计算', icon: '⚙', tags: [], goals: { exam: true }, content: '' },
      { id: 'circ-10', title: '二端口网络', desc: 'Z/Y/H 参数及其互换', icon: '⬛', tags: ['难点'], goals: { exam: true }, content: '' },
      { id: 'circ-11', title: '含运放的电路分析', desc: '理想运放线性区模型', icon: '🔺', tags: ['工程'], goals: { eng: true }, content: '' },
      { id: 'circ-12', title: '受控源与电路定理扩展', desc: '受控源处理、定理适用性', icon: '🔌', tags: [], goals: { exam: true }, content: '' },
    ]
  },

  // ========== 模拟电路 ==========
  'analog-circuit': {
    title: '模拟电路',
    subtitle: '放大器、运放、反馈、电源，应试与工程并重',
    icon: '🟢',
    sections: [
      { id: 'ana-01', title: '半导体二极管', desc: '伏安特性、模型、稳压管', icon: '➡', tags: ['基础'], goals: { exam: true, eng: true }, content: '' },
      { id: 'ana-02', title: '二极管整流与滤波', desc: '半波/全波整流、电容滤波', icon: '🌊', tags: ['工程'], goals: { eng: true }, content: '' },
      { id: 'ana-03', title: '三极管(BJT)工作原理', desc: '放大区、特性曲线', icon: '🔺', tags: ['核心'], goals: { exam: true, eng: true }, content: '' },
      { id: 'ana-04', title: '基本放大电路', desc: '共射/共集/共基、交直流分析', icon: '🔊', tags: ['高频核心'], goals: { exam: true }, content: '' },
      { id: 'ana-05', title: '静态工作点稳定', desc: '图解法、分压偏置', icon: '⚖', tags: [], goals: { exam: true }, content: '' },
      { id: 'ana-06', title: '多级放大电路', desc: '耦合方式、级联分析', icon: '📊', tags: [], goals: { exam: true }, content: '' },
      { id: 'ana-07', title: '集成运放基础', desc: '差动放大、电流源', icon: '(IC)', tags: ['核心'], goals: { exam: true }, content: '' },
      { id: 'ana-08', title: '反馈放大电路', desc: '四种组态、判别、性能影响', icon: '↩', tags: ['难点核心'], goals: { exam: true }, content: '' },
      { id: 'ana-09', title: '运放线性应用', desc: '比例/求和/积分/微分', icon: '∓', tags: ['工程高频'], goals: { exam: true, eng: true }, content: '' },
      { id: 'ana-10', title: '运放非线性应用', desc: '比较器、施密特、波形发生', icon: 'square', tags: ['工程'], goals: { eng: true }, content: '' },
      { id: 'ana-11', title: '有源滤波器', desc: 'LPF/HPF/BPF/BEF、Sallen-Key', icon: '🎚', tags: ['工程'], goals: { eng: true }, content: '' },
      { id: 'ana-12', title: '功率放大器', desc: '甲/乙/甲乙类、OTL/OCL', icon: '🔋', tags: ['高频'], goals: { exam: true }, content: '' },
      { id: 'ana-13', title: '直流稳压电源', desc: '整流→滤波→稳压→LDO/开关电源', icon: '🔌', tags: ['工程'], goals: { eng: true }, content: '' },
      { id: 'ana-14', title: '振荡电路', desc: 'RC 文氏桥、LC、晶体振荡器', icon: '📡', tags: ['高频'], goals: { exam: true, eng: true }, content: '' },
    ]
  },

  // ========== 数字电路 ==========
  'digital-circuit': {
    title: '数字电路',
    subtitle: '逻辑代数、组合/时序电路、卡诺图、HDL，应试与工程并重',
    icon: '🟡',
    sections: [
      { id: 'dig-01', title: '数制与编码', desc: '二进制/BCD/格雷码/原码补码', icon: '0️⃣', tags: ['基础'], goals: { exam: true, eng: true }, content: '' },
      { id: 'dig-02', title: '逻辑代数基础', desc: '公式法、卡诺图化简', icon: '∧∨', tags: ['核心'], goals: { exam: true }, content: '' },
      { id: 'dig-03', title: '组合逻辑电路', desc: '分析步骤、设计方法', icon: '🔀', tags: ['核心'], goals: { exam: true }, content: '' },
      { id: 'dig-04', title: '编码器/译码器/选择器', desc: '常用组合芯片及其应用', icon: '▦', tags: ['高频'], goals: { exam: true, eng: true }, content: '' },
      { id: 'dig-05', title: '加法器与比较器', desc: '半加/全加、数值比较', icon: '➕', tags: [], goals: { exam: true }, content: '' },
      { id: 'dig-06', title: '竞争冒险', desc: '产生原因、消除方法', icon: '⚠', tags: [], goals: { exam: true }, content: '' },
      { id: 'dig-07', title: '锁存器与触发器', desc: 'RS/D/JK/T 触发器', icon: '🔒', tags: ['核心'], goals: { exam: true }, content: '' },
      { id: 'dig-08', title: '时序逻辑电路分析', desc: '状态方程/状态图/状态表', icon: '🔄', tags: ['核心难点'], goals: { exam: true }, content: '' },
      { id: 'dig-09', title: '计数器', desc: '异步/同步、任意进制设计', icon: '🔢', tags: ['高频'], goals: { exam: true, eng: true }, content: '' },
      { id: 'dig-10', title: '移位寄存器', desc: '移位、环形/扭环形计数器', icon: '→→', tags: [], goals: { exam: true }, content: '' },
      { id: 'dig-11', title: '555 定时器', desc: '多谐/单稳/施密特', icon: '⏱', tags: ['高频'], goals: { exam: true, eng: true }, content: '' },
      { id: 'dig-12', title: '半导体存储器', desc: 'RAM/ROM、存储扩展', icon: '💾', tags: [], goals: { exam: true }, content: '' },
      { id: 'dig-13', title: 'A/D 与 D/A 转换器', desc: '转换原理、参数指标', icon: '🔤', tags: ['工程'], goals: { eng: true }, content: '' },
      { id: 'dig-14', title: 'Verilog HDL 入门', desc: '可综合设计（工程方向）', icon: '{ }', tags: ['工程'], goals: { eng: true }, content: '' },
    ]
  },

  // ========== 自动控制原理 ==========
  'control': {
    title: '自动控制原理',
    subtitle: '经典控制理论：时域/频域/根轨迹/校正，工程应用侧重',
    icon: '🟣',
    sections: [
      { id: 'act-01', title: '自动控制概论', desc: '开环/闭环、性能指标、典型输入', icon: '🎯', tags: ['基础'], goals: { eng: true }, content: '' },
      { id: 'act-02', title: '数学模型', desc: '微分方程、非线性线性化', icon: '📝', tags: [], goals: { eng: true }, content: '' },
      { id: 'act-03', title: '拉普拉斯变换与传递函数', desc: '拉氏变换查表、性质、传函', icon: 'ℒ', tags: ['核心工具'], goals: { eng: true }, content: '' },
      { id: 'act-04', title: '结构图与信号流图', desc: '梅逊公式、等效变换', icon: 'loom', tags: ['高频'], goals: { eng: true }, content: '' },
      { id: 'act-05', title: '时域分析', desc: '一阶/二阶系统、σ%/ts/tr', icon: '📈', tags: ['核心'], goals: { eng: true }, content: '' },
      { id: 'act-06', title: '稳定性', desc: '劳斯-赫尔维茨判据', icon: '⚖', tags: ['高频核心'], goals: { eng: true }, content: '' },
      { id: 'act-07', title: '稳态误差', desc: '误差系数法、系统型别', icon: '📏', tags: ['高频'], goals: { eng: true }, content: '' },
      { id: 'act-08', title: '根轨迹法', desc: '180°/0° 根轨迹绘制法则', icon: '🌿', tags: ['核心难点'], goals: { eng: true }, content: '' },
      { id: 'act-09', title: '频域分析', desc: '奈奎斯特图、伯德图', icon: ' sinusoid', tags: ['核心'], goals: { eng: true }, content: '' },
      { id: 'act-10', title: '奈奎斯特稳定判据', desc: '稳定裕度、相位/幅值裕度', icon: '🌀', tags: ['难点核心'], goals: { eng: true }, content: '' },
      { id: 'act-11', title: '闭环频域与时域指标', desc: '指标换算、闭环频率特性', icon: '🔁', tags: [], goals: { eng: true }, content: '' },
      { id: 'act-12', title: '系统校正', desc: '超前/滞后/滞后-超前/PID', icon: '🔧', tags: ['工程核心'], goals: { eng: true }, content: '' },
      { id: 'act-13', title: '离散系统基础', desc: 'z 变换、脉冲传函、稳定性', icon: '⏱', tags: [], goals: { eng: true }, content: '' },
      { id: 'act-14', title: '工程实战：PID 整定', desc: 'Ziegler-Nichols、Cohen-Coon + STM32', icon: '💻', tags: ['工程'], goals: { eng: true }, content: '' },
    ]
  },

  // ========== 数据结构 ==========
  'data-structure': {
    title: '数据结构',
    subtitle: '线性表→树→图→查找→排序，统考大纲与工程面试双线',
    icon: '⚫',
    sections: [
      { id: 'ds-01', title: '绪论与复杂度', desc: '时间/空间复杂度、主定理', icon: '⏱', tags: ['基础'], goals: { exam: true, eng: true }, content: '' },
      { id: 'ds-02', title: '线性表', desc: '顺序表 vs 链表、单/双/循环链表', icon: '🔗', tags: ['核心'], goals: { exam: true, eng: true }, content: '' },
      { id: 'ds-03', title: '栈与队列', desc: '顺序/链式、双端队列、表达式求值', icon: '📥', tags: ['高频'], goals: { exam: true, eng: true }, content: '' },
      { id: 'ds-04', title: '串', desc: 'KMP 匹配、next 数组推导', icon: '🔤', tags: ['难点'], goals: { exam: true }, content: '' },
      { id: 'ds-05', title: '数组与特殊矩阵', desc: '压缩存储、稀疏矩阵', icon: '▦', tags: [], goals: { exam: true }, content: '' },
      { id: 'ds-06', title: '树与二叉树', desc: '性质、遍历、线索化', icon: '🌳', tags: ['核心'], goals: { exam: true, eng: true }, content: '' },
      { id: 'ds-07', title: 'BST 与 AVL 树', desc: '二叉搜索树、平衡二叉树', icon: '⚖', tags: ['高频'], goals: { exam: true, eng: true }, content: '' },
      { id: 'ds-08', title: '红黑树与 B 树', desc: '红黑树性质、B/B+ 树（数据库索引）', icon: '🔴', tags: ['工程'], goals: { eng: true }, content: '' },
      { id: 'ds-09', title: '堆与优先队列', desc: '建堆、堆排序、Top-K', icon: '⛰', tags: ['高频'], goals: { exam: true, eng: true }, content: '' },
      { id: 'ds-10', title: '哈夫曼树与并查集', desc: '哈夫曼编码、Union-Find', icon: 'forest', tags: ['高频'], goals: { exam: true }, content: '' },
      { id: 'ds-11', title: '图的存储与遍历', desc: '邻接矩阵/表、DFS/BFS', icon: '🕸', tags: ['核心'], goals: { exam: true, eng: true }, content: '' },
      { id: 'ds-12', title: '图的应用', desc: '最小生成树、最短路径、拓扑排序、关键路径', icon: '🗺', tags: ['高频核心'], goals: { exam: true }, content: '' },
      { id: 'ds-13', title: '查找', desc: '折半、分块、B 树、散列表', icon: '🔍', tags: ['核心'], goals: { exam: true, eng: true }, content: '' },
      { id: 'ds-14', title: '排序', desc: '插入/交换/选择/归并/基数，全家桶', icon: '↕', tags: ['高频核心'], goals: { exam: true, eng: true }, content: '' },
      { id: 'ds-15', title: '外排序与文件', desc: '败者树、多路归并（工程）', icon: '📂', tags: ['工程'], goals: { eng: true }, content: '' },
      { id: 'ds-16', title: '工程进阶结构', desc: '跳表、布隆过滤器、LRU/LFU、Trie', icon: '🚀', tags: ['工程'], goals: { eng: true }, content: '' },
    ]
  },
};

// 所有可统计进度的知识点 id 清单（用于进度统计）
// 第 0 期只先放入板块分组入口，待各板块内容填充后这里会自动从 CourseData 派生
const AllKnowledgeIds = (function () {
  const ids = [];
  ['advanced-math', 'linear-algebra', 'circuit-basics', 'analog-circuit', 'digital-circuit', 'control', 'data-structure'].forEach(group => {
    CourseData[group]?.sections?.forEach(s => ids.push(s.id));
  });
  return ids;
})();

// 自测题库（按 section id 索引）。每节配 5-8 题，含概念/计算/陷阱三类。
const QuizData = {
  // ========== 高等数学 hm-01~hm-04 ==========
  'hm-01': [
    {
      question: '$\\lim_{x\\to 0}\\frac{\\sin 3x}{x}$ 的值是？',
      options: ['0', '1', '3', '不存在'],
      answer: 2,
      explanation: '利用等价无穷小 $\\sin 3x \\sim 3x$（当 $x\\to 0$），原式 $= \\lim_{x\\to 0}\\frac{3x}{x} = 3$。也可用第一重要极限 $\\lim\\frac{\\sin u}{u}=1$ 凑出 $3\\cdot\\frac{\\sin 3x}{3x}$。'
    },
    {
      question: '以下关于洛必达法则的说法，正确的是？',
      options: ['任何极限都可以用洛必达', '只适用于 $\\frac{0}{0}$ 型和 $\\frac{\\infty}{\\infty}$ 型未定式', '洛必达法则是上下对整个分式用商的求导法则', '使用洛必达后必须继续用洛必达'],
      answer: 1,
      explanation: '洛必达只对 $\\frac{0}{0}$ 和 $\\frac{\\infty}{\\infty}$ 两类未定式有效，其他类型（如 $0\\cdot\\infty$、$\\infty-\\infty$）需先变形转化。注意是分子、分母分别求导，不是用商的法则。'
    },
    {
      question: '$\\lim_{x\\to 0}\\frac{\\tan x - \\sin x}{x^3}$ 等于？',
      options: ['0', '$\\frac{1}{2}$', '1', '$\\frac{1}{6}$'],
      answer: 1,
      explanation: '这是加减结构，不能用等价无穷小（会误得 0）。正确做法：分子 $= \\tan x(1-\\cos x) \\sim x \\cdot \\frac{x^2}{2} = \\frac{x^3}{2}$，故原式 $= \\frac{1}{2}$。或用泰勒展开 $\\tan x - \\sin x = \\frac{x^3}{2} + o(x^3)$。'
    },
    {
      question: '函数 $f(x) = \\frac{|x|}{x}$ 在 $x=0$ 处的间断点类型是？',
      options: ['可去间断点', '跳跃间断点', '无穷间断点', '振荡间断点'],
      answer: 1,
      explanation: '$f(0^+) = \\lim_{x\\to 0^+}\\frac{x}{x} = 1$，$f(0^-) = \\lim_{x\\to 0^-}\\frac{-x}{x} = -1$。左右极限都存在但不相等，属于第一类间断点中的跳跃间断点。'
    },
    {
      question: '$\\lim_{x\\to 0}(1-2x)^{1/x}$ 的值是？',
      options: ['$e^2$', '$e^{-2}$', '1', '$e$'],
      answer: 1,
      explanation: '这是 $1^\\infty$ 型，用第二重要极限：$(1-2x)^{1/x} = [(1+(-2x))^{1/(-2x)}]^{-2} \\to e^{-2}$。口诀"凑成 $(1+\\text{小})^{1/\\text{小}}$"，指数部分算出来即可。'
    },
    {
      question: '下列等价无穷小（$x\\to 0$）错误的是？',
      options: ['$\\sin x \\sim x$', '$1-\\cos x \\sim \\frac{x^2}{2}$', '$\\ln(1+x) \\sim x$', '$e^x - 1 + x \\sim x$'],
      answer: 3,
      explanation: '前三个都是标准等价无穷小。第四个错误：$e^x - 1 \\sim x$，所以 $e^x - 1 + x \\sim x + x = 2x$，而非 $x$。注意等价无穷小的加减不能随便替换。'
    },
    {
      question: '"连续的函数一定可导"这句话？',
      options: ['正确', '错误，如 $y=|x|$ 在 $x=0$ 连续但不可导', '错误，连续与可导无关', '正确，可导必连续'],
      answer: 1,
      explanation: '正确逻辑是反过来的：可导必连续，但连续不一定可导。$y=|x|$ 在原点连续（左右极限相等且等于函数值），但左导数为 -1、右导数为 1，不相等故不可导。这是高频考点。'
    },
  ],

  'hm-02': [
    {
      question: '函数 $y=f(x)$ 在 $x_0$ 处可导的充分必要条件是？',
      options: ['f(x) 在 $x_0$ 连续', 'f(x) 在 $x_0$ 处的导数存在', 'f(x) 在 $x_0$ 处的左导数与右导数都存在且相等', 'f(x) 在 $x_0$ 处可微'],
      answer: 2,
      explanation: '可导 $\\iff$ 左导数 $f\\\'_-(x_0)$ 与右导数 $f\\\'_+(x_0)$ 都存在且相等。这是判断分段函数在分界点可导性的标准方法。选项 D（可微）在一元函数中确实等价于可导，但 C 是更本质的判定。'
    },
    {
      question: '罗尔定理的结论是？',
      options: ['存在 $\\xi$ 使 $f(\\xi)=0$', '存在 $\\xi$ 使 $f\\\'(\\xi)=0$', '存在 $\\xi$ 使 $\\frac{f(b)-f(a)}{b-a}=f\\\'(\\xi)$', '存在 $\\xi$ 使 $f\\\'\'(\\xi)=0$'],
      answer: 1,
      explanation: '罗尔定理：f 在 [a,b] 连续、(a,b) 可导、$f(a)=f(b)$，则存在 $\\xi \\in (a,b)$ 使 $f\\\'(\\xi)=0$。几何意义是水平弦两端必有水平切线。选项 C 是拉格朗日定理的结论。'
    },
    {
      question: '$y = x^x$（$x>0$）的导数是？',
      options: ['$x \\cdot x^{x-1}$', '$x^x \\ln x$', '$x^x(1 + \\ln x)$', '$x^x$'],
      answer: 2,
      explanation: '幂指函数用对数求导法：$\\ln y = x \\ln x$，两边求导 $\\frac{y\'}{y} = \\ln x + 1$，故 $y\' = y(\\ln x + 1) = x^x(1 + \\ln x)$。幂指函数 $u(x)^{v(x)}$ 必须用对数求导，不能套幂或指数公式。'
    },
    {
      question: '设 $f(x)=x|x|$，则 $f(x)$ 在 $x=0$ 处？',
      options: ['不连续', '连续但不可导', '可导且导数为 0', '可导且导数为 1'],
      answer: 2,
      explanation: '$f(x) = x^2$（$x\\ge 0$）或 $-x^2$（$x<0$）。$f(0)=0$ 连续。$f\\\'_+(0)=\\lim\\frac{x^2}{x}=0$，$f\\\'_-(0)=\\lim\\frac{-x^2}{x}=0$，相等故可导且 $f\\\'(0)=0$。分段函数分界点必须用定义判断。'
    },
    {
      question: '拉格朗日中值定理 $f\\\'(\\xi)=\\frac{f(b)-f(a)}{b-a}$ 中，$\\xi$ 的位置是？',
      options: ['$\\xi = \\frac{a+b}{2}$', '$\\xi \\in [a,b]$', '$\\xi \\in (a,b)$', '$\\xi$ 可取 a 或 b'],
      answer: 2,
      explanation: '$\\xi$ 在开区间 $(a,b)$ 内，不取端点。这是定理的关键：能保证导数在内部某点取到"平均变化率"。若允许取端点，定理就退化了。$\\xi$ 一般无法确定具体值，只能证明其存在。'
    },
    {
      question: '关于可导与连续，下列正确的是？',
      options: ['可导与连续互为充要', '连续是可导的必要条件', '可导是连续的必要条件', '两者无必然联系'],
      answer: 1,
      explanation: '可导 $\\Rightarrow$ 连续（可导必连续），所以连续是可导的必要条件。但连续推不出可导（如 $|x|$），所以连续不是可导的充分条件。记"可导比连续更强"。'
    },
  ],

  'hm-03': [
    {
      question: '$\\sin x$ 的麦克劳林展开式（展开到 $x^3$）是？',
      options: ['$x - \\frac{x^3}{6}$', '$1 - \\frac{x^2}{2}$', '$x + \\frac{x^3}{6}$', '$x - \\frac{x^3}{3}$'],
      answer: 0,
      explanation: '$\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\cdots = x - \\frac{x^3}{6} + o(x^3)$。注意 sin 只含奇次项且符号交替，$\\cos x$ 只含偶次项。系数分母是阶乘。'
    },
    {
      question: '用泰勒公式求极限 $\\lim_{x\\to 0}\\frac{\\cos x - 1 + \\frac{x^2}{2}}{x^4}$，结果为？',
      options: ['$\\frac{1}{6}$', '$\\frac{1}{24}$', '$\\frac{1}{12}$', '0'],
      answer: 1,
      explanation: '$\\cos x = 1 - \\frac{x^2}{2} + \\frac{x^4}{24} + o(x^4)$，故分子 $= \\frac{x^4}{24} + o(x^4)$，原式 $= \\frac{1}{24}$。分母是 $x^4$，分子必须展开到 $x^4$ 才不会全部抵消。展开阶数 = 分母阶数。'
    },
    {
      question: '$e^x$ 的 $n$ 阶麦克劳林展开式是？',
      options: ['$1 + x + \\frac{x^2}{2} + \\cdots + \\frac{x^n}{n!}$', '$1 + x + x^2 + \\cdots + x^n$', '$x + \\frac{x^2}{2} + \\cdots + \\frac{x^n}{n}$', '$1 + x + \\frac{x^2}{2} + \\cdots + \\frac{x^n}{n}$'],
      answer: 0,
      explanation: '$e^x = 1 + x + \\frac{x^2}{2!} + \\cdots + \\frac{x^n}{n!} + o(x^n)$。各项系数都是 $\\frac{1}{k!}$（因为 $e^x$ 的各阶导数都是 $e^x$，在 0 处都是 1）。选项 B 是 $\\frac{1}{1-x}$ 的展开。'
    },
    {
      question: '拉格朗日余项 $R_n(x)=\\frac{f^{(n+1)}(\\xi)}{(n+1)!}(x-x_0)^{n+1}$ 中的 $\\xi$ 满足？',
      options: ['$\\xi = x_0$', '$\\xi = x$', '$\\xi$ 在 $x_0$ 与 $x$ 之间', '$\\xi = \\frac{x_0+x}{2}$'],
      answer: 2,
      explanation: '$\\xi$ 是介于 $x_0$ 与 $x$ 之间的某个值，具体位置未知，但存在。这正是拉格朗日余项用于不等式证明的关键：通过 $\\xi$ 的范围估计 $f^{(n+1)}(\\xi)$ 的范围，从而估计余项的符号或大小。'
    },
    {
      question: '下列哪个函数的麦克劳林展开只含偶次项？',
      options: ['$\\sin x$', '$\\tan x$', '$\\cos x$', '$\\ln(1+x)$'],
      answer: 2,
      explanation: '$\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\cdots$ 只含偶次项；$\\sin x$ 只含奇次项。这是因为 cos 是偶函数（其泰勒级数只含偶次幂）、sin 是奇函数（只含奇次幂）。$\\tan x$ 和 $\\ln(1+x)$ 既含奇也含偶次项。'
    },
    {
      question: '$\\lim_{x\\to 0}\\frac{e^{x^2}-1-x^2}{x^4}$ 的值是？',
      options: ['$\\frac{1}{2}$', '$\\frac{1}{4}$', '0', '1'],
      answer: 0,
      explanation: '$e^u = 1 + u + \\frac{u^2}{2} + o(u^2)$，令 $u=x^2$：$e^{x^2} = 1 + x^2 + \\frac{x^4}{2} + o(x^4)$。分子 $= \\frac{x^4}{2} + o(x^4)$，原式 $= \\frac{1}{2}$。若只展开到 $x^2$ 项会误得 0，必须展开到 $x^4$。'
    },
  ],

  'hm-04': [
    {
      question: '若 $f\\\'(x_0)=0$ 且 $f\\\'\'(x_0)>0$，则 $x_0$ 是？',
      options: ['极大值点', '极小值点', '拐点', '无法确定'],
      answer: 1,
      explanation: '这是极值的第二充分条件：驻点处二阶导为正，曲线下凸（凹），故是极小值点。形象理解：碗口向上，底部是极小。反之 $f\\\'\'(x_0)<0$（碗口向下）为极大值点。'
    },
    {
      question: '$(x_0, f(x_0))$ 是拐点的必要条件是？',
      options: ['$f\\\'(x_0)=0$', '$f\\\'\'(x_0)=0$ 或 $f\\\'\'(x_0)$ 不存在', '$f\\\'\'\'(x_0)=0$', '$f\\\'(x_0)$ 不存在'],
      answer: 1,
      explanation: '拐点是凹凸性改变的点，与二阶导有关。必要条件是 $f\\\'\'(x_0)=0$ 或 $f\\\'\'(x_0)$ 不存在。注意这只是必要条件，还要验证 $f\\\'\'$ 在 $x_0$ 左右变号（充分条件）。如 $y=x^4$ 有 $f\\\'\'(0)=0$ 但不是拐点。'
    },
    {
      question: '函数 $f(x)=\\frac{x^2-1}{x-1}$（$x\\ne 1$）在 $x=1$ 处的间断点类型是？',
      options: ['可去间断点', '跳跃间断点', '无穷间断点', '振荡间断点'],
      answer: 0,
      explanation: '$\\lim_{x\\to 1}\\frac{(x-1)(x+1)}{x-1} = \\lim_{x\\to 1}(x+1) = 2$，极限存在，但函数在 $x=1$ 无定义。左右极限存在且相等，属于可去间断点。可通过补充定义 $f(1)=2$ 使其连续。'
    },
    {
      question: '曲线 $y=\\frac{2x}{x-1}$ 的水平渐近线是？',
      options: ['$y=0$', '$y=1$', '$y=2$', '$x=1$'],
      answer: 2,
      explanation: '水平渐近线：$\\lim_{x\\to\\infty}\\frac{2x}{x-1} = 2$，故 $y=2$。注意 $x=1$ 是铅直渐近线（$\\lim_{x\\to 1}f(x)=\\infty$），不是水平的。求渐近线要把水平和铅直、斜三类分别检查。'
    },
    {
      question: '若 $f\\\'(x)$ 在 $x_0$ 左右由正变负，则 $x_0$ 是？',
      options: ['极大值点', '极小值点', '拐点', '无极值'],
      answer: 0,
      explanation: '第一充分条件：一阶导由正变负，意味着函数先增后减，故 $x_0$ 是极大值点。形象理解：上山后下山，山顶是极大。反之由负变正（先减后增）为极小值点。'
    },
    {
      question: '曲率 $K=\\frac{|y\'\'|}{(1+y\'^2)^{3/2}}$ 的几何意义是？',
      options: ['切线的斜率', '曲线的弯曲程度', '曲线的长度', '曲线与坐标轴围成的面积'],
      answer: 1,
      explanation: '曲率衡量曲线在某点的弯曲程度，K 越大越弯。直线曲率为 0（不弯），圆各点曲率相等且等于半径的倒数。曲率半径 $R=1/K$，曲率圆是过该点与曲线最贴近的圆。'
    },
    {
      question: '关于 $f(x)=x^3$ 在 $x=0$ 处，下列正确的是？',
      options: ['$x=0$ 是极大值点', '$x=0$ 是极小值点', '$x=0$ 是拐点但不是极值点', '$x=0$ 既是极值点又是拐点'],
      answer: 2,
      explanation: '$f\\\'(x)=3x^2$，$f\\\'(0)=0$ 但 $f\\\'$ 在 0 左右都为正（不变号），故不是极值。而 $f\\\'\'(x)=6x$ 在 $x=0$ 左右由负变正（凹凸改变），故 $(0,0)$ 是拐点。这题警示：$f\\\'(x_0)=0$ 不一定是极值，要看变号。'
    },
  ],
};

