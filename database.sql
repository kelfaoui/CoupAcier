-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.0.30 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Listage de la structure de table coupacier. approvisionner
CREATE TABLE IF NOT EXISTS `approvisionner` (
  `idApprovisonnement` int NOT NULL AUTO_INCREMENT,
  `dateApprovisionnement` datetime NOT NULL,
  `idEmploye` int NOT NULL,
  `idEntrepot` int NOT NULL,
  PRIMARY KEY (`idApprovisonnement`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table coupacier.approvisionner : ~0 rows (environ)
DELETE FROM `approvisionner`;

-- Listage de la structure de table coupacier. categorie
CREATE TABLE IF NOT EXISTS `categorie` (
  `idRole` int NOT NULL AUTO_INCREMENT,
  `nomRole` varchar(50) NOT NULL,
  PRIMARY KEY (`idRole`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table coupacier.categorie : ~5 rows (environ)
DELETE FROM `categorie`;
INSERT INTO `categorie` (`idRole`, `nomRole`) VALUES
	(1, 'Fers'),
	(2, 'Tubes'),
	(3, 'Tôles'),
	(4, 'Cornières'),
	(5, 'Poutrelles');

-- Listage de la structure de table coupacier. client
CREATE TABLE IF NOT EXISTS `client` (
  `idClient` int NOT NULL AUTO_INCREMENT,
  `prenomClient` varchar(50) DEFAULT NULL,
  `nomClient` varchar(50) NOT NULL,
  `motDePasse` varchar(200) NOT NULL,
  `numeroVoie` int NOT NULL,
  `nomVoie` varchar(200) NOT NULL,
  `codePostale` int NOT NULL,
  `ville` varchar(100) NOT NULL,
  `telephone` varchar(13) DEFAULT NULL,
  `statutCompte` varchar(50) DEFAULT NULL,
  `codeGenere` varchar(100) DEFAULT NULL,
  `profilClient` tinyint(1) NOT NULL,
  `siret` varchar(14) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `email` varchar(200) NOT NULL,
  PRIMARY KEY (`idClient`),
  UNIQUE KEY `client_AK` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table coupacier.client : ~6 rows (environ)
DELETE FROM `client`;
INSERT INTO `client` (`idClient`, `prenomClient`, `nomClient`, `motDePasse`, `numeroVoie`, `nomVoie`, `codePostale`, `ville`, `telephone`, `statutCompte`, `codeGenere`, `profilClient`, `siret`, `email`) VALUES
	(1, 'Jean-Marc', 'Nabet', '123456789', 1, 'Avenue Foch', 75000, 'Paris', '5555-6666', NULL, NULL, 1, '12345677777', 'aaa@cc.com'),
	(4, 'Jean-Jacques', 'Richet', '123456789', 1, 'Avenue Foch', 75000, 'Paris', '6666-4444', NULL, NULL, 1, '12345677777', 'richet@gmail.com'),
	(5, 'James', 'mon nom', '123456789', 1, '25 Rue des Martyrs Marseille', 75000, '', '0606060606', NULL, NULL, 1, NULL, 'aaa22@gmail.com'),
	(9, 'James', 'mon nom', '123456789', 1, '25 Rue des Martyrs Marseille', 75000, '', '0606060606', NULL, NULL, 1, NULL, 'aaa223@gmail.com'),
	(10, 'James', 'mon nom', '123456789', 1, '25 Rue des Martyrs Marseille', 75000, '', '0606060606', NULL, NULL, 1, NULL, 'aaa2234@gmail.com'),
	(11, NULL, 'Coupe Acier', '123456789', 1, 'Paris La défense', 75000, '', '0556250046', NULL, NULL, 1, '11323255', 'coupacier@gmail.com'),
	(12, NULL, 'Test', '123456789', 1, 'Paris paris', 75000, '', '55555-66666', NULL, NULL, 1, '12345645', 'aciercut@gmail.com');

-- Listage de la structure de table coupacier. commande
CREATE TABLE IF NOT EXISTS `commande` (
  `idCommande` int NOT NULL AUTO_INCREMENT,
  `dateCommande` datetime NOT NULL,
  `numeroVoie` int DEFAULT NULL,
  `nomVoie` varchar(200) DEFAULT NULL,
  `codePostale` int DEFAULT NULL,
  `ville` varchar(100) DEFAULT NULL,
  `statusCommande` enum('En attente','Validé','En Decoupage','Decoupé','En Cours de Livraison','Livré','Non livré') NOT NULL,
  `devis` tinyint(1) NOT NULL,
  `reference` varchar(11) NOT NULL,
  `idClient` int NOT NULL,
  `idLivreur` int DEFAULT NULL,
  PRIMARY KEY (`idCommande`),
  UNIQUE KEY `commande_AK` (`reference`),
  KEY `commande_client_FK` (`idClient`),
  KEY `commande_livreur0_FK` (`idLivreur`),
  CONSTRAINT `commande_client_FK` FOREIGN KEY (`idClient`) REFERENCES `client` (`idClient`),
  CONSTRAINT `commande_livreur0_FK` FOREIGN KEY (`idLivreur`) REFERENCES `livreur` (`idLivreur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table coupacier.commande : ~0 rows (environ)
DELETE FROM `commande`;

-- Listage de la structure de table coupacier. decoupagecommande
CREATE TABLE IF NOT EXISTS `decoupagecommande` (
  `idDecoupage` int NOT NULL AUTO_INCREMENT,
  `dimensionCoupe` float NOT NULL,
  `quantite` int NOT NULL,
  `ristourne` float DEFAULT NULL,
  `idProduit` int NOT NULL,
  `idCommande` int NOT NULL,
  PRIMARY KEY (`idDecoupage`),
  KEY `decoupageCommande_produit_FK` (`idProduit`),
  KEY `decoupageCommande_commande0_FK` (`idCommande`),
  CONSTRAINT `decoupageCommande_commande0_FK` FOREIGN KEY (`idCommande`) REFERENCES `commande` (`idCommande`),
  CONSTRAINT `decoupageCommande_produit_FK` FOREIGN KEY (`idProduit`) REFERENCES `produit` (`idProduit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table coupacier.decoupagecommande : ~0 rows (environ)
DELETE FROM `decoupagecommande`;

-- Listage de la structure de table coupacier. employe
CREATE TABLE IF NOT EXISTS `employe` (
  `idEmploye` int NOT NULL AUTO_INCREMENT,
  `nomEmploye` varchar(50) NOT NULL,
  `prenomEmploye` varchar(50) NOT NULL,
  `motDePasse` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `idRole` int NOT NULL,
  PRIMARY KEY (`idEmploye`),
  UNIQUE KEY `employe_AK` (`email`),
  KEY `employe_role_FK` (`idRole`),
  CONSTRAINT `employe_role_FK` FOREIGN KEY (`idRole`) REFERENCES `role` (`idRole`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table coupacier.employe : ~0 rows (environ)
DELETE FROM `employe`;

-- Listage de la structure de table coupacier. entrepot
CREATE TABLE IF NOT EXISTS `entrepot` (
  `idEntrepot` int NOT NULL AUTO_INCREMENT,
  `villeEntrepot` varchar(50) NOT NULL,
  `codePostaleEntrepot` int NOT NULL,
  `voieEntrepot` varchar(200) NOT NULL,
  `NumeroRueEntrepot` int NOT NULL,
  PRIMARY KEY (`idEntrepot`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table coupacier.entrepot : ~2 rows (environ)
DELETE FROM `entrepot`;
INSERT INTO `entrepot` (`idEntrepot`, `villeEntrepot`, `codePostaleEntrepot`, `voieEntrepot`, `NumeroRueEntrepot`) VALUES
	(1, 'Paris', 15000, 'Avenue Foch', 25),
	(2, 'Lyon', 69000, 'Rue des oliviers', 30),
	(3, 'Marseille', 13000, 'La cité radieuse', 13);

-- Listage de la structure de table coupacier. favoris
CREATE TABLE IF NOT EXISTS `favoris` (
  `idProduit` int NOT NULL,
  `idClient` int NOT NULL,
  PRIMARY KEY (`idProduit`,`idClient`),
  KEY `favoris_client0_FK` (`idClient`),
  CONSTRAINT `favoris_client0_FK` FOREIGN KEY (`idClient`) REFERENCES `client` (`idClient`),
  CONSTRAINT `favoris_produit_FK` FOREIGN KEY (`idProduit`) REFERENCES `produit` (`idProduit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table coupacier.favoris : ~0 rows (environ)
DELETE FROM `favoris`;

-- Listage de la structure de table coupacier. fournisseur
CREATE TABLE IF NOT EXISTS `fournisseur` (
  `idFournisseur` int NOT NULL AUTO_INCREMENT,
  `nomFournisseur` varchar(200) NOT NULL,
  `numeroVoie` int NOT NULL,
  `nomVoie` varchar(200) NOT NULL,
  `codePostale` int NOT NULL,
  `ville` varchar(100) NOT NULL,
  `telephone` varchar(13) DEFAULT NULL,
  `email` varchar(200) NOT NULL,
  PRIMARY KEY (`idFournisseur`),
  UNIQUE KEY `fournisseur_AK` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table coupacier.fournisseur : ~0 rows (environ)
DELETE FROM `fournisseur`;

-- Listage de la structure de table coupacier. livreur
CREATE TABLE IF NOT EXISTS `livreur` (
  `idLivreur` int NOT NULL AUTO_INCREMENT,
  `nomLivreur` varchar(100) NOT NULL,
  `prenomLivreur` varchar(100) NOT NULL,
  `motDePasse` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `idLivraison` int NOT NULL,
  PRIMARY KEY (`idLivreur`),
  UNIQUE KEY `livreur_AK` (`email`),
  KEY `livreur_societeLivraison_FK` (`idLivraison`),
  CONSTRAINT `livreur_societeLivraison_FK` FOREIGN KEY (`idLivraison`) REFERENCES `societelivraison` (`idLivraison`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table coupacier.livreur : ~0 rows (environ)
DELETE FROM `livreur`;

-- Listage de la structure de table coupacier. probleme
CREATE TABLE IF NOT EXISTS `probleme` (
  `idProbleme` int NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  `objet` varchar(100) NOT NULL,
  `dateProbleme` datetime NOT NULL,
  `idClient` int NOT NULL,
  PRIMARY KEY (`idProbleme`),
  KEY `probleme_client_FK` (`idClient`),
  CONSTRAINT `probleme_client_FK` FOREIGN KEY (`idClient`) REFERENCES `client` (`idClient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table coupacier.probleme : ~0 rows (environ)
DELETE FROM `probleme`;

-- Listage de la structure de table coupacier. produit
CREATE TABLE IF NOT EXISTS `produit` (
  `idProduit` int NOT NULL AUTO_INCREMENT,
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
  `idRole` int NOT NULL,
  PRIMARY KEY (`idProduit`),
  KEY `produit_categorie_FK` (`idRole`),
  CONSTRAINT `produit_categorie_FK` FOREIGN KEY (`idRole`) REFERENCES `categorie` (`idRole`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table coupacier.produit : ~13 rows (environ)
DELETE FROM `produit`;
INSERT INTO `produit` (`idProduit`, `nomProduit`, `prixMetre`, `description`, `imagePrincipale`, `image1`, `image2`, `hauteur`, `epaisseur`, `marge`, `masseLineaire`, `tva`, `idRole`) VALUES
	(1, 'Fer Plat', 35, 'Fer plat', 'fer_plat_img.gif', 'fer_plat_img.gif', 'fer_plat_img.gif', 1, 3, 0.5, 5, 10, 1),
	(2, 'Fer T', 50, 'Fer plat', 'fer_t_img.gif', 'fer_t_img.gif', 'fer_t_img.gif', 3, 3, 0.5, 5, 10, 1),
	(3, 'Barres carrées', 54, 'Fer plat', 'barres_carrees_img.gif', 'barres_carrees_img.gif', 'barres_carrees_img.gif', 2, 2, 2, 5, 10, 1),
	(4, 'Cornières égales', 54, 'Fer plat', 'cornieres_egales_img.gif', 'cornieres_egales_img.gif', 'cornieres_egales_img.gif', 3, 3, 1, 5, 10, 4),
	(5, 'Cornières inégales', 45, 'Fer plat', 'cornieres_inegales_img.gif', 'cornieres_inegales_img.gif', 'cornieres_inegales_img.gif', 3, 3, 1, 5, 10, 4),
	(6, 'Poutrelles HE', 73, 'Fer plat', 'poutrelles_he_img.gif', 'poutrelles_he_img.gif', 'poutrelles_he_img.gif', 5, 5, 1, 5, 10, 5),
	(7, 'Poutrelles IPE', 72, 'Fer plat', 'poutrelles_ipe_img.gif', 'poutrelles_ipe_img.gif', 'poutrelles_ipe_img.gif', 5, 5, 1, 5, 10, 5),
	(8, 'Poutrelles UAP', 85, 'Fer plat', 'poutrelles_uap_img.gif', 'poutrelles_uap_img.gif', 'poutrelles_uap_img.gif', 5, 5, 1, 5, 10, 5),
	(9, 'Poutrelles UPN', 45, 'Fer plat', 'poutrelles_upn_img.gif', 'poutrelles_upn_img.gif', 'poutrelles_upn_img.gif', 5, 5, 1, 5, 10, 5),
	(10, 'Tube carré rectangulaire', 45, 'Fer plat', 'tube_car_rect.jpeg', 'tube_car_rect.jpeg', 'tube_car_rect.jpeg', 5, 3, 1, 5, 10, 2),
	(11, 'Tube carré', 85, 'Fer plat', 'tubes_carres_img.gif', 'tubes_carres_img.gif', 'tubes_carres_img.gif', 3, 3, 1, 5, 10, 2),
	(12, 'Tube rectangulaire', 38, 'Fer plat', 'tubes_rectangulaires_img.gif', 'tubes_rectangulaires_img.gif', 'tubes_rectangulaires_img.gif', 2, 5, 1, 5, 10, 2),
	(13, 'Tubes ronds', 51, 'Fer plat', 'tubes_ronds_img.gif', 'tubes_ronds_img.gif', 'tubes_ronds_img.gif', 2, 5, 1, 5, 10, 2);

-- Listage de la structure de table coupacier. produitfournis
CREATE TABLE IF NOT EXISTS `produitfournis` (
  `idFournisseur` int NOT NULL,
  `idApprovisonnement` int NOT NULL,
  `idProduit` int NOT NULL,
  `quantite` int NOT NULL,
  PRIMARY KEY (`idFournisseur`,`idApprovisonnement`,`idProduit`),
  KEY `produitFournis_approvisionner0_FK` (`idApprovisonnement`),
  KEY `produitFournis_produit1_FK` (`idProduit`),
  CONSTRAINT `produitFournis_approvisionner0_FK` FOREIGN KEY (`idApprovisonnement`) REFERENCES `approvisionner` (`idApprovisonnement`),
  CONSTRAINT `produitFournis_fournisseur_FK` FOREIGN KEY (`idFournisseur`) REFERENCES `fournisseur` (`idFournisseur`),
  CONSTRAINT `produitFournis_produit1_FK` FOREIGN KEY (`idProduit`) REFERENCES `produit` (`idProduit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table coupacier.produitfournis : ~0 rows (environ)
DELETE FROM `produitfournis`;

-- Listage de la structure de table coupacier. role
CREATE TABLE IF NOT EXISTS `role` (
  `idRole` int NOT NULL AUTO_INCREMENT,
  `nomRole` varchar(50) NOT NULL,
  PRIMARY KEY (`idRole`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table coupacier.role : ~2 rows (environ)
DELETE FROM `role`;
INSERT INTO `role` (`idRole`, `nomRole`) VALUES
	(1, 'Admin'),
	(2, 'Operateur');

-- Listage de la structure de table coupacier. societelivraison
CREATE TABLE IF NOT EXISTS `societelivraison` (
  `idLivraison` int NOT NULL AUTO_INCREMENT,
  `nomSocieteLivraison` varchar(200) NOT NULL,
  `siretLivraison` varchar(14) NOT NULL,
  PRIMARY KEY (`idLivraison`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table coupacier.societelivraison : ~0 rows (environ)
DELETE FROM `societelivraison`;

-- Listage de la structure de table coupacier. stock
CREATE TABLE IF NOT EXISTS `stock` (
  `idStock` int NOT NULL AUTO_INCREMENT,
  `quantite` int NOT NULL,
  `longueur` float NOT NULL,
  `idProduit` int NOT NULL,
  `idEntrepot` int NOT NULL,
  PRIMARY KEY (`idStock`),
  KEY `stock_produit_FK` (`idProduit`),
  KEY `stock_entrepot0_FK` (`idEntrepot`),
  CONSTRAINT `stock_entrepot0_FK` FOREIGN KEY (`idEntrepot`) REFERENCES `entrepot` (`idEntrepot`),
  CONSTRAINT `stock_produit_FK` FOREIGN KEY (`idProduit`) REFERENCES `produit` (`idProduit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table coupacier.stock : ~0 rows (environ)
DELETE FROM `stock`;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
