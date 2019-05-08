import React, { Component } from "react";
import ReactTable from "react-table";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment';
import "react-table/react-table.css";
//import { CSVLink } from "react-csv";

class TrainingsList extends Component {
  constructor(props) {
    super(props);
    this.state = { trainings: [], open: false, message: '' };
  }

  componentDidMount() {
    this.loadTrainings();
  }

  // Fetch trainings
  loadTrainings = () => {
    fetch ('https://customerrest.herokuapp.com/gettrainings')
    .then (response => response.json())
    .then (jsondata => this.setState({trainings: jsondata}))
    .catch(err => console.error(err));
}

  // Delete training
  deleteTraining = (trainingLink) => {
    if(window.confirm("Are you sure?")) {
      fetch(trainingLink, 
        { method: "DELETE" })
        .then(res => this.loadTrainings())
        .then(res => this.setState({open: true, message: 'Training deleted'}))
        .catch(err => console.error(err));
    }
  };

  handleClose = (event, reason) => {
    this.setState({ open: false });
  };

  render() {
    const columns = [
      {
        Header: "Date",
        accessor: "date",
        Cell: props => moment.utc(props.date).format('L')
      },
      {
        Header: "Duration",
        accessor: "duration"
      },
      {
        Header: "Activity",
        accessor: "activity"
      },
      {
        Header: "First name",
        accessor: "customer.firstname"
      },
      {
        Header: "Last name",
        accessor: "customer.lastname"
      },
      {
        Header: "",
        filterable: false,
        sortable: false,
        width: 90,
        accessor: "links[0].href",
        Cell: ({ value }) => (
          <Button variant="outlined" color="secondary" size="small" onClick={() => this.deleteTraining(value)}>Delete</Button>
        )
      }
    ];

    return (
      <div>
        <ReactTable
          filterable={true}
          data={this.state.trainings}
          columns={columns}
          defaultPageSize={15}
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={2000}
          onClose={this.handleClose}
          message={this.state.message}
        />
      </div>
    );
  }
}

export default TrainingsList;
