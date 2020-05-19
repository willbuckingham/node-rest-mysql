SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


--
-- Table structure for table `panos`
--

CREATE TABLE `panos` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `category` varchar(32) COLLATE utf8_bin NOT NULL,
  `title` varchar(255) COLLATE utf8_bin NOT NULL,
  `folder` varchar(64) COLLATE utf8_bin NOT NULL,
  `dzi` varchar(64) COLLATE utf8_bin NOT NULL,
  `width` mediumint(6) UNSIGNED NOT NULL DEFAULT '0',
  `height` mediumint(6) UNSIGNED NOT NULL DEFAULT '0',
  `tile_level` tinyint(2) UNSIGNED NOT NULL DEFAULT '10',
  `start` smallint(4) UNSIGNED NOT NULL,
  `end` smallint(4) UNSIGNED NOT NULL,
  `date_taken` int(10) UNSIGNED NOT NULL,
  `focal_length` smallint(3) UNSIGNED NOT NULL DEFAULT '0',
  `latitude` float(10,6) NOT NULL DEFAULT '0.000000',
  `longitude` float(10,6) NOT NULL DEFAULT '0.000000',
  `wrapHorizontal` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `panos`
--

INSERT INTO `panos` (`id`, `category`, `title`, `folder`, `dzi`, `width`, `height`, `tile_level`, `start`, `end`, `date_taken`, `focal_length`, `latitude`, `longitude`, `wrapHorizontal`) VALUES
(1, 'aruba', 'From Lighthouse', 'aruba', 'IMG_3921-3931_Panorama.dzi', 14289, 3570, 10, 3921, 3931, 1340553600, 18, 12.613577, -70.051468, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `panos`
--
ALTER TABLE `panos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`category`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `panos`
--
ALTER TABLE `panos`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
