# raureif-glimmer

This is work in progress.

It is raureif addon for authoring glimmerjs applications.

## Setup

In raureif project create two folder:

* `glimmer-config` with files

```typescript
// ./src/glimmer-config/module-map.ts


/**
 * This is just a placeholder file to keep TypeScript aware editors happy. At build time,
 * it will be replaced with a complete map of resolvable module paths => rolled up contents.
 */

export interface Dict<T> {
  [index: string]: T;
}

declare let map: Dict<any>;
export default map;
```

```typescript
// ./src/glimmer-config/resolver-configuration.ts

/**
 * This is just a placeholder file to keep TypeScript aware editors happy. At build time,
 * it will be replaced with a resolver configuration composed from your application's
 * `config/environment.js` (and supplemented with default settings as possible).
 */

import { ResolverConfiguration } from '@glimmer/resolver';
declare var _default: ResolverConfiguration;
export default _default;
```

* `glimmer` - which will host glimmer app
