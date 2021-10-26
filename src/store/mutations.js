import  {
  ADD_TO_CART,
  ADD_COUNT
} from './mutation-types'


export default {
  [ADD_COUNT](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.carList.push(payload)
  }
}
