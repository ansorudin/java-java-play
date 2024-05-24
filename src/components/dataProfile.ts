import { IdataProfile } from './type';

export const dataProfile: IdataProfile[] = [
  {
    playerId: '9d71fb69',
    playerName: 'Corruptor',
    description: 'Bribery',
    skin: 'When you get in jail, you can bribe the warden Rp. 20,000 to instantly escape from jail!',
    totalBalance: 60000,
    gender: 'Male',
    image: require('../../asset/corruptor.png'),
  },
  {
    playerId: 'eda23c1b',
    playerName: 'Traveller',
    description: 'Happy Go Round',
    skin: 'Once per turn, if you stop at tourist trap, you can travel to the next tourist trap on the map. (Do not collect salary if passing start)',
    totalBalance: 20000,
    gender: 'Female',
    image: require('../../asset/traveller.png'),
  },
  {
    playerId: 'ddd0861a',
    playerName: 'Businessman',
    description: 'Tax Evasion',
    skin: 'Get 50% discount everytime you stop on tax block',
    totalBalance: 50000,
    gender: 'Male',
    image: require('../../asset/businessman.png'),
  },
  {
    playerId: '600da590',
    playerName: 'Office Worker',
    description: 'Overtime Payment',
    skin: 'Everytime ypu pass start, get extra salary of Rp. 10.000',
    totalBalance: 20000,
    gender: 'Male',
    image: require('../../asset/office-worker.png'),
  },
  {
    playerId: 'cbcb7269',
    playerName: 'Contractor',
    description: 'Building Master',
    skin: 'Get 50% discount of constructing cost when you build villa or resort',
    totalBalance: 60000,
    gender: 'Male',
    image: require('../../asset/contractor.png'),
  },
  {
    playerId: 'c87dd1a6',
    playerName: 'Celebrity',
    description: 'Endorsement',
    skin: 'Once per turn, if you stop at a property that owned by other player, roll the dices, get 100% discount if you roll a double dice',
    totalBalance: 60000,
    gender: 'Male',
    image: require('../../asset/celebrity.png'),
  },
];

export const initDataProfile: IdataProfile = {
  playerId: '',
  playerName: '',
  description: '',
  skin: '',
  totalBalance: 0,
  gender: '',
  image: '',
};
