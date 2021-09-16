import axios from 'axios'

export const Post = (url, data, cb) => {
  axios.post(url, data)
    .then(cb).catch(function (err) {
      console.log(err)
    })
}

export const Delete = (url, data, cb) => {
  axios.delete(url, { data: data }).then(cb).catch(function (err) {
    console.log(err)
  })
}
