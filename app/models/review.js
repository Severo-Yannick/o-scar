const client = require('../../../db/pg');
const CoreModel = require('./coreModel');

/**
 * @typedef {object} Review
 * @property {number} id - Unique identifier
 * @property {string} user_id - user identifier
 * @property {string} movie_id - movie identifier
 * @property {string} rating - rating 0-5
 * @property {string} content - comment of the movie
 * @property {string} created_at - review date
 */

/**
 * @typedef {object} InputReview
 * @property {string} movie_id - movie identifier
 * @property {string} rating - rating 0-5
 * @property {string} content - comment of the movie
 */

class Movie extends CoreModel {
  user_id;
  movie_id;
  rating;
  content;

  static tableName = 'review';

  constructor(obj) {
    super(obj);
    this.user_id = obj.user_id;
    this.movie_id = obj.movie_id;
    this.rating = obj.rating;
    this.content = obj.content;
  }
}

Movie.init({ client });

module.exports = Movie;
