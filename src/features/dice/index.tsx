import { StyleSheet, Dimensions } from 'react-native';
import React, { useState, useRef } from 'react';
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

  const showRandomDice = () => {
    const dice1 = Math.floor(Math.random() * 5);
    const dice2 = Math.floor(Math.random() * 5);
    setDices([dice1, dice2]);
    setTotal(dice1 + 1 + dice2 + 1);
  };

  return (
    <Box
      flex={1}
      rounded="$md"
      alignItems="center"
      bgColor="black"
      justifyContent="center"
      onTouchEnd={showRandomDice}>
      <Box flexDirection="row" justifyContent="space-evenly" w="$full" rounded="$md">
        <Image height={120} w={120} source={diceImages[dices[0]]} alt="dice1" />
        <Image height={120} w={120} source={diceImages[dices[1]]} alt="dice2" />
      </Box>
      <Text size="2xl" bold color="white" marginVertical={30}>
        {total}
      </Text>
      <Box>
        <Button action="secondary">
          <ButtonText> Tap Roller Dice</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};
