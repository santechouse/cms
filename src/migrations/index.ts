import * as migration_20251212_152209 from './20251212_152209';
import * as migration_20251212_152323 from './20251212_152323';
import * as migration_20251212_153626 from './20251212_153626';
import * as migration_20251213_134631 from './20251213_134631';
import * as migration_20251213_152311 from './20251213_152311';

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
    name: '20251213_152311'
  },
];
