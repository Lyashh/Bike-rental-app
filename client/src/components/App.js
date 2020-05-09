import React from "react";
import { getAwailableBikes, getRentBikes } from "../func/requests";
import { Row, Container, Col } from "react-bootstrap";
import CreateRent from "./CreateRent";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      available: [],
      rent: {},
    };
  }
  componentDidMount() {
    this.updateData();
  }

  updateData() {
    this.getAwailable();
    this.getRent();
  }

  getAwailable() {
    getAwailableBikes()
      .then((data) => {
        this.setState({ available: data });
      })
      .catch((e) => console.log({ error: e }));
  }

  getRent() {
    getRentBikes()
      .then((data) => {
        this.setState({ rent: data });
      })
      .catch((e) => console.log({ error: e }));
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h1>Awesome Bike Rental</h1>
          </Col>
          <Col md={12}>
            <h3>Create new rent</h3>
            <CreateRent items={this.state.available} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
