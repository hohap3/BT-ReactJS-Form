import React, { Component } from "react";
import { connect } from "react-redux";
import StudentForm from "../Components/StudentForm/StudentForm";
import StudentList from "../Components/StudentList/StudentList";
import * as studentActions from "../../actions/student";
import StudentSearch from "../Components/StudentSearch/StudentSearch";

class HomePage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(studentActions.fetchStudentAPI());
  }

  render() {
    return (
      <div>
        <h2 className="bg-dark text-white p-2">Thông tin sinh viên</h2>

        <StudentForm />

        <StudentSearch />

        <StudentList />
      </div>
    );
  }
}

export default connect()(HomePage);
