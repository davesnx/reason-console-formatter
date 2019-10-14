// Dummy log fn to debug the extensions
// without using the console
function log(stuff) {
  document.write('<br/>')
  document.write(JSON.stringify(stuff))
}

  // eslint-disable-line
window.devtoolsFormatters.push({
  header(obj) {
    // if (obj.__IS_NESTED__) return formatters.formatHeaderAsTitle(obj.value);
    if (obj.length >= 100) return formatHeaderAsSummary(obj.slice(0, 99))
    return formatHeaderInFull(obj)
  },

  hasBody(obj) {
    // return obj && obj.toJS && (obj.size >= 100 || obj.__IS_NESTED__);
    return true
  },

  body(obj) {
    return formatBody(obj)
  }
})

function formatHeaderInFull(obj) {
  const collection = collections.find(c => c.validate(obj))
  return collection.renderInlineFull(collection.name(obj), obj)
}

function formatHeaderAsSummary(obj) {
  const collection = collections.find(c => c.validate(obj))
  return collection.renderInlinePartial(collection.name(obj), obj)
}

function formatHeaderAsTitle(obj) {
  const collection = collections.find(c => c.validate(obj))
  return collection.renderTitle(collection.name(obj), obj)
}

function formatBody(obj) {
  const collection = collections.find(c => c.validate(obj))
  return collection.renderBody(obj)
}

const isList = data => {
  // Very unrealistic way to detect if its a ReasonML List
  return Array.isArray(data) && Array.isArray(data[1])
}

const isRecord = data => {
  return (
    data === Object(data) &&
    Object.prototype.toString.call(data) !== '[object Array]'
  )
}

const collections = [
  {
    name: () => 'List',
    validate: isList,
    renderBody: renderFullBody,
    renderInlineFull: renderInlineFullList,
    renderInlinePartial: renderTitleList,
    renderTitle: renderTitleList
  },
  {
    name: () => 'Record',
    validate: isRecord,
    renderBody: renderRecordBody,
    renderInlineFull: renderInlineFullMap,
    renderInlinePartial: renderTitleMap,
    renderTitle: renderTitleMap
  }
]

const titleStyles = `
    white-space: normal;
    word-wrap: break-word;
  `

function renderTitleList(name, list) {
  return [
    'span',
    {
      style: titleStyles
    },
    ['span', {}, `${name}[${list.length}]`]
  ]
}

function renderTitleMap(name) {
  return [
    'span',
    {
      style: titleStyles
    },
    ['span', {}, `${name}`]
  ]
}

function renderInlinePartialMap(name, map) {
  return renderInlineFullMap(name, map)
    .slice(0, -1)
    .concat([['span', {}, '…'], '}'])
}

function renderInlineFullList(name, list) {
  return [
    'span',
    {
      style: titleStyles
    },
    `${name} [`
  ]
    .concat(
      flat(list)
        .reduce((output, value) => {
          output.push(['object', { object: value }])
          output.push(', ')
          return output
        }, [])
        .slice(0, -1)
    )
    .concat(']')
}

const inlineMapStyles = `
    font-style: italic;
    white-space: normal;
    word-wrap:break-word;
  `

const itemStyles = `
    color: rgb(136, 19, 145);
    flex-shrink: 0;
  `

function renderInlineFullMap(name, map) {
  const values = Object.keys(map)
  return [
    'span',
    {
      style: inlineMapStyles
    },
    `${name} {`
  ]
    .concat(
      values
        .reduce((output, value) => {
          const key = map[value]
          output.push([
            'span',
            {
              style: itemStyles
            },
            `${value}`
          ])
          output.push(': ')
          output.push(['object', { object: key }])
          output.push(', ')
          return output
        }, [])
        .slice(0, -1)
    )
    .concat('}')
}

const bodyStyles = `
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-top: 2px;
    position: relative;
    min-height: inherit;
    line-height: 12px;
    -webkit-user-select: text;
  `

const doubleDotsStyle = `
    flex-shrink: 0;
  `

const listStyles = `
    list-style-type: none;
    padding-left: 12px;
    margin-top: 2px;
  `

function renderFullBody(obj) {
  const arr = flat(obj)
  return arr.reduce(
    (output, value, key) => {
      output.push([
        'li',
        {
          style: bodyStyles
        },
        [
          'span',
          {
            style: itemStyles
          },
          `${key}`
        ],
        [
          'span',
          {
            style: doubleDotsStyle
          },
          ': '
        ],
        [
          'object',
          {
            object: value
          }
        ]
      ])
      return output
    },
    [
      'ol',
      {
        style: listStyles
      }
    ]
  )
}

function renderRecordBody(obj) {
  const values = Object.keys(obj)
  return values.reduce(
    (output, value) => {
      const key = obj[value]
      output.push([
        'li',
        {
          style: bodyStyles
        },
        [
          'span',
          {
            style: itemStyles
          },
          `${key}`
        ],
        [
          'span',
          {
            style: doubleDotsStyle
          },
          ': '
        ],
        [
          'object',
          {
            object: value
          }
        ]
      ])
      return output
    },
    [
      'ol',
      {
        style: listStyles
      }
    ]
  )
}

const list = [1, [2, [3, [4, [5, 0]]]]]
const record = { That: '1', is: '23', a: 99, record: 'Yes!' }
const recordNested = { That: '1', is: '23', a: 99, record: 'Yes!' }
const listNested = [{ a: 1 }, [{ b: 1 }, [{ c: 1 }, 0]]]

const flat = data => {
  // [1, 0] -> [1]
  // [1, [2]] -> [1, 2]
  // [1, [2, [3]]] -> [1, 2, [3]]
  let t = []
  while (Array.isArray(data)) {
    t = t.concat(data[0])
    data = data[1]
  }

  return t
}

console.log(list)
console.log(record)
console.log(recordNested)
console.log(listNested)
