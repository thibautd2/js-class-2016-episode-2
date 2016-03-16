#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../../node_modules/.bin/babel-node "$0" "$@"
'use strict';

const fs = require('fs');

console.log(`------- code outside of the loop -------`);

// to work, the following code MUST be called before anything else
let eventLoopCount = 0;
function eventLoopDetector() {
  if (eventLoopCount === 0) {
    // we are not yet in the loop
  }
  else {
    // we are in the loop
    if (eventLoopCount === 1)
      console.log(`
------- the event loop starts ! -------`);
    else
      console.log(`
------- event loop #${eventLoopCount} -------`);
    console.log('--- 1) timeouts / intervals :');
  }

  if (eventLoopCount !== 1) {
    fs.stat('foo', () => console.log('--- 2) I/O callbacks :'));
    setImmediate(() => console.log('--- 3) immediates :'));
  }

  eventLoopCount++;
  if (eventLoopCount < 12)
    setTimeout(eventLoopDetector);
}
eventLoopDetector();

setUpDelayed('->'); // direct



let setImmediateCount = 0;
function setImmediateDetector() {
  if (setImmediateCount > 0) {
    console.log(`- setImmediate #${setImmediateCount}`);
  }
  setImmediateCount++;
  if (setImmediateCount < 10) {
    setImmediate(setImmediateDetector);
    //process.nextTick(() => setImmediate(() => console.log('nextTicked setImmediate')));
  }
}
setImmediate(setImmediateDetector);

let setTimeoutCount = 0;
function setTimeoutDetector() {
  if (setTimeoutCount > 0) {
    console.log(`- setTimeout #${setTimeoutCount}`);
    //setUpDelayed(`setTimeout #${setTimeoutCount}`);
  }
  setTimeoutCount++;
  if (setTimeoutCount < 10)
    setTimeout(setTimeoutDetector);
}
setTimeout(setTimeoutDetector);

let setNextTickCount = 0;
function setNextTickDetector() {
  if (setNextTickCount > 0) {
    console.log(`- setNextTick #${setNextTickCount}`);
  }
  setNextTickCount++;
  if (setNextTickCount < 10)
    process.nextTick(setNextTickDetector);
}
process.nextTick(setNextTickDetector);

let intervalObject;
let setIntervalCount = 0;
function setIntervalDetector() {
  setIntervalCount++;
  console.log(`- setInterval #${setIntervalCount}`);
  if (setIntervalCount >= 10)
    clearInterval(intervalObject);
}
intervalObject = setInterval(setIntervalDetector);


function setUpDelayed(id) {
  console.log(id, 'scheduling setImmediate...');
  setImmediate(() => console.log(id, 'setImmediate !'));

  console.log(id, 'scheduling setTimeout...');
  setTimeout(() => console.log(id, 'setTimeout !'));

  console.log(id, 'scheduling process.nextTick...');
  process.nextTick(() => console.log(id, 'process.nextTick !'));
}


/*
setImmediate(() => setUpDelayed('from setImmediate ->'));

setNextTick(() => setUpDelayed('from setNextTick ->'));

process.nextTick(() => setUpDelayed('from process.nextTick ->'));
*/
