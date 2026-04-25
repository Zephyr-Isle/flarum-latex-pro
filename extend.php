<?php

/*
 * This file is part of latex-pro.
 *
 * (c) 2019 Hasan Özbey
 * (c) 2026 zephyrisle <zephyr_isle@outlook.com>
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Zephyrisle\LatexPro;

use Flarum\Api\Resource\ForumResource;
use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->css(__DIR__.'/less/forum.less')
        ->js(__DIR__.'/js/dist/forum.js'),

    (new Extend\Frontend('admin'))
        ->css(__DIR__.'/less/admin.less')
        ->js(__DIR__.'/js/dist/admin.js'),

    (new Extend\Locales(__DIR__.'/locale')),

    (new Extend\Formatter())
        ->configure(ConfigureTextFormatter::class),

    (new Extend\ApiResource(ForumResource::class))
        ->fields(AddForumAttributes::class),

    (new Extend\Settings())
        // Defaults
        ->default('zephyrisle-latex-pro.alias_block_delimiters', '$%e%$,₺₺%e%₺₺')
        ->default('zephyrisle-latex-pro.alias_inline_delimiters', '\\(%e%\\)')
        ->default('zephyrisle-latex-pro.block_delimiters', '[math]%e%[/math]')
        ->default('zephyrisle-latex-pro.inline_delimiters', '[imath]%e%[/imath]')
        ->default('zephyrisle-latex-pro.alias_block_asciimath_delimiters', '\\$%e%\\$')
        ->default('zephyrisle-latex-pro.alias_inline_asciimath_delimiters', '\\{%e%\\}')
        ->default('zephyrisle-latex-pro.block_asciimath_delimiters', '[asmath]%e%[/asmath]')
        ->default('zephyrisle-latex-pro.inline_asciimath_delimiters', '[iasmath]%e%[/iasmath]')
        ->default('zephyrisle-latex-pro.color_is_text_color', '0')
        ->default('zephyrisle-latex-pro.enable_copy_tex', '1')
        ->default('zephyrisle-latex-pro.enable_fleqn', '0')
        ->default('zephyrisle-latex-pro.enable_leqno', '0')
        ->default('zephyrisle-latex-pro.enable_editor_buttons', '1')
        ->default('zephyrisle-latex-pro.throw_on_error', '0')
        ->default('zephyrisle-latex-pro.error_color', '#cc0000')
        ->default('zephyrisle-latex-pro.max_expand', '1000')
        ->default('zephyrisle-latex-pro.max_size', '10')
        ->default('zephyrisle-latex-pro.min_rule_thickness', '0.05')
        ->default('zephyrisle-latex-pro.output_mode', 'htmlAndMathml')
        ->default('zephyrisle-latex-pro.aliases_as_primary', '1')
        ->default('zephyrisle-latex-pro.allow_asciimath', '0')
        ->default('zephyrisle-latex-pro.cdn_katex', 'https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.js')
        ->default('zephyrisle-latex-pro.sri_katex', 'sha384-X/XCfMm41VSsqRNQgDerQczD69XqmjOOOwYQvr/uuC+j4OPoNhVgjdGFwhvN02Ja')
        ->default('zephyrisle-latex-pro.cdn_asciimath2tex', 'https://unpkg.com/asciimath2tex@1.4.0/dist/asciimath2tex.umd.js')
        ->default('zephyrisle-latex-pro.sri_asciimath2tex', 'sha384-cdvLGvItf6Jz+kIS7cNq6cThfMF6hSoUveHAZJBnJqmEosxD2lUHn2/pUmGKGybo')
        ->registerLessConfigVar(
            'config-copy-tex',
            'zephyrisle-latex-pro.enable_copy_tex',
            fn ($v) => \boolval($v) ? 'true' : 'false'
        )
        // Expose settings to the forum frontend via app.forum.attribute(...)
        ->serializeToForum('latex-pro.allow_asciimath', 'zephyrisle-latex-pro.allow_asciimath', fn ($v) => \boolval($v))
        ->serializeToForum('latex-pro.enable_editor_buttons', 'zephyrisle-latex-pro.enable_editor_buttons', fn ($v) => \boolval($v))
        ->serializeToForum('latex-pro.aliases_as_primary', 'zephyrisle-latex-pro.aliases_as_primary', fn ($v) => \boolval($v))
        ->serializeToForum('latex-pro.enable_copy_tex', 'zephyrisle-latex-pro.enable_copy_tex', fn ($v) => \boolval($v)),
];
