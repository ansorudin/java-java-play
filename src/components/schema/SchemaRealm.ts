import { ObjectSchema, Realm } from 'realm';

export class Player extends Realm.Object<Player> {
  id!: string;
  username!: string;
  saldo!: number;

  static schema: ObjectSchema = {
    name: 'PlayerGame',
    properties: {
      id: 'string',
      username: 'string',
      saldo: 'int',
    },
    primaryKey: 'id',
  };
}

export class History extends Realm.Object<History> {
  id!: string;
  playerName!: string;
  playerImage!: number;
  transaction!: string;
  amount!: number;

  static schema: ObjectSchema = {
    name: 'History',
    properties: {
      id: 'string',
      playerName: 'string',
      playerImage: 'int',
      transaction: 'string',
      amount: 'int',
    },
  };
}

export class Histories extends Realm.Object<Histories> {
  id!: string;
  histories!: Realm.List<History>;

  static schema: ObjectSchema = {
    name: 'TransactionHistory',
    properties: {
      id: 'string',
      histories: 'History[]',
    },
    primaryKey: 'id',
  };
}

const getRealm = () => {
  return new Realm({ schema: [Player.schema, History.schema, Histories.schema] });
};

export default getRealm;
