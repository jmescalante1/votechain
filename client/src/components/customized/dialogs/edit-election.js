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

import CancelButton from '../buttons/cancel'
import SubmitButton from '../buttons/submit'
import CustomizedTextField from '../forms/textfield'

import { editElectionVotechain } from '../../../actions/election'

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

class EditElectionDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      electionName: ''
    }

    this.editElection = this.editElection.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  
  editElection() {
    const { editElectionVotechain, account, votechain, handleClickCloseDialog, idOfElectionToBeEdited } = this.props
    const { electionName } = this.state
    
    editElectionVotechain(account, votechain, {id: idOfElectionToBeEdited, name: electionName})
    handleClickCloseDialog()
  }

  onChange(event) {
    this.setState({ electionName: event.target.value })
  }

  render() {
    const { classes, openDialog, handleClickCloseDialog } = this.props
  
    return (
      <Dialog
        open={openDialog}
        onClose={handleClickCloseDialog}
      >
        <DialogTitle disableTypography>
          <Typography className={classes.label}>Edit Election</Typography>
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
            required
            fullWidth={true}
            type='string'
            id='election-name'
            label='Election Name'
            variant='outlined'
            onChange={this.onChange}
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

            <Grid item><SubmitButton onClick={this.editElection} /></Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    )
  }
}

EditElectionDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired,
  idOfElectionToBeEdited: PropTypes.string
}

const mapStateToProps = state => ({
  votechain: state.contract.votechain,
  account: state.account.account
});

const mapDispatchToProps = {
  editElectionVotechain,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditElectionDialog))