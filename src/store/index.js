import { createStore } from "vuex";

export default createStore({
  namespaced: true,
  state: {
    dutys: JSON.parse(localStorage.getItem("dutys")) || [],
    dones: JSON.parse(localStorage.getItem("dones")) || [],
    third_dutys: JSON.parse(localStorage.getItem("third_dutys")) || [],
    third_dones: JSON.parse(localStorage.getItem("third_dones")) || [],
    seletcted_date: JSON.parse(localStorage.getItem("seletcted_date")) || [],
  },
  // getters: {
  //   dutysnum(state) {
  //     return state.dutys.length;
  //   },
  //   donesnum(state) {
  //     return state.dones.length;
  //   },
  // },
  mutations: {
    ADD(state, obj) {
      state.dutys.push(obj);
    },
    SETDONE(state, obj) {
      state.dones.push(obj);
    },
    DELETE(state, targetindex) {
      state.dutys.splice(targetindex, 1);
    },
    DELETEDONE(state, targetindex) {
      state.dones.splice(targetindex, 1);
    },

    THIRD_ADD(state, obj) {
      state.third_dutys.unshift(obj);
    },
    THIRD_SETDONE(state, obj) {
      state.third_dones.push(obj);
    },
    THIRD_DELETE(state, targetindex) {
      state.third_dutys.splice(targetindex, 1);
    },
    THIRD_DELETEDONE(state, targetindex) {
      state.third_dones.splice(targetindex, 1);
    },
    THIRD_SELECTEDDATE(state, obj) {
      state.seletcted_date = {...obj};
    },
    // FRESH_DUTYS(state, index) {
    //   state.third_dutys[index].basic.done === false ? true : false;
    // },
  },
  // actions: {
  //   Add(context, obj) {
  //     context.commit("ADD", obj);
  //   },
  //   SetDone(context, obj) {
  //     context.commit("SETDONE", obj);
  //   },
  //   Delete(context, index) {
  //     context.commit("DELETE", index);
  //   },
  // },
  modules: {},
});
