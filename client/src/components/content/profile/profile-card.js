import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Divider   from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import Roles from '../../../roles/roles'

import EditButton from '../../customized/buttons/edit'

const styles = theme => ({
  card: {
    padding: theme.spacing.unit * 2,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 20,
  },
  detail: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  value: {
    fontSize: 20,
    color: '#9e9e9e'
  },
  noTextDecoration: {
    textDecoration: 'none'
  }, 
  cardContent: {
   padding: 0,
  },
  profileData: {
    marginTop: theme.spacing.unit,
  },
  dividerBlack: {
    backgroundColor: '#212121'
  },
  dividerGrey: {
    backgroundColor: '#9e9e9e'
  }
})

class ProfileCard extends Component {
  getProfileData = (profile) => {
    let profileData = []

    Object.keys(profile).forEach((key) => {
      let data = {
        label: '', 
        value: ''
      }
      if(key === 'name') {
        data.label = 'Name'
        data.value = profile[key]
      } else if (key === 'studentNo') {
        data.label = 'Student Number'
        data.value = profile[key]
      } else if (key === 'role') {
        data.label = 'User Role'
        data.value = profile[key]
      } else if (key === 'accountAddress') {
        data.label = 'Public Account Address'
        data.value = profile[key]
      }

      profileData.push(data)
    })


    return profileData
  }

  render() {
    const { profile, classes, handleOpenEditProfileDialog } = this.props
    const profileData = this.getProfileData(profile)

    return (
      <Card className={classes.card}>
        <CardContent
          classes={{
            root: classes.cardContent
          }}
        >
          <Grid
            container
            direction='row'
            alignItems='center'
            justify='flex-start'
            spacing={40}
          >
            <Grid item>
              <Typography className={classes.title}>User Profile</Typography>
            </Grid>

            {profile.role !== Roles.publicUser && profile.role !== Roles.voter ? 
              <Grid item>
                <EditButton 
                  tooltipTitle='Edit account details'
                  placement='right'
                  iconSize={32}
                  onClick={handleOpenEditProfileDialog}
                />
              </Grid> : null
            }
          </Grid>

          <Divider className={classes.dividerBlack}/>

          <Grid
            container
            direction='column'
            alignItems='center'
            justify='flex-start'
          >
            {profileData.map((data, index) => {
              return (
                <Grid 
                  key={index}
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
                    className={classes.detail}
                  >
                    <Grid xs={6} item>
                      <Typography className={classes.label}>{data.label} </Typography>
                    </Grid>
                    
                    <Grid xs={6} item>
                      <Typography className={classes.value}>{data.value} </Typography>
                    </Grid>
                  </Grid>

                  {index !== profileData.length - 1 && 
                    <Grid item style={{width:'100%'}}>
                      <Divider />
                    </Grid>
                  }
                </Grid>
              )
            })}
          </Grid>

          <Divider className={classes.dividerBlack}/>
        </CardContent> 
      </Card>
    )
  }
}

ProfileCard.propTypes = {
  profile: PropTypes.object.isRequired,
  handleOpenEditProfileDialog: PropTypes.func.isRequired,
}

export default withStyles(styles)(ProfileCard)