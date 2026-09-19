import { registerBlockType } from '@wordpress/blocks';
import { name, settings } from './block/settings';
import type { GutenBubbleAttributes } from './block/types';

registerBlockType< GutenBubbleAttributes >( name, settings );
