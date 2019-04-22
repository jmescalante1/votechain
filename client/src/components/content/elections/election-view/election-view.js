import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Title from '../../../customized/texts/title'

class ElectionView extends Component {
  render() {
    const { election } = this.props 

    return (
      <div>
        <Title>
          {election.name}
        </Title>
      </div>
    )
  }
}

ElectionView.propTypes = {
  election: PropTypes.object.isRequired
}

export default ElectionView