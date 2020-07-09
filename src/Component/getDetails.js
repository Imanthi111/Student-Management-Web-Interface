import React, { Component } from "react";

import "./getDetails.css";
export default class information extends Component {
  userData;
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeGroup = this.onChangeGroup.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      address: "",
      group: "",
    };
  }

  // Form events
  onChangeName(el) {
    this.setState({ name: el.target.value });
  }

  onChangeAddress(el) {
    this.setState({ address: el.target.value });
  }

  onChangeGroup(el) {
    this.setState({ group: el.target.value });
  }
  onSubmit(el) {
    el.preventDefault();
    this.setState({
      name: "",
      address: "",
      group: "",
    });
  }
  //React life cycle
  componentDidMount() {
    this.userData = JSON.parse(localStorage.getItem("user"));

    if (localStorage.getItem("user")) {
      this.setState({
        name: this.userData.name,
        address: this.userData.address,
        group: this.userData.group,
      });
    } else {
      this.setState({
        name: "",
        address: "",
        group: "",
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("user", JSON.stringify(nextState));
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <h1 className="text-left">Group One</h1>
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Group</th>
                    <th>        </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> 
                    <button class="button button4">Edit</button>
                    <button class="button button4">Remove</button>
                    <button class="button button4">Switch</button>
                    </td>
                </tr>
                </tbody>
            </table>

            <h1 className="text-left" id="">Group Two</h1>
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Group</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> 
                    <button class="button button4">Edit</button>
                    <button class="button button4">Remove</button>
                    <button class="button button4">Switch</button>
                    </td>
                </tr>
                </tbody>
            </table>       
          </div>
          <form className="col-md-5" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-md-6">
                <h3 className="text-left">Get Details</h3>
              </div>
              <div className="col-md-6">
                <span className="glyphicon glyphicon-pencil"></span>
              </div>
            </div>
            <hr/>
            {/* make another column for textbox and label */}
            <div className="row">
              <label className="label col-md-2 control-label">Name </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.onChangeName}
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="row">
              <label className="label col-md-2 control-label">Address </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.address}
                  onChange={this.onChangeAddress}
                  placeholder="Address"
                />
              </div>
            </div>
            <div className="row">
              <label className="label col-md-2 control-label">Group </label>
              <div className="col-md-10">
                <select className="form-control" value={this.state.group}
                  onChange={this.onChangeGroup}>
                  <option value="one">Group 1</option>
                  <option value="two">Group 2</option>
                </select>
              </div>
              <button className="btn btn-reset" type="reset" value="Reset">Submit</button>
              <button className="btn btn-submit" type="submit" value="Submit">Reset</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
