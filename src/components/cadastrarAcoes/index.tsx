import React from 'react'
import './Form.css';

export default function CriarAcao() {
  return (
    <div className="form-container">
      <h2>Criar Ação</h2>
      <form>
        <div className="form-group">
          <label htmlFor="nomeEscola">Nome da Escola</label>
          <input type="text" id="nomeEscola" name="nomeEscola" />
        </div>
        <div className="form-grid">
        <div className="form-group">
          <label>
            Turno
            <div className="radio-group">
              <input type="radio" id="matutino" name="turno" value="matutino" />
              <label htmlFor="matutino">Matutino</label>

              <input type="radio" id="vespertino" name="turno" value="vespertino" />
              <label htmlFor="vespertino">Vespertino</label>

              <input type="radio" id="noturno" name="turno" value="noturno" />
              <label htmlFor="noturno">Noturno</label>
            </div>
          </label>
        </div>

        <div className="form-group">
          <label>Horário Disponível</label>
          <div className="time-group" >
            <input type="time" name="horarioDe" style={{paddingInline:"4vw"}}/>
            <span>Até</span>
            <input type="time" name="horarioAte" style={{paddingInline:"4vw"}} />
          </div>
        </div>
        </div>
        <div className="form-grid1">
        <div className="form-group">
          <label htmlFor="quantidadeAlunos">Quantidade de Alunos</label>
          <input type="number" id="quantidadeAlunos" name="quantidadeAlunos" />
        </div>

        <div className="form-group">
          <label htmlFor="quantidadeTurmas">Quantidade de Turmas</label>
          <input type="number" id="quantidadeTurmas" name="quantidadeTurmas" />
        </div>

        <div className="form-group">
          <label htmlFor="nivelEscolar">Nível Escolar</label>
          <select id="nivelEscolar" name="nivelEscolar">
            <option value="">Selecione</option>
            <option value="fundamental">Fundamental</option>
            <option value="medio">Médio</option>
            <option value="superior">Superior</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="espacoDisponivel">Espaço disponível (sala, quadra...)</label>
          <input type="text" id="espacoDisponivel" name="espacoDisponivel" />
        </div>

        <div className="form-group">
          <label htmlFor="tamanhoEspaco">Tamanho do espaço (metros)</label>
          <input type="number" id="tamanhoEspaco" name="tamanhoEspaco" />
        </div>
        <div className="form-group">
        <label style={{paddingLeft:'5vw'}} htmlFor="OutrasInforamacoes">Outras Informações
        
        <div className="form-group checkbox-group">
         

          <input type="checkbox" id="espacoCoberto" name="espacoCoberto" />
          <label htmlFor="espacoCoberto">Espaço Coberto?</label>
          <input type="checkbox" id="wifi" name="wifi" />
          <label htmlFor="wifi">Possui rede Wi-fi?</label>
        </div>
        </label>
        </div>
        </div>
        <div className="form-buttons">
          <button type="button">Anterior</button>
          <button type="submit">Próximo</button>
        </div>
      </form>
    </div>
  )
}