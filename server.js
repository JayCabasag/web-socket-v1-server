const users = []

const messages = []

const io = require('socket.io')(3001, {
    cors: ['http://localhost:3000']
})

io.on('connection', socket => {
    socket.emit('users', users)
    socket.emit('messages', messages)
    socket.on('send-group-message', message => {
        const newMessage = {
            id: Math.random().toString(36),
            message: message.message
        }
        messages.push(newMessage)
        io.emit('messages', messages)
    })
    socket.on('clear-messages', () => {
        messages.length = 0
        io.emit('messages', messages)
    })
    
})
