# Changelog

## [Unreleased]

### Added
- Internacionalização (i18n) completa da aplicação
  - Suporte para Português (PT) e Inglês (EN)
  - Detecção automática do idioma do navegador
  - Persistência da escolha do idioma
  - Seletor de idioma na interface
  - Traduções para todos os textos da aplicação

### Changed
- Refatoração da estrutura do projeto para suportar i18n
  - Novo contexto global para gerenciamento de idiomas
  - Componentes atualizados para usar traduções
  - Layout atualizado para prover contexto i18n

### Technical Details
- Implementação usando React Context API
- Armazenamento local usando localStorage
- Tipagem forte com TypeScript
- Suporte a SSR com Next.js