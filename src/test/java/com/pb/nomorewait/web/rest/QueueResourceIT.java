package com.pb.nomorewait.web.rest;

import com.pb.nomorewait.NoMoreWaitApp;
import com.pb.nomorewait.domain.Queue;
import com.pb.nomorewait.repository.QueueRepository;
import com.pb.nomorewait.security.AuthoritiesConstants;
import com.pb.nomorewait.service.QueueService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link QueueResource} REST controller.
 */
@SpringBootTest(classes = NoMoreWaitApp.class)
@AutoConfigureMockMvc
@WithMockUser(username = "admin", password = "admin", authorities = {AuthoritiesConstants.ADMIN})
public class QueueResourceIT {

    private static final Integer DEFAULT_ACT_COUNT = 1;
    private static final Integer UPDATED_ACT_COUNT = 2;

    private static final Integer DEFAULT_MAX_COUNT = 1;
    private static final Integer UPDATED_MAX_COUNT = 2;

    private static final Instant DEFAULT_CREATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_CLOSE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CLOSE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_SKIP_TURN = false;
    private static final Boolean UPDATED_SKIP_TURN = true;

    @Autowired
    private QueueRepository queueRepository;

    @Autowired
    private QueueService queueService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restQueueMockMvc;

    private Queue queue;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Queue createEntity(EntityManager em) {
        Queue queue = new Queue()
            .actCount(DEFAULT_ACT_COUNT)
            .maxCount(DEFAULT_MAX_COUNT)
            .creationDate(DEFAULT_CREATION_DATE)
            .closeDate(DEFAULT_CLOSE_DATE)
            .skipTurn(DEFAULT_SKIP_TURN);
        return queue;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Queue createUpdatedEntity(EntityManager em) {
        Queue queue = new Queue()
            .actCount(UPDATED_ACT_COUNT)
            .maxCount(UPDATED_MAX_COUNT)
            .creationDate(UPDATED_CREATION_DATE)
            .closeDate(UPDATED_CLOSE_DATE)
            .skipTurn(UPDATED_SKIP_TURN);
        return queue;
    }

    @BeforeEach
    public void initTest() {
        queue = createEntity(em);
    }

    @Test
    @Transactional
    public void createQueue() throws Exception {
        int databaseSizeBeforeCreate = queueRepository.findAll().size();
        // Create the Queue
        restQueueMockMvc.perform(post("/api/queues")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(queue)))
            .andExpect(status().isCreated());

        // Validate the Queue in the database
        List<Queue> queueList = queueRepository.findAll();
        assertThat(queueList).hasSize(databaseSizeBeforeCreate + 1);
        Queue testQueue = queueList.get(queueList.size() - 1);
        assertThat(testQueue.getActCount()).isEqualTo(DEFAULT_ACT_COUNT);
        assertThat(testQueue.getMaxCount()).isEqualTo(DEFAULT_MAX_COUNT);
        assertThat(testQueue.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testQueue.getCloseDate()).isEqualTo(DEFAULT_CLOSE_DATE);
        assertThat(testQueue.isSkipTurn()).isEqualTo(DEFAULT_SKIP_TURN);
    }

    @Test
    @Transactional
    public void createQueueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = queueRepository.findAll().size();

        // Create the Queue with an existing ID
        queue.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQueueMockMvc.perform(post("/api/queues")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(queue)))
            .andExpect(status().isBadRequest());

        // Validate the Queue in the database
        List<Queue> queueList = queueRepository.findAll();
        assertThat(queueList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCreationDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = queueRepository.findAll().size();
        // set the field null
        queue.setCreationDate(null);

        // Create the Queue, which fails.


        restQueueMockMvc.perform(post("/api/queues")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(queue)))
            .andExpect(status().isBadRequest());

        List<Queue> queueList = queueRepository.findAll();
        assertThat(queueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllQueues() throws Exception {
        // Initialize the database
        queueRepository.saveAndFlush(queue);

        // Get all the queueList
        restQueueMockMvc.perform(get("/api/queues?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(queue.getId().intValue())))
            .andExpect(jsonPath("$.[*].actCount").value(hasItem(DEFAULT_ACT_COUNT)))
            .andExpect(jsonPath("$.[*].maxCount").value(hasItem(DEFAULT_MAX_COUNT)))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].closeDate").value(hasItem(DEFAULT_CLOSE_DATE.toString())))
            .andExpect(jsonPath("$.[*].skipTurn").value(hasItem(DEFAULT_SKIP_TURN.booleanValue())));
    }

    @Test
    @Transactional
    public void getQueue() throws Exception {
        // Initialize the database
        queueRepository.saveAndFlush(queue);

        // Get the queue
        restQueueMockMvc.perform(get("/api/queues/{id}", queue.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(queue.getId().intValue()))
            .andExpect(jsonPath("$.actCount").value(DEFAULT_ACT_COUNT))
            .andExpect(jsonPath("$.maxCount").value(DEFAULT_MAX_COUNT))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.closeDate").value(DEFAULT_CLOSE_DATE.toString()))
            .andExpect(jsonPath("$.skipTurn").value(DEFAULT_SKIP_TURN.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingQueue() throws Exception {
        // Get the queue
        restQueueMockMvc.perform(get("/api/queues/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQueue() throws Exception {
        // Initialize the database
        queueService.save(queue);

        int databaseSizeBeforeUpdate = queueRepository.findAll().size();

        // Update the queue
        Queue updatedQueue = queueRepository.findById(queue.getId()).get();
        // Disconnect from session so that the updates on updatedQueue are not directly saved in db
        em.detach(updatedQueue);
        updatedQueue
            .actCount(UPDATED_ACT_COUNT)
            .maxCount(UPDATED_MAX_COUNT)
            .creationDate(UPDATED_CREATION_DATE)
            .closeDate(UPDATED_CLOSE_DATE)
            .skipTurn(UPDATED_SKIP_TURN);

        restQueueMockMvc.perform(put("/api/queues")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedQueue)))
            .andExpect(status().isOk());

        // Validate the Queue in the database
        List<Queue> queueList = queueRepository.findAll();
        assertThat(queueList).hasSize(databaseSizeBeforeUpdate);
        Queue testQueue = queueList.get(queueList.size() - 1);
        assertThat(testQueue.getActCount()).isEqualTo(UPDATED_ACT_COUNT);
        assertThat(testQueue.getMaxCount()).isEqualTo(UPDATED_MAX_COUNT);
        assertThat(testQueue.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testQueue.getCloseDate()).isEqualTo(UPDATED_CLOSE_DATE);
        assertThat(testQueue.isSkipTurn()).isEqualTo(UPDATED_SKIP_TURN);
    }

    @Test
    @Transactional
    public void updateNonExistingQueue() throws Exception {
        int databaseSizeBeforeUpdate = queueRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQueueMockMvc.perform(put("/api/queues")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(queue)))
            .andExpect(status().isBadRequest());

        // Validate the Queue in the database
        List<Queue> queueList = queueRepository.findAll();
        assertThat(queueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteQueue() throws Exception {
        // Initialize the database
        queueService.save(queue);

        int databaseSizeBeforeDelete = queueRepository.findAll().size();

        // Delete the queue
        restQueueMockMvc.perform(delete("/api/queues/{id}", queue.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Queue> queueList = queueRepository.findAll();
        assertThat(queueList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
