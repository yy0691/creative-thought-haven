# FUJIA

#Kali使用

## 只有域名信息

1. 
2.  host指令查询域名信息的DNS服务器即/etc/resolv.com指定的DNS服务器，若想查询其他DNS服务器，可在指令的尾部直接添加DNS服务器 host 23.23.144.81 #逆向查询host 程序还可以进行DNS域传输（域传输的结果包含某一域里的主机名称） 





1.   使用dig指令进行域传输时，必须设置DNS服务器为权威DNS，并且设置传输类型为axfr dig @ns4.isp.com example.com axfr
2.  dnssenum 能收集的信息： 

*  主机的IP地址；该域的DNS服务器；该域的MX记录 
*  还可通过谷歌搜索其他的域名和子域名 
*  可使用字典文件对子域名进行暴力破解 
*  可对C类网段进行whois查询并计算其网络范围 
*  可对网段进行反向查询 
*  采用多线程技术，可进行并发查询 

dnsenum //启动dnsenumdnsenum example.com //收集目标域的DNS信息默认情况下，dnsenum会返回主机地址、名称解析器和邮件服务器的IP地址信息 若不能进行域传输，可使用字典文件对子域名暴力破解。 dnsenum -f dns.txt example.com //使用dns.txt暴力破解example.com的子域名dnsenum -p 页数 -s 数量 --threads example.com //可通过Google搜索某域的子域名  

1.  dnsdict6 —— 枚举ipv6的子域名 dnsdict6 //helpdnsdict6 example.com //默认使用内置的字体文件和8个线程dnsdict6 -d example.com //收集该域的DNS和NS信息
2.  fierce —— 查找目标的IP地址和主机名 

* 利用暴力破解子域名
* 使用字典文件暴力破解使，会调用目标域的DNS服务器逐条尝试字典里的DNS条目
* 能够针对不连续的IP空间和主机名称进行测试

fierce -hfierce -dns example.com -threads 3  

1.  DMitry —— 多功能信息收集工具 收集信息的主要方式： 

*  根据IP地址（或域名）来查询目标主机的whois信息 
*  在Netcraft.com的网站上挖掘主机信息 
*  查找目标域中用的子域 
*  查找目标域的电子邮件地址 
*  探测目标主机上打开的端口、被屏蔽的端口和被关闭的端口 dmity //启动dmity -iwnse targethostdmity -p targethost -f -b //进行简单的端口扫描

1.  Maltego —— 开源的情报收集程序和法证调查程序 从公开资料里收集信息，收集信息之后可以标注各种信息之间的关联；能以图形化的方式显示数据之间的关联；可收集以下信息： 

* 域名
* DNS名
* whois信息
* 网段
* IP地址

还可以用来收集与人有关的信息，例如：   

* 某人所在公司或所在组织
* 与某人有关的E-mail地址
* 与某人有关的网站
* 与某人有关的社交网络
* 与某人有关的电话号码

存在使用限制： ● 不可用于商业用途； ● 每次转换（transform）最多返回转换结果中的12 项； ● 用户需要先在官方网站上注册，才能使用客户端程序； ● API key有效期仅为数天； ● 它与社区版的其他用户共享一台性能并不出色的服务器； ● 客户端和服务器端的通信是不加密的； ● 只能升级到主要发行版； ● 没有客户支持； ● 服务器端的转换功能不会更新。 maltego //进入  

## 路由信息

1.  tcptraceroute —— traceroute程序的补充工具 传统的traceroute程序在其发送的UDP或ICMP echo数据包里设置有特定的TTL标志位，TTL的值从1递增，直到数据包到达目标主机； tcptraceroute使用TCP数据包进行测试，利用TCP SYN（握手请求）数据包进行路由信息探测 优点：通过率高，若防火墙禁止traceroute数据通过，则traceroute指令失效；但只要防火墙允许目标主机的特定TCP端口，就可以使用tcptraceroute程序穿过防火墙到目标主机 使用tcptraceroute时，若相应的目标端口是开放的，程序将会收到SYN/ACK数据包，若目标端口是关闭的，则会收到一个RST数据包 tcptraceroute //提示使用方法tcptraceroute www.example.com
2.  tctrace —— 通过向目标主机发送TCP SYN数据包来获取信息 tctrace -i <device> -d <targethost> //使用tctrace程序<device> 网卡接口tctrace -i eth0 -d www.example.com //获取本机和目标主机之间的路由信息

## 搜索引擎

