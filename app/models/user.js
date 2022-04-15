const client = require('../../../db/pg');
const CoreModel = require('./coreModel');

/**
 * @typedef {object} User
 * @property {number} id - Unique identifier
 * @property {string} username - Unique username
 * @property {string} email - Unique email
 * @property {string} password - password
 * @property {string} created_at - user subscription date
 * @property {string} updated_at - movie last update date
 */

/**
 * @typedef {object} InputUser
 * @property {string} username - Unique username
 * @property {string} email - Unique email
 * @property {string} password - password
 */

/**
 * @typedef {object} InputSignin
 * @property {string} email - email
 * @property {string} password - password
 */

class User extends CoreModel {
  username;
  email;
  password;

  static tableName = 'user';

  constructor(obj) {
    super(obj);
    this.username = obj.username;
    this.email = obj.email;
    this.password = obj.password;
  }
}

User.init({ client });

module.exports = User;
