import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { headerTabs } from '../components/layout/header/header-tabs'

class ProtectedRoute extends Component {
  constructor(props) {
    super(props);
    
    this.isAuthorized = this.isAuthorized.bind(this)
  }
  

  isAuthorized() {
    const { userRole, roles } = this.props
    if(roles.includes(userRole)){
      return true
    }

    return false
  }
  
  render() {
    const { component: Component, roles, userRole, ...rest } = this.props
   
    return (
      <Route {...rest} render={(props) => (
        (this.isAuthorized()) 
          ? <Component {...props} />
          : <Redirect to='/home' />
      )} />
    )
  }
}

const mapStateToProps = state => ({
  userRole: state.account.profile.role
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute)