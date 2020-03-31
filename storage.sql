-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2020-03-31 18:08:25
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `storage`
--

-- --------------------------------------------------------

--
-- 表的结构 `store`
--

CREATE TABLE IF NOT EXISTS `store` (
  `product_id` int(64) NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `product_type` varchar(256) NOT NULL COMMENT '商品类型',
  `brand` varchar(512) NOT NULL COMMENT '品牌',
  `product_name` varchar(512) NOT NULL COMMENT '商品名称',
  `specs` varchar(512) NOT NULL COMMENT '规格',
  `quantity` int(64) NOT NULL COMMENT '数量',
  `in_price` int(11) NOT NULL COMMENT '进价',
  `out_price` int(11) NOT NULL COMMENT '售价',
  `buyer` varchar(512) NOT NULL COMMENT '客户方',
  `memo` varchar(1024) NOT NULL COMMENT '备注',
  `ctime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '状态 1为正常',
  `record_type` int(11) NOT NULL COMMENT '1为入库，2为出库',
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=59 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
