package com.pb.nomorewait.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Commerce.
 */
@Entity
@Table(name = "commerce")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Commerce implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "identifier")
    private String identifier;

    @OneToOne
    @JoinColumn(unique = true)
    private Address address;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "commerce")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Queue> commerce = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdentifier() {
        return identifier;
    }

    public Commerce identifier(String identifier) {
        this.identifier = identifier;
        return this;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public Address getAddress() {
        return address;
    }

    public Commerce address(Address address) {
        this.address = address;
        return this;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public User getUser() {
        return user;
    }

    public Commerce user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Queue> getCommerce() {
        return commerce;
    }

    public Commerce commerce(Set<Queue> queues) {
        this.commerce = queues;
        return this;
    }

    public Commerce addCommerce(Queue queue) {
        this.commerce.add(queue);
        queue.setCommerce(this);
        return this;
    }

    public Commerce removeCommerce(Queue queue) {
        this.commerce.remove(queue);
        queue.setCommerce(null);
        return this;
    }

    public void setCommerce(Set<Queue> queues) {
        this.commerce = queues;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Commerce)) {
            return false;
        }
        return id != null && id.equals(((Commerce) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Commerce{" +
            "id=" + getId() +
            ", identifier='" + getIdentifier() + "'" +
            "}";
    }
}
