import React, { Component } from 'react';
import ReactTable from 'react-table';
import Snackbar from '@material-ui/core/Snackbar';
import 'react-table/react-table.css';
import AddTrainings from './AddTrainings'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {trainings: [], open: false, message: ''}
    }
    componentDidMount() {
        this.loadCustomers(); 
    }
    
    //Load customers
    loadCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then (response => response.json())
        .then (jsondata => this.setState({trainings: jsondata.content}))
    }
    
    //Add training for a selected customer
    addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(response => this.loadCustomers())
        .then(response => this.setState({open:true, message: 'New training added for a customer'}))
        .catch(err => console.error(err))
    }
    
    handleClose= () => {
        this.setState({open:false})
    }
    
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
                Header: "Name",
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
            },
            {
                Header: "Phone",
                accessor: "phone"
            },
            {
                Header: '',
                filterable: false,
                sortable: false,
                width: 180,
                accessor: "links.0.href",
                Cell: ({value}) => <AddTrainings addTraining={this.addTraining} loadCustomers={this.loadCustomers} customer = {(value)}/>
            },
    ]
    
        return(
                <div>
                  <ReactTable
                    filterable={true}
                    data={this.state.trainings}
                    columns={columns}
                    defaultPageSize={10}
                    />
    
                    <Snackbar
                        open = {this.state.open}
                        autoHideDuration = {2000}
                        onClose = {this.handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        message={this.state.message}
                        /> 
                </div>
        );
        }
    }
export default Home;
