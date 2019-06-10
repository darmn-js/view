
function (doc) {
  if (doc.$type !== 'entry') return;
  var emitWithOwner = function (key, data) {
    for (var i = 0; i < doc.$owners.length; i++) {
      if (key == null) {
        emit([doc.$owners[i]], data);
      } else {
        emit([doc.$owners[i]].concat(key), data);
      }
    }
  };
  var customMap = function(doc) {
      if (doc.$type !== 'entry' || doc.$kind !== 'dna') return;
      var getReference = require('views/lib/getReference').getReference;
      var getToc = require('views/lib/getToc').getToc;
      var reference = getReference(doc);
      var toc = getToc(doc);
      toc.reference = reference;
      emitWithOwner(reference, toc);
    };
  customMap(doc);
}