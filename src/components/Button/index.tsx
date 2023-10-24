import "./Style.css";

interface IButtonProps {
  label?: string;
  icon?: string;
  buttonStyle?: "primary" | "outlined" | "none"; //usado
  buttonType?: "default" | "circular" | "block"; //usado
  disabled?: boolean;
  padding?: string;
  onClick?: () => void;
}

export const ButtonComponent = (props: IButtonProps) => {
  const { buttonType } = props;
  switch (buttonType) {
    case "default":
      return <DefaultButton {...props} />;
    case "circular":
      return <CircularButton {...props} />;
    case "block":
      return <BlockButton {...props} />;
    default:
      return <DefaultButton {...props} />;
  }
};

const DefaultButton = (props: IButtonProps) => {
  let { icon, buttonStyle, onClick, label, padding } = props;

  return (
    <button
      {...props}
      className={`br-button ${buttonStyle}-button`}
      type="button"
      aria-label="Ícone ilustrativo"
      onClick={onClick}
      style={{ paddingInline: padding }}
    >
      <div className="button-row">
        {icon && <i className={`${icon} ${buttonStyle}-text`} />}
        <span className={`${buttonStyle}-text`}>{label}</span>
      </div>
    </button>
  );
};

const CircularButton = (props: IButtonProps) => {
  let { icon, buttonStyle, onClick } = props;

  return (
    <button
      {...props}
      className={`br-button ${buttonStyle}-button circle-button`}
      type="button"
      onClick={onClick}
      aria-label="Ícone ilustrativo"
    >
      {icon && <i className={`${icon} ${buttonStyle}-text circle-icon`} />}
    </button>
  );
};

const BlockButton = (props: IButtonProps) => {
  let { icon, buttonStyle, onClick, label } = props;

  return (
    <button
      className={`br-button block ${buttonStyle}-button`}
      type="button"
      onClick={onClick}
    >
      <div className="button-row">
        {icon && <i className={`${icon} ${buttonStyle}-text`} />}
        <span className={`${buttonStyle}-text`}>{label}</span>
      </div>
    </button>
  );
};
