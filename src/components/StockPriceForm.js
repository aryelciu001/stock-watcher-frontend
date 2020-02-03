import React, { Component } from "react";

import PropTypes from "prop-types";

import { isValidPrice, isEmpty } from "./Utils/Checker/Validator";

import "./css/StockPriceForm.css";

export default class StockPriceForm extends Component {
  state = {
    name: this.props.name,
    priceHigh: "",
    priceLow: "",
    error: ""
  };

  submit = e => {
    const { priceHigh, priceLow, name } = this.state;
    if (!(isEmpty(priceHigh) && isEmpty(priceLow))) {
      if (isValidPrice(priceHigh) === "ok" && isValidPrice(priceLow) === "ok") {
        this.props.updateWatchedPrice({
          name,
          priceLow: Number(priceLow),
          priceHigh: Number(priceHigh)
        });
        this.setState({ ...this.state, priceHigh: "", priceLow: "" });
      } else {
        this.setState({
          ...this.state,
          priceHigh: "",
          priceLow: "",
          error:
            isValidPrice(priceHigh) === "ok"
              ? isValidPrice(priceLow)
              : isValidPrice(priceHigh)
        });
      }
    }
    e.preventDefault();
  };

  onChange = e => {
    switch (e.target.name) {
      case "price-high":
        this.setState({ ...this.state, priceHigh: e.target.value, error: "" });
        break;
      case "price-low":
        this.setState({ ...this.state, priceLow: e.target.value, error: "" });
        break;
      default:
    }
  };

  deleteWatchedStock = () => {
    this.props.deleteWatchedStock(this.state.name);
  };

  render() {
    const { name, priceHigh, priceLow } = this.state;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <td colSpan="2">
                {name}{" "}
                <span
                  className="delete-button"
                  onClick={this.deleteWatchedStock}
                >
                  Delete
                </span>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <label>Price High</label>
              </td>
              <td>
                <input
                  name="price-high"
                  placeholder={this.props.priceHigh}
                  onChange={this.onChange}
                  value={priceHigh}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Price Low</label>
              </td>
              <td>
                <input
                  name="price-low"
                  placeholder={this.props.priceLow}
                  value={priceLow}
                  onChange={this.onChange}
                ></input>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <button type="submit" onClick={this.submit}>
                  change
                </button>
                {this.state.error ? <span>{this.state.error}</span> : ""}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

StockPriceForm.propTypes = {
  name: PropTypes.string,
  priceHigh: PropTypes.number,
  priceLow: PropTypes.number
};
