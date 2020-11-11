import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Queue from './queue';
import QueueDetail from './queue-detail';
import QueueUpdate from './queue-update';
import QueueDeleteDialog from './queue-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={QueueUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={QueueUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={QueueDetail} />
      <ErrorBoundaryRoute path={match.url} component={Queue} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={QueueDeleteDialog} />
  </>
);

export default Routes;
