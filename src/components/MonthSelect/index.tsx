import React, { useState } from "react";
import "./styles.css";

type MonthSelectProps = {
  onMonthSelected: (data: string) => void;
  disabled: boolean;
};

const MonthSelect = ({ onMonthSelected, disabled }: MonthSelectProps) => {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const [selectedMonth, setSelectedMonth] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
    onMonthSelected(e.target.value);
  };

  return (
    <div className="custom-select">
      <select value={selectedMonth} onChange={handleChange} disabled={disabled}>
        <option value="">Selecione...</option>
        {months.map((month, index) => (
          <option key={index} value={month}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthSelect;
