const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
});

app.use(cors());

const port = process.env.PORT || 5000;

app.get('/', (_req, res) => {
  try {
    res.status(200).json({msg: 'app is started'});
  } catch (error) {
    res.json({
      error: error.message
    });
  }
});

io.on('connection', (socket) => {
  socket.emit('me', socket.id);

  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded');
  });
  socket.on('callUser', ({userToCall, signalData, from, name}) => {
    io.to(userToCall).emit('callUser', {signal: signalData, from, name});
  });
  socket.on('acceptCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});