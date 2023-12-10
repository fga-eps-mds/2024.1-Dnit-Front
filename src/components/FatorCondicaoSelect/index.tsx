import { useEffect, useState } from "react";
import { FilterOptions } from "../../pages/gerencia/GerenciarUsuario";
import MultiSelect from "../MultiSelect";
import Select from "../Select";
import { Condicao, Localizacao, Operador, Rede } from "../../models/prioridade";

interface CondicaoProps
{
    onChange: (condicao:Condicao) => void;
    condicaoUfs?: FilterOptions[];
    propriedades?: FilterOptions[];
    municipios?: FilterOptions[];
    situacoes?: FilterOptions[];
    etapasEnsino?: FilterOptions[];
    porte?: FilterOptions[];
}

export default function FatorCondicaoSelect({condicaoUfs, propriedades, municipios, situacoes, etapasEnsino, porte, onChange}:CondicaoProps) {

    const [operadorSelecionado, setOperadorSelecionado] = useState<string>('');
    const [propriedadeSelecionada, setPropriedadeSelecionada] = useState<string>('');
    const [valorSelecionado, setValorSelecionado] = useState<string[]>([]);
    const [listaOperadores, setListaOperadores] = useState<FilterOptions[]>([]);
    const [listaPropriedade, setListaPropriedade] = useState<FilterOptions[]>([]);

    const SelecionarPropriedade = function(propriedade:string){
        if (propriedade == "1" && porte) setListaPropriedade(porte)
        if(propriedade == "2" && situacoes) setListaPropriedade(situacoes)
        else if(propriedade == "4" && condicaoUfs) setListaPropriedade(condicaoUfs)
        else if(propriedade == "5")
        {
            setListaPropriedade([{
                id: Localizacao.Rural,
                rotulo: "Rural",
            },
            {
                id: Localizacao.Urbana,
                rotulo: "Urbana",
            }])
        }
        else if(propriedade == "7" && etapasEnsino) setListaPropriedade(etapasEnsino)
        else if(propriedade == "8")
        {
            setListaPropriedade([{
                id: Rede.Estadual,
                rotulo: "Estadual",
            },
            {
                id: Rede.Municipal,
                rotulo: "Municipal",
            },
            {
                id: Rede.Privada,
                rotulo:"Privada"
            }])
        }
        
        if(propriedade == "6")
        {
            setListaOperadores([{
                id: Operador.maior,
                rotulo: "maior ou igual a",
            },
            {
                id: Operador.menor,
                rotulo: "menor ou igual a",
            }])
        }
        else if(propriedadeSelecionada){
            setListaOperadores([ {
                id: Operador.igual,
                rotulo: "igual a",
            },])
        }
    
    }
    useEffect(() =>{
        onChange(({
            propriedade: propriedadeSelecionada, 
            operador: operadorSelecionado, 
            valor: valorSelecionado}))
    }, [propriedadeSelecionada, operadorSelecionado, valorSelecionado])
    return (
        <div>
            <Select items={propriedades ? propriedades : []} value={propriedadeSelecionada} onChange={(c) => {
                setPropriedadeSelecionada(c)
                SelecionarPropriedade(c)
            }} />
            <Select items={listaOperadores} value={operadorSelecionado} onChange={setOperadorSelecionado} />
            {propriedadeSelecionada != "6" ? <MultiSelect items={listaPropriedade} value={valorSelecionado} onChange={setValorSelecionado} />:
            <input type="number"></input>
            }
        </div>          
    )
}