package com.pb.nomorewait.repository;

import com.pb.nomorewait.domain.Queue;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data  repository for the Queue entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QueueRepository extends JpaRepository<Queue, Long> {

    Page<Queue> findAllByCommerceUserLogin(String login, Pageable pageable);

    Optional<Queue> findOneByIdAndCommerceUserLogin(Long id, String login);
}
