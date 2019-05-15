import React, { Component } from 'react'

class Spacer extends Component {
  render() {
    const { height, width } = this.props
    const style = {
      width: width,
      height: height
    }

    return (
      <div style={style}></div>
    )
  }
}

export default Spacer