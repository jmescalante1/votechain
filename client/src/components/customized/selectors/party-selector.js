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

class PartySelector extends React.Component {
  render(){
    const { classes, fontSize, partyList, handlePartySelectChange, width, error, placeholder} = this.props
    let calculatedWidth = width ? width : '60%'

    let options = partyList.map((party) => {
      return {
        value: party.id,
        label: (party.id + ' - ' + party.name)
      }
    })

    options.unshift({
      value: 0, // independent party/no party
      label: 'Independent'
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
            'red'  : 'black'
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
            onChange={handlePartySelectChange}
            placeholder={<Typography style={{color: error ? 'red' : null, fontSize: fontSize}}>{error ? error : placeholder ? placeholder : 'Select'}</Typography>}
            label={<Typography style={{color: error ? 'red' : null, fontSize: fontSize}}>Party</Typography>}
            isClearable={false}
          />
        </Grid>
      </Grid>
    )
  }
}

PartySelector.propTypes = {
  classes: PropTypes.object.isRequired,

  handlePartySelectChange: PropTypes.func.isRequired,
  partyList: PropTypes.arrayOf(PropTypes.object).isRequired,
  width: PropTypes.string,
  placeholder: PropTypes.string
}

export default withStyles(styles)(PartySelector)