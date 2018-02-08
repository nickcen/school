import axios from 'axios'

export default{
  list (from_date, to_date, cb, fb) {
    axios.get('/questions', {params: {from_date: from_date, to_date: to_date}})
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
  create(question, cb, fb){
    console.log(question)
    axios.post('/questions' ,{question: question})
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
