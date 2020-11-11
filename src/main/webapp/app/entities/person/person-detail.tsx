import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './person.reducer';
import { IPerson } from 'app/shared/model/person.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPersonDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PersonDetail = (props: IPersonDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { personEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="noMoreWaitApp.person.detail.title">Person</Translate> [<b>{personEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="firstName">
              <Translate contentKey="noMoreWaitApp.person.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{personEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="noMoreWaitApp.person.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{personEntity.lastName}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="noMoreWaitApp.person.email">Email</Translate>
            </span>
          </dt>
          <dd>{personEntity.email}</dd>
          <dt>
            <span id="phone">
              <Translate contentKey="noMoreWaitApp.person.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{personEntity.phone}</dd>
          <dt>
            <Translate contentKey="noMoreWaitApp.person.address">Address</Translate>
          </dt>
          <dd>{personEntity.address ? personEntity.address.id : ''}</dd>
          <dt>
            <Translate contentKey="noMoreWaitApp.person.user">User</Translate>
          </dt>
          <dd>{personEntity.user ? personEntity.user.id : ''}</dd>
          <dt>
            <Translate contentKey="noMoreWaitApp.person.person">Person</Translate>
          </dt>
          <dd>{personEntity.person ? personEntity.person.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/person" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/person/${personEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ person }: IRootState) => ({
  personEntity: person.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetail);
