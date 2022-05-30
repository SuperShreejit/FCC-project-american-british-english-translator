const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const assert = chai.assert;
chai.use(chaiHttp);
const Translator = require('../components/translator.js');

const route = '/api/translate';
const startTag = '<span class="highlight">';
const endTag = '</span>';
const ERROR = {
	MISSING_FIELDS: 'Required field(s) missing',
	NO_TEXT: 'No text to translate',
	INVALID_LOCALE: 'Invalid value for locale field'
};
const LOCALE = {
	TO_BRITISH: 'american-to-british',
	TO_AMERICAN: 'british-to-american'
};

suite('Functional Tests', () => {
	test('Translation with text and locale fields: POST request to /api/translate', done => {
		const request = {
			text: 'Mangoes are my favorite fruit.',
			locale: LOCALE.TO_BRITISH
		};
		const answer = `Mangoes are my ${startTag}favourite${endTag} fruit.`;

		chai
			.request(server)
			.post(route)
			.send(request)
			.end((err, res) => {
				assert.isNull(err);
				assert.equal(res.status, 200, 'must be a successful request');
				assert.equal(res.type, 'application/json', 'response must be json');
				assert.isObject(res.body, 'body must be an object');
				assert.property(
					res.body,
					'text',
					'response must contain text property'
				);
				assert.property(
					res.body,
					'translation',
					'response must contain translation'
				);
				assert.isString(res.body.text, 'text must be a string');
				assert.isString(res.body.translation, 'translation must be a string');
				assert.equal(
					res.body.text,
					request.text,
					'response text must be equal to request text'
				);
				assert.equal(
					res.body.translation,
					answer,
					`translation must be equal to ${answer}`
				);
				done();
			});
	});

	test('Translation with text and invalid locale field: POST request to /api/translate', done => {
		const request = {
			text: 'Mangoes are my favorite fruit.',
			locale: 'invalid'
		};

		chai
			.request(server)
			.post(route)
			.send(request)
			.end((err, res) => {
				assert.isNull(err);
				assert.equal(res.status, 200, 'must be a successful request');
				assert.equal(res.type, 'application/json', 'response must be json');
				assert.isObject(res.body, 'body must be an object');
				assert.property(res.body, 'error', 'must respond with an error');
				assert.isString(res.body.error, 'error must be a string');
				assert.equal(
					res.body.error,
					ERROR.INVALID_LOCALE,
					`error must be ${ERROR.INVALID_LOCALE}`
				);
				done();
			});
	});

	test('Translation with missing text field: POST request to /api/translate', done => {
		const requests = [
			{
				locale: LOCALE.TO_AMERICAN
			}
		];

		requests.forEach(request => {
			chai
				.request(server)
				.post(route)
				.send(request)
				.end((err, res) => {
					assert.isNull(err);
					assert.equal(res.status, 200, 'must be a successful request');
					assert.equal(res.type, 'application/json', 'response must be json');
					assert.isObject(res.body, 'body must be an object');
					assert.property(res.body, 'error', 'must respond with an error');
					assert.isString(res.body.error, 'error must be a string');
					assert.equal(
						res.body.error,
						ERROR.MISSING_FIELDS,
						`error must be ${ERROR.MISSING_FIELDS}`
					);
				});
		});
		done();
	});

	test('Translation with missing locale field: POST request to /api/translate', done => {
		const requests = [
			{
				text: 'Mangoes are my favorite fruit.'
			},
			{
				text: 'Mangoes are my favorite fruit.',
				locale: ''
			}
		];

		requests.forEach(request => {
			chai
				.request(server)
				.post(route)
				.send(request)
				.end((err, res) => {
					assert.isNull(err);
					assert.equal(res.status, 200, 'must be a successful request');
					assert.equal(res.type, 'application/json', 'response must be json');
					assert.isObject(res.body, 'body must be an object');
					assert.property(res.body, 'error', 'must respond with an error');
					assert.isString(res.body.error, 'error must be a string');
					assert.equal(
						res.body.error,
						ERROR.MISSING_FIELDS,
						`error must be ${ERROR.MISSING_FIELDS}`
					);
				});
		});
		done();
	});

	test('Translation with empty text: POST request to /api/translate', done => {
		const request = {
			text: '',
			locale: LOCALE.TO_AMERICAN
		};
		chai
			.request(server)
			.post(route)
			.send(request)
			.end((err, res) => {
				assert.isNull(err);
				assert.equal(res.status, 200, 'must be a successful request');
				assert.equal(res.type, 'application/json', 'response must be json');
				assert.isObject(res.body, 'body must be an object');
				assert.property(res.body, 'error', 'must respond with an error');
				assert.isString(res.body.error, 'error must be a string');
				assert.equal(
					res.body.error,
					ERROR.NO_TEXT,
					`error must be ${ERROR.MISSING_FIELDS}`
				);
				done();
			});
	});

	test('Translation with text that needs no translation: POST request to /api/translate', done => {
		const request = {
			text: 'I like you.',
			locale: LOCALE.TO_AMERICAN
		};
		const answer = 'Everything looks good to me!';
		chai
			.request(server)
			.post(route)
			.send(request)
			.end((err, res) => {
				assert.isNull(err);
				assert.equal(res.status, 200, 'must be a successful request');
				assert.equal(res.type, 'application/json', 'response must be json');
				assert.isObject(res.body, 'body must be an object');
				assert.property(
					res.body,
					'text',
					'response must contain text property'
				);
				assert.property(
					res.body,
					'translation',
					'response must contain translation'
				);
				assert.isString(res.body.text, 'text must be a string');
				assert.isString(res.body.translation, 'translation must be a string');
				assert.equal(
					res.body.text,
					request.text,
					'response text must be equal to request text'
				);
				assert.equal(
					res.body.translation,
					answer,
					`translation must be equal to ${answer}`
				);
				done();
			});
	});
});
