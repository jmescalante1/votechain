import React, { Component } from 'react';
import { connect } from 'react-redux'
import classNames from 'classnames'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import Icon from '../../customized/icons/icon'

const styles = theme => ({
  outer: {
    display: 'table',
    position: 'relative',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
  
  middle: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  
  inner: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '1000px',
    // backgroundColor: 'grey'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 32,
    fontStyle: 'italic',
    color: '#212121'
  },
  greetings: {
    fontSize: 30,
    // backgroundColor: 'black',
    marginTop: theme.spacing.unit * 9,
    // marginTop: theme.spacing.unit * 5
  },
  description: {
    color: '#424242',
    fontSize: 20,
    textIndent: '0.5in' 
  },
  button: {
    margin: theme.spacing.unit
  },
  section: {
    marginTop: theme.spacing.unit * 5
  }
})

class Home extends Component {

  render() {
    const { classes } = this.props

    return (
      <div className={classes.outer}>
        <div className={classes.middle}>
          <div className={classes.inner}>
            <Grid
              container
              direction='column'
              alignItems='center'
              justify='center'
            >
              <Grid 
                container
                direction='column'
                alignItems='center'
                justify='center'
                spacing={8}
              >
                <Grid item>
                  <Icon name='votechain' size={75} color='#FFFFFF'/>
                </Grid>

                <Grid item>
                  <Typography className={classes.title}>VoteChain</Typography>
                </Grid>
              </Grid>

              <Grid item>
                <Typography className={classes.subtitle}>Experience the future of voting</Typography>
              </Grid>
            </Grid>
          </div>
          <div className={classes.inner}>
            <Grid
              container
              className={classes.section}
              direction='column'
              justify='center'
              alignItems='flex-start'
            >
              <Grid item>
                <Typography className={classes.description}>
                  In VoteChain, security is our top priority. Your votes are practically impossible to be altered and removed by a malicious attacker. You can
                  always verify that your votes are counted and the election results are correct. We achieved this by utilizing blockchain technology, a modern technology
                  that guarantees integrity, authenticity, and transparency of any digital   transactions.
                </Typography>
              </Grid>

              <Grid item className={classes.section}>
                <Button
                  variant='contained'
                  color='primary'
                  className={classNames(classes.button)}
                >
                  Let's get started!
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.account.profile
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home))