package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.DonationOrganization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationOrganizationRepository extends JpaRepository<DonationOrganization,Long> {
}
