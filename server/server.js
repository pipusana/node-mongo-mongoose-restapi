require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} =require('mongodb');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

console.log(process.env.NODE_ENV);
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((doc) =>{
    if (!doc) {
      return res.status(400).send();
    }
    res.send({doc});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.delete('/todos/:id', (req,res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((doc) => {
   if (!doc) {
    return res.status(404).send();
   }

   res.send({doc})
  }).catch((e) => {
    return res.status(400).send();
  });
});

app.patch('/todos/:id', (req,res) => {
  let id = req.params.id;
  const body = {
    text: 'Update !!',
    completed: true,
  };
  
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndUpdate(id, {'$set': body}).then((doc) => {
    if(!doc) {
      return res.status(404).send();
    }

    res.send({doc})
  }).catch((e) => {
    res.status(400).send();
  })
  
});

// POST // USER
app.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  let user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});


app.listen(port, ()=>{
 console.log('Strated on port', port)
});

module.exports = {app};