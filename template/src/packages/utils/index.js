export const getQueryString = obj => {
  let str = ''
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== null) {
      str = `${key}=${obj[key]}&`
    }
  }
  if (str) {
    str = str.substr(0, str.length - 1)
  }
  return str
}

export const parseQueryString = str => {
  console.log(str)
}

export const url = {
  getQueryString,
  parseQueryString
}
