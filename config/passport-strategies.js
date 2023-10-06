const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../src/models/User'); // Asegúrate de tener un modelo de usuario

// Configura la estrategia de autenticación local de Passport.js
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = {
  LocalStrategy
};
