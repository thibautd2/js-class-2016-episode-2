import 'bootstrap';
import 'bootstrap/css/bootstrap.css!'

import _ from 'lodash';
import $ from 'jquery';

import * as LexicalAnalyser from '../../../common/lexical-analyzer';
import { create as createLogger } from '../../../common/logger';


const logger = createLogger('EXO6');
logger.log('I’m up !');


let debounceUpdate = _.debounce(updateResults, 500);

window.onChange = function () {
  debounceUpdate();
};

let textareaElement;
function updateResults() {
  textareaElement = textareaElement || $('#inputText');

  let text = textareaElement.val();
  logger.log('updating results for : "' + text + '"');

  let index = LexicalAnalyser.index(text);

  let sortableResults = _.toPairs(index).map(([ token, occurrenceCount ]) => ({ token, occurrenceCount }));

  const sortedResults = sortableResults.sort((val1, val2) => (val1.occurrenceCount < val2.occurrenceCount));

  let elements = sortedResults.map(entry => `<tr><td>${entry.token}</td><td>${entry.occurrenceCount}</td></tr>`);

  $('#results tbody').empty();
  $('#results tbody:last-child').append( elements );
}

updateResults(); // initial call


/** Hints

 Object.keys(index)  -> [ array of keys of an object ]

 <array>.sort((val1, val2) => comparison)

 */
