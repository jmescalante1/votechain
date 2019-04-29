import React, {Component} from 'react';

// download html2canvas and jsPDF and save the files in app/ext, or somewhere else
// the built versions are directly consumable
// import {html2canvas, jsPDF} from 'app/ext';

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import ResultPDF from './result-pdf'

export default class Export extends Component {
  // constructor(props) {
  //   super(props);
  // }

  printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.output('dataurlnewwindow');
        pdf.save("results.pdf");
      })
    ;
  }

  render() {
    const { currentFinishedElection } = this.props

    return (
      <div>
        <div >
          <button onClick={this.printDocument}>Print</button>
        </div>
        {/* <div id="divToPrint"  style={{
          backgroundColor: '#f5f5f5',
          width: '210mm',
          minHeight: '297mm',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}> */}
        <div id='divToPrint'>
          <ResultPDF 
            currentFinishedElection={currentFinishedElection} 
          />
        </div>
        {/* </div> */}
      </div>
    );
  }
}