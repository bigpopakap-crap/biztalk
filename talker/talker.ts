import {
  Word,
  WordClass,
} from '../types/words';
import {
  Template,
  Placeholder,
  WordId,
  isPlaceholder,
} from '../types/templates';
import { Vocabulary } from '../types/vocabulary';
import { pickRandom } from '../utils/arrays';
import talk from './talk';

type WordMap = Map<WordId, Word<WordClass>>;

export default class Talker {
  vocab: Vocabulary;

  constructor(vocab: Vocabulary) {
    this.vocab = vocab;
  }

  public talk(): string {
    // Pick a random template
    const template = pickRandom(this.vocab.templates);
    return talk(template, this.pickRandomWord.bind(this));
  }

  // TODO use <T extends WordClass> so that it's type-enforced that we get back a word of the same class
  private pickRandomWord(wordClass: WordClass) : Word<WordClass> {
    switch (wordClass) {
        case WordClass.noun:
          return pickRandom(this.vocab.nouns);
        case WordClass.verb:
          return pickRandom(this.vocab.verbs);
        case WordClass.adjective:
          return pickRandom(this.vocab.adjectives);
        case WordClass.adverb:
          return pickRandom(this.vocab.adverbs);
        default:
          throw new Error(`Unexpected wordClass=${wordClass}`);
    }
  }
}