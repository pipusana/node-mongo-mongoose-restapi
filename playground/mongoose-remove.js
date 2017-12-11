const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

// Todo.remove({}).then((result) => {
//   console.log(result);
// }, (e) => {
//   console.log(e);
// })

// Todo.findOneAndRemove()

Todo.findByIdAndRemove('5a2e9b664e8ba2752c9fcf15').then((doc) => {
  console.log(doc);
});