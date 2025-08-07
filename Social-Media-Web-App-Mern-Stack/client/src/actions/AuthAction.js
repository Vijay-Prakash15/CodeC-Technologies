import * as AuthRequest from "../api/AuthRequest.js";

// Sign Up
export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });

  try {
    const { email, password, firstname, lastname } = formData;
    const cleanData = { email, password, firstname, lastname };

    console.log("Sending to backend:", cleanData);
    const { data } = await AuthRequest.signUp(cleanData);

    dispatch({ type: "AUTH_SUCCESS", data });
  } catch (error) {
    dispatch({ type: "AUTH_FAIL" });
    console.error("Signup Error:", error.response?.data || error.message);
  }
};

// Log In
export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });

  try {
    const { data } = await AuthRequest.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data });
  } catch (error) {
    dispatch({ type: "AUTH_FAIL" });
    console.error("Login Error:", error.response?.data || error.message);
  }
};

// ✅ Log Out
export const logOut = () => async (dispatch) => {
  try {
    // Optional: You could add logic to call a logout endpoint if needed
    dispatch({ type: "LOG_OUT" });
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
};
