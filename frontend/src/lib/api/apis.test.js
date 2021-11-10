/* eslint-disable no-undef */
import { signin, signup, signout, token } from './auth';

describe('apis', () => {
  it('should have right url', () => {
    expect(signin).toBe('/api/user/sign_in/');
    expect(signup).toBe('/api/user/sign_up/');
    expect(signout).toBe('/api/user/sign_out/');
    expect(token).toBe('/api/user/token/');
  });
});
