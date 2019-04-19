import React from 'react'

import EditPage from './edit-page'

class EditPageContainer extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      hasAbstain: props.location.state.position.hasAbstain,
      openAddCandidateDialog: false,
    }

    this.handleAbstainCheckboxChange = this.handleAbstainCheckboxChange.bind(this)
    this.handleCloseAddCandidateDialog = this.handleCloseAddCandidateDialog.bind(this)
    this.handleOpenAddCandidateDialog = this.handleOpenAddCandidateDialog.bind(this)
  }

  handleAbstainCheckboxChange(checked) {
    this.setState({ hasAbstain: checked})
  }

  handleCloseAddCandidateDialog() {
    this.setState({ openAddCandidateDialog: false })
  }

  handleOpenAddCandidateDialog() {
    this.setState({ openAddCandidateDialog: true })
  }


  render() {
    const { position } = this.props.location.state
    const { hasAbstain, openAddCandidateDialog } = this.state

    return(
      <EditPage 
        position = {position}
        hasAbstain = {hasAbstain}
        handleAbstainCheckboxChange={this.handleAbstainCheckboxChange}
        
        openAddCandidateDialog={openAddCandidateDialog}
        handleOpenAddCandidateDialog={this.handleOpenAddCandidateDialog}
        handleCloseAddCandidateDialog={this.handleCloseAddCandidateDialog}
      />
    )
  }
} 

export default EditPageContainer