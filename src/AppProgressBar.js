import React from "react";
import styled from "styled-components";
import dateformat from "dateformat";

const StyledContent = styled.div`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 11px;
  width: 100%;

  h1 {
    text-align: center;
  }

  h2 {
    color: #005577;
  }

  h3 {
    color: #550000;
    text-align: center;
  }
`;

const StyledProgressBar = styled.div`
  position: relative;
  background: #eee;
  height: 15px;
  border-radius: 7px;
  border: 1px solid #ccc;
`;

const StyledFiller = styled.div`
  position: relative;
  background: ${props => (props.percentage === 100 ? "#099441" : "#1784c3")};
  height: 100%;
  border-radius: inherit;
  transition: width 0.2s ease-in;
  width: ${props => props.percentage}%;
`;

const StyledLabelPercent = styled.div`
  color: yellow;
  text-align: center;
  font-weight: bold;
  text-shadow: 1px 1px 1px #222;
`;

const StyledItem = styled.li`
  text-decoration: ${props => (props.concluida ? "line-through" : "none")};
  color: ${props => (props.concluida ? "red" : "black")};
`;

const ProgressBar = props => {
  return (
    <>
      <StyledProgressBar>
        <StyledFiller percentage={props.percentage}>
          <StyledLabelPercent>
            {props.percentage.toFixed(2)}%
          </StyledLabelPercent>
        </StyledFiller>
      </StyledProgressBar>
      <ul>
        {props.tarefas &&
          props.tarefas.map(item => (
            <StyledItem key={item.item} concluida={item.concluida}>
              {item.tarefa}
            </StyledItem>
          ))}
      </ul>
    </>
  );
};

