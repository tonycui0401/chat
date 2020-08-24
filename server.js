const express = require("express");
const app = express();
const port = 8002;
var server = require("http").Server(app);
const io = require("socket.io")(server);
// const users = require("./configs/users");
const cors = require("cors");
const moment = require('moment');
// const { Users } = require('./users');
// const models = require("./models");

const {local_endpoint, remote_endpoint} = require('./configs/config');
// const DB = require('./db.js');
// const apiAuth = require('./routes/auth');

const fetch = require('node-fetch');
// var users = new Users();

app.use(cors());





// const { db } =  DB();
// app.set('db', db);

// console.log("get db")
// console.log(db)

// app.use('/auth', apiAuth(app));


var clients = {};
var users = {}
var member = {}
var generateMessage = (from, room, type, text, user) => {
  return {
      from,
      room,
      type,
      text,
      user,
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

    users[params.room_id]={}
    member[params.room_id]={}

    if(!users[params.room_id].users){
      users[params.room_id].users=[]
    }

    if(!member[params.room_id].users){
      member[params.room_id].users=[]
    }

    fetch(local_endpoint+'/allChatGroupMembers?room='+params.room_id)
    .then(res => res.json())
    .then(json => {
      
      console.log("check members")
      console.log(json)

     
        users[params.room_id].users=json
        console.log("print me out")
        for (let i in json){
console.log("print me")
        console.log(json[i])
        member[params.room_id].users.push(json[i].member)

      }


      console.log(member[params.room_id].users.includes(params.user_id))

      console.log("end check members")


      if(!member[params.room_id].users.includes(params.user_id)){
    
        let newUser = {
          user_id: params.user_id,
          firstname: params.firstname,
          lastname: params.lastname,
          img: params.img,
          joinDate: moment().valueOf()
      }
  
      // member[params.room_id].users.push(params.user_id)
  
      fetch(local_endpoint+'/createChatGroupMember'
      , {
        method: 'post',
        body:    JSON.stringify({
          room:params.room_id,
          member:params.user_id,
          joindate:moment().valueOf(),
          membertype:'normal'
        }),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => console.log(json));
      
  
  
      users[params.room_id].users.push(newUser)
    
      
      // let tempObj = generateMessage(params.user_id, params.room_id, params.img, `${params.firstname} ${params.lastname}`, users)
  
      // io.to(params.room).emit('newMessage', tempObj);
      // callback({
      //     data: tempObj
      // });
  
      }
  
      client.emit('newMessage', generateMessage(params.user_id, params.room_id, params.img, `${params.firstname} ${params.lastname}`, users));
    
      client.broadcast.to(params.room_id).emit('newMessage', generateMessage(params.user_id, params.room_id, params.img, `${params.firstname} ${params.lastname}`, users));
  


      // res.send(json);
    
    })

    // if(!users[params.room_id]){
    //   users[params.room_id]={}
    // }

    // if(!member[params.room_id]){
    //   member[params.room_id]={}
    // }

    // users[params.room_id].user_id = params.user_id
   
   console.log(member[params.room_id].users.includes(params.user_id))
   
    // if(!users[params.room_id].users){
    //   users[params.room_id].users=[]
    // }

    // if(!member[params.room_id].users){
    //   member[params.room_id].users=[]
    // }


    // if(!users[params.room_id].user_id){

    // users[params.room_id].user_id = params.user_id

  //   if(!member[params.room_id].users.includes(params.user_id)){
    
  //     let newUser = {
  //       user_id: params.user_id,
  //       firstname: params.firstname,
  //       lastname: params.lastname,
  //       img: params.img,
  //       joinDate: moment().valueOf()
  //   }

  //   // member[params.room_id].users.push(params.user_id)

  //   fetch(local_endpoint+'/createChatGroupMember'
  //   , {
  //     method: 'post',
  //     body:    JSON.stringify({
  //       room:params.room_id,
  //       member:params.user_id,
  //       joindate:moment().valueOf(),
  //       membertype:'normal'
  //     }),
  //     headers: { 'Content-Type': 'application/json' },
  // })
  // .then(res => res.json())
  // .then(json => console.log(json));
    


  //   users[params.room_id].users.push(newUser)
  
    
  //   // let tempObj = generateMessage(params.user_id, params.room_id, params.img, `${params.firstname} ${params.lastname}`, users)

  //   // io.to(params.room).emit('newMessage', tempObj);
  //   // callback({
  //   //     data: tempObj
  //   // });

  //   }

 


    // client.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', params.room, `${params.user_id} has joined.`));

    callback();
});


client.on('createMessage', (message, callback) => {
  // var user = users.getUser(client.id);
  // if (user && isRealString(message.text)) {
    console.log("on create new messages")
    console.log(message)
      let tempObj = generateUserMessage(message.user_id, message.room, 'in', message.type, message.text, message.name, message.img);
      io.to(message.room).emit('newMessage', tempObj);
      callback({
          data: tempObj
      });
  // }



  fetch(local_endpoint+'/createChatGroupMsg'
  , {
    method: 'post',
    body:    JSON.stringify({
      room:message.room,
      sender:message.user_id,
      message:message.text,
      time:moment().valueOf(),
      type:message.type
    }),
    headers: { 'Content-Type': 'application/json' },
})
.then(res => res.json())
.then(mjson => {
  
  
  console.log(mjson)



  fetch(local_endpoint+'/allChatGroupMembers?room='+message.room)
.then(res => res.json())
.then(json => {
  
  // console.log("check members")
  // console.log(json)
  // for (let i = 0; i < 10; i++) {
  //   if (i === 3) {
  //     continue;
  //   }
  //   text = text + i;
  // }
 
  //   users[params.room_id].users=json
  //   console.log("print me out")
    for (let i in json){

      if (json[i].member === message.user_id) {
        continue;
      }

      fetch(local_endpoint+'/createChatGroupMsgStatus'
      , {
        method: 'post',
        body:    JSON.stringify({
          msg_id:mjson.id,
          seenby:json[i].member,
          seenat:null
        }),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => console.log(json));


  }


});









});











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

    fetch(local_endpoint+'/createPrivateChat'
    , {
      method: 'post',
      body:    JSON.stringify({
        sender:e.from,
        receipt:e.to,
        message:e.message.message,
        time:e.message.time,
        type:e.message.type
      }),
      headers: { 'Content-Type': 'application/json' },
  })
  .then(res => res.json())
  .then(json => console.log(json));
    
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




app.get('/users', (req, res) => {

  fetch('http://localhost:5000/api/tags/locationTags')
    .then(res => res.json())
    .then(json => {
      
      console.log(json)

      res.send(json);
    
    });

  // console.log(models.location_tag)

  // const location_tag = models.location_tag.findAll({
  //   attributes: ['title'],
  //   raw: true
  // });

  // console.log(location_tag)

});
// app.get("/users", (req, res) => {
//   res.send({ data: users });
// });

server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
