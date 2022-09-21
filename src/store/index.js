import { createStore } from 'vuex'
import sanity from '@/client'

export default createStore({
  state: {
    windowWidth: 0,
    mainImage: [],
    teachers: [],
    reviews: [],
  },
  getters: {
    teachers: state => state.teachers,
    reviews: state => state.reviews,
    mainImage: state => state.mainImage,
    GET_WINDOW_WIDTH: state => state.windowWidth
  },
  mutations: {
    SET_WINDOW_WIDTH(state, size) {
      state.windowWidth = size
    },

    //teachers
    SET_TEACHERS(state, teachers) {
      state.teachers = teachers
    },
    ADD_TEACHERS(state, teachers) {
      state.teachers = [...state.teachers, ...teachers]
    },

    //reviews
    SET_REVIEWS(state, reviews) {
      state.reviews = reviews
    },
    ADD_REVIEWS(state, reviews) {
      state.reviews = [...state.reviews, ...reviews]
    },

    //mainImage
    SET_IMAGE(state, main) {
      state.mainImage = main
    },
    ADD_IMAGE(state, main) {
      state.mainImage = [...state.mainImage, ...main]
    },
  },
  actions: {
    CHANGE_WINDOW_WIDTH({commit}, size) {
      commit('SET_WINDOW_WIDTH', size)
    },

    //teachers
    FETCH_TEACHERS({commit}, _) {
      const query = '*[_type == "teacher"] {..., author->}'
      sanity.fetch(query).then(teachers => {
        commit('SET_TEACHERS', teachers)
      })
    },
    ADD_NEW_TEACHERS({commit}, teachers) {
      commit('ADD_TEACHERS', [teachers])
    },
    UPDATE_TEACHERS({commit}, teachers) {
      commit('SET_TEACHERS', this.state.teachers.map(p => p._id === teachers._id ? teachers : p))
    },
    REMOVE_TEACHERS({commit}, id) {
      commit('SET_TEACHERS', this.state.teachers.filter(p => p._id !== id))
    },

    //reviews
    FETCH_REVIEWS({commit}, _) {
      const query = '*[_type == "author"] {..., author->}'
      sanity.fetch(query).then(reviews => {
        commit('SET_REVIEWS', reviews)
      })
    },
    ADD_NEW_REVIEWS({commit}, reviews) {
      commit('ADD_REVIEWS', [reviews])
    },
    UPDATE_REVIEWS({commit}, reviews) {
      commit('SET_REVIEWS', this.state.reviews.map(p => p._id === reviews._id ? reviews : p))
    },
    REMOVE_REVIEWS({commit}, id) {
      commit('SET_REVIEWS', this.state.reviews.filter(p => p._id !== id))
    },

    //mainImage
    FETCH_IMAGE({commit}, _) {
      const query = '*[_type == "mainImage"] {..., author->}'
      sanity.fetch(query).then(image => {
        commit('SET_IMAGE', image)
      })
    },
    ADD_NEW_IMAGE({commit}, image) {
      commit('ADD_IMAGE', [image])
    },
    UPDATE_IMAGE({commit}, image) {
      commit('SET_IMAGE', this.state.mainImage.map(p => p._id === image._id ? image : p))
    },
    REMOVE_IMAGE({commit}, id) {
      commit('SET_IMAGE', this.state.mainImage.filter(p => p._id !== id))
    },
  },
})
