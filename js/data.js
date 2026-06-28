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
      { id: 'act-01', title: '自动控制概论', desc: '开环/闭环、性能指标、典型输入', icon: '🎯', tags: ['基础'], goals: { eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">什么是自动控制</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          自动控制的核心思想：让系统输出<strong>自动跟踪</strong>期望输入，即使有干扰也能保持稳定。本节建立开环/闭环控制的基本框架，理解反馈的本质，并掌握性能指标的定义——这是整个自控理论的基础语言。
        </p>

        <h4 class="font-medium mt-6 mb-2">开环控制 vs 闭环控制</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>特性</th><th>开环控制</th><th>闭环控制（反馈控制）</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">信号流</td><td>输入→控制器→执行器→输出（单向）</td><td>输出经传感器反馈到输入端，与参考值比较（闭环）</td></tr>
            <tr><td class="font-medium">抗干扰</td><td>❌ 无法自动补偿干扰</td><td>✅ 反馈能自动检测偏差并修正</td></tr>
            <tr><td class="font-medium">精度</td><td>依赖模型精度和元件精度</td><td>可通过高增益降低对模型的依赖</td></tr>
            <tr><td class="font-medium">稳定性</td><td>一般不会振荡</td><td>⚠️ 反馈可能引入振荡甚至不稳定</td></tr>
            <tr><td class="font-medium">典型例子</td><td>洗衣机定时、步进电机开环</td><td>空调恒温、汽车巡航、伺服闭环</td></tr>
          </tbody>
        </table></div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>反馈的本质</strong>：闭环控制用"偏差"驱动——输出偏高就减小控制量，偏低就增大。这正是 PID 控制器的工作原理（详见 <a href="#" onclick="navigateTo('act-14');return false;" style="color:var(--primary)">PID 整定</a>）。反馈带来精度的同时也带来稳定性风险，这是自控理论的核心矛盾。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">反馈控制系统的典型结构</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>参考输入 r(t)</strong>：期望值（如设定温度 25°C）</li>
          <li><strong>控制器 Gc(s)</strong>：根据偏差计算控制量（如 PID 算法）</li>
          <li><strong>被控对象 Gp(s)</strong>：被控制的物理系统（如电机、加热器）</li>
          <li><strong>传感器 H(s)</strong>：测量输出并反馈（如温度传感器、编码器）</li>
        </ul>
        <div class="formula-block">
          闭环传递函数：$T(s) = \\frac{G_c(s) G_p(s)}{1 + G_c(s) G_p(s) H(s)}$<br>
          开环传递函数：$L(s) = G_c(s) G_p(s) H(s)$（环路一圈的传递函数）
        </div>

        <h4 class="font-medium mt-6 mb-2">典型输入信号（测试信号）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          用标准输入信号测试系统响应，便于横向对比不同系统：
        </p>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>信号</th><th>时域表达</th><th>拉氏变换</th><th>工程场景</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">阶跃信号</td><td>$r(t)=A\\cdot 1(t)$</td><td>$R(s)=\\frac{A}{s}$</td><td>突加负载、开关启动</td></tr>
            <tr><td class="font-medium">斜坡信号</td><td>$r(t)=At$</td><td>$R(s)=\\frac{A}{s^2}$</td><td>匀速跟踪、电机恒速</td></tr>
            <tr><td class="font-medium">抛物线信号</td><td>$r(t)=\\frac{A}{2}t^2$</td><td>$R(s)=\\frac{A}{s^3}$</td><td>匀加速跟踪</td></tr>
            <tr><td class="font-medium">脉冲信号</td><td>$r(t)=A\\delta(t)$</td><td>$R(s)=A$</td><td>冲击扰动、系统辨识</td></tr>
          </tbody>
        </table></div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>阶跃响应最重要</strong>：绝大多数系统的性能指标都基于阶跃响应定义。阶跃信号相当于"突然加一个恒定输入"，最能暴露系统的动态特性（超调、振荡、稳态误差）。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">时域性能指标（基于阶跃响应）</h4>
        <div class="formula-block">
          <strong>快速性</strong>：$t_r$（上升时间）、$t_p$（峰值时间）、$t_s$（调节时间，进入终值±2%范围的时间）<br><br>
          <strong>平稳性</strong>：$\\sigma\\% = \\frac{y(t_p) - y(\\infty)}{y(\\infty)} \\times 100\\%$（超调量）
        </div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>快速性和平稳性是矛盾的</strong>：提高增益让响应更快，但超调增大甚至不稳定。工程设计中必须在两者之间权衡——这就是为什么需要自控理论，而不是简单地"加大增益"。</div>
        </div>
      ` },
      { id: 'act-02', title: '数学模型', desc: '微分方程、非线性线性化', icon: '📝', tags: ['基础'], goals: { eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">用数学描述物理系统</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          自动控制的第一步是建立系统的<strong>数学模型</strong>——用微分方程或传递函数描述输入与输出的关系。本节从物理定律出发建立微分方程，并介绍工程中最重要的近似方法：小偏差线性化。
        </p>

        <h4 class="font-medium mt-6 mb-2">建立微分方程的步骤</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>确定输入输出</strong>：明确系统的输入量（如外力、电压）和输出量（如位移、转速）。</div></div>
          <div class="step-item"><div><strong>列写物理方程</strong>：根据物理定律（牛顿定律、基尔霍夫定律、能量守恒等）列出各环节的方程。</div></div>
          <div class="step-item"><div><strong>消去中间变量</strong>：联立方程，消去中间变量，只保留输入和输出。</div></div>
          <div class="step-item"><div><strong>标准化</strong>：将方程整理为标准形式，输出最高阶导数系数为 1。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">实例：弹簧-阻尼-质量系统</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          质量为 m 的物体通过弹簧（刚度 k）和阻尼器（阻尼系数 b）连接到墙上，外力 f(t) 作用于物体，求位移 x(t) 的方程：
        </p>
        <div class="formula-block">
          牛顿第二定律：$m\\ddot{x} + b\\dot{x} + kx = f(t)$
          <div class="text-sm text-gray-500 mt-2">这是一个二阶常系数线性微分方程，m、b、k 分别是惯性、阻尼、弹性参数</div>
        </div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>类比</strong>：RLC 电路 $L\\ddot{q}+R\\dot{q}+\\frac{1}{C}q=u(t)$，形式完全相同——m↔L，b↔R，k↔1/C。这种"力-电压类比"在工程中很常用，一个领域的解法可以直接搬到另一个领域。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">小偏差线性化（工程中最重要的近似）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          实际系统大多是非线性的（如阀门流量 vs 开度、电机力矩 vs 电流），但在<strong>工作点附近</strong>小范围内，可以用泰勒展开线性化：
        </p>
        <div class="formula-block">
          $f(x) \\approx f(x_0) + f'(x_0)(x - x_0)$，令 $\\Delta x = x - x_0$，$\\Delta f = f - f(x_0)$<br>
          则 $\\Delta f \\approx f'(x_0) \\cdot \\Delta x$，即在工作点附近，非线性关系近似为<strong>线性比例关系</strong>
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>线性化的意义</strong>：线性系统可以用拉氏变换、传递函数、叠加原理等强大工具分析。非线性系统则很难有通用解法。工程中"先在工作点线性化，再用线性理论分析"是最常用的方法论——但要注意线性化只在工作点附近有效，大幅偏离时结果不可靠。</div>
        </div>
      ` },
      { id: 'act-03', title: '拉普拉斯变换与传递函数', desc: '拉氏变换查表、性质、传函', icon: 'ℒ', tags: ['核心工具'], goals: { eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">拉氏变换：把微分方程变成代数方程</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          拉普拉斯变换是自控理论的数学基础——它把时域微分方程转化为 s 域代数方程，使求解大幅简化。传递函数则是系统在 s 域的"身份证"。本节配合 <a href="#" onclick="navigateTo('hm-03');return false;" style="color:var(--primary)">泰勒公式</a> 的展开思想理解拉氏变换的物理含义。
        </p>

        <h4 class="font-medium mt-6 mb-2">拉氏变换的定义与常用变换对</h4>
        <div class="formula-block">
          $F(s) = \\mathcal{L}[f(t)] = \\int_0^{\\infty} f(t) e^{-st} dt$
        </div>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>$f(t)$（时域）</th><th>$F(s)$（s 域）</th><th>条件</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">$\\delta(t)$（单位脉冲）</td><td>1</td><td></td></tr>
            <tr><td class="font-medium">$1(t)$（单位阶跃）</td><td>$\\frac{1}{s}$</td><td></td></tr>
            <tr><td class="font-medium">$t$</td><td>$\\frac{1}{s^2}$</td><td></td></tr>
            <tr><td class="font-medium">$t^n$</td><td>$\\frac{n!}{s^{n+1}}$</td><td></td></tr>
            <tr><td class="font-medium">$e^{at}$</td><td>$\\frac{1}{s-a}$</td><td></td></tr>
            <tr><td class="font-medium">$\\sin(\\omega t)$</td><td>$\\frac{\\omega}{s^2+\\omega^2}$</td><td></td></tr>
            <tr><td class="font-medium">$\\cos(\\omega t)$</td><td>$\\frac{s}{s^2+\\omega^2}$</td><td></td></tr>
            <tr><td class="font-medium">$e^{at}\\sin(\\omega t)$</td><td>$\\frac{\\omega}{(s-a)^2+\\omega^2}$</td><td></td></tr>
          </tbody>
        </table></div>
        <div class="info-box exam">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <div><strong>必须背</strong>：上表是整个自控的工具箱。记忆技巧：阶跃→1/s，指数→1/(s-a)，三角函数→分母是 $s^2+\\omega^2$。配合 <a href="#" onclick="navigateTo('hm-08');return false;" style="color:var(--primary)">常微分方程</a> 中的拉氏变换解法一起用。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">三大性质（线性、微分、积分）</h4>
        <div class="formula-block">
          <strong>线性</strong>：$\\mathcal{L}[af+bg] = aF(s) + bG(s)$<br><br>
          <strong>微分性质</strong>：$\\mathcal{L}[f'(t)] = sF(s) - f(0)$<br>
          $\\mathcal{L}[f''(t)] = s^2 F(s) - sf(0) - f'(0)$<br><br>
          <strong>积分性质</strong>：$\\mathcal{L}\\left[\\int_0^t f(\\tau)d\\tau\\right] = \\frac{F(s)}{s}$
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>微分性质的妙用</strong>：零初始条件下 $\\mathcal{L}[f'(t)]=sF(s)$，$\\mathcal{L}[f''(t)]=s^2F(s)$——微分变成了乘 s！这正是传递函数定义的前提条件。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">传递函数的定义与性质</h4>
        <div class="formula-block">
          $G(s) = \\frac{Y(s)}{R(s)} = \\frac{b_m s^m + b_{m-1}s^{m-1} + \\cdots + b_0}{a_n s^n + a_{n-1}s^{n-1} + \\cdots + a_0}$
          <div class="text-sm text-gray-500 mt-2">零初始条件下，输出拉氏变换与输入拉氏变换之比</div>
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>零初始条件</strong>：传递函数只描述系统本身的动态特性，与初始状态无关</li>
          <li><strong>只与系统结构参数有关</strong>：同一个物理系统，无论什么输入，传递函数不变</li>
          <li><strong>零点与极点</strong>：分子零点使 $G(s)=0$，分母极点使 $G(s)=\\infty$，它们决定系统动态特性</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">实例：RC 电路的传递函数</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>列微分方程</strong>：$RC\\frac{du_o}{dt} + u_o = u_i$</div></div>
          <div class="step-item"><div><strong>零初始条件拉氏变换</strong>：$RCsU_o(s) + U_o(s) = U_i(s)$</div></div>
          <div class="step-item"><div><strong>求传递函数</strong>：$G(s) = \\frac{U_o(s)}{U_i(s)} = \\frac{1}{RCs + 1} = \\frac{1}{Ts + 1}$，其中 $T=RC$</div></div>
        </div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>$\\frac{1}{Ts+1}$ 是最基本的一阶惯性环节</strong>，T 越大响应越慢。RC 电路、热容系统、液位系统的一阶模型都是这个形式。详见 <a href="#" onclick="navigateTo('act-05');return false;" style="color:var(--primary)">时域分析</a>。</div>
        </div>
      ` },
      { id: 'act-04', title: '结构图与信号流图', desc: '梅逊公式、等效变换', icon: '🔀', tags: ['高频'], goals: { eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">用图形描述系统的信号流</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          结构图（方框图）和信号流图是描述复杂控制系统的图形化工具。当系统包含多个子系统串联、并联或反馈连接时，用图形化方法求传递函数比列方程更直观高效。本节重点掌握结构图等效变换和梅逊公式。
        </p>

        <h4 class="font-medium mt-6 mb-2">三种基本连接方式</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>连接方式</th><th>等效传递函数</th><th>说明</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">串联</td><td>$G_1(s) \\cdot G_2(s)$</td><td>前一个的输出是后一个的输入</td></tr>
            <tr><td class="font-medium">并联</td><td>$G_1(s) + G_2(s)$</td><td>同一输入分别通过两个子系统再相加</td></tr>
            <tr><td class="font-medium">反馈连接</td><td>$\\frac{G(s)}{1 \\pm G(s)H(s)}$</td><td>负反馈取+，正反馈取-</td></tr>
          </tbody>
        </table></div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>负反馈等效公式</strong> $\\frac{G}{1+GH}$ 是自控最核心的公式——几乎所有闭环系统分析都从这里出发。记住：分母 $1+GH$ 中的 GH 是开环传递函数。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">结构图等效变换法则</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>引出点前移/后移</strong>：引出点穿过方框时，方框的传递函数要相应调整（前移乘 G，后移除以 G）。</div></div>
          <div class="step-item"><div><strong>比较点前移/后移</strong>：比较点穿过方框时也要调整。</div></div>
          <div class="step-item"><div><strong>关键原则</strong>：变换前后，所有输入输出关系不能变。逐步化简，先消内环再消外环。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">梅逊公式（一步到位求传递函数）</h4>
        <div class="formula-block">
          $T(s) = \\frac{\\sum_k P_k \\Delta_k}{\\Delta}$
          <div class="text-sm text-gray-500 mt-2">
            $\\Delta = 1 - \\sum L_i + \\sum L_i L_j - \\cdots$（特征式：1 - 所有单独回路之和 + 所有不接触回路两两乘积之和 - …）<br>
            $P_k$：第 k 条前向通路的增益<br>
            $\\Delta_k$：去掉第 k 条前向通路接触的所有回路后的特征式
          </div>
        </div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>梅逊公式的关键</strong>：①准确找出所有回路（符号容易错，负反馈回路增益带负号）；②准确判断哪些回路"不接触"（没有公共节点）。建议先画出信号流图再套公式，比直接在结构图上数更不容易遗漏。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">实例：双闭环系统</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          一个典型的电机速度-电流双闭环系统：外环速度控制器 $G_1$，内环电流控制器 $G_2$，电机 $G_3$，电流反馈 $H_1$，速度反馈 $H_2$。用等效变换：
        </p>
        <div class="formula-block">
          先化简内环：$G_{inner} = \\frac{G_2 G_3}{1 + G_2 G_3 H_1}$<br>
          再化简外环：$T(s) = \\frac{G_1 G_{inner}}{1 + G_1 G_{inner} H_2} = \\frac{G_1 G_2 G_3}{1 + G_2 G_3 H_1 + G_1 G_2 G_3 H_2}$
        </div>
      ` },
      { id: 'act-05', title: '时域分析', desc: '一阶/二阶系统、σ%/ts/tr', icon: '📈', tags: ['核心'], goals: { eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">时域响应：系统动态特性的直接体现</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          时域分析是自控理论最直观的方法——直接看系统对阶跃输入的响应曲线。本节重点分析一阶系统和二阶系统的阶跃响应，建立参数与性能指标之间的精确关系，这是后续频域分析和校正设计的基础。
        </p>

        <h4 class="font-medium mt-6 mb-2">一阶系统（惯性环节）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          传递函数 $G(s)=\\frac{1}{Ts+1}$，其中 T 是时间常数。阶跃响应：
        </p>
        <div class="formula-block">
          $y(t) = 1 - e^{-t/T}$，$t \\ge 0$
          <div class="text-sm text-gray-500 mt-2">t=T 时 y=0.632（63.2%），t=3T 时 y=0.95（95%），t=5T 时 y=0.993（≈100%）</div>
        </div>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>性能指标</th><th>一阶系统</th><th>物理意义</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">调节时间 $t_s$</td><td>$3T$（5%误差带）或 $4T$（2%误差带）</td><td>T 越大响应越慢</td></tr>
            <tr><td class="font-medium">上升时间 $t_r$</td><td>$2.20T$（从 0 到 90%）</td><td>无超调，单调上升</td></tr>
            <tr><td class="font-medium">超调量 $\\sigma\\%$</td><td>0%（无超调）</td><td>一阶系统永远不会超调</td></tr>
          </tbody>
        </table></div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>工程记忆法</strong>：一阶系统的调节时间约等于 $3T$~$4T$。RC 电路中 T=RC，热系统中 T=热容/热阻。测量 T 的最简单方法：给系统一个阶跃，看输出达到 63.2% 的时间。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">二阶系统（振荡环节）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          标准形式 $G(s)=\\frac{\\omega_n^2}{s^2+2\\zeta\\omega_n s+\\omega_n^2}$，两个关键参数：
        </p>
        <div class="formula-block">
          $\\zeta$：阻尼比（决定振荡程度），$\\omega_n$：自然频率（决定响应速度）
        </div>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>$\\zeta$ 范围</th><th>系统类型</th><th>阶跃响应特征</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">$\\zeta=0$</td><td>无阻尼</td><td>等幅振荡，永不收敛</td></tr>
            <tr><td class="font-medium">$0<\\zeta<1$</td><td>欠阻尼</td><td>衰减振荡（最常见，工程最有价值）</td></tr>
            <tr><td class="font-medium">$\\zeta=1$</td><td>临界阻尼</td><td>无超调，最快收敛（临界状态）</td></tr>
            <tr><td class="font-medium">$\\zeta>1$</td><td>过阻尼</td><td>无超调，缓慢收敛（两个不同实极点）</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">欠阻尼二阶系统的性能指标公式</h4>
        <div class="formula-block">
          <strong>超调量</strong>：$\\sigma\\% = e^{-\\frac{\\pi\\zeta}{\\sqrt{1-\\zeta^2}}} \\times 100\\%$<br><br>
          <strong>峰值时间</strong>：$t_p = \\frac{\\pi}{\\omega_n\\sqrt{1-\\zeta^2}} = \\frac{\\pi}{\\omega_d}$<br><br>
          <strong>调节时间</strong>（2%误差带）：$t_s \\approx \\frac{4}{\\zeta\\omega_n}$
        </div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>公式必须背</strong>：超调量只与 $\\zeta$ 有关（与 $\\omega_n$ 无关），调节时间与 $\\zeta\\omega_n$ 乘积成反比。工程最佳阻尼比通常取 $\\zeta=0.4\\sim0.8$（超调 1.5%~25%），典型取 $\\zeta=0.707$（超调约 4.3%）。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">主导极点法（高阶系统的工程近似）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          实际系统往往高于二阶，但工程中可以用<strong>主导极点</strong>近似为二阶系统：
        </p>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>规则</strong>：如果某对共轭复极点比其他极点更靠近虚轴（实部绝对值最小），且距离其他极点 5 倍以上，则这对极点是主导极点，系统响应主要由它们决定，可近似为二阶系统分析。</div>
        </div>
      ` },
      { id: 'act-06', title: '稳定性', desc: '劳斯-赫尔维茨判据', icon: '⚖', tags: ['高频核心'], goals: { eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">稳定性：控制系统的底线</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          稳定性是控制系统最基本的要求——一个不稳定的系统，响应再快、精度再高都没有意义。本节从 BIBO 稳定性的定义出发，推导出稳定的充要条件（极点判据），并重点掌握劳斯判据——它是工程中最常用的稳定性判断工具。
        </p>

        <h4 class="font-medium mt-6 mb-2">BIBO 稳定性定义</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          <strong>有界输入有界输出</strong>（BIBO）：对于任何有界的输入，系统的输出也是有界的，则系统是 BIBO 稳定的。
        </p>
        <div class="formula-block">
          <strong>稳定性的充要条件</strong>（极点判据）：闭环传递函数的所有极点（即特征方程的根）都必须位于 s 平面的<strong>左半平面</strong>（实部为负）。
          <div class="text-sm text-gray-500 mt-2">即所有极点的实部 $\\text{Re}(p_i) < 0$</div>
        </div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>物理意义</strong>：左半平面极点对应衰减的指数/振荡（$e^{-at}$，$a>0$），右半平面对应发散的指数/振荡（$e^{at}$，$a>0$），虚轴上对临界状态（等幅振荡）。只有左半平面的极点才能保证响应最终收敛。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">劳斯判据（Routh Criterion）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          劳斯判据不需要解出特征方程的根，只需检查<strong>劳斯表第一列的符号变化次数</strong>即可判断右半平面极点的个数：
        </p>
        <div class="step-list">
          <div class="step-item"><div><strong>列出特征方程</strong>：$a_n s^n + a_{n-1}s^{n-1} + \\cdots + a_1 s + a_0 = 0$（所有系数必须同号，否则必不稳定）</div></div>
          <div class="step-item"><div><strong>构建劳斯表</strong>：前两行直接填系数，后续行用交叉相乘公式计算。</div></div>
          <div class="step-item"><div><strong>判断</strong>：第一列符号变化次数 = 右半平面极点个数。无变化则系统稳定。</div></div>
        </div>
        <div class="formula-block">
          以三阶系统 $a_3 s^3 + a_2 s^2 + a_1 s + a_0 = 0$ 为例：<br><br>
          $s^3$：$a_3$，$a_1$<br>
          $s^2$：$a_2$，$a_0$<br>
          $s^1$：$\\frac{a_2 a_1 - a_3 a_0}{a_2}$<br>
          $s^0$：$a_0$<br><br>
          <strong>稳定条件</strong>：$a_3, a_2, a_1, a_0$ 同号，且 $a_2 a_1 > a_3 a_0$
        </div>

        <h4 class="font-medium mt-6 mb-2">特殊情况处理</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>特殊情况</th><th>处理方法</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">某行首元素为 0，其余不为 0</td><td>用一个小正数 $\\varepsilon$ 替代 0，继续计算，最后令 $\\varepsilon \\to 0^+$</td></tr>
            <tr><td class="font-medium">整行为 0</td><td>用上一行的系数构造辅助方程，对辅助方程求导，用导数系数替代全零行继续</td></tr>
            <tr><td class="font-medium">辅助方程的根</td><td>辅助方程的根就是特征方程的根，可能在虚轴上（临界稳定）</td></tr>
          </tbody>
        </table></div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>劳斯判据的前提</strong>：特征方程的系数必须全非零且同号。如果有缺失项（某次幂系数为 0），则系统<strong>一定不稳定</strong>（必有右半平面或虚轴上的极点）。这是快速判断的第一步——先检查系数是否齐全。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">赫尔维茨判据（与劳斯等价）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          赫尔维茨判据用<strong>行列式</strong>判断：构造赫尔维茨矩阵，检查各阶主子式是否全为正。与劳斯判据完全等价（可互相推导），但行列式计算在高阶时比劳斯表更繁琐，工程中更常用劳斯表。
        </p>
        <div class="info-box exam">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <div><strong>考点总结</strong>：①先检查系数是否齐全同号（快速排除明显不稳定）；②三阶以下直接用系数不等式（如三阶 $a_2 a_1 > a_3 a_0$）；③四阶以上用劳斯表；④整行为零的处理是难点，必考。</div>
        </div>
      ` },
      { id: 'act-07', title: '稳态误差', desc: '误差系数法、系统型别', icon: '📏', tags: ['高频'], goals: { eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">稳态精度：系统最终能跟踪多准</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          <a href="#" onclick="navigateTo('act-05');return false;" style="color:var(--primary)">时域分析</a> 关注响应的动态过程（快不快、振不振），而稳态误差关注的是<strong>最终精度</strong>——当过渡过程结束后，输出与期望值之间的永久偏差。本节建立稳态误差的系统化分析方法，核心工具是"系统型别"与"误差系数"。
        </p>

        <h4 class="font-medium mt-6 mb-2">稳态误差的定义</h4>
        <div class="formula-block">
          $e_{ss} = \\lim_{t\\to\\infty} e(t) = \\lim_{t\\to\\infty}[r(t) - y(t)]$
          <div class="text-sm text-gray-500 mt-2">e(t) 是误差信号（输入-输出），稳态误差是过渡过程结束后误差的终值</div>
        </div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>终值定理</strong>：$e_{ss}=\\lim_{t\\to\\infty}e(t)=\\lim_{s\\to 0}sE(s)$，其中 $E(s)$ 是误差的拉氏变换。这是计算稳态误差的核心工具——不需要反变换回时域，直接在 s 域取极限。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">系统型别（Type Number）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          系统型别由开环传函中<strong>积分环节的个数</strong>决定：
        </p>
        <div class="formula-block">
          $G(s)H(s) = \\frac{K\\prod(\\tau_i s+1)}{s^\\nu \\prod(T_j s+1)}$
          <div class="text-sm text-gray-500 mt-2">$\\nu$ = 0 为 0 型系统，$\\nu$ = 1 为 I 型系统，$\\nu$ = 2 为 II 型系统</div>
        </div>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>系统型别</th><th>阶跃误差</th><th>斜坡误差</th><th>抛物线误差</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">0 型</td><td>$\\frac{1}{1+K_p}$（有差）</td><td>$\\infty$（无法跟踪）</td><td>$\\infty$（无法跟踪）</td></tr>
            <tr><td class="font-medium">I 型</td><td>0（无差）</td><td>$\\frac{1}{K_v}$（有差）</td><td>$\\infty$（无法跟踪）</td></tr>
            <tr><td class="font-medium">II 型</td><td>0（无差）</td><td>0（无差）</td><td>$\\frac{1}{K_a}$（有差）</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">误差系数（静态误差系数）</h4>
        <div class="formula-block">
          <strong>位置误差系数</strong>：$K_p = \\lim_{s\\to 0}G(s)H(s)$<br><br>
          <strong>速度误差系数</strong>：$K_v = \\lim_{s\\to 0}sG(s)H(s)$<br><br>
          <strong>加速度误差系数</strong>：$K_a = \\lim_{s\\to 0}s^2 G(s)H(s)$
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>记忆口诀</strong>：型别数 = 能无差跟踪的输入信号阶数 - 1。I 型系统无差跟踪阶跃，II 型系统无差跟踪斜坡。型别越高精度越高，但稳定性越差（高型别系统更难稳定）——精度和稳定性的矛盾再次出现。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">扰动引起的稳态误差</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          当干扰 $d(t)$ 作用在被控对象输入端时，稳态误差还取决于<strong>干扰作用点之前</strong>的控制器积分环节数：
        </p>
        <div class="formula-block">
          $e_{ss,d} = -\\lim_{s\\to 0}\\frac{s \\cdot D(s)}{1 + G_c(s)G_p(s)H(s)}$
          <div class="text-sm text-gray-500 mt-2">要消除扰动误差，控制器 $G_c(s)$ 必须在干扰作用点之前包含足够的积分环节</div>
        </div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>工程误区</strong>：型别越高≠系统越好。II 型系统虽然斜坡无差，但两个积分环节使相位滞后 -180°，极易不稳定。工程中 I 型系统（含 1 个积分）是最常用的选择——阶跃无差且容易稳定。PID 中的 I 项就是人为增加积分环节。</div>
        </div>
      ` },
      { id: 'act-08', title: '根轨迹法', desc: '180°/0° 根轨迹绘制法则', icon: '🌿', tags: ['核心难点'], goals: { eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">根轨迹：极点随增益变化的轨迹</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          根轨迹法是分析闭环极点随开环增益 K 变化而移动的图形化方法。它直观展示了 K 从小到大变化时，闭环极点在 s 平面上的运动轨迹——从而判断系统何时稳定、何时振荡、何时发散。本节重点掌握 180° 根轨迹的绘制法则。
        </p>

        <h4 class="font-medium mt-6 mb-2">根轨迹的基本概念</h4>
        <div class="formula-block">
          闭环特征方程：$1 + KG(s)H(s) = 0$，即 $KG(s)H(s) = -1$
          <div class="text-sm text-gray-500 mt-2">根轨迹是满足此方程的所有 s 点的集合（K 从 0 → +∞）</div>
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>起点</strong>：K=0 时，闭环极点 = 开环极点（根轨迹从开环极点出发）</li>
          <li><strong>终点</strong>：K→∞ 时，闭环极点趋向开环零点或无穷远</li>
          <li><strong>幅值条件</strong>：$|KG(s)H(s)|=1$（用于确定 K 值对应的精确位置）</li>
          <li><strong>相角条件</strong>：$\\angle G(s)H(s) = (2k+1)\\times 180°$（180°根轨迹，负反馈）</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">180° 根轨迹绘制法则（八条）</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>法则</th><th>内容</th><th>说明</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">① 起点终点</td><td>起于开环极点，终于开环零点或∞</td><td>K=0 在极点，K=∞ 在零点</td></tr>
            <tr><td class="font-medium">② 分支数</td><td>= 开环极点数 n（n≥m 时）</td><td>每条分支对应一个闭环极点的轨迹</td></tr>
            <tr><td class="font-medium">③ 对称性</td><td>根轨迹关于实轴对称</td><td>复极点必成共轭对出现</td></tr>
            <tr><td class="font-medium">④ 实轴上的根轨迹</td><td>实轴上某点右侧的开环零极点总数为奇数，则该点在根轨迹上</td><td>最常用的判据</td></tr>
            <tr><td class="font-medium">⑤ 渐近线</td><td>$\\sigma_a = \\frac{\\sum p_i - \\sum z_i}{n-m}$，$\\theta_a = \\frac{(2k+1)\\times 180°}{n-m}$</td><td>n-m 条渐近线，交于实轴上 $\\sigma_a$</td></tr>
            <tr><td class="font-medium">⑥ 分离/会合点</td><td>$\\frac{dK}{ds}=0$ 的解</td><td>根轨迹在实轴上分叉或合并的点</td></tr>
            <tr><td class="font-medium">⑦ 与虚轴交点</td><td>用劳斯表或令 $s=j\\omega$ 代入特征方程</td><td>决定临界稳定的 K 值</td></tr>
            <tr><td class="font-medium">⑧ 出射/入射角</td><td>用相角条件计算复极点/零点处的出发角度</td><td>复极点处根轨迹离开的角度</td></tr>
          </tbody>
        </table></div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>实用优先级</strong>：考试/工程中最常用的是法则④（实轴判断）、⑤（渐近线）、⑥（分离点）。掌握这三条就能画出根轨迹的大致形状。法则⑧（出射角）较复杂，但复极点附近的轨迹走向必须用它。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">实例：$G(s)=\\frac{K}{s(s+2)(s+4)}$ 的根轨迹</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>起点</strong>：三个开环极点 $p_1=0, p_2=-2, p_3=-4$，无开环零点。三条分支全部走向∞。</div></div>
          <div class="step-item"><div><strong>渐近线</strong>：$n-m=3$，$\\sigma_a=\\frac{0-2-4}{3}=-2$，$\\theta_a=60°, 180°, 300°$。三条渐近线交于 $(-2,0)$。</div></div>
          <div class="step-item"><div><strong>实轴根轨迹</strong>：$[0,-2]$ 段（右侧奇数个极点）和 $[-4,-\\infty)$ 段。</div></div>
          <div class="step-item"><div><strong>分离点</strong>：$K=-s(s+2)(s+4)=-(s^3+6s^2+8s)$，$\\frac{dK}{ds}=-(3s^2+12s+8)=0$，$s=-0.845$（在根轨迹上）。</div></div>
          <div class="step-item"><div><strong>与虚轴交点</strong>：特征方程 $s^3+6s^2+8s+K=0$，劳斯表：$s^1$ 行 $\\frac{48-K}{6}=0 \\Rightarrow K=48$，$s^2$ 行 $6s^2+48=0 \\Rightarrow s=\\pm j2.83$。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">0° 根轨迹（正反馈系统）</h4>
        <div class="formula-block">
          相角条件：$\\angle G(s)H(s) = 2k \\times 180°$（偶数倍 180°）
          <div class="text-sm text-gray-500 mt-2">实轴判断法则相反：右侧偶数个零极点的区段在根轨迹上</div>
        </div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>180° vs 0° 的区别</strong>：负反馈系统用 180° 根轨迹（最常见），正反馈系统用 0° 根轨迹。考试中约 90% 是 180° 根轨迹。遇到正反馈时千万别用错相角条件——用错会画出完全不同的轨迹。</div>
        </div>
      ` },
      { id: 'act-09', title: '频域分析', desc: '奈奎斯特图、伯德图', icon: '〰️', tags: ['核心'], goals: { eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">频域分析：用频率响应描述系统</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          频域分析不直接看时域响应，而是研究系统对不同频率正弦输入的稳态响应——幅值如何变化、相位如何偏移。伯德图（Bode Plot）是频域分析的核心工具，它用两张图（幅频+相频）完整描述系统的频率特性，是工程中最常用的分析和设计手段。
        </p>

        <h4 class="font-medium mt-6 mb-2">频率响应的物理意义</h4>
        <div class="formula-block">
          对 $G(j\\omega)$：输入 $r(t)=A\\sin(\\omega t)$，稳态输出 $y(t)=A|G(j\\omega)|\\sin(\\omega t + \\angle G(j\\omega))$
          <div class="text-sm text-gray-500 mt-2">$|G(j\\omega)|$ 是幅值增益，$\\angle G(j\\omega)$ 是相位偏移，都是频率 $\\omega$ 的函数</div>
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>低频段</strong>：增益大，输出忠实跟踪输入（精度由低频段决定）</li>
          <li><strong>高频段</strong>：增益小，噪声被衰减（抗干扰由高频段决定）</li>
          <li><strong>中频段</strong>：增益从大到小的过渡带，决定系统的稳定性和快速性</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">伯德图的绘制方法</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          伯德图由<strong>幅频特性</strong>（$20\\log|G(j\\omega)|$ vs $\\log\\omega$）和<strong>相频特性</strong>（$\\angle G(j\\omega)$ vs $\\log\\omega$）两张图组成。渐近线画法：
        </p>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>典型环节</th><th>传递函数</th><th>幅频渐近线</th><th>相频</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">比例环节</td><td>$K$</td><td>水平线 $20\\log K$ dB</td><td>0°（恒定）</td></tr>
            <tr><td class="font-medium">积分环节</td><td>$\\frac{1}{s}$</td><td>斜率 -20 dB/dec</td><td>-90°（恒定）</td></tr>
            <tr><td class="font-medium">惯性环节</td><td>$\\frac{1}{Ts+1}$</td><td>低频 0 dB，转折频率 $\\omega=1/T$ 后斜率 -20 dB/dec</td><td>0° → -90°（转折处 -45°）</td></tr>
            <tr><td class="font-medium">振荡环节</td><td>$\\frac{\\omega_n^2}{s^2+2\\zeta\\omega_n s+\\omega_n^2}$</td><td>低频 0 dB，转折频率 $\\omega_n$ 后斜率 -40 dB/dec</td><td>0° → -180°（转折处 -90°）</td></tr>
            <tr><td class="font-medium">一阶微分</td><td>$\\tau s+1$</td><td>低频 0 dB，转折后斜率 +20 dB/dec</td><td>0° → +90°</td></tr>
          </tbody>
        </table></div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>快速画伯德图口诀</strong>：①把传函分解为典型环节的乘积；②幅频：从低频开始，遇到极点斜率 -20dB/dec，遇到零点斜率 +20dB/dec；③相频：每个惯性环节贡献 -90° 的渐变，每个积分环节贡献 -90° 的跳变。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">奈奎斯特图（极坐标图）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          奈奎斯特图是 $G(j\\omega)$ 在复平面上的轨迹（$\\omega$ 从 $-\\infty$ 到 $+\\infty$），每个频率点对应一个向量：
        </p>
        <div class="formula-block">
          $G(j\\omega) = \\text{Re}[G(j\\omega)] + j\\text{Im}[G(j\\omega)]$
          <div class="text-sm text-gray-500 mt-2">横轴=实部，纵轴=虚部。每个 $\\omega$ 值对应平面上一个点，连成曲线</div>
        </div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>伯德图 vs 奈奎斯特图</strong>：伯德图是奈奎斯特图的"拆开版"——把幅值和相位分别画在两张图上。伯德图更直观易画（渐近线近似），工程中最常用；奈奎斯特图更紧凑（一张图包含全部信息），是奈奎斯特稳定判据的基础。详见 <a href="#" onclick="navigateTo('act-10');return false;" style="color:var(--primary)">奈奎斯特稳定判据</a>。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">实例：画 $G(s)=\\frac{10}{s(0.1s+1)}$ 的伯德图</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>分解环节</strong>：比例 K=10（$20\\log10=20$ dB），积分 $1/s$（-20dB/dec），惯性 $1/(0.1s+1)$（转折频率 $\\omega=10$ rad/s）。</div></div>
          <div class="step-item"><div><strong>幅频渐近线</strong>：低频起始高度 20dB，斜率 -20dB/dec（积分）；$\\omega=10$ 处叠加惯性环节，斜率变 -40dB/dec。</div></div>
          <div class="step-item"><div><strong>相频</strong>：积分贡献 -90° 恒定，惯性环节在 $\\omega=10$ 附近从 0° 渐变到 -90°，总相位从 -90° 渐变到 -180°。</div></div>
        </div>
      ` },
      { id: 'act-10', title: '奈奎斯特稳定判据', desc: '稳定裕度、相位/幅值裕度', icon: '🌀', tags: ['难点核心'], goals: { eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">奈奎斯特判据：用开环判断闭环稳定性</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          奈奎斯特稳定判据是频域分析的巅峰——它用<strong>开环频率响应</strong>（奈奎斯特图）直接判断<strong>闭环系统</strong>是否稳定，无需解特征方程、无需找极点。更关键的是，它能定量给出"离不稳定还有多远"（稳定裕度），这是工程设计的核心依据。
        </p>

        <h4 class="font-medium mt-6 mb-2">奈奎斯特判据的核心结论</h4>
        <div class="formula-block">
          设开环传函 $G(s)H(s)$ 有 $P$ 个右半平面极点，奈奎斯特曲线绕 $(-1,j0)$ 点的圈数为 $N$（逆时针为正），则闭环右半平面极点数 $Z = P - N$
          <div class="text-sm text-gray-500 mt-2">稳定条件：$Z=0$，即 $N=P$（奈奎斯特曲线逆时针绕 $(-1,j0)$ 点的圈数 = 开环右半平面极点数）</div>
        </div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>最常见情况</strong>：开环稳定（P=0），则稳定条件简化为 $N=0$——奈奎斯特曲线不包围 $(-1,j0)$ 点，闭环系统就稳定。这就是为什么奈奎斯特图上 $(-1,j0)$ 这个点如此关键。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">稳定裕度（衡量"离不稳定有多远"）</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>裕度</th><th>定义</th><th>物理意义</th><th>工程典型值</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">幅值裕度 $G_m$</td><td>$G_m = \\frac{1}{|G(j\\omega_{pc})|}$（$\\omega_{pc}$ 处相位=-180°时的幅值倒数）</td><td>相位到-180°时还能承受多大增益</td><td>$G_m > 6$ dB（即幅值裕度 > 2 倍）</td></tr>
            <tr><td class="font-medium">相位裕度 $\\gamma$</td><td>$\\gamma = 180° + \\angle G(j\\omega_{gc})$（$\\omega_{gc}$ 处幅值=1 时的相位余量）</td><td>增益到 0dB 时相位还差多少到-180°</td><td>$\\gamma = 30°\\sim 60°$（典型 45°）</td></tr>
          </tbody>
        </table></div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>伯德图上看裕度</strong>：相位裕度 $\\gamma$——在幅频曲线穿越 0dB 的频率 $\\omega_{gc}$ 处，看相频曲线距离 -180° 还有多远。幅值裕度 $G_m$——在相频曲线穿越 -180° 的频率 $\\omega_{pc}$ 处，看幅频曲线距离 0dB 还有多远。这两个裕度是工程设计的核心指标。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">裕度与系统性能的关系</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>相位裕度 $\\gamma$</th><th>超调量 $\\sigma\\%$</th><th>系统表现</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">$\\gamma \\approx 20°$</td><td>~45%</td><td>振荡剧烈，工程不接受</td></tr>
            <tr><td class="font-medium">$\\gamma \\approx 45°$</td><td>~16%</td><td>快速且平稳，工程最佳</td></tr>
            <tr><td class="font-medium">$\\gamma \\approx 60°$</td><td>~5%</td><td>平稳但稍慢</td></tr>
            <tr><td class="font-medium">$\\gamma \\approx 90°$</td><td>~0%</td><td>过阻尼，响应很慢</td></tr>
          </tbody>
        </table></div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>两个裕度必须同时满足</strong>：只看相位裕度不够——有些系统相位裕度足够但幅值裕度很小（相位裕度和幅值裕度不一致）。工程中要求 $\\gamma > 30°$ 且 $G_m > 6$ dB 同时满足。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">裕度的计算步骤</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>画伯德图</strong>（渐近线近似即可）。</div></div>
          <div class="step-item"><div><strong>找增益穿越频率 $\\omega_{gc}$</strong>：幅频曲线穿越 0dB 的频率。计算此频率处的相位 $\\angle G(j\\omega_{gc})$，相位裕度 $\\gamma=180°+\\angle G(j\\omega_{gc})$。</div></div>
          <div class="step-item"><div><strong>找相位穿越频率 $\\omega_{pc}$</strong>：相频曲线穿越 -180° 的频率。计算此频率处的幅值 $|G(j\\omega_{pc})|$，幅值裕度 $G_m=20\\log\\frac{1}{|G(j\\omega_{pc})|}$ dB。</div></div>
        </div>
      ` },
      { id: 'act-11', title: '闭环频域与时域指标', desc: '指标换算、闭环频率特性', icon: '🔁', tags: ['工程'], goals: { eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">闭环指标：从开环特性推断闭环性能</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          <a href="#" onclick="navigateTo('act-10');return false;" style="color:var(--primary)">奈奎斯特判据</a> 用开环特性判断稳定性，但工程中更关心的是<strong>闭环系统的性能</strong>——超调多少、响应多快。本节建立开环频域指标（相位裕度）与闭环时域指标（超调量）之间的经验换算关系，以及闭环频率特性的绘制方法。
        </p>

        <h4 class="font-medium mt-6 mb-2">闭环频率特性</h4>
        <div class="formula-block">
          闭环频率响应：$T(j\\omega) = \\frac{G(j\\omega)}{1+G(j\\omega)H(j\\omega)}$（单位反馈时 $H=1$）
          <div class="text-sm text-gray-500 mt-2">闭环幅频 $|T(j\\omega)|$ 描述各频率信号通过闭环系统后的增益变化</div>
        </div>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>闭环频域指标</th><th>定义</th><th>意义</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">谐振峰值 $M_r$</td><td>$|T(j\\omega)|$ 的最大值</td><td>$M_r$ 越大系统越振荡，$M_r=1$ 表示无谐振</td></tr>
            <tr><td class="font-medium">谐振频率 $\\omega_r$</td><td>出现 $M_r$ 的频率</td><td>$\\omega_r$ 越大系统响应越快</td></tr>
            <tr><td class="font-medium">带宽 $\\omega_b$</td><td>$|T(j\\omega)|$ 降到 $\\frac{1}{\\sqrt{2}}$（-3dB）的频率</td><td>带宽越大系统越快，但抗高频噪声越差</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">开环频域指标 ↔ 闭环时域指标（经验公式）</h4>
        <div class="formula-block">
          <strong>相位裕度 $\\gamma$ 与超调量 $\\sigma\\%$ 的近似关系</strong>（二阶系统精确，高阶系统近似）：<br><br>
          $\\sigma\\% \\approx 0.16 + 0.4(M_r - 1)$，其中 $M_r \\approx \\frac{1}{\\sin\\gamma}$<br><br>
          <strong>相位裕度 $\\gamma$ 与调节时间 $t_s$ 的近似关系</strong>：<br><br>
          $t_s \\approx \\frac{\\pi}{\\omega_{gc}}(2 + \\frac{1.5(M_r-1)}{\\sin\\gamma} + \\frac{M_r-1}{\\sin^2\\gamma})$
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>工程快速估算</strong>：$\\gamma=45° \\Rightarrow M_r \\approx 1.41 \\Rightarrow \\sigma\\% \\approx 20\\%$，$\\gamma=60° \\Rightarrow \\sigma\\% \\approx 7\\%$。记住"45° 对应 15%~20% 超调"这个经验锚点，足以应对大多数工程场景。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">闭环频域指标与时域指标的关系总结</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>频域指标</th><th>时域对应</th><th>趋势</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">$M_r$ 增大</td><td>超调 $\\sigma\\%$ 增大</td><td>$M_r=1$ 无超调，$M_r>1.5$ 振荡明显</td></tr>
            <tr><td class="font-medium">$\\omega_b$ 增大</td><td>调节时间 $t_s$ 减小</td><td>带宽越大系统越快</td></tr>
            <tr><td class="font-medium">$\\gamma$ 增大</td><td>超调减小但响应变慢</td><td>与 <a href="#" onclick="navigateTo('act-05');return false;" style="color:var(--primary)">时域分析</a> 中 $\\zeta$ 增大的效果一致</td></tr>
            <tr><td class="font-medium">$G_m$ 增大</td><td>系统更稳定</td><td>幅值裕度是稳定性的"余量"</td></tr>
          </tbody>
        </table></div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>这些公式是近似的</strong>：精确关系只在二阶系统成立。高阶系统中，$M_r \\approx 1/\\sin\\gamma$ 和 $\\sigma\\% \\approx 0.16+0.4(M_r-1)$ 都是经验近似，误差可达 5%~10%。工程中更常用查表法（上表）而非精确公式。</div>
        </div>
      ` },
      { id: 'act-12', title: '系统校正', desc: '超前/滞后/滞后-超前/PID', icon: '🔧', tags: ['工程核心'], goals: { eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">校正：让不满足性能指标的系统达标</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          前面的分析告诉我们系统"现在怎样"，校正设计告诉我们"怎么改"。校正的本质是在系统中<strong>加入额外的控制器</strong>，修改开环频率特性，使闭环满足稳定性、快速性、精度等指标。本节重点掌握超前/滞后校正的原理和设计步骤，以及 PID 控制器的频域理解。
        </p>

        <h4 class="font-medium mt-6 mb-2">三种校正方式</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>校正方式</th><th>作用</th><th>频率特性</th><th>典型应用</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">串联校正</td><td>在前向通道加校正装置 $G_c(s)$</td><td>修改开环频率响应</td><td>最常用，设计灵活</td></tr>
            <tr><td class="font-medium">反馈校正</td><td>在局部回路加反馈</td><td>改变局部特性</td><td>内环控制（电流环/速度环）</td></tr>
            <tr><td class="font-medium">前馈校正</td><td>在输入端加补偿</td><td>不改变闭环极点</td><td>提高跟踪精度、补偿干扰</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">超前校正（Lead Compensation）</h4>
        <div class="formula-block">
          $G_c(s) = K_c \\cdot \\frac{\\alpha Ts + 1}{Ts + 1}$，其中 $\\alpha > 1$
          <div class="text-sm text-gray-500 mt-2">零点在极点左侧（$-1/(\\alpha T)$ vs $-1/T$），提供正相位（超前角）</div>
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>作用</strong>：增加相位裕度，改善稳定性，减小超调</li>
          <li><strong>适用场景</strong>：系统稳定但相位裕度不足（超调过大）</li>
          <li><strong>代价</strong>：增大带宽（响应更快但抗高频噪声变差）</li>
        </ul>
        <div class="step-list">
          <div class="step-item"><div><strong>确定期望相位裕度</strong>：根据性能指标（如 $\\gamma_{new}=45°$），计算需要补充的相位 $\\phi_m=\\gamma_{new}-\\gamma_{old}+5°\\sim 10°$（留余量）。</div></div>
          <div class="step-item"><div><strong>计算 $\\alpha$</strong>：$\\alpha=\\frac{1+\\sin\\phi_m}{1-\\sin\\phi_m}$。</div></div>
          <div class="step-item"><div><strong>确定校正网络频率</strong>：将最大超前角频率设在新的增益穿越频率处，使校正效果最大化。</div></div>
          <div class="step-item"><div><strong>验证</strong>：重新画伯德图，检查新的 $\\gamma$ 和 $G_m$ 是否满足要求。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">滞后校正（Lag Compensation）</h4>
        <div class="formula-block">
          $G_c(s) = K_c \\cdot \\frac{Ts + 1}{\\beta Ts + 1}$，其中 $\\beta > 1$
          <div class="text-sm text-gray-500 mt-2">极点在零点右侧，提供负相位（滞后角），但设计在低频段使其不影响穿越频率处的相位</div>
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>作用</strong>：提高低频增益（改善稳态精度），不显著改变相位裕度</li>
          <li><strong>适用场景</strong>：系统稳定性足够但精度不足（稳态误差大）</li>
          <li><strong>代价</strong>：降低带宽（响应变慢）</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">PID 控制器的频域理解</h4>
        <div class="formula-block">
          $G_c(s) = K_p + \\frac{K_i}{s} + K_d s = K_p(1 + \\frac{1}{T_i s} + T_d s)$
          <div class="text-sm text-gray-500 mt-2">$K_p$=比例增益，$K_i$=积分增益，$K_d$=微分增益，$T_i=K_p/K_i$=积分时间，$T_d=K_d/K_p$=微分时间</div>
        </div>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>PID 项</th><th>频域作用</th><th>时域效果</th><th>工程角色</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">P（比例）</td><td>整体抬高增益</td><td>加快响应、减小误差</td><td>基本控制作用</td></tr>
            <tr><td class="font-medium">I（积分）</td><td>低频段增加 +20dB/dec 斜率</td><td>消除稳态误差</td><td>相当于滞后校正（提高低频增益）</td></tr>
            <tr><td class="font-medium">D（微分）</td><td>高频段增加 +20dB/dec 斜率</td><td>预测趋势、抑制超调</td><td>相当于超前校正（增加相位裕度）</td></tr>
          </tbody>
        </table></div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>PID 就是超前-滞后校正的工业版</strong>：I 项 = 滞后校正（提高低频增益→消除稳态误差），D 项 = 超前校正（增加相位裕度→改善稳定性）。理解了超前/滞后校正，就理解了 PID 调参的本质——调 $K_i$ 影响低频，调 $K_d$ 影响中高频，调 $K_p$ 影响全局。详见 <a href="#" onclick="navigateTo('act-14');return false;" style="color:var(--primary)">PID 整定工程实战</a>。</div>
        </div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>工程中最常见的校正方案</strong>：纯 P 控制有稳态误差，纯 I 控制响应慢且可能积分饱和，纯 D 控制对噪声敏感。工程中最常用的是 PI 控制（无 D 项）或 PID 控制。电机控制中电流环通常只用 PI（响应快、D 项放大噪声），速度环用完整 PID。</div>
        </div>
      ` },
      { id: 'act-13', title: '离散系统基础', desc: 'z 变换、脉冲传函、稳定性', icon: '⏱', tags: ['进阶'], goals: { eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">离散系统：数字控制的数学基础</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          现代控制系统大多用计算机（MCU/DSP）实现——传感器信号经 ADC 采样离散化，控制算法在离散时间域运算，输出经 DAC 或 PWM 驱动执行器。离散系统理论是连续系统理论在采样数据框架下的推广，z 变换对应拉氏变换，脉冲传递函数对应传递函数。
        </p>

        <h4 class="font-medium mt-6 mb-2">采样与保持</h4>
        <div class="formula-block">
          采样周期 $T_s$（采样频率 $f_s=1/T_s$），采样信号 $f^*(t) = \\sum_{n=0}^{\\infty} f(nT_s)\\delta(t-nT_s)$
          <div class="text-sm text-gray-500 mt-2">采样将连续信号变成脉冲序列，零阶保持器（ZOH）将脉冲"展宽"为阶梯信号</div>
        </div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>奈奎斯特采样定理</strong>：$f_s > 2f_{max}$（采样频率必须大于信号最高频率的 2 倍），否则发生频率混叠。工程中通常取 $f_s = (5\\sim 10)f_{max}$ 留足余量。对电机控制：速度环采样 1kHz~10kHz，电流环 10kHz~100kHz。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">z 变换</h4>
        <div class="formula-block">
          $F(z) = \\sum_{n=0}^{\\infty} f(nT_s) z^{-n}$，其中 $z = e^{sT_s}$
          <div class="text-sm text-gray-500 mt-2">$z$ 变换是离散系统的拉氏变换，$z^{-1}$ 对应"延迟一个采样周期"</div>
        </div>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>$f(nT_s)$（离散时域）</th><th>$F(z)$（z 域）</th><th>说明</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">$\\delta(n)$（单位脉冲）</td><td>$1$</td><td></td></tr>
            <tr><td class="font-medium">$1(n)$（单位阶跃）</td><td>$\\frac{z}{z-1}$</td><td>对应连续域 $1/s$</td></tr>
            <tr><td class="font-medium">$n$（单位斜坡）</td><td>$\\frac{z}{(z-1)^2}$</td><td>对应连续域 $1/s^2$</td></tr>
            <tr><td class="font-medium">$a^n$（指数）</td><td>$\\frac{z}{z-a}$</td><td>对应连续域 $1/(s-\\ln a)$</td></tr>
            <tr><td class="font-medium">$e^{-anT_s}$</td><td>$\\frac{z}{z-e^{-aT_s}}$</td><td>直接从 $e^{at}$ 离散化</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">脉冲传递函数</h4>
        <div class="formula-block">
          $G(z) = \\frac{Y(z)}{R(z)} = \\mathcal{Z}[G_h(s)G_p(s)]$
          <div class="text-sm text-gray-500 mt-2">含零阶保持器时，$G_h(s)=\\frac{1-e^{-sT_s}}{s}$，需与被控对象一起做 z 变换</div>
        </div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>工程实现</strong>：在 MCU 中，PID 控制器的 z 域实现就是"差分方程"——用当前和过去的采样值计算控制输出。z 变换的"延迟" $z^{-1}$ 在代码中就是"上一次的值"。详见 <a href="#" onclick="navigateTo('act-14');return false;" style="color:var(--primary)">PID 整定工程实战</a> 中的离散 PID 代码。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">离散系统的稳定性判据</h4>
        <div class="formula-block">
          <strong>z 域稳定条件</strong>：所有闭环极点必须在单位圆内（$|z_i|<1$）
          <div class="text-sm text-gray-500 mt-2">s 域左半平面 → z 域单位圆内；s 域虚轴 → z 域单位圆上；s 域右半平面 → z 域单位圆外</div>
        </div>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>连续域</th><th>离散域</th><th>系统状态</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">左半平面</td><td>单位圆内 $|z|<1$</td><td>稳定</td></tr>
            <tr><td class="font-medium">虚轴</td><td>单位圆上 $|z|=1$</td><td>临界稳定</td></tr>
            <tr><td class="font-medium">右半平面</td><td>单位圆外 $|z|>1$</td><td>不稳定</td></tr>
          </tbody>
        </table></div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>双线性变换</strong>（Tustin 变换）：$s=\\frac{2}{T_s}\\frac{z-1}{z+1}$，把连续域设计的控制器直接映射到离散域。工程中在 MATLAB/Simulink 里做连续域设计，然后用 Tustin 变换自动生成离散控制器代码。</div>
        </div>
      ` },
      { id: 'act-14', title: '工程实战：PID 整定', desc: 'Ziegler-Nichols、Cohen-Coon + STM32', icon: '💻', tags: ['工程'], goals: { eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">PID 整定：从理论到工程落地</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          <a href="#" onclick="navigateTo('act-12');return false;" style="color:var(--primary)">系统校正</a> 告诉我们 PID 的频域本质——P 抬增益、I 补低频、D 加超前。本节解决工程中最实际的问题：<strong>三个参数怎么确定？</strong>介绍 Ziegler-Nichols 和 Cohen-Coon 两大经典整定法，并给出 STM32 平台的离散 PID 代码实现。
        </p>

        <h4 class="font-medium mt-6 mb-2">Ziegler-Nichols 临界比例法（闭环整定）</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>第一步：纯 P 测试</strong>。去掉 I 和 D，只保留 P，从小到大增大 $K_p$，直到系统出现<strong>等幅持续振荡</strong>。记录此时的 $K_p=K_u$（临界增益）和振荡周期 $T_u$（临界周期）。</div></div>
          <div class="step-item"><div><strong>第二步：查表计算</strong>。根据 $K_u$ 和 $T_u$ 查 Ziegler-Nichols 表。</div></div>
          <div class="step-item"><div><strong>第三步：微调</strong>。Z-N 参数是初始值，实际需根据响应微调——通常先减小 $K_p$ 10%~20% 降低超调。</div></div>
        </div>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>控制器类型</th><th>$K_p$</th><th>$T_i$（积分时间）</th><th>$T_d$（微分时间）</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">P</td><td>$0.5K_u$</td><td>$\\infty$（无积分）</td><td>0</td></tr>
            <tr><td class="font-medium">PI</td><td>$0.45K_u$</td><td>$0.83T_u$</td><td>0</td></tr>
            <tr><td class="font-medium">PID</td><td>$0.6K_u$</td><td>$0.5T_u$</td><td>$0.125T_u$</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">Cohen-Coon 反应曲线法（开环整定）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          对被控对象做开环阶跃测试，记录<strong>反应曲线</strong>（S 形曲线），从中提取两个参数：
        </p>
        <div class="formula-block">
          $L$（延迟时间）：响应开始变化的时间（从阶跃施加到响应开始的延迟）<br>
          $T$（时间常数）：响应从开始变化到达到 63.2% 终值的时间<br>
          $R=L/T$（延迟比）
        </div>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>控制器类型</th><th>$K_p$</th><th>$T_i$</th><th>$T_d$</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">PI</td><td>$\\frac{1}{KR}(1+\\frac{0.35R}{1-R})$</td><td>$L\\frac{3.3-3R}{1+1.2R}$</td><td>0</td></tr>
            <tr><td class="font-medium">PID</td><td>$\\frac{1}{KR}(1+\\frac{0.35R}{1-R})$</td><td>$L\\frac{2.5-2R}{1-0.39R}$</td><td>$L\\frac{0.37-0.37R}{1-0.81R}$</td></tr>
          </tbody>
        </table></div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>Z-N vs Cohen-Coon 选型</strong>：Z-N 法需要闭环临界振荡（可能对设备有风险），适合实验室调试；Cohen-Coon 法用开环测试（更安全），适合现场整定。Cohen-Coon 的参数通常比 Z-N 更温和（超调更小），但对延迟比 $R>0.5$ 的大延迟系统效果差。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">离散 PID 代码实现（STM32 平台）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          MCU 中实现的是<strong>离散 PID</strong>——用差分方程代替微分方程，每次采样计算一次控制量。以下是位置式 PID 的典型实现：
        </p>
        <div class="code-block"><span class="code-comment">/**
 * 位置式 PID 控制器（离散实现）
 * @param setpoint  目标值
 * @param feedback  当前反馈值
 * @return          控制输出
 */</span>
<span class="code-keyword">typedef struct</span> {
    <span class="code-keyword">float</span> Kp, Ki, Kd;      <span class="code-comment">// PID 三个增益</span>
    <span class="code-keyword">float</span> integral;          <span class="code-comment">// 积分累积器</span>
    <span class="code-keyword">float</span> prev_error;        <span class="code-comment">// 上一次误差（微分用）</span>
    <span class="code-keyword">float</span> out_min, out_max;  <span class="code-comment">// 输出限幅</span>
} <span class="code-func">PID_t</span>;

<span class="code-keyword">float</span> <span class="code-func">PID_Update</span>(<span class="code-func">PID_t</span> *pid, <span class="code-keyword">float</span> setpoint, <span class="code-keyword">float</span> feedback) {
    <span class="code-keyword">float</span> error = setpoint - feedback;
    pid->integral += error;  <span class="code-comment">// 积分累加</span>
    <span class="code-comment">// 积分限幅（抗积分饱和）</span>
    <span class="code-keyword">if</span> (pid->integral > pid->out_max) pid->integral = pid->out_max;
    <span class="code-keyword">if</span> (pid->integral < pid->out_min) pid->integral = pid->out_min;
    <span class="code-keyword">float</span> derivative = error - pid->prev_error;  <span class="code-comment">// 微分（差分近似）</span>
    <span class="code-keyword">float</span> output = pid->Kp * error
                   + pid->Ki * pid->integral
                   + pid->Kd * derivative;
    <span class="code-comment">// 输出限幅</span>
    <span class="code-keyword">if</span> (output > pid->out_max) output = pid->out_max;
    <span class="code-keyword">if</span> (output < pid->out_min) output = pid->out_min;
    pid->prev_error = error;
    <span class="code-keyword">return</span> output;
}</div>

        <h4 class="font-medium mt-6 mb-2">增量式 PID（工程优选）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          增量式 PID 输出的是<strong>控制量的变化量</strong> $\\Delta u$，而非绝对值，天然抗积分饱和且掉电安全：
        </p>
        <div class="code-block"><span class="code-comment">// 增量式 PID：输出 Δu，调用方自行累加</span>
<span class="code-keyword">float</span> <span class="code-func">PID_Incremental</span>(<span class="code-func">PID_t</span> *pid, <span class="code-keyword">float</span> setpoint, <span class="code-keyword">float</span> feedback) {
    <span class="code-keyword">float</span> error = setpoint - feedback;
    <span class="code-keyword">float</span> delta_u = pid->Kp * (error - pid->prev_error)
                    + pid->Ki * error
                    + pid->Kd * (error - <span class="code-number">2</span>*pid->prev_error + pid->prev_error2);
    pid->prev_error2 = pid->prev_error;
    pid->prev_error = error;
    <span class="code-keyword">return</span> delta_u;  <span class="code-comment">// 调用方: u += delta_u</span>
}</div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>工程中的三个致命陷阱</strong>：①<strong>积分饱和</strong>——输出限幅后积分继续累积，导致大幅超调（代码中已加积分限幅）；②<strong>微分噪声</strong>——直接差分放大高频噪声，需加低通滤波（$\\alpha$ 滤波）；③<strong>采样周期不稳</strong>——PID 的 $K_i$/$K_d$ 与采样周期 $T_s$ 相关，$T_s$ 变化会导致参数漂移。建议在定时器中断中固定调用 PID。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">工程调参顺序（推荐）</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>先 P 后 I 再 D</strong>：先只加 P 到临界振荡，再加 I 消除稳态误差，最后加 D 抑制超调。</div></div>
          <div class="step-item"><div><strong>从小到大</strong>：$K_p$ 从 0.1 倍估计值开始，逐步增大；$K_i$ 从 $K_p/(10T_u)$ 开始；$K_d$ 从 $K_p \\cdot T_u/10$ 开始。</div></div>
          <div class="step-item"><div><strong>观察响应</strong>：每次调参后给阶跃输入，看超调、调节时间、稳态误差三项指标。</div></div>
          <div class="step-item"><div><strong>最终微调</strong>：超调大→减 $K_p$ 或加 $K_d$；稳态误差大→加 $K_i$；振荡→减所有参数。</div></div>
        </div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>参考资源</strong>：电机控制中 PID 整定的完整工程案例（含速度环/电流环双环调试、STM32 代码）可参考 <a href="#" onclick="navigateTo('act-05');return false;" style="color:var(--primary)">时域分析</a> 中的性能指标定义。实际项目中建议用 MATLAB/Simulink 先做仿真验证，再上板调试。</div>
        </div>
      ` },
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

  // ========== 自动控制 act-01~act-06 ==========
  'act-01': [
    {
      question: '闭环控制相比开环控制的核心优势是？',
      options: ['结构更简单', '能自动补偿干扰', '不会振荡', '成本更低'],
      answer: 1,
      explanation: '闭环控制通过反馈检测偏差并自动修正，能有效抑制干扰和模型不确定性带来的误差。代价是可能引入振荡甚至不稳定，这是自控理论要解决的核心矛盾。'
    },
    {
      question: '单位阶跃信号 $1(t)$ 的拉氏变换是？',
      options: ['$1$', '$\\frac{1}{s}$', '$\\frac{1}{s^2}$', '$s$'],
      answer: 1,
      explanation: '$\\mathcal{L}[1(t)] = \\int_0^{\\infty} e^{-st} dt = \\frac{1}{s}$。阶跃信号是最常用的测试信号，其拉氏变换 $1/s$ 会在后续传递函数分析中反复出现。'
    },
    {
      question: '调节时间 $t_s$ 的定义是？',
      options: ['响应首次达到终值的时间', '响应达到第一个峰值的时间', '响应进入并保持在终值±2%（或±5%）范围内的时间', '响应从10%到90%的时间'],
      answer: 2,
      explanation: '$t_s$ 是衡量系统快速性的关键指标——它定义的是响应"稳定下来"的时间，而非"到达"的时间。工程中常用2%或5%误差带，对应不同公式（$4/\\zeta\\omega_n$ 或 $3/\\zeta\\omega_n$）。'
    },
    {
      question: '快速性和平稳性的关系是？',
      options: ['互不影响', '快速性越好平稳性也越好', '二者是矛盾的，需要权衡', '只有二阶系统才有此矛盾'],
      answer: 2,
      explanation: '提高增益可加快响应（更小的 $t_s$），但超调量 $\\sigma\\%$ 也会增大，甚至可能导致不稳定。工程设计必须在两者之间寻找平衡点，这就是PID参数整定要解决的问题。'
    },
    {
      question: '以下哪个是典型的闭环控制系统？',
      options: ['洗衣机定时程序', '步进电机开环驱动', '空调恒温控制', '交通灯定时切换'],
      answer: 2,
      explanation: '空调恒温通过温度传感器反馈实际温度，与设定温度比较后调整压缩机功率，是典型的负反馈闭环控制。洗衣机定时和交通灯是开环（定时器驱动），步进电机开环不带反馈。'
    },
    {
      question: '闭环传递函数 $T(s)=\\frac{G}{1+GH}$ 中，分母 $1+GH$ 的物理意义是？',
      options: ['输入信号', '开环传递函数+1', '误差信号的拉氏变换', '干扰信号'],
      answer: 1,
      explanation: '$GH$ 是开环传递函数（环路一圈），$1+GH$ 是闭环系统的特征多项式。$1+GH=0$ 的根就是闭环极点，决定系统稳定性。后续的奈奎斯特判据、根轨迹都是围绕 $1+GH$ 展开的。'
    },
  ],

  'act-02': [
    {
      question: '建立控制系统数学模型的一般步骤是？',
      options: ['先画结构图再列方程', '先列物理方程再消去中间变量', '先求传递函数再列方程', '先做实验再拟合'],
      answer: 1,
      explanation: '标准步骤：①确定输入输出→②根据物理定律列方程→③消去中间变量→④标准化。结构图是在得到传递函数之后才画的，实验拟合是系统辨识方法而非建模方法。'
    },
    {
      question: '小偏差线性化的本质是？',
      options: ['忽略所有非线性项', '在工作点附近用泰勒一阶展开近似', '把非线性方程直接变成线性方程', '用数值方法求解'],
      answer: 1,
      explanation: '小偏差线性化就是泰勒展开取一阶项：$f(x) \\approx f(x_0) + f\'(x_0)(x-x_0)$。在工作点 $x_0$ 附近，非线性关系近似为线性比例关系。局限是只在小范围内有效，大幅偏离时结果不可靠。'
    },
    {
      question: '弹簧-阻尼-质量系统 $m\\ddot{x}+b\\dot{x}+kx=f(t)$ 中，哪一项代表惯性？',
      options: ['$m\\ddot{x}$', '$b\\dot{x}$', '$kx$', '$f(t)$'],
      answer: 0,
      explanation: '$m\\ddot{x}$ 是惯性力（质量×加速度），$b\\dot{x}$ 是阻尼力（阻尼×速度），$kx$ 是弹性力（刚度×位移）。这三项分别对应系统的惯性、阻尼、弹性，是二阶系统的三个基本参数。'
    },
    {
      question: 'RC 电路与弹簧-阻尼系统的类比关系是？',
      options: ['m↔R, b↔L, k↔C', 'm↔L, b↔R, k↔1/C', 'm↔C, b↔R, k↔L', '无类比关系'],
      answer: 1,
      explanation: '力-电压类比：质量m↔电感L（储能元件），阻尼b↔电阻R（耗能元件），弹簧刚度k↔电容倒数1/C（储能元件）。这种类比使得一个领域的解法可以直接搬到另一个领域。'
    },
    {
      question: '传递函数的定义前提是？',
      options: ['系统必须是非线性的', '必须是零初始条件', '输入必须是阶跃信号', '系统必须是一阶的'],
      answer: 1,
      explanation: '传递函数定义为零初始条件下输出与输入的拉氏变换之比。非零初始条件时，拉氏变换会出现初始条件项（如 $sf(0)$），传递函数就不能完整描述系统行为。这也是为什么传递函数只描述系统本身的动态特性。'
    },
    {
      question: '传递函数 $G(s)=\\frac{s+2}{(s+1)(s+3)}$ 的零点和极点分别是？',
      options: ['零点：-1, -3；极点：-2', '零点：-2；极点：-1, -3', '零点：1, 3；极点：2', '零点：2；极点：1, 3'],
      answer: 1,
      explanation: '零点是使分子为零的s值：$s+2=0 \\Rightarrow s=-2$。极点是使分母为零的s值：$(s+1)(s+3)=0 \\Rightarrow s=-1, s=-3$。所有极点都在左半平面，系统稳定。零点和极点的位置决定了系统的动态特性。'
    },
  ],

  'act-03': [
    {
      question: '拉氏变换的微分性质 $\\mathcal{L}[f\'(t)]$ 在零初始条件下等于？',
      options: ['$F(s)$', '$sF(s)$', '$\\frac{F(s)}{s}$', '$s^2F(s)$'],
      answer: 1,
      explanation: '零初始条件下 $\\mathcal{L}[f\'(t)] = sF(s) - f(0) = sF(s)$。微分变成了乘s，这就是传递函数能把微分方程变成代数方程的关键——$s$ 就是拉氏域的"微分算子"。'
    },
    {
      question: '$e^{-2t}$ 的拉氏变换是？',
      options: ['$\\frac{1}{s+2}$', '$\\frac{1}{s-2}$', '$\\frac{2}{s}$', '$\\frac{1}{s^2+4}$'],
      answer: 0,
      explanation: '利用变换对 $\\mathcal{L}[e^{at}] = \\frac{1}{s-a}$，令 $a=-2$：$\\mathcal{L}[e^{-2t}] = \\frac{1}{s-(-2)} = \\frac{1}{s+2}$。极点在 $s=-2$（左半平面），对应衰减的指数响应。'
    },
    {
      question: '传递函数 $G(s)=\\frac{K}{Ts+1}$ 中，K 和 T 的物理意义分别是？',
      options: ['K是时间常数，T是增益', 'K是增益（静态放大倍数），T是时间常数', 'K和T都是增益', 'K是频率，T是阻尼'],
      answer: 1,
      explanation: 'K是增益：$G(0)=K$，即稳态时输出/输入的比值。T是时间常数：决定响应速度，T越大响应越慢。对RC电路：K=1，T=RC。对电机：K=1/Kv（速度常数），T=机械时间常数。'
    },
    {
      question: '传递函数的极点位于右半平面时，系统响应会？',
      options: ['收敛到稳态值', '等幅振荡', '发散（不稳定）', '收敛到零'],
      answer: 2,
      explanation: '右半平面极点对应 $e^{at}$（$a>0$）的响应分量，随时间指数增长，系统发散。左半平面对应衰减（稳定），虚轴上对应等幅振荡（临界稳定）。稳定性判别的本质就是看极点位置。'
    },
    {
      question: 'RC 低通滤波器的传递函数 $G(s)=\\frac{1}{RCs+1}$，若 R=1kΩ，C=1μF，则时间常数 T 和截止频率分别是？',
      options: ['T=1s, 截止频率=1Hz', 'T=1ms, 截止频率≈159Hz', 'T=0.001s, 截止频率=1000Hz', 'T=1μs, 截止频率=1MHz'],
      answer: 1,
      explanation: 'T=RC=1000×10⁻⁶=0.001s=1ms。截止频率 $f_c=\\frac{1}{2\\pi T}=\\frac{1}{2\\pi \\times 0.001} \\approx 159$ Hz。T 越大截止频率越低，滤波效果越强但响应越慢。'
    },
    {
      question: '以下哪个拉氏变换对是错误的？',
      options: ['$\\mathcal{L}[\\delta(t)]=1$', '$\\mathcal{L}[t]=\\frac{1}{s^2}$', '$\\mathcal{L}[\\sin(\\omega t)]=\\frac{s}{s^2+\\omega^2}$', '$\\mathcal{L}[e^{at}]=\\frac{1}{s-a}$'],
      answer: 2,
      explanation: '错误项应为 $\\mathcal{L}[\\sin(\\omega t)]=\\frac{\\omega}{s^2+\\omega^2}$（分子是 $\\omega$ 不是 $s$）。$\\frac{s}{s^2+\\omega^2}$ 是 $\\cos(\\omega t)$ 的变换。这是最常见的记忆混淆点。'
    },
  ],

  'act-04': [
    {
      question: '两个子系统 $G_1$ 和 $G_2$ 串联后的等效传递函数是？',
      options: ['$G_1+G_2$', '$G_1 \\cdot G_2$', '$\\frac{G_1}{1+G_1G_2}$', '$\\frac{G_1G_2}{G_1+G_2}$'],
      answer: 1,
      explanation: '串联：前一个的输出是后一个的输入，$Y=G_2(G_1 R)=G_1G_2 R$，所以等效传函为 $G_1G_2$。并联才是 $G_1+G_2$，反馈才是 $\\frac{G}{1+GH}$。'
    },
    {
      question: '负反馈闭环传递函数 $\\frac{G}{1+GH}$ 中，若 H=1（单位反馈），则传递函数为？',
      options: ['$\\frac{G}{1+G}$', '$G$', '$\\frac{1}{1+G}$', '$\\frac{G}{G-1}$'],
      answer: 0,
      explanation: '单位反馈时 H=1，$T=\\frac{G}{1+G}$。这是最常见的反馈形式——传感器增益为1（直接反馈输出量）。$1+G$ 的根就是闭环极点。'
    },
    {
      question: '梅逊公式中，特征式 $\\Delta$ 的表达式是？',
      options: ['$\\Delta = 1 + \\sum L_i$', '$\\Delta = 1 - \\sum L_i + \\sum L_iL_j - \\cdots$', '$\\Delta = \\prod L_i$', '$\\Delta = \\sum P_k$'],
      answer: 1,
      explanation: '$\\Delta = 1 - \\sum L_i + \\sum L_iL_j - \\cdots$，其中 $L_i$ 是各回路增益，$L_iL_j$ 是不接触回路两两乘积。注意符号交替：减单独回路，加不接触回路乘积，减三三乘积……'
    },
    {
      question: '在梅逊公式中，"不接触回路"指的是？',
      options: ['增益符号相反的回路', '没有公共节点的回路', '增益大小不同的回路', '位于不同前向通路上的回路'],
      answer: 1,
      explanation: '不接触回路是指两个回路在信号流图上没有公共节点（互不经过）。只有不接触回路的乘积才出现在 $\\Delta$ 中。如果两个回路有公共节点，它们是"接触"的，不计入乘积项。'
    },
    {
      question: '结构图等效变换的基本原则是？',
      options: ['变换前后开环传递函数不变', '变换前后所有输入输出关系不变', '变换前后闭环极点不变', '变换前后增益不变'],
      answer: 1,
      explanation: '等效变换的核心原则：变换前后，系统中任意两点之间的输入输出关系不能改变。只要满足这个条件，任何合法的变换都是允许的。这保证了化简过程不改变系统的本质特性。'
    },
    {
      question: '对于内环反馈 $G_2$ 和外环反馈 $G_1$ 的双闭环系统，化简顺序应该是？',
      options: ['先化简外环再化简内环', '先化简内环再化简外环', '内外环同时化简', '顺序无所谓'],
      answer: 1,
      explanation: '双闭环系统应先化简内环（得到内环等效传函），再将结果代入外环化简。这是因为内环的等效传函是外环分析的基础——外环看到的是内环化简后的等效系统，而非内环内部的细节。'
    },
  ],

  'act-05': [
    {
      question: '一阶系统 $G(s)=\\frac{1}{Ts+1}$ 的阶跃响应是？',
      options: ['$e^{-t/T}$', '$1-e^{-t/T}$', '$Te^{-t/T}$', '$\\frac{1}{T}(1-e^{-t/T})$'],
      answer: 1,
      explanation: '阶跃输入 $R(s)=1/s$，$Y(s)=\\frac{1}{s(Ts+1)}$，部分分式展开后反拉氏变换得 $y(t)=1-e^{-t/T}$。t=T 时 y=0.632，t=3T 时 y=0.95，t=5T 时 y≈1。'
    },
    {
      question: '二阶欠阻尼系统的超调量 $\\sigma\\%$ 只与哪个参数有关？',
      options: ['$\\omega_n$（自然频率）', '$\\zeta$（阻尼比）', '$\\zeta$ 和 $\\omega_n$ 的乘积', '增益 K'],
      answer: 1,
      explanation: '$\\sigma\\% = e^{-\\pi\\zeta/\\sqrt{1-\\zeta^2}} \\times 100\\%$，只与 $\\zeta$ 有关。$\\zeta$ 越大超调越小：$\\zeta=0.4$ 时超调25%，$\\zeta=0.707$ 时超调4.3%，$\\zeta=1$ 时无超调。$\\omega_n$ 影响的是响应速度而非超调。'
    },
    {
      question: '工程中常用的"最佳阻尼比" $\\zeta=0.707$ 对应的超调量约为？',
      options: ['0%', '4.3%', '16.3%', '25%'],
      answer: 1,
      explanation: '代入公式：$\\sigma\\% = e^{-\\pi \\times 0.707 / \\sqrt{1-0.5}} = e^{-\\pi} \\approx 4.3\\%$。$\\zeta=0.707$（即 $\\frac{\\sqrt{2}}{2}$）是工程中"二阶最佳"的典型取值，超调小且响应较快。很多PID整定方法默认以此为目标。'
    },
    {
      question: '调节时间 $t_s \\approx \\frac{4}{\\zeta\\omega_n}$（2%误差带）说明什么？',
      options: ['$\\zeta$ 越大 $t_s$ 越小', '$\\omega_n$ 越大 $t_s$ 越小', '$\\zeta\\omega_n$ 乘积越大 $t_s$ 越小', '$t_s$ 与参数无关'],
      answer: 2,
      explanation: '$t_s$ 与 $\\zeta\\omega_n$ 成反比——$\\zeta\\omega_n$ 越大，系统收敛越快。但不能只追求大的 $\\zeta\\omega_n$：增大 $\\omega_n$ 需要更大增益（可能饱和），增大 $\\zeta$ 会让响应变慢（过阻尼）。工程设计是在约束条件下找最优的 $\\zeta\\omega_n$ 组合。'
    },
    {
      question: '一阶系统 $G(s)=\\frac{1}{2s+1}$ 的调节时间（2%误差带）约为？',
      options: ['2s', '4s', '6s', '8s'],
      answer: 3,
      explanation: 'T=2s，$t_s \\approx 4T = 8$s。一阶系统的调节时间公式：5%误差带 $t_s=3T$，2%误差带 $t_s=4T$。记住"3T/4T"口诀即可。'
    },
    {
      question: '高阶系统可以用"主导极点"近似为二阶系统的条件是？',
      options: ['所有极点都在左半平面', '有一对共轭复极点比其他极点更靠近虚轴且距离5倍以上', '系统是稳定的', '系统没有零点'],
      answer: 1,
      explanation: '主导极点法的核心：如果某对共轭复极点的实部绝对值最小（最靠近虚轴），且与其他极点的距离超过5倍，则这对极点主导系统响应，可近似为二阶系统。5倍是工程经验值——更远的极点影响衰减很快。'
    },
  ],

  'act-06': [
    {
      question: '系统稳定的充要条件（极点判据）是？',
      options: ['所有极点在右半平面', '所有极点在左半平面', '所有极点在虚轴上', '没有极点'],
      answer: 1,
      explanation: '所有闭环极点必须位于s平面左半平面（实部为负）。左半平面极点对应衰减响应（$e^{-at}$），右半平面对应发散响应（$e^{at}$），虚轴上对应临界状态（等幅振荡，一般视为不稳定）。'
    },
    {
      question: '特征方程 $s^3+2s^2+3s+4=0$ 中，系数检查的结果是？',
      options: ['系数齐全同号，可能稳定', '缺少某次幂项，一定不稳定', '系数异号，一定不稳定', '无法判断'],
      answer: 0,
      explanation: '系数 1, 2, 3, 4 全为正且同号，无缺失项——通过了第一关检查。但这只是必要条件，还需用劳斯表进一步确认。如果系数有负数或缺失项，则直接判定不稳定。'
    },
    {
      question: '劳斯表第一列符号变化2次说明什么？',
      options: ['系统稳定', '有2个右半平面极点', '有2个虚轴极点', '有2个左半平面极点'],
      answer: 1,
      explanation: '劳斯判据的核心结论：第一列符号变化次数 = 右半平面极点个数。变化2次说明有2个右半平面极点，系统不稳定。0次变化则所有极点都在左半平面，系统稳定。'
    },
    {
      question: '三阶系统 $a_3s^3+a_2s^2+a_1s+a_0=0$ 稳定的充要条件是？',
      options: ['所有系数同号', '所有系数同号且 $a_2a_1 > a_3a_0$', '所有系数同号且 $a_2a_1 < a_3a_0$', '$a_3 > 0$'],
      answer: 1,
      explanation: '三阶系统的劳斯表：$s^3$: $a_3, a_1$；$s^2$: $a_2, a_0$；$s^1$: $(a_2a_1-a_3a_0)/a_2$；$s^0$: $a_0$。第一列无符号变化的条件是：所有系数同号（$a_3a_2a_1a_0>0$）且 $a_2a_1>a_3a_0$。'
    },
    {
      question: '劳斯表某行首元素为0、其余不为0时，应如何处理？',
      options: ['直接判定不稳定', '用小正数 $\\varepsilon$ 替代0继续计算', '删掉该行继续', '重新列方程'],
      answer: 1,
      explanation: '用一个小正数 $\\varepsilon$ 替代0，继续计算后续行。最后令 $\\varepsilon \\to 0^+$，观察第一列符号变化。如果 $\\varepsilon$ 上下符号相反，则有一次符号变化（一个右半平面极点）。'
    },
    {
      question: '劳斯表出现整行为0时，说明什么？',
      options: ['计算错误', '特征方程有对称分布的根（如纯虚根或对称实根）', '系统一定不稳定', '系统一定稳定'],
      answer: 1,
      explanation: '整行为0说明特征方程有特殊的对称结构——可能存在纯虚根（在虚轴上）或关于原点对称的实根。处理方法：用上一行系数构造辅助方程，求导后用导数系数替代全零行。辅助方程的根就是特征方程的一部分根。'
    },
    {
      question: '赫尔维茨判据与劳斯判据的关系是？',
      options: ['完全不同的方法', '完全等价（可互相推导）', '赫尔维茨更准确', '劳斯只适用于低阶系统'],
      answer: 1,
      explanation: '两种判据数学上完全等价——都可以从特征方程系数推导出稳定性条件。劳斯用表格形式，赫尔维茨用行列式形式。工程中劳斯表更常用，因为表格计算比行列式展开更直观、更不容易出错。'
    },
  ],

  // ========== 自动控制 act-07~act-14 ==========
  'act-07': [
    {
      question: 'I 型系统对阶跃输入的稳态误差是？',
      options: ['$\\frac{1}{1+K_p}$', '0', '$\\frac{1}{K_v}$', '$\\infty$'],
      answer: 1,
      explanation: 'I 型系统（开环传函含 1 个积分环节）对阶跃输入无稳态误差。这是 I 型系统最重要的特性——含积分环节就能消除阶跃误差。0 型系统对阶跃有差，II 型系统对斜坡无差。'
    },
    {
      question: '系统型别由什么决定？',
      options: ['闭环极点个数', '开环传函中积分环节的个数', '开环增益 K 的大小', '闭环零点个数'],
      answer: 1,
      explanation: '系统型别 = 开环传函 $G(s)H(s)$ 中 $s^\\nu$ 的 $\\nu$ 值。$\\nu=0$ 是 0 型，$\\nu=1$ 是 I 型，$\\nu=2$ 是 II 型。型别越高精度越高，但稳定性越差。'
    },
    {
      question: '速度误差系数 $K_v$ 的定义是？',
      options: ['$K_v = \\lim_{s\\to 0}G(s)H(s)$', '$K_v = \\lim_{s\\to 0}sG(s)H(s)$', '$K_v = \\lim_{s\\to 0}s^2G(s)H(s)$', '$K_v = G(0)H(0)$'],
      answer: 1,
      explanation: '$K_v = \\lim_{s\\to 0}sG(s)H(s)$。三个误差系数分别是：$K_p=\\lim G(s)H(s)$（位置），$K_v=\\lim sG(s)H(s)$（速度），$K_a=\\lim s^2G(s)H(s)$（加速度）。注意 s 的幂次递增。'
    },
    {
      question: 'II 型系统对斜坡输入的稳态误差是？',
      options: ['$\\frac{1}{K_v}$', '0', '$\\frac{1}{K_a}$', '$\\infty$'],
      answer: 1,
      explanation: 'II 型系统（2 个积分环节）对斜坡输入无稳态误差。型别数 = 能无差跟踪的输入信号阶数 - 1：I 型无差跟踪阶跃（0 阶），II 型无差跟踪斜坡（1 阶）。'
    },
    {
      question: '为什么工程中很少用 II 型系统？',
      options: ['精度不够', '两个积分环节使相位滞后-180°，极易不稳定', '计算太复杂', '成本太高'],
      answer: 1,
      explanation: '每个积分环节贡献 -90° 相位滞后，两个就是 -180°。到达 -180° 时若增益还大于 1，闭环就不稳定了。II 型系统需要精心设计才能稳定，工程中更常用 I 型 + 高增益来兼顾精度和稳定性。'
    },
    {
      question: '增大开环增益 K 对稳态误差和稳定性的影响分别是？',
      options: ['误差减小，稳定性变好', '误差减小，稳定性变差', '误差增大，稳定性变好', '无影响'],
      answer: 1,
      explanation: 'K 增大 → 误差系数增大 → 稳态误差减小（精度提高）。但 K 增大也使增益裕度减小 → 离不稳定更近。这就是"精度与稳定性的矛盾"——PID 整定的核心就是在两者之间找平衡。'
    },
  ],

  'act-08': [
    {
      question: '180° 根轨迹的起点和终点分别是？',
      options: ['起点=开环零点，终点=开环极点', '起点=开环极点，终点=开环零点或∞', '起点=原点，终点=∞', '起点=∞，终点=原点'],
      answer: 1,
      explanation: 'K=0 时闭环极点=开环极点（根轨迹从极点出发），K→∞ 时闭环极点趋向开环零点或无穷远。这是根轨迹最基本的事实。'
    },
    {
      question: '实轴上某点在根轨迹上的条件是？',
      options: ['右侧零极点总数为偶数', '右侧零极点总数为奇数', '左侧零极点总数为奇数', '该点是开环极点'],
      answer: 1,
      explanation: '180° 根轨迹的实轴判断法则：某点右侧的开环零极点总数为奇数，则该点在根轨迹上。0° 根轨迹则要求偶数个。这是画根轨迹时最常用的快速判据。'
    },
    {
      question: '根轨迹的渐近线交于实轴的点 $\\sigma_a$ 是？',
      options: ['$\\sigma_a = \\frac{\\sum z_i - \\sum p_i}{n-m}$', '$\\sigma_a = \\frac{\\sum p_i - \\sum z_i}{n-m}$', '$\\sigma_a = \\frac{\\sum p_i + \\sum z_i}{n-m}$', '$\\sigma_a = 0$'],
      answer: 1,
      explanation: '$\\sigma_a = \\frac{\\sum p_i - \\sum z_i}{n-m}$，其中 $p_i$ 是开环极点，$z_i$ 是开环零点，$n$ 是极点数，$m$ 是零点数。渐近线从这个点向外辐射，角度为 $\\frac{(2k+1)\\times 180°}{n-m}$。'
    },
    {
      question: '分离点的求法是？',
      options: ['解 $G(s)=0$', '解 $\\frac{dK}{ds}=0$', '解特征方程', '令 $s=j\\omega$'],
      answer: 1,
      explanation: '分离点是根轨迹在实轴上分叉或合并的点。从特征方程 $K=-1/G(s)$ 出发，令 $\\frac{dK}{ds}=0$ 求解。注意要检验解是否在根轨迹上（右侧奇数个零极点）。'
    },
    {
      question: '根轨迹与虚轴的交点用什么方法求？',
      options: ['令 $s=0$', '用劳斯表或令 $s=j\\omega$ 代入特征方程', '求渐近线', '计算出射角'],
      answer: 1,
      explanation: '两种方法：①列劳斯表，找某行首元素为 0 时的 K 值，再用辅助方程求 $\\omega$；②直接令 $s=j\\omega$ 代入特征方程，分离实部虚部联立求解。方法①更系统，方法②更直观。'
    },
    {
      question: '开环传函 $G(s)=\\frac{K}{s(s+1)}$ 的根轨迹有几条渐近线？',
      options: ['0 条', '1 条', '2 条', '3 条'],
      answer: 2,
      explanation: '极点数 n=2（$p_1=0, p_2=-1$），零点数 m=0，渐近线数 = n-m = 2 条。角度为 90° 和 270°（即沿虚轴上下延伸），交于 $\\sigma_a=-0.5$。两条渐近线意味着根轨迹最终沿虚轴方向趋向无穷。'
    },
  ],

  'act-09': [
    {
      question: '伯德图的横坐标和纵坐标分别是什么？',
      options: ['$\\omega$ 和 $|G|$', '$\\log\\omega$ 和 $20\\log|G|$ (dB)', '实部和虚部', '频率和相位'],
      answer: 1,
      explanation: '伯德图幅频特性：横轴 $\\log\\omega$（对数频率），纵轴 $20\\log|G(j\\omega)|$ dB（分贝）。对数坐标使得各环节的渐近线都是直线，便于手工绘制。相频特性横轴同，纵轴是角度。'
    },
    {
      question: '积分环节 $\\frac{1}{s}$ 的伯德图幅频渐近线斜率是？',
      options: ['0 dB/dec', '-20 dB/dec', '+20 dB/dec', '-40 dB/dec'],
      answer: 1,
      explanation: '$|1/(j\\omega)|=1/\\omega$，$20\\log(1/\\omega)=-20\\log\\omega$，斜率 -20 dB/dec。每增加 10 倍频（dec），幅值下降 20dB。同理 $1/s^2$ 斜率 -40 dB/dec。'
    },
    {
      question: '惯性环节 $\\frac{1}{Ts+1}$ 的转折频率是？',
      options: ['$\\omega=T$', '$\\omega=1/T$', '$\\omega=\\sqrt{T}$', '$\\omega=1/\\sqrt{T}$'],
      answer: 1,
      explanation: '转折频率 $\\omega_c=1/T$。低于转折频率时幅频为 0dB（增益≈1），高于转折频率时斜率 -20dB/dec。转折频率处实际值比渐近线低 3dB。'
    },
    {
      question: '奈奎斯特图与伯德图的关系是？',
      options: ['完全不同的图', '伯德图是奈奎斯特图的"拆开版"（幅值和相位分开画）', '奈奎斯特图更详细', '伯德图只能画一阶系统'],
      answer: 1,
      explanation: '奈奎斯特图是 $G(j\\omega)$ 在复平面上的曲线（一张图），伯德图把同一个信息拆成幅频和相频两张图。伯德图更直观易画（渐近线近似），工程中最常用；奈奎斯特图更紧凑，是奈奎斯特稳定判据的基础。'
    },
    {
      question: '系统 $G(s)=\\frac{10}{s(0.1s+1)}$ 的低频段斜率是？',
      options: ['0 dB/dec', '-20 dB/dec', '-40 dB/dec', '+20 dB/dec'],
      answer: 1,
      explanation: '分解：K=10（+20dB 水平线），$1/s$（-20dB/dec），$1/(0.1s+1)$（转折频率 10rad/s 后 -20dB/dec）。低频段只受积分环节影响，斜率 -20dB/dec。在 $\\omega=10$ 处叠加惯性环节后变 -40dB/dec。'
    },
    {
      question: '伯德图中"带宽"的定义是？',
      options: ['幅频曲线穿越 0dB 的频率', '闭环幅频降到 -3dB 的频率', '相频降到 -90° 的频率', '幅频开始下降的频率'],
      answer: 1,
      explanation: '带宽 $\\omega_b$ 是闭环频率响应 $|T(j\\omega)|$ 降到 $1/\\sqrt{2}$（-3dB）的频率。带宽越大系统越快（能响应更高频率的信号），但抗高频噪声越差。注意带宽是闭环指标，穿越频率是开环指标。'
    },
  ],

  'act-10': [
    {
      question: '奈奎斯特判据中，闭环右半平面极点数 $Z$ 的计算公式是？',
      options: ['$Z=N$', '$Z=P-N$', '$Z=N-P$', '$Z=P+N$'],
      answer: 1,
      explanation: '$Z=P-N$，其中 P 是开环右半平面极点数，N 是奈奎斯特曲线绕 $(-1,j0)$ 逆时针圈数。稳定条件 $Z=0$ 即 $N=P$。开环稳定时 P=0，简化为 N=0（不绕 $(-1,j0)$ 点）。'
    },
    {
      question: '相位裕度 $\\gamma$ 的定义是？',
      options: ['$\\gamma = 180° + \\angle G(j\\omega_{gc})$', '$\\gamma = \\angle G(j\\omega_{gc})$', '$\\gamma = 180° - \\angle G(j\\omega_{gc})$', '$\\gamma = |G(j\\omega_{gc})|$'],
      answer: 0,
      explanation: '在增益穿越频率 $\\omega_{gc}$（$|G(j\\omega_{gc})|=1$ 即 0dB）处，相位裕度 $\\gamma=180°+\\angle G(j\\omega_{gc})$。若 $\\angle G=-135°$，则 $\\gamma=45°$。$\\gamma>0$ 表示还有余量，$\\gamma<0$ 表示已经不稳定。'
    },
    {
      question: '工程中推荐的相位裕度范围是？',
      options: ['$5°\\sim 15°$', '$30°\\sim 60°$', '$70°\\sim 90°$', '$120°\\sim 150°$'],
      answer: 1,
      explanation: '$\\gamma=30°\\sim 60°$ 是工程最佳范围。$\\gamma=45°$ 时超调约 16%，快速且平稳；$\\gamma<30°$ 超调过大甚至不稳定；$\\gamma>60°$ 过于保守，响应很慢。典型设计目标是 $\\gamma=45°$。'
    },
    {
      question: '幅值裕度 $G_m$ 是在哪个频率处计算的？',
      options: ['增益穿越频率 $\\omega_{gc}$', '相位穿越频率 $\\omega_{pc}$（相位=-180°）', '带宽频率 $\\omega_b$', '任意频率'],
      answer: 1,
      explanation: '$G_m=1/|G(j\\omega_{pc})|$，$\\omega_{pc}$ 是相频曲线穿越 -180° 的频率。此时看幅频曲线距离 0dB 还有多远——这个距离就是幅值裕度。$G_m>6$dB 表示还有 2 倍以上的增益余量。'
    },
    {
      question: '如果奈奎斯特曲线恰好穿过 $(-1,j0)$ 点，系统处于什么状态？',
      options: ['稳定', '不稳定', '临界稳定（等幅振荡）', '无法判断'],
      answer: 2,
      explanation: '穿过 $(-1,j0)$ 意味着存在某个频率 $\\omega$ 使 $G(j\\omega)=-1$，即 $|G|=1$ 且相位=-180°。此时闭环特征方程有纯虚根，系统处于临界稳定（等幅持续振荡）。这正是 Ziegler-Nichols 临界比例法的实验状态。'
    },
    {
      question: '开环稳定（P=0）的系统，闭环稳定的奈奎斯特判据简化为？',
      options: ['奈奎斯特曲线包围 $(-1,j0)$ 点', '奈奎斯特曲线不包围 $(-1,j0)$ 点', '奈奎斯特曲线穿过原点', '奈奎斯特曲线在左半平面'],
      answer: 1,
      explanation: 'P=0 时稳定条件 $N=P=0$——奈奎斯特曲线不绕 $(-1,j0)$ 点。这是工程中最常见的情况（大多数被控对象本身是稳定的）。'
    },
  ],

  'act-11': [
    {
      question: '闭环谐振峰值 $M_r$ 增大意味着？',
      options: ['系统更稳定', '系统超调增大、更振荡', '系统响应更快', '稳态误差减小'],
      answer: 1,
      explanation: '$M_r$ 是闭环幅频的最大值。$M_r=1$ 表示无谐振（不振荡），$M_r>1$ 表示某频率附近增益放大（振荡）。$M_r$ 与超调量正相关：$M_r\\approx1.2$ 时超调约 5%，$M_r\\approx1.5$ 时超调约 25%。'
    },
    {
      question: '相位裕度 $\\gamma=45°$ 时，对应的近似超调量约为？',
      options: ['0%', '16%', '35%', '50%'],
      answer: 1,
      explanation: '经验公式 $M_r \\approx 1/\\sin 45° \\approx 1.41$，$\\sigma\\% \\approx 0.16+0.4(1.41-1) \\approx 32\\%$。更精确的二阶系统公式给出约 16%。工程中记住"45° 对应 15%~20% 超调"即可。'
    },
    {
      question: '带宽 $\\omega_b$ 增大的效果是？',
      options: ['响应变快但抗噪声变差', '响应变慢但更平稳', '精度提高', '稳定性变好'],
      answer: 0,
      explanation: '带宽越大系统能响应更高频率的信号→响应更快。但同时高频噪声也能通过→抗噪声变差。工程中需要在快速性和抗噪声之间权衡。电机控制中电流环带宽通常 1kHz~5kHz，速度环 50Hz~200Hz。'
    },
    {
      question: '开环增益穿越频率 $\\omega_{gc}$ 与闭环带宽 $\\omega_b$ 的关系是？',
      options: ['完全相等', '$\\omega_b \\approx \\omega_{gc}$（量级相近）', '$\\omega_b = 2\\omega_{gc}$', '无关系'],
      answer: 1,
      explanation: '对于大多数系统，$\\omega_b$ 和 $\\omega_{gc}$ 量级相近（$\\omega_b$ 略大于 $\\omega_{gc}$）。这是工程中常用的近似——设计时用 $\\omega_{gc}$ 估计带宽，不需要画闭环频率特性。'
    },
    {
      question: '二阶系统中相位裕度 $\\gamma$ 与阻尼比 $\\zeta$ 的近似关系是？',
      options: ['$\\gamma = \\zeta \\times 100°$', '$\\gamma \\approx 100\\zeta$（$\\zeta<0.7$ 时近似成立）', '$\\gamma = 45°\\zeta$', '无关系'],
      answer: 1,
      explanation: '二阶系统中 $\\gamma \\approx 100\\zeta$（$\\zeta<0.7$ 时误差<5%）。$\\zeta=0.5$ 时 $\\gamma\\approx50°$，$\\zeta=0.707$ 时 $\\gamma\\approx65°$。这个近似把频域指标（$\\gamma$）和时域指标（$\\zeta$）直接联系起来。'
    },
  ],

  'act-12': [
    {
      question: '超前校正的主要作用是？',
      options: ['消除稳态误差', '增加相位裕度、改善稳定性', '增大带宽', '降低增益'],
      answer: 1,
      explanation: '超前校正在中频段提供正相位（超前角），直接增加相位裕度→减小超调、改善稳定性。附带效果是增大带宽（响应更快），但也会降低高频抗噪声能力。'
    },
    {
      question: '滞后校正的主要作用是？',
      options: ['增加相位裕度', '提高低频增益、改善稳态精度', '增大带宽', '增加超调'],
      answer: 1,
      explanation: '滞后校正在低频段增大增益→提高稳态精度（减小稳态误差）。设计时让滞后角出现在低频段，不影响穿越频率处的相位裕度。代价是带宽减小（响应变慢）。'
    },
    {
      question: 'PID 控制器中，I 项在频域中的作用等效于？',
      options: ['超前校正', '滞后校正', '陷波滤波', '全通滤波'],
      answer: 1,
      explanation: 'I 项 $K_i/s$ 在低频段增加 +20dB/dec 斜率（相当于增加低频增益），与滞后校正的作用一致——都是提高低频增益来消除稳态误差。这就是为什么含 I 项的系统阶跃无差。'
    },
    {
      question: 'PID 控制器中，D 项在频域中的作用等效于？',
      options: ['滞后校正', '超前校正', '低通滤波', '带阻滤波'],
      answer: 1,
      explanation: 'D 项 $K_d s$ 在中高频段增加 +20dB/dec 斜率和正相位，与超前校正的作用一致——增加相位裕度→改善稳定性、抑制超调。但 D 项也放大高频噪声，所以工程中常加低通滤波。'
    },
    {
      question: '超前校正的代价是？',
      options: ['稳态误差增大', '带宽增大、抗高频噪声变差', '系统变得不稳定', '响应变慢'],
      answer: 1,
      explanation: '超前校正增大中高频增益→带宽增大→响应更快但噪声也更容易通过。如果系统工作在噪声环境中（如电机电流环），需要在超前校正后加低通滤波，或者限制 D 项增益。'
    },
    {
      question: '工程中最常用的控制方案是？',
      options: ['纯 P 控制', 'PI 控制', 'PD 控制', '纯 D 控制'],
      answer: 1,
      explanation: 'PI 控制（P+I）是最常用的工程方案——P 保证快速性，I 消除稳态误差，无 D 项避免放大噪声。电机电流环、温度控制、液位控制大多用 PI。需要更高性能时（如速度环）才加 D 项。'
    },
  ],

  'act-13': [
    {
      question: 'z 变换中 $z^{-1}$ 的物理意义是？',
      options: ['乘以采样周期', '延迟一个采样周期', '积分', '微分'],
      answer: 1,
      explanation: '$z^{-1}$ 对应"延迟一个采样周期 $T_s$"。在代码中 $z^{-1}X(z)$ 就是"上一次采样的 x 值"。这是离散系统差分方程的核心——用过去的值计算当前输出。'
    },
    {
      question: '奈奎斯特采样定理要求？',
      options: ['$f_s > f_{max}$', '$f_s > 2f_{max}$', '$f_s > 10f_{max}$', '$f_s = f_{max}$'],
      answer: 1,
      explanation: '$f_s > 2f_{max}$（采样频率 > 信号最高频率的 2 倍），否则发生频率混叠。工程中取 $f_s=(5\\sim10)f_{max}$ 留余量。电机控制中：速度环 1kHz，电流环 10kHz~100kHz。'
    },
    {
      question: '离散系统的稳定条件是？',
      options: ['所有极点在左半平面', '所有极点在单位圆内', '所有极点在单位圆外', '所有极点在虚轴上'],
      answer: 1,
      explanation: 'z 域稳定条件：所有闭环极点 $|z_i|<1$（在单位圆内）。对应关系：s 域左半平面→z 域单位圆内，s 域虚轴→z 域单位圆上，s 域右半平面→z 域单位圆外。'
    },
    {
      question: '双线性变换（Tustin 变换）的公式是？',
      options: ['$z=e^{sT_s}$', '$s=\\frac{2}{T_s}\\frac{z-1}{z+1}$', '$s=\\frac{z-1}{T_s}$', '$z=sT_s+1$'],
      answer: 1,
      explanation: 'Tustin 变换 $s=\\frac{2}{T_s}\\frac{z-1}{z+1}$ 把连续域映射到离散域。工程中在 MATLAB 里做连续域设计，用 Tustin 变换自动生成离散控制器代码。比直接在离散域设计更直观。'
    },
    {
      question: '零阶保持器（ZOH）的作用是？',
      options: ['滤除高频噪声', '将脉冲信号展宽为阶梯信号', '将连续信号离散化', '将离散信号连续化'],
      answer: 1,
      explanation: 'ZOH 将采样得到的脉冲序列"保持"到下一个采样时刻，输出是阶梯状信号。这是 DAC 的典型行为——输出电压在一个采样周期内保持不变。ZOH 引入的相位滞后约为 $T_s/2$，采样频率越高影响越小。'
    },
  ],

  'act-14': [
    {
      question: 'Ziegler-Nichols 临界比例法的第一步是？',
      options: ['直接给一组 PID 参数', '只保留 P，增大到等幅振荡，记录 $K_u$ 和 $T_u$', '做开环阶跃测试', '用 Cohen-Coon 公式计算'],
      answer: 1,
      explanation: 'Z-N 法：①只保留 P，增大 $K_p$ 到等幅振荡→记录临界增益 $K_u$ 和周期 $T_u$；②查表得 PID 参数。关键是找到"临界振荡"状态——此时 $K_p=K_u$，系统处于稳定边界。'
    },
    {
      question: 'Ziegler-Nichols 法中，PID 控制器的 $K_p$ 取值是？',
      options: ['$0.5K_u$', '$0.45K_u$', '$0.6K_u$', '$K_u$'],
      answer: 2,
      explanation: 'Z-N 表：P 控制 $0.5K_u$，PI 控制 $0.45K_u$，PID 控制 $0.6K_u$。注意 PID 的 $K_p$ 比 PI 大——因为 D 项提供了额外的相位裕度，允许更大的增益而不失稳。'
    },
    {
      question: 'Cohen-Coon 法与 Z-N 法的主要区别是？',
      options: ['Cohen-Coon 更精确', 'Cohen-Coon 用开环测试（更安全），Z-N 用闭环临界振荡', 'Cohen-Coon 只能用于一阶系统', '无区别'],
      answer: 1,
      explanation: 'Z-N 法需要闭环临界振荡（可能对设备有风险），Cohen-Coon 法用开环阶跃测试提取延迟 L 和时间常数 T（更安全）。Cohen-Coon 参数通常更温和（超调更小），但对大延迟系统效果差。'
    },
    {
      question: '位置式 PID 代码中，为什么要对积分项做限幅？',
      options: ['防止计算溢出', '抗积分饱和——输出饱和后积分继续累积会导致大幅超调', '提高精度', '降低计算量'],
      answer: 1,
      explanation: '积分饱和是 PID 最常见的工程问题：当执行器饱和（输出到限）后，误差仍存在，积分继续累积。当误差反向时，积分值很大需要很长时间才能"退饱和"，期间产生大幅超调。积分限幅是解决此问题的最简单方法。'
    },
    {
      question: '增量式 PID 相比位置式 PID 的优势是？',
      options: ['计算更快', '天然抗积分饱和、掉电无冲击', '精度更高', '不需要反馈'],
      answer: 1,
      explanation: '增量式输出 $\\Delta u$（变化量）而非绝对值。优势：①没有积分累加器，不会积分饱和；②掉电重启时 $\\Delta u$ 从 0 开始，不会有累积值冲击执行器；③只用到最近 2~3 次误差，计算量小。代价是调用方需要自行累加输出。'
    },
    {
      question: '工程调参的推荐顺序是？',
      options: ['先 D 后 I 再 P', '先 P 后 I 再 D', '先 I 后 P 再 D', '三个同时调'],
      answer: 1,
      explanation: '先 P 后 I 再 D：①只加 P 到响应快速但有稳态误差；②加 I 消除稳态误差（可能增加超调）；③加 D 抑制超调（可能放大噪声）。每步只调一个参数，观察响应变化，逐步逼近最佳参数。'
    },
    {
      question: 'PID 代码中"微分项噪声放大"问题的解决方案是？',
      options: ['增大 $K_d$', '对微分项加低通滤波（$\\alpha$ 滤波）', '减小采样周期', '去掉 D 项'],
      answer: 1,
      explanation: '直接差分 $\\frac{e_k-e_{k-1}}{T_s}$ 会放大高频噪声。解决方案：对微分项加一阶低通滤波 $d_{filt}=\\alpha \\cdot d_{new}+(1-\\alpha)\\cdot d_{filt,old}$，其中 $\\alpha=0.1\\sim0.3$。或者用"不完全微分"结构替代纯微分。'
    },
  ],
};



