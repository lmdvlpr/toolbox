# Plano de upgrade do Toolbox

Branch de trabalho: `upgrade-dependencias-cnpj-alfanumerico`

Data do diagnóstico: 14/09/2026

## Objetivo

Atualizar todas as bibliotecas para versões estáveis e compatíveis, migrar o Toolbox de JavaScript para TypeScript, reduzir a superfície de vulnerabilidades, consolidar a interface em shadcn/ui, adicionar motion com acessibilidade, trocar o asset de marca e preparar o validador de CNPJ para os formatos numérico e alfanumérico definidos pela Receita Federal.

## Leitura de design

Este projeto é uma ferramenta de produtividade para profissionais de cartório. A interface deve transmitir precisão, confiança e rapidez, com linguagem visual utilitária e calma, usando shadcn/ui sobre Tailwind CSS como sistema único.

- DESIGN_VARIANCE: 4. A composição deve ser organizada e previsível para tarefas de conferência.
- MOTION_INTENSITY: 3. Motion curto e funcional para entrada de conteúdo, feedback de ação e mudança de estado.
- VISUAL_DENSITY: 5. Informações e controles devem caber com conforto, sem excesso de cartões ou ornamentação.
- Tipografia recomendada: Geist Variable, auto-hospedada pelo bundle com fallbacks `ui-sans-serif, system-ui, sans-serif`. É uma fonte sans-serif otimizada para interfaces, com boa leitura em tamanhos pequenos e sem depender de fonte externa.
- Tema: tokens semânticos com escolha explícita entre claro e escuro, sem alternância de tema entre seções.
- Forma: uma escala consistente de raios, com foco visível e contraste WCAG AA.
- Ícones: manter Lucide como única família, pois já existe no projeto; remover Heroicons e não misturar famílias.

## Diagnóstico atual

### Base do projeto

- Vite + React 18 + React Router DOM 6, com código inteiro em JavaScript e sem `tsconfig`.
- Tailwind CSS 3 com PostCSS, Autoprefixer e `@tailwindcss/forms`.
- MUI/Emotion usados apenas para o `LinearProgress` da tela de hash.
- `jssha` usado para SHA-256 no navegador.
- Não existem testes automatizados, configuração de CI ou abstração compartilhada de componentes.
- O favicon atual é `public/toolbox.svg`; o novo asset de marca será `C:/Users/lmdvl/Downloads/toolbox_icon.png`.
- A home já lista quatro serviços, mas usa CTAs visualmente iguais e emojis; o rodapé mostra apenas o ano e não possui o link pessoal solicitado.
- Não existe seletor de tema nem persistência de preferência dark/light.
- A dependência instalada não está disponível no working tree deste diagnóstico; o `package-lock.json` foi usado como base para o `npm audit`.

### Problemas funcionais e de UX

- `src/components/CnpjValidate.jsx` remove todas as letras antes de validar, rejeitando o CNPJ alfanumérico.
- A máscara de CNPJ aceita apenas dígitos e não normaliza letras minúsculas.
- `src/components/Encrypt.jsx` começa com estado de carregamento ativo mesmo sem arquivo escolhido.
- O componente de arquivo não valida explicitamente tipo, tamanho máximo ou ausência de arquivo antes de ler.
- Validação, formatação e mensagens estão acopladas aos componentes de tela, dificultando testes e manutenção.
- O layout usa `h-screen`, o que pode causar instabilidade em dispositivos móveis.
- A home usa gradiente multicolorido, emojis como ícones e quatro botões visualmente iguais.
- O ícone enviado é uma imagem 1024x1024; será usado como logo/favicon com variantes otimizadas para navegação, sem substituir a imagem original do usuário.
- O rodapé precisa exibir a data atual e o crédito ao autor, deixando o link `https://www.lmdvlpr.com/` exclusivamente no texto `Lucas Mota`.
- Não há estados de erro, sucesso, vazio e carregamento padronizados entre as ferramentas.

### Segurança e dependências

O `npm audit --json` executado em 14/09/2026 encontrou 23 vulnerabilidades no lockfile: 16 altas, 6 moderadas, 1 baixa e nenhuma crítica. As vulnerabilidades diretas de maior prioridade estão relacionadas a:

- `vite` 5.0.12 e dependências transitivas de servidor de desenvolvimento/build.
- `postcss` 8.4.29 e dependências transitivas de processamento CSS.
- `react-router-dom` 6.19.0 e `@remix-run/router`.

