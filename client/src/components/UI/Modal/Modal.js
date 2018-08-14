import React , { Component, Fragment } from 'react';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

  //NOTE: for performance we only want to update this if the OrderSummary is going to pop up
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show
    );
  }

  componentWillUpdate() {
    console.log('[Modal] componentWillUpdate()');
  }

  render() {
    //NOTE: slides Modal out of view and makes it see-through if show property is false
    const modalTransform = this.props.show ? 'translateY(0)' : 'translateY(-100vh)';
    const modalOpacity = this.props.show ? '1' : '0';
    const modalStyle = {
      transform: modalTransform,
      opacity: modalOpacity
    }

    return (
      <Fragment>
        <Backdrop
          show={this.props.show}
          clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={modalStyle}>
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}

export default Modal;
