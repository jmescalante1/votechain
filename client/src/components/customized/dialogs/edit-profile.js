import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'

import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import CancelButton from '../buttons/cancel'
import SubmitButton from '../buttons/submit'
import CustomizedTextField from '../forms/textfield'

import { editProfile } from '../../../actions/account'

// import { editAdminVotechain } from './admin'
// import { editOfficialVotechain } from './official'
// import { editVoterVotechain } from './voter'

const styles = theme => ({
  content: {
    width: 500
  },
  textField: {
    marginTop: 20,
  },
  label: {
    color: theme.palette.highlight.main,
    fontWeight: 'bold',
    fontSize: 20
  },
  actions: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }
})

class EditProfileDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      profileName: '',
    }

    this.editProfile = this.editProfile.bind(this)
    this.onChangeProfileName = this.onChangeProfileName.bind(this)
  }
  
  editProfile() {
    const { editProfile, votechain, handleClickCloseDialog, profile } = this.props
    const { profileName } = this.state

    let profileClone = cloneDeep(profile)
    profileClone.name = profileName

    editProfile(votechain, profileClone, profile.accountAddress)
    handleClickCloseDialog()
  }

  onChangeProfileName(event) {
    this.setState({ profileName: event.target.value })
  }

  render() {
    const { classes, openDialog, handleClickCloseDialog, profile } = this.props
  
    return (
      <Dialog
        open={openDialog}
        onClose={handleClickCloseDialog}
      >
        <DialogTitle disableTypography>
          <Typography className={classes.label}>Edit account details</Typography>
        </DialogTitle>
        
        <DialogContent 
          className={classes.content}
        >
          <DialogContentText>
            Modify the fields below and click submit to apply changes.
          </DialogContentText>

          <CustomizedTextField
            classes={{
              root: classes.textField
            }}
            defaultValue={profile.name}
            required
            fullWidth={true}
            type='string'
            id='profile-name'
            label='Your display Name'
            variant='outlined'
            onChange={this.onChangeProfileName}
          />
        </DialogContent>

        <DialogActions className={classes.actions}>
          <Grid
            container
            direction='row'
            alignItems='center'
            justify='space-between'
          >
            <Grid item><CancelButton onClick={handleClickCloseDialog} /></Grid>

            <Grid item><SubmitButton onClick={this.editProfile} /></Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    )
  }
}

EditProfileDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  profile: state.account.profile,
  votechain: state.contract.votechain
});

const mapDispatchToProps = {
  editProfile,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditProfileDialog))