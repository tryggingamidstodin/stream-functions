# Helper functions for streams in node js.

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
import { map } from 'stream-function'
somestream.pipe(promiseMap(somepromisefunction))
```
