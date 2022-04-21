const { UserInputError, AuthenticationError } = require('apollo-server');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const MovieModel = require('../models/movie');
const ReviewModel = require('../models/review');

module.exports = {
  async signup(_, args) {
    const { username, email, password } = args;

    const users = await UserModel.findAll({ $or: { username, email } });

    if (users.length) {
      throw new UserInputError('User already exists with those informations');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({ username, email, password: encryptedPassword });

    await user.save();

    // Ici ce n'est pas forcéement necéssaire, car on maitrise la possibilité de récupération au
    // niveau des schémas
    delete user.password;

    return user;
  },
  async createMovie(_, args, { user }) {
    if (!user) {
      throw new AuthenticationError('You must be connected to add a movie');
    }

    const data = args.input;

    const movies = await MovieModel.findAll({ title: data.title });

    if (movies.length) {
      throw new UserInputError('A movie already exists with this title');
    }

    const newMovie = new MovieModel(data);

    await newMovie.save();

    return newMovie;
  },
  async createReview(_, args, { user }) {
    const data = args.input;
    const movie = await MovieModel.findByPk(data.movie_id);

    if (!movie) {
      throw new UserInputError(`No movie with the id : ${data.movie_id}`);
    }

    const reviews = await ReviewModel.findAll({
      user_id: user.id,
      movie_id: data.movie_id,
    });

    if (reviews.length) {
      throw new UserInputError('User has already review this movie');
    }

    const review = new ReviewModel({ ...data, user_id: user.id });

    await review.save();

    return review;
  },
};
