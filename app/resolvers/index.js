const Category = require('./category');
const Movie = require('./movie');
const Mutation = require('./mutation');
const Query = require('./query');
const User = require('./user');

const resolvers = {
  // Une propriété des resolvers correspond à un type du côté du schéma
  Category,
  Movie,
  User,
  Query,
  Mutation,
};

module.exports = resolvers;
