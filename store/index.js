export const state = () => ({
  counter: 0,
  user:null
})

export const mutations = {
  increment(state) {
    state.counter++
  },

  ON_AUTH_STATE_CHANGED_MUTATION(state, { authUser, claims }) {
    // you can request additional fields if they are optional (e.g. photoURL)
    const { uid, email, emailVerified, displayName, photoURL } = authUser

    state.user = {
      uid,
      displayName,
      email,
      emailVerified,
      photoURL: photoURL || null, // results in photoURL being null for server auth
      // use custom claims to control access (see https://firebase.google.com/docs/auth/admin/custom-claims)
      isAdmin: claims.custom_claim
    }
  }
}

export const actions = {

  async onAuthStateChangedAction({ commit, dispatch }, { authUser, claims }) {
    if (!authUser) {
      await dispatch('cleanupAction')

      return
    }

    // you can request additional fields if they are optional (e.g. photoURL)
    const { uid, email, emailVerified, displayName, photoURL } = authUser

    commit('SET_USER', {
      uid,
      email,
      emailVerified,
      displayName,
      photoURL, // results in photoURL being undefined for server auth
      // use custom claims to control access (see https://firebase.google.com/docs/auth/admin/custom-claims)
      isAdmin: claims.custom_claim
    })
  },

  // Store action called nuxtServerInit:
nuxtServerInit({ dispatch, commit }, { res }) {
  if (res && res.locals && res.locals.user) {
    const { allClaims: claims, idToken: token, ...authUser } = res.locals.user
    commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser, claims, token })
  }
}

}
