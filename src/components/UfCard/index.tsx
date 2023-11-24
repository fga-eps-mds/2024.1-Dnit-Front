import "./styles.css";

export interface SelectCardGroupProps {
  readonly cardsData: UfCardProps[];
}

export interface UfCardProps {
  readonly title: string;
  readonly info: string;
}

export default function UfCardGroup({ cardsData }: SelectCardGroupProps) {
  return (
    <div className="select-cards-group">
      {cardsData.map((card) => (
        <UfCard title={card.title} info={card.info} />
      ))}
    </div>
  );
}

export function UfCard({ title, info }: UfCardProps) {
  return (
    <div className="uf-card">
      <span className="uf-card-title">{title}</span>
      <span className="uf-card-info">{info}</span>
    </div>
  );
}
