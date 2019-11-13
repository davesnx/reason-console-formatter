const flat = data => {
  const t = []

  while (Array.isArray(data)) {
    const value = data[0]
    const rest = data[1]

    t.push(value)
    data = rest
  }

  return t
}

const deepFlat = data => {
  const t = []

  while (Array.isArray(data)) {
    const value = Array.isArray(data[0]) ? deepFlat(data[0]) : data[0]
    const rest = data[1]

    t.push(value)
    data = rest
  }

  return t
}

module.exports = { flat, deepFlat }
