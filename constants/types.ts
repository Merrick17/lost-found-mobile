type ScreenProps = {
  navigation: any;
};
type ModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};
type HeaderProps = {
  title: string;
  navigation: any;
};
export type {ScreenProps, ModalProps,HeaderProps};
