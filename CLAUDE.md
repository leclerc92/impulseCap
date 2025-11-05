# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ImpulseCap is a mobile-first React 19 application designed as a showcase for an adaptive exercise platform for people with disabilities. The goal is to enable individuals with disabilities to exercise safely and fight against sedentary lifestyles through personalized workout programs.

**IMPORTANT**: This application is designed exclusively for mobile devices. All UI and UX should be optimized for mobile viewing. The application uses a phone mockup component (`PhoneMockup`) that simulates an iPhone to display the mobile interface on desktop.

**Key Concept**: The app generates personalized exercise programs based on user profile information (disability type, body parts to target, duration, goals). There is NO backend - all data is managed client-side in React state.

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

## Application Architecture

### Navigation & Layout Structure

The app uses a **tab-based navigation** system with three main sections:

1. **Profil** (`FormulaireProfil`) - Multi-phase profile creation form
2. **Mes séances** (`MesSeances`) - Workout sessions list and exercise details
3. **Social** (`Social`) - Social/community features (placeholder)

Navigation is managed through:
- `App.tsx` - Root component managing `activeTab` state and routing logic
- `BottomNav.tsx` - Fixed bottom navigation bar (always visible)
- `PhoneMockup.tsx` - iPhone UI wrapper with notch, status bar, and home indicator

### Key Components

#### `src/App.tsx`
- Root application component
- Manages global state: `activeTab` and `showGenerationPopup`
- Handles navigation between tabs with `renderContent()` switch
- Controls program generation flow (profile form → popup → sessions)

#### `src/components/PhoneMockup.tsx`
- Simulates iPhone interface with realistic UI elements
- Includes notch, status bar, screen content area, home indicator
- Wraps all application content to provide mobile context on desktop

#### `src/components/BottomNav.tsx`
- Fixed bottom navigation with 3 tabs: Profil, Mes séances, Social
- Shows active tab with gradient indicator
- Uses emoji icons for visual communication

#### `src/components/FormulaireProfil.tsx`
- **3-phase profile creation form**:
  - **Phase 1**: Basic identification (age, gender, disability type, diagnosis)
  - **Phase 2**: Functional evaluation (mobility aids, motor limitations, medical conditions)
  - **Phase 3**: Goals and preferences (target body parts, duration, frequency)
- Form data stored in local state (interface `FormulaireData`)
- Conditional rendering based on disability category
- Triggers `onProgramSubmit()` callback to show generation popup

#### `src/components/GenerationPopup.tsx`
- Animated loading screen when generating personalized program
- Displays simulated AI processing steps
- Auto-redirects to sessions tab after completion

#### `src/components/MesSeances.tsx`
- Displays list of workout sessions (`Seance[]` with nested `Exercise[]`)
- Expandable accordion view for each session
- Shows session metadata: title, date, duration, category, difficulty
- Exercise cards with details: name, duration, reps, personalized advice
- Clicking exercise ID 2 ("Extensions des bras") opens detailed view
- Stats overview showing weekly frequency and session count

#### `src/components/ExerciceDetail.tsx`
- Full-screen detail view for a single exercise
- Video player section (placeholder if no video URL provided)
- Sections: Movement description, personalized advice, target muscles, precautions
- "Mark as completed" button with visual feedback
- Back button to return to sessions list

#### `src/components/Social.tsx`
- Placeholder component for future social/community features

### State Management

**No global state management library** - all state is managed with React's `useState` hook:

- `App.tsx`: Navigation state (`activeTab`, `showGenerationPopup`)
- `FormulaireProfil.tsx`: Form data (`FormulaireData` interface with nested objects)
- `MesSeances.tsx`: Sessions data, expanded session ID, selected exercise ID
- `ExerciceDetail.tsx`: Exercise completion status

### Data Structure

Key TypeScript interfaces:

```typescript
// FormulaireProfil.tsx
interface FormulaireData {
  age, genre, taille, poids, niveauActivite, categorieHandicap, diagnostic
  fauteuilRoulant, aidesMarche, equilibre
  fonctionMembresSupérieurs: { forcePrehension, amplitudeMouvement, zoneDouleur }
  fonctionMembresInférieurs: { supportPoids, capaciteEscaliers, zoneDouleur }
  maintieBuste, douleurActuelle, problemesCardio
  partiesCorpsPriorite, dureeSouhaitee, frequenceSouhaitee
}

// MesSeances.tsx
interface Seance {
  id, title, date, duration, category, difficulty
  exercises: Exercise[]
  completed: boolean
}

interface Exercise {
  id, name, duration, reps?, imageUrl, conseil
  completed: boolean
}
```

### Styling Approach

- **Tailwind CSS v4** for all styling (utility-first)
- Component-specific CSS files: `PhoneMockup.css`, `GenerationPopup.css`
- Color scheme: Blue (#blue-600) and Orange (#orange-500) gradients throughout
- Mobile-first responsive design (though optimized for phone mockup)
- Consistent card-based UI with `rounded-lg`, `shadow-lg`, `bg-white`

## Important Development Notes

### Tailwind CSS v4 Setup
This project uses Tailwind CSS v4 with the new Vite plugin:
- No separate postcss.config.js or tailwind.config.js needed
- Plugin configured directly in `vite.config.ts`
- Uses `@tailwindcss/vite` package instead of standalone tailwindcss

### TypeScript Configuration
- Uses project references for better build performance
- App code: `tsconfig.app.json`
- Build tools/config: `tsconfig.node.json`
- Root `tsconfig.json` only contains references

### ESLint
- Uses new flat config format (ESLint 9)
- Configured with React Hooks and React Refresh rules
- Ignores `dist` directory

### Mobile-First Design
- **All UI components should be optimized for mobile screens**
- Use the `PhoneMockup` component wrapper for desktop preview
- Consider touch interactions, scrolling behavior, and mobile viewport sizes
- Fixed elements (BottomNav, headers) should account for mobile safe areas

### No Backend
- All data is client-side only
- Exercise programs are hardcoded in component state
- Future iterations may add localStorage for persistence
- Program "generation" is simulated with animations
