/**
 * A string representing a single word or word-phrase.
 */
type RawWord = string;

/* **************************************************************
                               GENERIC WORD
 ************************************************************** */

export enum WordClass {
  verb = 'verb',
  adjective = 'adjective',
  adverb = 'adverb',
  noun = 'noun',
}

export interface Word<T extends WordClass> {
  class: T,
}

/* **************************************************************
                               VERBS
 ************************************************************** */

export enum VerbTense {
  base = 'base',
  progressive = 'progressive',
  present = 'present',
  past = 'past',
}

export function isTensePersonIndependent(tense: VerbTense) : boolean {
  return tense === VerbTense.base || tense === VerbTense.progressive;
}

export enum VerbPerson {
  first = 'first',
  second = 'second',
  third = 'third',
  participle = 'participle',
}

interface VerbPersons {
  [VerbPerson.first]: RawWord,
  [VerbPerson.second]: RawWord,
  [VerbPerson.third]: RawWord,
  [VerbPerson.participle]: RawWord,
}

export interface Verb extends Word<WordClass.verb> {
  [VerbTense.base]: RawWord,
  [VerbTense.progressive]: RawWord,
  [VerbTense.present]: VerbPersons,
  [VerbTense.past]: VerbPersons,
}

export function isVerb(word : Word<WordClass>) : word is Verb {
  return word.class === WordClass.verb;
}

/* **************************************************************
                          ADJECTIVES/ADVERBS
 ************************************************************** */

export interface Adjective extends Word<WordClass.adjective> {
  base: RawWord,
}

export function isAdjective(word : Word<WordClass>) : word is Adjective {
  return word.class === WordClass.adjective;
}

export interface Adverb extends Word<WordClass.adverb> {
  base: RawWord,
}

export function isAdverb(word : Word<WordClass>) : word is Adverb {
  return word.class === WordClass.adverb;
}

/* **************************************************************
                               NOUNS
 ************************************************************** */

export enum NounPlurality {
  singular = 'singular',
  plural = 'plural',
}

export interface Noun extends Word<WordClass.noun> {
  [NounPlurality.singular]: RawWord,
  [NounPlurality.plural]: RawWord,
}

export function isNoun(word : Word<WordClass>) : word is Noun {
  return word.class === WordClass.noun;
}
