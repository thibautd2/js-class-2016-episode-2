'use strict';

var _lexicalAnalyzer = require('./lexical-analyzer');

var LexicalAnalyser = _interopRequireWildcard(_lexicalAnalyzer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// inspiration : https://www.new-bamboo.co.uk/blog/2013/02/26/full-text-search-in-your-browser/

describe('lexical analyser', function () {

  describe('tokenize(...)', function () {

    it('should tokenize properly a trivial string', function () {
      expect(LexicalAnalyser.tokenize('Qui me parle ?')).to.deep.equal(['Qui', 'me', 'parle', '?']);
    });

    it('should tokenize properly a trivial string with extra spaces', function () {
      expect(LexicalAnalyser.tokenize(' Qui me  parle ? ')).to.deep.equal(['Qui', 'me', 'parle', '?']);
    });
  });

  describe('stem(...)', function () {

    it('should stem by harmonizing case', function () {
      expect(LexicalAnalyser.stem('Qui')).to.equal('qui');
    });

    it('should stem by removing trailing s', function () {
      expect(LexicalAnalyser.stem('arbres')).to.equal('arbre');
    });
  });

  describe('parse(...)', function () {

    it('should combine the tokenizer and stemmer', function () {
      expect(LexicalAnalyser.parse(' Un élève   parmi les élèVes  ')).to.deep.equal(['un', 'élève', 'parmi', 'le', 'élève']);
    });
  });

  describe('index(...)', function () {

    it('should parse then compute term frequency', function () {
      expect(LexicalAnalyser.index(' Un élève   parmi les élèVes parmi les humains ')).to.deep.equal({
        humain: 1,
        le: 2,
        parmi: 2,
        un: 1,
        élève: 2
      });
    });
  });
});