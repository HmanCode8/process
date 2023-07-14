const fn =  (state='1',action)=>{
  const {message} = action
  return {
    ...state,
    message:message
  }
}
export default fn 