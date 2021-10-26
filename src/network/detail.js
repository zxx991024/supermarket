import {request} from "./request";

// 获取详情页的匹配索引
export function getDetail(iid) {
  return request({
    url:"/detail",
    params: {
      iid
    }
  })
}

// 获取详情页推荐的商品数据
export function getRecommend() {
  return request({
    url: "/recommend"
  })
}

// 获取详情页的数据总合（第二个组件，含商品介绍，新旧价格，退换货等信息）
export class Goods {
  constructor(itemInfo, columns,services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class Shop {
  constructor(shopInfo) {
    this.name = shopInfo.name;
    this.logo= shopInfo.shopLogo;
    this.sells = shopInfo.cSells;
    this.goodsCount = shopInfo.cGoods;
    this.score = shopInfo.score;
    this.fans = shopInfo.cFans;
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
