import React from 'react';
// @ts-ignore
import styles from './LoadButton.module.less';
import { LoadButtonPropsType } from './types';

export const LoadButton:React.FC<LoadButtonPropsType> = ({ handler }) => (
  <div className={styles['load-button']} onClick={ handler }>
    <span>Загрузить еще</span>
  </div>
);