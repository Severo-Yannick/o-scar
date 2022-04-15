const Category = require('./category');
const Query = require('./query');

const resolvers = {
  // Une propriété des resolvers correspond à un type du côté du schéma
  Category,
  Query,
};

module.exports = resolvers;
