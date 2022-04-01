import { ProfileConstants } from "../constants/profile-constants";
const intialState = {
  info: [
      {
        id: '1',
        name: 'Nahi',
        position: 'Tele',
      }
  ],
};

export const profileReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ProfileConstants.SET_INFO:
      return state;
    default:
      return state;
  }
};