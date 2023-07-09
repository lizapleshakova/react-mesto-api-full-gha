const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// const { createUser, login } = require('./controllers/users');
// const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('connected to db');
  });

const app = express();

app.use(bodyParser.json());

// app.use((req, res, next) => {
//   req.user = {
//     _id: '648c9b83fa02ff9b72585080',
//   };

//   next();
// });
app.use(cors());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(errorLogger);

// app.post('/signup', createUser);
// app.post('/signin', login);
// app.use(auth);

app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Ошибка сервера'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
