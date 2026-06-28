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
      { id: 'hm-01', title: '函数极限与连续', desc: '等价无穷小、夹逼准则、洛必达法则', icon: '📈', tags: ['高频考点'], goals: { exam: true }, content: '' },
      { id: 'hm-02', title: '一元微分学', desc: '导数定义、微分中值定理', icon: '📉', tags: ['核心'], goals: { exam: true }, content: '' },
      { id: 'hm-03', title: '泰勒公式与函数展开', desc: '麦克劳林展开、余项估计', icon: '📐', tags: ['高频'], goals: { exam: true }, content: '' },
      { id: 'hm-04', title: '导数应用', desc: '单调性、极值、凹凸性、渐近线、曲率', icon: '📊', tags: [], goals: { exam: true }, content: '' },
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

// 自测题库（按 section id 索引）。第 0 期为空，后续逐板块填充。
const QuizData = {};
