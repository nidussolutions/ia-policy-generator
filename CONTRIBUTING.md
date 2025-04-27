# Contribuindo com o Projeto

## Internacionalização (i18n)

### Adicionando Novas Strings
1. Adicione a string em `apps/web/i18n/en.ts`
2. Adicione a tradução em `apps/web/i18n/pt.ts`
3. Mantenha a mesma estrutura de chaves
4. Use chaves descritivas

### Adicionando Novo Idioma
1. Crie um novo arquivo em `apps/web/i18n/`
2. Copie a estrutura de `en.ts`
3. Traduza todas as strings
4. Atualize o tipo `Language` em `I18nContext.tsx`
5. Adicione o idioma ao seletor

### Testando
1. Verifique se todas as strings estão traduzidas
2. Teste a mudança de idiomas
3. Verifique a persistência da escolha
4. Teste em diferentes navegadores

## Commits

Use mensagens de commit descritivas seguindo o formato:
```
tipo(escopo): descrição curta

descrição longa (opcional)

footer (opcional)
```

Tipos:
- feat: nova funcionalidade
- fix: correção de bug
- docs: documentação
- style: formatação
- refactor: refatoração
- test: testes
- chore: tarefas de manutenção