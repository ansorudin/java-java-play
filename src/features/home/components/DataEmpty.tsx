import { Button, Image, ButtonText, Text, Box } from '@gluestack-ui/themed';
import { FC } from 'react';
import { IPlayer } from '../../../stores/type';

interface DataEmptyProps {
  dataPlayer: IPlayer[];
  buttonScan: () => void;
}

export const DataEmpty: FC<DataEmptyProps> = ({ buttonScan, dataPlayer }) => {
  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="space-around"
      display={dataPlayer.length > 0 ? 'none' : 'flex'}>
      <Box alignItems="center">
        <Text size="4xl" bold color="$primary300">
          Welcome To
        </Text>
        <Text size="2xl" bold color="$primary200">
          JavaJava Play
        </Text>
      </Box>
      <Image w={280} h={280} source={require('../../../../asset/search.png')} alt="icon" />
      <Button onPress={buttonScan} variant="solid" gap="$1">
        <ButtonText>Scan To New Player</ButtonText>
      </Button>
    </Box>
  );
};
