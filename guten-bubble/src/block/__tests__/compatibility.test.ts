/**
 * Backward compatibility tests against legacy/block_guten-bubble.js.
 *
 * Blocks saved by the legacy script must be parsed as valid by the new block,
 * and re-serializing them must produce byte-identical markup.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
	children,
	createBlock,
	getBlockType,
	parse,
	registerBlockType,
	serialize,
	unregisterBlockType,
	type BlockConfiguration,
} from '@wordpress/blocks';
import * as element from '@wordpress/element';
import { afterEach, describe, expect, it } from 'vitest';
import { name, settings } from '../settings';

type Settings = BlockConfiguration & { deprecated: BlockConfiguration[] };

/** Evaluates the legacy script and captures the settings it registers. */
function loadLegacySettings(): Settings {
	const source = readFileSync( resolve( __dirname, '../../../legacy/block_guten-bubble.js' ), 'utf8' );
	let captured: Settings | undefined;
	const wp = {
		blocks: {
			registerBlockType: ( _name: string, legacySettings: Settings ) => {
				captured = legacySettings;
			},
		},
		editor: {},
		i18n: { __: ( text: string ) => text },
		element,
		components: {},
	};
	new Function( 'window', source )( { wp } );
	if ( ! captured ) {
		throw new Error( 'The legacy script did not register a block.' );
	}
	return captured;
}

const legacySettings = loadLegacySettings();

/** Converts an HTML fragment to a `children` sourced attribute value. */
function html( markup: string ) {
	const container = document.createElement( 'div' );
	container.innerHTML = markup;
	return children.fromDOM( container.childNodes );
}

function register( blockSettings: BlockConfiguration ) {
	if ( getBlockType( name ) ) {
		unregisterBlockType( name );
	}
	registerBlockType( name, blockSettings );
}

/** Serializes a block using the legacy script. */
function serializeWithLegacy( attributes: Record< string, unknown > ): string {
	register( legacySettings );
	return serialize( [ createBlock( name, attributes ) ] );
}

/** Serializes a ver. 0.8.1 - 0.9.0 block using the legacy deprecated save. */
function serializeWithLegacyV1( attributes: Record< string, unknown > ): string {
	register( { ...legacySettings, ...legacySettings.deprecated[ 0 ], deprecated: undefined } as BlockConfiguration );
	return serialize( [ createBlock( name, attributes ) ] );
}

function useNewBlock() {
	register( settings as unknown as BlockConfiguration );
}

afterEach( () => {
	if ( getBlockType( name ) ) {
		unregisterBlockType( name );
	}
} );

const fixtures: Record< string, Record< string, unknown > > = {
	'default attributes': {},
	'preset icon, right, thinking': {
		chara_icon_preset: 'default/05-viridian.png',
		chara_align: 'right',
		tail_type: 'think',
	},
	'imported icon selected as a preset': {
		chara_icon_preset: 'my-icon.png',
		chara_name: html( 'Alice' ),
	},
	'custom icon with plain name and content': {
		chara_icon_custom: 'my-icon.png',
		chara_name: html( 'Alice' ),
		content: html( 'Hello, world!' ),
	},
	'rich content with formats and entities': {
		chara_name: html( 'Bob &amp; <em>Carol</em>' ),
		content: html( '<strong>Bold</strong> &lt;tag&gt; <a href="https://example.com/?a=1&amp;b=2">link</a><br>next line' ),
	},
	'theme color and all effects': {
		theme_color: 'imperial-fill',
		effect_shadow: true,
		effect_nega: true,
		effect_chara_radius: 'corner-round',
		effect_bubble_radius: 'corner-r3',
		animation: 'pendulum',
	},
	'no shadow, bootstrap color': {
		theme_color: 'warning',
		effect_shadow: false,
		animation: 'spin-rev',
	},
	'font size (v2)': {
		content: html( 'Big text' ),
		content_fontsize_v2: '1.75rem',
	},
	'legacy font size preset (v2)': {
		content_fontsize_v2: '12px',
	},
};

describe( 'blocks saved by the legacy script', () => {
	for ( const [ title, attributes ] of Object.entries( fixtures ) ) {
		it( `are valid and re-serialize identically: ${ title }`, () => {
			const legacyHtml = serializeWithLegacy( attributes );

			useNewBlock();
			const [ block ] = parse( legacyHtml );

			expect( block.name ).toBe( name );
			expect( block.isValid ).toBe( true );
			expect( serialize( [ block ] ) ).toBe( legacyHtml );
		} );
	}
} );

describe( 'blocks saved by the new block', () => {
	for ( const [ title, attributes ] of Object.entries( fixtures ) ) {
		it( `are valid for the legacy script: ${ title }`, () => {
			useNewBlock();
			const newHtml = serialize( [ createBlock( name, attributes ) ] );

			register( legacySettings );
			const [ block ] = parse( newHtml );

			expect( block.isValid ).toBe( true );
			expect( serialize( [ block ] ) ).toBe( newHtml );
		} );
	}
} );

describe( 'the new save()', () => {
	it( 'matches the legacy save() when the character name is edited as a string', () => {
		const attributes = { chara_name: 'Dave & <Eve>', content: html( 'Hi' ) };
		const legacyHtml = serializeWithLegacy( attributes );

		useNewBlock();
		expect( serialize( [ createBlock( name, attributes ) ] ) ).toBe( legacyHtml );
	} );
} );

describe( 'an imported icon selected as a preset', () => {
	it( 'saves the same markup as "Custom" with its file name', () => {
		const common = { chara_name: html( 'Alice' ), content: html( 'Hi' ) };
		const customHtml = serializeWithLegacy( { ...common, chara_icon_preset: 'custom', chara_icon_custom: 'my-icon.png' } );

		useNewBlock();
		const presetHtml = serialize( [ createBlock( name, { ...common, chara_icon_preset: 'my-icon.png' } ) ] );

		// Only the block comment delimiter differs (it stores chara_icon_preset).
		const markup = ( blockHtml: string ) => blockHtml.replace( /^<!-- wp:[^>]*-->/, '' );
		expect( markup( presetHtml ) ).toBe( markup( customHtml ) );
	} );
} );

describe( 'blocks saved by ver. 0.8.1 - 0.9.0', () => {
	it.each( [
		[ 'with font size', 24, '24px' ],
		[ 'without font size', undefined, undefined ],
	] )( 'migrate like the legacy script: %s', ( _title, fontSize, expected ) => {
		const v1Html = serializeWithLegacyV1( {
			content: html( 'Old block' ),
			content_fontsize: fontSize,
		} );

		register( legacySettings );
		const [ legacyBlock ] = parse( v1Html );

		useNewBlock();
		const [ block ] = parse( v1Html );

		expect( block.isValid ).toBe( true );
		expect( block.attributes.content_fontsize_v2 ).toBe( expected );
		expect( serialize( [ block ] ) ).toBe( serialize( [ legacyBlock ] ) );
	} );
} );
