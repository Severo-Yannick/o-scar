module.exports = {
  async imdb(parent, _, { dataSources }) {
    const imdbMovie = await dataSources.imdb.findByPk(parent.imdb_id);
    return imdbMovie;
  },
};
