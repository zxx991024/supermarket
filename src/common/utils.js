// 防抖
export function debounce(fn, delay=300) {
  let timer = null
  return function(...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    },delay)
  }
}

export function formatDate(date,format) {

  if(/(y+)/.test(format)) {
    format=format.replace(RegExp.$1, (date.getFullYear() + "").substr(4- RegExp.$1.length));
  }

  let o = {
    "M+" : date.getMonth()+1, //month

    "d+" : date.getDate(), //day

    "h+" : date.getHours(), //hour

    "m+" : date.getMinutes(), //minute

    "s+" : date.getSeconds(), //second

    "q+" : Math.floor((date.getMonth()+3)/3), //quarter

    "S" : date.getMilliseconds() //millisecond

  }

  for(let k in o){
    if(new RegExp("("+ k +")").test(format)){
      let str = o[k] + "";
      format = format.replace(RegExp.$1, RegExp.$1.length==1 ? str : padLeftZero(str));
    }
  }
  return format;
};

function padLeftZero (str) {
  return ("00" + str).substr(str.length);
};
