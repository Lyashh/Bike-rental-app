import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

class CreateRent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      categoryItems: [],
      currentBike: { id: 0, title: "", price: 0 },
    };
  }

  handleCategory(e) {
    this.setCategory(e.target.value);
  }

  renderCategory(arr) {
    //create array with unique categoris
    const categories = [...new Set(arr.map((el) => el.category))];

    //check new prop equal to state category
    const checkPrevCateg = categories.some((catg) => {
      return catg == this.state.category;
    });

    if (this.state.category == null && !checkPrevCateg) {
      this.setCategory(categories[0]);
    }

    //render
    return categories.map((el, i) => {
      return (
        <option key={i} value={el}>
          {el}
        </option>
      );
    });
  }

  setCategory(newCatg) {
    this.setState({ category: newCatg }, () => {
      this.setCatgItems();
    });
  }

  setCatgItems() {
    const categoryItems = this.props.items.filter((el) => {
      return this.state.category == el.category;
    });
    this.setState({ categoryItems }, () => {
      this.setState({ currentBike: this.state.categoryItems[0] });
    });
  }

  handleCurrentBike(e) {
    console.log(e.target.value);

    this.setCurrentBike(e.target.value);
  }

  setCurrentBike(id) {
    const newCurrent = this.state.categoryItems.filter((el) => {
      return el.id == id;
    })[0];
    this.setState({ currentBike: newCurrent });
  }

  renderItems() {
    return this.state.categoryItems.map((el, i) => {
      return (
        <option key={i} value={el.id}>
          {el.title}
        </option>
      );
    });
  }

  render() {
    let content = null;
    if (this.props.items.length > 0) {
      content = (
        <Row className="rent-wrap">
          <Col md={4}>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label className="rent-label">Bike name</Form.Label>
              <Form.Control
                as="select"
                defaultValue={this.state.currentBike.id}
                onChange={this.handleCurrentBike.bind(this)}
              >
                {this.renderItems()}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label className="rent-label">Bike type</Form.Label>
              <Form.Control
                as="select"
                defaultValue={this.state.category}
                onChange={this.handleCategory.bind(this)}
              >
                {this.renderCategory(this.props.items)}
              </Form.Control>
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
                    value={this.state.currentBike.price}
                  />
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
    } else {
      content = null;
    }
    return <div>{content}</div>;
  }
}

export default CreateRent;
