import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import CreateRent from "./CreateRent";

class App extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h1>Awesome Bike Rental</h1>
          </Col>
          <Col md={12}>
            <h3>Create new rent</h3>
            <CreateRent />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
