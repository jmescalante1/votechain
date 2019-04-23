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

import { addOfficialVotechain } from '../../../actions/official'

const styles = theme => ({
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
  formFields: {
    marginTop: theme.spacing.unit * 2,
  },
  statusName: {
    fontSize: 15
  },
})

class AddOfficialDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      officialName: '',
      officialKey: '',
    }

    this.onChangeOfficialName = this.onChangeOfficialName.bind(this)
    this.onChangeOfficialKey = this.onChangeOfficialKey.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChangeOfficialName(event) {
    this.setState({ officialName: event.target.value })
  }

  onChangeOfficialKey(event) {
    this.setState({ officialKey: event.target.value })
  }

  onSubmit() {
    const { handleClickCloseDialog, addOfficialVotechain, votechain, account } = this.props
    const { officialName, officialKey } = this.state

    let official = {
      officialKey,
      name: officialName,
    }

    addOfficialVotechain(account, votechain, official)
    handleClickCloseDialog()
  }
  

  render() {
    const { classes, openDialog, handleClickCloseDialog } = this.props

    return (
      <Dialog
        open={openDialog}
        onClose={handleClickCloseDialog}
      >
        <DialogTitle disableTypography>
          <Typography className={classes.label}>Add New Official</Typography>
        </DialogTitle>
        
        <DialogContent >
          <DialogContentText>
          Fill out the form below and click submit to add a new official.
          </DialogContentText>

          <CustomizedTextField
            classes={{
              root: classes.textField,
            }}
            required
            fullWidth
            type='string'
            id='official-key'
            label='Official Key/Address'
            variant='outlined'
            onChange={this.onChangeOfficialKey}
          />

          <CustomizedTextField
            classes={{
              root: classes.textField,
            }}
            required
            fullWidth
            type='string'
            id='official-name'
            label='Official Name'
            variant='outlined'
            onChange={this.onChangeOfficialName}
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

AddOfficialDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  account: state.account.account,
  votechain: state.contract.votechain,
})

const mapDispatchToProps = {
  addOfficialVotechain
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddOfficialDialog))