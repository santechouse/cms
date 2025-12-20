import * as migration_20251212_152209 from './20251212_152209';
import * as migration_20251212_152323 from './20251212_152323';
import * as migration_20251212_153626 from './20251212_153626';
import * as migration_20251213_134631 from './20251213_134631';
import * as migration_20251213_152311 from './20251213_152311';
import * as migration_20251215_163426 from './20251215_163426';
import * as migration_20251215_164853 from './20251215_164853';
import * as migration_20251220_210035 from './20251220_210035';
import * as migration_20251220_210259 from './20251220_210259';

export const migrations = [
  {
    up: migration_20251212_152209.up,
    down: migration_20251212_152209.down,
    name: '20251212_152209',
  },
  {
    up: migration_20251212_152323.up,
    down: migration_20251212_152323.down,
    name: '20251212_152323',
  },
  {
    up: migration_20251212_153626.up,
    down: migration_20251212_153626.down,
    name: '20251212_153626',
  },
  {
    up: migration_20251213_134631.up,
    down: migration_20251213_134631.down,
    name: '20251213_134631',
  },
  {
    up: migration_20251213_152311.up,
    down: migration_20251213_152311.down,
    name: '20251213_152311',
  },
  {
    up: migration_20251215_163426.up,
    down: migration_20251215_163426.down,
    name: '20251215_163426',
  },
  {
    up: migration_20251215_164853.up,
    down: migration_20251215_164853.down,
    name: '20251215_164853',
  },
  {
    up: migration_20251220_210035.up,
    down: migration_20251220_210035.down,
    name: '20251220_210035',
  },
  {
    up: migration_20251220_210259.up,
    down: migration_20251220_210259.down,
    name: '20251220_210259'
  },
];
