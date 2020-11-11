import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Queue from './queue';
import Commerce from './commerce';
import Address from './address';
import Person from './person';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}queue`} component={Queue} />
      <ErrorBoundaryRoute path={`${match.url}commerce`} component={Commerce} />
      <ErrorBoundaryRoute path={`${match.url}address`} component={Address} />
      <ErrorBoundaryRoute path={`${match.url}person`} component={Person} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
