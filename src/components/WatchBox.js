import React, { Component } from "react";

import StockPriceForm from "./StockPriceForm";
import AddStockIndexForm from "./AddStockPriceForm";

export default class WatchBox extends Component {
  state = {
    url: "https://stock-watcher-backend.herokuapp.com/users/alfredo",
    watchedStocks: []
  };

  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", this.state.url);
    xhr.send();
    try {
      xhr.addEventListener("load", () => {
        var response = JSON.parse(xhr.response);
        this.setState({
          ...this.state,
          watchedStocks: response.watchedStocks
        });
      });
    } catch {
      console.log("error");
    }
  }

  updateWatchedStocks = newStock => {
    this.setState(
      {
        ...this.state,
        watchedStocks: [...this.state.watchedStocks, newStock]
      },
      () => {
        this.updateDatabase();
      }
    );
  };

  updateWatchedPrice = theStock => {
    const oldValue = this.state.watchedStocks.filter(
      el => el.name === theStock.name
    )[0];
    this.setState(
      {
        ...this.state,
        watchedStocks: [
          {
            name: theStock.name,
            priceLow: theStock.priceLow ? theStock.priceLow : oldValue.priceLow,
            priceHigh: theStock.priceHigh
              ? theStock.priceHigh
              : oldValue.priceHigh
          },
          ...this.state.watchedStocks.filter(el => el.name !== theStock.name)
        ]
      },
      () => {
        this.updateDatabase();
      }
    );
  };

  deleteWatchedStock = name => {
    this.setState(
      {
        ...this.state,
        watchedStocks: this.state.watchedStocks.filter(el => el.name !== name)
      },
      () => {
        this.updateDatabase();
      }
    );
  };

  updateDatabase = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var myInit = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(this.state.watchedStocks)
    };
    const req = new Request(this.state.url, myInit);
    fetch(req);
  };

  render() {
    const { watchedStocks } = this.state;
    return (
      <div className="watch-box">
        <h1>WATCH BOX</h1>

        <AddStockIndexForm
          data={this.props.data}
          updateWatchedStocks={this.updateWatchedStocks}
          watchedStocks={this.state.watchedStocks}
        ></AddStockIndexForm>

        <ul>
          {watchedStocks.map(el => {
            return (
              <li key={el.name}>
                <StockPriceForm
                  deleteWatchedStock={this.deleteWatchedStock}
                  updateWatchedPrice={this.updateWatchedPrice}
                  name={el.name}
                  priceHigh={el.priceHigh}
                  priceLow={el.priceLow}
                ></StockPriceForm>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
