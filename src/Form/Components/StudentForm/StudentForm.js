import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import * as studentActions from "../../../actions/student";

class StudentForm extends Component {
  state = {
    values: {
      id: "",
      fullName: "",
      email: "",
      phone: "",
    },
    errors: {
      id: "",
      fullName: "",
      email: "",
      phone: "",
    },
  };

  submitBtnRef = createRef();
  formRef = createRef();

  handleSubmitForm = (e) => {
    e.preventDefault();

    const validationErrors = {};

    const { values } = this.state;

    const { dispatch } = this.props;

    const { id, ...restData } = values;

    const hasID = !!e.target.dataset.updatedId;

    for (let key in values) {
      // Nếu có lỗi thì ta mới thêm thông tin lỗi vào
      const error = this.validationInput({ name: key, value: values[key] });
      if (error) validationErrors[key] = error;
    }

    // Nếu tồn tại lỗi , thì ko cho submit
    if (Object.keys(validationErrors).length > 0) {
      this.setState({
        errors: {
          ...this.state.errors,
          ...validationErrors,
        },
      });

      // Hủy toàn bộ code chạy ở dưới
      return;
    }

    // Nếu mà form có id tồn tại thì ta sẽ thực hiện update data
    // Ko thì ta add student mới vào
    if (hasID)
      dispatch(
        studentActions.handleUpdateStudent(restData, e.target.dataset.updatedId)
      );
    else dispatch(studentActions.handleAddNewStudent(restData));

    // Reset form
    this.setState({
      values: {
        id: "",
        fullName: "",
        email: "",
        phone: "",
      },
    });
    // Cho selected student về null để reset form
    dispatch(studentActions.resetSelectedStudent());

    e.target.reset();
    delete e.target.dataset.updatedId;
    this.submitBtnRef.current.textContent = "Thêm sinh viên";
  };

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      values: {
        ...this.state.values,
        [name]: value.trim(),
      },
    });

    this.setState({
      errors: {
        ...this.state.errors,
        [name]: this.validationInput({ name, value }),
      },
    });
  };

  // Xử lý sự kiện khi user blur chuột ra

  handleBlurOut = (e) => {
    const { name, value } = e.target;
    this.setState({
      errors: {
        ...this.state.errors,
        [name]: this.validationInput({ name, value }),
      },
    });
  };

  checkInputValue = ({ name, value }) => {
    if (value === "" || value.trim().length < 0)
      return `Vui lòng điền vào trường này!`;

    switch (name) {
      case "fullName":
        if (value.length < 2) return `Họ và tên phải có từ 2 kí tự trở lên`;
        break;
      case "email":
        const emailRegex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(value)) return `Email không đúng định dạng!`;
        break;

      case "phone":
        if (value.length < 10) return `Số điện thoại phải có 10 số!`;
        break;

      default:
        break;
    }

    return "";
  };

  validationInput = ({ name, value }) => {
    switch (name) {
      case "id":
      case "fullName":
      case "email":
      case "phone":
        return this.checkInputValue({ name, value });
      default:
        break;
    }
  };

  handleUpdateForm = () => {
    const { selectedStudent } = this.props;

    if (selectedStudent && selectedStudent.id) {
      this.formRef.current.dataset.updatedId = selectedStudent.id;
      this.submitBtnRef.current.textContent = "Update";
    }
  };

  componentDidUpdate = (prevProps) => {
    const { selectedStudent } = this.props;

    if (selectedStudent && prevProps.selectedStudent !== selectedStudent) {
      this.setState({
        values: {
          ...selectedStudent,
        },
      });
    }
  };

  render() {
    {
      this.handleUpdateForm();
    }

    const { values, errors } = this.state;
    const { selectedStudent } = this.props;

    return (
      <div className="student-form-container px-4">
        <form
          className="student-form needs-validation"
          noValidate
          onSubmit={this.handleSubmitForm}
          ref={this.formRef}
        >
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="student-form-item">
                <div className="has-validation form-group mb-4">
                  <label className="form-label">Mã SV:</label>
                  <input
                    name="id"
                    type="text"
                    className={clsx("form-control", {
                      "is-invalid": errors.id,
                    })}
                    placeholder="Điền mã sinh viên..."
                    onInput={this.handleInput}
                    onBlur={this.handleBlurOut}
                    value={values.id}
                    disabled={selectedStudent && selectedStudent.id}
                  />
                  {errors.id && (
                    <div className="invalid-feedback">{errors.id}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Số điện thoại:</label>
                  <input
                    name="phone"
                    type="text"
                    className={clsx("form-control", {
                      "is-invalid": errors.phone,
                    })}
                    placeholder="Điền số điện thoại..."
                    onInput={this.handleInput}
                    onBlur={this.handleBlurOut}
                    value={values.phone}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="student-form-item">
                <div className="form-group mb-4">
                  <label className="form-label">Họ tên:</label>
                  <input
                    name="fullName"
                    type="text"
                    className={clsx("form-control", {
                      "is-invalid": errors.fullName,
                    })}
                    placeholder="Điền Họ và Tên..."
                    onInput={this.handleInput}
                    onBlur={this.handleBlurOut}
                    value={values.fullName}
                  />
                  {errors.fullName && (
                    <div className="invalid-feedback">{errors.fullName}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Email:</label>
                  <input
                    name="email"
                    type="text"
                    className={clsx("form-control", {
                      "is-invalid": errors.email,
                    })}
                    placeholder="Điền email..."
                    onInput={this.handleInput}
                    onBlur={this.handleBlurOut}
                    value={values.email}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button ref={this.submitBtnRef} className="btn btn-success mt-4">
            Thêm sinh viên
          </button>
        </form>
      </div>
    );
  }
}

export default connect((state) => ({
  selectedStudent: state.student.selectedStudent,
}))(StudentForm);
