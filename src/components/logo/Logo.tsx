import React from 'react';
// @ts-ignore
import styles from './Logo.module.less';
export const Logo:React.FC = () => (
  <span className={styles.logo} >
    <i className='fa fa-plane'></i>
  </span>
);