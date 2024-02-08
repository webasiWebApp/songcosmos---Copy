-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 08, 2024 at 04:25 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kiyannalk`
--

-- --------------------------------------------------------

--
-- Table structure for table `ctg_agriculture`
--

CREATE TABLE `ctg_agriculture` (
  `brand` varchar(255) DEFAULT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL,
  `post_ctg_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ctg_automobile`
--

CREATE TABLE `ctg_automobile` (
  `brand` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `condition` varchar(255) DEFAULT NULL,
  `fuel_type` varchar(255) DEFAULT NULL,
  `year_of_manufac` varchar(255) DEFAULT NULL,
  `miliage` varchar(255) DEFAULT NULL,
  `eng_capasity` varchar(255) DEFAULT NULL,
  `transmission` varchar(255) DEFAULT NULL,
  `body_type` varchar(255) DEFAULT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL,
  `post_ctg_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ctg_beauty`
--

CREATE TABLE `ctg_beauty` (
  `brand` varchar(255) DEFAULT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL,
  `post_ctg_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ctg_collectible_art`
--

CREATE TABLE `ctg_collectible_art` (
  `brand` varchar(255) DEFAULT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL,
  `post_ctg_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ctg_entertainment`
--

CREATE TABLE `ctg_entertainment` (
  `brand` varchar(255) DEFAULT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL,
  `post_ctg_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ctg_equipment`
--

CREATE TABLE `ctg_equipment` (
  `brand` varchar(255) DEFAULT NULL,
  `condition` varchar(255) DEFAULT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL,
  `post_ctg_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ctg_fashion`
--

CREATE TABLE `ctg_fashion` (
  `brand` varchar(255) DEFAULT NULL,
  `condition` varchar(255) DEFAULT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL,
  `post_ctg_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ctg_food`
--

CREATE TABLE `ctg_food` (
  `brand` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL,
  `post_ctg_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ctg_gardens`
--

CREATE TABLE `ctg_gardens` (
  `brand` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL,
  `post_ctg_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ctg_home`
--

CREATE TABLE `ctg_home` (
  `brand` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL,
  `post_ctg_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ctg_invesment`
--

CREATE TABLE `ctg_invesment` (
  `brand` varchar(255) DEFAULT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL,
  `post_ctg_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ctg_music`
--

CREATE TABLE `ctg_music` (
  `brand` varchar(255) DEFAULT NULL,
  `condition` varchar(255) DEFAULT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL,
  `post_ctg_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ctg_music`
--

INSERT INTO `ctg_music` (`brand`, `condition`, `post_id`, `post_ctg_id`) VALUES
('yamaha', 'used', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `ctg_pets`
--

CREATE TABLE `ctg_pets` (
  `brand` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL,
  `post_ctg_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ctg_power`
--

CREATE TABLE `ctg_power` (
  `brand` varchar(255) DEFAULT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL,
  `post_ctg_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ctg_property`
--

CREATE TABLE `ctg_property` (
  `size` varchar(255) DEFAULT NULL,
  `address` longtext DEFAULT NULL,
  `payment_type` varchar(255) DEFAULT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL,
  `post_ctg_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ctg_service`
--

CREATE TABLE `ctg_service` (
  `brand` varchar(255) DEFAULT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL,
  `post_ctg_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ctg_sport`
--

CREATE TABLE `ctg_sport` (
  `brand` varchar(255) DEFAULT NULL,
  `condition` varchar(255) DEFAULT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL,
  `post_ctg_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ctg_tech`
--

CREATE TABLE `ctg_tech` (
  `brand` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `feature` varchar(255) DEFAULT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL,
  `post_ctg_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `favs`
--

CREATE TABLE `favs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_01_15_171044_create_notices_table', 1),
(6, '2024_01_15_174107_create_posts_table', 1),
(7, '2024_01_15_175137_create_categories_table', 1),
(8, '2024_02_04_184941_create_post_table', 2),
(9, '2024_02_04_185011_create_notice_table', 2),
(10, '2024_02_04_185103_create_ctg_tables', 3),
(11, '2024_02_07_061213_create_favourites_table', 4),
(12, '2024_02_07_175735_create_favs_table', 5);

-- --------------------------------------------------------

--
-- Table structure for table `notices`
--

CREATE TABLE `notices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `notice_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `contact_detail` varchar(255) NOT NULL,
  `images` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `notice_ctg_id` bigint(20) UNSIGNED NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notices`
--

