> IMPORTANT NOTICE
> 
> The upcoming version 1.0.0 will require **WordPress 6.6 or later** and **PHP 7.4 or later**.
> Please make sure your environment meets these requirements before updating.
> 

# Guten-bubble

Guten-bubble can create a speech bubble display like a chat conversation.

## Features
* It's easy to create speech bubble using Guten-bubble block for the block editor in WordPress 6.6 or later.
* Pick from 24 color themes for speech bubble.
* You can use it as an icon image by importing image files from WordPress's media library. Let's make interesting articles by using icon image on hand!

## How to use in block editor

1. Add a Guten-bubble block where you want to add a speech bubble.
2. Enter serif in the balloon in the block ( the part where 'Enter serif here ...' placeholder is displayed ), select character icon and set the balloon in the inspector.

![Screeenshot-1](https://raw.githubusercontent.com/Nia-TN1012/guten-bubble/main/guten-bubble/screenshot-1.png)

### To use the icon image on hand

Open Guten-bubble settings page in the setting menu of the admin page.
Press the 'Select from media library' button to select the icon image you want to use from the media library (if you have not uploaded it yet, upload it here) and press the 'Import' button to import.
( Or upload the icon image files to the `/wp-content/uploads/guten-bubble/img` directory ( that is created on plugin install ) using FTP software etc. )

![Screeenshot-2](https://raw.githubusercontent.com/Nia-TN1012/guten-bubble/main/guten-bubble/screenshot-2.png)

In the Inspector of "Guten-bubble" block, select "custom" from the "Character icon (preset)" drop-down box
and enter the file name of the icon image ( relative path from `/wp-content/uploads/guten-bubble/img` directory ) in the "Character icon (custom)" input box,
that Icon image can be used.

# Installation

1. Upload the plugin files to the `/wp-content/plugins/guten-bubble` directory, or install the plugin through the WordPress plugins menu.
2. Activate the plugin through the WordPress plugins menu.

# Release Note.

* 1.0.0:
  * Rewrote the Guten-bubble block with TypeScript and React. Blocks created with earlier versions can be used as they are.
  * Renewed the block settings in the inspector with the standard WordPress components.
  * Supported the iframed block editor (Block API version 3).
  * Added the 'Use legacy block' option to the settings page, to use the block of ver. 0.9.x.
  * Changed the requirements to WordPress 6.6 or later and PHP 7.4 or later.
* 0.9.2: Fixted version number.
* 0.9.1:
  * Upgraded 'Speech bubble text font size' property (Blocks already set as of version 0.8.1 will be migrated after the update).
  * Fixed some CSS.
* 0.8.1: First release

# Development

Requirements: Node.js, Yarn 1.x and Docker (for [wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/)).

```sh
yarn install
yarn build        # Build TypeScript / SCSS in guten-bubble/src into guten-bubble/dist
yarn env:start    # Start WordPress at http://localhost:8080 (admin / password)
yarn dev          # Rebuild on change (reload the browser to see changes)
yarn test         # Backward compatibility tests of the block
yarn lint
```

| Path | Description |
| --- | --- |
| `guten-bubble/` | The plugin itself (this folder is distributed) |
| `guten-bubble/src/` | TypeScript / SCSS sources (not distributed) |
| `guten-bubble/dist/` | Build output (not committed, distributed) |
| `guten-bubble/legacy/` | JavaScript / CSS of ver. 0.9.x, used when 'Use legacy block' is enabled. Do not edit. |

## Translations

```sh
yarn i18n:update  # Build, generate .pot files and merge them into .po files
# Edit guten-bubble/languages/*.po
yarn i18n:compile # Generate .mo and JSON (for the block script) files
```

`guten-bubble-ja-block-guten-bubble.json` is the translation of the legacy block script. Keep it as is.

## Release

```sh
yarn package      # Create guten-bubble.zip
yarn svn:copy     # Copy the plugin to svn/guten-bubble/trunk and the banners/icons to svn/guten-bubble/assets
```

# Legal Disclaimer

The author accept no any responsibility for any obstacles or damages caused by using this Plugin. Please be understanding of this beforehand.

# License

[GPLv2](https://www.gnu.org/licenses/gpl-2.0.html)