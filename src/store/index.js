import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";
import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawerData: JSON.parse(localStorage.getItem("drawerData")) || false,
    drawer: false,
    user: null,
    isAuthenticated: false,
  },
  getters: {
    username: (state) => state.user?.displayName || null,
    user(state) {
      return state.user;
    },
    isAuthenticated: (state) => !!state.user,
  },
  mutations: {
    updateDrawer(state, value) {
      state.drawerData = value;
      localStorage.setItem("drawerData", JSON.stringify(value));
    },
    setDrawer(state, payload) {
      state.drawer = payload;
    },
    SET_USER(state, user) {
      state.user = user;
    },

    SET_ISAUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
  },
  actions: {
    signUp({ commit }, { email, username, password }) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          updateProfile(user, { displayName : username })
            .then(() => {
              commit("SET_USER", user);
              commit("SET_ISAUTHENTICATED", true);
    
              // console.log(userCredential.user.displayName);
              // Profile updated!
              // ...
            })
            .catch((error) => {
              alert(error)
              // An error occurred
              // ...
            });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    signIn({ commit }, {email, password}){
      const auth = getAuth()
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential)=>{
        if(userCredential.user){
          commit('SET_USER', userCredential.user)
          commit('SET_ISAUTHENTICATED', true)
          router.push("/member");

        }else{
          alert('Login Failed: Incorret Email or Password')
        }
      }).catch((err)=>{
        console.error(err)
      })
    }
  },
  modules: {},
});
