# MONITORING

-> Mục đích là giám sát hoạt động của các server khi quá nhiều.

# ZABBIX
- Cách cài đặt:
    - Zabbix backend + frontend và database.
 => Tạo ra máy ảo mới:

| dev | git | jenkins | zabbix |
| ----- | ----- | ----- | ----- |
| 101 | 102 | 103 | 104 |


![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/KVr6zZZJCIksme3q4MBMJ.png?ixlib=js-3.7.0 "image.png")

=> Cách cài: [﻿www.zabbix.com/download?zabbix=6.4&os_distribution=ubuntu&os_version=20.04&components=server_frontend_agent&db=mysql&ws=apache](https://www.zabbix.com/download?zabbix=6.4&os_distribution=ubuntu&os_version=20.04&components=server_frontend_agent&db=mysql&ws=apache) 

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/D8WY3Mvrflpof4ILVsC6S.png?ixlib=js-3.7.0 "image.png")

```
wget https://repo.zabbix.com/zabbix/6.4/ubuntu/pool/main/z/zabbix-release/zabbix-release_latest_6.4+ubuntu20.04_all.deb
```
![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/mdval_e-ID6tqcTB86RWb.png?ixlib=js-3.7.0 "image.png")

```
root@zabbix-server:~# dpkg -i zabbix-release_latest_6.4+ubuntu20.04_all.deb
Selecting previously unselected package zabbix-release.
(Reading database ... 72250 files and directories currently installed.)
Preparing to unpack zabbix-release_latest_6.4+ubuntu20.04_all.deb ...
Unpacking zabbix-release (1:6.4-1+ubuntu20.04) ...
Setting up zabbix-release (1:6.4-1+ubuntu20.04) ...
root@zabbix-server:~#
```
```
apt install zabbix-server-mysql zabbix-frontend-php zabbix-apache-conf zabbix-sql-scripts zabbix-agent
```
=> TÓM GỌN:

# 1. CÁCH CÀI:
```
wget https://repo.zabbix.com/zabbix/6.4/ubuntu/pool/main/z/zabbix-release/zabbix-release_latest_6.4+ubuntu20.04_all.deb
dpkg -i zabbix-release_latest_6.4+ubuntu20.04_all.deb
apt update
apt install zabbix-server-mysql zabbix-frontend-php zabbix-apache-conf zabbix-sql-scripts zabbix-agent
```
- 1. Tiếp theo: Tạo 1 database.
```
apt install software-properties-common -y
```


![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/zOoIz-ifw-ukkkrfPXvjx.png?ixlib=js-3.7.0 "image.png")





```
CHÚ Ý vmware còn vps thì không sao: sudo nano /etc/apt/sources.list vào # lại
```
![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/pugxqv-YPmXH3mlPVD8Lb.png?ixlib=js-3.7.0 "image.png")



- Tiếp theo:
```
root@zabbix-server:~# mysql -u root
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 31
Server version: 10.6.20-MariaDB-ubu2004 mariadb.org binary distribution

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> create database zabbix character set utf8mb4 collate utf8mb4_bin;
Query OK, 1 row affected (0.000 sec)

MariaDB [(none)]> create user zabbix@localhost identified by 'password';
Query OK, 0 rows affected (0.001 sec)

MariaDB [(none)]> grant all privileges on zabbix.* to zabbix@localhost;
Query OK, 0 rows affected (0.001 sec)

MariaDB [(none)]> set global log_bin_trust_function_creators = 1;
Query OK, 0 rows affected (0.000 sec)

MariaDB [(none)]> quit;
Bye
root@zabbix-server:~#
```
==> Tiếp:

```
zcat /usr/share/zabbix-sql-scripts/mysql/server.sql.gz | mysql --default-character-set=utf8mb4 -uzabbix -p zabbix
```
=> Sau đó làm theo:

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/55afFFsrglpT57KoEY8dV.png?ixlib=js-3.7.0 "image.png")

