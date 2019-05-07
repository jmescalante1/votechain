import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Drawer from '@material-ui/core/Drawer'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import Icon from '../../customized/icons/icon'

const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    display: 'flex',
    borderRightStyle: 'solid',
    borderLeftStyle: 'solid',
    borderWidthStyle: 'solid',
    borderWidth: 5,
    borderColor: '#263238',
    alignItems: 'start',
    backgroundColor: '#37474f',
    marginTop: 64,
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      marginTop: 55
    },
 
  },
  drawerOpen: {
    borderRightStyle: 'solid',
    borderLeftStyle: 'solid',
    borderWidthStyle: 'solid',
    borderWidth: 5,
    borderColor: '#263238',
    alignItems: 'start',
    backgroundColor: '#37474f',
    marginTop: 64,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down('sm')]: {
      marginTop: 50
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: 55
    },
  },
  drawerClose: {
    borderRightStyle: 'solid',
    borderLeftStyle: 'solid',
    borderWidthStyle: 'solid',
    borderWidth: 5,
    borderColor: '#263238',
    alignItems: 'start',
    backgroundColor: '#37474f',
    marginTop: 64,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: 55
    },
  },
  divider: {
    height: 10,
    width: '100%',  
    backgroundColor: '#263238'
  },
  list: {
    width: '100%',
  },

  listItemSelected: {
    backgroundColor: theme.palette.highlight.main,
    '&:focus': {
      backgroundColor: theme.palette.highlight.main
    }
  },
  noTextDecoration: {
    textDecoration: 'none'
  },
  sidebarHeader: {
    marginTop: theme.spacing.unit * 3
  }
})

class SideBar extends React.Component {
  render() {
    const { classes, openDrawer, userRole, location } = this.props

    return(
      <Drawer
        variant='permanent'
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: openDrawer,
          [classes.drawerClose]: !openDrawer,
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: openDrawer,
            [classes.drawerClose]: !openDrawer,
          }),
        }}
        open={openDrawer}
      >
        {openDrawer && 
          <Grid
            className={classes.sidebarHeader}
            container
            direction='column'
            alignItems='center'
            justify='center'
          >
            <Grid item><Icon name='votechain' size={50} color='#FFFFFF'/> </Grid>
            <Grid item><Typography style={{fontSize: 20, fontWeight: 'bold', color: '#fafafa'}}>VoteChain</Typography></Grid>
          </Grid>
        }
        
        <List className={classes.list}>
          {this.props.sidebarMainOptions.map((props) => (
            <div key={props.label}>
              {props.roles.includes(userRole) &&
                <Link
                  to={props.path}
                  className={classes.noTextDecoration}
                >
                  <MenuItem 
                    button  
                    className={classNames(classes.listItem, {
                      [classes.listItemSelected]: props.path === location.pathname
                    })}
                  >
                    <ListItemIcon style={{fontSize: 15, color: '#fafafa'}}>{props.icon}</ListItemIcon>
                    
                    <ListItemText 
                      disableTypography 
                      primary={<Typography style={{fontSize: 15, fontWeight: 'bold', color: '#fafafa'}}>{props.label}</Typography>} 
                    />
                  </MenuItem>
                </Link>
              }
            </div>
          ))}
        </List>

        <Divider className={classes.divider}/>
        
        <List className={classes.list}>
          {this.props.sidebarSecondaryOptions.map((props) => (
            <div key={props.label}>
              {props.roles.includes(userRole) && 
                <Link 
                  to={props.path}
                  className={classes.noTextDecoration}
                >
                  <MenuItem 
                    button 
                    className={classNames(classes.listItem, {
                      [classes.listItemSelected]: props.path === location.pathname
                    })} 
                  >
                    <ListItemIcon style={{fontSize: 15, color: '#fafafa'}}>{props.icon}</ListItemIcon>
                    
                    <ListItemText 
                      disableTypography 
                      primary={<Typography style={{fontSize: 15, fontWeight: 'bold', color: '#fafafa'}}>{props.label}</Typography>} 
                    />
                  </MenuItem>
                </Link>
              }
            </div>
          ))}
        </List>
      </Drawer>
    )
  }
}

const mapStateToProps = state => ({
  userRole: state.account.profile.role,
  location: state.router.location,
})

const mapDispatchToProps = {

}

SideBar.propTypes = {
  openDrawer: PropTypes.bool.isRequired,
  sidebarMainOptions: PropTypes.arrayOf(PropTypes.object),
  sidebarSecondaryOptions: PropTypes.arrayOf(PropTypes.object)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(SideBar))