O `npm outdated` também mostrou que o projeto está defasado em React, React Router, Vite, Tailwind, MUI, Headless UI, Heroicons, Lucide, JsSHA e ferramentas de lint. A atualização deve ser feita por famílias compatíveis, sem aplicar `npm audit fix --force` cegamente.

## Plano por fases

### Fase 0. Baseline reproduzível

1. Definir a versão mínima de Node suportada, preferencialmente Node 20 LTS ou superior.
2. Instalar com `npm ci` e registrar a saída de `npm run build`, `npm run lint` e `npm audit --json` antes de mudar código.
3. Adicionar scripts de teste e um workflow de CI que execute instalação limpa, lint, testes, build e auditoria.
4. Guardar os resultados de cada onda de atualização para distinguir regressão de mudança esperada.

Saída: baseline executável e falhas conhecidas documentadas.

### Fase 1. Higiene de dependências e CVEs

1. Levantar a matriz completa de versões com `npm outdated`, `npm view` e `npm audit`, usando somente releases estáveis e compatíveis com a versão mínima de Node definida.
2. Atualizar em conjunto Vite, `@vitejs/plugin-react`, Rollup e demais dependências de build para as versões estáveis mais recentes.
3. Atualizar React e React DOM para a versão estável escolhida após os testes; avaliar React Router 7 em uma mudança isolada, preservando as rotas atuais.
4. Migrar Tailwind 3 para Tailwind 4 usando o plugin oficial do Vite e tokens CSS, removendo a cadeia PostCSS/Autoprefixer quando ela deixar de ser necessária.
5. Inicializar shadcn/ui no projeto Vite existente com `components.json`, aliases e variáveis CSS sem criar um segundo sistema visual.
6. Remover MUI, Emotion, Headless UI e Heroicons depois de substituir seus usos; manter apenas dependências realmente usadas.
7. Substituir `jssha` pela Web Crypto API para SHA-256, desde que o suporte mínimo de navegador seja confirmado. Caso exista requisito para contexto inseguro ou navegador legado, manter um fallback explícito.
8. Atualizar ESLint e plugins para as versões estáveis compatíveis, migrando de `.eslintrc.cjs` para flat config somente depois que a aplicação estiver estável.
9. Reexecutar `npm audit` após cada grupo. Qualquer exceção deve conter pacote, advisory, motivo, alcance e data de revisão.

Saída: lockfile regenerado, dependências diretas justificadas, CVEs corrigidas ou exceções documentadas.

### Fase 2. Migração de JavaScript para TypeScript

1. Adicionar TypeScript e os tipos estáveis de React, React DOM e Vite.
2. Criar `tsconfig.json` com `strict` habilitado progressivamente, alias `@/*` e configuração adequada para Vite.
3. Migrar `src/main.jsx`, `src/App.jsx`, `src/Router.jsx`, `src/layouts/Layout.jsx`, `src/pages/Home.jsx` e todos os componentes para `.tsx`.
4. Migrar utilitários de validação e formatação para `.ts`, exportando funções puras e tipos explícitos para resultados, erros e estados.
5. Tipar eventos de formulário, `FileReader`, estados de loading/error/success, componentes de navegação e propriedades dos componentes shadcn/ui.
6. Migrar `vite.config.js` para `vite.config.ts` e remover extensões JavaScript de configuração que não forem mais necessárias.
7. Eliminar `any` implícito e registrar no lint as regras mínimas para evitar regressão ao JavaScript sem tipagem.

Saída: aplicação compilando em TypeScript estrito, sem mudança funcional nas quatro rotas.

### Fase 3. Fundação de interface, marca e temas

