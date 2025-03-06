# KALI工具

## DNS记录信息

### **host命令**：向DNS服务器查询主机的IP


```Bash
host www.example.com  #正向查询默认情况下，host指令会搜索域名的A记录、AAAA记录和MX记录 

host -a example.com #查询全部DNS记录
```

host指令查询域名信息的DNS服务器即<u><span style="color: #C7D5F6"><mark style="background-color: #C7D5F6">/etc/</mark></span></u><u><span style="color: #C7D5F6"><mark style="background-color: #C7D5F6">resolv.com</mark></span></u>指定的DNS服务器，若想查询其他DNS服务器，可在指令的尾部直接添加DNS服务器


```Bash
host -a example.com  23.23.144.81
```

DNS服务器的域传输机制用于主控DNS服务器和其他服务器（从属DNS服务器/slave）进行DNS数据库同步。若某台DNS服务器会与任意主机进行域传输，就说明这台DNS服务器的配置不正确


```Bash
host -l example.com ns4.isp.com #host指令将会返回该域的NS记录、PTR记录和地址记录

```

dig指令


```Bash
dig dig example.com #默认只返回该域的A记录dig
example.com any #返回全部类型的DNS数据
```

