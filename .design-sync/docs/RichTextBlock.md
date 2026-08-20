---
category: Blocks
---
# RichTextBlock

The prose workhorse behind the CMS: headings, paragraphs, lists and grouped
term/definition pairs, rendered as cards.

`design.variant`:
- `"card"` (default) — one card, heading centered in `CardTitle`
- `"card-grid"` — `design.columns` cards side by side
- `"card-stack"` — cards stacked full width
- `"plain"` — no card chrome

Card `groups` render as term + sub pairs (`groupColumns: 1 | 2`), `emphasize`
promoting one to the emphasis font. Inline HTML in strings is sanitized.
