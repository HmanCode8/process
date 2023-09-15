const o = (function () {
  let obj = {
    a: 1,
    b: 2,
  }
  return {
    get: function (k) {
      return obj[k]
    },
  }
})()
console.log(o.get('valueOf'))

// 不改变代码结构，修改obj的值
