export type TransferType = {
  id:string,
  title:string,
  check:boolean
}

export type TicketType = {
  price: number    // Цена в рублях
  carrier: string // Код авиакомпании (iata)
  // Массив перелётов.
  segments: [
    {
      origin: string       // Код города (iata)
      destination: string // Код города (iata)
      date: string       // Дата и время вылета туда
      stops: string[]   // Массив кодов (iata) городов с пересадками
      duration: number // Общее время перелёта в минутах
    },
    {
      origin: string       // Код города (iata)
      destination: string // Код города (iata)
      date: string       // Дата и время вылета обратно
      stops: string[]   // Массив кодов (iata) городов с пересадками
      duration: number // Общее время перелёта в минутах
    }
  ]
}