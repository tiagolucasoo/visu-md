# Visu-Md

Visualizador de Markdown com foco em leitura: importe um arquivo `.md` e leia-o renderizado com tema escuro/claro, sumário automático e exportação para PDF e HTML. 100% processamento local — nada é enviado a servidor.

## Funcionalidades

- **Importar** `.md`, `.markdown` ou `.txt` — via botão, arrastar e soltar na sidebar, ou pelo atalho no mobile
- **Renderização GFM** — tabelas, task lists, code blocks, blockquotes e âncoras nos títulos
- **Sumário automático** gerado dos headings do documento
- **Metadados** — nome do arquivo, linhas, palavras e tempo de leitura
- **Compartilhar** — copia um link com o documento embutido no fragmento da URL (sem backend, o conteúdo nunca sai do navegador)
- **Exportar PDF** — via diálogo de impressão, apenas o documento
- **Exportar HTML** — arquivo standalone com estilos embutidos
- **Tema claro/escuro** com alternância no header

## Rodando

```bash
npm install
npm start        # http://localhost:3000
npm run build    # build de produção em ./build
```

## Stack

React (CRA) · Tailwind CSS · react-markdown + remark-gfm

## Deploy

Projeto estático — faça upload do `build/` ou conecte o repositório na Vercel (build command `npm run build`, output `build`).

---

Desenvolvido por [tiagolucas.tech](https://tiagolucas.tech)
