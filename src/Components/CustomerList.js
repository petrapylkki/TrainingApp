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
        id : "fullname",
        Header: "Full name",
        accessor: row => row.firstname + " " + row.lastname
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
        id : "address",
        Header: "Address",
        accessor: row => row.streetaddress + ", " + row.postcode + ", " + row.city
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
