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

import { deleteOfficialVotechain } from '../../../actions/official'

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

class DeleteOfficialDialog extends React.Component {
  constructor(props) {
    super(props)

    this.deleteOfficial = this.deleteOfficial.bind(this)
  }

  deleteOfficial() {
    const { deleteOfficialVotechain, handleClickCloseDialog, officialToBeDeleted } = this.props
    const { web3, votechain } = this.props
  
    deleteOfficialVotechain(web3, votechain, officialToBeDeleted.id)
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
          <Typography className={classes.label}>Delete Official</Typography>
        </DialogTitle>
        
        <DialogContent 
          className={classes.content}
        >
          <DialogContentText>
            Are you sure you want to delete this official?
          </DialogContentText>

        </DialogContent>

        <DialogActions className={classes.actions}>
          <Grid
            container
            direction='row'
            alignItems='center'
            justify='space-between'
          >
            <Grid item><YesButton onClick={this.deleteOfficial} /></Grid>
            
            <Grid item><NoButton onClick={handleClickCloseDialog} /></Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    )
  }
}

DeleteOfficialDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired,
  officialToBeDeleted: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  web3: state.web3.web3,
  votechain: state.contract.votechain
});

const mapDispatchToProps = {
  deleteOfficialVotechain,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DeleteOfficialDialog))