import React, { useState } from 'react'
import './Form.css';
import { useNavigate } from 'react-router-dom';

export default function CriarAcao() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeEscola: '',
    turno: '',
    horarioDe: '',
    horarioAte: '',
    quantidadeAlunos: '',
    quantidadeTurmas: '',
    nivelEscolar: '',
    espacoDisponivel: '',
    tamanhoEspaco: '',
    espacoCoberto: false,
    wifi: false,
    data:'',
    nomeGestor:'',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const apiUrl = 'https://api.seuservidor.com/endpoint';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Formulário enviado com sucesso:', result);
      } else {
        console.error('Erro ao enviar formulário:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };
  return (
    <div className="form-container">
      <h2>Criar Ação</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nomeEscola">Nome da Escola</label>
          <input type="text" id="nomeEscola" name="nomeEscola" value={formData.nomeEscola}
              onChange={handleChange} />
        </div>
        <div className="form-grid">
        <div className="form-group">
          <label>
            Turno
            <div className="radio-group">
              <input type="radio" id="matutino" name="turno" value="matutino" checked={formData.turno === 'matutino'}
                onChange={handleChange} />
              <label htmlFor="matutino">Matutino</label>

              <input type="radio" id="vespertino" name="turno" value="vespertino" checked={formData.turno === 'vespertino'}
                onChange={handleChange} />
              <label htmlFor="vespertino">Vespertino</label>

              <input type="radio" id="noturno" name="turno" value="noturno"  checked={formData.turno === 'noturno'}
                onChange={handleChange}/>
              <label htmlFor="noturno">Noturno</label>
            </div>
          </label>
        </div>

        <div className="form-group">
          <label>Horário Disponível</label>
          <div className="time-group" >
            <input type="time" name="horarioDe" style={{paddingInline:"4vw"}} value={formData.horarioDe}
                onChange={handleChange}/>
            <span>Até</span>
            <input type="time" name="horarioAte" style={{paddingInline:"4vw"}} value={formData.horarioAte}
                onChange={handleChange} />
          </div>
        </div>
        </div>

        <div className="form-grid2">
        <div className="form-group">
        <label htmlFor="nomeEscola">Nome do gestor</label>
          <input type="text" id="nomeGestor" name="nomeGestor" value={formData.nomeGestor}
              onChange={handleChange} className="nomeGestor"  />
        </div>

        <div className="form-group">
          <label>Data</label>
          <div className="form-group" >
            <input type='date' name="data" value={formData.data}
                onChange={handleChange} style={{textAlign:"center"}}/>
          </div>
        </div>
        </div>

        <div className="form-grid1">
        <div className="form-group">
          <label htmlFor="quantidadeAlunos">Quantidade de Alunos</label>
          <input type="number" id="quantidadeAlunos" name="quantidadeAlunos" value={formData.quantidadeAlunos}
              onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="quantidadeTurmas">Quantidade de Turmas</label>
          <input type="number" id="quantidadeTurmas" name="quantidadeTurmas" value={formData.quantidadeTurmas}
              onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label htmlFor="nivelEscolar">Nível Escolar</label>
          <select id="nivelEscolar" name="nivelEscolar" >
            <option value="">Selecione</option>
            <option value="fundamental">Fundamental</option>
            <option value="medio">Médio</option>
            <option value="superior">Superior</option>
          </ select>
        </div>
        <div className="form-group">
          <label htmlFor="espacoDisponivel">Espaço disponível (sala, quadra...)</label>
          <input type="text" id="espacoDisponivel" name="espacoDisponivel" value={formData.espacoDisponivel}
              onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="tamanhoEspaco">Tamanho do espaço (metros)</label>
          <input type="number" id="tamanhoEspaco" name="tamanhoEspaco" value={formData.tamanhoEspaco}
              onChange={handleChange}/>
        </div>
        <div className="form-group">
        <label style={{paddingLeft:'5vw'}} htmlFor="OutrasInforamacoes">Outras Informações
        
        <div className="form-group checkbox-group">
         

          <input type="checkbox" id="espacoCoberto" name="espacoCoberto" checked={formData.espacoCoberto}
            onChange={handleChange} />
          <label htmlFor="espacoCoberto">Espaço Coberto?</label>
          <input type="checkbox" id="wifi" name="wifi" checked={formData.wifi}
            onChange={handleChange} />
          <label htmlFor="wifi">Possui rede Wi-fi?</label>
        </div>
        </label>
        </div>
        </div>
        <div className="form-buttons">
          <button type="button" onClick={() => navigate("/dashboard")}>Anterior</button>
          <button type="submit">Próximo</button>
        </div>
      </form>
    </div>
  )
}