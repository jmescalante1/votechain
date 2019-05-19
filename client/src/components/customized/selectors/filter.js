import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Menu from '../selectors/menu'

const styles = theme => ({
  label: {
    color: '#fafafa',
    fontSize: 17
  }, 
  menuButton: {
    color: '#fafafa'
  }
})

class Filter extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      selected: props.defaultSelectedOption
    }

    this.onSelectChange = this.onSelectChange.bind(this)
  }

  onSelectChange(option) {
    const { onSelectChange } = this.props

    this.setState({ selected: option })

    onSelectChange(option)
  }
  

  render() {
    const { classes, label, options } = this.props
    const { selected } = this.state

    return (
      <Grid 
        container 
        direction='row'
        alignItems='center'
        justify='flex-start'
        spacing={16}
      >
        <Grid item>
          <Typography className={classes.label}>{label}</Typography>
        </Grid>
        <Grid item> 
          <Menu 
            label={selected.label}
            options={options}
            onSelectChange={this.onSelectChange}
            classes={{
              button: classes.menuButton
            }}
          />
        </Grid>
      </Grid>
    )
  }
}

Filter.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    id: PropTypes.any.isRequired,
  })).isRequired,

  label: PropTypes.string.isRequired,
  onSelectChange: PropTypes.func.isRequired,
  defaultSelectedOption: PropTypes.shape({
    label: PropTypes.string.isRequired,
    id: PropTypes.any.isRequired,
  }).isRequired
}

export default withStyles(styles)(Filter)