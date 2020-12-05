import React from 'react'
import styles from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";
import { Button, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link'


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),

  ];


export class EventTable extends React.Component {
    render() {
        const {classes} = this.props
        return (
            <Paper className={classes.eventsPaper}>
               <Typography variant="h4" className={classes.welcome}>Upcoming events</Typography>
               <div className={classes.table}>
               <TableContainer component={Paper} >
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Event Title</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Participants</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right"><Link>View</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    <Button className={classes.nextBtn} variant="contained" color="primary">View more..</Button>
            </Paper>
        )
    }
}

export default withStyles(styles)(EventTable)
