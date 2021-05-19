const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const userRouter = require('./router/userRoutes');
const msgsRouter = require('./router/msgsRoutes');
const friendsListRouter = require('./router/friendsListRoutes');
const cors = require('cors');
const moment = require('moment');
const path = require('path');
const cluster = require('cluster');
const os = require('os');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
var Loadmill = require('express-loadmill');
require('./utils/cache');

require('dotenv').config();

if (cluster.isPrimary) {
  const numCpus = os.cpus().length;

  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const app = express();
  app.use(Loadmill({ verifyToken: process.env.LOADMILL_VERIFY_TOKEN }));

  mongoose
    .connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log('DB Connection Successful');
    })
    .catch((err) => {
      console.log(err);
    });

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  //setting request limit
  // const limiter = rateLimit({
  //   max: 100,
  //   windowMs: 60 * 60 * 1000,
  //   message: 'Too many requests from this IP. Please try again after an hour',
  // });
  //app.use('/api', limiter);

  //prevent malicious mongo code
  app.use(mongoSanitize());

  //prevent malicious html and js code from input
  app.use(xss());

  //prevent parameter pollution
  app.use(hpp());

  const port = process.env.PORT || 9000;
  const expressServer = app.listen(port, () => {
    console.log('Server started');
  });
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/msgs', msgsRouter);
  app.use('/api/v1/friends', friendsListRouter);

  const io = require('socket.io')(expressServer, {
    cors: 'https://chatke.netlify.app/',
  });
  // app.use(express.static(path.join(__dirname, '../client/build')));

  // app.get('*', function (req, res) {
  //   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  // });

  let roomNameJoin;

  io.on('connection', (socket) => {
    socket.on('roomNameToJoin', (roomName) => {
      socket.join(roomName);
      roomNameJoin = roomName;
    });

    socket.on('message', ({ message, user }) => {
      let current_time = moment().format('HH:mm');
      socket.broadcast
        .to(roomNameJoin)
        .emit('messageToUser', { message, user, current_time });
    });
  });
}
