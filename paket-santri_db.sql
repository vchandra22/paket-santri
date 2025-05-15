-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 15, 2025 at 02:48 PM
-- Server version: 8.0.42-0ubuntu0.24.04.1
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `paket-santri_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `asrama`
--

CREATE TABLE `asrama` (
  `id` bigint UNSIGNED NOT NULL,
  `nama_asrama` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gedung` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `asrama`
--

INSERT INTO `asrama` (`id`, `nama_asrama`, `gedung`, `created_at`, `updated_at`) VALUES
(1, 'Asrama Putra 1', 'Gedung A', '2025-05-15 04:07:00', '2025-05-15 04:07:00');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel_cache_spatie.permission.cache', 'a:3:{s:5:\"alias\";a:4:{s:1:\"a\";s:2:\"id\";s:1:\"b\";s:4:\"name\";s:1:\"c\";s:10:\"guard_name\";s:1:\"r\";s:5:\"roles\";}s:11:\"permissions\";a:38:{i:0;a:4:{s:1:\"a\";i:1;s:1:\"b\";s:11:\"user_create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:1;a:4:{s:1:\"a\";i:2;s:1:\"b\";s:9:\"user_edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:2;a:4:{s:1:\"a\";i:3;s:1:\"b\";s:9:\"user_view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:3;a:4:{s:1:\"a\";i:4;s:1:\"b\";s:11:\"user_delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:4;a:4:{s:1:\"a\";i:5;s:1:\"b\";s:11:\"role_create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:5;a:4:{s:1:\"a\";i:6;s:1:\"b\";s:9:\"role_edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:6;a:4:{s:1:\"a\";i:7;s:1:\"b\";s:9:\"role_view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:7;a:4:{s:1:\"a\";i:8;s:1:\"b\";s:11:\"role_delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:8;a:4:{s:1:\"a\";i:9;s:1:\"b\";s:17:\"permission_create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:9;a:4:{s:1:\"a\";i:10;s:1:\"b\";s:15:\"permission_edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:10;a:4:{s:1:\"a\";i:11;s:1:\"b\";s:15:\"permission_view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:11;a:4:{s:1:\"a\";i:12;s:1:\"b\";s:17:\"permission_delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:12;a:4:{s:1:\"a\";i:13;s:1:\"b\";s:13:\"santri_create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:13;a:4:{s:1:\"a\";i:14;s:1:\"b\";s:11:\"santri_view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:3;}}i:14;a:4:{s:1:\"a\";i:15;s:1:\"b\";s:11:\"santri_edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:15;a:4:{s:1:\"a\";i:16;s:1:\"b\";s:13:\"santri_delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:16;a:4:{s:1:\"a\";i:17;s:1:\"b\";s:13:\"asrama_create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:17;a:4:{s:1:\"a\";i:18;s:1:\"b\";s:11:\"asrama_view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:3;}}i:18;a:4:{s:1:\"a\";i:19;s:1:\"b\";s:11:\"asrama_edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:19;a:4:{s:1:\"a\";i:20;s:1:\"b\";s:13:\"asrama_delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:20;a:4:{s:1:\"a\";i:21;s:1:\"b\";s:13:\"asrama_access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:3;}}i:21;a:4:{s:1:\"a\";i:22;s:1:\"b\";s:13:\"santri_access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:3;}}i:22;a:4:{s:1:\"a\";i:23;s:1:\"b\";s:12:\"paket_create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:23;a:4:{s:1:\"a\";i:24;s:1:\"b\";s:10:\"paket_view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:3;}}i:24;a:4:{s:1:\"a\";i:25;s:1:\"b\";s:10:\"paket_edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:25;a:4:{s:1:\"a\";i:26;s:1:\"b\";s:12:\"paket_delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:26;a:4:{s:1:\"a\";i:27;s:1:\"b\";s:12:\"paket_access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:3;}}i:27;a:4:{s:1:\"a\";i:28;s:1:\"b\";s:15:\"kategori_create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:28;a:4:{s:1:\"a\";i:29;s:1:\"b\";s:13:\"kategori_view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:3;}}i:29;a:4:{s:1:\"a\";i:30;s:1:\"b\";s:13:\"kategori_edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:30;a:4:{s:1:\"a\";i:31;s:1:\"b\";s:15:\"kategori_delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:31;a:4:{s:1:\"a\";i:32;s:1:\"b\";s:15:\"kategori_access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:3;}}i:32;a:4:{s:1:\"a\";i:33;s:1:\"b\";s:12:\"paket_export\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:33;a:4:{s:1:\"a\";i:34;s:1:\"b\";s:11:\"user_access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:34;a:4:{s:1:\"a\";i:35;s:1:\"b\";s:11:\"role_access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:35;a:4:{s:1:\"a\";i:36;s:1:\"b\";s:17:\"permission_access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:36;a:4:{s:1:\"a\";i:37;s:1:\"b\";s:16:\"dashboard_access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:3;}}i:37;a:4:{s:1:\"a\";i:38;s:1:\"b\";s:13:\"santri_export\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}}s:5:\"roles\";a:2:{i:0;a:3:{s:1:\"a\";i:1;s:1:\"b\";s:5:\"admin\";s:1:\"c\";s:3:\"web\";}i:1;a:3:{s:1:\"a\";i:3;s:1:\"b\";s:4:\"user\";s:1:\"c\";s:3:\"web\";}}}', 1747404798),
('laravel_cache_test@example.com|127.0.0.1', 'i:1;', 1747317898),
('laravel_cache_test@example.com|127.0.0.1:timer', 'i:1747317898;', 1747317898);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kategori_paket`
--

CREATE TABLE `kategori_paket` (
  `id` bigint UNSIGNED NOT NULL,
  `nama_kategori` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kategori_paket`
--

INSERT INTO `kategori_paket` (`id`, `nama_kategori`, `created_at`, `updated_at`) VALUES
(1, 'Makanan Kering (Snack)', '2025-05-15 04:37:24', '2025-05-15 04:37:24'),
(2, 'Makanan Basah', '2025-05-15 04:37:33', '2025-05-15 04:37:33'),
(3, 'Non Makanan', '2025-05-15 04:37:39', '2025-05-15 04:37:39');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_05_13_071746_create_asrama_table', 1),
(5, '2025_05_13_071748_create_santri_table', 1),
(6, '2025_05_13_074009_create_kategori_paket_table', 1),
(7, '2025_05_13_074010_create_paket_table', 1),
(8, '2025_05_15_030835_create_permission_tables', 1);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(3, 'App\\Models\\User', 2);

-- --------------------------------------------------------

--
-- Table structure for table `paket`
--

CREATE TABLE `paket` (
  `id` bigint UNSIGNED NOT NULL,
  `nama_paket` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal_diterima` date NOT NULL,
  `kategori_paket_id` bigint UNSIGNED NOT NULL,
  `penerima_paket_nis` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `asrama_id` bigint UNSIGNED NOT NULL,
  `pengirim_paket` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isi_paket_disita` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status_paket` enum('diambil','belum diambil') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'belum diambil',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `paket`
--

INSERT INTO `paket` (`id`, `nama_paket`, `tanggal_diterima`, `kategori_paket_id`, `penerima_paket_nis`, `asrama_id`, `pengirim_paket`, `isi_paket_disita`, `status_paket`, `created_at`, `updated_at`) VALUES
(1, 'Onde Onde', '2025-05-05', 2, 'SP00314001', 1, 'Bambang', NULL, 'diambil', '2025-05-15 04:38:09', '2025-05-15 04:38:18'),
(2, 'Keripik Udang', '2025-05-07', 1, 'SP00314001', 1, 'Yudi', NULL, 'belum diambil', '2025-05-15 06:20:55', '2025-05-15 06:20:55'),
(3, 'Pakaian', '2025-05-12', 3, 'SP00314001', 1, 'Yudi', 'Pakaian tidak sesuai peraturan', 'belum diambil', '2025-05-15 06:30:37', '2025-05-15 07:36:00'),
(4, 'Abon Sapi', '2025-05-13', 1, 'SP00314001', 1, 'Yudi', NULL, 'belum diambil', '2025-05-15 06:31:01', '2025-05-15 06:31:01'),
(5, 'Keripik Tempe', '2025-05-12', 1, 'SP00314002', 1, 'Bambang', NULL, 'diambil', '2025-05-15 06:31:38', '2025-05-15 06:31:38');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'user_create', 'web', '2025-05-14 20:33:56', '2025-05-14 20:33:56'),
(2, 'user_edit', 'web', '2025-05-14 20:33:56', '2025-05-14 20:33:56'),
(3, 'user_view', 'web', '2025-05-14 20:33:56', '2025-05-14 20:33:56'),
(4, 'user_delete', 'web', '2025-05-14 20:33:56', '2025-05-14 20:33:56'),
(5, 'role_create', 'web', '2025-05-14 20:33:56', '2025-05-14 20:33:56'),
(6, 'role_edit', 'web', '2025-05-14 20:33:56', '2025-05-14 20:33:56'),
(7, 'role_view', 'web', '2025-05-14 20:33:56', '2025-05-14 20:33:56'),
(8, 'role_delete', 'web', '2025-05-14 20:33:56', '2025-05-14 20:33:56'),
(9, 'permission_create', 'web', '2025-05-14 20:33:56', '2025-05-14 20:33:56'),
(10, 'permission_edit', 'web', '2025-05-14 20:33:56', '2025-05-14 20:33:56'),
(11, 'permission_view', 'web', '2025-05-14 20:33:56', '2025-05-14 20:33:56'),
(12, 'permission_delete', 'web', '2025-05-14 20:33:56', '2025-05-14 20:33:56'),
(13, 'santri_create', 'web', '2025-05-14 23:15:16', '2025-05-14 23:15:16'),
(14, 'santri_view', 'web', '2025-05-15 03:35:09', '2025-05-15 03:35:09'),
(15, 'santri_edit', 'web', '2025-05-15 03:35:17', '2025-05-15 03:35:17'),
(16, 'santri_delete', 'web', '2025-05-15 03:35:34', '2025-05-15 03:35:34'),
(17, 'asrama_create', 'web', '2025-05-15 03:58:19', '2025-05-15 03:58:19'),
(18, 'asrama_view', 'web', '2025-05-15 03:58:31', '2025-05-15 03:58:31'),
(19, 'asrama_edit', 'web', '2025-05-15 03:58:41', '2025-05-15 03:58:41'),
(20, 'asrama_delete', 'web', '2025-05-15 03:58:53', '2025-05-15 03:58:53'),
(21, 'asrama_access', 'web', '2025-05-15 04:00:19', '2025-05-15 04:00:19'),
(22, 'santri_access', 'web', '2025-05-15 04:08:55', '2025-05-15 04:08:55'),
(23, 'paket_create', 'web', '2025-05-15 04:31:08', '2025-05-15 04:31:08'),
(24, 'paket_view', 'web', '2025-05-15 04:31:13', '2025-05-15 04:31:13'),
(25, 'paket_edit', 'web', '2025-05-15 04:31:18', '2025-05-15 04:31:18'),
(26, 'paket_delete', 'web', '2025-05-15 04:31:24', '2025-05-15 04:31:24'),
(27, 'paket_access', 'web', '2025-05-15 04:31:30', '2025-05-15 04:31:30'),
(28, 'kategori_create', 'web', '2025-05-15 04:31:41', '2025-05-15 04:33:53'),
(29, 'kategori_view', 'web', '2025-05-15 04:31:49', '2025-05-15 04:33:42'),
(30, 'kategori_edit', 'web', '2025-05-15 04:32:00', '2025-05-15 04:33:31'),
(31, 'kategori_delete', 'web', '2025-05-15 04:32:12', '2025-05-15 04:33:25'),
(32, 'kategori_access', 'web', '2025-05-15 04:32:24', '2025-05-15 04:33:20'),
(33, 'paket_export', 'web', '2025-05-15 04:42:23', '2025-05-15 04:42:23'),
(34, 'user_access', 'web', '2025-05-15 05:00:02', '2025-05-15 05:00:02'),
(35, 'role_access', 'web', '2025-05-15 05:00:18', '2025-05-15 05:00:18'),
(36, 'permission_access', 'web', '2025-05-15 05:00:26', '2025-05-15 05:00:26'),
(37, 'dashboard_access', 'web', '2025-05-15 05:00:33', '2025-05-15 05:00:33'),
(38, 'santri_export', 'web', '2025-05-15 07:12:48', '2025-05-15 07:12:48');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'web', '2025-05-14 20:33:56', '2025-05-14 20:33:56'),
(3, 'user', 'web', '2025-05-14 20:33:56', '2025-05-14 20:33:56');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 1),
(17, 1),
(18, 1),
(19, 1),
(20, 1),
(21, 1),
(22, 1),
(23, 1),
(24, 1),
(25, 1),
(26, 1),
(27, 1),
(28, 1),
(29, 1),
(30, 1),
(31, 1),
(32, 1),
(33, 1),
(34, 1),
(35, 1),
(36, 1),
(37, 1),
(38, 1),
(14, 3),
(18, 3),
(21, 3),
(22, 3),
(24, 3),
(27, 3),
(29, 3),
(32, 3),
(37, 3);

-- --------------------------------------------------------

--
-- Table structure for table `santri`
--

CREATE TABLE `santri` (
  `nis` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_santri` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `asrama_id` bigint UNSIGNED NOT NULL,
  `total_paket_diterima` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `santri`
--

INSERT INTO `santri` (`nis`, `nama_santri`, `alamat`, `asrama_id`, `total_paket_diterima`, `created_at`, `updated_at`) VALUES
('SP00314001', 'Budi Sungkono', 'Jl. Pahlawan No. 10, Klojen, Kota Malang, Jawa Timur', 1, 1, '2025-05-15 04:37:06', '2025-05-15 04:39:02'),
('SP00314002', 'Jean Smith', 'Jl. Harapan Bangsa, No.14, Klojen, Malang, Jawa Timur', 1, 0, '2025-05-15 05:06:24', '2025-05-15 05:06:24');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('WljfQFTIsSqcNHpN3SIb6VkE60bmhujDcxCpGEOe', 1, '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiTlgxNFcwYXY0OG9XMGtheldRUjdKeE9SRUZOTWJES3BlYXQ0WkZVbyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjg6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zYW50cmkiO31zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=', 1747318589),
('XG07N5cBd84RaWbpptVRa8sGNrm3o9CprZj8Zuuj', 1, '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiZUtiWkxGRkdoNE5RRThCbTZsd2pCSUVRTGRjM1FEWnp1eXVVOTZrZyI7czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjMzOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYWRtaW4vdXNlcnMiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=', 1747320319);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@example.com', NULL, '$2y$12$h7DAiO/8ISf8mJjVOPQPzOs1E1uX6es9kJzDYOgpYSSGT4Tpm5fyO', 'RilfXhoruWdfsPeDrGet6tUCZrsaOxr2nrnNJuP3a2LIiIO9LQwzcwHHu9C1', '2025-05-14 20:33:56', '2025-05-15 06:52:36'),
(2, 'John Doe', 'johndoe@example.com', NULL, '$2y$12$ArYPRYBkr1LEGkv1XxoABOzsF8M5UrPn8EgXI1US11vkwFYOB4CN6', NULL, '2025-05-14 21:33:53', '2025-05-14 21:33:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `asrama`
--
ALTER TABLE `asrama`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kategori_paket`
--
ALTER TABLE `kategori_paket`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `paket`
--
ALTER TABLE `paket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paket_kategori_paket_id_foreign` (`kategori_paket_id`),
  ADD KEY `paket_asrama_id_foreign` (`asrama_id`),
  ADD KEY `paket_penerima_paket_nis_foreign` (`penerima_paket_nis`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `santri`
--
ALTER TABLE `santri`
  ADD PRIMARY KEY (`nis`),
  ADD KEY `santri_asrama_id_foreign` (`asrama_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

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
-- AUTO_INCREMENT for table `asrama`
--
ALTER TABLE `asrama`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kategori_paket`
--
ALTER TABLE `kategori_paket`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `paket`
--
ALTER TABLE `paket`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `paket`
--
ALTER TABLE `paket`
  ADD CONSTRAINT `paket_asrama_id_foreign` FOREIGN KEY (`asrama_id`) REFERENCES `asrama` (`id`),
  ADD CONSTRAINT `paket_kategori_paket_id_foreign` FOREIGN KEY (`kategori_paket_id`) REFERENCES `kategori_paket` (`id`),
  ADD CONSTRAINT `paket_penerima_paket_nis_foreign` FOREIGN KEY (`penerima_paket_nis`) REFERENCES `santri` (`nis`);

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `santri`
--
ALTER TABLE `santri`
  ADD CONSTRAINT `santri_asrama_id_foreign` FOREIGN KEY (`asrama_id`) REFERENCES `asrama` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
