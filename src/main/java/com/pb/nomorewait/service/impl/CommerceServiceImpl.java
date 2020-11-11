package com.pb.nomorewait.service.impl;

import com.pb.nomorewait.service.CommerceService;
import com.pb.nomorewait.domain.Commerce;
import com.pb.nomorewait.repository.CommerceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Commerce}.
 */
@Service
@Transactional
public class CommerceServiceImpl implements CommerceService {

    private final Logger log = LoggerFactory.getLogger(CommerceServiceImpl.class);

    private final CommerceRepository commerceRepository;

    public CommerceServiceImpl(CommerceRepository commerceRepository) {
        this.commerceRepository = commerceRepository;
    }

    @Override
    public Commerce save(Commerce commerce) {
        log.debug("Request to save Commerce : {}", commerce);
        return commerceRepository.save(commerce);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Commerce> findAll(Pageable pageable) {
        log.debug("Request to get all Commerce");
        return commerceRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Commerce> findOne(Long id) {
        log.debug("Request to get Commerce : {}", id);
        return commerceRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Commerce : {}", id);
        commerceRepository.deleteById(id);
    }
}
