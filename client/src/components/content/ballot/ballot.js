import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

import PositionRadioGroup from '../../customized/selectors/position-radio-group'
import SubmitButton from '../../customized/buttons/submit'
import Title from '../../customized/texts/title'

const styles = theme => ({
  submitButton: {
    margin: theme.spacing.unit * 2
  }
})

class Ballot extends Component {
  constructor(props) {
    super(props);
    
    this.handlePositionChange = this.handlePositionChange.bind(this)
  }
  
  handlePositionChange(candidateId, checked, position) {
    this.props.handleBallotChange(candidateId, checked, position)
  }

  render() {
    const { election, positionListState, handleOpenSubmitDialog, classes } = this.props

    return (
      <Paper>
        <Title fontSize={30}>{election.name}</Title>
        {election.positionList.map((position) => {
          return (
            <Fragment key={position.id}>
              <Divider /> 
              <PositionRadioGroup 
                position={position}
                positionState={positionListState[position.id]}
                handlePositionChange={this.handlePositionChange}
              />
            </Fragment>
          )
        })}
        {/* <div className={classes.actions}> */}
          <SubmitButton 
            classes={{
              button: classes.submitButton
            }} 
            onClick={handleOpenSubmitDialog}
          />
        {/* </div> */}
      </Paper>
    )
  }
}

Ballot.propTypes = {
  election: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,

    positionList: PropTypes.arrayOf(PropTypes.shape({
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
    })).isRequired
  }).isRequired,

  handleBallotChange: PropTypes.func.isRequired,
  handleOpenSubmitDialog: PropTypes.func.isRequired,
  positionListState: PropTypes.object.isRequired,
}

export default withStyles(styles)(Ballot)