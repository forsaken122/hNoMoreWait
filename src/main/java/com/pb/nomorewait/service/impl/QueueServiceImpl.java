package com.pb.nomorewait.service.impl;

import com.pb.nomorewait.security.AuthoritiesConstants;
import com.pb.nomorewait.security.SecurityUtils;
import com.pb.nomorewait.service.QueueService;
import com.pb.nomorewait.domain.Queue;
import com.pb.nomorewait.repository.QueueRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Queue}.
 */
@Service
@Transactional
public class QueueServiceImpl implements QueueService {

    private final Logger log = LoggerFactory.getLogger(QueueServiceImpl.class);

    private final QueueRepository queueRepository;

    public QueueServiceImpl(QueueRepository queueRepository) {
        this.queueRepository = queueRepository;
    }

    @Override
    public Queue save(Queue queue) {
        log.debug("Request to save Queue : {}", queue);
        return queueRepository.save(queue);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Queue> findAll(Pageable pageable) {
        log.debug("Request to get all Queues");
        if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            return queueRepository.findAll(pageable);
        } else {
            String login = SecurityUtils.getCurrentUserLogin().get();
            return queueRepository.findAllByCommerceUserLogin(login, pageable);
        }
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Queue> findOne(Long id) {
        log.debug("Request to get Queue : {}", id);
        if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            return queueRepository.findById(id);
        }else {
            String login = SecurityUtils.getCurrentUserLogin().get();
            return queueRepository.findOneByIdAndCommerceUserLogin(id, login);
        }
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Queue : {}", id);
        queueRepository.deleteById(id);
    }
}
