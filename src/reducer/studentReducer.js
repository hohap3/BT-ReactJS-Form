import {
  RESET_SELECTED_STUDENT,
  SET_LOADING,
  SET_SEARCH_TERM,
  SET_SELECTED_STUDENT,
  SET_STUDENT_LIST,
} from "../constants";

const initialState = {
  studentList: [],
  selectedStudent: null,
  isLoading: false,
  searchTerm: "",
};

function studentReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case `student/${SET_LOADING}`:
      return { ...state, isLoading: true };

    case `student/${SET_STUDENT_LIST}`:
      return { ...state, studentList: payload, isLoading: false };

    case `student/${SET_SELECTED_STUDENT}`:
      return { ...state, selectedStudent: payload };

    case `student/${RESET_SELECTED_STUDENT}`:
      return { ...state, selectedStudent: null };

    case `student/${SET_SEARCH_TERM}`:
      return { ...state, searchTerm: payload };

    default:
      return { ...state };
  }
}

export default studentReducer;
