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
import Divider from '@material-ui/core/Divider'

import Loader from '../../customized/progress-bars/loader'
import BackButton from '../buttons/back'

import { fetchElectionDetails } from '../../../actions/election'

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
    backgroundColor: '#616161'
  },
  contentText: {
    fontSize: 20,
    color: '#616161',
  },
  label: {
    fontSize: 18,
  },
  value: {
    fontSize: 18,
    color: '#9e9e9e'
  },
  positionListContainer: {  
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

class AddElectionDialog extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      loading: true,
    }

    this.onEntered = this.onEntered.bind(this)
    this.onExited = this.onExited.bind(this)
  }

  async onEntered() {
    await this.setState({ loading: true })

    const { votechain, fetchElectionDetails, electionToView } = this.props

    await fetchElectionDetails(votechain, electionToView.id)

    await this.setState({ loading: false })
  }

  async onExited() {
    const { handleClickCloseDialog } = this.props

    this.setState({ loading: true })

    handleClickCloseDialog()
  }

  render() {
    const { classes, openDialog, handleClickCloseDialog, electionDetails } = this.props
    const { loading } = this.state

    return (
      <Dialog
        onEntered={this.onEntered}
        onExited={this.onExited}
        open={openDialog}
        onClose={handleClickCloseDialog}
        fullWidth
        maxWidth='md'
      >
        <DialogTitle disableTypography>
          <Typography className={classes.title}>Election Details</Typography>
          <Divider className={classes.dividerBlack}/>
        </DialogTitle>
        
        <DialogContent>
          {loading
            ? <Loader />
            : <div>
                <DialogContentText className={classes.contentText}>
                  The list of positions in {electionDetails.name} and their corresponding candidates are shown below.
                </DialogContentText>
                
                <div className={classes.positionListContainer}>
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
                    {electionDetails.positionList.map((position, index) => {
                      return (
                        <Grid 
                          key={position.id}
                          container
                          direction='column'
                          alignItems='center'
                          justify='flex-start'
                          className={classes.section}
                        >
                          <Grid
                            container
                            direction='row'
                            alignItems='center'
                            justify='flex-start'
                          >
                            <Grid xs={6} item>
                              <Typography className={classes.label}>{position.name} </Typography>
                            </Grid>

                            <Grid xs={6} item>
                              <Grid
                                container
                                direction='row'
                                alignItems='center'
                                justify='flex-start'
                                spacing={8}
                              >
                                {position.candidateList.map((candidate, index) => {
                                  return (
                                    <Grid item key={index}>
                                      <Typography className={classes.value}>{candidate.name + '( ' + candidate.partyName + ') '}{index !== position.candidateList.length - 1 ? ', ' : ''}</Typography>  
                                    </Grid>  
                                  )  
                                })}
                              </Grid>
                            </Grid>
                          </Grid>

                          {index !== electionDetails.positionList.length - 1 && 
                            <Grid item style={{width:'100%'}}>
                              <Divider className={classes.dividerGrey}/>
                            </Grid>
                          }
                        </Grid>
                      )
                    })}
                  </Grid>
                </div>
              </div>
            }

        </DialogContent>

        {!loading && <DialogActions className={classes.actions}>
          <Grid
            container
            direction='row'
            alignItems='center'
            justify='flex-start'
          >
            <Grid item><BackButton onClick={handleClickCloseDialog} /></Grid>
          </Grid>
        </DialogActions>}
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
  electionDetails: state.election.electionDetails
});

const mapDispatchToProps = {
  fetchElectionDetails,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddElectionDialog))