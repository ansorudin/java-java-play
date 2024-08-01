import { IdataOtherPlayer, IdataProfile } from './type';

export const dataProfile: IdataProfile[] = [
  {
    playerId: '9d71fb69',
    playerName: 'Corruptor',
    skill: 'Bribery',
    skin: 'When you get in jail, you can bribe the warden 20,000 to instantly escape from jail!',
    gender: 'Male',
    image: require('../../../asset/stores/player/corruptor/main.png'),
    profileImages: [
      require('../../../asset/stores/player/corruptor/happy.png'),
      require('../../../asset/stores/player/corruptor/jail.png'),
      require('../../../asset/stores/player/corruptor/sad.png'),
    ],
    leaderBoardImages: require('../../../asset/stores/player/corruptor/speaking.png'),
    confirmationImages: [
      require('../../../asset/stores/player/corruptor/dice.png'),
      require('../../../asset/stores/player/corruptor/sadness.png'),
    ],
    color: '$error500',
  },
  {
    playerId: 'eda23c1b',
    playerName: 'Traveller',
    skill: 'Happy Go Round',
    skin: 'Once per turn, if you stop at tourist trap, you can travel to the next tourist trap on the map. (Do not collect salary if passing start)',
    gender: 'Female',
    image: require('../../../asset/stores/player/traveller/main.png'),
    profileImages: [
      require('../../../asset/stores/player/traveller/red.png'),
      require('../../../asset/stores/player/traveller/showJava.png'),
      require('../../../asset/stores/player/traveller/shutup.png'),
    ],
    leaderBoardImages: require('../../../asset/stores/player/traveller/money.png'),
    confirmationImages: [
      require('../../../asset/stores/player/traveller/happy.png'),
      require('../../../asset/stores/player/traveller/sad.png'),
    ],
    color: '$emerald400',
  },
  {
    playerId: 'ddd0861a',
    playerName: 'Businessman',
    skill: 'Tax Evasion',
    skin: 'Get 50% discount everytime you stop on tax block',
    gender: 'Male',
    image: require('../../../asset/stores/player/businessman/main.png'),
    profileImages: [
      require('../../../asset/stores/player/businessman/collectMoney2.png'),
      require('../../../asset/stores/player/businessman/showJava.png'),
      require('../../../asset/stores/player/businessman/speak.png'),
    ],
    leaderBoardImages: require('../../../asset/stores/player/businessman/collectMoney.png'),
    confirmationImages: [
      require('../../../asset/stores/player/businessman/happy.png'),
      require('../../../asset/stores/player/businessman/sad.png'),
    ],
    color: '$secondary400',
  },
  {
    playerId: '600da590',
    playerName: 'Office Worker',
    skill: 'Overtime Payment',
    skin: 'Everytime you pass start, get extra salary of 20.000',
    gender: 'Female',
    image: require('../../../asset/stores/player/officeWorker/main.png'),
    profileImages: [
      require('../../../asset/stores/player/officeWorker/closeEye.png'),
      require('../../../asset/stores/player/officeWorker/thinking.png'),
      require('../../../asset/stores/player/officeWorker/sad.png'),
    ],
    leaderBoardImages: require('../../../asset/stores/player/officeWorker/money.png'),
    confirmationImages: [
      require('../../../asset/stores/player/officeWorker/happy.png'),
      require('../../../asset/stores/player/officeWorker/sad.png'),
    ],
    color: '$yellow400',
  },
  {
    playerId: 'cbcb7269',
    playerName: 'Contractor',
    skill: 'Building Masterrrr',
    skin: 'Get 50% discount of constructing cost when you build villa or resort',
    gender: 'Male',
    image: require('../../../asset/stores/player/contractor/tired.png'),
    profileImages: [
      require('../../../asset/stores/player/contractor/car.png'),
      require('../../../asset/stores/player/contractor/other.png'),
      require('../../../asset/stores/player/contractor/happy.png'),
    ],
    leaderBoardImages: require('../../../asset/stores/player/contractor/main.png'),
    confirmationImages: [
      require('../../../asset/stores/player/contractor/other.png'),
      require('../../../asset/stores/player/contractor/confuse.png'),
    ],
    color: '$primary300',
  },
  {
    playerId: 'c87dd1a6',
    playerName: 'Celebrity',
    skill: 'Endorsement',
    skin: 'Once per turn, if you stop at a property that owned by other player, roll the dices, get 100% discount if you roll a double dice',
    gender: 'Female',
    image: require('../../../asset/stores/player/celebrity/main.png'),

    profileImages: [
      require('../../../asset/stores/player/celebrity/holiday.png'),
      require('../../../asset/stores/player/celebrity/makeup.png'),
      require('../../../asset/stores/player/celebrity/makingVideo.png'),
    ],
    leaderBoardImages: require('../../../asset/stores/player/celebrity/makingVideo.png'),
    confirmationImages: [
      require('../../../asset/stores/player/celebrity/selfies.png'),
      require('../../../asset/stores/player/celebrity/sad.png'),
    ],
    color: '$pink500',
  },
];

export const dataOtherPlayer: IdataOtherPlayer = {
  bank: {
    name: 'Bank',
    image: require('../../../asset/stores/otherPlayer/bank.png'),
    color: 'white',
  },
  tax: {
    name: 'Tax',
    image: require('../../../asset/stores/otherPlayer/tax.png'),
    color: 'black',
  },
};

export const initDataProfile: IdataProfile = {
  playerId: '',
  playerName: '',
  skill: '',
  skin: '',
  gender: '',
  image: '',
  profileImages: [],
  leaderBoardImages: '',
  confirmationImages: [],
  color: '',
};
