import React from 'react';
import { TogglesType } from './types';
// @ts-ignore
import styles from './Toggles.module.less';

export const Toggles:React.FC<TogglesType> = ({ handler, toggle }) => (
  <div className={styles['toggles-container']}>
    <div data-type='cheap' onClick={ handler } className={`${toggle === 'cheap' && styles['active']}`}>
      <span data-type='cheap'>Самый дешевый</span>
    </div>

    <div data-type='fast' onClick={ handler } className={`${toggle === 'fast' && styles['active']}`}>
      <span data-type='fast'>Самый быстрый</span>
    </div>
  </div>
);