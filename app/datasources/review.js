const CoreSQLDataSource = require('./core/sql');

class Review extends CoreSQLDataSource {
  tableName = 'review';
}

module.exports = Review;
