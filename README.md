# BattleBuiltR

## Overview

BattleBuilt is a simple React app for building and sharing collectible card game decks. It recreates the main features from an earlier TypeScript reference project and demonstrates a clean, component-based React build using **Vite** for fast development, somthing I wanted to practice and sharpen my skills in.

The app focuses on practicing modern frontend patterns — component design, client-side routing, simple forms and lists, third-party API integration (Pokémon TCG API), and small performance touches like debouncing, request aborting, caching, and limiting fields from API responses.

YouTube Demo Video
[Software Demo Video]()

## Web pages

- Home (/)
	- Lists available decks from `public/data/decks.json` and displays them in a grid. Each deck card is rendered from the metadata in the JSON file and links to a detail page.

- Deck detail (/deck/:id)
	- Displays a single deck's details. The page attempts to load a per-deck JSON file from `public/data/decks/{id}.json` (if present) and shows the deck title, author, strategy description, and the list of cards included in the deck.

- Deck Builder (/builder)
	- Interactive deck builder UI. Choose a game (currently Pokemon), enter deck metadata (title, author, BattleGuide description) and add cards.
	- Adding cards is done via an Add Card modal which searches the Pokemon TCG API and returns card matches. Found cards are added into a client-side deck preview (no server persistence by default).

Navigation between pages is handled by React Router.

## Development environment

Prerequisites
- Node.js
- pnpm

Install and run
- Install dependencies: `pnpm install`
- Start dev server: `pnpm run dev`
- Open the app in a browser at: `http://localhost:5173/`

Build for production
- `pnpm run build` — builds a production-ready bundle (Vite)
- `pnpm run preview` — locally preview the production build

Environment variables
- The app expects a local `.env` with a Pokemon TCG API key when you want the Add Card modal to search the real API.

Used tools & libraries
- Vite — fast dev server and build tool
- React 18 — UI library
- react-router-dom — client-side routing
- pnpm — package manager (project sets `packageManager` in `package.json`)

## Useful websites

- Pokemon TCG API documentation — the API used for searching and fetching card data:
	https://docs.pokemontcg.io/ (or https://dev.pokemontcg.io/)
- React documentation — reference for React and hooks:
	https://reactjs.org/
- Vite documentation — build and dev server docs:
	https://vitejs.dev/

## Future work

* enabling the submitting of decks to a database for approval and storage
* CSS animations and styling for showing card information and abilities
* 