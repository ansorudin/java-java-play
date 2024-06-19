import { Button, ButtonText } from '@gluestack-ui/themed';

interface PropsButtonQuickAction {
  buttonText: string;
  handleChangeAmount: () => void;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const ButtonQuickAction = (props: PropsButtonQuickAction) => {
  const { buttonText, handleChangeAmount, size } = props;
  return (
    <Button
      style={{
        maxWidth: 90,
      }}
      variant="solid"
      size={size ? size : 'sm'}
      bgColor="$coolGray200"
      height={size === 'xs' ? 60 : 70}
      onPress={handleChangeAmount}>
      <ButtonText size="xs" color="$coolGray500">
        {buttonText}
      </ButtonText>
    </Button>
  );
};
