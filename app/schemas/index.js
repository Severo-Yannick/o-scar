const { gql } = require('apollo-server');
const { readFileSync } = require('fs');
const path = require('path');

const category = readFileSync(path.join(__dirname, './category.gql'));
const movie = readFileSync(path.join(__dirname, './movie.gql'));
const query = readFileSync(path.join(__dirname, './query.gql'));

// Méthode gql fourni par le module et qui est éxecutée à travers un "tagged template"
// C'est l'equivalent de gql(), mais avec des fonctionnalités supplémentaires
const typeDefs = gql`
  # ICI NOUS NE SOMMES PLUS DANS DU JAVASCRIPT
  # C'est le langage partculier de GraphQL
  ${category}
  ${movie}
  ${query}
`;

module.exports = typeDefs;
