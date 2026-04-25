# LaTeX Pro for Flarum

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

TeX math rendering for your [Flarum](https://flarum.org/) forum, powered by [KaTeX](https://katex.org/).

Forked from [the-turk/flarum-mathren](https://github.com/the-turk/flarum-mathren) and adapted for Flarum v2.0.

## Features

- KaTeX-based rendering (fast and accurate)
- Inline expressions: `[imath]...[/imath]` or `$...$`
- Block expressions: `[math]...[/math]` or `$$...$$`
- AsciiMath syntax support (optional)
- Compatible with Markdown and BBCode
- Copy-to-clipboard for rendered expressions
- Quote button integration with `flarum/mentions`
- Text editor toolbar buttons
- Live preview support
- Fully configurable via admin panel (delimiters, CDN, KaTeX options)

## Requirements

- Flarum `^2.0.0`
- PHP `^8.3`

## Installation

```bash
composer require zephyrisle/latex-pro
```

Then enable it in your Flarum admin panel.

## Updating

```bash
composer update zephyrisle/latex-pro
php flarum cache:clear
```

## Usage

**Block expression** (`displayMode: true`):
```
[math]\int_{-\infty}^\infty\hat\xi\,e^{2\pi i\xi x}\,d\xi[/math]
```

**Inline expression** (`displayMode: false`):
```
Lorem ipsum [imath]\varDelta = b^2-4ac[/imath] sit amet.
```

Wrap with backticks or `code` tag to skip rendering.

## Building from Source

```bash
cd js
npm install
npm run build
```

## License

MIT — see [LICENSE](LICENSE).  
Original work © 2019 [Hasan Özbey](https://github.com/the-turk)  
Modifications © 2026 [zephyrisle](mailto:zephyr_isle@outlook.com)
