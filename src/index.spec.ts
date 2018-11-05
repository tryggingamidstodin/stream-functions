import { expect } from "chai";
import { Readable } from "stream";
import { buffer, filter, flatten, map, promiseMap } from ".";

describe("stream util", () => {
  it("should filter", (done: any) => {
    const readable = new Readable({ objectMode: true });
    const source = [1, 2, 3, 4];
    const res: any[] = [];
    readable
      .pipe(filter((item: any) => item % 2 === 0))
      .on("data", (data: any) => res.push(data))
      .on("finish", () => {
        try {
          expect(res).to.eql([2, 4]);
          done();
        } catch (err) {
          done(err);
        }
      })
      .on("error", done);

    source.map((item: any) => readable.push(item));
    readable.push(null);
  });

  it("should map", (done: any) => {
    const readable = new Readable({ objectMode: true });
    const source = [2, 4, 8, 16];
    const res: any[] = [];
    readable
      .pipe(map((i: any) => i + 1))
      .on("data", (data: any) => res.push(data))
      .on("finish", () => {
        try {
          expect(res).to.eql([3, 5, 9, 17]);
          done();
        } catch (err) {
          done(err);
        }
      })
      .on("error", done);
    source.map((i: any) => readable.push(i));
    readable.push(null);
  });
  it("should buffer", (done: any) => {
    const readable = new Readable({ objectMode: true });
    const source = [2, 4, 8, 16];
    const res: any[] = [];
    readable
      .pipe(buffer(2))
      .on("data", (data: any) => res.push(data))
      .on("finish", () => {
        try {
          expect(res).to.eql([[2, 4], [8, 16]]);
          done();
        } catch (err) {
          done(err);
        }
      })
      .on("error", done);
    source.map((i: any) => readable.push(i));
    readable.push(null);
  });
  it("should flatten", (done: any) => {
    const readable = new Readable({ objectMode: true });
    const source = [[2, 4], [8, 16]];
    const res: any[] = [];
    readable
      .pipe(flatten())
      .on("data", (data: any) => res.push(data))
      .on("finish", () => {
        try {
          expect(res).to.eql([2, 4, 8, 16]);
          done();
        } catch (err) {
          done(err);
        }
      })
      .on("error", done);
    source.map((i: any) => readable.push(i));
    readable.push(null);
  });
});
describe("stream promise util", () => {
  it("should map stream promises", (done: any) => {
    const readable = new Readable({ objectMode: true });
    const source = [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
      Promise.resolve(4),
    ];
    const res: any[] = [];
    readable
      .pipe(
        promiseMap(
          (n: any) =>
            new Promise((resolve, reject) => {
              n.then(resolve).catch(reject);
            }),
        ),
      )
      .on("data", (data: any) => res.push(data))
      .on("finish", () => {
        try {
          expect(res).to.eql([1, 2, 3, 4]);
          done();
        } catch (err) {
          done(err);
        }
      })
      .on("error", done);

    source.map((item: any) => readable.push(item));
    readable.push(null);
  });
});
