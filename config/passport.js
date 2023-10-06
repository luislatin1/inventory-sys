const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User'); // Asegúrate de importar tu modelo User correctamente

// Configuración de Passport.js
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Busca un usuario en la base de datos por nombre de usuario
      const user = await User.findOne({ where: { username } });

      if (!user) {
        // Si no se encuentra el usuario, devuelve un mensaje de error
        return done(null, false, { message: 'Nombre de usuario no encontrado' });
      }

      // Verifica si la contraseña proporcionada coincide con la almacenada en la base de datos
      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        // Si la contraseña no coincide, devuelve un mensaje de error
        return done(null, false, { message: 'Contraseña incorrecta' });
      }

      // Si las credenciales son válidas, devuelve el usuario
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// Serialize y Deserialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
