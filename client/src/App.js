import { createMedia } from "@artsy/fresnel";
import Homepage from "./components/Homepage";
import LoginModal from "./components/LoginModal";
import LogOutModal from "./components/LogOutModal";
import PSignUpModal from "./components/PatientSignUpModal";
import DSignUpModal from "./components/DoctorSignUpModal";
import PatientDashboard from "./components/PatientDashboard"
import DoctorDashboard from './components/DoctorDashboard'
import AboutModal from "./components/AboutModal";
import ContactModal from "./components/ContactModal";
import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from 'axios'
// import PropTypes from 'prop-types'
import ContainerVideoChat from './components/ContainerVideoChat'
// import React, { Component } from 'react'
import 'antd/dist/antd.css'
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

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});


const logOut = (user, setUser) => {
if (!user) {
  return (
    <>
    <AboutModal />
    <ContactModal />
      <LoginModal login={setUser}/>
        <PSignUpModal />
          <DSignUpModal />              
                 
    </>
  )
} else {
  return (
    <>
       <AboutModal />
        <ContactModal />
      <LogOutModal logingOut={setUser}/>
    </>

  )
}
}

const checkStatus = (user) => {
  console.log(user)
if (!user) {
 return <Homepage />
} else if (user.clinic_address){
return <DoctorDashboard user={user}/>

} else if (user.health_card){
  return <PatientDashboard user={user}/>
}
}

  
class HomepageLayout extends Component {
  constructor() {
    super();
    const now = new Date();

    this.state = {
      user: {},
      showModal: false,
      events: [],
    };
  
  }
  setUser = (user) => {
    this.setState({ user })
  }
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
                {logOut(this.state.user.user, this.setUser)}
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>

        <Container>
    {/* MAIN CONTAINER!!!!!!!!!!!! */}
    {/* #################################### */}
    <Segment style={{ margin: "4em" }} vertical>
      {checkStatus(this.state.user.user)}



      {/* {this.state.user ? <DoctorDashboard /> : "potato"} */}
      {/* <Homepage />
      <PatientDashboard /> */}


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
  </Container>
      </Media>
    );
  }
}

// DesktopContainer.propTypes = {
//   children: PropTypes.node,
// };

// class MobileContainer extends Component {
//   constructor() {
//     super();

//     this.state = {
//       user: {}
//     };
  
//   }
//   setUser = (user) => {
//     this.setState({ user })
//   }

//   handleSidebarHide = () => this.setState({ sidebarOpened: false });

//   handleToggle = () => this.setState({ sidebarOpened: true });

//   render() {
//     const { children } = this.props;
//     const { sidebarOpened } = this.state;

//     return (
//       <Media as={Sidebar.Pushable} at="mobile">
//         <Sidebar.Pushable>
//           <Sidebar
//             as={Menu}
//             animation="overlay"
//             inverted
//             onHide={this.handleSidebarHide}
//             vertical
//             visible={sidebarOpened}
//           >
//             {/* <Menu.Item as="a" active>
//               Home
//             </Menu.Item> */}
//             <Menu.Item>
//               <LoginModal login={this.setUser}/>
//             </Menu.Item>
//             <Menu.Item>
//               <PSignUpModal />
//             </Menu.Item>
//             <Menu.Item>
//               <DSignUpModal />
//             </Menu.Item>
//             <Menu.Item>
//               <AboutModal />
//             </Menu.Item>
//             <Menu.Item>
//               <ContactModal />
//             </Menu.Item>
//             {/* <Menu.Item as="a">
//               <Button inverted={true}>Contact Us</Button>
//             </Menu.Item> */}
//           </Sidebar>

//           <Sidebar.Pusher dimmed={sidebarOpened}>
//             <Segment
//               inverted
//               textAlign="center"
//               // style={{ minHeight: 350, padding: '1em 0em' }}
//               vertical
//             >
//               <Container>
//                 <Menu inverted pointing secondary size="large">
//                   <Menu.Item >
//                     <Image
//                       src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/476/3838803476_844adb0d-dc12-4585-bdf5-518b35787a9b.png?cb=1601585149"
//                       size='small'
//                     // href="http://localhost:3000/"
//                     // target="_blank"
//                     />
//                   </Menu.Item>

//                   <Menu.Item onClick={this.handleToggle} position="right">
//                     <Icon name="sidebar" size='huge' />
//                   </Menu.Item>

//                 </Menu>
//               </Container>
//             </Segment>

//             {children}
//           </Sidebar.Pusher>
//         </Sidebar.Pushable>
//       </Media>
//     );
//   }
// }

// MobileContainer.propTypes = {
//   children: PropTypes.node,
// };

// const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
//   <MediaContextProvider>
//     <DesktopContainer>{children}</DesktopContainer>
//     <MobileContainer>{children}</MobileContainer>
//   </MediaContextProvider>
// );

// ResponsiveContainer.propTypes = {
//   children: PropTypes.node,
// };


// const HomepageLayout = () => (
  
  // <ResponsiveContainer>
  //   {/* MAIN CONTAINER!!!!!!!!!!!! */}
  //   {/* #################################### */}
  //   <Segment style={{ margin: "4em" }} vertical>
  //     {true ? <DoctorDashboard />  : <Homepage />}
  //     {/* <Homepage />
  //     <PatientDashboard /> */}


  //   </Segment>

  //   <Segment inverted vertical style={{ padding: "5em 0em" }}>
  //     <Container>
  //       <Grid divided inverted stackable>
  //         <Grid.Row>
  //           <Grid.Column width={3} floated="right">
  //             <Header inverted as="h4" content="Links" />
  //             <List link inverted>
  //               <List.Item as="a">Contact Us</List.Item>
  //               <List.Item as="a">About</List.Item>
  //               <List.Item as="a">Home</List.Item>
  //             </List>
  //           </Grid.Column>
  //           <Grid.Column width={7} floated="left">
  //             <Header as="h4" inverted>
  //               Mental Health User
  //             </Header>
  //             <p>
  //               "Mental Health has changed my therapy game 100%. Not only is my
  //               counselor phenomenal, but I can also message her on my own
  //               time...I can sit at home in my sweats, not be embarrassed to
  //               cry, and pour my guts out online."
  //             </p>
  //           </Grid.Column>
  //         </Grid.Row>
  //       </Grid>
  //     </Container>
  //   </Segment>
  // </ResponsiveContainer>
// );

export default HomepageLayout;
