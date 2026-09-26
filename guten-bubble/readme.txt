=== Guten-bubble ===
Contributors: niatn1012
Donate link: 
Tags: speech, bubble, balloon
Requires at least: 6.6
Tested up to: 7.1
Stable tag: 1.0.0
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Displays a speech bubble like a chat conversation.

== Description ==

Guten-bubble can create a speech bubble display like a chat conversation.

# Features
* It's easy to create speech bubble using Guten-bubble block for the block editor in WordPress 6.6 or later.
* Pick from 24 color themes for speech bubble.
* You can use it as an icon image by importing image files from WordPress's media library. Let's make interesting articles by using icon image on hand!

# How to use in block editor

1. Add a Guten-bubble block where you want to add a speech bubble.
2. Enter serif in the balloon in the block ( the part where 'Enter serif here ...' placeholder is displayed ), select character icon and set the balloon in the inspector.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/guten-bubble` directory, or install the plugin through the WordPress plugins menu.
2. Activate the plugin through the WordPress plugins menu.

== Frequently Asked Questions ==

= To use the icon image on hand =

Open Guten-bubble settings page in the setting menu of the admin page.
Press the 'Select from media library' button to select the icon image you want to use from the media library (if you have not uploaded it yet, upload it here) and press the 'Import' button to import.
( Or upload the icon image files to the `/wp-content/uploads/guten-bubble/img` directory ( that is created on plugin install ) using FTP software etc. )

The imported icon images can be selected in the "Imported icons" group of the "Character icon (preset)" drop-down box in the Inspector of "Guten-bubble" block.
In the settings page, you can set the label displayed in the drop-down box (also when importing), change the order by dragging the icons (or using the arrow buttons), and delete the imported icon images.

Alternatively, select "custom" from the "Character icon (preset)" drop-down box
and enter the file name of the icon image ( relative path from `/wp-content/uploads/guten-bubble/img` directory ) in the "Character icon (custom)" input box,
that Icon image can be used.

Note: The imported icon images cannot be selected in the "Character icon (preset)" of the legacy block ('Use legacy block' option). Blocks using them are still displayed correctly.

== Screenshots ==

1. Guten-bubble block
2. Settings page

== Changelog ==

= 1.0.1 =
* The imported character icon images can be selected in 'Character icon (preset)' of the block.
* Added the label, order and deletion of the imported character icon images to the settings page.
= 1.0.0 =
* Rewrote the Guten-bubble block with TypeScript and React. Blocks created with earlier versions can be used as they are.
* Renewed the block settings in the inspector with the standard WordPress components.
* Supported the iframed block editor (Block API version 3).
* Added the 'Use legacy block' option to the settings page, to use the block of ver. 0.9.x.
* Changed the requirements to WordPress 6.6 or later and PHP 7.4 or later.
= 0.9.2 =
* Fixted version number.
= 0.9.1 =
* Upgraded 'Speech bubble text font size' property (Blocks already set as of version 0.8.1 will be migrated after the update).
* Fixed some CSS.
= 0.8.1 =
* First release.
== Upgrade Notice ==

= 1.0.0 =
Requires WordPress 6.6 or later and PHP 7.4 or later. If you have a problem with the new block, enable 'Use legacy block' in the Guten-bubble settings page.
