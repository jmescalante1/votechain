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

import NoButton from '../buttons/no'
import YesButton from '../buttons/yes'

import { deleteVoterVotechain } from '../../../actions/voter'

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

class DeleteVoterDialog extends React.Component {
  constructor(props) {
    super(props)

    this.deleteVoter = this.deleteVoter.bind(this)
  }

  deleteVoter() {
    const { deleteVoterVotechain, handleClickCloseDialog, voterToBeDeleted, electionId } = this.props
    const { account, votechain } = this.props
  
    deleteVoterVotechain(account, votechain, electionId, voterToBeDeleted.id)
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
          <Typography className={classes.label}>Delete Voter</Typography>
        </DialogTitle>
        
        <DialogContent 
          className={classes.content}
        >
          <DialogContentText>
            Are you sure you want to delete this voter?
          </DialogContentText>

        </DialogContent>

        <DialogActions className={classes.actions}>
          <Grid
            container
            direction='row'
            alignItems='center'
            justify='space-between'
          >
            <Grid item><YesButton onClick={this.deleteVoter} /></Grid>
            
            <Grid item><NoButton onClick={handleClickCloseDialog} /></Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    )
  }
}

DeleteVoterDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired,
  voterToBeDeleted: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  account: state.account.account,
  votechain: state.contract.votechain
});

const mapDispatchToProps = {
  deleteVoterVotechain,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DeleteVoterDialog))