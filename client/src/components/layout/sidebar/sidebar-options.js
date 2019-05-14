import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ElectionIcon from '@material-ui/icons/HowToVote'
import VoteIcon from '@material-ui/icons/HowToVote'

import ResultIcon from '@material-ui/icons/Poll'
import BulletinBoardIcon from '@material-ui/icons/Dashboard'

import ElectionContainer from '../../content/elections/election-container' 
import PositionContainer from '../../content/positions/position-container'
import PartyContainer from '../../content/parties/party-container'
import CandidateContainer from '../../content/candidates/candidate-container'
import VoterContainer from '../../content/voters/voter-container'
import ResultContainer from '../../content/results/result-container'
import BulletinBoardContainer from '../../content/bulletin-board/bulletin-board-container'
import VoteContainer from '../../content/votes/vote-container'

import AdminContainer from '../../content/admin/admin-container'
import OfficialContainer from '../../content/officials/official-container'
import Roles from '../../../roles/roles'

const style = {
  width: 30,
  fontSize: 24,
}

export const sidebarMainOptions = [
  {
    label: 'Elections',
    icon: <ElectionIcon style={style}/>,
    path: '/elections',
    component: ElectionContainer,
    roles: [Roles.admin, Roles.official]
  },
  {
    label: 'Positions',
    icon: <FontAwesomeIcon style={style} icon='clipboard-list' />,
    path: '/positions',
    component: PositionContainer,
    roles: [Roles.admin, Roles.official]
  },
  {
    label: 'Parties',
    icon: <FontAwesomeIcon style={style} icon='users' />,
    path: '/parties',
    component: PartyContainer,
    roles: [Roles.admin, Roles.official]
  },
  {
    label: 'Candidates',
    icon: <FontAwesomeIcon style={style} icon='address-card' />,
    path: '/candidates',
    component: CandidateContainer,
    roles: [Roles.admin, Roles.official]
  },
  {
    label: 'Voters',
    icon: <FontAwesomeIcon style={style} icon='person-booth' />,
    path: '/voters',
    component: VoterContainer,
    roles: [Roles.admin, Roles.official]
  },
  {
    label: 'Vote',
    icon: <VoteIcon style={style} />,
    path: '/vote',
    component: VoteContainer,
    roles: [Roles.voter]
  },
  {
    label: 'Bulletin Board',
    icon: <BulletinBoardIcon style={style} />,
    path: '/bulletin-board',
    component: BulletinBoardContainer,
    roles: [Roles.admin, Roles.official, Roles.voter, Roles.publicUser]
  },
  {
    label: 'Results',
    icon: <ResultIcon style={style} />,
    path: '/results',
    component: ResultContainer,
    roles: [Roles.admin, Roles.official, Roles.voter, Roles.publicUser]
  },
]

export const sidebarSecondaryOptions = [
  {
    label: 'Admin',
    icon: <FontAwesomeIcon style={style} icon='user-tie' />,
    path: '/admin',
    component: AdminContainer,
    roles: [Roles.admin]
  },
  {
    label: 'Officials',
    icon: <FontAwesomeIcon style={style} icon='user-cog' />,
    path: '/officials',
    component: OfficialContainer,
    roles: [Roles.admin]
  }
]