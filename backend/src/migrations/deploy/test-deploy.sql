-- MariaDB dump 10.19  Distrib 10.4.21-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	10.4.21-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `assisteds`
--

DROP TABLE IF EXISTS `assisteds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assisteds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `birthday` date NOT NULL,
  `gender` enum('male','female','not-informed') NOT NULL DEFAULT 'not-informed',
  `identification` text NOT NULL,
  `general_registration` text NOT NULL,
  `issue` date NOT NULL,
  `issuer` text NOT NULL,
  `zip_code` text NOT NULL,
  `address` text NOT NULL,
  `number` text NOT NULL,
  `neighborhood` text NOT NULL,
  `city` text NOT NULL,
  `state` text NOT NULL,
  `phone` text NOT NULL,
  `has_benefits` tinyint(4) NOT NULL,
  `scholarity` enum('elementary-school','high_school','university-school','masters-degree','doctorate-degree') NOT NULL DEFAULT 'elementary-school',
  `naturalness` text NOT NULL,
  `nationality` text NOT NULL,
  `occupation` text DEFAULT NULL,
  `national_identity` text NOT NULL,
  `active` tinyint(4) NOT NULL,
  `additional_information` text DEFAULT NULL,
  `photo` text DEFAULT NULL,
  `benefits` text DEFAULT NULL,
  `social_identification_number` text NOT NULL,
  `organization_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a362354f6a7664fbfa304bae9dc` (`organization_id`),
  CONSTRAINT `FK_a362354f6a7664fbfa304bae9dc` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assisteds`
--

