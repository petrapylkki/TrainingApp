import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Icon } from 'antd';

class Add extends Component {
  state = {
    open: false, firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  saveCustomer = () => {
    const newCustomer = {
      lastname: this.state.lastname,
      firstname: this.state.firstname,
      postcode: this.state.postcode,
      city: this.state.city,
      streetaddress: this.state.streetaddress,
      email: this.state.email,
      phone: this.state.phone
    }

    this.props.addCustomer(newCustomer);
    this.handleClose();
  }

  

  render() {
    return (
      <div>
        <div class="jotain">
        <Button color="secondary" variant="contained" style={{margin:3}} aria-label="Add" onClick={this.handleClickOpen}>
        Add New Customer<Icon type="plus-circle" className="iconnav"/>
      </Button>
      </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Customer</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" name="firstname" value={this.state.firstname} onChange={this.handleChange} label="First name" fullWidth/>
            <TextField margin="dense" name="lastname" value={this.state.lastname} onChange={this.handleChange} label="Last name" fullWidth/>
            <TextField margin="dense" name="streetaddress" value={this.state.streetaddress} onChange={this.handleChange} label="Street address" fullWidth/>
            <TextField margin="dense" name="postcode" value={this.state.postcode} onChange={this.handleChange} label="Postcode" fullWidth/>
            <TextField margin="dense" name="city" value={this.state.city} onChange={this.handleChange} label="City" fullWidth/>
            <TextField margin="dense" name="email" value={this.state.email} onChange={this.handleChange} label="Email" fullWidth/>
            <TextField margin="dense" name="phone" value={this.state.phone} onChange={this.handleChange} label="Phone" fullWidth/>
          </DialogContent>
          <DialogActions>
          <Button onClick={this.saveCustomer} color="primary">
              Save
            </Button>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>        
      </div>
    );
  }
}

export default Add;
