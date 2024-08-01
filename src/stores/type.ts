import { IdataProfile } from './datas/type';

export enum HistoryType {
  Income = 'income',
  Payment = 'Payment',
}

export enum TransactionType {
  TopUp = 'Top Up',
  OtherPlayer = 'Transfer to Other Player',
  OtherPlayerNFC = 'Transfer to Other Player using NFC',
  Bank = 'Transfer to Bank',
  Tax = 'Payment of Taxes',
  Earning = 'Earning from Other Player',
  EarningTax = 'Income from Taxes',
  property = 'Buy property',
  house = 'Buy house',
  hotel = 'Buy hotel',
  Salary = 'Salary Income',
}

export interface IPlayer {
  id: string;
  username: string;
  saldo: number;
}

export interface HistoryPlayer {
  id: string;
  history: History[];
}

export interface History extends IdataProfile {
  amount: number;
  transaction: TransactionType;
  type: HistoryType;
}