1. Criar um `AppShell` com cabeçalho, navegação para as quatro ferramentas, link de retorno e suporte responsivo.
2. Criar os componentes shadcn/ui necessários: `Button`, `Card`, `Input`, `Textarea`, `Label`, `Alert`, `Progress`, `Separator` e, se fizer sentido no fluxo, `Tooltip`.
3. Copiar `C:/Users/lmdvl/Downloads/toolbox_icon.png` para um asset versionado do projeto, preferencialmente `public/toolbox_icon.png`, e criar tamanhos leves para favicon quando necessário.
4. Atualizar `index.html` para usar o PNG como favicon e exibir o mesmo asset no cabeçalho/home com `alt` apropriado.
5. Centralizar tokens de cor, tipografia, raios, foco e espaçamento em CSS variables; usar Geist Variable como fonte principal e preservar o azul como acento único após checar contraste.
6. Trocar emojis visuais por ícones Lucide com `aria-hidden`, mantendo nomes e textos das ferramentas.
7. Reestruturar a home para mostrar os quatro serviços atuais, cada um apontando para sua rota existente: conversor de textos, criptografar arquivos, validador de CPF e validador de CNPJ.
8. Manter o rodapé em todas as telas com a data atual em formato pt-BR e o crédito `Criado e desenvolvido por Lucas Mota`, envolvendo apenas `Lucas Mota` em um link para `https://www.lmdvlpr.com/`.
9. Criar `ThemeProvider` e `ThemeToggle` tipados, com escolhas `light` e `dark`, persistência em `localStorage`, prevenção de flash inicial e fallback coerente para a preferência do sistema.
10. Padronizar campos com label acima, ajuda contextual, erro abaixo, `aria-invalid`, `aria-describedby` e região `aria-live` para o resultado.
11. Trocar `h-screen` por `min-height: 100dvh` e validar o colapso para telas menores que 768px.

Saída: shell visual consistente, acessível e reutilizável, sem alteração de URL ou nome de campo.

### Fase 4. CNPJ numérico e alfanumérico

Extrair a regra para um módulo puro, por exemplo `src/lib/cnpj.js`, deixando a tela responsável apenas por estado e apresentação.

#### Regras de entrada

- Aceitar 14 posições no valor normalizado.
- Aceitar `0-9` e `A-Z` nas 12 primeiras posições.
- Normalizar letras minúsculas para maiúsculas e remover apenas pontuação e espaços da máscara.
- Rejeitar caracteres fora de `[A-Z0-9]`, tamanho incorreto e DVs não numéricos.
- Manter a máscara `XX.XXX.XXX/XXXX-XX` para os dois formatos.
- Manter CNPJs numéricos existentes válidos; não alterar identificadores já emitidos.
- Preservar a rejeição do CNPJ nulo `00000000000000` como regra de domínio já existente.

#### Cálculo dos dígitos verificadores

1. Para cada um dos 12 primeiros caracteres, usar `charCodeAt(0) - 48`. Assim, números preservam seus valores e `A-Z` assumem os valores ASCII menos 48.
2. Calcular o primeiro DV com módulo 11 e pesos distribuídos da direita para a esquerda de 2 a 9, reiniciando após o oitavo caractere.
3. Se o resto for 0 ou 1, o DV será 0. Caso contrário, será `11 - resto`.
4. Acrescentar o primeiro DV e repetir o cálculo para obter o segundo DV.
5. Comparar os dois DVs calculados com os dois últimos caracteres numéricos.

#### Casos de teste obrigatórios

- CNPJ numérico válido, por exemplo `04.252.011/0001-10`.
- CNPJ alfanumérico da documentação oficial: `12.ABC.345/01DE-35`.
- CNPJ numérico com e sem máscara.
- Entrada em minúsculas que deve ser normalizada para maiúsculas.
- Tamanho menor ou maior que 14 posições.
- Caractere especial ou letra em um DV.
- DV incorreto mantendo a base válida.
- CNPJ nulo.
- Edição incremental da máscara sem quebrar cursor e limite de 18 caracteres.

O validador deve informar que confere formato e dígitos verificadores, não a existência ou situação cadastral da empresa.

### Fase 5. Motion e estados de interação

1. Adicionar Motion usando `motion/react` em ilhas client-only pequenas, sem espalhar lógica de animação pelo app.
2. Usar entrada suave da página e dos resultados, hover/tap nos botões e transições curtas para sucesso e erro.
3. Configurar `MotionConfig` com `reducedMotion="user"` ou usar `useReducedMotion` para respeitar a preferência do sistema.
4. Animar apenas `transform` e `opacity`; não usar listeners manuais de scroll nem loops contínuos sem função de produto.
5. Padronizar estados de carregamento com `Progress` ou skeleton compatível com o layout final.
6. Corrigir o fluxo de hash: estado inicial vazio, validação de PDF até 50 MB, mensagens acionáveis, limpeza ao escolher outro arquivo e tratamento de `FileReader`.

