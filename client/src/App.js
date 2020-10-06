import { createMedia } from "@artsy/fresnel";
import Scheduler from "./components/scheduler";
import Homepage from "./components/Homepage";
import Map from "./components/Map";
import LoginModal from "./components/LoginModal";
import PSignUpModal from "./components/PatientSignUpModal";
import DoctorSignUpForm from './components/DoctorSignUpForm'
import DSignUpModal from "./components/DoctorSignUpModal";
import PatientsList from "./components/PatientList";
import AppointmentList from "./components/AppointmentList"
import PatientDashboard from "./components/PatientDashboard"
import DoctorDashboard from './components/DoctorDashboard'
import AboutModal from "./components/AboutModal";
import ContactModal from "./components/ContactModal";
import PropTypes from "prop-types";
import React, { Component } from "react";
import LoginForm from "./components/LoginForm";

// import PropTypes from 'prop-types'
import ContainerVideoChat from './components/ContainerVideoChat'
// import React, { Component } from 'react'
import 'antd/dist/antd.css'
import axios from 'axios';
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
  Modal,
} from "semantic-ui-react";
import LogOutModal from "./components/LogOutModal";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

//let authUser = {};

let authUser = localStorage.getItem('authUser');
console.log('printingAUTHERUSER',JSON.stringify(authUser) );
console.log(window.document)




// componentDidMount() {
  //   let authUser = {}
  //export const logIn =(state) => {
    //   const [login, setLogin] = useState({
    //     email: "",
    //     password: ""
    // });
      //console.log("printStateAPP46",state)
       //axios.post('http://localhost:3001/login', {...state}, {withCredentials: true})
      //.then((res) => {
            
            //let authUser = res.data.user;
            //console.log("PRINTFROM PROMIS", authUser);
            //setLogin(res.data.user)
         // })
  //         //  .then((res) => {
  //         //   console.log("printRESTPONS46",res.data.user)
  //         //   user = res.data.user;
  //         //   console.log("printUSER", user)
  //         //   })
            
  //         //  //.then((res)=> {const user = res.data.user})
  //         //  //.then((res) =>this.setState(res.data) ) 
  //         //  .then(console.log('settingSTATE',state))
        
   // } 
 // } 
class DesktopContainer extends Component {
  state = {  };
  
  

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;


    return (
      <Media greaterThan="mobile">
        <Visibility
        // once={false}
        // onBottomPassed={this.showFixedMenu}
        // onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            // style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              // fixed={fixed ? "top" : null}
              inverted={true}
              pointing={!fixed}
              secondary={!fixed}
              size="large"



            >
              <Container>
                <Menu.Item position="left">
                  <Image
                    src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/476/3838803476_844adb0d-dc12-4585-bdf5-518b35787a9b.png?cb=1601585149"
                    as="a"
                    size="small"
                  // href="http://localhost:3000/"
                  // target="_blank"
                  />
                </Menu.Item>

                <Menu.Item position="right">
                  <AboutModal />
                  <ContactModal />
                  {/* {console.log("PRINTFROM APP", authUser)} */}
                  {authUser ? < LogOutModal /> : <LoginModal /> }
                  {/* <LogOutModal /> */}
                  {/* <LoginModal /> */}
                  <PSignUpModal />
                  <DSignUpModal />
                  {/* <DoctorSignUpForm /> */}
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>

        {children}
      </Media>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });



  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Media as={Sidebar.Pushable} at="mobile">
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            {/* <Menu.Item as="a" active>
              Home
            </Menu.Item> */}
            <Menu.Item>
              <LoginModal />
            </Menu.Item>
            <Menu.Item>
              <PSignUpModal />
            </Menu.Item>
            <Menu.Item>
              <DSignUpModal />
            </Menu.Item>
            <Menu.Item>
              <AboutModal />
            </Menu.Item>
            <Menu.Item>
              <ContactModal />
            </Menu.Item>
            {/* <Menu.Item as="a">
              <Button inverted={true}>Contact Us</Button>
            </Menu.Item> */}
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign="center"
              // style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item >
                    <Image
                      src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/476/3838803476_844adb0d-dc12-4585-bdf5-518b35787a9b.png?cb=1601585149"
                      size='small'
                    // href="http://localhost:3000/"
                    // target="_blank"
                    />
                  </Menu.Item>

                  <Menu.Item onClick={this.handleToggle} position="right">
                    <Icon name="sidebar" size='huge' />
                  </Menu.Item>

                </Menu>
              </Container>
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

const HomepageLayout = () => (

  <ResponsiveContainer>
    {/* MAIN CONTAINER!!!!!!!!!!!! */}
    {/* #################################### */}
    <Segment style={{ margin: "4em" }} vertical>
      {/* <Homepage /> */}
      {/* <PatientsList /> */}
      {/* <AppointmentList /> */}
      {/* <Scheduler /> */}
      {/* <ContainerVideoChat /> */}
      {/* <Map /> */}
      <PatientDashboard />
      <DoctorDashboard />
    </Segment>

    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3} floated="right">
              <Header inverted as="h4" content="Links" />
              <List link inverted>
                <List.Item as="a">Contact Us</List.Item>
                <List.Item as="a">About</List.Item>
                <List.Item as="a">Home</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7} floated="left">
              <Header as="h4" inverted>
                Mental Health User
              </Header>
              <p>
                "Mental Health has changed my therapy game 100%. Not only is my
                counselor phenomenal, but I can also message her on my own
                time...I can sit at home in my sweats, not be embarrassed to
                cry, and pour my guts out online."
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
);

export default HomepageLayout;
