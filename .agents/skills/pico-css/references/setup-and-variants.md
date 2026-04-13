# Setup and Variants

## Sources

- https://picocss.com/docs
- https://picocss.com/docs/classless
- https://picocss.com/docs/conditional
- https://picocss.com/docs/container
- https://picocss.com/docs/landmarks-section
- https://picocss.com/examples

## Contents

- Install Pico
- Choose the Build Variant
- Use Classless Correctly
- Use Conditional Styling Correctly
- Reuse the Upstream Examples

## Install Pico

- Use the default stylesheet when the project wants Pico's class-light helpers and full component surface.
- Use CDN or local CSS for static sites:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
>
```

- Use NPM when the project already has a build step:

```bash
npm install @picocss/pico
```

- Import the Sass entrypoint when customizing the build:

```scss
@use "@picocss/pico/scss/pico";
```

- Use Composer only in PHP projects that already manage frontend assets that way:

```bash
composer require picocss/pico
```

- Start from this baseline when you need a minimal semantic page:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light dark">
    <link rel="stylesheet" href="css/pico.min.css">
    <title>Hello world!</title>
  </head>
  <body>
    <main class="container">
      <h1>Hello world!</h1>
    </main>
  </body>
</html>
```

## Choose the Build Variant

| Variant | Use when | Include | Watch for |
| --- | --- | --- | --- |
| Default | Need Pico's normal class-light helpers and components | `pico.min.css` | This is the baseline for `.container`, `.grid`, `.secondary`, `.contrast`, `.outline`, dropdowns, nav variants, and modal utilities. |
| Classless centered | Want pure semantic HTML with centered containers | `pico.classless.min.css` | `body > header`, `main`, and `footer` become containers. Do not use `.container`, `.grid`, or class-based variants. |
| Classless fluid | Want pure semantic HTML with fluid containers | `pico.fluid.classless.min.css` | Same constraints as classless centered, but no centered viewport. |
| Conditional | Want Pico styles only inside a subtree | `pico.conditional.min.css` | Wrap the styled region in `.pico`. The rest of the page keeps only the minimal root reset. |

## Use Classless Correctly

- Use classless when the request explicitly prefers semantic HTML over helper classes.
- Treat `body > header`, `body > main`, and `body > footer` as the container system.
- Avoid assuming these features exist in classless builds:
  - `.container`
  - `.container-fluid`
  - `.grid`
  - `.secondary`, `.contrast`, and `.outline` variants
  - dropdowns and other class-driven components

- Recompile classless for React, Gatsby, or Next.js when `body` is not the semantic root:

```scss
@use "pico" with (
  $semantic-root-element: "#root",
  $enable-semantic-container: true,
  $enable-classes: false
);
```

## Use Conditional Styling Correctly

- Use the conditional build when only part of a page should look like Pico.
- Wrap only the intended subtree in `.pico`.

```html
<main>
  <section>
    <p>Unstyled content</p>
  </section>
  <section class="pico">
    <p>Styled content</p>
  </section>
</main>
```

- Reproduce the same scope in Sass with:

```scss
@use "pico" with (
  $parent-selector: ".pico"
);
```

## Reuse the Upstream Examples

- Check the Pico examples repo before inventing a pattern from scratch.
- Reach for these examples first:
  - pure HTML baseline
  - classless HTML baseline
  - conditional styling
  - customized design system with Sass
  - React classless login
  - React color schemes and modal
