import { Box } from '@gluestack-ui/themed';
import { Header } from '../../components/Header';
import { FC, useEffect, useState } from 'react';

import { CardHistory } from './components/CardHistory';
import { FlatList, ListRenderItemInfo, ScrollView } from 'react-native';
import { useGlobalStore } from '../../stores';
import { History as HistoryGames, HistoryPlayer } from '../../stores/type';

interface HistoryProps {
  buttonBack: () => void;
  playerId: string;
}

export const History: FC<HistoryProps> = ({ buttonBack, playerId }) => {
  const { histories } = useGlobalStore();
  const [historyPlayer, setHistoryPlayer] = useState<HistoryGames[]>([]);
  useEffect(() => {
    const dataHistories = histories.find((history: HistoryPlayer) => history.id === playerId);

    if (dataHistories) {
      setHistoryPlayer(dataHistories.history);
    } else {
      setHistoryPlayer([]);
    }
  }, [histories, playerId]);

  return (
    <Box flex={1}>
      <Header title="History" buttonHeader={buttonBack} />
      <FlatList
        data={historyPlayer}
        keyExtractor={(item, index) => index.toLocaleString()}
        renderItem={({ item }: ListRenderItemInfo<HistoryGames>) => (
          <ScrollView>
            <CardHistory
              playerName={item.playerName || '-'}
              playerImage={item.image}
              transaction={item.transaction}
              amount={item.amount}
              type={item.type}
              color={item.color}
            />
          </ScrollView>
        )}
      />
    </Box>
  );
};
