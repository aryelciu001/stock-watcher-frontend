import React, { Component } from "react";
import InformationBox from "./components/InformationBox";
import WatchBox from "./components/WatchBox";

export default class App extends Component {
  state = {
    loading: true,
    data: {},
    endpoint: "https://stock-market-web-scrapper.herokuapp.com/python",
    updated: true
  };

  fetchData = new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", this.state.endpoint);
    xhr.send();
    try {
      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          res({
            data: JSON.parse(xhr.responseText)
          });
        } else {
          rej({ data: "error" });
        }
      });
    } catch {
      this.setState({ ...this.state, data: "error", loading: false });
    }
  });

  componentDidMount() {
    this.fetchData
      .then(res => {
        this.setState({ ...this.state, data: res.data, loading: false });
      })
      .catch(res => {
        this.setState({ ...this.state, data: res.data, loading: false });
      });

    setInterval(() => {
      this.fetchData
        .then(res => {
          this.setState({ ...this.state, data: res.data });
        })
        .catch(res => {
          this.setState({ ...this.state, updated: false });
        });
    }, 5000);
  }

  render() {
    const { data, loading, updated, watchedStocks } = this.state;
    return (
      <div>
        <InformationBox
          data={data}
          loading={loading}
          updated={updated}
        ></InformationBox>
        <WatchBox data={data} watchedStocks={watchedStocks}></WatchBox>
      </div>
    );
  }
}
