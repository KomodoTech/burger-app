import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const BURGER_BASE_PRICE = 4.00;
const SALAD_PRICE = 0.50;
const CHEESE_PRICE = 0.40;
const MEAT_PRICE = 1.30;
const BACON_PRICE = 0.60;

const INGREDIENT_PRICES = {
  salad: SALAD_PRICE,
  cheese: CHEESE_PRICE,
  meat: MEAT_PRICE,
  bacon: BACON_PRICE
};


class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    },
    totalPrice: BURGER_BASE_PRICE,
    purchasable: false,
    ordered: false
  };

  updatePurchaseState = (ingredients) => {
    const ingredientsArray = Object.keys(ingredients);
    const ingredientsAmount = ingredientsArray.map(igKey => {
      return ingredients[igKey];
    });
    const sum = ingredientsAmount.reduce((sum, el) => {
      return sum + el;
    }, 0);

    const isPurchasable = (sum > 0);

    this.setState(
      {
        purchasable: isPurchasable
      }
    );
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;

    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState(
      {
        ingredients: updatedIngredients,
        totalPrice: newPrice
      }
    );

    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }

    const updatedCount = oldCount - 1;

    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState(
      {
        ingredients: updatedIngredients,
        totalPrice: newPrice
      }
    );

    this.updatePurchaseState(updatedIngredients);
  }

  //NOTE: make sure to make this function using the arrow syntax to bind this
  // if this is called by an event without the arrow syntax, this will be referring
  // to the wrong thing
  orderHandler = () => {
    this.setState(
      {
        ordered: true
      }
    );
  }

  orderCancelHandler = () => {
    this.setState(
      {
        ordered: false
      }
    );
  }

  orderContinueHandler = () => {
    alert('You continued!');
  }

  render() {
    //NOTE: structure of disabledInfo is
    // {salad: true, meat: false, ...}
    const disabledInfo = {...this.state.ingredients};
    for (let key in disabledInfo) {
      const ingredientDisabled = (disabledInfo[key] <= 0);
      disabledInfo[key] = ingredientDisabled;
    }

    return (
      <Fragment>
        <Modal
          show={this.state.ordered}
          modalClosed={this.orderCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            orderCancelled={this.orderCancelHandler}
            orderContinued={this.orderContinueHandler} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          ordered={this.orderHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice} />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
