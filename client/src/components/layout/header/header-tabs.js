import React from 'react'
import AccountCircle from '@material-ui/icons/AccountCircle'

import Profile from '../../content/profile/profile'

const style = {
  fontSize: 36,
  color: '#e0e0e0'
}

export const headerTabs = [
  {
    label: 'Profile',
    icon: <AccountCircle style={style} />,
    path: '/profile',
    component: <Profile />
  },
]