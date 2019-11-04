const flat = data => {
  const t = []

  while (Array.isArray(data)) {
    const value = data[0]
    const rest = data[1]

    // In case I want the recusivity to be in or out
    // if (Array.isArray(value)) {
    //   value = flat(value)
    // }

    t.push(value)
    data = rest
  }

  return t
}

module.exports = flat
