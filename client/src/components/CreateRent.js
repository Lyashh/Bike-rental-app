import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

class CreateRent extends React.Component {
  render() {
    return (
      <Row className="rent-wrap">
        <Col md={4}>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label className="rent-label">Bike name</Form.Label>
            <Form.Control as="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label className="rent-label">Bike type</Form.Label>
            <Form.Control as="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="rent-label">Rent Price</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <div className="rent-label"></div>
              <Button className="rent-button">Submit Rent</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default CreateRent;