=> Tiếp theo chỉnh pass:

```
vi /etc/zabbix/zabbix_server.conf
```
![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/-y8MRS9H4G4eSNC8e7CZI.png?ixlib=js-3.7.0 "image.png")



![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/FQkOG1frMDyjRQIC5_ocF.png?ixlib=js-3.7.0 "image.png")



![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/9fFwFUqU_i7g5AFs7Q9nE.png?ixlib=js-3.7.0 "image.png")

=> Tiếp theo:

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/_zM8Y7a8UWtvcsTUwBEnv.png?ixlib=js-3.7.0 "image.png")

==> Sau đó kiểm tra: 

```
root@zabbix-server:~# vi /etc/hosts
```
![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/JIF23RujoXuRARJmO4Qcn.png?ixlib=js-3.7.0 "image.png")



![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/pPWP7XyqrsKorVjd8ob3b.png?ixlib=js-3.7.0 "image.png")

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/3z0nRZQsLVf-GTqyTtx0l.png?ixlib=js-3.7.0 "image.png")



![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/P-Y-ZS55SJn11P2LkT-m7.png?ixlib=js-3.7.0 "image.png")

=> Sau đó app hosts

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/ZZRsIhWNzvEIN4JUd3kT-.png?ixlib=js-3.7.0 "image.png")

=> Sau đó:

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/LEfW63qyblmtfVtVS_h0y.png?ixlib=js-3.7.0 "image.png")

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/7CpxOTEa49tHVTBX2PLdE.png?ixlib=js-3.7.0 "image.png")



```
=> Giờ là chỉnh cái này: [﻿zabbix.badu.tech/zabbix/setup.php](http://zabbix.badu.tech/zabbix/setup.php) 
muốn vào web: mà target thẳng k cần phải /zabbix thì chỉnh apache
```
```
root@zabbix-server:~# vi /etc/apache2/sites-available/000-default.conf
```
![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/gDpZnMCtHcvrtBB8l3PrQ.png?ixlib=js-3.7.0 "image.png")



```
root@zabbix-server:~# systemctl restart apache2
```
=> oce: khi vào web thì được đẩy thẳng đến web chính.

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/mxVHNWl5uYJAeVMcn0MHW.png?ixlib=js-3.7.0 "image.png")

- next
- next
- next:
![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/JxKydvDQLwkRImJWPw3KU.png?ixlib=js-3.7.0 "image.png")

- next: zabbix.elroydevops.tech
![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/fd42ax36oVKyRqV5-EQcV.png?ixlib=js-3.7.0 "image.png")

- next next
=> mặc định:: Admin +  zabbix

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/VPV1QeZgv09O3O93Ej2MX.png?ixlib=js-3.7.0 "image.png")

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/_aiQOSqhu03Vk19sKbknX.png?ixlib=js-3.7.0 "image.png")



![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/68_xGDPjBIlj9NQcCH5im.png?ixlib=js-3.7.0 "image.png")

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/qTNUarimFEB6mOSHpwwYm.png?ixlib=js-3.7.0 "image.png")



==> Ồ dễ hiểu là: zabix có zabix agent bây h muốn motoring cái nào thì cái zabix agent cái đó.

