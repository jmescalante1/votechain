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
import FormValidator from '../forms/form-validator'

import { addElectionVotechain } from '../../../actions/election'

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

class AddElectionDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      electionTextField: {
        value: '',
        errorMessage: null,
      },
      hasError: false,
    }

    this.addElection = this.addElection.bind(this)
    this.onChange = this.onChange.bind(this)
    this.validateInput = this.validateInput.bind(this)
  }

  
  addElection() {
    const { handleClickCloseDialog, addElectionVotechain, account, votechain } = this.props
    const { electionTextField } = this.state

    if(this.validateInput()){
      addElectionVotechain(account, votechain, electionTextField.value)
      handleClickCloseDialog()
    }
  }

  validateInput(){
    const { electionTextField } = this.state

    if(FormValidator.isEmpty(electionTextField.value)){
      this.setState( (prevState) => ({
        electionTextField: {
          ...prevState.electionTextField,
          errorMessage: 'The election must have a name',
          hasError: true
        }
      }))

      return false
    } else if (!FormValidator.validLength(electionTextField.value, 1, 32)) {
      this.setState( (prevState) => ({
        electionTextField: {
          ...prevState.electionTextField,
          errorMessage: 'The election name must contain 1 to 32 characters only',
          hasError: true
        }
      }))

      return false  
    }
    
    this.setState( prevState => ({
      hasError: false,
      electionTextField: {
        ...prevState.electionTextField,
        errorMessage: null
      }
    }))

    return true
  }

  onChange(event) {
    let value = event.target.value

    this.setState((prevState) => ({
      electionTextField: {
        ...prevState.electionTextField,
        value: value
      }
    }))
  }

  render() {
    const { classes, openDialog, handleClickCloseDialog } = this.props
    const { electionTextField } = this.state 

    return (
      <Dialog
        open={openDialog}
        onClose={handleClickCloseDialog}
      >
        <DialogTitle disableTypography>
          <Typography className={classes.label}>Add Election</Typography>
        </DialogTitle>
        
        <DialogContent 
          className={classes.content}
        >
          <DialogContentText>
            Add new election by specifying its name
          </DialogContentText>

          <CustomizedTextField
            classes={{
              root: classes.textField
            }}
            required
            fullWidth={true}
            type='text'
            id='election-name'
            label='Election Name'
            variant='outlined'
            onChange={this.onChange}
            errorMessage={electionTextField.errorMessage}
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

            <Grid item><SubmitButton onClick={this.addElection} /></Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    )
  }
}

AddElectionDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  votechain: state.contract.votechain,
  account: state.account.account
});

const mapDispatchToProps = {
  addElectionVotechain,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddElectionDialog))