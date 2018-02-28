CREATE DATABASE login;
USE login;

CREATE TABLE loginlist(
roleId INT PRIMARY KEY AUTO_INCREMENT,
roleName NVARCHAR(50),
pwd NVARCHAR(100),
roleNote  NVARCHAR(200)
);

INSERT INTO loginlist VALUES
(NULL,'张三','123','角色备注内容'),
(NULL,'李四','234','角色备注内容'),
(NULL,'王二','345','角色备注内容'),
(NULL,'赵六','567','角色备注内容');

CREATE TABLE rolelist(
roleId INT PRIMARY KEY AUTO_INCREMENT,
roleName NVARCHAR(50),
roleDescribe NVARCHAR(100),
roleNote  NVARCHAR(200)
);

INSERT INTO rolelist VALUES
(NULL,'项目经理','教学课程安排','角色备注内容'),
(NULL,'人事经理','学生管理','角色备注内容'),
(NULL,'管理员','系统管理员','角色备注内容'),
(NULL,'游客','只有访问权限','角色备注内容');