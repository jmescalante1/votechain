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
    width: '50%',
    fontSize: 14,
    color: '#424242',
    marginBottom: '12pt'
  },
  columnHeader: {
    width: '50%',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: '18pt'
  }
});

class BulletinBoardPDF extends Component {
  render() {
    const { election, ballotList } = this.props
    console.log(ballotList)

    return (
      <Document>
        <Page
          wrap={true}
          style={styles.page}
        >
          <View style={styles.title} fixed>
            <Text>Public Bulletin Board of Votes</Text>
          </View>
          <View style={styles.subtitle} fixed>
            <Text>{election.name}</Text>
          </View>

          {Object.keys(ballotList).map((voterKeyAddress) => {  
            let ballot = ballotList[voterKeyAddress]

            return (  
              <View style={styles.section} key={voterKeyAddress}>
                <Text style={styles.sectionTitle}>{voterKeyAddress}</Text>
                <Text style={styles.line}></Text>

                <View style={styles.subsection}>
                  <View style={styles.row}>
                    <Text style={styles.columnHeader}>Position</Text>
                    <Text style={styles.columnHeader}>Candidate(s)</Text>
                  </View>

                  {Object.keys(ballot.voteList).map((positionName) => {
                    let candidateList = ballot.voteList[positionName].candidateList

                    return (
                      <View style={styles.row} key={positionName}>
                        <Text style={styles.cell}>{positionName}</Text>
                        <Text style={styles.cell}>
                          {candidateList.map((candidate, index) => {
                            return (
                              <Text key={candidate}>{candidate}{index === candidateList.length - 1 ? '' : ', '}</Text>
                            )
                          })}
                        </Text>
                      </View>
                    )
                  })}
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

export default BulletinBoardPDF;