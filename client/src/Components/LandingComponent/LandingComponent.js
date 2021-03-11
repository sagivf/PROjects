import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Row, Col} from 'react-bootstrap';
import ProjectCarouselComponent from '../HomeComponent/ProjectComponent/ProjectCarouselComponent';
import NewProjectModalComponent from '../NewProjectComponent/NewProjectModalComponent'
import './LandingComponent.css';
import logo from './images/landing_image.png';
import { VscNewFile } from 'react-icons/vsc';
import Tooltip from "@material-ui/core/Tooltip";
import Fade from '@material-ui/core/Fade';

class LandingComponent extends Component {
    state = {
        modal: false
    }

    registerClickHandler = () => {
        console.log("registering");
    }

    toggle = () => {
        this.setState({modal: !this.state.modal});
    }

    render () {
        return (
            <div>
            <div className="Landing">
                <div className="LandingLeft">
                    <h1><b>PRO</b><span>jects</span></h1>
                    <p>Creating a platform that connects juniors to non-profits organizations and small businesses.
                        The juniors will gain the experience they lack of and the businesses will receive the services they need.
                    </p>
                    <div className="Buttons">
                        <Button 
                            href="/login"
                            variant="outline-secondary"
                            style={{margin: "8px"}}
                            block>
                                LOG IN
                        </Button>
                        <Button 
                            href="/register"
                            variant="outline-secondary"
                            style={{margin: "8px"}}
                            block
                            onClick={this.registerClickHandler}>
                                REGISTER
                        </Button>
                    </div>
                </div>
                <div className="LandingRight">
                    <img src={logo} alt=""/>
                </div>
            </div>
            <Row>
                <Col xs={12} md={8} className="text-center"> 
                    <Tooltip title="See all Projects" placement="left-start" TransitionComponent={Fade} enterDelay={100} leaveDelay={100}>
                            <Button className="CarouselHeader"
                                href="/home/projects"
                                variant="outline-secondary"
                                style={{width: "500px"}}
                                block>
                                Our Open Projects
                            </Button>
                    </Tooltip>
                </Col>
                <Col xs={6} md={4}>
                    <Tooltip title="Open New Project" placement="left-start" TransitionComponent={Fade} enterDelay={100} leaveDelay={100}>
                        <Button className="CarouselHeaderButton"
                            variant="outline-secondary"
                            style={{width: "50px"}}
                            block
                            onClick = { this.toggle }>
                            <VscNewFile size={30}/>
                        </Button>
                    </Tooltip>
                </Col>
            </Row>
            <ProjectCarouselComponent/>
            <NewProjectModalComponent className="Modal"
                isOpen={this.state.modal} 
                toggle={this.toggle}
            />
            </div>
        )
    }
}

export default LandingComponent;