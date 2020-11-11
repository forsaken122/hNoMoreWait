package com.pb.nomorewait.repository;

import com.pb.nomorewait.domain.Commerce;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Commerce entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommerceRepository extends JpaRepository<Commerce, Long> {
}
