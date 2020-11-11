package com.pb.nomorewait.web.rest;

import com.pb.nomorewait.domain.Queue;
import com.pb.nomorewait.repository.QueueRepository;
import com.pb.nomorewait.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.pb.nomorewait.domain.Queue}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class QueueResource {

    private final Logger log = LoggerFactory.getLogger(QueueResource.class);

    private static final String ENTITY_NAME = "queue";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final QueueRepository queueRepository;

    public QueueResource(QueueRepository queueRepository) {
        this.queueRepository = queueRepository;
    }

    /**
     * {@code POST  /queues} : Create a new queue.
     *
     * @param queue the queue to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new queue, or with status {@code 400 (Bad Request)} if the queue has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/queues")
    public ResponseEntity<Queue> createQueue(@Valid @RequestBody Queue queue) throws URISyntaxException {
        log.debug("REST request to save Queue : {}", queue);
        if (queue.getId() != null) {
            throw new BadRequestAlertException("A new queue cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Queue result = queueRepository.save(queue);
        return ResponseEntity.created(new URI("/api/queues/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /queues} : Updates an existing queue.
     *
     * @param queue the queue to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated queue,
     * or with status {@code 400 (Bad Request)} if the queue is not valid,
     * or with status {@code 500 (Internal Server Error)} if the queue couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/queues")
    public ResponseEntity<Queue> updateQueue(@Valid @RequestBody Queue queue) throws URISyntaxException {
        log.debug("REST request to update Queue : {}", queue);
        if (queue.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Queue result = queueRepository.save(queue);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, queue.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /queues} : get all the queues.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of queues in body.
     */
    @GetMapping("/queues")
    public ResponseEntity<List<Queue>> getAllQueues(Pageable pageable) {
        log.debug("REST request to get a page of Queues");
        Page<Queue> page = queueRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /queues/:id} : get the "id" queue.
     *
     * @param id the id of the queue to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the queue, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/queues/{id}")
    public ResponseEntity<Queue> getQueue(@PathVariable Long id) {
        log.debug("REST request to get Queue : {}", id);
        Optional<Queue> queue = queueRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(queue);
    }

    /**
     * {@code DELETE  /queues/:id} : delete the "id" queue.
     *
     * @param id the id of the queue to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/queues/{id}")
    public ResponseEntity<Void> deleteQueue(@PathVariable Long id) {
        log.debug("REST request to delete Queue : {}", id);
        queueRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
