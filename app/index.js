const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const jwt = require('./helpers/jwt');

const db = require('./db/pg');

const ImdbDatasource = require('./datasources/imdb');
const CategoryDatasource = require('./datasources/category');
const MovieDatasource = require('./datasources/movie');
const ReviewDatasource = require('./datasources/review');
const UserDatasource = require('./datasources/user');

const knexConfig = {
  // Knex utilisera le module pg pour se connecter, formater et executer les requêtes
  client: 'pg',
  establishedConnection: db,
};

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
      // A chaque requête on verifie que l'on a bien un token, si oui on récupère l'utilisateur
      // correspondant
      user: jwt.get(req),
    };
    return ctx;
  },
  // Ce qui est fourni dans la propriété dataSources ici, sera disponible dans le context sous une
  // propriété "dataSources"
  dataSources: () => ({
    imdb: new ImdbDatasource(),
    category: new CategoryDatasource(knexConfig),
    movie: new MovieDatasource(knexConfig),
    review: new ReviewDatasource(knexConfig),
    user: new UserDatasource(knexConfig),
  }),
};
