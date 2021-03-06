import React from "react";
import { Container, Grid, Header, Image } from "semantic-ui-react";

function homepage() {
  return (
    <Container
      style={{
        backgroundColor: "whitesmoke",
        borderRadius: "10px",
        width: "100%",
        padding: "2em",
      }}
    >
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              We Help Patients and Doctors
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              We consolidate all your medical needs into one place... we assist
              patients with all their medical needs and display indepth
              information and statistics to doctors.
            </p>
            <Header as="h3" style={{ fontSize: "2em" }}>
              We Make People Feel Better See What Other's Say
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              "Dude, your stuff is the bomb! Your company is truly upstanding
              and is behind its product 100%. If you aren't sure, always go for
              ACA." - Phylys G.
            </p>
            <p style={{ fontSize: "1.33em" }}>
              "If you aren't sure, always go for ACA. It's just amazing. It fits
              our needs perfectly. It's exactly what I've been looking for." -
              Mahmoud G.
            </p>
            <p style={{ fontSize: "1.33em" }}>
              "Keep up the excellent work. ACA is the most valuable business
              resource we have EVER purchased. I will let my mum know about
              this, she could really make use of ACA! Thank You!" - Randie Y.
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image
              bordered
              rounded
              size="massive"
              src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default homepage;
