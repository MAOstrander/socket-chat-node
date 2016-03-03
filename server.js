'use strict';

const express = require('express');
const app = express();
const pg = require('pg').native;
const server = require('http').createServer(app);
const ws = require('socket.io')(server);

const PORT = process.env.PORT || 3000;
const POSTGRES_URL = process.env.POSTGRES_URL || 'postgres://localhost:5432/nodechat';
const db = new pg.Client(POSTGRES_URL);

app.set('view engine', 'jade');

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('index');
})

// app.get('/chats', (req, res) => {
//     console.log("YARP");
//   db.query('SELECT * FROM chats', (err, result) => {
//     if (err) throw err;
//     console.log("YARP2");

//     res.send(result.rows)
//   })
// })


db.connect((err) => {
  if (err) throw err;

  server.listen(PORT, () => {
    console.log("HEY, You've got a running server on port ", PORT);
  });
})

ws.on('connection', socket => {
  console.log("Socket to me:", socket.id);

  db.query('SELECT * FROM chats', (err, result) => {
    if (err) throw err;
    console.log("YARP2");

    socket.emit('receiveChat', result.rows)
  })

  socket.on('sendChat', (msg) => {
    db.query(`INSERT INTO chats (sender, mymessage) VALUES ($1, $2);`,
      [msg.sender, msg.mymessage], (err, res) => {
        if (err) throw err;

        console.log("RESULT", res);
        socket.emit('receiveChat', [msg]);
    })
  });
})
