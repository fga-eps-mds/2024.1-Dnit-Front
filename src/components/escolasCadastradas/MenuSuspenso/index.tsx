import { ChangeEvent } from "react";
import { useSelectedValue } from "../../../context/Situacao";
import { SituacaoData } from "../../../models/service";

interface MenuSuspensoProps {
  situacoes: SituacaoData[];
  onClick: (value: string) => void;
  onClose: () => void;
  descricao: string;
}
const MenuSuspenso = ({
  situacoes,
  onClick,
  onClose,
  descricao,
}: MenuSuspensoProps) => {
  const { setSelectedValue, selectedValue } = useSelectedValue();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    onClick(selectedValue);
    onClose();
  };

  return (
    <div className="br-list" tabIndex={0}>
      {situacoes &&
        situacoes
          .filter((situacao) =>
            situacao.descricao
              .toLowerCase()
              .includes(selectedValue.toLowerCase())
          )
          .map((situacao) => (
            <div className="br-item" tabIndex={-1} key={situacao.id}>
              <div className="br-radio">
                <input
                  id={situacao.id.toString()}
                  type="radio"
                  name="estados-simples"
                  value={selectedValue ? selectedValue : situacao.descricao}
                  onChange={handleChange}
                  checked={
                    selectedValue
                      ? !!selectedValue
                      : situacao.descricao === descricao
                  }
                />
                <label htmlFor={situacao.id.toString()}>
                  {situacao.descricao}
                </label>
              </div>
            </div>
          ))}
      {!selectedValue && (
        <div className="br-item" tabIndex={-1}>
          <div className="br-radio">
            <input
              id="rb4"
              type="radio"
              name="estados-simples"
              value="Remover Situação"
              onChange={handleChange}
            />
            <label htmlFor="rb4">Remover Situação</label>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuSuspenso;
