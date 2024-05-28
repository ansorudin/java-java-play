import { Box } from '@gluestack-ui/themed';
import { Header } from '../../components/Header';
import { FC, useEffect, useState } from 'react';
import getRealm, { Histories, History as HistoryGames } from '../../components/schema/SchemaRealm';
import { CardHistory } from './components/CardHistory';
import { FlatList, ListRenderItemInfo, ScrollView } from 'react-native';

interface HistoryProps {
  buttonBack: () => void;
  playerId: string;
}

export const History: FC<HistoryProps> = ({ buttonBack, playerId }) => {
  const [histories, setHistories] = useState<HistoryGames[]>([]);
  useEffect(() => {
    const realm = getRealm();
    let dataHistories = realm.objectForPrimaryKey<Histories>('TransactionHistory', playerId);
    const data = dataHistories?.histories;
    if (data) {
      setHistories(Array.from(data));
    }
  }, [playerId]);

  return (
    <Box flex={1}>
      <Header title="History" buttonHeader={buttonBack} />
      <FlatList
        data={histories}
        renderItem={({ item }: ListRenderItemInfo<HistoryGames>) => (
          <ScrollView>
            <CardHistory
              playerName={item.playerName}
              playerImage={item.playerImage}
              transaction={item.transaction}
              amount={item.amount}
            />
          </ScrollView>
        )}
      />
    </Box>
  );
};
