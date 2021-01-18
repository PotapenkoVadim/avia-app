import React from 'react';
import { observer } from 'mobx-react';
// @ts-ignore 
import styles from './App.module.less';
import { HOST } from './configs';
import { Logo } from './components/logo/Logo';
import { Filter } from './containers/filter/Filter';
import { Toggles } from './components/toggles/Toggles';
import { Ticket } from './components/ticket/Ticket';
import { LoadButton } from './components/load-button/LoadButton';
import { Notice } from './components/notice/Notice';

import { appStore } from './store/appStore';
const store = new appStore();
export const App = observer(
  class extends React.Component {
    componentDidMount() {
      fetch( HOST + 'search' )
        .then( resp => resp.json() )
        .then( data => store.setSearchId(data.searchId) )
        .then( () => {
          fetch( `${HOST}tickets?searchId=${store.searchId}`)
            .then( res => res.json())
            .then( result => store.setTickets(result.tickets) )
            .catch( error => {
              store.setError();
              console.log('Error/SecondRequest: ', error);
            });
        })
        .catch( error => {
          store.setError();
          console.log('Error/FirstRequest: ', error);
        });
    }

    addTickets = ():void => {
      store.chunkTickets(store.allTickets);
    };

    render () {
      return (
        <div className={styles['container']}>
          <Logo />
          <div className={styles['app-display']}>
            <Filter transfer={ store.transfer } handler={ store.transferHandler } />
            <div className={styles['list-container']}>
              <Toggles handler={ store.toggleHandler } toggle={ store.toggle } />
              {
                store.load
                  ? !store.error
                    ? store.tickets.length
                      ? store.tickets.map( (v, i) => <Ticket key={ i } data={ v } /> )
                      : <Notice type='notice' text={ 'Нет подходящих трансферов.' } />
                    : <Notice type='error' text={ 'Ошибка сервера. Перезагрузите приложение.' } />
                  : <Notice type='notice' text={ 'Загрузка...' } />
              }

              { !!store.tickets.length && <LoadButton handler={ this.addTickets  } /> }
            </div>
          </div>
        </div>
      );
    }
  }
);