import React, { Component } from "react";
import isEmpty from "lodash/isEmpty";
import "./getDetails.css";
export default class information extends Component {
  userData;
  groupOne = [];
  groupTwo = [];
  constructor(props) {
    super(props);
    this.onChangeField = this.onChangeField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      users: [],
      name: "",
      address: "",
      group: "",
      rowId: 0,
      editMode: false
    };
  }
  //React life cycle
  /* componentDidMount() {
    if (localStorage.getItem("allUsers")) {
      const userData = JSON.parse(localStorage.getItem("allUsers"));
      this.setState({
        users: [...userData.users]
      });
    }
  } */

  // Form events

  // TODO: Move this into one OnChange Function
  onChangeField(el) {
    const { users, rowId, editMode } = this.state;
    const { target } = el;
    const { value, name } = target;
    const userItems = new Map(users);
    if (editMode) {
      userItems.set(rowId, {
        id: rowId,
        name: userItems.get(rowId).name,
        address: userItems.get(rowId).address,
        group: userItems.get(rowId).group,
        [name]: value
      });

      this.setState({ users: Array.from(userItems) });
    } else {
      this.setState({ [name]: value });
    }
  }

  onEditRow(id) {
    const { editMode } = this.state;
    this.setState({ rowId: id, editMode: !editMode });
  }

  onRemoveRow(id) {
    const { users } = this.state;
    const userItems = new Map(users);
    if (userItems.has(id)) {
      userItems.delete(id);
      this.setState({ users: Array.from(userItems) });
    }
  }
  onSubmit(el) {
    el.preventDefault();

    const { name, address, group, users, rowId, editMode } = this.state;

    const userItems = new Map(users);

    if (editMode) {
      userItems.set(rowId, {
        id: rowId,
        name: userItems.get(rowId).name,
        address: userItems.get(rowId).address,
        group: userItems.get(rowId).group
      });
      this.setState({ users: Array.from(userItems) });
    } else {
      userItems.set(userItems.size + 1, {
        id: userItems.size + 1,
        name,
        address,
        group
      });
      // console.log(Array.from(userItems));
      this.setState({ users: Array.from(userItems) });
    }

    // this.setGroupRows();

    //  console.log(users);
    //  const userArr = [];
    /* const newUser = {
      name,
      address,
      group
    }; */
    //arr.push(...users, newUser);

    /* const allUsers = {
      users: userArr
    };
    console.log(allUsers);

    localStorage.setItem("allUsers", JSON.stringify(allUsers)); */
    this.setState({
      name: "",
      address: "",
      group: "",
      rowId: 0,
      editMode: false
    });
  }

  render() {
    // const storage = localStorage.getItem("user");
    // console.log(this.groupTwo);
    const { users, rowId, editMode } = this.state;
    const userItems = new Map(users);
    const groupOneRowItems = [];
    const groupTwoRowItems = [];
    console.log(editMode ? userItems.get(rowId).name : "");
    userItems.forEach(item => {
      if (item.group === "one") {
        groupOneRowItems.push({
          id: item.id,
          name: item.name,
          address: item.address,
          group: item.group
        });
      } else {
        groupTwoRowItems.push({
          id: item.id,
          name: item.name,
          address: item.address,
          group: item.group
        });
      }
    });
    console.log(groupOneRowItems);

    const groupOne = !isEmpty(groupOneRowItems)
      ? groupOneRowItems.map(item => {
          return (
            <tr key={item.id}>
              <td>{item.name} </td>
              <td>{item.address} </td>
              <td>{item.group} </td>
              <td>
                <button
                  class="button button4"
                  name="edit"
                  onClick={() => this.onEditRow(item.id)}
                >
                  Edit
                </button>
                <button
                  class="button button4"
                  onClick={() => this.onRemoveRow(item.id)}
                >
                  Remove
                </button>
                <button class="button button4">Switch</button>
              </td>
            </tr>
          );
        })
      : "";

    const groupTwo = !isEmpty(groupTwoRowItems)
      ? groupTwoRowItems.map(item => {
          return (
            <tr key={item.id}>
              <td>{item.name} </td>
              <td>{item.address} </td>
              <td>{item.group} </td>
              <td>
                <button class="button button4">Edit</button>
                <button class="button button4">Remove</button>
                <button class="button button4">Switch</button>
              </td>
            </tr>
          );
        })
      : "";

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
                </tr>
              </thead>
              <tbody>{groupOne}</tbody>
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
              <tbody>{groupTwo}</tbody>
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
                  value={editMode ? userItems.get(rowId).name : this.state.name}
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
                  value={
                    editMode ? userItems.get(rowId).address : this.state.address
                  }
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
                  defaultValue={editMode ? userItems.get(rowId).group : ""}
                  value={
                    editMode ? userItems.get(rowId).group : this.state.group
                  }
                  name="group"
                  onChange={this.onChangeField}
                >
                  <option value="">Select Value</option>
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
