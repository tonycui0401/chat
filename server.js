const express = require("express");
const app = express();
const port = 8002;
var server = require("http").Server(app);
const io = require("socket.io")(server);
// const users = require("./configs/users");
const cors = require("cors");
const moment = require('moment');
// const { Users } = require('./users');


// var users = new Users();

app.use(cors());

var clients = {};
var users = {}

var generateMessage = (from, room, type, text) => {
  return {
      from,
      room,
      type,
      text,
      createdDate: moment().valueOf()
  }
};

var generateUserMessage = (from, room, type, text, name, img) => {
  return {
      from,
      room,
      type,
      text,
      name,
      img,
      createdDate: moment().valueOf()
  }
};



io.on("connection", function(client) {
  client.on("sign-in", e => {
    let user_id = e.user_id;
    if (!user_id) return;
    client.user_id = user_id;
    console.log("client user id")
    console.log(client.user_id)
    if (clients[user_id]) {
      clients[user_id].push(client);
    } else {
      clients[user_id] = [client];
    }
  });

  //   client.on("sign-in", e => {
  //   let user_id = e.id;
  //   if (!user_id) return;
  //   client.user_id = user_id;
  //   if (clients[user_id]) {
  //     clients[user_id].push(client);
  //   } else {
  //     clients[user_id] = [client];
  //   }
  // });


  client.on('join', (params, callback) => {

    // if (!isRealString(params.name) || !isRealString(params.room)) {
    //     return callback('Bad request');
    // }

    // console.log("get user name")
    // console.log(params.name)

    client.join(params.room_id);
    // users.removeUser(socket.id);
    // users.addUser(socket.id, params.name, params.room);

    // io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    // client.emit('newMessage', generateMessage('Admin', params.room, 'Welcome to the chat app.'));




    if(!users[params.room_id]){
      users[params.room_id]={}
    }

    // if(!users[params.room_id].user_id){
    client.emit('newMessage', generateMessage(params.user_id, params.room_id, params.img, `${params.firstname} ${params.lastname}`));
    users[params.room_id].user_id = params.user_id
    // }




    // client.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', params.room, `${params.user_id} has joined.`));

    callback();
});


client.on('createMessage', (message, callback) => {
  // var user = users.getUser(client.id);
  // if (user && isRealString(message.text)) {
    console.log("on create new messages")
    console.log(message)
      let tempObj = generateUserMessage(message.user_id, message.room, 'in', message.text, message.name, message.img);
      io.to(message.room).emit('newMessage', tempObj);
      callback({
          data: tempObj
      });
  // }
  console.log("get client id")

  // console.log(client.id)
  callback();
});



  client.on("message", e => {
    let targetId = e.to;
    let sourceId = client.user_id;
    // io.emit("message", e)
    console.log("message data")
    console.log(targetId)
    console.log(clients[targetId])
    console.log(sourceId)
    if(targetId && clients[targetId]) {
      clients[targetId].forEach(cli => {
        cli.emit("message", e);
        console.log("emited this")
      });
    }

    if(sourceId && clients[sourceId]) {
      clients[sourceId].forEach(cli => {
        cli.emit("message", e);
        console.log("emited that")
      });
    }

    
  });










// io.on("connection", function(client) {
//   client.on("sign-in", e => {
//     let user_id = e.id;
//     if (!user_id) return;
//     client.user_id = user_id;
//     if (clients[user_id]) {
//       clients[user_id].push(client);
//     } else {
//       clients[user_id] = [client];
//     }
//   });

//   client.on("message", e => {
//     let targetId = e.to;
//     let sourceId = client.user_id;
//     if(targetId && clients[targetId]) {
//       clients[targetId].forEach(cli => {
//         cli.emit("message", e);
//       });
//     }

//     if(sourceId && clients[sourceId]) {
//       clients[sourceId].forEach(cli => {
//         cli.emit("message", e);
//       });
//     }
//   });



  client.on("disconnect", function() {
    if (!client.user_id || !clients[client.user_id]) {
      return;
    }
    let targetClients = clients[client.user_id];
    for (let i = 0; i < targetClients.length; ++i) {
      if (targetClients[i] == client) {
        targetClients.splice(i, 1);
      }
    }
  });
});

// app.get("/users", (req, res) => {
//   res.send({ data: users });
// });

server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
