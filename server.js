const users = []

const messages = []

const port = process.env.PORT || 3001;

const io = require('socket.io')(port, {
    cors: ['https://websocket-v1-client.vercel.app/']
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
