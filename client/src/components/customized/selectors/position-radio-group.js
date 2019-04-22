import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
})

class PositionRadioGroup extends Component {
  constructor(props) {
    super(props)

    this.isChecked = this.isChecked.bind(this)
  }


  isChecked(candidateId){
    const { positionState } = this.props

    if(positionState){
      if(positionState.candidateIds[candidateId]) {
        return positionState.candidateIds[candidateId]
      }

      return false
    }

    return false
  }
  
  render() {
    const { classes, position, handlePositionChange } = this.props

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">{position.name}</FormLabel>
          <FormGroup>

            {position.candidateList.map((candidate) => {
              return (
                <FormControlLabel
                  key={candidate.id}
                  control={
                    <Checkbox
                      checked={this.isChecked(candidate.id)}
                      onChange={(event) => {
                        let checked = event.target.checked
                        handlePositionChange(candidate.id, checked, position)
                      }}
                    />
                }
                  label={candidate.name}
                />
              )
            })}
            
          </FormGroup>
          <FormHelperText>Max no of candidates that can be selected: {position.maxNoOfCandidatesThatCanBeSelected}</FormHelperText>
        </FormControl>
        
      </div>
    )
  }
}

PositionRadioGroup.propTypes = {
  position: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    hasAbstain: PropTypes.bool.isRequired,
    maxNoOfCandidatesThatCanBeSelected: PropTypes.string.isRequired,

    candidateList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      positionId: PropTypes.string.isRequired,
      positionName: PropTypes.string.isRequired,
    })).isRequired
  }).isRequired,

  handlePositionChange: PropTypes.func.isRequired
}


export default withStyles(styles)(PositionRadioGroup)