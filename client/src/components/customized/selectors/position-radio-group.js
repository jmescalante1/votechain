import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import CheckBoxIcon from '@material-ui/icons/CheckBox'

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  formLabel: {
    fontSize: 25,
    color: '#212121',
  },
  formGroup: {
    margin: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2
  },
  checkBoxIcon: {
    color: '#b71c1c'
  },
  formHelperText: {
    color: '#e64a19 '
  },
  candidateName: {
    fontSize: 16
  },
  formLabelFocused: {
    color: '#212121',
  }
})

class PositionRadioGroup extends Component {
  constructor(props) {
    super(props)

    this.isChecked = this.isChecked.bind(this)
    this.isAbstainCheck = this.isAbstainCheck.bind(this)
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

  isAbstainCheck() {
    const { positionState } = this.props
    
    if(positionState){
      return positionState.isAbstain
    }

    return false
  }
  
  render() {
    const { classes, position, handleSelectCandidate, handleSelectAbstain } = this.props

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel 
            className={classes.formLabel}
            classes={{
              focused: classes.formLabelFocused,
            }} 
            component="legend"
          >
              {position.name}
          </FormLabel>
          
          <FormGroup className={classes.formGroup}>

            {position.candidateList.map((candidate) => {
              return (
                <FormControlLabel
                  key={candidate.id}
                  control={
                    <Checkbox
                      checkedIcon={<CheckBoxIcon className={classes.checkBoxIcon}/>}
                      checked={!this.isAbstainCheck() && this.isChecked(candidate.id)}
                      onChange={(event) => {
                        if(!this.isAbstainCheck())
                          handleSelectCandidate(candidate.id, event.target.checked, position)
                      }}
                    />
                }
                  label={<Typography className={classes.candidateName}>{candidate.name + '   (' + candidate.partyName + ')'}</Typography>}
                />
              )
            })}

            {position.hasAbstain && 
              <FormControlLabel
                key={position.abstainId}
                control={
                  <Checkbox
                    checked={this.isAbstainCheck()}
                    onChange={(event) => {
                      let checked = event.target.checked
                      handleSelectAbstain(position.abstainId, checked, position)
                    }}
                  />
                }
                label='Abstain'
              /> 
            }
          </FormGroup>
          <FormHelperText className={classes.formHelperText}>You are allowed to vote up to {position.maxNoOfCandidatesThatCanBeSelected} candidate(s).</FormHelperText>
        </FormControl>
        
      </div>
    )
  }
}

PositionRadioGroup.propTypes = {
  position: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    hasAbstain: PropTypes.bool.isRequired,
    maxNoOfCandidatesThatCanBeSelected: PropTypes.number.isRequired,

    candidateList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      positionId: PropTypes.number.isRequired,
      positionName: PropTypes.string.isRequired,
      partyName: PropTypes.string.isRequired,
      
    })).isRequired
  }).isRequired,

  handleSelectCandidate: PropTypes.func.isRequired,
  handleSelectAbstain: PropTypes.func.isRequired,
}


export default withStyles(styles)(PositionRadioGroup)