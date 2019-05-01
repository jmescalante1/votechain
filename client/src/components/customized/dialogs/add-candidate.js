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
import PositionSelector from '../selectors/position-selector'
import PartySelector from '../selectors/party-selector'

import { addCandidateVotechain } from '../../../actions/candidate'

const styles = theme => ({
  content: {
    width: 500,
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
  },
  selector: {
    width: '100%',
    marginTop: 20,
  }
})

class AddCandidateDialog extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      selectedPositionId: '',
      candidateName: '',
      selectedPartyId: 0,
    }

    this.handlePositionSelectChange = this.handlePositionSelectChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeCandidateName = this.onChangeCandidateName.bind(this)
    this.handlePartySelectChange = this.handlePartySelectChange.bind(this)
  }

  handlePositionSelectChange(option) {
    if(option){
      this.setState({ selectedPositionId: option.value })
    } else {
      this.setState({ selectedPositionId: ''})
    }
  }

  handlePartySelectChange(option) {
    if(option){
      this.setState({ selectedPartyId: option.value })
    } else {
      this.setState({ selectedPartyId: 0})
    }
  }

  onChangeCandidateName(event) {
    this.setState({ candidateName: event.target.value })
  }

  onSubmit() {
    const { handleClickCloseDialog, addCandidateVotechain, votechain, account } = this.props
    const { candidateName, selectedPositionId, selectedPartyId } = this.state

    let candidate = {
      positionKey: selectedPositionId,
      name: candidateName,
      partyKey: selectedPartyId,
    }

    addCandidateVotechain(account, votechain, candidate)
    handleClickCloseDialog()
  }

  render() {
    const { classes, openDialog, handleClickCloseDialog, currentPositionList, currentPartyList } = this.props
    const { selectedPositionId, selectedPartyId } = this.state

    return (
      <Dialog
        open={openDialog}
        onClose={handleClickCloseDialog}
      >
        <DialogTitle disableTypography>
          <Typography className={classes.label}>Add New Candidate</Typography>
        </DialogTitle>
        
        <DialogContent 
          className={classes.content}
        >
          <DialogContentText>
            Add new candidate by specifying the name.
          </DialogContentText>

          <PositionSelector 
            classes={{
              root: classes.selector
            }}
            width='85%'
            handlePositionSelectChange={this.handlePositionSelectChange}
            positionList={currentPositionList}
            selectedPositionId={selectedPositionId}
          />

          <PartySelector 
            classes={{
              root: classes.selector
            }}
            width='85%'
            handlePartySelectChange={this.handlePartySelectChange}
            partyList={currentPartyList}
            selectedPartyId={selectedPartyId}
          />

          <CustomizedTextField
            classes={{
              root: classes.textField
            }}
            required
            fullWidth
            type='string'
            id='candidate-name'
            label='Candidate Name'
            variant='outlined'
            onChange={this.onChangeCandidateName}
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

            <Grid item><SubmitButton onClick={this.onSubmit} /></Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    )
  }
}

AddCandidateDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  account: state.account.account,
  votechain: state.contract.votechain,
  currentPositionList: state.candidate.currentPositionList,
  currentPartyList: state.candidate.currentPartyList,
})

const mapDispatchToProps = {
  addCandidateVotechain
}

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddCandidateDialog))