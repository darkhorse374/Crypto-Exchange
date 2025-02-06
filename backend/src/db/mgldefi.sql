-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2021 at 10:56 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mgldefi`
--

-- --------------------------------------------------------

--
-- Table structure for table `email_verify`
--

CREATE TABLE `email_verify` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `verify_code` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ieo`
--

CREATE TABLE `ieo` (
  `id` int(11) NOT NULL,
  `token_address` varchar(42) NOT NULL,
  `token_name` varchar(20) NOT NULL,
  `token_symbol` varchar(10) NOT NULL,
  `token_description` varchar(1000) NOT NULL,
  `token_website` varchar(100) NOT NULL,
  `token_fb` varchar(100) NOT NULL,
  `token_pic` varchar(100) NOT NULL,
  `token_decimals` int(11) NOT NULL,
  `total_supply` double NOT NULL,
  `presale_supply` double NOT NULL,
  `presale_price` float NOT NULL,
  `list_price` float NOT NULL,
  `min_buy` double NOT NULL,
  `max_buy` double NOT NULL,
  `start_time` varchar(30) NOT NULL,
  `end_time` varchar(30) NOT NULL,
  `status` varchar(10) NOT NULL,
  `raised_amount` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `manage_user`
--

CREATE TABLE `manage_user` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `have_wallet` tinyint(1) NOT NULL,
  `wallet_address` varchar(42) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `manage_user`
--

INSERT INTO `manage_user` (`id`, `email`, `have_wallet`, `wallet_address`) VALUES
(1, 'info@mglcoin.io', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `p2p`
--

CREATE TABLE `p2p` (
  `id` int(11) NOT NULL,
  `seller_name` varchar(30) NOT NULL,
  `completed_orders` varchar(1000) NOT NULL,
  `currency` enum('USDT','MGL','BUSD') NOT NULL,
  `amount_usdt` double NOT NULL,
  `amount_mgl` double NOT NULL,
  `amount_busd` double NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `price_usdt` float NOT NULL,
  `price_mgl` float NOT NULL,
  `price_busd` float NOT NULL,
  `terms_conditions` varchar(1000) NOT NULL,
  `facebook_link` varchar(100) NOT NULL,
  `telegram_link` varchar(100) NOT NULL,
  `skype_link` varchar(100) NOT NULL,
  `profile_pic` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `subscriber`
--

CREATE TABLE `subscriber` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `top_tokens`
--

CREATE TABLE `top_tokens` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `symbol` varchar(10) NOT NULL,
  `price` double NOT NULL,
  `daily_percent` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `hash` varchar(100) NOT NULL,
  `from_id` text NOT NULL,
  `to_id` text NOT NULL,
  `token` varchar(42) NOT NULL,
  `amount` float NOT NULL,
  `network` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `country` varchar(30) NOT NULL,
  `invite_code` int(11) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `country`, `invite_code`, `role`) VALUES
(1, 'info@mglcoin.io', '$2a$08$0jDkU2V337gMOONHZgX0OepzgQZLzIYDVv4o64.4nwY2VolH.hip.', 'Taiwan', 0, 'Super');

-- --------------------------------------------------------

--
-- Table structure for table `wallet`
--

CREATE TABLE `wallet` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `publickey` varchar(42) NOT NULL,
  `privatekey` varchar(64) NOT NULL,
  `keyphrase` text NOT NULL,
  `polygon_tokensymbol` varchar(1000) NOT NULL,
  `polygonmain_assets` text NOT NULL,
  `polygontest_assets` text NOT NULL,
  `network` text NOT NULL,
  `bsc_tokensymbol` varchar(1000) NOT NULL,
  `bscmain_assets` text NOT NULL,
  `bsctest_assets` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `email_verify`
--
ALTER TABLE `email_verify`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `ieo`
--
ALTER TABLE `ieo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `manage_user`
--
ALTER TABLE `manage_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `p2p`
--
ALTER TABLE `p2p`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscriber`
--
ALTER TABLE `subscriber`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `top_tokens`
--
ALTER TABLE `top_tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wallet`
--
ALTER TABLE `wallet`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `email_verify`
--
ALTER TABLE `email_verify`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ieo`
--
ALTER TABLE `ieo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `manage_user`
--
ALTER TABLE `manage_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `p2p`
--
ALTER TABLE `p2p`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `subscriber`
--
ALTER TABLE `subscriber`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `top_tokens`
--
ALTER TABLE `top_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `wallet`
--
ALTER TABLE `wallet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
