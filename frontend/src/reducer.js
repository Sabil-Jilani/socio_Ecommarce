import {
  CLOSE_LOGIN_MODAL,
  CLOSE_REGISTER_MODAL,
  OPEN_LOGIN_MODAL,
  OPEN_REGISTER_MODAL,
} from "./constants";

export const initialState = {
  logIn: false,
  register: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case OPEN_LOGIN_MODAL:
      return { ...state, logIn: true };
    case CLOSE_LOGIN_MODAL:
      return { ...state, logIn: false };
    case OPEN_REGISTER_MODAL:
      return { ...state, register: true };
    case CLOSE_REGISTER_MODAL:
      return { ...state, register: false };
    default:
      return state;
  }
};
