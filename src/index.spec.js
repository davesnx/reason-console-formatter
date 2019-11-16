import install from './index'
import window from 'global/window'

describe('Install', () => {
  test('should update custom formatters', () => {
    install()

    expect(window).toHaveProperty('formattersLoaded')
    expect(window.formattersLoaded).toBeTruthy()
    expect(window.devtoolsFormatters).toHaveLength(1)
  })
})
