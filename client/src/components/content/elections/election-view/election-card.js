import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'

import Title from '../../../customized/texts/title'
import StatusSymbol from '../../../customized/symbols/status-symbol'
import CastVoteButton from '../../../customized/buttons/cast-vote'

import ballotRoute from '../../ballot/ballot-route'

const styles = theme => ({
  card: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#64b5f6',
  },
  detail: {
    fontSize: 16,
    margin: theme.spacing.unit * 2,
  },
  noTextDecoration: {
    textDecoration: 'none'
  }, 
  cardContent: {
   padding: 0,
  }
})

class ElectionCard extends Component {
  render() {
    const { election, classes } = this.props

    return (
      <Card className={classes.card}>
        <CardContent
          classes={{
            root: classes.cardContent
          }}
        >
          <Title fontSize={30}>
            {election.name}
          </Title>

          <Grid
            container
            direction='column'
            alignItems='flex-start'
            justify='flex-start'
          >
            <Grid
              container
              direction='row'
              alignItems='center'
              justify='flex-start'
            >
              <Grid item>
                <Typography className={classes.detail}>Status:</Typography>
              </Grid>

              <Grid item>
                <StatusSymbol variant={election.status}/>
              </Grid>
            </Grid>

            <Grid item>
              <Typography className={classes.detail}>Votes: {election.noOfVotes}</Typography>
            </Grid>

            <Grid item>
              <Typography className={classes.detail}>Voters: {election.noOfVoters}</Typography>
            </Grid>

            <Grid item>
              <Typography className={classes.detail}>Positions: {election.noOfPositions}</Typography>
            </Grid>

            <Grid item>
              <Typography className={classes.detail}>Candidates: {election.noOfCandidates}</Typography>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Grid 
              container
              direction='row'
              alignItems='center'
              justify='center'
            >
            <Link
              to={{
                pathname: ballotRoute.path,
                params: {election}
              }}
              className={classes.noTextDecoration}
            >
              <CastVoteButton />
            </Link>
          </Grid>
        </CardActions>
      </Card>
    )
  }
}

ElectionCard.propTypes = {
  election: PropTypes.object.isRequired
}

export default withStyles(styles)(ElectionCard)