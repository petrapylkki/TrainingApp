import React, { Component } from "react";
import ReactTable from "react-table";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment';
import "react-table/react-table.css";
import  { Icon } from 'antd';

class TrainingsList extends Component {
  constructor(props) {
    super(props);
    this.state = { trainings: [], open: false, message: '' };
  }

  componentDidMount() {
    this.fetchTrainings();
  }

  // Fetch trainings
  fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(res => res.json())
    .then(jsondata => this.setState({trainings: jsondata}))
}

  // Delete training
  deleteTraining = (link) => {
    fetch('https://customerrest.herokuapp.com/api/trainings/' + link, {method: "DELETE"})
    .then(res => this.fetchTrainings())
    .then(res => this.setState({open: true, message: "Training deleted"}))
    .catch(err => console.error(err))
}

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const columns = [
      {
        Header: "Date",
        accessor: "date",
        Cell: props => (
          <span>{moment.utc(props.value).format('DD.MM.YYYY HH:mm')}
          </span>
        )
      },
      {
        Header: "Duration (min)",
        accessor: "duration"
      },
      {
        Header: "Activity",
        accessor: "activity"
      },
      {
        id: "Customer",
        Header: "Customer",
        accessor: row => row.customer.firstname + ' ' + row.customer.lastname
      },
      {
        Header: "",
        filterable: false,
        sortable: false,
        width: 90,
        accessor: "id",
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
