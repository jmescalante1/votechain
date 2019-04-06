import React from 'react'

import EditPage from './edit-page'

class EditPageContainer extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      hasAbstain: props.location.state.position.hasAbstain,
    }

    this.handleAbstainCheckboxChange = this.handleAbstainCheckboxChange.bind(this)
  }

  handleAbstainCheckboxChange(checked) {
    this.setState({ hasAbstain: checked})
  }


  render() {
    const { position } = this.props.location.state
    const { hasAbstain } = this.state

    return(
      <EditPage 
        position = {position}
        hasAbstain = {hasAbstain}
        handleAbstainCheckboxChange={this.handleAbstainCheckboxChange}
      />
    )
  }
} 

export default EditPageContainer