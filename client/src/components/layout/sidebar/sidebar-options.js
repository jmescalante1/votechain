import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ElectionIcon from '@material-ui/icons/HowToVote'

import ResultIcon from '@material-ui/icons/Poll'

import ElectionContainer from '../../content/elections/election-container' 
import PositionContainer from '../../content/positions/position-container'
import PartyContainer from '../../content/parties/party-container'
import CandidateContainer from '../../content/candidates/candidate-container'
import VoterContainer from '../../content/voters/voter-container'
import ResultContainer from '../../content/results/result-container'

import AdminContainer from '../../content/admin/admin-container'
import OfficialContainer from '../../content/officials/official-container'

const style = {
  width: 30,
  fontSize: 24,
}

export const sidebarMainOptions = [
  {
    label: 'Elections',
    icon: <ElectionIcon style={style}/>,
    path: '/elections',
    component: <ElectionContainer />

  },
  {
    label: 'Positions',
    icon: <FontAwesomeIcon style={style} icon='clipboard-list' />,
    path: '/positions',
    component: <PositionContainer />
  },
  {
    label: 'Parties',
    icon: <FontAwesomeIcon style={style} icon='users' />,
    path: '/parties',
    component: <PartyContainer />
  },
  {
    label: 'Candidates',
    icon: <FontAwesomeIcon style={style} icon='address-card' />,
    path: '/candidates',
    component: <CandidateContainer />
  },
  {
    label: 'Voters',
    icon: <FontAwesomeIcon style={style} icon='person-booth' />,
    path: '/voters',
    component: <VoterContainer />
  },
  {
    label: 'Results',
    icon: <ResultIcon style={style} />,
    path: '/results',
    component: <ResultContainer />
  }
]

export const sidebarSecondaryOptions = [
  {
    label: 'Admin',
    icon: <FontAwesomeIcon style={style} icon='user-tie' />,
    path: '/admin',
    component: <AdminContainer />
  },
  {
    label: 'Officials',
    icon: <FontAwesomeIcon style={style} icon='user-cog' />,
    path: '/officials',
    component: <OfficialContainer />
  }
]