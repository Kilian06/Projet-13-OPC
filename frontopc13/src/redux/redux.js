import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { getUserApi, infoUser } from "../script/logApi";

const initialState = {
  logged: false,
  token: "",
  loading: false,
  errorLog: false,
  userData: { firstName: "", name: "", email: "", token: "" },
};

export const fetchLogin = createAsyncThunk(
  "login/logUser",
  async ({ log, mdp, rejectValue }) => {
    try {
      const response = await getUserApi(log, mdp);
      const result2 = await infoUser(response.body.token);
      return { response, result2 };
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
      return initialState
    },
    // changeName:((state) => {

    // })
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.loading = true;
      state.errorLog = false;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.logged = true;
      state.loading = false;
      state.errorLog = false;
      state.token = action.payload.response.body.token;
      state.userData.email = action.payload.result2.body.email;
      state.userData.name = action.payload.result2.body.lastName;
      state.userData.firstName = action.payload.result2.body.firstName;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.errorLog = true;
      state.loading = false;
    });
  },
});

export default loginSlice.reducer;
export const { reset } = loginSlice.actions;


export const loginUser = (log, mdp) => (dispatch) => {
  console.log("LoginUser");
  console.log(log, mdp);
  dispatch(fetchLogin({ log, mdp }));
};

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
});
