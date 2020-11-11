package com.pb.nomorewait.web.rest;

import com.pb.nomorewait.domain.Commerce;
import com.pb.nomorewait.service.CommerceService;
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
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.pb.nomorewait.domain.Commerce}.
 */
@RestController
@RequestMapping("/api")
public class CommerceResource {

    private final Logger log = LoggerFactory.getLogger(CommerceResource.class);

    private static final String ENTITY_NAME = "commerce";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CommerceService commerceService;

    public CommerceResource(CommerceService commerceService) {
        this.commerceService = commerceService;
    }

    /**
     * {@code POST  /commerce} : Create a new commerce.
     *
     * @param commerce the commerce to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new commerce, or with status {@code 400 (Bad Request)} if the commerce has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/commerce")
    public ResponseEntity<Commerce> createCommerce(@RequestBody Commerce commerce) throws URISyntaxException {
        log.debug("REST request to save Commerce : {}", commerce);
        if (commerce.getId() != null) {
            throw new BadRequestAlertException("A new commerce cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Commerce result = commerceService.save(commerce);
        return ResponseEntity.created(new URI("/api/commerce/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /commerce} : Updates an existing commerce.
     *
     * @param commerce the commerce to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated commerce,
     * or with status {@code 400 (Bad Request)} if the commerce is not valid,
     * or with status {@code 500 (Internal Server Error)} if the commerce couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/commerce")
    public ResponseEntity<Commerce> updateCommerce(@RequestBody Commerce commerce) throws URISyntaxException {
        log.debug("REST request to update Commerce : {}", commerce);
        if (commerce.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Commerce result = commerceService.save(commerce);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, commerce.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /commerce} : get all the commerce.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of commerce in body.
     */
    @GetMapping("/commerce")
    public ResponseEntity<List<Commerce>> getAllCommerce(Pageable pageable) {
        log.debug("REST request to get a page of Commerce");
        Page<Commerce> page = commerceService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /commerce/:id} : get the "id" commerce.
     *
     * @param id the id of the commerce to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the commerce, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/commerce/{id}")
    public ResponseEntity<Commerce> getCommerce(@PathVariable Long id) {
        log.debug("REST request to get Commerce : {}", id);
        Optional<Commerce> commerce = commerceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(commerce);
    }

    /**
     * {@code DELETE  /commerce/:id} : delete the "id" commerce.
     *
     * @param id the id of the commerce to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/commerce/{id}")
    public ResponseEntity<Void> deleteCommerce(@PathVariable Long id) {
        log.debug("REST request to delete Commerce : {}", id);
        commerceService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
