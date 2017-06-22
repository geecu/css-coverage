const compact = require('./compact');

test('compacts single page css', () => {
  expect(
    compact(
      [ 'file' ],
      [ [ 'rule' ] ]
    )
  ).toEqual({
    file: 'rule'
  })
})
test('compacts two pages css', () => {
  expect(
    compact(
      [ 'file', 'file' ],
      [ [ 'rule1' ], [ 'rule2' ] ]
    )
  ).toEqual({
    file: 'rule1rule2'
  })
})
test('compacts two pages css, extracting common CSS', () => {
  expect(
    compact(
      [
        [ 'common', 'file1' ],
        [ 'common', 'file2' ]
      ],
      [
        [ 'common-rule', 'specific-rule1' ],
        [ 'common-rule', 'specific-rule2' ]
      ]
    )
  ).toEqual({
    common: 'common-rule',
    file1: 'specific-rule1',
    file2: 'specific-rule2',
  })
})
