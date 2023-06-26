import { Button, Form, Input, Select, Space, notification } from "antd";
import { useState, useEffect } from "react";
import fetchCadastroEscola from "../../../service/registerSchool";
import fetchEtapasDeEnsino from "../../../service/etapasDeEnsino";
import fetchMunicipio from "../../../service/municipio";
import { Municipio , EtapasDeEnsino, FederativeUnit} from "../../../models/service";
import fetchFederativeUnit from "../../../service/federativeUnit";
import { useFiltroTabela} from "../../../context/FiltroTabela";
import { options } from "yargs";


const { Option } = Select;
interface Step2Props {
    onClickBack: () => void
}
export default function Step2({ onClickBack }: Step2Props) {
    const {
    
        UFSelecionada,
        setUFSelecionada,

    
        carregandoEscolas,
    
      } = useFiltroTabela();

    
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const rules = [
        {
            required: true,
            message: "Preencha o campo ${label}!",
        },
    ];


    const [opcoesUf, setOpcoesUf] = useState<FederativeUnit[]>([]);
    const [showOptionsUF, setShowOptionsUF] = useState(false);
    const getUf = async () => {
      try {
        const resposta = await fetchFederativeUnit();
        setOpcoesUf(resposta);
      }
      catch (error) {
        
      }
    }
    useEffect(() => {
        if (opcoesUf.length == 0)
          getUf();
      })

    const [opcoesMunicipio, setOpcoesMunicipio] = useState<Municipio[]>([]);
    const [showOpcoesMunicipio, setShowOpcoesMunincipio] = useState(false);
    const getMunicipio = async () => {
        console.log(UFSelecionada)
        try {
          if (UFSelecionada) {
            const resposta = await fetchMunicipio(UFSelecionada.id);
            console.log(resposta);
            setOpcoesMunicipio(resposta);
          }
        }
        catch (error) {
        }
      }
      useEffect(() => {
        console.log(UFSelecionada)
        if (opcoesMunicipio.length == 0 || carregandoEscolas)
          getMunicipio();
      },[UFSelecionada, carregandoEscolas])

      const [OpcoesEtapasDeEnsino, setOpcoesEtapasDeEnsino] = useState<EtapasDeEnsino[]>([]);
      const [showOpcoesEtapasDeEnsino, setShowOpcoesEtapasDeEnsino] = useState(false);
      const getEtapasDeEnsino = async () => {
        try {
          const resposta = await fetchEtapasDeEnsino();
          setOpcoesEtapasDeEnsino(resposta);
        }
        catch (error) {
          
        }   
      }
    
      const alternarEstado = (valorAtual: boolean) => (!valorAtual);

      const handleButtonClick = () => {
            setShowOptionsUF(alternarEstado);
      };
    
      const handleOptionClick = (option: any) => {
        console.log(option)
            setUFSelecionada(option);
            setShowOptionsUF(false);
      };



    const onFinish = async (values: any) => {
        const registerSchoolData = {
            NomeEscola: values.nome,
            IdRede: values.rede,
            CodigoEscola: values.codigo,
            IdUf: values.uf,
            Cep: values.cep,
            Telefone: values.telefone,
            IdEtapasDeEnsino: values.ciclos,
            IdPorte: values.porte,
            Endereco: values.endereco,
            IdMunicipio: values.municipio,
            IdLocalizacao: values.localizacao,
            Longitude: values.longitude,
            Latitude: values.latitude,
            NumeroTotalDeAlunos: values.numeroAlunos,
            NumeroTotalDeDocentes: values.numeroDocentes
        };
        
        try {
            await fetchCadastroEscola(registerSchoolData);
            api.success({ message: "Cadastro feito!" });
          } catch (error) {
            api.error({ message: "Erro ao fazer o cadastro" });
          }
    
    };
    return (

        <div>
        {contextHolder}
            <h2>Cadastrar Escola</h2>
            <Form
                form={form}
                onFinish={onFinish}
                name="form2"
                layout="vertical"
                autoComplete="off"
                requiredMark="optional"
                className="form-email"
                preserve
            >
                <div className="divScroll">
                    <div className="bloco">
                        <Form.Item name="nome" label="Nome da Escola" rules={rules}>
                            <Input
                                className="inputForm2"
                            />
                        </Form.Item>

                        <Form.Item name="rede" label="Rede" rules={rules}>
                            <Select
                            >
                                <Option value={1}>Municipal</Option>
                                <Option value={2}>Estadual</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="codigo" label="Codigo da Escola" rules={rules}>
                            <Input
                                className="inputForm2"
                            />
                        </Form.Item>

                        <Form.Item
                            name="uf"
                            rules={rules}
                            label="UF"
                        >
                            <Select
                                
                                notFoundContent={<p>Carregando...</p>}
                                placement="bottomRight"
                                optionLabelProp="label"
                                className="uf"
                            >
                                {opcoesUf?.map((u) => (
                                    <Option
                                        key={u.id}
                                        value={u.id}
                                        label={
                                            <>
                                                {u.nome}
                                            </>
                                        }
                                    >
                                        <a onClick={()=>handleOptionClick(u)} style={{color:'black'}}>{u.nome}</a>
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="cep"
                            label="CEP"
                            rules={rules}
                        >
                            <Input
                                className="inputForm2"
                            />
                        </Form.Item>

                        <Form.Item name="telefone" label="Telefone" rules={rules}>
                            <Input
                                className="inputForm2"
                            />
                        </Form.Item>

                        <Form.Item name="ciclos" label="Etapas de Ensino" rules={rules}>
                        <Select
                                onClick={getEtapasDeEnsino}
                                notFoundContent={<p>Carregando...</p>}
                                placement="bottomRight"
                                optionLabelProp="label"
                                className="uf"
                            >
                                {OpcoesEtapasDeEnsino?.map((u) => (
                                    <Option
                                        key={u.id}
                                        value={u.id}
                                        label={
                                            <>
                                                {u.descricao}
                                            </>
                                        }
                                    >
                                        {u.descricao}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item name="porte" label="Porte" rules={rules}>
                            <Select
                            >
                                <Option value={1}>Até 50 matrículas de escolarização</Option>
                                <Option value={2}>Entre 51 e 200 matrículas de escolarização</Option>
                                <Option value={3}>Entre 201 e 501 matrículas de escolarização</Option>
                                <Option value={4}>Entre 501 e 1000 matrículas de escolarização</Option>
                                <Option value={5}>Mais de 1000 matrículas de escolarização</Option>

                            </Select>
                        </Form.Item>

                    </div>
                    <div className="bloco2">
                        <Form.Item name="endereco" label="Endereço" rules={rules}>
                            <Input
                                className="inputForm2"
                            />
                        </Form.Item>

                        <Form.Item
                            name="municipio"
                            label="Município"
                            rules={rules}
                        >
                            <Select
                                notFoundContent={<p>Carregando...</p>}
                                placement="bottomRight"
                                optionLabelProp="label"
                                className="uf"
                            >
                                {opcoesMunicipio?.map((u) => (
                                    <Option
                                        key={u.id}
                                        value={u.id}
                                        label={
                                            <>
                                                {u.nome}
                                            </>
                                        }
                                    >
                                        {u.nome}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item name="localizacao" label="Localização" rules={rules}>
                            <Select
                            >
                                <Option value={1}>Rural</Option>
                                <Option value={2}>Urbana</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="longitude"
                            label="Longitude"
                            rules={rules}
                        >
                            <Input
                                className="inputForm2"
                            />
                        </Form.Item>

                        <Form.Item
                            name="latitude"
                            label="Latitude"
                            rules={rules}
                        >
                            <Input
                                className="inputForm2"
                            />
                        </Form.Item>

                        <Form.Item
                            name="numeroAlunos"
                            label="Número Total de Alunos"
                            rules={rules}
                        >
                            <Input
                                className="inputForm2"
                            />
                        </Form.Item>

                        <Form.Item
                            name="numeroDocentes"
                            label="Número Total de Docentes"
                            rules={rules}
                        >
                            <Input
                                className="inputForm2"
                            />
                        </Form.Item>

                    </div>
                </div>
                <div className="voltar">
                    <Space>
                        <Button className="button2" type="primary" size="large" shape="round" onClick={onClickBack}>
                            Voltar
                        </Button>
                    </Space>
                </div>
                <div className="proximo">
                    <Space>
                        <Button className="button2" type="primary" size="large" htmlType="submit" shape="round">
                            Cadastrar
                        </Button>
                    </Space>
                </div>
            </Form>

        </div>
    )
}