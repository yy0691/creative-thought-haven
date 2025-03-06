# 单臂路由与ICMP协议 

# 单臂路由与ICMP协议

1. VLAN控制广播域
2. 不同VLAN间无法通信
3. 路由器一旦启用子接口，父接口不能再使用


```C++
c**onf t
int f0/0.1  //为f0/0接口创建一个子接口
        encapsulation dot1q 10   //识别10 标签
        ip add 10.1.1.254 255.255.255.0
        exit
int f0/0.2
        encapsulation dot1q 20   
        ip add 20.1.1.254 255.255.255.0
        no shut 
        exit**
```

1. 路由器只转发单播通信
2. **不同VLAN间通信是靠路由来实现的**

![](assets/FVXpbt6lwoTAdfxIuSIc9pzunUb.png)

### 在三层路由器上部署DHCP服务器


```C++
vtp domain

**conf t
        ip dhcp excluded-address 10.1.1.1 10.1.1.99  //地址排除
        ip dhcp pool v10              //进入DHCP地址池配置模式
                network 10.1.1.0 255.255.255.0
                default-router 10.1.1.254   //默认网关
                dns-server 40.1.1.1 
                lease 1 0 0     //租期
                exit**
```

![](assets/B9PebFazLoCT2yx5o8Rc19donXg.png)

### 在服务器上部署DHCP服务器


```C++
**1. 在DHCP中添加地址池
2. 利用DHCP中继接收广播：在路由器对应的子接口配DHCP中继命令
                int f0/0.1
                        ip helper-address 40.1.1.1**
```

![](assets/TZFMbaPeCoLvMmxZQHkcsYbYnWg.png)

🙌🏻 **单臂路由缺点： 1. 网络瓶颈 2. 容易发生单点物理故障（所有的子接口依赖于总物理接口） 3. VLAN间通信的每一个帧都进行单独路由**

# ICMP协议

**ICMP协议**

1. 端口号：没有端口号
2. 干什么的：网络探测与回馈机制
    1. 网络探测
    2. 路由跟踪 windows：tracert IP地址 linux或路由：traceroute IP地址
    3. 错误反馈
3. **封装格式**

![](assets/LWAIb4XYJoh7rvxQ4Rdc7rPXnEg.png)

1. ping的时候，会生成icpm探测报文
2. 练习
    1. 练习跟踪
    2. 抓ICMP报文，验证8和0
    3. 继续做单臂路由＋DHCP实验
