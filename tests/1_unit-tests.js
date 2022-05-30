const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

const translator = new Translator();
const tagRegex = /[\S\s]*<span\nclass="highlight">[\S\s]*<\/span>[\S\s]*/;
const startTag = '<span class="highlight">';
const endTag = '</span>';

suite('Unit Tests', () => {
	suite('American to British translations', () => {
		test('Translate Mangoes are my favorite fruit. to British English', () => {
			const string = 'Mangoes are my favorite fruit.';
			const answer = `Mangoes are my ${startTag}favourite${endTag} fruit.`;
			const translated = translator.americanToBritish(string);
			assert.isString(translated, 'must return a string');
			assert.equal(translated, answer, `must match with the answer: ${answer}`);
		});

		test('Translate I ate yogurt for breakfast. to British English', () => {
			const string = 'I ate yogurt for breakfast.';
			const answer = `I ate ${startTag}yoghurt${endTag} for breakfast.`;
			const translated = translator.americanToBritish(string);
			assert.isString(translated, 'must return a string');
			assert.equal(translated, answer, `must match with the answer: ${answer}`);
		});

		test("Translate We had a party at my friend's condo. to British English", () => {
			const string = "We had a party at my friend's condo.";
			const answer = `We had a party at my friend's ${startTag}flat${endTag}.`;
			const translated = translator.americanToBritish(string);
			assert.isString(translated, 'must return a string');
			assert.equal(translated, answer, `must match with the answer: ${answer}`);
		});

		test('Translate Can you toss this in the trashcan for me? to British English', () => {
			const string = 'Can you toss this in the trashcan for me?';
			const answer = `Can you toss this in the ${startTag}bin${endTag} for me?`;
			const translated = translator.americanToBritish(string);
			assert.isString(translated, 'must return a string');
			assert.equal(translated, answer, `must match with the answer: ${answer}`);
		});

		test('Translate The parking lot was full. to British English', () => {
			const string = 'The parking lot was full.';
			const answer = `The ${startTag}car park${endTag} was full.`;
			const translated = translator.americanToBritish(string);
			assert.isString(translated, 'must return a string');
			assert.equal(translated, answer, `must match with the answer: ${answer}`);
		});

		test('Translate Like a high tech Rube Goldberg machine. to British English', () => {
			const string = 'Like a high tech Rube Goldberg machine.';
			const answer = `Like a high tech ${startTag}Heath Robinson device${endTag}.`;
			const translated = translator.americanToBritish(string);
			assert.isString(translated, 'must return a string');
			assert.equal(translated, answer, `must match with the answer: ${answer}`);
		});

		test('Translate To play hooky means to skip class or work. to British English', () => {
			const string = 'To play hooky means to skip class or work.';
			const answer = `To ${startTag}bunk off${endTag} means to skip class or work.`;
			const translated = translator.americanToBritish(string);
			assert.isString(translated, 'must return a string');
			assert.equal(translated, answer, `must match with the answer: ${answer}`);
		});

		test('Translate No Mr. Bond, I expect you to die. to British English', () => {
			const string = 'No Mr. Bond, I expect you to die.';
			const answer = `No ${startTag}Mr${endTag} Bond, I expect you to die.`;
			const translated = translator.americanToBritish(string);
			assert.isString(translated, 'must return a string');
			assert.equal(translated, answer, `must match with the answer: ${answer}`);
		});

		test('Translate Dr. Grosh will see you now. to British English', () => {
			const string = 'Dr. Grosh will see you now.';
			const answer = `${startTag}Dr${endTag} Grosh will see you now.`;
			const translated = translator.americanToBritish(string);
			assert.isString(translated, 'must return a string');
			assert.equal(translated, answer, `must match with the answer: ${answer}`);
		});

		test('Translate Lunch is at 12:15 today. to British English', () => {
			const string = 'Lunch is at 12:15 today.';
			const answer = `Lunch is at ${startTag}12.15${endTag} today.`;
			const translated = translator.americanToBritish(string);
			assert.isString(translated, 'must return a string');
			assert.equal(translated, answer, `must match with the answer: ${answer}`);
		});
	});

	suite('British to American translations', () => {
		test('Translate We watched the footie match for a while. to American English', () => {
			const string = 'We watched the footie match for a while.';
			const answer = `We watched the ${startTag}soccer${endTag} match for a while.`;
			const translated = translator.britishToAmerican(string);
			assert.isString(translated, 'must return a string');
			assert.equal(translated, answer, `must match with the answer: ${answer}`);
		});

		test('Translate Paracetamol takes up to an hour to work. to American English', () => {
			const string = 'Paracetamol takes up to an hour to work.';
			const answer = `${startTag}Tylenol${endTag} takes up to an hour to work.`;
			const translated = translator.britishToAmerican(string);
			assert.isString(translated, 'must return a string');
			assert.equal(translated, answer, `must match with the answer: ${answer}`);
		});

		test('Translate First, caramelise the onions. to American English', () => {
			const string = 'First, caramelise the onions.';
			const answer = `First, ${startTag}caramelize${endTag} the onions.`;
			const translated = translator.britishToAmerican(string);
			assert.isString(translated, 'must return a string');
			assert.equal(translated, answer, `must match with the answer: ${answer}`);
		});

		test('Translate I spent the bank holiday at the funfair. to American English', () => {
			const string = 'I spent the bank holiday at the funfair.';
			const answer = `I spent the ${startTag}public holiday${endTag} at the ${startTag}carnival${endTag}.`;
			const translated = translator.britishToAmerican(string);
			assert.isString(translated, 'must return a string');
			assert.equal(translated, answer, `must match with the answer: ${answer}`);
		});

		test('Translate I had a bicky then went to the chippy. to American English', () => {
			const string = 'I had a bicky then went to the chippy.';
			const answer = `I had a ${startTag}cookie${endTag} then went to the ${startTag}fish-and-chip shop${endTag}.`;
			const translated = translator.britishToAmerican(string);
			assert.isString(translated, 'must return a string');
			assert.equal(translated, answer, `must match with the answer: ${answer}`);
		});

		test("Translate I've just got bits and bobs in my bum bag. to American English", () => {
			const string = "I've just got bits and bobs in my bum bag.";
			const answer = `I've just got ${startTag}odds and ends${endTag} in my ${startTag}fanny pack${endTag}.`;
			const translated = translator.britishToAmerican(string);
			assert.isString(translated, 'must return a string');
			assert.equal(translated, answer, `must match with the answer: ${answer}`);
		});

		test('Translate The car boot sale at Boxted Airfield was called off. to American English', () => {
			const string = 'The car boot sale at Boxted Airfield was called off.';
			const answer = `The ${startTag}swap meet${endTag} at Boxted Airfield was called off.`;
			const translated = translator.britishToAmerican(string);
			assert.isString(translated, 'must return a string');
			assert.equal(translated, answer, `must match with the answer: ${answer}`);
		});

		test('Translate Have you met Mrs Kalyani? to American English', () => {
			const string = 'Have you met Mrs Kalyani?';
			const answer = `Have you met ${startTag}Mrs.${endTag} Kalyani?`;
			const translated = translator.britishToAmerican(string);
			assert.isString(translated, 'must return a string');
			assert.equal(translated, answer, `must match with the answer: ${answer}`);
		});

		test("Translate Prof Joyner of King's College, London. to American English", () => {
			const string = "Prof Joyner of King's College, London.";
			const answer = `${startTag}Prof.${endTag} Joyner of King's College, London.`;
			const translated = translator.britishToAmerican(string);
			assert.isString(translated, 'must return a string');
			assert.equal(translated, answer, `must match with the answer: ${answer}`);
		});

		test('Translate Tea time is usually around 4 or 4.30. to American English', () => {
			const string = 'Tea time is usually around 4 or 4.30.';
			const answer = `Tea time is usually around 4 or ${startTag}4:30${endTag}.`;
			const translated = translator.britishToAmerican(string);
			assert.isString(translated, 'must return a string');
			assert.equal(translated, answer, `must match with the answer: ${answer}`);
		});
	});

	suite('Translations Highlighter', () => {
		test('Highlight translation in Mangoes are my favorite fruit.', () => {
			const string = 'Mangoes are my favorite fruit.';
			const answer = `Mangoes are my ${startTag}favourite${endTag} fruit.`;
			const translated = translator.americanToBritish(string);
			assert.isString(translated, 'must return a string');
			assert.equal(translated, answer, `must match with the answer: ${answer}`);
		});

		test('Highlight translation in I ate yogurt for breakfast.', () => {
			const string = 'I ate yogurt for breakfast.';
			const answer = `I ate ${startTag}yoghurt${endTag} for breakfast.`;
			const translated = translator.americanToBritish(string);
			assert.isString(translated, 'must return a string');
			assert.equal(translated, answer, `must match with the answer: ${answer}`);
		});

		test('Highlight translation in We watched the footie match for a while.', () => {
			const string = 'We watched the footie match for a while.';
			const answer = `We watched the ${startTag}soccer${endTag} match for a while.`;
			const translated = translator.britishToAmerican(string);
			assert.isString(translated, 'must return a string');
			assert.equal(translated, answer, `must match with the answer: ${answer}`);
		});

		test('Highlight translation in Paracetamol takes up to an hour to work.', () => {
			const string = 'Paracetamol takes up to an hour to work.';
			const answer = `${startTag}Tylenol${endTag} takes up to an hour to work.`;
			const translated = translator.britishToAmerican(string);
			assert.isString(translated, 'must return a string');
			assert.equal(translated, answer, `must match with the answer: ${answer}`);
		});
	});
});
