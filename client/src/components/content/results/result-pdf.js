import React, { Component } from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { 
    padding: '1in'
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    margin: '12pt'
  },
  pageNumbers: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 12,
  },
  section: {
    marginTop: '24pt',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  subsection: {
    fontSize: 14,
    marginTop: '18pt',
    paddingLeft: '24pt',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },  
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  line: {
    backgroundColor: 'black',
    height: '1px',
    width: '100%',
  },
  cell: {
    width: '33%',
    fontSize: 14,
    color: '#424242',
    marginBottom: '12pt',
    flexWrap: 'wrap',
  },
  columnHeader: {
    width: '33%',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: '18pt',
    
  },
});

class ResultPDF extends Component {
  render() {
    const { currentFinishedElection } = this.props

    return (
      <Document>
        <Page
          wrap={true}
          style={styles.page}
        >
          <View style={styles.title} fixed>
            <Text>Election Results</Text>
          </View>
          <View style={styles.subtitle} fixed>
            <Text>{currentFinishedElection.name}</Text>
          </View>

          {currentFinishedElection.positionList.map((position) => {
            return (
               <View style={styles.section} key={position.id}>
                <Text style={styles.sectionTitle}>{position.name} </Text>
                <Text style={styles.line}></Text>
                
                <View style={styles.subsection}>

                  <View style={styles.row}>
                    <Text style={styles.columnHeader}>Candidate</Text>
                    <Text style={styles.columnHeader}>Votes Received</Text>
                    <Text style={styles.columnHeader}>Party</Text>
                  </View>

                  {position.candidateList.map((candidate) => {
                    return (
                      <View key={candidate.id} style={styles.row}>
                        <Text style={styles.cell}>{candidate.name}</Text>
                        <Text style={styles.cell}>{candidate.noOfVotesReceived}</Text>
                        <Text style={styles.cell}>{candidate.partyName}</Text>
                      </View>
                    )
                  })}
                  {position.hasAbstain && 
                    <View style={styles.row}>
                      <Text style={styles.cell}>Abstain</Text>
                      <Text style={styles.cell}>{position.abstain.noOfVotesReceived}</Text>
                      <Text style={styles.cell}>-</Text>
                    </View>
                    
                  }
                </View>
              </View>
            )
          })}

          <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
              `${pageNumber} / ${totalPages}`
          )} fixed />
        </Page>
      </Document>
    );
  }
}

export default ResultPDF;