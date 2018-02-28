
DROP DATABASE IF EXISTS web;

DROP TABLE IF EXISTS address;

DROP TABLE IF EXISTS brand;

DROP TABLE IF EXISTS collection;

DROP TABLE IF EXISTS dictionary;

DROP TABLE IF EXISTS fashion;

DROP TABLE IF EXISTS goods;

DROP TABLE IF EXISTS goods_order;

DROP TABLE IF EXISTS online_wear;

DROP TABLE IF EXISTS order1;

DROP TABLE IF EXISTS review;

DROP TABLE IF EXISTS shopping_cart;

DROP TABLE IF EXISTS star;

DROP TABLE IF EXISTS company;

DROP TABLE IF EXISTS USER;

CREATE DATABASE web;

USE web;

/*==============================================================*/
/* Table: address 用户收货地址                                    */
/*==============================================================*/
CREATE TABLE address
(
   a_id                 INT NOT NULL AUTO_INCREMENT,  -- 自增id
   a_u_id               INT,	-- 用户id
   a_receiver           VARCHAR(20),	-- 收货人
   a_phone              CHAR(11),	-- 电话号码	
   a_province           VARCHAR(100),	-- 省
   a_city               VARCHAR(100),	-- 市
   a_region             VARCHAR(100),	-- 地区/县
   a_details            VARCHAR(100),	-- 详细地址
   create_time          DATETIME,	-- 创建时间
   state                INT,		-- 状态 0:‘禁用’ 1：‘启用’
   PRIMARY KEY (a_id)
);

/*==============================================================*/
/* Table: brand 品牌信息表                                     */
/*==============================================================*/
CREATE TABLE brand
(
   b_id                 INT NOT NULL AUTO_INCREMENT,	-- 自增id
   c_id                 INT,	-- 品牌公司表id
   b_name               VARCHAR(50),	-- 品牌名
   b_img                VARCHAR(100),	-- 品牌图片
   b_describe           VARCHAR(500),	-- 品牌描述
   b_production         VARCHAR(50),	-- 品牌简介
   b_logo               VARCHAR(100),	-- 品牌LOGO	
   b_feature            VARCHAR(500),	-- 产品特点
   create_time          DATETIME,	-- 创建时间
   state                INT,		-- 状态0:‘禁用’ 1：‘启用’
   PRIMARY KEY (b_id)
);

/*==============================================================*/
/* Table: company  品牌公司表                                     */
/*==============================================================*/
CREATE TABLE company
(
   c_id                 INT NOT NULL AUTO_INCREMENT,	-- 自增id
   c_name               VARCHAR(50),	-- 公司名称
   c_address            VARCHAR(200),	-- 公司地址
   c_contacts           VARCHAR(50),	-- 公司联系人
   c_contactsTel        CHAR(11),	-- 联系人电话
   c_tel                VARCHAR(20),	-- 公司电话
   c_email              VARCHAR(50),	-- 公司邮箱
   create_time          DATETIME,	-- 创建时间
   state                INT,		-- 状态0:‘禁用’ 1：‘启用’
   PRIMARY KEY (c_id)
);

/*==============================================================*/
/* Table: collection  商品收藏表                               */
/*==============================================================*/
CREATE TABLE collection
(
   c_id                 INT NOT NULL AUTO_INCREMENT,	-- 自增id
   use_u_id             INT,		-- 用户id
   goo_g_id             INT,		-- 商品id
   create_time          DATETIME,	-- 创建时间
   state                INT,		-- 状态 0:‘禁用（删除状态）’1：‘启用’
   PRIMARY KEY (c_id)
);

/*==============================================================*/
/* Table: dictionary  字典表                                    */
/*==============================================================*/
CREATE TABLE dictionary
(
   dict_id              INT NOT NULL AUTO_INCREMENT,	-- 自增id
   dict_value           VARCHAR(50),	-- 字典值( 如：商品类型、游戏类型、支付类型)
   dictdata_name        VARCHAR(50),	-- 字典数据 键名
   dictdata_value       VARCHAR(50),	-- 字典数值 value值
   create_time          DATETIME,	-- 创建时间
   state                INT,		-- 状态0:‘禁用’1：‘启用’
   PRIMARY KEY (dict_id)
);

/*==============================================================*/
/* Table: fashion  时尚街拍表                                   */
/*==============================================================*/
CREATE TABLE fashion
(
   f_id           INT NOT NULL AUTO_INCREMENT,	-- 自增id
   f_img             VARCHAR(200),		-- 街拍图片地址 
   f_title                 VARCHAR(50),		-- 街拍标题	
   f_decribe            VARCHAR(200),		-- 街拍描述
   p_index              INT,			-- 是否显示在首页0:‘否’ 1：‘是’
   create_time          DATETIME,		-- 创建时间
   state                INT,			-- 状态0:‘禁用’1：‘启用’
   PRIMARY KEY (f_id)
);

