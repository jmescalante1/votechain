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
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

import ExitButton from '../buttons/exit'

import { deleteAdminVotechain } from '../../../actions/admin'

const styles = theme => ({
  title: {
    color: '#212121',
    fontWeight: 'bold',
    fontSize: 28,
  },
  actions: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  dividerBlack: {
    backgroundColor: '#212121'
  },
  dividerGrey: {
    backgroundColor: '#9e9e9e'
  },
  contentText: {
    fontSize: 20,
    color: '#616161',
    // backgroundColor: '#9e9e  9e'
  },
  label: {
    fontSize: 18,
    // fontWeight: 'bold'
  },
  value: {
    fontSize: 18,
    color: '#9e9e9e'
  },
  voteListContainer: {
    padding: theme.spacing.unit * 2
  },
  columnTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  section: {
    marginBottom: theme.spacing.unit,
  },
  list: {
    marginTop: theme.spacing.unit
  }
})

class DeleteAdminDialog extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { classes, openDialog, handleClickCloseDialog, voterAddress, voteList } = this.props
  
    return (
      <Dialog
        open={openDialog}
        onClose={handleClickCloseDialog}
        fullWidth
        maxWidth='md'
      >
        <DialogTitle disableTypography>
          <Typography className={classes.title}>Votes</Typography>
          <Divider className={classes.dividerBlack}/>
        </DialogTitle>

        <DialogContent >
          <DialogContentText className={classes.contentText}>
            The following are the votes of {voterAddress}:
          </DialogContentText>

          <div className={classes.voteListContainer}>
            <Grid 
              container
              direction='row'
              alignItems='center'
              justify='flex-start'
              className={classes.section}
            >
              <Grid xs={6} item>
                <Typography className={classes.columnTitle}>Positions</Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography className={classes.columnTitle}>Candidates</Typography>
              </Grid>
            </Grid>
            <Grid
              container
              direction='column'
              alignItems='center'
              justify='flex-start'
              className={classes.list}
            >
              {Object.keys(voteList).map((positionName, index) => {
                return (
                  <Grid 
                    key={positionName}
                    container
                    direction='column'
                    alignItems='center'
                    justify='flex-start'
                  >
                    <Grid
                      container
                      direction='row'
                      alignItems='center'
                      justify='flex-start'
                    >
                      <Grid xs={6} item>
                        <Typography className={classes.label}>{positionName} </Typography>
                      </Grid>
                      
                      <Grid xs={6} item>
                        <Grid
                          container
                          direction='row'
                          alignItems='center'
                          justify='flex-start'
                          spacing={8}
                        >
                          {voteList[positionName].candidateList.map((candidateName, index) => {
                            return (
                              <Grid item key={index}>
                                <Typography className={classes.value}>{candidateName}{index !== voteList[positionName].candidateList.length - 1 ? ', ' : ''}</Typography>  
                              </Grid>  
                            )  
                          })}
                        </Grid>
                      </Grid>
                    </Grid>

                    {index !== Object.keys(voteList).length - 1 && 
                      <Grid item style={{width:'100%'}}>
                        <Divider />
                      </Grid>
                    }
                  </Grid>
                )
              })}
            </Grid>
          </div>
        </DialogContent>

        <DialogActions className={classes.actions}>
          <Grid
            container
            direction='row'
            alignItems='center'
            justify='flex-end'
          >
            
            <Grid item><ExitButton onClick={handleClickCloseDialog} /></Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    )
  }
}

DeleteAdminDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  account: state.account.account,
  votechain: state.contract.votechain
});

const mapDispatchToProps = {
  deleteAdminVotechain,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DeleteAdminDialog))