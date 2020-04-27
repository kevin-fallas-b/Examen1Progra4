-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2020 at 01:29 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bd_funcionarios`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_funcionarios`
--

CREATE TABLE `tbl_funcionarios` (
  `id` int(11) NOT NULL,
  `cedula` varchar(9) NOT NULL,
  `nombre` varchar(32) NOT NULL,
  `apellido1` varchar(32) NOT NULL,
  `apellido2` varchar(32) NOT NULL,
  `fecha` date NOT NULL,
  `telefono` varchar(8) NOT NULL,
  `email` varchar(64) NOT NULL,
  `direccion` varchar(128) NOT NULL,
  `departamento` varchar(32) NOT NULL,
  `puesto` varchar(32) NOT NULL,
  `salario` int(11) NOT NULL,
  `observaciones` varchar(128) NOT NULL,
  `foto` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_funcionarios`
--

INSERT INTO `tbl_funcionarios` (`id`, `cedula`, `nombre`, `apellido1`, `apellido2`, `fecha`, `telefono`, `email`, `direccion`, `departamento`, `puesto`, `salario`, `observaciones`, `foto`) VALUES
(1, '604370412', '    Kevin', 'Fallas    ', 'Bonilla', '0000-00-00', '85844178', 'kevin.fallas.b@gmail.com', 'kevin.fallas.b@gmail.com', '86', '4', 684, '        ', '604370412.jpg'),
(2, '9012615', 'Angelica', 'Godinez', 'Alvarado', '0000-00-00', '84864', '684', '684', '86', '886', 684, '8486', 'jpg'),
(6, '9564 ', ' susana', 'horia ', 'pichudaa', '0000-00-00', '6848', '846', '846', '84', '8', 86, 'excelente empleado', '9564.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_funcionarios`
--
ALTER TABLE `tbl_funcionarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_funcionarios`
--
ALTER TABLE `tbl_funcionarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
