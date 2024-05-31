import { Box, ExternalLinkIcon, Icon, Text, DownloadIcon } from '@gluestack-ui/themed';
import { FC } from 'react';

interface HistoryTransactionItemProps {
  title: string;
  type: string;
  dateTime: string;
  amount: number;
}

export const HistoryTransactionItem: FC<HistoryTransactionItemProps> = ({
  title,
  type,
  dateTime,
  amount,
}) => {
  const icon = type === 'transfer' ? ExternalLinkIcon : DownloadIcon;
  const color = type === 'transfer' ? '$error600' : '$success400';
  return (
    <Box
      flexDirection="row"
      borderBottomWidth={1}
      paddingVertical={5}
      gap={10}
      borderColor="$secondary300">
      <Icon as={icon} color={color} />
      <Box>
        <Text color="white" size="xs" bold>
          {title}
        </Text>
        <Text color="$secondary200" size="2xs">
          {dateTime}
        </Text>
        <Text color="$secondary200" size="2xs">
          {amount.toLocaleString()}
        </Text>
      </Box>
    </Box>
  );
};
