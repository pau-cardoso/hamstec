import { storiesOf } from '@storybook/react-native';
import React from 'react';
import TableSection from './TableSection';

const headers = ['Area', 'Zona', 'Observaciones', 'Cantidad', 'Dispositivo', 'Costo U.', 'Importe'];
const flex = [1, 1, 2, 1, 3, 1, 1];
const tableData = [
  ['Entrada', 'Pasillo', 'Cerradura C1', '2', 'CERRADURA C1 WIFI', '$380.00', '$760.00'],
  ['Entrada', 'Pasillo', 'Cerradura C1', '2', 'CERRADURA C1 WIFI', '$380.00', '$760.00'],
  ['Entrada', 'Pasillo', 'Cerradura C1', '2', 'CERRADURA C1 WIFI', '$380.00', '$760.00'],
  ];

storiesOf('TableSection', module)
  .add('Default', () => (
    <TableSection
      section='General'
      headers={headers}
      data={tableData}
      flexArray={flex} />
  ));
