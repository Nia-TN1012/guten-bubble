/**
 * Minimal type declarations for @wordpress/block-editor.
 *
 * The package does not ship type definitions for its entry point, so only the
 * APIs used by this plugin are declared here.
 */
declare module '@wordpress/block-editor' {
	import type { ComponentType, CSSProperties, HTMLAttributes, ReactNode } from 'react';

	export interface RichTextProps {
		tagName?: string;
		value: string;
		onChange: ( value: string ) => void;
		placeholder?: string;
		style?: CSSProperties;
		className?: string;
	}
	export const RichText: ComponentType< RichTextProps >;

	export const InspectorControls: ComponentType< { children?: ReactNode; group?: string } >;

	type BlockProps = HTMLAttributes< HTMLElement > & Record< string, unknown >;

	export const useBlockProps: {
		( props?: BlockProps ): BlockProps;
		save( props?: BlockProps ): BlockProps;
	};
}
