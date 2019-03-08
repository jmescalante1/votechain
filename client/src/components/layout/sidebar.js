import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import Drawer from '@material-ui/core/Drawer'
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

import { mainOptions, secondaryOptions } from './sidebar-options'

const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    borderRightStyle: 'solid',
    borderLeftStyle: 'solid',
    borderWidthStyle: 'solid',
    borderWidth: 5,
    borderColor: "#263238",
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
    borderColor: "#263238",
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
    borderColor: "#263238",
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
  listItem: {
    width: '100%'
  }
})

class SideBar extends React.Component {
  render() {
    const { classes, openDrawer } = this.props

    return(
      <Drawer
        variant="permanent"
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
        <List className={classes.listItem}>
          {mainOptions.map((props) => (
            <ListItem button key={props.label}>
              <ListItemIcon style={{color: '#e0e0e0'}}>{props.icon}</ListItemIcon>
              <ListItemText 
                disableTypography 
                primary={<Typography style={{color: '#e0e0e0'}}>{props.label}</Typography>} 
              />
            </ListItem>
          ))}
        </List>
        <Divider className={classes.divider}/>
        <List className={classes.listItem}>
          {secondaryOptions.map((props) => (
            <ListItem button key={props.label} >
              <ListItemIcon style={{color: '#e0e0e0'}}>{props.icon}</ListItemIcon>
              <ListItemText 
                disableTypography 
                primary={<Typography style={{color: '#e0e0e0'}}>{props.label}</Typography>} 
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    )
  }
}

SideBar.propTypes = {
  openDrawer: PropTypes.bool.isRequired
}

export default withStyles(styles, { withTheme: true })(SideBar)
