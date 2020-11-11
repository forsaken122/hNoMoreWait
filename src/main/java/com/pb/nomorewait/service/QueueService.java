package com.pb.nomorewait.service;

import com.pb.nomorewait.domain.Queue;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Queue}.
 */
public interface QueueService {

    /**
     * Save a queue.
     *
     * @param queue the entity to save.
     * @return the persisted entity.
     */
    Queue save(Queue queue);

    /**
     * Get all the queues.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Queue> findAll(Pageable pageable);


    /**
     * Get the "id" queue.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Queue> findOne(Long id);

    /**
     * Delete the "id" queue.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
