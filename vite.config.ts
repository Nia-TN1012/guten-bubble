import { v4wp } from '@kucrut/vite-for-wp';
import { wp_scripts } from '@kucrut/vite-for-wp/plugins';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

/**
 * Wraps entry chunks in an IIFE.
 *
 * The bundle is enqueued as a classic script (not a module), so top-level
 * declarations would otherwise leak into the global scope. `output.format: 'iife'`
 * cannot be used because the build has multiple inputs.
 */
function wrapInIife(): Plugin {
	return {
		name: 'guten-bubble:wrap-in-iife',
		apply: 'build',
		renderChunk( code, chunk ) {
			if ( ! chunk.isEntry || ! chunk.fileName.endsWith( '.js' ) ) {
				return null;
			}
			return { code: `(function(){\n${ code }\n})();\n`, map: null };
		},
	};
}

// https://vite.dev/config/
export default defineConfig( {
	plugins: [
		v4wp( {
			input: {
				'block-guten-bubble': 'guten-bubble/src/index.ts',
				gutenbubble: 'guten-bubble/src/css/gutenbubble.scss',
				'admin-gutenbubble': 'guten-bubble/src/css/admin-gutenbubble.scss',
			},
			outDir: 'guten-bubble/dist',
		} ),
		wp_scripts(),
		react(),
		wrapInIife(),
	],
	build: {
		sourcemap: false,
		rollupOptions: {
			output: {
				// Keep file names stable: wp_set_script_translations() resolves
				// translation JSON by the MD5 of the script's relative path.
				entryFileNames: 'assets/[name].js',
				chunkFileNames: 'assets/[name].js',
				assetFileNames: 'assets/[name][extname]',
			},
		},
	},
} );
