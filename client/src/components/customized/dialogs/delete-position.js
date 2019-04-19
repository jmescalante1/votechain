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

// import { deleteElectionVotechain } from '../../../actions/election'

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

class DeletePositionDialog extends React.Component {
  constructor(props) {
    super(props)

    this.deletePosition = this.deletePosition.bind(this)
  }

  deletePosition() {
    // const { deleteElectionVotechain, onClose, idOfElectionToBeDeleted } = this.props
    // const { web3, votechain } = this.props
  
    // deleteElectionVotechain(web3, votechain, idOfElectionToBeDeleted)
    // onClose()
  }

  render() {
    const { classes, openDialog, onClose, title, description } = this.props
  
    return (
      <Dialog
        open={openDialog}
        onClose={onClose}
      >
        <DialogTitle disableTypography>
          <Typography className={classes.label}>Delete Position</Typography>
        </DialogTitle>
        
        <DialogContent 
          className={classes.content}
        >
          <DialogContentText>
            Are you sure you want to delete this position?
          </DialogContentText>

        </DialogContent>

        <DialogActions className={classes.actions}>
          <Grid
            container
            direction='row'
            alignItems='center'
            justify='space-between'
          >
            <Grid item><YesButton onClick={this.deletePosition} /></Grid>
            
            <Grid item><NoButton onClick={onClose} /></Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    )
  }
}

DeletePositionDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  idOfElectionToBeDeleted: PropTypes.string,
}

const mapStateToProps = state => ({
  web3: state.web3.web3,
  votechain: state.contract.votechain
});

const mapDispatchToProps = {
  // deleteElectionVotechain,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DeletePositionDialog))