interface InputFilterProps {
	readonly valor?: string;
	readonly label?: string;
	readonly placeholder?: string;
	readonly dataTestId?: string;
	readonly onChange: (valor: string) => void;
}

export default function InputFilter(props: InputFilterProps) {
  return (
    <div className="d-flex flex-column ml-3 mt-5 mb-5">
      <label className="ml-2" style={{ textAlign: 'start', fontSize: '16px' }}>{props.label ?? "Nome"}:</label>
      <div className="d-flex" style={{ fontSize: '16px' }}>
        <div className="br-input large input-button">
          <input data-testid={props.dataTestId ?? "filtroNome"} className="br-input-search-large" type="search" placeholder={props.placeholder ?? "Nome"} value={props.valor}
            onChange={e => props.onChange(e.target.value)}
          />
          <button className="br-button" type="button" aria-label="Buscar" onClick={() => { }}>
            <i className="fas fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
}