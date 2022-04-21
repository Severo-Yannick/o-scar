const CoreSQLDataSource = require('./core/sql');

class Movie extends CoreSQLDataSource {
  tableName = 'movie';

  async findByCategory(categoryId) {
    const query = this.knex(this.tableName)
      .connection(this.establishedConnection)
      .select('movie.*')
      .join('movie_has_category', 'movie.id', '=', 'movie_has_category.movie_id')
      .where('category_id', categoryId)
      .orderByRaw('random()');

    const result = await query;
    return result;
  }
}

module.exports = Movie;
