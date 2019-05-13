import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Papa from 'papaparse'
import classNames from 'classnames'

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
import UploadButton from '../buttons/upload'
import FormValidator from '../forms/form-validator'

import { bulkAddVoterVotechain } from '../../../actions/voter'

const styles = theme => ({
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
  section: {
    marginTop: theme.spacing.unit * 2
  },
  error: {
    fontSize: 16,
    color: theme.palette.error.main
  },
  fullWidth: {
    width: '100%'
  },
  errorContent: {
    fontSize: 11,
    color: theme.palette.error.main
  }
})

class UploadVoterDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      voters: [],
      errors: [],
      file: null,
      noOfErrors: 0,
    }

    this.onEntered = this.onEntered.bind(this)
    this.refreshErrorState = this.refreshErrorState.bind(this)

    this.validateVoterKeysRegistration = this.validateVoterKeysRegistration.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.handleFiles = this.handleFiles.bind(this)
    this.getVotersFromCSV = this.getVotersFromCSV.bind(this)

    this.displayErrorHeaders = this.displayErrorHeaders.bind(this)
    this.displayErrorContents = this.displayErrorContents.bind(this)
    this.displayErrors = this.displayErrors.bind(this)
  }

  async onEntered() {

  }

  async refreshErrorState() {
    await this.setState({ 
      errors: [],
      noOfErrors: 0,
    })
  }
  
  async validateVoterKeysRegistration(voterKeys){
    const { votechain, web3, electionId } = this.props

    let errors = []

    for(let i = 0; i < voterKeys.length; i++){
      let error = {}
      let voterKey = voterKeys[i]

      if(!web3.utils.isAddress(voterKey)){
        error.type = 'Invalid address'
        error.row = i + 1
        error.address = voterKey
        errors.push(error)
      } else if ((await votechain.methods.isVoterAt(electionId, voterKey).call())) {
        error.type = 'Already registered as voter'
        error.row = i + 1
        error.address = voterKey
        errors.push(error)
      } else if ((await votechain.methods.isOfficial(voterKey).call())) {
        error.type = 'Already registered as official'
        error.row = i + 1
        error.address = voterKey
        errors.push(error)
      } else if ((await votechain.methods.isAdmin(voterKey).call())) {
        error.type = 'Already registered as admin'
        error.row = i + 1
        error.address = voterKey
        errors.push(error)
      }
    }

    await this.setState({ errors })

    return errors.length
  }

  async getVotersFromCSV(file) {
    let voters = []

    Papa.parsePromise = function(file) {
      return new Promise(function(complete, error) {
        Papa.parse(file, {skipEmptyLines: true, complete, error})
      })
    }

    let result = await Papa.parsePromise(file)
    
    result.data.map((row) => {
      voters.push(row[0])
    })
     
    return voters
  }

  async onSubmit() {
    const { handleClickCloseDialog, bulkAddVoterVotechain } = this.props 
    const { account, electionId, votechain } = this.props
    const { file } = this.state

    const voterKeys = await this.getVotersFromCSV(file)
    
    let noOfErrors = await this.validateVoterKeysRegistration(voterKeys)

    if(noOfErrors === 0){
      bulkAddVoterVotechain(account, votechain, electionId, voterKeys)
      handleClickCloseDialog()
    } else {
      await this.setState({ noOfErrors })
    }
  }

  async handleFiles(files) {
    if(files[0]){
      await this.setState({ file: files[0] })
      await this.refreshErrorState()
    }
  }

  displayErrorHeaders(noOfErrors) {
    const { classes } = this.props
    return (
      <Grid
        container
        direction='column'
        alignItems='flex-start'
        justify='center'
        spacing={24}
      >
        <Grid item>
          <Typography className={classNames(classes.error, classes.section)}>
            This file cannot be submitted due to its {noOfErrors} invalid records.
            Please fix its records, upload the file again and click submit to proceed.
          </Typography>
        </Grid>

        <Grid item
          className={classes.fullWidth}
        >
          <Grid 
            container
            direction='row'
            alignItems='center'
            justify='space-between'
          >
            <Grid item xs={5}><Typography className={classes.error}>Error Type</Typography></Grid>
            <Grid item xs={2}><Typography className={classes.error}>Row No</Typography></Grid>
            <Grid item xs={5}><Typography className={classes.error}>Account Address</Typography></Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  displayErrorContents() {
    const { classes } = this.props
    const { errors } = this.state

    return (
      <Grid
        container
        direction='column'
        alignItems='flex-start'
        justify='center'
        spacing={24}
      >
        {errors.map((error) => {
          return (
            <Grid item
              className={classes.fullWidth}
              key={error.row}
            >
              <Grid 
                container
                direction='row'
                alignItems='center'
                justify='space-between'
              >
                <Grid item xs={5}>
                  <Typography className={classes.errorContent}>
                    {error.type}
                  </Typography>
                </Grid>
                <Grid item xs={2}><Typography className={classes.errorContent}>{error.row}</Typography></Grid>
                <Grid item xs={5}><Typography className={classes.errorContent}>{error.address}</Typography></Grid>
              </Grid>
            </Grid>
         )
        })}
      </Grid>
        
        
    )
  }

  displayErrors(noOfErrors) {
    if(noOfErrors > 0){
      return (
        <div>
          {this.displayErrorHeaders(noOfErrors)}
          {this.displayErrorContents()}
        </div>
      )
    }
  }

  render() {
    const { classes, openDialog, handleClickCloseDialog } = this.props
    const { errors, file, noOfErrors } = this.state

    return (
      <Dialog
        open={openDialog}
        onClose={handleClickCloseDialog}
        onEntered={this.onEntered}
      >
        <DialogTitle disableTypography>
          <Typography className={classes.label}>Upload Voter's List</Typography>
        </DialogTitle>
        
        <DialogContent >
          <DialogContentText>
            Import a csv file containing the voter's list and click submit to finish.
            The first column of the csv file should only contain the addresses of the voters.
          </DialogContentText>

          <Grid className={classes.section}
            container
            direction='row'
            alignItems='center'
            justify='flex-start'
            spacing={8}
          >

            <Grid item><Typography style={{fontSize: 16}}>File: </Typography></Grid>
            <Grid item><Typography style={{fontSize: 16, color: '#616161'}}>{file ? file.name : 'none'} </Typography></Grid>
          </Grid>

          {this.displayErrors(noOfErrors)}
        </DialogContent>

        <DialogActions className={classes.actions}>
          <Grid
            container
            direction='row'
            alignItems='center'
            justify='space-between'
          >
            <Grid item><CancelButton onClick={handleClickCloseDialog} /></Grid>

            <Grid item>
              <UploadButton  
                handleFiles={this.handleFiles}
                multipleFiles={false}
                fileTypes='.csv'
              />
            </Grid>

            <Grid item><SubmitButton disabled={!file} onClick={this.onSubmit} /></Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    )
  }
}

UploadVoterDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired,
  
  electionId: PropTypes.number
}

const mapStateToProps = state => ({
  account: state.account.account,
  votechain: state.contract.votechain,
  web3: state.web3.web3,
})

const mapDispatchToProps = {
  bulkAddVoterVotechain
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UploadVoterDialog))