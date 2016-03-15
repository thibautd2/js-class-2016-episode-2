'use strict';

/** Bootstrap mocha/chai unit tests for SERVER
 */
//import util from 'util';

//import mocha from 'mocha';
//console.log('mocha', util.inspect(mocha, {colors: true}));

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiDatetime from 'chai-datetime';
import chaiThings from 'chai-things';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

//global.mocha.setup('bdd');

chai.use(chaiAsPromised);
chai.use(chaiDatetime);
chai.use(chaiThings);
chai.use(sinonChai);

// expose for convenience
global.sinon = sinon;
global.expect = chai.expect;
