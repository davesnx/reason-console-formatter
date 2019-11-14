const { isList } = require('./formatter')

test('isList', () => {
  const list = [1, [2, [3, [4, 0]]]]
  expect(isList(list)).toBeTruthy()
  expect(isList([1])).toBeFalsy()
  expect(isList([2, 3])).toBeFalsy()
  expect(isList([1, 2, 3])).toBeFalsy()
})
