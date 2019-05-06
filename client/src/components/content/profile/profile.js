import React from 'react'
import { connect } from 'react-redux'

import { getAccountDetails } from '../../../actions/account'

import ProfileCard from './profile-card'
import EditProfileDialog from '../../customized/dialogs/edit-profile'
import Roles from '../../../roles/roles'

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
        {profile.role !== Roles.publicUser ? 
          <EditProfileDialog 
            openDialog={openEditProfileDialog}
            handleClickCloseDialog={this.handleCloseEditProfileDialog}
          /> : null
        }
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