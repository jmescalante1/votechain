import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Fab from "@material-ui/core/Fab"
import Tooltip from "@material-ui/core/Tooltip"
import AddCircle from "@material-ui/icons/AddCircle"
import { lighten } from "@material-ui/core/styles/colorManipulator"

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit * 2,
    backgroundColor: '#006064'
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actionIcon:{
    marginRight: theme.spacing.unit,
    // color: theme.palette.text.main
    color: '#006064'
  },
  title: {
    flex: "0 0 auto",
    color: theme.palette.text.main
  },
  fab: {
    margin: theme.spacing.unit,
    backgroundColor: '#ffffff',
    // color: theme.palette.text.main,
    color: '#006064'
  },
})

class ElectionTableToolbar extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <Toolbar className= {classes.root}>
        <div className={classes.title}>
          <Typography className={classes.title} variant="h6" id="tableTitle">
            Elections
          </Typography>
        </div>

        <div className={classes.spacer} />

        <Tooltip title="Add new election">
          <Fab size="large" variant="extended" className={classes.fab}>
            <AddCircle className={classes.actionIcon} />
            Add Election
          </Fab>
        </Tooltip>
      
      </Toolbar>
    )
  }
}

ElectionTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(toolbarStyles)(ElectionTableToolbar)