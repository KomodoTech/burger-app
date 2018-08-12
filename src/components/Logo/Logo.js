import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
  /*NOTE: we could pass in height of logo through props and override style
   * code that does this will be left here as an example even though we end
   * up doing something different*/
  <div className={classes.Logo} style={{height: props.height}}>
    <img src={burgerLogo} alt="BurgerApp" />
  </div>
);

export default logo;
