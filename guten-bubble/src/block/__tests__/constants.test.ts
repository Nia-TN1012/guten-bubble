/**
 * Tests of the options of "Character icon (preset)", including the icons
 * imported on the settings page (passed from PHP as window.gutenBubble).
 */
import { afterEach, describe, expect, it } from 'vitest';
import {
	getCharaIconPresetOptionGroups,
	getCharaIconPresetOptions,
	getDefaultCharaIconOptions,
	getImportedCharaIconOptions,
} from '../constants';

/** Values stored in posts by ver. 0.8.1 or later. They must never change. */
const legacyPresetValues = [
	'custom',
	'default/01-rose.png',
	'default/02-orange.png',
	'default/03-lemon.png',
	'default/04-lime.png',
	'default/05-viridian.png',
	'default/06-sky.png',
	'default/07-imperial.png',
	'default/08-lavendar.png',
	'default/09-monotone.png',
	'default/10-espresso.png',
];

const imported = [
	{ value: 'miku.png', label: 'Miku' },
	{ value: 'nia.png', label: 'Nia' },
	{ value: 'tmp.png', label: 'tmp.png' },
];

afterEach( () => {
	delete window.gutenBubble;
} );

describe( 'without imported icons', () => {
	it( 'has the same preset values as the legacy block, in the same order', () => {
		expect( getCharaIconPresetOptions().map( ( option ) => option.value ) ).toEqual( legacyPresetValues );
	} );

	it( 'has no imported options even if the data is missing or empty', () => {
		expect( getImportedCharaIconOptions() ).toEqual( [] );
		window.gutenBubble = {};
		expect( getImportedCharaIconOptions() ).toEqual( [] );
		window.gutenBubble = { charaIcons: [] };
		expect( getImportedCharaIconOptions() ).toEqual( [] );
	} );

	it( 'omits the group of imported icons', () => {
		const groups = getCharaIconPresetOptionGroups();
		expect( groups ).toHaveLength( 1 );
		expect( groups[ 0 ].label ).toBe( 'Default icons' );
		expect( groups[ 0 ].options ).toEqual( getDefaultCharaIconOptions() );
	} );
} );

describe( 'with imported icons', () => {
	it( 'appends the imported icons after the legacy presets, keeping their order', () => {
		window.gutenBubble = { charaIcons: imported };
		expect( getCharaIconPresetOptions().slice( legacyPresetValues.length ) ).toEqual( imported );
		expect( getCharaIconPresetOptions().map( ( option ) => option.value ) ).toEqual( [
			...legacyPresetValues,
			'miku.png',
			'nia.png',
			'tmp.png',
		] );
	} );

	it( 'shows the default and imported icons in separate groups', () => {
		window.gutenBubble = { charaIcons: imported };
		const groups = getCharaIconPresetOptionGroups();
		expect( groups.map( ( group ) => group.label ) ).toEqual( [ 'Default icons', 'Imported icons' ] );
		expect( groups[ 0 ].options ).toEqual( getDefaultCharaIconOptions() );
		expect( groups[ 1 ].options ).toEqual( imported );
	} );
} );
