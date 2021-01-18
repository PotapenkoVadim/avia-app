import { observable, makeObservable, action } from 'mobx';
import { TransferType, TicketType } from './types';

export class appStore {
  load:boolean = false;
  error:boolean = false;
  searchId:string = '';
  toggle:string|null = null;
  tickets:Array<TicketType|never> = [];

  allTickets:Array<TicketType|never> = [];
  pos:number = 0;
  transfer:Array<TransferType> = [
    {
      id: 'without',
      title: 'Без пересадок',
      check: true
    },
    {
      id: 'one',
      title: '1 пересадка',
      check: true
    },
    {
      id: 'two',
      title: '2 пересадки',
      check: true
    },
    {
      id: 'three',
      title: '3 пересадки',
      check: true
    },
  ];
  constructor() {
    makeObservable(this, {
      searchId: observable,
      error: observable,
      load:observable,
      tickets: observable,
      toggle: observable,
      transfer: observable,
      toggleHandler: action,
      transferHandler: action,
      setSearchId: action,
      setTickets: action,
      chunkTickets: action,
      toggleSort: action,
      transferSort: action,
      setError: action
    })
  }

  toggleHandler = ( event:React.MouseEvent<HTMLElement> ):void => {
    // @ts-ignore
    const value = event.target.dataset.type;
    this.toggle =  this.toggle == value ? null : value;
    this.toggleSort(this.allTickets);
    --this.pos;
    this.chunkTickets(this.allTickets);
  };

  transferHandler = ( event:React.ChangeEvent<HTMLElement> ):void => {
    // @ts-ignore
    const name = event.target.name;
    // @ts-ignore
    const check = event.target.checked;
    this.transfer = this.transfer.map( v => {
      if (v.id === name) v.check = check;
      else if (name === 'all') v.check = check;
      return v;
    });

    this.pos <= 0 ? this.pos = 0 : --this.pos;
    if (name == 'all') {
      this.chunkTickets(this.allTickets);
    } else {
      let tickets = this.transferSort(this.allTickets);
      this.chunkTickets(tickets);
    }
  };

  setSearchId = ( id:string ):void => {
    this.searchId = id;
  };

  setTickets = ( tickets:Array<TicketType> ):void => {
    this.allTickets = tickets;
    this.chunkTickets(tickets);
    this.load = true;
  };

  arrayChunk = ( arr:Array<any|never>, size:number ):Array<any> => {
    let subarray = [];
    for (let i = 0; i <Math.ceil(arr.length/size); i++) {
      subarray[i] = arr.slice((i*size), (i*size) + size);
    }
    return subarray;
  };

  chunkTickets = (tickets:Array<TicketType>):void => {
    this.tickets = [];
    if (tickets.length) {
      let local = this.arrayChunk(tickets, 5);
      for (let i = 0; i <= this.pos; i++) {
        this.tickets.push(...local[i]);
      }

      this.pos = this.pos >= local.length ? local.length - 1 : ++this.pos;
    }
  };

  toggleSort = (tickets:Array<TicketType>):void => {
    if (this.toggle == 'fast') {
      tickets.sort(function (a, b) {
        if(a.segments[0].duration > b.segments[0].duration) return 1;
        else if (a.segments[0].duration < b.segments[0].duration) return -1;
        return 0;
      });

    } else if (this.toggle == 'cheap') {
      tickets.sort(function (a, b) {
        if(a.price > b.price) return 1;
        else if (a.price < b.price) return -1;
        return 0;
      });
    }
  };

  transferSort = (tickets:Array<TicketType>):Array<TicketType|never> => {
    let arr:Array<TicketType|never> = [];
    let stops:Array<number|null> = [];
    for (let i = 0; i < this.transfer.length; i++) {
      if (!this.transfer[i].check) stops.push(i);
    }

    arr.push(...tickets.filter( v => !stops.includes(v.segments[0].stops.length) ));
    return arr;
  };

  setError = ():void => {
    this.load = true;
    this.error = true;
  };
}