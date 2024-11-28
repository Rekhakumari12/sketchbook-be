const app = require('express')()
const httpServer = require('http').createServer(app)
const cors = require('cors')

const isDev = app.settings.env === 'development'
const URL = isDev ? 'http://localhost:3000/' : 'https://sketchbook-fe-pi.vercel.app/'
const options = {
  cors: URL,
}

app.use(cors({ origin: URL })) //whitelisting client
const io = require('socket.io')(httpServer, options)

io.on('connection', (socket) => {
  console.log('server connected')

  socket.on('beginPath', (arg) => {
    socket.broadcast.emit('beginPath', arg)
  })

  socket.on('drawLine', (arg) => {
    socket.broadcast.emit('drawLine', arg)
  })

  socket.on('changeConfig', (arg) => {
    socket.broadcast.emit('changeConfig', arg)
  })
})

httpServer.listen(3001)
// WARNING !!! app.listen(3000); will not work here, as it creates a new HTTP server
