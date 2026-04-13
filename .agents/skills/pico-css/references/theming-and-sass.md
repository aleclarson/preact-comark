# Theming and Sass

## Sources

- https://picocss.com/docs/color-schemes
- https://picocss.com/docs/css-variables
- https://picocss.com/docs/sass
- https://picocss.com/docs/colors

## Contents

- Apply Color Schemes
- Override CSS Variables
- Compile a Custom Sass Build
- Use Shipped Theme Colors Deliberately
- Add Color Utilities Carefully

## Apply Color Schemes

- Treat light as the default scheme.
- Let Pico auto-enable dark mode when the user prefers it, or force a scheme with `data-theme`.
- Apply `data-theme="light"` or `data-theme="dark"` at the `html` level for a full page or at the element level for a local surface such as `article`, `table`, `input`, `textarea`, `select`, `dialog`, or `progress`.
- Set explicit `background-color` and `color` on generic containers when the inherited surface does not change visually enough:

```css
section {
  background-color: var(--pico-background-color);
  color: var(--pico-color);
}
```

## Override CSS Variables

- Override Pico tokens with CSS custom properties before writing bespoke component CSS.
- Treat Pico variables as two groups:
  - style variables that do not depend on theme
  - color variables that differ between light and dark schemes
- Override globally in `:root` or locally on the smallest selector that matches the request.
- Expect Pico variables to use the `--pico-` prefix by default.
- Start with the high-signal variable families:
  - typography and spacing: `--pico-font-size`, `--pico-spacing`, `--pico-border-radius`
  - color surfaces: `--pico-background-color`, `--pico-color`, `--pico-muted-color`
  - brand actions: `--pico-primary*`, `--pico-secondary*`, `--pico-contrast*`
  - forms: `--pico-form-element-*`, `--pico-switch-*`, `--pico-range-*`
  - components: `--pico-card-*`, `--pico-dropdown-*`, `--pico-modal-*`, `--pico-tooltip-*`
  - navigation: `--pico-nav-*`

- Use the light, dark auto, and dark forced selectors together when a change must work in every theme mode:

```css
[data-theme="light"],
:root:not([data-theme="dark"]) {
  --pico-primary: #bd3c13;
  --pico-primary-background: #d24317;
  --pico-primary-hover: #942d0d;
  --pico-primary-focus: rgba(244, 93, 44, 0.5);
}

@media only screen and (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --pico-primary: #f56b3d;
    --pico-primary-background: #d24317;
    --pico-primary-hover: #f8a283;
    --pico-primary-focus: rgba(245, 107, 61, 0.375);
  }
}

[data-theme="dark"] {
  --pico-primary: #f56b3d;
  --pico-primary-background: #d24317;
  --pico-primary-hover: #f8a283;
  --pico-primary-focus: rgba(245, 107, 61, 0.375);
}
```

## Compile a Custom Sass Build

- Prefer Sass when the request changes Pico's structure, not just its values.
- Import Pico with the package path or configure the Sass load path so `@use "pico"` resolves cleanly.

```scss
@use "pico" with (
  $theme-color: "purple"
);
```

- Reach for these settings first:
  - `$theme-color`: switch among Pico's shipped theme families
  - `$css-var-prefix`: rename the CSS custom property prefix
  - `$semantic-root-element`: retarget semantic containers away from `body`
  - `$enable-semantic-container`: turn `header`, `main`, and `footer` into containers
  - `$enable-viewport`: switch between centered and fluid semantic containers
  - `$enable-responsive-spacings`
  - `$enable-responsive-typography`
  - `$enable-classes`
  - `$parent-selector`: scope Pico to a subtree
  - `$breakpoints`: replace default breakpoint and viewport values
  - `$modules`: include or exclude modules

- Build a lighter custom bundle by disabling modules instead of overriding unused CSS afterward:

```scss
@use "pico" with (
  $enable-semantic-container: true,
  $enable-classes: false,
  $modules: (
    "content/code": false,
    "forms/input-range": false,
    "components/accordion": false,
    "components/dropdown": false,
    "components/modal": false,
    "components/tooltip": false
  )
);
```

- Disable the default theme and import a custom theme when the project needs a brand-specific palette rather than one of Pico's bundled theme colors.

## Use Shipped Theme Colors Deliberately

- Use Pico's bundled theme color switch when the request only needs a faster palette swap.
- Choose from these shipped theme names:
  - `amber`
  - `azure`
  - `blue`
  - `cyan`
  - `fuchsia`
  - `green`
  - `grey`
  - `indigo`
  - `jade`
  - `lime`
  - `orange`
  - `pink`
  - `pumpkin`
  - `purple`
  - `red`
  - `sand`
  - `slate`
  - `violet`
  - `yellow`
  - `zinc`

## Add Color Utilities Carefully

- Treat `pico.colors.min.css` as optional. It is almost the size of the whole library by itself.
- Avoid shipping every color family on production pages unless the design truly needs that surface area.
- Generate only the families and utility types the project actually uses when compiling Sass:

```scss
@use "colors/utilities" with (
  $palette: (
    "color-families": (red, pink, fuchsia, purple)
  ),
  $utilities: (
    "background-colors": false
  )
);
```
