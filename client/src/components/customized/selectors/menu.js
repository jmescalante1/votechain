import React from 'react'
import PropTypes from 'prop-types'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'

import ArrowDropDown from '@material-ui/icons/ArrowDropDown'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  menuItem: {
    backgroundColor: '#9e9e9e'
  },
  button: {}
})

class CustomizedMenu extends React.Component {
  constructor() {
    super()
    
    this.state = {
      anchorEl: null,
    }

    this.onSelectChange = this.onSelectChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose(){
    this.setState({ anchorEl: null })
  }

  onSelectChange(option) {
    const { onSelectChange } = this.props
    
    onSelectChange(option)
    this.handleClose()
  }

  render() {
    const { anchorEl } = this.state
    const { options, label, classes } = this.props
    const open = Boolean(anchorEl)

    return (
      <div>
        <Button className={classes.button} onClick={this.handleClick}>  
          {label}
          <ArrowDropDown />
        </Button>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          TransitionComponent={Fade}
        >
          {options.map((option, index) => {
            return ( 
              <MenuItem onClick={() => this.onSelectChange(option)} key={index}>{option}</MenuItem>
            )
          })}
        </Menu>
      </div>
    )
  }
}

CustomizedMenu.propTypes = {
  options: PropTypes.array.isRequired,
  onSelectChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(CustomizedMenu)