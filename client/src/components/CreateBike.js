import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

class CreateBike extends React.Component {
  render() {
    return (
      <Row className="rent-wrap">
        <Col md={4}>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label className="rent-label">Bike name</Form.Label>
            <Form.Control
              as="select"
              defaultValue={1}
              onChange={2}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label className="rent-label">Bike type</Form.Label>
            <Form.Control
              as="select"
              defaultValue={1}
              value={2}
              onChange={3}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="rent-label">Rent Price</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={0}
                  value={1}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <div className="rent-label"></div>
              <Button
                className="rent-button"
                onClick={2}
              >
                Submit Rent
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default CreateBike;
