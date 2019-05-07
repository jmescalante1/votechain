import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import Icon from '../../customized/icons/icon'

const styles = theme => ({
  outer: {
    display: 'table',
    position: 'absolute',
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
    marginTop: theme.spacing.unit * 9,
  },
  description: {
    color: '#424242',
    fontSize: 20,
    textIndent: '0.5in' 
  },
  button: {
    background: 'none!important',
    border: 'none', 
    padding:' 0!important',
    fontSize: 'inherit',
    fontFamily: 'arial,sans-serif', /*input has OS specific font-family*/
    color: '#551A8B', 
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  section: {
    marginTop: theme.spacing.unit * 5
  }
})

class AccountError extends Component {
  constructor(props) {
    super(props);
    
    this.refreshPage = this.refreshPage.bind(this)
  }

  refreshPage() {
    window.location.reload()
  }
  

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
                  <Typography className={classes.title}>Oh no!</Typography>
                </Grid>
              </Grid>

              <Grid item>
                <Typography className={classes.subtitle}></Typography>
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
              spacing={40}
            >
              <Grid item>
                <Typography className={classes.description}>
                  Please logged in using your metamask to continue accessing the site. Thank you!
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.description}>
                  If you are finished doing the steps above, kindly <button className={classes.button} onClick={this.refreshPage}> refresh </button> the page.
                </Typography>
              </Grid>
            </Grid> 
          </div>
        </div>
      </div>
    );
  }
}

AccountError.propTypes = {
}

export default withStyles(styles)(AccountError)