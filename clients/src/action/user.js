import axios from "../axios/axios";

export const handleUser = (user) => {
  return {
    type: "ADD_USER",
    payload: user,
  };
};

export const removeUser = () => {
  return {
    type: "REMOVE_USER",
  };
};

export const handleToken = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/data", {
        headers: {
          authorization: token,
        },
      });
      console.log(data);
      dispatch(handleUser(data.user));
    } catch (err) {
      console.log(err);
    }
  };
};
