import { DB } from './db';

describe('DB', () => {
  it('should create an instance', () => {
    expect(new DB()).toBeTruthy();
  });
});
