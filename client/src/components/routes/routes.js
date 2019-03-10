import React from 'react'
import { Switch, Route } from 'react-router-dom'

import LayoutContainer from '../layout/layout-container'

// import { headerTabs } from '../layout/header/header-tabs'
// import { sidebarMainOptions } from '../layout/sidebar/sidebar-options'
// import { sidebarSecondaryOptions } from '../layout/sidebar/sidebar-options'

function Routes() {
  return(
    <Switch>
      <Route path='/' component={LayoutContainer} />
    </Switch>
  )
}

export default Routes