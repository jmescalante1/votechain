import React from 'react'
import { connect } from 'react-redux'

import { getAccountDetails } from '../../../actions/account'

import ProfileCard from './profile-card'
import EditProfileDialog from '../../customized/dialogs/edit-profile'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      openEditProfileDialog: false,
    }
  }

  handleCloseEditProfileDialog = () => {
    this.setState({ openEditProfileDialog: false })
  }

  handleOpenEditProfileDialog = () => {
    this.setState({ openEditProfileDialog: true })
  }
  

  render() {
    const { profile } = this.props
    const { openEditProfileDialog } = this.state

    return(
      <div>
        <ProfileCard 
          profile={profile} 
          handleOpenEditProfileDialog={this.handleOpenEditProfileDialog}
        />
       <EditProfileDialog 
          openDialog={openEditProfileDialog}
          handleClickCloseDialog={this.handleCloseEditProfileDialog}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  votechain: state.contract.votechain,
  profile: state.account.profile,
});

const mapDispatchToProps = {
  getAccountDetails,
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)