LOCK TABLES `assisteds` WRITE;
/*!40000 ALTER TABLE `assisteds` DISABLE KEYS */;
/*!40000 ALTER TABLE `assisteds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calendar`
--

DROP TABLE IF EXISTS `calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `calendar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dayOfWeek` enum('monday','tuesday','wednesday','thursday','friday','saturday','sunday') NOT NULL DEFAULT 'monday',
  `start_hour` text NOT NULL,
  `end_hour` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e19fb6bccd41688d5956652baf5` (`user_id`),
  KEY `FK_c9bda93794b396ae58f600a2271` (`organization_id`),
  CONSTRAINT `FK_c9bda93794b396ae58f600a2271` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_e19fb6bccd41688d5956652baf5` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendar`
--

LOCK TABLES `calendar` WRITE;
/*!40000 ALTER TABLE `calendar` DISABLE KEYS */;
/*!40000 ALTER TABLE `calendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evolution_records`
--

DROP TABLE IF EXISTS `evolution_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evolution_records` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `status` enum('pending','done','refused') NOT NULL DEFAULT 'pending',
  `weight` double NOT NULL,
  `height` double NOT NULL,
  `report` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `assisted_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a7efddc1e37ed1627d2b8147992` (`user_id`),
  KEY `FK_5f1c9bc42f7c7fcbf3cfab5ddc8` (`assisted_id`),
  KEY `FK_3d1c690074c3c3b8daae2bf2d37` (`organization_id`),
  CONSTRAINT `FK_3d1c690074c3c3b8daae2bf2d37` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON UPDATE NO ACTION,
  CONSTRAINT `FK_5f1c9bc42f7c7fcbf3cfab5ddc8` FOREIGN KEY (`assisted_id`) REFERENCES `assisteds` (`id`) ON UPDATE NO ACTION,
  CONSTRAINT `FK_a7efddc1e37ed1627d2b8147992` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evolution_records`
--

LOCK TABLES `evolution_records` WRITE;
/*!40000 ALTER TABLE `evolution_records` DISABLE KEYS */;
/*!40000 ALTER TABLE `evolution_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `need_speciality`
--

DROP TABLE IF EXISTS `need_speciality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `need_speciality` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `evolution_record_id` int(11) NOT NULL,
  `speciality_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a9770f90a919265ad9e0d1d394e` (`organization_id`),
  KEY `FK_e499cdda7df6614e97af68ac630` (`evolution_record_id`),
  KEY `FK_27400eb1daac61f9f030fdce412` (`speciality_id`),
  CONSTRAINT `FK_27400eb1daac61f9f030fdce412` FOREIGN KEY (`speciality_id`) REFERENCES `speciality` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_a9770f90a919265ad9e0d1d394e` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_e499cdda7df6614e97af68ac630` FOREIGN KEY (`evolution_record_id`) REFERENCES `evolution_records` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `need_speciality`
--

LOCK TABLES `need_speciality` WRITE;
/*!40000 ALTER TABLE `need_speciality` DISABLE KEYS */;
/*!40000 ALTER TABLE `need_speciality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organization`
--

DROP TABLE IF EXISTS `organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organization` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `domain` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organization`
--

LOCK TABLES `organization` WRITE;
/*!40000 ALTER TABLE `organization` DISABLE KEYS */;
/*!40000 ALTER TABLE `organization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professional_attendances`
--

DROP TABLE IF EXISTS `professional_attendances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `professional_attendances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `result` text NOT NULL,
  `quantify` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `evolution_record_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_6af466a7010751d97c83d7465d6` (`user_id`),
  KEY `FK_447fc5d31475471446e65b85c93` (`evolution_record_id`),
  KEY `FK_38ae1d44b9e365aba62d514b2de` (`organization_id`),
  CONSTRAINT `FK_38ae1d44b9e365aba62d514b2de` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_447fc5d31475471446e65b85c93` FOREIGN KEY (`evolution_record_id`) REFERENCES `evolution_records` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_6af466a7010751d97c83d7465d6` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professional_attendances`
--

LOCK TABLES `professional_attendances` WRITE;
/*!40000 ALTER TABLE `professional_attendances` DISABLE KEYS */;
/*!40000 ALTER TABLE `professional_attendances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relateds`
--

DROP TABLE IF EXISTS `relateds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relateds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `birthday` date NOT NULL,
  `gender` enum('male','female','not-informed') NOT NULL DEFAULT 'not-informed',
  `civil_status` enum('single','married','divorced','widower','judicially-separated') NOT NULL DEFAULT 'single',
  `identification` text NOT NULL,
  `relationship` enum('couple','father','mother','father_in_low','mother_in_low','sibling','grandparent','step-parent','patchwork-family') NOT NULL DEFAULT 'mother',
  `general_registration` text NOT NULL,
  `issue` date NOT NULL,
  `issuer` text NOT NULL,
  `zip_code` text NOT NULL,
  `address` text NOT NULL,
  `number` text NOT NULL,
  `neighborhood` text NOT NULL,
  `city` text NOT NULL,
  `state` text NOT NULL,
  `phone` text NOT NULL,
  `naturalness` text NOT NULL,
  `nationality` text NOT NULL,
  `scholarity` enum('elementary-school','high_school','university-school','masters-degree','doctorate-degree') NOT NULL DEFAULT 'elementary-school',
  `revenue` float NOT NULL,
  `national_identity` text NOT NULL,
  `responsible` tinyint(4) NOT NULL,
  `professional_situation` text DEFAULT NULL,
  `occupation` text DEFAULT NULL,
  `assisted_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8f59b5bfb571110eaab608ef1a8` (`assisted_id`),
  KEY `FK_d7f14d65d40fd07f57612a8f176` (`organization_id`),
  CONSTRAINT `FK_8f59b5bfb571110eaab608ef1a8` FOREIGN KEY (`assisted_id`) REFERENCES `assisteds` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_d7f14d65d40fd07f57612a8f176` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relateds`
--

LOCK TABLES `relateds` WRITE;
/*!40000 ALTER TABLE `relateds` DISABLE KEYS */;
/*!40000 ALTER TABLE `relateds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `school_request`
--

DROP TABLE IF EXISTS `school_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `school_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_id` int(11) NOT NULL,
  `assisted_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `response_date` date NOT NULL,
  `observation` text DEFAULT NULL,
  `status` enum('pending','done','refused') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `FK_fe5223560048634717a599a4aac` (`assisted_id`),
  KEY `FK_525eab1934aa1e8559b18504bd8` (`organization_id`),
  CONSTRAINT `FK_525eab1934aa1e8559b18504bd8` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_fe5223560048634717a599a4aac` FOREIGN KEY (`assisted_id`) REFERENCES `assisteds` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school_request`
--

LOCK TABLES `school_request` WRITE;
/*!40000 ALTER TABLE `school_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `school_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `speciality`
--

DROP TABLE IF EXISTS `speciality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `speciality` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_id` int(11) NOT NULL,
  `name` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_0b36dc19976c2e57efb2810335f` (`organization_id`),
  CONSTRAINT `FK_0b36dc19976c2e57efb2810335f` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `speciality`
--

LOCK TABLES `speciality` WRITE;
/*!40000 ALTER TABLE `speciality` DISABLE KEYS */;
/*!40000 ALTER TABLE `speciality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialties`
--

DROP TABLE IF EXISTS `specialties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `specialties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `speciality_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_4dc897848bdedda34f758d24c5a` (`speciality_id`),
  KEY `FK_a86017316bf63fee604b7ec2523` (`organization_id`),
  KEY `FK_b4c840c0cf44e4c69c5499be8ca` (`user_id`),
  CONSTRAINT `FK_4dc897848bdedda34f758d24c5a` FOREIGN KEY (`speciality_id`) REFERENCES `speciality` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_a86017316bf63fee604b7ec2523` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_b4c840c0cf44e4c69c5499be8ca` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialties`
--

LOCK TABLES `specialties` WRITE;
/*!40000 ALTER TABLE `specialties` DISABLE KEYS */;
/*!40000 ALTER TABLE `specialties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transport_requests`
--

DROP TABLE IF EXISTS `transport_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transport_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `response_date` datetime NOT NULL,
  `status` enum('pending','done','refused') NOT NULL DEFAULT 'pending',
  `assisted_id` int(11) NOT NULL,
  `observation` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_22b044e43776f00f47d6a1d1b0b` (`organization_id`),
  KEY `FK_1616d50e17c908356a12d68ce98` (`assisted_id`),
  CONSTRAINT `FK_1616d50e17c908356a12d68ce98` FOREIGN KEY (`assisted_id`) REFERENCES `assisteds` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_22b044e43776f00f47d6a1d1b0b` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transport_requests`
--

LOCK TABLES `transport_requests` WRITE;
/*!40000 ALTER TABLE `transport_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `transport_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `admin_role` enum('admin','member','owner') NOT NULL DEFAULT 'member',
  `user_role` enum('secretary','professional','social-assistence') NOT NULL DEFAULT 'professional',
  `birthday` date NOT NULL,
  `gender` enum('male','female','not-informed') NOT NULL DEFAULT 'not-informed',
  `identification` text NOT NULL,
  `general_registration` text NOT NULL,
  `issue` date NOT NULL,
  `issuer` text NOT NULL,
  `zip_code` text NOT NULL,
  `address` text NOT NULL,
  `number` text NOT NULL,
  `neighborhood` text NOT NULL,
  `city` text NOT NULL,
  `state` text NOT NULL,
  `phone` text NOT NULL,
  `national_indentity` text NOT NULL,
  `organization_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_21a659804ed7bf61eb91688dea7` (`organization_id`),
  CONSTRAINT `FK_21a659804ed7bf61eb91688dea7` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-25 20:57:50
