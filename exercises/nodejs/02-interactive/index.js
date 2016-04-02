#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node --harmony_modules --harmony_regexps --harmony_proxies --harmony_sloppy_function --harmony_sloppy_let --harmony_unicode_regexps --harmony_reflect --harmony_destructuring --harmony_default_parameters --harmony_sharedarraybuffer --harmony_atomics --harmony_simd "$0" "$@"
'use strict';


/*****
 * THE NUMBER GAME
 *
 * The player must find a number between 1 and 100.
 * After each try, we tell him if too small, too big or victory !
 *
 */

const _ = require('lodash');
const chalk = require('chalk');
const prompt = require('prompt'); // https://www.npmjs.com/package/prompt

const valueToGuess = _.random(1, 100);

prompt.start();

prompt.get([{
  name: 'name',
  description: chalk.blue.bold('What is your name ?'),   // Prompt displayed to the user
  type: 'string',                       // Specify the type of input to expect.
  default: 'Sam'                        // Default value to use if no value is entered.
}], (err, result) => {
  if (err) return console.error(err);

  console.log(`Welcome, ${result.name} !`);

   tryAgain(function callback (err, succed) {
  if (succded == false)
     tryAgain(callback);
   });
  });
});
tryAgain(function callback (err, won) {
      if (err)
        return console.log(err);
       else
       {
         if (won == false)

           tryAgain(callback);
       }
  });
  });
  function tryAgain(callback) {
    prompt.get( [{
      name: 'value',



