import React from 'react';
// @ts-ignore
import styles from './Notice.module.less';
import { NoticePropsType } from './types';

export const Notice:React.FC<NoticePropsType> = ({ text, type }) => (
  <div className={`${styles['display']} ${type && styles[type]}`}>
    <span>{ text }</span>
  </div>
);