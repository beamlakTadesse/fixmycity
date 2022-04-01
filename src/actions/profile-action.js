import { ProfileConstants } from "../constants/profile-constants";
export const setInfo = (information) => {
    return {
        type: ProfileConstants.SET_INFO,
        payload: information,
    };
};
