import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import wails from '@wailsio/runtime/plugins/vite';

import path from 'node:path';
import { fileURLToPath } from 'node:url';
const frontendRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
	resolve: {
		alias: {
			$lib: path.resolve(frontendRoot, 'src/lib'),
			$bindings: path.resolve(frontendRoot, 'bindings')
		}
	},
	server: {
		host: '127.0.0.1',
		port: Number(process.env.WAILS_VITE_PORT) || 9245,
		strictPort: true
	},
	plugins: [
		tailwindcss(),
		wails('./bindings'),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter({
				pages: 'dist', // Output prerendered pages to the dist directory
				assets: 'dist', // Output static assets to the dist directory as well
				fallback: '200.html'
			})
		})
	]
});
