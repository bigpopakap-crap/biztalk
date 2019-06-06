import {
  Verb,
  Adjective,
  Adverb,
  Noun
} from '../types/words';
import { Template } from '../types/templates';

export interface Vocabulary {
  templates: Array<Template>,
  verbs: Array<Verb>,
  adjectives: Array<Adjective>,
  adverbs: Array<Adverb>,
  nouns: Array<Noun>,
}