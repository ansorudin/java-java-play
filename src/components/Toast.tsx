import {
  useToast,
  Button,
  Toast,
  VStack,
  ToastTitle,
  ToastDescription,
  ButtonText,
} from '@gluestack-ui/themed';

export const SnackBar = () => {
  const toast = useToast();
  toast.show({
    placement: 'top',
    render: ({ id }) => {
      const toastId = 'toast-' + id;
      return (
        <Toast nativeID={toastId} action="error" variant="solid">
          <VStack space="xs" flex={1}>
            <ToastTitle>New Message</ToastTitle>
            <ToastDescription>
              Hey, just wanted to touch base and see how you're doing. Let's catch up soon!
            </ToastDescription>
          </VStack>
        </Toast>
      );
    },
  });
};
