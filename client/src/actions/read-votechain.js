export async function getRole(votechain, accountKey) {
  if(await votechain.methods.isAdmin(accountKey).call()){
    return 'Administrator'
  } else if (await votechain.methods.isOfficial(accountKey).call()) {
    return 'Official'
  } else if (await votechain.methods.isVoter(accountKey).call()) {
    return 'Voter'
  }

  return 'Unregistered'
}

export async function getAdmin(adminKey, votechain) {
  let response = await votechain.methods.adminList(adminKey).call()
  let admin = {}

  admin.id = adminKey
  admin.name = response.name

  return admin
}

function convertStageToStatus(stage) {
  if(stage === 0) return 'Pending'
  else if (stage === 1) return 'Ongoing'
  else if (stage === 2) return 'Finished'
  return 'Unknown Status'
}
export async function getElection(electionKey, votechain) {
  let response = await votechain.methods.electionList(electionKey).call()
  let election = {}

  election.id = Number(electionKey)
  election.name = response.name
  election.status = convertStageToStatus(Number(response.stage))

  return election
}

export async function getRawPosition(positionKey, votechain){
  let position  = await votechain.methods.positionList(positionKey).call()
  return position
}

export async function getRawParty(partyKey, votechain){
  let party = await votechain.methods.partyList(partyKey).call()
  return party
}

export async function getParty(partyKey, votechain){
  let response = await votechain.methods.partyList(partyKey).call()
  
  let party = {}

  party.id = partyKey
  party.name = response.name
  party.electionId = Number(response.electionKey)

  return party
}

export async function getPartyListOfElection(electionKey, votechain){
  let partyList = []
  
  // get all parties with election key equal to the parameter
  let noOfParties = await votechain.methods.getNoOfParties().call()

  for(let partyIndex = 0; partyIndex < noOfParties; partyIndex++){
    let partyKey = await votechain.methods.partyKeyList(partyIndex).call()
    let party = await getParty(partyKey, votechain)

    if(party.electionId === electionKey){
      partyList.push(party)
    }
  }

  return partyList
}

export async function getPosition(positionKey, votechain) {
  let response = await votechain.methods.positionList(positionKey).call()
  let position = {}

  position.id = Number(positionKey)
  position.name = response.name
  position.maxNoOfCandidatesThatCanBeSelected = Number(response.maxNoOfCandidatesThatCanBeSelected)
  position.hasAbstain = response.isAbstainActive
  position.electionId = Number(response.electionKey)

  return position
}

export async function getCandidate(candidateKey, votechain) {
  let response = await votechain.methods.candidateList(candidateKey).call()
  let candidate = {}

  candidate.id = Number(candidateKey)
  candidate.name = response.name
 
  candidate.positionId = Number(response.positionKey)
  let position = await getRawPosition(response.positionKey, votechain)

  candidate.positionName = position.name

  if((await votechain.methods.isParty(response.partyKey).call())){
    let party = await getRawParty(Number(response.partyKey), votechain)

    candidate.partyName = party.name
  } else {
    candidate.partyName = 'Independent'
  }
  
  return candidate
}

export async function getVote(voteKey, votechain) {
  let response = await votechain.methods.voteList(voteKey).call()
 
  let vote = {}

  vote.id = Number(voteKey)
  vote.voterId = response.voterKey

  // get candidate name
  let candidate = await votechain.methods.candidateList(response.candidateKey).call()
  vote.candidateName = candidate.name

  // get position name
  let position = await votechain.methods.positionList(response.positionKey).call()
  vote.positionName = position.name

  return vote
}

export async function getElectionDetailsForElectionView(votechain, electionKey) {
  let election = await getElection(electionKey, votechain)

  let noOfPositions = await votechain.methods.getNoOfPositionsAt(electionKey).call()
  let noOfVoters = await votechain.methods.getNoOfVotersAt(electionKey).call()
  let noOfVotes = await votechain.methods.getNoOfVotesOfElection(electionKey).call()

  election.id = Number(electionKey)
  election.noOfPositions = Number(noOfPositions)
  election.noOfVoters = Number(noOfVoters)
  election.noOfVotes = Number(noOfVotes)

  let noOfCandidates = 0

  for(let i = 0; i < noOfPositions; i++){
    let positionKey = await votechain.methods.getPositionKeyAt(electionKey, i).call()
    noOfCandidates += Number(await votechain.methods.getNoOfCandidatesAt(positionKey).call())
  }

  election.noOfCandidates = noOfCandidates

  return election
}