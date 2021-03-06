const initialState = {
  navigation: []
};

const state = initialState;

const mutations = {
  DROP_BREADCRUMBS: function(state, payload) {
    var index = state.navigation.map(e => e.name).indexOf(payload.name);
    if (index > -1) {
      state.navigation.splice(index + 1, state.navigation.length);
    } else {
      state.navigation.push(payload);
    }
  },

  PICKUP_BREADCRUMBS: function(state, payload) {
    //remove all
    state.navigation = [];
  },
  CLEAR(state) {
    Object.assign(state, initialState);
  }
};

export default {
  state,
  mutations
};
