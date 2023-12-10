import React, { useState, useEffect } from "react";
import Modal from "../../Modal";
import ReactLoading from "react-loading";
import SelectSchoolCard from "../../SelectSchoolCard";
import { fetchListarEscolasFiltradas } from "../../../service/escolaApi";
import {
  AtualizarPlanejamento,
  EscolaData,
  PlanejamentoMacroMesUpdate,
} from "../../../models/service";
import {
  InfoMesPlanejamentoMacro,
  EscolaPlanejamentoModel,
  PlanejamentoMacro,
} from "../../../models/gerenciarAcoes";
import { meses } from "../../../pages/gerencia/GerenciarAcoes/fixtures";
import { updatePlanejamento } from "../../../service/gerenciarAcoes";
import { notification } from "antd";

function converterParaEscolaPlanejamentoModel(
  escolaData: EscolaData
): EscolaPlanejamentoModel {
  return {
    id: escolaData.idEscola.toString(),
    ups: escolaData.numeroTotalDeDocentes,
    nome: escolaData.nomeEscola,
    uf: escolaData.siglaUf,
    quantidadeAlunos: escolaData.numeroTotalDeAlunos,
    distanciaPolo: escolaData.distanciaSuperintendencia,
  };
}

interface ModalProps {
  planejamento: PlanejamentoMacro;
  infoMes: InfoMesPlanejamentoMacro | undefined;
  onClose: () => void;
}

export default function ModalAdicionarEscola({
  planejamento,
  infoMes,
  onClose,
}: ModalProps) {
  const [escolasBanco, setEscolasBanco] = useState<EscolaData[]>([]);
  const [escolas, setEscolas] = useState<EscolaData[]>(escolasBanco);
  const [nome, setNome] = useState("");
  const [escolaSelecionada, setEscolaSelecionada] = useState<{
    [key: number]: boolean;
  }>({});
  const [listaEscolasSelecionadas, setListaEscolasSelecionadas] = useState<
    EscolaData[]
  >([]);
  const [mes] = useState<number>(infoMes?.mes ?? 1);

  useEffect(() => {
    fetchListarEscolasFiltradas({
      params: {
        Pagina: 1,
        TamanhoPagina: 10000,
        Nome: "",
        IdSituacao: "",
        IdMunicipio: "",
        IdUf: "",
      },
    }).then((escolas) => {
      setEscolasBanco(escolas.escolas);
      setEscolas(escolas.escolas);
    });
  }, []);

  useEffect(() => {
    setEscolas(
      escolasBanco.filter((index) =>
        index.nomeEscola.toLowerCase().includes(nome.toLowerCase())
      )
    );
  }, [nome]);

  useEffect(() => {
    const escolasFiltradas = escolasBanco.filter(
      (escola) => escolaSelecionada[escola.idEscola]
    );
    setListaEscolasSelecionadas(escolasFiltradas);
  }, [escolaSelecionada, escolasBanco]);

  if (!escolas) {
    return (
      <Modal className="modal-title" closeModal={() => onClose()}>
        <h4 className="text-center mt-2">Carregando Escolas...</h4>
        <div className="d-flex justify-content-center m-4">
          <ReactLoading type="spinningBubbles" color="#000000" />
        </div>
        <span></span>
      </Modal>
    );
  }

  return (
    <Modal className="default" closeModal={() => onClose()}>
      <div className="d-flex flex-column">
        <div
          style={{ position: "sticky", top: 0, background: "white", zIndex: 1 }}
        >
          <h4 className="text-center mt-1">Adicionar Escola</h4>

          <label className="text-center mt-1">
            A escola selecionada será adicionada ao mês de {meses[mes - 1]}
          </label>
          <div className="d-flex flex-column">
            <div
              className="br-input large input-button"
              style={{ width: "95%", fontSize: "16px", textAlign: "start" }}
            >
              <input
                data-testid={"Procurar escola"}
                className="br-input-search-large"
                type="search"
                placeholder={"Procure uma escola"}
                onChange={(e) => setNome(e.target.value)}
              />
              <button
                className="br-button"
                type="button"
                aria-label="Buscar"
                onClick={() => {}}
              >
                <i className="fas fa-search" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
        <br />

        <div
          className="d-flex flex-column"
          style={{ width: "95%", position: "relative", left: "2%" }}
        >
          {escolas?.map((escola, index) => (
            <div key={index}>
              <SelectSchoolCard
                schoolId={escola.idEscola}
                schoolName={escola.nomeEscola}
                schoolUf={escola.siglaUf}
                schoolStudents={escola.numeroTotalDeAlunos}
                isSelected={escolaSelecionada[escola.idEscola] || false}
                onClick={() => {
                  setEscolaSelecionada((prevState) => ({
                    ...prevState,
                    [escola.idEscola]: !prevState[escola.idEscola],
                  }));
                }}
              />
              <br />
            </div>
          ))}
        </div>
        <br />
        <br />

        <div
          className="d-flex justify-content-end mb-2"
          style={{
            position: "absolute",
            bottom: 0,
            right: "5%",
            height: "10%",
            width: "95%",
            backgroundColor: "white",
            zIndex: 1,
          }}
        >
          <div style={{ position: "relative", top: "20%" }}>
            <button
              className="br-button secondary mr-3"
              type="button"
              onClick={() => {
                setEscolaSelecionada({});
                onClose();
              }}
            >
              Cancelar
            </button>
            <button
              data-testId="Adicionar"
              className="br-button primary"
              type="button"
              onClick={async () => {
                const listaEscolaPlanejamentoModel: EscolaPlanejamentoModel[] =
                  listaEscolasSelecionadas.map(
                    converterParaEscolaPlanejamentoModel
                  );

                const newInfoPlanejamentoMacro =
                  planejamento?.planejamentoMacroMensal.map((e) => {
                    if (e === infoMes) {
                      infoMes.escolas = [
                        ...infoMes.escolas,
                        ...listaEscolaPlanejamentoModel,
                      ];
                    }
                    return e;
                  });

                var newPlanejamento = planejamento;
                newPlanejamento.planejamentoMacroMensal =
                  newInfoPlanejamentoMacro;

                let planejamentoMesesInfo: PlanejamentoMacroMesUpdate[] =
                  newPlanejamento!.planejamentoMacroMensal.map((element) => ({
                    mes: element.mes,
                    ano: element.ano,
                    escolas: element.escolas.map((escola) => escola.id),
                  }));

                let bodyRequest: AtualizarPlanejamento = {
                  nome: newPlanejamento!.nome,
                  planejamentoMacroMensal: planejamentoMesesInfo,
                };

                if (newPlanejamento) {
                  await updatePlanejamento(planejamento.id, bodyRequest)
                    .then((response) => {
                      notification.success({
                        message:
                          "Escolas Adicionas ao Planejamento com Sucesso!",
                      });

                      planejamento = response;
                    })
                    .catch((error) => {
                      console.log(error);
                      notification.error({
                        message: "Falha em Adicionar Escolas ao Planejamento.",
                      });
                    });
                }
                onClose();
              }}
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
