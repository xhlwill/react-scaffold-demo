import React, { Component } from 'react'
import { Provider } from 'react-redux'
import routes from '../scripts/routes'
import DevTools from './DevTools'
import { Router } from 'react-router'

export default class Root extends Component {
  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <div>
          {routes(history)}
          <DevTools />
        </div>
      </Provider>
    )
  }
}

// Root.propTypes = {
//   store: PropTypes.object.isRequired,
//   history: PropTypes.object.isRequired
// }
