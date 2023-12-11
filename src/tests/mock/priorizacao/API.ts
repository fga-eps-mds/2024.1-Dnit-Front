import { rest } from "msw";
import { adicionarFator, deletarFator, editarCustosLogisticos, editarFator, listarFatores, obterCustosLogisticos } from "../../../consts/service"
import { parametrosCustoLogistico } from "../../stub/priorizacaoModelos"
import { fatoresPriorizacao } from "../../stub/priorizacaoModelos"

const obterCustosLogisticosRequest = rest.get(
    `${obterCustosLogisticos}`,
    (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(parametrosCustoLogistico)
        )
    }
)

const obterFatoresPriorizacaoRequest = rest.get(
    `${listarFatores}`,
    (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(fatoresPriorizacao)
        )
    }
)

const obterFatorPriorizacaoRequest = rest.get(
    `${listarFatores}/:id`,
    (req, res, ctx) => {
        const { id } = req.params
        let fator = {
            ...fatoresPriorizacao[0],
            id: id
        }
        console.log(fator)
        return res(
            ctx.status(200),
            ctx.json(fator)
        )
    }
)

const adicionarFatorPriorizacaoRequest = rest.post(
    adicionarFator, 
    (_req, res, ctx) => res(ctx.status(200))
)

const deleteFatorPriorizacaoRequest = rest.delete(
    `${deletarFator}*`,
    (_req, res, ctx) => res(ctx.status(200))
)

const editarFatorPriorizacaoRequest = rest.put(
    `${editarFator}/:id`,
    (_req, res, ctx) => {
        const { id } = _req.params
        let fator = {
            ...fatoresPriorizacao[0],
            id: id
        }
        console.log(fator)
        return res(
            ctx.status(200),
            ctx.json(fator)
        )
    }
)

const editarCustosLogisticosRequest = rest.put(
    `${editarCustosLogisticos}`,
    (_req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(parametrosCustoLogistico)
        )
    }
)

const priorizacaoRequests = [
    obterCustosLogisticosRequest,
    obterFatoresPriorizacaoRequest,
    obterFatorPriorizacaoRequest,
    adicionarFatorPriorizacaoRequest,
    deleteFatorPriorizacaoRequest,
    editarCustosLogisticosRequest,
    editarFatorPriorizacaoRequest
]

export default priorizacaoRequests