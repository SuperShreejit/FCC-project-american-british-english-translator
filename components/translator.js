'use Strict'
const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

const amerToBritSpellValues = Object.values(americanToBritishSpelling)
const amerToBritSpellKeys = Object.keys(americanToBritishSpelling)
const amerToBritTitleValues = Object.values(americanToBritishTitles)
const amerToBritTitleKeys = Object.keys(americanToBritishTitles)

const britishTimeRegex = /[0-9]+\.[0-9]+/
const americanTimeRegex = /\d{2}[:]\d{2}/
const punctuationRegex = /\.|\?/
const titleRegex = /mr|mrs|ms|mx|dr|prof/i
const startTag = '<span class="highlight">'
const endTag = '</span>'
const NEUTRAL = "Everything looks good to me!"

class Translator {
  americanToBritish(string) {
    const originalWords = string.split(' ')
    Object.freeze(originalWords)
    const translatedWords = originalWords.map(word => word.toLowerCase())
    removeLastPunctuation(translatedWords)
    
    translatedWords.forEach((word, i) => {
      if(americanOnly.hasOwnProperty(`${word} ${translatedWords[i+1]} ${translatedWords[i+2]}`))
        translateTriple(originalWords, translatedWords, i, americanOnly[`${word} ${translatedWords[i+1]} ${translatedWords[i+2]}`])
      
      if(americanOnly.hasOwnProperty(`${word} ${translatedWords[i+1]}`))
        translateDouble(originalWords, translatedWords, i, americanOnly[`${word} ${translatedWords[i+1]}`])
      
      if(americanOnly.hasOwnProperty(word))
        translate(originalWords, translatedWords, i,  americanOnly[word])
                  
      if(americanToBritishSpelling.hasOwnProperty(word))
        translate(originalWords, translatedWords, i, americanToBritishSpelling[word])
      
      if(americanToBritishTitles.hasOwnProperty(word))
        translateTitle(translatedWords, i, americanToBritishTitles[word])
      
      if(americanTimeRegex.test(word))
        translateTime(translatedWords, word, i, "british")
      
      if(originalWords[i][0] !== originalWords[i][0].toLowerCase()) 
        preserveCase(translatedWords, i, word, originalWords)
    })
    firstWordPreserveCase(translatedWords, translatedWords[0])

    const translatedString = getTranslatedString(translatedWords, originalWords)
    if(string.toLowerCase() === translatedString.toLowerCase()) return NEUTRAL
    
    return translatedString
  }

  britishToAmerican(string) {
    const originalWords = string.split(' ')
    Object.freeze(originalWords)
    const translatedWords = originalWords.map(word => word.toLowerCase())
    removeLastPunctuation(translatedWords)

    translatedWords.forEach((word, i) => {
      if(britishOnly.hasOwnProperty(`${word} ${translatedWords[i+1]} ${translatedWords[i+2]}`))
        translateTriple(originalWords, translatedWords, i, britishOnly[`${word} ${translatedWords[i+1]} ${translatedWords[i+2]}`])
      
      if(britishOnly.hasOwnProperty(`${word} ${translatedWords[i+1]}`))
        translateDouble(originalWords, translatedWords, i, britishOnly[`${word} ${translatedWords[i+1]}`])
      
      if(britishOnly.hasOwnProperty(word))
        translate(originalWords, translatedWords, i,  britishOnly[word])
      
      if(amerToBritSpellValues.includes(word)){
        const index = amerToBritSpellValues.indexOf(word)
        translate(originalWords, translatedWords, i, amerToBritSpellKeys[index])
      }
      
      if(amerToBritTitleValues.includes(word)){
        const index = amerToBritTitleValues.indexOf(word)
        translateTitle(translatedWords, i, amerToBritTitleKeys[index])
      }
      
      if(britishTimeRegex.test(word))
        translateTime(translatedWords, word, i, "american") 
      
      if(originalWords[i][0] !== originalWords[i][0].toLowerCase()) 
        preserveCase(translatedWords, i, word, originalWords)
       
    })
    firstWordPreserveCase(translatedWords, translatedWords[0])
    const translatedString = getTranslatedString(translatedWords, originalWords)
    if(string.toLowerCase() === translatedString.toLowerCase()) return NEUTRAL
    
    return translatedString
  }
  
}

const translate = (original, translated, index, translation) => {
  const firstLetterOriginal = original[index][0]
  const firstLetterTranslated = translated[index][0]
  
  if(firstLetterOriginal !== firstLetterTranslated) {
    const newTranslation = translation[0].toUpperCase() + translation.slice(1, translation.length)    
    translated[index] = `${startTag}${newTranslation}${endTag}`
  } else {
    translated[index] = `${startTag}${translation}${endTag}`    
  }  
}

