import React from 'react'
import { Switch, Route } from 'react-router-dom'

import LayoutContainer from '../layout/layout-container'

function Routes() {
  return(
    <Switch>
      <Route path='/' component={LayoutContainer} />
    </Switch>
  )
}

export default Routes