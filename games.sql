-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 24, 2017 at 09:02 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

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
  `url` text NOT NULL,
  `releasedate` date DEFAULT NULL,
  `stock` smallint(6) UNSIGNED NOT NULL,
  `sold` int(9) UNSIGNED NOT NULL,
  `price` decimal(5,2) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`id`, `name`, `publisher`, `url`, `releasedate`, `stock`, `sold`, `price`) VALUES
(2, 'Watch Dogs 2', 'Ubisoft', 'https://ubistatic19-a.akamaihd.net/ubicomstatic/en-US/global/game-info/WD2-ubicom-gameinfo-boxart-rated-tablet-v2_Tablet_254078.jpg', '2016-11-15', 24930, 289088, '27.99'),
(3, 'Titanfall 2', 'Electronic Arts', 'http://vignette4.wikia.nocookie.net/voiceacting/images/d/d1/Titanfall_2_Cover.jpg/revision/latest?cb=20161221142047', '2016-10-28', 9690, 1570074, '49.99'),
(4, 'Forza Horizon 3', 'Microsoft Studios', 'http://s3.amazonaws.com/kidzworld_photo/images/2016930/1e9b0317-51e8-4688-9bdf-33f3cb249c50/forza-horizon-3-cover-art.png', '2016-09-27', 4418, 57912, '49.99'),
(5, 'FIFA 17', 'EA Sports', 'http://cdn.images.express.co.uk/img/dynamic/143/590x/secondary/FIFA-17-600213.jpg', '2016-09-27', 1172, 4539314, '49.99'),
(6, 'Battlefield 1', 'Electronic Arts', 'http://www.mobygames.com/images/covers/l/367151-battlefield-1-playstation-4-front-cover.jpg', '2016-10-21', 17560, 28048, '44.99'),
(7, 'NBA 2K17', '2K Sports', 'https://blogs-images.forbes.com/brianmazique/files/2016/04/2KSMKT_NBA2K17_KOBE_AGNOSTIC_FOB_NOAMARAYEDGES.jpg', '2016-09-20', 8367, 938527, '39.99'),
(9, 'Grand Theft Auto 5', 'Rockstar Games', 'https://media.rockstargames.com/rockstargames/img/global/news/upload/actual_1364906194.jpg', '2013-09-17', 19540, 460, '24.69'),
(10, 'Overwatch', 'Blizzard Entertainment', 'http://gamepreorders.com/wp-content/uploads/2016/03/overwatch-cover.jpg', '2016-06-24', 8438, 54298, '42.00'),
(12, 'Mass Effect: Andromeda', 'Electronic Arts', 'https://upload.wikimedia.org/wikipedia/en/0/07/Mass_Effect_Andromeda_cover.jpeg', '2017-03-21', 8645, 250, '49.00'),
(13, 'Dark Souls III', 'FromSoftware', 'https://static.trueachievements.com/customimages/041223.jpg', '2016-03-24', 6539, 566552, '29.99'),
(14, 'The Legend of Zelda: Ocarina of Time', 'Koji Kondo', 'http://www.theisozone.com/images/cover/n64-1359659111.jpg', '1998-11-21', 21541, 16777215, '149.99'),
(15, 'Soulcalibur', 'Bandai Namco Entertainment', 'http://vignette2.wikia.nocookie.net/vsbattles/images/7/71/Soul_calibur.jpg/revision/latest?cb=20150406042607', '1998-07-30', 15178, 135739, '8.96'),
(16, 'Tony Hawk\'s Pro Skater 3', 'Activision', 'http://img1.game-oldies.com/sites/default/files/packshots/sony-playstation/tony-hawks-pro-skater-3-usa.jpg', '2001-10-28', 54356, 1256966, '6.22'),
(17, 'Grand Theft Auto IV', 'Rockstar North', 'https://upload.wikimedia.org/wikipedia/en/b/b7/Grand_Theft_Auto_IV_cover.jpg', '2008-04-29', 45419, 5545900, '14.92'),
(18, 'Super Mario Galaxy 2', 'Nintendo', 'https://upload.wikimedia.org/wikipedia/en/6/65/Super_Mario_Galaxy_2_Box_Art.jpg', '2010-05-23', 42452, 4544616, '19.99'),
(19, 'Metal Gear Solid V: The Phantom Pain', 'Kojima Productions', 'https://upload.wikimedia.org/wikipedia/en/8/8f/Metal_Gear_Solid_V_The_Phantom_Pain_cover.png', '2015-09-01', 14058, 29135, '10.97'),
(20, 'Uncharted 4: A Thief\'s End', 'Naughty Dog', 'http://www.mobygames.com/images/covers/l/330413-uncharted-4-a-thief-s-end-playstation-4-front-cover.jpg', '2016-05-10', 42460, 2400, '24.50'),
(21, 'Tekken 3', 'Namco', 'http://img2.game-oldies.com/sites/default/files/packshots/sony-playstation/tekken-3-usa.jpg', '1997-03-20', 12517, 3587, '11.49'),
(22, 'The Legend of Zelda: Breath of the Wild', 'Nintendo', 'https://upload.wikimedia.org/wikipedia/en/0/0e/BreathoftheWildFinalCover.jpg', '2017-03-03', 65535, 12, '48.00'),
(23, 'Kerbal Space Program', 'Squad', 'https://kerbalspaceprogram.com/en/wp-content/uploads/2015/03/conqueringSpace_bannerWeb.jpg', '2015-04-27', 1068, 5165725, '29.99'),
(24, 'Rise of the Tomb Raider', 'Crystal Dynamics', 'http://cdn3-www.comingsoon.net/assets/uploads/gallery/rise-of-the-tomb-raider-1402545000/rottr_ka-boxshot_f_rgb.png', '2015-11-10', 14201, 4864904, '16.39'),
(25, 'Tetris', 'Nintendo/Sega/Philips', 'https://upload.wikimedia.org/wikipedia/en/8/8d/NES_Tetris_Box_Front.jpg', '1984-06-06', 14198, 16777215, '3.98'),
(32, 'The Witcher 3: Wild Hunt', 'CD Projekt RED', 'https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg', '2015-05-19', 15480, 20, '28.68');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