const translateDouble = (original, translated, index, translation) => {
  const translationValues = translation.split(' ')
  if(translationValues.length < 2) return translateDoubleToSingle(original, translated, index, translation)
  
  const firstLetterOriginal = original[index][0]
  const firstLetterOriginal2 = original[index+1][0]
  const firstLetterTranslated = translated[index][0]
  const firstLetterTranslated2 = translated[index+1][0]
  
  const firstLetterTrans1 = translationValues[0][0]
  const firstLetterTrans2 = translationValues[1][0]
  
  if(firstLetterOriginal !== firstLetterTranslated && firstLetterOriginal2 !== firstLetterTranslated2) {
    const newTranslation1 = firstLetterTrans1.toUpperCase() + translationValues[0].slice(1, translationValues[0].length)    
    const newTranslation2 = firstLetterTrans2.toUpperCase() + translationValues[1].slice(1, translationValues[1].length)    
    
    translated[index] = `${startTag}${newTranslation1}`
    translated[index+1] = `${newTranslation2}${endTag}`    
  }
  else if(firstLetterOriginal !== firstLetterTranslated && firstLetterOriginal2 === firstLetterTranslated2) {
    const newTranslation1 = firstLetterTrans1.toUpperCase() + translationValues[0].slice(1, translationValues[0].length) 
    
    translated[index] = `${startTag}${newTranslation1}`
    translated[index+1] = `${translationValues[1]}${endTag}`   
  }
  else if(firstLetterOriginal === firstLetterTranslated && firstLetterOriginal2 !== firstLetterTranslated2) {   
    const newTranslation2 = firstLetterTrans2.toUpperCase() + translationValues[1].slice(1, translationValues[1].length)  
    
    translated[index] = `${startTag}${translationValues[0]}` 
    translated[index+1] = `${newTranslation2}${endTag}`    
  }
  else {
    translated[index] = `${startTag}${translationValues[0]}`  
    translated[index+1] = `${translationValues[1]}${endTag}`
  }  
}

const translateDoubleToSingle = (original, translated, index, translation) => {
  const firstLetterOriginal = original[index][0]
  const firstLetterTranslation = translation[0]
  const translationEnd = translation.slice(1, translation.length)
  
  if(firstLetterOriginal !== firstLetterOriginal.toLowerCase()) {
    const newTranslation = firstLetterTranslation.toUpperCase() + translationEnd
    translated[index] = `${startTag}${newTranslation}${endTag}`
    delete translated[index+1]
  } else {
    translated[index] = `${startTag}${translation}${endTag}`
    delete translated[index+1]
  }
}

const translateTriple = (original, translated, index, translation) => {
  const transVals = translation.split(' ')
  if(transVals.length < 3) return translateTripleToLess(original, translated, index, translation)
  
  const firstCharOrg1 = original[index][0]
  const firstCharOrg2 = original[index+1][0]
  const firstCharOrg3 = original[index+2][0]

  const firstCharTrans1 = transVals[0][0]
  const endTrans1 = transVals[0].slice(1, transVals[0].length)
  const firstCharTrans2 = transVals[1][0]
  const endTrans2 = transVals[1].slice(1, transVals[1].length)
  const firstCharTrans3 = transVals[2][0]
  const endTrans3 = transVals[2].slice(1, transVals[2].length)
  
  let newTrans1 = '', newTrans2 = '', newTrans3 = ''
  if(firstCharOrg1 !== firstCharOrg1.toLowerCase())
    newTrans1 = firstCharTrans1.toUpperCase() + endTrans1
  if(firstCharOrg2 !== firstCharOrg2.toLowerCase())
    newTrans2 = firstCharTrans2.toUpperCase() + endTrans2
  if(firstCharOrg3 !== firstCharOrg3.toLowerCase())
    newTrans3 = firstCharTrans3.toUpperCase() + endTrans3
  if(firstCharOrg1 === firstCharOrg1.toLowerCase())
    newTrans1 = transVals[0]
  if(firstCharOrg2 === firstCharOrg2.toLowerCase())
    newTrans2 = transVals[1]
  if(firstCharOrg3 === firstCharOrg3.toLowerCase())
    newTrans3 = transVals[2]
  
  translated[index] = `${startTag}${newTrans1}`
  translated[index+1] = newTrans2
  translated[index+2] = `${newTrans3}${endTag}`  
}

