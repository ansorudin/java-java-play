import { useState } from 'react';
import { Box, Text, Button, ButtonText, Image } from '@gluestack-ui/themed';
import { FC } from 'react';

interface DiceProps {
  buttonBack: () => void;
}

const diceImages = [
  require('./assets/dice-1.png'),
  require('./assets/dice-2.png'),
  require('./assets/dice-3.png'),
  require('./assets/dice-4.png'),
  require('./assets/dice-5.png'),
  require('./assets/dice-6.png'),
];

export const Dice: FC<DiceProps> = () => {
  const [dices, setDices] = useState([0, 1]);
  const [total, setTotal] = useState<any>(null);
  const [show, setShow] = useState<boolean>(false);

  const rollerDice = () => {
    setShow(true);
  };

  const showRandomDice = () => {
    const dice1 = Math.floor(Math.random() * 5);
    const dice2 = Math.floor(Math.random() * 5);
    setDices([dice1, dice2]);
    setTotal(dice1 + 1 + dice2 + 1);
    setShow(false);
  };

  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Box
        h={120}
        flexDirection="row"
        justifyContent="space-evenly"
        w="$full"
        rounded="$xs"
        display={show ? 'flex' : 'none'}>
        <Image height={120} w={120} source={require('./assets/dice-game.gif')} alt="dice2" />
        <Image height={120} w={120} source={require('./assets/dice-game.gif')} alt="dice2" />
      </Box>

      <Box
        h={120}
        flexDirection="row"
        justifyContent="space-evenly"
        w="$full"
        rounded="$xs"
        display={show ? 'none' : 'flex'}>
        <Image
          height={100}
          w={100}
          source={diceImages[dices[0]]}
          alt="dice1"
          borderWidth={2}
          rounded="$lg"
        />
        <Image
          height={100}
          w={100}
          source={diceImages[dices[1]]}
          alt="dice2"
          borderWidth={2}
          rounded="$lg"
        />
      </Box>
      <Text size="2xl" bold marginVertical={30}>
        {total}
      </Text>
      <Box>
        <Button action="secondary" onTouchEnd={rollerDice} display={show ? 'none' : 'flex'}>
          <ButtonText> Tap Roller Dice</ButtonText>
        </Button>
        <Button action="secondary" onTouchEnd={showRandomDice} display={show ? 'flex' : 'none'}>
          <ButtonText> Show Random Dice</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};
