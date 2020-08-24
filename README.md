# Helper functions for streams in node js.

Core functions using Transform for usage in stream pipes.

## Minimal dependencies

Depends only on the (stream)[https://www.npmjs.com/package/stream] library, ported straight from node.js core.

## Usage examples

### map

```
import { map } from 'stream-function'
somestream.pipe(map(somefunction))
```

### filter

```
import { filter } from 'stream-function'
somestream.pipe(filter(somefunction))
```

### flatten

```
import { flatten } from 'stream-function'
somestream.pipe(flatten())
```

### buffer

```
import { buffer } from 'stream-function'
somestream.pipe(buffer(buffersize))
```

### promiseMap

```
import { promiseMap } from 'stream-function'
somestream.pipe(promiseMap(somepromisefunction))
```
