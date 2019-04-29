import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Checkbox from '@material-ui/core/Checkbox'

import CancelButton from '../buttons/cancel'
import SubmitButton from '../buttons/submit'
import CustomizedTextField from '../forms/textfield'

import { editPartyVotechain } from '../../../actions/party'

const styles = theme => ({
  content: {
    width: 500
  },
  label: {
    color: theme.palette.highlight.main,
    fontWeight: 'bold',
    fontSize: 20
  },
  fullWidth: {
    width: '100%',
  },
  legend: {
    color: 'black'
  },
  actions: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }
})

class EditPartyDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      partyName: '',
    }

    this.onChangePartyName = this.onChangePartyName.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChangePartyName(event) {
    this.setState({ partyName: event.target.value })
  }

  onSubmit() {
    const { onClose, editPartyVotechain, votechain, account, partyToBeEdited } = this.props
    const { partyName, } = this.state
  
    let editedParty = {
      partyKey: partyToBeEdited.id,
      name: partyName,
    }

    editPartyVotechain(account, votechain, editedParty)
    onClose()
  }

  render() {
    const { classes, openDialog, onClose, partyToBeEdited } = this.props
    const { hasAbstain } = this.state
    
    return (
      <Dialog
        open={openDialog}
        onClose={onClose}
      >
        <DialogTitle disableTypography>
          <Typography className={classes.label}>Add Party</Typography>
        </DialogTitle>

        <DialogContent
          className={classes.content}
        >
          
          <Grid 
            container
            direction='column'
            alignItems='center'
            justify='flex-start'
            spacing={16}
          >
            <Grid item>
              <DialogContentText>
                Fill out the form below and click submit to add a new party.
              </DialogContentText>
            </Grid>

            <Grid item className={classes.fullWidth}> 
              <CustomizedTextField 
                id='add-party'
                type='string'
                required
                label='Party Name'
                fullWidth
                variant='outlined'
                autoFocus
                defaultValue={partyToBeEdited.name}
                onChange={this.onChangePartyName}
              /> 
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions className={classes.actions}>
          <Grid
            container
            direction='row'
            alignItems='center'
            justify='space-between'
          >
            <Grid item><CancelButton onClick={onClose} /></Grid>

            <Grid item><SubmitButton onClick={this.onSubmit} /></Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    )
  }
}

EditPartyDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  partyToBeEdited: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  account: state.account.account,
  votechain: state.contract.votechain
});

const mapDispatchToProps = {
  editPartyVotechain,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditPartyDialog))