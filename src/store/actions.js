import  {
  ADD_TO_CART,
  ADD_COUNT
} from './mutation-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.carList.find(item => item.iid === payload.iid)
      if(oldProduct) {
        context.commit(ADD_COUNT, oldProduct)
        resolve("当前的商品数量+1")
      } else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve("添加商品成功")
      }

    })
  }
}
