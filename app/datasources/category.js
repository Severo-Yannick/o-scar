const CoreSQLDataSource = require('./core/sql');

class Category extends CoreSQLDataSource {
  tableName = 'category';
}

module.exports = Category;
