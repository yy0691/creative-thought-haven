# Linux

# 子页面列表

# Linux的启动级别

|命令实例 |作用 |
|---|---|
|文件/etc/inittab |设置默认启动级别 |
|0 |代表halt，关机 |
|1 |代表单用户模式，采用这个设置，系统只能允许一个用户登录 |
|2 |代表多用户模式，但不支持网络工作 |
|3 |代表命令行界面，即文本界面，是企业中服务器通用的启动模式 |
|4 |系统预留 |
|5 |图形界面 |
|6 |重启模式 |
# 常用命令

### 关机命令


```Bash
reboot  //重启
shutdown -r now //现在立即重启
shutdown -r 11:30
shutdown -r +1  //等一分钟后重启
halt   //关机
shutdown -h now
shutdown -h 11：30
init 0
init 6
```


```Bash
top             //查看内存进程使用情况
cd ../或cd..    //切换到上一层目录（相对目录)
cd 目录名       //切换到对应目录（绝对目录，从/根目录开始）
pwd            //查看当前所在目录
du -sh         //查看文件或文件夹大小
fdisk -l       //查看磁盘分区列表
cat 文件名      //查看文本文件内容，如cat/etc/passwd可查看用户信息
cat/proc/meminfo  //查看内存信息
cat/proc/cpuinfo  //查看cpu信息
```



