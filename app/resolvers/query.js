const { AuthenticationError } = require('apollo-server');
const bcrypt = require('bcrypt');

const jwt = require('../helpers/jwt');

module.exports = {
  async getAllCategories(_, __, { dataSources }) {
    const categories = await dataSources.category.findAll();
    return categories;
  },

  async getMovie(_, args, { dataSources }) {
    // En 2eme argument des resolvers on retrouve la liste de l'ensemble des arguments
    // envoyés dans la requête utilisateur
    const movie = await dataSources.movie.findByPk(args.id);
    return movie;
  },
  // Le 3eme argument des resolvers est le contexte, il contient tous ce qui a été défini dans
  // la méthode context fourni au server Apollo
  async signin(_, args, context) {
    const errorMessage = 'Authentication invalid';
    const { email, password } = args;

    const users = await context.dataSources.user.findAll({ email });

    if (!users.length) {
      throw new AuthenticationError(errorMessage);
    }

    const user = users[0];

    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      throw new AuthenticationError(errorMessage);
    }

    // Ajout manuellement de l'id, afin de déclencher le getter de l'instance de user
    // Pour l'ip contrairement a un controller dans express, je n'est pas d'argument req.
    // Mais heureusement il y a un autre moyen de récupérer une information contextuelle
    user.token = jwt.create({ ...user, id: user.id, ip: context.ip });

    return user;
  },
  async searchImdb(_, args, { dataSources }) {
    const movies = await dataSources.imdb.search(args.searchTerm);
    return movies;
  },
};
