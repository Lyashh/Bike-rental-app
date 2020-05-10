import React from "react";
import { Row, Col, Button } from "react-bootstrap";

class InRent extends React.Component {
  handleDeleteButton(e) {
    this.props.delFunc(e.target.getAttribute("data-value"));
  }

  render() {
    return (
      <Row>
        {this.props.items.map((bike) => {
          return (
            <Col md={12} className="list-item">
              <Row className="justify-content-between aw-forward-info">
                <Col md={6} className="m-t-8">
                  {bike.title} / {bike.category} / ${bike.price} / Time in Rent:{" "}
                  {bike.diff}h
                </Col>
                <Col md={6} className="item-button-group">
                  <Button
                    variant="danger"
                    className="delete-btn aw-btn"
                    data-value={bike.bikesToRents_id}
                    onClick={this.handleDeleteButton.bind(this)}
                  >
                    Cancel Rent
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

export default InRent;
