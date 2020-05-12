import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { createBike } from "../func/requests";

class CreateBike extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: 0,
      bikeName: "",
      price: 0,
      errorName: false,
      errorPrice: false,
      success: false,
    };
  }

  createBikeF() {
    if (this.state.price <= 0 || this.state.bikeName.length < 4) {
      if (this.state.price <= 0) {
        this.setState({ errorPrice: true });
      }
      if (this.state.bikeName.length <= 4) {
        this.setState({ errorName: true });
      }
    } else {
      this.postNewBike();
    }
  }

  postNewBike() {
    createBike({
      title: this.state.bikeName,
      price: this.state.price,
      category_id: this.state.categoryId,
    })
      .then((res) => {
        if (res.status == 200) {
          this.props.update(res.data);
          this.setState({ success: true });
        } else {
          console.error(res);
        }
      })
      .catch((e) => console.error(e));
  }

  handleCategory(e) {
    this.setState({
      categoryId: Number.parseFloat(e.target.value),
    });
  }

  handleName(e) {
    this.setState({
      [e.target.name]: e.target.value,
      errorName: false,
      errorPrice: false,
      success: false,
    });
  }

  handlePrice(e) {
    if (Number.parseInt(e.target.value) >= 0) {
      this.setState({
        [e.target.name]: Number.parseInt(e.target.value),
        errorPrice: false,
        errorName: false,
        success: false,
      });
    }
  }

  render() {
    return (
      <Row className="rent-wrap">
        <Col md={4}>
          <Form.Group controlId="qweqweweq">
            <Form.Label className="rent-label">Bike name</Form.Label>
            <Form.Control
              type="text"
              onChange={this.handleName.bind(this)}
              value={this.state.name}
              name="bikeName"
            />
            {this.state.errorName ? (
              <small className="err-field">
                The name field must be greater than 4 characters
              </small>
            ) : null}

            {this.state.success ? (
              <small className="success-field">Success</small>
            ) : null}
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="eqweqe">
            <Form.Label className="rent-label">Category</Form.Label>
            <Form.Control
              as="select"
              value={this.state.categoryId}
              onChange={this.handleCategory.bind(this)}
            >
              {this.props.categories.map((el, i) => {
                if (i == 1 && this.state.categoryId === 0) {
                  this.setState({ categoryId: el.id });
                }
                return (
                  <option key={el.id} value={el.id}>
                    {el.title}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="qweqweweq">
                <Form.Label className="rent-label">
                  Bike price per hour
                </Form.Label>
                <Form.Control
                  type="number"
                  value={this.state.price}
                  name="price"
                  onChange={this.handlePrice.bind(this)}
                />
                {this.state.errorPrice ? (
                  <small className="err-field">
                    The price field must be greater than 0 characters
                  </small>
                ) : null}
              </Form.Group>
            </Col>
            <Col md={6}>
              <div className="rent-label"></div>
              <Button
                className="rent-button"
                onClick={this.createBikeF.bind(this)}
              >
                Add
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default CreateBike;
