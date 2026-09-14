export const updates = [
  {
    title: 'Mais segurança e estabilidade',
    description: 'Atualizamos a plataforma para oferecer uma experiência mais segura, estável e preparada para continuar evoluindo.',
  },
  {
    title: 'Visual mais agradável',
    description: 'A página ficou mais organizada, confortável de ler e fácil de usar, com transições leves que ajudam na navegação.',
  },
  {
    title: 'Escolha o seu tema',
    description: 'Você pode escolher entre os temas claro e escuro. O Tollbox lembra sua preferência no próximo acesso.',
  },
  {
    title: 'CNPJ com letras e números',
    description: 'O validador agora confere tanto os CNPJs tradicionais quanto os novos CNPJs que combinam letras e números.',
  },
  {
    title: 'Mais privacidade para você',
    description: 'Os textos, documentos e arquivos usados nas ferramentas são processados no seu próprio dispositivo e não são enviados para a internet.',
  },
  {
    title: 'Uma experiência mais completa',
    description: 'O Tollbox ganhou um novo ícone, uma página especial para quando algo não for encontrado e uma Política de Privacidade acessível no rodapé.',
  },
]

const updateDate = new Date()

export const formattedUpdateDate = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(updateDate)

export const updateDateTime = updateDate.toISOString().slice(0, 10)
