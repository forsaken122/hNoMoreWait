package com.pb.nomorewait.service;

import com.pb.nomorewait.domain.Commerce;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Commerce}.
 */
public interface CommerceService {

    /**
     * Save a commerce.
     *
     * @param commerce the entity to save.
     * @return the persisted entity.
     */
    Commerce save(Commerce commerce);

    /**
     * Get all the commerce.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Commerce> findAll(Pageable pageable);


    /**
     * Get the "id" commerce.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Commerce> findOne(Long id);

    /**
     * Delete the "id" commerce.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
