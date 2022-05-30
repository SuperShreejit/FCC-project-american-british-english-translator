'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body
      try {
        if(text === '') throw new Error(ERROR.NO_TEXT) 
        if(!text || !locale) throw new Error(ERROR.MISSING_FIELDS)
        if(!isValidLocale(locale)) throw new Error(ERROR.INVALID_LOCALE)

        let translation = ''
        switch (locale) {
          case LOCALE.TO_AMERICAN:
            translation = translator.britishToAmerican(text)
            break
          case LOCALE.TO_BRITISH:
            translation = translator.americanToBritish(text)
            break
          default:
            break
        }
        res.json({ text, translation })
        
      } catch(error) {
        res.json({ error: error.message })
      }
    });
};

const isValidLocale = (locale) => (locale === LOCALE.TO_BRITISH || locale === LOCALE.TO_AMERICAN)

const ERROR = {
  MISSING_FIELDS:'Required field(s) missing',
  NO_TEXT: 'No text to translate',
  INVALID_LOCALE: 'Invalid value for locale field',
}
const LOCALE = {
  TO_BRITISH: 'american-to-british',
  TO_AMERICAN: 'british-to-american'
}