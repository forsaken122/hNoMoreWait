import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './commerce.reducer';
import { ICommerce } from 'app/shared/model/commerce.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommerceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CommerceDetail = (props: ICommerceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { commerceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="noMoreWaitApp.commerce.detail.title">Commerce</Translate> [<b>{commerceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="identifier">
              <Translate contentKey="noMoreWaitApp.commerce.identifier">Identifier</Translate>
            </span>
          </dt>
          <dd>{commerceEntity.identifier}</dd>
          <dt>
            <Translate contentKey="noMoreWaitApp.commerce.address">Address</Translate>
          </dt>
          <dd>{commerceEntity.address ? commerceEntity.address.id : ''}</dd>
          <dt>
            <Translate contentKey="noMoreWaitApp.commerce.user">User</Translate>
          </dt>
          <dd>{commerceEntity.user ? commerceEntity.user.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/commerce" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/commerce/${commerceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ commerce }: IRootState) => ({
  commerceEntity: commerce.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CommerceDetail);
