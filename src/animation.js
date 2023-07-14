// 使用GSAP监听滚轮事件，实现平滑的页面滚动
console.log('gsap', gsap)
const box = document.querySelector('.box')

gsap.fromTo(
  box,
  {
    x: 0,
  },
  {
    x: function(_,target){
      return 200
    },
  }
)
