import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './queue.reducer';
import { IQueue } from 'app/shared/model/queue.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IQueueDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const QueueDetail = (props: IQueueDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { queueEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="noMoreWaitApp.queue.detail.title">Queue</Translate> [<b>{queueEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="actCount">
              <Translate contentKey="noMoreWaitApp.queue.actCount">Act Count</Translate>
            </span>
          </dt>
          <dd>{queueEntity.actCount}</dd>
          <dt>
            <span id="maxCount">
              <Translate contentKey="noMoreWaitApp.queue.maxCount">Max Count</Translate>
            </span>
          </dt>
          <dd>{queueEntity.maxCount}</dd>
          <dt>
            <span id="creationDate">
              <Translate contentKey="noMoreWaitApp.queue.creationDate">Creation Date</Translate>
            </span>
          </dt>
          <dd>{queueEntity.creationDate ? <TextFormat value={queueEntity.creationDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="closeDate">
              <Translate contentKey="noMoreWaitApp.queue.closeDate">Close Date</Translate>
            </span>
          </dt>
          <dd>{queueEntity.closeDate ? <TextFormat value={queueEntity.closeDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="skipTurn">
              <Translate contentKey="noMoreWaitApp.queue.skipTurn">Skip Turn</Translate>
            </span>
          </dt>
          <dd>{queueEntity.skipTurn ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="noMoreWaitApp.queue.commerce">Commerce</Translate>
          </dt>
          <dd>{queueEntity.commerce ? queueEntity.commerce.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/queue" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/queue/${queueEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ queue }: IRootState) => ({
  queueEntity: queue.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QueueDetail);
