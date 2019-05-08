import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Add from './Add';
import EditCustomer from './EditCustomer';
//import { CSVLink } from "react-csv";

class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = { customers: [], open: false, message: '' };
  }

  componentDidMount() {
    this.loadCustomers();
  }

  // Fetch customers
  loadCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(jsondata => this.setState({customers: jsondata.content}))
      .catch(err => console.error(err));
  };

  // Delete customer
  deleteCustomer = (customerLink) => {
    if(window.confirm("Are you sure?")) {
      fetch(customerLink, { method: "DELETE" })
        .then(res => this.loadCustomers())
        .then(res => this.setState({open: true, message: 'Customer deleted'}))
        .catch(err => console.error(err));
    }
  };

  addCustomer = (newCustomer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCustomer)
    })
    .then(res => this.loadCustomers())
    .then(res => this.setState({open: true, message: 'New customer saved'}))
    .catch(err => console.error(err));    
  }

  editCustomer = (link, customer) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
    .then(res => this.loadCustomers())
    .then(res => this.setState({open: true, message: 'Changes saved'}))
    .catch(err => console.error(err));    
  }

  handleClose = (event, reason) => {
    this.setState({ open: false });
  };

  render() {
    const columns = [
      {
        Header: "First name",
        accessor: "firstname",
        show: false
      },
      {
        Header: "Last name",
        accessor: "lastname",
        show: false
      },
      {
        Header: "Full name",
        accessor: "fullname",
        Cell: props => (
          <div>
            <span className="firstname">{props.original.firstname} </span>
            <span className="lastname">{props.original.lastname}</span>
          </div>
        )
      },
      {
        Header: "Street address",
        accessor: "streetaddress",
        show: false
      },
      {
        Header: "Postcode",
        accessor: "postcode",
        show: false
      },
      {
        Header: "City",
        accessor: "city",
        show: false
      },
      {
        Header: "Address",
        accessor: "address",
        Cell: props => (
          <div>
            <span className="streetaddress">{props.original.streetaddress} </span>
            <span className="postcode">{props.original.postcode} </span>
            <span className="city">{props.original.city}</span>
          </div>
        )
      },
      {
        Header: "Email",
        accessor: "email"
      },{
        Header: "Phone",
        accessor: "phone"
      },
      {
        Header: "",
        filterable: false,
        sortable: false,
        width: 90,
        accessor: "links.0.href",
        Cell: ({value, row}) => (<EditCustomer editCustomer={this.editCustomer} customer={row} link={value} />)

      }, {
        Header: "",
        filterable: false,
        sortable: false,
        width: 90,
        accessor: "links.0.href",
        Cell: ({ value }) => (
          <Button variant="outlined" color="secondary" size="small" onClick={() => this.deleteCustomer(value)}>Delete</Button>
        )
      }
    ];

    return (
      <div>
        <Add addCustomer={this.addCustomer} />
        <ReactTable
          filterable={true}
          data={this.state.customers}
          columns={columns}
          defaultPageSize={10}
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

export default CustomerList;