Saída: feedback perceptível, curto e funcional, com fallback estático para redução de movimento.

### Fase 6. Qualidade e entrega

1. Adicionar testes unitários para CNPJ, CPF e funções de formatação.
2. Adicionar testes de componentes para validação, limpeza, mensagens acessíveis e seleção de arquivo.
3. Testar as quatro rotas em viewport móvel e desktop, nos temas claro e escuro.
4. Verificar teclado, foco, contraste, leitor de tela e `prefers-reduced-motion`.
5. Rodar `npm run lint`, `npm test`, `npm run build` e `npm audit --audit-level=high` em instalação limpa.
6. Fazer uma revisão manual da bundle gerada e dos Core Web Vitals básicos, especialmente o carregamento inicial.
7. Atualizar README com instalação, scripts, política de suporte de Node e nota sobre CNPJ alfanumérico.

Saída: branch pronta para revisão, com critérios de aceite verificáveis e sem avisos de segurança altos sem justificativa.

## Ordem recomendada de commits

Cada etapa deve ser revisável e usar Conventional Commits:

1. `docs: add upgrade plan`
2. `chore: refresh build and runtime dependencies`
3. `refactor: migrate application from javascript to typescript`
4. `refactor: consolidate ui foundation with shadcn`
5. `feat: support alphanumeric cnpj validation`
6. `feat: add accessible interaction motion`
7. `test: cover validators and tool flows`
8. `docs: update project usage and support matrix`

## Critérios de aceite

- A branch de trabalho é `upgrade-dependencias-cnpj-alfanumerico` e não usa o prefixo `codex/`.
- Todas as dependências estão em versões estáveis atuais, com o lockfile regenerado e sem atualização forçada incompatível.
- O código de aplicação e configuração está migrado para TypeScript com verificação estrita.
- O PNG enviado pelo usuário é o favicon e a imagem principal da marca no cabeçalho/home.
- As quatro rotas atuais continuam acessíveis com os mesmos slugs.
- A página inicial mostra exatamente os quatro serviços atuais.
- O rodapé mostra a data em pt-BR e o link externo envolve somente `Lucas Mota`.
- Geist Variable é usada como tipografia principal, com fallback local e boa legibilidade em telas pequenas.
- O usuário consegue alternar entre temas claro e escuro, e a escolha permanece após recarregar a página.
- CNPJs numéricos e alfanuméricos válidos passam; DVs incorretos e caracteres inválidos falham com mensagem clara.
- A máscara aceita a nova composição sem aceitar letras nos dois DVs.
- A UI usa componentes shadcn/ui e um único conjunto de tokens e ícones.
- Motion respeita redução de movimento e não prejudica teclado, foco, contraste ou mobile.
- `npm ci`, lint, testes, build e auditoria executam no CI.
- Não há vulnerabilidade alta sem correção ou exceção registrada.

## Funcionalidades recomendadas

### Recomendação de baixo risco: copiar resultados

Adicionar um botão `Copiar` nos resultados do conversor, do hash SHA-256 e dos validadores. A ação deve usar a Clipboard API, informar sucesso em `aria-live` e oferecer fallback ou mensagem clara quando a permissão do navegador for negada. É uma extensão diretamente alinhada ao uso diário em cartório e não altera o modelo de dados.

### Backlog opcional

- Atalhos de teclado para voltar à home e focar rapidamente o campo principal.
- PWA instalável para acesso rápido em computadores de atendimento, após validar necessidade de cache offline.
- Histórico local opcional dos últimos resultados, somente se houver uma decisão explícita sobre privacidade e limpeza dos dados.

## Fontes técnicas

- [Página do CNPJ Alfanumérico da Receita Federal](https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/cnpj-alfanumerico)
- [Perguntas e respostas do CNPJ Alfanumérico](https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/perguntas-e-respostas/cnpj/cnpj-alfanumerico.pdf)
- [Manual de cálculo do DV do CNPJ Alfanumérico](https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/documentos-tecnicos/cnpj/manual-dv-cnpj.pdf/@@download/file)
- [Documentação do shadcn/ui para Vite](https://ui.shadcn.com/docs/installation/vite)
- [Documentação do Motion para acessibilidade](https://motion.dev/docs/react-accessibility)
- [Guia de upgrade do Tailwind CSS](https://tailwindcss.com/docs/upgrade-guide)
