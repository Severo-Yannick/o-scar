const Category = require('./category');
const Query = require('./query');
const Mutation = require('./mutation');

const resolvers = {
  // Une propriété des resolvers correspond à un type du côté du schéma
  Category,
  Query,
  Mutation,
};

module.exports = resolvers;
