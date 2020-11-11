package com.pb.nomorewait.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Queue.
 */
@Entity
@Table(name = "queue")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Queue implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "act_count")
    private Integer actCount;

    @Column(name = "max_count")
    private Integer maxCount;

    @NotNull
    @Column(name = "creation_date", nullable = false)
    private Instant creationDate;

    @Column(name = "close_date")
    private Instant closeDate;

    @Column(name = "skip_turn")
    private Boolean skipTurn;

    @OneToMany(mappedBy = "person")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Person> queues = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "commerce", allowSetters = true)
    private Commerce commerce;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getActCount() {
        return actCount;
    }

    public Queue actCount(Integer actCount) {
        this.actCount = actCount;
        return this;
    }

    public void setActCount(Integer actCount) {
        this.actCount = actCount;
    }

    public Integer getMaxCount() {
        return maxCount;
    }

    public Queue maxCount(Integer maxCount) {
        this.maxCount = maxCount;
        return this;
    }

    public void setMaxCount(Integer maxCount) {
        this.maxCount = maxCount;
    }

    public Instant getCreationDate() {
        return creationDate;
    }

    public Queue creationDate(Instant creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public Instant getCloseDate() {
        return closeDate;
    }

    public Queue closeDate(Instant closeDate) {
        this.closeDate = closeDate;
        return this;
    }

    public void setCloseDate(Instant closeDate) {
        this.closeDate = closeDate;
    }

    public Boolean isSkipTurn() {
        return skipTurn;
    }

    public Queue skipTurn(Boolean skipTurn) {
        this.skipTurn = skipTurn;
        return this;
    }

    public void setSkipTurn(Boolean skipTurn) {
        this.skipTurn = skipTurn;
    }

    public Set<Person> getQueues() {
        return queues;
    }

    public Queue queues(Set<Person> people) {
        this.queues = people;
        return this;
    }

    public Queue addQueue(Person person) {
        this.queues.add(person);
        person.setPerson(this);
        return this;
    }

    public Queue removeQueue(Person person) {
        this.queues.remove(person);
        person.setPerson(null);
        return this;
    }

    public void setQueues(Set<Person> people) {
        this.queues = people;
    }

    public Commerce getCommerce() {
        return commerce;
    }

    public Queue commerce(Commerce commerce) {
        this.commerce = commerce;
        return this;
    }

    public void setCommerce(Commerce commerce) {
        this.commerce = commerce;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Queue)) {
            return false;
        }
        return id != null && id.equals(((Queue) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Queue{" +
            "id=" + getId() +
            ", actCount=" + getActCount() +
            ", maxCount=" + getMaxCount() +
            ", creationDate='" + getCreationDate() + "'" +
            ", closeDate='" + getCloseDate() + "'" +
            ", skipTurn='" + isSkipTurn() + "'" +
            "}";
    }
}
