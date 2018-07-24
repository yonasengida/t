function findOcurrences(array){
  // flatten out the array
  var flat = array.reduce(function(carry, item){
    // This allows us to append either a value or an array without fuss
    return carry.concat(item);
  }, []);
  
  // count the ocurrences
  return flat.reduce(function(carry, item){
    carry[item] = (carry[item] || 0) + 1;
    return carry;
  }, {});
}

var array = [{a:10},{a:10},1, 2, 'a', 'b', [3, 'c', 1], 'd', 2, 'b'];

var occurrences = findOcurrences(array);

// SE should seriously have a console printer instead of an HTML results view
// console.log(JSON.stringify(occurrences));
console.log(occurrences);