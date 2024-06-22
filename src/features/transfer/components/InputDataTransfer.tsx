import { Text, Box, Button, ButtonText, SelectItem } from '@gluestack-ui/themed';
import { Keyboard, TextInput } from 'react-native';
import { FC, useEffect, useState, useRef } from 'react';
import { InputSelect } from './InputSelect';
import { BalanceCard } from '../../../components/BalanceCard';
import { Header } from '../../../components/Header';
import { DataConfirmationProps } from '../../../components/Confirmation';
import getRealm, { Player } from '../../../components/schema/SchemaRealm';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { useGlobalStore } from '../../../stores';
import { IPlayer } from '../../../stores/type';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { IExpense } from '../../type';
import { TransferType } from '..';

interface TransferProps {
  navigateToConfirmation: (data: DataConfirmationProps) => void;
  handleBack: () => void;
  data: DataInputTransferProps;
}

export interface DataInputTransferProps extends IExpense {
  transferDestination: string;
}

export const InputDataTransfer: FC<TransferProps> = ({
  navigateToConfirmation,
  handleBack,
  data,
}) => {
  const { profiles } = useGlobalStore();
  const scrollViewRef = useRef<ScrollView>(null);
  const { transferDestination, playerName, playerId, saldo, image } = data;
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [player, setPlayer] = useState<string>('');
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [err, setErr] = useState<string>('');

  const handleInputNominal = (e: string) => {
    setAmount(e);
    if (Number(e) > saldo) {
      setErr('There is not enough money to allow this transaction');
    } else {
      setErr('');
    }
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
    const regex = /^[0-9]+$/;

    if (!regex.test(amount)) {
      setErr('Your input not number, please correct your number');
      return;
    }

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

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    });
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const renderPlayer = (listRenderItemInfo: ListRenderItemInfo<IPlayer>) => {
    const { id, username } = listRenderItemInfo.item;
    const dataPlayer = profiles.find(profile => profile.playerId === id);

    return <SelectItem label={`${dataPlayer?.playerName}  - ${username}`} value={id} />;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <Box flex={1}>
        <Header title={`Transfer to ${transferDestination}`} buttonHeader={handleBack} />
        <Box flex={1}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} ref={scrollViewRef}>
            <BalanceCard currentSaldo={data.saldo} cardHolder={data.playerName} />
            <Box
              height={200}
              gap={10}
              marginTop={20}
              display={transferDestination ? 'flex' : 'none'}
              marginHorizontal={3}>
              <Box display={transferDestination === TransferType.Other_Player ? 'flex' : 'none'}>
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
                  borderColor={err ? '$red400' : '$warmGray300'}
                  pl={10}
                  paddingVertical={10}
                  rounded={3}>
                  <TextInput
                    style={err ? { color: 'red' } : { color: 'black' }}
                    keyboardType="number-pad"
                    value={amount}
                    onChangeText={handleInputNominal}
                    placeholder="Exp. 200.000"
                  />
                </Box>
                <Text size="2xs" color="$red400" italic>
                  {err}
                </Text>
              </Box>

              <Box display={transferDestination === TransferType.Bank ? 'flex' : 'none'}>
                <InputSelect
                  underline
                  title="Description"
                  handleChangeValue={e => setDescription(e)}
                  placeHolder="Select Descriptions">
                  <SelectItem label="Excess Transfer" value="Excess Transfer" />
                  <SelectItem label="Other" value="Other" />
                </InputSelect>
              </Box>
            </Box>
          </ScrollView>
        </Box>
        <Button
          isDisabled={
            !amount ||
            Number(amount) === 0 ||
            Number(amount) > saldo ||
            (transferDestination === TransferType.Bank && !description) ||
            (transferDestination === TransferType.Other_Player && !player)
          }
          variant="solid"
          size="md"
          onPress={buttonNext}>
          <ButtonText size="sm" color="white">
            Next
          </ButtonText>
        </Button>
      </Box>
    </KeyboardAvoidingView>
  );
};
