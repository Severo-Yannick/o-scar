module.exports = {
  // Une méthode du resolver correspond à une des propriétés du schéma Pour une category la
  // valeur de Movie n'est pas dans la table de BDD "category", contrairement a l'ensemble
  // des autres propriétés du schéma
  // On doit donc spécifier à travers les resolvers comment récupérer ces infos
  movies(parent, _, { dataSources }) {
    // Le premier parmamètre disponible dans les méthodes de resolvers contient / ou pas,
    // l'entité parente qui utilise cet méthode
    // Ici on se trouve dans l'entité "Category",donc parent === category courante.
    return dataSources.movie.findByCategory(parent.id);
  },
};
