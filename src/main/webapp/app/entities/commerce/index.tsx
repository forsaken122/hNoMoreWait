import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Commerce from './commerce';
import CommerceDetail from './commerce-detail';
import CommerceUpdate from './commerce-update';
import CommerceDeleteDialog from './commerce-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CommerceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CommerceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CommerceDetail} />
      <ErrorBoundaryRoute path={match.url} component={Commerce} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CommerceDeleteDialog} />
  </>
);

export default Routes;
