import React, { Component } from 'react';
import Modal from 'react-modal';
import { observer } from 'mobx-react';


class UserAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisibility:'',
      userName: '',
      userJob: '', // In Rupees
      errors: {
        userName: {
          active: false,
          message: 'User name cannot be empty'
        },
        userJob: {
          active: false,
          message: 'Job cannot be empty'
        },
      },
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value }, ()=> { console.log( this.state.userName, this.state.userJob ) });
  }

  handleSubmit(event) {
    event.preventDefault();
    
     // Boolean Variables to check required field empty or not
     let isUserNameEmpty;
     let isUserJobEmpty;
 
 
     const { userName, userJob } = this.state;
 
     if (userName === '') {
      isUserNameEmpty = true;
     }
 
     if (userJob === '') {
      isUserJobEmpty = true;
     }
 
     this.setState({
       errors: {
        userName: {
           ...this.state.errors.userName,
           active: isUserNameEmpty
         },
         userJob: {
           ...this.state.errors.userJob,
           active: isUserJobEmpty
         },
       }
     }, function () {
 
       // iterating through errors state to check whether there is error or not
       for (let err of Object.keys(this.state.errors)) {
         if (this.state.errors[err].active) {
           return
         }
       }
 
       this.setState({
        modalVisibility: false
       }, function () {
        var data = {
          "name": this.state.username,
          "job": this.state.userJob
        }
         // Resetting the input state values after successfully submit
        //  this.setState({
        //   userName: '',
        //   userJob: ''
        // });
        fetch("https://reqres.in/api/users", {
          method: "POST",body:  JSON.stringify(data)
        })
        .then(function(response){ 
          return response.json();   
        })
        .then(function(data){ 
          console.log(data)
        });

         // Adding values to redux state
         this.props.userStore.addUser({ userName, userJob });
       });
     });

  }

  render() {
    const { userName, userJob } = this.state;

    return (
      <Modal
          isOpen={this.props.isOpen}
          onRequestClose={this.props.toggleUserModalVisibility}
          ariaHideApp={false}
        >
        <form onSubmit={this.handleSubmit}>
          <div className="modal-body">
            <div className="form-wrapper">
              <div className="form-item">
                <label>User Name:</label>
                <input name="userName" className={`${this.state.errors.userName.active ? 'input-error' : ''}`} type="text" placeholder="" value={userName} onChange={this.handleChange} />
                {this.state.errors.userName.active &&
                  <span className="error-msg">{`${this.state.errors.userName.message}`}</span>
                }
              </div>
              <div className="form-item">
                <label>Job:</label>
                <input name="userJob" className={`${this.state.errors.userJob.active ? 'input-error' : ''}`} type="text" placeholder="" value={userJob} onChange={this.handleChange} />
                {this.state.errors.userJob.active &&
                  <span className="error-msg">{this.state.errors.userJob.message}</span>
                }
              </div>
              <div className="form-item">
                <button type="submit" className="btn-primary">Ok</button>
                <button className="btn-secondary" onClick={this.props.modalHandler}>Cancel</button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    )
  }
}

UserAdd = observer(UserAdd);

export default UserAdd;
