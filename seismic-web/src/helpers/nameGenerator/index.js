import _random from 'lodash/random';
import { adjectives } from './adjectives';
import { nouns } from './nouns';

const adjs = adjectives.terms;
const pronouns = nouns.terms;

export const nameGenerator = () =>
  `${adjs[Math.floor(Math.random() * adjs.length)]} ${
    pronouns[Math.floor(Math.random() * pronouns.length)]
  } ${_random(1, 25)}`;
