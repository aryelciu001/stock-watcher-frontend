import React, { Component } from "react";

export default class AddStockPriceForm extends Component {
  state = {
    addNew: false,
    addNewIndex: "",
    error: ""
  };

  showStockIndexForm = () => {
    this.setState({ ...this.state, addNew: true });
  };

  onSelectChange = e => {
    this.setState({ ...this.state, addNewIndex: e.target.value, error: "" });
    console.log(e.target.value);
  };

  addStockIndexForm = e => {
    e.preventDefault();
    var isExist = false;
    const { addNewIndex } = this.state;
    this.props.watchedStocks.forEach(element => {
      if (element.name === this.state.addNewIndex) {
        isExist = true;
        this.setState({ ...this.state, error: "Index existed!" });
      }
    });
    if (!isExist) {
      if (addNewIndex !== "") {
        this.setState({
          ...this.state,
          addNew: false
        });
        this.props.updateWatchedStocks({
          name: this.state.addNewIndex,
          priceHigh: 0,
          priceLow: 0
        });
      }
    }
  };

  render() {
    return (
      <div>
        {this.state.addNew ? (
          <form>
            <table>
              <thead>
                <tr>
                  <td colSpan="2">Add New Index</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <label>Select Index</label>
                  </td>
                  <td>
                    <select
                      onChange={this.onSelectChange}
                      value={this.addNewIndex}
                    >
                      <option></option>
                      {Object.keys(this.props.data).map(el => {
                        return <option key={el}>{el}</option>;
                      })}
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <button onClick={this.addStockIndexForm}>add</button>
            {this.state.error ? this.state.error : ""}
          </form>
        ) : (
          <button onClick={this.showStockIndexForm}>add</button>
        )}
      </div>
    );
  }
}
