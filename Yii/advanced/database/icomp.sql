-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 05-Jul-2018 às 06:27
-- Versão do servidor: 10.1.31-MariaDB
-- PHP Version: 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `icomp`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `curso`
--

CREATE TABLE `curso` (
  `id` int(11) NOT NULL,
  `nome` varchar(45) NOT NULL,
  `sigla` char(4) NOT NULL,
  `descricao` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `curso`
--

INSERT INTO `curso` (`id`, `nome`, `sigla`, `descricao`) VALUES
(2, 'Sistemas de Informação', 'SI', 'Um curso legal'),
(3, 'Ciência da Computação', 'CC', 'Um curso sensacional');

-- --------------------------------------------------------

--
-- Estrutura da tabela `jogada`
--

CREATE TABLE `jogada` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `pontuacao` int(11) NOT NULL,
  `data_hora` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `jogada`
--

INSERT INTO `jogada` (`id`, `id_user`, `pontuacao`, `data_hora`) VALUES
(4, 3, 133, '2018-07-05 06:03:35'),
(5, 3, 300, '2018-07-05 06:16:27'),
(6, 3, 125, '2018-07-05 06:16:36'),
(7, 3, 851, '2018-07-05 06:17:35'),
(8, 4, 2199, '2018-07-05 06:20:03');

-- --------------------------------------------------------

--
-- Estrutura da tabela `migration`
--

CREATE TABLE `migration` (
  `version` varchar(180) NOT NULL,
  `apply_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `migration`
--

INSERT INTO `migration` (`version`, `apply_time`) VALUES
('m000000_000000_base', 1530671007),
('m130524_201442_init', 1530671009);

-- --------------------------------------------------------

--
-- Estrutura da tabela `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `auth_key` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password_reset_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '10',
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `user`
--

INSERT INTO `user` (`id`, `username`, `auth_key`, `password_hash`, `password_reset_token`, `email`, `status`, `created_at`, `updated_at`, `id_curso`) VALUES
(1, 'Rúben', 'hahaha', 'hahaha', 'hahaha', 'rubenbelem@gmail.com', 1, 1530727491, 1530727491, 2),
(2, 'rubelem', 'J68zj5HzAmc3i3Nd8hDEDSyXlqnS5drE', '$2y$13$zZEcQYirJ.G9djb7vua4j.Wi0dyiDobJiZPO1/U2IH1klx8sFNT2.', NULL, 'oi@gmail.com', 10, 1737454825, 1737454825, 3),
(3, 'tumateseco', 'IUmKFQ74_B4u-r9UArWo9DSNmLvbPV2G', '$2y$13$W6bepMRh9SXXwMWv7KyMyeGvUumUUqFX9IW8tL1VPBh26YDvTYaVm', NULL, 'tumate@gmail.com', 10, 1530747308, 1530747308, 3),
(4, 'cubomagico', 'x7XeLzaUu36FJ320E28fjQ5f3BVUtefI', '$2y$13$db0a03jYOkZBtMVzaf6NDeU5nLimXzSB7P0JzrcahYernQW17zgju', NULL, 'rubelem@gmail.com', 10, 1530764327, 1530764327, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jogada`
--
ALTER TABLE `jogada`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_jogada_id_user` (`id_user`);

--
-- Indexes for table `migration`
--
ALTER TABLE `migration`
  ADD PRIMARY KEY (`version`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `password_reset_token` (`password_reset_token`),
  ADD KEY `fk_user_id_curso` (`id_curso`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `curso`
--
ALTER TABLE `curso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `jogada`
--
ALTER TABLE `jogada`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `jogada`
--
ALTER TABLE `jogada`
  ADD CONSTRAINT `fk_jogada_id_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

--
-- Limitadores para a tabela `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_user_id_curso` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
