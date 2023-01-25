import studentApi from "../api/studentAPI";
import {
  RESET_SELECTED_STUDENT,
  SET_LOADING,
  SET_SEARCH_TERM,
  SET_SELECTED_STUDENT,
  SET_STUDENT_LIST,
} from "../constants";
import Swal from "sweetalert2";

export function setStudentList(payload) {
  return {
    type: `student/${SET_STUDENT_LIST}`,
    payload,
  };
}

export function setSelectedStudent(payload) {
  return {
    type: `student/${SET_SELECTED_STUDENT}`,
    payload,
  };
}

export function resetSelectedStudent() {
  return {
    type: `student/${RESET_SELECTED_STUDENT}`,
  };
}

export function handleUpdateSearchParams(searchTerm) {
  return function (dispatch) {
    dispatch({
      type: `student/${SET_SEARCH_TERM}`,
      payload: searchTerm,
    });

    dispatch(fetchStudentAPI());
  };
}

export function fetchStudentAPI() {
  return async function (dispatch, getState) {
    try {
      const { searchTerm } = getState().student;

      dispatch({
        type: `student/${SET_LOADING}`,
      });

      const res = await studentApi.getAll({
        fullName: searchTerm,
      });

      dispatch(setStudentList(res.data));
    } catch (err) {
      console.log(`Error:${err}`);
    }
  };
}

export function removeStudent({ id, fullName }) {
  return function (dispatch) {
    Swal.fire({
      title: `Bạn có muốn xóa sinh viên ${fullName}`,
      text: "Bạn không thể hoàn tác lại được!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Hủy",
      confirmButtonText: "Có, xóa sinh viên!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await studentApi.removeByID(id);

          dispatch(fetchStudentAPI());

          Swal.fire("Đã xóa!", `Sinh viên ${fullName} đã bị xóa`, "success");
        } catch (err) {
          console.log(`Error:${err}`);
        }
      }
    });
  };
}

export function handleAddNewStudent(data) {
  return async function (dispatch) {
    try {
      await studentApi.addNew(data);

      // re render data
      dispatch(fetchStudentAPI());
    } catch (err) {
      console.error(`Error:${err}`);
    }
  };
}

export function handleUpdateStudent(data, id) {
  return async function (dispatch) {
    try {
      await studentApi.updateByID(data, id);

      // Re render data
      dispatch(fetchStudentAPI());
    } catch (err) {
      console.log(`Error:${err}`);
    }
  };
}

export function handleSetSelectedStudent(id) {
  return async function (dispatch) {
    try {
      const res = await studentApi.getInfoByID(id);

      dispatch(setSelectedStudent(res.data));
    } catch (err) {
      console.log(`Error:${err}`);
    }
  };
}
