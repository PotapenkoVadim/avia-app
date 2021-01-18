import React from 'react';
// @ts-ignore
import styles from './Ticket.module.less';
import { TicketPropsType } from './types';

const DICTIONARY:string[] = ['пересадок', 'пересадка', 'пересадки'];
export class Ticket extends React.Component<TicketPropsType> {
  dateTransform = ( date:string|number ):string => {
    let localDate = new Date(date);
    return `${localDate.getHours()}:${localDate.getMinutes() < 10 ? '0' + localDate.getMinutes() : localDate.getMinutes()}`;
  };

  calculateDuration = ( date:string, duration:number ):string => {
    let localDuration = (+(new Date(date))*1000) + (duration/60);
    return this.dateTransform(localDuration);
  };

  calculateDurationInTime = ( duration:number ):string => {
    let localDate = (duration/60).toString().split('.');
    return `${localDate[0]}ч ${localDate[2] ? localDate[1].slice(0,2) : '00'}м`;
  }

  render () {
    return (
      <div className={styles['ticket']}>
        <div className={styles['title']}>
          <span className={styles['price']}>{ this.props.data.price } р.</span>
          <img src={`//pics.avs.io/99/36/${this.props.data.carrier}.png`} alt='avia-logo' />
        </div>

        <div>
          <div className={styles['info']}>
            <div>
              <span>
                { this.props.data.segments[0].origin }-{ this.props.data.segments[0].destination }
              </span>
              <span>
                {
                  this.dateTransform(this.props.data.segments[0].date)
                } - {
                  this.calculateDuration(this.props.data.segments[0].date, this.props.data.segments[0].duration)
                }
              </span>
            </div>
            <div>
              <span>В пути</span>
              <span>{ this.calculateDurationInTime(this.props.data.segments[0].duration) }</span>
            </div>
            <div>
              <span>
                { `${this.props.data.segments[0].stops.length} ${DICTIONARY[this.props.data.segments[0].stops.length]  ?? 'пересадки'}` }
              </span>
              <span>{ this.props.data.segments[0].stops.join(',') }</span>
            </div>
          </div>

          <div className={styles['info']}>
            <div>
            <span>
                { this.props.data.segments[1].origin }-{ this.props.data.segments[1].destination }
              </span>
              <span>
                {
                  this.dateTransform(this.props.data.segments[1].date)
                } - {
                  this.calculateDuration(this.props.data.segments[1].date, this.props.data.segments[1].duration)
                }
              </span>
            </div>
            <div>
              <span>В пути</span>
              <span>{ this.calculateDurationInTime(this.props.data.segments[1].duration) }</span>
            </div>
            <div>
              <span>
                { `${this.props.data.segments[1].stops.length} ${DICTIONARY[this.props.data.segments[1].stops.length] ?? 'пересадки'}` }
              </span>
              <span>{ this.props.data.segments[1].stops.join(',') }</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}