import React, { Component } from "react";

import "./getDetails.css";
export default class information extends Component {
  userData;
  constructor(props) {
    super(props);
    this.onChangeField = this.onChangeField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      users: [],
      name: "",
      address: "",
      group: ""
    };
  }

  //React life cycle
  componentDidMount() {
    if (localStorage.getItem("allUsers")) {
      const userData = JSON.parse(localStorage.getItem("allUsers"));
      this.setState({
        users: [...userData.users]
      });
    }
  }

  // Form events

  // TODO: Move this into one OnChange Function
  onChangeField(el) {
    const { target } = el;
    const { value, name } = target;

    this.setState({ [name]: value });
  }

  onChangeAddress(el) {
    this.setState({ address: el.target.value });
  }

  onChangeGroup(el) {
    this.setState({ group: el.target.value });
  }
  onSubmit(el) {
    el.preventDefault();

    const { name, address, group, users } = this.state;
    console.log(users);
    const userArr = [];
    const newUser = {
      name,
      address,
      group
    };
    userArr.push(...users, newUser);
    const allUsers = {
      users: userArr
    };
    console.log(allUsers);

    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    this.setState({
      name: "",
      address: "",
      group: ""
    });
  }
  render() {
    const storage = localStorage.getItem("user");
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
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td />
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

            <h1 className="text-left" id="">
              Group Two
            </h1>
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
                <span className="glyphicon glyphicon-pencil" />
              </div>
            </div>
            <hr />
            {/* make another column for textbox and label */}
            <div className="row">
              <label className="label col-md-2 control-label">Name </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChangeField}
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
                  name="address"
                  value={this.state.address}
                  onChange={this.onChangeField}
                  placeholder="Address"
                />
              </div>
            </div>
            <div className="row">
              <label className="label col-md-2 control-label">Group </label>
              <div className="col-md-10">
                <select
                  className="form-control"
                  // value={this.state.group}
                  name="group"
                  onChange={this.onChangeField}
                >
                  <option value="one">Group 1</option>
                  <option value="two">Group 2</option>
                </select>
              </div>
              <button className="btn btn-reset" type="submit" value="Reset">
                Submit
              </button>
              <button className="btn btn-submit" type="reset" value="Submit">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