INSERT INTO `notices` (`id`, `notice_id`, `title`, `description`, `contact_detail`, `images`, `created_at`, `updated_at`, `notice_ctg_id`, `status`) VALUES
(9, 'notice3', 'Blood donation program - negambo', 'blood donation - homagama', '454454544545', '[\'https://www.cpsmumbai.org/Uploads/2762023161833920.png\']', '0000-00-00 00:00:00', '2024-02-06 22:10:28', 1, 0),
(10, 'notice4', 'I like helping plant trees as volunteer', 'I like help for plant trees as a volunteer', '555555555555', '[\'https://www.cpsmumbai.org/Uploads/2762023161833920.png\']', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2, 0),
(11, 'notice5', 'I like helping for clean beach', 'I like helping to clean beach around Matara', '666666666', '[\'https://www.cpsmumbai.org/Uploads/2762023161833920.png\']', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2, 0),
(12, 'notice6', 'I have 500 tea plant for free', 'I have 500 tea plant for free', '08940540 04545', '[\'https://www.cpsmumbai.org/Uploads/2762023161833920.png\']', '2024-02-05 04:27:48', '2024-02-05 04:27:48', 1, 0),
(14, 'notice7', 'I have 500 coconut plant for free', 'I have 500 cocunut plant for free', '08940540 04545', '[\'https://www.cpsmumbai.org/Uploads/2762023161833920.png\']', '2024-02-05 04:30:11', '2024-02-05 04:30:11', 1, 0),
(15, 'notice8', 'blood donation - homagama', 'blood donation - homagama', '111111111111', '[\'https://www.cpsmumbai.org/Uploads/2762023161833920.png\']', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `notice_categories`
--

CREATE TABLE `notice_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `notice_ctg_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notice_categories`
--

INSERT INTO `notice_categories` (`id`, `notice_ctg_id`, `name`) VALUES
(1, 'nctg01', 'charity'),
(2, 'nctg2', 'volunteer');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `post_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `contact_detail` varchar(255) NOT NULL,
  `images` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `negotiable` tinyint(1) NOT NULL,
  `pay_status` tinyint(1) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `post_ctg_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `post_id`, `title`, `description`, `contact_detail`, `images`, `location`, `price`, `negotiable`, `pay_status`, `status`, `created_at`, `updated_at`, `post_ctg_id`) VALUES
(1, 'post1', 'Mouthogen for sell', 'Mouthogen for sell', '55555555555555555', '[\"45454545\"]', 'kandy', '5000', 1, 0, 0, '2024-02-07 07:00:00', '2024-02-07 07:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `post_categories`
--

CREATE TABLE `post_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `post_ctg_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `post_categories`
--

INSERT INTO `post_categories` (`id`, `post_ctg_id`, `name`) VALUES
(1, 'postCtg1', 'music instrument');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'praveen', 'praveen@gmail.com', '2024-02-07 07:00:00', '232323232323232323232323', '232323232323232323232323', '2024-02-07 07:00:00', '2024-02-07 07:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ctg_agriculture`
--
ALTER TABLE `ctg_agriculture`
  ADD PRIMARY KEY (`post_ctg_id`,`post_id`),
  ADD KEY `ctg_agriculture_post_id_foreign` (`post_id`);

--
-- Indexes for table `ctg_automobile`
--
ALTER TABLE `ctg_automobile`
  ADD PRIMARY KEY (`post_ctg_id`,`post_id`),
  ADD KEY `ctg_automobile_post_id_foreign` (`post_id`);

--
-- Indexes for table `ctg_beauty`
--
ALTER TABLE `ctg_beauty`
  ADD PRIMARY KEY (`post_ctg_id`,`post_id`),
  ADD KEY `ctg_beauty_post_id_foreign` (`post_id`);

--
-- Indexes for table `ctg_collectible_art`
--
ALTER TABLE `ctg_collectible_art`
  ADD PRIMARY KEY (`post_ctg_id`,`post_id`),
  ADD KEY `ctg_collectible_art_post_id_foreign` (`post_id`);

--
-- Indexes for table `ctg_entertainment`
--
ALTER TABLE `ctg_entertainment`
  ADD PRIMARY KEY (`post_ctg_id`,`post_id`),
  ADD KEY `ctg_entertainment_post_id_foreign` (`post_id`);

--
-- Indexes for table `ctg_equipment`
--
ALTER TABLE `ctg_equipment`
  ADD PRIMARY KEY (`post_ctg_id`,`post_id`),
  ADD KEY `ctg_equipment_post_id_foreign` (`post_id`);

--
-- Indexes for table `ctg_fashion`
--
ALTER TABLE `ctg_fashion`
  ADD PRIMARY KEY (`post_ctg_id`,`post_id`),
  ADD KEY `ctg_fashion_post_id_foreign` (`post_id`);

--
-- Indexes for table `ctg_food`
--
ALTER TABLE `ctg_food`
  ADD PRIMARY KEY (`post_ctg_id`,`post_id`),
  ADD KEY `ctg_food_post_id_foreign` (`post_id`);

--
-- Indexes for table `ctg_gardens`
--
ALTER TABLE `ctg_gardens`
  ADD PRIMARY KEY (`post_ctg_id`,`post_id`),
  ADD KEY `ctg_gardens_post_id_foreign` (`post_id`);

--
-- Indexes for table `ctg_home`
--
ALTER TABLE `ctg_home`
  ADD PRIMARY KEY (`post_ctg_id`,`post_id`),
  ADD KEY `ctg_home_post_id_foreign` (`post_id`);

--
-- Indexes for table `ctg_invesment`
--
ALTER TABLE `ctg_invesment`
  ADD PRIMARY KEY (`post_ctg_id`,`post_id`),
  ADD KEY `ctg_invesment_post_id_foreign` (`post_id`);

--
-- Indexes for table `ctg_music`
--
ALTER TABLE `ctg_music`
  ADD PRIMARY KEY (`post_ctg_id`,`post_id`),
  ADD KEY `ctg_music_post_id_foreign` (`post_id`);

--
-- Indexes for table `ctg_pets`
--
ALTER TABLE `ctg_pets`
  ADD PRIMARY KEY (`post_ctg_id`,`post_id`),
  ADD KEY `ctg_pets_post_id_foreign` (`post_id`);

--
-- Indexes for table `ctg_power`
--
ALTER TABLE `ctg_power`
  ADD PRIMARY KEY (`post_ctg_id`,`post_id`),
  ADD KEY `ctg_power_post_id_foreign` (`post_id`);

--
-- Indexes for table `ctg_property`
--
ALTER TABLE `ctg_property`
  ADD PRIMARY KEY (`post_ctg_id`,`post_id`),
  ADD KEY `ctg_property_post_id_foreign` (`post_id`);

--
-- Indexes for table `ctg_service`
--
ALTER TABLE `ctg_service`
  ADD PRIMARY KEY (`post_ctg_id`,`post_id`),
  ADD KEY `ctg_service_post_id_foreign` (`post_id`);

--
-- Indexes for table `ctg_sport`
--
ALTER TABLE `ctg_sport`
  ADD PRIMARY KEY (`post_ctg_id`,`post_id`),
  ADD KEY `ctg_sport_post_id_foreign` (`post_id`);

--
-- Indexes for table `ctg_tech`
--
ALTER TABLE `ctg_tech`
  ADD PRIMARY KEY (`post_ctg_id`,`post_id`),
  ADD KEY `ctg_tech_post_id_foreign` (`post_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `favs`
--
ALTER TABLE `favs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `favs_user_id_post_id_unique` (`user_id`,`post_id`),
  ADD KEY `favs_post_id_foreign` (`post_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notices`
--
ALTER TABLE `notices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `notices_notice_id_unique` (`notice_id`),
  ADD KEY `notices_notice_ctg_id_foreign` (`notice_ctg_id`);

--
-- Indexes for table `notice_categories`
--
ALTER TABLE `notice_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `notice_categories_notice_ctg_id_unique` (`notice_ctg_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `posts_post_id_unique` (`post_id`),
  ADD KEY `posts_post_ctg_id_foreign` (`post_ctg_id`);

--
-- Indexes for table `post_categories`
--
ALTER TABLE `post_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `post_categories_post_ctg_id_unique` (`post_ctg_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `favs`
--
ALTER TABLE `favs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `notices`
--
ALTER TABLE `notices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `notice_categories`
--
ALTER TABLE `notice_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `post_categories`
--
ALTER TABLE `post_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ctg_agriculture`
--
ALTER TABLE `ctg_agriculture`
  ADD CONSTRAINT `ctg_agriculture_post_ctg_id_foreign` FOREIGN KEY (`post_ctg_id`) REFERENCES `post_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ctg_agriculture_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ctg_automobile`
--
ALTER TABLE `ctg_automobile`
  ADD CONSTRAINT `ctg_automobile_post_ctg_id_foreign` FOREIGN KEY (`post_ctg_id`) REFERENCES `post_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ctg_automobile_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ctg_beauty`
--
ALTER TABLE `ctg_beauty`
  ADD CONSTRAINT `ctg_beauty_post_ctg_id_foreign` FOREIGN KEY (`post_ctg_id`) REFERENCES `post_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ctg_beauty_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ctg_collectible_art`
--
ALTER TABLE `ctg_collectible_art`
  ADD CONSTRAINT `ctg_collectible_art_post_ctg_id_foreign` FOREIGN KEY (`post_ctg_id`) REFERENCES `post_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ctg_collectible_art_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ctg_entertainment`
--
ALTER TABLE `ctg_entertainment`
  ADD CONSTRAINT `ctg_entertainment_post_ctg_id_foreign` FOREIGN KEY (`post_ctg_id`) REFERENCES `post_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ctg_entertainment_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ctg_equipment`
--
ALTER TABLE `ctg_equipment`
  ADD CONSTRAINT `ctg_equipment_post_ctg_id_foreign` FOREIGN KEY (`post_ctg_id`) REFERENCES `post_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ctg_equipment_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ctg_fashion`
--
ALTER TABLE `ctg_fashion`
  ADD CONSTRAINT `ctg_fashion_post_ctg_id_foreign` FOREIGN KEY (`post_ctg_id`) REFERENCES `post_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ctg_fashion_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ctg_food`
--
ALTER TABLE `ctg_food`
  ADD CONSTRAINT `ctg_food_post_ctg_id_foreign` FOREIGN KEY (`post_ctg_id`) REFERENCES `post_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ctg_food_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ctg_gardens`
--
ALTER TABLE `ctg_gardens`
  ADD CONSTRAINT `ctg_gardens_post_ctg_id_foreign` FOREIGN KEY (`post_ctg_id`) REFERENCES `post_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ctg_gardens_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ctg_home`
--
ALTER TABLE `ctg_home`
  ADD CONSTRAINT `ctg_home_post_ctg_id_foreign` FOREIGN KEY (`post_ctg_id`) REFERENCES `post_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ctg_home_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ctg_invesment`
--
ALTER TABLE `ctg_invesment`
  ADD CONSTRAINT `ctg_invesment_post_ctg_id_foreign` FOREIGN KEY (`post_ctg_id`) REFERENCES `post_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ctg_invesment_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ctg_music`
--
ALTER TABLE `ctg_music`
  ADD CONSTRAINT `ctg_music_post_ctg_id_foreign` FOREIGN KEY (`post_ctg_id`) REFERENCES `post_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ctg_music_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ctg_pets`
--
ALTER TABLE `ctg_pets`
  ADD CONSTRAINT `ctg_pets_post_ctg_id_foreign` FOREIGN KEY (`post_ctg_id`) REFERENCES `post_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ctg_pets_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ctg_power`
--
ALTER TABLE `ctg_power`
  ADD CONSTRAINT `ctg_power_post_ctg_id_foreign` FOREIGN KEY (`post_ctg_id`) REFERENCES `post_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ctg_power_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ctg_property`
--
ALTER TABLE `ctg_property`
  ADD CONSTRAINT `ctg_property_post_ctg_id_foreign` FOREIGN KEY (`post_ctg_id`) REFERENCES `post_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ctg_property_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ctg_service`
--
ALTER TABLE `ctg_service`
  ADD CONSTRAINT `ctg_service_post_ctg_id_foreign` FOREIGN KEY (`post_ctg_id`) REFERENCES `post_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ctg_service_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ctg_sport`
--
ALTER TABLE `ctg_sport`
  ADD CONSTRAINT `ctg_sport_post_ctg_id_foreign` FOREIGN KEY (`post_ctg_id`) REFERENCES `post_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ctg_sport_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ctg_tech`
--
ALTER TABLE `ctg_tech`
  ADD CONSTRAINT `ctg_tech_post_ctg_id_foreign` FOREIGN KEY (`post_ctg_id`) REFERENCES `post_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ctg_tech_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `favs`
--
ALTER TABLE `favs`
  ADD CONSTRAINT `favs_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notices`
--
ALTER TABLE `notices`
  ADD CONSTRAINT `notices_notice_ctg_id_foreign` FOREIGN KEY (`notice_ctg_id`) REFERENCES `notice_categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_post_ctg_id_foreign` FOREIGN KEY (`post_ctg_id`) REFERENCES `post_categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
