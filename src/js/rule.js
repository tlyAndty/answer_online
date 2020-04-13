export function isValidMail(str) {
  const reg = /^[a-zA-z0-9]+@[a-zA-Z0-9]+\.\w{2,3}$/
  return reg.test(str)
}
