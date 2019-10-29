// Dummy log fn to debug the extensions
// without using the console
const log = stuff => { // eslint-disable-line
  const el = document.getElementById('debug')
  el.innerHTML = +el.innerHTML + '<br/>' + JSON.stringify(stuff)
}

const BS_RECORD = Symbol.for('BsRecord')
const BS_VARIANT = Symbol.for('BsVariant')
const BS_LOCAL_MODULE = Symbol.for('BsLocalModule')

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

const isLinkedList = data =>
  Array.isArray(data) && Array.isArray(data[1]) && data[BS_VARIANT] === '::'
const isRecord = data => data[BS_RECORD] !== undefined
const isVariant = data => data[BS_VARIANT] !== undefined
const isModule = data => data[BS_LOCAL_MODULE] !== undefined

const titleStyles = `
  white-space: normal;
  word-wrap: break-word;
`

const renderTitleList = (name, list) => {
  return [
    'span',
    {
      style: titleStyles
    },
    ['span', {}, `${name} [${list.length}]`]
  ]
}

const renderTitleRecord = name => {
  return [
    'span',
    {
      style: titleStyles
    },
    ['span', {}, `${name}`]
  ]
}

// const renderInlinePartialMap= (name, map) => {
//   return renderInlineRecord(name, map)
//     .slice(0, -1)
//     .concat([['span', {}, '…'], '}'])
// }

const renderInlineFullList = (name, list) => renderInlineArray(name, flat(list))

const renderInlineArray = (name, arr) => {
  return [
    'span',
    {
      style: titleStyles
    },
    `${name} [`,
    ...arr
      .reduce((output, value) => {
        output.push(['object', { object: value }])
        output.push(', ')
        return output
      }, [])
      .slice(0, -1),
    ']'
  ]
}

const itemStyles = `
  color: rgb(136, 19, 145);
  flex-shrink: 0;
`

const inlineMapStyles = `
  font-style: italic;
  white-space: normal;
  word-wrap:break-word;
`

const renderInlineRecord = (name, map) => {
  const keys = map[BS_RECORD]
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
          output.push([
            'span',
            {
              style: itemStyles
            },
            `${keys[value]}`
          ])
          output.push(': ')
          output.push(['object', { object: map[value] }])
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

const renderListBody = list => renderArrayBody(flat(list))

const renderArrayBody = arr => {
  return arr.reduce(
    (output, value, key) => {
      output.push(renderItem(key, value))
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

const renderItem = (key, value) => {
  return [
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
  ]
}

const renderRecordBody = record => {
  const keys = record[BS_RECORD]
  const values = Object.keys(record)
  return values.reduce(
    (output, value) => {
      output.push(renderItem(keys[value], record[value]))
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

export const formatHeaderInFull = obj => {
  const formatter = formatterMap.find(c => c.validate(obj))
  return formatter && formatter.renderInlineFull(formatter.name(obj), obj)
}

export const formatHeaderAsSummary = obj => {
  const formatter = formatterMap.find(c => c.validate(obj))
  return formatter && formatter.renderInlinePartial(formatter.name(obj), obj)
}

export const formatHeaderAsTitle = obj => {
  const formatter = formatterMap.find(c => c.validate(obj))
  return formatter && formatter.renderTitle(formatter.name(obj), obj)
}

export const formatBody = obj => {
  const formatter = formatterMap.find(c => c.validate(obj))
  return formatter && formatter.renderBody(obj)
}

const renderVariant = (name, data) => {
  return data
}

const formatterMap = [
  {
    /* TODO:
      Module aren't identificable by data[Symbol.for('BsLocalModule')]

      Ex.
        Can access to "Symbol(BsRecord)", but can't know if it's LocalModule
        Array(2)
          0: "Adam"
          1: 31
          length: 2
          Symbol(BsRecord): (2) ["name", "age"]
          __proto__: Array(0)
    */
    name: () => 'Module',
    validate: isModule,
    renderBody: renderRecordBody,
    renderInlineFull: renderInlineRecord,
    renderInlinePartial: renderTitleRecord,
    renderTitle: renderTitleRecord
  },
  {
    name: () => 'Record',
    validate: isRecord,
    renderBody: renderRecordBody,
    renderInlineFull: renderInlineRecord,
    renderInlinePartial: renderTitleRecord,
    renderTitle: renderTitleRecord
  },
  {
    name: () => 'List',
    validate: isLinkedList,
    renderBody: renderListBody,
    renderInlineFull: renderInlineFullList,
    renderInlinePartial: renderTitleList,
    renderTitle: renderTitleList
  },
  {
    // TODO: There's no data tag for Arrays
    name: () => 'Array',
    validate: Array.isArray, // TODO: For now this would affect all kind of arrays
    renderBody: renderArrayBody,
    renderInlineFull: renderInlineArray,
    renderInlinePartial: renderTitleList,
    renderTitle: renderTitleList
  },
  {
    // TODO: Variant aren't identificable by data[Symbol.for('BsVariant')]
    name: () => 'Variant',
    validate: isVariant,
    renderBody: renderVariant,
    renderInlineFull: renderVariant,
    renderInlinePartial: renderVariant,
    renderTitle: renderVariant
  }
]
