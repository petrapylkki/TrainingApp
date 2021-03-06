import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Icon } from 'antd';

class AddTrainings extends Component {
  state = {
    open: false, date: "", activity: "", duration: "", customer: ""
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  saveTraining = () => {
    const newTraining = {
      date: this.state.date + ":00.000",
      duration: this.state.duration,
      activity: this.state.activity,
      customer: this.props.customer
    }

    this.props.addTraining(newTraining);
    this.handleClose();
  }

  render() {
    return (
      <div>
        <Button className="button" variant="outlined" color="default" onClick={this.handleClickOpen}>
          Add Training
          <Icon type="plus-circle" className="iconnav"/></Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add new training for a customer</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" name="activity" value={this.state.activity} onChange={this.handleChange} label="Activity" fullWidth/>
            <TextField margin="dense" name="duration" value={this.state.duration} onChange={this.handleChange} label="Duration (min)" fullWidth/>
            <TextField type="datetime-local" margin="dense" name="date" value={this.state.date} onChange={this.handleChange}  fullWidth/>          
          </DialogContent>
          <DialogActions>
            <Button onClick={this.saveTraining} color="primary">
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

export default AddTrainings;
