import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { PDFDownloadLink  } from '@react-pdf/renderer'
import ExportButton from '../customized/buttons/export'

class Export extends Component {
  render() {
    const { document, fileName, children } = this.props

    return (
      <div>
        <PDFDownloadLink style={{textDecoration: 'none'}} document={document} fileName={fileName}>
          {children ? children: <ExportButton />}
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