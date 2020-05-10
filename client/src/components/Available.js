import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { rentBike, setNotAvailable } from "../func/requests";

class Available extends React.Component {
  rentBikeAndUpdate(id) {
    rentBike(id)
      .then(async (res) => {
        if (res.status == 200) {
          this.props.updateAll();
        } else {
          console.error(res);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  deleteBike(id) {
    setNotAvailable(Number.parseInt(id))
      .then(async (res) => {
        if (res.status == 200) {
          this.props.updateAftDelete(id);
        } else {
          console.error(res);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  render() {
    return (
      <Row>
        {this.props.items.map((bike) => {
          return (
            <Col md={12} className="list-item">
              <Row className="justify-content-between aw-forward-info">
                <Col md={6} className="m-t-8">
                  {bike.title} / {bike.category} / ${bike.price}
                </Col>
                <Col md={6} className="item-button-group">
                  <Button
                    variant="primary"
                    className="rent-btn aw-btn"
                    onClick={() => this.rentBikeAndUpdate(bike.id)}
                  >
                    Rent
                  </Button>{" "}
                  <Button
                    variant="danger"
                    className="delete-btn aw-btn"
                    onClick={() => this.deleteBike(bike.id)}
                  >
                    Delete
                  </Button>{" "}
                </Col>
              </Row>
            </Col>
          );
        })}
      </Row>
    );
  }
}

export default Available;
