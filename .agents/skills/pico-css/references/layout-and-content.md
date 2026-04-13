# Layout and Content

## Sources

- https://picocss.com/docs/container
- https://picocss.com/docs/landmarks-section
- https://picocss.com/docs/grid
- https://picocss.com/docs/overflow-auto
- https://picocss.com/docs/link
- https://picocss.com/docs/typography
- https://picocss.com/docs/button
- https://picocss.com/docs/table
- https://picocss.com/docs/nav

## Use Containers and Landmarks

- Use `.container` for a centered fixed-width layout in the default build.
- Use `.container-fluid` for a full-width layout in the default build.
- Use semantic containers in classless builds instead of helper classes.
- Expect these default viewport widths:

| Breakpoint | Min width | Viewport |
| --- | --- | --- |
| xs | under 576px | 100% |
| sm | 576px | 510px |
| md | 768px | 700px |
| lg | 1024px | 950px |
| xl | 1280px | 1200px |
| xxl | 1536px | 1450px |

- Let direct `body > header`, `main`, and `footer` children carry responsive vertical padding.
- Use `section` to get responsive vertical separation between content blocks.

## Use Grid and Overflow Intentionally

- Use `.grid` only for lightweight layouts.
- Expect Pico to collapse `.grid` columns below `768px`.
- Avoid `.grid` entirely in classless builds.
- Wrap wide tables or similar content in `.overflow-auto` instead of forcing the viewport to overflow:

```html
<div class="overflow-auto">
  <table>
    ...
  </table>
</div>
```

## Use Link and Typography Semantics

- Keep links semantic and let Pico style them.
- Use `.secondary` and `.contrast` only in the default build.
- Use `aria-current` for the active link state instead of inventing a parallel class.
- Let Pico's responsive root font sizing scale text with viewport size.
- Use `hgroup` when a heading needs a muted subtitle. Pico collapses margins there and mutes the last child.
- Use standard inline semantics such as `abbr`, `mark`, `kbd`, `small`, `sub`, `sup`, and `cite` instead of span-heavy wrappers.
- Use blockquotes with a `footer` and `cite` when attribution matters.

## Use Buttons and Tables the Pico Way

- Use native buttons or button-like inputs first. Pico styles both.
- Expect form buttons to default to `width: 100%` so they match form fields.
- Expect reset inputs to use the secondary visual style by default.
- Use `role="button"` only when the element cannot reasonably be a real `button`.
- Use `role="group"` when several buttons should behave as one control row.
- Use `data-theme` on `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, or `td` when a surface needs a different local scheme.
- Use `.striped` for zebra rows only in the default build.

## Use Nav Semantics Instead of Custom Menus

- Build primary navigation from `nav`, `ul`, `li`, and `a`.
- Expect top-level `ul` children to distribute horizontally and links to underline on hover.
- Use `.secondary`, `.contrast`, and `.outline` link styles only in the default build.
- Use buttons inside `li` when actions and navigation need to coexist. Pico makes button sizing match the link rhythm.
- Put `nav` inside `aside` to switch items to vertical stacking.
- Use `nav aria-label="breadcrumb"` for breadcrumbs and change the separator with `--pico-nav-breadcrumb-divider`.
- Remember that Pico keeps `nav` overflow visible and uses negative margins for keyboard focus styling, so do not "fix" that behavior without checking focus outlines first.
