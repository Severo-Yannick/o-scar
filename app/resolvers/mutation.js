const { UserInputError, AuthenticationError } = require('apollo-server');
const bcrypt = require('bcrypt');

module.exports = {
  async signup(_, args, { dataSources }) {
    const { username, email, password } = args;

    const users = await dataSources.user.findAll({ $or: { username, email } });

    if (users.length) {
      throw new UserInputError('User already exists with those informations');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = dataSources.user.insert({ username, email, password: encryptedPassword });

    // Ici ce n'est pas forcéement necéssaire, car on maitrise la possibilité de récupération au
    // niveau des schémas
    delete user.password;

    return user;
  },
  async createMovie(_, args, { user, dataSources }) {
    if (!user) {
      throw new AuthenticationError('You must be connected to add a movie');
    }

    const data = args.input;

    const movies = await dataSources.movie.findAll({ title: data.title });

    if (movies.length) {
      throw new UserInputError('A movie already exists with this title');
    }

    const newMovie = dataSources.movie.insert(data);

    return newMovie;
  },
  async createReview(_, args, { user, dataSources }) {
    if (!user) {
      throw new AuthenticationError('You must be connected to add a review');
    }

    const data = args.input;
    const movie = await dataSources.movie.findByPk(data.movie_id);

    if (!movie) {
      throw new UserInputError(`No movie with the id : ${data.movie_id}`);
    }

    const reviews = await dataSources.review.findAll({
      user_id: user.id,
      movie_id: data.movie_id,
    });

    if (reviews.length) {
      throw new UserInputError('User has already review this movie');
    }

    const review = dataSources.review.insert({ ...data, user_id: user.id });

    return review;
  },
};
