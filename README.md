# Circuito Zero — o portfólio que se molda à vaga

**No ar:** https://renanfrontend.github.io/circuito-zero/

Quem recruta cola a descrição de uma vaga e a página se reorganiza para ela:

- **Título reescrito** com as competências que a vaga pede e que eu comprovo.
- **Circuito requisito → evidência**: cada requisito acende uma prova real (frase de uma empresa, projeto publicado com link ou formação). A corrente animada mostra a força da prova.
- **Lacunas à mostra**: o que a vaga pede e eu ainda não comprovo aparece numa seção própria, com a competência mais próxima quando ela existe (sem contar como prova).
- **Cobertura com fórmula visível**: `Σ (peso × força) ÷ Σ peso`. Requisitos pesam 2, diferenciais pesam 1. Não é nota de ATS nem chance de contratação.
- **Tempo somado por competência**: meses nas empresas em que ela aparece, sem contar o mesmo mês duas vezes.
- **Projetos e experiência reordenados**: projetos pela relevância para a vaga, destaques de cada empresa acesos ou apagados.
- **Link por vaga**: o texto vai comprimido depois do `#` do endereço. Quem abre o link vê a versão já moldada, e o texto nunca passa por um servidor.
- **Resumo para o recrutador**: um botão copia um texto pronto com cada requisito e onde está a prova.

A versão 1 do projeto (o jogo de portas lógicas) continua em [`jogo/`](jogo/).

## Rodar localmente

```bash
node serve.js
```

Abra http://localhost:5190. Não há dependências nem build.

## Testes

```bash
node --test tests/engine.test.js
```

## Arquivos

- `data.js` — experiências, projetos, formação, a lista de ~50 competências com sinônimos (PT e EN) e as três vagas de exemplo. Todos os fatos vêm do portfólio publicado.
- `engine.js` — motor puro (sem DOM): lê a vaga, separa requisitos de diferenciais, liga cada um às evidências e calcula a cobertura.
- `app.js` — interface: formulário, link compartilhável, transições (View Transitions API) e cópia do resumo.
- `style.css` — visual, responsivo, com movimento reduzido respeitado.
- `serve.js` — servidor estático mínimo para testar.

## Limites conhecidos

- Só reconhece as competências listadas em `data.js`. Termos fora da lista não entram no cálculo.
- A leitura de requisitos é por palavras-chave e cabeçalhos ("Requisitos", "Diferenciais", "Seria legal"…). Vagas sem essa estrutura contam tudo como requisito.

## Publicar

Publicado no GitHub Pages a partir da branch `main` (raiz). Cada push na `main` atualiza o site.
