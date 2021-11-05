--
-- Database: `test`
--
--
-- Table structure for table `assisteds`
--
BEGIN;

CREATE TABLE `assisteds` (
  `id` int(11) NOT NULL,
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
  `occupation` text NOT NULL,
  `national_identity` text NOT NULL,
  `active` tinyint(4) NOT NULL,
  `additional_information` text NOT NULL,
  `photo` text NOT NULL,
  `benefits` text NOT NULL,
  `social_identification_number` text NOT NULL,
  `organization_id` int(11) NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `calendar`
--

CREATE TABLE `calendar` (
  `id` int(11) NOT NULL,
  `dayOfWeek` enum('monday','tuesday','wednesday','thursday','friday','saturday','sunday') NOT NULL DEFAULT 'monday',
  `start_hour` text NOT NULL,
  `end_hour` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `organization_id` int(11) DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `evolution_records`
--

CREATE TABLE `evolution_records` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `status` enum('pending','done','refused') NOT NULL DEFAULT 'pending',
  `weight` double NOT NULL,
  `height` double NOT NULL,
  `report` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `assisted_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `need_speciality`
--

CREATE TABLE `need_speciality` (
  `id` int(11) NOT NULL,
  `attendance_id` int(11) NOT NULL,
  `speciality_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `organization`
--

CREATE TABLE `organization` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `domain` text NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `professional_attendances`
--

CREATE TABLE `professional_attendances` (
  `id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `result` text NOT NULL,
  `quantify` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `evolution_record_id` int(11) NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `relateds`
--

CREATE TABLE `relateds` (
  `id` int(11) NOT NULL,
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
  `assisted_id` int(11) NOT NULL,
  `organization_id` int(11) DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `school_request`
--

CREATE TABLE `school_request` (
  `id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `assisted_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `response_date` date NOT NULL,
  `status` enum('pending','done','refused') NOT NULL DEFAULT 'pending'
);

-- --------------------------------------------------------

--
-- Table structure for table `speciality`
--

CREATE TABLE `speciality` (
  `id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `name_speciality` text NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `specialties`
--

CREATE TABLE `specialties` (
  `id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `speciality_id` int(11) NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `transport_requests`
--

CREATE TABLE `transport_requests` (
  `id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `response_date` datetime NOT NULL,
  `status` enum('pending','done','refused') NOT NULL DEFAULT 'pending',
  `assisted_id` int(11) NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `admin_role` enum('admin','member','owner') NOT NULL DEFAULT 'member',
  `user_role` enum('secretary','profissional','social-assistence') NOT NULL DEFAULT 'profissional',
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
  `organization_id` int(11) NOT NULL
);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assisteds`
--
ALTER TABLE `assisteds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_a362354f6a7664fbfa304bae9dc` (`organization_id`);

--
-- Indexes for table `calendar`
--
ALTER TABLE `calendar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_e19fb6bccd41688d5956652baf5` (`user_id`),
  ADD KEY `FK_c9bda93794b396ae58f600a2271` (`organization_id`);

--
-- Indexes for table `evolution_records`
--
ALTER TABLE `evolution_records`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_a7efddc1e37ed1627d2b8147992` (`user_id`),
  ADD KEY `FK_5f1c9bc42f7c7fcbf3cfab5ddc8` (`assisted_id`),
  ADD KEY `FK_3d1c690074c3c3b8daae2bf2d37` (`organization_id`);

--
-- Indexes for table `need_speciality`
--
ALTER TABLE `need_speciality`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_a9770f90a919265ad9e0d1d394e` (`organization_id`),
  ADD KEY `FK_6d0148504cf6af3e6b28d7f737a` (`attendance_id`);

--
-- Indexes for table `organization`
--
ALTER TABLE `organization`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `professional_attendances`
--
ALTER TABLE `professional_attendances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_6af466a7010751d97c83d7465d6` (`user_id`),
  ADD KEY `FK_447fc5d31475471446e65b85c93` (`evolution_record_id`),
  ADD KEY `FK_38ae1d44b9e365aba62d514b2de` (`organization_id`);

--
-- Indexes for table `relateds`
--
ALTER TABLE `relateds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_8f59b5bfb571110eaab608ef1a8` (`assisted_id`),
  ADD KEY `FK_d7f14d65d40fd07f57612a8f176` (`organization_id`);

--
-- Indexes for table `school_request`
--
ALTER TABLE `school_request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_fe5223560048634717a599a4aac` (`assisted_id`),
  ADD KEY `FK_525eab1934aa1e8559b18504bd8` (`organization_id`);

--
-- Indexes for table `speciality`
--
ALTER TABLE `speciality`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_0b36dc19976c2e57efb2810335f` (`organization_id`);

--
-- Indexes for table `specialties`
--
ALTER TABLE `specialties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_4dc897848bdedda34f758d24c5a` (`speciality_id`),
  ADD KEY `FK_a86017316bf63fee604b7ec2523` (`organization_id`);

--
-- Indexes for table `transport_requests`
--
ALTER TABLE `transport_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_22b044e43776f00f47d6a1d1b0b` (`organization_id`),
  ADD KEY `FK_1616d50e17c908356a12d68ce98` (`assisted_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_21a659804ed7bf61eb91688dea7` (`organization_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assisteds`
--
ALTER TABLE `assisteds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `calendar`
--
ALTER TABLE `calendar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `evolution_records`
--
ALTER TABLE `evolution_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `need_speciality`
--
ALTER TABLE `need_speciality`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `organization`
--
ALTER TABLE `organization`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `professional_attendances`
--
ALTER TABLE `professional_attendances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `relateds`
--
ALTER TABLE `relateds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `school_request`
--
ALTER TABLE `school_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `speciality`
--
ALTER TABLE `speciality`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `specialties`
--
ALTER TABLE `specialties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transport_requests`
--
ALTER TABLE `transport_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assisteds`
--
ALTER TABLE `assisteds`
  ADD CONSTRAINT `FK_a362354f6a7664fbfa304bae9dc` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON UPDATE NO ACTION;

--
-- Constraints for table `calendar`
--
ALTER TABLE `calendar`
  ADD CONSTRAINT `FK_c9bda93794b396ae58f600a2271` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_e19fb6bccd41688d5956652baf5` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `evolution_records`
--
ALTER TABLE `evolution_records`
  ADD CONSTRAINT `FK_3d1c690074c3c3b8daae2bf2d37` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_5f1c9bc42f7c7fcbf3cfab5ddc8` FOREIGN KEY (`assisted_id`) REFERENCES `assisteds` (`id`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_a7efddc1e37ed1627d2b8147992` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE NO ACTION;

--
-- Constraints for table `need_speciality`
--
ALTER TABLE `need_speciality`
  ADD CONSTRAINT `FK_6d0148504cf6af3e6b28d7f737a` FOREIGN KEY (`attendance_id`) REFERENCES `professional_attendances` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_a9770f90a919265ad9e0d1d394e` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `professional_attendances`
--
ALTER TABLE `professional_attendances`
  ADD CONSTRAINT `FK_38ae1d44b9e365aba62d514b2de` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_447fc5d31475471446e65b85c93` FOREIGN KEY (`evolution_record_id`) REFERENCES `evolution_records` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_6af466a7010751d97c83d7465d6` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `relateds`
--
ALTER TABLE `relateds`
  ADD CONSTRAINT `FK_8f59b5bfb571110eaab608ef1a8` FOREIGN KEY (`assisted_id`) REFERENCES `assisteds` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_d7f14d65d40fd07f57612a8f176` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `school_request`
--
ALTER TABLE `school_request`
  ADD CONSTRAINT `FK_525eab1934aa1e8559b18504bd8` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_fe5223560048634717a599a4aac` FOREIGN KEY (`assisted_id`) REFERENCES `assisteds` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `speciality`
--
ALTER TABLE `speciality`
  ADD CONSTRAINT `FK_0b36dc19976c2e57efb2810335f` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `specialties`
--
ALTER TABLE `specialties`
  ADD CONSTRAINT `FK_4dc897848bdedda34f758d24c5a` FOREIGN KEY (`speciality_id`) REFERENCES `speciality` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_a86017316bf63fee604b7ec2523` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `transport_requests`
--
ALTER TABLE `transport_requests`
  ADD CONSTRAINT `FK_1616d50e17c908356a12d68ce98` FOREIGN KEY (`assisted_id`) REFERENCES `assisteds` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_22b044e43776f00f47d6a1d1b0b` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_21a659804ed7bf61eb91688dea7` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

COMMIT;
