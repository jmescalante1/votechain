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

import { editOfficialVotechain } from '../../../actions/official'

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

class EditOfficialDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      officialName: '',
    }

    this.editOfficial = this.editOfficial.bind(this)
    this.onChangeOfficialName = this.onChangeOfficialName.bind(this)
  }
  
  editOfficial() {
    const { editOfficialVotechain, web3, votechain, handleClickCloseDialog, officialToBeEdited } = this.props
    const { officialName } = this.state

    let official = {
      officialKey: officialToBeEdited.id,
      name: officialName,
    }

    editOfficialVotechain(web3, votechain, official)
    handleClickCloseDialog()
  }

  onChangeOfficialName(event) {
    this.setState({ officialName: event.target.value })
  }

  render() {
    const { classes, openDialog, handleClickCloseDialog } = this.props
  
    return (
      <Dialog
        open={openDialog}
        onClose={handleClickCloseDialog}
      >
        <DialogTitle disableTypography>
          <Typography className={classes.label}>Edit Official</Typography>
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

            <Grid item><SubmitButton onClick={this.editOfficial} /></Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    )
  }
}

EditOfficialDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired,
  officialToBeEdited: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  web3: state.web3.web3,
  votechain: state.contract.votechain
});

const mapDispatchToProps = {
  editOfficialVotechain,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditOfficialDialog))