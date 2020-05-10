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
      sum: 0,
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
          this.setState({ sum: res.data.sum, rentItems: res.data.items });
        } else {
          console.log(res.data);
        }
      })
      .catch((e) => console.log({ error: e }));
  }

  deleteRent(id) {
    deleteBikeRent(id)
      .then((res) => {
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
          <h1 className="m-t-70">Awesome Bike Rental</h1>
          <Col md={12}></Col>
          <div className="m-t-60">
            <span role="img" aria-label="emoji1" className="emoji">
              🤑
            </span>
            <h3 className="block-title ">Create new rent </h3>{" "}
          </div>

          <Col md={12}>
            {this.state.available.length > 0 ? (
              <CreateRent
                items={this.state.available}
                updateAll={this.updateData.bind(this)}
              />
            ) : null}
          </Col>
          <div className="m-t-70">
            <span role="img" aria-label="emoji1" className="emoji">
              🤩
            </span>
            <h3 className="block-title">
              Rent Bikes (Total: ${this.state.sum} )
            </h3>
          </div>
          <Col md={12}>
            {this.state.rentItems.length > 0 ? (
              <div>
                <InRent
                  items={this.state.rentItems}
                  delFunc={this.deleteRent.bind(this)}
                />
              </div>
            ) : null}
          </Col>
          <div className="m-t-70">
            <span role="img" aria-label="emoji1" className="emoji">
              🚲
            </span>
            <h3 className="block-title">
              Available bicycles ({this.state.available.length})
            </h3>
          </div>

          <Col md={12}>
            {this.state.available.length > 0 ? (
              <Available
                items={this.state.available}
                updateAll={this.updateData.bind(this)}
              />
            ) : null}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