/*==============================================================*/
/* Table: goods  商品信息表                                    */
/*==============================================================*/
CREATE TABLE goods
(
   g_id                 INT NOT NULL AUTO_INCREMENT,	-- 自增id
   b_id                 INT,		-- 品牌ID
   g_name               VARCHAR(50),	-- 商品名称
   g_sex                INT,		-- 男款/女款0：‘女’1：‘男’
   g_bid                FLOAT,		-- 进价
   g_saleprice          FLOAT,		-- 卖价
   g_promotion          FLOAT,		-- 促销价
   g_costprice          FLOAT,		-- 成本价
   g_weight             INT,		-- 商品重量
   g_outerWidth         INT,		-- 镜架外宽
   g_width              INT,		-- 镜架宽
   g_length             INT,		-- 镜腿长
   g_innerWidth         INT,		-- 镜架内宽
   g_underline          INT,		-- 是否线下试戴0：‘否’1：‘是’
   g_stock              INT,		-- 库存数量
   g_type               INT,		-- 类型0：‘太阳镜’ 1：‘镜框’
   g_color		INT,		-- 商品颜色(数据存放的是字典表的id)
   g_style		INT,		-- 商品风格(数据存放的是字典表的id)
   g_material		INT,		-- 商品材质(数据存放的是字典表的id)
   create_time          DATETIME,	-- 创建时间	
   state                INT,		-- 状态0:‘禁用’ 1：‘启用’
   PRIMARY KEY (g_id)
);

/*==============================================================*/
/* Table: goods_order 订单商品表                                */
/*==============================================================*/
CREATE TABLE goods_order
(
   go_id                INT NOT NULL AUTO_INCREMENT,	-- 自增id
   ord_o_id             INT,		-- 订单表id
   goo_g_id             INT,		-- 商品id
   go_count             INT,		-- 商品数量
   go_return            INT,		-- 退货信息0:‘未申请’1：‘申请中’2：‘申请成功’3：‘申请失败’
   go_problem           VARCHAR(20),	-- 问题描述
   go_img               VARCHAR(100),	-- 图片地址
   create_time          DATETIME,	-- 创建时间
   state                INT,		-- 状态0:‘禁用’ 1：‘启用’
   PRIMARY KEY (go_id)
);

/*==============================================================*/
/* Table: online_wear   模特/用户试戴信息表                       */
/*==============================================================*/
CREATE TABLE online_wear
(
   online_id            INT NOT NULL AUTO_INCREMENT,	-- 自增id
   g_id                 INT,		-- 商品ID
   online_name          VARCHAR(100),	-- 原图
   online_img           VARCHAR(100),	-- 试戴效果
   create_time          DATETIME,	-- 自增id
   state                INT,		-- 自增id
   PRIMARY KEY (online_id)
);

/*==============================================================*/
/* Table: order1    订单表                                       */
/*==============================================================*/
CREATE TABLE order1
(
   o_id                 INT NOT NULL AUTO_INCREMENT,	-- 自增id
   o_u_id               VARCHAR(10),	-- 用户id
   o_a_id               VARCHAR(10),	-- 收货地址id
   o_amount             FLOAT,		-- 订单金额
   o_state              INT,		-- 订单状态1:‘未支付’2：‘已支付’3：‘已完成’ 4：‘已取消’
   o_logistNum          VARCHAR(20),	-- 物流编号
   o_underline          INT,		-- 线上/线下 0:‘线上’ 1：‘线下’
   o_deposit            INT,		-- 是否交押金0:‘否’1：‘是’
   booking_day          VARCHAR(50),	-- 预约星期
   booking_time         VARCHAR(50),	-- 预约时间段
   booking_remark       VARCHAR(200),	-- 留言备注
   create_time          DATETIME,	-- 自增id
   state                INT,		-- 自增id
   PRIMARY KEY (o_id)
);

/*==============================================================*/
/* Table: review    评论表                                     */
/*==============================================================*/
CREATE TABLE review
(
   r_id                 INT NOT NULL AUTO_INCREMENT,	-- 自增id
   u_id                 INT,		-- 用户id
   o_id                 INT,		-- 订单id
   r_content            VARCHAR(200),	-- 评论内容
   r_points             INT,		-- 点赞数
   r_time               DATETIME,	-- 评论时间
   state                INT,		-- 状态0:‘禁用（删除状态）’1：‘启用’
   PRIMARY KEY (r_id)
);

/*==============================================================*/
/* Table: shopping_cart   购物车信息表                           */
/*==============================================================*/
CREATE TABLE shopping_cart
(
   s_id                 INT NOT NULL AUTO_INCREMENT, -- 自增id
   g_id                 INT,		-- 商品ID
   u_id                 INT,		-- 用户id
   s_count              INT,		-- 商品数量
   create_time          DATETIME,	-- 创建时间
   state                INT,		-- 状态0:‘禁用’ 1：‘启用’
   PRIMARY KEY (s_id)
);

/*==============================================================*/
/* Table: star  明星秀场表                                       */
/*==============================================================*/
CREATE TABLE star
(
   star_id              INT NOT NULL AUTO_INCREMENT,	-- 自增id
   b_id                 INT,		-- 品牌id
   star_img             VARCHAR(200),	-- 明星图片地址
   create_time          DATETIME,	-- 创建时间
   state                INT,		-- 状态0:‘禁用’1：‘启用’
   PRIMARY KEY (star_id)
);

/*==============================================================*/
/* Table: user  用户信息表                                       */
/*==============================================================*/
CREATE TABLE USER
(
   u_id                 INT NOT NULL AUTO_INCREMENT,		-- 自增id
   u_name               VARCHAR(50) NOT NULL,	-- 用户名
   u_pwd                VARCHAR(50) NOT NULL,	-- 密码
   u_sex                INT,			-- 性别0：‘女’1：‘男’
   u_birth              DATE,			-- 出生日期
   u_phone              INT,			-- 手机
   u_email              VARCHAR(50),		-- 邮箱
   u_qq                 INT,			-- QQ
   u_img                VARCHAR(100),		-- 头像图片
   u_payPwd             VARCHAR(50),		-- 支付密码
   create_time          DATETIME,		-- 创建时间
   state                INT,			-- 状态0:‘禁用’ 1：‘启用’
   PRIMARY KEY (u_id)
);

