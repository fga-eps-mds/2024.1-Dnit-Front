export const urlAPIUsuario = `${process.env.REACT_APP_API_USUARIOS}/api`;
export const urlAPIEscolas = `${process.env.REACT_APP_API_ESCOLAS}/api`;
export const urlAPIUps = `${process.env.REACT_APP_API_UPS}/api`;
export const urlAPIViaCEP = "https://viacep.com.br/ws";
export const etapasDeEnsinoURL = `${urlAPIEscolas}/dominio/etapasDeEnsino`;
export const municipioURL = `${urlAPIEscolas}/dominio/municipio`;
export const unidadesFederativasURL = `${urlAPIEscolas}/dominio/unidadeFederativa`;
export const situacaoURL = `${urlAPIEscolas}/dominio/situacao`;
export const loginURL = `${urlAPIUsuario}/usuario/login`;
export const cadastroURL = `${urlAPIUsuario}/usuario/cadastrar`;
export const cadastroUsuarioURL = `${urlAPIUsuario}/usuario/cadastrarUsuarioDnit`;
export const recuperarSenhaURL = `${urlAPIUsuario}/usuario/recuperarSenha`;
export const redefinirSenhaURL = `${urlAPIUsuario}/usuario/redefinirSenha`;
export const atualizarTokenUrl = `${urlAPIUsuario}/usuario/atualizarToken`;
export const excluirSituacaoURL = `${urlAPIEscolas}/escolas/removerSituacao`;
export const cadastroEscolaURL = `${urlAPIEscolas}/escolas/cadastrarEscola`;
export const listarInfoEscolaURL = `${urlAPIEscolas}/escolas/listarInformacoesEscola`;
export const listarEscolasURL = `${urlAPIEscolas}/escolas/listarEscolas`;
export const excluirEscolaURL = `${urlAPIEscolas}/escolas/excluir`;
export const escolasFiltradasURL = `${urlAPIEscolas}/escolas/obter`;
export const cadastroEscolaPlanilhaURL = `${urlAPIEscolas}/escolas/cadastrarEscolaPlanilha`;
export const alterarDadosEscolaURL = `${urlAPIEscolas}/escolas/alterarDadosEscola`;
export const escolasInepURL = `${urlAPIEscolas}/solicitacaoAcao/escolas`;
export const solicitacaoDeAcaoURL = `${urlAPIEscolas}/solicitacaoAcao`;
export const cadastroRodoviasURL = `${urlAPIUps}/rodovia/cadastrarRodoviaPlanilha`;
export const calcularUpsURL = `${urlAPIUps}/calcular/ups/escola`;
export const cadastroSinistrosURL = `${urlAPIUps}/sinistro/cadastrarSinistroPlanilha`;
export const listarUsuarioPermissoes = `${urlAPIUsuario}/usuario/permissoes`;
export const listarPermissoesCategoria = `${urlAPIUsuario}/dominio/permissoes`;
export const listarPerfis = `${urlAPIUsuario}/perfil`;
export const cadastrarPerfilUrl = `${urlAPIUsuario}/perfil`;
export const obterPerfil = `${urlAPIUsuario}/perfil`
export const atualizarPerfil = `${urlAPIUsuario}/perfil`
export const atualizarTipoPerfil = `${urlAPIUsuario}/usuario`
export const excluiPerfil = `${urlAPIUsuario}/perfil`;
export const listarUsuarios = `${urlAPIUsuario}/usuario`;
export const cadastrarEmpresaUrl = `${urlAPIUsuario}/empresa`;
export const visualizarEmpresaUrl = `${urlAPIUsuario}/empresa`;
export const editarEmpresaUrl = `${urlAPIUsuario}/empresa`;
export const excluirEmpresaUrl = `${urlAPIUsuario}/empresa`;
export const listarEmpresasUrl = `${urlAPIUsuario}/empresa`;
export const adicionarUsuarioEmpresaUrl = `${urlAPIUsuario}/empresa/adicionarUsuario`;
export const removerUsuarioEmpresaUrl = `${urlAPIUsuario}/empresa/removerUsuario`;
export const listarUsuariosEmpresaUrl = `${urlAPIUsuario}/empresa/listarUsuarios`;
export const listarSuperintendencia = `${urlAPIEscolas}/superintendencias`;
export const listarEscolasRanque = `${urlAPIEscolas}/ranque/escolas`;
export const ranqueamentoProcessamento = `${urlAPIEscolas}/ranque/processamento`;
export const criaPlanejamento = `${urlAPIEscolas}/planejamento`;
export const obterPlanejamento = `${urlAPIEscolas}/planejamento`;
export const excluiPlanejamento = `${urlAPIEscolas}/planejamento`;