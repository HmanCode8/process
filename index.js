

const main = document.querySelector('.main')
const pc = document.querySelector('#pc')
const range = document.querySelector('#range')
// 绘制span元素为表盘100ge
for (let i = 0; i < 100; i++) {
  const span = document.createElement('span')
  span.style.transform = `rotate(${(i / 100) * 360}deg)`
  main.appendChild(span)
}
let increasing = true // 用于标志滑块值是否在增加

chSpanColor = () => {
  const spans = document.querySelectorAll('span')
  for (let i = 0; i < main.children.length; i++) {
    const span = spans[i]
    const rangeSize = i < range.value
    const property = `hsl(${(i / 100) * 360}, 100%,50%)`
    span.style.setProperty('--bg', rangeSize ? property : 'black')
    span.style.setProperty('--sg', rangeSize ? property : 'transparent')
  }
}

changeInput = () => {
  range.style.backgroundSize = `${range.value}% 100%`
  // pc.style.transform = `rotate(${-90 + (parseInt((range.value - 1 ) * 3.6) )}deg)`
  pc.innerHTML = `${range.value}%`
  chSpanColor(range.value)
}

range.addEventListener('input', changeInput)

// 创建定时器，每秒执行一次
const timer = setInterval(() => {
  range.value = +range.value + (increasing ? 1 : -1)

  changeInput()
  // 到达100%后，改变方向
  if (range.value >= 100) {
    increasing = false
  } else if (range.value <= 0) {
    increasing = true
  }
}, 1000)

