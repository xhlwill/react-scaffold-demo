import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'

import '../styles/common'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { children } = this.props
    return (
      <div className="wrapper">
        <Header />

        {children}

        <Footer />
      </div>
    )
  }
}

// App.propTypes = {
//   // Injected by React Router
//   children: PropTypes.node
// }


export default connect()(App)
