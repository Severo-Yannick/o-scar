const { SQLDataSource } = require('datasource-sql');

class CoreSQLDataSource extends SQLDataSource {
  tableName;

  constructor(knexConfig) {
    super({ client: knexConfig.client });
    this.establishedConnection = knexConfig.establishedConnection;
  }

  async findAll(params) {
    const query = this.knex(this.tableName).connection(this.establishedConnection).select('*');
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        if (param === '$or') {
          query.where((builder) => {
            Object.entries(value).forEach(([key, val]) => {
              builder.orWhere(key, val);
            });
          });
        } else {
          query.where(param, value);
        }
      });
    }

    const result = await query;
    return result;
  }

  async findByPk(id) {
    const query = this.knex(this.tableName)
      .connection(this.establishedConnection)
      .select('*')
      .where({ id });

    const result = await query;
    return result[0];
  }

  async insert(data) {
    const result = await this.knex(this.tableName)
      .connection(this.establishedConnection)
      .insert(data)
      .returning('*');
    return result[0];
  }

  async update({ id }, inputData) {
    const result = await this.knex(this.tableName)
      .connection(this.establishedConnection)
      .where({ id })
      .update({ ...inputData, updated_at: new Date() })
      .returning('*');
    return result;
  }

  async delete(id) {
    const result = await this.knex(this.tableName)
      .connection(this.establishedConnection)
      .where({ id })
      .delete();
    return result;
  }
}

module.exports = CoreSQLDataSource;
