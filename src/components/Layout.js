import React, { Component } from 'react';
// import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div className='rows'>
        <NavMenu />
        <div className='pd-x'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