const translateTripleToLess = (original, translated, index, translation) => {
  const transVals = translation.split(' ')
  const firstCharOrg1 = original[index][0]
  const firstCharOrg2 = original[index+1][0]
  const firstCharOrg3 = original[index+2][0]
  
  if(transVals.length === 2) {
    const firstCharTrans1 = transVals[0][0]
    const endTrans1 = transVals[0].slice(1, transVals[0].length)
    const firstCharTrans2 = transVals[1][0]
    const endTrans2 = transVals[1].slice(1, transVals[1].length)

    let newTrans1 = '', newTrans2 = ''
    if(firstCharOrg1 !== firstCharOrg1.toLowerCase())
      newTrans1 = firstCharTrans1.toUpperCase() + endTrans1
    if(firstCharOrg2 !== firstCharOrg2.toLowerCase())
      newTrans2 = firstCharTrans2.toUpperCase() + endTrans2
    if(firstCharOrg1 === firstCharOrg1.toLowerCase())
      newTrans1 = transVals[0]
    if(firstCharOrg2 === firstCharOrg2.toLowerCase())
      newTrans2 = transVals[1]

    translated[index] = `${startTag}${newTrans1}`
    translated[index+1] = `${newTrans2}${endTag}`
    delete translated[index+2]
  }
  else if (transVal.length === 1) {
    const firstCharTrans = transVals[0][0]
    const endTrans = transVals[0].slice(1, transVals[0].length)

    let newTrans = ''
    if(firstCharOrg1 !== firstCharOrg1.toLowerCase())
      newTrans = firstCharTrans.toUpperCase() + endTrans
    if(firstCharOrg1 === firstCharOrg1.toLowerCase())
      newTrans = transVals[0]

    translated[index] = `${startTag}${newTrans}${endTag}`
    delete translated[index+1]
    delete translated[index+2]
  }
}

const translateTitle = (words, index, translation) => {
  const firstLetterHonorific = translation[0].toUpperCase()
  const HonorificEnd = translation.slice(1, translation.length)
  const newHonorific = firstLetterHonorific+HonorificEnd
  words[index] = `${startTag}${newHonorific}${endTag}`
  const name = words[index+1]
  const firstLetterName = name[0].toUpperCase()
  const NameEnd = name.slice(1, name.length)
  const newName = firstLetterName+NameEnd
  words[index+1] = newName
} 

const translateTime = (words, time, index, toType) => {
  if(time.length === 4) {
    const start = time.slice(0,1)
    const end = time.slice(2,4)
    return convertTime(words, index, start, end, toType)
  }
  const start = time.slice(0,2)
  const end = time.slice(3,5)
  return convertTime(words, index, start, end, toType)
}

const convertTime = (words, index, start, end, toType) => {
  if(toType === 'british') 
    words[index] = `${startTag}${start}.${end}${endTag}`
  else if (toType === 'american') 
    words[index] = `${startTag}${start}:${end}${endTag}`
}

const preserveCase = (words, index, word, original) => {
  if (word.match(titleRegex)) return

  if(isLastWord(words, index)) {
    const originalWordsCopy = [...original]
    removeLastPunctuation(originalWordsCopy)
    if(originalWordsCopy[index].toLowerCase() !== words[index].toLowerCase()) return

    changeCase(words, word, index)
  } else {
    if(original[index].toLowerCase() !== words[index].toLowerCase()) return

    changeCase(words, word, index)       
  }
}

const isLastWord = (words, index) => ((words.length-1) === index)

const changeCase = (words, word, index) => {
  const firstLetter = word[0].toUpperCase()
  const wordEnd = word.slice(1, word.length)
  words[index] =  firstLetter+wordEnd 
}

const firstWordPreserveCase = (words, word) => {
  if(word.length === 1) return words[0] = word.toUpperCase()
  
  const firstLetter = word[0].toUpperCase()
  const wordEnd = word.slice(1,word.length)
  words[0] = firstLetter+wordEnd
}

const getTranslatedString = (translated, original) => {
  translated = translated.filter(String) // filter out any non-strings
  const lastWordOriginal = original[original.length-1]
  const lastLetterlastWordOriginal = lastWordOriginal[lastWordOriginal.length-1]
  if(!punctuationRegex.test(lastLetterlastWordOriginal)) return translated.join(' ')
  
  const lastWordTranslated = translated[translated.length-1]
  translated[translated.length-1] = lastWordTranslated+lastLetterlastWordOriginal 
  return translated.join(' ')
}

const removeLastPunctuation = (words) => {
  const lastWord = words[words.length-1]
  const lastLetterLastWord = lastWord[lastWord.length-1]
  if(punctuationRegex.test(lastLetterLastWord)) {
    const onlyLastWord = lastWord.slice(0, lastWord.length-1)
    words[words.length-1] = onlyLastWord
  }
}

module.exports = Translator;