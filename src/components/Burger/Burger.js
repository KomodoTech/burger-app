import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

  const ingredientNames = Object.keys(props.ingredients);   // Array of ingredient names

  const ingredients = ingredientNames.map( ingredientKey => {
    const ingredientAmount = props.ingredients[ingredientKey];
    //NOTE: Why do we need the spread operator here?
    const ingredientComponents = [...Array(ingredientAmount)].map((_, i) => {
      return <BurgerIngredient
        key={ingredientKey + i}
        type={ingredientKey} />
    })
    return ingredientComponents
  });

  //NOTE: Here we grab each element out of the array of ingredient arrays and put it
  // into a new array so that we can easily see if there are no ingredients (instead
  // of having to check a bunch of arrays we only check one).
  let reducedIngredients = ingredients.reduce((arr, el) => {
    return arr.concat(el);
  }, []);

  if (reducedIngredients.length === 0) {
    reducedIngredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {reducedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger;
