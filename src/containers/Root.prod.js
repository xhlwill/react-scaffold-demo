import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import routes from '../scripts/routes'
import { Router } from 'react-router'

export default class Root extends Component {
  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        {routes(history)}
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
