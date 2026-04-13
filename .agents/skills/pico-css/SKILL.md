---
name: pico-css
description: Build, refactor, debug, and theme semantic HTML UIs with Pico CSS. Use when Codex needs to install `@picocss/pico`, choose between the default, classless, conditional, or Sass-compiled variants, customize Pico with CSS variables or Sass modules, or implement Pico-styled forms, layout primitives, and components such as dropdowns, dialogs, navs, and tooltips.
---

# Pico CSS

Use this skill to work with Pico without re-deriving which build variant, selector contract, or token layer fits the request.

## Default Stance

- Prefer semantic HTML first. Reach for Pico's small class surface only when the docs require it.
- Choose the Pico build variant before changing markup. Many styling bugs are variant mismatches, not CSS bugs.
- Prefer CSS custom properties for palette, spacing, or component tuning. Recompile with Sass when changing modules, prefixes, breakpoints, or semantic root selectors.
- Remember that Pico ships no JavaScript. Interactive behavior for dialogs, dropdowns, and similar controls must be implemented separately.
- Treat classless builds as a different contract. Many classes and component variants are intentionally unavailable there.

## Start Here

- Identify how Pico is included now: plain CSS, CDN, NPM plus Sass, Composer, or not installed yet.
- Identify the active build: default `pico.min.css`, classless, fluid classless, conditional, or a custom Sass build.
- Identify the task shape before editing:
  - setup or variant selection
  - theming or design tokens
  - layout, typography, tables, or navigation
  - forms, validation, or interactive components
- Read exactly one focused reference first, then expand only if the task crosses boundaries:
  - [setup-and-variants.md](./references/setup-and-variants.md)
  - [theming-and-sass.md](./references/theming-and-sass.md)
  - [layout-and-content.md](./references/layout-and-content.md)
  - [forms-and-components.md](./references/forms-and-components.md)

## Workflow

1. Classify the request by build variant and task shape.
2. Confirm the variant constraints before editing markup.
   - Classless: use semantic containers, not `.container` or `.grid`.
   - Conditional: wrap styled regions in `.pico`.
   - Full build: class-light helpers such as `.container`, `.grid`, `.secondary`, `.contrast`, `.outline`, `.striped`, and component classes are available.
3. Implement the smallest semantic change first.
   - Prefer native elements Pico already styles: `button`, `dialog`, `details`, `table`, `nav`, `progress`, `input`, `textarea`, `select`.
   - Use the HTML and ARIA state hooks Pico expects: `aria-invalid`, `aria-current`, `aria-busy`, `role="group"`, `role="search"`, and `data-theme`.
4. Customize at the correct layer.
   - Override CSS variables in `:root` or a local selector for palette, spacing, radius, and component tuning.
   - Use Sass when changing included modules, theme color, breakpoint maps, selector prefixes, or the semantic root element.
5. Validate the actual UI contract.
   - Check whether a requested class or component exists in the chosen variant.
   - Check whether interactive components need supporting JavaScript.
   - Check whether local theming also needs explicit `background-color` and `color` on the target element.
   - Check responsive behavior below `768px`, where Pico collapses `.grid`.

## Output Rules

- Produce code changes, not Pico commentary alone.
- Preserve the existing build variant unless the user asks to migrate or the current variant blocks the request.
- Keep HTML semantic and minimal. Do not import a utility-class mindset into Pico.
- State the missing JavaScript or custom CSS boundary explicitly when Pico does not provide a behavior by itself.
