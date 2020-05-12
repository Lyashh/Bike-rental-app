import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { rentBike } from "../func/requests";

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

  componentDidUpdate(prevProps) {
    const newCat = [...new Set(this.props.items.map((el) => el.category))];
    const checkCat = newCat.some((catg) => {
      return this.state.category == catg;
    });
    if (!checkCat || prevProps.items.length != this.props.items.length) {
      this.setCategory(newCat[0]);
    }
  }

  rentBikeAndUpdate() {
    rentBike(this.state.currentBike.id)
      .then(async (res) => {
        if (res.status == 200) {
          this.props.updateAll();
        } else {
          console.error(res);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  setCategory(newCatg) {
    this.setState({ category: newCatg }, () => {
      this.setCatgItems();
    });
  }

  handleCurrentBike(e) {
    this.setCurrentBike(e.target.value);
  }

  setCatgItems() {
    const categoryItems = this.props.items.filter((el) => {
      return this.state.category == el.category;
    });

    this.setState({ categoryItems }, () => {
      this.setState({ currentBike: this.state.categoryItems[0] });
    });
  }

  setCurrentBike(id) {
    const newCurrent = this.state.categoryItems.filter((el) => {
      return el.id == id;
    })[0];
    this.setState({ currentBike: newCurrent });
  }

  render() {
    return (
      <Row className="rent-wrap">
        <Col md={4}>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label className="rent-label">Bike name</Form.Label>
            <Form.Control
              as="select"
              value={this.state.currentBike.id}
              defaultValue={this.state.currentBike.id}
              onChange={this.handleCurrentBike.bind(this)}
            >
              {this.props.items
                .filter((el) => {
                  return this.state.category == el.category;
                })
                .map((el, i) => {
                  return (
                    <option key={i} value={el.id}>
                      {el.title}
                    </option>
                  );
                })}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label className="rent-label">Bike type</Form.Label>
            <Form.Control
              as="select"
              defaultValue={this.state.category}
              value={this.state.category}
              onChange={this.handleCategory.bind(this)}
            >
              {[...new Set(this.props.items.map((el) => el.category))].map(
                (el, i) => {
                  if (i == 1 && !this.state.category) {
                    this.setCategory(el);
                  }
                  return (
                    <option key={i} value={el}>
                      {el}
                    </option>
                  );
                }
              )}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="rent-label">
                  Rent Price per hour
                </Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={0}
                  value={this.state.currentBike.price}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <div className="rent-label"></div>
              <Button
                className="rent-button"
                onClick={this.rentBikeAndUpdate.bind(this)}
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

export default CreateRent;
