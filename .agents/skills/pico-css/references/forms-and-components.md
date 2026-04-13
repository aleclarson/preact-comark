# Forms and Components

## Sources

- https://picocss.com/docs/forms
- https://picocss.com/docs/forms/textarea
- https://picocss.com/docs/forms/input
- https://picocss.com/docs/forms/select
- https://picocss.com/docs/forms/radios
- https://picocss.com/docs/forms/checkboxes
- https://picocss.com/docs/forms/switch
- https://picocss.com/docs/forms/range
- https://picocss.com/docs/accordion
- https://picocss.com/docs/card
- https://picocss.com/docs/group
- https://picocss.com/docs/dropdown
- https://picocss.com/docs/loading
- https://picocss.com/docs/modal
- https://picocss.com/docs/progress
- https://picocss.com/docs/tooltip

## Build Forms Semantically

- Expect text inputs, selects, textareas, and buttons to default to `width: 100%`.
- Put `input` either inside or outside its `label`; Pico supports both patterns.
- Use `<small>` directly below the field for helper text.
- Use `.grid` inside a form only when the layout should collapse on smaller screens.
- Use `role="group"` when inputs or buttons should stay on one row even on mobile.

## Use Native States First

- Drive validation with `aria-invalid`, not a custom validation class.
- Let helper text inherit the validation state color by keeping the `<small>` immediately below the control.
- Use `disabled` and `readonly` attributes instead of CSS-only disabled looks.
- Expect these Pico-specific affordances:
  - `type="search"` gets a distinctive search-field style
  - datetime-like inputs get icons
  - `type="file"` uses a secondary-style button
  - `input[type="checkbox"][role="switch"]` gets switch styling
  - checkboxes can be made indeterminate through the DOM property, not HTML markup alone

## Use Groups and Search Correctly

- Use `role="group"` to stack children horizontally for compound controls.
- Use `role="search"` when the row should match Pico's search-field styling.
- Expect grouped controls inside `form` to stretch to full width.
- Expect group focus styling to rely on `:has()`. Browsers without `:has()` fall back to normal child focus styles.
- Prefer `role="group"` over `.grid` when the row must stay horizontal on mobile.

## Use Components on Their Native Elements

- Build accordions from `details` and `summary`.
- Add the same `name` value to related `details` elements when only one accordion item should remain open.
- Use `summary role="button"` when the accordion trigger should look like a button. Limit `.secondary`, `.contrast`, and `.outline` to non-classless builds.
- Build cards from `article`, with optional `header` and `footer`.
- Build dropdowns from `details class="dropdown"` with `summary` and `ul` as direct children.
- Expect dropdowns outside `nav` to default to `width: 100%`.
- Use radio or checkbox inputs inside dropdowns when modeling custom single- or multi-select controls.
- Expect dropdown alignment inside nav menus to follow the submenu `ul`, including `dir="rtl"` when needed.
- Treat dropdowns as a styling layer only. Add JavaScript when the request needs custom-select behavior or richer interaction.

## Use Loading, Dialog, Progress, and Tooltip Boundaries

- Apply loading states with `aria-busy="true"` on blocks, inline elements, or buttons.
- Build modals from `dialog` and wrap the modal body in `article`.
- Use a `header` close button with `rel="prev"` when the design calls for Pico's aligned close affordance.
- Use `footer` inside the dialog article when actions should align right.
- Treat modal control as a JavaScript boundary. Pico styles the dialog, but it does not open, close, or trap focus for you.
- Use the `open` attribute for a statically open dialog.
- Use `.modal-is-open`, `.modal-is-opening`, and `.modal-is-closing` only in the default build.
- Use native `progress` for determinate or indeterminate progress bars.
- Treat tooltips as attribute-driven styling. Default placement is above the target, and `data-placement` changes the direction.
