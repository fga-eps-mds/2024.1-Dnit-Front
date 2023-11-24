import { useEffect, useRef, useState } from "react";
import "../Select/styles.css";

interface MultiSelectOptions {
  id: string;
  rotulo: string;
}

interface MultiSelectProps {
  readonly items: MultiSelectOptions[];
  readonly value: string[];
  readonly label?: string;
  readonly inputStyle?: object;
  readonly dropdownStyle?: object;
  readonly buttonStyle?: object;
  readonly labelStyle?:object;
  readonly onChange: (id: string[]) => void;
  readonly filtrarTodos?: boolean;
  readonly definePlaceholder?: string;
  readonly readOnly?: boolean;
  readonly errorMessage?: string;
}

export default function MultiSelect({ items, value, label, onChange, inputStyle, dropdownStyle, buttonStyle, labelStyle, filtrarTodos, definePlaceholder, readOnly, errorMessage}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [novaLista, setNovaLista] = useState<MultiSelectOptions[]>([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const itemIsSelected = (itemId: string) => {
    return value.includes(itemId);
  }

  const handleItemClick = (itemId: string) => {
    const all = value.findIndex(id => id === "");
    if (itemId === "") {
      if (all !== -1) onChange([]);
      else onChange([""]);
    }
    else
    {
      if (all !== -1) value = novaLista.filter(item => item.id !== "").map(item => item.id);

      onChange(itemIsSelected(itemId) ? 
        value.filter((id) => id !== itemId)
        : [...value, itemId]
      );
    }
  };

  const getRotulos = (ids: string[], items: MultiSelectOptions[]) => {
    const rotulos = items.filter(item => ids.includes(item.id)).map(item => item.rotulo);
    return rotulos;
  }

  useEffect(() => {

    if (filtrarTodos) { 
      const concatLista = [{ id: "", rotulo: "Todos" }].concat(items); 
      setNovaLista(concatLista);
    }
    else
      setNovaLista(items);
  }, [items])

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fechaDropdown = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', fechaDropdown);

    return () => {
      document.removeEventListener('mousedown', fechaDropdown);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="profile-type-select br-select" style={{ flexBasis: "90%" }}>
      <div className="br-input ">
        <label className="profile-type-label ml-2" style={labelStyle} htmlFor="select-multtiple">{label}</label>
        <div className="br-input large input-button">
          <input id="select-multtiple" type="text" placeholder={definePlaceholder} value={getRotulos(value, novaLista).join(', ')} style={inputStyle} readOnly={readOnly} />
          {!readOnly && <button data-testid={`${label}customSelect`} className="br-button" type="button" aria-label="Exibir lista" tabIndex={-1} data-trigger="data-trigger" onClick={toggleDropdown} style={buttonStyle}>
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </button>}
        </div>
        {errorMessage &&
        <div className="erro">
            <p>{errorMessage}</p>
        </div>}
      </div>
      {isOpen &&
        <div className="br-list2" style={dropdownStyle} tabIndex={0}>
          {novaLista.map((item, index) => (
            <div key={index} className="br-item" tabIndex={-1} data-all="data-all" onKeyDown={() => { }}>
              <div className="br-checkbox">
                <input id={`cbs${index}`} data-testid={`cbs${index}`} type="checkbox" name="estados-multtiple" value={item.rotulo} checked={itemIsSelected("") || itemIsSelected(item.id)} 
                  onClick={() => handleItemClick(item.id)} onChange={() => { }} />
                <label htmlFor={`cbs${index}`}>{item.rotulo}</label>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
}