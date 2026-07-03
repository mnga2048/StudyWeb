// C/C++ 程序设计 - 课程数据（独立文件，由 data.js 动态加载或手动引入）
// 10 节，覆盖 C 语言核心 + C++ 面向对象与泛型编程
// 格式与 js/data.js 中的 CourseData 完全一致

const CppCourseData = {
  // ========== C/C++ 程序设计 ==========
  'cpp': {
    title: 'C/C++ 程序设计',
    subtitle: 'C 语言核心 + C++ 面向对象与泛型编程，嵌入式/ROS/系统开发的主力语言',
    icon: '⌨️',
    sections: [

      // ========== cpp-01 C 语言基础 ==========
      {
        id: 'cpp-01', title: 'C 语言基础', desc: '数据类型、运算符、控制流、函数基础', icon: '📝',
        tags: ['核心'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">为什么 C 语言是系统编程的基石</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          C 语言诞生于 1972 年的贝尔实验室，至今仍是操作系统内核、嵌入式固件和高性能计算的首选语言。它的设计哲学——"相信程序员"——赋予了开发者直接操作内存的能力，但也要求你对底层有清晰的认知。无论是理解 <a href="javascript:void(0)" onclick="App.loadDetail('emb-02')">处理器架构</a>中数据如何流动，还是编写 ROS 节点中的驱动代码，C 语言基础都是不可跳过的一步。
        </p>

        <h4 class="font-medium mt-6 mb-2">基本数据类型与存储模型</h4>
        <div class="formula-block">
          <strong>C 语言基本类型大小（典型 32/64 位平台）</strong>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>类型</th><th>关键字</th><th>字节数</th><th>范围</th></tr></thead>
            <tbody>
              <tr><td>字符型</td><td><code>char</code></td><td>1</td><td>-128 ~ 127</td></tr>
              <tr><td>短整型</td><td><code>short</code></td><td>2</td><td>-32768 ~ 32767</td></tr>
              <tr><td>整型</td><td><code>int</code></td><td>4</td><td>±21 亿</td></tr>
              <tr><td>长整型</td><td><code>long long</code></td><td>8</td><td>±9.2×10¹⁸</td></tr>
              <tr><td>单精度浮点</td><td><code>float</code></td><td>4</td><td>±3.4×10³⁸（6-7位有效数字）</td></tr>
              <tr><td>双精度浮点</td><td><code>double</code></td><td>8</td><td>±1.7×10³⁰⁸（15-16位有效数字）</td></tr>
            </tbody>
          </table></div>
        </div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>sizeof 陷阱</strong>：<code>sizeof(int)</code> 在不同平台可能返回 2 或 4。嵌入式开发中务必使用 <code>&lt;stdint.h&gt;</code> 中的固定宽度类型（<code>int32_t</code>、<code>uint16_t</code>），避免平台依赖。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">运算符优先级与类型转换</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>算术运算符</strong>：<code>+  -  *  /  %</code>，整数除法截断小数部分（<code>7/2=3</code>），浮点除法保留小数（<code>7.0/2=3.5</code>）</li>
          <li><strong>关系与逻辑</strong>：<code>==  !=  &lt;  &gt;  &lt;=  &gt;=</code>，逻辑 <code>&amp;&amp;</code>（短路求值）、<code>||</code>、<code>!</code></li>
          <li><strong>位运算符</strong>：<code>&amp;  |  ^  ~  &lt;&lt;  &gt;&gt;</code>，嵌入式寄存器操作的核心工具</li>
          <li><strong>隐式类型转换</strong>：混合运算时"小类型"自动提升为"大类型"——<code>char + int</code> 结果为 <code>int</code>，<code>int + double</code> 结果为 <code>double</code></li>
        </ul>

        <h4 class="font-medium mt-6 mb-2">控制流：if / switch / for / while</h4>
        <div class="code-block"><span class="code-comment">// 用 switch 实现状态机（嵌入式常用模式）</span>
<span class="code-keyword">enum</span> State { IDLE, RUNNING, ERROR };

<span class="code-keyword">void</span> <span class="code-func">handle_event</span>(<span class="code-keyword">enum</span> State *st, <span class="code-keyword">int</span> event) {
    <span class="code-keyword">switch</span> (*st) {
        <span class="code-keyword">case</span> IDLE:
            <span class="code-keyword">if</span> (event == <span class="code-number">1</span>) *st = RUNNING;
            <span class="code-keyword">break</span>;
        <span class="code-keyword">case</span> RUNNING:
            <span class="code-keyword">if</span> (event == <span class="code-number">2</span>) *st = IDLE;
            <span class="code-keyword">else if</span> (event == <span class="code-number">-1</span>) *st = ERROR;
            <span class="code-keyword">break</span>;
        <span class="code-keyword">case</span> ERROR:
            <span class="code-keyword">if</span> (event == <span class="code-number">0</span>) *st = IDLE;
            <span class="code-keyword">break</span>;
    }
}</div>

        <h4 class="font-medium mt-6 mb-2">函数基础：声明、定义与作用域</h4>
        <div class="formula-block">
          <strong>函数原型</strong>：<code>返回类型 函数名(参数列表);</code><br>
          <strong>传值 vs 传址</strong>：C 语言默认传值拷贝，要修改实参必须传指针
        </div>
        <div class="code-block"><span class="code-comment">// 交换两个整数——传指针才能真正交换</span>
<span class="code-keyword">void</span> <span class="code-func">swap</span>(<span class="code-keyword">int</span> *a, <span class="code-keyword">int</span> *b) {
    <span class="code-keyword">int</span> temp = *a;
    *a = *b;
    *b = temp;
}</div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：函数参数的传指针模式是理解 <a href="javascript:void(0)" onclick="App.loadDetail('cpp-02')">指针与数组</a>的起点。数组名退化为首元素指针后，函数可原地修改数组，这与 <a href="javascript:void(0)" onclick="App.loadDetail('ds-02')">线性表</a>的顺序存储密切相关。</div>
        </div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>递归与栈帧</strong>：每次函数调用在栈上分配一个栈帧（局部变量 + 参数 + 返回地址）。递归深度过大会栈溢出——这在 <a href="javascript:void(0)" onclick="App.loadDetail('cpp-03')">内存管理</a>中会详细分析。</div>
        </div>

        <div class="step-list">
          <div class="step-item"><div><strong>步骤 1：声明原型</strong><br>在文件顶部或头文件中声明 <code>int add(int, int);</code>，让编译器知道函数签名。</div></div>
          <div class="step-item"><div><strong>步骤 2：定义函数体</strong><br>在文件下方实现 <code>int add(int a, int b) { return a + b; }</code>。</div></div>
          <div class="step-item"><div><strong>步骤 3：调用</strong><br>在 <code>main()</code> 中 <code>int r = add(3, 5);</code>，参数按值拷贝。</div></div>
          <div class="step-item"><div><strong>步骤 4：检查返回</strong><br>确认返回值类型匹配，避免隐式截断（如 <code>double</code> 返回给 <code>int</code>）。</div></div>
        </div>
        <div class="compare-table-wrap">
        <table class="compare-table">
          <thead><tr><th>特性</th><th>传值调用</th><th>传址调用（指针）</th></tr></thead>
          <tbody>
            <tr><td><strong>参数传递</strong></td><td>拷贝实参副本</td><td>传递地址，通过指针访问原始数据</td></tr>
            <tr><td><strong>能否修改实参</strong></td><td>否</td><td>是（解引用后写入）</td></tr>
            <tr><td><strong>内存开销</strong></td><td>小（仅拷贝参数大小）</td><td>小（仅拷贝地址，通常 4/8 字节）</td></tr>
            <tr><td><strong>典型用途</strong></td><td>只读参数、小型结构体</td><td>需要修改原数据、大结构体避免拷贝</td></tr>
          </tbody>
        </table></div>
      ` },

      // ========== cpp-02 指针与数组 ==========
      {
        id: 'cpp-02', title: '指针与数组', desc: '指针运算、数组与指针关系、多级指针', icon: '🔗',
        tags: ['核心', '高频考点'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">指针：C 语言最强大的武器</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          指针是 C 语言的灵魂——它存储的不是值，而是值的<strong>内存地址</strong>。掌握指针意味着你能直接操控内存、实现动态数据结构、高效传递大型数据。然而指针也是 C 语言最容易出错的地方：野指针、空指针、越界访问都可能导致程序崩溃。本节建立正确的指针心智模型。
        </p>

        <h4 class="font-medium mt-6 mb-2">指针的定义与解引用</h4>
        <div class="formula-block">
          <strong>指针声明语法</strong>：<code>类型 *变量名;</code><br>
          <strong>取地址</strong>：<code>&amp;variable</code> 返回变量地址<br>
          <strong>解引用</strong>：<code>*ptr</code> 访问指针所指内存的值<br>
          $$\\text{指针变量存储的是地址：} \\texttt{ptr} = \\texttt{\&amp;x} \\Rightarrow *\\texttt{ptr} = \\texttt{x}$$
        </div>
        <div class="code-block"><span class="code-keyword">int</span> x = <span class="code-number">42</span>;
<span class="code-keyword">int</span> *p = &amp;x;    <span class="code-comment">// p 指向 x，p 的值是 x 的地址</span>
<span class="code-func">printf</span>(<span class="code-string">"%p\n"</span>, (<span class="code-keyword">void</span>*)p);  <span class="code-comment">// 输出 x 的内存地址</span>
<span class="code-func">printf</span>(<span class="code-string">"%d\n"</span>, *p);      <span class="code-comment">// 解引用：输出 42</span>
*p = <span class="code-number">99</span>;              <span class="code-comment">// 通过指针修改 x 的值</span>
<span class="code-func">printf</span>(<span class="code-string">"%d\n"</span>, x);       <span class="code-comment">// 输出 99</span></div>

        <h4 class="font-medium mt-6 mb-2">指针运算与数组的关系</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>数组名退化</strong>：数组名 <code>arr</code> 在表达式中自动退化为 <code>&amp;arr[0]</code>（首元素指针），但 <code>sizeof(arr)</code> 仍返回整个数组大小</li>
          <li><strong>指针算术</strong>：<code>p + 1</code> 实际偏移 <code>sizeof(*p)</code> 字节，不是 1 字节。这使得指针可以按类型步进遍历数组</li>
          <li><strong>下标等价</strong>：<code>arr[i]</code> 等价于 <code>*(arr + i)</code>，编译器会将下标访问转换为指针运算</li>
          <li><strong>多级指针</strong>：<code>int **pp</code> 是指向指针的指针，常用于二维动态数组和函数修改指针本身</li>
        </ul>
        <div class="code-block"><span class="code-comment">// 数组与指针的等价关系</span>
<span class="code-keyword">int</span> arr[<span class="code-number">5</span>] = {<span class="code-number">10</span>, <span class="code-number">20</span>, <span class="code-number">30</span>, <span class="code-number">40</span>, <span class="code-number">50</span>};
<span class="code-keyword">int</span> *p = arr;       <span class="code-comment">// p 指向 arr[0]</span>

<span class="code-comment">// 三种等价的访问方式</span>
<span class="code-keyword">int</span> v1 = arr[<span class="code-number">2</span>];         <span class="code-comment">// 下标法</span>
<span class="code-keyword">int</span> v2 = *(p + <span class="code-number">2</span>);       <span class="code-comment">// 指针偏移 + 解引用</span>
<span class="code-keyword">int</span> v3 = *(arr + <span class="code-number">2</span>);     <span class="code-comment">// 数组名退化后同样适用</span>
<span class="code-comment">// v1 == v2 == v3 == 30</span>

<span class="code-comment">// 指针遍历</span>
<span class="code-keyword">for</span> (<span class="code-keyword">int</span> *it = arr; it &lt; arr + <span class="code-number">5</span>; it++) {
    <span class="code-func">printf</span>(<span class="code-string">"%d "</span>, *it);
}</div>

        <h4 class="font-medium mt-6 mb-2">函数指针与回调</h4>
        <div class="formula-block">
          <strong>函数指针声明</strong>：<code>返回类型 (*指针名)(参数列表);</code><br>
          函数指针是实现回调机制、策略模式和 C 语言多态的核心工具
        </div>
        <div class="code-block"><span class="code-comment">// 函数指针实现排序回调</span>
<span class="code-keyword">typedef int</span> (*cmp_fn)(<span class="code-keyword">const void</span>*, <span class="code-keyword">const void</span>*);

<span class="code-keyword">int</span> <span class="code-func">asc</span>(<span class="code-keyword">const void</span> *a, <span class="code-keyword">const void</span> *b) {
    <span class="code-keyword">return</span> *(<span class="code-keyword">int</span>*)a - *(<span class="code-keyword">int</span>*)b;
}

<span class="code-keyword">int</span> <span class="code-func">main</span>() {
    <span class="code-keyword">int</span> arr[] = {<span class="code-number">5</span>, <span class="code-number">2</span>, <span class="code-number">8</span>, <span class="code-number">1</span>};
    <span class="code-func">qsort</span>(arr, <span class="code-number">4</span>, <span class="code-keyword">sizeof</span>(<span class="code-keyword">int</span>), asc);  <span class="code-comment">// 使用回调排序</span>
    <span class="code-keyword">return</span> <span class="code-number">0</span>;
}</div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>指针越界</strong>：访问 <code>arr[5]</code>（数组大小为 5，合法下标 0~4）是未定义行为（UB）。C 语言不检查数组边界，越界写入可能覆盖其他变量甚至返回地址，造成安全漏洞。</div>
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：指针运算的底层与 <a href="javascript:void(0)" onclick="App.loadDetail('emb-02')">处理器架构</a>中的寻址模式直接相关。多级指针实现的动态数组将在 <a href="javascript:void(0)" onclick="App.loadDetail('cpp-03')">内存管理</a>中深入讨论。</div>
        </div>
        <div class="step-list">
          <div class="step-item"><div><strong>步骤 1：声明指针</strong><br><code>int *p;</code> — 声明一个指向 int 的指针，此时未初始化（野指针！）。</div></div>
          <div class="step-item"><div><strong>步骤 2：初始化</strong><br><code>p = &amp;x;</code> 或 <code>p = arr;</code> — 让指针指向有效内存。</div></div>
          <div class="step-item"><div><strong>步骤 3：使用前检查</strong><br>对传入的指针判 <code>NULL</code> 后再解引用，避免空指针崩溃。</div></div>
          <div class="step-item"><div><strong>步骤 4：释放后置 NULL</strong><br><code>free(p); p = NULL;</code> — 防止悬空指针（dangling pointer）被误用。</div></div>
        </div>
        <div class="compare-table-wrap">
        <table class="compare-table">
          <thead><tr><th>表达式</th><th>类型</th><th>值</th><th>说明</th></tr></thead>
          <tbody>
            <tr><td><code>arr</code></td><td><code>int*</code></td><td>首元素地址</td><td>数组名退化为首元素指针</td></tr>
            <tr><td><code>&amp;arr</code></td><td><code>int(*)[5]</code></td><td>整个数组地址</td><td>值与 arr 相同，但类型不同</td></tr>
            <tr><td><code>arr + 1</code></td><td><code>int*</code></td><td>偏移 4 字节</td><td>指向 arr[1]</td></tr>
            <tr><td><code>&amp;arr + 1</code></td><td><code>int(*)[5]</code></td><td>偏移 20 字节</td><td>跳过整个数组</td></tr>
          </tbody>
        </table></div>
      ` },

      // ========== cpp-03 内存管理 ==========
      {
        id: 'cpp-03', title: '内存管理', desc: '栈/堆/全局区、malloc/free、内存泄漏', icon: '💾',
        tags: ['核心', '难点'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">理解内存布局是写出健壮 C 程序的前提</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          C 程序的内存被划分为若干区域：全局区、栈、堆、代码区。不同区域的生命周期、大小限制和管理方式截然不同。在 <a href="javascript:void(0)" onclick="App.loadDetail('emb-02')">嵌入式系统</a>中，RAM 可能只有几十 KB，精确的内存管理直接决定程序能否正常运行。本节建立完整的内存心智模型。
        </p>

        <h4 class="font-medium mt-6 mb-2">进程内存布局</h4>
        <div class="formula-block">
          <strong>C 程序内存区域（从低地址到高地址）</strong><br>
          $$\\text{代码区(.text)} \\to \\text{只读数据(.rodata)} \\to \\text{全局/静态区(.data/.bss)} \\to \\text{堆(向上增长)} \\to \\text{栈(向下增长)}$$
        </div>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>区域</th><th>存放内容</th><th>生命周期</th><th>大小</th></tr></thead>
          <tbody>
            <tr><td><strong>代码区</strong></td><td>编译后的机器指令</td><td>程序运行期间</td><td>固定</td></tr>
            <tr><td><strong>全局/静态区</strong></td><td>全局变量、static 变量</td><td>整个程序运行期</td><td>编译时确定</td></tr>
            <tr><td><strong>堆</strong></td><td>malloc/calloc 分配的内存</td><td>手动管理（free）</td><td>很大（受物理内存限制）</td></tr>
            <tr><td><strong>栈</strong></td><td>局部变量、函数参数、返回地址</td><td>函数返回时自动释放</td><td>通常 1~8 MB</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">动态内存分配：malloc / calloc / realloc / free</h4>
        <div class="code-block"><span class="code-keyword">#include</span> <span class="code-string">&lt;stdlib.h&gt;</span>
<span class="code-keyword">#include</span> <span class="code-string">&lt;string.h&gt;</span>

<span class="code-keyword">int</span> <span class="code-func">main</span>() {
    <span class="code-comment">// malloc：分配指定字节数，内容未初始化</span>
    <span class="code-keyword">int</span> *arr = (<span class="code-keyword">int</span>*)<span class="code-func">malloc</span>(<span class="code-number">5</span> * <span class="code-keyword">sizeof</span>(<span class="code-keyword">int</span>));

    <span class="code-comment">// calloc：分配并清零</span>
    <span class="code-keyword">int</span> *zeroed = (<span class="code-keyword">int</span>*)<span class="code-func">calloc</span>(<span class="code-number">5</span>, <span class="code-keyword">sizeof</span>(<span class="code-keyword">int</span>));

    <span class="code-comment">// realloc：调整已分配内存大小</span>
    arr = (<span class="code-keyword">int</span>*)<span class="code-func">realloc</span>(arr, <span class="code-number">10</span> * <span class="code-keyword">sizeof</span>(<span class="code-keyword">int</span>));

    <span class="code-comment">// free：释放内存，必须调用！</span>
    <span class="code-func">free</span>(arr);     arr = <span class="code-number">NULL</span>;
    <span class="code-func">free</span>(zeroed);  zeroed = <span class="code-number">NULL</span>;
    <span class="code-keyword">return</span> <span class="code-number">0</span>;
}</div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>三大内存错误</strong>：①<strong>内存泄漏</strong>：malloc 后未 free，长期运行程序内存持续增长；②<strong>悬空指针</strong>：free 后继续使用指针；③<strong>双重释放</strong>：对同一指针 free 两次，破坏堆管理结构。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">内存泄漏检测与防御</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>Valgrind</strong>（Linux/macOS）：运行 <code>valgrind --leak-check=full ./program</code>，检测所有未释放内存</li>
          <li><strong>ASan</strong>（AddressSanitizer）：编译时加 <code>-fsanitize=address</code>，检测越界和悬空指针</li>
          <li><strong>防御式编程</strong>：malloc 后立即判 NULL；free 后立即置 NULL；使用 goto 统一错误处理</li>
        </ul>
        <div class="code-block"><span class="code-comment">// 防御式 malloc + goto 错误处理（Linux 内核风格）</span>
<span class="code-keyword">int</span> <span class="code-func">process_data</span>() {
    <span class="code-keyword">int</span> *buf = <span class="code-number">NULL</span>, *tmp = <span class="code-number">NULL</span>;
    buf = (<span class="code-keyword">int</span>*)<span class="code-func">malloc</span>(<span class="code-number">1024</span> * <span class="code-keyword">sizeof</span>(<span class="code-keyword">int</span>));
    <span class="code-keyword">if</span> (!buf) <span class="code-keyword">goto</span> err1;
    tmp = (<span class="code-keyword">int</span>*)<span class="code-func">malloc</span>(<span class="code-number">2048</span> * <span class="code-keyword">sizeof</span>(<span class="code-keyword">int</span>));
    <span class="code-keyword">if</span> (!tmp) <span class="code-keyword">goto</span> err2;
    <span class="code-comment">// ... 使用 buf 和 tmp ...</span>
    <span class="code-func">free</span>(tmp);  tmp = <span class="code-number">NULL</span>;
    <span class="code-func">free</span>(buf);  buf = <span class="code-number">NULL</span>;
    <span class="code-keyword">return</span> <span class="code-number">0</span>;
err2: <span class="code-func">free</span>(buf);  buf = <span class="code-number">NULL</span>;
err1: <span class="code-keyword">return</span> -<span class="code-number">1</span>;
}</div>

        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：C 语言的 <code>malloc/free</code> 手动管理在 <a href="javascript:void(0)" onclick="App.loadDetail('cpp-09')">智能指针与异常</a>中由 RAII 自动接管。<a href="javascript:void(0)" onclick="App.loadDetail('ds-02')">线性表</a>的动态顺序表实现正是 malloc/realloc 的典型应用。</div>
        </div>
        <div class="step-list">
          <div class="step-item"><div><strong>步骤 1：malloc 分配</strong><br><code>int *p = malloc(n * sizeof(int));</code>，返回值判 NULL。</div></div>
          <div class="step-item"><div><strong>步骤 2：使用内存</strong><br>通过指针读写，注意不要越界。</div></div>
          <div class="step-item"><div><strong>步骤 3：free 释放</strong><br><code>free(p); p = NULL;</code>，释放后置空。</div></div>
          <div class="step-item"><div><strong>步骤 4：验证</strong><br>用 Valgrind 或 ASan 检测是否有泄漏和越界。</div></div>
        </div>
        <div class="compare-table-wrap">
        <table class="compare-table">
          <thead><tr><th>函数</th><th>分配方式</th><th>初始化</th><th>返回类型</th></tr></thead>
          <tbody>
            <tr><td><code>malloc</code></td><td>按字节数</td><td>不初始化（随机值）</td><td><code>void*</code></td></tr>
            <tr><td><code>calloc</code></td><td>按元素数 × 大小</td><td>清零</td><td><code>void*</code></td></tr>
            <tr><td><code>realloc</code></td><td>调整已有分配</td><td>保留原数据</td><td><code>void*</code></td></tr>
          </tbody>
        </table></div>
      ` },

      // ========== cpp-04 结构体与联合体 ==========
      {
        id: 'cpp-04', title: '结构体与联合体', desc: 'struct/union/enum、位域、内存对齐', icon: '📦',
        tags: ['核心'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">结构体：C 语言的"类"</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          在 C 语言中没有 class，结构体（struct）就是你组织相关数据的核心手段。从寄存器映射到网络协议解析，从链表节点到 ROS 消息结构，结构体无处不在。理解内存对齐和位域更是嵌入式开发的必备技能——它直接决定结构体在内存中占多少字节。
        </p>

        <h4 class="font-medium mt-6 mb-2">结构体定义与内存对齐</h4>
        <div class="formula-block">
          <strong>对齐规则</strong>：每个成员的起始地址必须是其类型大小的整数倍<br>
          $$\\text{结构体总大小} = \\text{所有成员大小之和} + \\text{填充字节（对齐补齐）}$$
        </div>
        <div class="code-block"><span class="code-comment">// 结构体示例：注意内存对齐</span>
<span class="code-keyword">struct</span> SensorData {
    <span class="code-keyword">char</span>  id;       <span class="code-comment">// 1 字节 + 3 字节填充</span>
    <span class="code-keyword">int</span>   value;    <span class="code-comment">// 4 字节（偏移 4）</span>
    <span class="code-keyword">float</span> timestamp; <span class="code-comment">// 4 字节（偏移 8）</span>
};  <span class="code-comment">// sizeof = 12，不是 9！</span>

<span class="code-comment">// 使用 #pragma pack(1) 取消填充（紧凑排列）</span>
<span class="code-keyword">#pragma</span> pack(push, <span class="code-number">1</span>)
<span class="code-keyword">struct</span> PackedData {
    <span class="code-keyword">char</span>  id;
    <span class="code-keyword">int</span>   value;
    <span class="code-keyword">float</span> timestamp;
};  <span class="code-comment">// sizeof = 9（紧凑）</span>
<span class="code-keyword">#pragma</span> pack(pop)</div>

        <h4 class="font-medium mt-6 mb-2">联合体与位域</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>union</strong>：所有成员共享同一块内存，大小等于最大成员。常用于类型双关（type punning）和寄存器多义解读</li>
          <li><strong>位域</strong>：在 struct 中指定成员占用的位数，用于精确控制位级布局，嵌入式寄存器映射和网络协议解析常用</li>
          <li><strong>enum</strong>：命名整数常量集合，比 <code>#define</code> 更安全（类型检查 + 调试信息）</li>
        </ul>
        <div class="code-block"><span class="code-comment">// union：同一内存的不同解读</span>
<span class="code-keyword">union</span> RegValue {
    <span class="code-keyword">uint32_t</span> word;      <span class="code-comment">// 整体读写</span>
    <span class="code-keyword">struct</span> {
        <span class="code-keyword">uint8_t</span> low;     <span class="code-comment">// 低 8 位</span>
        <span class="code-keyword">uint8_t</span> high;    <span class="code-comment">// 高 8 位</span>
    } bytes;
};  <span class="code-comment">// sizeof = 4（与 word 相同）</span>

<span class="code-comment">// 位域：精确控制位级布局</span>
<span class="code-keyword">struct</span> GPIO_Config {
    <span class="code-keyword">uint32_t</span> mode   : <span class="code-number">2</span>;   <span class="code-comment">// bit[1:0]：模式</span>
    <span class="code-keyword">uint32_t</span> pull   : <span class="code-number">2</span>;   <span class="code-comment">// bit[3:2]：上下拉</span>
    <span class="code-keyword">uint32_t</span> speed  : <span class="code-number">2</span>;   <span class="code-comment">// bit[5:4]：速度</span>
    <span class="code-keyword">uint32_t</span> _reserved : <span class="code-number">26</span>; <span class="code-comment">// bit[31:6]：保留</span>
};</div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>位域陷阱</strong>：位域的布局（高低位顺序、跨字节边界行为）是<strong>编译器相关</strong>的，不同编译器/平台可能不同。用于跨平台通信时应使用手动位操作（<code>&amp;</code>、<code>|</code>、<code>&lt;&lt;</code>）代替位域。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">结构体指针与成员访问</h4>
        <div class="code-block"><span class="code-keyword">struct</span> SensorData sensor = {<span class="code-number">1</span>, <span class="code-number">256</span>, <span class="code-number">3.14f</span>};
<span class="code-keyword">struct</span> SensorData *ps = &amp;sensor;

<span class="code-comment">// 两种等价的成员访问方式</span>
ps-&gt;value       <span class="code-comment">// 指针用 -> </span>
(*ps).value     <span class="code-comment">// 解引用后用 . （不推荐）</span>
sensor.value    <span class="code-comment">// 直接访问</span></div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：结构体是 <a href="javascript:void(0)" onclick="App.loadDetail('cpp-06')">C++ 类与对象</a>的前身——C++ 的 class 本质上是默认私有、自带成员函数的结构体。结构体指针访问成员的 <code>-&gt;</code> 运算符在 <a href="javascript:void(0)" onclick="App.loadDetail('cpp-02')">指针与数组</a>中已有铺垫。</div>
        </div>
        <div class="step-list">
          <div class="step-item"><div><strong>步骤 1：定义结构体</strong><br><code>struct Name { type member; ... };</code>，成员按声明顺序排列。</div></div>
          <div class="step-item"><div><strong>步骤 2：声明变量</strong><br><code>struct Name var = {val1, val2};</code> 或动态分配 <code>malloc(sizeof(struct Name))</code>。</div></div>
          <div class="step-item"><div><strong>步骤 3：检查对齐</strong><br>用 <code>sizeof</code> 和 <code>offsetof</code> 确认结构体布局符合预期。</div></div>
          <div class="step-item"><div><strong>步骤 4：指针传递</strong><br>大结构体传指针而非拷贝：<code>void func(struct Name *p)</code>。</div></div>
        </div>
        <div class="compare-table-wrap">
        <table class="compare-table">
          <thead><tr><th>特性</th><th>struct</th><th>union</th><th>enum</th></tr></thead>
          <tbody>
            <tr><td><strong>内存模型</strong></td><td>成员顺序排列 + 填充</td><td>成员共享同一块内存</td><td>底层为 int</td></tr>
            <tr><td><strong>sizeof</strong></td><td>所有成员之和 + 填充</td><td>最大成员的大小</td><td>通常为 4 字节</td></tr>
            <tr><td><strong>同时使用</strong></td><td>所有成员可同时使用</td><td>同一时刻只有一个成员有效</td><td>存储一个命名常量</td></tr>
            <tr><td><strong>典型用途</strong></td><td>数据聚合、协议结构</td><td>类型双关、寄存器访问</td><td>状态机、配置标志</td></tr>
          </tbody>
        </table></div>
      ` },

      // ========== cpp-05 文件与预处理 ==========
      {
        id: 'cpp-05', title: '文件与预处理', desc: '文件 I/O、宏定义、条件编译', icon: '📄',
        tags: ['核心'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">预处理器和文件 I/O：工程化的基础设施</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          预处理器在编译之前对源代码进行文本替换和条件裁剪，是 C 语言实现跨平台、模块化和代码复用的关键工具。文件 I/O 则让程序能读写持久数据——从配置文件解析到日志记录，从传感器数据采集到固件升级，都离不开它。
        </p>

        <h4 class="font-medium mt-6 mb-2">宏定义：对象式与函数式</h4>
        <div class="formula-block">
          <strong>对象式宏</strong>：<code>#define NAME value</code> — 简单文本替换<br>
          <strong>函数式宏</strong>：<code>#define NAME(args) expression</code> — 带参数的文本替换<br>
          <strong>⚠️</strong> 宏是编译前的纯文本操作，没有类型检查、没有作用域、不加括号可能产生优先级陷阱
        </div>
        <div class="code-block"><span class="code-comment">// 函数式宏的常见陷阱</span>
<span class="code-keyword">#define</span> <span class="code-func">SQUARE</span>(x)  ((x) * (x))     <span class="code-comment">// ✅ 每个参数都加括号</span>
<span class="code-keyword">#define</span> <span class="code-func">BAD_SQ</span>(x)   x * x             <span class="code-comment">// ❌ BAD_SQ(1+1) = 1+1*1+1 = 3</span>
<span class="code-keyword">#define</span> <span class="code-func">MAX</span>(a, b)  ((a) &gt; (b) ? (a) : (b))
<span class="code-keyword">#define</span> <span class="code-func">SWAP</span>(a, b)  <span class="code-keyword">do</span> { \         <span class="code-comment">// do { ... } while(0) 防止宏展开异常</span>
    <span class="code-keyword">typeof</span>(a) _tmp = (a); \
    (a) = (b); (b) = _tmp; \
} <span class="code-keyword">while</span>(<span class="code-number">0</span>)

<span class="code-comment">// # 和 ## 运算符</span>
<span class="code-keyword">#define</span> <span class="code-func">STRINGIFY</span>(x)  #x          <span class="code-comment">// 将参数转为字符串字面量</span>
<span class="code-keyword">#define</span> <span class="code-func">CONCAT</span>(a, b)   a##b        <span class="code-comment">// 拼接标识符</span></div>

        <h4 class="font-medium mt-6 mb-2">条件编译与头文件保护</h4>
        <div class="code-block"><span class="code-comment">// 头文件保护（Include Guard）—— 防止重复包含</span>
<span class="code-keyword">#ifndef</span> SENSOR_H
<span class="code-keyword">#define</span> SENSOR_H
<span class="code-comment">// ... 头文件内容 ...</span>
<span class="code-keyword">#endif</span> <span class="code-comment">// SENSOR_H</span>

<span class="code-comment">// 跨平台条件编译</span>
<span class="code-keyword">#if</span> defined(_WIN32)
    <span class="code-func">windows_init</span>();
<span class="code-keyword">#elif</span> defined(__linux__)
    <span class="code-func">linux_init</span>();
<span class="code-keyword">#else</span>
    <span class="code-func">default_init</span>();
<span class="code-keyword">#endif</span>

<span class="code-comment">// 调试宏：编译时决定是否启用</span>
<span class="code-keyword">#ifdef</span> DEBUG
    <span class="code-func">printf</span>(<span class="code-string">"debug: x = %d\n"</span>, x);
<span class="code-keyword">#endif</span></div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>C++ 替代方案</strong>：C++ 中用 <code>constexpr</code>、<code>inline</code>、<code>template</code> 替代函数式宏，用 <code>enum class</code> 替代常量宏。但头文件保护和条件编译在 C++ 中仍然广泛使用。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">文件 I/O：fopen / fread / fwrite / fprintf</h4>
        <div class="code-block"><span class="code-keyword">#include</span> <span class="code-string">&lt;stdio.h&gt;</span>

<span class="code-keyword">void</span> <span class="code-func">save_config</span>(<span class="code-keyword">const char</span> *path, <span class="code-keyword">int</span> speed, <span class="code-keyword">float</span> kp) {
    FILE *fp = <span class="code-func">fopen</span>(path, <span class="code-string">"w"</span>);  <span class="code-comment">// 文本写入</span>
    <span class="code-keyword">if</span> (!fp) <span class="code-keyword">return</span>;
    <span class="code-func">fprintf</span>(fp, <span class="code-string">"speed=%d\nkp=%.2f\n"</span>, speed, kp);
    <span class="code-func">fclose</span>(fp);
}

<span class="code-keyword">void</span> <span class="code-func">read_sensor_log</span>(<span class="code-keyword">const char</span> *path) {
    FILE *fp = <span class="code-func">fopen</span>(path, <span class="code-string">"rb"</span>);  <span class="code-comment">// 二进制读取</span>
    <span class="code-keyword">if</span> (!fp) <span class="code-keyword">return</span>;
    <span class="code-keyword">int16_t</span> buf[<span class="code-number">64</span>];
    <span class="code-keyword">size_t</span> n = <span class="code-func">fread</span>(buf, <span class="code-keyword">sizeof</span>(<span class="code-keyword">int16_t</span>), <span class="code-number">64</span>, fp);
    <span class="code-func">printf</span>(<span class="code-string">"read %zu samples\n"</span>, n);
    <span class="code-func">fclose</span>(fp);
}</div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>fopen 必须判 NULL</strong>：文件不存在、路径错误、权限不足都会导致 fopen 返回 NULL。不判空直接使用会导致程序崩溃。每次操作后检查 <code>ferror(fp)</code>，结束时必须 <code>fclose</code>。</div>
        </div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：文件 I/O 在 <a href="javascript:void(0)" onclick="App.loadDetail('emb-08')">RTOS</a> 的嵌入式项目中较少使用（无文件系统），但在 PC 端开发和 ROS 节点中非常常见。预处理在 <a href="javascript:void(0)" onclick="App.loadDetail('cpp-08')">模板与 STL</a>的 C++ 泛型编程中被模板取代。</div>
        </div>
        <div class="step-list">
          <div class="step-item"><div><strong>步骤 1：fopen 打开</strong><br>指定路径和模式（"r"读、"w"写、"a"追加、"rb"二进制读）。</div></div>
          <div class="step-item"><div><strong>步骤 2：判空 + 错误处理</strong><br><code>if (!fp) { perror("open"); return; }</code></div></div>
          <div class="step-item"><div><strong>步骤 3：读写操作</strong><br><code>fread</code>/<code>fwrite</code>（二进制）或 <code>fprintf</code>/<code>fscanf</code>（文本）。</div></div>
          <div class="step-item"><div><strong>步骤 4：fclose 关闭</strong><br><code>fclose(fp);</code>，释放文件描述符资源。</div></div>
        </div>
        <div class="compare-table-wrap">
        <table class="compare-table">
          <thead><tr><th>模式</th><th>含义</th><th>文件不存在</th><th>写入位置</th></tr></thead>
          <tbody>
            <tr><td><code>"r"</code></td><td>只读</td><td>返回 NULL</td><td>-</td></tr>
            <tr><td><code>"w"</code></td><td>只写（覆盖）</td><td>创建新文件</td><td>文件头</td></tr>
            <tr><td><code>"a"</code></td><td>追加</td><td>创建新文件</td><td>文件尾</td></tr>
            <tr><td><code>"r+"</code></td><td>读写</td><td>返回 NULL</td><td>文件头</td></tr>
          </tbody>
        </table></div>
      ` },

      // ========== cpp-06 C++ 类与对象 ==========
      {
        id: 'cpp-06', title: 'C++ 类与对象', desc: '类定义、构造/析构、this、拷贝控制', icon: '🏗️',
        tags: ['核心', '高频考点'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">从 C 到 C++：面向对象的起点</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          C++ 的 class 在 <a href="javascript:void(0)" onclick="App.loadDetail('cpp-04')">struct</a> 的基础上增加了访问控制、成员函数、构造/析构、运算符重载等特性，实现了封装和数据抽象。这是面向对象编程（OOP）三大支柱之一——封装——的直接体现。掌握类的生命周期管理是编写安全 C++ 代码的基础。
        </p>

        <h4 class="font-medium mt-6 mb-2">类定义与访问控制</h4>
        <div class="code-block"><span class="code-keyword">class</span> <span class="code-func">Motor</span> {
<span class="code-keyword">private</span>:                          <span class="code-comment">// 仅类内可访问</span>
    <span class="code-keyword">int</span> speed_;
    <span class="code-keyword">bool</span> running_;
<span class="code-keyword">protected</span>:                       <span class="code-comment">// 类内 + 子类可访问</span>
    <span class="code-keyword">int</span> max_speed_;
<span class="code-keyword">public</span>:                          <span class="code-comment">// 外部可访问</span>
    <span class="code-func">Motor</span>(<span class="code-keyword">int</span> max_spd);          <span class="code-comment">// 构造函数</span>
    ~<span class="code-func">Motor</span>();                    <span class="code-comment">// 析构函数</span>
    <span class="code-keyword">void</span> <span class="code-func">set_speed</span>(<span class="code-keyword">int</span> sp);
    <span class="code-keyword">int</span>  <span class="code-func">get_speed</span>() <span class="code-keyword">const</span>;     <span class="code-comment">// const 成员函数</span>
};</div>

        <h4 class="font-medium mt-6 mb-2">构造函数与析构函数的生命周期</h4>
        <div class="formula-block">
          <strong>构造顺序</strong>：基类构造 → 成员变量按声明顺序构造 → 构造函数体执行<br>
          <strong>析构顺序</strong>：析构函数体执行 → 成员变量按声明<strong>逆序</strong>析构 → 基类析构<br>
          $$\\text{构造顺序} \\neq \\text{初始化顺序（取决于声明顺序）}$$
        </div>
        <div class="code-block"><span class="code-keyword">class</span> <span class="code-func">PIDController</span> {
    <span class="code-keyword">double</span> kp_, ki_, kd_;
    <span class="code-keyword">double</span> integral_, prev_error_;
<span class="code-keyword">public</span>:
    <span class="code-comment">// 构造函数（支持初始化列表）</span>
    <span class="code-func">PIDController</span>(<span class="code-keyword">double</span> kp, <span class="code-keyword">double</span> ki, <span class="code-keyword">double</span> kd)
        : kp_(kp), ki_(ki), kd_(kd),      <span class="code-comment">// 初始化列表（推荐）</span>
          integral_(<span class="code-number">0</span>), prev_error_(<span class="code-number">0</span>) {}

    <span class="code-comment">// 拷贝构造函数</span>
    <span class="code-func">PIDController</span>(<span class="code-keyword">const</span> PIDController &amp;other)
        : kp_(other.kp_), ki_(other.ki_), kd_(other.kd_),
          integral_(<span class="code-number">0</span>), prev_error_(<span class="code-number">0</span>) {}

    ~<span class="code-func">PIDController</span>() {}  <span class="code-comment">// 析构（此处无资源需释放）</span>

    <span class="code-keyword">double</span> <span class="code-func">compute</span>(<span class="code-keyword">double</span> error, <span class="code-keyword">double</span> dt) {
        integral_ += error * dt;
        <span class="code-keyword">double</span> derivative = (error - prev_error_) / dt;
        prev_error_ = error;
        <span class="code-keyword">return</span> kp_ * error + ki_ * integral_ + kd_ * derivative;
    }
};</div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>Rule of Three/Five</strong>：如果类管理动态资源（<a href="javascript:void(0)" onclick="App.loadDetail('cpp-03')">malloc/new</a> 分配的内存），必须同时定义：①析构函数 ②拷贝构造函数 ③拷贝赋值运算符。C++11 还需加上移动构造和移动赋值（Rule of Five）。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">this 指针与隐式参数</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>this</strong> 是一个隐式指针，指向调用成员函数的对象。成员变量 <code>speed_</code> 实际上是 <code>this-&gt;speed_</code></li>
          <li><strong>const 成员函数</strong>：声明为 <code>const</code> 的成员函数不能修改成员变量，编译器会检查</li>
          <li><strong>static 成员</strong>：属于类本身而非对象，无需 this 指针。用于计数器、单例模式等</li>
        </ul>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：类的封装在 <a href="javascript:void(0)" onclick="App.loadDetail('cpp-07')">继承与多态</a>中通过虚函数进一步扩展。拷贝控制与 <a href="javascript:void(0)" onclick="App.loadDetail('cpp-09')">智能指针</a>的 RAII 机制密不可分。类的 <code>new/delete</code> 与 <a href="javascript:void(0)" onclick="App.loadDetail('cpp-03')">内存管理</a>中的 <code>malloc/free</code> 对应。</div>
        </div>
        <div class="compare-table-wrap">
        <table class="compare-table">
          <thead><tr><th>构造方式</th><th>调用时机</th><th>典型用途</th></tr></thead>
          <tbody>
            <tr><td>默认构造</td><td><code>Motor m;</code></td><td>创建对象，使用默认值</td></tr>
            <tr><td>参数构造</td><td><code>Motor m(100);</code></td><td>指定初始参数</td></tr>
            <tr><td>拷贝构造</td><td><code>Motor m2(m1);</code></td><td>用已有对象初始化新对象</td></tr>
            <tr><td>移动构造</td><td><code>Motor m2(std::move(m1));</code></td><td>高效"窃取"临时对象资源</td></tr>
          </tbody>
        </table></div>
        <div class="step-list">
          <div class="step-item"><div><strong>步骤 1：设计接口</strong><br>确定 public 方法（API）和 private 成员（内部状态），遵循最小暴露原则。</div></div>
          <div class="step-item"><div><strong>步骤 2：实现构造/析构</strong><br>构造函数分配资源（如有），析构函数释放。用初始化列表初始化成员。</div></div>
          <div class="step-item"><div><strong>步骤 3：处理拷贝</strong><br>若类管理资源，实现深拷贝（拷贝构造 + 拷贝赋值），或禁用拷贝。</div></div>
          <div class="step-item"><div><strong>步骤 4：const 正确性</strong><br>不修改成员的函数标记为 const，参数使用 const 引用避免不必要拷贝。</div></div>
        </div>
      ` },

      // ========== cpp-07 继承与多态 ==========
      {
        id: 'cpp-07', title: '继承与多态', desc: '虚函数、动态绑定、抽象类、菱形继承', icon: '🎭',
        tags: ['高频考点', '难点'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">多态：用统一接口处理不同类型的对象</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          继承让你复用代码，多态让你写"对扩展开放、对修改关闭"的代码。在 ROS 开发中，不同类型的传感器驱动都实现同一个 <code>Sensor</code> 接口；在游戏引擎中，不同角色都继承自 <code>Entity</code> 基类。虚函数和动态绑定是实现这一切的核心机制。
        </p>

        <h4 class="font-medium mt-6 mb-2">继承体系与虚函数</h4>
        <div class="code-block"><span class="code-keyword">class</span> <span class="code-func">Sensor</span> {                      <span class="code-comment">// 基类</span>
<span class="code-keyword">protected</span>:
    <span class="code-keyword">double</span> value_;
<span class="code-keyword">public</span>:
    <span class="code-keyword">virtual</span> ~<span class="code-func">Sensor</span>() {}             <span class="code-comment">// 虚析构！（关键）</span>
    <span class="code-keyword">virtual</span> <span class="code-keyword">double</span> <span class="code-func">read</span>() = <span class="code-number">0</span>;      <span class="code-comment">// 纯虚函数 → 抽象类</span>
    <span class="code-keyword">virtual</span> <span class="code-keyword">const char</span>* <span class="code-func">type</span>() <span class="code-keyword">const</span> { <span class="code-keyword">return</span> <span class="code-string">"generic"</span>; }
};

<span class="code-keyword">class</span> <span class="code-func">TempSensor</span> : <span class="code-keyword">public</span> Sensor {  <span class="code-comment">// 派生类</span>
<span class="code-keyword">public</span>:
    <span class="code-keyword">double</span> <span class="code-func">read</span>() <span class="code-keyword">override</span> { <span class="code-keyword">return</span> <span class="code-number">25.5</span>; }
    <span class="code-keyword">const char</span>* <span class="code-func">type</span>() <span class="code-keyword">const override</span> { <span class="code-keyword">return</span> <span class="code-string">"temperature"</span>; }
};</div>

        <h4 class="font-medium mt-6 mb-2">虚函数表（vtable）与动态绑定</h4>
        <div class="formula-block">
          <strong>动态绑定机制</strong>：编译器为含虚函数的类生成一张虚函数表（vtable），对象头部存储指向 vtable 的指针（vptr）。调用虚函数时通过 vptr 查表跳转，实现运行时多态。<br>
          $$\\text{调用} \\to \\text{读取 vptr} \\to \\text{查 vtable[offset]} \\to \\text{跳转到实际函数}$$
        </div>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>override</strong>（C++11）：显式声明覆盖基类虚函数，编译器检查签名是否匹配</li>
          <li><strong>final</strong>（C++11）：阻止进一步覆盖或继承，编译器可优化（去掉 vtable 查表）</li>
          <li><strong>纯虚函数</strong>：<code>virtual void f() = 0;</code> 使类成为抽象类，不能实例化</li>
          <li><strong>虚析构函数</strong>：基类指针删除派生类对象时，非虚析构导致派生类析构不被调用→内存泄漏</li>
        </ul>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>菱形继承</strong>：当 B 和 C 都继承 A，D 同时继承 B 和 C 时，D 中会存在两份 A 的数据。解决方法：<code>class B : virtual public A</code>（虚继承），使 A 只有一份。虚继承有运行时开销，应尽量用组合替代。</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">多态的实际应用：传感器接口</h4>
        <div class="code-block"><span class="code-comment">// 多态：统一接口处理不同类型传感器</span>
<span class="code-keyword">void</span> <span class="code-func">poll_sensors</span>(<span class="code-keyword">const</span> std::vector&lt;Sensor*&gt; &amp;sensors) {
    <span class="code-keyword">for</span> (<span class="code-keyword">auto</span> *s : sensors) {
        <span class="code-comment">// 运行时根据实际类型调用正确的 read()</span>
        std::cout &lt;&lt; s-&gt;<span class="code-func">type</span>() &lt;&lt; <span class="code-string">": "</span> &lt;&lt; s-&gt;<span class="code-func">read</span>() &lt;&lt; std::endl;
    }
}</div>

        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：多态是 <a href="javascript:void(0)" onclick="App.loadDetail('cpp-08')">模板与 STL</a>中泛型编程的对立面——多态在运行时决定调用哪个函数（动态绑定），模板在编译时生成具体代码（静态绑定），两者各有适用场景。</div>
        </div>
        <div class="compare-table-wrap">
        <table class="compare-table">
          <thead><tr><th>特性</th><th>继承 + 虚函数</th><th>模板（泛型）</th></tr></thead>
          <tbody>
            <tr><td><strong>绑定时机</strong></td><td>运行时（动态绑定）</td><td>编译时（静态绑定）</td></tr>
            <tr><td><strong>性能</strong></td><td>vtable 查表开销</td><td>零开销（内联优化）</td></tr>
            <tr><td><strong>类型检查</strong></td><td>基类指针，运行时类型安全</td><td>编译时检查，类型推导</td></tr>
            <tr><td><strong>二进制大小</strong></td><td>较小（共享 vtable）</td><td>可能膨胀（每种类型一份代码）</td></tr>
            <tr><td><strong>典型场景</strong></td><td>插件系统、接口抽象</td><td>容器、算法、数值计算</td></tr>
          </tbody>
        </table></div>
        <div class="step-list">
          <div class="step-item"><div><strong>步骤 1：设计基类</strong><br>定义纯虚函数接口，加虚析构函数。基类只描述"做什么"。</div></div>
          <div class="step-item"><div><strong>步骤 2：实现派生类</strong><br>用 <code>override</code> 覆盖基类虚函数，实现具体行为。</div></div>
          <div class="step-item"><div><strong>步骤 3：使用基类指针/引用</strong><br>通过 <code>Sensor*</code> 或 <code>Sensor&amp;</code> 操作派生类对象，触发多态。</div></div>
          <div class="step-item"><div><strong>步骤 4：验证虚析构</strong><br>用 <code>delete</code> 基类指针，确认派生类析构函数被正确调用。</div></div>
        </div>
      ` },

      // ========== cpp-08 模板与 STL ==========
      {
        id: 'cpp-08', title: '模板与 STL', desc: '函数模板、类模板、容器/迭代器/算法', icon: '🧰',
        tags: ['核心'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">泛型编程：一次编写，类型无关</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          模板让编译器根据实际类型自动生成代码，实现了"类型无关"的泛型编程。STL（标准模板库）基于模板构建了一套完整的容器、迭代器和算法体系，是 C++ 工程效率的核心来源。从 <a href="javascript:void(0)" onclick="App.loadDetail('ds-02')">线性表</a>到排序算法，STL 都有开箱即用的实现。
        </p>

        <h4 class="font-medium mt-6 mb-2">函数模板与类模板</h4>
        <div class="code-block"><span class="code-comment">// 函数模板：编译器根据调用推导 T</span>
<span class="code-keyword">template</span> &lt;<span class="code-keyword">typename</span> T&gt;
T <span class="code-func">max_of</span>(<span class="code-keyword">const</span> T &amp;a, <span class="code-keyword">const</span> T &amp;b) {
    <span class="code-keyword">return</span> (a &gt; b) ? a : b;
}

<span class="code-comment">// 类模板：通用栈</span>
<span class="code-keyword">template</span> &lt;<span class="code-keyword">typename</span> T, <span class="code-keyword">size_t</span> MaxSize&gt;
<span class="code-keyword">class</span> <span class="code-func">FixedStack</span> {
    T data_[MaxSize];
    <span class="code-keyword">size_t</span> top_ = <span class="code-number">0</span>;
<span class="code-keyword">public</span>:
    <span class="code-keyword">void</span> <span class="code-func">push</span>(<span class="code-keyword">const</span> T &amp;val) { <span class="code-keyword">if</span> (top_ &lt; MaxSize) data_[top_++] = val; }
    T <span class="code-func">pop</span>() { <span class="code-keyword">return</span> data_[--top_]; }
    <span class="code-keyword">bool</span> <span class="code-func">empty</span>() <span class="code-keyword">const</span> { <span class="code-keyword">return</span> top_ == <span class="code-number">0</span>; }
};</div>

        <h4 class="font-medium mt-6 mb-2">STL 三大组件：容器、迭代器、算法</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>容器类型</th><th>代表</th><th>随机访问</th><th>插入/删除</th><th>适用场景</th></tr></thead>
          <tbody>
            <tr><td><strong>序列容器</strong></td><td><code>vector</code>, <code>deque</code>, <code>list</code></td><td>vector O(1)</td><td>list O(1)</td><td>按顺序存储元素</td></tr>
            <tr><td><strong>关联容器</strong></td><td><code>set</code>, <code>map</code></td><td>O(log n)</td><td>O(log n)</td><td>自动排序 + 快速查找</td></tr>
            <tr><td><strong>无序容器</strong></td><td><code>unordered_map</code></td><td>N/A</td><td>均摊 O(1)</td><td>最快查找（哈希表）</td></tr>
            <tr><td><strong>适配器</strong></td><td><code>stack</code>, <code>queue</code>, <code>priority_queue</code></td><td>N/A</td><td>顶层 O(1)</td><td>受限接口</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">迭代器与算法</h4>
        <div class="code-block"><span class="code-keyword">#include</span> <span class="code-string">&lt;algorithm&gt;</span>
<span class="code-keyword">#include</span> <span class="code-string">&lt;vector&gt;</span>

std::vector&lt;<span class="code-keyword">int</span>&gt; nums = {<span class="code-number">3</span>, <span class="code-number">1</span>, <span class="code-number">4</span>, <span class="code-number">1</span>, <span class="code-number">5</span>, <span class="code-number">9</span>};

<span class="code-comment">// 排序（O(n log n)）</span>
std::sort(nums.begin(), nums.end());

<span class="code-comment">// 查找（二分，O(log n)）—— 要求已排序</span>
<span class="code-keyword">auto</span> it = std::lower_bound(nums.begin(), nums.end(), <span class="code-number">4</span>);

<span class="code-comment">// 遍历（lambda 表达式）</span>
std::for_each(nums.begin(), nums.end(), [](<span class="code-keyword">int</span> x) {
    std::cout &lt;&lt; x &lt;&lt; <span class="code-string">" "</span>;
});

<span class="code-comment">// 条件查找</span>
<span class="code-keyword">auto</span> found = std::find_if(nums.begin(), nums.end(),
    [](<span class="code-keyword">int</span> x) { <span class="code-keyword">return</span> x &gt; <span class="code-number">3</span>; });</div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：<code>std::vector</code> 是 <a href="javascript:void(0)" onclick="App.loadDetail('ds-02')">顺序表</a>的 STL 实现，<code>std::list</code> 对应双向链表。STL 算法如 <code>std::sort</code> 内部使用了 <a href="javascript:void(0)" onclick="App.loadDetail('ds-02')">排序算法</a>（IntroSort：快排 + 堆排 + 插入排序混合）。</div>
        </div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>迭代器失效</strong>：<code>vector</code> 插入/删除可能导致重新分配内存，使所有迭代器失效。删除元素后 <code>erase</code> 返回新迭代器。使用 <code>insert/erase</code> 时务必更新迭代器，否则崩溃。</div>
        </div>
        <div class="compare-table-wrap">
        <table class="compare-table">
          <thead><tr><th>容器</th><th>底层</th><th>查找</th><th>插入末尾</th><th>插入中间</th><th>内存连续</th></tr></thead>
          <tbody>
            <tr><td><code>vector</code></td><td>动态数组</td><td>O(n)</td><td>均摊 O(1)</td><td>O(n)</td><td>✅</td></tr>
            <tr><td><code>deque</code></td><td>分段数组</td><td>O(n)</td><td>O(1)</td><td>O(n)</td><td>分段连续</td></tr>
            <tr><td><code>list</code></td><td>双向链表</td><td>O(n)</td><td>O(1)</td><td>O(1)*</td><td>❌</td></tr>
            <tr><td><code>map</code></td><td>红黑树</td><td>O(log n)</td><td>O(log n)</td><td>O(log n)</td><td>❌</td></tr>
            <tr><td><code>unordered_map</code></td><td>哈希表</td><td>均摊 O(1)</td><td>均摊 O(1)</td><td>均摊 O(1)</td><td>❌</td></tr>
          </tbody>
        </table></div>
        <div class="step-list">
          <div class="step-item"><div><strong>步骤 1：选容器</strong><br>随机访问多 → vector；频繁中间插入 → list；快速查找 → unordered_map/map。</div></div>
          <div class="step-item"><div><strong>步骤 2：包含头文件</strong><br><code>#include &lt;vector&gt;</code>, <code>&lt;map&gt;</code>, <code>&lt;algorithm&gt;</code> 等。</div></div>
          <div class="step-item"><div><strong>步骤 3：用迭代器操作</strong><br><code>begin()</code>/<code>end()</code> 定义范围，<code>std::for_each</code>/<code>std::transform</code> 操作。</div></div>
          <div class="step-item"><div><strong>步骤 4：注意性能</strong><br>vector 预分配 <code>reserve()</code>，避免频繁重分配；map 用 <code>emplace</code> 代替 <code>insert</code> 避免临时对象。</div></div>
        </div>
      ` },

      // ========== cpp-09 智能指针与异常 ==========
      {
        id: 'cpp-09', title: '智能指针与异常', desc: 'unique_ptr/shared_ptr、RAII', icon: '🛡️',
        tags: ['难点'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">告别手动内存管理</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          <a href="javascript:void(0)" onclick="App.loadDetail('cpp-03')">C 语言</a>的 <code>malloc/free</code> 手动管理极易出错——忘记释放、重复释放、异常路径遗漏。C++11 引入的智能指针通过 RAII（资源获取即初始化）机制，让编译器在对象销毁时自动释放资源，从根本上消除内存泄漏。这是现代 C++ 编程的基石。
        </p>

        <h4 class="font-medium mt-6 mb-2">RAII 原则</h4>
        <div class="formula-block">
          <strong>RAII = Resource Acquisition Is Initialization</strong><br>
          资源在构造函数中获取，在析构函数中释放。对象离开作用域时自动析构，资源自动回收。<br>
          $$\\text{构造} \\xrightarrow{\\text{获取资源}} \\text{使用} \\xrightarrow{\\text{离开作用域}} \\text{析构} \\xrightarrow{\\text{释放资源}}$$
        </div>
        <div class="code-block"><span class="code-comment">// RAII 文件封装：构造打开，析构关闭</span>
<span class="code-keyword">class</span> <span class="code-func">FileGuard</span> {
    FILE *fp_;
<span class="code-keyword">public</span>:
    <span class="code-func">FileGuard</span>(<span class="code-keyword">const char</span> *path, <span class="code-keyword">const char</span> *mode)
        : fp_(<span class="code-func">fopen</span>(path, mode)) {}
    ~<span class="code-func">FileGuard</span>() { <span class="code-keyword">if</span> (fp_) <span class="code-func">fclose</span>(fp_); }
    FILE* <span class="code-func">get</span>() <span class="code-keyword">const</span> { <span class="code-keyword">return</span> fp_; }
    <span class="code-keyword">explicit operator bool</span>() <span class="code-keyword">const</span> { <span class="code-keyword">return</span> fp_ != <span class="code-number">nullptr</span>; }
};</div>

        <h4 class="font-medium mt-6 mb-2">三种智能指针</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>类型</th><th>所有权</th><th>引用计数</th><th>典型用途</th></tr></thead>
          <tbody>
            <tr><td><code>unique_ptr</code></td><td>独占（唯一所有者）</td><td>无</td><td>大多数场景首选，零开销</td></tr>
            <tr><td><code>shared_ptr</code></td><td>共享（多个所有者）</td><td>✅ 自动计数</td><td>对象生命周期需多方管理</td></tr>
            <tr><td><code>weak_ptr</code></td><td>观察（不拥有）</td><td>不增加计数</td><td>打破循环引用、缓存</td></tr>
          </tbody>
        </table></div>
        <div class="code-block"><span class="code-keyword">#include</span> <span class="code-string">&lt;memory&gt;</span>

<span class="code-comment">// unique_ptr：独占所有权，最常用</span>
<span class="code-keyword">auto</span> motor = std::make_unique&lt;Motor&gt;(<span class="code-number">100</span>);
<span class="code-comment">// auto copy = motor;  // ❌ 编译错误：不可拷贝</span>
<span class="code-keyword">auto</span> moved = std::move(motor);  <span class="code-comment">// ✅ 所有权转移</span>

<span class="code-comment">// shared_ptr：共享所有权（引用计数）</span>
<span class="code-keyword">auto</span> shared = std::make_shared&lt;Sensor&gt;();
<span class="code-keyword">auto</span> alias = shared;  <span class="code-comment">// 引用计数 +1</span>
<span class="code-comment">// shared 和 alias 都有效，最后一个销毁时释放内存</span>

<span class="code-comment">// weak_ptr：观察 shared_ptr，不增加引用计数</span>
std::weak_ptr&lt;Sensor&gt; weak = shared;
<span class="code-keyword">if</span> (<span class="code-keyword">auto</span> locked = weak.lock()) {
    <span class="code-comment">// locked 是 shared_ptr，对象仍存活</span>
    locked-&gt;read();
} <span class="code-comment">// 对象可能已销毁，lock() 返回空</span></div>

        <h4 class="font-medium mt-6 mb-2">异常处理：try / catch / throw</h4>
        <div class="code-block"><span class="code-keyword">#include</span> <span class="code-string">&lt;stdexcept&gt;</span>

<span class="code-keyword">double</span> <span class="code-func">safe_divide</span>(<span class="code-keyword">double</span> a, <span class="code-keyword">double</span> b) {
    <span class="code-keyword">if</span> (b == <span class="code-number">0.0</span>) <span class="code-keyword">throw</span> std::invalid_argument(<span class="code-string">"division by zero"</span>);
    <span class="code-keyword">return</span> a / b;
}

<span class="code-keyword">try</span> {
    <span class="code-keyword">double</span> r = safe_divide(<span class="code-number">10.0</span>, <span class="code-number">0.0</span>);
} <span class="code-keyword">catch</span> (<span class="code-keyword">const</span> std::invalid_argument &amp;e) {
    std::cerr &lt;&lt; <span class="code-string">"Error: "</span> &lt;&lt; e.what() &lt;&lt; std::endl;
}</div>
        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" "currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>异常安全等级</strong>：①<strong>基本保证</strong>：异常后程序有效且不泄漏；②<strong>强保证</strong>：操作要么成功，要么状态不变（事务性）；③<strong>不抛保证</strong>：函数保证不抛异常（析构函数、swap 等）。RAII 是实现强保证的关键工具。</div>
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：RAII 是对 <a href="javascript:void(0)" onclick="App.loadDetail('cpp-03')">malloc/free</a> 手动管理的终极替代。智能指针的移动语义依赖 <a href="javascript:void(0)" onclick="App.loadDetail('cpp-10')">C++11 新特性</a>中的右值引用。<a href="javascript:void(0)" onclick="App.loadDetail('cpp-06')">拷贝控制</a>中的 Rule of Five 正是为了正确实现 RAII。</div>
        </div>
        <div class="step-list">
          <div class="step-item"><div><strong>步骤 1：首选 unique_ptr</strong><br>不需要共享所有权时，<code>unique_ptr</code> 零开销，性能等同裸指针。</div></div>
          <div class="step-item"><div><strong>步骤 2：需要共享时用 shared_ptr</strong><br>多个对象需共享同一资源时用 <code>shared_ptr</code>，注意避免循环引用。</div></div>
          <div class="step-item"><div><strong>步骤 3：打破循环引用</strong><br>循环引用中一方用 <code>weak_ptr</code>，使用时 <code>lock()</code> 检查有效性。</div></div>
          <div class="step-item"><div><strong>步骤 4：异常安全</strong><br>构造函数中获取资源，析构函数中释放。异常路径由 RAII 自动清理。</div></div>
        </div>
      ` },

      // ========== cpp-10 C++11/14 新特性 ==========
      {
        id: 'cpp-10', title: 'C++11/14 新特性', desc: 'auto、lambda、移动语义、右值引用', icon: '🚀',
        tags: ['工程应用'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">现代 C++ 的分水岭</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          C++11 被称为"现代 C++"的起点，引入了移动语义、lambda 表达式、自动类型推导、范围 for 循环等革命性特性。C++14 在此基础上进一步简化。这些特性让 C++ 的表达力和工程效率大幅提升，也是 <a href="javascript:void(0)" onclick="App.loadDetail('cpp-09')">智能指针</a>和 STL 现代用法的基础。掌握它们是编写现代 C++ 代码的前提。
        </p>

        <h4 class="font-medium mt-6 mb-2">auto 与类型推导</h4>
        <div class="formula-block">
          <strong>auto</strong>：让编译器根据初始化表达式自动推导类型<br>
          <strong>decltype</strong>：获取表达式的类型而不求值<br>
          $$\\texttt{auto x = expr;} \\Rightarrow \\texttt{typeof(expr) x = expr;}$$
        </div>
        <div class="code-block"><span class="code-keyword">auto</span> i = <span class="code-number">42</span>;          <span class="code-comment">// int</span>
<span class="code-keyword">auto</span> d = <span class="code-number">3.14</span>;        <span class="code-comment">// double</span>
<span class="code-keyword">auto</span> s = std::string(<span class="code-string">"hello"</span>);  <span class="code-comment">// std::string</span>

<span class="code-comment">// 范围 for 循环（C++11）</span>
std::vector&lt;<span class="code-keyword">int</span>&gt; v = {<span class="code-number">1</span>, <span class="code-number">2</span>, <span class="code-number">3</span>, <span class="code-number">4</span>};
<span class="code-keyword">for</span> (<span class="code-keyword">auto</span> &amp;x : v) {     <span class="code-comment">// 引用避免拷贝，可修改</span>
    x *= <span class="code-number">2</span>;
}
<span class="code-keyword">for</span> (<span class="code-keyword">const auto</span> &amp;x : v) { <span class="code-comment">// const 引用：只读 + 零拷贝</span>
    std::cout &lt;&lt; x &lt;&lt; <span class="code-string">" "</span>;
}

<span class="code-comment">// decltype：获取类型</span>
<span class="code-keyword">decltype</span>(d) d2 = <span class="code-number">1.0</span>;  <span class="code-comment">// double</span></div>

        <h4 class="font-medium mt-6 mb-2">Lambda 表达式</h4>
        <div class="formula-block">
          <strong>Lambda 语法</strong>：<code>[捕获列表](参数列表) -&gt; 返回类型 { 函数体 }</code><br>
          捕获方式：<code>[]</code> 无捕获、<code>[=]</code> 值捕获、<code>[&amp;]</code> 引用捕获、<code>[this]</code> 捕获 this
        </div>
        <div class="code-block"><span class="code-comment">// 基本 lambda</span>
<span class="code-keyword">auto</span> add = [](<span class="code-keyword">int</span> a, <span class="code-keyword">int</span> b) -&gt; <span class="code-keyword">int</span> { <span class="code-keyword">return</span> a + b; };

<span class="code-comment">// 捕获外部变量</span>
<span class="code-keyword">int</span> threshold = <span class="code-number">10</span>;
<span class="code-keyword">auto</span> filter = [threshold](<span class="code-keyword">int</span> x) {
    <span class="code-keyword">return</span> x &gt; threshold;
};

<span class="code-comment">// 作为 STL 算法的回调</span>
std::vector&lt;<span class="code-keyword">int</span>&gt; data = {<span class="code-number">3</span>, <span class="code-number">1</span>, <span class="code-number">4</span>, <span class="code-number">1</span>, <span class="code-number">5</span>};
<span class="code-keyword">auto</span> it = std::find_if(data.begin(), data.end(),
    [threshold](<span class="code-keyword">int</span> x) { <span class="code-keyword">return</span> x &gt; threshold; });

<span class="code-comment">// 捕获列表详解</span>
[=]     <span class="code-comment">// 值捕获所有外部变量（只读）</span>
[&amp;]     <span class="code-comment">// 引用捕获所有外部变量（可修改，注意生命周期）</span>
[x, &amp;y] <span class="code-comment">// x 值捕获，y 引用捕获</span>
[<span class="code-keyword">this</span>]  <span class="code-comment">// 捕获 this 指针（访问成员变量）</span></div>

        <h4 class="font-medium mt-6 mb-2">移动语义与右值引用</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>左值</strong>：有名字的、可取地址的对象（变量）</li>
          <li><strong>右值</strong>：临时对象、字面量、<code>std::move()</code> 的结果——无名字、不可取地址</li>
          <li><strong>右值引用</strong> <code>T&amp;&amp;</code>：绑定到右值，允许"窃取"临时对象的资源，避免深拷贝</li>
          <li><strong>std::move</strong>：将左值转换为右值引用（不移动任何东西，只是类型转换）</li>
        </ul>
        <div class="code-block"><span class="code-comment">// 移动构造函数：窃取资源而非拷贝</span>
<span class="code-keyword">class</span> <span class="code-func">Buffer</span> {
    <span class="code-keyword">int</span> *data_;
    <span class="code-keyword">size_t</span> size_;
<span class="code-keyword">public</span>:
    <span class="code-comment">// 移动构造函数</span>
    <span class="code-func">Buffer</span>(Buffer &amp;&amp;other) <span class="code-keyword">noexcept</span>
        : data_(other.data_), size_(other.size_) {
        other.data_ = <span class="code-number">nullptr</span>;  <span class="code-comment">// 源对象置空，防止释放</span>
        other.size_ = <span class="code-number">0</span>;
    }

    <span class="code-comment">// 移动赋值运算符</span>
    Buffer &amp;<span class="code-keyword">operator</span>=(Buffer &amp;&amp;other) <span class="code-keyword">noexcept</span> {
        <span class="code-keyword">if</span> (<span class="code-keyword">this</span> != &amp;other) {
            <span class="code-keyword">delete</span>[] data_;         <span class="code-comment">// 释放旧资源</span>
            data_ = other.data_;   <span class="code-comment">// 窃取新资源</span>
            size_ = other.size_;
            other.data_ = <span class="code-number">nullptr</span>;
            other.size_ = <span class="code-number">0</span>;
        }
        <span class="code-keyword">return</span> *<span class="code-keyword">this</span>;
    }
};</div>
        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>C++14 补充</strong>：泛型 lambda（参数用 <code>auto</code>）、返回类型自动推导、<code>std::make_unique</code>。C++17 进一步引入 <code>std::optional</code>、<code>std::variant</code>、结构化绑定（<code>auto [k,v]</code>）。</div>
        </div>
        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：移动语义是 <a href="javascript:void(0)" onclick="App.loadDetail('cpp-09')">智能指针</a>实现的基石。<code>unique_ptr</code> 通过移动语义转移所有权。Lambda 表达式替代了 <a href="javascript:void(0)" onclick="App.loadDetail('cpp-02')">函数指针</a>的回调模式，在 <a href="javascript:void(0)" onclick="App.loadDetail('cpp-08')">STL 算法</a>中大量使用。</div>
        </div>
        <div class="compare-table-wrap">
        <table class="compare-table">
          <thead><tr><th>特性</th><th>C++98/03</th><th>C++11/14</th></tr></thead>
          <tbody>
            <tr><td><strong>类型声明</strong></td><td>必须显式写类型</td><td><code>auto</code> 自动推导</td></tr>
            <tr><td><strong>遍历容器</strong></td><td>迭代器 + 下标</td><td>范围 <code>for (auto : v)</code></td></tr>
            <tr><td><strong>回调</strong></td><td>函数指针 / <a href="javascript:void(0)" onclick="App.loadDetail('cpp-02')">函数对象</a></td><td>Lambda 表达式</td></tr>
            <tr><td><strong>内存管理</strong></td><td><code>new/delete</code> 手动管理</td><td><code>unique_ptr/shared_ptr</code></td></tr>
            <tr><td><strong>拷贝优化</strong></td><td>深拷贝（昂贵）</td><td>移动语义（窃取资源）</td></tr>
          </tbody>
        </table></div>
        <div class="step-list">
          <div class="step-item"><div><strong>步骤 1：启用 C++11+</strong><br>编译时加 <code>-std=c++14</code>（或更高），启用所有现代特性。</div></div>
          <div class="step-item"><div><strong>步骤 2：用 auto 简化声明</strong><br>复杂类型用 auto，保持可读性。避免在长函数中过度使用。</div></div>
          <div class="step-item"><div><strong>步骤 3：用 lambda 替代函数指针</strong><br>STL 算法、回调、排序比较器都用 lambda，代码更内聚。</div></div>
          <div class="step-item"><div><strong>步骤 4：实现移动构造</strong><br>管理资源的类实现移动构造/赋值，标记 <code>noexcept</code>，让容器高效移动。</div></div>
        </div>
      ` },

    ] // sections end
  } // cpp course end

}; // CppCourseData end
