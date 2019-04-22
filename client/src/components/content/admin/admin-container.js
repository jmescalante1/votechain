import React from 'react'
import { connect } from 'react-redux'

import Admin from './admin'

class AdminContainer extends React.Component {
  render() {
    return(
      <Admin />
    )
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)