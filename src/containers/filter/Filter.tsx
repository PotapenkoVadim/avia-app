import React from 'react';
// @ts-ignore
import styles from './Filter.module.less';
import { FilterPropsType } from './types';

export class Filter extends React.Component<FilterPropsType> {
  render () {
    return (
      <div className={styles['filter-display']}>
        <p>Количество пересадок:</p>
        {/* <div>
            <input
              className={styles['checkbox-custom']}
              onChange={ this.props.handler }
              type="checkbox"
              name="all"
              id="all"
            />
            <label htmlFor="all" className={styles['checkbox-custom-label']}>Все</label>
        </div> */}
        {
          this.props.transfer.map( v => (
            <div key={ v.id }>
              <input
                className={styles['checkbox-custom']}
                onChange={ this.props.handler }
                checked={ v.check }
                type="checkbox"
                name={ v.id }
                id={ v.id }
              />
              <label htmlFor={ v.id } className={styles['checkbox-custom-label']}>{ v.title }</label>
          </div>
          ))
        }
      </div>
    );
  }
}