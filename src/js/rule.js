export function isValidMail(str) {
  const reg = /^[a-zA-z0-9]+@[a-zA-Z0-9]+\.\w{2,3}$/
  return reg.test(str)
}
export function isValidConfirmCode(str) {
  const reg = /^\d{6}$/;
  return reg.test(str)
}
