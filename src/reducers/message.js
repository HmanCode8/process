const fn =  (state='1',action)=>{
  console.log('state111',action)
  const {message} = action
  return {
    ...state,
    message:message
  }
}
export default fn 