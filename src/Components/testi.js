import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Add from './Add';
import EditCustomer from './EditCustomer';
import Snackbar from '@material-ui/core/Snackbar';
import AddTrainings from './AddTrainings';
//import DeleteDialog from './DeleteDialog';
//import ShowTrainings from './ShowTrainings'

class CustomerList extends Component {

    constructor(props) {
        super(props);
        this.state = {customers: [], open: false, message: ""};
    }

    componentDidMount() {
        this.fetchCustomers();
    }
    
    fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(res => res.json())
        .then(jsondata => this.setState({customers: jsondata.content}))
    }

    addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
          })
          .then(res => this.fetchCustomers())
          .then(res => this.setState({open: true, message: "New customer saved"}))
          .catch(err => console.error(err));
    }

    deleteCustomer = (link) => {
            fetch(link, {method: "DELETE"})
            .then(res => this.fetchCustomers())
            .then(res => this.setState({open: true, message: "Customer deleted"}))
            .catch(err => console.error(err))
    }

    editCustomer = (link, customer) => {
        fetch(link, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
          })
          .then(res => this.fetchCustomers())
          .then(res => this.setState({open: true, message: "Customer edited"}))
          .catch(err => console.error(err));
    }

    addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTraining)
          })
          .then(res => this.fetchCustomers())
          .then(res => this.setState({open: true, message: "New training saved"}))
          .catch(err => console.error(err));
    }

    handleClose = () => {
        this.setState({open: false})
    }

    render() {

        const columns = [
            {   //yhdistetään etu ja sukunimi samaan sarakkeeseen,
                //kommenttina toinen tapa (filtteri ei toimi tässä tavassa)
                id: "Name",
                Header: "Name",
                accessor: row => row.firstname + ' ' + row.lastname
              //  accessor: "name",
               // Cell: props => <span>{props.original.firstname} {props.original.lastname}</span>

            },
            {   //piilotettu sarake jotta edit pystyy hakemaan tiedot
                Header: "Firstname",
                accessor: "firstname",
                show: false
            },
            {   //piilotettu sarake jotta edit pystyy hakemaan tiedot
                Header: "Lastname",
                accessor: "lastname",
                show: false
            }, 
            {   
                id: "Address",
                Header: "Address",
                accessor: row => row.streetaddress + ', ' + row.postcode + ' ' + row.city
            },
            {   //piilotettu sarake jotta edit pystyy hakemaan tiedot
                Header: "Streetaddress",
                accessor: "streetaddress",
                show: false
            },
            {   //piilotettu sarake jotta edit pystyy hakemaan tiedot
                Header: "Postcode",
                accessor: "postcode",
                show: false
            },
            {   //piilotettu sarake jotta edit pystyy hakemaan tiedot
                Header: "City",
                accessor: "city",
                show: false
            },
            {
                Header: "Email",
                accessor: "email"
            },
            {
                Header: "Phone",
                accessor: "phone"
            },
            {
                Header:"",
                filterable: false,
                sortable: false,
                width: 100,
                accessor: "links[0].href",
                Cell: ({value, row}) => (<EditCustomer editCustomer={this.editCustomer} customer={row} link={value} />)
            },
            {
                Header: "",
                filterable: false,
                sortable: false,
                width: 200,
                accessor: "links[0].href",
                Cell: ({value}) => (<AddTrainings addTraining={this.addTraining} fetchCustomers={this.fetchCustomers} customer={value} />)
            },
        ]
        
        return (
            <div className="List">
                <h2>Customers</h2>
                <Add addCustomer={this.addCustomer} />
                <ReactTable filterable={true} sortable={true} data={this.state.customers} columns={columns}/>
                <Snackbar 
                open={this.state.open}
                autoHideDuration={3000}
                onClose={this.handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                message= {this.state.message}
              />
            </div>
        );
    }
}

export default CustomerList;