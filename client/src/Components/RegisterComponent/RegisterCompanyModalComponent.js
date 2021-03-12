import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
import {Alert, Form, Button, FormGroup, FormFeedback, Input} from 'reactstrap';
import axios from 'axios';
// import FacebookLogin from 'react-facebook-login';
// import GoogleLogin from 'react-google-login';
// import FontAwesome from 'react-fontawesome'


class RegisterCompanyModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    onShowAlert = (toggle) =>{
        this.setState({visible:true},()=>{
          window.setTimeout(()=>{
            toggle();
            this.setState({visible:false})
          },3000)
        });
    }

    validateSecond = () => {
        var linkPattern = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        let errors = {};
        
        if(!linkPattern.test(this.state.website)) errors.website = 'Invalid URL.';
        if (this.state.about_me === '') errors.about_me = 'Please tell us about_me your company.';

        return errors;
    }

    validateFirst = () => {
        var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        let errors = {};

        if (this.state.company_name === '') errors.company_name = 'Please enter your company name.';
        if(!emailPattern.test(this.state.email)) errors.email = 'Invalid email address.';
        if (this.state.password === '') errors.password = 'Please enter a password.';
        if(this.state.password !== this.state.confirm_password) errors.confirm_password = 'Passwords do not match.';

        return errors;
    }

    getInitialState = () => ({
        company_name: '',
        email: '',
        password: '',
        confirm_password: '',
        phone_number: '',
        website: '',
        about_me: '',
        errors: {},
        currentModal: 0,
        visible: false
    });

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
    }

    submitForm = (data) => {
        const url = 'https://projects-21.herokuapp.com/api/auth/company_register';
        const requestOptions = {
            method: 'POST',
            cache: "no-cache",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        axios.post(url, {data})
        .then(response => {
            console.log("respone" + response);
            console.log("respone data" + response.data);
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const errors = this.validateSecond();
        const data = { "company_name":this.state.company_name, 
                        "email":this.state.email,
                        "password":this.state.password,
                        "phone_number":this.state.phone_number,
                        "website":this.state.website,
                        "about_me":this.state.about_me };

        if (Object.keys(errors).length === 0) {
            console.log(data);
            // this.submitForm(data); // send the data to the server
            // this.setState(this.getInitialState()); // if success, reset all fields
        } else {
            this.setState({ errors });
        }
        //     this.onShowAlert(toggle);
        //     console.log("submited");
    }

    handleNext = () => {
        const errors = this.validateFirst();
        if (Object.keys(errors).length === 0) {
            this.setState({currentModal: 1 });
        } 
        else {
            this.setState({ errors : errors });
        }
    }

    handlePrev = () => {
        this.setState({currentModal: 0 });
    }

    // responseFacebook = (response) => {
    //     console.log(response);
    // }
  
    // responseGoogle = (response) => {
    //     console.log(response);
    // }

    render() {
        const { errors } = this.state;
        const showAlert = this.state.visible ? 
                    <Alert style={{textAlign:"center"}} variant="success">
                        Company Created Successfully!</Alert> : null;

        // const fbButton = <FacebookLogin
        //                  appId="" //APP ID NOT CREATED YET
        //                  fields="name,email,picture"
        //                  callback={this.responseFacebook}/>;
        // const googleButton = <GoogleLogin
        //                     clientId="" //CLIENTID NOT CREATED YET
        //                     buttonText="LOGIN WITH GOOGLE"
        //                     onSuccess={this.responseGoogle}
        //                     onFailure={this.responseGoogle} 
        //                     isSignedIn={true}/>;

        return (
            <div> {this.state.currentModal === 0 ?
            <Modal show={this.props.isOpen} onHide={this.props.toggle}
                aria-labelledby="contained-modal-title-vcenter" centered dialogClassName="modal-70w" className="registerCompanyModal">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter"> CREATE ACOUNT </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* {googleButton} {fbButton} <br></br> */}
                <Form> 
                <FormGroup>
                    <Input id="company_name" type="text" value={this.state.company_name} onChange={this.handleChange} 
                        invalid={errors.company_name ? true : false} placeholder="* Company Name"/>
                    <FormFeedback>{errors.company_name}</FormFeedback>
                </FormGroup> <br></br>
                <FormGroup>
                    <Input id="email" type="email" value={this.state.email} onChange={this.handleChange}
                        invalid={errors.email ? true : false} placeholder="* Email" />
                    <FormFeedback>{errors.email}</FormFeedback>
                </FormGroup><br></br>
                <FormGroup>
                    <Input id="password" type="password" value={this.state.password} onChange={this.handleChange}
                        invalid={errors.password ? true : false} placeholder="* Password" />
                    <FormFeedback>{errors.password}</FormFeedback>
                </FormGroup> <br></br>
                <FormGroup>
                    <Input id="confirm_password" type="password" value={this.state.confirm_password} onChange={this.handleChange}
                        invalid={errors.confirm_password ? true : false} placeholder="* Confirm Password" />
                    <FormFeedback>{errors.confirm_password}</FormFeedback>
                </FormGroup> <br></br>
                </Form>
                </Modal.Body>
                <Modal.Footer> 
                    <Button variant="primary" onClick={this.handleNext}> Next </Button>
                </Modal.Footer>
                {showAlert}
            </Modal> 
            :
            this.state.currentModal === 1 ? 
            <Modal show={this.props.isOpen} onHide={this.props.toggle}
                aria-labelledby="contained-modal-title-vcenter" centered dialogClassName="modal-70w" className="registerCompanyModal">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter"> CREATE ACOUNT </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                <FormGroup>
                    <Input id="phone_number" type="tel" value={this.state.phone_number} onChange={this.handleChange} placeholder="Phone Number" />
                </FormGroup> <br></br>
                <FormGroup>
                    <Input id="website" type="text" value={this.state.website} onChange={this.handleChange}
                        invalid={errors.website ? true : false} placeholder="* Your Vanity URL" />
                    <FormFeedback>{errors.website}</FormFeedback>
                </FormGroup> <br></br>
                <FormGroup>
                     <Input id="about_me" type="text" value={this.state.about_me} onChange={this.handleChange}
                        invalid={errors.about_me ? true : false} placeholder="* Tell us about_me your company" />
                    <FormFeedback>{errors.about_me}</FormFeedback>
                </FormGroup> <br></br>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.handlePrev}> Prev </Button>    
                    <Button variant="primary" onClick={this.handleSubmit}> Submit </Button>       
                </Modal.Footer>
                {showAlert}
            </Modal> : null }
            </div>
        );
    }
}

export default RegisterCompanyModalComponent;