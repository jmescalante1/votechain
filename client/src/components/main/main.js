import React from 'react'
import { Route } from 'react-router-dom'

import LayoutContainer from '../layout/layout-container'

class Main extends React.Component {
  render() {
    return(
      <Route path='/' render={() => <LayoutContainer />} />
    )
  }
}

export default Main