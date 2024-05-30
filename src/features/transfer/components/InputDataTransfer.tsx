import { Text, Box, Button, ButtonText, SelectItem } from '@gluestack-ui/themed';
import { TextInput } from 'react-native';
import { FC, useEffect, useState } from 'react';
import { InputSelect } from './InputSelect';
import { BalanceCard } from '../../../components/BalanceCard';
import { Header } from '../../../components/Header';
import { DataConfirmationProps } from '../../../components/Confirmation';
import { DataTransferProps } from '..';
import getRealm, { Player } from '../../../components/schema/SchemaRealm';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { useGlobalStore } from '../../../stores';
import { IPlayer } from '../../../stores/type';

interface TransferProps {
  navigateToConfirmation: (data: DataConfirmationProps) => void;
  handleBack: () => void;
  data: DataInputTransferProps;
}
export interface DataInputTransferProps extends DataTransferProps {
  transferDestination: string;
}

export const InputDataTransfer: FC<TransferProps> = ({
  navigateToConfirmation,
  handleBack,
  data,
}) => {
  const { profiles } = useGlobalStore();
  const { transferDestination, playerName, playerId, saldo, image } = data;
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [player, setPlayer] = useState<string>('');
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const handleInputNominal = (e: string) => {
    setAmount(e);
  };

  useEffect(() => {
    try {
      const realm = getRealm();
      const dataPlayers = realm.objects<Player>('PlayerGame').filter(item => item.id !== playerId);
      setPlayers(Array.from(dataPlayers));
    } catch (error) {
      console.log(error);
    }
  }, [playerId]);

  const buttonNext = () => {
    const datas: DataConfirmationProps = {
      playerId,
      playerName: playerName,
      playerImage: image,
      recipients: player,
      description,
      amount: parseInt(amount),
      transaction: 'Transfer to ' + transferDestination,
      saldo,
    };
    navigateToConfirmation(datas);
  };

  const renderPlayer = (listRenderItemInfo: ListRenderItemInfo<IPlayer>) => {
    const { id, username } = listRenderItemInfo.item;
    const dataPlayer = profiles.find(profile => profile.playerId === id);

    return <SelectItem label={`${dataPlayer?.playerName}  - ${username}`} value={id} />;
  };

  return (
    <Box flex={1}>
      <Header title={`Transfer to ${transferDestination}`} buttonHeader={handleBack} />
      <Box flex={1}>
        <BalanceCard currentSaldo={data.saldo} cardHolder={data.playerName} />

        <Box
          height={200}
          gap={10}
          marginTop={20}
          display={transferDestination ? 'flex' : 'none'}
          marginHorizontal={3}>
          <Box display={transferDestination === 'player' ? undefined : 'none'}>
            <InputSelect
              underline
              title="Recipient"
              handleChangeValue={e => setPlayer(e)}
              placeHolder="Select Player">
              <FlatList data={players} renderItem={renderPlayer} />
            </InputSelect>
          </Box>

          <Box gap={10}>
            <Text bold>Amount</Text>
            <Box
              borderBottomWidth={1}
              borderColor="$warmGray300"
              pl={10}
              paddingVertical={10}
              rounded={3}>
              <TextInput
                keyboardType="number-pad"
                value={amount}
                onChangeText={handleInputNominal}
                placeholder="Exp. 200.000"
              />
            </Box>
          </Box>

          <Box display={transferDestination === 'bank' ? undefined : 'none'}>
            <InputSelect
              underline
              title="Description"
              handleChangeValue={e => setDescription(e)}
              placeHolder="Select Descriptions">
              <SelectItem label="Purchase Asset" value="Purchase Asset" />
              <SelectItem label="Excess Transfer" value="Excess Transfer" />
              <SelectItem label="Other" value="Other" />
            </InputSelect>
          </Box>
        </Box>
      </Box>
      <Button
        isDisabled={
          !amount ||
          (transferDestination === 'bank' && !description) ||
          (transferDestination === 'player' && !player)
        }
        variant="solid"
        size="md"
        onPress={buttonNext}>
        <ButtonText size="sm" color="white">
          Next
        </ButtonText>
      </Button>
    </Box>
  );
};