function App() {
  document.title = "RKS SOLUÇÕES EM SOFTWARES LTDA";
  const titulo = (
    <>
      Projeto de Desenvolvimento do Módulo de Ranking
      <br />
      para o PL GOLF CLUBE
    </>
  );

  const dataAtual = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  const previsaoEntrega = new Date("2020-04-24");
  const diasRestantes = Math.ceil(
    Math.abs(previsaoEntrega - dataAtual) / (1000 * 60 * 60 * 24)
  );

  const mensagemPosicaoAtual = (
    <>Posição em {dateformat(new Date(), "dd/mm/yyyy 'às' HH:MM:ss")}</>
  );

  const mensagemPrevisaoEntrega = (
    <>
      Previsão máxima para entrega em{" "}
      {dateformat(previsaoEntrega, "dd/mm/yyyy")}
    </>
  );
  const mensagemDiasRestantes = <>Faltam {diasRestantes} dias</>;

  var projetos = [
    {
      item: 1,
      descricao: "NOVO MENU DE ACESSO",
      tarefas: [{ item: 1, tarefa: "BANCO DE DADOS", concluida: true }]
    },
    {
      item: 2,
      descricao: "PEQUISA DE CLUBE",
      tarefas: [
        { item: 1, tarefa: "BANCO DE DADOS", concluida: true },
        { item: 2, tarefa: "CAMADA DE ENTIDADES", concluida: false },
        { item: 3, tarefa: "CAMADA DE ACESSO A DADOS", concluida: false },
        { item: 4, tarefa: "CAMADA DE NEGOCIO", concluida: false },
        { item: 5, tarefa: "LAYOUT DO MODELO", concluida: false },
        { item: 6, tarefa: "LAYOUT DE CONTROLE", concluida: false },
        { item: 7, tarefa: "LAYOUT DE VISUALIZAÇÃO", concluida: false },
        { item: 8, tarefa: "JAVASCRIPT", concluida: false },
        { item: 9, tarefa: "INTERAÇÃO DO LAYOUT", concluida: false },
        { item: 10, tarefa: "TESTES DE QUALIDADE", concluida: false }
      ]
    },
    {
      item: 3,
      descricao: "MANTER CLUBE - MODO DE CADASTRO",
      tarefas: [
        { item: 1, tarefa: "BANCO DE DADOS", concluida: true },
        { item: 2, tarefa: "CAMADA DE ENTIDADES", concluida: false },
        { item: 3, tarefa: "CAMADA DE ACESSO A DADOS", concluida: false },
        { item: 4, tarefa: "CAMADA DE NEGOCIO", concluida: false },
        { item: 5, tarefa: "LAYOUT DO MODELO", concluida: false },
        { item: 6, tarefa: "LAYOUT DE CONTROLE", concluida: false },
        { item: 7, tarefa: "LAYOUT DE VISUALIZAÇÃO", concluida: false },
        { item: 8, tarefa: "JAVASCRIPT", concluida: false },
        { item: 9, tarefa: "INTERAÇÃO DO LAYOUT", concluida: false },
        { item: 10, tarefa: "TESTES DE QUALIDADE", concluida: false }
      ]
    },
    {
      item: 4,
      descricao: "MANTER CLUBE - MODO DE EDIÇÃO",
      tarefas: [
        { item: 1, tarefa: "BANCO DE DADOS", concluida: true },
        { item: 2, tarefa: "CAMADA DE ENTIDADES", concluida: false },
        { item: 3, tarefa: "CAMADA DE ACESSO A DADOS", concluida: false },
        { item: 4, tarefa: "CAMADA DE NEGOCIO", concluida: false },
        { item: 5, tarefa: "LAYOUT DO MODELO", concluida: false },
        { item: 6, tarefa: "LAYOUT DE CONTROLE", concluida: false },
        { item: 7, tarefa: "LAYOUT DE VISUALIZAÇÃO", concluida: false },
        { item: 8, tarefa: "JAVASCRIPT", concluida: false },
        { item: 9, tarefa: "INTERAÇÃO DO LAYOUT", concluida: false },
        { item: 10, tarefa: "TESTES DE QUALIDADE", concluida: false }
      ]
    },
    {
      item: 5,
      descricao: "PESQUISA DE CAMPO",
      tarefas: [
        { item: 1, tarefa: "BANCO DE DADOS", concluida: true },
        { item: 2, tarefa: "CAMADA DE ENTIDADES", concluida: false },
        { item: 3, tarefa: "CAMADA DE ACESSO A DADOS", concluida: false },
        { item: 4, tarefa: "CAMADA DE NEGOCIO", concluida: false },
        { item: 5, tarefa: "LAYOUT DO MODELO", concluida: false },
        { item: 6, tarefa: "LAYOUT DE CONTROLE", concluida: false },
        { item: 7, tarefa: "LAYOUT DE VISUALIZAÇÃO", concluida: false },
        { item: 8, tarefa: "JAVASCRIPT", concluida: false },
        { item: 9, tarefa: "INTERAÇÃO DO LAYOUT", concluida: false },
        { item: 10, tarefa: "TESTES DE QUALIDADE", concluida: false }
      ]
    },
    {
      item: 6,
      descricao: "MANTER CAMPO - MODO DE CADASTRO",
      tarefas: [
        { item: 1, tarefa: "BANCO DE DADOS", concluida: true },
        { item: 2, tarefa: "CAMADA DE ENTIDADES", concluida: false },
        { item: 3, tarefa: "CAMADA DE ACESSO A DADOS", concluida: false },
        { item: 4, tarefa: "CAMADA DE NEGOCIO", concluida: false },
        { item: 5, tarefa: "LAYOUT DO MODELO", concluida: false },
        { item: 6, tarefa: "LAYOUT DE CONTROLE", concluida: false },
        { item: 7, tarefa: "LAYOUT DE VISUALIZAÇÃO", concluida: false },
        { item: 8, tarefa: "JAVASCRIPT", concluida: false },
        { item: 9, tarefa: "INTERAÇÃO DO LAYOUT", concluida: false },
        { item: 10, tarefa: "TESTES DE QUALIDADE", concluida: false }
      ]
    },
    {
      item: 7,
      descricao: "MANTER CAMPO - MODO DE EDIÇÃO",
      tarefas: [
        { item: 1, tarefa: "BANCO DE DADOS", concluida: true },
        { item: 2, tarefa: "CAMADA DE ENTIDADES", concluida: false },
        { item: 3, tarefa: "CAMADA DE ACESSO A DADOS", concluida: false },
        { item: 4, tarefa: "CAMADA DE NEGOCIO", concluida: false },
        { item: 5, tarefa: "LAYOUT DO MODELO", concluida: false },
        { item: 6, tarefa: "LAYOUT DE CONTROLE", concluida: false },
        { item: 7, tarefa: "LAYOUT DE VISUALIZAÇÃO", concluida: false },
        { item: 8, tarefa: "JAVASCRIPT", concluida: false },
        { item: 9, tarefa: "INTERAÇÃO DO LAYOUT", concluida: false },
        { item: 10, tarefa: "TESTES DE QUALIDADE", concluida: false }
      ]
    },
    {
      item: 8,
      descricao: "MANTER CAMPO (COURSE / SLOPE) - MODO DE CADASTRO",
      tarefas: [
        { item: 1, tarefa: "BANCO DE DADOS", concluida: true },
        { item: 2, tarefa: "CAMADA DE ENTIDADES", concluida: false },
        { item: 3, tarefa: "CAMADA DE ACESSO A DADOS", concluida: false },
        { item: 4, tarefa: "CAMADA DE NEGOCIO", concluida: false },
        { item: 5, tarefa: "LAYOUT DO MODELO", concluida: false },
        { item: 6, tarefa: "LAYOUT DE CONTROLE", concluida: false },
        { item: 7, tarefa: "LAYOUT DE VISUALIZAÇÃO", concluida: false },
        { item: 8, tarefa: "JAVASCRIPT", concluida: false },
        { item: 9, tarefa: "INTERAÇÃO DO LAYOUT", concluida: false },
        { item: 10, tarefa: "TESTES DE QUALIDADE", concluida: false }
      ]
    },
    {
      item: 9,
      descricao: "MANTER CAMPO (COURSE / SLOPE) - MODO DE EDIÇÃO",
      tarefas: [
        { item: 1, tarefa: "BANCO DE DADOS", concluida: true },
        { item: 2, tarefa: "CAMADA DE ENTIDADES", concluida: false },
        { item: 3, tarefa: "CAMADA DE ACESSO A DADOS", concluida: false },
        { item: 4, tarefa: "CAMADA DE NEGOCIO", concluida: false },
        { item: 5, tarefa: "LAYOUT DO MODELO", concluida: false },
        { item: 6, tarefa: "LAYOUT DE CONTROLE", concluida: false },
        { item: 7, tarefa: "LAYOUT DE VISUALIZAÇÃO", concluida: false },
        { item: 8, tarefa: "JAVASCRIPT", concluida: false },
        { item: 9, tarefa: "INTERAÇÃO DO LAYOUT", concluida: false },
        { item: 10, tarefa: "TESTES DE QUALIDADE", concluida: false }
      ]
    },
    {
      item: 10,
      descricao: "PESQUISA DE JOGO",
      tarefas: [
        { item: 1, tarefa: "BANCO DE DADOS", concluida: true },
        { item: 2, tarefa: "CAMADA DE ENTIDADES", concluida: false },
        { item: 3, tarefa: "CAMADA DE ACESSO A DADOS", concluida: false },
        { item: 4, tarefa: "CAMADA DE NEGOCIO", concluida: false },
        { item: 5, tarefa: "LAYOUT DO MODELO", concluida: false },
        { item: 6, tarefa: "LAYOUT DE CONTROLE", concluida: false },
        { item: 7, tarefa: "LAYOUT DE VISUALIZAÇÃO", concluida: false },
        { item: 8, tarefa: "JAVASCRIPT", concluida: false },
        { item: 9, tarefa: "INTERAÇÃO DO LAYOUT", concluida: false },
        { item: 10, tarefa: "TESTES DE QUALIDADE", concluida: false }
      ]
    },
    {
      item: 11,
      descricao: "MANTER JOGO - MODO DE CADASTRO",
      tarefas: [
        { item: 1, tarefa: "BANCO DE DADOS", concluida: true },
        { item: 2, tarefa: "CAMADA DE ENTIDADES", concluida: false },
        { item: 3, tarefa: "CAMADA DE ACESSO A DADOS", concluida: false },
        { item: 4, tarefa: "CAMADA DE NEGOCIO", concluida: false },
        { item: 5, tarefa: "LAYOUT DO MODELO", concluida: false },
        { item: 6, tarefa: "LAYOUT DE CONTROLE", concluida: false },
        { item: 7, tarefa: "LAYOUT DE VISUALIZAÇÃO", concluida: false },
        { item: 8, tarefa: "JAVASCRIPT", concluida: false },
        { item: 9, tarefa: "INTERAÇÃO DO LAYOUT", concluida: false },
        { item: 10, tarefa: "TESTES DE QUALIDADE", concluida: false }
      ]
    },
    {
      item: 12,
      descricao: "MANTER JOGO - MODO DE EDIÇÃO",
      tarefas: [
        { item: 1, tarefa: "BANCO DE DADOS", concluida: true },
        { item: 2, tarefa: "CAMADA DE ENTIDADES", concluida: false },
        { item: 3, tarefa: "CAMADA DE ACESSO A DADOS", concluida: false },
        { item: 4, tarefa: "CAMADA DE NEGOCIO", concluida: false },
        { item: 5, tarefa: "LAYOUT DO MODELO", concluida: false },
        { item: 6, tarefa: "LAYOUT DE CONTROLE", concluida: false },
        { item: 7, tarefa: "LAYOUT DE VISUALIZAÇÃO", concluida: false },
        { item: 8, tarefa: "JAVASCRIPT", concluida: false },
        { item: 9, tarefa: "INTERAÇÃO DO LAYOUT", concluida: false },
        { item: 10, tarefa: "TESTES DE QUALIDADE", concluida: false }
      ]
    },
    {
      item: 13,
      descricao: "PESQUISA DE FECHAMENTO",
      tarefas: [
        { item: 1, tarefa: "BANCO DE DADOS", concluida: false },
        { item: 2, tarefa: "CAMADA DE ENTIDADES", concluida: false },
        { item: 3, tarefa: "CAMADA DE ACESSO A DADOS", concluida: false },
        { item: 4, tarefa: "CAMADA DE NEGOCIO", concluida: false },
        { item: 5, tarefa: "LAYOUT DO MODELO", concluida: false },
        { item: 6, tarefa: "LAYOUT DE CONTROLE", concluida: false },
        { item: 7, tarefa: "LAYOUT DE VISUALIZAÇÃO", concluida: false },
        { item: 8, tarefa: "JAVASCRIPT", concluida: false },
        { item: 9, tarefa: "INTERAÇÃO DO LAYOUT", concluida: false },
        { item: 10, tarefa: "TESTES DE QUALIDADE", concluida: false }
      ]
    },
    {
      item: 14,
      descricao: "FECHAMENTO - MODO DE CÁLCULO (SEM A ROTINA DE CÁLCULO)",
      tarefas: [
        { item: 1, tarefa: "BANCO DE DADOS", concluida: false },
        { item: 2, tarefa: "CAMADA DE ENTIDADES", concluida: false },
        { item: 3, tarefa: "CAMADA DE ACESSO A DADOS", concluida: false },
        { item: 4, tarefa: "CAMADA DE NEGOCIO", concluida: false },
        { item: 5, tarefa: "LAYOUT DO MODELO", concluida: false },
        { item: 6, tarefa: "LAYOUT DE CONTROLE", concluida: false },
        { item: 7, tarefa: "LAYOUT DE VISUALIZAÇÃO", concluida: false },
        { item: 8, tarefa: "JAVASCRIPT", concluida: false },
        { item: 9, tarefa: "INTERAÇÃO DO LAYOUT", concluida: false },
        { item: 10, tarefa: "TESTES DE QUALIDADE", concluida: false }
      ]
    },
    {
      item: 15,
      descricao: "FECHAMENTO - MODO DE CONSULTA (RELATÓRIOS)",
      tarefas: [
        { item: 1, tarefa: "BANCO DE DADOS", concluida: false },
        { item: 2, tarefa: "CAMADA DE ENTIDADES", concluida: false },
        { item: 3, tarefa: "CAMADA DE ACESSO A DADOS", concluida: false },
        { item: 4, tarefa: "CAMADA DE NEGOCIO", concluida: false },
        { item: 5, tarefa: "LAYOUT DO MODELO", concluida: false },
        { item: 6, tarefa: "LAYOUT DE CONTROLE", concluida: false },
        { item: 7, tarefa: "LAYOUT DE VISUALIZAÇÃO", concluida: false },
        { item: 8, tarefa: "JAVASCRIPT", concluida: false },
        { item: 9, tarefa: "INTERAÇÃO DO LAYOUT", concluida: false },
        { item: 10, tarefa: "TESTES DE QUALIDADE", concluida: false }
      ]
    },
    {
      item: 16,
      descricao: "PESQUISA DE JOGADOR - FECHAMENTO",
      tarefas: [
        { item: 1, tarefa: "BANCO DE DADOS", concluida: false },
        { item: 2, tarefa: "CAMADA DE ENTIDADES", concluida: false },
        { item: 3, tarefa: "CAMADA DE ACESSO A DADOS", concluida: false },
        { item: 4, tarefa: "CAMADA DE NEGOCIO", concluida: false },
        { item: 5, tarefa: "LAYOUT DO MODELO", concluida: false },
        { item: 6, tarefa: "LAYOUT DE CONTROLE", concluida: false },
        { item: 7, tarefa: "LAYOUT DE VISUALIZAÇÃO", concluida: false },
        { item: 8, tarefa: "JAVASCRIPT", concluida: false },
        { item: 9, tarefa: "INTERAÇÃO DO LAYOUT", concluida: false },
        { item: 10, tarefa: "TESTES DE QUALIDADE", concluida: false }
      ]
    },
    {
      item: 17,
      descricao: "DETALHE DO JOGADOR - FECHAMENTO",
      tarefas: [
        { item: 1, tarefa: "BANCO DE DADOS", concluida: false },
        { item: 2, tarefa: "CAMADA DE ENTIDADES", concluida: false },
        { item: 3, tarefa: "CAMADA DE ACESSO A DADOS", concluida: false },
        { item: 4, tarefa: "CAMADA DE NEGOCIO", concluida: false },
        { item: 5, tarefa: "LAYOUT DO MODELO", concluida: false },
        { item: 6, tarefa: "LAYOUT DE CONTROLE", concluida: false },
        { item: 7, tarefa: "LAYOUT DE VISUALIZAÇÃO", concluida: false },
        { item: 8, tarefa: "JAVASCRIPT", concluida: false },
        { item: 9, tarefa: "INTERAÇÃO DO LAYOUT", concluida: false },
        { item: 10, tarefa: "TESTES DE QUALIDADE", concluida: false }
      ]
    },
    {
      item: 18,
      descricao: "RELATÓRIO DE HANDICAP",
      tarefas: [
        { item: 1, tarefa: "BANCO DE DADOS", concluida: false },
        { item: 2, tarefa: "CAMADA DE ENTIDADES", concluida: false },
        { item: 3, tarefa: "CAMADA DE ACESSO A DADOS", concluida: false },
        { item: 4, tarefa: "CAMADA DE NEGOCIO", concluida: false },
        { item: 5, tarefa: "LAYOUT DO MODELO", concluida: false },
        { item: 6, tarefa: "LAYOUT DE CONTROLE", concluida: false },
        { item: 7, tarefa: "LAYOUT DE VISUALIZAÇÃO", concluida: false },
        { item: 8, tarefa: "JAVASCRIPT", concluida: false },
        { item: 9, tarefa: "INTERAÇÃO DO LAYOUT", concluida: false },
        { item: 10, tarefa: "TESTES DE QUALIDADE", concluida: false }
      ]
    },
    {
      item: 19,
      descricao: "RELATÓRIO DE FICHA INDIVIDUAL",
      tarefas: [
        { item: 1, tarefa: "BANCO DE DADOS", concluida: false },
        { item: 2, tarefa: "CAMADA DE ENTIDADES", concluida: false },
        { item: 3, tarefa: "CAMADA DE ACESSO A DADOS", concluida: false },
        { item: 4, tarefa: "CAMADA DE NEGOCIO", concluida: false },
        { item: 5, tarefa: "LAYOUT DO MODELO", concluida: false },
        { item: 6, tarefa: "LAYOUT DE CONTROLE", concluida: false },
        { item: 7, tarefa: "LAYOUT DE VISUALIZAÇÃO", concluida: false },
        { item: 8, tarefa: "JAVASCRIPT", concluida: false },
        { item: 9, tarefa: "INTERAÇÃO DO LAYOUT", concluida: false },
        { item: 10, tarefa: "TESTES DE QUALIDADE", concluida: false }
      ]
    },
    {
      item: 20,
      descricao: "RELATÓRIO DE ETIQUETAS",
      tarefas: [
        { item: 1, tarefa: "BANCO DE DADOS", concluida: false },
        { item: 2, tarefa: "CAMADA DE ENTIDADES", concluida: false },
        { item: 3, tarefa: "CAMADA DE ACESSO A DADOS", concluida: false },
        { item: 4, tarefa: "CAMADA DE NEGOCIO", concluida: false },
        { item: 5, tarefa: "LAYOUT DO MODELO", concluida: false },
        { item: 6, tarefa: "LAYOUT DE CONTROLE", concluida: false },
        { item: 7, tarefa: "LAYOUT DE VISUALIZAÇÃO", concluida: false },
        { item: 8, tarefa: "JAVASCRIPT", concluida: false },
        { item: 9, tarefa: "INTERAÇÃO DO LAYOUT", concluida: false },
        { item: 10, tarefa: "TESTES DE QUALIDADE", concluida: false }
      ]
    },
    {
      item: 21,
      descricao: "ROTINAS DE CÁLCULO",
      tarefas: [
        {
          item: 1,
          tarefa:
            "CÁLCULO DA CORREÇÃO DO BURACO PARA QUEM TEM O HANDICAP DO JOGO",
          concluida: false
        },
        {
          item: 2,
          tarefa:
            "CÁLCULO DO STROKE POR BURACO PARA QUEM TEM O HANDICAP DO JOGO",
          concluida: false
        },
        {
          item: 3,
          tarefa: "CÁLCULO DO HANDICAP DO JOGO (HANDICAP DO CAMPO)",
          concluida: false
        },
        {
          item: 4,
          tarefa:
            "CÁLCULO DA CORREÇÃO DO BURACO PARA QUEM NÃO TEM O HANDICAP DO JOGO",
          concluida: false
        },
        {
          item: 5,
          tarefa: "CÁLCULO DO DIFERENCIAL PARA CADA JOGO",
          concluida: false
        },
        { item: 6, tarefa: "CÁLCULO DO HANDICAP INDEX", concluida: false },
        { item: 7, tarefa: "TESTES DE QUALIDADE", concluida: false }
      ]
    },
    {
      item: 22,
      descricao: "ROTINAS DE MIGRAÇÃO DO SISTEMA LEGADO PARA O NOVO SISTEMA",
      tarefas: [
        {
          item: 1,
          tarefa: "MAPEAMENTO DOS DADOS A SEREM MIGRADOS",
          concluida: false
        },
        {
          item: 2,
          tarefa: "CRIAÇÃO DA PLANILHA PARA MIGRAÇÃO DOS DADOS HISTÓRICOS",
          concluida: false
        },
        {
          item: 3,
          tarefa: "CRIAÇÃO DOS SCRIPTS PARA A CARGA DOS DADOS",
          concluida: false
        },
        { item: 4, tarefa: "VALIDAÇÃO DOS DADOS IMPORTADOS", concluida: false },
        { item: 5, tarefa: "TESTES DE QUALIDADE", concluida: false }
      ]
    }
  ];

  var projetoProgressoGeral = {
    item: 0,
    descricao: "PROGRESSO GERAL",
    tarefas: [
      ...projetos.map(projeto => ({
        item: projeto.item,
        tarefa: "ITEM " + projeto.item + " - " + projeto.descricao,
        concluida:
          projeto.tarefas.filter(a => a.concluida).length ===
          projeto.tarefas.length
      }))
    ]
  };

  projetos = [projetoProgressoGeral, ...projetos];

  console.log(projetos);

  return (
    <StyledContent>
      <h1>{titulo}</h1>
      <h3>{mensagemPosicaoAtual}</h3>
      <h3>{mensagemPrevisaoEntrega}</h3>
      <h3>{mensagemDiasRestantes}</h3>
      <ul>
        {projetos
          .map(projeto => ({
            ...projeto,
            porcentagem_tarefas_concluidas:
              (projeto.tarefas.filter(a => a.concluida).length /
                projeto.tarefas.length) *
              100
          }))
          .map(projeto => (
            <li>
              <h2>ITEM {projeto.item + " - " + projeto.descricao}</h2>
              <ProgressBar
                key={projeto.item}
                percentage={projeto.porcentagem_tarefas_concluidas}
                tarefas={projeto.tarefas}
              />
            </li>
          ))}
      </ul>
    </StyledContent>
  );
}

export default App;
