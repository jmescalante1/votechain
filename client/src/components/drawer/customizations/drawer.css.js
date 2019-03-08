import styled from 'styled-components'
import Drawer from '@material-ui/core/Drawer'

const drawerWidth = '240px'

export default styled(Drawer)`
  && {
    width: ${drawerWidth};
    background-color: #135218;
    flex-shrink: 0;
    white-space: nowrap;
    margin-top: 65px;
  }

  &.drawerOpen {
    width: ${drawerWidth};
    background-color: #800000;
    transition: ${props => props.theme.transitions.create('width', {
      easing: `${props => props.theme.transitions.easing.sharp}`,
      duration: `${props => props.theme.transitions.duration.enteringScreen}`,
    })};
    margin-top: 65px;
  }

  &.drawerClose {
    overflow-x: hidden;
    width: ${props => props.theme.spacing.unit * 9 + 1};
    transition: ${props => props.theme.transitions.create('width', {
      easing: `${props => props.theme.transitions.easing.sharp}`,
      duration: `${props => props.theme.transitions.duration.leavingScreen}`
    })};
    margin-top: 65px;
  }
`;

