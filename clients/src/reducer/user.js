const initialState = {
  users: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        users: action.payload,
      };
    case "REMOVE_USER":
      localStorage.removeItem("token");
      return {
        users: null,
      };
    default:
      return state;
  }
};

export default userReducer;
