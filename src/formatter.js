import flat from './flat'

// Dummy log fn to debug the extensions
// without using the console
const log = stuff => { // eslint-disable-line
  const el = document.getElementById('debug')
  el.innerHTML = JSON.stringify(stuff) + '<br/>' + el.innerHTML
}

const isList = data => {
  // Very unrealistic way to detect if its a ReasonML List
  return Array.isArray(data) && Array.isArray(data[1])
}

export const ListFormatter = {
  header(data) {
    // if (data.__IS_NESTED__) return formatters.formatHeaderAsTitle(data.value);
    // if (data.length >= 100) return formatHeaderAsSummary(data.slice(0, 99))
    if (!isList(data)) return null
    return renderInlineFullList('List', data)
  },

  hasBody(data) {
    // return data && data.toJS && (data.size >= 100 || data.__IS_NESTED__);
    return !!data
  },

  body(data) {
    if (!isList(data)) return null
    return renderFullBody(data)
  }
}
// const collections = [
//   {
//     name: () => 'List',
//     validate: isList,
//     renderBody: renderFullBody,
//     renderInlineFull: renderInlineFullList,
//     renderInlinePartial: renderTitleList,
//     renderTitle: renderTitleList
//   }
// ]

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

const itemStyles = `
  color: rgb(136, 19, 145);
  flex-shrink: 0;
`

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
      output.push(renderRecordItem(key, value))
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

function renderRecordItem(key, value) {
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
