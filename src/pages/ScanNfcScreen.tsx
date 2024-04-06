import React from 'react';
import { Container } from '../components/cores/Container';
import { ScanNfc } from '../features/scanNfc';

export const ScanNfcScreen = () => {
  return (
    <Container>
      <ScanNfc />
    </Container>
  );
};
