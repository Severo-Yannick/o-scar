const { RESTDataSource } = require('apollo-datasource-rest');
const debug = require('debug')('REST');

class Imdb extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://www.omdbapi.com';
  }

  didReceiveResponse(res, req) {
    debug(req.url);
    return super.didReceiveResponse(res, req);
  }

  async search(searchTerm) {
    // Ici il va faire un fetch
    const response = await this.get(`?s=${searchTerm}&apikey=${process.env.OMDB_API_KEY}`);
    // Pour rappel l'API Omdb renvoi le tableau de film dans une propriété "Search" de la
    // reponse en JSON
    return response.Search;
  }

  async findByPk(id) {
    const response = await this.get(`?i=${id}&apikey=${process.env.OMDB_API_KEY}`);
    return response;
  }
}

module.exports = Imdb;
