const initialState = { course: '' };

export function courseReducer(state = initialState, action) {
  switch (action.type) {
    case "COURSE":
      return {
        course: action.newCourse,
      };

    default:
      return state;
  }
}
