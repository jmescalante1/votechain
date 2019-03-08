import React, { Fragment } from 'react'
import classNames from 'classnames'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'

import Drawer from './customizations/drawer.css'

// import Drawer from '@material-ui/core/Drawer'

class MiniDrawer extends React.Component {
  constructor() {
    super()

    this.state = {
      open: false
    }
  }

  render() {
    const mainMenu = ['Elections', 'Positions', 'Parties', 'Candidates', 'Voters', 'Results']
    const additionalMenu = ['Administrators', 'Officials']

    return ( 
      <Fragment>
        <Drawer
          // variant="permanent"
          
          className="drawerOpen"

          
          // className={classNames('drawer', {
          //   'drawerOpen': this.state.open,
          //   'drawerClose': !this.state.open,
          // })}
          // classes={{
          //   paper: classNames({
          //     'drawerOpen': this.state.open,
          //     'drawerClose': !this.state.open,
          //   }),
          // }}

          
          open={true}
        >
          <List>
            {mainMenu.map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          
          <Divider />

          <List>
            {additionalMenu.map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Fragment>
    )
  }
}

export default MiniDrawer
