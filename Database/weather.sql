
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
- --------------------------------------------------------

CREATE TABLE `his_user` (
  `ad_id` int(20) NOT NULL,
  `ad_fname` varchar(200) DEFAULT NULL,
  `ad_lname` varchar(200) DEFAULT NULL,
  `ad_email` varchar(200) DEFAULT NULL,
  `ad_pwd` varchar(200) DEFAULT NULL,
  `ad_dpic` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
--
-- Dumping data for table `his_user`
--
INSERT INTO `his_user` (`ad_id`, `ad_fname`, `ad_lname`, `ad_email`, `ad_pwd`, `ad_dpic`) VALUES
(1, 'System', 'Administrator', 'admin@mail.com', '4c7f5919e957f354d57243d37f223cf31e9e7181', 'doc-icon.png');
--
-- Indexes for table `his_user`
--
ALTER TABLE `his_user`
  ADD PRIMARY KEY (`ad_id`);
--
-- AUTO_INCREMENT for table `his_user`
--
ALTER TABLE `his_user`
  MODIFY `ad_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;