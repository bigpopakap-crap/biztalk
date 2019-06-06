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
import { formatWord } from './formatter';

type WordMap = Map<WordId, Word<WordClass>>;

export default class Talker {
  vocab: Vocabulary;

  constructor(vocab: Vocabulary) {
    this.vocab = vocab;
  }

  public talk(): string {
    // Pick a random template
    const template = pickRandom(this.vocab.templates);

    // Keep track of the the final map of words to use
    const wordMap : WordMap = new Map();
    template.forEach(fragment => {
      if (isPlaceholder(fragment)) {
        // First instance of a wordId gets to define the word we use
        if (!wordMap.has(fragment.id)) {
          wordMap.set(fragment.id, this.pickRandomWord(fragment.class));
        }
      }
    });

    // Join all the fragments together and fill in the words
    return template.map(fragment => {
      if (isPlaceholder(fragment)) {
        return formatWord(fragment, wordMap.get(fragment.id));
      } else {
        return fragment;
      }
    }).join('');
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