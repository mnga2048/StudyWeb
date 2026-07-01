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
      { id: 'hm-05', title: '不定积分', desc: '换元法、分部积分、特殊类型', icon: '➕', tags: ['计算重点'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">求导的逆运算——不定积分</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          如果说导数是"已知函数求变化率"，那么不定积分就是"已知变化率还原原函数"。它是整个积分学的基础，也是 <a href="#" onclick="navigateTo('hm-06');return false;" style="color:var(--primary)">定积分</a> 计算的核心工具。掌握不定积分的关键在于：熟记基本公式、灵活运用换元与分部两大方法、识别特殊积分类型。
        </p>

        <h4 class="font-medium mt-6 mb-2">不定积分的定义</h4>
        <div class="formula-block">
          $$\\int f(x)\\,dx = F(x) + C$$
          <div class="text-sm text-gray-500 mt-2">其中 F'(x) = f(x)，C 为任意常数（积分常数）</div>
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>原函数</strong>：若 $F'(x) = f(x)$，则 $F(x)$ 是 $f(x)$ 的一个原函数</li>
          <li><strong>不定积分</strong>：$f(x)$ 的全体原函数构成的集合，记作 $\\int f(x)\\,dx$</li>
          <li><strong>积分常数 C</strong>：不能漏写！漏掉 C 是最常见的丢分点</li>
        </ul>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>易错点</strong>：不定积分的结果是一个函数族（含任意常数 C），不是单个函数。计算题若漏写 "+C"，即使过程全对也会扣分。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">基本积分公式表（必须熟记）</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>序号</th><th>公式</th><th>备注</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>$\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\ne -1)$</td><td>幂函数积分</td></tr>
            <tr><td>2</td><td>$\\int \\frac{1}{x}\\,dx = \\ln|x| + C$</td><td>注意绝对值</td></tr>
            <tr><td>3</td><td>$\\int e^x\\,dx = e^x + C$</td><td>指数函数</td></tr>
            <tr><td>4</td><td>$\\int a^x\\,dx = \\frac{a^x}{\\ln a} + C$</td><td>$a>0, a \\ne 1$</td></tr>
            <tr><td>5</td><td>$\\int \\sin x\\,dx = -\\cos x + C$</td><td>三角函数</td></tr>
            <tr><td>6</td><td>$\\int \\cos x\\,dx = \\sin x + C$</td><td>三角函数</td></tr>
            <tr><td>7</td><td>$\\int \\sec^2 x\\,dx = \\tan x + C$</td><td>正割平方</td></tr>
            <tr><td>8</td><td>$\\int \\csc^2 x\\,dx = -\\cot x + C$</td><td>余割平方</td></tr>
            <tr><td>9</td><td>$\\int \\frac{1}{\\sqrt{1-x^2}}\\,dx = \\arcsin x + C$</td><td>反三角</td></tr>
            <tr><td>10</td><td>$\\int \\frac{1}{1+x^2}\\,dx = \\arctan x + C$</td><td>反三角</td></tr>
          </tbody>
        </table></div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>记忆口诀</strong>：求导公式反着背就是积分公式。比如 $(\\sin x)' = \\cos x$ 反过来就是 $\\int \\cos x\\,dx = \\sin x + C$。先把求导公式背熟，积分公式自然记住。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">第一类换元法（凑微分法）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          核心思想：把被积函数凑成 $f(\\varphi(x)) \\cdot \\varphi'(x)$ 的形式，令 $u = \\varphi(x)$ 换元。
        </p>
        <div class="formula-block">
          $$\\int f(\\varphi(x)) \\cdot \\varphi'(x)\\,dx = \\int f(u)\\,du = F(u) + C = F(\\varphi(x)) + C$$
        </div>
        <div class="step-list">
          <div class="step-item"><div><strong>观察</strong>：看被积函数是否能写成 $g(\\varphi(x)) \\cdot \\varphi'(x)$ 的形式。</div></div>
          <div class="step-item"><div><strong>凑微分</strong>：把 $\\varphi'(x)\\,dx$ 凑成 $d(\\varphi(x))$，如 $x\\,dx = \\frac{1}{2}d(x^2)$、$e^x\\,dx = d(e^x)$。</div></div>
          <div class="step-item"><div><strong>换元</strong>：令 $u = \\varphi(x)$，化为关于 $u$ 的基本积分。</div></div>
          <div class="step-item"><div><strong>回代</strong>：积分结果用 $x$ 表示。</div></div>
        </div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>常用凑微分</strong>：$x\\,dx = \\frac{1}{2}d(x^2)$、$\\frac{1}{x}\\,dx = d(\\ln x)$、$e^x\\,dx = d(e^x)$、$\\cos x\\,dx = d(\\sin x)$、$\\frac{1}{1+x^2}\\,dx = d(\\arctan x)$。凑微分法是使用频率最高的积分方法。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">第二类换元法（变量代换法）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          当被积函数含 $\\sqrt{a^2-x^2}$、$\\sqrt{a^2+x^2}$、$\\sqrt{x^2-a^2}$ 时，用三角代换消除根号。
        </p>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>根号形式</th><th>代换</th><th>依据</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">$\\sqrt{a^2-x^2}$</td><td>$x = a\\sin t$</td><td>$1-\\sin^2 t = \\cos^2 t$</td></tr>
            <tr><td class="font-medium">$\\sqrt{a^2+x^2}$</td><td>$x = a\\tan t$</td><td>$1+\\tan^2 t = \\sec^2 t$</td></tr>
            <tr><td class="font-medium">$\\sqrt{x^2-a^2}$</td><td>$x = a\\sec t$</td><td>$\\sec^2 t - 1 = \\tan^2 t$</td></tr>
          </tbody>
        </table></div>
        <div class="info-box exam">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <div><strong>考点提示</strong>：三角代换后别忘回代。画一个直角三角形，根据代换关系标出各边长，利用三角函数定义回代，比硬算反三角函数快得多。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">分部积分法</h4>
        <div class="formula-block">
          $$\\int u\\,dv = uv - \\int v\\,du$$
          <div class="text-sm text-gray-500 mt-2">关键：合理选择 u 和 dv，使右边的积分比左边简单</div>
        </div>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          <strong>"反对幂指三"口诀</strong>：按优先级选 $u$——反三角函数 > 对数函数 > 幂函数 > 指数函数 > 三角函数。排在前面的优先选作 $u$。
        </p>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>分部积分适用场景</strong>：被积函数是两种不同类型函数的乘积，如 $x e^x$、$x \\sin x$、$x \\ln x$、$e^x \\sin x$ 等。对于 $\\int e^x \\sin x\\,dx$ 这类，需要两次分部积分后"循环回来"解方程。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">特殊类型积分</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>有理函数积分</strong>：$\\int \\frac{P(x)}{Q(x)}\\,dx$，先做多项式除法化为真分式，再部分分式分解</li>
          <li><strong>三角函数有理式</strong>：用万能代换 $t = \\tan\\frac{x}{2}$，将 $\\sin x, \\cos x$ 化为 $t$ 的有理函数</li>
          <li><strong>递推公式</strong>：如 $I_n = \\int \\sin^n x\\,dx$，通过分部积分建立 $I_n$ 与 $I_{n-2}$ 的递推关系</li>
        </ul>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>方法选择策略</strong>：拿到积分题先看类型——有根号想换元，有乘积想分部，有理函数想分解。不要盲目尝试，先观察再动手。同一道题可能需要多种方法组合使用。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">实例：综合运用</h4>
        <div class="formula-block">
          <strong>例</strong>：求 $\\int x \\sqrt{1-x^2}\\,dx$
          <div class="text-sm text-gray-500 mt-2">解：令 $u = 1-x^2$，则 $du = -2x\\,dx$，即 $x\\,dx = -\\frac{1}{2}du$</div>
          $$\\int x\\sqrt{1-x^2}\\,dx = -\\frac{1}{2}\\int \\sqrt{u}\\,du = -\\frac{1}{2} \\cdot \\frac{2}{3}u^{3/2} + C = -\\frac{1}{3}(1-x^2)^{3/2} + C$$
        </div>
      ` },
      { id: 'hm-06', title: '定积分与反常积分', desc: '牛顿-莱布尼茨公式、判敛法', icon: '∫', tags: ['核心'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">从面积问题到积分理论</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          定积分源于"求曲边梯形面积"这一经典问题，通过"分割—取近似—求和—取极限"四步构造出积分定义。而牛顿-莱布尼茨公式将定积分计算转化为求原函数，架起了 <a href="#" onclick="navigateTo('hm-05');return false;" style="color:var(--primary)">不定积分</a> 与定积分之间的桥梁。反常积分则将积分推广到无穷区间或无界函数的情形。
        </p>

        <h4 class="font-medium mt-6 mb-2">定积分的定义（黎曼和）</h4>
        <div class="formula-block">
          $$\\int_a^b f(x)\\,dx = \\lim_{\\lambda \\to 0} \\sum_{i=1}^{n} f(\\xi_i) \\Delta x_i$$
          <div class="text-sm text-gray-500 mt-2">其中 $\\lambda = \\max\\{\\Delta x_i\\}$，$\\xi_i$ 是第 i 个小区间内任取的点</div>
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>几何意义</strong>：$\\int_a^b f(x)\\,dx$ 表示曲线 $y=f(x)$ 与 x 轴之间的"代数面积"（x 轴上方为正，下方为负）</li>
          <li><strong>可积条件</strong>：$f(x)$ 在 $[a,b]$ 上连续，或只有有限个第一类间断点，则一定可积</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">牛顿-莱布尼茨公式（微积分基本定理）</h4>
        <div class="formula-block">
          $$\\int_a^b f(x)\\,dx = F(b) - F(a) = F(x)\\Big|_a^b$$
          <div class="text-sm text-gray-500 mt-2">其中 $F'(x) = f(x)$，即 $F(x)$ 是 $f(x)$ 的一个原函数</div>
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>核心价值</strong>：这个公式把"求面积"（极限运算）转化为"求原函数再代值"（代数运算），是整个积分学最重要的定理。没有它，定积分几乎无法计算。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">定积分的性质</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>性质</th><th>公式</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">线性</td><td>$\\int_a^b [\\alpha f(x) + \\beta g(x)]\\,dx = \\alpha\\int_a^b f(x)\\,dx + \\beta\\int_a^b g(x)\\,dx$</td></tr>
            <tr><td class="font-medium">区间可加</td><td>$\\int_a^b f(x)\\,dx = \\int_a^c f(x)\\,dx + \\int_c^b f(x)\\,dx$</td></tr>
            <tr><td class="font-medium">保号性</td><td>若 $f(x) \\ge 0$，则 $\\int_a^b f(x)\\,dx \\ge 0$（$a < b$）</td></tr>
            <tr><td class="font-medium">估值定理</td><td>$m(b-a) \\le \\int_a^b f(x)\\,dx \\le M(b-a)$，其中 $m, M$ 是 $f$ 的最小、最大值</td></tr>
            <tr><td class="font-medium">中值定理</td><td>$\\int_a^b f(x)\\,dx = f(\\xi)(b-a)$，$\\xi \\in [a,b]$</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">定积分的计算方法</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>牛莱公式</strong>：先求不定积分得到 $F(x)$，再代入上下限 $F(b)-F(a)$。</div></div>
          <div class="step-item"><div><strong>换元积分</strong>：$\\int_a^b f(x)\\,dx$，令 $x = \\varphi(t)$，换元同时换限：$\\int_{\\varphi^{-1}(a)}^{\\varphi^{-1}(b)} f(\\varphi(t))\\varphi'(t)\\,dt$。</div></div>
          <div class="step-item"><div><strong>分部积分</strong>：$\\int_a^b u\\,dv = uv\\Big|_a^b - \\int_a^b v\\,du$。</div></div>
        </div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>换元要换限</strong>：定积分换元时，上下限必须跟着变。如果用 $x = \\varphi(t)$ 代换，新的积分限是 $t$ 的范围，不是 $x$ 的范围。这是定积分换元与不定积分换元的最大区别。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">反常积分（广义积分）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          当积分区间无穷或被积函数无界时，定积分推广为反常积分，通过极限来定义。
        </p>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>类型</th><th>定义</th><th>收敛条件</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">无穷区间</td><td>$\\int_a^{+\\infty} f(x)\\,dx = \\lim_{b\\to+\\infty} \\int_a^b f(x)\\,dx$</td><td>极限存在则收敛</td></tr>
            <tr><td class="font-medium">无界函数（瑕积分）</td><td>$\\int_a^b f(x)\\,dx = \\lim_{\\varepsilon\\to 0^+} \\int_a^{b-\\varepsilon} f(x)\\,dx$（$b$ 为瑕点）</td><td>极限存在则收敛</td></tr>
          </tbody>
        </table></div>
        <div class="formula-block">
          <strong>p-积分判敛</strong>：
          $$\\int_1^{+\\infty} \\frac{1}{x^p}\\,dx \\begin{cases} \\text{收敛}, & p > 1 \\\\ \\text{发散}, & p \\le 1 \\end{cases}$$
          $$\\int_0^1 \\frac{1}{x^p}\\,dx \\begin{cases} \\text{收敛}, & p < 1 \\\\ \\text{发散}, & p \\ge 1 \\end{cases}$$
        </div>
        <div class="info-box exam">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <div><strong>考点提示</strong>：p-积分的敛散性是选择题高频考点。记忆技巧：无穷区间"大p收敛"（p>1），瑕积分"小p收敛"（p<1）。比较判别法和极限判别法是判断反常积分敛散性的主要工具。</div>
        </div>
      ` },
      { id: 'hm-07', title: '定积分应用', desc: '面积、体积、弧长、物理应用', icon: '📏', tags: [], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">定积分的几何与物理应用</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          定积分的核心思想是"微元法"——把整体量分割成无穷多个微小量，再累加求和。掌握了微元法，面积、体积、弧长、物理量的计算都可以统一处理。本节是 <a href="#" onclick="navigateTo('hm-06');return false;" style="color:var(--primary)">定积分</a> 的直接应用。
        </p>

        <h4 class="font-medium mt-6 mb-2">平面图形的面积</h4>
        <div class="formula-block">
          <strong>直角坐标</strong>：由 $y=f(x)$、$y=g(x)$、$x=a$、$x=b$ 围成的面积
          $$S = \\int_a^b |f(x) - g(x)|\\,dx$$
        </div>
        <div class="formula-block">
          <strong>参数方程</strong>：$x = x(t), y = y(t)$，$t \\in [\\alpha, \\beta]$
          $$S = \\int_\\alpha^\\beta |y(t) \\cdot x'(t)|\\,dt$$
        </div>
        <div class="formula-block">
          <strong>极坐标</strong>：$r = r(\\theta)$，$\\theta \\in [\\alpha, \\beta]$
          $$S = \\frac{1}{2}\\int_\\alpha^\\beta r^2(\\theta)\\,d\\theta$$
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>画图先行</strong>：求面积一定要先画草图，确定曲线的交点和上下位置关系。上方函数减下方函数，不能搞反。极坐标面积公式中的 $\frac{1}{2}$ 容易遗忘。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">旋转体的体积</h4>
        <div class="formula-block">
          <strong>绕 x 轴旋转</strong>（圆盘法）：
          $$V = \\pi \\int_a^b [f(x)]^2\\,dx$$
        </div>
        <div class="formula-block">
          <strong>绕 y 轴旋转</strong>（柱壳法）：
          $$V = 2\\pi \\int_a^b x \\cdot |f(x)|\\,dx$$
        </div>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>方法</th><th>适用场景</th><th>微元形状</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">圆盘法</td><td>绕旋转轴垂直的方向切片</td><td>薄圆盘（面积 $\\pi r^2$）</td></tr>
            <tr><td class="font-medium">柱壳法</td><td>绕旋转轴平行的方向切片</td><td>薄圆柱壳（侧面积 $2\\pi r h$）</td></tr>
          </tbody>
        </table></div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>方法选择</strong>：绕 x 轴旋转且对 x 积分时用圆盘法；绕 y 轴旋转且对 x 积分时用柱壳法。如果曲线用 $x = g(y)$ 表示更方便，则反过来。核心原则：让微元的半径和高度都容易用积分变量表示。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">弧长</h4>
        <div class="formula-block">
          <strong>直角坐标</strong>：$y = f(x)$，$x \\in [a,b]$
          $$L = \\int_a^b \\sqrt{1 + [f'(x)]^2}\\,dx$$
        </div>
        <div class="formula-block">
          <strong>参数方程</strong>：$x = x(t), y = y(t)$，$t \\in [\\alpha, \\beta]$
          $$L = \\int_\\alpha^\\beta \\sqrt{[x'(t)]^2 + [y'(t)]^2}\\,dt$$
        </div>
        <div class="formula-block">
          <strong>极坐标</strong>：$r = r(\\theta)$，$\\theta \\in [\\alpha, \\beta]$
          $$L = \\int_\\alpha^\\beta \\sqrt{r^2 + [r'(\\theta)]^2}\\,d\\theta$$
        </div>

        <h4 class="font-medium mt-6 mb-2">旋转体侧面积</h4>
        <div class="formula-block">
          绕 x 轴旋转的侧面积：
          $$S = 2\\pi \\int_a^b |f(x)| \\cdot \\sqrt{1 + [f'(x)]^2}\\,dx$$
          <div class="text-sm text-gray-500 mt-2">本质是弧长微元 $ds$ 乘以圆周长 $2\\pi r$</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">物理应用</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>变力做功</strong>：$W = \\int_a^b F(x)\\,dx$，力沿位移方向的分量对位移积分</li>
          <li><strong>液体静压力</strong>：$P = \\int_a^b \\rho g h(x) \\cdot w(x)\\,dx$，其中 $h(x)$ 是深度，$w(x)$ 是宽度</li>
          <li><strong>质心坐标</strong>：$\\bar{x} = \\frac{\\int x\\,dm}{\\int dm}$，用微元法求质量分布的"平均位置"</li>
        </ul>
        <div class="info-box exam">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <div><strong>考点提示</strong>：面积和体积是必考内容，通常作为解答题出现。弧长公式直接记忆即可。物理应用近年考查较少，但变力做功仍需掌握。注意区分"绕 x 轴"和"绕 y 轴"用不同的公式。</div>
        </div>
      ` },
      { id: 'hm-08', title: '常微分方程', desc: '一阶可分离/齐次/线性、二阶常系数', icon: '🔄', tags: ['高频'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">从方程到函数——微分方程</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          微分方程是含有未知函数及其导数的方程，其解是一个（或一族）函数。它是连接数学与工程的桥梁——电路暂态、机械振动、人口增长、化学反应速率等问题都归结为微分方程。本节聚焦常微分方程（ODE）的核心解法。
        </p>

        <h4 class="font-medium mt-6 mb-2">基本概念</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>阶</strong>：方程中出现的最高阶导数的阶数，如 $y'' + y = 0$ 是二阶</li>
          <li><strong>通解</strong>：含 n 个独立任意常数的解（n 为方程的阶）</li>
          <li><strong>特解</strong>：给定初始条件后确定常数的解</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">一阶可分离变量方程</h4>
        <div class="formula-block">
          $$\\frac{dy}{dx} = f(x)g(y) \\quad \\Rightarrow \\quad \\int \\frac{dy}{g(y)} = \\int f(x)\\,dx$$
          <div class="text-sm text-gray-500 mt-2">分离变量：把 $x$ 和 $y$ 分别移到等号两边，各自积分</div>
        </div>
        <div class="step-list">
          <div class="step-item"><div><strong>分离</strong>：将方程改写为 $\\frac{dy}{g(y)} = f(x)\\,dx$ 的形式。</div></div>
          <div class="step-item"><div><strong>两边积分</strong>：分别对 $x$ 和 $y$ 积分。</div></div>
          <div class="step-item"><div><strong>注意</strong>：若 $g(y_0)=0$，则 $y=y_0$ 也是解（常数解），不要遗漏。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">一阶齐次方程</h4>
        <div class="formula-block">
          $$\\frac{dy}{dx} = \\varphi\\left(\\frac{y}{x}\\right) \\quad \\Rightarrow \\quad \\text{令 } u = \\frac{y}{x}$$
          <div class="text-sm text-gray-500 mt-2">换元后化为可分离变量方程：$x\\frac{du}{dx} + u = \\varphi(u)$</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">一阶线性微分方程</h4>
        <div class="formula-block">
          $$y' + P(x)y = Q(x)$$
          <div class="text-sm text-gray-500 mt-2">通解公式（常数变易法推导）：</div>
          $$y = e^{-\\int P(x)\\,dx} \\left[ \\int Q(x) e^{\\int P(x)\\,dx}\\,dx + C \\right]$$
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>记忆技巧</strong>：通解公式 = 齐次通解 $\\times$ 非齐次修正项。先求 $e^{-\\int P\\,dx}$（齐次解），再乘以修正积分。公式很长但结构清晰，考试时直接套用即可。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">伯努利方程</h4>
        <div class="formula-block">
          $$y' + P(x)y = Q(x)y^n \\quad (n \\ne 0,1)$$
          <div class="text-sm text-gray-500 mt-2">令 $z = y^{1-n}$，化为一阶线性方程</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">二阶常系数齐次方程</h4>
        <div class="formula-block">
          $$y'' + py' + qy = 0$$
          <div class="text-sm text-gray-500 mt-2">特征方程：$r^2 + pr + q = 0$</div>
        </div>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>特征根情况</th><th>通解形式</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">两个不等实根 $r_1 \\ne r_2$</td><td>$y = C_1 e^{r_1 x} + C_2 e^{r_2 x}$</td></tr>
            <tr><td class="font-medium">重根 $r_1 = r_2 = r$</td><td>$y = (C_1 + C_2 x)e^{rx}$</td></tr>
            <tr><td class="font-medium">共轭复根 $r = \\alpha \\pm \\beta i$</td><td>$y = e^{\\alpha x}(C_1 \\cos\\beta x + C_2 \\sin\\beta x)$</td></tr>
          </tbody>
        </table></div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>易错点</strong>：重根时通解中必须有 $x$ 因子，即 $(C_1 + C_2 x)e^{rx}$，而不是 $C_1 e^{rx} + C_2 e^{rx}$（后者只有一个独立常数）。复根时用三角函数表示，不用指数形式。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">二阶常系数非齐次方程</h4>
        <div class="formula-block">
          $$y'' + py' + qy = f(x)$$
          <div class="text-sm text-gray-500 mt-2">通解 = 对应齐次方程的通解 + 非齐次方程的一个特解</div>
        </div>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          <strong>待定系数法</strong>设特解的形式：
        </p>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>$f(x)$ 的形式</th><th>特解形式</th><th>修正</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">$P_n(x)e^{\\alpha x}$</td><td>$Q_n(x)e^{\\alpha x}$</td><td>$\\alpha$ 是特征根时乘以 $x$（重根乘 $x^2$）</td></tr>
            <tr><td class="font-medium">$e^{\\alpha x}[P_n(x)\\cos\\beta x + Q_m(x)\\sin\\beta x]$</td><td>$x^k e^{\\alpha x}[R\\cos\\beta x + S\\sin\\beta x]$</td><td>$\\alpha \\pm \\beta i$ 是特征根时 $k=1$</td></tr>
          </tbody>
        </table></div>
        <div class="info-box exam">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <div><strong>考点提示</strong>：二阶常系数方程是必考内容。先写特征方程求根，再根据根的情况写齐次通解，最后用待定系数法求特解。解的结构"齐次通解 + 非齐次特解"是核心框架。</div>
        </div>
      ` },
      { id: 'hm-09', title: '多元函数微分学', desc: '偏导数、全微分、链式法则', icon: '🌐', tags: [], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">从一元到多元——升维的微分学</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          多元函数微分学是一元微分学的推广，但由于自变量增多，出现了偏导数、全微分、方向导数、梯度等新概念，连续、可微、偏导存在之间的关系也变得复杂。本节是 <a href="#" onclick="navigateTo('hm-10');return false;" style="color:var(--primary)">多元极值</a> 和 <a href="#" onclick="navigateTo('hm-11');return false;" style="color:var(--primary)">二重积分</a> 的基础。
        </p>

        <h4 class="font-medium mt-6 mb-2">多元函数的极限与连续</h4>
        <div class="formula-block">
          $$\\lim_{(x,y) \\to (x_0,y_0)} f(x,y) = A$$
          <div class="text-sm text-gray-500 mt-2">要求 $(x,y)$ 沿<strong>任意路径</strong>趋向 $(x_0,y_0)$ 时极限都存在且相等</div>
        </div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>与一元的区别</strong>：一元函数只有左右两个方向趋向，多元函数有无穷多条路径。验证极限不存在只需找两条路径极限不同；验证极限存在则需用夹逼或极坐标变换。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">偏导数</h4>
        <div class="formula-block">
          $$f_x(x_0,y_0) = \\lim_{\\Delta x \\to 0} \\frac{f(x_0+\\Delta x, y_0) - f(x_0,y_0)}{\\Delta x}$$
          <div class="text-sm text-gray-500 mt-2">对 x 求偏导时，把 y 当常数，按一元函数求导</div>
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>计算方法</strong>：求 $f_x$ 时把 $y$ 视为常数，对 $x$ 求导；求 $f_y$ 时把 $x$ 视为常数，对 $y$ 求导</li>
          <li><strong>高阶偏导</strong>：$f_{xy}$ 表示先对 $x$ 再对 $y$ 求偏导。若 $f_{xy}$ 和 $f_{yx}$ 都连续，则 $f_{xy} = f_{yx}$（混合偏导与求导次序无关）</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">全微分</h4>
        <div class="formula-block">
          $$dz = f_x\\,dx + f_y\\,dy$$
          <div class="text-sm text-gray-500 mt-2">全微分存在的必要条件：偏导 $f_x, f_y$ 都存在</div>
          <div class="text-sm text-gray-500">全微分存在的充分条件：$f_x, f_y$ 都连续</div>
        </div>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>概念</th><th>关系</th><th>说明</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">连续</td><td>$\\not\\Rightarrow$ 可微</td><td>多元函数连续不一定可微</td></tr>
            <tr><td class="font-medium">可微</td><td>$\\Rightarrow$ 连续</td><td>可微一定连续</td></tr>
            <tr><td class="font-medium">可微</td><td>$\\Rightarrow$ 偏导存在</td><td>可微时偏导一定存在</td></tr>
            <tr><td class="font-medium">偏导存在</td><td>$\\not\\Rightarrow$ 可微</td><td>偏导存在不一定可微</td></tr>
            <tr><td class="font-medium">偏导连续</td><td>$\\Rightarrow$ 可微</td><td>偏导连续是可微的充分条件</td></tr>
          </tbody>
        </table></div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>关系链</strong>：偏导连续 $\\Rightarrow$ 可微 $\\Rightarrow$ 连续，可微 $\\Rightarrow$ 偏导存在。但箭头不能反过来！这是选择题常考的关系辨析。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">链式法则（复合函数求导）</h4>
        <div class="formula-block">
          若 $z = f(u,v)$，$u = \\varphi(x,y)$，$v = \\psi(x,y)$，则：
          $$\\frac{\\partial z}{\\partial x} = \\frac{\\partial z}{\\partial u}\\frac{\\partial u}{\\partial x} + \\frac{\\partial z}{\\partial v}\\frac{\\partial v}{\\partial x}$$
          $$\\frac{\\partial z}{\\partial y} = \\frac{\\partial z}{\\partial u}\\frac{\\partial u}{\\partial y} + \\frac{\\partial z}{\\partial v}\\frac{\\partial v}{\\partial y}$$
        </div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>树形图法</strong>：画出变量依赖关系的树形图，每条从因变量到自变量的路径对应一个乘积项，所有路径求和。这是记忆链式法则最直观的方法。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">隐函数求导</h4>
        <div class="formula-block">
          由 $F(x,y) = 0$ 确定的隐函数 $y = y(x)$：
          $$\\frac{dy}{dx} = -\\frac{F_x}{F_y}$$
          由 $F(x,y,z) = 0$ 确定的隐函数 $z = z(x,y)$：
          $$\\frac{\\partial z}{\\partial x} = -\\frac{F_x}{F_z}, \\quad \\frac{\\partial z}{\\partial y} = -\\frac{F_y}{F_z}$$
        </div>

        <h4 class="font-medium mt-6 mb-2">方向导数与梯度</h4>
        <div class="formula-block">
          方向导数（沿方向 $\\vec{l} = (\\cos\\alpha, \\cos\\beta)$）：
          $$\\frac{\\partial f}{\\partial l} = f_x \\cos\\alpha + f_y \\cos\\beta$$
          梯度：
          $$\\text{grad}\\,f = (f_x, f_y) = \\nabla f$$
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>梯度方向</strong>是函数值增长最快的方向，梯度的模是最大方向导数</li>
          <li><strong>等值线</strong>上梯度垂直于等值线，指向函数值增大的一侧</li>
        </ul>
        <div class="info-box exam">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <div><strong>考点提示</strong>：偏导计算、全微分、复合函数链式法则是计算题高频考点。隐函数求导公式要记牢（"偏谁除以偏谁，前面加负号"）。连续/可微/偏导存在的关系是选择题常客。</div>
        </div>
      ` },
      { id: 'hm-10', title: '多元极值与拉格朗日乘数法', desc: '条件极值、无条件极值', icon: '⛰', tags: ['高频'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">多元函数的最优化</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          多元极值问题是 <a href="#" onclick="navigateTo('hm-09');return false;" style="color:var(--primary)">多元微分学</a> 的核心应用。无条件极值通过偏导为零找驻点，条件极值则在约束条件下用拉格朗日乘数法。这类问题在工程优化、经济学、物理学中都有广泛应用。
        </p>

        <h4 class="font-medium mt-6 mb-2">无条件极值（自由极值）</h4>
        <div class="formula-block">
          <strong>必要条件</strong>：若 $f(x,y)$ 在 $(x_0,y_0)$ 处取极值，且偏导存在，则：
          $$f_x(x_0,y_0) = 0, \\quad f_y(x_0,y_0) = 0$$
          <div class="text-sm text-gray-500 mt-2">满足此条件的点称为驻点（但驻点不一定是极值点）</div>
        </div>
        <div class="formula-block">
          <strong>充分条件</strong>：设 $(x_0,y_0)$ 是驻点，令 $A = f_{xx}$，$B = f_{xy}$，$C = f_{yy}$，则：
          $$\\Delta = AC - B^2 \\begin{cases} > 0 \\text{ 且 } A > 0 & \\Rightarrow \\text{极小值} \\\\ > 0 \\text{ 且 } A < 0 & \\Rightarrow \\text{极大值} \\\\ < 0 & \\Rightarrow \\text{不是极值（鞍点）} \\\\ = 0 & \\Rightarrow \\text{无法判断，需其他方法} \\end{cases}$$
        </div>
        <div class="step-list">
          <div class="step-item"><div><strong>求驻点</strong>：解方程组 $f_x = 0, f_y = 0$，得到所有驻点。</div></div>
          <div class="step-item"><div><strong>判别</strong>：在每个驻点处计算 $A, B, C$ 和 $\\Delta = AC - B^2$。</div></div>
          <div class="step-item"><div><strong>结论</strong>：根据 $\\Delta$ 和 $A$ 的符号判断是极大值、极小值还是鞍点。</div></div>
        </div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>鞍点</strong>：$\\Delta < 0$ 时，驻点既不是极大也不是极小，称为鞍点（形状像马鞍，在一个方向是极大，另一个方向是极小）。这与一元函数中"$f'(x_0)=0$ 但不是极值"的情况类似。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">条件极值与拉格朗日乘数法</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          求 $f(x,y,z)$ 在约束条件 $\\varphi(x,y,z) = 0$ 下的极值。
        </p>
        <div class="formula-block">
          构造拉格朗日函数：
          $$L(x,y,z,\\lambda) = f(x,y,z) + \\lambda \\varphi(x,y,z)$$
          <div class="text-sm text-gray-500 mt-2">令所有偏导为零，解方程组：</div>
          $$L_x = 0, \\quad L_y = 0, \\quad L_z = 0, \\quad L_\\lambda = 0$$
        </div>
        <div class="step-list">
          <div class="step-item"><div><strong>构造</strong>：写出拉格朗日函数 $L = f + \\lambda \\varphi$（约束条件个数决定 $\\lambda$ 的个数）。</div></div>
          <div class="step-item"><div><strong>求偏导</strong>：对所有变量和 $\\lambda$ 求偏导，令其为零。</div></div>
          <div class="step-item"><div><strong>解方程组</strong>：得到候选点。</div></div>
          <div class="step-item"><div><strong>判断</strong>：根据实际意义或二阶条件判断是否为极值。</div></div>
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>几何理解</strong>：拉格朗日乘数法的几何意义是——在极值点处，目标函数的梯度与约束曲面的法向量平行，即 $\\nabla f = -\\lambda \\nabla \\varphi$。这保证了沿约束曲面的任意方向都无法再增大（或减小）目标函数。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">多个约束条件</h4>
        <div class="formula-block">
          求 $f(x,y,z)$ 在 $\\varphi_1(x,y,z)=0$ 和 $\\varphi_2(x,y,z)=0$ 下的极值：
          $$L = f + \\lambda_1 \\varphi_1 + \\lambda_2 \\varphi_2$$
          <div class="text-sm text-gray-500 mt-2">每个约束条件对应一个拉格朗日乘子</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">实例</h4>
        <div class="formula-block">
          <strong>例</strong>：求 $f(x,y) = x^2 + y^2$ 在约束 $x + y = 1$ 下的最小值
          <div class="text-sm text-gray-500 mt-2">解：$L = x^2 + y^2 + \\lambda(x+y-1)$</div>
          $$L_x = 2x + \\lambda = 0, \\quad L_y = 2y + \\lambda = 0, \\quad L_\\lambda = x+y-1 = 0$$
          <div class="text-sm text-gray-500 mt-2">解得 $x = y = \\frac{1}{2}$，$\\lambda = -1$，最小值 $f = \\frac{1}{2}$</div>
        </div>
        <div class="info-box exam">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <div><strong>考点提示</strong>：无条件极值的判别法（$\\Delta = AC - B^2$）和拉格朗日乘数法都是解答题高频考点。计算时注意：先求驻点，再逐一判别。拉格朗日乘数法解方程组可能较复杂，要有耐心。</div>
        </div>
      ` },
      { id: 'hm-11', title: '二重积分', desc: '直角坐标、极坐标计算', icon: '🔲', tags: ['核心'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">从面积到体积——二重积分</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          二重积分是定积分向二维的推广，几何意义是"曲顶柱体的体积"。它是 <a href="#" onclick="navigateTo('hm-12');return false;" style="color:var(--primary)">三重积分</a> 和 <a href="#" onclick="navigateTo('hm-13');return false;" style="color:var(--primary)">曲线积分</a> 的基础，在概率论（联合密度函数积分）中也有重要应用。关键是掌握化二重积分为累次积分的方法。
        </p>

        <h4 class="font-medium mt-6 mb-2">二重积分的定义与性质</h4>
        <div class="formula-block">
          $$\\iint_D f(x,y)\\,d\\sigma = \\lim_{\\lambda \\to 0} \\sum_{i=1}^{n} f(\\xi_i, \\eta_i) \\Delta \\sigma_i$$
          <div class="text-sm text-gray-500 mt-2">几何意义：以 $D$ 为底、$z=f(x,y)$ 为顶的曲顶柱体体积</div>
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>线性</strong>：$\\iint_D [\\alpha f + \\beta g]\\,d\\sigma = \\alpha \\iint_D f\\,d\\sigma + \\beta \\iint_D g\\,d\\sigma$</li>
          <li><strong>区域可加</strong>：$D = D_1 \\cup D_2$ 时，$\\iint_D f\\,d\\sigma = \\iint_{D_1} f\\,d\\sigma + \\iint_{D_2} f\\,d\\sigma$</li>
          <li><strong>保号性</strong>：若 $f(x,y) \\ge 0$，则 $\\iint_D f\\,d\\sigma \\ge 0$</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">直角坐标计算</h4>
        <div class="formula-block">
          <strong>X 型区域</strong>（先 y 后 x）：$D: a \\le x \\le b, \\varphi_1(x) \\le y \\le \\varphi_2(x)$
          $$\\iint_D f(x,y)\\,d\\sigma = \\int_a^b dx \\int_{\\varphi_1(x)}^{\\varphi_2(x)} f(x,y)\\,dy$$
        </div>
        <div class="formula-block">
          <strong>Y 型区域</strong>（先 x 后 y）：$D: c \\le y \\le d, \\psi_1(y) \\le x \\le \\psi_2(y)$
          $$\\iint_D f(x,y)\\,d\\sigma = \\int_c^d dy \\int_{\\psi_1(y)}^{\\psi_2(y)} f(x,y)\\,dx$$
        </div>
        <div class="step-list">
          <div class="step-item"><div><strong>画图</strong>：画出积分区域 $D$ 的草图，确定边界曲线。</div></div>
          <div class="step-item"><div><strong>判断类型</strong>：看 $D$ 是 X 型（上下边界是 $x$ 的函数）还是 Y 型（左右边界是 $y$ 的函数）。</div></div>
          <div class="step-item"><div><strong>确定积分限</strong>：外层积分限是常数（区域的范围），内层积分限是关于内层变量的函数。</div></div>
          <div class="step-item"><div><strong>计算</strong>：先算内层积分（对一个变量），再算外层积分（对另一个变量）。</div></div>
        </div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>积分限是关键</strong>：内层积分限一般是关于外层变量的函数，不能写反。画图确定边界关系比死记公式更可靠。交换积分次序时必须重新确定积分限。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">极坐标计算</h4>
        <div class="formula-block">
          当积分区域 $D$ 是圆域、扇形域或被积函数含 $x^2+y^2$ 时，用极坐标更方便：
          $$\\iint_D f(x,y)\\,d\\sigma = \\int_\\alpha^\\beta d\\theta \\int_{r_1(\\theta)}^{r_2(\\theta)} f(r\\cos\\theta, r\\sin\\theta) \\cdot r\\,dr$$
          <div class="text-sm text-gray-500 mt-2">注意：$d\\sigma = r\\,dr\\,d\\theta$，多了一个 $r$ 因子！</div>
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>极坐标适用场景</strong>：① 积分区域是圆/环/扇形；② 被积函数含 $x^2+y^2$、$\\frac{y}{x}$ 等形式。记住面积元素 $d\\sigma = r\\,dr\\,d\\theta$，漏掉 $r$ 是最常见的错误。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">交换积分次序</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          有时先对某个变量积分很困难，交换积分次序可能简化计算。
        </p>
        <div class="step-list">
          <div class="step-item"><div><strong>写出原积分限</strong>：根据原来的累次积分，写出积分区域 $D$ 的不等式描述。</div></div>
          <div class="step-item"><div><strong>画图</strong>：画出 $D$ 的图形。</div></div>
          <div class="step-item"><div><strong>重新描述</strong>：用另一种类型（X 型变 Y 型或反之）重新描述 $D$。</div></div>
          <div class="step-item"><div><strong>写出新积分</strong>：按新的积分次序写出累次积分。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">利用对称性简化计算</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>区域对称 + 被积函数奇偶性</strong>：若 $D$ 关于 $x$ 轴对称，$f(x,-y)=-f(x,y)$（关于 $y$ 是奇函数），则 $\\iint_D f\\,d\\sigma = 0$</li>
          <li><strong>轮换对称性</strong>：若 $D$ 关于 $y=x$ 对称，则 $\\iint_D f(x,y)\\,d\\sigma = \\iint_D f(y,x)\\,d\\sigma$</li>
        </ul>
        <div class="info-box exam">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <div><strong>考点提示</strong>：二重积分计算是必考内容。画图确定积分区域、正确写出积分限是得分关键。交换积分次序是常见题型。极坐标下的二重积分也常考，特别是圆域上的积分。</div>
        </div>
      ` },
      { id: 'hm-12', title: '三重积分与含参积分', desc: '柱坐标、球坐标、含参变量积分', icon: '🧊', tags: [], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">三维空间的积分</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          三重积分是 <a href="#" onclick="navigateTo('hm-11');return false;" style="color:var(--primary)">二重积分</a> 向三维的推广，用于计算空间物体的质量、质心、转动惯量等物理量。含参积分则是将积分视为参数的函数来研究，是分析学的重要工具。
        </p>

        <h4 class="font-medium mt-6 mb-2">三重积分的定义</h4>
        <div class="formula-block">
          $$\\iiint_\\Omega f(x,y,z)\\,dV = \\lim_{\\lambda \\to 0} \\sum_{i=1}^{n} f(\\xi_i, \\eta_i, \\zeta_i) \\Delta V_i$$
          <div class="text-sm text-gray-500 mt-2">物理意义：若 $f=1$，则积分值为 $\\Omega$ 的体积；若 $f=\\rho$（密度），则积分值为质量</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">直角坐标计算（先一后二 / 先二后一）</h4>
        <div class="formula-block">
          <strong>先一后二</strong>（投影法）：将 $\\Omega$ 投影到 $xOy$ 面得区域 $D$，$z$ 的范围为 $z_1(x,y) \\le z \\le z_2(x,y)$
          $$\\iiint_\\Omega f\\,dV = \\iint_D \\left[ \\int_{z_1(x,y)}^{z_2(x,y)} f(x,y,z)\\,dz \\right] d\\sigma$$
        </div>
        <div class="formula-block">
          <strong>先二后一</strong>（截面法）：垂直于 $z$ 轴的截面为 $D_z$
          $$\\iiint_\\Omega f\\,dV = \\int_{c_1}^{c_2} \\left[ \\iint_{D_z} f(x,y,z)\\,d\\sigma \\right] dz$$
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>方法选择</strong>：先一后二适合截面形状随高度变化不大的情况；先二后一适合截面形状简单（如圆、矩形）的情况。选择使积分限更简单的那种。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">柱坐标</h4>
        <div class="formula-block">
          $$x = r\\cos\\theta, \\quad y = r\\sin\\theta, \\quad z = z$$
          $$dV = r\\,dr\\,d\\theta\\,dz$$
          $$\\iiint_\\Omega f\\,dV = \\int d\\theta \\int r\\,dr \\int f(r\\cos\\theta, r\\sin\\theta, z)\\,dz$$
          <div class="text-sm text-gray-500 mt-2">适用：旋转体、圆柱形区域、被积函数含 $x^2+y^2$</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">球坐标</h4>
        <div class="formula-block">
          $$x = r\\sin\\varphi\\cos\\theta, \\quad y = r\\sin\\varphi\\sin\\theta, \\quad z = r\\cos\\varphi$$
          $$dV = r^2 \\sin\\varphi\\,dr\\,d\\varphi\\,d\\theta$$
          $$\\iiint_\\Omega f\\,dV = \\int d\\theta \\int d\\varphi \\int f \\cdot r^2 \\sin\\varphi\\,dr$$
          <div class="text-sm text-gray-500 mt-2">适用：球形区域、被积函数含 $x^2+y^2+z^2$</div>
        </div>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>坐标系</th><th>体积元素</th><th>适用场景</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">直角坐标</td><td>$dx\\,dy\\,dz$</td><td>长方体、简单区域</td></tr>
            <tr><td class="font-medium">柱坐标</td><td>$r\\,dr\\,d\\theta\\,dz$</td><td>圆柱体、旋转体</td></tr>
            <tr><td class="font-medium">球坐标</td><td>$r^2\\sin\\varphi\\,dr\\,d\\varphi\\,d\\theta$</td><td>球体、锥体</td></tr>
          </tbody>
        </table></div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>球坐标角度范围</strong>：$\\theta \\in [0, 2\\pi]$（绕 z 轴旋转），$\\varphi \\in [0, \\pi]$（从正 z 轴到负 z 轴）。$\\varphi$ 不是纬度而是余纬度（从 z 轴量起），这是最容易搞混的地方。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">含参变量积分</h4>
        <div class="formula-block">
          $$F(t) = \\int_{a(t)}^{b(t)} f(x,t)\\,dx$$
          <div class="text-sm text-gray-500 mt-2">对参数 $t$ 求导（莱布尼茨公式）：</div>
          $$F'(t) = \\int_a^b \\frac{\\partial f}{\\partial t}\\,dx + f(b,t) \\cdot b'(t) - f(a,t) \\cdot a'(t)$$
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>积分号下求导</strong>：若 $f$ 和 $f_t$ 都连续，则可在积分号下对参数求导</li>
          <li><strong>积分号下取极限</strong>：若 $f$ 在闭区域上连续，则极限和积分可交换次序</li>
          <li><strong>应用</strong>：利用含参积分计算一些"积不出来"的定积分，如 $\\int_0^1 \\frac{x^b - x^a}{\\ln x}\\,dx = \\ln\\frac{b+1}{a+1}$</li>
        </ul>
        <div class="info-box exam">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <div><strong>考点提示</strong>：三重积分在直角坐标、柱坐标、球坐标下的计算是重点。含参积分的莱布尼茨公式考查较少，但"积分号下求导"的思想在概率论中很重要。</div>
        </div>
      ` },
      { id: 'hm-13', title: '曲线积分', desc: '第一类/第二类、格林公式', icon: '〰', tags: ['高频'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">沿曲线的积分</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          曲线积分将积分域从区间推广到曲线，分为第一类（对弧长）和第二类（对坐标）两种。格林公式建立了平面曲线积分与二重积分的联系，是向量分析的基本定理之一。这些内容是 <a href="#" onclick="navigateTo('hm-14');return false;" style="color:var(--primary)">曲面积分</a> 和场论的基础。
        </p>

        <h4 class="font-medium mt-6 mb-2">第一类曲线积分（对弧长的积分）</h4>
        <div class="formula-block">
          $$\\int_L f(x,y)\\,ds = \\int_\\alpha^\\beta f(x(t),y(t)) \\sqrt{[x'(t)]^2 + [y'(t)]^2}\\,dt$$
          <div class="text-sm text-gray-500 mt-2">$ds = \\sqrt{dx^2 + dy^2}$ 是弧长微元</div>
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>物理意义</strong>：若 $f$ 是线密度，则积分值为曲线的质量</li>
          <li><strong>与方向无关</strong>：$\\int_L f\\,ds = \\int_{-L} f\\,ds$，积分与曲线方向无关</li>
          <li><strong>对称性</strong>：若 $L$ 关于 $x$ 轴对称，$f$ 关于 $y$ 是奇函数，则积分为 0</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">第二类曲线积分（对坐标的积分）</h4>
        <div class="formula-block">
          $$\\int_L P\\,dx + Q\\,dy = \\int_\\alpha^\\beta [P(x(t),y(t))x'(t) + Q(x(t),y(t))y'(t)]\\,dt$$
          <div class="text-sm text-gray-500 mt-2">物理意义：力 $\\vec{F} = (P,Q)$ 沿曲线 $L$ 做的功</div>
        </div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>方向性</strong>：第二类曲线积分与曲线方向有关！$\\int_{-L} P\\,dx + Q\\,dy = -\\int_L P\\,dx + Q\\,dy$。这是与第一类积分的本质区别。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">两类曲线积分的关系</h4>
        <div class="formula-block">
          $$\\int_L P\\,dx + Q\\,dy = \\int_L (P\\cos\\alpha + Q\\cos\\beta)\\,ds$$
          <div class="text-sm text-gray-500 mt-2">其中 $(\\cos\\alpha, \\cos\\beta)$ 是曲线 $L$ 的单位切向量</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">格林公式</h4>
        <div class="formula-block">
          设 $D$ 是由闭曲线 $L$（正向，逆时针）围成的区域，$P, Q$ 在 $D$ 上有连续偏导，则：
          $$\\oint_L P\\,dx + Q\\,dy = \\iint_D \\left( \\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y} \\right) d\\sigma$$
        </div>
        <div class="step-list">
          <div class="step-item"><div><strong>验证条件</strong>：$P, Q$ 在 $D$ 上有连续一阶偏导，$L$ 是 $D$ 的正向边界。</div></div>
          <div class="step-item"><div><strong>计算二重积分</strong>：求 $\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}$，在 $D$ 上积分。</div></div>
          <div class="step-item"><div><strong>或补线</strong>：若 $L$ 不闭合，可补线使其闭合，用格林公式后再减去补线的积分。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">平面上曲线积分与路径无关</h4>
        <div class="formula-block">
          以下四个条件等价（在单连通区域内）：
          <div class="text-sm text-gray-500 mt-2">① $\\int_L P\\,dx + Q\\,dy$ 与路径无关</div>
          <div class="text-sm text-gray-500">② $\\oint_L P\\,dx + Q\\,dy = 0$（对任意闭曲线）</div>
          <div class="text-sm text-gray-500">③ $\\frac{\\partial Q}{\\partial x} = \\frac{\\partial P}{\\partial y}$（在区域内处处成立）</div>
          <div class="text-sm text-gray-500">④ $P\\,dx + Q\\,dy$ 是某个函数的全微分，即存在 $u$ 使 $du = P\\,dx + Q\\,dy$</div>
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>核心条件</strong>：路径无关的关键条件是 $\\frac{\\partial Q}{\\partial x} = \\frac{\\partial P}{\\partial y}$。验证这个条件后，可选择最简单的路径（如折线）计算积分，大大简化计算。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">全微分求原函数</h4>
        <div class="formula-block">
          若 $P\\,dx + Q\\,dy = du$，则原函数：
          $$u(x,y) = \\int_{(x_0,y_0)}^{(x,y)} P\\,dx + Q\\,dy$$
          可选择折线路径 $(x_0,y_0) \\to (x,y_0) \\to (x,y)$ 计算
        </div>
        <div class="info-box exam">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <div><strong>考点提示</strong>：格林公式是高频考点，常与补线技巧结合考查。路径无关的四个等价条件是选择题常客。计算曲线积分时，先判断是否可用格林公式或路径无关来简化。</div>
        </div>
      ` },
      { id: 'hm-14', title: '曲面积分', desc: '高斯公式、斯托克斯公式', icon: '🔵', tags: ['难点'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">曲面上的积分与场论</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          曲面积分是 <a href="#" onclick="navigateTo('hm-13');return false;" style="color:var(--primary)">曲线积分</a> 向曲面的推广，分为第一类（对面积）和第二类（对坐标）两种。高斯公式和斯托克斯公式分别建立了曲面积分与三重积分、曲线积分的联系，构成了场论的核心内容。
        </p>

        <h4 class="font-medium mt-6 mb-2">第一类曲面积分（对面积的积分）</h4>
        <div class="formula-block">
          $$\\iint_\\Sigma f(x,y,z)\\,dS$$
          <div class="text-sm text-gray-500 mt-2">计算方法：投影到 $xOy$ 面，$dS = \\sqrt{1+z_x^2+z_y^2}\\,dx\\,dy$</div>
          $$\\iint_\\Sigma f\\,dS = \\iint_{D_{xy}} f(x,y,z(x,y)) \\sqrt{1+z_x^2+z_y^2}\\,dx\\,dy$$
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>物理意义</strong>：若 $f$ 是面密度，则积分值为曲面的质量</li>
          <li><strong>与方向无关</strong>：$\\iint_\\Sigma f\\,dS = \\iint_{-\\Sigma} f\\,dS$</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">第二类曲面积分（对坐标的积分）</h4>
        <div class="formula-block">
          $$\\iint_\\Sigma P\\,dy\\,dz + Q\\,dz\\,dx + R\\,dx\\,dy$$
          <div class="text-sm text-gray-500 mt-2">物理意义：向量场 $\\vec{F} = (P,Q,R)$ 穿过曲面 $\\Sigma$ 的通量</div>
        </div>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          <strong>计算方法</strong>：统一化为一种投影，如投影到 $xOy$ 面：
        </p>
        <div class="formula-block">
          $$\\iint_\\Sigma R\\,dx\\,dy = \\pm \\iint_{D_{xy}} R(x,y,z(x,y))\\,dx\\,dy$$
          <div class="text-sm text-gray-500 mt-2">正负号取决于曲面法向量与 $z$ 轴正方向的夹角：同向取正，反向取负</div>
        </div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>方向性</strong>：第二类曲面积分与曲面的侧（法向量方向）有关，改变侧则积分变号。这是与第一类曲面积分的本质区别。计算时必须明确曲面的哪一侧。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">两类曲面积分的关系</h4>
        <div class="formula-block">
          $$\\iint_\\Sigma P\\,dy\\,dz + Q\\,dz\\,dx + R\\,dx\\,dy = \\iint_\\Sigma (P\\cos\\alpha + Q\\cos\\beta + R\\cos\\gamma)\\,dS$$
          <div class="text-sm text-gray-500 mt-2">其中 $(\\cos\\alpha, \\cos\\beta, \\cos\\gamma)$ 是曲面的单位法向量</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">高斯公式（散度定理）</h4>
        <div class="formula-block">
          设 $\\Omega$ 是由闭曲面 $\\Sigma$（外侧）围成的区域，$P, Q, R$ 有连续偏导，则：
          $$\\oiint_\\Sigma P\\,dy\\,dz + Q\\,dz\\,dx + R\\,dx\\,dy = \\iiint_\\Omega \\left( \\frac{\\partial P}{\\partial x} + \\frac{\\partial Q}{\\partial y} + \\frac{\\partial R}{\\partial z} \\right) dV$$
          <div class="text-sm text-gray-500 mt-2">右边的被积函数称为散度：$\\text{div}\\,\\vec{F} = \\nabla \\cdot \\vec{F} = P_x + Q_y + R_z$</div>
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>高斯公式的意义</strong>：它将闭曲面上的通量（第二类曲面积分）转化为体积内的散度积分（三重积分）。物理上，穿过闭曲面的净通量等于内部"源"的总量。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">斯托克斯公式（旋度定理）</h4>
        <div class="formula-block">
          $$\\oint_L P\\,dx + Q\\,dy + R\\,dz = \\iint_\\Sigma \\left( \\frac{\\partial R}{\\partial y} - \\frac{\\partial Q}{\\partial z} \\right) dy\\,dz + \\left( \\frac{\\partial P}{\\partial z} - \\frac{\\partial R}{\\partial x} \\right) dz\\,dx + \\left( \\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y} \\right) dx\\,dy$$
          <div class="text-sm text-gray-500 mt-2">$L$ 是 $\\Sigma$ 的边界曲线，方向与 $\\Sigma$ 的法向量满足右手定则</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">场论三公式的关系</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>公式</th><th>联系</th><th>物理意义</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">格林公式</td><td>平面曲线积分 ↔ 二重积分</td><td>平面场的环量 = 旋度的面积分</td></tr>
            <tr><td class="font-medium">高斯公式</td><td>曲面积分 ↔ 三重积分</td><td>通量 = 散度的体积分</td></tr>
            <tr><td class="font-medium">斯托克斯公式</td><td>空间曲线积分 ↔ 曲面积分</td><td>环量 = 旋度的面积分</td></tr>
          </tbody>
        </table></div>
        <div class="info-box exam">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <div><strong>考点提示</strong>：高斯公式是解答题高频考点，常与补面技巧结合。曲面积分的计算（投影法）必须掌握。场论三公式的物理意义和适用条件是选择题常客。</div>
        </div>
      ` },
      { id: 'hm-15', title: '无穷级数', desc: '常数项、幂级数收敛域、和函数', icon: '♾', tags: ['核心难点'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">无穷求和的学问——级数</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          无穷级数是"无穷多个数相加"的理论，核心问题是：什么条件下无穷和有意义（收敛）？收敛时和是多少？级数在函数逼近、微分方程求解、信号处理中有广泛应用，是高等数学的难点之一。
        </p>

        <h4 class="font-medium mt-6 mb-2">常数项级数的基本概念</h4>
        <div class="formula-block">
          $$\\sum_{n=1}^{\\infty} a_n = a_1 + a_2 + a_3 + \\cdots$$
          <div class="text-sm text-gray-500 mt-2">部分和：$S_n = a_1 + a_2 + \\cdots + a_n$；级数收敛 $\\Leftrightarrow$ $\\lim_{n\\to\\infty} S_n$ 存在</div>
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>收敛</strong>：部分和序列有极限，级数有"和"</li>
          <li><strong>发散</strong>：部分和无极限，级数无意义</li>
          <li><strong>必要条件</strong>：若 $\\sum a_n$ 收敛，则 $\\lim_{n\\to\\infty} a_n = 0$（但反过来不成立！如调和级数）</li>
        </ul>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>经典反例</strong>：调和级数 $\\sum \\frac{1}{n}$ 虽然通项趋于 0，但发散！这说明 $\\lim a_n = 0$ 只是收敛的必要条件，不是充分条件。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">正项级数判敛法</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>方法</th><th>条件</th><th>结论</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">比较判别法</td><td>$0 \\le a_n \\le b_n$</td><td>$\\sum b_n$ 收敛 $\\Rightarrow$ $\\sum a_n$ 收敛；$\\sum a_n$ 发散 $\\Rightarrow$ $\\sum b_n$ 发散</td></tr>
            <tr><td class="font-medium">极限比较法</td><td>$\\lim \\frac{a_n}{b_n} = c \\in (0,\\infty)$</td><td>$\\sum a_n$ 与 $\\sum b_n$ 同敛散</td></tr>
            <tr><td class="font-medium">比值法（达朗贝尔）</td><td>$\\lim \\frac{a_{n+1}}{a_n} = \\rho$</td><td>$\\rho < 1$ 收敛；$\\rho > 1$ 发散；$\\rho=1$ 不确定</td></tr>
            <tr><td class="font-medium">根值法（柯西）</td><td>$\\lim \\sqrt[n]{a_n} = \\rho$</td><td>$\\rho < 1$ 收敛；$\\rho > 1$ 发散；$\\rho=1$ 不确定</td></tr>
            <tr><td class="font-medium">积分判别法</td><td>$a_n = f(n)$，$f$ 正递减</td><td>$\\sum a_n$ 与 $\\int_1^\\infty f(x)\\,dx$ 同敛散</td></tr>
          </tbody>
        </table></div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>选择策略</strong>：含 $n!$ 或 $a^n$ 用比值法；含 $n$ 次方用根值法；通项像某个已知级数用比较法。$\\rho=1$ 时比值法和根值法失效，需换其他方法。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">交错级数与莱布尼茨判别法</h4>
        <div class="formula-block">
          $$\\sum_{n=1}^{\\infty} (-1)^{n-1} a_n, \\quad a_n > 0$$
          <div class="text-sm text-gray-500 mt-2">莱布尼茨条件：$a_n$ 单调递减且 $\\lim a_n = 0$，则级数收敛</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">绝对收敛与条件收敛</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>绝对收敛</strong>：$\\sum |a_n|$ 收敛 $\\Rightarrow$ $\\sum a_n$ 收敛</li>
          <li><strong>条件收敛</strong>：$\\sum a_n$ 收敛但 $\\sum |a_n|$ 发散</li>
          <li><strong>绝对收敛的性质</strong>：可任意重排求和顺序，和不变；可逐项相乘</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">幂级数</h4>
        <div class="formula-block">
          $$\\sum_{n=0}^{\\infty} a_n (x-x_0)^n = a_0 + a_1(x-x_0) + a_2(x-x_0)^2 + \\cdots$$
          <div class="text-sm text-gray-500 mt-2">收敛半径 $R = \\lim \\left| \\frac{a_n}{a_{n+1}} \\right|$ 或 $R = \\frac{1}{\\lim \\sqrt[n]{|a_n|}}$</div>
        </div>
        <div class="step-list">
          <div class="step-item"><div><strong>求收敛半径</strong>：用比值法或根值法求 $R$。</div></div>
          <div class="step-item"><div><strong>确定收敛域</strong>：开区间 $(x_0-R, x_0+R)$ 内绝对收敛，还需检验端点 $x = x_0 \\pm R$ 处的敛散性。</div></div>
          <div class="step-item"><div><strong>求和函数</strong>：逐项积分或逐项求导，化为已知级数（如几何级数），再反推。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">函数展开为幂级数</h4>
        <div class="formula-block">
          <strong>泰勒级数</strong>（在 $x_0=0$ 处即麦克劳林级数）：
          $$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(0)}{n!} x^n$$
        </div>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>函数</th><th>展开式</th><th>收敛域</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">$e^x$</td><td>$\\sum \\frac{x^n}{n!}$</td><td>$(-\\infty, +\\infty)$</td></tr>
            <tr><td class="font-medium">$\\sin x$</td><td>$\\sum \\frac{(-1)^n x^{2n+1}}{(2n+1)!}$</td><td>$(-\\infty, +\\infty)$</td></tr>
            <tr><td class="font-medium">$\\cos x$</td><td>$\\sum \\frac{(-1)^n x^{2n}}{(2n)!}$</td><td>$(-\\infty, +\\infty)$</td></tr>
            <tr><td class="font-medium">$\\ln(1+x)$</td><td>$\\sum \\frac{(-1)^{n-1} x^n}{n}$</td><td>$(-1, 1]$</td></tr>
            <tr><td class="font-medium">$\\frac{1}{1-x}$</td><td>$\\sum x^n$</td><td>$(-1, 1)$</td></tr>
            <tr><td class="font-medium">$(1+x)^\\alpha$</td><td>$\\sum \\binom{\\alpha}{n} x^n$</td><td>$(-1, 1)$（端点视 $\\alpha$ 而定）</td></tr>
          </tbody>
        </table></div>
        <div class="info-box exam">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <div><strong>考点提示</strong>：正项级数判敛、幂级数收敛域、函数展开为幂级数是三大必考内容。求和函数的方法（逐项积分/求导）和常用展开式必须熟练掌握。端点敛散性检验是丢分重灾区。</div>
        </div>
      ` },
      { id: 'hm-16', title: '傅里叶级数', desc: '狄利克雷条件、周期函数展开', icon: '🎵', tags: [], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">用三角函数逼近周期信号</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          傅里叶级数的核心思想是：任何满足一定条件的周期函数都可以分解为一系列正弦和余弦函数的叠加。这个思想在信号处理、振动分析、热传导等领域有深远应用，也是 <a href="#" onclick="navigateTo('hm-15');return false;" style="color:var(--primary)">无穷级数</a> 理论的重要应用。
        </p>

        <h4 class="font-medium mt-6 mb-2">三角函数系的正交性</h4>
        <div class="formula-block">
          $$\\int_{-\\pi}^{\\pi} \\cos mx \\cos nx\\,dx = \\begin{cases} 0, & m \\ne n \\\\ \\pi, & m = n \\ne 0 \\end{cases}$$
          $$\\int_{-\\pi}^{\\pi} \\sin mx \\sin nx\\,dx = \\begin{cases} 0, & m \\ne n \\\\ \\pi, & m = n \\end{cases}$$
          $$\\int_{-\\pi}^{\\pi} \\cos mx \\sin nx\\,dx = 0$$
          <div class="text-sm text-gray-500 mt-2">正交性是推导傅里叶系数公式的基础</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">傅里叶级数展开</h4>
        <div class="formula-block">
          周期为 $2\\pi$ 的函数 $f(x)$ 的傅里叶级数：
          $$f(x) \\sim \\frac{a_0}{2} + \\sum_{n=1}^{\\infty} (a_n \\cos nx + b_n \\sin nx)$$
          <div class="text-sm text-gray-500 mt-2">傅里叶系数：</div>
          $$a_0 = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} f(x)\\,dx$$
          $$a_n = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} f(x) \\cos nx\\,dx$$
          $$b_n = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} f(x) \\sin nx\\,dx$$
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>记忆技巧</strong>：$a_0$ 是函数在一个周期内的平均值（乘以 2），$a_n$ 是 $f(x)$ 与 $\\cos nx$ 的"相关程度"，$b_n$ 是 $f(x)$ 与 $\\sin nx$ 的"相关程度"。系数越大，对应的频率成分越强。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">狄利克雷收敛定理</h4>
        <div class="formula-block">
          若 $f(x)$ 在一个周期内满足：
          <div class="text-sm text-gray-500 mt-2">① 连续或只有有限个第一类间断点</div>
          <div class="text-sm text-gray-500">② 只有有限个极值点</div>
          <div class="text-sm text-gray-500">则傅里叶级数收敛，且：</div>
          $$S(x) = \\begin{cases} f(x), & x \\text{ 是连续点} \\\\ \\frac{f(x^-) + f(x^+)}{2}, & x \\text{ 是间断点} \\end{cases}$$
        </div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>间断点处的收敛</strong>：傅里叶级数在间断点处收敛到左右极限的平均值，而不是函数值本身。这是傅里叶级数与泰勒级数的重要区别——泰勒级数要求函数无穷次可微，傅里叶级数只需有限的光滑性。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">奇偶函数的傅里叶级数</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>函数类型</th><th>系数特点</th><th>级数形式</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">偶函数 $f(-x)=f(x)$</td><td>$b_n = 0$</td><td>余弦级数：$\\frac{a_0}{2} + \\sum a_n \\cos nx$</td></tr>
            <tr><td class="font-medium">奇函数 $f(-x)=-f(x)$</td><td>$a_n = 0$</td><td>正弦级数：$\\sum b_n \\sin nx$</td></tr>
          </tbody>
        </table></div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>简化计算</strong>：利用奇偶性可以只计算一半的系数。对于定义在 $[0,\\pi]$ 上的函数，可以做奇延拓（展开为正弦级数）或偶延拓（展开为余弦级数），这在求解偏微分方程的边界值问题时非常有用。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">周期为 2l 的傅里叶级数</h4>
        <div class="formula-block">
          $$f(x) \\sim \\frac{a_0}{2} + \\sum_{n=1}^{\\infty} \\left( a_n \\cos\\frac{n\\pi x}{l} + b_n \\sin\\frac{n\\pi x}{l} \\right)$$
          $$a_n = \\frac{1}{l} \\int_{-l}^{l} f(x) \\cos\\frac{n\\pi x}{l}\\,dx, \\quad b_n = \\frac{1}{l} \\int_{-l}^{l} f(x) \\sin\\frac{n\\pi x}{l}\\,dx$$
        </div>

        <h4 class="font-medium mt-6 mb-2">帕塞瓦尔等式</h4>
        <div class="formula-block">
          $$\\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} [f(x)]^2\\,dx = \\frac{a_0^2}{2} + \\sum_{n=1}^{\\infty} (a_n^2 + b_n^2)$$
          <div class="text-sm text-gray-500 mt-2">物理意义：信号的总能量等于各频率分量能量之和</div>
        </div>
        <div class="info-box exam">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <div><strong>考点提示</strong>：求傅里叶系数是计算题高频考点，通常给一个分段函数求展开式。狄利克雷定理判断收敛性是选择题常客。利用奇偶性简化计算是常用技巧。帕塞瓦尔等式考查较少但需了解。</div>
        </div>
      ` },
    ]
  },

  // ========== 线性代数 ==========
  'linear-algebra': {
    title: '线性代数',
    subtitle: '笔试线代核心，行列式、矩阵、向量、特征值、二次型',
    icon: '🟠',
    sections: [
      { id: 'la-01', title: '行列式', desc: '性质、展开定理、克莱姆法则', icon: '|#', tags: ['基础'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">行列式——线性代数的起点</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          行列式是一个数，由方阵中的元素按特定规则计算得到。它是判断矩阵是否可逆、求解线性方程组、计算特征值的基础工具。掌握行列式的性质和计算方法，是学好线性代数的第一步。
        </p>

        <h4 class="font-medium mt-6 mb-2">行列式的定义</h4>
        <div class="formula-block">
          <strong>二阶行列式</strong>：
          $$\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc$$
          <strong>三阶行列式</strong>（对角线法则）：
          $$\\begin{vmatrix} a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{vmatrix} = a_1b_2c_3 + a_2b_3c_1 + a_3b_1c_2 - a_3b_2c_1 - a_2b_1c_3 - a_1b_3c_2$$
        </div>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          <strong>n 阶行列式</strong>：$\\det(A) = |A| = \\sum_{\\text{全排列}} (-1)^{\\tau} a_{1p_1}a_{2p_2}\\cdots a_{np_n}$，其中 $\\tau$ 是排列的逆序数。
        </p>

        <h4 class="font-medium mt-6 mb-2">行列式的性质（简化计算的核心）</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>性质</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">转置不变</td><td>$|A^T| = |A|$</td></tr>
            <tr><td class="font-medium">行（列）互换</td><td>两行（列）互换，行列式变号</td></tr>
            <tr><td class="font-medium">公因子提取</td><td>某行（列）有公因子 $k$，可提到行列式外面</td></tr>
            <tr><td class="font-medium">拆行（列）</td><td>某行（列）是两项之和，可拆成两个行列式之和</td></tr>
            <tr><td class="font-medium">倍加不变</td><td>把某行（列）的 $k$ 倍加到另一行（列），行列式不变</td></tr>
          </tbody>
        </table></div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>计算策略</strong>：利用"倍加不变"性质，先把行列式化为上三角（主对角线下方全为 0），此时行列式 = 主对角线元素之积。这是计算高阶行列式最高效的方法。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">行列式按行（列）展开</h4>
        <div class="formula-block">
          $$|A| = \\sum_{j=1}^{n} a_{ij} A_{ij} = a_{i1}A_{i1} + a_{i2}A_{i2} + \\cdots + a_{in}A_{in}$$
          <div class="text-sm text-gray-500 mt-2">$A_{ij} = (-1)^{i+j} M_{ij}$ 是代数余子式，$M_{ij}$ 是余子式（删去第 $i$ 行第 $j$ 列后的行列式）</div>
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>展开技巧</strong>：选零元素最多的行（列）展开，减少计算量</li>
          <li><strong>重要结论</strong>：$\\sum_{j=1}^{n} a_{ij} A_{kj} = 0$（$i \\ne k$），即某行元素乘以另一行的代数余子式之和为 0</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">特殊行列式</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>类型</th><th>特点</th><th>计算方法</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">上（下）三角</td><td>主对角线下（上）方全为 0</td><td>对角线元素之积</td></tr>
            <tr><td class="font-medium">对角行列式</td><td>只有主对角线非零</td><td>对角线元素之积</td></tr>
            <tr><td class="font-medium">范德蒙行列式</td><td>$V_n = \\prod_{i<j}(x_j - x_i)$</td><td>所有可能的差之积</td></tr>
            <tr><td class="font-medium">分块对角</td><td>对角线上是子矩阵</td><td>各子矩阵行列式之积</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">克莱姆法则</h4>
        <div class="formula-block">
          对于 $n$ 个方程 $n$ 个未知数的线性方程组 $Ax = b$，若 $|A| \\ne 0$，则：
          $$x_i = \\frac{|A_i|}{|A|}, \\quad i = 1, 2, \\ldots, n$$
          <div class="text-sm text-gray-500 mt-2">$|A_i|$ 是用 $b$ 替换 $A$ 的第 $i$ 列后的行列式</div>
        </div>
        <div class="info-box exam">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <div><strong>考点提示</strong>：行列式计算（特别是高阶）是必考内容。性质的灵活运用（化上三角、提取公因子）是解题关键。克莱姆法则虽然理论重要，但实际计算中较少使用（因为求逆更快）。</div>
        </div>
      ` },
      { id: 'la-02', title: '矩阵运算', desc: '乘法、逆、伴随、分块矩阵', icon: '⊞', tags: ['核心'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">矩阵——线性变换的载体</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          矩阵是线性代数的核心对象，它既可以表示线性方程组，也可以表示线性变换。掌握矩阵的运算是学习 <a href="#" onclick="navigateTo('la-03');return false;" style="color:var(--primary)">初等变换</a>、<a href="#" onclick="navigateTo('la-04');return false;" style="color:var(--primary)">线性方程组</a>、<a href="#" onclick="navigateTo('la-06');return false;" style="color:var(--primary)">特征值</a> 等后续内容的基础。
        </p>

        <h4 class="font-medium mt-6 mb-2">矩阵的基本运算</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>运算</th><th>定义</th><th>注意事项</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">加法</td><td>对应元素相加</td><td>同型矩阵才能相加</td></tr>
            <tr><td class="font-medium">数乘</td><td>$kA$：每个元素乘以 $k$</td><td>$|kA| = k^n |A|$（不是 $k|A|$）</td></tr>
            <tr><td class="font-medium">乘法</td><td>$(AB)_{ij} = \\sum_k a_{ik}b_{kj}$</td><td>一般 $AB \\ne BA$（不满足交换律！）</td></tr>
            <tr><td class="font-medium">转置</td><td>$(A^T)_{ij} = a_{ji}$</td><td>$(AB)^T = B^T A^T$（顺序反转）</td></tr>
          </tbody>
        </table></div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>矩阵 vs 数</strong>：矩阵乘法不满足交换律（$AB \\ne BA$），不能随意交换顺序；$AB = 0$ 不能推出 $A=0$ 或 $B=0$；$AB = AC$ 不能推出 $B = C$（除非 $A$ 可逆）。这些都与数的运算不同！</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">逆矩阵</h4>
        <div class="formula-block">
          若 $AB = BA = E$，则 $B = A^{-1}$，即 $A$ 的逆矩阵
          <div class="text-sm text-gray-500 mt-2">$A$ 可逆 $\\Leftrightarrow$ $|A| \\ne 0$（非奇异矩阵）</div>
        </div>
        <div class="formula-block">
          <strong>求逆方法一：伴随矩阵法</strong>
          $$A^{-1} = \\frac{1}{|A|} A^*$$
          <div class="text-sm text-gray-500 mt-2">$A^*$ 是伴随矩阵，$(A^*)_{ij} = A_{ji}$（注意转置！）</div>
        </div>
        <div class="step-list">
          <div class="step-item"><div><strong>初等变换法</strong>：$(A | E) \\xrightarrow{\\text{行变换}} (E | A^{-1})$，把 $A$ 化为单位矩阵，右边就是 $A^{-1}$。</div></div>
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>逆矩阵的性质</strong>：$(A^{-1})^{-1} = A$、$(AB)^{-1} = B^{-1}A^{-1}$（顺序反转）、$(A^T)^{-1} = (A^{-1})^T$、$(kA)^{-1} = \\frac{1}{k}A^{-1}$。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">伴随矩阵</h4>
        <div class="formula-block">
          $$A^* = \\begin{pmatrix} A_{11} & A_{21} & \\cdots & A_{n1} \\\\ A_{12} & A_{22} & \\cdots & A_{n2} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ A_{1n} & A_{2n} & \\cdots & A_{nn} \\end{pmatrix}$$
          <div class="text-sm text-gray-500 mt-2">伴随矩阵是代数余子式矩阵的转置</div>
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>核心公式</strong>：$AA^* = A^*A = |A|E$</li>
          <li><strong>秩的关系</strong>：若 $\\text{rank}(A) = n$，则 $\\text{rank}(A^*) = n$；若 $\\text{rank}(A) = n-1$，则 $\\text{rank}(A^*) = 1$；若 $\\text{rank}(A) < n-1$，则 $\\text{rank}(A^*) = 0$</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">分块矩阵</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          将大矩阵分成若干小块，简化运算。
        </p>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>分块形式</th><th>行列式</th><th>逆矩阵</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">对角分块 $\\text{diag}(A_1, A_2)$</td><td>$|A_1| \\cdot |A_2|$</td><td>$\\text{diag}(A_1^{-1}, A_2^{-1})$</td></tr>
            <tr><td class="font-medium">三角分块</td><td>$|A_{11}| \\cdot |A_{22}|$</td><td>用公式求</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">矩阵多项式</h4>
        <div class="formula-block">
          $$\\varphi(A) = a_0 E + a_1 A + a_2 A^2 + \\cdots + a_m A^m$$
          <div class="text-sm text-gray-500 mt-2">凯莱-哈密顿定理：$A$ 满足其特征方程 $\\varphi(\\lambda) = |\\lambda E - A| = 0$，即 $\\varphi(A) = O$</div>
        </div>
        <div class="info-box exam">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <div><strong>考点提示</strong>：矩阵乘法、求逆、伴随矩阵的性质是核心考点。求逆通常用初等变换法（更高效），伴随矩阵法适合低阶或理论推导。分块矩阵在简化高阶矩阵运算时很有用。</div>
        </div>
      ` },
      { id: 'la-03', title: '初等变换与秩', desc: '行变换、矩阵秩的求法', icon: '⇅', tags: ['高频'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">初等变换与矩阵的秩</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          初等变换是矩阵运算的核心工具，它不改变矩阵的秩和行列式的非零性。矩阵的秩反映了矩阵"本质上的大小"，是判断 <a href="#" onclick="navigateTo('la-04');return false;" style="color:var(--primary)">线性方程组</a> 解的情况的关键指标。
        </p>

        <h4 class="font-medium mt-6 mb-2">三种初等行变换</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>交换两行</strong>：$r_i \\leftrightarrow r_j$</li>
          <li><strong>某行乘以非零常数</strong>：$r_i \\times k$（$k \\ne 0$）</li>
          <li><strong>某行加上另一行的 k 倍</strong>：$r_i + k r_j$</li>
        </ul>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>初等矩阵</strong>：对单位矩阵做一次初等变换得到的矩阵称为初等矩阵。左乘初等矩阵 = 做行变换，右乘初等矩阵 = 做列变换。初等矩阵都可逆。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">矩阵的秩</h4>
        <div class="formula-block">
          $$\\text{rank}(A) = \\text{非零子式的最高阶数} = \\text{行阶梯形中非零行的个数}$$
          <div class="text-sm text-gray-500 mt-2">$m \\times n$ 矩阵的秩满足：$0 \\le \\text{rank}(A) \\le \\min(m, n)$</div>
        </div>
        <div class="step-list">
          <div class="step-item"><div><strong>化行阶梯形</strong>：用初等行变换把矩阵化为行阶梯形（每个非零行的第一个非零元在上一行的右边）。</div></div>
          <div class="step-item"><div><strong>数非零行</strong>：非零行的个数就是矩阵的秩。</div></div>
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>秩的本质</strong>：秩是矩阵"有效信息"的维数。满秩（$\\text{rank}(A) = \\min(m,n)$）意味着矩阵没有"冗余"。秩为 0 只有零矩阵。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">秩的重要公式</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>公式</th><th>说明</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">$\\text{rank}(A) = \\text{rank}(A^T)$</td><td>转置不改变秩</td></tr>
            <tr><td class="font-medium">$\\text{rank}(AB) \\le \\min(\\text{rank}(A), \\text{rank}(B))$</td><td>乘积的秩不超过各因子的秩</td></tr>
            <tr><td class="font-medium">$\\text{rank}(A+B) \\le \\text{rank}(A) + \\text{rank}(B)$</td><td>和的秩不超过秩的和</td></tr>
            <tr><td class="font-medium">若 $P, Q$ 可逆，则 $\\text{rank}(PAQ) = \\text{rank}(A)$</td><td>可逆矩阵乘不改变秩</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">行最简形与标准形</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>行阶梯形</strong>：非零行在上，每行首个非零元（主元）在上一行右边</li>
          <li><strong>行最简形</strong>：在行阶梯形基础上，主元为 1，主元所在列其他元素为 0</li>
          <li><strong>标准形</strong>：$\\begin{pmatrix} E_r & 0 \\\\ 0 & 0 \\end{pmatrix}$，其中 $r = \\text{rank}(A)$</li>
        </ul>
        <div class="info-box exam">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <div><strong>考点提示</strong>：求矩阵的秩是基本功，通常通过化行阶梯形来求。秩的公式（特别是乘积的秩）在证明题中常用。判断方程组解的情况需要看系数矩阵和增广矩阵的秩。</div>
        </div>
      ` },
      { id: 'la-04', title: '线性方程组', desc: '解的结构、Ax=0/Ax=b', icon: '∀', tags: ['核心'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">线性方程组——线性代数的核心问题</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          线性方程组 $Ax = b$ 是线性代数最核心的问题。它串联了 <a href="#" onclick="navigateTo('la-01');return false;" style="color:var(--primary)">行列式</a>、<a href="#" onclick="navigateTo('la-02');return false;" style="color:var(--primary)">矩阵</a>、<a href="#" onclick="navigateTo('la-05');return false;" style="color:var(--primary)">向量</a> 等几乎所有概念。解的存在性由秩决定，解的结构由齐次解和特解组成。
        </p>

        <h4 class="font-medium mt-6 mb-2">齐次方程组 $Ax = 0$</h4>
        <div class="formula-block">
          $$Ax = 0 \\text{ 一定有解（零解 } x = 0\\text{）}$$
          <div class="text-sm text-gray-500 mt-2">是否有非零解取决于 $\\text{rank}(A)$：</div>
          $$\\text{rank}(A) = n \\Leftrightarrow \\text{只有零解}; \\quad \\text{rank}(A) < n \\Leftrightarrow \\text{有非零解（无穷多解）}$$
          <div class="text-sm text-gray-500 mt-2">$n$ 是未知数个数，解空间维数 = $n - \\text{rank}(A)$</div>
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>基础解系</strong>：$n - \\text{rank}(A)$ 个线性无关的解向量，它们的所有线性组合构成全部解</li>
          <li><strong>解的结构</strong>：$x = c_1 \\xi_1 + c_2 \\xi_2 + \\cdots + c_{n-r} \\xi_{n-r}$（$c_i$ 为任意常数）</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">非齐次方程组 $Ax = b$</h4>
        <div class="formula-block">
          <strong>解的存在性</strong>（秩的判别）：
          $$\\text{rank}(A) = \\text{rank}(\\bar{A}) \\Leftrightarrow \\text{有解}; \\quad \\text{rank}(A) \\ne \\text{rank}(\\bar{A}) \\Leftrightarrow \\text{无解}$$
          <div class="text-sm text-gray-500 mt-2">$\\bar{A} = (A | b)$ 是增广矩阵</div>
        </div>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>条件</th><th>解的情况</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">$\\text{rank}(A) \\ne \\text{rank}(\\bar{A})$</td><td>无解</td></tr>
            <tr><td class="font-medium">$\\text{rank}(A) = \\text{rank}(\\bar{A}) = n$</td><td>唯一解</td></tr>
            <tr><td class="font-medium">$\\text{rank}(A) = \\text{rank}(\\bar{A}) < n$</td><td>无穷多解</td></tr>
          </tbody>
        </table></div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>三句话总结</strong>：① 无解 = 秩不等；② 唯一解 = 秩等且等于未知数个数；③ 无穷多解 = 秩等但小于未知数个数。记住这三句话，选择题秒杀。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">非齐次方程组的解的结构</h4>
        <div class="formula-block">
          $$x = x^* + c_1 \\xi_1 + c_2 \\xi_2 + \\cdots + c_{n-r} \\xi_{n-r}$$
          <div class="text-sm text-gray-500 mt-2">$x^*$ 是 $Ax=b$ 的一个特解，$\\xi_1, \\ldots, \\xi_{n-r}$ 是 $Ax=0$ 的基础解系</div>
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>特解</strong>：令自由变量为 0，解出主变量</li>
          <li><strong>基础解系</strong>：每次令一个自由变量为 1、其余为 0，解出对应的解向量</li>
        </ul>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>非齐次解的结构</strong>：$Ax=b$ 的全部解 = 一个特解 + $Ax=0$ 的全部解。这不是简单的"加"，而是"特解 + 齐次通解"的结构。两个非齐次解之差是齐次解，非齐次解加齐次解仍是非齐次解。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">解题步骤</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>写出增广矩阵</strong>：$\\bar{A} = (A | b)$。</div></div>
          <div class="step-item"><div><strong>行变换化阶梯形</strong>：用初等行变换化为行阶梯形。</div></div>
          <div class="step-item"><div><strong>判断解的情况</strong>：比较 $\\text{rank}(A)$ 和 $\\text{rank}(\\bar{A})$。</div></div>
          <div class="step-item"><div><strong>求解</strong>：若有解，继续化为行最简形，写出通解。</div></div>
        </div>
        <div class="info-box exam">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <div><strong>考点提示</strong>：线性方程组是必考大题。解的结构（特解 + 齐次通解）必须熟练掌握。含参数的方程组讨论解的情况是高频题型。齐次方程组的基础解系求法是基本功。</div>
        </div>
      ` },
      { id: 'la-05', title: '向量组与向量空间', desc: '线性相关/无关、基与维数', icon: '→', tags: ['难点'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">向量的线性关系</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          向量组的线性相关性是线性代数的抽象核心，它与 <a href="#" onclick="navigateTo('la-04');return false;" style="color:var(--primary)">线性方程组</a> 的解、矩阵的秩有着深刻联系。理解线性相关/无关、极大线性无关组、向量空间的基与维数，是掌握线性代数的关键。
        </p>

        <h4 class="font-medium mt-6 mb-2">线性组合与线性表示</h4>
        <div class="formula-block">
          $$\\beta = k_1 \\alpha_1 + k_2 \\alpha_2 + \\cdots + k_s \\alpha_s$$
          <div class="text-sm text-gray-500 mt-2">$\\beta$ 是 $\\alpha_1, \\ldots, \\alpha_s$ 的线性组合，$k_1, \\ldots, k_s$ 是组合系数</div>
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>等价说法</strong>：$\\beta$ 可由 $\\alpha_1, \\ldots, \\alpha_s$ 线性表示 $\\Leftrightarrow$ 方程组 $x_1\\alpha_1 + \\cdots + x_s\\alpha_s = \\beta$ 有解</li>
          <li><strong>与秩的关系</strong>：$\\text{rank}(\\alpha_1, \\ldots, \\alpha_s) = \\text{rank}(\\alpha_1, \\ldots, \\alpha_s, \\beta)$ 时可表示</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">线性相关与线性无关</h4>
        <div class="formula-block">
          <strong>定义</strong>：若存在不全为零的 $k_1, \\ldots, k_s$ 使 $k_1\\alpha_1 + \\cdots + k_s\\alpha_s = 0$，则 $\\alpha_1, \\ldots, \\alpha_s$ <strong>线性相关</strong>；否则<strong>线性无关</strong>。
        </div>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>判断方法</th><th>相关</th><th>无关</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">定义法</td><td>存在非零解 $k_1, \\ldots, k_s$</td><td>只有零解</td></tr>
            <tr><td class="font-medium">秩法</td><td>$\\text{rank}(\\alpha_1, \\ldots, \\alpha_s) < s$</td><td>$\\text{rank}(\\alpha_1, \\ldots, \\alpha_s) = s$</td></tr>
            <tr><td class="font-medium">行列式法（方阵）</td><td>$|A| = 0$</td><td>$|A| \\ne 0$</td></tr>
          </tbody>
        </table></div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>常见误区</strong>：① 含零向量的向量组一定线性相关；② 单个非零向量线性无关；③ 两个向量相关 $\\Leftrightarrow$ 对应分量成比例；④ 高维向量组不一定相关（如 $e_1, e_2, \\ldots, e_n$ 无关）。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">极大线性无关组</h4>
        <div class="formula-block">
          向量组中的一个部分组，满足：
          <div class="text-sm text-gray-500 mt-2">① 本身线性无关</div>
          <div class="text-sm text-gray-500">② 再添加任何原组中的向量都变得线性相关</div>
          <div class="text-sm text-gray-500">极大无关组中向量的个数 = 向量组的秩</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">向量空间</h4>
        <div class="formula-block">
          <strong>定义</strong>：向量的非空集合 $V$，对加法和数乘封闭，则 $V$ 是一个向量空间。
          <div class="text-sm text-gray-500 mt-2">基：$V$ 中极大线性无关组</div>
          <div class="text-sm text-gray-500">维数：基中向量的个数，$\\dim(V)$</div>
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>解空间</strong>：$Ax=0$ 的全体解构成的向量空间，维数 = $n - \\text{rank}(A)$</li>
          <li><strong>列空间</strong>：$A$ 的列向量张成的空间，维数 = $\\text{rank}(A)$</li>
          <li><strong>坐标</strong>：任意向量在基下的表示是唯一的</li>
        </ul>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>核心联系</strong>：向量组的秩 = 矩阵的秩 = 行阶梯形中非零行数 = 列空间维数 = 解空间余维数。这些概念通过"秩"统一起来。</div>
        </div>
        <div class="info-box exam">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <div><strong>考点提示</strong>：判断向量组的线性相关性是选择题高频考点。求极大无关组和向量组的秩是计算题。向量空间的概念在理解解的结构时很重要。</div>
        </div>
      ` },
      { id: 'la-06', title: '特征值与特征向量', desc: '特征多项式、对角化条件', icon: 'λ', tags: ['高频核心'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">矩阵的"本征方向"——特征值与特征向量</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          特征值和特征向量揭示了线性变换的本质——哪些方向在变换中只被拉伸而不改变方向。它们在振动分析、主成分分析（PCA）、Google PageRank 等领域有核心应用，是线性代数最重要的概念之一。
        </p>

        <h4 class="font-medium mt-6 mb-2">定义</h4>
        <div class="formula-block">
          $$Ax = \\lambda x \\quad (x \\ne 0)$$
          <div class="text-sm text-gray-500 mt-2">$\\lambda$ 是 $A$ 的特征值，$x$ 是对应于 $\\lambda$ 的特征向量</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">求特征值和特征向量</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>求特征方程</strong>：$|\\lambda E - A| = 0$（或 $|A - \\lambda E| = 0$），展开得到关于 $\\lambda$ 的 $n$ 次方程。</div></div>
          <div class="step-item"><div><strong>解特征方程</strong>：得到所有特征值 $\\lambda_1, \\lambda_2, \\ldots, \\lambda_n$（可能有重根）。</div></div>
          <div class="step-item"><div><strong>求特征向量</strong>：对每个 $\\lambda_i$，解齐次方程组 $(\\lambda_i E - A)x = 0$，得到基础解系就是对应于 $\\lambda_i$ 的特征向量。</div></div>
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>计算技巧</strong>：特征多项式 $|\\lambda E - A|$ 的展开可能很复杂，可以利用"行列式性质 + 特殊结构"简化。对于低阶矩阵，直接展开即可；高阶矩阵可用"行变换化上三角"。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">特征值的性质</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>性质</th><th>公式</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">迹（对角线之和）</td><td>$\\sum \\lambda_i = \\text{tr}(A) = \\sum a_{ii}$</td></tr>
            <tr><td class="font-medium">行列式</td><td>$\\prod \\lambda_i = |A|$</td></tr>
            <tr><td class="font-medium">$A^k$ 的特征值</td><td>$\\lambda_i^k$，特征向量不变</td></tr>
            <tr><td class="font-medium">$A^{-1}$ 的特征值</td><td>$\\frac{1}{\\lambda_i}$（$\\lambda_i \\ne 0$）</td></tr>
            <tr><td class="font-medium">$A^*$ 的特征值</td><td>$\\frac{|A|}{\\lambda_i}$</td></tr>
            <tr><td class="font-medium">$f(A)$ 的特征值</td><td>$f(\\lambda_i)$，其中 $f$ 是多项式</td></tr>
          </tbody>
        </table></div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>重要结论</strong>：不同特征值对应的特征向量线性无关。$k$ 重特征值最多有 $k$ 个线性无关的特征向量（可能少于 $k$ 个）。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">特殊矩阵的特征值</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>实对称矩阵</strong>：特征值都是实数，不同特征值的特征向量正交</li>
          <li><strong>正交矩阵</strong>：特征值的模为 1（$\\lambda = \\pm 1$ 或复数）</li>
          <li><strong>幂等矩阵</strong>（$A^2 = A$）：特征值为 0 或 1</li>
          <li><strong>幂零矩阵</strong>（$A^k = O$）：特征值全为 0</li>
        </ul>
        <div class="info-box exam">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <div><strong>考点提示</strong>：求特征值和特征向量是必考大题。特征值的性质（迹、行列式、$A^k$ 的特征值）是选择题高频考点。实对称矩阵的性质是后续对角化的基础。</div>
        </div>
      ` },
      { id: 'la-07', title: '相似矩阵与对角化', desc: '相似条件、正交相似', icon: '≈', tags: ['核心'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">相似与对角化——简化矩阵运算</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          相似矩阵表示同一线性变换在不同基下的矩阵。对角化就是找到一组特殊的基（特征向量），使得变换矩阵变成对角矩阵，从而大幅简化 <a href="#" onclick="navigateTo('la-06');return false;" style="color:var(--primary)">特征值</a> 相关的运算。
        </p>

        <h4 class="font-medium mt-6 mb-2">相似矩阵的定义</h4>
        <div class="formula-block">
          若存在可逆矩阵 $P$，使得 $B = P^{-1}AP$，则 $A$ 与 $B$ <strong>相似</strong>，记作 $A \\sim B$。
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>相似的性质</strong>：$|A| = |B|$、$\\text{rank}(A) = \\text{rank}(B)$、$\\text{tr}(A) = \\text{tr}(B)$、特征值相同</li>
          <li><strong>注意</strong>：特征值相同不一定相似（还需看能否对角化）</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">矩阵可对角化的条件</h4>
        <div class="formula-block">
          $n$ 阶矩阵 $A$ 可对角化 $\\Leftrightarrow$ $A$ 有 $n$ 个线性无关的特征向量
          $$P^{-1}AP = \\Lambda = \\text{diag}(\\lambda_1, \\lambda_2, \\ldots, \\lambda_n)$$
          <div class="text-sm text-gray-500 mt-2">$P$ 的列是特征向量，$\\Lambda$ 的对角元是对应的特征值</div>
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>充分条件</strong>：$n$ 阶矩阵有 $n$ 个不同特征值 $\\Rightarrow$ 可对角化。实对称矩阵一定可对角化。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">对角化的步骤</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>求特征值</strong>：解 $|\\lambda E - A| = 0$，得到 $\\lambda_1, \\ldots, \\lambda_n$。</div></div>
          <div class="step-item"><div><strong>求特征向量</strong>：对每个 $\\lambda_i$，解 $(\\lambda_i E - A)x = 0$，得到特征向量 $\\xi_i$。</div></div>
          <div class="step-item"><div><strong>检查</strong>：若线性无关的特征向量个数 $< n$，则不可对角化。</div></div>
          <div class="step-item"><div><strong>构造</strong>：$P = (\\xi_1, \\xi_2, \\ldots, \\xi_n)$，$\\Lambda = \\text{diag}(\\lambda_1, \\ldots, \\lambda_n)$。注意 $P$ 中列的顺序与 $\\Lambda$ 对角元的顺序对应。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">实对称矩阵的正交对角化</h4>
        <div class="formula-block">
          实对称矩阵 $A$ 一定可以<strong>正交对角化</strong>：
          $$Q^{-1}AQ = Q^TAQ = \\Lambda$$
          <div class="text-sm text-gray-500 mt-2">$Q$ 是正交矩阵（$Q^TQ = E$），列向量是单位正交的特征向量</div>
        </div>
        <div class="step-list">
          <div class="step-item"><div><strong>求特征值和特征向量</strong>：同上。</div></div>
          <div class="step-item"><div><strong>施密特正交化</strong>：若某个特征值有多个线性无关的特征向量，需对它们正交化。</div></div>
          <div class="step-item"><div><strong>单位化</strong>：把所有特征向量单位化（除以模长）。</div></div>
          <div class="step-item"><div><strong>构造</strong>：$Q = (e_1, e_2, \\ldots, e_n)$，其中 $e_i$ 是单位正交特征向量。</div></div>
        </div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>正交化只在重根时需要</strong>：不同特征值的特征向量天然正交（实对称矩阵），只有同一个特征值有多个特征向量时才需要施密特正交化。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">对角化的应用</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>求 $A^k$</strong>：$A^k = P\\Lambda^k P^{-1}$，对角矩阵的幂只需对角元求幂</li>
          <li><strong>求 $f(A)$</strong>：$f(A) = Pf(\\Lambda)P^{-1}$</li>
          <li><strong>判断相似</strong>：两个矩阵相似 $\\Leftrightarrow$ 有相同的特征值且都可对角化</li>
        </ul>
        <div class="info-box exam">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <div><strong>考点提示</strong>：判断矩阵能否对角化是选择题高频考点。实对称矩阵的正交对角化是解答题必考内容。求 $A^k$ 是对角化的典型应用。</div>
        </div>
      ` },
      { id: 'la-08', title: '二次型及其标准形', desc: '配方法、正交变换化标准形', icon: '⊕', tags: ['高频'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">二次型——多元二次函数的标准化</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          二次型是 $n$ 个变量的二次齐次多项式，通过坐标变换可化为只含平方项的标准形。它在优化理论（判断极值）、几何（二次曲面分类）、统计（协方差矩阵）中有重要应用，是 <a href="#" onclick="navigateTo('la-07');return false;" style="color:var(--primary)">对角化</a> 的直接应用。
        </p>

        <h4 class="font-medium mt-6 mb-2">二次型的矩阵表示</h4>
        <div class="formula-block">
          $$f(x_1, \\ldots, x_n) = \\sum_{i=1}^{n} \\sum_{j=1}^{n} a_{ij} x_i x_j = x^T A x$$
          <div class="text-sm text-gray-500 mt-2">$A$ 是实对称矩阵（$a_{ij} = a_{ji}$），称为二次型的矩阵</div>
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>秩</strong>：二次型的秩 = 矩阵 $A$ 的秩</li>
          <li><strong>标准形</strong>：只含平方项 $f = d_1 y_1^2 + d_2 y_2^2 + \\cdots + d_n y_n^2$</li>
          <li><strong>规范形</strong>：系数为 $1, -1, 0$ 的标准形</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">化二次型为标准形</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>方法</th><th>变换类型</th><th>特点</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">正交变换法</td><td>$x = Qy$（$Q$ 正交）</td><td>保长度和角度，系数是特征值</td></tr>
            <tr><td class="font-medium">配方法</td><td>$x = Cy$（$C$ 可逆）</td><td>计算简单，但不保几何性质</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">正交变换法（与对角化相同）</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>写出矩阵</strong>：$A$（实对称矩阵）。</div></div>
          <div class="step-item"><div><strong>求特征值</strong>：$|\\lambda E - A| = 0$，得到 $\\lambda_1, \\ldots, \\lambda_n$。</div></div>
          <div class="step-item"><div><strong>求特征向量</strong>：对每个 $\\lambda_i$，解 $(\\lambda_i E - A)x = 0$。</div></div>
          <div class="step-item"><div><strong>正交化+单位化</strong>：构造正交矩阵 $Q$。</div></div>
          <div class="step-item"><div><strong>写出标准形</strong>：$f = \\lambda_1 y_1^2 + \\lambda_2 y_2^2 + \\cdots + \\lambda_n y_n^2$。</div></div>
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>正交变换法的优点</strong>：标准形的系数直接就是特征值，而且变换保持几何形状不变（旋转/反射）。这是最常用的方法。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">配方法</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          对含 $x_i$ 的所有项进行配方，逐步消去交叉项。
        </p>
        <div class="formula-block">
          <strong>例</strong>：$f = x_1^2 + 2x_1x_2 + 2x_2^2$
          <div class="text-sm text-gray-500 mt-2">配方：$f = (x_1 + x_2)^2 + x_2^2$</div>
          <div class="text-sm text-gray-500">令 $y_1 = x_1 + x_2, y_2 = x_2$，则 $f = y_1^2 + y_2^2$</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">惯性定理</h4>
        <div class="formula-block">
          无论用什么可逆变换化为标准形，正系数个数 $p$（正惯性指数）和负系数个数 $q$（负惯性指数）是不变的。
          <div class="text-sm text-gray-500 mt-2">秩 $r = p + q$，符号差 $= p - q$</div>
        </div>
        <div class="info-box exam">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <div><strong>考点提示</strong>：用正交变换化二次型为标准形是解答题必考内容。配方法是备选方案。惯性定理（正负惯性指数不变）是选择题常客。</div>
        </div>
      ` },
      { id: 'la-09', title: '正交矩阵与正交变换', desc: '施密特正交化、正定二次型', icon: '⊥', tags: [], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">正交性与正定性</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          正交矩阵和正交变换保持向量的长度和角度不变，是 <a href="#" onclick="navigateTo('la-07');return false;" style="color:var(--primary)">正交对角化</a> 的基础。正定二次型则与函数极值判断、优化理论密切相关。
        </p>

        <h4 class="font-medium mt-6 mb-2">施密特正交化</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          把线性无关的向量组变成正交向量组的方法。
        </p>
        <div class="formula-block">
          给定线性无关的 $\\alpha_1, \\alpha_2, \\alpha_3$：
          $$\\beta_1 = \\alpha_1$$
          $$\\beta_2 = \\alpha_2 - \\frac{(\\alpha_2, \\beta_1)}{(\\beta_1, \\beta_1)} \\beta_1$$
          $$\\beta_3 = \\alpha_3 - \\frac{(\\alpha_3, \\beta_1)}{(\\beta_1, \\beta_1)} \\beta_1 - \\frac{(\\alpha_3, \\beta_2)}{(\\beta_2, \\beta_2)} \\beta_2$$
          <div class="text-sm text-gray-500 mt-2">再单位化：$e_i = \\frac{\\beta_i}{|\\beta_i|}$，得到标准正交向量组</div>
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>口诀</strong>：逐个减去在前面方向上的投影。$\\beta_2$ 只减去 $\\beta_1$ 方向的分量，$\\beta_3$ 减去 $\\beta_1$ 和 $\\beta_2$ 方向的分量，以此类推。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">正交矩阵</h4>
        <div class="formula-block">
          $$Q^T Q = Q Q^T = E \\quad \\Leftrightarrow \\quad Q^{-1} = Q^T$$
          <div class="text-sm text-gray-500 mt-2">正交矩阵的行列式 $|Q| = \\pm 1$</div>
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>几何意义</strong>：正交变换 = 旋转 + 反射，保持长度和角度不变</li>
          <li><strong>列（行）向量</strong>：正交矩阵的列向量组是标准正交向量组</li>
          <li><strong>性质</strong>：正交矩阵的乘积仍为正交矩阵，逆仍为正交矩阵</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">正定二次型</h4>
        <div class="formula-block">
          $$f = x^T A x > 0, \\quad \\forall x \\ne 0$$
          <div class="text-sm text-gray-500 mt-2">$A$ 正定 $\\Leftrightarrow$ 所有特征值 $> 0$ $\\Leftrightarrow$ 所有顺序主子式 $> 0$</div>
        </div>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>类型</th><th>条件</th><th>特征值</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">正定</td><td>$f > 0$（$\\forall x \\ne 0$）</td><td>全 $> 0$</td></tr>
            <tr><td class="font-medium">负定</td><td>$f < 0$（$\\forall x \\ne 0$）</td><td>全 $< 0$</td></tr>
            <tr><td class="font-medium">半正定</td><td>$f \\ge 0$（$\\forall x$）</td><td>$\\ge 0$</td></tr>
            <tr><td class="font-medium">半负定</td><td>$f \\le 0$（$\\forall x$）</td><td>$\\le 0$</td></tr>
            <tr><td class="font-medium">不定</td><td>有正有负</td><td>有正有负</td></tr>
          </tbody>
        </table></div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>判断正定的方法</strong>：① 特征值全正；② 顺序主子式全正；③ 定义法（$x^TAx > 0$）。方法①和②最常用，方法③适合抽象证明。注意：正定矩阵一定是对称矩阵！</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">正定矩阵的性质</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li>$A$ 正定 $\\Rightarrow$ $A^{-1}$ 正定</li>
          <li>$A$ 正定 $\\Rightarrow$ $A^*$ 正定</li>
          <li>$A, B$ 正定 $\\Rightarrow$ $A + B$ 正定</li>
          <li>$A$ 正定 $\\Rightarrow$ $|A| > 0$（但 $|A| > 0$ 不能推出正定）</li>
        </ul>
        <div class="info-box exam">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <div><strong>考点提示</strong>：施密特正交化是计算题基本功。判断正定性（顺序主子式或特征值）是选择题高频考点。正交矩阵的性质（$|Q|=\\pm1$、列正交）也常考。</div>
        </div>
      ` },
      { id: 'la-10', title: '线性空间与线性变换', desc: '抽象空间、变换矩阵（进阶）', icon: '⟨⟩', tags: ['进阶'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">抽象的线性世界</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          线性空间是向量空间的抽象推广，线性变换是矩阵的抽象本质。本节将前面的概念提升到更一般的框架，是理解现代数学和工程中抽象代数思想的基础。这部分内容较抽象，但核心思想与前面一脉相承。
        </p>

        <h4 class="font-medium mt-6 mb-2">线性空间的定义</h4>
        <div class="formula-block">
          非空集合 $V$，定义了加法和数乘两种运算，满足八条公理（封闭性、结合律、交换律、零元、负元、数乘结合律、数乘分配律），则 $V$ 是一个<strong>线性空间</strong>（向量空间）。
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>$\\mathbb{R}^n$</strong>：$n$ 维实向量空间，最常见的线性空间</li>
          <li><strong>多项式空间 $P_n[x]$</strong>：次数不超过 $n$ 的多项式全体</li>
          <li><strong>矩阵空间 $M_{m \\times n}$</strong>：$m \\times n$ 矩阵全体</li>
          <li><strong>函数空间</strong>：满足一定条件的函数全体</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">基、维数与坐标</h4>
        <div class="formula-block">
          <strong>基</strong>：线性空间中极大线性无关组，是"坐标系"的抽象
          <div class="text-sm text-gray-500 mt-2"><strong>维数</strong>：基中向量的个数，$\\dim(V)$</div>
          <div class="text-sm text-gray-500"><strong>坐标</strong>：任意向量在基下的表示是唯一的线性组合系数</div>
        </div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>例子</strong>：$P_2[x]$（二次多项式空间）的基可以是 $\\{1, x, x^2\\}$，维数为 3。多项式 $3 + 2x - x^2$ 在这组基下的坐标是 $(3, 2, -1)$。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">过渡矩阵与坐标变换</h4>
        <div class="formula-block">
          两组基 $\\alpha_1, \\ldots, \\alpha_n$ 和 $\\beta_1, \\ldots, \\beta_n$ 之间的关系：
          $$(\\beta_1, \\ldots, \\beta_n) = (\\alpha_1, \\ldots, \\alpha_n) P$$
          <div class="text-sm text-gray-500 mt-2">$P$ 是过渡矩阵，坐标变换：$x_\\alpha = P x_\\beta$</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">线性变换</h4>
        <div class="formula-block">
          映射 $T: V \\to V$ 满足：
          $$T(\\alpha + \\beta) = T(\\alpha) + T(\\beta)$$
          $$T(k\\alpha) = kT(\\alpha)$$
          <div class="text-sm text-gray-500 mt-2">则 $T$ 是 $V$ 上的线性变换</div>
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>核</strong>：$\\ker(T) = \\{\\alpha \\in V : T(\\alpha) = 0\\}$，是 $V$ 的子空间</li>
          <li><strong>像</strong>：$\\text{Im}(T) = \\{T(\\alpha) : \\alpha \\in V\\}$，是 $V$ 的子空间</li>
          <li><strong>维数公式</strong>：$\\dim(\\ker T) + \\dim(\\text{Im} T) = \\dim V$</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">线性变换的矩阵表示</h4>
        <div class="formula-block">
          选定基 $\\alpha_1, \\ldots, \\alpha_n$ 后，线性变换 $T$ 对应一个 $n \\times n$ 矩阵 $A$：
          $$T(\\alpha_1, \\ldots, \\alpha_n) = (\\alpha_1, \\ldots, \\alpha_n) A$$
          <div class="text-sm text-gray-500 mt-2">$A$ 的第 $j$ 列是 $T(\\alpha_j)$ 在基 $\\alpha_1, \\ldots, \\alpha_n$ 下的坐标</div>
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>核心思想</strong>：线性变换是"本质"，矩阵是它在某组基下的"表示"。同一个变换在不同基下对应不同的矩阵（相似矩阵）。对角化就是找到使变换矩阵最简单的那组基（特征向量）。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">不变子空间</h4>
        <div class="formula-block">
          子空间 $W$ 满足 $T(W) \\subseteq W$，则 $W$ 是 $T$ 的<strong>不变子空间</strong>。
          <div class="text-sm text-gray-500 mt-2">特征子空间是不变子空间；$\\ker T$ 和 $\\text{Im} T$ 都是不变子空间</div>
        </div>
        <div class="info-box exam">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <div><strong>考点提示</strong>：线性空间和线性变换是进阶内容，考查频率较低但概念深刻。重点理解：基与坐标的关系、线性变换的矩阵表示、核与像的维数公式。这些概念有助于理解前面各节的统一框架。</div>
        </div>
      ` },
    ]
  },

  // ========== 电路基础 ==========
  'circuit-basics': {
    title: '电子电路基础',
    subtitle: '电路分析入门，所有电子课程的共同地基',
    icon: '🔵',
    sections: [
      { id: 'circ-01', title: '基尔霍夫定律', desc: 'KCL/KVL、节点法、网孔法', icon: '⚡', tags: ['基础必学'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">基尔霍夫定律：电路分析的地基</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">基尔霍夫定律（KCL/KVL）是所有电路分析的出发点，无论电路多复杂，归根结底都基于这两条定律。掌握节点电压法和网孔电流法，就能系统化求解任何线性电路。本节是整个<a href="#" onclick="navigateTo('circuit-basics');return false;" style="color:var(--primary)">电路基础</a>板块的基石，后续的<a href="#" onclick="navigateTo('circ-02');return false;" style="color:var(--primary)">戴维南定理</a>、<a href="#" onclick="navigateTo('circ-03');return false;" style="color:var(--primary)">叠加定理</a>都建立在此基础上。</p>

        <h4 class="font-medium mt-6 mb-2">KCL：电流连续性原理</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">基尔霍夫电流定律（KCL）指出：任意时刻，流入任一节点的电流代数和为零。其物理本质是<strong>电荷守恒</strong>——电荷不会在节点处积累或消失。</p>
        <div class="formula-block">KCL 数学表达：$\\sum_{k=1}^{n} i_k = 0$<br>或等价形式：$\\sum i_{in} = \\sum i_{out}$（流入 = 流出）<div class="text-sm text-gray-500 mt-2">n 为连接该节点的支路数，电流方向可任意假定（若为负值则实际方向与假定相反）</div></div>

        <h4 class="font-medium mt-6 mb-2">KVL：电压环路原理</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">基尔霍夫电压定律（KVL）指出：任意时刻，沿任一闭合回路各段电压的代数和为零。其物理本质是<strong>能量守恒</strong>——单位电荷绕行一周回到原点，电场力做功为零。</p>
        <div class="formula-block">KVL 数学表达：$\\sum_{k=1}^{m} u_k = 0$<br>或等价形式：$\\sum u_{rise} = \\sum u_{drop}$（升压 = 降压）<div class="text-sm text-gray-500 mt-2">m 为回路中的支路数，绕行方向可顺时针或逆时针（结果一致）</div></div>

        <h4 class="font-medium mt-6 mb-2">节点电压法：系统化求解利器</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">节点电压法以各节点对参考点（地）的电压为未知量，对每个非参考节点列写 KCL 方程。设电路有 n 个节点，则需列写 n-1 个方程。对于含理想电压源的支路，可直接利用电压源值简化方程。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：选参考节点</strong>。通常选择连接支路最多的节点为参考点（地），记为 GND。</div></div><div class="step-item"><div><strong>第二步：设节点电压</strong>。令其余 n-1 个节点对地的电压为未知量 $V_1, V_2, \\cdots, V_{n-1}$。</div></div><div class="step-item"><div><strong>第三步：列 KCL 方程</strong>。对每个非参考节点，用节点电压表示各支路电流，令流入电流之和为零。</div></div><div class="step-item"><div><strong>第四步：解方程组</strong>。用消元法或矩阵法求解节点电压，进而求各支路电流和功率。</div></div></div>

        <h4 class="font-medium mt-6 mb-2">网孔电流法：平面电路的捷径</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">网孔电流法以各独立网孔的假想环流为未知量，对每个网孔列写 KVL 方程。仅适用于<strong>平面电路</strong>（可画在平面上且支路不交叉）。设电路有 m 个独立网孔，则需列写 m 个方程。</p>
        <div class="formula-block">网孔电流法标准形式（两网孔）：<br>$$(R_{11}+R_{12})I_1 - R_{12}I_2 = V_{s1}$$$$-R_{12}I_1 + (R_{22}+R_{12})I_2 = V_{s2}$$<div class="text-sm text-gray-500 mt-2">$R_{kk}$：第 k 个网孔的自阻（网孔内所有电阻之和）；$R_{jk}$：网孔 j 和 k 的互阻（公共支路电阻）；$V_{sk}$：第 k 个网孔的等效电压源</div></div>

        <h4 class="font-medium mt-6 mb-2">节点法 vs 网孔法：如何选择</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>对比维度</th><th>节点电压法</th><th>网孔电流法</th></tr></thead><tbody><tr><td class="font-medium">未知量</td><td>节点对地电压 $V_k$</td><td>网孔环流 $I_k$</td></tr><tr><td class="font-medium">方程数</td><td>n-1（n 为节点数）</td><td>m（m 为独立网孔数）</td></tr><tr><td class="font-medium">适用场景</td><td>节点少、并联多、含电流源</td><td>网孔少、串联多、含电压源</td></tr><tr><td class="font-medium">方程类型</td><td>KCL 方程（电流求和）</td><td>KVL 方程（电压求和）</td></tr><tr><td class="font-medium">优势</td><td>处理并联电路方便</td><td>处理串联电路方便</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">实例计算：节点法求解电路</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">已知电路：$V_s=12V$，$R_1=2k\\Omega$，$R_2=4k\\Omega$，$R_3=4k\\Omega$。求各支路电流。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：选参考点</strong>。选下方节点为地，上方节点电压为 $V_1$。</div></div><div class="step-item"><div><strong>第二步：列 KCL</strong>。流入节点 1 的电流之和为零：$\\frac{V_s-V_1}{R_1} = \\frac{V_1}{R_2} + \\frac{V_1}{R_3}$</div></div><div class="step-item"><div><strong>第三步：代入数值</strong>。$\\frac{12-V_1}{2k} = \\frac{V_1}{4k} + \\frac{V_1}{4k}$，化简得 $12-V_1 = V_1$，解得 $V_1=6V$。</div></div><div class="step-item"><div><strong>第四步：求支路电流</strong>。$I_1=\\frac{12-6}{2k}=3mA$，$I_2=I_3=\\frac{6}{4k}=1.5mA$。验证：$I_1=I_2+I_3$ ✓</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>选型口诀</strong>：节点少用节点法，网孔少用网孔法。含理想电压源优先节点法（电压源接参考点则该节点电压已知），含理想电流源优先网孔法（电流源所在网孔电流已知）。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>常见错误</strong>：①网孔电流法中，互阻 $R_{12}$ 前的负号容易遗漏（两网孔电流方向相反时取负）；②节点法中，受控源的控制量必须用节点电压表示后才能求解；③KCL/KVL 只适用于集总参数电路（电路尺寸远小于信号波长）。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>工程应用</strong>：在实际电路仿真软件（如 SPICE）中，节点法是核心算法——将电路转化为节点导纳矩阵 $YV=I$，用高斯消元法求解。理解节点法有助于理解仿真原理和调试收敛问题。</div></div>
      ` },
      { id: 'circ-02', title: '戴维南/诺顿等效', desc: '等效电源定理、等效电阻', icon: '🔀', tags: ['高频'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">戴维南定理：化繁为简的利器</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">任何含源线性二端网络，对外电路而言都可等效为一个<strong>电压源串联电阻</strong>（戴维南）或<strong>电流源并联电阻</strong>（诺顿）。这是简化复杂电路、求最大功率传输的核心工具。戴维南定理建立在<a href="#" onclick="navigateTo('circ-01');return false;" style="color:var(--primary)">基尔霍夫定律</a>基础上，是线性电路叠加性的直接推论。</p>

        <h4 class="font-medium mt-6 mb-2">戴维南定理的数学表述</h4>
        <div class="formula-block">戴维南等效电路：$U = U_{oc} - R_{eq} \\cdot I$<br>其中：$U_{oc}$ 为端口开路电压（$I=0$ 时的端口电压）；$R_{eq}$ 为等效电阻<div class="text-sm text-gray-500 mt-2">对外电路而言，任何线性二端网络都可等效为电压源 $U_{oc}$ 串联电阻 $R_{eq}$</div></div>

        <h4 class="font-medium mt-6 mb-2">诺顿定理：对偶形式</h4>
        <div class="formula-block">诺顿等效电路：$I = I_{sc} - \\frac{U}{R_{eq}}$<br>其中：$I_{sc}$ 为端口短路电压（$U=0$ 时的端口电流）；$R_{eq}$ 为等效电阻（与戴维南相同）<div class="text-sm text-gray-500 mt-2">戴维南与诺顿互为对偶：$U_{oc} = I_{sc} \\cdot R_{eq}$</div></div>

        <h4 class="font-medium mt-6 mb-2">求解步骤：三步法</h4>
        <div class="step-list"><div class="step-item"><div><strong>第一步：求开路电压 $U_{oc}$</strong>。移去负载，求端口开路时的电压。可用节点法、网孔法或叠加定理。</div></div><div class="step-item"><div><strong>第二步：求等效电阻 $R_{eq}$</strong>。①独立源置零（电压源短路、电流源开路），从端口求等效电阻；②含受控源时用"加压求流法"或"$R_{eq}=U_{oc}/I_{sc}$"。</div></div><div class="step-item"><div><strong>第三步：画等效电路</strong>。用戴维南等效（电压源串联电阻）或诺顿等效（电流源并联电阻）替代原二端网络，接上负载求解。</div></div></div>

        <h4 class="font-medium mt-6 mb-2">戴维南 vs 诺顿：对比</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>对比维度</th><th>戴维南等效</th><th>诺顿等效</th></tr></thead><tbody><tr><td class="font-medium">等效形式</td><td>电压源 $U_{oc}$ 串联 $R_{eq}$</td><td>电流源 $I_{sc}$ 并联 $R_{eq}$</td></tr><tr><td class="font-medium">参数关系</td><td>$U_{oc} = I_{sc} \\cdot R_{eq}$</td><td>$I_{sc} = U_{oc} / R_{eq}$</td></tr><tr><td class="font-medium">适用场景</td><td>负载变化但内部不变</td><td>负载变化但内部不变</td></tr><tr><td class="font-medium">优势</td><td>直观（电压源更常见）</td><td>并联电路分析方便</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">实例计算：戴维南等效求解</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">已知电路：$V_s=10V$，$R_1=2k\\Omega$，$R_2=3k\\Omega$，$R_3=6k\\Omega$。求 a、b 端口的戴维南等效电路。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：求 $U_{oc}$</strong>。断开 a、b 端口，$R_3$ 无电流流过。$U_{oc}=V_s \\cdot \\frac{R_2}{R_1+R_2}=10 \\cdot \\frac{3}{5}=6V$</div></div><div class="step-item"><div><strong>第二步：求 $R_{eq}$</strong>。独立源 $V_s$ 置零（短路），从 a、b 看进去：$R_{eq}=R_3+R_1 \\parallel R_2=6k+1.2k=7.2k\\Omega$</div></div><div class="step-item"><div><strong>第三步：画等效电路</strong>。戴维南等效为 $U_{oc}=6V$ 串联 $R_{eq}=7.2k\\Omega$。接上负载 $R_L$ 后，$I=\\frac{6}{7.2k+R_L}$</div></div></div>

        <h4 class="font-medium mt-6 mb-2">最大功率传输条件</h4>
        <div class="formula-block">当 $R_L = R_{eq}$ 时，负载获得最大功率：<br>$$P_{max} = \\frac{U_{oc}^2}{4R_{eq}}$$<div class="text-sm text-gray-500 mt-2">此时效率 $\\eta=50\\%$（一半功率消耗在内阻上）</div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>工程应用</strong>：戴维南定理在电路调试中极为实用——只需测量开路电压和短路电流（$R_{eq}=U_{oc}/I_{sc}$），即可建立等效模型，无需知道内部电路细节。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>受控源不能置零</strong>：求 $R_{eq}$ 时只有<strong>独立源</strong>置零，受控源必须保留（它受电路变量控制，不能人为消除）。含受控源的电路必须用开路电压/短路电流法或加压求流法。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>与叠加定理的关系</strong>：戴维南定理是<a href="#" onclick="navigateTo('circ-03');return false;" style="color:var(--primary)">叠加定理</a>的直接推论——将复杂电路等效为单一激励源，简化分析。在<a href="#" onclick="navigateTo('act-01');return false;" style="color:var(--primary)">自动控制</a>中，传递函数的推导也用到类似思想。</div></div>
      ` },
      { id: 'circ-03', title: '叠加定理与齐次定理', desc: '线性电路叠加原理', icon: '➗', tags: ['基础'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">叠加定理：线性系统的分解艺术</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">线性电路中，多个激励共同作用产生的响应，等于每个激励<strong>单独作用</strong>产生响应的代数和。这让复杂多源电路可以拆解为单源电路逐个求解。叠加定理是<a href="#" onclick="navigateTo('circ-01');return false;" style="color:var(--primary)">基尔霍夫定律</a>的直接推论，也是<a href="#" onclick="navigateTo('circ-02');return false;" style="color:var(--primary)">戴维南定理</a>的理论基础。</p>

        <h4 class="font-medium mt-6 mb-2">叠加定理的数学表述</h4>
        <div class="formula-block">对于线性电路，多个独立源共同作用时的响应：<br>$$U = U_1 + U_2 + \\cdots + U_n$$$$I = I_1 + I_2 + \\cdots + I_n$$<div class="text-sm text-gray-500 mt-2">下标 1,2,...,n 表示各独立源单独作用时的响应分量</div></div>

        <h4 class="font-medium mt-6 mb-2">齐次定理（比例性）</h4>
        <div class="formula-block">齐次定理：若激励扩大 $k$ 倍，则响应也扩大 $k$ 倍<br>$$f(k \\cdot x) = k \\cdot f(x)$$<div class="text-sm text-gray-500 mt-2">齐次性是线性系统的必要条件，与叠加性共同构成"线性"的完整定义</div></div>

        <h4 class="font-medium mt-6 mb-2">叠加法求解步骤</h4>
        <div class="step-list"><div class="step-item"><div><strong>第一步：画分电路</strong>。每次只保留一个独立源，其余独立源置零（电压源短路、电流源开路），受控源始终保留。</div></div><div class="step-item"><div><strong>第二步：求分响应</strong>。对每个分电路，用<a href="#" onclick="navigateTo('circ-01');return false;" style="color:var(--primary)">节点法或网孔法</a>求解目标支路的电压或电流分量。</div></div><div class="step-item"><div><strong>第三步：代数叠加</strong>。将各分响应按参考方向代数相加（同向取正、反向取负），得到总响应。</div></div></div>

        <h4 class="font-medium mt-6 mb-2">"单独作用"的正确理解</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>电压源单独作用</strong>：其他电压源短路（用导线替代）、其他电流源开路（断开）</li>
          <li><strong>电流源单独作用</strong>：其他电流源开路、其他电压源短路</li>
          <li><strong>受控源</strong>：始终保留（它受电路变量控制，不能人为消除）</li>
          <li><strong>响应类型</strong>：叠加只适用于<strong>电压和电流</strong>，不适用于功率（功率是非线性的）</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">实例计算：双源电路叠加</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">已知电路：$V_s=10V$，$I_s=2mA$，$R_1=R_2=R_3=2k\\Omega$。求 $R_3$ 两端电压 $U_3$。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：$V_s$ 单独作用</strong>。$I_s$ 开路，$R_2$ 和 $R_3$ 串联后与 $R_1$ 并联。$U_3'=V_s \\cdot \\frac{R_3}{R_1+R_2+R_3}=10 \\cdot \\frac{2}{6}=3.33V$</div></div><div class="step-item"><div><strong>第二步：$I_s$ 单独作用</strong>。$V_s$ 短路，$R_1$ 被短路。$I_s$ 在 $R_2$ 和 $R_3$ 间分流：$U_3''=I_s \\cdot \\frac{R_2 \\cdot R_3}{R_2+R_3}=2mA \\cdot 1k=2V$</div></div><div class="step-item"><div><strong>第三步：叠加</strong>。$U_3=U_3'+U_3''=3.33+2=5.33V$。注意极性：两个分量方向相同，取正值。</div></div></div>

        <h4 class="font-medium mt-6 mb-2">叠加定理 vs 戴维南定理</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>对比维度</th><th>叠加定理</th><th>戴维南定理</th></tr></thead><tbody><tr><td class="font-medium">核心思想</td><td>多源分解为单源</td><td>复杂网络等效为简单源</td></tr><tr><td class="font-medium">适用范围</td><td>线性电路的电压/电流</td><td>线性二端网络</td></tr><tr><td class="font-medium">优势</td><td>物理概念清晰</td><td>简化外部电路分析</td></tr><tr><td class="font-medium">局限</td><td>不能直接求功率</td><td>只能求端口特性</td></tr></tbody></table></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>叠加法优势</strong>：当电路含有多个不同频率的交流源时，叠加法是唯一有效的方法——因为<a href="#" onclick="navigateTo('circ-06');return false;" style="color:var(--primary)">相量法</a>只能处理单一频率，不同频率的响应必须分别用相量法求解后在时域叠加。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>功率不能叠加</strong>：$P = UI = (U_1+U_2)(I_1+I_2) \\ne U_1I_1 + U_2I_2$。求功率必须先叠加求出总电压总电流，再相乘。这是初学者最常犯的错误之一。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>线性系统的本质</strong>：叠加性和齐次性共同定义了"线性"。在<a href="#" onclick="navigateTo('act-01');return false;" style="color:var(--primary)">自动控制</a>中，传递函数描述的也是线性系统——满足叠加原理，才能用拉普拉斯变换分析。</div></div>
      ` },
      { id: 'circ-04', title: '一阶电路暂态', desc: 'RC/RL、三要素法', icon: '📈', tags: ['核心'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">一阶电路暂态：三要素法秒杀</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">RC/RL 电路在换路（开关动作）后，电压电流按指数规律从初值过渡到稳态值。掌握"三要素法"，任何一阶暂态问题都能套公式秒解。一阶暂态是<a href="#" onclick="navigateTo('circ-05');return false;" style="color:var(--primary)">二阶暂态</a>的基础，也是<a href="#" onclick="navigateTo('act-05');return false;" style="color:var(--primary)">自动控制时域分析</a>的物理原型。</p>

        <h4 class="font-medium mt-6 mb-2">三要素法通用公式</h4>
        <div class="formula-block"><strong>三要素法</strong>：一阶电路暂态响应的通用表达式<br>$$f(t) = f(\\infty) + [f(0_+) - f(\\infty)]e^{-t/\\tau}$$<div class="text-sm text-gray-500 mt-2">三个要素：初值 $f(0_+)$、稳态值 $f(\\infty)$、时间常数 $\\tau$</div></div>

        <h4 class="font-medium mt-6 mb-2">时间常数的物理意义</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>电路类型</th><th>时间常数 $\\tau$</th><th>物理意义</th><th>典型值</th></tr></thead><tbody><tr><td class="font-medium">RC 电路</td><td>$\\tau = RC$</td><td>电容充放电快慢</td><td>μs ~ s</td></tr><tr><td class="font-medium">RL 电路</td><td>$\\tau = L/R$</td><td>电感储能释放快慢</td><td>μs ~ ms</td></tr></tbody></table></div>
        <div class="formula-block">时间常数的工程意义：<br>$t=\\tau$ 时，响应完成 63.2%<br>$t=3\\tau$ 时，响应完成 95%<br>$t=5\\tau$ 时，响应完成 99.3%（工程上认为暂态结束）<div class="text-sm text-gray-500 mt-2">$\\tau$ 越大暂态越慢，$\\tau$ 越小暂态越快</div></div>

        <div class="chart-container" data-chart="rc-waveform" data-resistance="1000" data-capacitance="1e-6" data-voltage="5" data-title="RC 一阶电路充放电"></div>
        <div class="text-xs text-center mt-1 mb-4" style="color:var(--text-secondary)">蓝色=充电，红色=放电，τ=1ms</div>

        <h4 class="font-medium mt-6 mb-2">换路定律：状态连续性</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>电容电压不突变</strong>：$u_C(0_+)=u_C(0_-)$（电容储能 $\\frac{1}{2}Cu_C^2$ 不能突变）</li>
          <li><strong>电感电流不突变</strong>：$i_L(0_+)=i_L(0_-)$（电感储能 $\\frac{1}{2}Li_L^2$ 不能突变）</li>
          <li><strong>可突变量</strong>：电容电流 $i_C$、电感电压 $u_L$、电阻电压电流均可突变</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">三要素求解步骤</h4>
        <div class="step-list"><div class="step-item"><div><strong>第一步：求初值 $f(0_+)$</strong>。先求 $t=0_-$ 时的 $u_C(0_-)$ 或 $i_L(0_-)$，利用换路定律得 $0_+$ 值，再根据 $0_+$ 等效电路求其他量。</div></div><div class="step-item"><div><strong>第二步：求稳态值 $f(\\infty)$</strong>。$t\\to\\infty$ 时电容开路、电感短路，画出直流稳态电路求解。</div></div><div class="step-item"><div><strong>第三步：求时间常数 $\\tau$</strong>。从储能元件（C 或 L）两端看进去的等效电阻 $R_{eq}$，$\\tau=RC$ 或 $\\tau=L/R_{eq}$。</div></div><div class="step-item"><div><strong>第四步：代入公式</strong>。将三要素代入通用公式，写出完整响应表达式。</div></div></div>

        <h4 class="font-medium mt-6 mb-2">实例计算：RC 充电电路</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">已知：$V_s=10V$，$R=1k\\Omega$，$C=1\\mu F$，开关闭合前电容电压为零。求开关闭合后的 $u_C(t)$ 和 $i_C(t)$。</p>
        <div class="step-list"><div class="step-item"><div><strong>求 $u_C(0_+)$</strong>：$u_C(0_-)=0$，由换路定律 $u_C(0_+)=0V$</div></div><div class="step-item"><div><strong>求 $u_C(\\infty)$</strong>：稳态时电容开路，$u_C(\\infty)=V_s=10V$</div></div><div class="step-item"><div><strong>求 $\\tau$</strong>：$\\tau=RC=1k \\times 1\\mu=1ms$</div></div><div class="step-item"><div><strong>代入公式</strong>：$u_C(t)=10+(0-10)e^{-t/1ms}=10(1-e^{-1000t})V$<br>$i_C(t)=C\\frac{du_C}{dt}=10mA \\cdot e^{-1000t}$</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>三要素法的普适性</strong>：无论电路多复杂，只要是一阶系统（只有一个储能元件），都能用三要素法。关键是正确求出三个要素——初值、稳态值、时间常数。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>常见错误</strong>：①求 $R_{eq}$ 时忘记将独立源置零；②混淆 $0_+$ 和 $0_-$ 时刻的电路；③时间常数公式记反（RC 是 τ，L/R 也是 τ，不是 R/L）。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>与控制理论的联系</strong>：一阶 RC 电路的传递函数为 $H(s)=\\frac{1}{1+sRC}$，正是<a href="#" onclick="navigateTo('act-05');return false;" style="color:var(--primary)">一阶系统</a>的典型形式。时间常数 $\\tau=RC$ 决定了系统的响应速度。</div></div>
      ` },
      { id: 'circ-05', title: '二阶电路暂态', desc: 'RLC 过阻尼/临界/欠阻尼', icon: '〰', tags: ['难点'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">二阶电路：振荡的起源</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">RLC 串联/并联电路是二阶系统，其暂态响应由阻尼比决定——过阻尼单调衰减、临界阻尼最快无振荡收敛、欠阻尼衰减振荡。这与 <a href="#" onclick="navigateTo('act-05');return false;" style="color:var(--primary)">自动控制的二阶系统</a> 完全对应。二阶暂态建立在<a href="#" onclick="navigateTo('circ-04');return false;" style="color:var(--primary)">一阶暂态</a>基础上，增加了振荡的可能性。</p>

        <h4 class="font-medium mt-6 mb-2">RLC 串联电路的特征方程</h4>
        <div class="formula-block">RLC 串联电路特征方程：$s^2 + 2\\alpha s + \\omega_0^2 = 0$<br>其中：$\\alpha = \\frac{R}{2L}$（衰减常数），$\\omega_0 = \\frac{1}{\\sqrt{LC}}$（无阻尼自然振荡频率）<div class="text-sm text-gray-500 mt-2">特征根 $s_{1,2} = -\\alpha \\pm \\sqrt{\\alpha^2 - \\omega_0^2}$，根的性质决定响应类型</div></div>

        <h4 class="font-medium mt-6 mb-2">阻尼比与响应类型</h4>
        <div class="formula-block">阻尼比定义：$\\zeta = \\frac{\\alpha}{\\omega_0} = \\frac{R}{2}\\sqrt{\\frac{C}{L}}$<br>阻尼振荡频率：$\\omega_d = \\omega_0\\sqrt{1-\\zeta^2}$（$\\zeta<1$ 时存在）</div>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>条件</th><th>类型</th><th>特征根</th><th>响应特征</th></tr></thead><tbody><tr><td class="font-medium">$\\zeta > 1$（R 大）</td><td>过阻尼</td><td>两个不等负实根</td><td>单调衰减，无振荡，响应慢</td></tr><tr><td class="font-medium">$\\zeta = 1$</td><td>临界阻尼</td><td>二重负实根</td><td>最快无振荡收敛</td></tr><tr><td class="font-medium">$0<\\zeta<1$（R 小）</td><td>欠阻尼</td><td>共轭复根</td><td>衰减振荡 $e^{-\\alpha t}\\sin(\\omega_d t+\\varphi)$</td></tr><tr><td class="font-medium">$\\zeta = 0$（R=0）</td><td>无阻尼</td><td>纯虚根</td><td>等幅振荡，频率 $\\omega_0$</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">四种阻尼响应的物理图像</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>过阻尼</strong>：电阻很大，能量迅速耗散，电容电压单调趋近稳态，无振荡。类似"在糖浆中摆动的钟摆"。</li>
          <li><strong>临界阻尼</strong>：刚好不振荡的最快收敛，是工程设计的理想目标（如汽车减震器）。</li>
          <li><strong>欠阻尼</strong>：电阻较小，电容和电感间能量交换产生振荡，振幅按 $e^{-\\alpha t}$ 衰减。</li>
          <li><strong>无阻尼</strong>：理想情况（R=0），能量无损耗，等幅振荡永不停止。</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">实例计算：判断阻尼类型</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">已知 RLC 串联电路：$R=100\\Omega$，$L=10mH$，$C=1\\mu F$。求阻尼比和响应类型。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：求 $\\omega_0$</strong>。$\\omega_0=\\frac{1}{\\sqrt{LC}}=\\frac{1}{\\sqrt{10^{-2}\\times 10^{-6}}}=10^4 rad/s$</div></div><div class="step-item"><div><strong>第二步：求 $\\alpha$</strong>。$\\alpha=\\frac{R}{2L}=\\frac{100}{2\\times 10^{-2}}=5000 s^{-1}$</div></div><div class="step-item"><div><strong>第三步：求 $\\zeta$</strong>。$\\zeta=\\frac{\\alpha}{\\omega_0}=\\frac{5000}{10^4}=0.5$</div></div><div class="step-item"><div><strong>第四步：判断类型</strong>。$0<\\zeta=0.5<1$，为欠阻尼响应。$\\omega_d=\\omega_0\\sqrt{1-\\zeta^2}=10^4\\times 0.866=8660 rad/s$</div></div></div>

        <h4 class="font-medium mt-6 mb-2">与控制理论的统一</h4>
        <div class="formula-block">二阶系统传递函数：$H(s)=\\frac{\\omega_0^2}{s^2+2\\zeta\\omega_0 s+\\omega_0^2}$<br>电路中 $\\zeta=\\frac{R}{2}\\sqrt{\\frac{C}{L}}$，控制中 $\\zeta$ 由系统结构决定<div class="text-sm text-gray-500 mt-2">电路与控制在二阶系统层面完全统一——同一套数学描述</div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>阻尼比的调节</strong>：在电路中，调节 R 可以改变阻尼比。增大 R 增大阻尼（抑制振荡），减小 R 减小阻尼（增强振荡）。这在<a href="#" onclick="navigateTo('act-05');return false;" style="color:var(--primary)">控制系统设计</a>中对应调节阻尼系数。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>临界阻尼的工程意义</strong>：临界阻尼（$\\zeta=1$）是"刚好不振荡"的最快响应，但实际元件参数有误差，工程中常设计为轻微欠阻尼（$\\zeta=0.7\\sim 0.8$）以获得快速且几乎无超调的响应。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>工程应用</strong>：RLC 电路的阻尼特性广泛用于滤波器设计（<a href="#" onclick="navigateTo('circ-07');return false;" style="color:var(--primary)">频率响应</a>）、振荡器设计（<a href="#" onclick="navigateTo('circ-08');return false;" style="color:var(--primary)">谐振电路</a>）、以及<a href="#" onclick="navigateTo('act-09');return false;" style="color:var(--primary)">控制系统校正</a>。</div></div>
      ` },
      { id: 'circ-06', title: '正弦稳态分析', desc: '相量法、阻抗、导纳', icon: '〰️', tags: ['核心'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">相量法：把微积分变成代数</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">正弦稳态电路中，所有电压电流都是同频率正弦量。相量法用复数表示正弦量，把微分方程变成复数代数方程——电阻/电感/电容统一为"阻抗"，<a href="#" onclick="navigateTo('circ-01');return false;" style="color:var(--primary)">KCL/KVL</a> 等所有直流方法都能直接搬用。相量法是<a href="#" onclick="navigateTo('circ-07');return false;" style="color:var(--primary)">频率响应分析</a>和<a href="#" onclick="navigateTo('circ-08');return false;" style="color:var(--primary)">谐振电路</a>的基础。</p>

        <h4 class="font-medium mt-6 mb-2">正弦量与相量的对应</h4>
        <div class="formula-block">正弦量 → 相量的转换：<br>时域：$u(t)=U_m\\cos(\\omega t+\\varphi)$<br>相量域：$\\dot{U}=U_m\\angle\\varphi = U_m(\\cos\\varphi+j\\sin\\varphi)$<div class="text-sm text-gray-500 mt-2">相量只包含幅值和初相信息，频率 $\\omega$ 由电源决定（全电路统一）</div></div>

        <h4 class="font-medium mt-6 mb-2">阻抗：统一 R、L、C</h4>
        <div class="formula-block">三种基本元件的阻抗：<br>$Z_R=R$（纯电阻，电压电流同相）<br>$Z_L=j\\omega L$（纯电感，电压超前电流 90°）<br>$Z_C=\\frac{1}{j\\omega C}=-j\\frac{1}{\\omega C}$（纯电容，电压滞后电流 90°）<div class="text-sm text-gray-500 mt-2">阻抗统一了电阻和电抗，串联 $Z=Z_1+Z_2$，并联 $\\frac{1}{Z}=\\frac{1}{Z_1}+\\frac{1}{Z_2}$</div></div>

        <h4 class="font-medium mt-6 mb-2">导纳：阻抗的对偶</h4>
        <div class="formula-block">导纳定义：$Y=\\frac{1}{Z}=G+jB$<br>其中：$G$ 为电导（实部），$B$ 为电纳（虚部）<br>并联电路用导纳更方便：$Y=Y_1+Y_2+\\cdots$</div>

        <h4 class="font-medium mt-6 mb-2">相量法求解步骤</h4>
        <div class="step-list"><div class="step-item"><div><strong>第一步：画相量模型</strong>。将时域电路转换为相量域——电压源 $v(t)\\to\\dot{V}$，电阻 $R\\to R$，电感 $L\\to j\\omega L$，电容 $C\\to 1/(j\\omega C)$。</div></div><div class="step-item"><div><strong>第二步：列相量方程</strong>。用<a href="#" onclick="navigateTo('circ-01');return false;" style="color:var(--primary)">节点法或网孔法</a>列写 KCL/KVL 方程（现在是复数代数方程）。</div></div><div class="step-item"><div><strong>第三步：解复数方程</strong>。用复数运算求解各支路电流/电压相量。</div></div><div class="step-item"><div><strong>第四步：转回时域</strong>。$\\dot{I}=I_m\\angle\\varphi \\to i(t)=I_m\\cos(\\omega t+\\varphi)$</div></div></div>

        <h4 class="font-medium mt-6 mb-2">功率分析</h4>
        <div class="formula-block">三种功率的关系：<br>有功功率 $P=UI\\cos\\varphi$（单位：W，实际做功）<br>无功功率 $Q=UI\\sin\\varphi$（单位：var，能量交换）<br>视在功率 $S=UI=\\sqrt{P^2+Q^2}$（单位：VA，设备容量）<div class="text-sm text-gray-500 mt-2">$\\cos\\varphi$ 为功率因数，$\\varphi$ 为电压与电流的相位差</div></div>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>元件</th><th>有功 P</th><th>无功 Q</th><th>功率因数</th></tr></thead><tbody><tr><td class="font-medium">纯电阻 R</td><td>$UI$</td><td>0</td><td>$\\cos\\varphi=1$</td></tr><tr><td class="font-medium">纯电感 L</td><td>0</td><td>$UI$（正）</td><td>$\\cos\\varphi=0$（滞后）</td></tr><tr><td class="font-medium">纯电容 C</td><td>0</td><td>$-UI$（负）</td><td>$\\cos\\varphi=0$（超前）</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">实例计算：RLC 串联电路</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">已知：$v(t)=100\\cos(1000t)V$，$R=30\\Omega$，$L=40mH$，$C=25\\mu F$。求电流 $i(t)$ 和各元件电压。</p>
        <div class="step-list"><div class="step-item"><div><strong>求总阻抗</strong>。$Z=R+j(\\omega L-\\frac{1}{\\omega C})=30+j(40-40)=30\\Omega$（谐振状态！）</div></div><div class="step-item"><div><strong>求电流相量</strong>。$\\dot{I}=\\frac{\\dot{V}}{Z}=\\frac{100\\angle 0°}{30}=3.33\\angle 0°A$</div></div><div class="step-item"><div><strong>求各电压</strong>。$\\dot{V}_R=3.33\\times 30=100\\angle 0°V$，$\\dot{V}_L=3.33\\times j40=133.3\\angle 90°V$，$\\dot{V}_C=3.33\\times(-j40)=133.3\\angle-90°V$</div></div><div class="step-item"><div><strong>转时域</strong>。$i(t)=3.33\\cos(1000t)A$。注意：$V_L$ 和 $V_C$ 幅值大于电源电压（串联谐振现象）。</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>功率因数补偿</strong>：工业负载多为感性（电机），功率因数低，并联电容可补偿无功，提高 $\\cos\\varphi$ 到 0.9 以上，减少线路损耗和电费。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>相量法的限制</strong>：相量法只能处理<strong>单一频率</strong>的正弦稳态。若电路中有多个不同频率的电源，必须用<a href="#" onclick="navigateTo('circ-03');return false;" style="color:var(--primary)">叠加定理</a>分别求解后在时域叠加。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>与傅里叶分析的联系</strong>：任意周期信号可用<a href="#" onclick="navigateTo('hm-12');return false;" style="color:var(--primary)">傅里叶级数</a>分解为不同频率正弦量之和。对每个频率分量用相量法求解，再叠加——这就是频域分析的完整思想。</div></div>
      ` },
      { id: 'circ-07', title: '频率响应与滤波器', desc: 'RC 低通/高通、波特图入门', icon: '📶', tags: ['工程'], goals: { eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">频率响应：电路的频率特性</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">电路对不同频率正弦输入的响应能力称为频率响应。滤波器利用频率响应特性，选择性地通过或抑制特定频率信号。频率响应分析建立在<a href="#" onclick="navigateTo('circ-06');return false;" style="color:var(--primary)">相量法</a>基础上，是<a href="#" onclick="navigateTo('circ-08');return false;" style="color:var(--primary)">谐振电路</a>和<a href="#" onclick="navigateTo('act-08');return false;" style="color:var(--primary)">自动控制频域分析</a>的核心。</p>

        <h4 class="font-medium mt-6 mb-2">传递函数与频率响应</h4>
        <div class="formula-block">网络函数（传递函数）：$H(j\\omega)=\\frac{\\dot{Y}}{\\dot{X}}=|H(j\\omega)|\\angle\\varphi(\\omega)$<br>幅频特性：$|H(j\\omega)|$ 表示增益随频率的变化<br>相频特性：$\\varphi(\\omega)$ 表示相移随频率的变化<div class="text-sm text-gray-500 mt-2">频率响应 = 幅频特性 + 相频特性</div></div>

        <h4 class="font-medium mt-6 mb-2">RC 低通滤波器</h4>
        <div class="formula-block">RC 低通传递函数：$H(j\\omega)=\\frac{1}{1+j\\omega RC}$<br>截止频率：$\\omega_c=\\frac{1}{RC}$，即 $f_c=\\frac{1}{2\\pi RC}$<br>在 $\\omega=\\omega_c$ 处，增益下降到 $\\frac{1}{\\sqrt{2}}$（-3dB）</div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>通带</strong>：$\\omega < \\omega_c$，信号几乎无衰减通过</li>
          <li><strong>阻带</strong>：$\\omega > \\omega_c$，信号被衰减（每十倍频 -20dB）</li>
          <li><strong>相位</strong>：输出滞后输入，最大滞后 90°（高频极限）</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">RC 高通滤波器</h4>
        <div class="formula-block">RC 高通传递函数：$H(j\\omega)=\\frac{j\\omega RC}{1+j\\omega RC}$<br>截止频率：$\\omega_c=\\frac{1}{RC}$（与低通相同）<br>在 $\\omega=\\omega_c$ 处，增益下降到 $\\frac{1}{\\sqrt{2}}$（-3dB）</div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>通带</strong>：$\\omega > \\omega_c$，高频信号通过</li>
          <li><strong>阻带</strong>：$\\omega < \\omega_c$，低频信号被衰减</li>
          <li><strong>相位</strong>：输出超前输入，最大超前 90°（低频极限）</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">波特图：频率响应的图形化</h4>
        <div class="step-list"><div class="step-item"><div><strong>第一步：画幅频特性</strong>。横轴为 $\\lg f$（对数刻度），纵轴为 $20\\lg|H|$（dB）。低通在 $f_c$ 后以 -20dB/dec 下降。</div></div><div class="step-item"><div><strong>第二步：画相频特性</strong>。横轴同上，纵轴为相位角。低通从 0° 渐变到 -90°，在 $f_c$ 处为 -45°。</div></div><div class="step-item"><div><strong>第三步：标注关键点</strong>。截止频率 $f_c$（-3dB 点）、0dB 线（增益=1）、-90° 线（相位极限）。</div></div></div>

        <h4 class="font-medium mt-6 mb-2">四种基本滤波器</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>类型</th><th>功能</th><th>典型电路</th><th>应用场景</th></tr></thead><tbody><tr><td class="font-medium">低通 LPF</td><td>通过低频，抑制高频</td><td>RC 串联（C 输出）</td><td>滤除噪声、平滑信号</td></tr><tr><td class="font-medium">高通 HPF</td><td>通过高频，抑制低频</td><td>RC 串联（R 输出）</td><td>隔直、提取交流分量</td></tr><tr><td class="font-medium">带通 BPF</td><td>通过某频段</td><td>RLC 串联谐振</td><td>选频、收音机调谐</td></tr><tr><td class="font-medium">带阻 BEF</td><td>抑制某频段</td><td>双 T 网络</td><td>陷波、消除干扰</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">实例计算：RC 低通设计</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">设计一个截止频率 $f_c=1kHz$ 的 RC 低通滤波器，求 R 和 C 的值。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：选电容</strong>。选 $C=100nF$（常用值，避免 R 太小或太大）。</div></div><div class="step-item"><div><strong>第二步：求电阻</strong>。$R=\\frac{1}{2\\pi f_c C}=\\frac{1}{2\\pi \\times 10^3 \\times 10^{-7}}=1.59k\\Omega$</div></div><div class="step-item"><div><strong>第三步：验证</strong>。选标准电阻 $R=1.6k\\Omega$，实际 $f_c=\\frac{1}{2\\pi \\times 1600 \\times 10^{-7}}=995Hz$，误差 <1%。</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>-3dB 的含义</strong>：-3dB 对应功率降为一半（$10^{-3/10}=0.5$），是工程上"有效"与"衰减"的分界线。截止频率也称"-3dB 频率"或"半功率点"。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>一阶滤波器的局限</strong>：RC 滤波器的过渡带斜率只有 -20dB/dec（一阶），选择性差。需要更陡峭的过渡带时，用<a href="#" onclick="navigateTo('circ-08');return false;" style="color:var(--primary)">RLC 谐振电路</a>（二阶，-40dB/dec）或<a href="#" onclick="navigateTo('ana-11');return false;" style="color:var(--primary)">有源滤波器</a>（高阶）。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>与自动控制的联系</strong>：RC 低通的传递函数 $H(s)=\\frac{1}{1+sRC}$ 正是<a href="#" onclick="navigateTo('act-05');return false;" style="color:var(--primary)">一阶系统</a>的典型形式。<a href="#" onclick="navigateTo('act-08');return false;" style="color:var(--primary)">伯德图</a>是频率响应的标准图形化工具，在控制系统设计中广泛应用。</div></div>
      ` },
      { id: 'circ-08', title: '谐振电路', desc: '串联/并联谐振、品质因数', icon: '🎯', tags: ['高频'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">谐振：能量在 L 和 C 间振荡</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">当感抗和容抗相互抵消（$\\omega L = 1/\\omega C$），电路呈纯阻性，发生谐振。谐振时电路有选频特性，广泛应用于无线电调谐、<a href="#" onclick="navigateTo('circ-07');return false;" style="color:var(--primary)">滤波器</a>、振荡器。谐振电路是<a href="#" onclick="navigateTo('circ-06');return false;" style="color:var(--primary)">正弦稳态分析</a>的特例。</p>

        <h4 class="font-medium mt-6 mb-2">谐振条件与谐振频率</h4>
        <div class="formula-block">谐振条件：感抗等于容抗，$\\omega L = \\frac{1}{\\omega C}$<br>谐振频率：$\\omega_0 = \\frac{1}{\\sqrt{LC}}$，即 $f_0 = \\frac{1}{2\\pi\\sqrt{LC}}$<div class="text-sm text-gray-500 mt-2">谐振时电路呈纯阻性，电压与电流同相</div></div>

        <h4 class="font-medium mt-6 mb-2">串联谐振特性</h4>
        <div class="formula-block">串联谐振时：<br>阻抗最小 $Z=R$（感抗容抗抵消）<br>电流最大 $I_0=V_s/R$<br>电感电压 $V_L=QV_s$，电容电压 $V_C=QV_s$（Q 倍放大）<div class="text-sm text-gray-500 mt-2">串联谐振又称"电压谐振"——L 和 C 上的电压可能远大于电源电压</div></div>

        <h4 class="font-medium mt-6 mb-2">并联谐振特性</h4>
        <div class="formula-block">并联谐振时：<br>阻抗最大 $Z=Q^2R$（理想情况下趋于无穷）<br>总电流最小 $I_0=V_s/(Q^2R)$<br>支路电流 $I_L=I_C=QI_0$（Q 倍放大）<div class="text-sm text-gray-500 mt-2">并联谐振又称"电流谐振"——L 和 C 支路的电流可能远大于总电流</div></div>

        <h4 class="font-medium mt-6 mb-2">品质因数 Q</h4>
        <div class="formula-block">品质因数定义：$Q = \\frac{\\omega_0 L}{R} = \\frac{1}{\\omega_0 CR} = \\frac{1}{R}\\sqrt{\\frac{L}{C}}$<br>物理意义：$Q=2\\pi \\times \\frac{\\text{谐振时储存能量}}{\\text{每周期消耗能量}}$<div class="text-sm text-gray-500 mt-2">Q 值越高，谐振曲线越尖锐，频率选择性越好</div></div>

        <h4 class="font-medium mt-6 mb-2">串联 vs 并联谐振对比</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>特性</th><th>串联谐振</th><th>并联谐振</th></tr></thead><tbody><tr><td class="font-medium">阻抗</td><td>最小（=R）</td><td>最大（=Q²R）</td></tr><tr><td class="font-medium">电流</td><td>最大</td><td>最小</td></tr><tr><td class="font-medium">电压/电流放大</td><td>L/C 电压放大 Q 倍</td><td>L/C 电流放大 Q 倍</td></tr><tr><td class="font-medium">又称</td><td>电压谐振</td><td>电流谐振</td></tr><tr><td class="font-medium">应用</td><td>选频、陷波</td><td>振荡器、选频</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">通频带与选择性</h4>
        <div class="formula-block">通频带（-3dB 带宽）：$BW = \\frac{f_0}{Q}$<br>下限频率：$f_L = f_0 - \\frac{BW}{2}$<br>上限频率：$f_H = f_0 + \\frac{BW}{2}$<div class="text-sm text-gray-500 mt-2">Q 值越高，BW 越窄，选择性越好（但信号保真度下降）</div></div>

        <h4 class="font-medium mt-6 mb-2">实例计算：收音机调谐</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">设计一个收音机调谐电路，谐振频率 $f_0=1MHz$，带宽 $BW=10kHz$，$L=200\\mu H$。求 C 和 R。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：求 Q 值</strong>。$Q=\\frac{f_0}{BW}=\\frac{10^6}{10^4}=100$</div></div><div class="step-item"><div><strong>第二步：求电容</strong>。$C=\\frac{1}{(2\\pi f_0)^2 L}=\\frac{1}{(2\\pi \\times 10^6)^2 \\times 200\\times 10^{-6}}=126pF$</div></div><div class="step-item"><div><strong>第三步：求电阻</strong>。$R=\\frac{\\omega_0 L}{Q}=\\frac{2\\pi \\times 10^6 \\times 200\\times 10^{-6}}{100}=12.6\\Omega$</div></div><div class="step-item"><div><strong>第四步：验证</strong>。$BW=\\frac{f_0}{Q}=10kHz$ ✓，可分辨频率相差 10kHz 以上的电台。</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>Q 值的工程意义</strong>：高 Q 值（>10）用于选频（如收音机调谐），低 Q 值（<1）用于宽带滤波。Q 值也决定了<a href="#" onclick="navigateTo('circ-05');return false;" style="color:var(--primary)">二阶电路的阻尼比</a>：$\\zeta=\\frac{1}{2Q}$。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>电压谐振的危险</strong>：串联谐振时，电感和电容上的电压可达电源电压的 Q 倍！高 Q 电路中，这可能导致元件击穿。电力系统中需避免串联谐振（铁磁谐振过电压）。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>工程应用</strong>：谐振电路广泛用于无线充电（磁耦合谐振）、金属探测（涡流改变 Q 值）、<a href="#" onclick="navigateTo('ana-14');return false;" style="color:var(--primary)">正弦波振荡器</a>（LC 谐振选频）。</div></div>
      ` },
      { id: 'circ-09', title: '三相电路', desc: '星形/三角形、功率计算', icon: '⚙', tags: ['基础'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">三相电路：电力系统的基石</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">三相电路是交流输配电的标准。三个幅值相等、相位差 120° 的电源，可星形（Y）或三角形（△）连接。理解线电压/相电压、线电流/相电流的关系，以及功率计算，是电气工程师的必备知识。三相电路是<a href="#" onclick="navigateTo('circ-06');return false;" style="color:var(--primary)">正弦稳态分析</a>在电力系统中的典型应用。</p>

        <h4 class="font-medium mt-6 mb-2">三相电源的基本概念</h4>
        <div class="formula-block">三相对称电源：<br>$u_A = U_m\\cos(\\omega t)$<br>$u_B = U_m\\cos(\\omega t - 120°)$<br>$u_C = U_m\\cos(\\omega t + 120°)$<div class="text-sm text-gray-500 mt-2">三相电压幅值相等、频率相同、相位依次差 120°</div></div>

        <h4 class="font-medium mt-6 mb-2">星形（Y）连接</h4>
        <div class="formula-block">星形连接的电压电流关系：<br>线电压 $U_L = \\sqrt{3} U_P$（线电压是相电压的 $\\sqrt{3}$ 倍）<br>线电流 $I_L = I_P$（线电流等于相电流）<br>中性线电流 $I_N = 0$（对称负载时）<div class="text-sm text-gray-500 mt-2">$U_P$ 为相电压（火线到中性线），$U_L$ 为线电压（火线到火线）</div></div>

        <h4 class="font-medium mt-6 mb-2">三角形（△）连接</h4>
        <div class="formula-block">三角形连接的电压电流关系：<br>线电压 $U_L = U_P$（线电压等于相电压）<br>线电流 $I_L = \\sqrt{3} I_P$（线电流是相电流的 $\\sqrt{3}$ 倍）<div class="text-sm text-gray-500 mt-2">三角形连接无中性点，只能用于三线制</div></div>

        <h4 class="font-medium mt-6 mb-2">Y 连接 vs △ 连接对比</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>特性</th><th>星形（Y）连接</th><th>三角形（△）连接</th></tr></thead><tbody><tr><td class="font-medium">线电压与相电压</td><td>$U_L = \\sqrt{3} U_P$</td><td>$U_L = U_P$</td></tr><tr><td class="font-medium">线电流与相电流</td><td>$I_L = I_P$</td><td>$I_L = \\sqrt{3} I_P$</td></tr><tr><td class="font-medium">中性线</td><td>有（三相四线制）</td><td>无（三相三线制）</td></tr><tr><td class="font-medium">应用</td><td>低压配电（220V/380V）</td><td>高压输电、电机绕组</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">三相功率计算</h4>
        <div class="formula-block">三相总有功功率：$P = \\sqrt{3} U_L I_L \\cos\\varphi$<br>三相总无功功率：$Q = \\sqrt{3} U_L I_L \\sin\\varphi$<br>三相总视在功率：$S = \\sqrt{3} U_L I_L$<div class="text-sm text-gray-500 mt-2">$\\varphi$ 为相电压与相电流的相位差（不是线电压与线电流的相位差）</div></div>

        <h4 class="font-medium mt-6 mb-2">实例计算：三相功率</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">三相对称负载，星形连接，线电压 380V，每相阻抗 $Z=10+j10\\Omega$。求线电流和三相总功率。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：求相电压</strong>。$U_P=\\frac{U_L}{\\sqrt{3}}=\\frac{380}{\\sqrt{3}}=220V$</div></div><div class="step-item"><div><strong>第二步：求阻抗模</strong>。$|Z|=\\sqrt{10^2+10^2}=14.14\\Omega$，$\\cos\\varphi=\\frac{10}{14.14}=0.707$</div></div><div class="step-item"><div><strong>第三步：求相电流</strong>。$I_P=\\frac{U_P}{|Z|}=\\frac{220}{14.14}=15.56A$，星形连接 $I_L=I_P=15.56A$</div></div><div class="step-item"><div><strong>第四步：求功率</strong>。$P=\\sqrt{3} \\times 380 \\times 15.56 \\times 0.707=7.26kW$</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>对称三相的优势</strong>：①三相对称时中性线电流为零（可省去中线，节约成本）；②瞬时功率恒定（不像单相有二倍频脉动），电机转矩平稳；③传输相同功率，三相比单相省导线材料。这就是为什么电力系统用三相。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>中性线的重要性</strong>：不对称负载时，中性线电流不为零。若中性线断开（三相四线制），各相电压将严重不对称（中性点偏移），导致某些相电压过高烧毁设备。因此中性线上不能装熔断器或开关。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>实际应用</strong>：家庭用电为三相四线制中的单相（220V），工厂动力用电为三相（380V）。大型电机通常采用三角形连接（高压小电流），照明负载采用星形连接（低压大电流）。</div></div>
      ` },
      { id: 'circ-10', title: '二端口网络', desc: 'Z/Y/H 参数及其互换', icon: '⬛', tags: ['难点'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">二端口网络：黑箱分析方法</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">二端口网络把复杂电路看作有输入输出两个端口的"黑箱"，用参数矩阵描述端口电压电流关系。不必关心内部结构，只需知道参数即可分析级联、并联等连接。二端口网络是<a href="#" onclick="navigateTo('circ-02');return false;" style="color:var(--primary)">戴维南定理</a>的推广——从单端口扩展到双端口。</p>

        <h4 class="font-medium mt-6 mb-2">四种参数矩阵</h4>
        <div class="formula-block">Z 参数（阻抗参数）：<br>$$\\begin{bmatrix} \\dot{U}_1 \\\\ \\dot{U}_2 \\end{bmatrix} = \\begin{bmatrix} z_{11} & z_{12} \\\\ z_{21} & z_{22} \\end{bmatrix} \\begin{bmatrix} \\dot{I}_1 \\\\ \\dot{I}_2 \\end{bmatrix}$$<div class="text-sm text-gray-500 mt-2">Z 参数物理意义：$z_{11}=\\frac{U_1}{I_1}|_{I_2=0}$（端口2开路时的输入阻抗）</div></div>

        <div class="formula-block">Y 参数（导纳参数）：<br>$$\\begin{bmatrix} \\dot{I}_1 \\\\ \\dot{I}_2 \\end{bmatrix} = \\begin{bmatrix} y_{11} & y_{12} \\\\ y_{21} & y_{22} \\end{bmatrix} \\begin{bmatrix} \\dot{U}_1 \\\\ \\dot{U}_2 \\end{bmatrix}$$<div class="text-sm text-gray-500 mt-2">Y 参数物理意义：$y_{11}=\\frac{I_1}{U_1}|_{U_2=0}$（端口2短路时的输入导纳）</div></div>

        <h4 class="font-medium mt-6 mb-2">T 参数与 H 参数</h4>
        <div class="formula-block">T 参数（传输参数）——用于级联：<br>$$\\begin{bmatrix} \\dot{U}_1 \\\\ \\dot{I}_1 \\end{bmatrix} = \\begin{bmatrix} A & B \\\\ C & D \\end{bmatrix} \\begin{bmatrix} \\dot{U}_2 \\\\ -\\dot{I}_2 \\end{bmatrix}$$</div>
        <div class="formula-block">H 参数（混合参数）——用于晶体管：<br>$$\\begin{bmatrix} \\dot{U}_1 \\\\ \\dot{I}_2 \\end{bmatrix} = \\begin{bmatrix} h_{11} & h_{12} \\\\ h_{21} & h_{22} \\end{bmatrix} \\begin{bmatrix} \\dot{I}_1 \\\\ \\dot{U}_2 \\end{bmatrix}$$<div class="text-sm text-gray-500 mt-2">$h_{11}$：输入阻抗；$h_{12}$：反向电压传输比；$h_{21}$：电流增益；$h_{22}$：输出导纳</div></div>

        <h4 class="font-medium mt-6 mb-2">四种参数对比</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>参数</th><th>自变量</th><th>因变量</th><th>适用场景</th></tr></thead><tbody><tr><td class="font-medium">Z（阻抗）</td><td>$I_1, I_2$</td><td>$U_1, U_2$</td><td>串联网络</td></tr><tr><td class="font-medium">Y（导纳）</td><td>$U_1, U_2$</td><td>$I_1, I_2$</td><td>并联网络</td></tr><tr><td class="font-medium">T（传输）</td><td>$U_2, -I_2$</td><td>$U_1, I_1$</td><td>级联网络（最常用）</td></tr><tr><td class="font-medium">H（混合）</td><td>$I_1, U_2$</td><td>$U_1, I_2$</td><td><a href="#" onclick="navigateTo('ana-03');return false;" style="color:var(--primary)">晶体管</a>小信号模型</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">参数互换公式</h4>
        <div class="formula-block">常用互换关系：<br>$Y = Z^{-1}$（Y 是 Z 的逆矩阵）<br>$\\det(Z) = z_{11}z_{22} - z_{12}z_{21}$<br>互易网络：$z_{12}=z_{21}$，$y_{12}=y_{21}$，$AD-BC=1$<div class="text-sm text-gray-500 mt-2">互易网络只有3个独立参数，对称网络只有2个独立参数</div></div>

        <h4 class="font-medium mt-6 mb-2">实例计算：求 Z 参数</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">已知 T 型网络：$Z_1=2\\Omega$，$Z_2=3\\Omega$，$Z_3=4\\Omega$。求 Z 参数矩阵。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：求 $z_{11}$</strong>。端口2开路（$I_2=0$），$z_{11}=\\frac{U_1}{I_1}=Z_1+Z_3=2+4=6\\Omega$</div></div><div class="step-item"><div><strong>第二步：求 $z_{22}$</strong>。端口1开路（$I_1=0$），$z_{22}=\\frac{U_2}{I_2}=Z_2+Z_3=3+4=7\\Omega$</div></div><div class="step-item"><div><strong>第三步：求 $z_{12}=z_{21}$</strong>。互易网络，$z_{12}=z_{21}=Z_3=4\\Omega$</div></div><div class="step-item"><div><strong>第四步：写矩阵</strong>。$Z=\\begin{bmatrix} 6 & 4 \\\\ 4 & 7 \\end{bmatrix}\\Omega$</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>级联的便利</strong>：T 参数（传输参数）的最大优势是级联计算简单——两个网络级联后的 T 参数等于各网络 T 参数的乘积：$T=T_1 \\cdot T_2$。这在分析多级放大器时非常方便。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>互易性与对称性</strong>：互易网络 $z_{12}=z_{21}$（无受控源的线性网络都互易）；对称网络 $z_{11}=z_{22}$（端口可互换）。H 参数在 <a href="#" onclick="navigateTo('ana-03');return false;" style="color:var(--primary)">三极管</a> 小信号模型中是标准描述方式。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>工程应用</strong>：二端口网络模型广泛用于<a href="#" onclick="navigateTo('ana-06');return false;" style="color:var(--primary)">多级放大器分析</a>（级联）、滤波器设计、传输线分析。在射频工程中，散射参数（S 参数）是二端口网络在高频下的标准描述方式。</div></div>
      ` },
      { id: 'circ-11', title: '含运放的电路分析', desc: '理想运放线性区模型', icon: '🔺', tags: ['工程'], goals: { eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">理想运放：两个黄金法则</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">运放（运算放大器）是模拟电路的核心元件。分析含运放的电路，只需牢记两条法则——"虚短"和"虚断"，就能快速求解反相/同相放大、加法、积分等各种运放电路。运放电路是<a href="#" onclick="navigateTo('ana-09');return false;" style="color:var(--primary)">运放线性应用</a>和<a href="#" onclick="navigateTo('ana-10');return false;" style="color:var(--primary)">运放非线性应用</a>的基础。</p>

        <h4 class="font-medium mt-6 mb-2">理想运放的两条法则</h4>
        <div class="formula-block"><strong>理想运放两条法则</strong>（线性区，负反馈）：<br>① 虚短：$u_+ = u_-$（两输入端电压相等，如同短路）<br>② 虚断：$i_+ = i_- = 0$（输入端不取电流，如同断路）<div class="text-sm text-gray-500 mt-2">虚短虚断是分析运放电路的万能工具，适用于所有线性运放电路</div></div>

        <h4 class="font-medium mt-6 mb-2">反相放大器</h4>
        <div class="formula-block">反相放大器电路：输入信号接 $R_1$ 到反相端，反馈电阻 $R_f$ 从输出到反相端<br>电压增益：$A_v = \\frac{u_o}{u_i} = -\\frac{R_f}{R_1}$<br>输入电阻：$R_{in} = R_1$（反相端虚地）<div class="text-sm text-gray-500 mt-2">负号表示输出与输入反相，增益由电阻比值决定</div></div>

        <h4 class="font-medium mt-6 mb-2">同相放大器</h4>
        <div class="formula-block">同相放大器电路：输入信号接同相端，$R_1$ 接反相端到地，$R_f$ 从输出到反相端<br>电压增益：$A_v = \\frac{u_o}{u_i} = 1 + \\frac{R_f}{R_1}$<br>输入电阻：$R_{in} \\to \\infty$（理想运放输入阻抗无穷大）<div class="text-sm text-gray-500 mt-2">输出与输入同相，增益 ≥ 1，电压跟随器是 $R_f=0$ 的特例</div></div>

        <h4 class="font-medium mt-6 mb-2">常用运放电路</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>电路</th><th>功能</th><th>传递函数</th><th>应用</th></tr></thead><tbody><tr><td class="font-medium">反相放大</td><td>信号放大（反相）</td><td>$A_v=-R_f/R_1$</td><td>信号调理</td></tr><tr><td class="font-medium">同相放大</td><td>信号放大（同相）</td><td>$A_v=1+R_f/R_1$</td><td>阻抗变换</td></tr><tr><td class="font-medium">电压跟随</td><td>阻抗变换</td><td>$A_v=1$</td><td>缓冲隔离</td></tr><tr><td class="font-medium">加法器</td><td>多路信号求和</td><td>$u_o=-\\sum \\frac{R_f}{R_i}u_i$</td><td>音频混合</td></tr><tr><td class="font-medium">积分器</td><td>信号积分</td><td>$u_o=-\\frac{1}{RC}\\int u_i dt$</td><td>波形变换</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">实例计算：反相放大器</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">设计一个增益 $A_v=-10$ 的反相放大器，输入电阻 $R_{in}=10k\\Omega$。求 $R_1$ 和 $R_f$。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：确定 $R_1$</strong>。反相放大器输入电阻 $R_{in}=R_1$，所以 $R_1=10k\\Omega$</div></div><div class="step-item"><div><strong>第二步：求 $R_f$</strong>。$|A_v|=\\frac{R_f}{R_1}=10$，所以 $R_f=10 \\times 10k=100k\\Omega$</div></div><div class="step-item"><div><strong>第三步：验证</strong>。$A_v=-\\frac{100k}{10k}=-10$ ✓，输入电阻 $10k\\Omega$ ✓</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>经典结论</strong>：反相放大 $A_v=-R_f/R_1$，同相放大 $A_v=1+R_f/R_1$，电压跟随器 $A_v=1$。这些公式的推导只需用虚短虚断列节点方程。详见 <a href="#" onclick="navigateTo('ana-09');return false;" style="color:var(--primary)">运放线性应用</a>。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>虚短的前提是负反馈</strong>：只有接成负反馈（输出反馈到反相端），运放才工作在线性区，虚短才成立。开环或正反馈时运放饱和（非线性区），不能用虚短虚断分析，那是<a href="#" onclick="navigateTo('ana-10');return false;" style="color:var(--primary)">比较器</a>/<a href="#" onclick="navigateTo('ana-14');return false;" style="color:var(--primary)">振荡器</a>场景。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>实际运放的局限</strong>：理想运放增益无穷大、带宽无穷大、输出阻抗为零。实际运放（如 LM741）开环增益约 10⁵，带宽约 1MHz，输出阻抗约 75Ω。设计时需考虑<a href="#" onclick="navigateTo('circ-07');return false;" style="color:var(--primary)">频率响应</a>和<a href="#" onclick="navigateTo('ana-08');return false;" style="color:var(--primary)">反馈对性能的影响</a>。</div></div>
      ` },
      { id: 'circ-12', title: '受控源与电路定理扩展', desc: '受控源处理、定理适用性', icon: '🔌', tags: ['基础'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">受控源：晶体管的电路模型</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">受控源（CCVS/VCCS/VCVS/CCCS）的电压或电流受电路中其他变量控制，是<a href="#" onclick="navigateTo('ana-03');return false;" style="color:var(--primary)">晶体管</a>、<a href="#" onclick="navigateTo('ana-01');return false;" style="color:var(--primary)">场效应管</a>等有源器件的电路模型。掌握受控源在各种定理中的处理方式，是分析含晶体管电路的前提。</p>

        <h4 class="font-medium mt-6 mb-2">四种受控源类型</h4>
        <div class="formula-block">受控源的一般形式：<br>VCVS（电压控制电压源）：$u_2 = \\mu u_1$<br>VCCS（电压控制电流源）：$i_2 = g_m u_1$<br>CCVS（电流控制电压源）：$u_2 = r_m i_1$<br>CCCS（电流控制电流源）：$i_2 = \\beta i_1$<div class="text-sm text-gray-500 mt-2">$\\mu$、$g_m$、$r_m$、$\\beta$ 为控制系数，$u_1$、$i_1$ 为控制量</div></div>

        <h4 class="font-medium mt-6 mb-2">四种受控源对比</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>受控源类型</th><th>控制量</th><th>被控量</th><th>控制系数</th><th>典型器件</th></tr></thead><tbody><tr><td class="font-medium">VCVS</td><td>电压 $u_1$</td><td>电压 $u_2$</td><td>$\\mu$（无量纲）</td><td>运算放大器</td></tr><tr><td class="font-medium">VCCS</td><td>电压 $u_1$</td><td>电流 $i_2$</td><td>$g_m$（跨导，S）</td><td>MOSFET</td></tr><tr><td class="font-medium">CCVS</td><td>电流 $i_1$</td><td>电压 $u_2$</td><td>$r_m$（互阻，Ω）</td><td>—</td></tr><tr><td class="font-medium">CCCS</td><td>电流 $i_1$</td><td>电流 $i_2$</td><td>$\\beta$（无量纲）</td><td>BJT</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">含受控源电路的分析方法</h4>
        <div class="step-list"><div class="step-item"><div><strong>第一步：识别受控源</strong>。找出控制量（$u_x$ 或 $i_x$）和被控量（受控源的输出）。</div></div><div class="step-item"><div><strong>第二步：列方程</strong>。用<a href="#" onclick="navigateTo('circ-01');return false;" style="color:var(--primary)">节点法或网孔法</a>列写 KCL/KVL 方程，受控源当独立源处理。</div></div><div class="step-item"><div><strong>第三步：补充控制量方程</strong>。用节点电压或网孔电流表示控制量，得到额外方程。</div></div><div class="step-item"><div><strong>第四步：联立求解</strong>。解方程组求出所有未知量。</div></div></div>

        <h4 class="font-medium mt-6 mb-2">受控源在各定理中的处理</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>定理/方法</th><th>受控源处理方式</th><th>注意事项</th></tr></thead><tbody><tr><td class="font-medium">节点法/网孔法</td><td>当独立源处理，补充控制量方程</td><td>方程数 = 独立方程数 + 控制量方程数</td></tr><tr><td class="font-medium">叠加定理</td><td><strong>始终保留</strong>，只置零独立源</td><td>受控源不能置零（它受电路变量控制）</td></tr><tr><td class="font-medium">戴维南求 $R_{eq}$</td><td>不能置零，用加压求流法</td><td>$R_{eq}=U_{test}/I_{test}$（加测试电压/电流）</td></tr><tr><td class="font-medium">诺顿求 $R_{eq}$</td><td>不能置零，用开路/短路法</td><td>$R_{eq}=U_{oc}/I_{sc}$</td></tr><tr><td class="font-medium">互易定理</td><td>含受控源一般<strong>不互易</strong></td><td>互易定理只适用于无源线性网络</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">实例计算：含 CCCS 的电路</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">已知：$V_s=10V$，$R_1=2k\\Omega$，$R_2=4k\\Omega$，CCCS $i_2=50i_1$（$\\beta=50$）。求输出电压 $u_o$。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：列 KVL</strong>。输入回路：$V_s = i_1 R_1 + u_{BE}$，$u_{BE}\\approx 0.7V$，$i_1=\\frac{10-0.7}{2k}=4.65mA$</div></div><div class="step-item"><div><strong>第二步：求受控源</strong>。$i_2=\\beta i_1=50 \\times 4.65mA=232.5mA$</div></div><div class="step-item"><div><strong>第三步：求输出</strong>。$u_o = V_s - i_2 R_2 = 10 - 0.2325 \\times 4 = -8.3V$（负值表示电流方向与假设相反）</div></div><div class="step-item"><div><strong>第四步：验证</strong>。检查功率平衡：$P_{Vs}=10 \\times 4.65mA=46.5mW$，$P_{R1}=43.1mW$，$P_{R2}=216.2mW$（受控源提供功率）。</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>受控源的物理意义</strong>：受控源不是真正的电源，它不独立产生能量，而是将控制支路的能量"转换"到被控支路。BJT 的电流放大（$i_c=\\beta i_b$）就是典型的 CCCS 模型。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>受控源在各定理中的处理</strong>：①节点法/网孔法——受控源当独立源处理，但要补充控制量方程；②叠加定理——受控源<strong>始终保留</strong>（不置零），只置零独立源；③戴维南求 $R_{eq}$——受控源不能置零，必须用加压求流法；④互易定理——含受控源的网络一般不互易。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>小信号模型</strong>：在<a href="#" onclick="navigateTo('ana-04');return false;" style="color:var(--primary)">放大电路分析</a>中，BJT 和 MOSFET 用小信号受控源模型代替。理解受控源的处理方法，是分析<a href="#" onclick="navigateTo('ana-06');return false;" style="color:var(--primary)">多级放大器</a>和<a href="#" onclick="navigateTo('ana-08');return false;" style="color:var(--primary)">反馈电路</a>的基础。</div></div>
      ` },
    ]
  },

  // ========== 模拟电路 ==========
  'analog-circuit': {
    title: '模拟电路',
    subtitle: '放大器、运放、反馈、电源，应试与工程并重',
    icon: '🟢',
    sections: [
      { id: 'ana-01', title: '半导体二极管', desc: '伏安特性、模型、稳压管', icon: '➡', tags: ['基础'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">二极管：单向导电的基础元件</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">二极管由 PN 结构成，核心特性是<strong>单向导电</strong>——正向导通、反向截止。理解伏安特性和等效模型，是分析<a href="#" onclick="navigateTo('ana-02');return false;" style="color:var(--primary)">整流</a>、钳位、<a href="#" onclick="navigateTo('ana-13');return false;" style="color:var(--primary)">稳压</a>等电路的基础。二极管是最简单的半导体器件，也是理解<a href="#" onclick="navigateTo('ana-03');return false;" style="color:var(--primary)">三极管</a>和<a href="#" onclick="navigateTo('ana-01');return false;" style="color:var(--primary)">场效应管</a>的基础。</p>

        <h4 class="font-medium mt-6 mb-2">PN 结的形成</h4>
        <div class="formula-block">PN 结形成过程：<br>P 型半导体（多子为空穴）+ N 型半导体（多子为电子）<br>→ 交界面扩散形成空间电荷区（耗尽层）<br>→ 内建电场阻止进一步扩散，达到动态平衡<div class="text-sm text-gray-500 mt-2">PN 结是二极管、三极管、集成电路的基础结构</div></div>

        <h4 class="font-medium mt-6 mb-2">伏安特性（肖克莱方程）</h4>
        <div class="formula-block">二极管电流方程：$I = I_S(e^{U/U_T} - 1)$<br>其中：$I_S$ 为反向饱和电流（极小，nA 级）<br>$U_T = \\frac{kT}{q} \\approx 26mV$（室温热电压）<div class="text-sm text-gray-500 mt-2">正向电压每增加 60mV，电流增大 10 倍（指数关系）</div></div>

        <h4 class="font-medium mt-6 mb-2">三个工作区</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>工作区</th><th>电压条件</th><th>电流特性</th><th>等效模型</th><th>应用</th></tr></thead><tbody><tr><td class="font-medium">正向导通区</td><td>$U > U_{on}$（硅 0.7V）</td><td>指数增长</td><td>0.7V 恒压源</td><td>整流、钳位</td></tr><tr><td class="font-medium">反向截止区</td><td>$U_{BR} < U < 0$</td><td>微小 $I_S$</td><td>断路</td><td>隔离、检波</td></tr><tr><td class="font-medium">反向击穿区</td><td>$U < U_{BR}$</td><td>剧增（可控）</td><td>稳压源</td><td>稳压管</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">等效电路模型</h4>
        <div class="step-list"><div class="step-item"><div><strong>理想模型</strong>：正向导通视为短路，反向截止视为断路。用于粗略分析。</div></div><div class="step-item"><div><strong>恒压降模型</strong>：正向导通视为 0.7V 恒压源（硅管），反向截止视为断路。最常用。</div></div><div class="step-item"><div><strong>小信号模型</strong>：在静态工作点附近，二极管等效为动态电阻 $r_d=\\frac{U_T}{I_Q}$。用于交流分析。</div></div></div>

        <h4 class="font-medium mt-6 mb-2">稳压管（齐纳二极管）</h4>
        <div class="formula-block">稳压管工作在反向击穿区：<br>稳压值 $U_Z$（标称值，如 5.1V、12V）<br>工作电流 $I_Z$ 范围：$I_{Zmin} < I_Z < I_{Zmax}$<div class="text-sm text-gray-500 mt-2">$I_{Zmin}$ 保证稳压，$I_{Zmax}$ 防止过热损坏</div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>稳压管利用击穿</strong>：普通二极管要避免反向击穿（会损坏），但稳压管（齐纳二极管）专门工作在反向击穿区——电压基本不随电流变化，实现稳压。详见 <a href="#" onclick="navigateTo('ana-13');return false;" style="color:var(--primary)">直流稳压电源</a>。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>温度影响</strong>：温度升高时，$U_T$ 增大，$I_S$ 急剧增大（每升 10°C 翻倍）。正向压降约 -2mV/°C（负温度系数），这是热不稳定的根源。大电流二极管需考虑散热。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>特殊二极管</strong>：除普通二极管和稳压管外，还有发光二极管 LED（正向发光）、光电二极管（反向光照产生电流）、变容二极管（反向偏压改变结电容）等。它们都基于 PN 结，但利用不同特性。</div></div>
      ` },
      { id: 'ana-02', title: '二极管整流与滤波', desc: '半波/全波整流、电容滤波', icon: '🌊', tags: ['工程'], goals: { eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">整流滤波：把交流变直流</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">整流电路利用<a href="#" onclick="navigateTo('ana-01');return false;" style="color:var(--primary)">二极管</a>的单向导电性，把交流电转为脉动直流；滤波电路（电容/电感）平滑脉动，输出较平稳的直流。这是所有直流电源的第一级，也是<a href="#" onclick="navigateTo('ana-13');return false;" style="color:var(--primary)">直流稳压电源</a>的基础。</p>

        <h4 class="font-medium mt-6 mb-2">半波整流</h4>
        <div class="formula-block">半波整流电路：1 个二极管 + 负载电阻<br>输出电压平均值：$U_o = \\frac{U_m}{\\pi} \\approx 0.318 U_m$<br>输出电压有效值：$U_{rms} = \\frac{U_m}{2}$<div class="text-sm text-gray-500 mt-2">只利用正半周，负半周被截掉，效率低、脉动大</div></div>

        <h4 class="font-medium mt-6 mb-2">全波整流（桥式）</h4>
        <div class="formula-block">桥式整流电路：4 个二极管（桥堆）<br>输出电压平均值：$U_o = \\frac{2U_m}{\\pi} \\approx 0.636 U_m$<br>输出电压有效值：$U_{rms} = \\frac{U_m}{\\sqrt{2}}$<div class="text-sm text-gray-500 mt-2">正负半周都利用，效率高、脉动小，是最常用整流方式</div></div>

        <h4 class="font-medium mt-6 mb-2">半波 vs 全波对比</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>特性</th><th>半波整流</th><th>全波桥式整流</th></tr></thead><tbody><tr><td class="font-medium">二极管数</td><td>1 个</td><td>4 个（桥堆）</td></tr><tr><td class="font-medium">输出平均值</td><td>$0.318 U_m$</td><td>$0.636 U_m$</td></tr><tr><td class="font-medium">脉动频率</td><td>$f$（与输入同频）</td><td>$2f$（输入频率的两倍）</td></tr><tr><td class="font-medium">纹波系数</td><td>大（1.21）</td><td>小（0.48）</td></tr><tr><td class="font-medium">应用</td><td>简单、低成本场合</td><td>大多数直流电源</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">电容滤波原理</h4>
        <div class="formula-block">滤波后输出电压（桥式 + 电容）：<br>$U_o \\approx U_m - \\frac{I_o}{4fC}$（纹波电压）<br>纹波电压：$\\Delta U = \\frac{I_o}{fC}$（半波）或 $\\frac{I_o}{2fC}$（全波）<div class="text-sm text-gray-500 mt-2">$C$ 越大、$f$ 越高、$I_o$ 越小，纹波越小</div></div>

        <h4 class="font-medium mt-6 mb-2">实例计算：桥式整流滤波</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">已知：输入 $u_2=10\\sqrt{2}\\sin(100\\pi t)V$（有效值 10V），桥式整流 + 电容滤波，$C=1000\\mu F$，$R_L=100\\Omega$。求输出电压和纹波。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：求峰值</strong>。$U_m=10\\sqrt{2}=14.14V$</div></div><div class="step-item"><div><strong>第二步：求负载电流</strong>。$I_o=\\frac{U_o}{R_L} \\approx \\frac{14}{100}=140mA$</div></div><div class="step-item"><div><strong>第三步：求纹波</strong>。$\\Delta U=\\frac{I_o}{2fC}=\\frac{0.14}{2 \\times 50 \\times 0.001}=1.4V$</div></div><div class="step-item"><div><strong>第四步：求输出电压</strong>。$U_o=U_m-\\frac{\\Delta U}{2}=14.14-0.7=13.44V$</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>滤波电容选型</strong>：工程上常用 $C \\geq \\frac{3\\sim5}{2fR_L}$ 来选择滤波电容，保证纹波足够小。电容耐压需大于 $U_m$（留 20% 余量）。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>浪涌电流</strong>：上电瞬间，电容相当于短路，二极管承受很大浪涌电流。需在电路中串联小电阻或 NTC 热敏电阻限流，保护二极管。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>与一阶暂态的联系</strong>：电容滤波本质是<a href="#" onclick="navigateTo('circ-04');return false;" style="color:var(--primary)">RC 一阶电路</a>的充放电过程——二极管导通时电容充电（时间常数小），截止时电容放电（时间常数大）。理解一阶暂态有助于分析纹波特性。</div></div>
      ` },
      { id: 'ana-03', title: '三极管(BJT)工作原理', desc: '放大区、特性曲线', icon: '🔺', tags: ['核心'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">三极管：电流控制电流的放大器</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">双极型晶体管（BJT）有三个电极（基极 B、集电极 C、发射极 E），核心功能是<strong>用小基极电流控制大集电极电流</strong>（电流控制电流源 CCCS），实现信号放大。三个工作区对应不同应用——模拟放大和数字开关。BJT 是<a href="#" onclick="navigateTo('ana-04');return false;" style="color:var(--primary)">基本放大电路</a>的核心器件。</p>

        <h4 class="font-medium mt-6 mb-2">BJT 的结构与符号</h4>
        <div class="formula-block">BJT 由两个 PN 结组成（NPN 或 PNP）：<br>NPN：基极 P 型，集电极和发射极 N 型<br>PNP：基极 N 型，集电极和发射极 P 型<div class="text-sm text-gray-500 mt-2">箭头方向表示发射结正向偏置方向（NPN 箭头向外，PNP 箭头向内）</div></div>

        <h4 class="font-medium mt-6 mb-2">电流关系</h4>
        <div class="formula-block">三种电流关系：<br>$I_C = \\beta I_B$（集电极电流 = 放大系数 × 基极电流）<br>$I_E = I_B + I_C = (1+\\beta)I_B$<br>$\\alpha = \\frac{\\beta}{1+\\beta}$（共基电流放大系数，接近 1）<div class="text-sm text-gray-500 mt-2">$\\beta$（共射电流放大系数）通常 50~300，是 BJT 最重要的参数</div></div>

        <h4 class="font-medium mt-6 mb-2">三个工作区</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>工作区</th><th>结偏置</th><th>电流特性</th><th>$U_{CE}$</th><th>应用</th></tr></thead><tbody><tr><td class="font-medium">放大区</td><td>发射结正偏、集电结反偏</td><td>$I_C=\\beta I_B$（线性）</td><td>较大（>0.3V）</td><td>模拟放大</td></tr><tr><td class="font-medium">饱和区</td><td>两结均正偏</td><td>$I_C$ 不受 $I_B$ 控制</td><td>$\\approx 0.3V$</td><td>开关导通</td></tr><tr><td class="font-medium">截止区</td><td>两结均反偏</td><td>$I_B=0$，$I_C\\approx 0$</td><td>$\\approx V_{CC}$</td><td>开关断开</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">特性曲线</h4>
        <div class="step-list"><div class="step-item"><div><strong>输入特性</strong>：$i_B=f(u_{BE})|_{u_{CE}=const}$，类似二极管正向特性，$U_{BE}\\approx 0.7V$（硅管）。</div></div><div class="step-item"><div><strong>输出特性</strong>：$i_C=f(u_{CE})|_{i_B=const}$，放大区近似水平线（恒流源），饱和区快速上升。</div></div><div class="step-item"><div><strong>转移特性</strong>：$i_C=f(u_{BE})$，指数关系（类似二极管），用于跨导分析。</div></div></div>

        <h4 class="font-medium mt-6 mb-2">小信号模型</h4>
        <div class="formula-block">混合 $\\pi$ 模型（低频简化）：<br>输入电阻：$r_{be} = r_{bb'} + (1+\\beta)\\frac{U_T}{I_{CQ}} \\approx \\beta \\frac{U_T}{I_{CQ}}$<br>跨导：$g_m = \\frac{I_{CQ}}{U_T} = \\frac{\\beta}{r_{be}}$<br>受控源：$i_c = g_m u_{be} = \\beta i_b$<div class="text-sm text-gray-500 mt-2">$U_T \\approx 26mV$（室温），$I_{CQ}$ 为静态工作点电流</div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>放大与开关的统一</strong>：模拟电路用放大区（线性），数字电路用饱和/截止区（开关）。同一器件，工作区不同用途完全不同。详见 <a href="#" onclick="navigateTo('dig-14');return false;" style="color:var(--primary)">数字电路</a>。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>温度影响</strong>：$U_{BE}$ 温度系数约 -2mV/°C，$\\beta$ 随温度升高而增大。这导致静态工作点漂移，需要<a href="#" onclick="navigateTo('ana-05');return false;" style="color:var(--primary)">稳定偏置电路</a>来补偿。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>与<a href="#" onclick="navigateTo('circ-12');return false;" style="color:var(--primary)">受控源</a>的联系</strong>：BJT 本质是 CCCS（电流控制电流源），$i_c=\\beta i_b$。在电路分析中，BJT 用受控源模型代替，这是<a href="#" onclick="navigateTo('ana-04');return false;" style="color:var(--primary)">小信号等效电路</a>的基础。</div></div>
      ` },
      { id: 'ana-04', title: '基本放大电路', desc: '共射/共集/共基、交直流分析', icon: '🔊', tags: ['高频核心'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">三种基本组态：放大电路的基石</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">根据输入输出公共端不同，基本放大电路分三种组态：共射（CE）、共集（CC）、共基（CB）。三者各有特点，掌握其电压/电流增益、输入/输出电阻，是分析所有放大电路的基础。基本放大电路建立在<a href="#" onclick="navigateTo('ana-03');return false;" style="color:var(--primary)">BJT 工作原理</a>基础上，是<a href="#" onclick="navigateTo('ana-06');return false;" style="color:var(--primary)">多级放大电路</a>和<a href="#" onclick="navigateTo('ana-08');return false;" style="color:var(--primary)">反馈电路</a>的基石。</p>

        <h4 class="font-medium mt-6 mb-2">三种组态对比</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>组态</th><th>电压增益</th><th>电流增益</th><th>输入电阻</th><th>输出电阻</th><th>特点</th></tr></thead><tbody><tr><td class="font-medium">共射 (CE)</td><td>大（反相）</td><td>大（$\\beta$）</td><td>中（$r_{be}$）</td><td>中（$R_C$）</td><td>最常用，增益高</td></tr><tr><td class="font-medium">共集 (CC)</td><td>$\\approx 1$（同相）</td><td>大（$1+\\beta$）</td><td>大</td><td>小</td><td>射极跟随器，阻抗变换</td></tr><tr><td class="font-medium">共基 (CB)</td><td>大（同相）</td><td>$\\approx 1$（$\\alpha$）</td><td>小</td><td>大</td><td>高频特性好</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">共射放大器</h4>
        <div class="formula-block">共射放大器小信号分析：<br>电压增益：$A_v = -g_m (R_C \\parallel R_L) = -\\frac{\\beta (R_C \\parallel R_L)}{r_{be}}$<br>输入电阻：$R_i = R_B \\parallel r_{be}$<br>输出电阻：$R_o = R_C$<div class="text-sm text-gray-500 mt-2">负号表示输出与输入反相，$g_m$ 为跨导，$r_{be}$ 为输入电阻</div></div>

        <h4 class="font-medium mt-6 mb-2">共集放大器（射极跟随器）</h4>
        <div class="formula-block">共集放大器小信号分析：<br>电压增益：$A_v = \\frac{(1+\\beta)(R_E \\parallel R_L)}{r_{be} + (1+\\beta)(R_E \\parallel R_L)} \\approx 1$<br>输入电阻：$R_i = R_B \\parallel [r_{be} + (1+\\beta)(R_E \\parallel R_L)]$（很大）<br>输出电阻：$R_o = R_E \\parallel \\frac{r_{be} + R_S}{1+\\beta}$（很小）<div class="text-sm text-gray-500 mt-2">电压增益接近 1，但电流增益大，实现阻抗变换</div></div>

        <h4 class="font-medium mt-6 mb-2">共基放大器</h4>
        <div class="formula-block">共基放大器小信号分析：<br>电压增益：$A_v = g_m (R_C \\parallel R_L) = \\frac{\\beta (R_C \\parallel R_L)}{r_{be}}$<br>输入电阻：$R_i = R_E \\parallel \\frac{r_{be}}{1+\\beta}$（很小）<br>输出电阻：$R_o = R_C$（大）<div class="text-sm text-gray-500 mt-2">电压增益与共射相同但同相，高频特性好（无密勒效应）</div></div>

        <h4 class="font-medium mt-6 mb-2">实例计算：共射放大器</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">已知：$V_{CC}=12V$，$R_B=300k\\Omega$，$R_C=3k\\Omega$，$R_L=3k\\Omega$，$\\beta=100$。求电压增益和输入电阻。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：求静态工作点</strong>。$I_{BQ}=\\frac{V_{CC}-0.7}{R_B}=\\frac{11.3}{300k}=37.7\\mu A$，$I_{CQ}=\\beta I_{BQ}=3.77mA$</div></div><div class="step-item"><div><strong>第二步：求 $r_{be}$</strong>。$r_{be}=\\beta \\frac{U_T}{I_{CQ}}=100 \\times \\frac{26mV}{3.77mA}=690\\Omega$</div></div><div class="step-item"><div><strong>第三步：求增益</strong>。$A_v=-\\frac{\\beta (R_C \\parallel R_L)}{r_{be}}=-\\frac{100 \\times 1.5k}{690}=-217$</div></div><div class="step-item"><div><strong>第四步：求输入电阻</strong>。$R_i=R_B \\parallel r_{be}=300k \\parallel 690=688\\Omega$</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>组态选择口诀</strong>：电压放大选共射，阻抗变换选共集，高频放大选共基。实际电路常组合使用（如共射-共集级联，兼顾增益和带负载能力）。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>交直流分离分析</strong>：放大电路既有直流偏置（设静态工作点）又有交流信号（被放大）。分析时先算直流（电容开路），再算交流（电容短路、直流源置零）。两者叠加就是实际工作状态。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>与<a href="#" onclick="navigateTo('circ-12');return false;" style="color:var(--primary)">受控源</a>的联系</strong>：BJT 小信号模型是 CCCS（电流控制电流源），$i_c=\\beta i_b$。在电路分析中，用受控源模型代替 BJT，简化计算。</div></div>
      ` },
      { id: 'ana-05', title: '静态工作点稳定', desc: '图解法、分压偏置', icon: '⚖', tags: ['核心'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">工作点稳定：温度补偿的艺术</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4"><a href="#" onclick="navigateTo('ana-03');return false;" style="color:var(--primary)">三极管</a>参数（$\\beta$、$I_{CBO}$、$U_{BE}$）随温度变化大，导致静态工作点漂移，可能引起饱和失真或截止失真。分压偏置电路利用负反馈稳定工作点，是工程最常用的偏置方案。工作点稳定是<a href="#" onclick="navigateTo('ana-04');return false;" style="color:var(--primary)">基本放大电路</a>可靠工作的前提。</p>

        <h4 class="font-medium mt-6 mb-2">温度对工作点的影响</h4>
        <div class="formula-block">温度升高时：<br>$U_{BE}$ 下降（约 -2mV/°C）→ $I_B$ 增大 → $I_C$ 增大<br>$\\beta$ 增大 → $I_C$ 增大<br>$I_{CBO}$ 翻倍（每升 10°C）→ $I_C$ 增大<div class="text-sm text-gray-500 mt-2">三种效应都使 $I_C$ 随温度升高而增大，导致工作点漂移</div></div>

        <h4 class="font-medium mt-6 mb-2">分压偏置电路</h4>
        <div class="formula-block">分压偏置电路结构：<br>$R_{B1}$ 和 $R_{B2}$ 对 $V_{CC}$ 分压，提供固定基极电压 $V_B$<br>$R_E$ 提供直流负反馈，稳定工作点<br>设计条件：$I_1 \\gg I_B$（通常 $I_1 \\geq 10 I_B$）<div class="text-sm text-gray-500 mt-2">满足设计条件时，$V_B \\approx V_{CC} \\cdot \\frac{R_{B2}}{R_{B1}+R_{B2}}$（与 $\\beta$ 无关）</div></div>

        <h4 class="font-medium mt-6 mb-2">稳定原理分析</h4>
        <div class="step-list"><div class="step-item"><div><strong>第一步：温度升高</strong>。$I_C$ 增大 → $I_E$ 增大 → $V_E = I_E R_E$ 增大。</div></div><div class="step-item"><div><strong>第二步：负反馈</strong>。$V_B$ 固定（分压决定），$V_E$ 增大 → $U_{BE} = V_B - V_E$ 减小。</div></div><div class="step-item"><div><strong>第三步：自动调节</strong>。$U_{BE}$ 减小 → $I_B$ 减小 → $I_C$ 减小，抵消温度影响。</div></div></div>

        <h4 class="font-medium mt-6 mb-2">静态工作点计算</h4>
        <div class="formula-block">分压偏置电路的静态工作点：<br>$V_B = V_{CC} \\cdot \\frac{R_{B2}}{R_{B1}+R_{B2}}$<br>$I_{CQ} \\approx I_{EQ} = \\frac{V_B - U_{BE}}{R_E}$<br>$V_{CEQ} = V_{CC} - I_{CQ}(R_C + R_E)$<div class="text-sm text-gray-500 mt-2">$I_{CQ}$ 与 $\\beta$ 无关（只要满足 $I_1 \\gg I_B$），实现工作点稳定</div></div>

        <h4 class="font-medium mt-6 mb-2">实例计算：分压偏置设计</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">设计一个分压偏置电路：$V_{CC}=12V$，$I_{CQ}=2mA$，$V_{CEQ}=6V$，$\\beta=100$。求各电阻值。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：选 $R_E$</strong>。$V_E=I_{CQ} R_E$，选 $V_E=2V$，则 $R_E=\\frac{2}{2mA}=1k\\Omega$</div></div><div class="step-item"><div><strong>第二步：求 $R_C$</strong>。$V_{CEQ}=V_{CC}-I_{CQ}(R_C+R_E)$，$6=12-2(R_C+1)$，$R_C=2k\\Omega$</div></div><div class="step-item"><div><strong>第三步：求 $V_B$</strong>。$V_B=V_E+U_{BE}=2+0.7=2.7V$</div></div><div class="step-item"><div><strong>第四步：求 $R_{B1}$、$R_{B2}$</strong>。选 $I_1=10I_B=0.2mA$，$R_{B1}=\\frac{12-2.7}{0.2}=46.5k\\Omega$，$R_{B2}=\\frac{2.7}{0.2}=13.5k\\Omega$（选标准值 47k 和 13k）</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>旁路电容的作用</strong>：$R_E$ 稳定了直流工作点，但也会降低交流增益（交流负反馈）。并联大电容 $C_E$（旁路电容，通常 10~100μF）让交流信号短路 $R_E$，既稳定直流又不损失交流增益。这是"直流负反馈、交流无影响"的经典设计。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>设计条件的重要性</strong>：$I_1 \\gg I_B$ 是工作点稳定的前提。若 $I_1$ 不够大，$V_B$ 会受 $I_B$ 影响而变化，稳定效果变差。工程上通常取 $I_1 \\geq (5\\sim10) I_B$。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>与<a href="#" onclick="navigateTo('ana-08');return false;" style="color:var(--primary)">反馈</a>的联系</strong>：分压偏置是直流负反馈的应用——$R_E$ 将输出电流变化反馈到输入端，自动调节 $U_{BE}$，稳定工作点。理解负反馈原理有助于分析更复杂的<a href="#" onclick="navigateTo('ana-08');return false;" style="color:var(--primary)">反馈放大电路</a>。</div></div>
      ` },
      { id: 'ana-06', title: '多级放大电路', desc: '耦合方式、级联分析', icon: '📊', tags: ['基础'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">多级放大：突破单级增益极限</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">单级放大器增益有限（共射约几十到几百），要获得更高增益需多级级联。级间耦合方式有三种：阻容耦合、直接耦合、变压器耦合，各有适用场景。多级放大是<a href="#" onclick="navigateTo('ana-04');return false;" style="color:var(--primary)">基本放大电路</a>的扩展，也是<a href="#" onclick="navigateTo('ana-07');return false;" style="color:var(--primary)">集成运放</a>的内部结构基础。</p>

        <h4 class="font-medium mt-6 mb-2">三种耦合方式</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>耦合方式</th><th>连接方式</th><th>频率响应</th><th>优点</th><th>缺点</th><th>应用</th></tr></thead><tbody><tr><td class="font-medium">阻容耦合</td><td>电容连接</td><td>低频差</td><td>各级直流独立，设计简单</td><td>不能放大直流</td><td>分立元件交流放大</td></tr><tr><td class="font-medium">直接耦合</td><td>导线直接</td><td>低频好</td><td>可放大直流，集成化</td><td>有零点漂移</td><td>集成运放（必用）</td></tr><tr><td class="font-medium">变压器耦合</td><td>变压器</td><td>频带窄</td><td>阻抗匹配，隔离直流</td><td>体积大、笨重</td><td>功率放大、射频</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">级联增益计算</h4>
        <div class="formula-block">多级放大器总增益：<br>$A_v = A_{v1} \\cdot A_{v2} \\cdot A_{v3} \\cdots$<br>关键：<strong>后级输入电阻是前级负载</strong><br>$A_{v1}$ 必须用 $R_{i2}$（后级输入电阻）作为负载计算<div class="text-sm text-gray-500 mt-2">不能简单相乘空载增益！必须考虑级间负载效应</div></div>

        <h4 class="font-medium mt-6 mb-2">实例计算：两级放大器</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">两级共射放大器级联：第一级 $R_{C1}=3k\\Omega$，$r_{be1}=1k\\Omega$，$\\beta_1=100$；第二级 $R_{C2}=2k\\Omega$，$r_{be2}=800\\Omega$，$\\beta_2=80$。求总电压增益。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：求第二级输入电阻</strong>。$R_{i2}=r_{be2}=800\\Omega$（忽略偏置电阻）</div></div><div class="step-item"><div><strong>第二步：求第一级增益（带载）</strong>。$A_{v1}=-\\frac{\\beta_1 (R_{C1} \\parallel R_{i2})}{r_{be1}}=-\\frac{100 \\times 632}{1k}=-63.2$</div></div><div class="step-item"><div><strong>第三步：求第二级增益</strong>。$A_{v2}=-\\frac{\\beta_2 R_{C2}}{r_{be2}}=-\\frac{80 \\times 2k}{800}=-200$</div></div><div class="step-item"><div><strong>第四步：求总增益</strong>。$A_v=A_{v1} \\times A_{v2}=(-63.2) \\times (-200)=12640$（同相）</div></div></div>

        <h4 class="font-medium mt-6 mb-2">频率响应特性</h4>
        <div class="formula-block">多级放大器的带宽：<br>总带宽 $BW < BW_1$（各级带宽的交集）<br>级数越多，增益越高，但带宽越窄<div class="text-sm text-gray-500 mt-2">增益带宽积 $GBW$ 近似恒定：$A_v \\cdot BW \\approx const$</div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>组合组态</strong>：实际电路常组合使用不同组态——共射-共集级联（兼顾增益和带负载能力）、共射-共基级联（提高高频特性）。理解各组态特点，才能合理选择级联方式。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>级联增益 = 各级增益之积</strong>：但要注意<strong>后级输入电阻是前级负载</strong>。计算时必须把后级输入电阻作为前级负载考虑，不能简单相乘空载增益。直接耦合的零点漂移问题需用差动放大电路解决，详见 <a href="#" onclick="navigateTo('ana-07');return false;" style="color:var(--primary)">集成运放基础</a>。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>集成运放的内部结构</strong>：<a href="#" onclick="navigateTo('ana-07');return false;" style="color:var(--primary)">集成运放</a>就是多级直接耦合放大器——差动输入级（抑制零漂）+ 中间放大级（高增益）+ 输出级（低阻抗）。理解多级放大有助于理解运放内部工作原理。</div></div>
      ` },
      { id: 'ana-07', title: '集成运放基础', desc: '差动放大、电流源', icon: '🔬', tags: ['核心'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">集成运放的内部基石</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">集成运放是高增益<a href="#" onclick="navigateTo('ana-06');return false;" style="color:var(--primary)">直接耦合多级放大器</a>，内部由差动输入级 + 中间放大级 + 输出级 + 偏置电流源组成。差动放大解决零点漂移，电流源提供稳定偏置和高增益负载。集成运放是<a href="#" onclick="navigateTo('circ-11');return false;" style="color:var(--primary)">运放电路分析</a>和<a href="#" onclick="navigateTo('ana-09');return false;" style="color:var(--primary)">运放线性应用</a>的硬件基础。</p>

        <h4 class="font-medium mt-6 mb-2">集成运放内部结构</h4>
        <div class="formula-block">集成运放四级结构：<br>① 差动输入级（抑制零漂，高输入阻抗）<br>② 中间放大级（提供主要电压增益）<br>③ 输出级（低输出阻抗，带负载能力）<br>④ 偏置电流源（提供稳定工作电流）<div class="text-sm text-gray-500 mt-2">典型运放（如 LM741）：开环增益 $A_{od} \\approx 2 \\times 10^5$，输入阻抗 $R_{id} \\approx 2M\\Omega$，输出阻抗 $R_o \\approx 75\\Omega$</div></div>

        <h4 class="font-medium mt-6 mb-2">差动放大电路</h4>
        <div class="formula-block">差动放大器输出：<br>$u_o = A_d(u_+ - u_-) + A_c \\cdot \\frac{u_+ + u_-}{2}$<br>$A_d$：差模增益（放大有用信号）<br>$A_c$：共模增益（应尽量小）<div class="text-sm text-gray-500 mt-2">理想运放 $A_d \\to \\infty$，$A_c = 0$</div></div>

        <h4 class="font-medium mt-6 mb-2">共模抑制比 CMRR</h4>
        <div class="formula-block">共模抑制比定义：$CMRR = \\left|\\frac{A_d}{A_c}\\right|$<br>对数表示：$CMRR(dB) = 20\\log\\left|\\frac{A_d}{A_c}\\right|$<br>典型值：80~120 dB（$10^4$~$10^6$）<div class="text-sm text-gray-500 mt-2">CMRR 越大，抑制共模干扰（如温度漂移、电源噪声）的能力越强</div></div>

        <h4 class="font-medium mt-6 mb-2">差模与共模信号</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>信号类型</th><th>定义</th><th>来源</th><th>处理</th></tr></thead><tbody><tr><td class="font-medium">差模信号</td><td>$u_d = u_+ - u_-$</td><td>有用输入信号</td><td>放大（$A_d$ 大）</td></tr><tr><td class="font-medium">共模信号</td><td>$u_c = \\frac{u_+ + u_-}{2}$</td><td>温度漂移、电源噪声</td><td>抑制（$A_c$ 小）</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">电流源偏置</h4>
        <div class="formula-block">电流源的作用：<br>① 为各级提供稳定的工作电流（不受温度影响）<br>② 作为差动放大器的尾电流源（提高 CMRR）<br>③ 作为放大级的有源负载（提高增益）<div class="text-sm text-gray-500 mt-2">电流源输出阻抗极高（理想无穷大），用作负载可大幅提高增益</div></div>

        <h4 class="font-medium mt-6 mb-2">实例计算：差动放大器</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">已知差动放大器：$R_C=10k\\Omega$，$r_{be}=2k\\Omega$，$\\beta=100$，$u_+=10mV$，$u_-=8mV$。求输出电压。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：分解信号</strong>。差模 $u_d=10-8=2mV$，共模 $u_c=\\frac{10+8}{2}=9mV$</div></div><div class="step-item"><div><strong>第二步：求差模增益</strong>。$A_d=\\frac{\\beta R_C}{2r_{be}}=\\frac{100 \\times 10k}{2 \\times 2k}=250$</div></div><div class="step-item"><div><strong>第三步：求输出</strong>。$u_o = A_d \\cdot u_d = 250 \\times 2mV = 0.5V$（共模分量被抑制）</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>差动放大的价值</strong>：温度变化对两管影响相同（共模信号），被差动结构抵消；有用信号差分输入（差模信号），被放大。所以差动放大能<strong>放大差模、抑制共模</strong>，解决直接耦合的零点漂移。这是运放输入级必用差动的原因。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>实际运放的非理想特性</strong>：①输入失调电压 $V_{IO}$（典型 1~5mV）；②输入偏置电流 $I_B$（典型 nA~μA）；③有限开环增益；④有限带宽（增益带宽积恒定）。设计高精度电路时需考虑这些非理想因素。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>与<a href="#" onclick="navigateTo('circ-11');return false;" style="color:var(--primary)">运放电路</a>的联系</strong>：理解运放内部结构，有助于理解"虚短虚断"的来源——差动输入级的高增益使两输入端电压差趋近于零（虚短），高输入阻抗使输入电流趋近于零（虚断）。</div></div>
      ` },
      { id: 'ana-08', title: '反馈放大电路', desc: '四种组态、判别、性能影响', icon: '↩', tags: ['难点核心'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">反馈：改善放大器性能的核心手段</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">反馈是把输出量的一部分送回输入端。负反馈虽降低增益，但能提高增益稳定性、展宽频带、改善输入输出阻抗、减小非线性失真——几乎所有实用放大器都引入负反馈。反馈是<a href="#" onclick="navigateTo('ana-05');return false;" style="color:var(--primary)">工作点稳定</a>的推广，也是<a href="#" onclick="navigateTo('ana-09');return false;" style="color:var(--primary)">运放线性应用</a>的理论基础。</p>

        <h4 class="font-medium mt-6 mb-2">反馈的基本概念</h4>
        <div class="formula-block">反馈放大器的基本关系：<br>开环增益 $A = \\frac{X_o}{X_i'}$（无反馈时的增益）<br>反馈系数 $F = \\frac{X_f}{X_o}$（反馈网络的传递函数）<br>闭环增益 $A_f = \\frac{A}{1+AF}$（有反馈时的增益）<div class="text-sm text-gray-500 mt-2">$1+AF$ 称为"反馈深度"，是负反馈的核心参数</div></div>

        <h4 class="font-medium mt-6 mb-2">四种反馈组态</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>反馈类型</th><th>输出取样</th><th>输入比较</th><th>对输入电阻</th><th>对输出电阻</th><th>稳定量</th></tr></thead><tbody><tr><td class="font-medium">电压串联</td><td>电压</td><td>串联</td><td>增大</td><td>减小</td><td>输出电压</td></tr><tr><td class="font-medium">电压并联</td><td>电压</td><td>并联</td><td>减小</td><td>减小</td><td>输出电压</td></tr><tr><td class="font-medium">电流串联</td><td>电流</td><td>串联</td><td>增大</td><td>增大</td><td>输出电流</td></tr><tr><td class="font-medium">电流并联</td><td>电流</td><td>并联</td><td>减小</td><td>增大</td><td>输出电流</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">负反馈的四大好处</h4>
        <div class="formula-block">负反馈改善性能（$1+AF$ 倍）：<br>① 提高增益稳定性：$\\frac{dA_f}{A_f} = \\frac{1}{1+AF} \\cdot \\frac{dA}{A}$<br>② 展宽频带：$BW_f = (1+AF) \\cdot BW$<br>③ 减小非线性失真<br>④ 改善输入/输出阻抗<div class="text-sm text-gray-500 mt-2">代价：增益降低为原来的 $1/(1+AF)$</div></div>

        <h4 class="font-medium mt-6 mb-2">反馈极性判别</h4>
        <div class="step-list"><div class="step-item"><div><strong>第一步：瞬时极性法</strong>。假设输入端瞬时升高（+），沿信号通路标各点极性变化。</div></div><div class="step-item"><div><strong>第二步：判断反馈极性</strong>。看反馈到输入端的信号是增强（+，正反馈）还是削弱（-，负反馈）原信号。</div></div><div class="step-item"><div><strong>第三步：判断取样方式</strong>。输出短路（$u_o=0$），若反馈消失则为电压反馈，否则为电流反馈。</div></div><div class="step-item"><div><strong>第四步：判断比较方式</strong>。输入端看，反馈信号与输入信号在同一节点为并联，不在同一节点为串联。</div></div></div>

        <h4 class="font-medium mt-6 mb-2">实例分析：电压串联负反馈</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">共集放大器（射极跟随器）是典型的电压串联负反馈：$R_E$ 既是输出负载又是反馈网络。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：识别反馈</strong>。$R_E$ 上的电压 $u_f = u_o$（输出电压全部反馈）。</div></div><div class="step-item"><div><strong>第二步：判断极性</strong>。$u_i$ 增大 → $u_b$ 增大 → $u_e$ 增大 → $u_{be} = u_b - u_e$ 减小（负反馈）。</div></div><div class="step-item"><div><strong>第三步：判断组态</strong>。输出短路 $u_o=0$，$u_f=0$（反馈消失）→ 电压反馈。输入端 $u_{be}=u_i-u_f$ → 串联比较。</div></div><div class="step-item"><div><strong>第四步：结论</strong>。共集放大器是电压串联负反馈，所以输入电阻大、输出电阻小、电压增益接近 1。</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>反馈类型选择口诀</strong>：要稳定输出电压选电压反馈，要稳定输出电流选电流反馈；要提高输入电阻选串联反馈，要降低输入电阻选并联反馈。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>反馈极性判别（瞬时极性法）</strong>：假设输入端瞬时升高，沿信号通路标各点极性变化，看反馈到输入端是增强（正反馈）还是削弱（负反馈）原信号。四种组态判别：输出短路法判电压/电流反馈（反馈消失则为电压反馈），输入端看串联/并联。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>与<a href="#" onclick="navigateTo('circ-11');return false;" style="color:var(--primary)">运放电路</a>的联系</strong>：运放的"虚短虚断"本质上是深度负反馈的结果——开环增益 $A \\to \\infty$ 时，$1+AF \\to \\infty$，$u_{be} \\to 0$（虚短）。理解反馈有助于理解运放电路的本质。</div></div>
      ` },
      { id: 'ana-09', title: '运放线性应用', desc: '比例/求和/积分/微分', icon: '∓', tags: ['工程高频'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">运放线性应用：模拟计算的实现</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">运放接成<a href="#" onclick="navigateTo('ana-08');return false;" style="color:var(--primary)">负反馈</a>（线性区），配合不同外围元件可实现各种数学运算：比例（放大）、求和（加法）、积分、微分。这是模拟计算机的基础，也是信号处理的核心电路。分析只需 <a href="#" onclick="navigateTo('circ-11');return false;" style="color:var(--primary)">虚短虚断</a>。运放线性应用是<a href="#" onclick="navigateTo('ana-10');return false;" style="color:var(--primary)">运放非线性应用</a>和<a href="#" onclick="navigateTo('ana-11');return false;" style="color:var(--primary)">有源滤波器</a>的基础。</p>

        <h4 class="font-medium mt-6 mb-2">反相比例放大器</h4>
        <div class="formula-block">反相比例放大器：<br>输入信号经 $R_1$ 接反相端，$R_f$ 从输出到反相端，同相端接地<br>电压增益：$A_v = -\\frac{R_f}{R_1}$<br>输入电阻：$R_{in} = R_1$（反相端虚地）<div class="text-sm text-gray-500 mt-2">负号表示反相，增益由电阻比值决定，与运放参数无关</div></div>

        <h4 class="font-medium mt-6 mb-2">同相比例放大器</h4>
        <div class="formula-block">同相比例放大器：<br>输入信号接同相端，$R_1$ 接反相端到地，$R_f$ 从输出到反相端<br>电压增益：$A_v = 1 + \\frac{R_f}{R_1}$<br>输入电阻：$R_{in} \\to \\infty$（理想运放）<div class="text-sm text-gray-500 mt-2">输出与输入同相，增益 ≥ 1，电压跟随器是 $R_f=0$ 的特例</div></div>

        <h4 class="font-medium mt-6 mb-2">常用运放电路汇总</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>电路</th><th>输入输出关系</th><th>输入电阻</th><th>应用</th></tr></thead><tbody><tr><td class="font-medium">反相比例</td><td>$u_o = -\\frac{R_f}{R_1}u_i$</td><td>$R_1$</td><td>反相放大</td></tr><tr><td class="font-medium">同相比例</td><td>$u_o = (1+\\frac{R_f}{R_1})u_i$</td><td>$\\infty$</td><td>同相放大</td></tr><tr><td class="font-medium">电压跟随器</td><td>$u_o = u_i$</td><td>$\\infty$</td><td>阻抗变换（缓冲）</td></tr><tr><td class="font-medium">反相求和</td><td>$u_o = -(\\frac{R_f}{R_1}u_1 + \\frac{R_f}{R_2}u_2)$</td><td>各支路独立</td><td>加权加法</td></tr><tr><td class="font-medium">积分器</td><td>$u_o = -\\frac{1}{RC}\\int u_i\\,dt$</td><td>$R$</td><td>波形变换</td></tr><tr><td class="font-medium">微分器</td><td>$u_o = -RC\\frac{du_i}{dt}$</td><td>$R$</td><td>边缘检测</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">实例计算：反相求和放大器</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">设计一个反相求和放大器：$u_o = -(2u_1 + 3u_2)$，选 $R_f=60k\\Omega$。求 $R_1$ 和 $R_2$。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：列方程</strong>。$u_o = -(\\frac{R_f}{R_1}u_1 + \\frac{R_f}{R_2}u_2) = -(2u_1 + 3u_2)$</div></div><div class="step-item"><div><strong>第二步：求 $R_1$</strong>。$\\frac{R_f}{R_1}=2$，$R_1=\\frac{60k}{2}=30k\\Omega$</div></div><div class="step-item"><div><strong>第三步：求 $R_2$</strong>。$\\frac{R_f}{R_2}=3$，$R_2=\\frac{60k}{3}=20k\\Omega$</div></div><div class="step-item"><div><strong>第四步：验证</strong>。$u_o = -(\\frac{60k}{30k}u_1 + \\frac{60k}{20k}u_2) = -(2u_1 + 3u_2)$ ✓</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>反相放大的"虚地"</strong>：反相端经反馈电阻接输出，同相端接地，虚短使反相端也接近地电位（虚地）。这让分析极简——反相端节点 KCL 直接得到增益公式。这是工程中最常用的运放电路。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>实际运放的限制</strong>：①输出电压不超过电源电压（通常 $\\pm 13V$，$\\pm 15V$ 供电）；②输出电流有限（典型 20mA）；③带宽有限（增益带宽积恒定）。设计时需考虑这些实际限制。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>与<a href="#" onclick="navigateTo('ana-11');return false;" style="color:var(--primary)">有源滤波器</a>的联系</strong>：运放 + RC 网络可构成有源滤波器（低通、高通、带通、带阻），比无源 RC 滤波器性能更好。积分器是开关电容滤波器和 sigma-delta ADC 的基础。</div></div>
      ` },
      { id: 'ana-10', title: '运放非线性应用', desc: '比较器、施密特、波形发生', icon: '🔲', tags: ['工程'], goals: { eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">运放非线性应用：开环与正反馈</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">运放开环（无反馈）或正反馈时工作在非线性区（饱和），输出只有高/低两个电平。这构成比较器、施密特触发器、方波/三角波发生器——这些是 ADC 输入、电平检测、波形产生的核心。运放非线性应用与<a href="#" onclick="navigateTo('ana-09');return false;" style="color:var(--primary)">运放线性应用</a>形成对比——线性用负反馈，非线性用开环或正反馈。</p>

        <h4 class="font-medium mt-6 mb-2">比较器：电平判决</h4>
        <div class="formula-block">过零比较器（开环）：<br>$u_i > 0$ → $u_o = +V_{sat}$（正饱和，约 $+V_{CC}-1V$）<br>$u_i < 0$ → $u_o = -V_{sat}$（负饱和，约 $-V_{EE}+1V$）<div class="text-sm text-gray-500 mt-2">输入电压与参考电压比较，输出高/低电平</div></div>

        <h4 class="font-medium mt-6 mb-2">施密特触发器：滞回比较</h4>
        <div class="formula-block">施密特触发器（正反馈）：<br>上升阈值：$U_{T+} = \\frac{R_2}{R_1+R_2} V_{sat}$<br>下降阈值：$U_{T-} = -\\frac{R_2}{R_1+R_2} V_{sat}$<br>滞回电压：$\\Delta U = U_{T+} - U_{T-}$<div class="text-sm text-gray-500 mt-2">正反馈产生两个阈值，信号在阈值间输出不翻转，有效抗干扰</div></div>

        <h4 class="font-medium mt-6 mb-2">波形发生器</h4>
        <div class="step-list"><div class="step-item"><div><strong>方波发生器</strong>：施密特触发器 + RC 充放电。电容电压在 $U_{T+}$ 和 $U_{T-}$ 间充放电，输出方波。</div></div><div class="step-item"><div><strong>三角波发生器</strong>：方波发生器 + 积分器。方波经积分得三角波，再反馈到施密特输入形成闭环。</div></div><div class="step-item"><div><strong>频率计算</strong>：方波频率 $f = \\frac{1}{2RC\\ln(1+2R_2/R_1)}$（由 RC 时间常数和阈值决定）。</div></div></div>

        <h4 class="font-medium mt-6 mb-2">比较器 vs 施密特触发器</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>特性</th><th>过零比较器</th><th>施密特触发器</th></tr></thead><tbody><tr><td class="font-medium">反馈</td><td>无（开环）</td><td>正反馈</td></tr><tr><td class="font-medium">阈值</td><td>1 个（0V 或参考电压）</td><td>2 个（$U_{T+}$ 和 $U_{T-}$）</td></tr><tr><td class="font-medium">抗干扰</td><td>差（阈值附近抖动）</td><td>强（滞回区间不翻转）</td></tr><tr><td class="font-medium">应用</td><td>简单电平检测</td><td>噪声环境、波形整形</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">实例计算：施密特触发器</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">设计施密特触发器：$V_{sat}=13V$，要求 $U_{T+}=3V$，$U_{T-}=-3V$。求 $R_1$ 和 $R_2$。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：列方程</strong>。$U_{T+}=\\frac{R_2}{R_1+R_2} V_{sat}=3V$</div></div><div class="step-item"><div><strong>第二步：求比值</strong>。$\\frac{R_2}{R_1+R_2}=\\frac{3}{13}$，$R_1:R_2=10:3$</div></div><div class="step-item"><div><strong>第三步：选电阻</strong>。选 $R_2=3k\\Omega$，$R_1=10k\\Omega$</div></div><div class="step-item"><div><strong>第四步：验证</strong>。$U_{T+}=\\frac{3k}{13k} \\times 13=3V$ ✓，$U_{T-}=-3V$ ✓，滞回电压 $\\Delta U=6V$</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>施密特的滞回价值</strong>：普通比较器在阈值附近受噪声干扰会频繁翻转。施密特触发器用正反馈产生两个阈值（上升阈值 $U_{T+}$、下降阈值 $U_{T-}$），信号在两阈值之间时输出不翻转，有效抗干扰。这是 <a href="#" onclick="navigateTo('dig-11');return false;" style="color:var(--primary)">555 定时器</a> 施密特模式的基础。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>比较器 vs 运放</strong>：专用比较器（如 LM311）响应速度快（ns 级），输出电平与数字电路兼容。运放作比较器时响应慢（μs 级），但成本低。高速应用应选专用比较器。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>与<a href="#" onclick="navigateTo('dig-06');return false;" style="color:var(--primary)">数字电路</a>的联系</strong>：施密特触发器是模拟到数字的桥梁——将缓慢变化的模拟信号整形为边沿陡峭的数字信号。在<a href="#" onclick="navigateTo('dig-11');return false;" style="color:var(--primary)">555 定时器</a>和 ADC 输入电路中广泛应用。</div></div>
      ` },
      { id: 'ana-11', title: '有源滤波器', desc: 'LPF/HPF/BPF/BEF、Sallen-Key', icon: '🎚', tags: ['工程'], goals: { eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">有源滤波器：运放+RC 的高阶滤波</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">无源 RC 滤波器（<a href="#" onclick="navigateTo('circ-07');return false;" style="color:var(--primary)">频率响应</a>）衰减特性差（-20dB/dec）且带负载能力弱。有源滤波器用<a href="#" onclick="navigateTo('ana-09');return false;" style="color:var(--primary)">运放</a>提供增益和隔离，可实现高阶（陡峭衰减）且不衰减通带信号。有源滤波器是<a href="#" onclick="navigateTo('circ-08');return false;" style="color:var(--primary)">谐振电路</a>的高级形式。</p>

        <h4 class="font-medium mt-6 mb-2">四种基本滤波器</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>类型</th><th>功能</th><th>通带</th><th>应用</th></tr></thead><tbody><tr><td class="font-medium">LPF 低通</td><td>通过低频，抑制高频</td><td>$f < f_c$</td><td>抗混叠、平滑滤波</td></tr><tr><td class="font-medium">HPF 高通</td><td>通过高频，抑制低频</td><td>$f > f_c$</td><td>去除直流偏移</td></tr><tr><td class="font-medium">BPF 带通</td><td>通过某频段</td><td>$f_L < f < f_H$</td><td>选频接收、无线通信</td></tr><tr><td class="font-medium">BEF 带阻</td><td>抑制某频段</td><td>$f < f_L$ 或 $f > f_H$</td><td>滤除 50Hz 工频干扰</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">有源 vs 无源滤波器</h4>
        <div class="formula-block">有源滤波器的优势：<br>① 提供增益（通带信号不衰减）<br>② 高输入阻抗、低输出阻抗（隔离效果好）<br>③ 可实现高阶滤波（陡峭衰减）<br>④ 不用电感（体积小、成本低）<div class="text-sm text-gray-500 mt-2">缺点：需要电源、带宽受运放限制、有噪声</div></div>

        <h4 class="font-medium mt-6 mb-2">Sallen-Key 拓扑</h4>
        <div class="formula-block">Sallen-Key 二阶低通滤波器：<br>传递函数：$H(s) = \\frac{\\omega_0^2}{s^2 + \\frac{\\omega_0}{Q}s + \\omega_0^2}$<br>截止频率：$f_0 = \\frac{1}{2\\pi\\sqrt{R_1 R_2 C_1 C_2}}$<br>品质因数：$Q = \\frac{\\sqrt{R_1 R_2 C_1 C_2}}{R_1 C_1 + R_2 C_1 + R_1 C_2(1-A_v)}$<div class="text-sm text-gray-500 mt-2">$A_v$ 为运放增益（跟随器时 $A_v=1$），$Q$ 决定滤波器形状</div></div>

        <h4 class="font-medium mt-6 mb-2">滤波器阶数与衰减</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>阶数</th><th>衰减斜率</th><th>实现方式</th><th>应用</th></tr></thead><tbody><tr><td class="font-medium">1 阶</td><td>-20 dB/dec</td><td>单个 RC + 运放</td><td>简单滤波</td></tr><tr><td class="font-medium">2 阶</td><td>-40 dB/dec</td><td>Sallen-Key</td><td>大多数应用</td></tr><tr><td class="font-medium">4 阶</td><td>-80 dB/dec</td><td>两级 Sallen-Key 级联</td><td>高要求滤波</td></tr><tr><td class="font-medium">n 阶</td><td>$-20n$ dB/dec</td><td>多阶级联</td><td>专业音频、通信</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">实例计算：二阶低通设计</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">设计 Sallen-Key 二阶低通滤波器：$f_0=1kHz$，$Q=0.707$（巴特沃斯），选 $R_1=R_2=R$，$C_1=C_2=C$。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：选电容</strong>。选 $C=100nF$（常用值）。</div></div><div class="step-item"><div><strong>第二步：求电阻</strong>。$R=\\frac{1}{2\\pi f_0 C}=\\frac{1}{2\\pi \\times 10^3 \\times 10^{-7}}=1.59k\\Omega$</div></div><div class="step-item"><div><strong>第三步：验证 Q</strong>。$Q=\\frac{1}{3-A_v}=0.707$，$A_v=3-\\frac{1}{0.707}=1.586$（同相放大器增益）</div></div><div class="step-item"><div><strong>第四步：选电阻</strong>。$A_v=1+\\frac{R_f}{R_g}=1.586$，选 $R_g=10k\\Omega$，$R_f=5.86k\\Omega$</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>滤波器逼近类型</strong>：巴特沃斯（最大平坦，通带最平坦）、切比雪夫（等纹波，过渡带更陡）、贝塞尔（最平坦群延迟，相位失真最小）。选择取决于应用需求——音频用巴特沃斯，通信用切比雪夫，脉冲信号用贝塞尔。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>运放带宽限制</strong>：有源滤波器的上限频率受运放增益带宽积（GBW）限制。$f_0$ 较高时（>100kHz），需选高速运放。超高频滤波器（>10MHz）通常用无源 LC 滤波器。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>Sallen-Key 拓扑</strong>：最常用的二阶有源滤波器结构，用两个 RC 网络和一个运放（同相放大或跟随器）实现。两个 RC 节经正反馈形成 -40dB/dec 衰减。多级 Sallen-Key 级联可实现 4 阶、6 阶、8 阶高阶滤波。</div></div>
      ` },
      { id: 'ana-12', title: '功率放大器', desc: '甲/乙/甲乙类、OTL/OCL', icon: '🔋', tags: ['高频'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">功率放大器：效率与失真的权衡</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">功率放大器关注<strong>能量转换效率</strong>和<strong>最大输出功率</strong>，而非电压增益。根据<a href="#" onclick="navigateTo('ana-03');return false;" style="color:var(--primary)">晶体管</a>导通角分为甲类、乙类、甲乙类——效率越高非线性失真越大，工程中用甲乙类（互补对称）平衡两者。功率放大器是<a href="#" onclick="navigateTo('ana-04');return false;" style="color:var(--primary)">基本放大电路</a>在大信号下的特殊形式。</p>

        <h4 class="font-medium mt-6 mb-2">三种工作类别</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>类型</th><th>导通角</th><th>最大效率</th><th>失真</th><th>静态功耗</th><th>应用</th></tr></thead><tbody><tr><td class="font-medium">甲类</td><td>360°（全周期）</td><td>25%~50%</td><td>最小</td><td>大</td><td>小信号前置放大</td></tr><tr><td class="font-medium">乙类</td><td>180°（半周期）</td><td>78.5%</td><td>交越失真</td><td>零</td><td>（实际少用）</td></tr><tr><td class="font-medium">甲乙类</td><td>>180°</td><td>接近乙类</td><td>小</td><td>小</td><td>音频功放（最常用）</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">效率计算</h4>
        <div class="formula-block">功率放大器效率定义：<br>$\\eta = \\frac{P_o}{P_{DC}} \\times 100\\%$<br>甲类最大效率：$\\eta_{max} = 25\\%$（电阻负载）或 $50\\%$（变压器耦合）<br>乙类最大效率：$\\eta_{max} = \\frac{\\pi}{4} \\approx 78.5\\%$<div class="text-sm text-gray-500 mt-2">$P_o$ 为输出功率，$P_{DC}$ 为电源提供的直流功率</div></div>

        <h4 class="font-medium mt-6 mb-2">互补对称功率放大器</h4>
        <div class="step-list"><div class="step-item"><div><strong>乙类互补对称</strong>：NPN 和 PNP 两管轮流导通，各放大半周信号。优点是效率高，缺点是有交越失真。</div></div><div class="step-item"><div><strong>甲乙类改进</strong>：用二极管或 $U_{BE}$ 倍增器给两管加微小偏置（约 1.2~1.4V），使其在过零时微微导通，消除交越失真。</div></div><div class="step-item"><div><strong>输出级结构</strong>：OCL（无输出电容）用双电源（$\\pm V_{CC}$），OTL（无输出变压器）用单电源 + 大输出电容。</div></div></div>

        <h4 class="font-medium mt-6 mb-2">实例计算：OCL 功率放大器</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">已知 OCL 功放：$V_{CC}=\\pm 15V$，$R_L=8\\Omega$。求最大输出功率和效率。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：求最大输出电压幅值</strong>。$U_{om} \\approx V_{CC} - U_{CE(sat)} = 15 - 1 = 14V$</div></div><div class="step-item"><div><strong>第二步：求最大输出功率</strong>。$P_{om} = \\frac{U_{om}^2}{2R_L} = \\frac{14^2}{2 \\times 8} = 12.25W$</div></div><div class="step-item"><div><strong>第三步：求电源功率</strong>。$P_{DC} = \\frac{2V_{CC} U_{om}}{\\pi R_L} = \\frac{2 \\times 15 \\times 14}{\\pi \\times 8} = 16.7W$</div></div><div class="step-item"><div><strong>第四步：求效率</strong>。$\\eta = \\frac{P_{om}}{P_{DC}} = \\frac{12.25}{16.7} = 73.4\\%$（接近理论最大值 78.5%）</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>散热设计</strong>：功放管的功耗 $P_T = P_{DC} - P_o$ 转化为热量。最大管耗出现在 $U_{om} = \\frac{2V_{CC}}{\\pi}$ 时，$P_{Tmax} = \\frac{V_{CC}^2}{\\pi^2 R_L}$。大功率功放必须加散热器，防止热击穿。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>交越失真与甲乙类</strong>：乙类用两个互补管（NPN+PNP）轮流导通，但晶体管有 0.7V 导通阈值，信号过零时两管都未导通，产生交越失真。甲乙类给两管加微小偏置使其在过零时微微导通，消除交越失真。OCL（无输出电容）用双电源，OTL（无输出变压器）用单电源+大电容。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>现代功放技术</strong>：D 类功放（开关模式）效率可达 90% 以上，广泛用于手机、笔记本电脑等便携设备。集成功放芯片（如 LM386、TDA2030）内置保护电路，使用简单。</div></div>
      ` },
      { id: 'ana-13', title: '直流稳压电源', desc: '整流→滤波→稳压→LDO/开关电源', icon: '🔌', tags: ['工程'], goals: { eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">直流稳压电源：系统的能量来源</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">几乎所有电子系统都需要稳定的直流电源。直流稳压电源由<a href="#" onclick="navigateTo('ana-02');return false;" style="color:var(--primary)">整流滤波</a>和稳压两部分组成。线性稳压电源（LDO）简单低噪但效率低，开关电源（SMPS）效率高但有纹波。理解两者的原理和选型，是硬件设计的基础。</p>

        <h4 class="font-medium mt-6 mb-2">直流电源的组成</h4>
        <div class="step-list"><div class="step-item"><div><strong>① 变压</strong>：工频变压器把 220V 降到低压交流（或直接用开关电源高频变压器）。</div></div><div class="step-item"><div><strong>② 整流</strong>：桥式整流把交流变脉动直流（<a href="#" onclick="navigateTo('ana-02');return false;" style="color:var(--primary)">整流滤波</a>）。</div></div><div class="step-item"><div><strong>③ 滤波</strong>：大电容平滑脉动，得到带纹波的直流。</div></div><div class="step-item"><div><strong>④ 稳压</strong>：稳压管/线性稳压器（LDO）/开关电源（SMPS）输出稳定直流。</div></div></div>

        <h4 class="font-medium mt-6 mb-2">线性稳压器（LDO）</h4>
        <div class="formula-block">LDO 工作原理：调整管工作在线性区，通过负反馈稳定输出<br>输出电压：$V_o = V_{ref} \\cdot (1 + \\frac{R_1}{R_2})$<br>效率：$\\eta = \\frac{V_o}{V_i} \\times 100\\%$（压差越大效率越低）<div class="text-sm text-gray-500 mt-2">压差 $V_i - V_o$ 必须大于最小压差 $V_{DO}$（典型 0.3~1V）</div></div>

        <h4 class="font-medium mt-6 mb-2">开关电源（SMPS）</h4>
        <div class="formula-block">开关电源工作原理：调整管工作在开关状态，通过 PWM 控制占空比<br>降压型（Buck）：$V_o = D \\cdot V_i$（$D$ 为占空比）<br>升压型（Boost）：$V_o = \\frac{V_i}{1-D}$<div class="text-sm text-gray-500 mt-2">效率可达 85~95%，但有开关纹波（需 LC 滤波）</div></div>

        <h4 class="font-medium mt-6 mb-2">LDO vs SMPS 对比</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>特性</th><th>LDO 线性稳压</th><th>SMPS 开关电源</th></tr></thead><tbody><tr><td class="font-medium">效率</td><td>低（30~70%）</td><td>高（85~95%）</td></tr><tr><td class="font-medium">纹波</td><td>极低（μV 级）</td><td>较高（mV 级）</td></tr><tr><td class="font-medium">噪声</td><td>低</td><td>高（开关噪声）</td></tr><tr><td class="font-medium">复杂度</td><td>简单</td><td>复杂（需电感）</td></tr><tr><td class="font-medium">成本</td><td>低</td><td>中</td></tr><tr><td class="font-medium">应用</td><td>模拟电路、射频</td><td>数字电路、大功率</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">实例计算：LDO 散热</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">已知 LDO：$V_i=12V$，$V_o=5V$，$I_L=500mA$。求功耗和是否需要散热器。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：求功耗</strong>。$P_{diss} = (V_i - V_o) \\cdot I_L = (12-5) \\times 0.5 = 3.5W$</div></div><div class="step-item"><div><strong>第二步：求温升</strong>。$\\Delta T = P_{diss} \\times R_{\\theta JA}$，TO-220 封装 $R_{\\theta JA} \\approx 50°C/W$，$\\Delta T = 3.5 \\times 50 = 175°C$</div></div><div class="step-item"><div><strong>第三步：判断</strong>。环境温度 $T_A=25°C$，结温 $T_J=25+175=200°C$，超过典型限制 125°C。</div></div><div class="step-item"><div><strong>第四步：解决</strong>。需加散热器（$R_{\\theta SA} < 20°C/W$），或降低输入电压、减小负载电流。</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>电源选型口诀</strong>：小电流、低噪声选 LDO；大电流、高效率选开关电源；射频/模拟电路必须用 LDO（避免开关噪声干扰）。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>LDO 的散热问题</strong>：LDO 效率低，多余功率以热量形式耗散。$P_{diss} = (V_i - V_o) \\cdot I_L$。大电流时必须加散热片。例如：$V_i=12V$，$V_o=5V$，$I_L=1A$，$P_{diss}=7W$，需要散热器。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>常用稳压芯片</strong>：LDO（78xx 系列、LM1117、AMS1117）、开关电源（LM2596、MP1584）。选型时注意：输出电压、最大电流、压差、效率、纹波、封装。</div></div>
      ` },
      { id: 'ana-14', title: '振荡电路', desc: 'RC 文氏桥、LC、晶体振荡器', icon: '📡', tags: ['高频'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">振荡电路：自激产生周期信号</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">振荡器不需要外部输入，自激产生周期信号（正弦波、方波）。它是时钟、载波、信号源的核心。振荡电路建立在<a href="#" onclick="navigateTo('circ-08');return false;" style="color:var(--primary)">谐振电路</a>和<a href="#" onclick="navigateTo('ana-08');return false;" style="color:var(--primary)">正反馈</a>基础上。</p>

        <h4 class="font-medium mt-6 mb-2">巴克豪森判据（振荡条件）</h4>
        <div class="formula-block"><strong>振荡的两个必要条件</strong>：<br>① 相位条件：环路相移 $\\angle A\\beta = 2n\\pi$（正反馈，$n$ 为整数）<br>② 幅度条件：环路增益 $|A\\beta| \\ge 1$（起振时 >1，稳态 =1）<div class="text-sm text-gray-500 mt-2">$A$ 为放大器增益，$\\beta$ 为反馈系数，必须同时满足两个条件才能振荡</div></div>

        <h4 class="font-medium mt-6 mb-2">三种振荡器对比</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>类型</th><th>选频网络</th><th>频率范围</th><th>频率稳定性</th><th>应用</th></tr></thead><tbody><tr><td class="font-medium">RC 文氏桥</td><td>RC 串并联</td><td>1Hz ~ 1MHz</td><td>一般</td><td>音频信号源</td></tr><tr><td class="font-medium">LC 振荡器</td><td>LC 谐振回路</td><td>100kHz ~ 1GHz</td><td>中等</td><td>射频载波</td></tr><tr><td class="font-medium">晶体振荡器</td><td>石英晶体</td><td>固定频率</td><td>极高</td><td>MCU 时钟、通信基准</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">RC 文氏桥振荡器</h4>
        <div class="formula-block">RC 串并联选频网络：<br>谐振频率：$f_0 = \\frac{1}{2\\pi RC}$<br>谐振时反馈系数：$\\beta = \\frac{1}{3}$（相移为零）<br>起振条件：$A \\ge 3$（放大器增益至少 3 倍）<div class="text-sm text-gray-500 mt-2">文氏桥振荡器波形好、频率可调，是低频信号发生器的首选</div></div>

        <h4 class="font-medium mt-6 mb-2">LC 振荡器</h4>
        <div class="formula-block">考毕兹振荡器（电容三点式）：<br>振荡频率：$f_0 = \\frac{1}{2\\pi\\sqrt{L \\cdot \\frac{C_1 C_2}{C_1+C_2}}}$<br>反馈系数：$\\beta = \\frac{C_1}{C_2}$<div class="text-sm text-gray-500 mt-2">LC 振荡器频率高（MHz 级），但稳定性一般，需选频网络抑制谐波</div></div>

        <h4 class="font-medium mt-6 mb-2">晶体振荡器</h4>
        <div class="formula-block">石英晶体等效电路：<br>串联谐振频率：$f_s = \\frac{1}{2\\pi\\sqrt{L_q C_q}}$<br>并联谐振频率：$f_p = f_s\\sqrt{1+\\frac{C_q}{C_0}}$<br>Q 值可达 $10^4 \\sim 10^6$（远高于 LC 振荡器）<div class="text-sm text-gray-500 mt-2">晶体振荡器频率稳定性极高（$10^{-6}$~$10^{-9}$），是所有数字系统的时钟基准</div></div>

        <h4 class="font-medium mt-6 mb-2">实例计算：文氏桥振荡器</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">设计一个 1kHz 的文氏桥振荡器，选 $R=10k\\Omega$。求电容 C 和放大器增益要求。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：求电容</strong>。$C=\\frac{1}{2\\pi f_0 R}=\\frac{1}{2\\pi \\times 10^3 \\times 10^4}=15.9nF$（选 16nF 标准值）</div></div><div class="step-item"><div><strong>第二步：求起振条件</strong>。$A \\ge 3$，选 $A=3.1$（略大于 3 保证起振）</div></div><div class="step-item"><div><strong>第三步：设计放大器</strong>。同相放大器 $A=1+\\frac{R_f}{R_g}=3.1$，选 $R_g=10k\\Omega$，$R_f=21k\\Omega$</div></div><div class="step-item"><div><strong>第四步：稳幅措施</strong>。实际电路需加非线性稳幅（如二极管限幅），防止增益过大导致波形失真。</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>石英晶体的压电效应</strong>：石英晶体在电场下产生机械形变（压电效应），等效为高 Q 值谐振回路（Q 可达 10⁴~10⁶）。所以晶体振荡器频率稳定性极高（10⁻⁶~10⁻⁹），是所有 MCU 时钟、通信系统载波的基准。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>起振与稳幅</strong>：起振时 $|A\\beta|>1$，振幅逐渐增大；稳态时 $|A\\beta|=1$，振幅恒定。实际电路需加稳幅措施（如热敏电阻、二极管限幅、AGC），防止增益过大导致波形失真。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>与<a href="#" onclick="navigateTo('ana-10');return false;" style="color:var(--primary)">运放非线性应用</a>的联系</strong>：方波/三角波发生器也是振荡器，但输出非正弦。正弦波振荡器需要选频网络（RC/LC/晶体）来保证单一频率振荡。</div></div>
      ` },
    ]
  },

  // ========== 数字电路 ==========
  'digital-circuit': {
    title: '数字电路',
    subtitle: '逻辑代数、组合/时序电路、卡诺图、HDL，应试与工程并重',
    icon: '🟡',
    sections: [
      { id: 'dig-01', title: '数制与编码', desc: '二进制/BCD/格雷码/原码补码', icon: '0️⃣', tags: ['基础'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">数制与编码：数字世界的语言</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">数字电路用二进制处理信息。掌握各数制转换、有符号数表示（原码/反码/补码）、BCD 码和格雷码，是理解数字系统和计算机运算的基础。数制编码是<a href="#" onclick="navigateTo('dig-02');return false;" style="color:var(--primary)">逻辑代数</a>和<a href="#" onclick="navigateTo('dig-03');return false;" style="color:var(--primary)">组合逻辑电路</a>的基础。</p>

        <h4 class="font-medium mt-6 mb-2">常用数制</h4>
        <div class="formula-block">四种常用数制：<br>二进制（基 2）：0, 1（数字电路的基础）<br>八进制（基 8）：0~7（3 位二进制一组）<br>十进制（基 10）：0~9（人类习惯）<br>十六进制（基 16）：0~9, A~F（4 位二进制一组）<div class="text-sm text-gray-500 mt-2">数字电路内部用二进制，但显示和编程常用十六进制</div></div>

        <h4 class="font-medium mt-6 mb-2">数制转换方法</h4>
        <div class="step-list"><div class="step-item"><div><strong>任意进制→十进制</strong>：按权展开求和。$(1011)_2 = 1\\times2^3+0\\times2^2+1\\times2^1+1\\times2^0 = (11)_{10}$</div></div><div class="step-item"><div><strong>十进制→二进制</strong>：整数部分除 2 取余（从下往上），小数部分乘 2 取整（从上往下）。</div></div><div class="step-item"><div><strong>二进制↔八进制</strong>：每 3 位二进制对应 1 位八进制。</div></div><div class="step-item"><div><strong>二进制↔十六进制</strong>：每 4 位二进制对应 1 位十六进制。</div></div></div>

        <h4 class="font-medium mt-6 mb-2">有符号数表示</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>表示法</th><th>正数</th><th>负数</th><th>范围（8 位）</th><th>特点</th></tr></thead><tbody><tr><td class="font-medium">原码</td><td>符号位 0 + 绝对值</td><td>符号位 1 + 绝对值</td><td>-127 ~ +127</td><td>直观，但运算复杂</td></tr><tr><td class="font-medium">反码</td><td>同原码</td><td>符号位不变，其余取反</td><td>-127 ~ +127</td><td>过渡表示</td></tr><tr><td class="font-medium">补码</td><td>同原码</td><td>反码 + 1</td><td>-128 ~ +127</td><td>统一加减法（计算机必用）</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">常用编码</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>编码</th><th>规则</th><th>用途</th><th>示例（十进制 9）</th></tr></thead><tbody><tr><td class="font-medium">8421 BCD</td><td>每位十进制用 4 位二进制</td><td>显示（数码管）</td><td>1001</td></tr><tr><td class="font-medium">格雷码</td><td>相邻数只有 1 位不同</td><td>防错（旋转编码器）</td><td>1101</td></tr><tr><td class="font-medium">余 3 码</td><td>8421 BCD + 3</td><td>运算方便</td><td>1100</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">实例计算：补码运算</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">用 8 位补码计算 $15 - 27 = ?$</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：转补码</strong>。$+15 = 00001111$，$+27 = 00011011$</div></div><div class="step-item"><div><strong>第二步：求 -27 的补码</strong>。$27$ 的原码 $= 00011011$，取反 $= 11100100$，加 1 $= 11100101$</div></div><div class="step-item"><div><strong>第三步：补码相加</strong>。$00001111 + 11100101 = 11110100$</div></div><div class="step-item"><div><strong>第四步：判断结果</strong>。最高位为 1（负数），取反加 1 得原码 $= 00001100 = -12$。验证：$15-27=-12$ ✓</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>补码的意义</strong>：用补码表示负数，减法可转成加法（$A-B=A+(-B)_{补}$），运算器只需加法器。这就是计算机内部用补码的原因。n 位补码范围 $-2^{n-1}$ 到 $2^{n-1}-1$。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>溢出判断</strong>：两个正数相加结果为负，或两个负数相加结果为正，说明溢出。判断方法：最高位进位 $\\oplus$ 次高位进位 $= 1$ 则溢出。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>与<a href="#" onclick="navigateTo('dig-05');return false;" style="color:var(--primary)">加法器</a>的联系</strong>：补码运算的硬件实现就是<a href="#" onclick="navigateTo('dig-05');return false;" style="color:var(--primary)">加法器</a>——减法通过求补后相加实现。理解数制编码有助于理解计算机运算原理。</div></div>
      ` },
      { id: 'dig-02', title: '逻辑代数基础', desc: '公式法、卡诺图化简', icon: '∧∨', tags: ['核心'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">逻辑代数与卡诺图化简</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">逻辑代数是分析和设计数字电路的数学工具。卡诺图是化简逻辑函数最直观的方法，能把复杂的布尔表达式化为最简"与或式"，减少门电路数量。逻辑代数是<a href="#" onclick="navigateTo('dig-03');return false;" style="color:var(--primary)">组合逻辑电路</a>设计的基础。</p>

        <h4 class="font-medium mt-6 mb-2">基本逻辑运算</h4>
        <div class="formula-block">三种基本运算：<br>与（AND）：$Y = A \\cdot B$（全 1 出 1）<br>或（OR）：$Y = A + B$（有 1 出 1）<br>非（NOT）：$Y = \\bar{A}$（取反）<div class="text-sm text-gray-500 mt-2">任何逻辑函数都可用这三种运算组合实现</div></div>

        <h4 class="font-medium mt-6 mb-2">基本定律与公式</h4>
        <div class="formula-block">重要定律：<br>交换律：$A+B=B+A$，$AB=BA$<br>结合律：$(A+B)+C=A+(B+C)$<br>分配律：$A(B+C)=AB+AC$<br>德摩根定律：$\\overline{AB}=\\bar{A}+\\bar{B}$，$\\overline{A+B}=\\bar{A}\\bar{B}$<div class="text-sm text-gray-500 mt-2">德摩根定律是化简的关键——可将与或式和或与式互换</div></div>

        <h4 class="font-medium mt-6 mb-2">常用恒等式</h4>
        <div class="formula-block">化简常用：<br>$A+AB=A$（吸收律）<br>$A+\\bar{A}B=A+B$（冗余律）<br>$AB+\\bar{A}C+BC=AB+\\bar{A}C$（消去冗余项）<br>$A \\oplus B = \\bar{A}B + A\\bar{B}$（异或）</div>

        <h4 class="font-medium mt-6 mb-2">卡诺图化简步骤</h4>
        <div class="step-list"><div class="step-item"><div><strong>第一步：填卡诺图</strong>。根据真值表或表达式，在对应格填 1（或 0、X）。</div></div><div class="step-item"><div><strong>第二步：画圈</strong>。圈 2 的幂次个相邻 1（1/2/4/8），圈越大越好。</div></div><div class="step-item"><div><strong>第三步：写乘积项</strong>。每个圈对应一个与项，圈内不变的变量保留（1 为原变量，0 为反变量）。</div></div><div class="step-item"><div><strong>第四步：求和</strong>。所有乘积项相或，得到最简与或式。</div></div></div>

        <h4 class="font-medium mt-6 mb-2">卡诺图画圈原则</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>原则</th><th>说明</th><th>示例</th></tr></thead><tbody><tr><td class="font-medium">圈尽量大</td><td>2 的幂次（1/2/4/8）</td><td>8 格圈消 3 变量</td></tr><tr><td class="font-medium">圈尽量少</td><td>覆盖所有 1 的最少圈数</td><td>最简表达式</td></tr><tr><td class="font-medium">可重叠</td><td>同一个 1 可被多个圈覆盖</td><td>不违反规则</td></tr><tr><td class="font-medium">必须包含</td><td>每个 1 至少被圈一次</td><td>保证覆盖</td></tr><tr><td class="font-medium">边缘相邻</td><td>左右边缘、上下边缘相邻</td><td>卡诺图是环形结构</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">实例化简：4 变量卡诺图</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">化简 $F(A,B,C,D) = \\sum m(0,1,2,4,5,6,8,9,12,13,14)$</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：填图</strong>。在 4×4 卡诺图中，对应最小项格填 1。</div></div><div class="step-item"><div><strong>第二步：画圈</strong>。圈 1：$m(0,1,4,5)$（消 AB）；圈 2：$m(0,2,4,6)$（消 AD）；圈 3：$m(8,12)$（消 BD）；圈 4：$m(0,8)$（消 CD）。</div></div><div class="step-item"><div><strong>第三步：写表达式</strong>。$F = \\bar{A}\\bar{C} + \\bar{A}\\bar{D} + B\\bar{D} + \\bar{B}\\bar{C}\\bar{D}$</div></div><div class="step-item"><div><strong>第四步：验证</strong>。检查所有最小项都被覆盖，没有多余圈。</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>无关项（X）的利用</strong>：无关项可当 0 或 1，灵活使用可使圈更大、表达式更简。在真值表中用 X 表示不会出现的输入组合。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>最简的标准</strong>：最简与或式 = 乘积项最少 + 每个乘积项变量最少。卡诺图保证得到最简结果，但变量超过 5 个时卡诺图变复杂，宜用公式法或计算机辅助。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>与<a href="#" onclick="navigateTo('dig-04');return false;" style="color:var(--primary)">译码器</a>的联系</strong>：卡诺图化简的结果直接对应门电路实现。最小项可用<a href="#" onclick="navigateTo('dig-04');return false;" style="color:var(--primary)">译码器</a>+或门实现，这是组合逻辑设计的两种方法之一。</div></div>
      ` },
      { id: 'dig-03', title: '组合逻辑电路', desc: '分析步骤、设计方法', icon: '🔀', tags: ['核心'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">组合逻辑：无记忆的逻辑电路</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">组合逻辑电路的输出仅取决于当前输入（无记忆）。分析是"从电路到功能"，设计是"从功能到电路"。掌握这两套流程，就能处理任意组合逻辑问题。组合逻辑建立在<a href="#" onclick="navigateTo('dig-02');return false;" style="color:var(--primary)">逻辑代数</a>基础上，是<a href="#" onclick="navigateTo('dig-04');return false;" style="color:var(--primary)">编码器/译码器/选择器</a>等中规模芯片的理论基础。</p>

        <h4 class="font-medium mt-6 mb-2">组合逻辑的定义</h4>
        <div class="formula-block">组合逻辑电路特征：<br>输出 $Y_i = f(X_1, X_2, \\cdots, X_n)$（仅取决于当前输入）<br>无记忆（无反馈、无存储元件）<br>任意时刻输出可由输入唯一确定<div class="text-sm text-gray-500 mt-2">与时序逻辑的区别：时序逻辑有记忆，输出还取决于之前的状态</div></div>

        <h4 class="font-medium mt-6 mb-2">分析步骤（从电路到功能）</h4>
        <div class="step-list"><div class="step-item"><div><strong>第一步：写表达式</strong>。从输入到输出，逐级写各门电路的逻辑表达式。</div></div><div class="step-item"><div><strong>第二步：化简</strong>。用<a href="#" onclick="navigateTo('dig-02');return false;" style="color:var(--primary)">公式法或卡诺图</a>化简表达式。</div></div><div class="step-item"><div><strong>第三步：列真值表</strong>。根据化简后的表达式，列出所有输入组合对应的输出。</div></div><div class="step-item"><div><strong>第四步：描述功能</strong>。用文字描述电路的功能（如"判奇电路"、"多数表决器"）。</div></div></div>

        <h4 class="font-medium mt-6 mb-2">设计步骤（从功能到电路）</h4>
        <div class="step-list"><div class="step-item"><div><strong>第一步：逻辑抽象</strong>。确定输入变量和输出函数，明确功能要求。</div></div><div class="step-item"><div><strong>第二步：列真值表</strong>。列出所有输入组合对应的输出值。</div></div><div class="step-item"><div><strong>第三步：写表达式</strong>。从真值表写最小项表达式，用卡诺图化简。</div></div><div class="step-item"><div><strong>第四步：画逻辑图</strong>。根据化简后的表达式，用门电路实现。</div></div></div>

        <h4 class="font-medium mt-6 mb-2">常见组合逻辑电路</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>电路</th><th>功能</th><th>输入</th><th>输出</th><th>应用</th></tr></thead><tbody><tr><td class="font-medium">加法器</td><td>二进制加法</td><td>A, B, $C_{in}$</td><td>S, $C_{out}$</td><td>算术运算</td></tr><tr><td class="font-medium">比较器</td><td>比较大小</td><td>A, B</td><td>A>B, A=B, A<B</td><td>判断</td></tr><tr><td class="font-medium">编码器</td><td>输入优先编码</td><td>$I_0$~$I_7$</td><td>$Y_2Y_1Y_0$</td><td>键盘</td></tr><tr><td class="font-medium">译码器</td><td>地址译码</td><td>$A_2A_1A_0$</td><td>$Y_0$~$Y_7$</td><td>存储器选址</td></tr><tr><td class="font-medium">选择器</td><td>多路选择</td><td>$D_0$~$D_7$, S</td><td>Y</td><td>数据切换</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">实例设计：三人表决器</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">设计三人表决器：3 人投票，多数同意（≥2 票）则通过。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：逻辑抽象</strong>。输入 A、B、C（1=同意），输出 Y（1=通过）。</div></div><div class="step-item"><div><strong>第二步：列真值表</strong>。$Y=1$ 当 ABC=011,101,110,111（4 个最小项）。</div></div><div class="step-item"><div><strong>第三步：写表达式</strong>。$Y=\\bar{A}BC+A\\bar{B}C+AB\\bar{C}+ABC=AB+AC+BC$（卡诺图化简）。</div></div><div class="step-item"><div><strong>第四步：画逻辑图</strong>。3 个与门 + 1 个或门，或用与非门实现（$Y=\\overline{\\overline{AB} \\cdot \\overline{AC} \\cdot \\overline{BC}}$）。</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>与非门万能</strong>：任何组合逻辑都可用与非门实现——先写与或式，再用德摩根定律转为与非-与非形式。实际芯片（如 74LS00 四 2 输入与非门）就是基于这个原理。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>竞争冒险</strong>：组合逻辑中，由于门电路延迟，输入变化时输出可能出现短暂毛刺。消除方法：①加冗余项；②加滤波电容；③用<a href="#" onclick="navigateTo('dig-06');return false;" style="color:var(--primary)">选通脉冲</a>。详见<a href="#" onclick="navigateTo('dig-06');return false;" style="color:var(--primary)">竞争冒险</a>。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>与<a href="#" onclick="navigateTo('dig-07');return false;" style="color:var(--primary)">时序逻辑</a>的区别</strong>：组合逻辑无记忆，输出仅取决于当前输入；时序逻辑有记忆（触发器），输出还取决于之前的状态。组合逻辑是时序逻辑的子模块。</div></div>
      ` },
      { id: 'dig-04', title: '编码器/译码器/选择器', desc: '常用组合芯片及其应用', icon: '▦', tags: ['高频'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">中规模组合逻辑芯片</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">编码器、译码器、数据选择器是集成化的<a href="#" onclick="navigateTo('dig-03');return false;" style="color:var(--primary)">组合逻辑</a>器件，用少量芯片实现复杂功能。译码器实现地址译码，选择器实现多路复用，是数字系统的核心元件。</p>

        <h4 class="font-medium mt-6 mb-2">四种常用芯片</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>器件</th><th>功能</th><th>典型芯片</th><th>应用</th></tr></thead><tbody><tr><td class="font-medium">编码器</td><td>多输入→二进制编码</td><td>74LS148（8-3 线优先）</td><td>键盘、中断请求</td></tr><tr><td class="font-medium">译码器</td><td>二进制→多输出（最小项）</td><td>74LS138（3-8 线）</td><td>地址译码、实现逻辑函数</td></tr><tr><td class="font-medium">数据选择器</td><td>多路输入→1 路输出</td><td>74LS151（8 选 1）</td><td>数据切换、实现逻辑函数</td></tr><tr><td class="font-medium">数据分配器</td><td>1 路输入→多路输出</td><td>译码器反用</td><td>数据分发</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">译码器实现逻辑函数</h4>
        <div class="formula-block">译码器 + 或门 = 任意组合逻辑：<br>$F = \\sum m(i)$（最小项之和）<br>3-8 译码器（74LS138）可实现任意 3 变量函数<div class="text-sm text-gray-500 mt-2">译码器输出 $Y_i = \\bar{m_i}$（低有效），配合与非门实现</div></div>

        <h4 class="font-medium mt-6 mb-2">数据选择器实现逻辑函数</h4>
        <div class="step-list"><div class="step-item"><div><strong>第一步：确定地址变量</strong>。n 选 1 选择器有 $\\log_2 n$ 个地址线，选作函数变量。</div></div><div class="step-item"><div><strong>第二步：确定数据端</strong>。数据端 $D_i$ 接 0、1、剩余变量或其反。</div></div><div class="step-item"><div><strong>第三步：列真值表</strong>。根据函数值确定每个 $D_i$ 的接法。</div></div></div>

        <h4 class="font-medium mt-6 mb-2">实例：用译码器实现全加器</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">用 74LS138（3-8 译码器）实现全加器：$S=\\sum m(1,2,4,7)$，$C_{out}=\\sum m(3,5,6,7)$。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：接线</strong>。A、B、$C_{in}$ 接译码器地址 $A_2$、$A_1$、$A_0$。</div></div><div class="step-item"><div><strong>第二步：求和输出</strong>。$S = \\overline{Y_1 \\cdot Y_2 \\cdot Y_4 \\cdot Y_7}$（与非门）</div></div><div class="step-item"><div><strong>第三步：进位输出</strong>。$C_{out} = \\overline{Y_3 \\cdot Y_5 \\cdot Y_6 \\cdot Y_7}$（与非门）</div></div><div class="step-item"><div><strong>第四步：验证</strong>。检查所有 8 种输入组合，输出与真值表一致。</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>译码器实现任意组合逻辑</strong>：译码器输出是最小项，配合或门/与非门可实现任意逻辑函数。3-8 译码器可实现任意 3 变量函数，4-16 译码器可实现任意 4 变量函数。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>低有效输出</strong>：74LS138 输出低有效（$Y_i = \\bar{m_i}$），所以用与非门（不是或门）来实现最小项之和。这是初学者常犯的错误。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>与<a href="#" onclick="navigateTo('dig-09');return false;" style="color:var(--primary)">计数器</a>的联系</strong>：译码器常与计数器配合——计数器产生地址，译码器产生时序控制信号（如 LED 扫描、数码管动态显示）。</div></div>
      ` },
      { id: 'dig-05', title: '加法器与比较器', desc: '半加/全加、数值比较', icon: '➕', tags: ['基础'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">算术运算电路</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">加法器是算术逻辑单元（ALU）的核心，是<a href="#" onclick="navigateTo('dig-01');return false;" style="color:var(--primary)">补码运算</a>的硬件实现。半加器处理两个 1 位相加，全加器考虑低位进位，多位级联构成多位加法器。数值比较器比较两数大小。</p>

        <h4 class="font-medium mt-6 mb-2">半加器与全加器</h4>
        <div class="formula-block">半加器（不考虑进位输入）：<br>$S = A \\oplus B$（和）<br>$C_{out} = AB$（进位）<br><br>全加器（考虑进位输入）：<br>$S = A \\oplus B \\oplus C_{in}$（和）<br>$C_{out} = AB + BC_{in} + AC_{in}$（进位）<div class="text-sm text-gray-500 mt-2">全加器 = 两个半加器 + 一个或门</div></div>

        <h4 class="font-medium mt-6 mb-2">多位加法器</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>类型</th><th>进位方式</th><th>速度</th><th>硬件复杂度</th><th>典型芯片</th></tr></thead><tbody><tr><td class="font-medium">串行进位</td><td>逐级传递</td><td>慢（$O(n)$）</td><td>简单</td><td>74LS83</td></tr><tr><td class="font-medium">超前进位</td><td>并行计算</td><td>快（$O(\\log n)$）</td><td>复杂</td><td>74LS283</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">超前进位原理</h4>
        <div class="formula-block">超前进位生成信号：<br>生成 $G_i = A_i B_i$（当 $A_i=B_i=1$ 时必产生进位）<br>传递 $P_i = A_i \\oplus B_i$（当 $A_i \\ne B_i$ 时传递进位）<br>$C_{i+1} = G_i + P_i C_i$（递推公式）<div class="text-sm text-gray-500 mt-2">所有进位可同时计算，无需等待逐级传递</div></div>

        <h4 class="font-medium mt-6 mb-2">数值比较器</h4>
        <div class="formula-block">1 位比较器：<br>$A>B$：$Y_1 = A\\bar{B}$<br>$A=B$：$Y_2 = \\overline{A \\oplus B}$（同或）<br>$A<B$：$Y_3 = \\bar{A}B$<div class="text-sm text-gray-500 mt-2">多位比较器从高位开始比较，高位相等时才比较低位</div></div>

        <h4 class="font-medium mt-6 mb-2">实例设计：4 位加法器</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">用 74LS283（4 位超前进位加法器）计算 $1011 + 0110 = ?$</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：接线</strong>。$A_3A_2A_1A_0 = 1011$，$B_3B_2B_1B_0 = 0110$，$C_0 = 0$</div></div><div class="step-item"><div><strong>第二步：逐位计算</strong>。$S_0=1\\oplus0\\oplus0=1$，$S_1=1\\oplus1\\oplus0=0$，$C_1=1$；$S_2=0\\oplus1\\oplus1=0$，$C_2=1$；$S_3=1\\oplus0\\oplus1=0$，$C_3=1$</div></div><div class="step-item"><div><strong>第三步：结果</strong>。$C_3S_3S_2S_1S_0 = 10001 = (17)_{10}$</div></div><div class="step-item"><div><strong>第四步：验证</strong>。$(1011)_2 = 11$，$(0110)_2 = 6$，$11+6=17$ ✓</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>加法器实现减法</strong>：减法通过补码加法实现——$A-B = A + \\bar{B} + 1$。硬件上，将 B 取反（异或门），进位置 1，用加法器求和。这就是<a href="#" onclick="navigateTo('dig-01');return false;" style="color:var(--primary)">补码</a>的工程实现。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>溢出检测</strong>：有符号加法中，两个正数相加得负数（或反之）表示溢出。检测方法：$V = C_{n-1} \\oplus C_{n-2}$（最高位进位与次高位进位异或）。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>与 ALU 的联系</strong>：加法器是 ALU（算术逻辑单元）的核心——ALU 可执行加、减、与、或、异或、比较等运算，是 CPU 的基础部件。理解加法器有助于理解计算机运算原理。</div></div>
      ` },
      { id: 'dig-06', title: '竞争冒险', desc: '产生原因、消除方法', icon: '⚠', tags: ['基础'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">竞争冒险：信号到达时间差导致的毛刺</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">信号经不同路径到达门电路输入端有时间差（竞争），可能导致输出瞬间出现不该有的脉冲（冒险/毛刺）。虽然<a href="#" onclick="navigateTo('dig-03');return false;" style="color:var(--primary)">组合逻辑</a>最终输出正确，但毛刺可能误触发后续<a href="#" onclick="navigateTo('dig-07');return false;" style="color:var(--primary)">时序电路</a>。</p>

        <h4 class="font-medium mt-6 mb-2">竞争与冒险的定义</h4>
        <div class="formula-block">竞争：信号经不同路径到达同一门电路输入端有时间差<br>冒险：竞争导致输出出现不该有的毛刺脉冲<br>静态冒险：输入变化一次，输出应不变但出现毛刺<br>动态冒险：输入变化一次，输出应变化一次但出现多次<div class="text-sm text-gray-500 mt-2">冒险是组合逻辑电路的固有问题，必须妥善处理</div></div>

        <h4 class="font-medium mt-6 mb-2">冒险的判别</h4>
        <div class="step-list"><div class="step-item"><div><strong>代数法</strong>：若表达式在某种输入取值下可化成 $Y = A + \\bar{A}$（或门）或 $Y = A \\cdot \\bar{A}$（与门）形式，则可能存在冒险。</div></div><div class="step-item"><div><strong>卡诺图法</strong>：若两个质蕴含项圈相邻但不重叠（有缝隙），则可能存在冒险。加冗余圈覆盖缝隙可消除。</div></div></div>

        <h4 class="font-medium mt-6 mb-2">消除冒险的方法</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>方法</th><th>原理</th><th>优缺点</th></tr></thead><tbody><tr><td class="font-medium">加冗余项</td><td>卡诺图加冗余圈覆盖缝隙</td><td>简单，但增加门电路</td></tr><tr><td class="font-medium">选通脉冲</td><td>等信号稳定后才采样输出</td><td>有效，但增加延迟</td></tr><tr><td class="font-medium">触发器同步</td><td>时钟边沿采样，毛刺被滤除</td><td>最可靠，现代设计首选</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">实例分析：$F = AB + \\bar{A}C$</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">当 $B=C=1$ 时，$F = A + \\bar{A}$，存在冒险。</p>
        <div class="step-list"><div class="step-item"><div><strong>第一步：识别冒险</strong>。$B=C=1$ 时，$F = A + \\bar{A}$，A 变化时可能出现毛刺。</div></div><div class="step-item"><div><strong>第二步：加冗余项</strong>。增加冗余项 $BC$，$F = AB + \\bar{A}C + BC$。</div></div><div class="step-item"><div><strong>第三步：验证</strong>。$B=C=1$ 时，$F = A + \\bar{A} + 1 = 1$（恒为 1），无冒险。</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>同步设计消除冒险</strong>：现代数字系统几乎都用同步设计——所有触发器共用时钟，只在时钟边沿采样输入。毛刺在时钟边沿之间出现，被触发器自动滤除。这是消除冒险最可靠的方法。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>判别与消除</strong>：代数法判别——若表达式在某种取值下可化成 $A+\\bar{A}$ 或 $A\\cdot\\bar{A}$ 形式，则可能冒险。消除方法：①增加冗余项（卡诺图加冗余圈）；②引入选通脉冲（等信号稳定后采样）；③用 <a href="#" onclick="navigateTo('dig-07');return false;" style="color:var(--primary)">触发器</a> 同步（时钟边沿采样消除毛刺）。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>与<a href="#" onclick="navigateTo('dig-07');return false;" style="color:var(--primary)">时序电路</a>的联系</strong>：冒险问题促使我们使用同步时序设计——用触发器在时钟边沿采样，自动滤除毛刺。这是现代数字系统设计的基本原则。</div></div>
      ` },
      { id: 'dig-07', title: '锁存器与触发器', desc: 'RS/D/JK/T 触发器', icon: '🔒', tags: ['核心'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">触发器：数字系统的记忆单元</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">触发器是存储 1 位二进制信息的基本单元，是<a href="#" onclick="navigateTo('dig-08');return false;" style="color:var(--primary)">时序逻辑电路</a>的基础。锁存器电平触发（透明），触发器边沿触发（更可靠）。掌握各类触发器的功能表和激励表是分析时序电路的前提。触发器解决了<a href="#" onclick="navigateTo('dig-06');return false;" style="color:var(--primary)">竞争冒险</a>中的毛刺问题。</p>

        <h4 class="font-medium mt-6 mb-2">锁存器 vs 触发器</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>类型</th><th>触发方式</th><th>特点</th><th>应用</th></tr></thead><tbody><tr><td class="font-medium">锁存器</td><td>电平触发</td><td>CLK 有效期间输出跟随输入（透明）</td><td>数据暂存</td></tr><tr><td class="font-medium">触发器</td><td>边沿触发</td><td>只在 CLK 边沿采样，其余保持</td><td>同步时序设计（首选）</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">四种触发器对比</h4>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>触发器</th><th>功能</th><th>特性方程</th><th>应用</th></tr></thead><tbody><tr><td class="font-medium">RS 触发器</td><td>置位/复位/保持</td><td>$Q^{n+1}=S+\\bar{R}Q^n$</td><td>基本存储（有禁用态）</td></tr><tr><td class="font-medium">D 触发器</td><td>跟随 D（延迟）</td><td>$Q^{n+1}=D$</td><td>寄存器、移位寄存器</td></tr><tr><td class="font-medium">JK 触发器</td><td>保持/置0/置1/翻转</td><td>$Q^{n+1}=J\\bar{Q^n}+\\bar{K}Q^n$</td><td>计数器（功能最全）</td></tr><tr><td class="font-medium">T 触发器</td><td>翻转/保持</td><td>$Q^{n+1}=T\\oplus Q^n$</td><td>分频器、计数器</td></tr></tbody></table></div>

        <h4 class="font-medium mt-6 mb-2">触发器的功能表</h4>
        <div class="formula-block">JK 触发器功能表（上升沿触发）：<br>J=0, K=0 → 保持（$Q^{n+1}=Q^n$）<br>J=0, K=1 → 置 0（$Q^{n+1}=0$）<br>J=1, K=0 → 置 1（$Q^{n+1}=1$）<br>J=1, K=1 → 翻转（$Q^{n+1}=\\bar{Q^n}$）<div class="text-sm text-gray-500 mt-2">JK 触发器是功能最全的触发器，没有禁用态</div></div>

        <h4 class="font-medium mt-6 mb-2">触发器之间的转换</h4>
        <div class="step-list"><div class="step-item"><div><strong>JK→D</strong>。接法：$J=D$，$K=\\bar{D}$。验证：$Q^{n+1}=D\\bar{Q^n}+DQ^n=D$ ✓</div></div><div class="step-item"><div><strong>JK→T</strong>。接法：$J=T$，$K=T$。验证：$Q^{n+1}=T\\bar{Q^n}+\\bar{T}Q^n=T\\oplus Q^n$ ✓</div></div><div class="step-item"><div><strong>D→JK</strong>。接法：$D=J\\bar{Q^n}+\\bar{K}Q^n$（需组合逻辑）</div></div></div>

        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>边沿触发 vs 电平触发</strong>：锁存器（电平触发）在时钟高电平期间输出跟随输入变化（透明），可能"穿通"。触发器（边沿触发）只在时钟上升沿/下降沿瞬间采样输入，其余时间保持——更可靠，是同步时序设计的首选。</div></div>

        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>建立时间和保持时间</strong>：触发器要求输入信号在时钟边沿前后保持稳定——建立时间 $t_{su}$（边沿前）和保持时间 $t_h$（边沿后）。违反会导致亚稳态（输出不确定）。这是高速数字设计的关键参数。</div></div>

        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>与<a href="#" onclick="navigateTo('dig-09');return false;" style="color:var(--primary)">计数器</a>的联系</strong>：T 触发器（翻转/保持）是计数器的基本单元——每来一个时钟翻转一次，实现二分频。n 个 T 触发器级联构成 $2^n$ 进制计数器。</div></div>
      ` },
      { id: 'dig-08', title: '时序逻辑电路分析', desc: '状态方程/状态图/状态表', icon: '🔄', tags: ['核心难点'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">时序逻辑：有记忆的电路</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">时序电路的输出不仅取决于当前输入，还取决于电路当前状态（历史）。分析时序电路的三要素：驱动方程（触发器输入）、状态方程（次态）、输出方程。用状态图/状态表直观描述状态转换。</p>
        <div class="step-list"><div class="step-item"><div><strong>①写驱动方程</strong>：各触发器输入端的逻辑表达式。</div></div><div class="step-item"><div><strong>②代入特性方程得状态方程</strong>：求 $Q^{n+1}$ 与输入、现态的关系。</div></div><div class="step-item"><div><strong>③写输出方程</strong>：输出与输入、现态的关系。</div></div><div class="step-item"><div><strong>④列状态表/画状态图</strong>：穷举所有状态组合，描述状态转换关系。</div></div><div class="step-item"><div><strong>⑤描述功能</strong>：根据状态转换规律总结电路功能。</div></div></div>
        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>同步 vs 异步</strong>：同步时序电路所有触发器共享同一时钟（同时翻转），设计简单、速度快；异步时序电路各触发器时钟不同（输出互为时钟），省器件但分析复杂、易出毛刺。现代数字系统几乎都用同步设计。</div></div>
      ` },
      { id: 'dig-09', title: '计数器', desc: '异步/同步、任意进制设计', icon: '🔢', tags: ['高频'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">计数器：分频与定时的核心</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">计数器是统计时钟脉冲个数的时序电路，用于分频、定时、事件计数。用集成计数器（74LS161/160 等）加反馈可实现任意进制计数，是工程中最常用的时序器件。</p>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>类型</th><th>特点</th></tr></thead><tbody><tr><td class="font-medium">异步计数器</td><td>逐级进位（行波），结构简单但速度慢、有毛刺</td></tr><tr><td class="font-medium">同步计数器</td><td>所有触发器同时钟，速度快、无毛刺（74LS161）</td></tr><tr><td class="font-medium">加法/减法/可逆</td><td>递增/递减/可控方向</td></tr></tbody></table></div>
        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>任意进制设计（反馈法）</strong>：用 N 进制集成计数器实现 M 进制（M&lt;N）。①清零法（同步/异步复位）：计到 M 时强制清零；②置数法：计到某值时置入初值。M&gt;N 时需级联（如用两片 74LS161 级联做 60 进制秒计数器）。详见 <a href="#" onclick="navigateTo('dig-11');return false;" style="color:var(--primary)">555 定时器</a> 中的应用。</div></div>
      ` },
      { id: 'dig-10', title: '移位寄存器', desc: '移位、环形/扭环形计数器', icon: '➡➡', tags: ['基础'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">移位寄存器：串并转换的利器</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">移位寄存器在时钟驱动下逐位移存数据，可实现串行↔并行转换、延时、构成特殊计数器。是通信接口（UART/SPI）和数字信号处理的基础。</p>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>类型</th><th>功能</th></tr></thead><tbody><tr><td class="font-medium">串入串出 (SISO)</td><td>数据逐位移入移出（延时）</td></tr><tr><td class="font-medium">串入并出 (SIPO)</td><td>串行输入转并行输出（74LS164）</td></tr><tr><td class="font-medium">并入串出 (PISO)</td><td>并行输入转串行输出（74LS165）</td></tr><tr><td class="font-medium">环形计数器</td><td>首尾相接，n 个状态（移位寄存器反馈）</td></tr><tr><td class="font-medium">扭环形计数器</td><td>反相反馈，2n 个状态（约翰逊计数器）</td></tr></tbody></table></div>
      ` },
      { id: 'dig-11', title: '555 定时器', desc: '多谐/单稳/施密特', icon: '⏱', tags: ['高频'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">555 定时器：万能模拟-数字接口</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">555 定时器是经典的模拟-数字混合芯片，外接少量电阻电容可构成三种基本电路：多谐振荡器（方波）、单稳态触发器（定时脉冲）、施密特触发器（波形整形）。工程应用极广。</p>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>模式</th><th>输出</th><th>周期/脉宽</th><th>应用</th></tr></thead><tbody><tr><td class="font-medium">多谐振荡器</td><td>方波（自激）</td><td>$T=0.693(R_1+2R_2)C$</td><td>时钟、LED 闪烁</td></tr><tr><td class="font-medium">单稳态</td><td>定宽脉冲</td><td>$t_w=1.1RC$</td><td>延时、消抖</td></tr><tr><td class="font-medium">施密特</td><td>整形方波</td><td>取决于输入</td><td>波形整形、抗干扰</td></tr></tbody></table></div>
        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>555 多谐振荡器原理</strong>：内部两个比较器 + RS 触发器 + 放电管。电容经 $R_1+R_2$ 充电到 2/3Vcc（触发器置位），经 $R_2$ 放电到 1/3Vcc（触发器复位），循环产生方波。占空比由 $R_1,R_2$ 决定，频率由 RC 决定。</div></div>
      ` },
      { id: 'dig-12', title: '半导体存储器', desc: 'RAM/ROM、存储扩展', icon: '💾', tags: ['基础'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">半导体存储器</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">存储器是数字系统的"仓库"。RAM 临时存储（断电丢失），ROM 永久存储（断电保留）。理解存储器结构和字/位扩展方法，是计算机组成的基础。</p>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>类型</th><th>特性</th><th>子类</th></tr></thead><tbody><tr><td class="font-medium">RAM（随机存取）</td><td>读写、易失</td><td>SRAM（静态，快）、DRAM（动态，需刷新，密度高）</td></tr><tr><td class="font-medium">ROM（只读）</td><td>读为主、非易失</td><td>PROM/EPROM/EEPROM/Flash</td></tr></tbody></table></div>
        <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>容量扩展</strong>：①字扩展（地址不够）——多片并联，用高位地址做片选；②位扩展（数据位不够）——多片并联，地址/控制共用，数据位拼接。ROM 还可实现组合逻辑（地址做输入，数据做输出，存真值表），这是 FPGA 查找表（LUT）的原理。</div></div>
      ` },
      { id: 'dig-13', title: 'A/D 与 D/A 转换器', desc: '转换原理、参数指标', icon: '🔤', tags: ['工程'], goals: { eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">A/D 与 D/A：模拟与数字的桥梁</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">现实世界是模拟的，计算机是数字的。ADC（模数转换）把传感器模拟信号转数字，DAC（数模转换）把数字信号转模拟输出。这是所有嵌入式系统的关键接口。</p>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>指标</th><th>含义</th></tr></thead><tbody><tr><td class="font-medium">分辨率</td><td>位数 n，区分 $2^n$ 个等级</td></tr><tr><td class="font-medium">转换时间/速率</td><td>完成一次转换的时间（ADC 类型决定）</td></tr><tr><td class="font-medium">量化误差</td><td>$\\pm\\frac{1}{2}$LSB（分辨率导致）</td></tr><tr><td class="font-medium">精度</td><td>实际值与理想值偏差</td></tr></tbody></table></div>
        <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>ADC 类型选型</strong>：①逐次逼近型（SAR）——中速中精度（100kSPS~1MSPS），最常用；②并行比较型（Flash）——超快但功耗大、引脚多；③Σ-Δ 型——高精度低速度（音频、仪表）；④双积分型——低速高抗干扰（万用表）。STM32 内置的多为 SAR ADC。</div></div>
      ` },
      { id: 'dig-14', title: 'Verilog HDL 入门', desc: '可综合设计（工程方向）', icon: '⌨', tags: ['工程'], goals: { eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">Verilog HDL：用代码描述硬件</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">Verilog 是硬件描述语言（HDL），用代码描述数字电路结构和行为，经综合工具转为实际电路（FPGA/ASIC）。这是数字 IC 设计和 FPGA 开发的必备技能。</p>
        <div class="overflow-x-auto"><table class="compare-table"><thead><tr><th>建模方式</th><th>描述</th></tr></thead><tbody><tr><td class="font-medium">数据流</td><td>assign 连续赋值（组合逻辑）</td></tr><tr><td class="font-medium">行为</td><td>always 块（可描述时序/组合）</td></tr><tr><td class="font-medium">结构</td><td>例化底层模块（门级/模块级）</td></tr></tbody></table></div>
        <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>HDL ≠ 软件编程</strong>：Verilog 描述的是<strong>并行</strong>的硬件，不是顺序执行的程序。所有 assign 和 always 块同时执行（对应并行的硬件单元）。关键原则：①时序逻辑用非阻塞赋值（&lt;=），组合逻辑用阻塞赋值（=）；②避免锁存器（组合逻辑 if/case 要写全所有分支）；③时钟要单一全局时钟。</div></div>
      ` },
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

        <div class="chart-container" data-chart="step-response" data-zeta="0.5" data-omega="2" data-title="二阶系统阶跃响应"></div>
        <div class="text-xs text-center mt-1 mb-4" style="color:var(--text-secondary)">拖动滑块调节 ζ 和 ωn，观察响应曲线变化</div>

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

        <div class="chart-container" data-chart="root-locus" data-title="根轨迹 G(s)=K/[s(s+2)]"></div>
        <div class="text-xs text-center mt-1 mb-4" style="color:var(--text-secondary)">示例：G(s)=K/[s(s+2)] 的根轨迹，极点在 0 和 -2</div>

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

        <div class="chart-container" data-chart="bode-plot" data-gain="10" data-timeconst="0.1" data-title="G(s)=10/[s(0.1s+1)] 伯德图"></div>
        <div class="text-xs text-center mt-1 mb-4" style="color:var(--text-secondary)">一阶系统伯德图：幅频（上）和相频（下）</div>

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
      { id: 'ds-01', title: '绪论与复杂度', desc: '时间/空间复杂度、主定理', icon: '⏱', tags: ['基础'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">算法的灵魂：时间与空间复杂度</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          复杂度分析是评估算法好坏的统一标尺——它不依赖具体硬件，只描述"数据规模增长时，算法消耗如何增长"。掌握大 O 表示法和常见复杂度阶，是读懂任何算法、面试和考试的基础。
        </p>

        <h4 class="font-medium mt-6 mb-2">大 O 表示法（渐进上界）</h4>
        <div class="formula-block">
          $T(n) = O(f(n))$：存在常数 $c$ 和 $n_0$，当 $n > n_0$ 时 $T(n) \\le c \\cdot f(n)$
          <div class="text-sm text-gray-500 mt-2">忽略常数和低阶项，只保留增长最快的一项</div>
        </div>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>复杂度阶</th><th>名称</th><th>$n=10$ 时</th><th>$n=100$ 时</th><th>典型算法</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">$O(1)$</td><td>常数</td><td>1</td><td>1</td><td>数组下标访问</td></tr>
            <tr><td class="font-medium">$O(\\log n)$</td><td>对数</td><td>3.3</td><td>6.6</td><td>二分查找</td></tr>
            <tr><td class="font-medium">$O(n)$</td><td>线性</td><td>10</td><td>100</td><td>遍历数组</td></tr>
            <tr><td class="font-medium">$O(n\\log n)$</td><td>线性对数</td><td>33</td><td>664</td><td>归并/快排</td></tr>
            <tr><td class="font-medium">$O(n^2)$</td><td>平方</td><td>100</td><td>10⁴</td><td>冒泡/选择排序</td></tr>
            <tr><td class="font-medium">$O(2^n)$</td><td>指数</td><td>1024</td><td>10³⁰</td><td>递归求斐波那契</td></tr>
          </tbody>
        </table></div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>增长速度直觉</strong>：$O(1) < O(\\log n) < O(n) < O(n\\log n) < O(n^2) < O(2^n) < O(n!)$。指数和阶乘复杂度在实际中几乎不可用（$n=30$ 就要上亿次运算）。面试/考试中 $O(n^2)$ 通常是暴力解，$O(n\\log n)$ 是优化解。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">复杂度计算规则</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>加法规则</strong>：$O(f(n)) + O(g(n)) = O(\\max(f(n), g(n)))$。两段代码串联，取复杂度高者。</div></div>
          <div class="step-item"><div><strong>乘法规则</strong>：$O(f(n)) \\times O(g(n)) = O(f(n) \\cdot g(n))$。嵌套循环的复杂度相乘。</div></div>
          <div class="step-item"><div><strong>主定理</strong>（Master Theorem）：$T(n) = aT(n/b) + f(n)$，比较 $f(n)$ 与 $n^{\\log_b a}$ 的关系判定复杂度。</div></div>
        </div>
        <div class="formula-block">
          <strong>主定理三种情况</strong>：<br>
          若 $f(n) = O(n^{\\log_b a - \\epsilon})$，则 $T(n) = \\Theta(n^{\\log_b a})$<br>
          若 $f(n) = \\Theta(n^{\\log_b a})$，则 $T(n) = \\Theta(n^{\\log_b a} \\log n)$<br>
          若 $f(n) = \\Omega(n^{\\log_b a + \\epsilon})$，则 $T(n) = \\Theta(f(n))$
        </div>

        <h4 class="font-medium mt-6 mb-2">实例：分析循环复杂度</h4>
        <div class="code-block"><span class="code-comment">// 例1：单层循环 O(n)</span>
<span class="code-keyword">for</span> (<span class="code-keyword">int</span> i = <span class="code-number">0</span>; i &lt; n; i++) sum += i;

<span class="code-comment">// 例2：嵌套循环 O(n²)</span>
<span class="code-keyword">for</span> (<span class="code-keyword">int</span> i = <span class="code-number">0</span>; i &lt; n; i++)
    <span class="code-keyword">for</span> (<span class="code-keyword">int</span> j = <span class="code-number">0</span>; j &lt; n; j++) sum++;

<span class="code-comment">// 例3：对数循环 O(log n)</span>
<span class="code-keyword">for</span> (<span class="code-keyword">int</span> i = <span class="code-number">1</span>; i &lt; n; i *= <span class="code-number">2</span>) sum++;  <span class="code-comment">// i 翻倍，执行 log₂n 次</span></div>

        <h4 class="font-medium mt-6 mb-2">空间复杂度</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          空间复杂度衡量算法<strong>额外占用</strong>的内存（不含输入本身）：
        </p>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>原地算法</strong> $O(1)$：只用常数额外空间（如堆排序、冒泡排序）</li>
          <li><strong>递归</strong> $O(\\text{递归深度})$：递归调用栈的深度</li>
          <li><strong>辅助数组</strong> $O(n)$：需要额外数组（如归并排序需要 $O(n)$ 辅助空间）</li>
        </ul>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>时间空间权衡</strong>：很多算法可以用空间换时间（哈希表加速查找），或用时间换空间（压缩存储）。工程中内存充足时优先优化时间，嵌入式/大数据场景则需平衡。详见 <a href="#" onclick="navigateTo('ds-02');return false;" style="color:var(--primary)">线性表</a> 中顺序表 vs 链表的取舍。</div>
        </div>
      ` },
      { id: 'ds-02', title: '线性表', desc: '顺序表 vs 链表、单/双/循环链表', icon: '🔗', tags: ['核心'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">线性表：最基础的数据结构</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          线性表是 n 个数据元素的有限序列，是所有数据结构的地基。它有两种基本实现：<strong>顺序表</strong>（数组）和<strong>链表</strong>（指针连接）。理解两者的取舍——随机访问 vs 动态扩容——是后续树、图、栈、队列的基础。
        </p>

        <h4 class="font-medium mt-6 mb-2">顺序表 vs 链表（核心对比）</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>特性</th><th>顺序表（数组）</th><th>链表</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">存储方式</td><td>连续内存</td><td>分散内存 + 指针连接</td></tr>
            <tr><td class="font-medium">随机访问</td><td>$O(1)$（下标直接定位）</td><td>$O(n)$（从头遍历）</td></tr>
            <tr><td class="font-medium">头部插入/删除</td><td>$O(n)$（需移动元素）</td><td>$O(1)$（改指针）</td></tr>
            <tr><td class="font-medium">中间插入/删除</td><td>$O(n)$</td><td>$O(1)$（已知节点位置时）</td></tr>
            <tr><td class="font-medium">空间开销</td><td>无额外开销</td><td>每个节点多一个指针</td></tr>
            <tr><td class="font-medium">缓存友好性</td><td>✅ 连续内存，缓存命中率高</td><td>❌ 分散内存，缓存不友好</td></tr>
            <tr><td class="font-medium">扩容</td><td>需重新分配+拷贝</td><td>天然动态</td></tr>
          </tbody>
        </table></div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>选型口诀</strong>：读多写少、需要随机访问 → 顺序表；频繁头尾增删、长度不确定 → 链表。实际工程中顺序表（动态数组 vector）远比链表常用——现代 CPU 缓存让连续内存的速度优势压倒一切。详见 <a href="#" onclick="navigateTo('ds-01');return false;" style="color:var(--primary)">复杂度分析</a>。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">单链表的基本操作</h4>
        <div class="code-block"><span class="code-keyword">typedef struct</span> <span class="code-func">Node</span> {
    <span class="code-keyword">int</span> data;
    <span class="code-keyword">struct</span> <span class="code-func">Node</span> *next;
} <span class="code-func">Node</span>;

<span class="code-comment">// 头插法建表（新节点总插在头部）O(1)</span>
<span class="code-func">Node</span>* <span class="code-func">insertHead</span>(<span class="code-func">Node</span> *head, <span class="code-keyword">int</span> val) {
    <span class="code-func">Node</span> *node = <span class="code-func">malloc</span>(<span class="code-keyword">sizeof</span>(<span class="code-func">Node</span>));
    node-&gt;data = val;
    node-&gt;next = head;  <span class="code-comment">// 新节点指向原头</span>
    <span class="code-keyword">return</span> node;       <span class="code-comment">// 新节点成为新头</span>
}

<span class="code-comment">// 在节点 p 之后插入 O(1)</span>
<span class="code-keyword">void</span> <span class="code-func">insertAfter</span>(<span class="code-func">Node</span> *p, <span class="code-keyword">int</span> val) {
    <span class="code-func">Node</span> *node = <span class="code-func">malloc</span>(<span class="code-keyword">sizeof</span>(<span class="code-func">Node</span>));
    node-&gt;data = val;
    node-&gt;next = p-&gt;next;  <span class="code-comment">// 先连后</span>
    p-&gt;next = node;         <span class="code-comment">// 再连前（顺序不能反！）</span>
}</div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>指针操作经典陷阱</strong>：插入节点时必须"先连后，再连前"——如果先执行 p-&gt;next = node，原 p-&gt;next 就丢失了，无法完成连接。删除节点时要先用临时变量保存 p-&gt;next，否则 free 后无法访问后续节点。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">双链表与循环链表</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>类型</th><th>特点</th><th>适用场景</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">单链表</td><td>只有 next 指针，单向遍历</td><td>栈、队列的实现</td></tr>
            <tr><td class="font-medium">双链表</td><td>prev + next，双向遍历，删除已知节点 O(1)</td><td>LRU 缓存、浏览器历史</td></tr>
            <tr><td class="font-medium">循环链表</td><td>尾节点指向头，形成环</td><td>约瑟夫环、轮转调度</td></tr>
            <tr><td class="font-medium">静态链表</td><td>用数组模拟链表（游标代替指针）</td><td>不支持指针的语言（如早期 Fortran）</td></tr>
          </tbody>
        </table></div>
      ` },
      { id: 'ds-03', title: '栈与队列', desc: '顺序/链式、双端队列、表达式求值', icon: '📥', tags: ['高频'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">栈与队列：受限的线性表</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          栈和队列是操作受限的线性表——栈只能在一端（栈顶）进出（LIFO 后进先出），队列只能一端进另一端出（FIFO 先进先出）。这种"限制"反而让它们在特定场景下高效且语义清晰，是递归、撤销、调度等场景的核心工具。
        </p>

        <h4 class="font-medium mt-6 mb-2">栈 vs 队列</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>特性</th><th>栈（Stack）</th><th>队列（Queue）</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">操作原则</td><td>LIFO（后进先出）</td><td>FIFO（先进先出）</td></tr>
            <tr><td class="font-medium">插入端</td><td>栈顶 push</td><td>队尾 enqueue</td></tr>
            <tr><td class="font-medium">删除端</td><td>栈顶 pop</td><td>队头 dequeue</td></tr>
            <tr><td class="font-medium">时间复杂度</td><td>push/pop/peek 均 $O(1)$</td><td>入队/出队均 $O(1)$</td></tr>
            <tr><td class="font-medium">典型应用</td><td>函数调用栈、括号匹配、表达式求值、DFS</td><td>任务调度、BFS、打印机队列</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">栈的经典应用：括号匹配</h4>
        <div class="code-block"><span class="code-comment">// 判断括号串是否匹配：( { [ ] } )</span>
<span class="code-keyword">int</span> <span class="code-func">isValid</span>(<span class="code-keyword">char</span> *s) {
    <span class="code-func">Stack</span> st; <span class="code-func">init</span>(&amp;st);
    <span class="code-keyword">for</span> (<span class="code-keyword">int</span> i = <span class="code-number">0</span>; s[i]; i++) {
        <span class="code-keyword">if</span> (s[i]==<span class="code-string">'('</span>||s[i]==<span class="code-string">'['</span>||s[i]==<span class="code-string">'{'</span>)
            <span class="code-func">push</span>(&amp;st, s[i]);           <span class="code-comment">// 左括号入栈</span>
        <span class="code-keyword">else</span> {
            <span class="code-keyword">if</span> (<span class="code-func">empty</span>(&amp;st)) <span class="code-keyword">return</span> <span class="code-number">0</span>;  <span class="code-comment">// 右括号但栈空，不匹配</span>
            <span class="code-keyword">char</span> top = <span class="code-func">pop</span>(&amp;st);
            <span class="code-keyword">if</span> (!<span class="code-func">match</span>(top, s[i])) <span class="code-keyword">return</span> <span class="code-number">0</span>;  <span class="code-comment">// 不配对</span>
        }
    }
    <span class="code-keyword">return</span> <span class="code-func">empty</span>(&amp;st);  <span class="code-comment">// 栈空则全部匹配</span>
}</div>

        <h4 class="font-medium mt-6 mb-2">栈的经典应用：表达式求值（中缀转后缀）</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>中缀表达式</strong>：$A + B \\times C$（人类习惯，需考虑优先级和括号）</div></div>
          <div class="step-item"><div><strong>后缀表达式（逆波兰）</strong>：$A\\, B\\, C\\, \\times\\, +$（计算机友好，无需括号和优先级）</div></div>
          <div class="step-item"><div><strong>转换算法</strong>：用栈暂存运算符。遇操作数直接输出；遇运算符与栈顶比较优先级，栈顶优先级更高则先弹出输出。</div></div>
          <div class="step-item"><div><strong>后缀求值</strong>：遇操作数入栈，遇运算符弹出两个操作数计算后结果入栈。最终栈中剩一个值即结果。</div></div>
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>递归的本质就是栈</strong>：函数调用时，参数和返回地址压入"调用栈"；递归返回时弹出。所以任何递归都能用显式栈改写成迭代。系统调用栈大小有限（通常几 MB），深度递归会栈溢出——这就是为什么深度大的 DFS 要改用迭代+栈。详见 <a href="#" onclick="navigateTo('ds-11');return false;" style="color:var(--primary)">图的遍历</a>。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">循环队列（解决假溢出）</h4>
        <div class="formula-block">
          队头 front、队尾 rear，容量 MaxSize<br>
          入队：$rear = (rear + 1) \\bmod MaxSize$<br>
          出队：$front = (front + 1) \\bmod MaxSize$<br>
          判空：$front == rear$；判满：$(rear+1) \\bmod MaxSize == front$（牺牲一个单元区分空满）
        </div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>循环队列的"牺牲一个单元"</strong>：如果不牺牲，front==rear 既表示空也表示满，无法区分。牺牲后，满的条件是 rear 即将追上 front，空的条件是 front==rear。考试常考这个判空判满的条件。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">双端队列（Deque）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          双端队列两端都能进出，是栈和队列的超集。Python 的 collections.deque、C++ 的 std::deque 都是基于分块连续内存实现，两端操作均 $O(1)$。滑动窗口、单调队列等算法常用双端队列。
        </p>
      ` },
      { id: 'ds-04', title: '串', desc: 'KMP 匹配、next 数组推导', icon: '🔤', tags: ['难点'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">串的模式匹配：从暴力到 KMP</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          串的模式匹配是"在主串中查找模式串首次出现位置"的问题。暴力法最坏 $O(nm)$，而 KMP 算法利用已匹配信息，把复杂度降到 $O(n+m)$——核心是 next 数组的巧妙构造。KMP 是数据结构的高频考点，也是理解"利用历史信息优化"思想的典范。
        </p>

        <h4 class="font-medium mt-6 mb-2">暴力匹配（BF 算法）</h4>
        <div class="code-block"><span class="code-comment">// 主串 S，模式串 T，返回 T 在 S 中首次位置</span>
<span class="code-keyword">int</span> <span class="code-func">bfMatch</span>(<span class="code-keyword">char</span> *S, <span class="code-keyword">char</span> *T) {
    <span class="code-keyword">int</span> i = <span class="code-number">0</span>, j = <span class="code-number">0</span>;  <span class="code-comment">// i 主串指针，j 模式串指针</span>
    <span class="code-keyword">while</span> (S[i] &amp;&amp; T[j]) {
        <span class="code-keyword">if</span> (S[i] == T[j]) { i++; j++; }  <span class="code-comment">// 匹配，都前进</span>
        <span class="code-keyword">else</span> { i = i - j + <span class="code-number">1</span>; j = <span class="code-number">0</span>; }  <span class="code-comment">// 失配，i 回溯，j 归零</span>
    }
    <span class="code-keyword">return</span> T[j] ? -<span class="code-number">1</span> : i - j;  <span class="code-comment">// j 走完则匹配成功</span>
}</div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>暴力的低效根源</strong>：失配时主串指针 i 回溯，之前匹配的信息全部丢弃。最坏情况（如主串 "aaaa...ab"、模式串 "aab"）每次都匹配到末尾才失败，复杂度 $O(nm)$。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">KMP 的核心思想：next 数组</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          KMP 的关键洞察：失配时，<strong>主串指针 i 不回溯</strong>，而是利用模式串自身的结构，把模式串指针 j 跳到合适位置。next[j] 记录"模式串 [0..j-1] 的最长相等前后缀长度"。
        </p>
        <div class="formula-block">
          $next[j]$ = 模式串 $T[0..j-1]$ 的<strong>最长相等前后缀</strong>长度<br>
          即：最大的 $k$，使 $T[0..k-1] = T[j-k..j-1]$<br>
          失配时：$j = next[j]$（模式串右滑，跳过必然失配的位置）
        </div>

        <h4 class="font-medium mt-6 mb-2">next 数组求法（手工推导示例）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          模式串 $T = \\text{"ababaaab"}$，求 next 数组：
        </p>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>j</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">T[j]</td><td>a</td><td>b</td><td>a</td><td>b</td><td>a</td><td>a</td><td>a</td><td>b</td></tr>
            <tr><td class="font-medium">next[j]</td><td>-1</td><td>0</td><td>0</td><td>1</td><td>2</td><td>3</td><td>1</td><td>1</td></tr>
          </tbody>
        </table></div>
        <div class="step-list">
          <div class="step-item"><div><strong>next[0]=-1</strong>：约定，表示模式串第一个字符就失配，i 前进。</div></div>
          <div class="step-item"><div><strong>next[1]=0</strong>：T[0..0]="a"，无相等前后缀。</div></div>
          <div class="step-item"><div><strong>next[3]=1</strong>：T[0..2]="aba"，前缀"a"=后缀"a"，长度 1。</div></div>
          <div class="step-item"><div><strong>next[4]=2</strong>：T[0..3]="abab"，前缀"ab"=后缀"ab"，长度 2。</div></div>
          <div class="step-item"><div><strong>next[5]=3</strong>：T[0..4]="ababa"，前缀"aba"=后缀"aba"，长度 3。</div></div>
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>推导口诀</strong>：对每个 j，看 T[0..j-1] 这个子串，找"开头和结尾相同的最长部分"。从 j=2 开始，逐步比较前缀和后缀。next 数组是 KMP 的全部难点，会手推 next 数组就能应付大多数考试题。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">KMP 匹配主循环</h4>
        <div class="code-block"><span class="code-keyword">int</span> <span class="code-func">kmpMatch</span>(<span class="code-keyword">char</span> *S, <span class="code-keyword">char</span> *T, <span class="code-keyword">int</span> *next) {
    <span class="code-keyword">int</span> i = <span class="code-number">0</span>, j = <span class="code-number">0</span>;
    <span class="code-keyword">while</span> (S[i] &amp;&amp; T[j]) {
        <span class="code-keyword">if</span> (j == -<span class="code-number">1</span> || S[i] == T[j]) { i++; j++; }
        <span class="code-keyword">else</span> j = next[j];  <span class="code-comment">// 失配：j 跳转，i 不动！</span>
        <span class="code-keyword">if</span> (!T[j]) <span class="code-keyword">return</span> i - j;  <span class="code-comment">// 匹配成功</span>
    }
    <span class="code-keyword">return</span> -<span class="code-number">1</span>;
}
<span class="code-comment">// 复杂度：主串指针 i 只前进不回溯，O(n+m)</span></div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>next 数组还有优化版 nextval</strong>：当 T[next[j]] == T[j] 时，next[j] 的跳转没意义（跳过去还是会失配），可以直接 nextval[j] = nextval[next[j]]。考试中可能要求写出 nextval 数组。实际工程中，KMP 因实现复杂且常数大，不如 Boyer-Moore 或 Sunday 算法常用，但思想价值极高。</div>
        </div>
      ` },
      { id: 'ds-05', title: '数组与特殊矩阵', desc: '压缩存储、稀疏矩阵', icon: '▦', tags: ['基础'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">多维数组的存储与压缩</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          多维数组在内存中是线性存储的，需要"地址映射公式"建立多维下标与一维地址的对应。对于对称矩阵、三角矩阵、稀疏矩阵等特殊矩阵，可以利用其规律性<strong>压缩存储</strong>，大幅节省空间。这是空间效率优化的经典案例。
        </p>

        <h4 class="font-medium mt-6 mb-2">多维数组的地址映射</h4>
        <div class="formula-block">
          <strong>行优先</strong>（C/Java 默认）：$\\text{LOC}(i,j) = \\text{LOC}(0,0) + (i \\times n + j) \\times L$<br><br>
          <strong>列优先</strong>（Fortran 默认）：$\\text{LOC}(i,j) = \\text{LOC}(0,0) + (j \\times m + i) \\times L$
          <div class="text-sm text-gray-500 mt-2">m×n 矩阵，L 是元素大小。行优先逐行存储，列优先逐列存储</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">对称矩阵的压缩存储</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          n 阶对称矩阵 $a_{ij}=a_{ji}$，只需存储下三角（含对角线），共 $\\frac{n(n+1)}{2}$ 个元素，存入一维数组 sa[k]：
        </p>
        <div class="formula-block">
          $k = \\begin{cases} \\frac{i(i-1)}{2} + j - 1, & i \\ge j \\text{（下三角）} \\\\ \\frac{j(j-1)}{2} + i - 1, & i < j \\text{（上三角，用对称性）} \\end{cases}$
          <div class="text-sm text-gray-500 mt-2">空间从 $n^2$ 降到 $\\frac{n(n+1)}{2}$，约节省一半</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">稀疏矩阵的三元组存储</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          非零元素很少（如 $\\ll 30\\%$）的矩阵，只存非零元素的<strong>(行, 列, 值)</strong>三元组：
        </p>
        <div class="code-block"><span class="code-comment">// 稀疏矩阵的三元组表示</span>
<span class="code-keyword">typedef struct</span> {
    <span class="code-keyword">int</span> row, col;   <span class="code-comment">// 非零元素的行列下标</span>
    <span class="code-keyword">double</span> val;     <span class="code-comment">// 非零元素的值</span>
} <span class="code-func">Triple</span>;

<span class="code-keyword">typedef struct</span> {
    <span class="code-func">Triple</span> data[MAX]; <span class="code-comment">// 非零元素三元组数组</span>
    <span class="code-keyword">int</span> mu, nu, tu;      <span class="code-comment">// 行数、列数、非零元个数</span>
} <span class="code-func">SMatrix</span>;</div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>稀疏矩阵的转置</strong>：三元组转置要把每个元素的行列互换，并按行优先重排。快速转置法（用两个辅助数组记录每列第一个非零元位置）可 $O(n+t)$ 完成，t 是非零元个数。工程中 SciPy 的 scipy.sparse 就是这种思路。</div>
        </div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>压缩存储的代价</strong>：压缩后失去了随机访问能力——访问 $a_{ij}$ 不能 $O(1)$，需计算映射或遍历三元组。所以压缩适合"读多写少且整体处理"的场景（如矩阵乘法），不适合频繁随机访问。</div>
        </div>
      ` },
      { id: 'ds-06', title: '树与二叉树', desc: '性质、遍历、线索化', icon: '🌳', tags: ['核心'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">树：层次化数据的组织方式</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          树是层次化的数据结构，二叉树是其最重要特例。从文件系统到数据库索引，从 HTML DOM 到编译器语法树，树无处不在。本节重点掌握二叉树的五大性质、四种遍历方式，以及线索化——这是理解后续 BST、堆、哈夫曼树的基础。
        </p>

        <h4 class="font-medium mt-6 mb-2">二叉树的五大性质（必背）</h4>
        <div class="formula-block">
          ① 第 $i$ 层最多 $2^{i-1}$ 个节点（$i \\ge 1$）<br><br>
          ② 深度为 $k$ 的二叉树最多 $2^k - 1$ 个节点<br><br>
          ③ 对任意二叉树，$n_0 = n_2 + 1$（度为 0 的节点 = 度为 2 的节点 + 1）<br><br>
          ④ 完全二叉树深度 $k = \\lfloor \\log_2 n \\rfloor + 1$<br><br>
          ⑤ 有 $n$ 节点的完全二叉树，节点 $i$ 的父节点 $\\lfloor i/2 \\rfloor$，左孩子 $2i$，右孩子 $2i+1$
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>性质③最常考</strong>：$n_0 = n_2 + 1$。记忆法：每个度为2的节点"消耗"一个分支产生两个子节点，净增1个叶子。这个性质常用于"已知二叉树有 x 个度为2的节点，求叶子数"这类题。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">四种遍历方式</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>遍历方式</th><th>访问顺序</th><th>递归定义</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">前序 (PreOrder)</td><td>根→左→右</td><td>访问根，前序遍历左子树，前序遍历右子树</td></tr>
            <tr><td class="font-medium">中序 (InOrder)</td><td>左→根→右</td><td>中序遍历左子树，访问根，中序遍历右子树</td></tr>
            <tr><td class="font-medium">后序 (PostOrder)</td><td>左→右→根</td><td>后序遍历左子树，后序遍历右子树，访问根</td></tr>
            <tr><td class="font-medium">层序 (LevelOrder)</td><td>逐层从左到右</td><td>用队列实现（BFS）</td></tr>
          </tbody>
        </table></div>
        <div class="code-block"><span class="code-comment">// 前序遍历（递归）</span>
<span class="code-keyword">void</span> <span class="code-func">preOrder</span>(<span class="code-func">Node</span> *t) {
    <span class="code-keyword">if</span> (!t) <span class="code-keyword">return</span>;
    <span class="code-func">visit</span>(t);        <span class="code-comment">// 根</span>
    <span class="code-func">preOrder</span>(t-&gt;left);   <span class="code-comment">// 左</span>
    <span class="code-func">preOrder</span>(t-&gt;right);  <span class="code-comment">// 右</span>
}
<span class="code-comment">// 层序遍历（用队列，非递归）</span>
<span class="code-keyword">void</span> <span class="code-func">levelOrder</span>(<span class="code-func">Node</span> *root) {
    <span class="code-func">Queue</span> q; <span class="code-func">enqueue</span>(&amp;q, root);
    <span class="code-keyword">while</span> (!<span class="code-func">empty</span>(&amp;q)) {
        <span class="code-func">Node</span> *t = <span class="code-func">dequeue</span>(&amp;q);
        <span class="code-func">visit</span>(t);
        <span class="code-keyword">if</span> (t-&gt;left) <span class="code-func">enqueue</span>(&amp;q, t-&gt;left);
        <span class="code-keyword">if</span> (t-&gt;right) <span class="code-func">enqueue</span>(&amp;q, t-&gt;right);
    }
}</div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>前序+中序 → 唯一确定二叉树</strong>：前序第一个元素是根，在中序中定位根，左侧是左子树，右侧是右子树，递归构造。同理后序+中序也可唯一确定。但前序+后序不能唯一确定（无法区分左右子树）。这是高频考点。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">线索二叉树（利用空指针）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          含 n 个节点的二叉树有 $n+1$ 个空指针（每个节点 2 个指针，用了 $n-1$ 个连边，剩 $2n-(n-1)=n+1$ 个空）。线索化把这些空指针利用起来，指向遍历前驱/后继：
        </p>
        <div class="formula-block">
          左空指针 → 指向前驱节点；右空指针 → 指向后继节点<br>
          加 ltag/rtag 标志位区分：0=孩子指针，1=线索指针
        </div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>线索化的意义</strong>：中序线索化后，可以 $O(1)$ 找到任意节点的前驱/后继，无需从根重新遍历。但线索化后插入删除变复杂（要维护线索）。实际工程中用得少，但考试常考"画出中序线索二叉树"。</div>
        </div>
      ` },
      { id: 'ds-07', title: 'BST 与 AVL 树', desc: '二叉搜索树、平衡二叉树', icon: '⚖', tags: ['高频'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">BST 与 AVL：让查找高效的树</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          二叉搜索树（BST）通过"左小右大"的规则，把查找、插入、删除都做到 $O(h)$。但 BST 可能退化为链表（$h=n$），AVL 树通过<strong>自平衡</strong>把高度控制在 $O(\\log n)$，保证最坏情况也是 $O(\\log n)$。这是理解红黑树、B 树的基础。
        </p>

        <h4 class="font-medium mt-6 mb-2">二叉搜索树（BST）的性质</h4>
        <div class="formula-block">
          对任意节点 X：左子树所有节点值 $&lt; X$ &lt; 右子树所有节点值<br><br>
          <strong>重要推论</strong>：BST 的<strong>中序遍历是有序序列</strong>（升序）
        </div>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>操作</th><th>平均</th><th>最坏（退化为链表）</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">查找</td><td>$O(\\log n)$</td><td>$O(n)$</td></tr>
            <tr><td class="font-medium">插入</td><td>$O(\\log n)$</td><td>$O(n)$</td></tr>
            <tr><td class="font-medium">删除</td><td>$O(\\log n)$</td><td>$O(n)$</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">BST 的删除（三种情况）</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>叶子节点</strong>：直接删除。</div></div>
          <div class="step-item"><div><strong>只有一个孩子</strong>：用孩子替代被删节点。</div></div>
          <div class="step-item"><div><strong>有两个孩子</strong>：用<strong>左子树最大值</strong>或<strong>右子树最小值</strong>替代被删节点（保持 BST 性质），然后递归删除那个替代节点。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">AVL 树（自平衡 BST）</h4>
        <div class="formula-block">
          平衡因子 BF = 左子树高度 - 右子树高度<br>
          AVL 要求所有节点的 $|BF| \\le 1$（即 -1, 0, 1）<br>
          高度始终 $O(\\log n)$，所有操作保证 $O(\\log n)$
        </div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>四种失衡情况与旋转</strong>：插入/删除后若 $|BF|>1$，需旋转恢复平衡。LL型→右旋，RR型→左旋，LR型→先左旋再右旋，RL型→先右旋再左旋。判断失衡类型的关键：从插入点向上找第一个失衡节点，看新节点在其左/右、左孩子的左/右。</div>
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>AVL vs BST vs 红黑树</strong>：BST 最简单但可能退化；AVL 严格平衡（BF≤1），查找快但插入删除旋转多；红黑树弱平衡，查找稍慢但增删更快。所以 AVL 适合"查找密集"场景，红黑树适合"增删频繁"场景（如 C++ map、Linux 进程调度）。详见 <a href="#" onclick="navigateTo('ds-08');return false;" style="color:var(--primary)">红黑树与 B 树</a>。</div>
        </div>
      ` },
      { id: 'ds-08', title: '红黑树与 B 树', desc: '红黑树性质、B/B+ 树（数据库索引）', icon: '🔴', tags: ['工程'], goals: { eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">工程级平衡树：红黑树与 B 树</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          AVL 树虽然严格平衡，但增删时旋转次数多。红黑树采用"弱平衡"策略，用颜色约束保证高度 $O(\\log n)$ 的同时大幅减少旋转。B 树/B+ 树则是为磁盘存储设计的多路平衡树，是所有关系型数据库索引的底层结构。这两个结构是工程面试的高频考点。
        </p>

        <h4 class="font-medium mt-6 mb-2">红黑树的五大性质</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>① 每个节点非红即黑</strong></div></div>
          <div class="step-item"><div><strong>② 根节点是黑色</strong></div></div>
          <div class="step-item"><div><strong>③ 叶子节点（NIL 空节点）是黑色</strong></div></div>
          <div class="step-item"><div><strong>④ 红节点的孩子必是黑色</strong>（不能有连续红节点）</div></div>
          <div class="step-item"><div><strong>⑤ 任一节点到其叶子节点的所有路径，包含相同数目的黑节点</strong>（黑高相同）</div></div>
        </div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>红黑树的高度保证</strong>：由性质④⑤可推出，n 个节点的红黑树高度至多 $2\\log(n+1)$。虽然是 AVL 的两倍，但增删只需 $O(1)$ 次旋转（AVL 可能 $O(\\log n)$ 次），综合性能更优。</div>
        </div>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>特性</th><th>AVL 树</th><th>红黑树</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">平衡严格度</td><td>严格（BF≤1）</td><td>弱（高度≤2logn）</td></tr>
            <tr><td class="font-medium">查找</td><td>快（树矮）</td><td>稍慢（树高些）</td></tr>
            <tr><td class="font-medium">增删旋转次数</td><td>多（可能 O(logn)）</td><td>少（最多 3 次）</td></tr>
            <tr><td class="font-medium">适用场景</td><td>查找密集（数据库内存索引）</td><td>增删频繁（C++ map、Linux 调度）</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">B 树（多路平衡查找树）</h4>
        <div class="formula-block">
          m 阶 B 树：每个节点最多 m 个孩子，最少 $\\lceil m/2 \\rceil$ 个孩子<br>
          根节点至少 2 个孩子，所有叶子在同一层<br>
          每个节点的关键字有序，关键字间是子树指针
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>B 树为什么适合磁盘</strong>：磁盘按"块"读取（4KB 一页），B 树每个节点存多个关键字，树更矮，磁盘 I/O 次数少。一棵 3 阶 B 树存百万数据只需 3 层（3 次 I/O），而二叉树需 20 层（20 次 I/O）。这是数据库用 B+ 树索引的根本原因。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">B+ 树（B 树的数据库优化版）</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>特性</th><th>B 树</th><th>B+ 树</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">非叶子节点</td><td>存关键字 + 数据</td><td>只存关键字（索引）</td></tr>
            <tr><td class="font-medium">数据存储</td><td>所有节点都存</td><td>只在叶子节点存</td></tr>
            <tr><td class="font-medium">叶子节点</td><td>相互独立</td><td>用链表连接（范围查询高效）</td></tr>
            <tr><td class="font-medium">范围查询</td><td>需中序遍历整棵树</td><td>定位起点后沿链表扫描</td></tr>
          </tbody>
        </table></div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>MySQL InnoDB 用 B+ 树</strong>而非 B 树，核心原因：① 非叶节点不存数据→单节点能存更多关键字→树更矮→I/O 更少；② 叶子链表让范围查询（WHERE id BETWEEN...）极快。面试常问"为什么数据库用 B+ 树不用红黑树"——答 I/O 次数和范围查询效率。</div>
        </div>
      ` },
      { id: 'ds-09', title: '堆与优先队列', desc: '建堆、堆排序、Top-K', icon: '⛰', tags: ['高频'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">堆：高效的优先级管理</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          堆是完全二叉树 + 堆序性（父节点 ≥/≤ 所有孩子）。它用数组实现（利用完全二叉树下标规律），插入删除 $O(\\log n)$，取极值 $O(1)$，是优先队列的标准实现。堆排序、Top-K 问题、Dijkstra 算法都依赖堆。
        </p>

        <h4 class="font-medium mt-6 mb-2">大顶堆与小顶堆</h4>
        <div class="formula-block">
          <strong>大顶堆</strong>（Max Heap）：父节点 ≥ 所有孩子，根是最大值<br>
          <strong>小顶堆</strong>（Min Heap）：父节点 ≤ 所有孩子，根是最小值<br><br>
          数组存储：节点 i 的父 $\\lfloor i/2 \\rfloor$，左孩子 $2i$，右孩子 $2i+1$（i 从 1 起）
        </div>

        <h4 class="font-medium mt-6 mb-2">建堆：自下而上调整 $O(n)$</h4>
        <div class="code-block"><span class="code-comment">// 向下调整（以大顶堆为例），从节点 i 开始下沉</span>
<span class="code-keyword">void</span> <span class="code-func">siftDown</span>(<span class="code-keyword">int</span> a[], <span class="code-keyword">int</span> i, <span class="code-keyword">int</span> n) {
    <span class="code-keyword">while</span> (<span class="code-number">2</span>*i &lt;= n) {
        <span class="code-keyword">int</span> child = <span class="code-number">2</span>*i;
        <span class="code-keyword">if</span> (child+<span class="code-number">1</span> &lt;= n &amp;&amp; a[child+<span class="code-number">1</span>] &gt; a[child]) child++;  <span class="code-comment">// 选较大孩子</span>
        <span class="code-keyword">if</span> (a[i] &gt;= a[child]) <span class="code-keyword">break</span>;  <span class="code-comment">// 已满足堆序</span>
        <span class="code-func">swap</span>(&amp;a[i], &amp;a[child]);   <span class="code-comment">// 下沉</span>
        i = child;
    }
}
<span class="code-comment">// 建堆：从最后一个非叶子节点到根，逐个下沉调整</span>
<span class="code-keyword">for</span> (<span class="code-keyword">int</span> i = n/<span class="code-number">2</span>; i &gt;= <span class="code-number">1</span>; i--) <span class="code-func">siftDown</span>(a, i, n);</div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>建堆复杂度 $O(n)$</strong>（不是 $O(n\\log n)$！）。虽然看起来每个节点都下沉（最多 $O(\\log n)$），但大多数节点在底层，下沉距离很小。数学证明总比较次数 $\\sum \\frac{n}{2^h} \\cdot h = O(n)$。这是常考点。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">堆排序 $O(n\\log n)$ 原地</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>建大顶堆</strong>：$O(n)$。</div></div>
          <div class="step-item"><div><strong>反复取堆顶</strong>：把堆顶（最大值）与末尾交换，堆大小减 1，再下沉调整。每次 $O(\\log n)$。</div></div>
          <div class="step-item"><div><strong>重复 n-1 次</strong>：得到升序序列。总 $O(n\\log n)$，空间 $O(1)$（原地）。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">Top-K 问题（堆的经典应用）</h4>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>求前 K 大的元素</strong>：用<strong>小顶堆</strong>，大小 K。遍历数据：比堆顶大则替换堆顶并调整。最终堆中就是 Top-K。复杂度 $O(n\\log K)$，远优于排序后取前 K 的 $O(n\\log n)$。求前 K 小用大顶堆同理。</div>
        </div>
      ` },
      { id: 'ds-10', title: '哈夫曼树与并查集', desc: '哈夫曼编码、Union-Find', icon: '🌲', tags: ['高频'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">哈夫曼树与并查集：两个高频考点</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          哈夫曼树是最优二叉树，用于数据压缩（哈夫曼编码）；并查集是管理"集合合并/查询"的高效结构，是图论算法（Kruskal、连通分量）的核心工具。两者都是笔试和面试的高频考点。
        </p>

        <h4 class="font-medium mt-6 mb-2">哈夫曼树（最优二叉树）</h4>
        <div class="formula-block">
          带权路径长度 WPL = $\\sum w_i \\times l_i$（权值 × 路径长度）<br>
          哈夫曼树 = WPL 最小的二叉树（给定一组权值）
        </div>
        <div class="step-list">
          <div class="step-item"><div><strong>构造算法</strong>：把每个权值看作独立树，每次选<strong>两棵根权值最小的树</strong>合并为一棵新树（新根权值=两者之和），重复直到只剩一棵树。</div></div>
          <div class="step-item"><div><strong>性质</strong>：n 个叶子节点的哈夫曼树有 2n-1 个节点，没有度为 1 的节点。</div></div>
          <div class="step-item"><div><strong>哈夫曼编码</strong>：左分支标 0、右分支标 1，从根到叶子的路径就是该字符的编码。频率高的字符编码短，频率低的编码长→压缩。</div></div>
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>前缀码</strong>：哈夫曼编码是前缀码（任何编码都不是另一个的前缀），所以解码时无需分隔符，从左到右扫描即可唯一确定。这是哈夫曼编码能正确解码的根本保证。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">并查集（Union-Find）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          并查集管理若干不相交集合，支持两个操作：① Find(x) 查 x 所属集合；② Union(x,y) 合并两个集合。用<strong>树的双亲表示法</strong>实现，配合路径压缩和按秩合并，单次操作近似 $O(1)$。
        </p>
        <div class="code-block"><span class="code-keyword">int</span> parent[MAX];  <span class="code-comment">// parent[i] 是 i 的父节点，根的 parent 是自己</span>

<span class="code-comment">// 查找（带路径压缩）</span>
<span class="code-keyword">int</span> <span class="code-func">find</span>(<span class="code-keyword">int</span> x) {
    <span class="code-keyword">if</span> (parent[x] != x)
        parent[x] = <span class="code-func">find</span>(parent[x]);  <span class="code-comment">// 路径压缩：直接指向根</span>
    <span class="code-keyword">return</span> parent[x];
}

<span class="code-comment">// 合并（按秩合并：矮树挂高树下）</span>
<span class="code-keyword">void</span> <span class="code-func">unionSet</span>(<span class="code-keyword">int</span> x, <span class="code-keyword">int</span> y) {
    <span class="code-keyword">int</span> rx = <span class="code-func">find</span>(x), ry = <span class="code-func">find</span>(y);
    <span class="code-keyword">if</span> (rx != ry) parent[rx] = ry;  <span class="code-comment">// 把 x 的根挂到 y 的根下</span>
}</div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>路径压缩是关键优化</strong>：Find 时把路径上所有节点直接指向根，下次查询 $O(1)$。配合按秩合并，单次操作均摊 $O(\\alpha(n)) \\approx O(1)$（α 是反阿克曼函数，n≤10⁸⁰ 时 α≤4）。并查集是 <a href="#" onclick="navigateTo('ds-12');return false;" style="color:var(--primary)">Kruskal 最小生成树</a> 和连通分量问题的标准工具。</div>
        </div>
      ` },
      { id: 'ds-11', title: '图的存储与遍历', desc: '邻接矩阵/表、DFS/BFS', icon: '🕸', tags: ['核心'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">图：最通用的数据结构</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          树和链表都是图的特例。图能表示任意关系（社交网络、道路网、依赖关系）。本节掌握两种存储方式（邻接矩阵/邻接表）的取舍，以及两种遍历（DFS/BFS）的实现和应用——这是所有图算法的基础。
        </p>

        <h4 class="font-medium mt-6 mb-2">邻接矩阵 vs 邻接表</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>特性</th><th>邻接矩阵</th><th>邻接表</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">存储方式</td><td>$n \\times n$ 二维数组</td><td>每个顶点一个链表，存邻接顶点</td></tr>
            <tr><td class="font-medium">空间</td><td>$O(n^2)$</td><td>$O(n+e)$（e 是边数）</td></tr>
            <tr><td class="font-medium">查边 (i,j) 是否存在</td><td>$O(1)$</td><td>$O(\\text{度数})$</td></tr>
            <tr><td class="font-medium">遍历邻接边</td><td>$O(n)$（要扫一行）</td><td>$O(\\text{度数})$</td></tr>
            <tr><td class="font-medium">适合</td><td>稠密图（边多）</td><td>稀疏图（边少）</td></tr>
          </tbody>
        </table></div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>选型</strong>：实际中绝大多数图是稀疏的（如社交网络平均度数远小于 n），所以邻接表更常用。邻接矩阵适合顶点少且边稠密的图（如完全图），或需要快速判断两点是否相邻的场景。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">DFS（深度优先搜索）—— 用栈/递归</h4>
        <div class="code-block"><span class="code-keyword">int</span> visited[MAX];
<span class="code-keyword">void</span> <span class="code-func">dfs</span>(<span class="code-func">Graph</span> *G, <span class="code-keyword">int</span> v) {
    visited[v] = <span class="code-number">1</span>;
    <span class="code-func">visit</span>(v);
    <span class="code-keyword">for</span> (<span class="code-keyword">int</span> w = <span class="code-func">firstNeighbor</span>(G, v); w &gt;= <span class="code-number">0</span>; w = <span class="code-func">nextNeighbor</span>(G, v, w)) {
        <span class="code-keyword">if</span> (!visited[w]) <span class="code-func">dfs</span>(G, w);  <span class="code-comment">// 递归深入</span>
    }
}
<span class="code-comment">// 复杂度：邻接矩阵 O(n²)，邻接表 O(n+e)</span></div>

        <h4 class="font-medium mt-6 mb-2">BFS（广度优先搜索）—— 用队列</h4>
        <div class="code-block"><span class="code-keyword">void</span> <span class="code-func">bfs</span>(<span class="code-func">Graph</span> *G, <span class="code-keyword">int</span> v) {
    <span class="code-func">Queue</span> q; <span class="code-keyword">int</span> visited[MAX] = {<span class="code-number">0</span>};
    <span class="code-func">visit</span>(v); visited[v] = <span class="code-number">1</span>; <span class="code-func">enqueue</span>(&amp;q, v);
    <span class="code-keyword">while</span> (!<span class="code-func">empty</span>(&amp;q)) {
        <span class="code-keyword">int</span> u = <span class="code-func">dequeue</span>(&amp;q);
        <span class="code-keyword">for</span> (<span class="code-keyword">int</span> w = <span class="code-func">firstNeighbor</span>(G, u); w &gt;= <span class="code-number">0</span>; w = <span class="code-func">nextNeighbor</span>(G, u, w)) {
            <span class="code-keyword">if</span> (!visited[w]) {
                <span class="code-func">visit</span>(w); visited[w] = <span class="code-number">1</span>; <span class="code-func">enqueue</span>(&amp;q, w);
            }
        }
    }
}</div>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>特性</th><th>DFS（深度优先）</th><th>BFS（广度优先）</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">数据结构</td><td>栈（递归）</td><td>队列</td></tr>
            <tr><td class="font-medium">遍历方式</td><td>一条路走到底再回溯</td><td>逐层扩展</td></tr>
            <tr><td class="font-medium">最短路径</td><td>❌ 不保证</td><td>✅ 无权图可找最短路径</td></tr>
            <tr><td class="font-medium">空间</td><td>$O(h)$ 递归深度</td><td>$O(w)$ 队列最大宽度</td></tr>
            <tr><td class="font-medium">典型应用</td><td>连通性、拓扑排序、环检测</td><td>最短路径、层序遍历、社交网络</td></tr>
          </tbody>
        </table></div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>连通分量</strong>：对每个未访问顶点调用 DFS/BFS，调用次数 = 连通分量个数。这是判断图连通性、统计岛屿数量（LeetCode 200）的标准做法。详见 <a href="#" onclick="navigateTo('ds-12');return false;" style="color:var(--primary)">图的应用</a>。</div>
        </div>
      ` },
      { id: 'ds-12', title: '图的应用', desc: '最小生成树、最短路径、拓扑排序、关键路径', icon: '🗺', tags: ['高频核心'], goals: { exam: true }, content: `
        <h3 class="text-lg font-semibold mb-3">图算法四大应用</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          图的四大经典应用：最小生成树（网络布线）、最短路径（导航）、拓扑排序（任务依赖）、关键路径（项目管理）。它们是工程和笔试的高频考点，也是理解 <a href="#" onclick="navigateTo('ds-11');return false;" style="color:var(--primary)">图的遍历</a> 后的实际应用。
        </p>

        <h4 class="font-medium mt-6 mb-2">一、最小生成树（MST）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          连通图的生成树是包含所有顶点的极小连通子图。最小生成树是边权之和最小的生成树。两个经典算法：
        </p>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>算法</th><th>思想</th><th>数据结构</th><th>复杂度</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">Prim</td><td>从一个点出发，每次选连接已选集合与未选集合的最小边</td><td>优先队列（小顶堆）</td><td>$O(n^2)$ 或 $O(e\\log n)$</td></tr>
            <tr><td class="font-medium">Kruskal</td><td>所有边按权排序，从小到大选不构成环的边</td><td>并查集（判环）</td><td>$O(e\\log e)$</td></tr>
          </tbody>
        </table></div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>选型</strong>：稠密图（边多）用 Prim（$O(n^2)$ 不依赖边数），稀疏图（边少）用 Kruskal（$O(e\\log e)$ 依赖边数）。Kruskal 用并查集判断加边是否成环——加边前 find 两端点，若同集合则成环跳过。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">二、最短路径</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>算法</th><th>适用</th><th>思想</th><th>复杂度</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">Dijkstra</td><td>单源最短路，<strong>无负权边</strong></td><td>贪心：每次选最近未确定点，松弛邻接边</td><td>$O(n^2)$ 或 $O((n+e)\\log n)$</td></tr>
            <tr><td class="font-medium">Floyd</td><td>所有点对最短路，可有负权（无负环）</td><td>动态规划：$d[i][j]=\\min(d[i][j], d[i][k]+d[k][j])$</td><td>$O(n^3)$</td></tr>
            <tr><td class="font-medium">Bellman-Ford</td><td>单源，可有负权，能检测负环</td><td>对所有边松弛 n-1 次</td><td>$O(ne)$</td></tr>
          </tbody>
        </table></div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>Dijkstra 不能有负权边</strong>：它的贪心假设"已确定的最短路不会再变"，负权边会破坏这个假设。有负权时用 Bellman-Ford。Floyd 求所有点对最短路，适合顶点数少（n≤200）的图。导航软件、路由协议用 Dijkstra 及其优化（A*）。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">三、拓扑排序（AOV 网）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          AOV 网（顶点表示活动，边表示先后关系）的拓扑排序：把所有顶点排成线性序列，使每条边 $(u,v)$ 中 u 在 v 前。
        </p>
        <div class="step-list">
          <div class="step-item"><div><strong>算法</strong>：选一个入度为 0 的顶点输出，删除它及出边（邻接点入度-1），重复直到所有顶点输出。</div></div>
          <div class="step-item"><div><strong>判环</strong>：若输出的顶点数 &lt; 总顶点数，说明有环（存在无法降到入度 0 的顶点）。DAG（有向无环图）才能拓扑排序。</div></div>
          <div class="step-item"><div><strong>应用</strong>：编译依赖分析、课程先修关系、任务调度。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">四、关键路径（AOE 网）</h4>
        <div class="formula-block">
          AOE 网：顶点表示事件，边表示活动（带权=耗时）<br>
          <strong>关键路径</strong>：从源点到汇点的最长路径，决定工程最短工期<br>
          <strong>关键活动</strong>：关键路径上的活动，其时间余量为 0（$l(i) = e(i)$）
        </div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>关键路径求法</strong>：①拓扑排序算每个事件的<strong>最早发生时间 ve</strong>（取前驱 ve+活动时间最大值）；②逆拓扑排序算<strong>最晚发生时间 vl</strong>（取后继 vl-活动时间最小值）；③对每个活动算最早开始 e 和最晚开始 l；④$e=l$ 的活动是关键活动，连起来就是关键路径。缩短关键活动才能缩短工期。</div>
        </div>
      ` },
      { id: 'ds-13', title: '查找', desc: '折半、分块、B 树、散列表', icon: '🔍', tags: ['核心'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">查找：从线性到散列</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          查找是最高频的操作。从 $O(n)$ 的顺序查找，到 $O(\\log n)$ 的折半查找和 B 树，再到 $O(1)$ 均摊的散列表——查找效率的提升是数据结构演进的主线。
        </p>

        <h4 class="font-medium mt-6 mb-2">折半查找（二分查找）</h4>
        <div class="formula-block">
          前提：序列<strong>有序</strong>（升序或降序）<br>
          每次比较中间元素，缩小一半范围：$ASL \\approx \\log_2(n+1) - 1$，$O(\\log n)$
        </div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>折半查找判定树是平衡二叉树</strong>：n 个元素的折半查找过程对应一棵判定树，深度 $\\lfloor\\log_2 n\\rfloor+1$。这正是折半查找 $O(\\log n)$ 的来源。注意折半查找只能用于<strong>顺序存储</strong>（数组），链表不行（无法 $O(1)$ 取中间元素）。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">分块查找（索引顺序查找）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          分块查找是顺序查找和折半查找的折中：把数据分成若干块，<strong>块间有序、块内无序</strong>。先折半/顺序查索引表定位块，再在块内顺序查找。ASL 介于两者之间。
        </p>

        <h4 class="font-medium mt-6 mb-2">散列表（哈希表）—— $O(1)$ 查找</h4>
        <div class="formula-block">
          散列函数 $H(key)$：把关键字映射到存储地址<br>
          理想情况：查找/插入/删除均 $O(1)$（平均），最坏 $O(n)$（冲突严重时）
        </div>
        <h4 class="font-medium mt-6 mb-2">散列函数构造</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>直接定址法</strong>：$H(key)=a \\cdot key + b$（关键字分布连续时）</li>
          <li><strong>除留余数法</strong>（最常用）：$H(key)=key \\bmod p$，p 选不大于表长的最大素数</li>
          <li><strong>数字分析法</strong>：取关键字中分布均匀的几位</li>
          <li><strong>平方取中法</strong>：关键字平方后取中间几位</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">冲突解决方法</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>方法</th><th>原理</th><th>优点</th><th>缺点</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">开放定址法<br>（线性探测）</td><td>冲突时顺序找下一个空位</td><td>无需额外空间</td><td>易"聚集"（连续占用降低效率）</td></tr>
            <tr><td class="font-medium">开放定址法<br>（二次探测）</td><td>冲突时按 $\\pm 1^2, \\pm 2^2...$ 探测</td><td>缓解聚集</td><td>可能找不到空位（表满时）</td></tr>
            <tr><td class="font-medium">链地址法<br>（拉链法）</td><td>同地址元素用链表串联</td><td>无聚集、删除方便</td><td>需要额外指针空间</td></tr>
            <tr><td class="font-medium">再散列法</td><td>冲突时换一个散列函数</td><td>冲突少</td><td>计算开销大</td></tr>
          </tbody>
        </table></div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>装填因子 $\\alpha = n/m$</strong>（n 元素数 / m 表长）是散列表性能的核心指标。$\\alpha$ 越小冲突越少但越浪费空间。工程中通常保持 $\\alpha \\in [0.5, 0.75]$，超过阈值就 rehash（扩容+重新散列）。Java HashMap 默认 $\\alpha=0.75$ 触发扩容。</div>
        </div>
      ` },
      { id: 'ds-14', title: '排序', desc: '插入/交换/选择/归并/基数，全家桶', icon: '↕', tags: ['高频核心'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">排序全家桶：八大排序算法对比</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          排序是数据结构的核心考点。掌握八大排序算法的原理、复杂度、稳定性，以及各自的适用场景，是笔试和面试的必备知识。
        </p>

        <h4 class="font-medium mt-6 mb-2">八大排序算法对比表（必背）</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>算法</th><th>平均</th><th>最坏</th><th>空间</th><th>稳定?</th><th>类型</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">直接插入</td><td>$O(n^2)$</td><td>$O(n^2)$</td><td>$O(1)$</td><td>✅</td><td>插入</td></tr>
            <tr><td class="font-medium">折半插入</td><td>$O(n^2)$</td><td>$O(n^2)$</td><td>$O(1)$</td><td>✅</td><td>插入</td></tr>
            <tr><td class="font-medium">希尔排序</td><td>$O(n^{1.3})$</td><td>$O(n^2)$</td><td>$O(1)$</td><td>❌</td><td>插入</td></tr>
            <tr><td class="font-medium">冒泡排序</td><td>$O(n^2)$</td><td>$O(n^2)$</td><td>$O(1)$</td><td>✅</td><td>交换</td></tr>
            <tr><td class="font-medium">快速排序</td><td>$O(n\\log n)$</td><td>$O(n^2)$</td><td>$O(\\log n)$</td><td>❌</td><td>交换</td></tr>
            <tr><td class="font-medium">简单选择</td><td>$O(n^2)$</td><td>$O(n^2)$</td><td>$O(1)$</td><td>❌</td><td>选择</td></tr>
            <tr><td class="font-medium">堆排序</td><td>$O(n\\log n)$</td><td>$O(n\\log n)$</td><td>$O(1)$</td><td>❌</td><td>选择</td></tr>
            <tr><td class="font-medium">归并排序</td><td>$O(n\\log n)$</td><td>$O(n\\log n)$</td><td>$O(n)$</td><td>✅</td><td>归并</td></tr>
            <tr><td class="font-medium">基数排序</td><td>$O(d(n+r))$</td><td>$O(d(n+r))$</td><td>$O(r)$</td><td>✅</td><td>基数</td></tr>
          </tbody>
        </table></div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>稳定性记忆</strong>：稳定的排序——"插冒归基"（插入、冒泡、归并、基数）。不稳定的——"快选希堆"（快排、选择、希尔、堆排序）。稳定性指相等元素排序后相对顺序不变，对多关键字排序很重要。</div>
        </div>

        <div class="chart-container chart-container-lg" data-chart="sort-compare" data-n="20" data-title="排序算法动画对比"></div>
        <div class="text-xs text-center mt-1 mb-4" style="color:var(--text-secondary)">点击按钮观看排序过程动画，比较各算法的步数差异</div>

        <h4 class="font-medium mt-6 mb-2">快排（最常考）</h4>
        <div class="code-block"><span class="code-comment">// 快速排序（分治：选基准 partition）</span>
<span class="code-keyword">void</span> <span class="code-func">quickSort</span>(<span class="code-keyword">int</span> a[], <span class="code-keyword">int</span> low, <span class="code-keyword">int</span> high) {
    <span class="code-keyword">if</span> (low &lt; high) {
        <span class="code-keyword">int</span> pivot = <span class="code-func">partition</span>(a, low, high);  <span class="code-comment">// 分割，返回基准最终位置</span>
        <span class="code-func">quickSort</span>(a, low, pivot - <span class="code-number">1</span>);
        <span class="code-func">quickSort</span>(a, pivot + <span class="code-number">1</span>, high);
    }
}
<span class="code-keyword">int</span> <span class="code-func">partition</span>(<span class="code-keyword">int</span> a[], <span class="code-keyword">int</span> low, <span class="code-keyword">int</span> high) {
    <span class="code-keyword">int</span> pivot = a[low];  <span class="code-comment">// 选第一个做基准</span>
    <span class="code-keyword">while</span> (low &lt; high) {
        <span class="code-keyword">while</span> (low &lt; high &amp;&amp; a[high] &gt;= pivot) high--;
        a[low] = a[high];
        <span class="code-keyword">while</span> (low &lt; high &amp;&amp; a[low] &lt;= pivot) low++;
        a[high] = a[low];
    }
    a[low] = pivot;
    <span class="code-keyword">return</span> low;
}</div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>快排最坏 $O(n^2)$</strong>：当序列已有序（正序或逆序）且每次选首/尾做基准时，partition 极不均衡，退化为 $O(n^2)$。优化：随机选基准、三数取中（首中尾的中位数）。快排平均最快且原地，是工程最常用排序（C qsort、多数库默认）。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">各排序适用场景</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>场景</th><th>推荐</th><th>原因</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">n 小（&lt;50）</td><td>插入排序</td><td>常数小，简单数据下比快排快</td></tr>
            <tr><td class="font-medium">通用大数据</td><td>快排/快排+插入混合（TimSort）</td><td>平均 $O(n\\log n)$，原地，缓存友好</td></tr>
            <tr><td class="font-medium">要求稳定</td><td>归并排序</td><td>稳定且最坏 $O(n\\log n)$，但需 $O(n)$ 空间</td></tr>
            <tr><td class="font-medium">内存受限</td><td>堆排序</td><td>原地 $O(n\\log n)$，但常数大、缓存不友好</td></tr>
            <tr><td class="font-medium">关键字范围小</td><td>基数排序/计数排序</td><td>线性 $O(n)$，但非比较排序有局限</td></tr>
          </tbody>
        </table></div>
      ` },
      { id: 'ds-15', title: '外排序与文件', desc: '败者树、多路归并（工程）', icon: '📂', tags: ['工程'], goals: { eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">外排序：数据超过内存怎么办</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          当数据量远超内存（如几十 GB 日志排序），无法全部载入内存，必须在<strong>内外存之间分批处理</strong>。外排序的核心是多路归并 + 败者树优化。这是大数据处理（MapReduce 的 shuffle 阶段）的基础思想。
        </p>

        <h4 class="font-medium mt-6 mb-2">外排序基本流程</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>① 生成初始归并段</strong>：把大文件分批读入内存（每批能放下），用内排序（如快排）排好，写成有序的临时文件（归并段）。</div></div>
          <div class="step-item"><div><strong>② 多路归并</strong>：同时打开 k 个归并段，每次从 k 个段的当前最小值中选全局最小输出，对应段指针前进。</div></div>
          <div class="step-item"><div><strong>③ 重复直到合并成一个有序文件</strong>。</div></div>
        </div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>I/O 次数是关键</strong>：外排序的时间主要花在磁盘读写上，而非比较。减少 I/O 的方法：①增大归并段（用置换-选择排序生成长归并段）；②增加归并路数 k（减少归并趟数）。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">败者树（优化多路归并的选最小）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          k 路归并每次选最小值，朴素方法是线性扫描 k 个元素 $O(k)$。败者树（锦标赛树的变种）把这个操作降到 $O(\\log k)$：
        </p>
        <div class="formula-block">
          败者树：完全二叉树，叶节点是各路当前元素<br>
          内部节点记录"本轮比较的败者（较大者）"，胜者（较小者）继续上浮<br>
          根的额外位置记录总冠军（全局最小）<br>
          输出最小后，对应路补入新元素，只需沿路径重新比较 $O(\\log k)$
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>败者树 vs 堆</strong>：两者都能 $O(\\log k)$ 选最小。败者树的优势是更新时只需比较 $\\log k$ 次（沿一条路径），而堆调整也需要 $\\log k$ 但常数略大。工程中堆更易实现，败者树理论更优。多路归并路数 k 很大时（如 k=64）败者树优势明显。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">置换-选择排序（生成长归并段）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          朴素方法生成的归并段长度 = 内存容量。置换-选择排序利用内存中的小顶堆，能生成<strong>平均长度 2 倍内存</strong>的归并段，减少归并段数量和趟数。
        </p>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>最佳归并树</strong>：归并段长度不同时，用哈夫曼树思想——短段先合并（多用 I/O 少的短段参与多次归并）。这能最小化总 I/O 次数。这与 <a href="#" onclick="navigateTo('ds-10');return false;" style="color:var(--primary)">哈夫曼树</a> 的构造完全一致。</div>
        </div>
      ` },
      { id: 'ds-16', title: '工程进阶结构', desc: '跳表、布隆过滤器、LRU/LFU、Trie', icon: '🚀', tags: ['工程'], goals: { eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">工程进阶数据结构</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          这些结构在实际工程中高频出现，是面试和系统设计的常客。它们各有特定场景的极致优化：跳表平衡了链表和树，布隆过滤器用概率换空间，LRU/LFU 是缓存淘汰核心，Trie 是字符串处理利器。
        </p>

        <h4 class="font-medium mt-6 mb-2">跳表（Skip List）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          跳表是<strong>有序链表 + 多级索引</strong>，用空间换时间，实现 $O(\\log n)$ 的查找/插入/删除，性能媲美平衡树但实现简单得多。Redis 的有序集合（ZSet）就用跳表实现。
        </p>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跳表 vs 红黑树</strong>：两者都 $O(\\log n)$。跳表优势：①实现简单（无需复杂的旋转和染色）；②并发友好（局部加锁即可）。红黑树优势：①最坏情况严格保证；②范围查询稍快。Redis 选跳表正是因为实现简单和并发优势。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">布隆过滤器（Bloom Filter）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          布隆过滤器是<strong>概率型数据结构</strong>，用极少的内存判断"元素是否可能在集合中"。用 k 个散列函数映射到位数组，全为 1 则"可能存在"（有假阳性），有 0 则"一定不存在"（无假阴性）。
        </p>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>操作</th><th>结果</th><th>说明</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">查询返回"不存在"</td><td>✅ 一定不存在</td><td>无假阴性</td></tr>
            <tr><td class="font-medium">查询返回"存在"</td><td>⚠️ 可能存在（假阳性）</td><td>多个元素散列冲突导致</td></tr>
            <tr><td class="font-medium">删除</td><td>❌ 不支持</td><td>清零会影响其他元素</td></tr>
          </tbody>
        </table></div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>典型应用</strong>：缓存穿透防护（查 DB 前先过布隆过滤器）、垃圾邮件过滤、URL 去重（爬虫）。1 亿元素的集合，布隆过滤器只需约 100MB（对比 HashSet 需几 GB），假阳性率可控制在 1% 以下。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">LRU 与 LFU 缓存</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>策略</th><th>淘汰依据</th><th>实现</th><th>适用场景</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">LRU</td><td>最近最少使用</td><td>哈希表 + 双向链表，$O(1)$ get/put</td><td>时间局部性强（最近访问的还会访问）</td></tr>
            <tr><td class="font-medium">LFU</td><td>最不经常使用</td><td>哈希表 + 频率桶，$O(1)$ get/put</td><td>频率局部性强（热点数据持续热）</td></tr>
          </tbody>
        </table></div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>LRU 的 $O(1)$ 诀窍</strong>：哈希表提供 $O(1)$ 查找节点，双向链表提供 $O(1)$ 移动到头部/删除尾部。访问某节点时，从链表中摘除并移到头部（最近使用）；容量满时删除尾部（最久未用）。C++ 的 std::list + unordered_map 或 LinkedHashMap 是经典实现。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">Trie 树（前缀树）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          Trie 是处理<strong>字符串前缀</strong>的利器。每个节点代表一个字符，从根到某节点的路径是一个字符串前缀。
        </p>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>Trie 的优势</strong>：①前缀查询 $O(L)$（L 是字符串长度，与字典大小无关）；②共享公共前缀节省空间。应用：搜索引擎自动补全、拼写检查、IP 路由表（Longest Prefix Match）。变体：压缩 Trie（合并单分支）、AC 自动机（多模式串匹配）。</div>
        </div>
      ` },
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

// 知识点依赖关系（用于学习路径推荐和知识图谱）
// 格式：'目标知识点': ['前置知识点1', '前置知识点2', ...]
const KnowledgeDeps = {
  // === 高等数学内部链 ===
  'hm-02': ['hm-01'],       // 一元微分学 <- 函数极限
  'hm-03': ['hm-02'],       // 泰勒公式 <- 一元微分学
  'hm-04': ['hm-02'],       // 导数应用 <- 一元微分学
  'hm-05': ['hm-02'],       // 不定积分 <- 一元微分学
  'hm-06': ['hm-05'],       // 定积分 <- 不定积分
  'hm-07': ['hm-06'],       // 定积分应用 <- 定积分
  'hm-08': ['hm-06'],       // 常微分方程 <- 定积分
  'hm-09': ['hm-04'],       // 多元微分学 <- 导数应用
  'hm-10': ['hm-09'],       // 多元极值 <- 多元微分学
  'hm-11': ['hm-06', 'hm-09'], // 二重积分 <- 定积分 + 多元微分学
  'hm-12': ['hm-11'],       // 三重积分 <- 二重积分
  'hm-13': ['hm-06'],       // 曲线积分 <- 定积分
  'hm-14': ['hm-13'],       // 曲面积分 <- 曲线积分
  'hm-15': ['hm-06'],       // 无穷级数 <- 定积分
  'hm-16': ['hm-15'],       // 傅里叶级数 <- 无穷级数

  // === 线性代数内部链 ===
  'la-02': ['la-01'],       // 矩阵运算 <- 行列式
  'la-03': ['la-02'],       // 初等变换与秩 <- 矩阵运算
  'la-04': ['la-03'],       // 线性方程组 <- 初等变换与秩
  'la-05': ['la-04'],       // 向量组 <- 线性方程组
  'la-06': ['la-02', 'la-04'], // 特征值 <- 矩阵运算 + 线性方程组
  'la-07': ['la-06'],       // 相似矩阵 <- 特征值
  'la-08': ['la-06', 'la-09'], // 二次型 <- 特征值 + 正交矩阵
  'la-09': ['la-06'],       // 正交矩阵 <- 特征值
  'la-10': ['la-05', 'la-07'], // 线性空间 <- 向量组 + 相似矩阵

  // === 电路基础内部链 ===
  'circ-02': ['circ-01'],   // 戴维南 <- KCL/KVL
  'circ-03': ['circ-01'],   // 叠加定理 <- KCL/KVL
  'circ-04': ['circ-01'],   // 一阶暂态 <- KCL/KVL
  'circ-05': ['circ-04'],   // 二阶暂态 <- 一阶暂态
  'circ-06': ['circ-01'],   // 正弦稳态 <- KCL/KVL
  'circ-07': ['circ-06'],   // 频率响应 <- 正弦稳态
  'circ-08': ['circ-06'],   // 谐振电路 <- 正弦稳态
  'circ-09': ['circ-06'],   // 三相电路 <- 正弦稳态
  'circ-10': ['circ-02'],   // 二端口 <- 戴维南
  'circ-11': ['circ-06'],   // 含运放电路 <- 正弦稳态
  'circ-12': ['circ-01'],   // 受控源 <- KCL/KVL

  // === 模拟电路内部链 ===
  'ana-02': ['ana-01'],     // 整流滤波 <- 二极管
  'ana-03': ['ana-01'],     // BJT <- 二极管
  'ana-04': ['ana-03'],     // 基本放大 <- BJT
  'ana-05': ['ana-04'],     // 工作点稳定 <- 基本放大
  'ana-06': ['ana-04'],     // 多级放大 <- 基本放大
  'ana-07': ['ana-04'],     // 集成运放 <- 基本放大
  'ana-08': ['ana-06'],     // 反馈放大 <- 多级放大
  'ana-09': ['ana-07'],     // 运放线性 <- 集成运放
  'ana-10': ['ana-07'],     // 运放非线性 <- 集成运放
  'ana-11': ['ana-09'],     // 有源滤波 <- 运放线性
  'ana-12': ['ana-04'],     // 功率放大 <- 基本放大
  'ana-13': ['ana-02', 'ana-07'], // 直流稳压 <- 整流滤波 + 集成运放
  'ana-14': ['ana-08'],     // 振荡电路 <- 反馈放大

  // === 数字电路内部链 ===
  'dig-02': ['dig-01'],     // 逻辑代数 <- 数制编码
  'dig-03': ['dig-02'],     // 组合逻辑 <- 逻辑代数
  'dig-04': ['dig-03'],     // 编码器/译码器 <- 组合逻辑
  'dig-05': ['dig-03'],     // 加法器 <- 组合逻辑
  'dig-06': ['dig-03'],     // 竞争冒险 <- 组合逻辑
  'dig-07': ['dig-01'],     // 触发器 <- 数制编码
  'dig-08': ['dig-07', 'dig-03'], // 时序逻辑 <- 触发器 + 组合逻辑
  'dig-09': ['dig-08'],     // 计数器 <- 时序逻辑
  'dig-10': ['dig-07'],     // 移位寄存器 <- 触发器
  'dig-11': ['dig-07'],     // 555定时器 <- 触发器
  'dig-12': ['dig-03'],     // 存储器 <- 组合逻辑
  'dig-13': ['dig-03'],     // AD/DA <- 组合逻辑
  'dig-14': ['dig-08'],     // Verilog <- 时序逻辑

  // === 自动控制内部链 ===
  'act-02': ['act-01'],     // 数学模型 <- 概论
  'act-03': ['act-02', 'hm-08'], // 拉氏变换 <- 数学模型 + 常微分方程
  'act-04': ['act-03'],     // 结构图 <- 拉氏变换
  'act-05': ['act-03'],     // 时域分析 <- 拉氏变换
  'act-06': ['act-05'],     // 稳定性 <- 时域分析
  'act-07': ['act-05', 'act-06'], // 稳态误差 <- 时域分析 + 稳定性
  'act-08': ['act-03', 'la-06'], // 根轨迹 <- 拉氏变换 + 特征值
  'act-09': ['act-03'],     // 频域分析 <- 拉氏变换
  'act-10': ['act-09', 'act-06'], // 奈奎斯特 <- 频域分析 + 稳定性
  'act-11': ['act-09', 'act-05'], // 闭环频域 <- 频域分析 + 时域分析
  'act-12': ['act-10', 'act-07'], // 系统校正 <- 奈奎斯特 + 稳态误差
  'act-13': ['act-03'],     // 离散系统 <- 拉氏变换
  'act-14': ['act-12'],     // PID整定 <- 系统校正

  // === 数据结构内部链 ===
  'ds-02': ['ds-01'],       // 线性表 <- 绪论
  'ds-03': ['ds-02'],       // 栈与队列 <- 线性表
  'ds-04': ['ds-02'],       // 串 <- 线性表
  'ds-05': ['ds-02'],       // 数组 <- 线性表
  'ds-06': ['ds-02'],       // 树 <- 线性表
  'ds-07': ['ds-06'],       // BST/AVL <- 树
  'ds-08': ['ds-07'],       // 红黑树/B树 <- BST/AVL
  'ds-09': ['ds-06'],       // 堆 <- 树
  'ds-10': ['ds-06'],       // 哈夫曼/并查集 <- 树
  'ds-11': ['ds-02', 'ds-06'], // 图 <- 线性表 + 树
  'ds-12': ['ds-11'],       // 图应用 <- 图
  'ds-13': ['ds-07', 'ds-11'], // 查找 <- BST + 图
  'ds-14': ['ds-02', 'ds-09'], // 排序 <- 线性表 + 堆
  'ds-15': ['ds-14'],       // 外排序 <- 排序
  'ds-16': ['ds-08', 'ds-11'], // 工程进阶 <- 红黑树 + 图
};

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
      explanation: '$f\'(x)=3x^2$，$f\'(0)=0$ 但 $f\'$ 在 0 左右都为正（不变号），故不是极值。而 $f\'\'(x)=6x$ 在 $x=0$ 左右由负变正（凹凸改变），故 $(0,0)$ 是拐点。这题警示：$f\'(x_0)=0$ 不一定是极值，要看变号。'
    },
  ],

  // ========== 高等数学 hm-05~hm-16 ==========
  'hm-05': [
    {
      question: '不定积分 $\\int f(x)\\,dx$ 的结果是？',
      options: ['一个函数', '一个常数', '一族函数（含任意常数 C）', '一个定值'],
      answer: 2,
      explanation: '不定积分是全体原函数的集合，结果是一个函数族 $F(x)+C$，其中 $C$ 是任意常数。漏写 $+C$ 是最常见的错误，考试中即使过程全对，漏 $C$ 也会扣分。'
    },
    {
      question: '$\\int \\frac{1}{x}\\,dx$ 等于？',
      options: ['$\\ln x + C$', '$\\ln|x| + C$', '$-\\frac{1}{x^2} + C$', '$\\frac{1}{x} + C$'],
      answer: 1,
      explanation: '注意 $\\int \\frac{1}{x}dx = \\ln|x| + C$ 必须加绝对值！因为 $x<0$ 时 $\\ln x$ 无定义，但 $\\frac{1}{x}$ 在 $x<0$ 时仍有意义。$(\\ln|x|)\' = \\frac{1}{x}$ 对所有 $x \\ne 0$ 成立。'
    },
    {
      question: '第一类换元法（凑微分）的核心思想是？',
      options: ['令 $x = \\varphi(t)$', '把被积函数凑成 $f(\\varphi(x))\\varphi\'(x)$ 的形式', '直接用公式', '分部积分'],
      answer: 1,
      explanation: '第一类换元法是"凑微分"：识别出被积函数中的复合结构 $f(\\varphi(x))\\varphi\'(x)$，令 $u=\\varphi(x)$ 换元。关键是要熟悉常见凑微分：$x\\,dx=\\frac{1}{2}d(x^2)$、$e^x\\,dx=d(e^x)$ 等。'
    },
    {
      question: '$\\int x e^x\\,dx$ 用什么方法计算？',
      options: ['第一类换元法', '第二类换元法', '分部积分法', '直接用公式'],
      answer: 2,
      explanation: '被积函数是两种不同类型（幂函数×指数函数）的乘积，适合用分部积分。令 $u=x$，$dv=e^x dx$，则 $du=dx$，$v=e^x$，原式 $= xe^x - \\int e^x dx = xe^x - e^x + C$。'
    },
    {
      question: '分部积分的"反对幂指三"口诀中，优先选作 $u$ 的是？',
      options: ['三角函数', '指数函数', '幂函数', '反三角函数'],
      answer: 3,
      explanation: '口诀"反对幂指三"表示选 $u$ 的优先级：反三角 > 对数 > 幂 > 指数 > 三角。排在前面的优先选作 $u$（求导后会简化），排在后面的作为 $dv$（积分后不会变更复杂）。'
    },
    {
      question: '$\\int \\sqrt{1-x^2}\\,dx$ 应该用什么代换？',
      options: ['$x = \\sin t$', '$x = \\tan t$', '$x = \\sec t$', '$x = \\frac{1}{t}$'],
      answer: 0,
      explanation: '被积函数含 $\\sqrt{1-x^2}$，属于 $\\sqrt{a^2-x^2}$ 型，用三角代换 $x = a\\sin t$（此处 $a=1$）。利用 $1-\\sin^2 t = \\cos^2 t$ 消去根号。记住三类根号对应的代换：$a^2-x^2$ 用 $\\sin$，$a^2+x^2$ 用 $\\tan$，$x^2-a^2$ 用 $\\sec$。'
    },
    {
      question: '以下关于不定积分的说法，错误的是？',
      options: ['$\\int [f(x)+g(x)]dx = \\int f(x)dx + \\int g(x)dx$', '$\\int kf(x)dx = k\\int f(x)dx$（$k$ 为常数）', '$\\int f(x)g(x)dx = \\int f(x)dx \\cdot \\int g(x)dx$', '求导和互为逆运算'],
      answer: 2,
      explanation: '积分没有乘法分配律！$\\int f(x)g(x)dx \\ne \\int f(x)dx \\cdot \\int g(x)dx$。乘积的积分需要用分部积分法或换元法，不能拆开分别积分再相乘。这是初学者常犯的概念错误。'
    },
  ],

  'hm-06': [
    {
      question: '定积分 $\\int_a^b f(x)dx$ 的几何意义是？',
      options: ['曲线的长度', '曲边梯形的面积（代数面积）', '函数的最大值', '原函数的值'],
      answer: 1,
      explanation: '定积分表示曲线 $y=f(x)$ 与 $x$ 轴之间的"代数面积"——$x$ 轴上方为正，下方为负。这是黎曼和的极限，不等于几何面积（几何面积需取绝对值）。'
    },
    {
      question: '牛顿-莱布尼茨公式 $\\int_a^b f(x)dx = F(b)-F(a)$ 的条件是？',
      options: ['$f(x)$ 连续', '$F(x)$ 连续', '$f(x)$ 在 $[a,b]$ 上可积且 $F\'(x)=f(x)$', '无条件成立'],
      answer: 2,
      explanation: '牛莱公式要求：① $f(x)$ 在 $[a,b]$ 上可积（连续或有限个第一类间断点）；② $F(x)$ 是 $f(x)$ 的原函数。两个条件缺一不可。'
    },
    {
      question: '$\\int_1^{+\\infty} \\frac{1}{x^p}dx$ 收敛的条件是？',
      options: ['$p > 0$', '$p > 1$', '$p < 1$', '$p \\ne 0$'],
      answer: 1,
      explanation: '这是无穷区间的 p-积分。当 $p>1$ 时 $\\int_1^{+\\infty} x^{-p}dx = \\frac{1}{p-1}$ 收敛；当 $p \\le 1$ 时发散。记忆：无穷区间"大p收敛"。'
    },
    {
      question: '定积分换元时，与不定积分换元的最大区别是？',
      options: ['不需要回代', '必须同时换积分限', '不能用三角代换', '只能用第一类换元'],
      answer: 1,
      explanation: '定积分换元 $x=\\varphi(t)$ 时，积分限必须跟着变：$x=a$ 对应 $t=\\varphi^{-1}(a)$，$x=b$ 对应 $t=\\varphi^{-1}(b)$。换完限后直接对 $t$ 积分求值，不需要回代。'
    },
    {
      question: '$\\int_0^1 \\frac{1}{x^p}dx$（瑕积分）收敛的条件是？',
      options: ['$p > 1$', '$p < 1$', '$p > 0$', '$p \\ne 1$'],
      answer: 1,
      explanation: '这是瑕积分（$x=0$ 是瑕点）。当 $p<1$ 时收敛，当 $p \\ge 1$ 时发散。记忆：瑕积分"小p收敛"，与无穷区间的"大p收敛"正好相反。'
    },
    {
      question: '定积分中值定理 $\\int_a^b f(x)dx = f(\\xi)(b-a)$ 的含义是？',
      options: ['$f(\\xi)$ 是最大值', '$f(\\xi)$ 是最小值', '存在 $\\xi \\in [a,b]$ 使得 $f(\\xi)$ 等于平均值', '$\\xi$ 是唯一的'],
      answer: 2,
      explanation: '中值定理说明：连续函数在区间上的积分等于某点的函数值乘以区间长度。$f(\\xi) = \\frac{1}{b-a}\\int_a^b f(x)dx$ 正是函数在 $[a,b]$ 上的平均值。$\\xi$ 不一定唯一。'
    },
  ],

  'hm-07': [
    {
      question: '由 $y=f(x)$、$y=g(x)$、$x=a$、$x=b$ 围成的面积公式是？',
      options: ['$\\int_a^b [f(x)-g(x)]dx$', '$\\int_a^b |f(x)-g(x)|dx$', '$\\int_a^b f(x)dx - \\int_a^b g(x)dx$', '$\\int_a^b [f(x)+g(x)]dx$'],
      answer: 1,
      explanation: '面积一定是非负的，所以要用绝对值：$S = \\int_a^b |f(x)-g(x)|dx$。如果不用绝对值，当 $f<g$ 时积分结果为负，不是面积。画图确定上下位置后再去绝对值。'
    },
    {
      question: '绕 $x$ 轴旋转体的体积公式（圆盘法）是？',
      options: ['$V = \\int_a^b f(x)dx$', '$V = \\pi\\int_a^b [f(x)]^2dx$', '$V = 2\\pi\\int_a^b x f(x)dx$', '$V = \\int_a^b 2\\pi f(x)dx$'],
      answer: 1,
      explanation: '圆盘法：垂直于旋转轴切片，每个薄片是圆盘，体积微元 $dV = \\pi r^2 dx = \\pi [f(x)]^2 dx$。绕 $x$ 轴旋转时半径就是 $|f(x)|$，积分得 $V = \\pi\\int_a^b [f(x)]^2 dx$。'
    },
    {
      question: '柱壳法绕 $y$ 轴旋转的体积公式是？',
      options: ['$V = \\pi\\int_a^b [f(x)]^2dx$', '$V = 2\\pi\\int_a^b x|f(x)|dx$', '$V = \\int_a^b f(x)dx$', '$V = \\pi\\int_a^b x^2 dx$'],
      answer: 1,
      explanation: '柱壳法：平行于旋转轴切片，每个薄片展开是圆柱壳，体积微元 $dV = 2\\pi r h \\cdot dx = 2\\pi x |f(x)| dx$。绕 $y$ 轴旋转时，半径是 $x$，高度是 $|f(x)|$。'
    },
    {
      question: '曲线 $y=f(x)$ 从 $x=a$ 到 $x=b$ 的弧长公式是？',
      options: ['$L = \\int_a^b \\sqrt{1+[f(x)]^2}dx$', '$L = \\int_a^b \\sqrt{1+[f\'(x)]^2}dx$', '$L = \\int_a^b |f(x)|dx$', '$L = \\int_a^b f\'(x)dx$'],
      answer: 1,
      explanation: '弧长公式：$L = \\int_a^b \\sqrt{1+[f\'(x)]^2}dx$。关键是 $ds = \\sqrt{dx^2+dy^2} = \\sqrt{1+(dy/dx)^2}dx$。注意是 $f\'(x)$ 的平方，不是 $f(x)$ 的平方。'
    },
    {
      question: '极坐标下面积公式 $S = \\frac{1}{2}\\int_\\alpha^\\beta r^2(\\theta)d\\theta$ 中，$\\frac{1}{2}$ 容易遗忘，原因是？',
      options: ['公式推导错误', '扇形面积公式 $\\frac{1}{2}r^2\\theta$ 本身就含 $\\frac{1}{2}$', '极坐标比直角坐标小一半', '是人为规定的'],
      answer: 1,
      explanation: '极坐标面积微元是小扇形：$dS = \\frac{1}{2}r^2 d\\theta$，来自"扇形面积 = $\\frac{1}{2} \\times$ 弧长 $\\times$ 半径 = $\\frac{1}{2}r^2 d\\theta$"。这个 $\\frac{1}{2}$ 是扇形面积公式的固有因子。'
    },
  ],

  'hm-08': [
    {
      question: '微分方程 $y\' + P(x)y = Q(x)$ 的类型是？',
      options: ['可分离变量方程', '齐次方程', '一阶线性微分方程', '伯努利方程'],
      answer: 2,
      explanation: '$y\' + P(x)y = Q(x)$ 是一阶线性微分方程的标准形式。"线性"指 $y$ 和 $y\'$ 都是一次的，没有 $y^2$、$yy\'$ 等非线性项。通解公式可直接套用。'
    },
    {
      question: '二阶常系数齐次方程 $y\'\'+py\'+qy=0$ 的特征方程是？',
      options: ['$r^2+pr+q=0$', '$r^2+p=0$', '$r^2+q=0$', '$r+pq=0$'],
      answer: 0,
      explanation: '令 $y=e^{rx}$ 代入方程，消去 $e^{rx}$（不为零）得到特征方程 $r^2+pr+q=0$。特征根决定通解形式：两个不等实根→指数叠加，重根→$(C_1+C_2x)e^{rx}$，复根→指数乘三角函数。'
    },
    {
      question: '特征方程有重根 $r_1=r_2=r$ 时，通解是？',
      options: ['$y = C_1 e^{rx} + C_2 e^{rx}$', '$y = (C_1 + C_2 x)e^{rx}$', '$y = C_1 e^{rx}$', '$y = C_1 x e^{rx}$'],
      answer: 1,
      explanation: '重根时两个线性无关解是 $e^{rx}$ 和 $xe^{rx}$，所以通解 $y = (C_1+C_2x)e^{rx}$。注意不能写成 $C_1 e^{rx} + C_2 e^{rx}$（只有一个独立常数），也不能漏掉 $x$ 因子。'
    },
    {
      question: '特征方程有共轭复根 $r = \\alpha \\pm \\beta i$ 时，实数形式的通解是？',
      options: ['$y = e^{\\alpha x}(C_1 \\cos\\beta x + C_2 \\sin\\beta x)$', '$y = C_1 e^{\\alpha x} + C_2 e^{\\beta x}$', '$y = C_1 e^{(\\alpha+\\beta i)x} + C_2 e^{(\\alpha-\\beta i)x}$', '$y = \\cos\\beta x + \\sin\\beta x$'],
      answer: 0,
      explanation: '复根时用欧拉公式将复指数化为三角函数，得到实数形式通解 $y = e^{\\alpha x}(C_1\\cos\\beta x + C_2\\sin\\beta x)$。$e^{\\alpha x}$ 是振幅包络，$\\cos\\beta x$ 和 $\\sin\\beta x$ 是振荡项。'
    },
    {
      question: '$y\' + 2y = 4$ 的通解是？',
      options: ['$y = Ce^{-2x} + 2$', '$y = Ce^{2x} + 2$', '$y = Ce^{-2x}$', '$y = Ce^{-2x} + 4$'],
      answer: 0,
      explanation: '这是一阶线性方程。齐次通解 $y_h = Ce^{-2x}$，特解设 $y_p = a$（常数），代入得 $2a = 4$，$a = 2$。通解 $y = Ce^{-2x} + 2$。特解也可直接观察：$y=2$ 时 $y\'=0$，$0+2\\times2=4$ 成立。'
    },
    {
      question: '待定系数法中，若 $f(x) = e^{\\alpha x}$ 且 $\\alpha$ 是特征方程的单根，特解应设为？',
      options: ['$y_p = Ae^{\\alpha x}$', '$y_p = Axe^{\\alpha x}$', '$y_p = Ax^2 e^{\\alpha x}$', '$y_p = A$'],
      answer: 1,
      explanation: '当 $f(x)$ 的指数 $\\alpha$ 是特征方程的单根时，标准特解 $Ae^{\\alpha x}$ 与齐次解重合，需要乘以 $x$ 修正：$y_p = Axe^{\\alpha x}$。若是重根则乘 $x^2$。这个"升幂修正"规则是待定系数法的关键。'
    },
  ],

  'hm-09': [
    {
      question: '多元函数 $f(x,y)$ 在 $(x_0,y_0)$ 处偏导数 $f_x$ 存在，意味着？',
      options: ['$f$ 在该点连续', '$f$ 在该点可微', '固定 $y=y_0$ 后 $f(x,y_0)$ 对 $x$ 可导', '$f_y$ 也一定存在'],
      answer: 2,
      explanation: '偏导数 $f_x(x_0,y_0)$ 的定义就是固定 $y=y_0$ 后，一元函数 $g(x) = f(x,y_0)$ 在 $x_0$ 处的导数。偏导存在不能推出连续、可微或其他偏导存在。'
    },
    {
      question: '以下哪个条件能推出 $f(x,y)$ 在 $(x_0,y_0)$ 可微？',
      options: ['$f_x$ 和 $f_y$ 都存在', '$f$ 连续', '$f_x$ 和 $f_y$ 都连续', '$f$ 有极限'],
      answer: 2,
      explanation: '偏导连续是可微的充分条件。关系链：偏导连续 $\\Rightarrow$ 可微 $\\Rightarrow$ 连续，可微 $\\Rightarrow$ 偏导存在。但箭头不能反过来！偏导存在或连续都不能单独推出可微。'
    },
    {
      question: '$z = f(u,v)$，$u = \\varphi(x,y)$，$v = \\psi(x,y)$，则 $\\frac{\\partial z}{\\partial x}$ 等于？',
      options: ['$\\frac{\\partial z}{\\partial u} + \\frac{\\partial z}{\\partial v}$', '$\\frac{\\partial z}{\\partial u}\\frac{\\partial u}{\\partial x} + \\frac{\\partial z}{\\partial v}\\frac{\\partial v}{\\partial x}$', '$\\frac{\\partial z}{\\partial u}\\frac{\\partial u}{\\partial x}$', '$\\frac{\\partial z}{\\partial v}\\frac{\\partial v}{\\partial x}$'],
      answer: 1,
      explanation: '这是链式法则：$z$ 对 $x$ 的偏导等于所有中间变量路径的贡献之和。每条路径的贡献 = 沿路径的偏导之积。$z$ 到 $x$ 有两条路：$z \\to u \\to x$ 和 $z \\to v \\to x$。'
    },
    {
      question: '由 $F(x,y) = 0$ 确定的隐函数 $y = y(x)$，$\\frac{dy}{dx}$ 等于？',
      options: ['$\\frac{F_x}{F_y}$', '$-\\frac{F_x}{F_y}$', '$\\frac{F_y}{F_x}$', '$-\\frac{F_y}{F_x}$'],
      answer: 1,
      explanation: '隐函数求导公式：$\\frac{dy}{dx} = -\\frac{F_x}{F_y}$。记忆口诀："偏谁除以偏谁，前面加负号"。注意是 $F$ 对 $x$ 的偏导除以 $F$ 对 $y$ 的偏导，不是反过来。'
    },
    {
      question: '梯度 $\\nabla f$ 的方向是？',
      options: ['函数值减小最快的方向', '函数值增长最快的方向', '等值线的切线方向', '任意方向'],
      answer: 1,
      explanation: '梯度方向是函数值增长最快的方向，梯度的模 $|\\nabla f|$ 是最大方向导数。梯度垂直于等值线，指向函数值增大的一侧。负梯度方向是下降最快的方向（梯度下降法的基础）。'
    },
    {
      question: '以下关于连续、可微、偏导存在的关系，正确的是？',
      options: ['可微 $\\Rightarrow$ 连续 $\\Rightarrow$ 偏导存在', '偏导存在 $\\Rightarrow$ 可微 $\\Rightarrow$ 连续', '可微 $\\Rightarrow$ 偏导存在 $\\Rightarrow$ 连续', '连续 $\\Rightarrow$ 偏导存在 $\\Rightarrow$ 可微'],
      answer: 0,
      explanation: '正确关系链：可微 $\\Rightarrow$ 连续，可微 $\\Rightarrow$ 偏导存在。但偏导存在 $\\not\\Rightarrow$ 可微，连续 $\\not\\Rightarrow$ 偏导存在。这是选择题高频考点，记住"可微是最强的条件"。'
    },
  ],

  'hm-10': [
    {
      question: '无条件极值的必要条件是？',
      options: ['$f_x = f_y = 0$', '$f_{xx} = f_{yy} = 0$', '$f_{xy} = 0$', '$\\Delta = AC - B^2 = 0$'],
      answer: 0,
      explanation: '极值点处偏导必须为零（驻点）。但驻点不一定是极值（如鞍点）。充分条件需要进一步用二阶偏导判别：$\\Delta = AC - B^2 > 0$ 且 $A > 0$ 为极小，$A < 0$ 为极大。'
    },
    {
      question: '$\\Delta = AC - B^2 < 0$ 时，驻点是？',
      options: ['极大值点', '极小值点', '鞍点（不是极值点）', '无法判断'],
      answer: 2,
      explanation: '$\\Delta < 0$ 说明在某个方向是极大，另一个方向是极小，形状像马鞍，称为鞍点。鞍点不是极值点——它在某些方向上函数值比周围大，在另一些方向上比周围小。'
    },
    {
      question: '拉格朗日乘数法求 $f(x,y)$ 在约束 $\\varphi(x,y)=0$ 下的极值，构造的函数是？',
      options: ['$L = f + \\varphi$', '$L = f + \\lambda\\varphi$', '$L = f \\cdot \\varphi$', '$L = f - \\lambda\\varphi$'],
      answer: 1,
      explanation: '拉格朗日函数 $L = f + \\lambda\\varphi$，其中 $\\lambda$ 是拉格朗日乘子。令 $L_x = L_y = L_\\lambda = 0$ 解方程组。每个约束条件对应一个乘子。'
    },
    {
      question: '拉格朗日乘数法的几何意义是？',
      options: ['目标函数梯度为零', '目标函数梯度与约束曲面法向量平行', '约束曲面梯度为零', '目标函数与约束相切'],
      answer: 1,
      explanation: '极值点处 $\\nabla f = -\\lambda \\nabla \\varphi$，即目标函数梯度与约束曲面法向量平行。这意味着沿约束曲面的任意方向，目标函数的变化率为零（达到极值）。'
    },
    {
      question: '求 $f(x,y) = x^2 + y^2$ 在约束 $x + y = 1$ 下的最小值，结果是？',
      options: ['$\\frac{1}{2}$', '$1$', '$\\frac{1}{4}$', '$2$'],
      answer: 0,
      explanation: '$L = x^2+y^2+\\lambda(x+y-1)$，$L_x=2x+\\lambda=0$，$L_y=2y+\\lambda=0$，得 $x=y$。代入约束 $2x=1$，$x=y=\\frac{1}{2}$。最小值 $f = \\frac{1}{4}+\\frac{1}{4} = \\frac{1}{2}$。几何意义：原点到直线 $x+y=1$ 的最短距离的平方。'
    },
  ],

  'hm-11': [
    {
      question: '二重积分 $\\iint_D f(x,y)d\\sigma$ 的几何意义是？',
      options: ['区域 D 的面积', '曲顶柱体的体积', '曲线的长度', '函数的最大值'],
      answer: 1,
      explanation: '二重积分表示以 $D$ 为底、$z=f(x,y)$ 为顶的曲顶柱体体积。当 $f=1$ 时积分值等于区域面积，当 $f=\\rho$（密度）时积分值等于质量。'
    },
    {
      question: 'X 型区域（先 y 后 x）的积分次序是？',
      options: ['$\\int dx \\int f\\,dy$', '$\\int dy \\int f\\,dx$', '$\\int f\\,dx$', '$\\int f\\,dy$'],
      answer: 0,
      explanation: 'X 型区域：先对 $y$ 积分（内层），$y$ 的积分限是 $x$ 的函数；再对 $x$ 积分（外层），$x$ 的积分限是常数。$\\int_a^b dx \\int_{\\varphi_1(x)}^{\\varphi_2(x)} f(x,y)dy$。'
    },
    {
      question: '极坐标下二重积分的面积元素 $d\\sigma$ 是？',
      options: ['$dr\\,d\\theta$', '$r\\,dr\\,d\\theta$', '$r^2\\,dr\\,d\\theta$', '$\\frac{1}{2}r\\,dr\\,d\\theta$'],
      answer: 1,
      explanation: '极坐标面积元素 $d\\sigma = r\\,dr\\,d\\theta$，多了一个 $r$ 因子！这是最容易漏掉的。推导：小扇形面积 = 弧长 $\\times$ 径向宽 = $r\\,d\\theta \\times dr$。'
    },
    {
      question: '交换积分次序 $\\int_0^1 dx \\int_x^1 f(x,y)dy$ 后，结果是？',
      options: ['$\\int_0^1 dy \\int_0^y f(x,y)dx$', '$\\int_0^1 dy \\int_y^1 f(x,y)dx$', '$\\int_0^1 dy \\int_0^1 f(x,y)dx$', '$\\int_0^1 dx \\int_0^x f(x,y)dy$'],
      answer: 0,
      explanation: '原积分：$0 \\le x \\le 1$，$x \\le y \\le 1$。画出区域：三角形，$y=x$ 下方、$y=1$ 上方。交换后：$0 \\le y \\le 1$，$0 \\le x \\le y$。所以 $\\int_0^1 dy \\int_0^y f(x,y)dx$。'
    },
    {
      question: '若 $D$ 关于 $x$ 轴对称，$f(x,-y) = -f(x,y)$（关于 $y$ 是奇函数），则 $\\iint_D f\\,d\\sigma$ 等于？',
      options: ['$2\\iint_{D_1} f\\,d\\sigma$（$D_1$ 是上半部分）', '$0$', '$\\iint_D |f|\\,d\\sigma$', '无法确定'],
      answer: 1,
      explanation: '区域对称 + 被积函数是奇函数 = 积分为零。这是简化计算的利器：先检查对称性和奇偶性，可能直接得出结果而无需计算。'
    },
    {
      question: '计算 $\\iint_D (x^2+y^2)d\\sigma$，$D: x^2+y^2 \\le 1$，最方便的坐标是？',
      options: ['直角坐标', '极坐标', '柱坐标', '球坐标'],
      answer: 1,
      explanation: '积分区域是圆，被积函数含 $x^2+y^2$，用极坐标最方便：$x^2+y^2 = r^2$，$d\\sigma = r\\,dr\\,d\\theta$。原式 $= \\int_0^{2\\pi}d\\theta \\int_0^1 r^2 \\cdot r\\,dr = 2\\pi \\cdot \\frac{1}{4} = \\frac{\\pi}{2}$。'
    },
  ],

  'hm-12': [
    {
      question: '柱坐标 $(r,\\theta,z)$ 与直角坐标的关系是？',
      options: ['$x=r\\cos\\theta, y=r\\sin\\theta, z=z$', '$x=r\\sin\\theta, y=r\\cos\\theta, z=z$', '$x=r\\cos\\theta, y=z\\sin\\theta, z=r$', '$x=z\\cos\\theta, y=z\\sin\\theta, z=r$'],
      answer: 0,
      explanation: '柱坐标就是在极坐标基础上加 $z$：$x=r\\cos\\theta$，$y=r\\sin\\theta$，$z=z$。体积元素 $dV = r\\,dr\\,d\\theta\\,dz$。适用场景：圆柱形区域或被积函数含 $x^2+y^2$。'
    },
    {
      question: '球坐标 $(r,\\varphi,\\theta)$ 中 $\\varphi$ 的范围是？',
      options: ['$[0, 2\\pi]$', '$[0, \\pi]$', '$[-\\pi, \\pi]$', '$[0, \\pi/2]$'],
      answer: 1,
      explanation: '$\\varphi$ 是从正 $z$ 轴量起的"余纬度"，范围 $[0, \\pi]$。$\\theta$ 是绕 $z$ 轴的方位角，范围 $[0, 2\\pi]$。$\\varphi$ 不是纬度（纬度从赤道量起），这是最容易搞混的。'
    },
    {
      question: '球坐标的体积元素 $dV$ 是？',
      options: ['$dr\\,d\\varphi\\,d\\theta$', '$r\\,dr\\,d\\varphi\\,d\\theta$', '$r^2\\sin\\varphi\\,dr\\,d\\varphi\\,d\\theta$', '$r^2\\,dr\\,d\\varphi\\,d\\theta$'],
      answer: 2,
      explanation: '球坐标体积元素 $dV = r^2\\sin\\varphi\\,dr\\,d\\varphi\\,d\\theta$。$r^2$ 来自径向，$\\sin\\varphi$ 来自纬度方向。漏掉 $\\sin\\varphi$ 是常见错误。'
    },
    {
      question: '计算球体 $x^2+y^2+z^2 \\le R^2$ 的体积，最方便的方法是？',
      options: ['直角坐标三重积分', '柱坐标', '球坐标', '二重积分'],
      answer: 2,
      explanation: '球体用球坐标最简单：$V = \\int_0^{2\\pi}d\\theta \\int_0^\\pi \\sin\\varphi\\,d\\varphi \\int_0^R r^2\\,dr = 2\\pi \\cdot 2 \\cdot \\frac{R^3}{3} = \\frac{4}{3}\\pi R^3$。'
    },
    {
      question: '含参变量积分 $F(t) = \\int_a^b f(x,t)dx$ 对 $t$ 求导的公式是？',
      options: ['$F\'(t) = \\int_a^b \\frac{\\partial f}{\\partial t}dx$', '$F\'(t) = f(b,t) - f(a,t)$', '$F\'(t) = \\int_a^b f(x,t)dx$', '$F\'(t) = 0$'],
      answer: 0,
      explanation: '莱布尼茨公式（积分限为常数时）：$F\'(t) = \\int_a^b \\frac{\\partial f}{\\partial t}dx$。可以在积分号下对参数求导，条件是 $f$ 和 $f_t$ 都连续。'
    },
  ],

  'hm-13': [
    {
      question: '第一类曲线积分 $\\int_L f\\,ds$ 与曲线方向的关系是？',
      options: ['方向反则积分变号', '与方向无关', '只与起点有关', '只与终点有关'],
      answer: 1,
      explanation: '第一类曲线积分（对弧长）与方向无关：$\\int_L f\\,ds = \\int_{-L} f\\,ds$。因为 $ds$ 是弧长微元（恒正），不带方向信息。第二类曲线积分（对坐标）才与方向有关。'
    },
    {
      question: '格林公式 $\\oint_L P\\,dx + Q\\,dy = \\iint_D (?)\\,d\\sigma$ 中，问号处是？',
      options: ['$\\frac{\\partial P}{\\partial x} + \\frac{\\partial Q}{\\partial y}$', '$\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}$', '$\\frac{\\partial P}{\\partial y} - \\frac{\\partial Q}{\\partial x}$', '$\\frac{\\partial P}{\\partial x} - \\frac{\\partial Q}{\\partial y}$'],
      answer: 1,
      explanation: '格林公式：$\\oint_L P\\,dx + Q\\,dy = \\iint_D (\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y})d\\sigma$。记忆：$Q$ 对 $x$ 减 $P$ 对 $y$，顺序是交叉的。'
    },
    {
      question: '曲线积分与路径无关的条件是？',
      options: ['$P = Q$', '$\\frac{\\partial P}{\\partial x} = \\frac{\\partial Q}{\\partial y}$', '$\\frac{\\partial Q}{\\partial x} = \\frac{\\partial P}{\\partial y}$', '$P_x = Q_x$'],
      answer: 2,
      explanation: '在单连通区域内，$\\int_L P\\,dx+Q\\,dy$ 与路径无关 $\\Leftrightarrow$ $\\frac{\\partial Q}{\\partial x} = \\frac{\\partial P}{\\partial y}$。这个条件也意味着 $P\\,dx+Q\\,dy$ 是某个函数的全微分。'
    },
    {
      question: '格林公式中 $L$ 的正方向是？',
      options: ['顺时针', '逆时针', '任意方向', '从左到右'],
      answer: 1,
      explanation: '格林公式要求 $L$ 是区域 $D$ 的正向边界——逆时针方向（人沿 $L$ 走，区域 $D$ 在左手边）。若 $L$ 顺时针，公式右边要加负号。'
    },
    {
      question: '第二类曲线积分 $\\int_L P\\,dx + Q\\,dy$ 的物理意义是？',
      options: ['曲线的质量', '力沿曲线做的功', '曲线的面积', '曲线的长度'],
      answer: 1,
      explanation: '设力 $\\vec{F} = (P, Q)$，沿曲线 $L$ 移动做的功 $W = \\int_L \\vec{F} \\cdot d\\vec{r} = \\int_L P\\,dx + Q\\,dy$。这是第二类曲线积分的物理背景。'
    },
  ],

  'hm-14': [
    {
      question: '第一类曲面积分 $\\iint_\\Sigma f\\,dS$ 与曲面侧的关系是？',
      options: ['改变侧则积分变号', '与侧无关', '只与面积有关', '只与法向量有关'],
      answer: 1,
      explanation: '第一类曲面积分（对面积）与曲面的侧无关，因为 $dS$ 是面积微元（恒正）。第二类曲面积分（对坐标）才与侧有关——改变侧意味着法向量反向，积分变号。'
    },
    {
      question: '高斯公式将闭曲面积分转化为？',
      options: ['曲线积分', '二重积分', '三重积分', '定积分'],
      answer: 2,
      explanation: '高斯公式：$\\oiint_\\Sigma P\\,dy\\,dz + Q\\,dz\\,dx + R\\,dx\\,dy = \\iiint_\\Omega (P_x + Q_y + R_z)dV$。闭曲面上的通量 = 体积内的散度积分。物理意义：穿过闭曲面的净通量等于内部"源"的总量。'
    },
    {
      question: '高斯公式中，$\\Sigma$ 的方向要求是？',
      options: ['任意方向', '内侧', '外侧', '上侧'],
      answer: 2,
      explanation: '高斯公式要求 $\\Sigma$ 取外侧（法向量指向 $\\Omega$ 外部）。这是物理上"净通量"的自然约定——向外为正。若取内侧，公式右边要加负号。'
    },
    {
      question: '散度 $\\text{div}\\,\\vec{F} = \\nabla \\cdot \\vec{F}$ 等于？',
      options: ['$P_x + Q_y + R_z$', '$P_x - Q_y + R_z$', '$P + Q + R$', '$P_x Q_y R_z$'],
      answer: 0,
      explanation: '散度是标量：$\\text{div}\\,\\vec{F} = \\frac{\\partial P}{\\partial x} + \\frac{\\partial Q}{\\partial y} + \\frac{\\partial R}{\\partial z}$。散度 > 0 表示"源"（流出多），散度 < 0 表示"汇"（流入多），散度 = 0 表示无源场。'
    },
    {
      question: '斯托克斯公式建立了什么之间的联系？',
      options: ['曲面积分与三重积分', '曲线积分与曲面积分', '二重积分与三重积分', '定积分与曲线积分'],
      answer: 1,
      explanation: '斯托克斯公式：$\\oint_L \\vec{F} \\cdot d\\vec{r} = \\iint_\\Sigma (\\nabla \\times \\vec{F}) \\cdot d\\vec{S}$。空间曲线积分 = 旋度的面积分。$L$ 是 $\\Sigma$ 的边界，方向与法向量满足右手定则。'
    },
  ],

  'hm-15': [
    {
      question: '级数 $\\sum a_n$ 收敛的必要条件是？',
      options: ['$a_n > 0$', '$\\lim_{n\\to\\infty} a_n = 0$', '$a_n$ 单调递减', '$\\sum |a_n|$ 收敛'],
      answer: 1,
      explanation: '收敛 $\\Rightarrow$ $\\lim a_n = 0$，但反过来不成立！调和级数 $\\sum \\frac{1}{n}$ 通项趋于 0 但发散。$\\lim a_n = 0$ 只是必要条件，不是充分条件。'
    },
    {
      question: '比值判别法中 $\\lim \\frac{a_{n+1}}{a_n} = \\rho$，$\\rho < 1$ 时级数？',
      options: ['收敛', '发散', '不确定', '条件收敛'],
      answer: 0,
      explanation: '比值法（达朗贝尔判别法）：$\\rho < 1$ 收敛，$\\rho > 1$ 发散，$\\rho = 1$ 不确定。含 $n!$ 或 $a^n$ 的级数首选比值法。$\\rho = 1$ 时需换其他方法。'
    },
    {
      question: '幂级数 $\\sum a_n x^n$ 的收敛半径 $R$ 的求法是？',
      options: ['$R = \\lim |\\frac{a_n}{a_{n+1}}|$', '$R = \\lim |a_n|$', '$R = \\lim |\\frac{a_{n+1}}{a_n}|$', '$R = \\frac{1}{\\lim |a_n|}$'],
      answer: 0,
      explanation: '收敛半径 $R = \\lim |\\frac{a_n}{a_{n+1}}|$（比值法）或 $R = \\frac{1}{\\lim \\sqrt[n]{|a_n|}}$（根值法）。注意是 $a_n$ 在上，$a_{n+1}$ 在下，不是反过来。收敛域还要检验端点。'
    },
    {
      question: '$e^x$ 的麦克劳林展开式是？',
      options: ['$\\sum \\frac{x^n}{n}$', '$\\sum \\frac{x^n}{n!}$', '$\\sum \\frac{x^{2n}}{(2n)!}$', '$\\sum (-1)^n \\frac{x^n}{n!}$'],
      answer: 1,
      explanation: '$e^x = \\sum_{n=0}^\\infty \\frac{x^n}{n!} = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots$，收敛域 $(-\\infty, +\\infty)$。这是最基本的展开式，$\\sin x$ 和 $\\cos x$ 的展开可由 $e^{ix}$ 推出。'
    },
    {
      question: '$\\ln(1+x)$ 的麦克劳林展开式及收敛域是？',
      options: ['$\\sum \\frac{x^n}{n}$，$(-1,1)$', '$\\sum \\frac{(-1)^{n-1}x^n}{n}$，$(-1,1]$', '$\\sum \\frac{(-1)^n x^n}{n}$，$[-1,1)$', '$\\sum \\frac{x^n}{n+1}$，$(-1,1)$'],
      answer: 1,
      explanation: '$\\ln(1+x) = \\sum_{n=1}^\\infty \\frac{(-1)^{n-1}x^n}{n} = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\cdots$，收敛域 $(-1, 1]$。注意 $x=1$ 时收敛（交错级数），$x=-1$ 时发散（调和级数）。'
    },
    {
      question: '交错级数 $\\sum (-1)^{n-1} a_n$（$a_n > 0$）收敛的条件是？',
      options: ['$a_n \\to 0$', '$a_n$ 单调递减', '$a_n$ 单调递减且 $\\lim a_n = 0$', '无条件收敛'],
      answer: 2,
      explanation: '莱布尼茨判别法：$a_n$ 单调递减 + $\\lim a_n = 0$ $\\Rightarrow$ 交错级数收敛。两个条件缺一不可。如果 $a_n$ 不单调，即使趋于 0 也可能发散。'
    },
  ],

  'hm-16': [
    {
      question: '傅里叶级数的核心思想是？',
      options: ['用多项式逼近函数', '用三角函数（正弦/余弦）逼近周期函数', '用指数函数逼近函数', '用分段线性逼近函数'],
      answer: 1,
      explanation: '傅里叶级数将周期函数分解为一系列正弦和余弦函数的叠加：$f(x) \\sim \\frac{a_0}{2} + \\sum (a_n\\cos nx + b_n\\sin nx)$。这在信号处理中表示：任何信号都可分解为不同频率的正弦波。'
    },
    {
      question: '偶函数 $f(-x) = f(x)$ 的傅里叶级数特点是？',
      options: ['只有正弦项', '只有余弦项', '正弦余弦都有', '只有常数项'],
      answer: 1,
      explanation: '偶函数的 $b_n = 0$（因为 $f(x)\\sin nx$ 是奇函数，积分在对称区间为 0），所以只有余弦级数。类似地，奇函数只有正弦级数。利用奇偶性可只算一半系数。'
    },
    {
      question: '狄利克雷收敛定理要求函数满足的条件是？',
      options: ['处处连续', '无穷次可微', '有限个第一类间断点 + 有限个极值点', '可积'],
      answer: 2,
      explanation: '狄利克雷条件：① 连续或只有有限个第一类间断点；② 只有有限个极值点。满足时傅里叶级数收敛：连续点收敛到函数值，间断点收敛到左右极限的平均值。'
    },
    {
      question: '傅里叶系数 $a_n$ 的计算公式中，积分区间是？',
      options: ['$[0, 2\\pi]$', '$[-\\pi, \\pi]$', '$[0, \\pi]$', '$[-1, 1]$'],
      answer: 1,
      explanation: '周期为 $2\\pi$ 的傅里叶系数：$a_n = \\frac{1}{\\pi}\\int_{-\\pi}^\\pi f(x)\\cos nx\\,dx$，$b_n = \\frac{1}{\\pi}\\int_{-\\pi}^\\pi f(x)\\sin nx\\,dx$。积分区间是一个完整的周期 $[-\\pi, \\pi]$。'
    },
    {
      question: '傅里叶级数在间断点处收敛到？',
      options: ['函数值 $f(x_0)$', '左极限 $f(x_0^-)$', '右极限 $f(x_0^+)$', '左右极限的平均值 $\\frac{f(x_0^-)+f(x_0^+)}{2}$'],
      answer: 3,
      explanation: '傅里叶级数在间断点处收敛到左右极限的平均值，而不是函数值本身。这是傅里叶级数的特殊性质——它"看到"的是函数的极限行为，而非单点的值。'
    },
    {
      question: '帕塞瓦尔等式的物理意义是？',
      options: ['能量守恒', '信号的总能量等于各频率分量能量之和', '频率不变', '相位不变'],
      answer: 1,
      explanation: '帕塞瓦尔等式：$\\frac{1}{\\pi}\\int_{-\\pi}^\\pi [f(x)]^2 dx = \\frac{a_0^2}{2} + \\sum (a_n^2 + b_n^2)$。左边是信号总能量，右边是各频率分量能量之和。这说明信号分解不改变总能量。'
    },
  ],

  // ========== 线性代数 la-01~la-10 ==========
  'la-01': [
    {
      question: '二阶行列式 $\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}$ 的值是？',
      options: ['$ab - cd$', '$ad - bc$', '$ac - bd$', '$ad + bc$'],
      answer: 1,
      explanation: '二阶行列式 = 主对角线乘积 - 副对角线乘积：$ad - bc$。这是最基础的计算，三阶及以上用展开定理或化上三角。'
    },
    {
      question: '交换行列式的两行，结果？',
      options: ['不变', '变号', '变为原来的 2 倍', '变为 0'],
      answer: 1,
      explanation: '性质：两行互换，行列式变号。这是行列式的基本性质之一。推论：若有两行相同，交换后行列式变号但值不变，故必为 0。'
    },
    {
      question: '行列式按行展开定理中，$|A| = \\sum_j a_{ij} A_{ij}$，$A_{ij}$ 是？',
      options: ['余子式', '代数余子式', '元素本身', '转置元素'],
      answer: 1,
      explanation: '$A_{ij} = (-1)^{i+j} M_{ij}$ 是代数余子式，其中 $M_{ij}$ 是余子式（删去第 $i$ 行第 $j$ 列后的行列式）。注意符号 $(-1)^{i+j}$，它决定了余子式的正负。'
    },
    {
      question: '上三角行列式的值等于？',
      options: ['所有元素之和', '主对角线元素之积', '副对角线元素之积', '0'],
      answer: 1,
      explanation: '上（下）三角行列式 = 主对角线元素之积。这是计算行列式的核心策略：用初等行变换化为上三角，然后直接相乘。'
    },
    {
      question: '若 $|A| = 0$，则矩阵 $A$？',
      options: ['可逆', '不可逆（奇异）', '是对角矩阵', '是零矩阵'],
      answer: 1,
      explanation: '$|A| = 0$ $\\Leftrightarrow$ $A$ 不可逆（奇异矩阵）。$|A| \\ne 0$ $\\Leftrightarrow$ $A$ 可逆（非奇异）。行列式是否为零是判断可逆性的充要条件。'
    },
    {
      question: '范德蒙行列式的值等于？',
      options: ['$\\prod_{i<j}(x_j - x_i)$', '$\\prod_{i<j}(x_i - x_j)$', '$\\sum x_i$', '$\\prod x_i$'],
      answer: 0,
      explanation: '范德蒙行列式 $V_n = \\prod_{1 \\le i < j \\le n}(x_j - x_i)$，即所有可能的"后减前"之积。当有两列相同时（某 $x_i = x_j$），行列式为 0。'
    },
  ],

  'la-02': [
    {
      question: '矩阵乘法 $AB$ 的 $(i,j)$ 元素等于？',
      options: ['$a_{ij} b_{ij}$', '$\\sum_k a_{ik} b_{kj}$', '$\\sum_k a_{ki} b_{jk}$', '$a_{i1} b_{1j}$'],
      answer: 1,
      explanation: '矩阵乘法：$(AB)_{ij} = \\sum_k a_{ik}b_{kj}$，即 $A$ 的第 $i$ 行与 $B$ 的第 $j$ 列的内积。注意不是对应元素相乘（那是 Hadamard 积）。'
    },
    {
      question: '矩阵乘法满足交换律吗？',
      options: ['满足', '不满足，一般 $AB \\ne BA$', '只对对称矩阵满足', '只对可逆矩阵满足'],
      answer: 1,
      explanation: '矩阵乘法不满足交换律！$AB \\ne BA$ 一般成立。即使 $AB$ 和 $BA$ 都有定义，它们的阶数可能不同，值也可能不同。这是矩阵与数的根本区别。'
    },
    {
      question: '$A$ 可逆的充要条件是？',
      options: ['$A = A^T$', '$|A| \\ne 0$', '$A$ 是对称矩阵', '$A$ 的元素全非零'],
      answer: 1,
      explanation: '$A$ 可逆 $\\Leftrightarrow$ $|A| \\ne 0$ $\\Leftrightarrow$ $\\text{rank}(A) = n$ $\\Leftrightarrow$ $Ax=0$ 只有零解 $\\Leftrightarrow$ $A$ 的列向量线性无关。这些条件彼此等价。'
    },
    {
      question: '$(AB)^{-1}$ 等于？',
      options: ['$A^{-1}B^{-1}$', '$B^{-1}A^{-1}$', '$(BA)^{-1}$', '$AB$'],
      answer: 1,
      explanation: '逆矩阵的"穿脱规则"：$(AB)^{-1} = B^{-1}A^{-1}$，顺序反转！类比穿衣服：先穿袜子后穿鞋，脱的时候先脱鞋后脱袜子。'
    },
    {
      question: '伴随矩阵 $A^*$ 的 $(i,j)$ 元素是？',
      options: ['$A_{ij}$（代数余子式）', '$A_{ji}$（转置位置的代数余子式）', '$M_{ij}$（余子式）', '$a_{ij}$（原元素）'],
      answer: 1,
      explanation: '$A^*$ 是代数余子式矩阵的转置：$(A^*)_{ij} = A_{ji}$。注意转置！$A^*$ 的第 $i$ 行第 $j$ 列是 $A$ 的第 $j$ 行第 $i$ 列的代数余子式。'
    },
    {
      question: '$AA^*$ 等于？',
      options: ['$E$', '$|A|E$', '$A$', '$A^T$'],
      answer: 1,
      explanation: '核心公式：$AA^* = A^*A = |A|E$。当 $|A| \\ne 0$ 时，$A^{-1} = \\frac{1}{|A|}A^*$。这是伴随矩阵法求逆的理论基础。'
    },
  ],

  'la-03': [
    {
      question: '矩阵的秩等于？',
      options: ['非零元素的个数', '非零子式的最高阶数', '行数', '列数'],
      answer: 1,
      explanation: '秩 = 非零子式的最高阶数 = 行阶梯形中非零行的个数。秩反映矩阵"有效信息"的维数。满秩意味着没有冗余。'
    },
    {
      question: '初等行变换不改变矩阵的什么？',
      options: ['元素', '行列式', '秩', '形状'],
      answer: 2,
      explanation: '初等行变换不改变矩阵的秩（也不改变行空间）。但会改变行列式的值（行互换变号，数乘扩大）。这是用行变换求秩的理论基础。'
    },
    {
      question: '$m \\times n$ 矩阵 $A$ 的秩的范围是？',
      options: ['$[1, n]$', '$[0, m]$', '$[0, \\min(m,n)]$', '$[1, \\min(m,n)]$'],
      answer: 2,
      explanation: '$0 \\le \\text{rank}(A) \\le \\min(m, n)$。秩为 0 只有零矩阵；秩为 $\\min(m,n)$ 称为满秩。秩不可能超过行数或列数。'
    },
    {
      question: '$\\text{rank}(AB)$ 与 $\\text{rank}(A)$、$\\text{rank}(B)$ 的关系是？',
      options: ['$\\text{rank}(AB) = \\text{rank}(A) + \\text{rank}(B)$', '$\\text{rank}(AB) \\le \\min(\\text{rank}(A), \\text{rank}(B))$', '$\\text{rank}(AB) = \\text{rank}(A) \\cdot \\text{rank}(B)$', '$\\text{rank}(AB) \\ge \\text{rank}(A)$'],
      answer: 1,
      explanation: '乘积的秩不超过各因子的秩：$\\text{rank}(AB) \\le \\min(\\text{rank}(A), \\text{rank}(B))$。这说明矩阵乘法不会增加"有效信息"，只能保持或减少。'
    },
    {
      question: '行最简形矩阵的特点是？',
      options: ['只有对角线非零', '主元为 1，主元所在列其他元素为 0', '所有元素为 0 或 1', '是上三角矩阵'],
      answer: 1,
      explanation: '行最简形：① 是行阶梯形；② 每个主元（每行首个非零元）为 1；③ 主元所在列的其他元素全为 0。行最简形是唯一的，可用于求解线性方程组。'
    },
    {
      question: '若 $P$ 可逆，则 $\\text{rank}(PA)$ 等于？',
      options: ['$\\text{rank}(A) + 1$', '$\\text{rank}(A) - 1$', '$\\text{rank}(A)$', '0'],
      answer: 2,
      explanation: '可逆矩阵乘不改变秩：$\\text{rank}(PA) = \\text{rank}(A)$。因为可逆矩阵可以表示为初等矩阵的乘积，而初等变换不改变秩。'
    },
  ],

  'la-04': [
    {
      question: '$Ax = 0$ 有非零解的充要条件是？',
      options: ['$|A| \\ne 0$', '$\\text{rank}(A) < n$（$n$ 为未知数个数）', '$\\text{rank}(A) = n$', '$A$ 是零矩阵'],
      answer: 1,
      explanation: '$Ax=0$ 有非零解 $\\Leftrightarrow$ $\\text{rank}(A) < n$ $\\Leftrightarrow$ $|A| = 0$（方阵时）。解空间维数 = $n - \\text{rank}(A)$，即自由变量的个数。'
    },
    {
      question: '$Ax = b$ 有解的充要条件是？',
      options: ['$|A| \\ne 0$', '$\\text{rank}(A) = \\text{rank}(\\bar{A})$', '$\\text{rank}(A) = n$', '$b \\ne 0$'],
      answer: 1,
      explanation: '$Ax=b$ 有解 $\\Leftrightarrow$ $\\text{rank}(A) = \\text{rank}(\\bar{A})$（$\\bar{A}$ 是增广矩阵）。若秩不等，说明 $b$ 不能由 $A$ 的列向量线性表示，方程组无解。'
    },
    {
      question: '$Ax = b$ 有无穷多解的条件是？',
      options: ['$\\text{rank}(A) < \\text{rank}(\\bar{A})$', '$\\text{rank}(A) = \\text{rank}(\\bar{A}) = n$', '$\\text{rank}(A) = \\text{rank}(\\bar{A}) < n$', '$|A| = 0$'],
      answer: 2,
      explanation: '有解（秩相等）且秩小于未知数个数（有自由变量）$\\Rightarrow$ 无穷多解。自由变量可以任意取值，每取一组值就得到一个特解。'
    },
    {
      question: '$Ax = b$ 的通解结构是？',
      options: ['$Ax = b$ 的特解', '$Ax = 0$ 的通解', '特解 + 齐次通解', '齐次通解 - 特解'],
      answer: 2,
      explanation: '非齐次方程通解 = 一个特解 $x^*$ + 齐次方程通解 $c_1\\xi_1 + \\cdots + c_{n-r}\\xi_{n-r}$。这不是简单的"加"，而是解空间的平移结构。'
    },
    {
      question: '$Ax = 0$ 的基础解系含几个向量？',
      options: ['$\\text{rank}(A)$', '$n - \\text{rank}(A)$', '$n$', '$m$'],
      answer: 1,
      explanation: '基础解系含 $n - r$ 个线性无关的解向量，其中 $n$ 是未知数个数，$r = \\text{rank}(A)$。这些向量张成解空间，解空间维数 = $n - r$。'
    },
    {
      question: '三句话判断 $Ax=b$ 解的情况，正确的是？',
      options: ['秩等唯一，秩不等无穷', '秩等无穷，秩不等唯一', '秩等且等于 $n$ 唯一，秩等但小于 $n$ 无穷，秩不等无解', '秩不等唯一，秩等无解'],
      answer: 2,
      explanation: '三句话：① 无解 = 秩不等；② 唯一解 = 秩等且等于 $n$；③ 无穷多解 = 秩等但小于 $n$。记住这三句话，选择题秒杀。'
    },
  ],

  'la-05': [
    {
      question: '向量组 $\\alpha_1, \\alpha_2, \\alpha_3$ 线性相关的定义是？',
      options: ['$\\alpha_1 + \\alpha_2 + \\alpha_3 = 0$', '存在不全为零的 $k_1, k_2, k_3$ 使 $k_1\\alpha_1 + k_2\\alpha_2 + k_3\\alpha_3 = 0$', '$\\alpha_1 = \\alpha_2 = \\alpha_3$', '任意 $k_1, k_2, k_3$ 都使上式为零'],
      answer: 1,
      explanation: '线性相关：存在不全为零的系数使线性组合为零向量。线性无关：只有全零系数才能使线性组合为零。注意"不全为零"，不是"全不为零"。'
    },
    {
      question: '含零向量的向量组一定？',
      options: ['线性无关', '线性相关', '无法判断', '秩为 0'],
      answer: 1,
      explanation: '含零向量一定线性相关。因为可取 $k_1=1$（对应零向量的系数），其余 $k_i=0$，则 $1 \\cdot 0 + 0 + \\cdots + 0 = 0$，系数不全为零。'
    },
    {
      question: '向量组的秩等于？',
      options: ['向量的个数', '极大线性无关组中向量的个数', '向量的维数', '零向量的个数'],
      answer: 1,
      explanation: '向量组的秩 = 极大线性无关组中向量的个数 = 对应矩阵的秩。秩是向量组"本质大小"的度量，与向量个数和维数都不同。'
    },
    {
      question: '两个向量 $\\alpha, \\beta$ 线性相关的充要条件是？',
      options: ['$\\alpha = \\beta$', '$\\alpha = k\\beta$（$k$ 为常数）', '$\\alpha \\perp \\beta$', '$|\\alpha| = |\\beta|$'],
      answer: 1,
      explanation: '两个向量相关 $\\Leftrightarrow$ 对应分量成比例 $\\Leftrightarrow$ 一个可由另一个线性表示（$\\alpha = k\\beta$ 或 $\\beta = k\\alpha$）。三个及以上向量没有这样简单的判定。'
    },
    {
      question: '$n$ 维向量空间中，最多有几个线性无关的向量？',
      options: ['$n-1$', '$n$', '$n+1$', '无穷多'],
      answer: 1,
      explanation: '$n$ 维空间中最多 $n$ 个线性无关的向量（基就有 $n$ 个）。$n+1$ 个 $n$ 维向量一定线性相关。这是向量空间维数的本质含义。'
    },
    {
      question: '向量 $\\beta$ 可由 $\\alpha_1, \\ldots, \\alpha_s$ 线性表示的充要条件是？',
      options: ['$\\beta = 0$', '$\\text{rank}(\\alpha_1, \\ldots, \\alpha_s) = \\text{rank}(\\alpha_1, \\ldots, \\alpha_s, \\beta)$', '$\\text{rank}(\\alpha_1, \\ldots, \\alpha_s) = s$', '$\\beta$ 与 $\\alpha_i$ 维数相同'],
      answer: 1,
      explanation: '$\\beta$ 可由 $\\alpha_1, \\ldots, \\alpha_s$ 表示 $\\Leftrightarrow$ 方程组 $x_1\\alpha_1 + \\cdots + x_s\\alpha_s = \\beta$ 有解 $\\Leftrightarrow$ 增广矩阵的秩 = 系数矩阵的秩。'
    },
  ],

  'la-06': [
    {
      question: '$Ax = \\lambda x$（$x \\ne 0$）中，$\\lambda$ 是？',
      options: ['特征向量', '特征值', '行列式', '秩'],
      answer: 1,
      explanation: '定义：若 $Ax = \\lambda x$（$x \\ne 0$），则 $\\lambda$ 是 $A$ 的特征值，$x$ 是对应于 $\\lambda$ 的特征向量。特征向量在变换中只被拉伸（乘以 $\\lambda$），不改变方向。'
    },
    {
      question: '求特征值的方程是？',
      options: ['$|A| = 0$', '$|\\lambda E - A| = 0$', '$A - \\lambda E = 0$', '$\\lambda E + A = 0$'],
      answer: 1,
      explanation: '特征方程 $|\\lambda E - A| = 0$（或 $|A - \\lambda E| = 0$，两者等价）。展开得到关于 $\\lambda$ 的 $n$ 次方程，解出所有特征值。'
    },
    {
      question: '矩阵 $A$ 的所有特征值之和等于？',
      options: ['$|A|$', '$\\text{tr}(A)$（迹）', '$\\text{rank}(A)$', '0'],
      answer: 1,
      explanation: '特征值之和 = 迹（主对角线元素之和）：$\\sum \\lambda_i = \\text{tr}(A) = \\sum a_{ii}$。特征值之积 = 行列式：$\\prod \\lambda_i = |A|$。这两个公式常用于选择题。'
    },
    {
      question: '实对称矩阵的特征值一定是？',
      options: ['实数', '复数', '正数', '非负数'],
      answer: 0,
      explanation: '实对称矩阵的特征值都是实数（这是实对称矩阵的重要性质）。一般矩阵的特征值可能是复数。实对称矩阵不同特征值的特征向量还正交。'
    },
    {
      question: '$A^2$ 的特征值与 $A$ 的特征值的关系是？',
      options: ['相同', '平方关系', '开方', '无关'],
      answer: 1,
      explanation: '若 $Ax = \\lambda x$，则 $A^2 x = A(Ax) = A(\\lambda x) = \\lambda(Ax) = \\lambda^2 x$。所以 $A^k$ 的特征值是 $\\lambda^k$，特征向量不变。'
    },
    {
      question: '不同特征值对应的特征向量一定？',
      options: ['相同', '线性相关', '线性无关', '正交'],
      answer: 2,
      explanation: '不同特征值对应的特征向量线性无关。实对称矩阵还有更强的结论：不同特征值的特征向量正交。但一般矩阵的特征向量不一定正交。'
    },
  ],

  'la-07': [
    {
      question: '$A$ 与 $B$ 相似（$A \\sim B$）的定义是？',
      options: ['$A = B$', '存在可逆 $P$ 使 $B = P^{-1}AP$', '$|A| = |B|$', '$A$ 与 $B$ 同阶'],
      answer: 1,
      explanation: '相似：存在可逆矩阵 $P$ 使 $B = P^{-1}AP$。相似矩阵表示同一线性变换在不同基下的矩阵。它们有相同的特征值、行列式、迹、秩。'
    },
    {
      question: '$n$ 阶矩阵 $A$ 可对角化的充要条件是？',
      options: ['$|A| \\ne 0$', '$A$ 有 $n$ 个不同特征值', '$A$ 有 $n$ 个线性无关的特征向量', '$A$ 是实对称矩阵'],
      answer: 2,
      explanation: '可对角化 $\\Leftrightarrow$ 有 $n$ 个线性无关的特征向量。$n$ 个不同特征值是充分条件（非必要），实对称矩阵一定可对角化（也是充分条件）。'
    },
    {
      question: '实对称矩阵一定可以？',
      options: ['对角化', '正交对角化', '不可对角化', '化为上三角'],
      answer: 1,
      explanation: '实对称矩阵一定可以正交对角化：$Q^TAQ = \\Lambda$，其中 $Q$ 是正交矩阵（列向量单位正交）。比一般对角化更强——不仅可对角化，还能用正交变换实现。'
    },
    {
      question: '若 $A$ 可对角化，$A^k$ 等于？',
      options: ['$kA$', '$P\\Lambda^k P^{-1}$', '$\\Lambda^k$', '$A^k$ 无法简化'],
      answer: 1,
      explanation: '$A = P\\Lambda P^{-1}$，则 $A^k = P\\Lambda^k P^{-1}$。对角矩阵的幂只需对角元求幂：$\\Lambda^k = \\text{diag}(\\lambda_1^k, \\ldots, \\lambda_n^k)$。这是对角化最实用的应用。'
    },
    {
      question: '相似矩阵一定相同的量是？',
      options: ['元素', '特征向量', '特征值', '主对角线元素'],
      answer: 2,
      explanation: '相似矩阵有相同的特征值（特征多项式相同）、相同的行列式、相同的迹、相同的秩。但元素和特征向量一般不同（特征向量随基变换）。'
    },
  ],

  'la-08': [
    {
      question: '二次型 $f = x^TAx$ 的矩阵 $A$ 一定是？',
      options: ['对角矩阵', '实对称矩阵', '正交矩阵', '可逆矩阵'],
      answer: 1,
      explanation: '二次型的矩阵必须是实对称矩阵（$A = A^T$）。如果不满足，可以强制对称化：$a_{ij} = \\frac{1}{2}(a_{ij} + a_{ji})$。'
    },
    {
      question: '用正交变换化二次型为标准形，标准形的系数是？',
      options: ['任意数', '特征值', '行列式', '迹'],
      answer: 1,
      explanation: '正交变换 $x = Qy$ 化二次型为 $f = \\lambda_1 y_1^2 + \\lambda_2 y_2^2 + \\cdots + \\lambda_n y_n^2$，系数就是特征值。这是正交变换法的核心优势。'
    },
    {
      question: '正惯性指数 $p$ 的含义是？',
      options: ['负系数的个数', '正系数的个数', '零系数的个数', '系数之和'],
      answer: 1,
      explanation: '标准形中正系数的个数 $p$ 是正惯性指数，负系数的个数 $q$ 是负惯性指数。惯性定理：无论用什么可逆变换，$p$ 和 $q$ 是不变的。'
    },
    {
      question: '配方法化二次型为标准形时，使用的变换是？',
      options: ['正交变换', '可逆线性变换', '旋转变换', '反射变换'],
      answer: 1,
      explanation: '配方法用的是可逆线性变换 $x = Cy$（$C$ 可逆但不一定正交）。与正交变换法的区别：配方法不保持几何性质（长度、角度），但计算更简单。'
    },
    {
      question: '秩为 $r$、正惯性指数为 $p$ 的二次型，其规范形是？',
      options: ['$y_1^2 + y_2^2 + \\cdots + y_r^2$', '$y_1^2 + \\cdots + y_p^2 - y_{p+1}^2 - \\cdots - y_r^2$', '$z_1^2 + z_2^2 + \\cdots + z_n^2$', '$y_1^2 - y_2^2 + y_3^2 - \\cdots$'],
      answer: 1,
      explanation: '规范形：系数只有 $1$、$-1$、$0$。$p$ 个 $1$，$q = r-p$ 个 $-1$，$n-r$ 个 $0$。规范形由 $p$ 和 $r$ 唯一确定（惯性定理）。'
    },
  ],

  'la-09': [
    {
      question: '正交矩阵 $Q$ 满足？',
      options: ['$Q^T = Q$', '$Q^TQ = E$', '$|Q| = 1$', '$Q = Q^{-1}$'],
      answer: 1,
      explanation: '正交矩阵定义：$Q^TQ = QQ^T = E$，即 $Q^{-1} = Q^T$。正交矩阵的行列式 $|Q| = \\pm 1$，列（行）向量是标准正交向量组。'
    },
    {
      question: '施密特正交化的作用是？',
      options: ['求逆矩阵', '把线性无关向量组变成正交向量组', '求特征值', '化对角矩阵'],
      answer: 1,
      explanation: '施密特正交化：给定线性无关向量组，逐个减去在前面方向上的投影，得到正交向量组。再单位化得到标准正交向量组。是构造正交基的标准方法。'
    },
    {
      question: '正定矩阵的特征值一定？',
      options: ['全为正', '全为负', '全为零', '有正有负'],
      answer: 0,
      explanation: '正定 $\\Leftrightarrow$ 所有特征值 > 0。负定：全 < 0。半正定：全 $\\ge 0$。半负定：全 $\\le 0$。不定：有正有负。正定性是选择题高频考点。'
    },
    {
      question: '判断矩阵正定的方法是？',
      options: ['$|A| > 0$', '所有顺序主子式 > 0', '所有元素 > 0', '$\\text{rank}(A) = n$'],
      answer: 1,
      explanation: '正定的充要条件：① 特征值全正；② 所有顺序主子式 > 0；③ $x^TAx > 0$（$\\forall x \\ne 0$）。方法②最实用——顺序计算主子式，有一个 $\\le 0$ 就不正定。'
    },
    {
      question: '正交变换保持不变的量是？',
      options: ['行列式', '特征值', '向量的长度和角度', '矩阵的元素'],
      answer: 2,
      explanation: '正交变换（旋转/反射）保持长度和角度不变：$|Qx| = |x|$，$(Qx)^T(Qy) = x^Ty$。这就是为什么正交对角化在几何上很有用——只改变坐标系，不改变几何形状。'
    },
    {
      question: '$A$ 正定时，以下正确的是？',
      options: ['$A^{-1}$ 正定', '$A^{-1}$ 负定', '$|A| < 0$', '$A$ 可以有负特征值'],
      answer: 0,
      explanation: '$A$ 正定 $\\Rightarrow$ $A^{-1}$ 正定（特征值为 $1/\\lambda_i > 0$）。$A$ 正定 $\\Rightarrow$ $|A| > 0$（特征值之积 > 0）。$A$ 正定 $\\Rightarrow$ $A^*$ 正定。'
    },
  ],

  'la-10': [
    {
      question: '线性空间必须满足的条件是？',
      options: ['只有加法封闭', '只有数乘封闭', '加法和数乘都封闭', '加法、数乘封闭且满足八条公理'],
      answer: 3,
      explanation: '线性空间（向量空间）：非空集合 + 加法和数乘两种运算 + 满足八条公理（封闭性、结合律、交换律、零元、负元、数乘结合律、数乘分配律）。'
    },
    {
      question: '$P_2[x]$（次数不超过 2 的多项式空间）的维数是？',
      options: ['2', '3', '4', '无穷'],
      answer: 1,
      explanation: '$P_2[x]$ 的一组基是 $\\{1, x, x^2\\}$，维数 = 3。注意：常数项 $1$ 也是基向量，不能遗漏。一般 $P_n[x]$ 的维数是 $n+1$。'
    },
    {
      question: '线性变换 $T$ 的核 $\\ker(T)$ 是？',
      options: ['$T$ 的值域', '被 $T$ 映射到零向量的全体', '$T$ 的定义域', '$T$ 的矩阵'],
      answer: 1,
      explanation: '核 $\\ker(T) = \\{\\alpha \\in V : T(\\alpha) = 0\\}$，是被映射到零的全体向量。核是 $V$ 的子空间，$\\dim(\\ker T) + \\dim(\\text{Im} T) = \\dim V$（维数公式）。'
    },
    {
      question: '维数公式 $\\dim(\\ker T) + \\dim(\\text{Im} T) = \\dim V$ 的含义是？',
      options: ['核和像不相交', '核和像的维数之和等于全空间维数', '核等于像', '核包含像'],
      answer: 1,
      explanation: '这是线性代数基本定理之一：核的维数（丢失的信息）+ 像的维数（保留的信息）= 原空间维数。类比：$Ax=b$ 中自由变量个数 + 主变量个数 = 总变量数。'
    },
    {
      question: '同一线性变换在不同基下的矩阵有什么关系？',
      options: ['相等', '相似', '正交', '无关'],
      answer: 1,
      explanation: '同一变换在不同基下对应相似矩阵：$B = P^{-1}AP$，$P$ 是基变换的过渡矩阵。对角化就是找到使变换矩阵最简单的那组基（特征向量基）。'
    },
    {
      question: '不变子空间 $W$ 满足的条件是？',
      options: ['$T(W) = W$', '$T(W) \\subseteq W$', '$T(W) = \\{0\\}$', '$T(W) = V$'],
      answer: 1,
      explanation: '不变子空间：$T(W) \\subseteq W$，即 $W$ 中的向量经变换后仍在 $W$ 中。特征子空间、核、像都是不变子空间。不变子空间可以用来简化变换矩阵（分块对角化）。'
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

  // ========== 数据结构 ds-01~ds-04 ==========
  'ds-01': [
    {
      question: '算法 $T(n) = O(n^2)$，当 $n$ 翻倍（$n \\to 2n$）时，运行时间约为原来的？',
      options: ['2 倍', '4 倍', '8 倍', '不变'],
      answer: 1,
      explanation: '$O(n^2)$ 表示时间与 $n^2$ 成正比。$n \\to 2n$ 时，$(2n)^2 = 4n^2$，变为原来的 4 倍。同理 $O(n)$ 翻倍变 2 倍，$O(\\log n)$ 几乎不变，$O(n\\log n)$ 约变 2 倍多。这是估算算法扩展性的关键直觉。'
    },
    {
      question: '下列复杂度从小到大排列正确的是？',
      options: ['$O(2^n) < O(n^2) < O(n\\log n) < O(n)$', '$O(\\log n) < O(n) < O(n\\log n) < O(n^2)$', '$O(1) < O(n) < O(\\log n) < O(n^2)$', '$O(n!) < O(2^n) < O(n^2)$'],
      answer: 1,
      explanation: '正确顺序：$O(1) < O(\\log n) < O(n) < O(n\\log n) < O(n^2) < O(2^n) < O(n!)$。选项 B 正确（缺 $O(1)$ 但其余顺序对）。选项 A 错在 $O(n^2) > O(n\\log n)$；选项 C 错在 $O(n) > O(\\log n)$；选项 D 错在 $O(n!) > O(2^n)$。'
    },
    {
      question: '主定理 $T(n)=aT(n/b)+f(n)$ 中，归并排序 $T(n)=2T(n/2)+O(n)$ 的解是？',
      options: ['$O(n)$', '$O(n\\log n)$', '$O(n^2)$', '$O(2^n)$'],
      answer: 1,
      explanation: '$a=2, b=2, f(n)=O(n)$。$n^{\\log_b a}=n^{\\log_2 2}=n^1=n$，恰好等于 $f(n)$，属于第二种情况，$T(n)=\\Theta(n^{\\log_b a}\\log n)=\\Theta(n\\log n)$。这就是归并排序 $O(n\\log n)$ 的由来。'
    },
    {
      question: '以下代码的时间复杂度是？<br>for (int i=1; i&lt;n; i*=2) for (int j=0; j&lt;i; j++) sum++;',
      options: ['$O(n)$', '$O(n\\log n)$', '$O(n^2)$', '$O(\\log n)$'],
      answer: 0,
      explanation: '外层循环 i 翻倍：1,2,4,8...，共 $\\log n$ 次。内层循环执行 i 次。总次数 $=1+2+4+\\cdots+n/2+n = 2n-1 = O(n)$（等比数列求和）。不要误判为 $O(n\\log n)$——内层次数随 i 变化，不是固定 n。'
    },
    {
      question: '递归算法的空间复杂度主要取决于？',
      options: ['递归体的代码长度', '递归调用栈的深度', '输入数据的大小', '返回值的类型'],
      answer: 1,
      explanation: '递归每深入一层，调用栈增加一帧（存参数、返回地址、局部变量）。递归深度即调用栈最大深度，决定空间复杂度。如二叉树递归遍历深度为树高 $h$，空间 $O(h)$。深度递归可能栈溢出。'
    },
    {
      question: '"原地排序"指的是？',
      options: ['在原数组上排序，只用 $O(1)$ 额外空间', '排序后数组回到原位置', '不需要比较的排序', '时间复杂度 $O(1)$'],
      answer: 0,
      explanation: '原地排序（in-place）指只用常数 $O(1)$ 额外空间完成排序。堆排序、冒泡排序、插入排序都是原地排序。归并排序需要 $O(n)$ 辅助数组，不是原地。原地性是空间复杂度概念，与时间复杂度无关。'
    },
  ],

  'ds-02': [
    {
      question: '顺序表相比链表的最大优势是？',
      options: ['插入删除快', '随机访问 $O(1)$', '内存占用小', '动态扩容方便'],
      answer: 1,
      explanation: '顺序表（数组）连续存储，下标访问 $O(1)$——这是数组最核心的优势。链表随机访问需 $O(n)$ 遍历。但顺序表插入删除需移动元素 $O(n)$，扩容需拷贝。读多写少选顺序表，频繁增删选链表。'
    },
    {
      question: '在单链表中删除节点 p 的后继节点，正确的操作顺序是？',
      options: ['先 free(p->next)，再 p->next = p->next->next', '先保存 q=p->next，再 p->next=q->next，最后 free(q)', '直接 p->next = NULL', '先 p->next = p->next->next，再访问 p->next free'],
      answer: 1,
      explanation: '必须先用临时变量 q 保存 p->next，因为改指针后原后继就丢失了。正确：q=p->next；p->next=q->next（跳过 q）；free(q)。选项 A 错在先 free 就无法访问 next 了；选项 D 错在改指针后原节点已断开。'
    },
    {
      question: '带头节点的单链表，其优点是？',
      options: ['节省一个节点的空间', '插入删除第一个元素时无需特殊处理', '遍历更快', '支持随机访问'],
      answer: 1,
      explanation: '头节点（dummy head）是链表开头的哨兵节点，数据域无意义。有了它，在表头插入/删除与在中间操作完全一致（都是修改某节点的 next），无需对"空表"或"第一个节点"特判。代价是多占一个节点空间。'
    },
    {
      question: '双链表相比单链表的优势是？',
      options: ['内存占用更小', '可以双向遍历，删除已知节点 $O(1)$', '插入更快', '支持随机访问'],
      answer: 1,
      explanation: '双链表每个节点有 prev 和 next，可双向遍历。关键优势：已知节点位置时，删除它 $O(1)$（单链表删除需先找前驱 $O(n)$）。LRU 缓存用双链表正是为了 $O(1)$ 删除任意节点。代价是每个节点多一个指针。'
    },
    {
      question: '循环单链表的特点是？',
      options: ['尾节点指向头节点，形成环', '头尾都能访问', '只能从头遍历到尾', '没有头节点'],
      answer: 0,
      explanation: '循环链表的尾节点 next 指回头节点（或头节点的前驱），形成环。从任意节点出发都能遍历整个链表。常用于约瑟夫问题、轮转调度、操作系统进程管理。判空条件：head->next == head。'
    },
    {
      question: '静态链表是用什么模拟指针？',
      options: ['真正的内存指针', '数组下标（游标）', '哈希表', '位图'],
      answer: 1,
      explanation: '静态链表用数组的下标（游标 cursor）代替指针，next 字段存的是下一个元素在数组中的下标。适用于不支持指针的语言（如早期 Fortran），或需要预分配固定内存的场景（嵌入式系统）。本质是用数组模拟链式结构。'
    },
  ],

  'ds-03': [
    {
      question: '栈的操作特性是？',
      options: ['FIFO（先进先出）', 'LIFO（后进先出）', '随机访问', '两端都能进出'],
      answer: 1,
      explanation: '栈是 LIFO（Last In First Out）后进先出——最后入栈的元素最先出栈。像一摞盘子，只能在顶部放/取。push/pop/peek 都在栈顶操作，均 $O(1)$。函数调用栈、撤销操作、DFS 都用栈。'
    },
    {
      question: '队列的操作特性是？',
      options: ['LIFO', 'FIFO（先进先出）', '只能在中间操作', '支持随机访问'],
      answer: 1,
      explanation: '队列是 FIFO（First In First Out）先进先出——先入队的先出队。像排队买票。入队在队尾（rear），出队在队头（front），均 $O(1)$。任务调度、BFS、打印机缓冲都用队列。'
    },
    {
      question: '中缀表达式 $A+B*C$ 对应的后缀表达式是？',
      options: ['$ABC*+$', '$AB+C*$', '$A+BC*$', '$+A*BC$'],
      answer: 0,
      explanation: '中缀转后缀：$A+B*C$。由于 * 优先级高，先算 $B*C$，后缀为 $BC*$；再与 $A$ 相加，后缀为 $A BC* +$。后缀表达式的优势：无需括号和优先级，用栈从左到右扫描即可求值。'
    },
    {
      question: '循环队列容量为 MaxSize，判空和判满的条件分别是？',
      options: ['空：front==rear；满：front==rear', '空：front==rear；满：(rear+1)%MaxSize==front', '空：rear==0；满：rear==MaxSize', '空：front==0；满：front==MaxSize-1'],
      answer: 1,
      explanation: '循环队列用取模实现循环。为区分空和满，牺牲一个存储单元：空条件 front==rear；满条件 (rear+1)%MaxSize==front（rear 即将追上 front，还差一格）。实际容量是 MaxSize-1。这是高频考点。'
    },
    {
      question: '以下哪个问题最适合用栈解决？',
      options: ['广度优先搜索 BFS', '括号匹配', '任务调度', '树的层序遍历'],
      answer: 1,
      explanation: '括号匹配是栈的经典应用：遇左括号入栈，遇右括号弹栈检查是否配对。栈的 LIFO 特性天然适合"嵌套结构"。BFS、任务调度、层序遍历用队列（FIFO）。函数调用、DFS、表达式求值用栈。'
    },
    {
      question: '递归函数转换为非递归（迭代）实现，通常借助什么数据结构？',
      options: ['队列', '栈', '堆', '哈希表'],
      answer: 1,
      explanation: '递归的本质是系统调用栈。手动改写为迭代时，用显式的栈模拟调用栈——把原本由系统自动压栈的参数和返回地址，手动压入自己维护的栈中。DFS 的递归版和栈版就是典型例子。深度大的递归必须改迭代以避免栈溢出。'
    },
  ],

  'ds-04': [
    {
      question: 'BF（暴力）字符串匹配算法的最坏时间复杂度是？',
      options: ['$O(n)$', '$O(m)$', '$O(n+m)$', '$O(nm)$'],
      answer: 3,
      explanation: 'BF 算法失配时主串指针回溯，最坏情况（如主串 "aaaa...ab"、模式串 "aab"）每次匹配到末尾才失败，复杂度 $O(nm)$。n 是主串长，m 是模式串长。这就是 KMP 要解决的问题。'
    },
    {
      question: 'KMP 算法的时间复杂度是？',
      options: ['$O(nm)$', '$O(n+m)$', '$O(n^2)$', '$O(m^2)$'],
      answer: 1,
      explanation: 'KMP 利用 next 数组，失配时主串指针 i 不回溯，只前进不后退，模式串指针 j 跳转。主循环 $O(n)$，预处理 next 数组 $O(m)$，总共 $O(n+m)$。这是 KMP 相对 BF 的核心优势。'
    },
    {
      question: 'next[j] 数组的含义是？',
      options: ['模式串第 j 个字符', '模式串 T[0..j-1] 的最长相等前后缀长度', '主串的位置', '匹配成功的位置'],
      answer: 1,
      explanation: 'next[j] = 模式串 T[0..j-1] 的最长相等前后缀长度。即最大的 k，使 T[0..k-1]==T[j-k..j-1]。失配时 j=next[j]，模式串右滑，跳过必然失配的位置。next 数组是 KMP 的核心和全部难点。'
    },
    {
      question: '模式串 "abab" 的 next 数组是？',
      options: ['-1,0,0,1', '-1,0,1,2', '0,0,0,1', '-1,0,0,0'],
      answer: 0,
      explanation: 'next[0]=-1（约定）。next[1]=0（T[0..0]="a" 无相等前后缀）。next[2]=0（T[0..1]="ab" 无相等前后缀）。next[3]=1（T[0..2]="aba"，前缀"a"=后缀"a"，长度 1）。所以 next=[-1,0,0,1]。'
    },
    {
      question: 'KMP 算法失配时，主串指针 i 和模式串指针 j 的动作是？',
      options: ['i 回溯，j 归零', 'i 不动，j=next[j]', 'i 前进，j 归零', 'i 和 j 都回溯'],
      answer: 1,
      explanation: 'KMP 的核心：失配时主串指针 i 保持不动（不回溯！），模式串指针 j 跳转到 next[j]。这利用了"已匹配前缀中，最长相等前后缀"的信息，避免重复比较。正是这一点把复杂度从 $O(nm)$ 降到 $O(n+m)$。'
    },
    {
      question: 'nextval 数组是 next 数组的优化，优化条件是？',
      options: ['当 T[j]==T[next[j]] 时，nextval[j]=nextval[next[j]]', '当 T[j]!=T[next[j]] 时优化', 'nextval[j] 总是等于 next[j]', 'nextval[j]=0'],
      answer: 0,
      explanation: '当 T[j]==T[next[j]] 时，跳到 next[j] 后该字符还是一样，必然再次失配，没意义。优化：直接 nextval[j]=nextval[next[j]]，跳过这个无用跳转。nextval 让 KMP 在某些模式串上减少比较次数，但最坏复杂度不变。'
    },
  ],

  // ========== 电路基础 circ-01~circ-12 ==========
  'circ-01': [
    {
      question: 'KCL（基尔霍夫电流定律）的内容是？',
      options: ['任意回路电压之和为零', '任意节点电流之和为零', '电压等于电流乘电阻', '功率等于电压乘电流'],
      answer: 1,
      explanation: 'KCL：对任意节点，流入电流之和 = 流出电流之和（或 $\\sum i = 0$，流入为正流出为负）。本质是电荷守恒。注意：KCL 适用于任何集总参数电路，不限于直流。'
    },
    {
      question: 'KVL（基尔霍夫电压定律）的内容是？',
      options: ['任意节点电流之和为零', '任意回路电压之和为零', '电流等于电压除电阻', '功率守恒'],
      answer: 1,
      explanation: 'KVL：沿任意闭合回路，电压升之和 = 电压降之和（或 $\\sum u = 0$）。本质是能量守恒。KVL 和 KCL 是电路分析的两大基石，所有电路定理都由此推导。'
    },
    {
      question: '网孔分析法中，对每个网孔列方程的依据是？',
      options: ['KCL', 'KVL', '欧姆定律', '叠加定理'],
      answer: 1,
      explanation: '网孔分析法：假设网孔电流（顺时针或逆时针），对每个网孔用 KVL 列电压方程。节点分析法用 KCL。选择哪种方法取决于哪种方程更少。'
    },
    {
      question: '节点分析法中，参考节点（地）的电位是？',
      options: ['1V', '0V', '任意值', '最大值'],
      answer: 1,
      explanation: '参考节点电位定义为 0V（接地）。其他节点电位都是相对于参考节点的电压。选择合适的参考节点（通常选连接支路最多的节点）可以简化计算。'
    },
    {
      question: '理想电压源的特点是？',
      options: ['电压恒定，电流由外电路决定', '电流恒定，电压由外电路决定', '电压和电流都恒定', '电压和电流都由外电路决定'],
      answer: 0,
      explanation: '理想电压源：两端电压恒定（等于源电压），电流由外电路决定。不能短路（否则电流无穷大）。理想电流源：电流恒定，电压由外电路决定。不能开路。'
    },
  ],

  'circ-02': [
    {
      question: '戴维南定理的内容是？',
      options: ['任何线性二端网络可等效为电压源串联电阻', '任何电路都可用叠加法分析', '功率最大传输条件是负载等于内阻', 'KVL 的推广'],
      answer: 0,
      explanation: '戴维南定理：任何线性有源二端网络，对外可等效为一个电压源 $U_{oc}$（开路电压）串联内阻 $R_0$（等效电阻）。诺顿定理是电流源并联电阻的等效形式。'
    },
    {
      question: '求戴维南等效电阻 $R_0$ 的方法是？',
      options: ['开路电压除以短路电流', '所有电阻之和', '最大电阻', '最小电阻'],
      answer: 0,
      explanation: '$R_0 = U_{oc} / I_{sc}$，即开路电压除以短路电流。也可用外加电源法或去除独立源后计算（电压源短路、电流源开路）。注意：含受控源时只能用 $U_{oc}/I_{sc}$ 或外加电源法。'
    },
    {
      question: '最大功率传输条件是？',
      options: ['$R_L = R_0$', '$R_L = 2R_0$', '$R_L = R_0/2$', '$R_L \\to \\infty$'],
      answer: 0,
      explanation: '当负载电阻 $R_L$ 等于戴维南等效电阻 $R_0$ 时，负载获得最大功率 $P_{max} = U_{oc}^2/(4R_0)$。此时传输效率只有 50%（一半功率消耗在内阻上）。'
    },
    {
      question: '诺顿等效电路由什么组成？',
      options: ['电压源串联电阻', '电流源并联电阻', '电压源并联电阻', '电流源串联电阻'],
      answer: 1,
      explanation: '诺顿定理：线性有源二端网络可等效为电流源 $I_{sc}$（短路电流）并联电阻 $R_0$。戴维南和诺顿可以互相转换：$U_{oc} = I_{sc} R_0$。'
    },
  ],

  'circ-03': [
    {
      question: '叠加定理适用于？',
      options: ['任何电路', '线性电路', '非线性电路', '只有直流电路'],
      answer: 1,
      explanation: '叠加定理：在线性电路中，多个独立源共同作用的响应 = 各独立源单独作用的响应之和。注意：① 只适用于线性电路（电压/电流）；② 功率不能叠加（$I^2R$ 是非线性的）。'
    },
    {
      question: '用叠加定理时，不作用的电压源如何处理？',
      options: ['去掉（开路）', '短路', '保留不变', '接地'],
      answer: 1,
      explanation: '不作用的独立源：电压源短路（$U=0$），电流源开路（$I=0$）。注意：受控源不能置零，必须保留！内阻保留在电路中。'
    },
    {
      question: '叠加定理中，各分响应叠加时的符号规则是？',
      options: ['都取正', '与原电路参考方向一致取正，相反取负', '由计算结果决定', '总是正的'],
      answer: 1,
      explanation: '叠加时注意方向：某独立源单独作用时，如果分响应的参考方向与原电路一致，取正号；相反取负号。这是叠加定理最容易出错的地方。'
    },
    {
      question: '齐次定理（齐次性）的含义是？',
      options: ['激励加倍，响应也加倍', '激励加倍，响应不变', '激励加倍，响应减半', '激励与响应无关'],
      answer: 0,
      explanation: '齐次性：线性电路中，激励扩大 $k$ 倍，响应也扩大 $k$ 倍。齐次性 + 可加性 = 线性。注意：齐次性只在单一激励源时成立，多源时用叠加定理。'
    },
  ],

  'circ-04': [
    {
      question: '一阶 RC 电路的时间常数 $\\tau$ 等于？',
      options: ['$R + C$', '$RC$', '$R/C$', '$C/R$'],
      answer: 1,
      explanation: '$\\tau = RC$（秒），$R$ 是从电容两端看进去的等效电阻。时间常数决定暂态过程的快慢：$\\tau$ 越大，充放电越慢。工程上认为 $5\\tau$ 后暂态结束（达到 99.3%）。'
    },
    {
      question: '三要素法的三个要素是？',
      options: ['电压、电流、电阻', '初始值、稳态值、时间常数', '电阻、电感、电容', '幅值、频率、相位'],
      answer: 1,
      explanation: '三要素法：$f(t) = f(\\infty) + [f(0^+) - f(\\infty)]e^{-t/\\tau}$。三个要素：① 初始值 $f(0^+)$；② 稳态值 $f(\\infty)$；③ 时间常数 $\\tau$。知道这三个就能直接写出响应。'
    },
    {
      question: '换路定则的内容是？',
      options: ['电容电压不能突变', '电感电流不能突变', '电容电压和电感电流都不能突变', '电压和电流都不能突变'],
      answer: 2,
      explanation: '换路定则：换路瞬间，电容电压 $u_C(0^+) = u_C(0^-)$，电感电流 $i_L(0^+) = i_L(0^-)$。因为能量不能突变（$W_C = \\frac{1}{2}Cu_C^2$，$W_L = \\frac{1}{2}Li_L^2$）。'
    },
    {
      question: 'RC 电路充电时，电容电压的变化规律是？',
      options: ['线性增长', '指数增长趋近稳态值', '正弦振荡', '恒定不变'],
      answer: 1,
      explanation: '充电：$u_C(t) = U_S(1 - e^{-t/RC})$，从 0 指数增长趋近 $U_S$。放电：$u_C(t) = U_0 e^{-t/RC}$，从 $U_0$ 指数衰减趋近 0。都不是线性的，是指数规律。'
    },
    {
      question: '时间常数 $\\tau = RC = 1\\text{ms}$ 时，$5\\tau$ 等于多少？',
      options: ['5ms', '5μs', '5s', '50ms'],
      answer: 0,
      explanation: '$5\\tau = 5 \\times 1\\text{ms} = 5\\text{ms}$。$5\\tau$ 后暂态过程基本结束（99.3%）。这是工程上判断暂态持续时间的经验法则。'
    },
  ],

  'circ-05': [
    {
      question: '二阶 RLC 电路的暂态响应类型取决于？',
      options: ['电阻大小', '特征根的性质（实根/重根/复根）', '电源频率', '电感电容的乘积'],
      answer: 1,
      explanation: '特征方程 $s^2 + 2\\alpha s + \\omega_0^2 = 0$，判别式决定响应类型：$\\alpha > \\omega_0$ 过阻尼（两不等实根），$\\alpha = \\omega_0$ 临界阻尼（重根），$\\alpha < \\omega_0$ 欠阻尼（共轭复根）。'
    },
    {
      question: '欠阻尼响应的特点是？',
      options: ['无振荡指数衰减', '等幅振荡', '衰减振荡', '恒定不变'],
      answer: 2,
      explanation: '欠阻尼（$\\alpha < \\omega_0$）：响应为衰减振荡 $e^{-\\alpha t}(A\\cos\\omega_d t + B\\sin\\omega_d t)$。振荡频率 $\\omega_d = \\sqrt{\\omega_0^2 - \\alpha^2}$，振幅按 $e^{-\\alpha t}$ 衰减。'
    },
    {
      question: '过阻尼响应的特点是？',
      options: ['快速达到稳态', '缓慢趋近稳态，无振荡', '等幅振荡', '发散振荡'],
      answer: 1,
      explanation: '过阻尼（$\\alpha > \\omega_0$）：响应为两个衰减指数之差 $Ae^{s_1 t} + Be^{s_2 t}$，无振荡。但比临界阻尼更慢，因为两个衰减项互相抵消。工程上一般用临界或稍欠阻尼。'
    },
    {
      question: '临界阻尼的特点是？',
      options: ['有振荡', '无振荡且最快达到稳态', '最慢达到稳态', '等幅振荡'],
      answer: 1,
      explanation: '临界阻尼（$\\alpha = \\omega_0$）：响应为 $(A + Bt)e^{-\\alpha t}$，无振荡且是无振荡中最快的。工程上常用临界阻尼或稍欠阻尼（允许少量超调换取更快响应）。'
    },
  ],

  'circ-06': [
    {
      question: '正弦稳态分析中，相量法的核心思想是？',
      options: ['把微分方程变成代数方程', '把时域变成频域', '用复数表示正弦量', '以上都是'],
      answer: 3,
      explanation: '相量法：用复数（相量）表示正弦量的幅值和初相，把微积分运算变成复数的代数运算。$u(t) = U_m\\cos(\\omega t + \\varphi)$ 对应相量 $\\dot{U} = U_m e^{j\\varphi}$。'
    },
    {
      question: '阻抗 $Z$ 的定义是？',
      options: ['$Z = R + jX$', '$Z = U/I$（相量比）', '$Z = |Z|e^{j\\varphi}$', '以上都对'],
      answer: 3,
      explanation: '阻抗 $Z = \\dot{U}/\\dot{I} = R + jX = |Z|e^{j\\varphi}$。实部 $R$ 是电阻，虚部 $X$ 是电抗（感抗 $\\omega L$ 为正，容抗 $-1/\\omega C$ 为负）。阻抗是交流电路分析的核心概念。'
    },
    {
      question: '感抗 $X_L$ 和容抗 $X_C$ 分别是？',
      options: ['$X_L = \\omega L$，$X_C = \\omega C$', '$X_L = \\omega L$，$X_C = 1/(\\omega C)$', '$X_L = 1/(\\omega L)$，$X_C = \\omega C$', '$X_L = L$，$X_C = C$'],
      answer: 1,
      explanation: '感抗 $X_L = \\omega L$（频率越高，感抗越大），容抗 $X_C = 1/(\\omega C)$（频率越高，容抗越小）。电感"通低频阻高频"，电容"通高频阻低频"。'
    },
    {
      question: '谐振时电路的特点是？',
      options: ['阻抗最大', '阻抗最小（纯电阻）', '电流最大', 'B 和 C 都对'],
      answer: 3,
      explanation: '串联谐振时：$X_L = X_C$，电抗为零，阻抗最小（$Z = R$），电流最大。并联谐振时：阻抗最大，电流最小。谐振频率 $\\omega_0 = 1/\\sqrt{LC}$。'
    },
    {
      question: '有功功率 $P$、无功功率 $Q$、视在功率 $S$ 的关系是？',
      options: ['$S = P + Q$', '$S^2 = P^2 + Q^2$', '$P = S + Q$', '$Q = P + S$'],
      answer: 1,
      explanation: '$P = UI\\cos\\varphi$（有功，单位 W），$Q = UI\\sin\\varphi$（无功，单位 var），$S = UI$（视在，单位 VA）。$S^2 = P^2 + Q^2$，功率因数 $\\cos\\varphi = P/S$。'
    },
  ],

  'circ-07': [
    {
      question: 'RC 低通滤波器的截止频率 $f_c$ 等于？',
      options: ['$f_c = RC$', '$f_c = 1/(2\\pi RC)$', '$f_c = 2\\pi RC$', '$f_c = 1/RC$'],
      answer: 1,
      explanation: 'RC 低通滤波器截止频率 $f_c = 1/(2\\pi RC)$，对应 $|H(f_c)| = 0.707$（-3dB）。低于 $f_c$ 的信号通过，高于 $f_c$ 的信号被衰减。'
    },
    {
      question: '波特图中，一阶低通滤波器在高频段的斜率是？',
      options: ['-10 dB/dec', '-20 dB/dec', '-40 dB/dec', '0 dB/dec'],
      answer: 1,
      explanation: '一阶系统高频段斜率 = -20 dB/dec（每十倍频衰减 20dB）。二阶系统高频段 = -40 dB/dec。这是从波特图判断系统阶数的方法。'
    },
    {
      question: '截止频率处（$f = f_c$）的增益是？',
      options: ['0 dB', '-3 dB', '-6 dB', '-20 dB'],
      answer: 1,
      explanation: '截止频率定义：增益下降到通带的 0.707 倍，即 $20\\log_{10}(0.707) \\approx -3$ dB。这就是"-3dB 带宽"的由来。'
    },
    {
      question: '高通滤波器与低通滤波器的区别是？',
      options: ['高通通过高频，低通通过低频', '高通通过低频，低通通过高频', '没有区别', '高通更复杂'],
      answer: 0,
      explanation: '低通：通过低频，衰减高频（$f < f_c$ 通过）。高通：通过高频，衰减低频（$f > f_c$ 通过）。带通：通过某频段。带阻（陷波）：阻止某频段。'
    },
  ],

  'circ-08': [
    {
      question: '串联谐振的条件是？',
      options: ['$X_L = X_C$', '$R = 0$', '$L = C$', '$\\omega = 0$'],
      answer: 0,
      explanation: '串联谐振：$\\omega L = 1/(\\omega C)$，即 $X_L = X_C$。谐振频率 $\\omega_0 = 1/\\sqrt{LC}$，$f_0 = 1/(2\\pi\\sqrt{LC})$。此时电抗为零，电路呈纯电阻性。'
    },
    {
      question: '串联谐振时，品质因数 $Q$ 的定义是？',
      options: ['$Q = \\omega_0 L / R$', '$Q = R / (\\omega_0 L)$', '$Q = L / C$', '$Q = \\omega_0 / R$'],
      answer: 0,
      explanation: '品质因数 $Q = \\omega_0 L / R = 1/(\\omega_0 CR) = \\frac{1}{R}\\sqrt{L/C}$。$Q$ 值越大，谐振峰越尖锐，选择性越好。$Q$ 也等于谐振时电感（或电容）电压与总电压之比。'
    },
    {
      question: '并联谐振时，电路的特点是？',
      options: ['阻抗最小', '阻抗最大', '电流最大', '电压最小'],
      answer: 1,
      explanation: '并联谐振：阻抗最大（理想情况为无穷大），总电流最小。与串联谐振相反。并联谐振常用于选频电路（如收音机的中频变压器）。'
    },
    {
      question: '谐振电路的通频带 $BW$ 与品质因数 $Q$ 的关系是？',
      options: ['$BW = Q \\cdot f_0$', '$BW = f_0 / Q$', '$BW = Q$', '$BW = 1/Q$'],
      answer: 1,
      explanation: '通频带 $BW = f_0 / Q$（或 $BW = R/L$）。$Q$ 越高，$BW$ 越窄，选择性越好但通频带越窄。设计时需要在选择性和带宽之间权衡。'
    },
  ],

  'circ-09': [
    {
      question: '三相电路中，线电压与相电压的关系是？',
      options: ['$U_L = U_P$', '$U_L = \\sqrt{3} U_P$', '$U_L = 3 U_P$', '$U_L = U_P / \\sqrt{3}$'],
      answer: 1,
      explanation: '星形连接（Y）：$U_L = \\sqrt{3} U_P$，$I_L = I_P$。三角形连接（Δ）：$U_L = U_P$，$I_L = \\sqrt{3} I_P$。这是三相电路的基本关系。'
    },
    {
      question: '三相电路中，中线（零线）的作用是？',
      options: ['传输有功功率', '保证三相负载不对称时各相电压平衡', '提高功率因数', '减少线路损耗'],
      answer: 1,
      explanation: '中线保证不对称负载时各相电压仍然对称（等于相电压）。若中线断开，不对称负载会导致各相电压不等，轻载相电压升高可能烧毁设备。所以中线上不能装熔断器。'
    },
    {
      question: '对称三相电路的瞬时功率特点是？',
      options: ['随时间脉动', '恒定不变', '为零', '无穷大'],
      answer: 1,
      explanation: '对称三相电路的瞬时功率 $p(t) = P_{\\text{total}} = 3U_P I_P \\cos\\varphi$ 是常数！这是三相制的重要优点——电机转矩恒定，没有振动。单相功率是脉动的。'
    },
  ],

  'circ-10': [
    {
      question: '二端口网络的 Z 参数矩阵是？',
      options: ['$\\begin{pmatrix} Z_{11} & Z_{12} \\\\ Z_{21} & Z_{22} \\end{pmatrix}$', '$\\begin{pmatrix} Y_{11} & Y_{12} \\\\ Y_{21} & Y_{22} \\end{pmatrix}$', '$\\begin{pmatrix} h_{11} & h_{12} \\\\ h_{21} & h_{22} \\end{pmatrix}$', '$\\begin{pmatrix} A & B \\\\ C & D \\end{pmatrix}$'],
      answer: 0,
      explanation: 'Z 参数（阻抗参数）：$\\begin{pmatrix} U_1 \\\\ U_2 \\end{pmatrix} = \\begin{pmatrix} Z_{11} & Z_{12} \\\\ Z_{21} & Z_{22} \\end{pmatrix} \\begin{pmatrix} I_1 \\\\ I_2 \\end{pmatrix}$。Y 参数是导纳参数，h 参数是混合参数。'
    },
    {
      question: '互易二端口网络满足的关系是？',
      options: ['$Z_{11} = Z_{22}$', '$Z_{12} = Z_{21}$', '$Z_{11} = Z_{12}$', '$Z_{22} = Z_{21}$'],
      answer: 1,
      explanation: '互易网络：$Z_{12} = Z_{21}$（或 $Y_{12} = Y_{21}$，$h_{12} = -h_{21}$）。物理含义：端口 1 激励在端口 2 的响应 = 端口 2 激励在端口 1 的响应。'
    },
  ],

  'circ-11': [
    {
      question: '理想运放工作在线性区时，"虚短"的含义是？',
      options: ['$U_+ = U_-$（同相端和反相端电压相等）', '$I_+ = I_- = 0$（输入端不取电流）', '$U_{out} = \\infty$', '$U_{in} = 0$'],
      answer: 0,
      explanation: '"虚短"：$U_+ \\approx U_-$（两输入端电压近似相等）。因为开环增益 $A \\to \\infty$，而输出有限，所以输入差 $U_+ - U_- \\approx 0$。注意这不是真的短路，只是电压相等。'
    },
    {
      question: '理想运放的"虚断"含义是？',
      options: ['输出端断路', '输入端不取电流（$I_+ = I_- = 0$）', '电源断路', '反馈断路'],
      answer: 1,
      explanation: '"虚断"：$I_+ = I_- \\approx 0$（输入端电流为零）。因为理想运放输入电阻无穷大。这是分析运放电路的重要依据——输入端不取电流，只取电压。'
    },
    {
      question: '反相放大器的增益是？',
      options: ['$A_v = R_f / R_1$', '$A_v = -R_f / R_1$', '$A_v = 1 + R_f / R_1$', '$A_v = -R_1 / R_f$'],
      answer: 1,
      explanation: '反相放大器：$A_v = -R_f/R_1$。负号表示输出与输入反相。同相放大器：$A_v = 1 + R_f/R_1$。这两个是最基本的运放电路。'
    },
    {
      question: '同相放大器的增益是？',
      options: ['$A_v = R_f / R_1$', '$A_v = -R_f / R_1$', '$A_v = 1 + R_f / R_1$', '$A_v = -1 - R_f / R_1$'],
      answer: 2,
      explanation: '同相放大器：$A_v = 1 + R_f/R_1$。特点：输入阻抗高，输出与输入同相。反相放大器输入阻抗较低（$R_1$），但电路更简单。'
    },
  ],

  'circ-12': [
    {
      question: '受控源与独立源的区别是？',
      options: ['受控源不能提供能量', '受控源的值由电路中其他变量决定', '受控源只能是电压源', '受控源只能是电流源'],
      answer: 1,
      explanation: '受控源（CCVS、VCVS、CCCS、VCCS）：输出受电路中某处电压或电流控制。不能独立存在，必须有独立源激励才有意义。分析时保留受控源，不能像独立源那样置零。'
    },
    {
      question: '含有受控源的电路求等效电阻的方法是？',
      options: ['直接串并联', '外加电源法（$R_0 = U/I$）', '不能求等效电阻', '把受控源也置零'],
      answer: 1,
      explanation: '含受控源时不能简单串并联，要用外加电源法：在端口加电压 $U$，求电流 $I$，则 $R_0 = U/I$。或用 $R_0 = U_{oc}/I_{sc}$。受控源不能置零！'
    },
    {
      question: '四种受控源中，电压控制电压源（VCVS）的符号是？',
      options: ['$\\mu U_x$（菱形）', '$r_m I_x$（菱形）', '$g_m U_x$（菱形）', '$\\beta I_x$（菱形）'],
      answer: 0,
      explanation: 'VCVS：输出电压 = $\\mu$ × 控制电压。CCVS：输出电压 = $r_m$ × 控制电流。VCCS：输出电流 = $g_m$ × 控制电压。CCCS：输出电流 = $\\beta$ × 控制电流。'
    },
  ],

  // ========== 模拟电路 ana-01~ana-14 ==========
  'ana-01': [
    {
      question: '二极管的伏安特性是？',
      options: ['线性', '指数型（非线性）', '平方型', '恒定'],
      answer: 1,
      explanation: '二极管伏安特性：$I = I_S(e^{U/U_T} - 1)$，$U_T \\approx 26\\text{mV}$（室温）。正向指数增长，反向截止（反向饱和电流很小）。这是非线性元件。'
    },
    {
      question: '硅二极管的导通电压约是？',
      options: ['0.2V', '0.7V', '1.2V', '2.0V'],
      answer: 1,
      explanation: '硅二极管正向导通电压约 0.6~0.7V，锗二极管约 0.2~0.3V。这是工程估算的常用值。实际导通电压与温度、电流有关。'
    },
    {
      question: '稳压管工作在什么状态？',
      options: ['正向导通', '反向击穿', '截止', '饱和'],
      answer: 1,
      explanation: '稳压管利用反向击穿区的稳压特性。击穿后电压基本恒定（稳压值），电流变化很大。使用时必须串联限流电阻，否则会烧毁。'
    },
    {
      question: '温度升高时，二极管的正向电压？',
      options: ['升高', '降低', '不变', '先升后降'],
      answer: 1,
      explanation: '温度每升高 1°C，正向电压下降约 2~2.5mV。这是因为温度升高，载流子浓度增加，同样的电流只需要更低的电压。这也是热敏二极管测温的原理。'
    },
  ],

  'ana-02': [
    {
      question: '单相桥式整流电路中，二极管的数量是？',
      options: ['2', '4', '6', '8'],
      answer: 1,
      explanation: '桥式整流用 4 个二极管，组成两对交替导通的臂。正半周 D1、D3 导通，负半周 D2、D4 导通。输出全波脉动直流，比半波整流效率高。'
    },
    {
      question: '滤波电容的作用是？',
      options: ['增大输出电压', '减小输出电压的脉动', '提高效率', '降低功耗'],
      answer: 1,
      explanation: '电容滤波：利用电容充放电平滑脉动电压。电容越大，放电越慢，纹波越小。$C \\ge (3\\sim5)\\frac{T}{2R_L}$（$T$ 为电源周期，$R_L$ 为负载电阻）。'
    },
    {
      question: '电容滤波后，输出电压的平均值？',
      options: ['等于 $0.9U_2$', '大于 $0.9U_2$（约 $1.2U_2$）', '等于 $U_2$', '等于 $0.45U_2$'],
      answer: 1,
      explanation: '桥式整流电容滤波：$U_{avg} \\approx 1.2U_2$（$U_2$ 是变压器次级电压有效值）。半波整流电容滤波：$U_{avg} \\approx U_2$。无滤波时桥式为 $0.9U_2$。'
    },
  ],

  'ana-03': [
    {
      question: 'BJT 三极管的三个区是？',
      options: ['源极、漏极、栅极', '发射极、基极、集电极', '阳极、阴极、栅极', '正极、负极、控制极'],
      answer: 1,
      explanation: 'BJT：发射极（E）、基极（B）、集电极（C）。两个 PN 结：发射结（B-E）、集电结（B-C）。NPN 型：电流从 C 流向 E；PNP 型：电流从 E 流向 C。'
    },
    {
      question: '三极管放大区的条件是？',
      options: ['发射结正偏，集电结正偏', '发射结正偏，集电结反偏', '发射结反偏，集电结正偏', '发射结反偏，集电结反偏'],
      answer: 1,
      explanation: '放大区：发射结正偏（$U_{BE} \\approx 0.7V$），集电结反偏。饱和区：两个结都正偏。截止区：两个结都反偏。这是判断工作状态的关键。'
    },
    {
      question: '三极管的电流放大系数 $\\beta$ 定义是？',
      options: ['$\\beta = I_C / I_B$', '$\\beta = I_C / I_E$', '$\\beta = I_B / I_C$', '$\\beta = I_E / I_B$'],
      answer: 0,
      explanation: '$\\beta = I_C/I_B$（共发射极电流放大系数），一般 $\\beta = 50 \\sim 200$。$\\alpha = I_C/I_E$（共基极电流放大系数），$\\alpha \\approx 1$。$\\beta = \\alpha/(1-\\alpha)$。'
    },
    {
      question: '三极管放大电路中，静态工作点的含义是？',
      options: ['交流信号的幅值', '直流偏置的 $I_{BQ}$、$I_{CQ}$、$U_{CEQ}$', '最大输出功率', '截止频率'],
      answer: 1,
      explanation: '静态工作点 Q：无信号输入时的直流偏置值 $I_{BQ}$、$I_{CQ}$、$U_{CEQ}$。Q 点设置不当会导致截止失真或饱和失真。稳定 Q 点是放大电路设计的首要任务。'
    },
  ],

  'ana-04': [
    {
      question: '共射放大电路的特点是？',
      options: ['电压增益高，输入输出同相', '电压增益高，输入输出反相', '电压增益低，输入输出同相', '电压增益为 1'],
      answer: 1,
      explanation: '共射（CE）：电压增益高（几十到几百），输入输出反相（180° 相移）。输入阻抗中等，输出阻抗高。是最常用的放大组态。'
    },
    {
      question: '共集放大电路（射极跟随器）的特点是？',
      options: ['电压增益高', '电压增益约等于 1，输入输出同相', '电压增益为 0', '输入阻抗低'],
      answer: 1,
      explanation: '共集（CC）/射极跟随器：电压增益 $\\approx 1$（无电压放大），输入输出同相。特点是输入阻抗高、输出阻抗低，常用于阻抗匹配和缓冲。'
    },
    {
      question: '共基放大电路的特点是？',
      options: ['输入阻抗高', '高频特性好，输入输出同相', '电压增益低', '输出阻抗低'],
      answer: 1,
      explanation: '共基（CB）：电压增益高，输入输出同相，输入阻抗低，输出阻抗高。最大优点是高频特性好（没有密勒效应），常用于高频放大。'
    },
    {
      question: '放大电路产生截止失真的原因是？',
      options: ['Q 点太高', 'Q 点太低（进入截止区）', '输入信号太大', '负载太重'],
      answer: 1,
      explanation: '截止失真：Q 点太低，信号负半周进入截止区，输出波形底部被削平。解决：增大 $I_{BQ}$（减小 $R_B$）。饱和失真相反：Q 点太高，输出顶部被削平。'
    },
  ],

  'ana-05': [
    {
      question: '稳定静态工作点的常用方法是？',
      options: ['增大电源电压', '引入直流负反馈（分压偏置）', '减小负载电阻', '增大输入信号'],
      answer: 1,
      explanation: '分压偏置电路：$R_{B1}$、$R_{B2}$ 分压固定基极电位，$R_E$ 引入直流负反馈稳定 $I_C$。当 $I_C$ 增大时，$U_E$ 升高，$U_{BE}$ 减小，$I_B$ 减小，$I_C$ 回落。'
    },
    {
      question: '图解法分析放大电路时，直流负载线和交流负载线的区别是？',
      options: ['斜率不同', '直流负载线斜率 $-1/R_C$，交流负载线斜率 $-1/(R_C//R_L)$', '没有区别', '位置不同'],
      answer: 1,
      explanation: '直流负载线：斜率 $-1/R_C$，用于确定 Q 点。交流负载线：斜率 $-1/(R_C//R_L)$，通过 Q 点，用于分析动态范围。交流负载线更陡（阻值更小）。'
    },
  ],

  'ana-06': [
    {
      question: '多级放大电路的耦合方式有？',
      options: ['只有直接耦合', '阻容耦合、直接耦合、变压器耦合', '只有阻容耦合', '只有变压器耦合'],
      answer: 1,
      explanation: '三种耦合方式：①阻容耦合（简单，各级 Q 点独立，不能放大直流）；②直接耦合（可放大直流，但有零点漂移问题）；③变压器耦合（阻抗匹配，体积大）。集成电路主要用直接耦合。'
    },
    {
      question: '多级放大电路的总增益等于？',
      options: ['各级增益之和', '各级增益之积', '最后一级的增益', '第一级的增益'],
      answer: 1,
      explanation: '总增益 $A_v = A_{v1} \\cdot A_{v2} \\cdot \\cdots \\cdot A_{vn}$（各级增益之积）。注意：计算每级增益时要考虑后级的输入阻抗作为负载。'
    },
    {
      question: '直接耦合多级放大电路的主要问题是？',
      options: ['增益太低', '零点漂移', '带宽太窄', '输入阻抗太高'],
      answer: 1,
      explanation: '零点漂移：输入为零时输出缓慢漂移。主要由温度变化引起（温度漂移）。第一级漂移会被后面各级放大，影响最严重。解决：用差动放大电路作为第一级。'
    },
  ],

  'ana-07': [
    {
      question: '集成运放的输入级通常采用什么电路？',
      options: ['共射放大', '共集放大', '差动放大', '功率放大'],
      answer: 2,
      explanation: '差动放大电路作为输入级：抑制零点漂移（共模抑制比高），输入阻抗高。两个完全对称的管子，温度漂移互相抵消。这是集成运放的标准输入级结构。'
    },
    {
      question: '差模信号是指？',
      options: ['两个输入端的信号之和', '两个输入端的信号之差', '单端输入信号', '共模信号的反相'],
      answer: 1,
      explanation: '差模信号 $u_{id} = u_{i1} - u_{i2}$（两输入之差）。共模信号 $u_{ic} = (u_{i1} + u_{i2})/2$（两输入的平均值）。差动放大器放大差模、抑制共模。'
    },
    {
      question: '共模抑制比 $K_{CMRR}$ 的定义是？',
      options: ['$K_{CMRR} = A_d / A_c$', '$K_{CMRR} = A_c / A_d$', '$K_{CMRR} = A_d + A_c$', '$K_{CMRR} = A_d \\cdot A_c$'],
      answer: 0,
      explanation: '$K_{CMRR} = |A_d/A_c|$（差模增益与共模增益之比），通常用 dB 表示：$20\\log K_{CMRR}$。$K_{CMRR}$ 越大，抑制共模干扰能力越强。理想运放 $K_{CMRR} \\to \\infty$。'
    },
    {
      question: '理想运放的开环增益是？',
      options: ['1', '100', '无穷大', '0'],
      answer: 2,
      explanation: '理想运放：开环增益 $A_{od} \\to \\infty$，输入阻抗 $r_{id} \\to \\infty$，输出阻抗 $r_o \\to 0$，带宽 $BW \\to \\infty$，$K_{CMRR} \\to \\infty$。这些理想特性是分析运放电路的基础。'
    },
  ],

  'ana-08': [
    {
      question: '负反馈对放大电路的影响是？',
      options: ['增益增大', '增益减小，但稳定性提高', '增益不变', '带宽减小'],
      answer: 1,
      explanation: '负反馈：增益降低（$A_f = A/(1+AF)$），但增益稳定性提高、带宽展宽、非线性失真减小、输入/输出阻抗改善。"牺牲增益换性能"是负反馈的核心思想。'
    },
    {
      question: '电压串联负反馈的特点是？',
      options: ['输入阻抗降低，输出阻抗降低', '输入阻抗升高，输出阻抗降低', '输入阻抗降低，输出阻抗升高', '输入阻抗升高，输出阻抗升高'],
      answer: 1,
      explanation: '电压串联负反馈：输入阻抗升高（串联反馈），输出阻抗降低（电压反馈）。稳定输出电压。四种反馈组态对阻抗的影响不同，需要分别记忆。'
    },
    {
      question: '判断反馈类型时，"并联反馈"对输入阻抗的影响是？',
      options: ['增大', '减小', '不变', '无穷大'],
      answer: 1,
      explanation: '并联反馈：反馈信号与输入信号并联，降低输入阻抗。串联反馈：反馈信号与输入信号串联，提高输入阻抗。电流反馈稳定输出电流，电压反馈稳定输出电压。'
    },
    {
      question: '深度负反馈条件下，闭环增益约等于？',
      options: ['$A$', '$1/F$', '$AF$', '$A/(1+AF)$'],
      answer: 1,
      explanation: '深度负反馈（$AF \\gg 1$）：$A_f = A/(1+AF) \\approx 1/F$。闭环增益几乎只取决于反馈网络（通常是无源网络），与开环增益无关。这使得增益非常稳定。'
    },
  ],

  'ana-09': [
    {
      question: '反相比例运算电路的输出电压是？',
      options: ['$U_o = (1 + R_f/R_1)U_i$', '$U_o = -(R_f/R_1)U_i$', '$U_o = U_i$', '$U_o = -U_i$'],
      answer: 1,
      explanation: '反相比例：$U_o = -(R_f/R_1)U_i$。增益 $A_v = -R_f/R_1$，负号表示反相。输入阻抗较低（$R_1$），虚地点使输入端无共模信号。'
    },
    {
      question: '同相比例运算电路的输出电压是？',
      options: ['$U_o = (R_f/R_1)U_i$', '$U_o = -(R_f/R_1)U_i$', '$U_o = (1 + R_f/R_1)U_i$', '$U_o = U_i$'],
      answer: 2,
      explanation: '同相比例：$U_o = (1 + R_f/R_1)U_i$。增益 $A_v = 1 + R_f/R_1 \\ge 1$。输入阻抗高（运放输入端），有共模信号输入（需要注意共模抑制比）。'
    },
    {
      question: '积分运算电路的输出是？',
      options: ['$U_o = -RC \\frac{dU_i}{dt}$', '$U_o = -\\frac{1}{RC}\\int U_i\\,dt$', '$U_o = RC \\cdot U_i$', '$U_o = U_i / RC$'],
      answer: 1,
      explanation: '积分器：$U_o = -\\frac{1}{RC}\\int U_i\\,dt$。方波输入得到三角波输出。微分器：$U_o = -RC\\frac{dU_i}{dt}$。积分和微分互为逆运算。'
    },
    {
      question: '仪用放大器（测量放大器）的特点是？',
      options: ['增益低，输入阻抗低', '高增益、高输入阻抗、高共模抑制比', '只有反相输入', '只能放大直流'],
      answer: 1,
      explanation: '仪用放大器：三个运放组成，第一级双端输入高阻抗，第二级差分放大高共模抑制比。增益 $A_v = (1 + 2R_1/R_G)(R_3/R_2)$。常用于传感器信号调理。'
    },
  ],

  'ana-10': [
    {
      question: '电压比较器的功能是？',
      options: ['放大信号', '判断输入电压与参考电压的大小关系', '滤波', '积分'],
      answer: 1,
      explanation: '比较器：$U_i > U_{ref}$ 时输出高电平，$U_i < U_{ref}$ 时输出低电平。是运放的非线性应用（开环或正反馈）。用于波形变换、过零检测等。'
    },
    {
      question: '施密特触发器的特点是？',
      options: ['只有一个阈值', '有两个不同的阈值（滞回特性）', '输出为正弦波', '只能用作积分器'],
      answer: 1,
      explanation: '施密特触发器：上门限 $U_{T+}$ 和下门限 $U_{T-}$ 不同，具有滞回特性。输入上升时在 $U_{T+}$ 翻转，下降时在 $U_{T-}$ 翻转。能有效抗干扰（噪声不会引起误翻转）。'
    },
    {
      question: '方波发生器（多谐振荡器）的基本组成是？',
      options: ['运放 + RC 积分 + 正反馈', '只有电阻', '只有电容', '只有运放'],
      answer: 0,
      explanation: '方波发生器：运放（作为比较器）+ RC 积分（定时）+ 正反馈（产生两个暂态）。振荡频率 $f = 1/(2RC\\ln(1+2R_2/R_1))$。输出方波，电容上得到三角波。'
    },
  ],

  'ana-11': [
    {
      question: '有源滤波器相比无源滤波器的优点是？',
      options: ['更简单', '增益可大于 1，负载不影响滤波特性', '不需要电源', '频率范围更宽'],
      answer: 1,
      explanation: '有源滤波器：用运放 + RC 网络。优点：①可提供增益；②输出阻抗低，负载不影响滤波特性；③可实现高阶滤波。缺点：需要电源，带宽受运放限制。'
    },
    {
      question: 'Sallen-Key 低通滤波器是？',
      options: ['一阶滤波器', '二阶滤波器', '三阶滤波器', '四阶滤波器'],
      answer: 1,
      explanation: 'Sallen-Key 是经典的二阶有源滤波器拓扑。一个运放 + 4 个电阻 + 2 个电容实现二阶低通。级联两个 Sallen-Key 可得到四阶滤波器。'
    },
    {
      question: '巴特沃斯滤波器的特点是？',
      options: ['通带最平坦', '过渡带最陡', '相位最线性', '阶数最低'],
      answer: 0,
      explanation: '巴特沃斯（Butterworth）：通带最平坦（无纹波），但过渡带较宽。切比雪夫：过渡带陡但通带有纹波。贝塞尔：相位线性（群延迟恒定），适合脉冲信号。'
    },
  ],

  'ana-12': [
    {
      question: '甲类功率放大器的特点是？',
      options: ['效率最高，失真最大', '效率最低（≤50%），失真最小', '效率和失真都中等', '只能放大正半周'],
      answer: 1,
      explanation: '甲类：整个周期都有电流，失真最小但效率最低（理想 50%，实际 25~35%）。乙类：只有半周期导通，效率高（理想 78.5%）但有交越失真。甲乙类：介于两者之间。'
    },
    {
      question: '乙类推挽功率放大器的主要问题是？',
      options: ['效率太低', '交越失真', '增益太高', '带宽太窄'],
      answer: 1,
      explanation: '乙类推挽：两个管子各放大半个周期。问题是在信号过零附近（$U_{BE} < 0.5V$），两管都截止，产生交越失真。解决：加小偏置使管子微导通（变成甲乙类）。'
    },
    {
      question: 'OTL 和 OCL 电路的区别是？',
      options: ['OTL 有输出电容，OCL 无输出电容', 'OTL 效率更高', 'OCL 只能用 NPN 管', '没有区别'],
      answer: 0,
      explanation: 'OTL（Output TransformerLess）：有输出耦合电容，单电源供电。OCL（Output CapacitorLess）：无输出电容，双电源供电，低频特性更好。'
    },
    {
      question: '功率放大器中，功率管的最大功耗发生在？',
      options: ['输出最大功率时', '输出为零时', '输出为最大功率的一半时', '任何时候相同'],
      answer: 2,
      explanation: '乙类功放：最大管耗 $P_{Tmax} = V_{CC}^2/(2\\pi^2 R_L)$，发生在输出幅度为 $2V_{CC}/\\pi$ 时（不是最大输出时）。选管时要保证 $P_{CM} > P_{Tmax}$。'
    },
  ],

  'ana-13': [
    {
      question: '串联型稳压电源的基本组成是？',
      options: ['整流→滤波→稳压', '稳压→整流→滤波', '滤波→整流→稳压', '只有稳压'],
      answer: 0,
      explanation: '线性稳压电源：变压器→整流→滤波→稳压。串联型：调整管与负载串联，通过负反馈调节管压降使输出稳定。效率低（$\\eta \\approx U_o/U_i$），但纹波小。'
    },
    {
      question: 'LDO（低压差线性稳压器）的特点是？',
      options: ['压差大，效率高', '压差小（<1V），适合电池供电', '只能输出 5V', '需要外接电感'],
      answer: 1,
      explanation: 'LDO：压差通常 0.1~0.6V，电池电压下降到接近输出电压时仍能稳压。效率高于普通线性稳压器。缺点是效率仍受 $U_o/U_i$ 限制，大压差时发热严重。'
    },
    {
      question: '开关电源相比线性电源的优点是？',
      options: ['纹波更小', '效率更高（>80%）', '电路更简单', '噪声更低'],
      answer: 1,
      explanation: '开关电源：调整管工作在开关状态（饱和/截止），功耗小，效率可达 80~95%。缺点是纹波较大、EMI 问题。线性电源纹波小但效率低。'
    },
  ],

  'ana-14': [
    {
      question: '正弦波振荡器的起振条件是？',
      options: ['$|AF| < 1$', '$|AF| > 1$', '$|AF| = 1$', '$|AF| = 0$'],
      answer: 1,
      explanation: '起振条件：$|AF| > 1$（环路增益大于 1）。平衡条件：$|AF| = 1$，$\\varphi_A + \\varphi_F = 2n\\pi$（相位条件）。起振时增益略大，振幅增大后靠非线性限幅使增益降回 1。'
    },
    {
      question: 'RC 文氏桥振荡器的振荡频率是？',
      options: ['$f_0 = 1/(2\\pi RC)$', '$f_0 = RC$', '$f_0 = 1/(RC)$', '$f_0 = 2\\pi RC$'],
      answer: 0,
      explanation: '文氏桥振荡器：$f_0 = 1/(2\\pi RC)$，由 RC 串并联选频网络决定。$R_f/R_1 \\ge 2$ 保证起振。是最常用的低频正弦波振荡器。'
    },
    {
      question: 'LC 振荡器适用于什么频率范围？',
      options: ['低频（<1MHz）', '高频（>1MHz）', '只有 50Hz', '直流'],
      answer: 1,
      explanation: 'LC 振荡器：频率 $f_0 = 1/(2\\pi\\sqrt{LC})$，适合高频（MHz 级以上）。低频时 L、C 值太大不实用，用 RC 振荡器。石英晶体振荡器频率最稳定。'
    },
    {
      question: '石英晶体振荡器的优点是？',
      options: ['成本最低', '频率稳定性极高', '频率可调范围大', '输出功率大'],
      answer: 1,
      explanation: '石英晶体：利用压电效应，Q 值极高（$10^4 \\sim 10^6$），频率稳定性好（$10^{-6} \\sim 10^{-8}$）。缺点是频率固定（由晶体切割决定）。用于时钟基准、频率合成等。'
    },
  ],

  // ========== 数字电路 dig-01~dig-14 ==========
  'dig-01': [
    {
      question: '十进制数 13 的二进制表示是？',
      options: ['1011', '1101', '1110', '1001'],
      answer: 1,
      explanation: '$13 = 8 + 4 + 1 = 2^3 + 2^2 + 2^0$，二进制为 1101。转换方法：不断除 2 取余，或直接写出各 2 的幂次之和。'
    },
    {
      question: 'BCD 码（8421 码）中，十进制 9 表示为？',
      options: ['1001', '1010', '1000', '1100'],
      answer: 0,
      explanation: '8421 BCD 码：用 4 位二进制表示 0~9。9 = 8+1 = 1001。注意 BCD 码与纯二进制不同：BCD 码 1010 是非法码（没有对应十进制数）。'
    },
    {
      question: '格雷码的特点是？',
      options: ['相邻码只有一位不同', '权重为 8421', '与二进制完全相同', '只能表示 4 位'],
      answer: 0,
      explanation: '格雷码（循环码）：相邻两个码之间只有一位不同。用于减少信号变化时的竞争冒险。二进制转格雷码：$G_i = B_i \\oplus B_{i+1}$。'
    },
    {
      question: '原码、反码、补码中，零的表示唯一的是？',
      options: ['原码', '反码', '补码', '都唯一'],
      answer: 2,
      explanation: '补码中 0 的表示唯一：+0 和 -0 都是 0000。原码：+0 = 0000，-0 = 1000（两种）。反码：+0 = 0000，-0 = 1111（两种）。补码多表示一个负数（-8 对于 4 位）。'
    },
  ],

  'dig-02': [
    {
      question: '摩根定律（德摩根定律）的内容是？',
      options: ['$\\overline{A+B} = \\overline{A} \\cdot \\overline{B}$', '$\\overline{A \\cdot B} = \\overline{A} + \\overline{B}$', '以上都对', '$A + \\overline{A} = 1$'],
      answer: 2,
      explanation: '德摩根定律：$\\overline{A+B} = \\overline{A} \\cdot \\overline{B}$（或非 = 与非），$\\overline{A \\cdot B} = \\overline{A} + \\overline{B}$（与非 = 或非）。口诀："头上开花，符号变号"。'
    },
    {
      question: '卡诺图化简利用的是？',
      options: ['代入法', '相邻最小项合并消去变量', '配方法', '展开法'],
      answer: 1,
      explanation: '卡诺图：相邻格（包括首尾相邻）只有一位不同，合并可消去一个变量。圈越大，消去的变量越多，表达式越简。必须圈 2^n 个 1。'
    },
    {
      question: '4 变量卡诺图的最小项个数是？',
      options: ['4', '8', '16', '32'],
      answer: 2,
      explanation: '4 变量（ABCD）有 $2^4 = 16$ 个最小项，对应 16 个格子。排列用格雷码顺序（00, 01, 11, 10），保证相邻格只差一位。'
    },
    {
      question: '逻辑函数 $F = A + \\overline{A}B$ 化简结果是？',
      options: ['$F = A + B$', '$F = B$', '$F = A$', '$F = AB$'],
      answer: 0,
      explanation: '吸收律：$A + \\overline{A}B = A + B$。证明：$A + \\overline{A}B = A(1+B) + \\overline{A}B = A + AB + \\overline{A}B = A + B(A+\\overline{A}) = A + B$。这是常用化简公式。'
    },
  ],

  'dig-03': [
    {
      question: '组合逻辑电路的特点是？',
      options: ['有记忆功能', '无记忆功能，输出只取决于当前输入', '有时钟信号', '有反馈回路'],
      answer: 1,
      explanation: '组合逻辑：输出只取决于当前输入（无记忆）。时序逻辑：输出取决于当前输入和过去状态（有记忆）。组合逻辑没有反馈回路和存储元件。'
    },
    {
      question: '组合逻辑电路设计的一般步骤是？',
      options: ['列真值表→写表达式→化简→画电路', '画电路→列真值表→化简', '写表达式→列真值表→画电路', '先搭电路再分析'],
      answer: 0,
      explanation: '设计步骤：①列真值表（根据功能要求）；②写逻辑表达式（从真值表）；③化简（卡诺图或公式法）；④画电路图。分析步骤则反过来：从电路到真值表到功能。'
    },
    {
      question: '竞争冒险产生的原因是？',
      options: ['电源电压不稳', '信号通过不同路径到达时间不同', '温度变化', '负载太重'],
      answer: 1,
      explanation: '竞争：信号经不同路径到达同一点的时间不同。冒险：竞争可能导致输出产生毛刺（短暂的错误脉冲）。消除方法：加冗余项、加滤波电容、用格雷码。'
    },
  ],

  'dig-04': [
    {
      question: '3-8 译码器（74138）的输入输出关系是？',
      options: ['3 位输入选择 8 个输出中的一个为低', '3 位输入选择 8 个输出中的一个为高', '8 个输入编码为 3 位输出', '没有确定关系'],
      answer: 0,
      explanation: '74138：3 位输入（ABC）选择 8 个输出（$\\overline{Y_0} \\sim \\overline{Y_7}$）中的一个输出低电平（低有效）。使能端 $G1=1, \\overline{G2A}=\\overline{G2B}=0$ 时工作。'
    },
    {
      question: '数据选择器（MUX）的功能是？',
      options: ['把一个数据分到多个输出', '从多个输入中选择一个到输出', '编码', '译码'],
      answer: 1,
      explanation: '数据选择器（MUX）：根据选择信号，从多个输入中选一个送到输出。8 选 1 MUX 有 8 个数据输入、3 个选择输入、1 个输出。功能：$Y = D_i$（$i$ 由选择信号决定）。'
    },
    {
      question: '优先编码器与普通编码器的区别是？',
      options: ['没有区别', '优先编码器只编码最高优先级的输入', '优先编码器更快', '优先编码器更简单'],
      answer: 1,
      explanation: '普通编码器：同时只能有一个输入有效。优先编码器：允许多个输入同时有效，只编码优先级最高的那个（如 74148，输入 $\\overline{I_7}$ 优先级最高）。'
    },
  ],

  'dig-05': [
    {
      question: '半加器与全加器的区别是？',
      options: ['半加器只能加 1 位', '半加器无进位输入，全加器有进位输入', '全加器更快', '没有区别'],
      answer: 1,
      explanation: '半加器：两个 1 位相加，不考虑低位进位。$S = A \\oplus B$，$C = AB$。全加器：三个 1 位相加（含低位进位 $C_{in}$）。$S = A \\oplus B \\oplus C_{in}$，$C_{out} = AB + (A \\oplus B)C_{in}$。'
    },
    {
      question: '4 位并行加法器的进位方式是？',
      options: ['串行进位（逐级传递）', '并行进位（超前进位）', '以上两种都有', '无进位'],
      answer: 2,
      explanation: '串行进位：简单但慢（进位逐级传递）。超前进位（并行进位）：快速但电路复杂（直接计算各级进位）。实际常用折中方案：4 位一组超前进位，组间串行。'
    },
    {
      question: '数值比较器的功能是？',
      options: ['比较两个数的大小', '两个数相加', '两个数相乘', '两个数相除'],
      answer: 0,
      explanation: '数值比较器：比较两个二进制数的大小，输出 $A>B$、$A=B$、$A<B$ 三个信号。7485 是 4 位比较器，可级联扩展到更多位。'
    },
  ],

  'dig-06': [
    {
      question: '竞争冒险的判断方法是？',
      options: ['看是否有反馈', '看是否存在 $A \\cdot \\overline{A}$ 或 $A + \\overline{A}$ 的形式', '看是否有译码器', '看是否有触发器'],
      answer: 1,
      explanation: '冒险判断：逻辑表达式中存在某个变量既以原码又以反码出现（$A \\cdot \\overline{A}$ 或 $A + \\overline{A}$），且化简时消去了该变量，则可能产生冒险。'
    },
    {
      question: '消除竞争冒险的方法不包括？',
      options: ['加冗余项', '加滤波电容', '用格雷码编码', '增加触发器'],
      answer: 3,
      explanation: '消除方法：①加冗余项（卡诺图中多圈一个重叠项）；②加滤波电容（吸收毛刺）；③用格雷码（每次只变一位）；④引入选通脉冲。增加触发器是时序电路的方法。'
    },
  ],

  'dig-07': [
    {
      question: 'SR 触发器的约束条件是？',
      options: ['$S + R = 0$', '$S \\cdot R = 0$', '$S = R$', '$S + R = 1$'],
      answer: 1,
      explanation: 'SR 触发器约束：$S \\cdot R = 0$（S 和 R 不能同时为 1）。S=R=1 时输出不定（$Q = \\overline{Q}$，违反互补性）。JK 触发器没有这个约束。'
    },
    {
      question: 'D 触发器的特性方程是？',
      options: ['$Q^{n+1} = D$', '$Q^{n+1} = S + \\overline{R}Q^n$', '$Q^{n+1} = J\\overline{Q^n} + \\overline{K}Q^n$', '$Q^{n+1} = T \\oplus Q^n$'],
      answer: 0,
      explanation: 'D 触发器：$Q^{n+1} = D$（时钟沿到来后，输出等于输入 D）。用于数据锁存、移位寄存器。JK 触发器：$Q^{n+1} = J\\overline{Q^n} + \\overline{K}Q^n$，功能最全。'
    },
    {
      question: 'JK 触发器 J=K=1 时的功能是？',
      options: ['置 0', '置 1', '翻转（Toggle）', '保持'],
      answer: 2,
      explanation: 'JK 触发器：J=K=0 保持，J=K=1 翻转（$Q^{n+1} = \\overline{Q^n}$），J=1/K=0 置 1，J=0/K=1 置 0。J=K=1 时每来一个时钟翻转一次，可用于计数器。'
    },
    {
      question: '边沿触发电平触发的区别是？',
      options: ['没有区别', '边沿触发只在时钟沿瞬间采样，更抗干扰', '边沿触发更慢', '电平触发更可靠'],
      answer: 1,
      explanation: '电平触发：时钟高（或低）电平期间都可能触发，容易受干扰。边沿触发：只在时钟上升沿（或下降沿）瞬间采样输入，抗干扰能力强。现代数字系统几乎都用边沿触发。'
    },
  ],

  'dig-08': [
    {
      question: '时序逻辑电路与组合逻辑电路的根本区别是？',
      options: ['有无触发器', '有无反馈', '有无记忆功能', '以上都对'],
      answer: 3,
      explanation: '时序逻辑：有记忆（触发器/锁存器），输出取决于当前输入和过去状态。组合逻辑：无记忆，输出只取决于当前输入。时序电路有反馈回路和时钟信号。'
    },
    {
      question: '状态图中，圆圈表示？',
      options: ['输入', '输出', '状态', '时钟'],
      answer: 2,
      explanation: '状态图：圆圈表示状态（标注状态编码），箭头表示状态转移（标注 输入/输出）。状态表是状态图的表格形式。状态图是分析和设计时序电路的核心工具。'
    },
    {
      question: '同步时序电路与异步时序电路的区别是？',
      options: ['同步电路有统一时钟，异步电路没有', '同步电路更快', '异步电路更简单', '没有区别'],
      answer: 0,
      explanation: '同步：所有触发器由同一个时钟信号控制，状态同时变化。异步：各触发器时钟不同，状态变化有先后。同步电路设计简单、可靠，是主流方案。'
    },
  ],

  'dig-09': [
    {
      question: '4 位二进制计数器的模是？',
      options: ['4', '8', '16', '32'],
      answer: 2,
      explanation: '4 位二进制计数器：$2^4 = 16$ 个状态（0000~1111），模为 16。n 位二进制计数器模为 $2^n$。十进制计数器模为 10（BCD 码 0000~1001）。'
    },
    {
      question: '用反馈置零法实现任意模计数器的原理是？',
      options: ['计数到目标值时清零', '计数到最大值清零', '用译码器', '用分频器'],
      answer: 0,
      explanation: '反馈置零法：计数到 $M$（目标模值）时，通过反馈使计数器清零。注意：对于异步清零，反馈信号持续时间短，可能不可靠。同步清零更可靠。'
    },
    {
      question: '异步计数器（行波计数器）的缺点是？',
      options: ['电路复杂', '速度慢（逐级翻转）', '功耗大', '只能计小数'],
      answer: 1,
      explanation: '异步计数器：低位触发器的输出作为高位的时钟，逐级翻转。缺点：延迟累积，速度慢；可能出现中间状态（毛刺）。同步计数器所有位同时翻转，速度快。'
    },
    {
      question: '环形计数器的特点是？',
      options: ['每个状态只有一个 1', '计数模等于触发器个数', '不需要译码', '以上都对'],
      answer: 3,
      explanation: '环形计数器：移位寄存器首尾相连，$n$ 个触发器有 $n$ 个有效状态。优点：每个状态只有一个 1，不需要译码电路。缺点：利用率低（$n$ 个触发器只有 $n$ 个有效状态，$2^n - n$ 个无效状态）。'
    },
  ],

  'dig-10': [
    {
      question: '移位寄存器的基本功能是？',
      options: ['存储数据', '数据移位（左移/右移）', '计数', '译码'],
      answer: 1,
      explanation: '移位寄存器：在时钟作用下，数据逐位移动。右移：$Q_i^{n+1} = Q_{i-1}^n$；左移：$Q_i^{n+1} = Q_{i+1}^n$。可用于串-并转换、乘除法运算、序列检测等。'
    },
    {
      question: '串行输入并行输出（SIPO）的应用是？',
      options: ['并-串转换', '串-并转换', '计数', '译码'],
      answer: 1,
      explanation: 'SIPO：串行数据输入，并行数据输出。用于串行通信接收端，把串行数据转为并行处理。PISO（并入串出）用于发送端。'
    },
    {
      question: '约翰逊计数器（扭环计数器）的有效状态数是？',
      options: ['$2n$', '$n$', '$2^n$', '$n^2$'],
      answer: 0,
      explanation: '约翰逊计数器：$n$ 个触发器，$2n$ 个有效状态（比环形计数器多一倍）。结构：移位寄存器末级取反后反馈到首级。自启动：需要检查无效状态能否回到有效循环。'
    },
  ],

  'dig-11': [
    {
      question: '555 定时器构成多谐振荡器时，输出波形是？',
      options: ['正弦波', '方波（矩形波）', '三角波', '锯齿波'],
      answer: 1,
      explanation: '555 多谐振荡器：无稳态，输出连续方波。频率 $f = 1.44/[(R_1 + 2R_2)C]$，占空比 $D = (R_1 + R_2)/(R_1 + 2R_2)$。用两个电阻和一个电容即可产生方波。'
    },
    {
      question: '555 定时器构成单稳态触发器时，输出脉宽由什么决定？',
      options: ['输入信号频率', 'R 和 C 的值', '电源电压', '负载电阻'],
      answer: 1,
      explanation: '单稳态：触发后输出一个固定宽度的脉冲，脉宽 $t_w = 1.1RC$。触发信号只起触发作用，脉宽由 RC 时间常数决定。用于定时、延时、脉冲整形。'
    },
    {
      question: '施密特触发器的两个阈值电压分别由什么决定？',
      options: ['$V_{CC}$', '555 内部的三个 $5k\\Omega$ 电阻分压', '外部电阻', '外部电容'],
      answer: 1,
      explanation: '555 内部有三个 $5k\\Omega$ 电阻对 $V_{CC}$ 分压：$V_{T+} = 2V_{CC}/3$（上阈值），$V_{T-} = V_{CC}/3$（下阈值）。回差电压 $\\Delta V = V_{CC}/3$。可通过控制电压端（CO）调节。'
    },
  ],

  'dig-12': [
    {
      question: 'RAM 和 ROM 的区别是？',
      options: ['RAM 只读，ROM 可读写', 'RAM 断电丢失数据，ROM 断电保持数据', 'RAM 更快', 'ROM 容量更大'],
      answer: 1,
      explanation: 'RAM（随机存取存储器）：可读可写，断电数据丢失（易失性）。ROM（只读存储器）：正常工作只读，断电数据保持（非易失性）。ROM 用于存储固定程序（如 BIOS）。'
    },
    {
      question: 'SRAM 和 DRAM 的区别是？',
      options: ['SRAM 用触发器存储，DRAM 用电容存储', 'SRAM 更慢', 'DRAM 不需要刷新', '没有区别'],
      answer: 0,
      explanation: 'SRAM：用触发器（6 个晶体管）存储，速度快，不需要刷新，成本高。DRAM：用电容（1 个晶体管 + 1 个电容）存储，需要定期刷新（电容会漏电），密度高，用于主存。'
    },
    {
      question: '存储器容量 4K×8 的含义是？',
      options: ['4096 个地址，每个地址 8 位', '4096 个地址，每个地址 4 位', '8192 个地址，每个地址 8 位', '4096 个字节'],
      answer: 0,
      explanation: '$4K = 4096$ 个存储单元（地址），每个单元 8 位（1 字节）。总容量 = $4096 \\times 8 = 32768$ 位 = 4KB。地址线需要 $\\log_2(4096) = 12$ 根。'
    },
  ],

  'dig-13': [
    {
      question: 'DAC（数模转换器）的功能是？',
      options: ['把模拟信号变成数字信号', '把数字信号变成模拟信号', '放大信号', '滤波'],
      answer: 1,
      explanation: 'DAC：数字→模拟。输入数字量，输出对应的模拟电压（或电流）。ADC：模拟→数字。两者是数字系统与模拟世界的接口。'
    },
    {
      question: 'R-2R 梯形电阻网络 DAC 的优点是？',
      options: ['精度最高', '只用两种阻值的电阻', '速度最快', '最便宜'],
      answer: 1,
      explanation: 'R-2R 梯形网络：只用 $R$ 和 $2R$ 两种阻值，便于集成和校准。权电阻网络：电阻种类多（$R, 2R, 4R, 8R, \\ldots$），位数多时阻值范围太大。'
    },
    {
      question: 'ADC 的量化误差是？',
      options: ['可以消除的', '不可避免的，最大为 ±0.5LSB', '与位数无关', '与采样率有关'],
      answer: 1,
      explanation: '量化误差：连续模拟量用离散数字量表示时的固有误差。n 位 ADC，量化步长 $\\Delta = V_{ref}/2^n$，最大量化误差 $\\pm 0.5\\Delta = \\pm 0.5$ LSB。位数越多，量化误差越小。'
    },
    {
      question: '逐次逼近型 ADC 的工作原理是？',
      options: ['并行比较', '二分法逐位确定', '积分法', '计数法'],
      answer: 1,
      explanation: '逐次逼近：用 DAC 产生二分法猜测值，与输入比较，逐位确定。n 位需要 n 个时钟周期。速度中等，精度高，是最常用的 ADC 类型。'
    },
  ],

  'dig-14': [
    {
      question: 'Verilog 中 `assign` 语句用于描述？',
      options: ['时序逻辑', '组合逻辑', '状态机', '测试平台'],
      answer: 1,
      explanation: '`assign`（连续赋值）用于描述组合逻辑：`assign y = a & b;`。`always` 块用于描述时序逻辑（带时钟沿）或组合逻辑（敏感列表用 `*`）。'
    },
    {
      question: 'Verilog 中 `always @(posedge clk)` 描述的是？',
      options: ['组合逻辑', '时序逻辑（上升沿触发）', '电平敏感', '异步逻辑'],
      answer: 1,
      explanation: '`always @(posedge clk)` 在时钟上升沿触发，描述同步时序逻辑。`always @(posedge clk or posedge rst)` 描述异步复位的时序逻辑。`always @(*)` 描述组合逻辑。'
    },
    {
      question: '可综合的 Verilog 代码是指？',
      options: ['只能仿真不能综合', '可以转换为实际电路', '只能用于 FPGA', '只能用于 ASIC'],
      answer: 1,
      explanation: '可综合：代码可以被综合工具转换为门级电路（FPGA 或 ASIC）。有些 Verilog 语法（如 `initial`、`#delay`）只能用于仿真，不可综合。设计时必须区分可综合代码和仿真代码。'
    },
    {
      question: '阻塞赋值（`=`）和非阻塞赋值（`<=`）的区别是？',
      options: ['没有区别', '阻塞赋值立即执行，非阻塞赋值在块结束时同时执行', '阻塞赋值用于时序逻辑', '非阻塞赋值用于组合逻辑'],
      answer: 1,
      explanation: '阻塞 `=`：立即赋值，后续语句看到新值（用于组合逻辑）。非阻塞 `<=`：块结束时同时赋值，后续语句看到旧值（用于时序逻辑）。原则：组合逻辑用 `=`，时序逻辑用 `<=`。'
    },
  ],

  // ========== 数据结构 ds-05~ds-16 ==========
  'ds-05': [
    {
      question: '数组存储的特点是？',
      options: ['插入删除效率高', '随机访问效率高（O(1)）', '不需要连续空间', '大小可动态变化'],
      answer: 1,
      explanation: '数组：连续存储，支持随机访问（下标直接计算地址），时间 O(1)。缺点：插入/删除需要移动元素（O(n)），大小固定（静态数组）。'
    },
    {
      question: '对称矩阵压缩存储后，存储空间节省了多少？',
      options: ['0%', '约 50%', '75%', '90%'],
      answer: 1,
      explanation: '对称矩阵只需存储下三角（或上三角）+ 对角线，共 $n(n+1)/2$ 个元素，约为 $n^2/2$。节省约 50% 空间。映射关系：$k = i(i-1)/2 + j$（下三角按行存储）。'
    },
    {
      question: '稀疏矩阵的三元组表示法是？',
      options: ['存储所有元素', '只存储非零元素的（行，列，值）', '用链表存储', '用树存储'],
      answer: 1,
      explanation: '三元组：只存储非零元素，每个元素用（行号，列号，值）表示。当非零元素远少于总元素时，节省大量空间。缺点：随机访问效率降低。'
    },
  ],

  'ds-06': [
    {
      question: '二叉树的前序遍历顺序是？',
      options: ['左→根→右', '根→左→右', '左→右→根', '右→根→左'],
      answer: 1,
      explanation: '前序（先序）遍历：根→左→右。中序遍历：左→根→右。后序遍历：左→右→根。层序遍历：按层次从上到下从左到右。口诀："前中后"指的是根的位置。'
    },
    {
      question: '完全二叉树的特点是？',
      options: ['每个节点都有两个子节点', '除最后一层外每层都满，最后一层从左到右连续', '是满二叉树', '没有规律'],
      answer: 1,
      explanation: '完全二叉树：除最后一层外每层都满，最后一层节点从左到右连续。可以用数组存储：节点 $i$ 的左孩子 $2i$，右孩子 $2i+1$，父节点 $\\lfloor i/2 \\rfloor$。'
    },
    {
      question: 'n 个节点的完全二叉树的高度是？',
      options: ['$n$', '$\\log_2 n$', '$\\lfloor \\log_2 n \\rfloor + 1$', '$n-1$'],
      answer: 2,
      explanation: '高度 $h = \\lfloor \\log_2 n \\rfloor + 1$。例如 $n=7$ 时 $h=3$，$n=8$ 时 $h=4$。满二叉树是特殊的完全二叉树，$n = 2^h - 1$。'
    },
    {
      question: '二叉树的中序遍历结果是有序的，这棵树是？',
      options: ['完全二叉树', '二叉搜索树（BST）', '满二叉树', '平衡二叉树'],
      answer: 1,
      explanation: '二叉搜索树（BST）：左子树所有节点 < 根 < 右子树所有节点。中序遍历 BST 得到升序序列。这是 BST 的重要性质，可用于排序。'
    },
  ],

  'ds-07': [
    {
      question: 'AVL 树的平衡条件是？',
      options: ['左右子树高度相等', '任意节点左右子树高度差不超过 1', '所有叶子在同一层', '没有限制'],
      answer: 1,
      explanation: 'AVL 树：任意节点的左右子树高度差（平衡因子）$\\in \\{-1, 0, 1\\}$。插入/删除后如果不平衡，通过旋转（LL/RR/LR/RL）恢复平衡。保证查找效率 $O(\\log n)$。'
    },
    {
      question: 'BST 在最坏情况下的查找时间复杂度是？',
      options: ['$O(1)$', '$O(\\log n)$', '$O(n)$', '$O(n\\log n)$'],
      answer: 2,
      explanation: 'BST 最坏情况（退化为链表）：查找 $O(n)$。平衡 BST（AVL、红黑树）保证 $O(\\log n)$。所以需要自平衡树来避免最坏情况。'
    },
    {
      question: 'AVL 树 LL 型不平衡需要什么旋转？',
      options: ['左旋', '右旋', '先左后右', '先右后左'],
      answer: 1,
      explanation: 'LL 型：在左子树的左子树插入导致不平衡，需要右旋。RR 型：左旋。LR 型：先左旋再右旋。RL 型：先右旋再左旋。四种情况对应四种旋转。'
    },
  ],

  'ds-08': [
    {
      question: '红黑树相比 AVL 树的优势是？',
      options: ['查找更快', '插入删除时旋转次数更少（最多 3 次）', '实现更简单', '空间更小'],
      answer: 1,
      explanation: '红黑树：插入最多 2 次旋转，删除最多 3 次旋转。AVL 树：插入最多 2 次，删除可能需要 $O(\\log n)$ 次旋转。红黑树在频繁插入删除时性能更好。'
    },
    {
      question: 'B 树主要用于？',
      options: ['内存排序', '磁盘文件系统和数据库索引', '图算法', '字符串匹配'],
      answer: 1,
      explanation: 'B 树（及 B+ 树）：多路平衡搜索树，每个节点可以有多个子节点。减少树高 = 减少磁盘 I/O 次数。数据库索引（如 MySQL InnoDB）和文件系统（如 NTFS）都用 B+ 树。'
    },
    {
      question: 'B+ 树与 B 树的区别是？',
      options: ['B+ 树数据只在叶子节点，叶子节点有链表连接', 'B 树更平衡', 'B+ 树更简单', '没有区别'],
      answer: 0,
      explanation: 'B+ 树：数据只存在叶子节点，内部节点只存索引；叶子节点用链表连接，支持范围查询。B 树：内部节点也存数据。B+ 树更适合数据库索引（范围查询快，磁盘 I/O 少）。'
    },
  ],

  'ds-09': [
    {
      question: '最大堆的特点是？',
      options: ['根节点最小', '根节点最大，任意节点 >= 子节点', '是二叉搜索树', '叶子节点最大'],
      answer: 1,
      explanation: '最大堆：完全二叉树 + 任意节点的值 >= 其子节点的值。根节点是最大值。最小堆相反：根节点最小。堆用于优先队列、堆排序、Top-K 问题。'
    },
    {
      question: '建堆（Build Heap）的时间复杂度是？',
      options: ['$O(n\\log n)$', '$O(n)$', '$O(\\log n)$', '$O(n^2)$'],
      answer: 1,
      explanation: '建堆：从最后一个非叶子节点开始，依次向下调整。时间复杂度 $O(n)$（不是 $O(n\\log n)$！）。证明：$\\sum_{i=0}^{h} 2^i \\cdot (h-i) = O(n)$。'
    },
    {
      question: '堆排序的时间复杂度是？',
      options: ['$O(n)$', '$O(n\\log n)$', '$O(n^2)$', '$O(\\log n)$'],
      answer: 1,
      explanation: '堆排序：建堆 $O(n)$ + $n$ 次取堆顶并调整 $O(n\\log n)$ = $O(n\\log n)$。最坏、最好、平均都是 $O(n\\log n)$。缺点：不稳定，缓存不友好。'
    },
    {
      question: 'Top-K 问题（找最大的 K 个数）的高效方法是？',
      options: ['排序后取前 K 个', '用大小为 K 的最小堆', '用大小为 K 的最大堆', '遍历 K 次'],
      answer: 1,
      explanation: 'Top-K：维护一个大小为 K 的最小堆。遍历数据，比堆顶大则替换堆顶并调整。时间 $O(n\\log K)$，空间 $O(K)$。比排序 $O(n\\log n)$ 快（当 $K \\ll n$ 时）。'
    },
  ],

  'ds-10': [
    {
      question: '哈夫曼树的构建原则是？',
      options: ['权值大的节点离根近', '权值大的节点离根远', '所有叶子在同一层', '是完全二叉树'],
      answer: 0,
      explanation: '哈夫曼树（最优二叉树）：带权路径长度 WPL 最小。构建：每次选两个权值最小的节点合并，新节点权值为两者之和，重复直到只剩一个根。权值大的离根近。'
    },
    {
      question: '哈夫曼编码的特点是？',
      options: ['定长编码', '变长编码，频率高的字符编码短', '只能用于英文', '解码困难'],
      answer: 1,
      explanation: '哈夫曼编码：变长编码，频率高的字符用短编码，频率低的用长编码。是最优前缀编码（任何编码都不是另一个的前缀），保证无歧义解码。用于数据压缩。'
    },
    {
      question: '并查集（Union-Find）的两个基本操作是？',
      options: ['查找（Find）和合并（Union）', '入队和出队', '压栈和弹栈', '插入和删除'],
      answer: 0,
      explanation: '并查集：①Find(x)：找 x 所属集合的代表元素；②Union(x,y)：合并 x 和 y 所在的集合。路径压缩 + 按秩合并使操作近乎 $O(1)$。用于连通性判断、Kruskal 算法。'
    },
    {
      question: '并查集路径压缩的目的是？',
      options: ['减少空间', '使后续 Find 操作更快', '使树更平衡', '减少合并次数'],
      answer: 1,
      explanation: '路径压缩：Find 时把沿途所有节点直接指向根，使树扁平化。下次 Find 时直接找到根，时间近乎 $O(1)$。均摊复杂度 $O(\\alpha(n))$（$\\alpha$ 是反阿克曼函数，几乎为常数）。'
    },
  ],

  'ds-11': [
    {
      question: '邻接矩阵和邻接表的空间复杂度分别是？',
      options: ['都是 $O(n^2)$', '矩阵 $O(n^2)$，邻接表 $O(n+e)$', '都是 $O(n+e)$', '矩阵 $O(n+e)$，邻接表 $O(n^2)$'],
      answer: 1,
      explanation: '邻接矩阵：$O(n^2)$，适合稠密图。邻接表：$O(n+e)$（$e$ 为边数），适合稀疏图。邻接矩阵判断两点是否相邻 $O(1)$，邻接表需要遍历邻接链表。'
    },
    {
      question: 'DFS（深度优先搜索）使用什么数据结构？',
      options: ['队列', '栈（或递归调用栈）', '堆', '哈希表'],
      answer: 1,
      explanation: 'DFS：用栈（显式栈或递归调用栈）。先访问一个邻接节点，深入到底再回溯。BFS：用队列，逐层扩展。DFS 适合路径搜索、连通性判断；BFS 适合最短路径（无权图）。'
    },
    {
      question: 'BFS（广度优先搜索）的时间复杂度是？',
      options: ['$O(n)$', '$O(n+e)$', '$O(n^2)$', '$O(e)$'],
      answer: 1,
      explanation: 'BFS/DFS 时间复杂度：邻接表 $O(n+e)$（每个顶点和边各访问一次），邻接矩阵 $O(n^2)$（每个顶点要检查所有可能的邻接关系）。'
    },
    {
      question: '拓扑排序适用于？',
      options: ['任何图', '有向无环图（DAG）', '无向图', '有环图'],
      answer: 1,
      explanation: '拓扑排序：将 DAG 的所有顶点排成线性序列，使每条边 $(u,v)$ 中 $u$ 在 $v$ 前面。方法：不断删除入度为 0 的顶点。有环则无法完成拓扑排序（可用此检测环）。'
    },
  ],

  'ds-12': [
    {
      question: 'Dijkstra 算法求的是？',
      options: ['最小生成树', '单源最短路径（非负权）', '所有顶点对最短路径', '最大流'],
      answer: 1,
      explanation: 'Dijkstra：单源最短路径，要求边权非负。贪心策略：每次选距离最小的未访问顶点扩展。时间 $O((n+e)\\log n)$（优先队列优化）。负权边用 Bellman-Ford。'
    },
    {
      question: 'Prim 算法和 Kruskal 算法求的是？',
      options: ['最短路径', '最小生成树', '最大流', '拓扑排序'],
      answer: 1,
      explanation: 'Prim：从一个顶点开始，每次选最短的跨切边扩展（类似 Dijkstra）。Kruskal：按边权排序，依次加入不构成环的边。两者都用贪心，都能得到最小生成树。'
    },
    {
      question: 'Floyd 算法的时间复杂度是？',
      options: ['$O(n^2)$', '$O(n^3)$', '$O(ne)$', '$O(n^2\\log n)$'],
      answer: 1,
      explanation: 'Floyd：所有顶点对最短路径，$O(n^3)$。三重循环：$k, i, j$，$d[i][j] = \\min(d[i][j], d[i][k]+d[k][j])$。动态规划思想。适合稠密图，稀疏图用 $n$ 次 Dijkstra。'
    },
    {
      question: '关键路径是？',
      options: ['最短路径', '最长路径（决定工期）', '任意路径', '最小生成树'],
      answer: 1,
      explanation: '关键路径：AOE 网中从源到汇的最长路径，决定工程最短工期。关键活动（关键路径上的活动）没有余量，延迟则工期延长。用拓扑排序 + 求最早/最晚时间。'
    },
  ],

  'ds-13': [
    {
      question: '折半查找（二分查找）的要求是？',
      options: ['无序数组', '有序数组', '链表', '树'],
      answer: 1,
      explanation: '折半查找：要求数据有序（升序或降序），且支持随机访问（数组）。每次比较中间元素，缩小一半范围。时间 $O(\\log n)$。链表不能用折半查找（无法随机访问）。'
    },
    {
      question: '哈希表（散列表）的查找时间复杂度是？',
      options: ['$O(n)$', '$O(1)$（平均）', '$O(\\log n)$', '$O(n\\log n)$'],
      answer: 1,
      explanation: '哈希表：通过哈希函数直接计算存储位置，平均 $O(1)$。最坏 $O(n$（所有元素冲突到同一位置）。好的哈希函数 + 合适的装填因子是关键。'
    },
    {
      question: '哈希冲突的解决方法有？',
      options: ['只能换哈希函数', '开放定址法和链地址法', '只能增加表长', '无法解决'],
      answer: 1,
      explanation: '链地址法（拉链法）：冲突的元素用链表串起来。开放定址法：冲突时按某种探测序列找下一个空位（线性探测、二次探测、双重散列）。链地址法更常用。'
    },
    {
      question: '装填因子 $\\alpha$ 的定义是？',
      options: ['$\\alpha = n/m$（$n$ 为元素个数，$m$ 为表长）', '$\\alpha = m/n$', '$\\alpha = n + m$', '$\\alpha = n \\cdot m$'],
      answer: 0,
      explanation: '装填因子 $\\alpha = n/m$，$\\alpha$ 越大，冲突越多。一般控制 $\\alpha < 0.75$（链地址法可稍大）。$\\alpha$ 接近 1 时性能急剧下降。'
    },
  ],

  'ds-14': [
    {
      question: '快速排序的平均时间复杂度是？',
      options: ['$O(n)$', '$O(n\\log n)$', '$O(n^2)$', '$O(\\log n)$'],
      answer: 1,
      explanation: '快速排序：平均 $O(n\\log n)$，最坏 $O(n^2)$（已排序数组 + 固定选首元素为基准）。随机选基准或三数取中可避免最坏情况。实际应用中最快的比较排序。'
    },
    {
      question: '归并排序的特点是？',
      options: ['不稳定，空间 O(1)', '稳定，空间 O(n)，时间始终 O(n\\log n)', '不稳定，时间 O(n²)', '稳定，空间 O(1)'],
      answer: 1,
      explanation: '归并排序：稳定，时间 $O(n\\log n)$（最好最坏都是），空间 $O(n)$（需要额外数组）。缺点是空间开销。链表排序首选归并（不需要额外空间）。'
    },
    {
      question: '以下排序算法中，不稳定的是？',
      options: ['冒泡排序', '插入排序', '快速排序', '归并排序'],
      answer: 2,
      explanation: '不稳定排序：快速排序、选择排序、希尔排序、堆排序。稳定排序：冒泡、插入、归并、基数、计数。稳定性在多关键字排序时很重要（先按次要关键字排，再按主要关键字排）。'
    },
    {
      question: '堆排序的空间复杂度是？',
      options: ['$O(n)$', '$O(1)$', '$O(\\log n)$', '$O(n^2)$'],
      answer: 1,
      explanation: '堆排序：原地排序，空间 $O(1)$。时间 $O(n\\log n)$（最好最坏都是）。缺点：不稳定，缓存不友好（跳跃访问数组）。'
    },
    {
      question: '基数排序的时间复杂度是？',
      options: ['$O(n\\log n)$', '$O(d \\cdot n)$（$d$ 为位数）', '$O(n^2)$', '$O(n)$'],
      answer: 1,
      explanation: '基数排序：$O(d \\cdot n)$，$d$ 是最大数的位数。不基于比较，利用"分配-收集"思想。适合位数固定且范围不大的整数排序。稳定排序。'
    },
  ],

  'ds-15': [
    {
      question: '外排序主要用于？',
      options: ['内存排序', '数据量超过内存容量的排序', '链表排序', '小数据量排序'],
      answer: 1,
      explanation: '外排序：数据量太大无法全部装入内存，需要在磁盘上进行排序。核心思想：多路归并——先生成初始归并段，再多路归并。减少磁盘 I/O 是关键。'
    },
    {
      question: '败者树在外排序中的作用是？',
      options: ['存储数据', '在 k 路归并中快速找到最小元素', '压缩数据', '加密数据'],
      answer: 1,
      explanation: '败者树：完全二叉树结构，用于 k 路归并中快速找最小值。每选出一个最小值只需比较 $\\lceil \\log_2 k \\rceil$ 次（而不是 $k-1$ 次）。减少 CPU 比较时间。'
    },
    {
      question: '置换-选择排序的作用是？',
      options: ['生成更长的初始归并段', '直接完成排序', '压缩数据', '查找数据'],
      answer: 0,
      explanation: '置换-选择排序：用最小堆从输入中选出尽可能长的有序子序列作为初始归并段。生成的归并段长度可以超过内存容量（平均为内存大小的 2 倍），减少归并趟数。'
    },
  ],

  'ds-16': [
    {
      question: '跳表（Skip List）的查找时间复杂度是？',
      options: ['$O(n)$', '$O(\\log n)$（平均）', '$O(1)$', '$O(n\\log n)$'],
      answer: 1,
      explanation: '跳表：多层有序链表，底层包含所有元素，上层是"快速通道"。查找时从顶层开始，逐层下降。平均 $O(\\log n)$，与平衡树相当，但实现更简单。Redis 用跳表实现有序集合。'
    },
    {
      question: '布隆过滤器（Bloom Filter）的特点是？',
      options: ['可以删除元素', '可能误报（false positive），不会漏报', '精确查找', '空间效率低'],
      answer: 1,
      explanation: '布隆过滤器：用多个哈希函数 + 位数组判断元素是否存在。特点：说"不存在"一定不存在，说"存在"可能误报。空间效率极高，用于网页爬虫去重、缓存穿透防护。'
    },
    {
      question: 'LRU 缓存淘汰策略是？',
      options: ['淘汰最近最少使用的', '淘汰最先进入的', '淘汰最常用的', '随机淘汰'],
      answer: 0,
      explanation: 'LRU（Least Recently Used）：淘汰最久未被访问的数据。实现：哈希表 + 双向链表，查找 $O(1)$，更新 $O(1)$。操作系统页面置换、数据库缓存常用 LRU。'
    },
    {
      question: 'Trie 树（字典树）的主要应用是？',
      options: ['数值排序', '字符串前缀匹配和自动补全', '图遍历', '数值查找'],
      answer: 1,
      explanation: 'Trie 树：每个节点代表一个字符，从根到叶子构成一个字符串。前缀匹配 $O(m)$（$m$ 为模式串长度），与字典大小无关。用于搜索引擎自动补全、拼写检查、IP 路由表。'
    },
  ],




};
