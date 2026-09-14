export const updates = [
  {
    title: 'Visual mais agradável',
    description: 'A página ficou mais organizada, confortável de ler e fácil de usar, com transições leves que ajudam na navegação.',
  },
  {
    title: 'Escolha o seu tema',
    description: 'Você pode escolher entre os temas claro e escuro. O Toolbox lembra sua preferência no próximo acesso.',
  },
  {
    title: 'CNPJ com letras e números',
    description: 'Além do CNPJ tradicional, formado por 14 números, o Toolbox também valida o novo modelo alfanumérico da Receita Federal, que combina letras e números e mantém dois dígitos verificadores no final. O novo formato é destinado a novas inscrições, enquanto os CNPJs numéricos já existentes continuam válidos. A regra segue a Instrução Normativa RFB nº 2.229/2024.',
    source: {
      label: 'Ver referência na Receita Federal',
      href: 'https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/cnpj-alfanumerico',
    },
  },
  {
    title: 'Uma experiência mais completa',
    description: 'O Toolbox ganhou um novo ícone, uma página especial para quando algo não for encontrado e uma Política de Privacidade acessível no rodapé.',
  },
]

const updateDate = new Date()

const formattedMonthAndYear = new Intl.DateTimeFormat('pt-BR', {
  month: 'long',
  year: 'numeric',
}).format(updateDate)

export const formattedUpdateDate = formattedMonthAndYear.replace(/^./, (character) => character.toUpperCase())

export const updateDateTime = updateDate.toISOString().slice(0, 10)
