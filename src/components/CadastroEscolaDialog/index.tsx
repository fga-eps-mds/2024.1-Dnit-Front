import { useEffect, useState } from "react";
import { Button, Form, Input, Select, Space, notification } from "antd";
import Modal from "../Modal";
import ReactLoading from "react-loading";
import { fetchAtualizaTipoPerfil } from "../../service/usuarioApi";
import { UsuarioModel } from "../../models/usuario";
import { fetchEtapasDeEnsino, fetchMunicipio, fetchUnidadeFederativa, sendCadastroEscolas } from "../../service/escolaApi";
import { SolicitacoesData } from "../../models/solicitacoes";
import { fetchCEP } from "../../service/apiUtils";
import { FilterOptions } from "../../pages/gerencia/GerenciarUsuario";
import "./styles.css";

interface CadastroEscolaDialogProps {
  dadosSoliciatacao?: SolicitacoesData;
  closeDialog: (edicao: boolean) => void;
}

export function CadastroEscolaDialog({ closeDialog, dadosSoliciatacao }: CadastroEscolaDialogProps) {
  const [loading, setLoading] = useState(false);
  const [listaMunicipios, setListaMunicipios] = useState<FilterOptions[]>([]);
  const [listaUfs, setListaUfs] = useState<FilterOptions[]>([]);
  const [OpcoesEtapasDeEnsino, setOpcoesEtapasDeEnsino] = useState<{ value: number; label: string }[]>([]);
  const [notificationApi, contextHolder] = notification.useNotification();
  const [uf, setUF] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [form] = Form.useForm();
  const [erroCEP, setErroCEP] = useState(false);
  const [cepEnviado, setCepEnviado] = useState('0');
  const [qtdAlunos, setQtdAlunos] = useState(1);
  const regras = [
    {
      required: true,
      message: "Preencha o campo ${label}!",
    },
  ];
  const regrasLatitude = [
    {
      required: false,
      pattern: /^-?([1-8]?\d|90)(.\d{1,15})?$/,
      message: "Deve estar entre -90 e +90 e até 15 decimais, utilizando ponto",
    },
  ];

  const regrasLongitude = [
    {
      required: false,
      pattern: /^-?((1?[0-7]|[0-9])?\d|180)(.\d{1,15})?$/,
      message:
        "Deve estar entre -180 e +180 e até 15 decimais, utilizando ponto",
    },
  ];

  const regrasCodigoEscola = [
    {
      required: true,
      pattern: /^\d{8}$/,
      message: "O código deve conter 8 digitos",
    },
  ];

  const regrasTelefone = [
    {
      required: true,
      pattern: /^\d{10,11}$/,
      message: "O telefone deve conter DDD + 9 ou 8 digitos",
    },
  ];

  const regrasNumeroAlunoDocentes = [
    {
      required: true,
      pattern: /^[1-9]\d*$/,
      message: "Deve conter apenas números",
    },
  ];

  const regrasCEP = [
    {
      required: true,
      pattern: /^\d{8}$/,
      message: "CEP inválido",
    },
  ];

  const consultaCEP = async (cep: string) => {
    try {
      if (cep.length === 8) {
        const res = await fetchCEP(cep);
        if (res.erro) {
          setErroCEP(false);
          form.setFields([
            {
              name: "cep",
              errors: ["CEP não encontrado"],
            },
          ]);
          setCepEnviado("0");
        } else {
          setErroCEP(true);
          form.setFieldsValue({
            endereco: res.logradouro,
            municipio: res.localidade,
            uf: res.uf,
          });
          setMunicipio(res.ibge);
          setUF(`${procuraIdUf(res.uf)}`);
          setCepEnviado(cep);
        }
      } else {
        setErroCEP(false);
      }
    } catch (error) { }
  };

  const consultaEtapasDeEnsino = async () => {
    try {
      const resposta = await fetchEtapasDeEnsino();
      const etapas = resposta.map((e) => ({ label: e.descricao, value: e.id }));
      setOpcoesEtapasDeEnsino(etapas);
    } catch (error) { }
  };

  const limpaMunicipio = () => {
    form.setFieldValue("municipio", undefined);
  };

  async function fetchUf(): Promise<void> {
    const listaUfs = await fetchUnidadeFederativa();
    const novaUf = listaUfs.map((u) => ({ id: '' + u.id, rotulo: u.sigla }));
    setListaUfs(novaUf);
  }

  async function fetchMunicipios(): Promise<void> {
    const listaMunicipios = await fetchMunicipio(Number(uf));
    const novoMunicipio = listaMunicipios.map((u) => ({ id: '' + u.id, rotulo: u.nome }));
    setListaMunicipios(novoMunicipio);
  }

  function procuraIdUf(rotulo: string) {
    return listaUfs.find((uf) => uf.rotulo === '' + rotulo)?.id;
  }

  const sendCadastro = async (values: any) => {

    if (!values.latitude) {
      values.latitude = "0";
    }

    if (!values.longitude) {
      values.longitude = "0";
    }

    const registroEscola = {
      NomeEscola: values.nome,
      IdRede: values.rede,
      CodigoEscola: values.codigo,
      IdUf: Number(uf),
      Cep: cepEnviado,
      Telefone: values.telefone,
      IdEtapasDeEnsino: values.ciclos,
      IdPorte: values.porte,
      Endereco: values.endereco,
      IdMunicipio: Number(municipio),
      IdLocalizacao: values.localizacao,
      Longitude: values.longitude,
      Latitude: values.latitude,
      NumeroTotalDeAlunos: qtdAlunos,
      NumeroTotalDeDocentes: values.numeroDocentes,
    };

    try {
      console.log(registroEscola);
      await sendCadastroEscolas(registroEscola);
      notification.success({ message: "Cadastro feito!" });
      closeDialog(true);
    } catch (error) {
      notificationApi.error({ message: "Erro ao fazer o cadastro" });
    }
  };

  useEffect(() => {
    fetchUf();
    console.log(dadosSoliciatacao);
    form.setFieldValue("nome", dadosSoliciatacao?.nome.toUpperCase());
    form.setFieldValue("uf", 'DF');
    setUF('27');
    form.setFieldValue("municipio", 'Brasília');
    setMunicipio("5300108");
    form.setFieldValue("numeroAlunos", dadosSoliciatacao?.quantidadeAlunos);
    setQtdAlunos(Number(dadosSoliciatacao?.quantidadeAlunos))
  }, [])

  useEffect(() => {
    fetchMunicipios();
  }, [uf]);

  return (
    <div
      className="overlay "
      data-testid="overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeDialog(true);
        }
      }}
      onKeyDown={() => { }}
    >
      <div className="custom-modal" style={{ width: "90%" }}>
        {contextHolder}
        <div >
          <h2>Cadastrar Escola</h2>
          <Form
            form={form}
            onFinish={sendCadastro}
            name="Cadastro Escola"
            layout="vertical"
            autoComplete="off"
            className="form-email"
            preserve
          >
            <div className="divScroll">
              <div className="bloco">
                <Form.Item name="nome" label="Nome da Escola" rules={regras}>
                  <Input 
                  type="text"
                  className="inputForm2" 
                  value={"dadosSoliciatacao?.nomeSolicitante"}
                  />
                </Form.Item>

                <Form.Item name="rede" label="Rede" rules={regras}>
                  <Select>
                    <Select value={1}>Municipal</Select>
                    <Select value={2}>Estadual</Select>
                    <Select value={3}>Privada</Select>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="codigo"
                  label="Codigo da Escola"
                  rules={regrasCodigoEscola}
                >
                  <Input className="inputForm2" />
                </Form.Item>

                <Form.Item name="cep" label="CEP" rules={regrasCEP}>
                  <Input
                    className="inputForm2"
                    onChange={(event) => {
                      consultaCEP(event.target.value);
                    }}
                  />
                </Form.Item>

                <Form.Item name="uf" rules={regras} label="UF">
                  <Select
                    onChange={limpaMunicipio}
                    disabled={erroCEP}
                    notFoundContent={<p>Carregando...</p>}
                    placement="bottomRight"
                    optionLabelProp="label"
                    className="uf"
                  >
                    {listaUfs?.map((u) => (
                      <Select key={u.id} value={u.rotulo} >
                        <button
                          onClick={() => {
                            setUF(u.id);
                          }}
                          className="option-municipio"
                        >
                          {u.rotulo}
                        </button>
                      </Select>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="bloco2">
                <Form.Item name="telefone" label="Telefone" rules={regrasTelefone}>
                  <Input 
                    className="inputForm2"
                   />
                </Form.Item>

                <Form.Item name="ciclos" label="Etapas de Ensino" rules={regras}>
                  <Select
                    mode="multiple"
                    onClick={consultaEtapasDeEnsino}
                    options={OpcoesEtapasDeEnsino}
                    onMouseDown={consultaEtapasDeEnsino}
                    notFoundContent={<p>Carregando...</p>}
                    placement="bottomRight"
                    optionLabelProp="label"
                    className="select-etapas-cadastro"
                    showSearch={false}
                  >
                    {OpcoesEtapasDeEnsino?.map((u) => (
                      <Select key={u.label} value={u.value} >
                        {u.value}
                      </Select>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item name="porte" label="Porte" rules={regras}>
                  <Select>
                    <Select value={1}>Até 50 matrículas de escolarização</Select>
                    <Select value={2}>
                      Entre 51 e 200 matrículas de escolarização
                    </Select>
                    <Select value={3}>
                      Entre 201 e 501 matrículas de escolarização
                    </Select>
                    <Select value={4}>
                      Entre 501 e 1000 matrículas de escolarização
                    </Select>
                    <Select value={5}>
                      Mais de 1000 matrículas de escolarização
                    </Select>
                  </Select>
                </Form.Item>
                <Form.Item name="endereco" label="Endereço" rules={regras}>
                  <Input className="inputForm2" />
                </Form.Item>

                <Form.Item name="municipio" label="Município" rules={regras}>
                  <Select
                    disabled={erroCEP}
                    notFoundContent={<p>Carregando...</p>}
                    placement="bottomRight"
                    optionLabelProp="label"
                    className="uf"
                  // onMouseDown={consultaMunicipio}
                  >
                    {listaMunicipios?.map((u) => (
                      <Select key={u.id} value={u.rotulo} >
                        <button
                          onClick={() => {
                            setMunicipio(u.id);
                          }}
                          className="option-municipio"
                        >
                          {u.rotulo}
                        </button>
                        {u.rotulo}
                      </Select>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="bloco3">
                <Form.Item name="localizacao" label="Localização" rules={regras}>
                  <Select>
                    <Select value={1}>Rural</Select>
                    <Select value={2}>Urbana</Select>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="longitude"
                  label="Longitude"
                  rules={regrasLongitude}
                >
                  <Input className="inputForm2" />
                </Form.Item>

                <Form.Item name="latitude" label="Latitude" rules={regrasLatitude}>
                  <Input className="inputForm2" />
                </Form.Item>

                <Form.Item
                  name="numeroAlunos"
                  label="Número Total de Alunos"
                  rules={regrasNumeroAlunoDocentes}
                >
                  <Input 
                    className="inputForm2" 
                    onChange={e => setQtdAlunos(form.getFieldValue("numeroAlunos"))}
                  />
                </Form.Item>

                <Form.Item
                  name="numeroDocentes"
                  label="Número Total de Docentes"
                  rules={regrasNumeroAlunoDocentes}
                >
                  <Input className="inputForm2" />
                </Form.Item>
              </div>
            </div>
            <div className="cancelar">
              <Space size={735}>
                <Button
                  className="custom-button"
                  type="primary"
                  size="large"
                  shape="round"
                  onClick={() => closeDialog(true)}
                >
                  Cancelar
                </Button>

                <Button
                  className="custom-button"
                  type="primary"
                  size="large"
                  htmlType="submit"
                  shape="round"
                >
                  Cadastrar
                </Button>
              </Space>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}