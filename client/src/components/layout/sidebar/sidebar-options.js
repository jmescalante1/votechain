import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ElectionIcon from '@material-ui/icons/HowToVote'

import ResultIcon from '@material-ui/icons/Poll'

const style = {
  width: 30,
  fontSize: 24,
}

export const sidebarMainOptions = [
  {
    label: 'Elections',
    icon: <ElectionIcon style={style}/>
  },
  {
    label: 'Positions',
    icon: <FontAwesomeIcon style={style} icon='clipboard-list' />
  },
  {
    label: 'Parties',
    icon: <FontAwesomeIcon style={style} icon='users' />
  },
  {
    label: 'Candidates',
    icon: <FontAwesomeIcon style={style} icon='address-card' />
  },
  {
    label: 'Voters',
    icon: <FontAwesomeIcon style={style} icon='person-booth' />
  },
  {
    label: 'Results',
    icon: <ResultIcon style={style} />
  }
]

export const sidebarSecondaryOptions = [
  {
    label: 'Administrators',
    icon: <FontAwesomeIcon style={style} icon='user-tie' />,
  },
  {
    label: 'Officials',
    icon: <FontAwesomeIcon style={style} icon='user-cog' />
  }
]