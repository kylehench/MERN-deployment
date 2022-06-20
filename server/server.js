const express = require('express')
const cors = require('cors')
const app = express()
const socket = require('socket.io')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./config/mongoose.config')
require('./routes/pet.routes')(app)
const port = 8000
const server = app.listen(port, () => console.log(`Listening on port: ${port}`))

const io = socket(server, {
  cors: {
    origin: '*',
    // origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['*'],
    credentials: true,
  }
})

io.on('connection', socket => {
  // client joins
  console.log(`socket id: ${socket.id}`)
  console.log(`${socket.conn.server.clientsCount} clients are connected`)

  // adoption event
  socket.on('adopt', data => {
    console.log('a pet was adopted')
    console.log(`${socket.conn.server.clientsCount} clients are connected`)
    socket.broadcast.emit('adopt', data)
  })
})