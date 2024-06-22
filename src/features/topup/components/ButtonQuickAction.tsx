import { Button, ButtonText } from '@gluestack-ui/themed';

interface PropsButtonQuickAction {
  buttonText: string;
  handleChangeAmount: (e: string) => void;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  price: string;
  display?: boolean;
}

export const ButtonQuickAction = (props: PropsButtonQuickAction) => {
  const { buttonText, handleChangeAmount, size, price, display } = props;
  return (
    <Button
      display={display ? 'flex' : 'none'}
      style={{
        maxWidth: 90,
      }}
      variant="solid"
      size={size ? size : 'sm'}
      bgColor="$coolGray200"
      height={size === 'xs' ? 60 : 70}
      onPress={() => handleChangeAmount(price)}>
      <ButtonText size="xs" color="$coolGray500">
        {buttonText}
      </ButtonText>
    </Button>
  );
};
