import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import CustomizedSelect from './select'

const styles = theme => ({
  root: {},
  statusName: {
    fontSize: 18,
  },
})

class PositionSelector extends React.Component {
  render(){
    const { classes, fontSize, positionList, handlePositionSelectChange, width, error } = this.props
    let calculatedWidth = width ? width : '60%'

    const options = positionList.map((position) => {
      return {
        value: position.id,
        label: (position.id + ' - ' + position.name)
      }
    })

    const selectStyles = {
      control: (styles, state) => ({
        ...styles, 
        backgroundColor: '#fafafa',
        width: '100%',
        fontSize: fontSize,
        borderColor: state.isFocused ? 
          styles.border: error ? 
          'red' : styles.borderColor,
        
          '&:hover': {
            borderColor: state.isFocused ?
              '#ddd' : error ?
              'red'  : '#ddd'
          }
      }),
      menu: styles => ({
        ...styles,
        width: '100%',
        fontSize: fontSize
      }),
    }

    return(
      <Grid 
        className={classes.root}
        container
        direction='row'
        justify='flex-start'
        alignItems='center'
      >
        <Grid item xs={12}>
          <CustomizedSelect 
            width={calculatedWidth}
            selectStyles={selectStyles}
            options={options}
            onChange={handlePositionSelectChange}
            placeholder={<Typography style={{color: error ? 'red' : null, fontSize: fontSize}}>{error ? error : 'Select'}</Typography>}
            label={<Typography style={{color: error ? 'red' : null, fontSize: fontSize}}>Position</Typography>}
            isClearable={false}
          />
        </Grid>
      </Grid>
    )
  }
}

PositionSelector.propTypes = {
  classes: PropTypes.object.isRequired,

  handlePositionSelectChange: PropTypes.func.isRequired,
  positionList: PropTypes.arrayOf(PropTypes.object).isRequired,
  width: PropTypes.string
}

export default withStyles(styles)(PositionSelector)