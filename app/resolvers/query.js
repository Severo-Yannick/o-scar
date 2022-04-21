const { AuthenticationError } = require('apollo-server');
const bcrypt = require('bcrypt');

const CategoryModel = require('../models/category');
const MovieModel = require('../models/movie');
const UserModel = require('../models/user');

const jwt = require('../helpers/jwt');

module.exports = {
  async getAllCategories() {
    const categories = await CategoryModel.findAll();
    return categories;
  },

  async getMovie(_, args) {
    // En 2eme argument des resolvers on retrouve la liste de l'ensemble des arguments
    // envoyés dans la requête utilisateur
    const movie = await MovieModel.findByPk(args.id);
    return movie;
  },
  // Le 3eme argument des resolvers est le contexte, il contient tous ce qui a été défini dans
  // la méthode context fourni au server Apollo
  async signin(_, args, context) {
    const errorMessage = 'Authentication invalid';
    const { email, password } = args;

    const users = await UserModel.findAll({ email });

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
};
