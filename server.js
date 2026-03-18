require('dotenv').config();
const express = require('express');
const path = require('node:path');
const session = require('express-session');
const passport = require('passport');
const pgSession = require('connect-pg-simple')(session);
const pool = require('./src/db/pool');

require('./src/config/passport');

const app = express();

const public = path.join(__dirname, 'public');
app.use(express.static(public));

app.use(express.urlencoded({ extended: true }));

app.use(session({
  store: new pgSession({
    pool: pool,
    tableName: 'session'
  }),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60* 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

const userRoute = require('./src/routes/userRoute');
const messageRoute = require('./src/routes/messageRoute');

app.use('/', userRoute);
app.use('/message', messageRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server is running at port ${PORT}`);
});