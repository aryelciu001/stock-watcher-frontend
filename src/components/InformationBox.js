import React, { Component } from "react";

import "./css/InformationBox.css";

import { calcChange, determineChange } from "./Utils/Calculator/Calculator";

export default class InformationBox extends Component {
  render() {
    const listOfKeys = Object.keys(this.props.data);
    return (
      <div id="information-box">
        {this.props.updated ? "updated" : "not updated"}
        {this.props.loading ? (
          "loading"
        ) : this.props.data === "error" ? (
          "error"
        ) : (
          <table id="information-box-table">
            <thead>
              <tr>
                <td>Index</td>
                <td>Price</td>
                <td>Previous Close</td>
                <td>Change</td>
                <td>Change (%)</td>
              </tr>
            </thead>
            <tbody>
              {listOfKeys
                .sort((a, b) => {
                  return a > b ? 1 : -1;
                })
                .map(key => {
                  return (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{this.props.data[key]["Price"]}</td>
                      <td>{this.props.data[key]["Previous close"]}</td>
                      <td>
                        {Number(this.props.data[key]["Price"]) -
                          Number(
                            this.props.data[key]["Previous close"].replace(
                              /,/g,
                              ""
                            )
                          )}
                      </td>
                      <td
                        className={determineChange(
                          this.props.data[key]["Price"],
                          this.props.data[key]["Previous close"]
                        )}
                      >
                        {calcChange(
                          this.props.data[key]["Price"],
                          this.props.data[key]["Previous close"]
                        )}
                        %
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
