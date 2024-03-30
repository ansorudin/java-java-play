import { Button, ButtonText } from '@gluestack-ui/themed';

interface PropsButtonQuickAction {
  buttonText: string;
  handleChangeAmount: () => void;
}

export const ButtonQuickAction = (props: PropsButtonQuickAction) => {
  const { buttonText, handleChangeAmount } = props;
  return (
    <Button
      variant="solid"
      size="sm"
      bgColor="$coolGray200"
      height={70}
      onPress={handleChangeAmount}>
      <ButtonText size="xs" color="$coolGray500">
        {buttonText}
      </ButtonText>
    </Button>
  );
};
