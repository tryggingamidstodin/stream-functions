import { Transform } from "stream";

export function syncTransform(fn: any) {
  return (data: any, enc: any, next: any) => {
    try {
      fn(data);
      next();
    } catch (err) {
      next(err);
    }
  };
}

export function filter(predicate: any) {
  const transf = new Transform({
    objectMode: true,
  });

  transf._transform = exports.syncTransform((chunk: any) => {
    if (predicate(chunk)) {
      transf.push(chunk);
    }
  });

  return transf;
}
export function promiseMap(fn: any) {
  const transf = new Transform({
    objectMode: true,
  });

  transf._transform = (chunk, encoding, next) => {
    fn(chunk)
      .then((res: any) => {
        transf.push(res);
        next();
      })
      .catch((err: any) => {
        transf.emit("error", err);
      });
  };

  return transf;
}

export function map(fn: any) {
  const transf = new Transform({
    objectMode: true,
  });

  transf._transform = exports.syncTransform((chunk: any) => {
    transf.push(fn(chunk));
  });

  return transf;
}

export function buffer(bufferSize: any) {
  let buff: any[] = [];

  const transf = new Transform({
    objectMode: true,
  });
  transf._transform = exports.syncTransform((chunk: any) => {
    if (buff.length >= bufferSize) {
      transf.push(buff);
      buff = [];
    }
    buff.push(chunk);
  });
  transf._flush = (done: any) => {
    transf.push(buff);
    done();
  };
  return transf;
}
export function flatten() {
  const transf = new Transform({
    objectMode: true,
  });
  transf._transform = exports.syncTransform((chunk: any) => {
    chunk.forEach((c: any) => {
      transf.push(c);
    });
  });
  return transf;
}
