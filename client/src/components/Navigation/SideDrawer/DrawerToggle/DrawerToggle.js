import React from 'react';

import classes from './DrawerToggle.css';

const drawerToggle = (props) => {
  let classesApplied = [classes.DrawerToggle, classes.Open];
  if (props.open) {
    classesApplied = [classes.DrawerToggle, classes.Close];
  }

  return (
    <div
      className={classesApplied.join(' ')}
      onClick={props.clicked}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default drawerToggle;
