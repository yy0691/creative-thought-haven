# SQL注入 

# SQL注入

SQL injection

1. 如何判断SQL注入漏洞

![](assets/HNVvbZmM2osFUyxfui2cdfshnDs.png)

1. 怎样利用SQL注入漏洞

![](assets/FsAwbPQU4oUhyFxdtUVcKFQ8nsb.png)

![](assets/Gh1abcBlioUpywx7TwccpPkfnLc.png)

![](assets/G6Knbws80oNNAEx3VpdcjTKxnzc.png)

![](assets/B775b7xKYoyjcLxAA7NcSfPRnJg.png)

# SQLmap

1. 检测是否有漏洞


```JavaScript
sqlmap -u "URL" 
```

security=impossible; PHPSESSID=sbmbg6qst9nunuffb90a94shr1

![](assets/QkKHbyOo7ofbf2xGIWQcNmn1nzd.png)

1. 获取数据库名

![](assets/CVBeb88FJotIljxn3oFczt6PnOo.png)

**-dbs ： database server 获取所有数据库名**

1. 获取指定数据库表

![](assets/TavnbiSC7oUEuzxX2Cect3IsnZZ.png)

-D ： Database 指定获取的数据库名为dvwa

-T ：table 指定获取想要获取的表名为users

—columns ：指定想要获取的列

—dump：读取数据

# SQL Injection 防御

过滤用户输入内容，特殊符号输入为空

![](assets/EB7yb2KbwoPDM8xWthLcU1N5nWd.png)

![](assets/HiszbG4eqoQsvfxgJo0cOE3anog.png)

![](assets/OOWBbg7pfoQ98wxnnYnceTNpn5f.png)

![](assets/Lyk0b61EYo3anwxCNu5cQyq8nab.png)

![](assets/Mw0TbB44XoUGa6xy1P7cYHE6nDg.png)

impossible的三次整型验证加PDO预处理，完全解决了SQL注入隐患，其他后端语言也可实现相应算法

