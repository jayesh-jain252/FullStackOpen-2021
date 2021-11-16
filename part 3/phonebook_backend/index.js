// eslint-disable-next-line linebreak-style
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

var morgan = require('morgan')

morgan.token('body', function getBody (req) {
  let {name,number} = req.body
  let bodyObject = {
    name:name,number:number
  }
  return JSON.stringify(bodyObject)
})

app.use(morgan(':method :url :status :body - :response-time ms')
)

app.get('/info', (request, response) => {
  const event = new Date()
  response.send(`<p>Phonebook has info for ${Person.length} people</p>
    <p>${event.toString()}</p>`)
})
  
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if(error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.get('/api/persons/:id', (request, response,next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response,next) => {
  const body = request.body
    
  // if (body.name === undefined) {
  //     return response.status(400).json({ 
  //       error: 'name missing' 
  //     })
  // }

  // if (body.number === undefined) {
  //   return response.status(400).json({ 
  //     error: 'number missing' 
  //   })
  // }
    
  const person = new Person({
    name:body.name,
    number:body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error=>next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  
  const body = request.body
  console.log(body)
  const person = {
    name: body.name,
    number: body.number,
  }
  // var myquery = request.params.id;
  // console.log(myquery)
  // Person.findOneAndUpdate(
  //   {id:myquery},
  //   {$set:{number:body.number}},
  //   {new: true},function(err,doc){
  //     if (err) {
  //       console.log("Something wrong when updating data!");
  //     }

  //     console.log(doc);
  //   })
  // })  
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  var myquery = request.params.id
  Person.findByIdAndRemove(myquery,function (err) {
    if (err){
      console.log(err)
    }
    else{
      response.status(204).end()
    }
  })
    
})  

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})