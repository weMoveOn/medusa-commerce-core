export const getErrorMessage = (error: any) => {
  let msg = error?.response?.data?.message
  console.log(msg)
  if (msg[0].message) {
    msg = msg[0].message
  }
  if (!msg) {
    msg = "Something went wrong, Please try again."
  }
  return msg
}

export const getCustomErrorMessage = (error: any) => {
  let msg = error?.response?.data?.error?.data?.errors
  if (!msg) {
    msg = "Something went wrong, Please try again."
  }
  return msg
}
