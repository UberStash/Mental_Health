import { createMedia } from "@artsy/fresnel";
import Homepage from "./components/Homepage";
import LoginModal from "./components/LoginModal";
import LogOutModal from "./components/LogOutModal";
import PSignUpModal from "./components/PatientSignUpModal";
import DSignUpModal from "./components/DoctorSignUpModal";
import PatientDashboard from "./components/PatientDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import AboutModal from "./components/AboutModal";
import ContactModal from "./components/ContactModal";

import React, { Component } from "react";

import "antd/dist/antd.css";
import {
  Container,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
} from "semantic-ui-react";

const { Media } = createMedia({
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
        <LoginModal login={setUser} />
        <PSignUpModal />
        <DSignUpModal />
      </>
    );
  } else {
    return (
      <>
        <List.Item>
          <Segment inverted>
            <Header>Welcome {user.first_name}</Header>
          </Segment>
        </List.Item>
        <AboutModal />
        <ContactModal />
        <LogOutModal logingOut={setUser} />
      </>
    );
  }
};

const checkStatus = (user) => {
  if (!user) {
    return <Homepage />;
  } else if (user.clinic_address) {
    return <DoctorDashboard user={user} />;
  } else if (user.health_card) {
    return <PatientDashboard user={user} />;
  }
};

class HomepageLayout extends Component {
  constructor() {
    super();
    

    this.state = {
      user: {},
      showModal: false,
      events: [],
    };
  }
  setUser = (user) => {
    this.setState({ user });
  };
  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { fixed } = this.state;

    return (
      <Media greaterThan="mobile">
        <Visibility>
          <Segment inverted textAlign="center" vertical>
            <Menu
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
          <Segment style={{ margin: "4em" }} vertical>
            {checkStatus(this.state.user.user)}
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
                      ACA Health Solutions User
                    </Header>
                    <p>
                      "ACA has changed my therapy game 100%. Not only is my
                      counselor phenomenal, but I can chat with her on my own
                      time...I can sit at home in my sweats, not be embarrassed
                      to cry, and pour my guts out online."
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

export default HomepageLayout;
