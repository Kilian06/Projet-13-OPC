// création du syteme de store et des fonctions associées

// importation des différents outils
import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { getUserApi, infoUser, updateInfoUser } from "../script/dataApi";


// définition du state initial
const initialState = {
  logged: false, // Est ce que l'utilisateur est logé ou non ?
  token: "", // qu'elle est le token qui est actuellement utilisé par la session
  loading: false, // est ce que la page est en cours de chargement
  errorLog: false, // est ce qu'il y a une erreur de login
  authUser: false, // est ce que c'est un user authentifié par le localstorage?
  expiredToekn: false, // est ce que le token du localstorage est expiré ?
  userData: { firstName: "", name: "", email: "", token: "" }, // les data du user pour la session en cours
  modal:{changeName: false} // Est ce qu'il est necessaire d'afficher la modal changeName ?
};

// utilisation de createAsyncThunk pour gerer la réponse async et la positionner dans un extrareducer
export const fetchLogin = createAsyncThunk( // Création de la premiere fonction récuperer le token, nom, prénom de l'utilisateur suite à la connection
  "login/logUser",
  async ({ log, mdp, remember, rejectValue }) => {
    try {
      const response = await getUserApi(log, mdp); // Premiere fonction appel l'api pour récuperer le token
      const result2 = await infoUser(response.body.token); // la deuxieme fonction recupere le nom et prenom de l'utilisateur en fonction du token
      return { response, result2, remember }; // Je renvoi ces données dans le payload
    } catch (error) {
      return rejectValue(error.response);
    }
  }
);

export const fetchUpdateInfo = createAsyncThunk( // Crétation de la seconde fonction pour mettre à jour le nom et prénom de l'utilisateur
  "login/updateUser",
  async ({ token, newFirstName, newLastName, rejectValue }) => {
    try {
      const response = await updateInfoUser(token, newFirstName, newLastName); // J'envoi le token, le nouveau nom et le nouveua prenom à l'api
      return { response }; // pour avoir en retour la confirmation de la bonne prise en compte de ces nouvelles informations
    } catch (error) {
      return rejectValue(error.response);
    }
  }
);

const loginSlice = createSlice({ // Création de la slice login
  name: "login",
  initialState, // Utilisation du state défini plus haut
  reducers: {
    reset: (state) => { // Création d'un reducer pour exectuer une fonction de logOut
      window.localStorage.clear();
      window.sessionStorage.clear();
      return initialState;
    },
    relog: (state) => { // Création d'un reducer pour se reconnecter automatiuement lorsqu'un user a coché remember me
      if (window.localStorage.getItem("authUser") === "true") {
        state.userData.name = window.localStorage.getItem("name");
        state.userData.firstName = window.localStorage.getItem("firstName");
        state.token = window.localStorage.getItem("token");
      }
      state.loading = false;
      state.errorLog = false;
      state.logged = true;
    },
    // Gestion de l'affichage des modals
    showModalChangeName: (state) => {
      state.modal.changeName = true
    },
    hideModalChangeName: (state) => {
      state.modal.changeName = false
    }
  },
  // Gestion des extraReducers
  extraReducers: (builder) => { 
    // Premiere Extra Reducer pour la connexion et la récupération des infos de l'utilisateur pour les positionner dans le state
    builder.addCase(fetchLogin.pending, (state) => {
      state.loading = true;
      state.errorLog = false;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
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
      state.errorLog = true;
      state.loading = false;
    });
    // Decond extra Reducer qui permet d'update le state lors de la mise à jour du nom et prenom 
    builder.addCase(fetchUpdateInfo.pending, (state) => {});
    builder.addCase(fetchUpdateInfo.fulfilled, (state, action) => {
      if(action.payload.response.status === 401){ // Vérification du 
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
export const { reset, relog, showModalChangeName, hideModalChangeName } = loginSlice.actions;

export const loginUser = (log, mdp, remember) => (dispatch) => {
  dispatch(fetchLogin({ log, mdp, remember }));
};

export const updateUser = (token, newFirstName, newLastName) => (dispatch) => {
  dispatch(fetchUpdateInfo({ token, newFirstName, newLastName }));
};

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
});
