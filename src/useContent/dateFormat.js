const updateClock = () => {
  const date = new Date()

  // const stringFormat = (key)=>String(date[key]()).padStart(2, '0')

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const keys = ['getDate','getHours','getMinutes','getSeconds']
//   for(let k of keys){
// console.log('k',stringFormat(k)
// )
//   }
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  return formattedDate
}
// 更新时钟

export default updateClock
