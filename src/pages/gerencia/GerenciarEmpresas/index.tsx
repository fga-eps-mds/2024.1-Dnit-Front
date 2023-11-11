import { useContext, useEffect, useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import TrilhaDeNavegacao from "../../../components/Navegacao";
import Table from "../../../components/Table";
import { CustomTableRow } from "../../../components/Table";
import { empresaModel } from "../../../models/empresa";
import EditarEmpresasDialog from "../../../components/EditarEmpresaDialog";
// import { EditarEmpresaDialog } from "../../../components/EditarEmpresaDialog"

const exampleData: Array<empresaModel> = [
    {Cnpj: "123456789", RazaoSocial: "Empresa A", Ufs: ['1', '2', '3']},
    {Cnpj: "123456781", RazaoSocial: "Empresa A", Ufs: ['1', '2', '3']},
    {Cnpj: "123456735", RazaoSocial: "Empresa A", Ufs: ['1', '2', '3']}
]

interface EmpresaDialogArgs {
  id: string | null;
  readOnly: boolean;
}

export default function GerenciarEmpresas() {
    const paginas = [{nome: "Gerenciar Empresas", link: "/gerenciarEmpresas"}];
    const [listaEmpresas, setListaEmpresas] = useState(exampleData);
		const [empresaSelecionada, setEmpresaSelecionada] = useState('');
		const [showEmpresa, setShowEmpresa] = useState<EmpresaDialogArgs | null>(null);

    return (
			<div className="App">
				{showEmpresa && <EditarEmpresasDialog closeDialog={() => setShowEmpresa(null)}/>}
				<Header/>
				<TrilhaDeNavegacao elementosLi={paginas}/>
					<Table title="Empresas Cadastradas" initialItemsPerPage={10} columsTitle={["Razão Social", "CNPJ", "UFs"]}>
						{
							listaEmpresas.map((empresa, index) => (
								<CustomTableRow 
									key={`${empresa.Cnpj}`} id={index}
									data={{'0': empresa.RazaoSocial, '1': empresa.Cnpj, '2': empresa.Ufs.join(', ')}}
									onEditRow={() => {
										setEmpresaSelecionada(empresa.Cnpj)
										setShowEmpresa({id: empresa.Cnpj, readOnly: false})
									}}
								/>
							))
						}
				</Table>
				<Footer/>
			</div>
    )
}