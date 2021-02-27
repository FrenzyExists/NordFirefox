# Nord-Minimal
## A Firefox Minimal Theme



[![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)
------
## Features

- Minimal bloat (non-crucial icons and decorations hidden)

- Easy way to tweak fonts, colors, and spacings to your liking through CSS variables

- Tab list below toolbar

- Tab(s) with sound playing highlighted with a different color

- Centered URL bar with narrow-er results list


------

## Prerequisites

* Verify that the user **stylesheets (userChrome)** option is enabled:
  1. Go to the address `about:config` in Firefox

  2. Search for `toolkit.legacyUserProfileCustomizations.stylesheets`

  3. Confirm the option is set to **true**



* Make sure that you have the **Default** theme enabled
  1. Go to the address `about:addons`
  2. **Enable** the **Default** theme if not already enabled


------

## Installation

1. Locate your Firefox user directory. You should be able to find it by navigating to `/home/.mozilla/firefox/` and looking for a directory ending with the world `.default-release`.
2. Within your Firefox user directory, locate the `chrome` directory, if one does not already exist you can simply go ahead and create it yourself.
3. Download the contents of this repository, and copy *all* the files to the chrome directory within your Firefox user directory.

After installation, restart Firefox to see the effects.

------


## Recommended Tweaks

* Select the **Customize** option from the **hamburger menu** **(≡)**, and remove all items except for:
    * Forward button
    * Back button
    * Downloads button
* The new tab page extension is called **nightTab**. [You can can find it here](https://addons.mozilla.org/en-US/firefox/addon/nighttab/)

------

## Customizing

You can easily tweak the theme by changing the relevant CSS variables, starting with `--mff-` located within the :root section at the top of the `userChrome.css` file.

```css
 :root {
     /* Minimal Functional Fox variables*/
     --mff-bg: #293241;
     --mff-icon-color: #e0fbfc;
     --mff-nav-toolbar-padding: 8px;
     /*
     ...
     ...
     ...
     */
}
```

