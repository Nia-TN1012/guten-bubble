import { __ } from '@wordpress/i18n';

/*
 * IMPORTANT: The `value` of each option is stored in posts.
 * Keep them identical to legacy/block_guten-bubble.js.
 */

export interface SelectOption {
	label: string;
	value: string;
}

export interface SelectOptionGroup {
	label: string;
	options: SelectOption[];
}

export interface FontSizeOption {
	name: string;
	slug: string;
	size: string;
}

/** The "Custom" option of "Character icon (preset)". */
export const getCustomCharaIconOption = (): SelectOption => ( { value: 'custom', label: __( 'Custom', 'guten-bubble' ) } );

/** Character icons bundled with the plugin. */
export const getDefaultCharaIconOptions = (): SelectOption[] => [
	{ value: 'default/01-rose.png', label: __( 'Rose', 'guten-bubble' ) },
	{ value: 'default/02-orange.png', label: __( 'Orange', 'guten-bubble' ) },
	{ value: 'default/03-lemon.png', label: __( 'Lemon', 'guten-bubble' ) },
	{ value: 'default/04-lime.png', label: __( 'Lime', 'guten-bubble' ) },
	{ value: 'default/05-viridian.png', label: __( 'Viridian', 'guten-bubble' ) },
	{ value: 'default/06-sky.png', label: __( 'Sky Blue', 'guten-bubble' ) },
	{ value: 'default/07-imperial.png', label: __( 'Imperial Blue', 'guten-bubble' ) },
	{ value: 'default/08-lavendar.png', label: __( 'Lavendar', 'guten-bubble' ) },
	{ value: 'default/09-monotone.png', label: __( 'Monotone', 'guten-bubble' ) },
	{ value: 'default/10-espresso.png', label: __( 'Espresso', 'guten-bubble' ) },
];

/**
 * Character icons imported on the settings page, in the order set there.
 * The value is the file name in the 'wp-content/uploads/guten-bubble/img/' folder,
 * which renders the same markup as "Custom" with that file name.
 */
export const getImportedCharaIconOptions = (): SelectOption[] => window.gutenBubble?.charaIcons ?? [];

/** All options of "Character icon (preset)": "Custom", the bundled icons and the imported icons. */
export const getCharaIconPresetOptions = (): SelectOption[] => [
	getCustomCharaIconOption(),
	...getDefaultCharaIconOptions(),
	...getImportedCharaIconOptions(),
];

/**
 * Groups of "Character icon (preset)" shown in the select box, following the "Custom" option.
 * The group of imported icons is omitted when there are none.
 */
export const getCharaIconPresetOptionGroups = (): SelectOptionGroup[] => {
	const groups: SelectOptionGroup[] = [ { label: __( 'Default icons', 'guten-bubble' ), options: getDefaultCharaIconOptions() } ];
	const imported = getImportedCharaIconOptions();
	if ( imported.length > 0 ) {
		groups.push( { label: __( 'Imported icons', 'guten-bubble' ), options: imported } );
	}
	return groups;
};

export const getCharaAlignOptions = (): SelectOption[] => [
	{ value: 'left', label: __( 'Left', 'guten-bubble' ) },
	{ value: 'right', label: __( 'Right', 'guten-bubble' ) },
];

export const getThemeColorOptions = (): SelectOption[] => [
	{ value: 'default', label: __( 'Default', 'guten-bubble' ) },
	{ value: 'rose', label: __( 'Rose', 'guten-bubble' ) },
	{ value: 'rose-fill', label: __( 'Rose (fill-color)', 'guten-bubble' ) },
	{ value: 'orange', label: __( 'Orange', 'guten-bubble' ) },
	{ value: 'orange-fill', label: __( 'Orange (fill-color)', 'guten-bubble' ) },
	{ value: 'lemon', label: __( 'Lemon', 'guten-bubble' ) },
	{ value: 'lemon-fill', label: __( 'Lemon (fill-color)', 'guten-bubble' ) },
	{ value: 'lime', label: __( 'Lime', 'guten-bubble' ) },
	{ value: 'lime-fill', label: __( 'Lime (fill-color)', 'guten-bubble' ) },
	{ value: 'viridian', label: __( 'Viridian', 'guten-bubble' ) },
	{ value: 'viridian-fill', label: __( 'Viridian (fill-color)', 'guten-bubble' ) },
	{ value: 'sky', label: __( 'Sky Blue', 'guten-bubble' ) },
	{ value: 'sky-fill', label: __( 'Sky Blue (fill-color)', 'guten-bubble' ) },
	{ value: 'imperial', label: __( 'Imperial Blue', 'guten-bubble' ) },
	{ value: 'imperial-fill', label: __( 'Imperial Blue (fill-color)', 'guten-bubble' ) },
	{ value: 'lavendar', label: __( 'Lavendar', 'guten-bubble' ) },
	{ value: 'lavendar-fill', label: __( 'Lavendar (fill-color)', 'guten-bubble' ) },
	{ value: 'monotone', label: __( 'Monotone', 'guten-bubble' ) },
	{ value: 'monotone-fill', label: __( 'Monotone (fill-color)', 'guten-bubble' ) },
	{ value: 'espresso', label: __( 'Espresso', 'guten-bubble' ) },
	{ value: 'espresso-fill', label: __( 'Espresso (fill-color)', 'guten-bubble' ) },
	{ value: 'success', label: __( 'Bootstrap like (Success)', 'guten-bubble' ) },
	{ value: 'info', label: __( 'Bootstrap like (Info)', 'guten-bubble' ) },
	{ value: 'warning', label: __( 'Bootstrap like (Warning)', 'guten-bubble' ) },
	{ value: 'danger', label: __( 'Bootstrap like (Danger)', 'guten-bubble' ) },
];

