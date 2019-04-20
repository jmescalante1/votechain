import React from 'react'
import { connect } from 'react-redux'

import Official from './official'

class OfficialContainer extends React.Component {
  render() {
    return(
      <Official />
    )
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(OfficialContainer)