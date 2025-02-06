-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: localhost    Database: mgldefi
-- ------------------------------------------------------
-- Server version	8.0.27-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `email_verify`
--

DROP TABLE IF EXISTS `email_verify`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_verify` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `verify_code` varchar(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_verify`
--

LOCK TABLES `email_verify` WRITE;
/*!40000 ALTER TABLE `email_verify` DISABLE KEYS */;
INSERT INTO `email_verify` VALUES (1,'1234sdrersa@gmail.com','9387');
/*!40000 ALTER TABLE `email_verify` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ieo`
--

DROP TABLE IF EXISTS `ieo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ieo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token_address` varchar(42) NOT NULL,
  `token_name` varchar(20) NOT NULL,
  `token_symbol` varchar(10) NOT NULL,
  `token_description` varchar(1000) NOT NULL,
  `token_website` varchar(100) NOT NULL,
  `token_fb` varchar(100) NOT NULL,
  `token_pic` varchar(100) NOT NULL,
  `token_decimals` int NOT NULL,
  `total_supply` double NOT NULL,
  `presale_supply` double NOT NULL,
  `presale_price` float NOT NULL,
  `list_price` float NOT NULL,
  `min_buy` double NOT NULL,
  `max_buy` double NOT NULL,
  `start_time` varchar(30) NOT NULL,
  `end_time` varchar(30) NOT NULL,
  `status` varchar(30) NOT NULL,
  `raised_amount` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ieo`
--

LOCK TABLES `ieo` WRITE;
/*!40000 ALTER TABLE `ieo` DISABLE KEYS */;
/*!40000 ALTER TABLE `ieo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manage_user`
--

DROP TABLE IF EXISTS `manage_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manage_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `have_wallet` tinyint(1) NOT NULL,
  `wallet_address` varchar(42) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manage_user`
--

LOCK TABLES `manage_user` WRITE;
/*!40000 ALTER TABLE `manage_user` DISABLE KEYS */;
INSERT INTO `manage_user` VALUES (1,'admin@mglcoin.io',0,'');
/*!40000 ALTER TABLE `manage_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `p2p`
--

DROP TABLE IF EXISTS `p2p`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `p2p` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seller_name` varchar(30) NOT NULL,
  `completed_orders` varchar(1000) NOT NULL,
  `currency` enum('USDT','MGL','BUSD') NOT NULL,
  `amount_usdt` double NOT NULL,
  `amount_mgl` double NOT NULL,
  `amount_busd` double NOT NULL DEFAULT '0',
  `payment_method` varchar(255) NOT NULL,
  `price_usdt` double NOT NULL,
  `price_mgl` double NOT NULL,
  `price_busd` double NOT NULL DEFAULT '0',
  `terms_conditions` varchar(1000) NOT NULL,
  `facebook_link` varchar(100) NOT NULL,
  `telegram_link` varchar(100) NOT NULL,
  `skype_link` varchar(100) NOT NULL,
  `profile_pic` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `p2p`
--

LOCK TABLES `p2p` WRITE;
/*!40000 ALTER TABLE `p2p` DISABLE KEYS */;
INSERT INTO `p2p` VALUES (31,'changetest1','Completed orders','USDT',10,0,0,'Cash,Bank transfer',11,0,0,'ewagewafewa','gea','53215','fewa','https://wallet-asset.matic.network/img/tokens/mgl.svg'),(32,'test1','Completed orders','USDT',10,0,0,'Cash',20,0,0,'ghres','gewa','gewag','ewag','https://wallet-asset.matic.network/img/tokens/mgl.svg');
/*!40000 ALTER TABLE `p2p` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscriber`
--

DROP TABLE IF EXISTS `subscriber`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscriber` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscriber`
--

LOCK TABLES `subscriber` WRITE;
/*!40000 ALTER TABLE `subscriber` DISABLE KEYS */;
/*!40000 ALTER TABLE `subscriber` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `top_tokens`
--

DROP TABLE IF EXISTS `top_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `top_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `symbol` varchar(10) NOT NULL,
  `price` double NOT NULL,
  `daily_percent` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `top_tokens`
--

LOCK TABLES `top_tokens` WRITE;
/*!40000 ALTER TABLE `top_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `top_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `hash` varchar(100) NOT NULL,
  `from_id` text NOT NULL,
  `to_id` text NOT NULL,
  `token` varchar(42) NOT NULL,
  `amount` float NOT NULL,
  `network` varchar(20) NOT NULL,
  `to_admin` tinyint(1) NOT NULL
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `country` varchar(30) NOT NULL,
  `invite_code` int NOT NULL,
  `role` varchar(10) NOT NULL,
  `get_bnb` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin@mglcoin.io','$2a$08$0jDkU2V337gMOONHZgX0OepzgQZLzIYDVv4o64.4nwY2VolH.hip.','Taiwan',0,'Super',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallet`
--

DROP TABLE IF EXISTS `wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `publickey` varchar(42) NOT NULL,
  `privatekey` varchar(64) NOT NULL,
  `keyphrase` text NOT NULL,
  `polygon_tokensymbol` varchar(1000) NOT NULL,
  `polygonmain_assets` text NOT NULL,
  `polygontest_assets` text NOT NULL,
  `network` text NOT NULL,
  `bsc_tokensymbol` varchar(1000) NOT NULL,
  `bscmain_assets` text NOT NULL,
  `bsctest_assets` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallet`
--

LOCK TABLES `wallet` WRITE;
/*!40000 ALTER TABLE `wallet` DISABLE KEYS */;
INSERT INTO `wallet` VALUES (1,2,'0x0ad2bfd0d2e841793d53eb61c4944167d87db0fd','8735233afac663c86930562747f8cfafaf58544f71a250d55403c8149b4b61a7','tuna begin destroy help solve offer what twin chest topic welcome immense','mgl,matic','0xcbAe2a4625c5CB99391D8F1a0F5121B3E5A176bb,0x0000000000000000000000000000000000001010','0xcbAe2a4625c5CB99391D8F1a0F5121B3E5A176bb,0x0000000000000000000000000000000000001010','0,1','mgl,BNB,BUSD','0xcbAe2a4625c5CB99391D8F1a0F5121B3E5A176bb,0x0000000000000000000000000000000000001010,0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56','0xcbAe2a4625c5CB99391D8F1a0F5121B3E5A176bb,0x0000000000000000000000000000000000001010,0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56');
/*!40000 ALTER TABLE `wallet` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-27 12:28:20
