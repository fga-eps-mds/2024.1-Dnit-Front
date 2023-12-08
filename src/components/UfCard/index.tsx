import "./styles.css";

export interface UfCardGroupProps {
  readonly cardsData: UfCardProps[];
}

export interface UfCardProps {
  readonly uf: string;
  readonly quantidadeEscolasTotal: number;
}

export default function UfCardGroup({ cardsData }: UfCardGroupProps) {
  return (
    <div className="select-cards-group">
      {cardsData.map((card) => (
        <UfCard
          uf={card.uf}
          quantidadeEscolasTotal={card.quantidadeEscolasTotal}
        />
      ))}
    </div>
  );
}

export function UfCard({ uf, quantidadeEscolasTotal }: UfCardProps) {
  return (
    <div className="uf-card">
      <span className="uf-card-title">{uf}</span>
      <span className="uf-card-info">
        {quantidadeEscolasTotal}{" "}
        {quantidadeEscolasTotal <= 1 ? "Escola" : "Escolas"}
      </span>
    </div>
  );
}
