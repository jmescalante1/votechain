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
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import { mainOptions, secondaryOptions } from './sidebar-options'

const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    alignItems: 'start',
    backgroundColor: '#37474f',
    marginTop: 64,
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    alignItems: 'start',
    backgroundColor: '#37474f',
    marginTop: 64,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
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
  },
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
        <Divider />
        <List>
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
        <Divider />
        <List>
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
