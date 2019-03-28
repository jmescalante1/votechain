import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";


class ElectionTableHeader extends React.Component {
  constructor(){
    super()

    this.createSortHandler = this.createSortHandler.bind(this)
  }

  createSortHandler(property) {
    return (event) => {
      this.props.onRequestSort(event, property)
    }
  }

  render() {
    const { order, orderBy } = this.props;
    const headers = [
      {id: "id", label: "ID"},
      {id: "name", label: "Name"},
      {id: "status", label: "Status"},
      {id: "action", label: "Action"},
    ]

    return (
      <TableHead>
        <TableRow>
          {headers.map(
            header => (
              <TableCell
                key={header.id}
                sortDirection={orderBy === header.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement="bottom-start"
                  enterDelay={500}
                >
                  <TableSortLabel
                    active={orderBy === header.id}
                    direction={order}
                    onClick={this.createSortHandler(header.id)}
                  >
                    {header.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>  
      </TableHead>
    )
  }
}

ElectionTableHeader.propTypes = {
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

export default ElectionTableHeader