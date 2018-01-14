console.log(process.env.NODE_ENV);
const env = process.env.NODE_ENV || 'development';
console.log(process.env.NODE_ENV);

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 5000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoTest';
}

console.log(process.env.NODE_ENV);
