import React from 'react';

import classes from './NavigationItem.css';

const navigationItem = (props) => {
  const anchorClass = props.active ? classes.active : null;

  return (
    <li className={classes.NavigationItem}>
      <a
        href={props.link}
        className={anchorClass}>{props.children}</a>
    </li>
  );
}

export default navigationItem;
