'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenize = tokenize;
exports.stem = stem;
exports.parse = parse;
exports.index = index;
/** A simple lexical analyzer
 */

/** tokenize a string = split it into words
 *
 * Note : space separated only for now
 *
 * @argument {String}
 * @return {Array}
 */
function tokenize(str) {
  let tokens = [];
  str.split(' ').forEach(token => {
    if (token.length) tokens.push(token);
  });
  return tokens;
}

/** stem a string = turn several variants into the same
 *
 * Note : for now, uniformize to lowercase only
 * @argument {String}
 * @return {String}
 */
function stem(str) {
  str = str.toLowerCase();
  if (str.slice(-1) === 's') str = str.slice(0, str.length - 1);

  return str.toLowerCase();
}

/** parse a string into a list of stemmed token
 * i.e. combine the 2 functions above
 *
 * @argument {String}
 * @return {Array}
 */
function parse(str) {
  return tokenize(str).map(stem);
}

/** index a string into a hash {'token' : <frequency of appearance>}
 *
 * @argument {String}
 * @return {Object}
 */
function index(str) {
  return parse(str).reduce((acc, value) => {
    acc[value] = acc[value] || 0;
    acc[value]++;
    return acc;
  }, {});
}

/* Hints :
 *
 ******* Array *******

 Array.push(<new item>)

 array.forEach(value => {
   ...
 });

 Array.map(value => {
   return <newValue>;
 });

 Array.reduce((accumulator, value) => {
   accumulator += value;
   return accumulator;
 }, 0);

 ******* String *******

 String.split(<separator>) -> Array

 String.toLowerCase()

 *
 */