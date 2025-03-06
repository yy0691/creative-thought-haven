# NAT地址转换

# Network Address Translations

### 网络地址转换

1. ipv4地址严重不够用
2. ip地址分为公网ip和私网ip
公网ip只能在公网上使用
私网ip只能在内网中使用
3. **公网上不允许出现私有ip地址，私网ip可以重复在内网使用**
4. 私有地址范围：
    1. **10.0.0.0/8（10开头的）**
    2. **172.16.0.0/16-172.31.0.0/16**
    3. **192.168.0.0/16**
5. **NAT主要实现公私有ip地址的转换，一般是路由器/防火墙上完成，不建议在三层交换机上配置！**
6. **NAT分类：**
    1. 静态NAT ：NAT地址转换表（手工写） 1对1映射 （静态PAT/端口映射技术）
    2. ~~动态NAT~~ ： 内部地址池 | 外部地址池 动态映射
    3. **PAT** (端口地址转换 Port Address Translations) ：overload复用动态NAT映射
端口复用技术

![](assets/AETdbuemqoMShnx6xKjciuzPnLd.png)


```C++
**//定义内网端口
int f0/0
        ip nat inside
        exit
//定义外网端口
int f0/1
        ip nat outside
        exit

"配置PAT"
//定义内部地址池
acc 1 permit 192.168.0.0 0.0.255.255     //permit匹配
//做PAT动态映射
conf t
        ip nat inside source list 1 int f0/1 overload 

//配置静态端口转换
conf t
        ip nat inside source static tcp 192.168.1.3 80 100.1.1.2 80\

//查看地址转换表
sh ip nat translations**
```

![](assets/XwwDbUltboKqMexFtxGc8N8sn6b.png)

![](assets/HiRjbme5loOS7exrLfDck4o6nhe.png)

* 
