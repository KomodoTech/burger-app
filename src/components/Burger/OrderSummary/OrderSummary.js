import React , { Component, Fragment } from 'react';

import Button from '../../UI/Button/Button';

//NOTE: This can be made back into a functional component
class OrderSummary extends Component {
  componentWillUpdate() {
    console.log('[OrderSummary] componentWillUpdate');
  }

  render() {
    const ingredientNameStyle = {
      textTransform: 'capitalize'
    };

    const ingredientNames = Object.keys(this.props.ingredients);
    const ingredientSummary = ingredientNames.map(ingredientKey => {
      const ingredientAmount = this.props.ingredients[ingredientKey];
      return (
        <li key={ingredientKey}>
          <span style={ingredientNameStyle}>{ingredientKey}</span>: {ingredientAmount}
        </li>
      );
    });

    const totalPrice = this.props.price.toFixed(2);

    return (
      <Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {totalPrice}</strong></p>
        <p>Continue to Checkout?</p>
        <Button
          buttonType="Danger"
          clicked={this.props.orderCancelled}>CANCEL</Button>
        <Button
          buttonType="Success"
          clicked={this.props.orderContinued}>CONTINUE</Button>
      </Fragment>
    );
  }
}

export default OrderSummary;
