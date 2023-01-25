import React, { Component } from "react";
import { connect } from "react-redux";
import * as studentActions from "../../../actions/student";

class StudentSearch extends Component {
  state = {
    searchTerm: "",
  };

  handleInputSearch = (e) => {
    const { value } = e.target;

    this.setState({
      searchTerm: value,
    });
  };

  handleFindStudent = () => {
    const { dispatch } = this.props;

    dispatch(studentActions.handleUpdateSearchParams(this.state.searchTerm));
  };

  render() {
    return (
      <div className="my-4 d-flex px-4">
        <input
          className="form-control"
          placeholder="Tìm kiếm họ tên sinh viên..."
          onInput={this.handleInputSearch}
        />
        <button
          className="btn btn-primary ms-2"
          onClick={this.handleFindStudent}
        >
          Tìm
        </button>
      </div>
    );
  }
}

export default connect()(StudentSearch);
