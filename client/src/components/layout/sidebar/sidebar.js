import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import Drawer from '@material-ui/core/Drawer'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

const drawerWidth = 240;

const styles = theme => ({
  drawer: {
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
  listItem: {
    '&:focus': {
      backgroundColor: '#006064'
    }
  },
  listItemSelected: {
    backgroundColor: '#006064'
  }
})

class SideBar extends React.Component {
  constructor(){
    super()

    this.state = {
      selectedDrawerItem: ''
    }
  }

  render() {
    const { classes, openDrawer, selectedDrawerItem } = this.props

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
        <List className={classes.list}>
          {this.props.sidebarMainOptions.map((props) => (
            <Link
              key={props.label}
              to={props.path}
            >
              <MenuItem 
                button  
                onClick={() => this.props.handleSelectedDrawerItem(props.label)}
                className={classNames(classes.listItem, {
                  [classes.listItemSelected]: props.label === selectedDrawerItem
                })}
              >
                <ListItemIcon style={{color: '#e0e0e0'}}>{props.icon}</ListItemIcon>
                
                <ListItemText 
                  disableTypography 
                  primary={<Typography style={{color: '#e0e0e0'}}>{props.label}</Typography>} 
                />
              </MenuItem>
            </Link>
          ))}
        </List>

        <Divider className={classes.divider}/>
        
        <List className={classes.list}>
          {this.props.sidebarSecondaryOptions.map((props) => (
            <Link 
              key={props.label}
              to={props.path}
            >
              <MenuItem 
                button 
                onClick={() => this.props.handleSelectedDrawerItem(props.label)} 
                className={classNames(classes.listItem, {
                  [classes.listItemSelected]: props.label === selectedDrawerItem
                })} 
              >
                <ListItemIcon style={{color: '#e0e0e0'}}>{props.icon}</ListItemIcon>
                
                <ListItemText 
                  disableTypography 
                  primary={<Typography style={{color: '#e0e0e0'}}>{props.label}</Typography>} 
                />
              </MenuItem>
            </Link>
          ))}
        </List>
      </Drawer>
    )
  }
}

SideBar.propTypes = {
  openDrawer: PropTypes.bool.isRequired,
  handleSelectedDrawerItem: PropTypes.func.isRequired,
  selectedDrawerItem: PropTypes.string.isRequired,
  sidebarMainOptions: PropTypes.arrayOf(PropTypes.object),
  sidebarSecondaryOptions: PropTypes.arrayOf(PropTypes.object)
}

export default withStyles(styles, { withTheme: true })(SideBar)
