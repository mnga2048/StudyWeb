// 专业课学习平台 - 计算机网络内容数据层
// 8 节骨架数据：TCP/IP 协议栈、路由交换、应用层协议、ROS 通信与工业网络

  // ========== 计算机网络 ==========
  'network': {
    title: '计算机网络',
    subtitle: 'TCP/IP 协议栈、路由交换、应用层协议，ROS 通信与工业网络基础',
    icon: '🌐',
    sections: [

      // ==================== net-01 ====================
      { id: 'net-01', title: '计算机网络概述', desc: 'OSI/TCP-IP 模型、性能指标、网络拓扑', icon: '🌐', tags: ['核心'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">计算机网络概述：万物互联的基础</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          计算机网络是将地理位置不同的多台计算机通过通信设备和线路连接起来，实现资源共享和信息传递的系统。理解网络分层模型是学习所有网络协议的起点——OSI 七层模型是理论框架，TCP/IP 四层模型是实际标准。本节从两大模型出发，建立网络知识的整体地图。
        </p>

        <h4 class="font-medium mt-6 mb-2">OSI 七层模型 vs TCP/IP 四层模型</h4>
        <div class="formula-block">
          OSI 七层（自上而下）：<strong>应用层 → 表示层 → 会话层 → 传输层 → 网络层 → 数据链路层 → 物理层</strong><br>
          TCP/IP 四层（自上而下）：<strong>应用层 → 传输层 → 网际层 → 网络接口层</strong><br><br>
          核心对应关系：OSI 的应用层/表示层/会话层 ≈ TCP/IP 的应用层<br>
          OSI 的数据链路层 + 物理层 ≈ TCP/IP 的网络接口层
          <div class="text-sm text-gray-500 mt-2">实际工业界采用 TCP/IP 模型；OSI 模型主要用于教学和理论分析</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">各层功能与协议速查</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>OSI 层</th><th>功能</th><th>典型协议/设备</th><th>PDU 名称</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">应用层</td><td>用户接口、网络服务</td><td>HTTP、DNS、SMTP、FTP、MQTT</td><td>数据（Data）</td></tr>
            <tr><td class="font-medium">表示层</td><td>数据格式转换、加密压缩</td><td>SSL/TLS、JPEG、ASCII</td><td>数据</td></tr>
            <tr><td class="font-medium">会话层</td><td>建立/管理/终止会话</td><td>RPC、NetBIOS</td><td>数据</td></tr>
            <tr><td class="font-medium">传输层</td><td>端到端可靠传输、流量控制</td><td>TCP、UDP</td><td>段/报文段（Segment）</td></tr>
            <tr><td class="font-medium">网络层</td><td>路由选择、逻辑寻址</td><td>IP、ICMP、ARP、OSPF</td><td>分组/包（Packet）</td></tr>
            <tr><td class="font-medium">数据链路层</td><td>帧封装、差错检测、MAC 寻址</td><td>以太网、PPP、VLAN</td><td>帧（Frame）</td></tr>
            <tr><td class="font-medium">物理层</td><td>比特流传输、电气/光信号</td><td>RJ45、光纤、WiFi 物理层</td><td>比特（Bit）</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">网络性能关键指标</h4>
        <ul class="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 mb-4">
          <li><strong>带宽（Bandwidth）</strong>：链路的最大数据传输速率，单位 bps（bit/s）。如千兆以太网带宽为 $1 \\text{ Gbps} = 10^9 \\text{ bps}$。</li>
          <li><strong>时延（Delay）</strong>：数据从源到目的的总耗时 = 发送时延 + 传播时延 + 处理时延 + 排队时延。</li>
          <li><strong>吞吐量（Throughput）</strong>：单位时间内实际通过链路的数据量，受瓶颈链路限制。</li>
          <li><strong>往返时间 RTT</strong>：从发送数据到收到确认的时间，TCP 拥塞控制的关键参数。</li>
        </ul>
        <div class="formula-block">
          $$\\text{发送时延} = \\frac{\\text{数据长度 (bit)}}{\\text{带宽 (bps)}} \\qquad \\text{传播时延} = \\frac{\\text{距离 (m)}}{\\text{信号传播速率 (m/s)}}$$
          <div class="text-sm text-gray-500 mt-2">电磁波在铜缆中约 $2 \\times 10^8$ m/s，光纤中约 $2.3 \\times 10^8$ m/s</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">网络拓扑结构</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>星型拓扑</strong>：所有节点连接到中心交换机/集线器。优点是易管理、故障隔离好；缺点是中心节点单点故障。以太网 LAN 最常用。</div></div>
          <div class="step-item"><div><strong>总线型拓扑</strong>：所有节点共享一条总线。早期以太网（10Base5/10Base2）使用，现已淘汰。冲突域大，带宽共享。</div></div>
          <div class="step-item"><div><strong>环型拓扑</strong>：节点首尾相连成环。令牌环网使用，令牌沿环传递，无冲突。工业现场仍有应用。</div></div>
          <div class="step-item"><div><strong>网状拓扑</strong>：节点间有多条路径。可靠性高，Internet 骨干网采用部分网状拓扑，成本较高。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">数据封装与解封装过程</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          数据从应用层向下传递时，每层添加本层头部（封装）；接收端从下向上传递时逐层剥离头部（解封装）。这个过程类似"套信封"——每经过一层协议就加一个信封，到达对端再逐层拆开。
        </p>

        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>考试要点</strong>：OSI vs TCP/IP 的层次对应关系是选择题高频考点。记住"物数网传会表应"口诀（自下而上），以及每层的 PDU 名称——特别是网络层叫"分组"、传输层叫"段"、链路层叫"帧"。</div>
        </div>

        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>易混概念</strong>：集线器（Hub）工作在物理层，所有端口共享带宽（同一冲突域）；交换机（Switch）工作在数据链路层，每个端口独立冲突域。集线器已基本被交换机取代。</div>
        </div>

        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：物理层的信号编码与 <a href="javascript:void(0)" onclick="App.loadDetail('sig-08')">信号与系统·采样定理</a> 密切相关——数字通信的基础是将模拟信号采样量化后编码传输。数据链路层的帧同步涉及 <a href="javascript:void(0)" onclick="App.loadDetail('emb-06')">嵌入式·通信接口 UART/SPI</a> 中的串行通信原理。</div>
        </div>
      ` },

      // ==================== net-02 ====================
      { id: 'net-02', title: '物理层与数据链路层', desc: '编码、差错控制、MAC、以太网、交换机', icon: '🔌', tags: ['核心'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">物理层与数据链路层：网络的底层基石</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          物理层解决"如何在介质上传输比特"——编码方式、信号调制、传输介质；数据链路层解决"如何在相邻节点间可靠传输帧"——差错检测、介质访问控制、MAC 寻址。这两层共同构成局域网（LAN）的技术基础，以太网是最典型的实现。
        </p>

        <h4 class="font-medium mt-6 mb-2">物理层编码方式</h4>
        <div class="formula-block">
          常见数字编码（以二进制序列 10110 为例）：<br>
          <strong>NRZ（不归零编码）</strong>：高电平=1，低电平=0，无法自同步<br>
          <strong>曼彻斯特编码</strong>：每个比特周期中间有跳变，低→高=0，高→低=1<br>
          <strong>差分曼彻斯特编码</strong>：比特开始处有/无跳变表示 0/1，中间必有跳变<br>
          <strong>4B/5B 编码</strong>：每 4 位数据编码为 5 位，确保足够跳变用于同步（100BASE-FX 使用）
          <div class="text-sm text-gray-500 mt-2">以太网（10BASE-T）使用曼彻斯特编码，100BASE-TX 使用 4B/5B + MLT-3</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">差错控制方法</h4>
        <ul class="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 mb-4">
          <li><strong>奇偶校验</strong>：附加 1 位使数据中 1 的个数为奇/偶数。只能检测奇数位错误，无法纠错。</li>
          <li><strong>CRC 循环冗余校验</strong>：数据链路层最常用。发送方用生成多项式 $G(x)$ 做模 2 除法，余数作为 FCS 附加到帧尾。接收方重做除法，余数为 0 则无误。</li>
          <li><strong>海明码</strong>：能检 2 位错、纠 1 位错。校验位数 $r$ 满足 $2^r \\geq m + r + 1$（$m$ 为数据位数）。</li>
        </ul>
        <div class="formula-block">
          $$\\text{CRC 校验：} \\frac{D(x) \\cdot x^r}{G(x)} = Q(x) \\cdots R(x) \\quad \\Rightarrow \\quad \\text{发送 } D(x) \\cdot x^r + R(x)$$
          <div class="text-sm text-gray-500 mt-2">CRC-32 用于以太网帧校验，CRC-CCITT 用于 USB、X.25</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">MAC 地址与以太网帧</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>MAC 地址结构</strong>：48 位（6 字节），前 24 位为厂商标识（OUI），后 24 位为设备编号。如 00:1A:2B:3C:4D:5E。</div></div>
          <div class="step-item"><div><strong>以太网帧格式（Ethernet V2）</strong>：目的 MAC(6B) + 源 MAC(6B) + 类型(2B) + 数据(46~1500B) + FCS(4B)。最小帧长 64 字节，最大 1518 字节。</div></div>
          <div class="step-item"><div><strong>CSMA/CD 协议</strong>：载波侦听多路访问/冲突检测。发送前先听（载波侦听），边发边听（冲突检测），冲突后停止发送并发送 Jam 信号，退避后重试。</div></div>
          <div class="step-item"><div><strong>最小帧长与冲突域</strong>：以太网最小帧长 64 字节（512 bit），确保在最大网络直径内能检测到冲突。$\\text{最小帧长} = 2 \\times \\text{传播时延} \\times \\text{带宽}$。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">交换机工作原理</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          以太网交换机基于 <strong>MAC 地址表</strong> 转发帧：收到帧后学习源 MAC 与端口的映射，查目的 MAC 转发到对应端口（单播）或泛洪到所有端口（未知单播/广播）。交换机的每个端口是一个独立冲突域，但所有端口共享广播域。
        </p>

        <h4 class="font-medium mt-6 mb-2">VLAN 虚拟局域网</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>特性</th><th>说明</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">作用</td><td>逻辑隔离广播域，同一交换机上划分多个虚拟网络</td></tr>
            <tr><td class="font-medium">实现</td><td>IEEE 802.1Q 帧标记：在以太网帧中插入 4 字节 VLAN Tag（VLAN ID 12 bit）</td></tr>
            <tr><td class="font-medium">端口类型</td><td>Access（接入端口，只属于一个 VLAN）、Trunk（干道端口，承载多个 VLAN）</td></tr>
            <tr><td class="font-medium">优势</td><td>减小广播域、提高安全性、灵活组网（不受物理位置限制）</td></tr>
          </tbody>
        </table></div>

        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>CRC 计算技巧</strong>：考试常考 CRC 计算步骤。口诀："数据后补 r 个 0，模 2 除法用异或，余数就是 FCS"。注意模 2 除法中减法 = 加法 = 异或（XOR），没有借位。</div>
        </div>

        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>冲突域 vs 广播域</strong>：交换机隔离冲突域（每个端口一个冲突域），路由器隔离广播域（每个接口一个广播域）。VLAN 可以在不增加路由器的情况下隔离广播域。Hub 的所有端口在同一冲突域中。</div>
        </div>

        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：CRC 校验的本质是多项式除法，与 <a href="javascript:void(0)" onclick="App.loadDetail('emb-06')">嵌入式·通信接口</a> 中 UART 的奇偶校验原理一脉相承。物理层编码与 <a href="javascript:void(0)" onclick="App.loadDetail('sig-08')">信号与系统·采样定理</a> 中的 PCM 编码密切相关。</div>
        </div>
      ` },

      // ==================== net-03 ====================
      { id: 'net-03', title: '网络层与 IP 协议', desc: 'IP 地址、子网划分、路由算法、NAT', icon: '📦', tags: ['核心', '高频考点'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">网络层：互联网的"邮政系统"</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          网络层的核心任务是将数据分组从源主机跨越多个网络送达目的主机，类似邮政系统——IP 地址是"门牌号"，路由器是"邮局"，路由表是"邮路规划"。IP 协议提供尽力而为（Best-Effort）的无连接服务，不保证可靠传输，可靠性由上层 TCP 负责。
        </p>

        <h4 class="font-medium mt-6 mb-2">IPv4 地址分类与子网划分</h4>
        <div class="formula-block">
          IPv4 地址 = 32 位，点分十进制表示（如 192.168.1.1）<br><br>
          <strong>传统分类</strong>：<br>
          A 类：$0.0.0.0 \\sim 127.255.255.255$（$/8$，大型网络）<br>
          B 类：$128.0.0.0 \\sim 191.255.255.255$（$/16$，中型网络）<br>
          C 类：$192.0.0.0 \\sim 223.255.255.255$（$/24$，小型网络）<br>
          D 类：$224.0.0.0 \\sim 239.255.255.255$（组播）<br><br>
          <strong>私有地址范围</strong>（RFC 1918）：<br>
          10.0.0.0/8、172.16.0.0/12、192.168.0.0/16
        </div>

        <h4 class="font-medium mt-6 mb-2">CIDR 与子网划分</h4>
        <div class="formula-block">
          CIDR（无类别域间路由）：用"IP/前缀长度"表示网络，如 $192.168.1.0/24$<br><br>
          子网掩码：前 $n$ 位为 1，后 $32-n$ 位为 0<br>
          网络地址 = IP AND 子网掩码<br>
          广播地址 = 网络地址 OR (NOT 子网掩码)<br>
          可用主机数 $= 2^{32-n} - 2$（减去网络地址和广播地址）
          <div class="text-sm text-gray-500 mt-2">例：192.168.1.0/26 划分为 4 个子网，每个子网 62 台主机</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">子网划分实例</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>已知</strong>：某公司分配到 172.16.0.0/16，需要划分 50 个子网，每个子网至少 500 台主机。</div></div>
          <div class="step-item"><div><strong>确定主机位</strong>：$2^h - 2 \\geq 500 \\Rightarrow h = 9$（510 台可用主机）。因此子网掩码前缀为 $32 - 9 = 23$ 位。</div></div>
          <div class="step-item"><div><strong>确定子网数</strong>：从原 /16 到 /23，借了 7 位，可划分 $2^7 = 128$ 个子网，满足 50 个的要求。</div></div>
          <div class="step-item"><div><strong>子网分配</strong>：第 1 个子网 172.16.0.0/23（主机范围 .0.1~.1.254），第 2 个 172.16.2.0/23，依此类推。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">路由算法</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>算法</th><th>类型</th><th>核心思想</th><th>协议</th><th>适用场景</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">距离向量</td><td>分布式</td><td>每个路由器只知道邻居信息，逐步收敛（Bellman-Ford）</td><td>RIP</td><td>小型网络</td></tr>
            <tr><td class="font-medium">链路状态</td><td>全局</td><td>每个路由器知道全网拓扑，用 Dijkstra 计算最短路径</td><td>OSPF</td><td>大型企业网</td></tr>
            <tr><td class="font-medium">路径向量</td><td>策略</td><td>记录 AS 路径，基于策略选择路由</td><td>BGP</td><td>Internet 骨干</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">NAT 网络地址转换</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          NAT 将私有 IP 转换为公有 IP，解决 IPv4 地址不足问题。最常见的是 NAPT（网络地址端口转换），用"IP + 端口"映射多个内网主机到一个公网 IP。
        </p>
        <div class="formula-block">
          NAPT 映射表项：$\\{\\text{内网 IP:端口}, \\text{协议}\\} \\leftrightarrow \\{\\text{公网 IP:端口}\\}$<br>
          例：$192.168.1.10:5000 \\leftrightarrow 203.0.113.1:40001$
          <div class="text-sm text-gray-500 mt-2">NAT 穿透（NAT Traversal）是 P2P 通信和 VoIP 的核心技术难题</div>
        </div>

        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>子网划分口诀</strong>："借 n 位得 $2^n$ 子网，留 m 位得 $2^m - 2$ 主机"。考试中常考"给定 IP 和子网掩码，求网络地址/广播地址/可用主机范围"，务必熟练掌握 AND 运算。</div>
        </div>

        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>IP 分片与重组</strong>：当 IP 数据报长度超过链路 MTU（以太网 MTU=1500B）时需要分片。分片在目的主机重组（中间路由器不重组）。片偏移以 8 字节为单位，MF 标志位=1 表示还有后续分片。</div>
        </div>

        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：ARP 协议将 IP 地址解析为 MAC 地址，连接了网络层和数据链路层（<a href="javascript:void(0)" onclick="App.loadDetail('net-02')">net-02 物理层与数据链路层</a>）。ICMP 协议用于网络诊断（ping、traceroute），是网络层的重要辅助协议。<a href="javascript:void(0)" onclick="App.loadDetail('net-04')">传输层</a> 的 TCP/UDP 复用网络层 IP 服务。</div>
        </div>
      ` },

      // ==================== net-04 ====================
      { id: 'net-04', title: '传输层', desc: 'TCP/UDP、三次握手、流量控制、拥塞控制', icon: '🚀', tags: ['核心', '高频考点'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">传输层：端到端的可靠通信</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          传输层是网络体系中最复杂的一层——TCP 提供可靠、有序、无重复的字节流服务，通过三次握手建立连接、滑动窗口实现流量控制、多种算法应对网络拥塞。UDP 则提供轻量级无连接服务，适合实时应用。理解 TCP 的工作机制是网络学习的核心难点。
        </p>

        <h4 class="font-medium mt-6 mb-2">TCP vs UDP 对比</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>特性</th><th>TCP</th><th>UDP</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">连接性</td><td>面向连接（三次握手）</td><td>无连接</td></tr>
            <tr><td class="font-medium">可靠性</td><td>可靠（确认、重传、排序）</td><td>不可靠（尽力交付）</td></tr>
            <tr><td class="font-medium">流量控制</td><td>滑动窗口</td><td>无</td></tr>
            <tr><td class="font-medium">拥塞控制</td><td>慢启动、拥塞避免、快重传、快恢复</td><td>无</td></tr>
            <tr><td class="font-medium">首部大小</td><td>20~60 字节</td><td>8 字节</td></tr>
            <tr><td class="font-medium">传输模式</td><td>字节流</td><td>报文</td></tr>
            <tr><td class="font-medium">典型应用</td><td>HTTP、FTP、SMTP、SSH</td><td>DNS、DHCP、RTP、游戏</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">TCP 三次握手与四次挥手</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>三次握手（建立连接）</strong><br>
            ① 客户端 → 服务器：SYN=1, seq=x（客户端进入 SYN_SENT）<br>
            ② 服务器 → 客户端：SYN=1, ACK=1, seq=y, ack=x+1（服务器进入 SYN_RCVD）<br>
            ③ 客户端 → 服务器：ACK=1, seq=x+1, ack=y+1（双方进入 ESTABLISHED）</div></div>
          <div class="step-item"><div><strong>四次挥手（释放连接）</strong><br>
            ① 主动方 → 被动方：FIN=1, seq=u（主动方进入 FIN_WAIT_1）<br>
            ② 被动方 → 主动方：ACK=1, ack=u+1（被动方进入 CLOSE_WAIT，主动方进入 FIN_WAIT_2）<br>
            ③ 被动方 → 主动方：FIN=1, seq=w（被动方进入 LAST_ACK）<br>
            ④ 主动方 → 被动方：ACK=1, ack=w+1（主动方进入 TIME_WAIT，等待 2MSL 后关闭）</div></div>
        </div>
        <div class="formula-block">
          $$\\text{为什么需要三次握手？}$$
          防止已失效的连接请求报文到达服务器，导致错误连接。若只有两次握手，服务器收到迟到的 SYN 会误以为是新请求并分配资源。
          <div class="text-sm text-gray-500 mt-2">TIME_WAIT 等待 2MSL（$2 \\times 60\\text{s}$）：确保最后的 ACK 到达 + 让旧连接的报文在网络中消亡</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">滑动窗口与流量控制</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          TCP 用<strong>滑动窗口</strong>实现流量控制，接收方通过 ACK 中的 <strong>窗口字段（rwnd）</strong> 告知发送方"我还能接收多少数据"。发送方的发送窗口 $\\leq$ 接收方通告的窗口值。
        </p>
        <div class="formula-block">
          $$\\text{有效窗口} = \\min(\\text{发送窗口}, \\text{接收窗口 rwnd})$$
          $$\\text{发送速率} \\leq \\frac{\\text{有效窗口}}{\\text{RTT}}$$
          <div class="text-sm text-gray-500 mt-2">零窗口探测：当 rwnd=0 时，发送方定期发送 1 字节探测报文</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">拥塞控制四大算法</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>算法</th><th>阶段</th><th>核心机制</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">慢启动</td><td>连接初期</td><td>拥塞窗口 $cwnd$ 从 1 MSS 指数增长（每 RTT 翻倍），直到 $cwnd \\geq ssthresh$</td></tr>
            <tr><td class="font-medium">拥塞避免</td><td>$cwnd \\geq ssthresh$</td><td>$cwnd$ 线性增长（每 RTT +1 MSS），直到检测到丢包</td></tr>
            <tr><td class="font-medium">快重传</td><td>收到 3 个重复 ACK</td><td>立即重传丢失报文段，不必等待超时</td></tr>
            <tr><td class="font-medium">快恢复</td><td>快重传之后</td><td>$ssthresh = cwnd/2$，$cwnd = ssthresh$（跳过慢启动，直接进入拥塞避免）</td></tr>
          </tbody>
        </table></div>
        <div class="formula-block">
          超时丢包后：$ssthresh = cwnd / 2$，$cwnd = 1 \\text{ MSS}$（回到慢启动）<br>
          快重传/快恢复后：$ssthresh = cwnd / 2$，$cwnd = ssthresh$（保持在拥塞避免阶段）
        </div>

        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>三次握手高频考法</strong>：(1) 为什么不能两次？答：防止历史连接。(2) SYN Flood 攻击原理？答：攻击者伪造大量 SYN 而不完成握手，耗尽服务器半连接队列。(3) ISN 为什么随机？答：防止伪造旧连接的报文。</div>
        </div>

        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>流量控制 vs 拥塞控制</strong>：流量控制是点对点的——接收方告诉发送方"别发太快"；拥塞控制是全局性的——防止网络整体过载。两者同时起作用，发送窗口取 $\\min(rwnd, cwnd)$。</div>
        </div>

        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：TCP 端口号标识了 <a href="javascript:void(0)" onclick="App.loadDetail('net-05')">应用层协议</a>（HTTP=80, HTTPS=443, SSH=22）。拥塞控制中的 AIMD 策略与 <a href="javascript:void(0)" onclick="App.loadDetail('act-14')">控制理论·PID 控制</a> 中的反馈控制思想相通——都是基于误差的负反馈调节。</div>
        </div>
      ` },

      // ==================== net-05 ====================
      { id: 'net-05', title: '应用层协议', desc: 'HTTP/DNS/DHCP/SMTP、Socket 编程', icon: '📡', tags: ['核心'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">应用层：网络服务的直接提供者</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          应用层是用户与网络交互的接口——浏览器通过 HTTP 获取网页，邮箱通过 SMTP/POP3/IMAP 收发邮件，域名通过 DNS 解析为 IP 地址。Socket 编程则是应用层直接使用传输层服务的编程接口，是网络应用开发的核心 API。
        </p>

        <h4 class="font-medium mt-6 mb-2">HTTP 协议</h4>
        <div class="formula-block">
          HTTP 请求格式：$\\text{方法 URL HTTP/版本} \\quad \\text{Header} \\quad \\text{Body}$<br>
          HTTP 响应格式：$\\text{HTTP/版本 状态码 描述} \\quad \\text{Header} \\quad \\text{Body}$
        </div>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>方法</th><th>语义</th><th>幂等</th><th>典型场景</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">GET</td><td>获取资源</td><td>是</td><td>网页浏览、API 查询</td></tr>
            <tr><td class="font-medium">POST</td><td>提交数据</td><td>否</td><td>表单提交、文件上传</td></tr>
            <tr><td class="font-medium">PUT</td><td>更新资源</td><td>是</td><td>更新用户信息</td></tr>
            <tr><td class="font-medium">DELETE</td><td>删除资源</td><td>是</td><td>删除文章</td></tr>
            <tr><td class="font-medium">HEAD</td><td>只获取响应头</td><td>是</td><td>检查资源是否存在</td></tr>
          </tbody>
        </table></div>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          <strong>HTTP/1.1 vs HTTP/2 vs HTTP/3</strong>：1.1 引入持久连接和管线化；2.0 引入多路复用和头部压缩；3.0 基于 QUIC（UDP），解决队头阻塞。
        </p>

        <h4 class="font-medium mt-6 mb-2">DNS 域名解析</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>解析流程</strong>：浏览器缓存 → OS 缓存 → 本地 DNS 服务器 → 根域名服务器 → 顶级域名服务器 → 权威域名服务器</div></div>
          <div class="step-item"><div><strong>递归查询 vs 迭代查询</strong>：客户端到本地 DNS 通常是递归查询（"全权代理"）；本地 DNS 到各级域名服务器是迭代查询（"一步一步问"）</div></div>
          <div class="step-item"><div><strong>DNS 记录类型</strong>：A 记录（域名→IPv4）、AAAA（域名→IPv6）、CNAME（别名）、MX（邮件服务器）、NS（域名服务器）、PTR（IP→域名，反向解析）</div></div>
        </div>
        <div class="formula-block">
          $$\\text{DNS 查询耗时} = \\text{本地缓存命中} (0\\text{ms}) \\mid \\text{迭代解析} (RTT_1 + RTT_2 + \\cdots + RTT_n)$$
          <div class="text-sm text-gray-500 mt-2">浏览器通常同时使用 DNS 预解析（dns-prefetch）来减少延迟</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">Socket 编程模型</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>TCP Socket 流程</strong><br>
            服务器：socket() → bind() → listen() → accept() → recv()/send() → close()<br>
            客户端：socket() → connect() → send()/recv() → close()</div></div>
          <div class="step-item"><div><strong>UDP Socket 流程</strong><br>
            服务器：socket() → bind() → recvfrom()/sendto() → close()<br>
            客户端：socket() → sendto()/recvfrom() → close()</div></div>
          <div class="step-item"><div><strong>关键参数</strong>：socket 类型（SOCK_STREAM=TCP, SOCK_DGRAM=UDP）、地址族（AF_INET=IPv4）、端口号（16 bit，0~65535）</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">其他重要应用层协议</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>协议</th><th>端口</th><th>传输层</th><th>功能</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">SMTP</td><td>25/587</td><td>TCP</td><td>发送邮件（推模式）</td></tr>
            <tr><td class="font-medium">POP3</td><td>110</td><td>TCP</td><td>接收邮件（下载后删除）</td></tr>
            <tr><td class="font-medium">IMAP</td><td>143</td><td>TCP</td><td>接收邮件（服务器保留副本）</td></tr>
            <tr><td class="font-medium">DHCP</td><td>67/68</td><td>UDP</td><td>自动分配 IP 地址（DORA 流程）</td></tr>
            <tr><td class="font-medium">FTP</td><td>20/21</td><td>TCP</td><td>文件传输（21=控制, 20=数据）</td></tr>
            <tr><td class="font-medium">SSH</td><td>22</td><td>TCP</td><td>安全远程登录</td></tr>
          </tbody>
        </table></div>

        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>DHCP DORA 流程</strong>：Discover（广播"谁有 IP 给我？"）→ Offer（DHCP 服务器"我有 IP 给你"）→ Request（客户端"我要这个 IP"）→ ACK（服务器"确认给你"）。四步都是 UDP 广播。</div>
        </div>

        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>HTTP 状态码分类</strong>：1xx=信息、2xx=成功（200 OK）、3xx=重定向（301 永久, 302 临时）、4xx=客户端错误（404 未找到, 403 禁止）、5xx=服务器错误（500 内部错误, 503 服务不可用）。考试选择题常考。</div>
        </div>

        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：Socket 编程与 <a href="javascript:void(0)" onclick="App.loadDetail('os-07')">操作系统·I/O 系统</a> 中的文件描述符和 I/O 多路复用（select/poll/epoll）紧密相关。MQTT 协议（<a href="javascript:void(0)" onclick="App.loadDetail('net-07')">net-07 无线与物联网网络</a>）也是基于 Socket 的应用层协议。</div>
        </div>
      ` },

      // ==================== net-06 ====================
      { id: 'net-06', title: '网络安全基础', desc: '对称/非对称加密、数字证书、TLS/SSL', icon: '🔐', tags: ['工程应用'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">网络安全：保护数据的机密性、完整性与可用性</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          网络安全的三大目标（CIA 三元组）：机密性（Confidentiality）——只有授权方能读取数据；完整性（Integrity）——数据未被篡改；可用性（Availability）——服务持续可用。本节聚焦密码学基础、密钥管理、数字证书和 TLS 安全通信协议。
        </p>

        <h4 class="font-medium mt-6 mb-2">对称加密 vs 非对称加密</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>特性</th><th>对称加密</th><th>非对称加密</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">密钥</td><td>加密解密用同一密钥</td><td>公钥加密，私钥解密（或反过来签名）</td></tr>
            <tr><td class="font-medium">速度</td><td>快（硬件加速可达 Gbps 级）</td><td>慢（比对称加密慢 100~1000 倍）</td></tr>
            <tr><td class="font-medium">密钥分发</td><td>困难（需要安全通道共享密钥）</td><td>简单（公钥可公开分发）</td></tr>
            <tr><td class="font-medium">典型算法</td><td>AES（128/192/256 bit）、DES、3DES</td><td>RSA（2048 bit）、ECC、DSA</td></tr>
            <tr><td class="font-medium">适用场景</td><td>大量数据加密（文件、通信）</td><td>密钥交换、数字签名、少量数据加密</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">RSA 算法核心步骤</h4>
        <div class="formula-block">
          <strong>密钥生成</strong>：<br>
          ① 选两个大素数 $p, q$，计算 $n = p \\times q$<br>
          ② 计算 $\\varphi(n) = (p-1)(q-1)$<br>
          ③ 选 $e$ 使得 $1 < e < \\varphi(n)$ 且 $\\gcd(e, \\varphi(n)) = 1$<br>
          ④ 求 $d$ 使得 $e \\times d \\equiv 1 \\pmod{\\varphi(n)}$<br>
          ⑤ 公钥 $(e, n)$，私钥 $(d, n)$<br><br>
          <strong>加密</strong>：$C = M^e \\bmod n$<br>
          <strong>解密</strong>：$M = C^d \\bmod n$
          <div class="text-sm text-gray-500 mt-2">安全性基于大数分解困难：已知 $n$ 求 $p, q$ 在计算上不可行（2048 bit 以上）</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">消息摘要与数字签名</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>消息摘要（Hash）</strong>：任意长度输入 → 固定长度输出（摘要/指纹）。常用算法：SHA-256（256 bit）、MD5（128 bit，已不安全）。单向不可逆，抗碰撞。</div></div>
          <div class="step-item"><div><strong>数字签名过程</strong>：发送方用 Hash 算法对消息生成摘要，再用<strong>私钥</strong>加密摘要 = 签名。接收方用<strong>公钥</strong>解密签名得到摘要，再独立计算消息的 Hash，两者比对一致则验证通过。</div></div>
          <div class="step-item"><div><strong>数字签名的作用</strong>：身份认证（确认发送方）+ 数据完整性（检测篡改）+ 不可否认（发送方不能抵赖）</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">数字证书与 CA 体系</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          数字证书是公钥的"身份证"，由权威机构 <strong>CA（证书颁发机构）</strong> 签发。X.509 标准定义了证书格式，包含：证书版本、序列号、签名算法、颁发者、有效期、持有者信息、持有者公钥、CA 签名。
        </p>
        <div class="formula-block">
          证书信任链：$\\text{根 CA} \\rightarrow \\text{中间 CA} \\rightarrow \\text{终端实体证书}$<br>
          验证过程：逐级验证 CA 签名，直到根 CA（浏览器/OS 内置信任的根证书）
        </div>

        <h4 class="font-medium mt-6 mb-2">TLS/SSL 握手过程</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>Client Hello</strong>：客户端发送支持的 TLS 版本、加密套件列表、随机数 $R_c$</div></div>
          <div class="step-item"><div><strong>Server Hello + Certificate</strong>：服务器选定加密套件，发送证书和随机数 $R_s$</div></div>
          <div class="step-item"><div><strong>密钥交换</strong>：客户端验证证书，生成预主密钥（Pre-Master Secret），用服务器公钥加密发送</div></div>
          <div class="step-item"><div><strong>生成会话密钥</strong>：双方用 $R_c + R_s + PMS$ 计算出相同的对称会话密钥（Master Secret），后续通信使用对称加密</div></div>
        </div>

        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>混合加密思想</strong>：TLS 巧妙结合了两种加密——用非对称加密安全交换对称密钥（慢但安全），再用对称密钥加密实际数据（快）。这是工程实践中最常见的加密架构。</div>
        </div>

        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>中间人攻击（MITM）</strong>：攻击者截获通信双方的公钥并替换为自己的，从而解密和篡改消息。防御手段是使用数字证书验证公钥真实性——这正是 CA 体系存在的意义。</div>
        </div>

        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：HTTPS = HTTP + TLS，工作在 <a href="javascript:void(0)" onclick="App.loadDetail('net-05')">应用层 HTTP</a> 和 <a href="javascript:void(0)" onclick="App.loadDetail('net-04')">传输层 TCP</a> 之间。物联网设备（<a href="javascript:void(0)" onclick="App.loadDetail('net-07')">net-07</a>）使用轻量级加密（如 AES-128-CCM）保护 MQTT 通信。</div>
        </div>
      ` },

      // ==================== net-07 ====================
      { id: 'net-07', title: '无线与物联网网络', desc: 'WiFi/ZigBee/LoRa/NB-IoT、MQTT 协议', icon: '📶', tags: ['工程应用'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">无线与物联网网络：万物互联的通信基础</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          物联网（IoT）将传感器、嵌入式设备和云计算连接在一起，构成"感知层—网络层—应用层"的三层架构。无线通信技术是 IoT 的"神经纤维"——从短距离的 WiFi/蓝牙/ZigBee，到长距离的 LoRa/NB-IoT，不同技术适用于不同场景。MQTT 是物联网最常用的消息协议。
        </p>

        <h4 class="font-medium mt-6 mb-2">无线通信技术对比</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>技术</th><th>频段</th><th>速率</th><th>距离</th><th>功耗</th><th>典型应用</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">WiFi (802.11ac)</td><td>2.4/5 GHz</td><td>~Gbps</td><td>~100m</td><td>高</td><td>家庭/办公 LAN</td></tr>
            <tr><td class="font-medium">BLE 5.0</td><td>2.4 GHz</td><td>~2 Mbps</td><td>~100m</td><td>极低</td><td>穿戴设备、Beacon</td></tr>
            <tr><td class="font-medium">ZigBee (802.15.4)</td><td>2.4 GHz</td><td>250 kbps</td><td>~100m</td><td>低</td><td>智能家居、工业传感</td></tr>
            <tr><td class="font-medium">LoRa</td><td>Sub-GHz</td><td>~50 kbps</td><td>~15 km</td><td>极低</td><td>农业、环境监测</td></tr>
            <tr><td class="font-medium">NB-IoT</td><td>授权频段</td><td>~250 kbps</td><td>~10 km</td><td>极低</td><td>智能抄表、智慧城市</td></tr>
            <tr><td class="font-medium">5G NR</td><td>Sub-6/mmWave</td><td>~20 Gbps</td><td>~数 km</td><td>中</td><td>自动驾驶、远程手术</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">WiFi 802.11 协议族</h4>
        <ul class="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 mb-4">
          <li><strong>802.11n (WiFi 4)</strong>：MIMO 技术，最高速率 600 Mbps，2.4/5 GHz 双频</li>
          <li><strong>802.11ac (WiFi 5)</strong>：MU-MIMO、波束成形，最高速率 6.9 Gbps，仅 5 GHz</li>
          <li><strong>802.11ax (WiFi 6)</strong>：OFDMA、BSS Coloring，高密度接入优化，目标速率 9.6 Gbps</li>
          <li><strong>CSMA/CA</strong>：WiFi 使用带冲突避免的载波侦听（不同于有线的 CSMA/CD），通过 RTS/CTS 和 ACK 实现</li>
        </ul>
        <div class="formula-block">
          WiFi 信道访问：$\\text{DIFS} + \\text{随机退避} + \\text{数据发送} + \\text{SIFS} + \\text{ACK}$<br>
          DIFS > SIFS：优先保证 ACK 不被抢占，提高可靠性
        </div>

        <h4 class="font-medium mt-6 mb-2">LoRa 与 NB-IoT 技术特点</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>LoRa（Long Range）</strong>：扩频调制（CSS），接收灵敏度高达 -148 dBm。非授权频段，私有部署灵活。星型拓扑，网关汇聚数据。适合低速率、长距离、电池供电的场景（10 年电池寿命）。</div></div>
          <div class="step-item"><div><strong>NB-IoT</strong>：基于蜂窝网络的 LPWAN 技术，使用授权频段。运营商部署，覆盖广（利用现有基站）。支持海量连接（5 万/小区），适合智慧城市基础设施（路灯、垃圾桶、烟感）。</div></div>
          <div class="step-item"><div><strong>选型建议</strong>：室内短距选 WiFi/BLE，室内组网选 ZigBee/Matter，户外远距私有选 LoRa，户外远距运营选 NB-IoT。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">MQTT 协议</h4>
        <div class="formula-block">
          MQTT（Message Queuing Telemetry Transport）：<br>
          基于 <strong>发布/订阅</strong> 模型，客户端通过 Broker（代理服务器）交换消息<br>
          主题（Topic）：消息的逻辑通道，支持通配符（$+$ 单层、$\\#$ 多层）<br>
          QoS 等级：0（最多一次）、1（至少一次）、2（恰好一次）
          <div class="text-sm text-gray-500 mt-2">MQTT 运行在 TCP 之上（默认端口 1883），MQTT-SN 可运行在 UDP/ZigBee 上</div>
        </div>
        <div class="step-list">
          <div class="step-item"><div><strong>MQTT 通信流程</strong>：① 客户端 TCP 连接 Broker → ② CONNECT 报文认证 → ③ CONNACK 确认 → ④ SUBSCRIBE 订阅主题 → ⑤ PUBLISH 发布消息 → ⑥ Broker 转发给所有订阅者</div></div>
        </div>

        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>MQTT 选型要点</strong>：QoS 0 适合传感器周期性上报（丢一两条无妨），QoS 1 适合告警消息（不能丢但可重复），QoS 2 适合金融交易（既不能丢也不能重复）。大多数 IoT 场景用 QoS 1 即可。</div>
        </div>

        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>LoRa vs NB-IoT 选型陷阱</strong>：LoRa 的优点是非授权频段、私有部署灵活，但上行速率低且无法利用运营商覆盖。NB-IoT 覆盖广但需支付流量费。工程选型时必须综合考虑部署环境、成本和通信需求。</div>
        </div>

        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：MQTT 基于 <a href="javascript:void(0)" onclick="App.loadDetail('net-05')">应用层 Socket</a> 的 TCP 连接。ZigBee 的物理层采用 IEEE 802.15.4 标准，与 <a href="javascript:void(0)" onclick="App.loadDetail('net-02')">物理层与数据链路层</a> 的 MAC 协议原理一致。LoRa 的扩频技术涉及 <a href="javascript:void(0)" onclick="App.loadDetail('sig-08')">信号与系统·采样定理</a> 中的频谱分析。</div>
        </div>
      ` },

      // ==================== net-08 ====================
      { id: 'net-08', title: '工业网络与 ROS 通信', desc: 'CAN/EtherCAT、ROS2 DDS、实时网络', icon: '🏭', tags: ['工程应用'], goals: { exam: true, eng: true }, content: `
        <h3 class="text-lg font-semibold mb-3">工业网络与 ROS 通信：智能制造的神经网络</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          工业网络要求高实时性（μs 级确定性延迟）、高可靠性（容错冗余）和强同步性（多轴协调）。CAN 总线是汽车和工业控制的事实标准，EtherCAT 是高性能工业以太网的代表。ROS2 采用 DDS 中间件实现分布式机器人通信，是机器人领域的标准框架。
        </p>

        <h4 class="font-medium mt-6 mb-2">CAN 总线</h4>
        <div class="formula-block">
          CAN（Controller Area Network）特点：<br>
          <strong>多主结构</strong>：任何节点都可主动发送，通过<strong>非破坏性仲裁</strong>解决冲突<br>
          <strong>差分信号</strong>：CAN_H 和 CAN_L 两根线，抗共模干扰强（适合车载/工业环境）<br>
          <strong>位速率</strong>：经典 CAN 最高 1 Mbps，CAN FD 最高 8 Mbps（数据段加速）<br>
          <strong>帧类型</strong>：数据帧、远程帧、错误帧、过载帧
          <div class="text-sm text-gray-500 mt-2">仲裁规则：ID 值越小优先级越高（显性电平 0 仲裁获胜）</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">CAN 仲裁与帧格式</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>非破坏性仲裁</strong>：多个节点同时发送时，逐位比较仲裁段 ID。ID 数值小的节点发送显性位（0），覆盖隐性位（1），优先级高的节点继续发送，低优先级节点自动退出。整个过程不破坏高优先级帧。</div></div>
          <div class="step-item"><div><strong>数据帧结构</strong>：帧起始(1bit) → 仲裁段(11/29bit ID) → 控制段(6bit) → 数据段(0~64bit) → CRC段(16bit) → ACK段(2bit) → 帧结束(7bit)</div></div>
          <div class="step-item"><div><strong>CAN FD 升级</strong>：数据段从 8 字节扩展到 64 字节，数据段可切换更高速率，大幅提高带宽利用率。向下兼容经典 CAN。</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">工业网络协议对比</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>协议</th><th>底层</th><th>实时性</th><th>拓扑</th><th>典型应用</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">CAN/CAN FD</td><td>差分总线</td><td>ms 级</td><td>总线型</td><td>汽车、工业控制</td></tr>
            <tr><td class="font-medium">EtherCAT</td><td>以太网</td><td>μs 级</td><td>菊花链/星型</td><td>运动控制、CNC</td></tr>
            <tr><td class="font-medium">PROFINET IRT</td><td>以太网</td><td>μs 级</td><td>星型/环型</td><td>西门子自动化</td></tr>
            <tr><td class="font-medium">Modbus TCP</td><td>以太网</td><td>ms 级</td><td>主从</td><td>PLC、HMI</td></tr>
            <tr><td class="font-medium">EtherNet/IP</td><td>以太网</td><td>ms 级</td><td>星型</td><td>罗克韦尔自动化</td></tr>
          </tbody>
        </table></div>

        <h4 class="font-medium mt-6 mb-2">EtherCAT 原理</h4>
        <div class="formula-block">
          EtherCAT（Ethernet for Control Automation Technology）：<br>
          <strong>"飞速传输"原理</strong>：主站发出的以太网帧在经过每个从站时，从站硬件实时提取/插入数据（$< 1\\mu s$ 延迟），帧回到主站时已完成所有数据交换<br>
          <strong>拓扑</strong>：菊花链（最常用）、星型、树型<br>
          <strong>同步精度</strong>：分布式时钟（DC）同步精度 $< 1\\mu s$<br>
          <strong>带宽利用率</strong>：$> 90\\%$（远高于传统以太网的 5~10%）
          <div class="text-sm text-gray-500 mt-2">单个 EtherCAT 段可管理数千个 I/O 点，刷新周期可达 100 μs</div>
        </div>

        <h4 class="font-medium mt-6 mb-2">ROS2 与 DDS 通信</h4>
        <div class="step-list">
          <div class="step-item"><div><strong>ROS2 架构</strong>：ROS2 去掉了 ROS1 的 master 节点，采用去中心化架构。通信中间件层使用 <strong>DDS（Data Distribution Service）</strong>，由 OMG 标准化。</div></div>
          <div class="step-item"><div><strong>DDS 核心概念</strong>：以数据为中心的发布/订阅（DCPS）模型。Domain（域）隔离不同系统，Topic（主题）分类消息，QoS 策略（可靠性、持久性、Deadline）精细控制通信行为。</div></div>
          <div class="step-item"><div><strong>ROS2 通信类型</strong>：Topic（异步发布/订阅，如传感器数据）、Service（同步请求/响应，如查询状态）、Action（长时任务，如导航目标，支持反馈和取消）</div></div>
          <div class="step-item"><div><strong>QoS 策略</strong>：RELIABLE（可靠，类似 TCP）vs BEST_EFFORT（尽力，类似 UDP）；KEEP_LAST（保留最近 N 条）vs KEEP_ALL（保留全部）；DEADLINE（超时告警）</div></div>
        </div>

        <h4 class="font-medium mt-6 mb-2">实时网络需求分析</h4>
        <div class="overflow-x-auto"><table class="compare-table">
          <thead><tr><th>实时等级</th><th>延迟要求</th><th>典型场景</th><th>适用协议</th></tr></thead>
          <tbody>
            <tr><td class="font-medium">硬实时</td><td>$< 1\\text{ms}$，确定性</td><td>多轴运动控制、安全联锁</td><td>EtherCAT、PROFINET IRT</td></tr>
            <tr><td class="font-medium">软实时</td><td>$< 10\\text{ms}$，统计性</td><td>机器人 SLAM、视觉伺服</td><td>ROS2 DDS (RELIABLE)</td></tr>
            <tr><td class="font-medium">非实时</td><td>$< 100\\text{ms}$</td><td>日志上报、参数配置</td><td>MQTT、HTTP</td></tr>
          </tbody>
        </table></div>

        <div class="info-box tip">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>ROS2 DDS 选型</strong>：Fast DDS（eProsima，默认）适合通用开发；Cyclone DDS（Eclipse）性能优秀；Connext DDS（RTI）工业级支持完善。嵌入式平台（STM32 等）可用 micro-ROS 运行在 FreeRTOS 上。</div>
        </div>

        <div class="info-box warning">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div><strong>CAN 总线常见故障</strong>：总线短路（CAN_H 与 CAN_L 短接）导致所有节点通信中断；终端电阻缺失（120Ω）导致信号反射，误码率升高。调试工具：CAN 分析仪、示波器观察差分波形。</div>
        </div>

        <div class="info-box info">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>跨节互链</strong>：CAN 控制器通过 <a href="javascript:void(0)" onclick="App.loadDetail('emb-06')">嵌入式·通信接口 SPI</a> 与 MCU 通信。ROS2 的 <a href="javascript:void(0)" onclick="App.loadDetail('os-07')">I/O 多路复用</a> 机制用于高效处理多传感器数据流。<a href="javascript:void(0)" onclick="App.loadDetail('net-06')">网络安全</a> 在工业网络中同样重要——ICS/SCADA 系统需要防火墙和加密保护。</div>
        </div>
      ` },

    ],
  },
