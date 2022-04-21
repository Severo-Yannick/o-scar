const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const jwt = require('./helpers/jwt');

module.exports = {
  typeDefs,
  resolvers,
  // On peut déclarer une méthode de context (forcément nommé "context")
  // Cette méthode sera exécuté a chaque nouvelle requête
  context: ({ req }) => {
    const ctx = {
      ...req,
      ip: req.headers['x-forwarded-for']
        ? req.headers['x-forwarded-for'].split(/, /)[0]
        : req.connection.remoteAddress,
      user: jwt.get(req),
    };
    return ctx;
  },
};
