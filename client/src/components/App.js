import React from "react";
import {
  getAwailableBikes,
  getRentBikes,
  deleteBikeRent,
} from "../func/requests";
import { Row, Container, Col } from "react-bootstrap";
import CreateRent from "./CreateRent";
import Available from "./Available";
import InRent from "./InRent";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      available: [],
      rent: {
        id: null,
        sum: 0,
      },
      rentItems: [],
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
      .then((res) => {
        this.setState({ available: res.data });
      })
      .catch((e) => console.log({ error: e }));
  }

  getRent() {
    getRentBikes()
      .then((res) => {
        if (res.status == 200) {
          this.setState({ rent: res.data.rent, rentItems: res.data.items });
        } else {
          console.log(res.data);
        }
      })
      .catch((e) => console.log({ error: e }));
  }

  deleteRent(id) {
    deleteBikeRent(id)
      .then((res) => {
        console.log(res);

        if (res.status == 200) {
          this.updateData();
        } else {
          console.error(res);
        }
      })
      .catch((e) => console.log(e));
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
          <Col md={12} className="m-t-70">
            {this.state.rent.id ? (
              <div>
                <h3>Rent Bikes ( ${this.state.rent.sum} )</h3>
                <InRent
                  items={this.state.rentItems}
                  delFunc={this.deleteRent.bind(this)}
                />
              </div>
            ) : null}
          </Col>
          {/* <Col md={12} className="m-t-70">
            {this.state.rent.items > 0 ? (
              
            ) : null}
          </Col> */}

          <Col md={12} className="m-t-70">
            <h3>Available bicycles ({this.state.available.length})</h3>
            {this.state.available.length > 0 ? (
              <Available items={this.state.available} />
            ) : null}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
