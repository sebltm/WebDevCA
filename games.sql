-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 14, 2017 at 12:14 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `sm807`
--

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `name` tinytext NOT NULL,
  `publisher` tinytext NOT NULL,
  `releasedate` date DEFAULT NULL,
  `stock` smallint(6) NOT NULL,
  `sold` mediumint(9) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`id`, `name`, `publisher`, `releasedate`, `stock`, `sold`) VALUES
(1, 'Grand Theft Auto 5', 'Rockstar Games', '2013-09-13', 3052, 525012),
(2, 'Watch Dogs 2', 'Ubisoft', '2016-11-15', 2690, 262506),
(3, 'Titanfall 2', 'Electronic Arts', '2016-10-28', 1325, 1564653),
(4, 'Forza Horizon 3', 'Microsoft Studios', '2016-09-27', 7685, 54645),
(5, 'FIFA 17', 'EA Sports', '2016-09-27', 12357, 4537984),
(6, 'Battlefield 1', 'Electronic Arts', '2016-10-21', 1523, 15643),
(7, 'NBA 2K17', '2K Sports', '2016-09-20', 8458, 938436);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
