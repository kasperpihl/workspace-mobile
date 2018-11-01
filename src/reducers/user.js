import { fromJS } from "immutable";
import { SIGNIN_SUCCESS } from "src/actions/";

const initialState = fromJS({
  signedIn: false
});

export default (state, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return state.set("signedIn", true);
    default:
      return state || initialState;
  }
};
