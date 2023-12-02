import { useState } from "react";
import Footer from "../../../../components/Footer";
import Header from "../../../../components/Header";
import TrilhaDeNavegacao from "../../../../components/Navegacao";
import "./styles.css";
import { ButtonComponent } from "../../../../components/Button";
import MonthSelect from "../../../../components/MonthSelect";
import PlanejamentoInfo from "../PlanejamentoInfo";
export default function GerenciarAcoes() {
  const paginas = [
    { nome: "Gerenciar Ações", link: "/gerenciarAcoes" },
    { nome: "Criar Planejamento", link: "/gerenciarAcoes/criarPlanejamento" },
  ];

  const meses = [
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

  const [savedTitle, setSavedTitle] = useState("");
  const [title, setTitle] = useState("");
  const [initialMonth, setInitialMonth] = useState("");
  const [qtdActions, setQtdActions] = useState(0);
  const [finalMonth, setFinalMonth] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    initialMonth: "",
    finalMonth: "",
    qtdActions: "",
  });

  const [isPlanningGenerated, setIsPlanningGenerated] = useState(false);

  const validateForm = () => {
    var isValid = true;
    const newErrors = {
      name: "",
      initialMonth: "",
      finalMonth: "",
      qtdActions: "",
    };

    if (title.trim() === "") {
      newErrors.name = "O nome é obrigatório";
      isValid = false;
    } else if (title.length < 4) {
      newErrors.name =
        "O nome do planejamento deve conter pelo menos 5 caracteres";
      isValid = false;
    } else {
      newErrors.name = "";
    }

    if (initialMonth === "") {
      newErrors.initialMonth = "Selecione um mês";
      isValid = false;
    } else {
      newErrors.initialMonth = "";
    }

    if (finalMonth === "") {
      newErrors.finalMonth = "Selecione um mês";
      isValid = false;
    } else {
      newErrors.finalMonth = "";
    }

    if (meses.indexOf(finalMonth) < meses.indexOf(initialMonth)) {
      newErrors.finalMonth = "O mês final deve ser posterior ao mês inicial";
      isValid = false;
    } else {
      newErrors.finalMonth = "";
    }

    if (!qtdActions) {
      newErrors.qtdActions = "Escolha a quantidade de ações";
      isValid = false;
    } else {
      newErrors.qtdActions = "";
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Envie a solicitação para o servidor
      console.log("Envio da request");
      setIsPlanningGenerated(true);
      setSavedTitle(title);
    }
  };

  const updatePlanning = () => {
    // Enviar request para update do nome
    setSavedTitle(title);
  };

  return (
    <div className="App">
      <div>
        <Header />
        <TrilhaDeNavegacao elementosLi={paginas} />

        <div className="content">
          <div className="planejamento-form">
            <div className="br-input planejamento-input-large">
              <label>Título</label>
              <input
                id="input-default"
                data-testid="inputTitulo"
                type={"text"}
                readOnly={false}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <span className="error">{errors.name}</span>
            </div>
            <div className="br-input planejamento-input">
              <label>Mês inicial</label>
              <MonthSelect
                onMonthSelected={(month) => setInitialMonth(month)}
                disabled={isPlanningGenerated}
              />
              <span className="error">{errors.initialMonth}</span>
            </div>
            <div className="br-input planejamento-input">
              <label>Mês final</label>
              <MonthSelect
                onMonthSelected={(month) => setFinalMonth(month)}
                disabled={isPlanningGenerated}
              />
              <span className="error">{errors.finalMonth}</span>
            </div>
            <div className="br-input planejamento-input">
              <label>Quantidade de Ações</label>
              <input
                id="input-default"
                type={"text"}
                disabled={isPlanningGenerated}
                onChange={(e) => setQtdActions(Number(e.target.value))}
                data-testid="qtd-actions-field"
                value={qtdActions}
              />
              <span className="error">{errors.qtdActions}</span>
            </div>
          </div>

          {isPlanningGenerated ? null : (
            <div className="planning-button">
              <ButtonComponent
                label="Criar Planejamento"
                buttonStyle="outlined"
                buttonType="default"
                padding="37px"
                onClick={() => handleSubmit()}
              />
            </div>
          )}

          {isPlanningGenerated && savedTitle !== title ? (
            <div className="planning-button">
              <ButtonComponent
                label="Salvar"
                buttonStyle="primary"
                buttonType="default"
                padding="37px"
                onClick={() => updatePlanning()}
              />
            </div>
          ) : null}

          {isPlanningGenerated ? <PlanejamentoInfo /> : null}
        </div>
      </div>

      <div className="page-footer">
        <Footer />
      </div>
    </div>
  );
}
