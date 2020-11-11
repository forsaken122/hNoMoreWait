package com.pb.nomorewait.repository;

import com.pb.nomorewait.domain.Queue;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Queue entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QueueRepository extends JpaRepository<Queue, Long> {
}
