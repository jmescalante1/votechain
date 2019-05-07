import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'

import MenuIcon from '@material-ui/icons/Menu'

import Icon from '../../customized/icons/icon'

const styles = theme => ({
  appBar: {
    backgroundColor: '#263238',
    zIndex: theme.zIndex.drawer + 1,  
  }, 
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  tabs: {
    marginLeft: 'auto',
  },
  tab: {
    '&:focus': {
      backgroundColor: '#006064'
    }
  },
  tabSelected: {
    backgroundColor: '#006064'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30
  },
  menuIcon: {
    fontSize: 36
  }
})

class Header extends React.Component {
  render() {
    const { classes, selectedMenu } = this.props

    return(
      <AppBar
        position='fixed'
        className={classes.appBar}
      >
        <Toolbar disableGutters={true} className={classes.toolbar} >
          <IconButton
            color='inherit'
            onClick={this.props.handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon className={classes.menuIcon}/>
          </IconButton>
        
          <Grid 
            container
            direction='row'
            alignItems='center'
            justify='space-between'  
          >
            <Grid item>
              <Grid
                container
                direction='row'
                alignItems='center'
                justify='flex-start'
                spacing={24}
              >
                <Grid item>
                  <Icon name='votechain' size={40} color='#FFFFFF'/>
                </Grid>
                
                <Grid item>
                  <Typography className={classes.title} color='inherit' noWrap>
                    VoteChain
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid
                container
                direction='row'
                alignItems='center'
                justify='flex-start'
              >
                {this.props.headerTabs.map((props) => (
                  <Grid key={props.label} item>
                    <Link 
                      to={props.path}
                    >
                      <IconButton
                        onClick={() => this.props.handleSelectedMenu(props.label)}
                        className={classNames(classes.tab, {
                          [classes.tabSelected]: props.label === selectedMenu
                        })}
                      >
                        {props.icon}
                      </IconButton>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}

Header.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
  handleSelectedMenu: PropTypes.func.isRequired,
  selectedMenu: PropTypes.string.isRequired
}

export default withStyles(styles, { withTheme: true })(Header)