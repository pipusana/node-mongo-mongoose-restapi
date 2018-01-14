const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

let password = '123abc!';


bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

let hashedPassword = '$2a$10$2I1kzB0y2aKdUwD..Rvzw.qms.3c0Nty67nzzaegjisT7ZiREea/C';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
})


// let data = {
//   id: 10
// };

// let token = jwt.sign(data, 'nkj22072537');
// console.log(token);

// let decode = jwt.verify(token, 'nkj22072537');
// console.log(decode);


// let message = 'I am user number 3';
// let hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);


// let data = {
//   id: 4
// };

// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString(); 

// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Do not trust!');
// }