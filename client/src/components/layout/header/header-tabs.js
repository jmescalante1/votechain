import React from 'react'
import AccountCircle from '@material-ui/icons/AccountCircle'
import HomeIcon from '@material-ui/icons/Home'

import Profile from '../../content/profile/profile'
import Home from '../../content/home/home'

const style = {
  fontSize: 36,
  color: '#e0e0e0'
}

export const headerTabs = [
  {
    label: 'Home',
    icon: <HomeIcon style={style} />,
    path: '/home',
    component: Home 
  },
  {
    label: 'Profile',
    icon: <AccountCircle style={style} />,
    path: '/profile',
    component: Profile
  },
]