import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { PDFDownloadLink  } from '@react-pdf/renderer'
import DownloadButton from '../customized/buttons/download'

class Export extends Component {
  render() {
    const { document, fileName } = this.props

    return (
      <div>
        <PDFDownloadLink style={{textDecoration: 'none'}} document={document} fileName={fileName}>
          <DownloadButton />
        </PDFDownloadLink>
      </div>
    )
  }
}

Export.propTypes = {
  fileName: PropTypes.string.isRequired,
  document: PropTypes.element.isRequired
}

export default Export