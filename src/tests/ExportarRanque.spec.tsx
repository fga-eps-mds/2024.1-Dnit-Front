import React from 'react';
import { render, waitForElementToBeRemoved, fireEvent, screen, waitFor } from '@testing-library/react';
import ModalExportarRanque from '../components/ExportarRanqueModal';
import userEvent from '@testing-library/user-event';
import { CustomTableRow } from '../components/Table';

describe('ModalExportarRanque component', () => {
    const onCloseMock = jest.fn();
    const mockProps = {
      onClose: onCloseMock,
      ranqueId: 'exampleId',
    };
  
    test('renderiza ModalExportarRanque', () => {
      render(<ModalExportarRanque {...(mockProps as any)} />);
    });
  
    test('chama onClose quando fechar e clicado', () => {
      render(<ModalExportarRanque {...(mockProps as any)} />);
      fireEvent.click(screen.getByText('Fechar'));
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    test('verifica se ultimos processamentos está na tela uma única vez', () => {
        const { queryAllByText } = render(<ModalExportarRanque {...(mockProps as any)} />);
      
        const elements = queryAllByText('Últimos Processamentos:');
      
        expect(elements).toHaveLength(1);
      });
});

describe('ModalExportarRanque Component', () => {
  test('chama onDetailRow quando o ícone de detalhes é clicado', () => {
    const onDetailRowMock = jest.fn();
    const { getByTestId } = render(
      <CustomTableRow
        id={1}
        data={{ '0': 'data', '1': 'number' }}
        onDetailRow={onDetailRowMock}
      />
    );
  
    fireEvent.click(getByTestId('table-row-eye-1')); // Substitua "1" pelo id que você espera
    expect(onDetailRowMock).toHaveBeenCalledTimes(1);
  });
  
});


  