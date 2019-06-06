import {
  WordClass,
  Word,
  Verb,
  VerbTense,
  isTensePersonIndependent,
  VerbPerson,
  Adjective,
  Adverb,
  Noun,
  isVerb,
  isAdjective,
  isAdverb,
  isNoun,
} from '../types/words';
import {
  Placeholder,
  VerbPlaceholder,
  AdjectivePlaceholder,
  AdverbPlaceholder,
  NounPlaceholder,
  isVerbPlaceholder,
  isAdjectivePlaceholder,
  isAdverbPlaceholder,
  isNounPlaceholder,
} from '../types/templates';

export function formatWord<T extends WordClass>(placeholder: Placeholder<T>, word: Word<T>) : string {
    if (isVerbPlaceholder(placeholder) && isVerb(word)) {
      return formatVerb(placeholder, word);
    } else if (isAdjectivePlaceholder(placeholder) && isAdjective(word)) {
      return formatAdjective(placeholder, word);
    } else if (isAdverbPlaceholder(placeholder) && isAdverb(word)) {
      return formatAdverb(placeholder, word);
    } else if (isNounPlaceholder(placeholder) && isNoun(word)) {
      return formatNoun(placeholder, word);
    } else {
      throw new Error(
        `Unexpected placeholder=${JSON.stringify(placeholder)} and word=${JSON.stringify(word)}.
        This is either a new class of word, or the classes do not agree`
      );
    }
  }

function formatVerb(placeholder: VerbPlaceholder, word: Verb) : string {
  if (isTensePersonIndependent(placeholder.tense)) {
    return <string> word[placeholder.tense];
  } else {
    if (!placeholder.person) {
      throw new Error(`Verb placeholder must define a person for tense=${placeholder.tense}`);
    }
    return word[placeholder.tense][placeholder.person];
  }
}

function formatAdjective(placeholder: AdjectivePlaceholder, word: Adjective) : string {
  return word.base;
}

function formatAdverb(placeholder: AdverbPlaceholder, word: Adverb) : string {
  return word.base;
}

function formatNoun(placeholder: NounPlaceholder, word: Noun) : string {
  return word[placeholder.plurality];
}
