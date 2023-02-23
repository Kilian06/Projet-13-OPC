import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { getUserApi, infoUser, updateInfoUser } from "../script/dataApi";

const initialState = {
  logged: false,
  token: "",
  loading: false,
  errorLog: false,
  authUser: false,
  expiredToekn: false,
  userData: { firstName: "", name: "", email: "", token: "" },
  modal:{changeName: false, needrelog: false}
};

export const fetchLogin = createAsyncThunk(
  "login/logUser",
  async ({ log, mdp, remember, rejectValue }) => {
    try {
      const response = await getUserApi(log, mdp);
      const result2 = await infoUser(response.body.token);
      console.log(remember);
      return { response, result2, remember };
    } catch (error) {
      console.log("ici");
      return rejectValue(error.response);
    }
  }
);

export const fetchUpdateInfo = createAsyncThunk(
  "login/updateUser",
  async ({ token, newFirstName, newLastName, rejectValue }) => {
    try {
      const response = await updateInfoUser(token, newFirstName, newLastName);
      return { response };
    } catch (error) {
      return rejectValue(error.response);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    reset: (state) => {
      window.localStorage.clear();
      window.sessionStorage.clear();
      return initialState;
    },
    relog: (state) => {
      if (window.localStorage.getItem("authUser") === "true") {
        state.userData.name = window.localStorage.getItem("name");
        state.userData.firstName = window.localStorage.getItem("firstName");
        state.token = window.localStorage.getItem("token");
      }
      state.loading = false;
      state.errorLog = false;
      state.logged = true;
    },
    showModalChangeName: (state) => {
      state.modal.changeName = true
    },
    hideModalChangeName: (state) => {
      state.modal.changeName = false
    },
    showModalNeedRelog: (state) => {
      state.modal.needrelog = true
    },
    hideModalNeedRelog: (state) => {
      state.modal.needrelog = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.loading = true;
      state.errorLog = false;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      console.log(action);
      state.logged = true;
      state.authUser = action.payload.remember;
      window.localStorage.setItem("authUser", state.authUser);
      state.loading = false;
      state.errorLog = false;
      state.token = action.payload.response.body.token;
      state.userData.email = action.payload.result2.body.email;
      state.userData.name = action.payload.result2.body.lastName;
      state.userData.firstName = action.payload.result2.body.firstName;
      if (action.payload.remember) {
        window.localStorage.setItem("name", state.userData.name);
        window.localStorage.setItem("firstName", state.userData.firstName);
        window.localStorage.setItem("token", state.token);
      }
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      console.log(action);
      state.errorLog = true;
      state.loading = false;
    });
    builder.addCase(fetchUpdateInfo.pending, (state) => {});
    builder.addCase(fetchUpdateInfo.fulfilled, (state, action) => {
      if(action.payload.response.message === "jwt expired"){
        console.log("prout")
        state.expiredToekn = true
      } else {
        window.localStorage.setItem("name", action.payload.response.body.lastName);
        window.localStorage.setItem("firstName", action.payload.response.body.firstName);
        state.userData.name = action.payload.response.body.lastName;
        state.userData.firstName = action.payload.response.body.firstName;
      }

    });
    builder.addCase(fetchUpdateInfo.rejected, (state) => {});
  },
});

export default loginSlice.reducer;
export const { reset, relog, showModalChangeName, hideModalChangeName, hideModalNeedRelog, showModalNeedRelog } = loginSlice.actions;

export const loginUser = (log, mdp, remember) => (dispatch) => {
  dispatch(fetchLogin({ log, mdp, remember }));
};

export const updateUser = (token, newFirstName, newLastName) => (dispatch) => {
  console.log("ici 12");
  dispatch(fetchUpdateInfo({ token, newFirstName, newLastName }));
};

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
});
