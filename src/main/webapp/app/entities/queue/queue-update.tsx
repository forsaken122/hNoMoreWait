import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICommerce } from 'app/shared/model/commerce.model';
import { getEntities as getCommerce } from 'app/entities/commerce/commerce.reducer';
import { getEntity, updateEntity, createEntity, reset } from './queue.reducer';
import { IQueue } from 'app/shared/model/queue.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IQueueUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const QueueUpdate = (props: IQueueUpdateProps) => {
  const [commerceId, setCommerceId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { queueEntity, commerce, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/queue');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getCommerce();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.creationDate = convertDateTimeToServer(values.creationDate);
    values.closeDate = convertDateTimeToServer(values.closeDate);

    if (errors.length === 0) {
      const entity = {
        ...queueEntity,
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
          <h2 id="noMoreWaitApp.queue.home.createOrEditLabel">
            <Translate contentKey="noMoreWaitApp.queue.home.createOrEditLabel">Create or edit a Queue</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : queueEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="queue-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="queue-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="actCountLabel" for="queue-actCount">
                  <Translate contentKey="noMoreWaitApp.queue.actCount">Act Count</Translate>
                </Label>
                <AvField id="queue-actCount" type="string" className="form-control" name="actCount" />
              </AvGroup>
              <AvGroup>
                <Label id="maxCountLabel" for="queue-maxCount">
                  <Translate contentKey="noMoreWaitApp.queue.maxCount">Max Count</Translate>
                </Label>
                <AvField id="queue-maxCount" type="string" className="form-control" name="maxCount" />
              </AvGroup>
              <AvGroup>
                <Label id="creationDateLabel" for="queue-creationDate">
                  <Translate contentKey="noMoreWaitApp.queue.creationDate">Creation Date</Translate>
                </Label>
                <AvInput
                  id="queue-creationDate"
                  type="datetime-local"
                  className="form-control"
                  name="creationDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.queueEntity.creationDate)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="closeDateLabel" for="queue-closeDate">
                  <Translate contentKey="noMoreWaitApp.queue.closeDate">Close Date</Translate>
                </Label>
                <AvInput
                  id="queue-closeDate"
                  type="datetime-local"
                  className="form-control"
                  name="closeDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.queueEntity.closeDate)}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="skipTurnLabel">
                  <AvInput id="queue-skipTurn" type="checkbox" className="form-check-input" name="skipTurn" />
                  <Translate contentKey="noMoreWaitApp.queue.skipTurn">Skip Turn</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label for="queue-commerce">
                  <Translate contentKey="noMoreWaitApp.queue.commerce">Commerce</Translate>
                </Label>
                <AvInput id="queue-commerce" type="select" className="form-control" name="commerce.id">
                  <option value="" key="0" />
                  {commerce
                    ? commerce.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/queue" replace color="info">
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
  commerce: storeState.commerce.entities,
  queueEntity: storeState.queue.entity,
  loading: storeState.queue.loading,
  updating: storeState.queue.updating,
  updateSuccess: storeState.queue.updateSuccess,
});

const mapDispatchToProps = {
  getCommerce,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QueueUpdate);
