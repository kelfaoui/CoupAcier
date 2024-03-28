-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 03 mars 2024 à 12:11
-- Version du serveur : 5.7.36
-- Version de PHP : 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `coupaciers`
--

-- --------------------------------------------------------

--
-- Structure de la table `approvisionner`
--

DROP TABLE IF EXISTS `approvisionner`;
CREATE TABLE IF NOT EXISTS `approvisionner` (
  `idApprovisonnement` int(11) NOT NULL AUTO_INCREMENT,
  `dateApprovisionnement` datetime NOT NULL,
  `idEmploye` int(11) NOT NULL,
  `idEntrepot` int(11) NOT NULL,
  PRIMARY KEY (`idApprovisonnement`),
  KEY `approvisionner_employe_FK` (`idEmploye`),
  KEY `approvisionner_entrepot0_FK` (`idEntrepot`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
CREATE TABLE IF NOT EXISTS `categorie` (
  `idRole` int(11) NOT NULL AUTO_INCREMENT,
  `nomRole` varchar(50) NOT NULL,
  PRIMARY KEY (`idRole`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `idClient` int(11) NOT NULL AUTO_INCREMENT,
  `prenomClient` varchar(50) DEFAULT NULL,
  `nomClient` varchar(50) NOT NULL,
  `motDePasse` varchar(200) NOT NULL,
  `numeroVoie` int(11) NOT NULL,
  `nomVoie` varchar(200) NOT NULL,
  `codePostale` int(11) NOT NULL,
  `ville` varchar(100) NOT NULL,
  `telephone` varchar(13) DEFAULT NULL,
  `statutCompte` varchar(50) DEFAULT NULL,
  `codeGenere` varchar(100) DEFAULT NULL,
  `profilClient` tinyint(1) NOT NULL,
  `siret` varchar(14) NOT NULL,
  `email` varchar(200) NOT NULL,
  PRIMARY KEY (`idClient`),
  UNIQUE KEY `client_AK` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

DROP TABLE IF EXISTS `commande`;
CREATE TABLE IF NOT EXISTS `commande` (
  `idCommande` int(11) NOT NULL AUTO_INCREMENT,
  `dateCommande` datetime NOT NULL,
  `numeroVoie` int(11) DEFAULT NULL,
  `nomVoie` varchar(200) DEFAULT NULL,
  `codePostale` int(11) DEFAULT NULL,
  `ville` varchar(100) DEFAULT NULL,
  `statusCommande` enum('En attente','Validé','En Decoupage','Decoupé','En Cours de Livraison','Livré','Non livré') NOT NULL,
  `devis` tinyint(1) NOT NULL,
  `reference` varchar(11) NOT NULL,
  `idClient` int(11) NOT NULL,
  `idLivreur` int(11) DEFAULT NULL,
  PRIMARY KEY (`idCommande`),
  UNIQUE KEY `commande_AK` (`reference`),
  KEY `commande_client_FK` (`idClient`),
  KEY `commande_livreur0_FK` (`idLivreur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `decoupagecommande`
--

DROP TABLE IF EXISTS `decoupagecommande`;
CREATE TABLE IF NOT EXISTS `decoupagecommande` (
  `idDecoupage` int(11) NOT NULL AUTO_INCREMENT,
  `dimensionCoupe` float NOT NULL,
  `quantite` int(11) NOT NULL,
  `ristourne` float DEFAULT NULL,
  `idProduit` int(11) NOT NULL,
  `idCommande` int(11) NOT NULL,
  PRIMARY KEY (`idDecoupage`),
  KEY `decoupageCommande_produit_FK` (`idProduit`),
  KEY `decoupageCommande_commande0_FK` (`idCommande`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `employe`
--

DROP TABLE IF EXISTS `employe`;
CREATE TABLE IF NOT EXISTS `employe` (
  `idEmploye` int(11) NOT NULL AUTO_INCREMENT,
  `nomEmploye` varchar(50) NOT NULL,
  `prenomEmploye` varchar(50) NOT NULL,
  `motDePasse` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `idRole` int(11) NOT NULL,
  PRIMARY KEY (`idEmploye`),
  UNIQUE KEY `employe_AK` (`email`),
  KEY `employe_role_FK` (`idRole`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `entrepot`
--

DROP TABLE IF EXISTS `entrepot`;
CREATE TABLE IF NOT EXISTS `entrepot` (
  `idEntrepot` int(11) NOT NULL AUTO_INCREMENT,
  `villeEntrepot` varchar(50) NOT NULL,
  `codePostaleEntrepot` int(11) NOT NULL,
  `voieEntrepot` varchar(200) NOT NULL,
  `NumeroRueEntrepot` int(11) NOT NULL,
  PRIMARY KEY (`idEntrepot`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `favoris`
--

DROP TABLE IF EXISTS `favoris`;
CREATE TABLE IF NOT EXISTS `favoris` (
  `idProduit` int(11) NOT NULL,
  `idClient` int(11) NOT NULL,
  PRIMARY KEY (`idProduit`,`idClient`),
  KEY `favoris_client0_FK` (`idClient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `fournisseur`
--

DROP TABLE IF EXISTS `fournisseur`;
CREATE TABLE IF NOT EXISTS `fournisseur` (
  `idFournisseur` int(11) NOT NULL AUTO_INCREMENT,
  `nomFournisseur` varchar(200) NOT NULL,
  `numeroVoie` int(11) NOT NULL,
  `nomVoie` varchar(200) NOT NULL,
  `codePostale` int(11) NOT NULL,
  `ville` varchar(100) NOT NULL,
  `telephone` varchar(13) DEFAULT NULL,
  `email` varchar(200) NOT NULL,
  PRIMARY KEY (`idFournisseur`),
  UNIQUE KEY `fournisseur_AK` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `livreur`
--

DROP TABLE IF EXISTS `livreur`;
CREATE TABLE IF NOT EXISTS `livreur` (
  `idLivreur` int(11) NOT NULL AUTO_INCREMENT,
  `nomLivreur` varchar(100) NOT NULL,
  `prenomLivreur` varchar(100) NOT NULL,
  `motDePasse` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `idLivraison` int(11) NOT NULL,
  PRIMARY KEY (`idLivreur`),
  UNIQUE KEY `livreur_AK` (`email`),
  KEY `livreur_societeLivraison_FK` (`idLivraison`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `probleme`
--

DROP TABLE IF EXISTS `probleme`;
CREATE TABLE IF NOT EXISTS `probleme` (
  `idProbleme` int(11) NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  `objet` varchar(100) NOT NULL,
  `dateProbleme` datetime NOT NULL,
  `idClient` int(11) NOT NULL,
  PRIMARY KEY (`idProbleme`),
  KEY `probleme_client_FK` (`idClient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

DROP TABLE IF EXISTS `produit`;
CREATE TABLE IF NOT EXISTS `produit` (
  `idProduit` int(11) NOT NULL AUTO_INCREMENT,
  `nomProduit` varchar(100) NOT NULL,
  `prixMetre` float NOT NULL,
  `description` text NOT NULL,
  `imagePrincipale` text NOT NULL,
  `image1` text,
  `image2` text,
  `hauteur` float NOT NULL,
  `epaisseur` float NOT NULL,
  `marge` float NOT NULL,
  `masseLineaire` float NOT NULL,
  `tva` float NOT NULL,
  `idRole` int(11) NOT NULL,
  PRIMARY KEY (`idProduit`),
  KEY `produit_categorie_FK` (`idRole`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `produitfournis`
--

DROP TABLE IF EXISTS `produitfournis`;
CREATE TABLE IF NOT EXISTS `produitfournis` (
  `idFournisseur` int(11) NOT NULL,
  `idApprovisonnement` int(11) NOT NULL,
  `idProduit` int(11) NOT NULL,
  `quantite` int(11) NOT NULL,
  PRIMARY KEY (`idFournisseur`,`idApprovisonnement`,`idProduit`),
  KEY `produitFournis_approvisionner0_FK` (`idApprovisonnement`),
  KEY `produitFournis_produit1_FK` (`idProduit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `idRole` int(11) NOT NULL AUTO_INCREMENT,
  `nomRole` varchar(50) NOT NULL,
  PRIMARY KEY (`idRole`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `societelivraison`
--

DROP TABLE IF EXISTS `societelivraison`;
CREATE TABLE IF NOT EXISTS `societelivraison` (
  `idLivraison` int(11) NOT NULL AUTO_INCREMENT,
  `nomSocieteLivraison` varchar(200) NOT NULL,
  `siretLivraison` varchar(14) NOT NULL,
  PRIMARY KEY (`idLivraison`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `stock`
--

DROP TABLE IF EXISTS `stock`;
CREATE TABLE IF NOT EXISTS `stock` (
  `idStock` int(11) NOT NULL AUTO_INCREMENT,
  `quantite` int(11) NOT NULL,
  `longueur` float NOT NULL,
  `idProduit` int(11) NOT NULL,
  `idEntrepot` int(11) NOT NULL,
  PRIMARY KEY (`idStock`),
  KEY `stock_produit_FK` (`idProduit`),
  KEY `stock_entrepot0_FK` (`idEntrepot`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `approvisionner`
--
ALTER TABLE `approvisionner`
  ADD CONSTRAINT `approvisionner_employe_FK` FOREIGN KEY (`idEmploye`) REFERENCES `employe` (`idEmploye`),
  ADD CONSTRAINT `approvisionner_entrepot0_FK` FOREIGN KEY (`idEntrepot`) REFERENCES `entrepot` (`idEntrepot`);

--
-- Contraintes pour la table `commande`
--
ALTER TABLE `commande`
  ADD CONSTRAINT `commande_client_FK` FOREIGN KEY (`idClient`) REFERENCES `client` (`idClient`),
  ADD CONSTRAINT `commande_livreur0_FK` FOREIGN KEY (`idLivreur`) REFERENCES `livreur` (`idLivreur`);

--
-- Contraintes pour la table `decoupagecommande`
--
ALTER TABLE `decoupagecommande`
  ADD CONSTRAINT `decoupageCommande_commande0_FK` FOREIGN KEY (`idCommande`) REFERENCES `commande` (`idCommande`),
  ADD CONSTRAINT `decoupageCommande_produit_FK` FOREIGN KEY (`idProduit`) REFERENCES `produit` (`idProduit`);

--
-- Contraintes pour la table `employe`
--
ALTER TABLE `employe`
  ADD CONSTRAINT `employe_role_FK` FOREIGN KEY (`idRole`) REFERENCES `role` (`idRole`);

--
-- Contraintes pour la table `favoris`
--
ALTER TABLE `favoris`
  ADD CONSTRAINT `favoris_client0_FK` FOREIGN KEY (`idClient`) REFERENCES `client` (`idClient`),
  ADD CONSTRAINT `favoris_produit_FK` FOREIGN KEY (`idProduit`) REFERENCES `produit` (`idProduit`);

--
-- Contraintes pour la table `livreur`
--
ALTER TABLE `livreur`
  ADD CONSTRAINT `livreur_societeLivraison_FK` FOREIGN KEY (`idLivraison`) REFERENCES `societelivraison` (`idLivraison`);

--
-- Contraintes pour la table `probleme`
--
ALTER TABLE `probleme`
  ADD CONSTRAINT `probleme_client_FK` FOREIGN KEY (`idClient`) REFERENCES `client` (`idClient`);

--
-- Contraintes pour la table `produit`
--
ALTER TABLE `produit`
  ADD CONSTRAINT `produit_categorie_FK` FOREIGN KEY (`idRole`) REFERENCES `categorie` (`idRole`);

--
-- Contraintes pour la table `produitfournis`
--
ALTER TABLE `produitfournis`
  ADD CONSTRAINT `produitFournis_approvisionner0_FK` FOREIGN KEY (`idApprovisonnement`) REFERENCES `approvisionner` (`idApprovisonnement`),
  ADD CONSTRAINT `produitFournis_fournisseur_FK` FOREIGN KEY (`idFournisseur`) REFERENCES `fournisseur` (`idFournisseur`),
  ADD CONSTRAINT `produitFournis_produit1_FK` FOREIGN KEY (`idProduit`) REFERENCES `produit` (`idProduit`);

--
-- Contraintes pour la table `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `stock_entrepot0_FK` FOREIGN KEY (`idEntrepot`) REFERENCES `entrepot` (`idEntrepot`),
  ADD CONSTRAINT `stock_produit_FK` FOREIGN KEY (`idProduit`) REFERENCES `produit` (`idProduit`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
