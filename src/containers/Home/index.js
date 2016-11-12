import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main-content">
        this is homepage
      </div>
    )
  }
}

export default connect()(Home);
