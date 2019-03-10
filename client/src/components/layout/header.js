import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

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
    marginLeft: 'auto'
  },
 
})

class Header extends React.Component {
  render() {
    const { classes } = this.props

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
            <MenuIcon />
          </IconButton>

        <Typography variant='h6' color='inherit' noWrap>
          VoteChain
        </Typography>
          
          <div className={classes.tabs}>
            {this.props.headerTabs.map((props) => (
              <IconButton 
                key={props.label}
                color='inherit'
              >
                {props.icon}
              </IconButton>
            ))}
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

Header.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired
}

export default withStyles(styles, { withTheme: true })(Header)