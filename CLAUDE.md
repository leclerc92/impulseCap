# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React 19 application built with TypeScript, Vite, and Tailwind CSS v4. The project uses modern React patterns including StrictMode and is configured for fast development with HMR (Hot Module Replacement).

## Key Technologies

- **React 19**: Latest React version with modern features
- **TypeScript 5.9**: Configured with project references (tsconfig.app.json for app code, tsconfig.node.json for build tooling)
- **Vite 7**: Build tool and dev server with React plugin
- **Tailwind CSS v4**: Uses the new @tailwindcss/vite plugin (different from v3 setup)
- **ESLint 9**: Flat config format with React Hooks and React Refresh rules

## Development Commands

```bash
# Start development server
npm run dev

# Build for production (runs TypeScript compiler first, then Vite build)
npm run build

# Lint all files
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Entry Point
- `src/main.tsx` - Application entry point, mounts React app to DOM with StrictMode
- `index.html` - HTML template with root div

### Main Component
- `src/App.tsx` - Root application component

### Styling
- Tailwind CSS v4 is integrated via Vite plugin in `vite.config.ts`
- Global styles in `src/index.css` and component styles in `src/App.css`

### Build Configuration
- `vite.config.ts` - Configures React plugin and Tailwind CSS plugin
- TypeScript uses project references for separation between app code and Node/build scripts
- ESLint uses flat config format (eslint.config.js) with recommended rules for React Hooks and React Refresh

## Important Notes

### Tailwind CSS v4
This project uses Tailwind CSS v4 with the new Vite plugin. The setup is different from v3:
- No separate postcss.config.js or tailwind.config.js needed
- Plugin is added directly in vite.config.ts
- Uses @tailwindcss/vite package instead of standalone tailwindcss

### TypeScript Configuration
- Uses project references for better build performance
- App code: `tsconfig.app.json`
- Build tools/config: `tsconfig.node.json`
- Root `tsconfig.json` only contains references to these files

### ESLint
- Uses new flat config format (ESLint 9)
- Configured with React Hooks and React Refresh rules
- Ignores `dist` directory

### Context generale

Tu es un développeur React et le but c’est que tu créer une application vitrine de notre future start up. Voici le projet :
Objectif : permettre au personnes en situation de handicap de faire du sport pour lutter contre la sédentarité : leur redonner de l’autonomie, sans leur faire courir le risque de blessure
Comment on le fait:
Générer des programmes personnalisés (temps,parties du corps, objectifs, handicaps) en fonction des renseignements
Les exercices existent nous on créer des PROGRAMMES personnalisés  
L’appli évolue par catégories :
on ajoute une catégorie après une phase de création des tous les exos pour cette catégorie (après validation et certification)
2eme niveau de précision dans la catégorie en fonction des informations renseigné dans le profil → donc des conseils personnalisés (texte) en plus de la vidéo du mouvement de base (par ex modifier le poids à soulever, faire le mouvement à moitié)
Embaucher des kinés pour la base de données initiale

Il n’y a pas de backend rien qu’un front-end !
