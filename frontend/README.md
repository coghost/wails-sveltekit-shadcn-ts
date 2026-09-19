# Wails v3 + SvelteKit Frontend

This is the frontend part of a Wails v3 desktop application, built with SvelteKit, Tailwind CSS v4, and shadcn-svelte. It uses Bun for dependency management and builds.

## 🛠️ Tech Stack

- **Framework**: [SvelteKit](https://svelte.dev/docs/kit) (Svelte 5 Runes)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn-svelte](https://www.shadcn-svelte.com/)
- **Package Manager**: [Bun](https://bun.sh/)
- **Adapter**: `@sveltejs/adapter-static` (SPA mode, output directory: `dist`)

## 🚀 Frontend Development

**For full-stack development, run `wails3 dev` from the project root.**

If you want to **debug the frontend UI in isolation**, run the following inside the `frontend` directory:

```sh
bun run dev
```

*Note: When running the frontend independently, you cannot call the Go backend binding methods.*

## 📁 Frontend Structure

- `src/routes/`: SvelteKit routes (`+page.svelte`, `+layout.svelte`).
- `src/lib/`: Contains shadcn-svelte components, hooks, and utilities.
- `bindings/`: **Auto-generated** TypeScript bindings for Go services. Do not edit manually.
- `dist/`: Output directory for the production frontend build.

## 🧩 Adding shadcn-svelte Components

This project comes pre-configured with shadcn-svelte. To add a new component, run:

```sh
bunx shadcn-svelte@latest add [component-name]
```

For example, to add a Dialog component:

```sh
bunx shadcn-svelte@latest add dialog
```

## 📦 Frontend Build

To create a production build of the frontend:

```sh
bun run build
```

The output will be placed in the `frontend/dist/` directory, which is then embedded by the Go backend during `wails3 build`.

## 📌 Key Configuration Notes

1. **`adapter-static` Output Directory**: We configured `adapter({ pages: 'dist', assets: 'dist' })` in `vite.config.ts` to match Wails' default embedding path (`//go:embed all:frontend/dist`).
2. **SPA Mode**: We set `export const prerender = true;` and `export const ssr = false;` in `src/routes/+layout.ts` to support client-side routing.
