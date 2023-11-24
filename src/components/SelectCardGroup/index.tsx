import { useState } from "react";
import "./styles.css";

export interface SelectCardProps {
  readonly id: number;
  readonly title: string;
  readonly info: string[];
  readonly selected?: boolean;
  readonly onClick: (id: number) => void;
}

export interface SelectCardGroupProps {
  readonly cardsData: {
    readonly id: number;
    readonly title: string;
    readonly info: string[];
  }[];
}

export default function SelectCardGroup({ cardsData }: SelectCardGroupProps) {
  const [selectedCard, setSelectedCard] = useState(cardsData[0].id);

  const handleCardClick = (cardId: number) => {
    setSelectedCard(cardId);
  };

  return (
    <div className="select-cards-group">
      {cardsData.map((card) => (
        <SelectCard
          {...card}
          selected={selectedCard === card.id}
          onClick={handleCardClick}
        />
      ))}
    </div>
  );
}

export function SelectCard({
  id,
  title,
  info,
  selected = false,
  onClick,
}: SelectCardProps) {
  return (
    <div
      className={selected ? "select-card selected" : "select-card"}
      onClick={() => onClick(id)}
    >
      <p className="card-title">{title}</p>
      <div className="card-info">
        {info.map((item) => (
          <span className="card-info-item">{item}</span>
        ))}
      </div>
    </div>
  );
}
