var pokemonRepository = (function() {
  "use strict";
  var t = [],
    e = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  function n(e) {
    t.push(e);
  }
  function o(t) {
    pokemonRepository.loadDetails(t).then(function() {
      console.log(t), i(t);
    });
  }
  function i(t) {
    var e = $(".modal-body"),
      n = $(".modal-title");
    e.empty(), n.empty();
    var o = $("<h1>" + t.name + "</h1>"),
      i = $('<img class="modal-img">');
    i.attr("src", t.imageUrl);
    var a = $("<p>Height: " + t.height + "m</p>"),
      p = $("<p>Weight: " + t.weight + "kg</p>"),
      l = $("<p>Types: " + t.types + "</p>"),
      s = $("<p>Abilities: " + t.abilities + "</p>");
    e.append(o),
      e.append(i),
      e.append(a),
      e.append(p),
      e.append(l),
      e.append(s);
  }
  return {
    add: n,
    getAll: function() {
      return t;
    },
    addListItem: function(t) {
      var e = $(".pokemon-list"),
        n = $(
          '<button type="button" class="btn btn-primary btn-md list-button" data-toggle="modal" data-target="#exampleModal">' +
            t.name +
            "</button>"
        ),
        i = $("<li>");
      i.append(n),
        e.append(i),
        n.on("click", function(e) {
          o(t);
        });
    },
    loadList: function() {
      return $.ajax(e)
        .then(function(t) {
          t.results.forEach(function(t) {
            var e = { name: t.name, detailsUrl: t.url };
            n(e), console.log(e);
          });
        })
        .catch(function(t) {
          console.error(t);
        });
    },
    loadDetails: function(t) {
      var e = t.detailsUrl;
      return $.ajax(e)
        .then(function(e) {
          (t.imageUrl = e.sprites.front_default),
            (t.height = e.height),
            (t.types = []);
          for (var n = 0; n < e.types.length; n++)
            t.types.push(e.types[n].type.name);
          for (t.abilities = [], n = 0; n < e.abilities.length; n++)
            t.abilities.push(e.abilities[n].ability.name);
          return (t.weight = e.weight), t;
        })
        .catch(function(t) {
          console.error(t);
        });
    },
    showDetails: o,
    showModal: i
  };
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(t) {
    pokemonRepository.addListItem(t);
  });
});