export const getTailTypeOptions = (): SelectOption[] => [
	{ value: 'speak', label: __( 'Speaking', 'guten-bubble' ) },
	{ value: 'think', label: __( 'Thinking', 'guten-bubble' ) },
];

export const getFontSizeOptions = (): FontSizeOption[] => [
	{ name: __( 'Small', 'guten-bubble' ), slug: 'small-v2', size: '1.0rem' },
	{ name: __( 'Middle', 'guten-bubble' ), slug: 'middle-v2', size: '1.125rem' },
	{ name: __( 'Large', 'guten-bubble' ), slug: 'large-v2', size: '1.75rem' },
	{ name: __( 'Extra Large', 'guten-bubble' ), slug: 'xlarge-v2', size: '2.25rem' },
	{ name: __( 'Ex Extra Large', 'guten-bubble' ), slug: 'xxlarge-v2', size: '3.75rem' },
	{ name: __( '(Legacy) Extra Small', 'guten-bubble' ), slug: 'xsmall', size: '10px' },
	{ name: __( '(Legacy) Small', 'guten-bubble' ), slug: 'small', size: '12px' },
	{ name: __( '(Legacy) Middle', 'guten-bubble' ), slug: 'middle', size: '16px' },
	{ name: __( '(Legacy) Large', 'guten-bubble' ), slug: 'large', size: '24px' },
	{ name: __( '(Legacy) Extra Large', 'guten-bubble' ), slug: 'xlarge', size: '32px' },
];

export const getCharaRadiusOptions = (): SelectOption[] => [
	{ value: 'square', label: __( 'Square', 'guten-bubble' ) },
	{ value: 'corner-r1', label: __( 'Corner radius Lv.1', 'guten-bubble' ) },
	{ value: 'corner-r2', label: __( 'Corner radius Lv.2', 'guten-bubble' ) },
	{ value: 'corner-r3', label: __( 'Corner radius Lv.3', 'guten-bubble' ) },
	{ value: 'corner-r4', label: __( 'Corner radius Lv.4', 'guten-bubble' ) },
	{ value: 'corner-r5', label: __( 'Corner radius Lv.5', 'guten-bubble' ) },
	{ value: 'corner-round', label: __( 'Rounded', 'guten-bubble' ) },
];

export const getBubbleRadiusOptions = (): SelectOption[] => [
	{ value: 'square', label: __( 'Square', 'guten-bubble' ) },
	{ value: 'corner-r1', label: __( 'Corner radius Lv.1', 'guten-bubble' ) },
	{ value: 'corner-r2', label: __( 'Corner radius Lv.2', 'guten-bubble' ) },
	{ value: 'corner-r3', label: __( 'Corner radius Lv.3', 'guten-bubble' ) },
	{ value: 'corner-r4', label: __( 'Corner radius Lv.4', 'guten-bubble' ) },
	{ value: 'corner-r5', label: __( 'Corner radius Lv.5', 'guten-bubble' ) },
];

export const getAnimationOptions = (): SelectOption[] => [
	{ value: 'none', label: __( 'None', 'guten-bubble' ) },
	{ value: 'spin', label: __( 'Spin', 'guten-bubble' ) },
	{ value: 'spin-rev', label: __( 'Spin (Reverse)', 'guten-bubble' ) },
	{ value: 'pendulum', label: __( 'Pendulum', 'guten-bubble' ) },
	{ value: 'snake', label: __( 'Snake', 'guten-bubble' ) },
	{ value: 'bound', label: __( 'Bound', 'guten-bubble' ) },
];
