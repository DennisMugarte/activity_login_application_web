CREATE DATABASE IF NOT EXISTS `Loginjs` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `loginjs`;

  CREATE TABLE IF NOT EXISTS `uusuarios` (
    `email` varchar(100) NOT NULL PRIMARY KEY,
    `nombre` varchar(50) NOT NULL,
    `Contraseña` varchar(255) NOT NULL,
  );
