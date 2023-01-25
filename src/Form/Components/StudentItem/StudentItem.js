import React, { Component } from "react";
import { connect } from "react-redux";
import * as studentActions from "../../../actions/student";

class StudentItem extends Component {
  handleRemoveStudent = ({ id, fullName }) => {
    const { dispatch } = this.props;

    dispatch(studentActions.removeStudent({ id, fullName }));
  };

  handleUpdate = (studentID) => {
    if (!studentID) return;

    const { dispatch } = this.props;

    dispatch(studentActions.handleSetSelectedStudent(studentID));
  };

  render() {
    const { id, fullName, phone, email } = this.props.student;

    return (
      <tr>
        <td>{id}</td>
        <td>{fullName}</td>
        <td>{phone}</td>
        <td>{email}</td>
        <td>
          <button
            className="btn btn-primary me-3"
            onClick={() => this.handleUpdate(id)}
          >
            Chỉnh sửa
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleRemoveStudent({ id, fullName })}
          >
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default connect()(StudentItem);
