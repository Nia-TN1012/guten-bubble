import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// Separate from vite.config.ts: the WordPress externals used for the build
// must not apply to tests, which resolve @wordpress/* from node_modules.
export default defineConfig( {
	plugins: [ react() ],
	test: {
		environment: 'jsdom',
		include: [ 'guten-bubble/src/**/*.test.{ts,tsx}' ],
		server: {
			deps: {
				// Let Vite transform @wordpress/* packages (they import JSON without import attributes).
				inline: [ /@wordpress\// ],
			},
		},
	},
} );
