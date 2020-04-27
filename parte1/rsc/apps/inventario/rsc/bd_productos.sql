-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 07, 2020 at 09:32 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bd_productos`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_productos`
--

CREATE TABLE `tbl_productos` (
  `id` int(11) UNSIGNED NOT NULL,
  `codigo` varchar(8) NOT NULL,
  `nombre` varchar(64) NOT NULL,
  `precio` float NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fechavencimiento` varchar(30) NOT NULL,
  `proveedor` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_productos`
--

INSERT INTO `tbl_productos` (`id`, `codigo`, `nombre`, `precio`, `cantidad`, `fechavencimiento`, `proveedor`) VALUES
(84375, '1', 'Coca-Cola', 750, 10, '12/02/2020', 'Coca-Cola co'),
(84379, '2', 'Pepsi', 600, 20, '12/02/2020', 'Pepsi co'),
(84380, '3', 'Jabon en polvo', 800, 30, '12/02/2020', 'Fort 3'),
(84381, '4', 'Desinfectante', 1000, 15, '12/02/2020', 'Axion'),
(84383, '5', 'Pan', 250, 100, '12/02/2020', 'Super Pan');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_productos`
--
ALTER TABLE `tbl_productos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_productos`
--
ALTER TABLE `tbl_productos`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84384;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
