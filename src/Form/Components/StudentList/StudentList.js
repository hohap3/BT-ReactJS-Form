import React, { Component } from "react";
import { connect } from "react-redux";
import StudentItem from "../StudentItem/StudentItem";

class StudentList extends Component {
  renderStudentItem() {
    const { studentList } = this.props;
    return studentList.map((student) => (
      <StudentItem key={student.id} student={student} />
    ));
  }

  render() {
    const { isLoading } = this.props;

    if (isLoading)
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );

    return (
      <div className="student-list mt-4">
        <table className="table">
          <thead className="bg-dark text-white">
            <tr>
              <th>Mã SV</th>
              <th>Họ và tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>{this.renderStudentItem()}</tbody>
        </table>
      </div>
    );
  }
}

export default connect((state) => ({
  studentList: state.student.studentList,
  isLoading: state.student.isLoading,
}))(StudentList);
