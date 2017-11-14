/**
 * Created by rexmupas on 12/11/2017.
 */

/**
 * @ref: https://stackoverflow.com/questions/1199352/smart-way-to-shorten-long-strings-with-javascript
 * @param n
 * @param useWordBoundary
 * @returns {*}
 *
 * Note: add trunc method to JS String primitive so it is easier to use across
 * the app
 *
 */
String.prototype.trunc =
  function( n, useWordBoundary ){
    if (this.length <= n) { return this; }
    var subString = this.substr(0, n-1);
    return (useWordBoundary
        ? subString.substr(0, subString.lastIndexOf(' '))
        : subString) + "...";
  };


/**
 * @ref: https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
 * Quick, non-secure hashing algorithm to get a cleaner string digest
 * @returns {number}
 */
String.prototype.hashCode = function() {
  var hash = 0;
  if (this.length == 0) return hash;
  for (i = 0; i < this.length; i++) {
    char = this.charCodeAt(i);
    hash = ((hash<<5)-hash)+char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

/**
 * Extend Array to sort the numbers easily
 * @ref: https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly
 *
 * @param a
 * @param b
 * @returns {number}
 */
Array.prototype.sortNum = function() {
  this.sort((a, b)=>(a - b));
  return this;
}
