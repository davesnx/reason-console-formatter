const flat = require('./flat')

describe('Flat', () => {
  test('list(int)', () => {
    const list = [1, [2, [3, [4, 0]]]]
    expect(flat(list)).toEqual([1, 2, 3, 4])
  })

  test('list(string)', () => {
    const list = ['Hola', ['Cara', ['Cola', ['!!', 0]]]]
    expect(flat(list)).toEqual(['Hola', 'Cara', 'Cola', '!!'])
  })

  test('list(list(i))', () => {
    const listA = /* :: */ [
      1,
      /* :: */ [2, /* :: */ [3, /* :: */ [4, /* :: */ [5, /* [] */ 0]]]]
    ]

    const listB = /* :: */ [
      1,
      /* :: */ [2, /* :: */ [3, /* :: */ [4, /* :: */ 0]]]
    ]

    const nestedList = /* :: */ [listA, [listB, /* [] */ 0]]

    expect(flat(nestedList)).toEqual([[1, 2, 3, 4, 5], [1, 2, 3, 4]])
  })

  test('list(list(list(i)))', () => {
    const listA = /* :: */ [
      1,
      /* :: */ [2, /* :: */ [3, /* :: */ [4, /* :: */ [5, /* [] */ 0]]]]
    ]
    const listB = /* :: */ [
      1,
      /* :: */ [2, /* :: */ [3, /* :: */ [4, /* :: */ [5, /* [] */ 0]]]]
    ]
    const nestedList001 = /* :: */ [listB, /* [] */ 0]
    const nestedList = /* :: */ [listA, nestedList001]
    const nestedListB001 = /* :: */ [listA, /* [] */ 0]
    const nestedListB = /* :: */ [listB, nestedListB001]
    const nestedListSupreme001 = /* :: */ [nestedListB, /* [] */ 0]
    const nestedListSupreme = /* :: */ [nestedList, nestedListSupreme001]

    expect(flat(nestedListSupreme)).toEqual([
      [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]],
      [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]]
    ])
  })
})
