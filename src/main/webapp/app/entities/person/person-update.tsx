import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAddress } from 'app/shared/model/address.model';
import { getEntities as getAddresses } from 'app/entities/address/address.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IQueue } from 'app/shared/model/queue.model';
import { getEntities as getQueues } from 'app/entities/queue/queue.reducer';
import { getEntity, updateEntity, createEntity, reset } from './person.reducer';
import { IPerson } from 'app/shared/model/person.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPersonUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PersonUpdate = (props: IPersonUpdateProps) => {
  const [addressId, setAddressId] = useState('0');
  const [userId, setUserId] = useState('0');
  const [personId, setPersonId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { personEntity, addresses, users, queues, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/person');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getAddresses();
    props.getUsers();
    props.getQueues();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...personEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="noMoreWaitApp.person.home.createOrEditLabel">
            <Translate contentKey="noMoreWaitApp.person.home.createOrEditLabel">Create or edit a Person</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : personEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="person-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="person-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="firstNameLabel" for="person-firstName">
                  <Translate contentKey="noMoreWaitApp.person.firstName">First Name</Translate>
                </Label>
                <AvField
                  id="person-firstName"
                  type="text"
                  name="firstName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="person-lastName">
                  <Translate contentKey="noMoreWaitApp.person.lastName">Last Name</Translate>
                </Label>
                <AvField
                  id="person-lastName"
                  type="text"
                  name="lastName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="person-email">
                  <Translate contentKey="noMoreWaitApp.person.email">Email</Translate>
                </Label>
                <AvField
                  id="person-email"
                  type="text"
                  name="email"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    pattern: {
                      value: '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$',
                      errorMessage: translate('entity.validation.pattern', { pattern: '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$' }),
                    },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="phoneLabel" for="person-phone">
                  <Translate contentKey="noMoreWaitApp.person.phone">Phone</Translate>
                </Label>
                <AvField
                  id="person-phone"
                  type="text"
                  name="phone"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="person-address">
                  <Translate contentKey="noMoreWaitApp.person.address">Address</Translate>
                </Label>
                <AvInput id="person-address" type="select" className="form-control" name="address.id">
                  <option value="" key="0" />
                  {addresses
                    ? addresses.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="person-user">
                  <Translate contentKey="noMoreWaitApp.person.user">User</Translate>
                </Label>
                <AvInput id="person-user" type="select" className="form-control" name="user.id">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="person-person">
                  <Translate contentKey="noMoreWaitApp.person.person">Person</Translate>
                </Label>
                <AvInput id="person-person" type="select" className="form-control" name="person.id">
                  <option value="" key="0" />
                  {queues
                    ? queues.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/person" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  addresses: storeState.address.entities,
  users: storeState.userManagement.users,
  queues: storeState.queue.entities,
  personEntity: storeState.person.entity,
  loading: storeState.person.loading,
  updating: storeState.person.updating,
  updateSuccess: storeState.person.updateSuccess,
});

const mapDispatchToProps = {
  getAddresses,
  getUsers,
  getQueues,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PersonUpdate);
