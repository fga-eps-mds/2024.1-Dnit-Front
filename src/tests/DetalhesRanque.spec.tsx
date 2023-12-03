import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ModalDetalhesRanque from '../components/DetalhesRanqueModal';
import formatDate from '../components/DetalhesRanqueModal';
import { RanqueData } from '../models/ranque';

describe('test DetalhesRanqueModal', () => {
  it('o componente abre', () => {
    const mockRanque: RanqueData = {
        id: 1,
        numEscolas: 5,
        data: '2023-12-01T08:00:00.000Z',
        descricao: 'Descrição do ranque mock',
        fatores: [
          { nome: 'Fator 1', peso: 0.5, valor: 10 },
          { nome: 'Fator 2', peso: 0.3, valor: 8 },
        ],
      };
    
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const padZeros = (n: number) => n.toString().padStart(2, '0');
        return `${padZeros(date.getDate())}/${padZeros(date.getMonth())}/${date.getFullYear()} ${padZeros(date.getHours())}:${padZeros(date.getMinutes())}`
    }
      
    const fechar = jest.fn();
    const editarDescricao = jest.fn();

    const { getByText, getByLabelText } = render(
      <ModalDetalhesRanque
        ranque={mockRanque}
        onClose={fechar}
        onEditDescription={editarDescricao}
      />
    );

    expect(getByText(`Detalhes do Ranque`)).toBeInTheDocument();
    expect(getByText(`Data e hora do processamento:`)).toBeInTheDocument();
    expect(getByText(`${formatDate(mockRanque.data)}`)).toBeInTheDocument();
    expect(getByText(`Número de escolas:`)).toBeInTheDocument();
    expect(getByText(`${mockRanque.numEscolas}`)).toBeInTheDocument();
    expect(getByText(`Fatores do processamento:`)).toBeInTheDocument();
    mockRanque.fatores.forEach((fator) => {
        expect(getByText(`Fator ${fator.nome}, Peso ${fator.peso}, Valor ${fator.valor}`)).toBeInTheDocument();
    });
    expect(getByText(`Descrição do Ranque:`)).toBeInTheDocument();
    expect(getByText(`${mockRanque.descricao}`)).toBeInTheDocument();
  });

  it('onClose e chamada quando "Fechar" e clicado', () => {
    const mockRanque: RanqueData = {
      id: 1,
      numEscolas: 5,
      data: '2023-12-01T08:00:00.000Z',
      descricao: 'Descrição do ranque mock',
      fatores: [
        { nome: 'Fator 1', peso: 0.5, valor: 10 },
        { nome: 'Fator 2', peso: 0.3, valor: 8 },
      ],
    };
    const onCloseMock = jest.fn();

    const { getByText } = render(
      <ModalDetalhesRanque
        ranque={mockRanque}
        onClose={onCloseMock}
        onEditDescription={jest.fn()}
      />
    );

    fireEvent.click(getByText('Fechar'));

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('alterna descrição entre modo de edição e exibição', async () => {
    const mockRanque: RanqueData = {
      id: 1,
      numEscolas: 5,
      data: '2023-12-01T08:00:00.000Z',
      descricao: 'Descrição do ranque mock',
      fatores: [
        { nome: 'Fator 1', peso: 0.5, valor: 10 },
        { nome: 'Fator 2', peso: 0.3, valor: 8 },
      ],
    };

    const { getByText } = render(
      <ModalDetalhesRanque
        ranque={mockRanque}
        onClose={jest.fn()}
        onEditDescription={jest.fn()}
      />
    );

    const editarDescricao = getByText('Editar Descrição');
    fireEvent.click(editarDescricao);

    await waitFor(() => {
      const textArea = document.querySelector('textarea');
      expect(textArea).toBeInTheDocument();
    });

    fireEvent.click(getByText('Salvar Descrição'));

    await waitFor(() => {
      const labelElement = document.querySelector('label');
      expect(labelElement).toBeInTheDocument();
    });
  });
});
 