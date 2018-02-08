import axios from 'axios'

export default{
  list (params, cb, fb) {
    axios.get('/api/questions', {params: params})
    .then( (response) => {
      if (cb) {
        cb(response)
      }
    })
    .catch((err) => {
      if (fb) {
        fb(err)  
      }
    })
  },
  create (question, cb, fb) {
    axios.post('/api/questions' ,{question: question})
    .then( (response) => {
      if (cb) {
        cb(response)
      }
    })
    .catch((err) => {
      if (fb) {
        fb(err)  
      }
    })
  }
}
