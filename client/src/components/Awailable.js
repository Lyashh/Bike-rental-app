import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

class Awailable extends React.Component {
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
                <Col md={6} style={{ textAlign: "right" }}>
                  <Button variant="primary" className="rent-btn aw-btn">
                    Rent
                  </Button>{" "}
                  <Button variant="danger" className="delete-btn aw-btn">
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

export default Awailable;
