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

-- Listage de la structure de table coupe_acier_final. adresse
CREATE TABLE IF NOT EXISTS `adresse` (
  `idAdresse` int NOT NULL AUTO_INCREMENT,
  `numeroVoie` int NOT NULL,
  `nomVoie` varchar(200) NOT NULL,
  `codePostale` varchar(5) NOT NULL,
  `ville` varchar(100) NOT NULL,
  `idClient` int DEFAULT NULL,
  `idLivraison` int DEFAULT NULL,
  `idEmploye` int DEFAULT NULL,
  `idFournisseur` int DEFAULT NULL,
  PRIMARY KEY (`idAdresse`),
  KEY `adresse_client_FK` (`idClient`),
  KEY `adresse_societeLivraison0_FK` (`idLivraison`),
  KEY `adresse_employe1_FK` (`idEmploye`),
  KEY `adresse_fournisseur2_FK` (`idFournisseur`),
  CONSTRAINT `adresse_client_FK` FOREIGN KEY (`idClient`) REFERENCES `client` (`idClient`),
  CONSTRAINT `adresse_employe1_FK` FOREIGN KEY (`idEmploye`) REFERENCES `employe` (`idEmploye`),
  CONSTRAINT `adresse_fournisseur2_FK` FOREIGN KEY (`idFournisseur`) REFERENCES `fournisseur` (`idFournisseur`),
  CONSTRAINT `adresse_societeLivraison0_FK` FOREIGN KEY (`idLivraison`) REFERENCES `societelivraison` (`idLivraison`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table coupe_acier_final.adresse : ~0 rows (environ)

-- Listage de la structure de table coupe_acier_final. approvisionnement
CREATE TABLE IF NOT EXISTS `approvisionnement` (
  `idApprovisonnement` int NOT NULL AUTO_INCREMENT,
  `dateApprovisionnement` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `quantite` int NOT NULL,
  `idEmploye` int NOT NULL,
  `idEntrepot` int NOT NULL,
  `idProduit` int NOT NULL,
  `idFournisseur` int NOT NULL,
  PRIMARY KEY (`idApprovisonnement`),
  KEY `approvisionnement_employe_FK` (`idEmploye`),
  KEY `approvisionnement_entrepot0_FK` (`idEntrepot`),
  KEY `approvisionnement_produit1_FK` (`idProduit`),
  KEY `approvisionnement_fournisseur2_FK` (`idFournisseur`),
  CONSTRAINT `approvisionnement_employe_FK` FOREIGN KEY (`idEmploye`) REFERENCES `employe` (`idEmploye`),
  CONSTRAINT `approvisionnement_entrepot0_FK` FOREIGN KEY (`idEntrepot`) REFERENCES `entrepot` (`idEntrepot`),
  CONSTRAINT `approvisionnement_fournisseur2_FK` FOREIGN KEY (`idFournisseur`) REFERENCES `fournisseur` (`idFournisseur`),
  CONSTRAINT `approvisionnement_produit1_FK` FOREIGN KEY (`idProduit`) REFERENCES `produit` (`idProduit`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table coupe_acier_final.approvisionnement : ~0 rows (environ)

-- Listage de la structure de table coupe_acier_final. categorie
CREATE TABLE IF NOT EXISTS `categorie` (
  `idCategorie` int NOT NULL AUTO_INCREMENT,
  `nomCategorie` varchar(100) NOT NULL,
  PRIMARY KEY (`idCategorie`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table coupe_acier_final.categorie : ~0 rows (environ)

-- Listage de la structure de table coupe_acier_final. client
CREATE TABLE IF NOT EXISTS `client` (
  `idClient` int NOT NULL AUTO_INCREMENT,
  `prenomClient` varchar(50) DEFAULT NULL,
  `nomClient` varchar(50) NOT NULL,
  `motDePasse` varchar(200) NOT NULL,
  `codeGenere` varchar(100) DEFAULT NULL,
  `siret` varchar(14) NOT NULL,
  `telephone` varchar(13) NOT NULL,
  `statutCompte` tinyint(1) NOT NULL,
  `profilClient` enum('Particulier','Professionnel') NOT NULL,
  `dateCreation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(200) NOT NULL,
  PRIMARY KEY (`idClient`),
  UNIQUE KEY `client_AK` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table coupe_acier_final.client : ~0 rows (environ)

-- Listage de la structure de table coupe_acier_final. commande
CREATE TABLE IF NOT EXISTS `commande` (
  `idCommande` int NOT NULL AUTO_INCREMENT,
  `dateCommande` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `statusCommande` enum('En attente','Validé','En Decoupage','Decoupé','En Cours de Livraison','Livré','Non livré') NOT NULL,
  `devis` tinyint(1) NOT NULL,
  `type` enum('Commande','Liste d''envie') NOT NULL,
  `dateLivraison` datetime DEFAULT NULL,
  `referenceLivraison` varchar(50) NOT NULL,
  `ModeReception` enum('A LIVRER','A RETIRER') NOT NULL,
  `reference` varchar(11) NOT NULL,
  `idClient` int NOT NULL,
  `idLivreur` int DEFAULT NULL,
  `idAdresse` int DEFAULT NULL,
  PRIMARY KEY (`idCommande`),
  UNIQUE KEY `commande_AK` (`reference`),
  KEY `commande_client_FK` (`idClient`),
  KEY `commande_livreur0_FK` (`idLivreur`),
  KEY `commande_adresse1_FK` (`idAdresse`),
  CONSTRAINT `commande_adresse1_FK` FOREIGN KEY (`idAdresse`) REFERENCES `adresse` (`idAdresse`),
  CONSTRAINT `commande_client_FK` FOREIGN KEY (`idClient`) REFERENCES `client` (`idClient`),
  CONSTRAINT `commande_livreur0_FK` FOREIGN KEY (`idLivreur`) REFERENCES `livreur` (`idLivreur`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table coupe_acier_final.commande : ~0 rows (environ)

-- Listage de la structure de table coupe_acier_final. employe
CREATE TABLE IF NOT EXISTS `employe` (
  `idEmploye` int NOT NULL AUTO_INCREMENT,
  `nomEmploye` varchar(50) NOT NULL,
  `prenomEmploye` varchar(50) NOT NULL,
  `motDePasse` varchar(200) NOT NULL,
  `nomRole` enum('Administrateur','Service Commercial','Préparateur de Commande','Automate') NOT NULL,
  `email` varchar(200) NOT NULL,
  PRIMARY KEY (`idEmploye`),
  UNIQUE KEY `employe_AK` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table coupe_acier_final.employe : ~0 rows (environ)

-- Listage de la structure de table coupe_acier_final. entrepot
CREATE TABLE IF NOT EXISTS `entrepot` (
  `idEntrepot` int NOT NULL AUTO_INCREMENT,
  `villeEntrepot` varchar(50) NOT NULL,
  `codePostaleEntrepot` int NOT NULL,
  `voieEntrepot` varchar(200) NOT NULL,
  `NumeroRueEntrepot` int NOT NULL,
  PRIMARY KEY (`idEntrepot`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table coupe_acier_final.entrepot : ~0 rows (environ)

-- Listage de la structure de table coupe_acier_final. favoris
CREATE TABLE IF NOT EXISTS `favoris` (
  `idProduit` int NOT NULL,
  `idClient` int NOT NULL,
  PRIMARY KEY (`idProduit`,`idClient`),
  KEY `favoris_client0_FK` (`idClient`),
  CONSTRAINT `favoris_client0_FK` FOREIGN KEY (`idClient`) REFERENCES `client` (`idClient`),
  CONSTRAINT `favoris_produit_FK` FOREIGN KEY (`idProduit`) REFERENCES `produit` (`idProduit`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table coupe_acier_final.favoris : ~0 rows (environ)

-- Listage de la structure de table coupe_acier_final. fournisseur
CREATE TABLE IF NOT EXISTS `fournisseur` (
  `idFournisseur` int NOT NULL AUTO_INCREMENT,
  `nomFournisseur` varchar(200) NOT NULL,
  `telephone` varchar(13) DEFAULT NULL,
  `email` varchar(200) NOT NULL,
  PRIMARY KEY (`idFournisseur`),
  UNIQUE KEY `fournisseur_AK` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table coupe_acier_final.fournisseur : ~0 rows (environ)

-- Listage de la structure de table coupe_acier_final. lignecommande
CREATE TABLE IF NOT EXISTS `lignecommande` (
  `idDecoupage` int NOT NULL AUTO_INCREMENT,
  `dimensionCoupe` float NOT NULL,
  `quantite` int NOT NULL,
  `ristourne` float DEFAULT NULL,
  `prixMetre` float NOT NULL,
  `idProduit` int NOT NULL,
  `idCommande` int NOT NULL,
  PRIMARY KEY (`idDecoupage`),
  KEY `ligneCommande_produit_FK` (`idProduit`),
  KEY `ligneCommande_commande0_FK` (`idCommande`),
  CONSTRAINT `ligneCommande_commande0_FK` FOREIGN KEY (`idCommande`) REFERENCES `commande` (`idCommande`),
  CONSTRAINT `ligneCommande_produit_FK` FOREIGN KEY (`idProduit`) REFERENCES `produit` (`idProduit`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table coupe_acier_final.lignecommande : ~0 rows (environ)

-- Listage de la structure de table coupe_acier_final. livreur
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table coupe_acier_final.livreur : ~0 rows (environ)

-- Listage de la structure de table coupe_acier_final. probleme
CREATE TABLE IF NOT EXISTS `probleme` (
  `idProbleme` int NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  `objet` varchar(100) NOT NULL,
  `dateProbleme` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idClient` int NOT NULL,
  PRIMARY KEY (`idProbleme`),
  KEY `probleme_client_FK` (`idClient`),
  CONSTRAINT `probleme_client_FK` FOREIGN KEY (`idClient`) REFERENCES `client` (`idClient`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table coupe_acier_final.probleme : ~0 rows (environ)

-- Listage de la structure de table coupe_acier_final. produit
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
  `referenceProduit` varchar(50) NOT NULL,
  `idCategorie` int NOT NULL,
  PRIMARY KEY (`idProduit`),
  UNIQUE KEY `produit_AK` (`referenceProduit`),
  KEY `produit_categorie_FK` (`idCategorie`),
  CONSTRAINT `produit_categorie_FK` FOREIGN KEY (`idCategorie`) REFERENCES `categorie` (`idCategorie`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- Listage des données de la table coupe_acier_final.produit : ~14 rows (environ)
INSERT INTO `produit` (`idProduit`, `nomProduit`, `prixMetre`, `description`, `imagePrincipale`, `image1`, `image2`, `hauteur`, `epaisseur`, `marge`, `masseLineaire`, `tva`, `referenceProduit`, `idCategorie`) VALUES
	(2, 'FER PLAT', 5, 'Fers plats pour ferronieries et forge', 'fer_plat_img.gif', NULL, NULL, 0, 0, 0, 0, 0, 'FERPLT', 0),
	(3, 'CORNIERES A AILES EGALES', 7, 'Cornieres à ailes égales, utile pour la fabrication de portes', 'cornieres_egales_img.gif', NULL, NULL, 0, 0, 0, 0, 0, 'CRNAE', 0),
	(4, 'CORNIERES A AILES INEGALES', 8, 'Cornieres à ailes inégales pour portes blindées ', 'cornieres_inegales_img.gif', NULL, NULL, 0, 0, 0, 0, 0, 'CRNAI', 0),
	(5, 'FERS EN T', 9, 'Fer en T pour vos travaux de batiments et pour vos sépérations de taules', 'fer_t_img.gif', NULL, NULL, 0, 0, 0, 0, 0, 'FERET', 0),
	(6, 'POUTRELLES IPE NORMALES', 11, 'Poutrelles IPE pour les travaux de ferronerie et de forge', 'poutrelles_ipe_img.gif', NULL, NULL, 0, 0, 0, 0, 0, 'PTRIPE', 0),
	(7, 'POUTRELLES UPE', 14, 'Poutrelles UPE', 'poutrelles_uap_img.gif', NULL, NULL, 0, 0, 0, 0, 0, 'PTRUPE', 0),
	(8, 'POUTRELLES HEA / HEB', 17, 'Poutrelles HEA', 'poutrelles_he_img.gif', NULL, NULL, 0, 0, 0, 0, 0, 'PTRHEA', 0),
	(9, 'POUTRELLES UPN / UAC', 10.5, 'Poutrelles UPN', 'poutrelles_upn_img.gif', NULL, NULL, 0, 0, 0, 0, 0, 'PTRUPN', 0),
	(10, 'TUBES RONDS', 14.5, 'Tubes ronds pour travaux de ferronerie', 'tubes_ronds_img.gif', NULL, NULL, 0, 0, 0, 0, 0, 'TUBRND', 0),
	(11, 'TUBES CARRES', 16.5, 'Tubes carrés pour portes', 'tubes_carres_img.gif', NULL, NULL, 0, 0, 0, 0, 0, 'TUBCAR', 0),
	(12, 'TUBE CARRES (100 CM)', 13.5, 'Tubes carrés 100 cm', 'tubes_rectangulaires_img.gif', NULL, NULL, 0, 0, 0, 0, 0, 'TUBCAR100CM', 0),
	(13, 'TUBES RECTANGULAIRES', 20, 'Tubes réctangulaires', 'tubes_rectangulaires_img.gif', NULL, NULL, 0, 0, 0, 0, 0, 'TUBRECP', 0),
	(14, 'BARRES RONDES (PLEINES)', 23.7, 'Barres rondes', 'barres_rondes_img.gif', NULL, NULL, 0, 0, 0, 0, 0, 'BARRONP', 0),
	(15, 'BARRE CARRES (PLEINES)', 22, 'Barres pleines', 'barres_carrees_img.gif', NULL, NULL, 0, 0, 0, 0, 0, 'BARCARP', 0);

-- Listage de la structure de table coupe_acier_final. societelivraison
CREATE TABLE IF NOT EXISTS `societelivraison` (
  `idLivraison` int NOT NULL AUTO_INCREMENT,
  `nomSocieteLivraison` varchar(200) NOT NULL,
  `siretLivraison` varchar(14) DEFAULT NULL,
  `telephone` varchar(13) NOT NULL,
  `email` varchar(200) NOT NULL,
  PRIMARY KEY (`idLivraison`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table coupe_acier_final.societelivraison : ~0 rows (environ)

-- Listage de la structure de table coupe_acier_final. stock
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table coupe_acier_final.stock : ~0 rows (environ)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
