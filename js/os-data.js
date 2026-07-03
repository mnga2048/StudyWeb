// 专业课学习平台 - 操作系统内容数据层
// 9 节骨架数据：进程管理、内存管理、文件系统、I/O 系统、死锁、分布式与现代 OS

  // ========== 操作系统 ==========
  'os': {
    title: '操作系统',
    subtitle: '进程管理、内存管理、文件系统与 I/O，计算机系统核心与 RTOS 基础',
    icon: '🖥️',
    sections: [

      // ==================== os-01 ====================
      { id: 'os-01', title: '操作系统概述', desc: 'OS 定义、发展历史、内核结构、系统调用', icon: '🎯', tags: ['核心'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">操作系统概述：计算机系统的灵魂</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          操作系统（Operating System）是管理计算机硬件与软件资源的系统软件，是用户与硬件之间的桥梁。它为应用程序提供统一的抽象接口，使复杂的硬件细节对用户透明。从批处理系统到分时系统、从单任务到多任务，操作系统的发展史就是计算机科学的发展史。
        </p>

        <h4 class="font-medium mt-6 mb-2">操作系统的定义与目标</h4>
        <div class="formula-block">
          操作系统 = 资源管理者 + 用户接口<br><br>
          核心目标：<strong>方便性</strong>（降低使用门槛）&nbsp;|&nbsp;<strong>有效性</strong>（提高资源利用率）<br>
          扩展目标：<strong>可扩充性</strong>（模块化设计）&nbsp;|&nbsp;<strong>开放性</strong>（兼容标准接口）
          <div class="text-sm text-gray-500 mt-2">现代 OS 还需关注安全性、实时性和能效比</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">操作系统的发展历程</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>手工操作阶段</strong>：无 OS，程序员直接操作硬件（打孔卡片），CPU 利用率极低。</li>
          <li><strong>批处理系统</strong>：脱机/联机批处理，引入监督程序（Monitor），自动调度作业。CPU 利用率提升但仍有人工干预。</li>
          <li><strong>分时系统</strong>：多用户共享一台计算机，通过时间片轮转实现"同时"响应。CTSS、UNIX 是经典代表。</li>
          <li><strong>实时系统</strong>：对外部事件在规定时间内做出响应。分为硬实时（绝对时限）和软实时（允许偶尔超时）。见 <a href="javascript:void(0)" onclick="App.loadDetail('emb-08')">嵌入式·RTOS</a>。</li>
          <li><strong>现代 OS</strong>：多核、分布式、虚拟化、容器化并行发展。Linux、Windows、macOS、Android 各有侧重。</li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">内核结构对比</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>结构</th><th>特点</th><th>代表系统</th><th>优缺点</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">宏内核</td><td>所有核心模块运行在内核态</td><td>Linux、Windows</td><td>性能高，但模块耦合度高、故障影响大</td></tr>
            <tr><td class="font-medium">微内核</td><td>仅保留最小内核，服务运行在用户态</td><td>QNX、Minix、seL4</td><td>可靠性高、易扩展，但 IPC 开销大</td></tr>
            <tr><td class="font-medium">混合内核</td><td>宏内核+微内核折中</td><td>Windows NT、macOS (XNU)</td><td>兼顾性能与模块化</td></tr>
            <tr><td class="font-medium">外核</td><td>内核只做资源绑定，策略完全由应用决定</td><td>MIT Exokernel（研究）</td><td>极致灵活性，但编程复杂度高</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">系统调用与用户态/内核态</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>用户态 vs 内核态</strong>：CPU 的两种特权级别。用户态程序不能直接访问硬件和内核数据结构，必须通过系统调用陷入内核态执行。</div></div>
          <div class="step-item"><div><strong>系统调用过程</strong>：用户程序调用库函数（如 printf）-&gt; 库函数执行 trap 指令（如 int 0x80/syscall）-&gt; CPU 切换到内核态 -&gt; 内核执行对应处理函数 -&gt; 返回用户态。</div></div>
          <div class="step-item"><div><strong>系统调用分类</strong>：进程控制（fork/exec）、文件管理（open/read/write）、设备管理（ioctl）、信息维护（getpid）、通信（pipe/shmget）。</div></div>
        </div>

        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>考试要点</strong>：系统调用是 OS 概述的高频考点。区分"系统调用"与"库函数"——前者陷入内核态（如 read/write），后者在用户态执行（如 strlen/memcpy）。系统调用是操作系统提供给用户的唯一入口。</div>
        </div>

        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>易混概念</strong>：中断（Interrupt）是外部事件触发（如 I/O 完成），异常（Exception/Trap）是 CPU 内部事件触发（如除零、系统调用）。两者都会导致 CPU 从用户态切换到内核态，但触发源和处理方式不同。</div>
        </div>

        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：系统调用的 trap 机制与 <a href="javascript:void(0)" onclick="App.loadDetail('os-07')">I/O 系统·中断处理</a> 密切相关。微内核设计思路在 <a href="javascript:void(0)" onclick="App.loadDetail('os-09')">分布式与现代 OS</a> 中有更深入的讨论。<a href="javascript:void(0)" onclick="App.loadDetail('emb-08')">嵌入式·RTOS</a> 的内核结构是实时操作系统的典型实现。</div>
        </div>
      ` },

      // ==================== os-02 ====================
      { id: 'os-02', title: '进程与线程', desc: '进程模型、PCB、线程、协程、上下文切换', icon: '🔄', tags: ['核心','高频考点'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">进程与线程：并发的基石</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          进程是操作系统进行资源分配和调度的基本单位，线程是 CPU 调度的基本单位。一个进程可以包含多个线程，线程共享进程的地址空间但拥有独立的栈和寄存器。理解进程与线程的区别，是掌握并发编程和操作系统调度机制的关键。
        </p>

        <h4 class="font-medium mt-6 mb-2">进程的定义与 PCB</h4>
        <div class="formula-block">
          进程 = 程序 + 数据 + PCB（进程控制块）<br><br>
          PCB 是操作系统感知进程存在的唯一标志，包含：<br>
          <strong>pid</strong>（进程标识）| <strong>进程状态</strong> | <strong>程序计数器 PC</strong> | <strong>寄存器值</strong><br>
          <strong>内存管理信息</strong>（页表基址等）| <strong>I/O 状态</strong> | <strong>调度信息</strong>（优先级等）
          <div class="text-sm text-gray-500 mt-2">PCB 常组织为链表或索引表：就绪队列、阻塞队列、运行队列</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">进程状态转换</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>五状态模型</strong>：新建 -&gt; 就绪 -&gt; 运行 -&gt; 阻塞 -&gt; 终止。就绪态等待 CPU，运行态占有 CPU，阻塞态等待事件（如 I/O 完成）。</div></div>
          <div class="step-item"><div><strong>就绪 -&gt; 运行</strong>：被调度程序选中（进程调度，见 <a href="javascript:void(0)" onclick="App.loadDetail('os-04')">处理器调度</a>）。</div></div>
          <div class="step-item"><div><strong>运行 -&gt; 阻塞</strong>：进程主动请求资源（如等待 I/O），是进程自身的行为，不能由调度程序强制。</div></div>
          <div class="step-item"><div><strong>阻塞 -&gt; 就绪</strong>：等待的事件发生（如 I/O 完成中断），由操作系统被动唤醒。</div></div>
          <div class="step-item"><div><strong>运行 -&gt; 就绪</strong>：时间片用完或被高优先级进程抢占，是被动行为。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">进程 vs 线程 vs 协程</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>特性</th><th>进程</th><th>线程</th><th>协程</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">调度单位</td><td>资源分配</td><td>CPU 调度</td><td>用户态调度</td></tr>
            <tr><td class="font-medium">地址空间</td><td>独立</td><td>共享所属进程</td><td>共享所属线程</td></tr>
            <tr><td class="font-medium">切换开销</td><td>大（切换页表+TLB）</td><td>中（切换栈+寄存器）</td><td>小（仅切栈指针）</td></tr>
            <tr><td class="font-medium">通信方式</td><td>IPC（管道/共享内存等）</td><td>共享变量（需同步）</td><td>直接函数调用</td></tr>
            <tr><td class="font-medium">典型实现</td><td>fork()、CreateProcess</td><td>pthread、std::thread</td><td>Go goroutine、Python asyncio</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">上下文切换（Context Switch）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          上下文切换是 CPU 从一个进程/线程切换到另一个的过程。操作系统必须保存当前进程的寄存器状态到 PCB，再从新进程的 PCB 恢复寄存器。这个过程是纯开销——切换期间 CPU 不执行任何有用的用户代码。
        </p>
        <div class="formula-block">
          $$\\text{上下文切换时间} \\approx 1\\text{-}10\\,\\mu s \\quad (\\text{取决于硬件和 OS 实现})$$
          $$\\text{切换次数} \\uparrow \\;\\Rightarrow\\; \\text{有效 CPU 利用率} \\downarrow$$
          <div class="text-sm text-gray-500 mt-2">Linux 内核 5.x 的上下文切换约 1-2 μs；线程切换比进程切换快 2-5 倍</div>
        </div>

        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>考试要点</strong>：进程与线程的区别是必考题。记住三个维度：①资源分配 vs CPU 调度 ②独立地址空间 vs 共享 ③进程间通信 vs 共享变量。线程共享的资源：代码段、数据段、堆、打开的文件。线程独享的：栈、寄存器、程序计数器。</div>
        </div>

        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>陷阱区分</strong>："运行 -&gt; 就绪"是被动的（时间片到/被抢占），"运行 -&gt; 阻塞"是主动的（请求资源）。考试常问"进程能否从就绪态直接转为阻塞态？"——答案是<strong>不能</strong>，就绪态意味着不缺资源、只缺 CPU。</div>
        </div>

        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：线程共享地址空间的设计与 <a href="javascript:void(0)" onclick="App.loadDetail('os-05')">内存管理·页表</a> 紧密关联。线程同步问题在 <a href="javascript:void(0)" onclick="App.loadDetail('os-03')">进程同步与通信</a> 中详解。协程与 <a href="javascript:void(0)" onclick="App.loadDetail('ds-02')">数据结构·栈</a> 的调用栈概念一脉相承。</div>
        </div>
      ` },

      // ==================== os-03 ====================
      { id: 'os-03', title: '进程同步与通信', desc: '互斥、信号量、管程、死锁、IPC', icon: '🔒', tags: ['高频考点','难点'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">进程同步与通信：并发世界的秩序</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          当多个进程/线程并发访问共享资源时，必须有同步机制保证数据一致性。进程同步解决"执行顺序"问题，进程通信解决"数据交换"问题。信号量、管程、互斥锁是经典的同步原语，而管道、消息队列、共享内存是常用的 IPC 方式。
        </p>

        <h4 class="font-medium mt-6 mb-2">临界区与互斥</h4>
        <div class="formula-block">
          临界区（Critical Section）：访问共享资源的代码段<br><br>
          互斥的四个条件：<br>
          <strong>空闲让进</strong> | <strong>忙则等待</strong> | <strong>有限等待</strong> | <strong>让权等待</strong>
          <div class="text-sm text-gray-500 mt-2">Peterson 算法是纯软件实现互斥的经典方案（适用于双进程）</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">信号量（Semaphore）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          信号量由 Dijkstra 提出，是一个整型变量 + 两个原子操作（P/V 操作）。它是解决同步和互斥问题的通用工具。
        </p>
        <div class="formula-block">
          $$S \\geq 0: \\text{可用资源数} \\qquad S &lt; 0: \\text{|S| 个进程在等待队列中}$$
          <strong>P 操作（wait/down）</strong>：$S = S - 1$，若 $S &lt; 0$ 则阻塞当前进程<br>
          <strong>V 操作（signal/up）</strong>：$S = S + 1$，若 $S \\leq 0$ 则唤醒一个等待进程
        </div>
        <div class="step-list">
          <div class="step-item"><div><strong>互斥信号量</strong>：$S = 1$（二值信号量），进入临界区前 P(S)，离开时 V(S)。等价于互斥锁（Mutex）。</div></div>
          <div class="step-item"><div><strong>同步信号量</strong>：$S = 0$，用于控制执行顺序。若要求 A 先于 B 执行，则 B 中 P(S)、A 中 V(S)。</div></div>
          <div class="step-item"><div><strong>资源计数信号量</strong>：$S = N$（N 为资源数量），如缓冲区空位数。生产者-消费者问题的经典解法。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">经典同步问题</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>问题</th><th>核心</th><th>信号量设置</th><th>关键约束</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">生产者-消费者</td><td>有限缓冲区同步</td><td>mutex=1, empty=N, full=0</td><td>先 P(empty/full) 再 P(mutex)</td></tr>
            <tr><td class="font-medium">读者-写者</td><td>读并发、写互斥</td><td>rw=1, mutex=1, count</td><td>写者优先 or 读者优先</td></tr>
            <tr><td class="font-medium">哲学家就餐</td><td>避免死锁的互斥</td><td>chopstick[5]={1,1,1,1,1}</td><td>限制同时就餐人数/奇偶策略</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">管程（Monitor）</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          管程是比信号量更高层的同步抽象：将共享数据和操作封装在一个模块中，同一时刻只有一个进程能进入管程。Java 的 synchronized 关键字本质上就是管程机制。
        </p>

        <h4 class="font-medium mt-6 mb-2">进程间通信（IPC）方式</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>IPC 方式</th><th>原理</th><th>适用场景</th><th>性能</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">管道（Pipe）</td><td>内核缓冲区，单向字节流</td><td>父子进程通信</td><td>中等，需内核拷贝</td></tr>
            <tr><td class="font-medium">消息队列</td><td>内核中的链表，按消息类型读取</td><td>异步、结构化通信</td><td>中等</td></tr>
            <tr><td class="font-medium">共享内存</td><td>映射同一物理页到多个进程</td><td>大数据量、高性能</td><td>最快（零拷贝）</td></tr>
            <tr><td class="font-medium">信号（Signal）</td><td>异步通知机制</td><td>通知异常/事件</td><td>仅传递信号编号</td></tr>
            <tr><td class="font-medium">Socket</td><td>网络/本地通信套接字</td><td>跨机器通信</td><td>取决于协议</td></tr>
          </tbody>
        </table></div>

        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>考试要点</strong>：信号量 PV 操作是大题必考。记住口诀："互斥 P 在同步 P 之后"——生产者-消费者中，先 P(empty) 再 P(mutex)，否则会死锁。信号量的初值决定了它是互斥型（=1）还是同步型（=0）还是计数型（=N）。</div>
        </div>

        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>PV 操作顺序错误</strong>：若把生产者写成 P(mutex) -&gt; P(empty)，当 empty=0 时，进程在持有 mutex 的情况下阻塞，导致死锁。正确顺序：P(empty) -&gt; P(mutex) -&gt; 临界区 -&gt; V(mutex) -&gt; V(full)。</div>
        </div>

        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：共享内存 IPC 与 <a href="javascript:void(0)" onclick="App.loadDetail('os-05')">内存管理·页表映射</a> 直接相关。哲学家就餐问题是 <a href="javascript:void(0)" onclick="App.loadDetail('os-08')">死锁</a> 的经典案例。管程机制在 <a href="javascript:void(0)" onclick="App.loadDetail('emb-08')">嵌入式·RTOS</a> 中有轻量级实现（如 FreeRTOS 的 mutex/semaphore）。</div>
        </div>
      ` },

      // ==================== os-04 ====================
      { id: 'os-04', title: '处理器调度', desc: '调度算法、实时调度、多核调度', icon: '⚖️', tags: ['核心','高频考点'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">处理器调度：CPU 时间的分配艺术</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          处理器调度决定"下一个获得 CPU 的进程是谁"。调度算法直接影响系统的吞吐量、响应时间和公平性。从简单的先来先服务到复杂的时间片轮转、多级反馈队列，每种算法都有其适用场景。实时系统和多核系统对调度提出了更高的要求。
        </p>

        <h4 class="font-medium mt-6 mb-2">调度层次</h4>
        <div class="formula-block">
          <strong>高级调度（作业调度）</strong>：从外存选作业调入内存，频率低（秒/分钟级）<br>
          <strong>中级调度（内存调度）</strong>：将进程换出到外存（挂起），缓解内存压力<br>
          <strong>低级调度（进程调度）</strong>：从就绪队列选进程分配 CPU，频率高（毫秒级）
          <div class="text-sm text-gray-500 mt-2">低级调度是 OS 调度的核心，本节重点讨论</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">调度算法评价指标</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>指标</th><th>定义</th><th>优化目标</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">CPU 利用率</td><td>CPU 忙碌时间占比</td><td>越高越好（&gt; 40% 合理）</td></tr>
            <tr><td class="font-medium">系统吞吐量</td><td>单位时间完成的作业数</td><td>越高越好</td></tr>
            <tr><td class="font-medium">周转时间</td><td>作业完成时间 - 到达时间</td><td>越短越好</td></tr>
            <tr><td class="font-medium">等待时间</td><td>进程在就绪队列中等待的总时间</td><td>越短越好</td></tr>
            <tr><td class="font-medium">响应时间</td><td>从提交请求到首次响应的时间</td><td>越短越好（交互系统关键）</td></tr>
          </tbody>
        </table></div>
        <div class="formula-block">
          $$\\text{周转时间} = \\text{完成时间} - \\text{到达时间} \\qquad \\text{带权周转时间} = \\frac{\\text{周转时间}}{\\text{服务时间}}$$
          <div class="text-sm text-gray-500 mt-2">带权周转时间 &ge; 1，越接近 1 说明等待越少</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">经典调度算法</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>FCFS（先来先服务）</strong>：按到达顺序执行。非抢占式，简单公平，但对短作业不友好（"护航效应"——短作业被长作业阻塞）。</div></div>
          <div class="step-item"><div><strong>SJF（短作业优先）</strong>：选服务时间最短的进程。平均等待时间最优（理论证明），但可能导致长作业"饥饿"。非抢占式 SJF 和抢占式 SRTF（最短剩余时间优先）两种变体。</div></div>
          <div class="step-item"><div><strong>RR（时间片轮转）</strong>：每个进程运行一个时间片后切换。抢占式，响应时间好，适合交互系统。时间片太大退化为 FCFS，太小则上下文切换开销过大。</div></div>
          <div class="step-item"><div><strong>优先级调度</strong>：按优先级选进程。静态优先级简单但可能饥饿，动态优先级（如老化机制）可缓解。Linux 使用 CFS（完全公平调度器）基于虚拟运行时间。</div></div>
          <div class="step-item"><div><strong>MFQ（多级反馈队列）</strong>：多个就绪队列，优先级从高到低，时间片从小到大。新进程进入最高级队列，用完时间片则降级。兼顾响应时间和吞吐量，是 UNIX/Linux 的经典策略。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">实时调度与多核调度</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>实时调度</strong>：分为静态（速率单调 RM：周期越短优先级越高）和动态（最早截止期优先 EDF：截止期越近优先级越高）。RM 可调度性条件：$\\sum \\frac{C_i}{T_i} \\leq n(2^{1/n}-1)$。详见 <a href="javascript:void(0)" onclick="App.loadDetail('emb-08')">嵌入式·RTOS</a>。</li>
          <li><strong>多核调度</strong>：分为 SMP（对称多处理，所有核共享调度队列）和 NUMA（非统一内存访问）。负载均衡策略：工作窃取（work stealing）、处理器亲和性（affinity）。</li>
        </ul>

        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>考试要点</strong>：调度算法计算题是必考。手工模拟 SJF/RR/MFQ 调度过程，画甘特图，计算周转时间和带权周转时间。记住：SJF 平均等待时间最小，RR 适合交互系统，MFQ 综合最优。</div>
        </div>

        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>SJF vs SRTF</strong>：SJF 是非抢占式（进程开始后运行到完），SRTF 是抢占式（新进程到达时比较剩余时间）。SRTF 平均等待时间更小，但切换开销更大。考试中要仔细看题目条件。</div>
        </div>

        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：上下文切换开销在 <a href="javascript:void(0)" onclick="App.loadDetail('os-02')">进程与线程</a> 中讨论。时间片大小的选择与 <a href="javascript:void(0)" onclick="App.loadDetail('os-05')">内存管理·TLB</a> 的刷新频率相关。实时调度策略在 <a href="javascript:void(0)" onclick="App.loadDetail('emb-08')">嵌入式·RTOS</a> 中有工程实现。</div>
        </div>
      ` },

      // ==================== os-05 ====================
      { id: 'os-05', title: '内存管理', desc: '分页、分段、虚拟内存、页面置换', icon: '💾', tags: ['核心','高频考点'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">内存管理：让有限内存服务无限需求</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          内存管理是操作系统最核心的功能之一。它负责将有限的物理内存高效地分配给多个进程，并通过虚拟内存技术让每个进程都拥有独立的、连续的地址空间。分页和分段是两种基本的内存管理方式，页面置换算法决定了虚拟内存的性能。
        </p>

        <h4 class="font-medium mt-6 mb-2">地址空间概念</h4>
        <div class="formula-block">
          <strong>逻辑地址（虚拟地址）</strong>：程序看到的地址，从 0 开始编址<br>
          <strong>物理地址</strong>：实际内存条上的地址<br>
          <strong>地址转换</strong>：$\\text{物理地址} = \\text{基址寄存器} + \\text{逻辑地址}$（重定位）
          <div class="text-sm text-gray-500 mt-2">MMU（内存管理单元）负责地址转换，是 CPU 的硬件组件</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">分页 vs 分段</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>特性</th><th>分页</th><th>分段</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">划分方式</td><td>物理划分，页大小固定（如 4KB）</td><td>逻辑划分，段长不等</td></tr>
            <tr><td class="font-medium">地址结构</td><td>页号 + 页内偏移</td><td>段号 + 段内偏移</td></tr>
            <tr><td class="font-medium">碎片问题</td><td>无外部碎片，有内部碎片（最后一页）</td><td>有外部碎片，无内部碎片</td></tr>
            <tr><td class="font-medium">共享与保护</td><td>按页共享，粒度粗</td><td>按段共享（如代码段），符合逻辑</td></tr>
            <tr><td class="font-medium">代表系统</td><td>Linux、Windows</td><td>Intel x86（段页式结合）</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">页表与 TLB</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>页表（Page Table）</strong>：每个进程一张，记录虚拟页号到物理页框号的映射。x86-64 使用 4 级页表（PGD -&gt; PUD -&gt; PMD -&gt; PTE）。与 <a href="javascript:void(0)" onclick="App.loadDetail('cpp-03')">C++ 内存管理</a> 中的堆栈分配密切相关。</div></div>
          <div class="step-item"><div><strong>TLB（快表）</strong>：页表的高速缓存，集成在 MMU 中。TLB 命中率通常 &gt; 99%。有效访问时间 = $\\alpha \\times (t_{TLB} + t_{mem}) + (1-\\alpha) \\times (t_{TLB} + 2t_{mem})$。</div></div>
          <div class="step-item"><div><strong>多级页表</strong>：避免单级页表占用过多内存。以 4KB 页、48 位地址为例：$2^{36}$ 个页表项 × 8B = 512GB，不可接受。4 级页表只为实际使用的地址空间分配页表页。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">虚拟内存与页面置换</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          虚拟内存让程序不必全部装入内存即可运行。当访问的页面不在内存中时，发生<strong>缺页中断</strong>，操作系统将所需页面从外存（磁盘）调入内存。若内存已满，则需要先置换出一个页面。
        </p>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>算法</th><th>策略</th><th>最优性</th><th>特点</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">OPT</td><td>置换最长时间不会被访问的页</td><td>理论最优</td><td>无法实现（需预知未来），仅作基准</td></tr>
            <tr><td class="font-medium">FIFO</td><td>置换最早进入内存的页</td><td>差</td><td>Belady 异常：增加页框数反而缺页率上升</td></tr>
            <tr><td class="font-medium">LRU</td><td>置换最长时间未使用的页</td><td>接近 OPT</td><td>硬件支持（计数器/栈），开销较大</td></tr>
            <tr><td class="font-medium">Clock</td><td>LRU 近似，使用访问位 + 环形扫描</td><td>良好</td><td>Linux 实际采用的近似 LRU 策略</td></tr>
          </tbody>
        </table></div>
        <div class="formula-block">
          $$\\text{缺页率} = \\frac{\\text{缺页次数}}{\\text{总访问次数}} \\qquad \\text{有效访问时间} = (1-p) \\times t_{mem} + p \\times t_{page}$$
          <div class="text-sm text-gray-500 mt-2">p 为缺页率，$t_{page}$ 为缺页处理时间（约 5-10 ms，含磁盘 I/O）</div>
        </div>

        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>考试要点</strong>：页面置换的手工模拟是必考大题。给定页面访问序列和页框数，逐个判断是否缺页，画出置换过程。特别注意 FIFO 的 Belady 异常——页框数从 3 增到 4，缺页率反而上升！LRU 不会有此异常。</div>
        </div>

        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>抖动（Thrashing）</strong>：当进程频繁缺页，CPU 大部分时间用于页面置换而非执行有用代码。原因：分配给进程的页框数小于其工作集大小。解决方案：工作集模型、缺页率反馈控制。</div>
        </div>

        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：内存管理与 <a href="javascript:void(0)" onclick="App.loadDetail('cpp-03')">C++ 内存管理（堆栈）</a> 紧密相关——理解虚拟地址空间布局有助于掌握 new/delete 的底层机制。页面置换算法的思想与 <a href="javascript:void(0)" onclick="App.loadDetail('ds-02')">数据结构·LRU 缓存</a> 的实现完全一致。</div>
        </div>
      ` },

      // ==================== os-06 ====================
      { id: 'os-06', title: '文件系统', desc: '文件组织、目录结构、磁盘调度、inode', icon: '📁', tags: ['核心'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">文件系统：数据持久化的基石</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          文件系统是操作系统中负责管理持久化数据的子系统。它将磁盘上的物理扇区抽象为用户友好的文件和目录，提供"按名存取"的接口。文件的逻辑组织（连续/链接/索引分配）、目录结构、磁盘调度算法是本节的三大核心。
        </p>

        <h4 class="font-medium mt-6 mb-2">文件的逻辑结构</h4>
        <div class="formula-block">
          文件 = 有名字的、有序的信息集合<br><br>
          <strong>按结构分类</strong>：无结构文件（流式文件，如 .txt）| 有结构文件（记录式文件，如数据库表）<br>
          <strong>按存取方式</strong>：顺序存取 | 随机存取（按偏移）| 索引存取（按键值）
          <div class="text-sm text-gray-500 mt-2">UNIX/Linux 中一切皆文件（Everything is a file）</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">磁盘空间分配方式</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>分配方式</th><th>原理</th><th>优点</th><th>缺点</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">连续分配</td><td>文件占连续磁盘块</td><td>顺序/随机读取都快</td><td>外部碎片，文件难以扩展</td></tr>
            <tr><td class="font-medium">链接分配</td><td>每个块指向下一个块</td><td>无外部碎片，动态扩展</td><td>仅支持顺序访问，指针占空间</td></tr>
            <tr><td class="font-medium">FAT</td><td>链接分配的改进，链接表集中存放</td><td>随机访问（查 FAT 表）</td><td>FAT 表占用内存（Windows 使用）</td></tr>
            <tr><td class="font-medium">索引分配</td><td>索引块集中存储所有块指针</td><td>支持随机访问和扩展</td><td>索引块占用空间，大文件需多级索引</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">UNIX inode 结构</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>inode（索引节点）</strong>：存储文件元数据（大小、权限、时间戳、所有者），但<strong>不包含文件名</strong>。文件名存储在目录项中，目录项是 (文件名, inode号) 的映射。</div></div>
          <div class="step-item"><div><strong>直接指针</strong>：inode 中 12 个直接指针，指向数据块。可表示 $12 \\times 4\\text{KB} = 48\\text{KB}$ 的小文件。</div></div>
          <div class="step-item"><div><strong>间接指针</strong>：一级间接（指向 1024 个块指针）、二级间接（$1024^2$）、三级间接（$1024^3$）。EXT4 最大文件约 16TB。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">磁盘调度算法</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          磁盘 I/O 的主要耗时是寻道时间（磁头移动到目标磁道）。调度算法通过重排 I/O 请求顺序减少寻道距离。
        </p>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>算法</th><th>策略</th><th>特点</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">FCFS</td><td>按请求顺序服务</td><td>公平但寻道距离大</td></tr>
            <tr><td class="font-medium">SSTF</td><td>选离当前磁头最近的请求</td><td>平均寻道短，但可能饥饿</td></tr>
            <tr><td class="font-medium">SCAN（电梯）</td><td>单向扫描到底再折返</td><td>兼顾效率和公平</td></tr>
            <tr><td class="font-medium">C-SCAN</td><td>单向扫描到底后直接回到起点</td><td>更均匀的等待时间</td></tr>
          </tbody>
        </table></div>

        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>考试要点</strong>：inode 不包含文件名是高频考点！目录项 = (文件名, inode号)，inode = 元数据 + 块指针。硬链接 = 多个目录项指向同一 inode（共享 inode 号），软链接 = 新文件存储原文件路径。删除文件 = 释放 inode 和数据块，硬链接数归零才真正删除。</div>
        </div>

        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>SSTF 的饥饿问题</strong>：SSTF 虽然平均寻道距离短，但如果有持续的近距离请求，远处的请求可能永远得不到服务。SCAN 算法通过"电梯"式扫描避免了饥饿。</div>
        </div>

        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：磁盘调度与 <a href="javascript:void(0)" onclick="App.loadDetail('os-07')">I/O 系统·DMA</a> 中的磁盘 I/O 模型相关。索引分配的块指针结构类似 <a href="javascript:void(0)" onclick="App.loadDetail('ds-02')">数据结构·链表与树</a>。文件系统的日志机制（journaling）在 <a href="javascript:void(0)" onclick="App.loadDetail('os-09')">分布式与现代 OS</a> 中扩展到分布式文件系统。</div>
        </div>
      ` },

      // ==================== os-07 ====================
      { id: 'os-07', title: 'I/O 系统', desc: 'I/O 模型、设备驱动、DMA、中断处理', icon: '⚡', tags: ['核心'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">I/O 系统：连接 CPU 与外部世界</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          I/O 系统是操作系统中管理所有输入/输出设备的子系统。从键盘鼠标到磁盘网卡，每种设备都有不同的特性。操作系统通过设备驱动程序为上层提供统一接口，通过中断、DMA、缓冲等技术提高 I/O 效率。理解 I/O 控制方式是理解整个计算机系统的关键。
        </p>

        <h4 class="font-medium mt-6 mb-2">I/O 控制方式演进</h4>
        <div class="formula-block">
          演进方向：<strong>减少 CPU 介入</strong>，提高 CPU 与 I/O 的并行度<br><br>
          程序直接控制 -&gt; 中断驱动 -&gt; DMA -&gt; 通道<br>
          CPU 占用：100%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;逐字节&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;逐块&nbsp;&nbsp;&nbsp;&nbsp;完全独立
          <div class="text-sm text-gray-500 mt-2">现代系统普遍使用 DMA + 中断的组合方式</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">四种 I/O 控制方式</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>程序直接控制（轮询）</strong>：CPU 不断查询设备状态寄存器。优点是简单，缺点是 CPU 利用率极低（"忙等待"）。适用于嵌入式低速外设。</div></div>
          <div class="step-item"><div><strong>中断驱动</strong>：CPU 发出 I/O 命令后去执行其他进程，设备完成时发中断通知 CPU。CPU 以字节/字为单位介入。中断处理流程见 <a href="javascript:void(0)" onclick="App.loadDetail('emb-08')">嵌入式·中断系统</a>。</div></div>
          <div class="step-item"><div><strong>DMA（直接内存访问）</strong>：DMA 控制器接管总线，直接在设备和内存之间传输数据块。CPU 仅在传输开始和结束时介入。传输单位是"块"而非字节。</div></div>
          <div class="step-item"><div><strong>通道</strong>：专用处理器执行通道程序（I/O 指令序列），完全解放 CPU。通道可执行条件分支、循环等复杂 I/O 操作。大型机使用。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">DMA 工作原理</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>步骤</th><th>CPU 行为</th><th>DMA 控制器行为</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">1. 初始化</td><td>设置 DMA 寄存器（内存地址、传输字节数、方向）</td><td>等待启动</td></tr>
            <tr><td class="font-medium">2. 传输</td><td>执行其他进程（释放总线）</td><td>接管总线，逐块传输数据到内存</td></tr>
            <tr><td class="font-medium">3. 完成</td><td>响应 DMA 中断，检查传输结果</td><td>传输完成，发送中断信号</td></tr>
          </tbody>
        </table></div>
        <div class="formula-block">
          $$\\text{DMA 传输时间} = \\frac{\\text{数据量 (B)}}{\\text{总线带宽 (B/s)}} \\qquad \\text{CPU 占用} \\approx \\frac{\\text{初始化时间}}{\\text{传输时间}} \\ll 1\\%$$
          <div class="text-sm text-gray-500 mt-2">现代 NVMe SSD 的 DMA 传输速度可达 7 GB/s（PCIe 4.0 x4）</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">SPOOLing 技术</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          SPOOLing（假脱机技术）将独占设备改造为共享设备。经典案例：打印机 SPOOLing——进程将输出先写入磁盘缓冲区，SPOOLing 守护进程依次将缓冲区内容送打印机。这样多个进程可以"同时"提交打印任务。
        </p>

        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>考试要点</strong>：四种 I/O 控制方式的区别是选择题高频考点。关键对比维度：①CPU 介入粒度（字节/块/无）②是否需要 CPU 等待 ③适用场景。DMA 与中断的区别：中断是逐字节通知 CPU，DMA 是整块传输完成后才通知。</div>
        </div>

        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>DMA 与 Cache 一致性</strong>：DMA 直接写内存会绕过 Cache，导致 Cache 中的数据与内存不一致。解决方案：①DMA 区域标记为 non-cacheable ②软件主动 flush/invalidate Cache。</div>
        </div>

        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：中断处理流程与 <a href="javascript:void(0)" onclick="App.loadDetail('os-01')">OS 概述·系统调用</a> 的 trap 机制共享同一套中断向量表。DMA 控制器在 <a href="javascript:void(0)" onclick="App.loadDetail('emb-08')">嵌入式·DMA</a> 中有具体的寄存器配置示例。设备驱动程序的分层架构与 <a href="javascript:void(0)" onclick="App.loadDetail('os-09')">现代 OS·微内核</a> 的设计思想相关。</div>
        </div>
      ` },

      // ==================== os-08 ====================
      { id: 'os-08', title: '死锁', desc: '死锁条件、预防/避免/检测/恢复', icon: '🔐', tags: ['高频考点','难点'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">死锁：并发系统的永恒难题</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          死锁是指两个或多个进程因竞争资源而互相等待，导致所有进程都无法继续执行的状态。它是并发系统中最棘手的问题之一。理解死锁的四个必要条件是解决死锁问题的理论基础，而银行家算法是最经典的死锁避免方法。
        </p>

        <h4 class="font-medium mt-6 mb-2">死锁的四个必要条件</h4>
        <div class="formula-block">
          死锁发生必须<strong>同时</strong>满足以下四个条件（缺一不可）：<br><br>
          <strong>互斥条件</strong>：资源一次只能被一个进程使用<br>
          <strong>请求与保持</strong>：进程持有资源的同时请求新资源<br>
          <strong>不可剥夺</strong>：已获得的资源不能被强行回收<br>
          <strong>循环等待</strong>：存在进程的循环等待链 $P_1 \\to P_2 \\to \\cdots \\to P_n \\to P_1$
          <div class="text-sm text-gray-500 mt-2">破坏任何一个条件即可预防死锁</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">死锁处理策略</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>策略</th><th>方法</th><th>代价</th><th>适用场景</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">预防</th><td>破坏四个条件之一（静态策略）</td><td>资源利用率低</td><td>嵌入式/安全关键系统</td></tr>
            <tr><td class="font-medium">避免</th><td>银行家算法（动态检查安全性）</td><td>需预知最大需求</td><td>资源类型少的系统</td></tr>
            <tr><td class="font-medium">检测</th><td>资源分配图 + 死锁检测算法</td><td>检测开销</td><td>允许死锁偶尔发生</td></tr>
            <tr><td class="font-medium">恢复</th><td>终止进程 / 资源剥夺 / 回滚</td><td>可能损失工作</td><td>通用 OS（如 Linux）</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">银行家算法</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>数据结构</strong>：Available（可用资源向量）、Max（最大需求矩阵）、Allocation（已分配矩阵）、Need（还需要矩阵，$Need = Max - Allocation$）。</div></div>
          <div class="step-item"><div><strong>安全性检查</strong>：找一个安全序列 $&lt;P_1, P_2, \\ldots, P_n&gt;$，使得每个 $P_i$ 的 Need 都能被当前 Available 满足。若存在安全序列则系统安全，否则不安全。</div></div>
          <div class="step-item"><div><strong>资源请求处理</strong>：$P_i$ 请求 $Request_i$，若 $Request_i \\leq Need_i$ 且 $Request_i \\leq Available$，则试探性分配，再做安全性检查。安全则正式分配，不安全则回滚。</div></div>
        </div>
        <div class="formula-block">
          $$\\text{安全性算法时间复杂度} = O(m \\times n^2)$$
          <div class="text-sm text-gray-500 mt-2">m 为资源类型数，n 为进程数。实际系统中很少直接使用银行家算法</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">资源分配图</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          资源分配图是描述死锁的直观工具。二分图中：圆节点 = 进程，方节点 = 资源（圆点 = 资源实例）。请求边：$P_i \\to R_j$（进程请求资源），分配边：$R_j \\to P_i$（资源已分配给进程）。若图中存在环路，且每种资源只有一个实例，则一定死锁。
        </p>

        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>考试要点</strong>：银行家算法手算安全序列是必考大题。步骤：①检查 Request &le; Need ②检查 Request &le; Available ③试探性分配 ④运行安全性算法找安全序列。口诀："能完成的先完成，归还资源再考虑下一个。"</div>
        </div>

        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>死锁 vs 饥饿 vs 活锁</strong>：死锁是互相等待、永远阻塞；饥饿是某进程长期得不到资源（如 SJF 中的长作业）；活锁是进程不断改变状态但没有实质进展（如两个避让的人反复左右晃动）。三者不要混淆。</div>
        </div>

        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：哲学家就餐问题在 <a href="javascript:void(0)" onclick="App.loadDetail('os-03')">进程同步与通信</a> 中给出了多种解法，本质都是避免死锁。资源分配图与 <a href="javascript:void(0)" onclick="App.loadDetail('ds-02')">数据结构·图</a> 中的拓扑排序概念相通——检测环路。</div>
        </div>
      ` },

      // ==================== os-09 ====================
      { id: 'os-09', title: '分布式与现代 OS', desc: '微内核、容器化、RTOS、虚拟化', icon: '🌐', tags: ['工程应用'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">分布式与现代 OS：从单机到云原生</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          现代操作系统已远超传统单机内核的范畴。微内核架构提高了系统可靠性，虚拟化技术让一台物理机运行多个 OS 实例，容器化实现了轻量级的资源隔离，RTOS 满足了工业控制的实时性需求。这些技术共同构成了云原生和工业互联网的基础。
        </p>

        <h4 class="font-medium mt-6 mb-2">微内核 vs 宏内核</h4>
        <div class="formula-block">
          <strong>宏内核</strong>（Linux）：所有系统服务（文件系统、设备驱动、网络协议栈）运行在内核态<br>
          <strong>微内核</strong>（QNX、seL4）：内核仅保留进程管理、内存管理、IPC，其余服务运行在用户态<br>
          通信方式：宏内核 = 函数调用 | 微内核 = 消息传递（IPC）
          <div class="text-sm text-gray-500 mt-2">微内核 IPC 开销是性能瓶颈，L4 微内核将 IPC 开销优化到了 ~1 μs</div>
        </div>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>特性</th><th>宏内核</th><th>微内核</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">性能</td><td>高（函数调用零开销）</td><td>较低（IPC 消息传递开销）</td></tr>
            <tr><td class="font-medium">可靠性</td><td>一个模块崩溃可拖垮整个内核</td><td>服务崩溃可独立重启</td></tr>
            <tr><td class="font-medium">安全性</td><td>攻击面大（内核态代码多）</td><td>攻击面小（最小特权原则）</td></tr>
            <tr><td class="font-medium">代表</td><td>Linux、传统 UNIX</td><td>QNX、seL4、Fuchsia（Google）</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">虚拟化技术</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>Type-1（裸金属）</strong>：Hypervisor 直接运行在硬件上，管理多个 Guest OS。VMware ESXi、Xen、KVM。性能接近原生，是云计算的基础。</div></div>
          <div class="step-item"><div><strong>Type-2（托管型）</strong>：Hypervisor 作为应用程序运行在宿主 OS 上。VirtualBox、VMware Workstation。适合开发测试。</div></div>
          <div class="step-item"><div><strong>硬件辅助虚拟化</strong>：Intel VT-x / AMD-V 扩展，让 Guest OS 内核态指令直接在 CPU 上执行，避免了"二进制翻译"的开销。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">容器化 vs 虚拟机</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>特性</th><th>虚拟机</th><th>容器</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">隔离级别</td><td>硬件级（独立 OS 内核）</td><td>进程级（共享宿主内核）</td></tr>
            <tr><td class="font-medium">启动时间</td><td>分钟级</td><td>秒级</td></tr>
            <tr><td class="font-medium">资源开销</td><td>大（每个 VM 完整 OS）</td><td>小（仅应用+依赖库）</td></tr>
            <tr><td class="font-medium">核心技术</td><td>Hypervisor（VT-x/AMD-V）</td><td>Namespace + Cgroups（Linux）</td></tr>
            <tr><td class="font-medium">代表产品</td><td>VMware、KVM</td><td>Docker、Kubernetes</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">RTOS 实时操作系统</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          RTOS 的核心特征是<strong>确定性</strong>——任务必须在规定时间内完成。与通用 OS 不同，RTOS 优先保证实时性而非吞吐量。详见 <a href="javascript:void(0)" onclick="App.loadDetail('emb-08')">嵌入式·RTOS 任务管理</a>。
        </p>
        <div class="formula-block">
          <strong>硬实时</strong>：错过截止期 = 系统失败（如汽车 ABS 刹车控制）<br>
          <strong>软实时</strong>：偶尔错过截止期可接受（如视频播放丢帧）<br><br>
          典型 RTOS：FreeRTOS（开源，MCU 级）| RT-Linux（通用 Linux 补丁）| VxWorks（航天/军工）| QNX（汽车/医疗）
          <div class="text-sm text-gray-500 mt-2">FreeRTOS 任务切换时间 &lt; 1 μs（Cortex-M4 @ 168 MHz）</div>
        </div>

        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>容器核心技术</strong>：Namespace 实现资源隔离（PID、网络、文件系统、用户等 6 种命名空间），Cgroups 实现资源限制（CPU、内存、I/O 带宽）。Docker = Namespace + Cgroups + 镜像分层（UnionFS）。Kubernetes 是容器编排的事实标准。</div>
        </div>

        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>容器安全</strong>：容器共享宿主内核，隔离性不如虚拟机。特权容器（--privileged）可逃逸到宿主。安全加固：最小权限、只读根文件系统、Seccomp/AppArmor 限制系统调用、镜像扫描。</div>
        </div>

        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：RTOS 的任务调度与 <a href="javascript:void(0)" onclick="App.loadDetail('os-04')">处理器调度·实时调度</a> 直接对应。虚拟化的内存管理涉及 <a href="javascript:void(0)" onclick="App.loadDetail('os-05')">内存管理·页表</a> 中的影子页表/EPT 技术。微内核的 IPC 机制是 <a href="javascript:void(0)" onclick="App.loadDetail('os-03')">进程同步与通信</a> 的工程实现。</div>
        </div>
      ` },

    ],
  },
