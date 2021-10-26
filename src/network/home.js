import {request} from "./request";

// 请求头部 轮播图以及 featureView 展示的图片
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

// 请求 “流行，新款 精选” 三个部分里面的图片
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    },

  })
}

// 函数调用 -> 压入函数栈(保存函数调用过程中所有变量)
// 函数调用结束 -> 弹出函数栈(释放函数所有的变量)
// function test() {
//   const names = ['why', 'aaa']
// }
//
// test()
//
// test()
