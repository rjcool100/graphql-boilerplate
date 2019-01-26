import { getFirstName } from '../src/utils/user.js'


test('first sample test', () => {
    const fname = getFirstName("Rohit Joshi")
    expect(fname).toBe("Rohit")
})