1.  theharvester —— 通过数个公共资源收集电子邮件账号、用户名和主机名/子域名信息 用到的公开资源 

* 谷歌
* 必应
* PGP
* Linkedin
* Yandex
* People123
* Jigsaw
* Shodan

theharcester //use-methodestheharvester -d example.com -l 100 -b goole //从谷歌的前100项搜索里挖掘目标域里的电子邮件地址和主机名收集用户名等信息可以指定使用linkedin.com   

1.  Metagoofil —— 通过谷歌引擎搜索目标域的文件的元数据信息 支持的格式有： 

* word文档（.docx  .doc）
* 表格文件（.xlsx  .xls  .ods）
* 演示文档（.pptx  .ppt  .odp）
* PDF文件（.pdf）

获取元数据信息时，Metagoofil的内部操作过程如下：   

* 使用Google引擎在目标域内搜索指定的文件类型
* 把搜索到的文档保存到本地磁盘
* 从下载的文件中解析元数据信息
* 把元数据信息的分析结果保存为HTML文件

元数据中的信息：   

* 用户名
* 软件版本
* 服务器名或机器名

metagoofil //use-methodesmetagoofil -d example.com -l 20 -t doc,pdf -n -o test  



# 目标识别



## 目标识别过程

1. 在目标网络里搜索在线的主机，若某台主机不在线，无法对其渗透测试；需要另找一台在线的主机
2. 鉴定目标机器上安装的操作系统

Tools: Information Gathering

* Identify Live Hosts（识别在线主机）
* OS Fingerprinting （识别操作系统）



## 识别目标主机

隐匿测试；非隐匿测试

1. ping —— 向目标主机发送ICMP的echo request数据包

若目标主机在线且允许受理ping请求，则目标主机将回复ICMP echo reply数据包

|**选项** |**全称** |**指令** |
|---|---|---|
|-c |count |发送echo request 数据包的总量 |
|-I |interface address |设置源地址或网络接口（若ping IPv6链路本地地址，必须指定该项） |
|-s |packet size |每个数据包的包大小（字节数），默认值是56，再加上IPv4中8字节的ICMP包头，默认情况下发送的数据包会是64字节的数据包 |
ping6 —— 若目标主机使用的是IPv6地址

ping6 -c 1 fe80::a00:27ff:fe43:1518 -I eth0 //需要指定-I选项，指定发送本地数据报的本地连接

1.  arping —— 在局域网中使用ARP请求判断目标主机是否在线 IP地址或MAC地址 arping //usagearping 192.168.1.101 -c 1 //判断主机是否在线arping -d -i eth0 192.168.1.101 -c 2echo $? //判断主机是否被占用 若返回值是1，说明已被占用 
2.  fping —— 可以同时向多个主机发送ping（ICMP echo）请求 可以在命令行中指定多个目标主机，也可以在某个文件里指定需要被检测的主机。 默认模式下，fping程序向每个主机发送三次ICMP echo数据包，通过目标主机的回复来判断该主机是否在线；     

|**目标主机状态** |**标记** |
|---|---|
|发送回应 |alive（在线） |
|在一段时间内没有进行相应（或超过次数） |unreachable（不可访问） |
fping -hfping 192.168.1.1 192.168.1.100 192.168.1.107 //同时检测三台主机fping -g 192.168.56.0/24 //-g生成列表，对整个网段检测代码可能有误 fping -r 1 -g 192.168.1.1 192.168.1.10 //改变探测目标主机的重试次数fping -s www.yahoo.com www.google.com www.msn.com //-s打印累积统计，查看多个目标统计结果

1.  hping3 —— 命令行下的网络数据包生成和分析工具 在TCP/IP测试和安全测试（例如端口扫描、防火墙规则测试、网络性能测试）里，可以使用这个程序生成自定义的网络数据包，进行相应测试；主要用途： 

* 测试防火墙规则
* 测试入侵检测系统/IDS
* 测试TCP/IP模式的安全漏洞

在不指定任何参数的情况下，直接运行hping3将向TCP的0号端口发送空数据；如需改变通信协议，可参照下表：   

|**选项缩写** |**选项全称** |**描   述** |
|---|---|---|
|-0 |--raw-ip |发送原始IP包 |
|-1 |--icmp |发送ICMP包 |
|-2 |--udp |发送UDP包 |
|-8 |--scan |进入扫描模式 |
|-9 |--listen |进入监听模式 |
在发送TCP数据包时，可以不设置任何TCP标识（默认），如需设置，参考下表   