- dev-server:
```
root@dev-server:~# mkdir /tools/zabbix
root@dev-server:~# cd /tools/zabbix
root@dev-server:/tools/zabbix#
```
=> Lặp lại: [﻿www.zabbix.com/download?zabbix=6.4&os_distribution=ubuntu&os_version=20.04&components=server_frontend_agent&db=mysql&ws=apache](https://www.zabbix.com/download?zabbix=6.4&os_distribution=ubuntu&os_version=20.04&components=server_frontend_agent&db=mysql&ws=apache)  hoặc ở trên

Tóm tắt:

```
# wget https://repo.zabbix.com/zabbix/6.4/ubuntu/pool/main/z/zabbix-release/zabbix-release_latest_6.4+ubuntu20.04_all.deb
# dpkg -i zabbix-release_latest_6.4+ubuntu20.04_all.deb
# apt update
apt install zabbix-agent
```
=> Config:

```
root@dev-server:/tools/zabbix# vi /etc/zabbix/zabbix_agentd.
zabbix_agentd.conf  zabbix_agentd.d/
root@dev-server:/tools/zabbix# vi /etc/zabbix/zabbix_agentd.conf
```
![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/mOwJ2CrehLpVeFW0uWkjq.png?ixlib=js-3.7.0 "image.png")



![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/hz7yvAI9PE5fOdriY2nKq.png?ixlib=js-3.7.0 "image.png")

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/d3IDRu10yUZ_czi2XAIgV.png?ixlib=js-3.7.0 "image.png")



dev-server_192.168.88.101 

=> 

```
root@dev-server:/tools/zabbix# systemctl restart zabbix-agent
```
=> Quay lại: create host

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/F77euHjMNxkc2E_qgOStt.png?ixlib=js-3.7.0 "image.png")

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/vMdfweisRJEFxsPuqy8Xt.png?ixlib=js-3.7.0 "image.png")



![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/pKUsdwXEbjnAWSyJkxm0q.png?ixlib=js-3.7.0 "image.png")

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/-eH9b6_glpfnI_Jvk15yJ.png?ixlib=js-3.7.0 "image.png")



![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/ZXjPhMPPsog2zMD42LrbI.png?ixlib=js-3.7.0 "image.png")

+adđ.

 

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/7PjywnmFpa1ozlXHlnpw8.png?ixlib=js-3.7.0 "image.png")

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/hlQV3Rzmwl0aZ9GjFkViZ.png?ixlib=js-3.7.0 "image.png")



![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/WCeJyQ2Cc75OdcsFA7wKe.png?ixlib=js-3.7.0 "image.png")

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/Qjfh2YugadSMksQq43PjQ.png?ixlib=js-3.7.0 "image.png")



![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/eE4wSUlKZUZ6ilGkjhgCB.png?ixlib=js-3.7.0 "image.png")

#  2. Sử dụng item và trigger trong Zabbix
cách check xem server chết thì phải thông báo

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/CUZNxBGFRDRHCC6kzcbs7.png?ixlib=js-3.7.0 "image.png")

=> click create item ở góc trên phải

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/8-8anmRkMCfR4GvKf50uT.png?ixlib=js-3.7.0 "image.png")

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/h6CRt9pFdG9ttwAvirtbN.png?ixlib=js-3.7.0 "image.png")

tesst web on thif sẽ ra 1 còn web chết thì = 0

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/35BjoimhqJ80GVZbnps6d.png?ixlib=js-3.7.0 "image.png")

=> Giờ triggers

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/pmGntVGrLRknOeqAozTw0.png?ixlib=js-3.7.0 "image.png")

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/wUcTQlbhlgMVoG1m9HkfU.png?ixlib=js-3.7.0 "image.png")



![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/bEZJxPZv6WppPfrGmp1Q1.png?ixlib=js-3.7.0 "image.png")

+ add:

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/2qk-lnKyvfSGWZY6Q32QL.png?ixlib=js-3.7.0 "image.png")

=> tắt server để test

 

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/Zzy-uep2gB49m_OAJ47CW.png?ixlib=js-3.7.0 "image.png")

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/WYxLFgU9Cj99NtvX6JAW3.png?ixlib=js-3.7.0 "image.png")



=> Chạy là k lỗi:

![image.png](https://eraser.imgix.net/workspaces/MoiXnETLQ9Yzmxh5su9O/CNuettIBX9RQxMRH9XPQjqaKVj02/8hoJWU4tf-DH-YofNVVLS.png?ixlib=js-3.7.0 "image.png")

 cơ mà zabbix này cùi quá

