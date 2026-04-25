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

use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Zephyrisle\LatexPro\Helpers\Util;

class LoadSettings
{
    protected $util;

    public function __construct(Util $util)
    {
        $this->util = $util;
    }

    public function __invoke(): array
    {
        $explicitAsciiDelimiters = $explicitLatexDelimiters = [];
        $allowAsciiMath = \boolval($this->util->get('allow_asciimath'));

        $bbCodeLatexDelimiters = $this->util->getDelimitersWithOptions('bbcode');
        $aliasLatexDelimiters  = $this->util->getDelimitersWithOptions('alias');

        if ($allowAsciiMath) {
            $bbCodeAsciiDelimiters = $this->util->getDelimitersWithOptions('bbcode', true);
            $aliasAsciiDelimiters  = $this->util->getDelimitersWithOptions('alias', true);
            $bbCodeDelimiters      = array_merge($bbCodeAsciiDelimiters, $bbCodeLatexDelimiters);
            $aliasDelimiters       = array_merge($aliasAsciiDelimiters, $aliasLatexDelimiters);
        } else {
            $bbCodeDelimiters = $bbCodeLatexDelimiters;
            $aliasDelimiters  = $aliasLatexDelimiters;
        }

        foreach ($bbCodeDelimiters as $delimiter) {
            $explicitArray = $delimiter['ascii'] === true ? 'explicitAsciiDelimiters' : 'explicitLatexDelimiters';
            $$explicitArray[] = [
                'left'    => Str::before($delimiter['left'], ']').':0'.']',
                'right'   => Str::before($delimiter['right'], ']').':0'.']',
                'display' => $delimiter['display'],
                'ascii'   => $delimiter['ascii'],
            ];
        }

        $explicitDelimiters = $allowAsciiMath
            ? array_merge($explicitAsciiDelimiters, $explicitLatexDelimiters)
            : $explicitLatexDelimiters;

        $settings = [
            'latex-pro.allow_asciimath'       => $allowAsciiMath,
            'latex-pro.katex_options'         => $this->util->getKatexOptions(),
            'latex-pro.enable_editor_buttons' => \boolval($this->util->get('enable_editor_buttons')),
            'latex-pro.aliases_as_primary'    => \boolval($this->util->get('aliases_as_primary')),
            'latex-pro.enable_copy_tex'       => \boolval($this->util->get('enable_copy_tex')),

            'latex-pro.bbcode_delimiters'          => $bbCodeDelimiters,
            'latex-pro.alias_delimiters'           => $aliasDelimiters,
            'latex-pro.explicit_bbcode_delimiters' => $explicitDelimiters,

            'latex-pro.primary_block_delimiter' => Arr::first(
                $explicitLatexDelimiters,
                fn($val) => $val['display'] === true
            ),
            'latex-pro.primary_inline_delimiter' => Arr::first(
                $explicitLatexDelimiters,
                fn($val) => $val['display'] === false
            ),
            'latex-pro.primary_block_delimiter_alias' => Arr::first(
                $aliasLatexDelimiters,
                fn($val) => $val['display'] === true
            ),
            'latex-pro.primary_inline_delimiter_alias' => Arr::first(
                $aliasLatexDelimiters,
                fn($val) => $val['display'] === false
            ),
        ];

        if ($allowAsciiMath) {
            $settings = array_merge($settings, [
                'latex-pro.primary_block_asciimath_delimiter' => Arr::first(
                    $explicitAsciiDelimiters,
                    fn($val) => $val['display'] === true
                ),
                'latex-pro.primary_inline_asciimath_delimiter' => Arr::first(
                    $explicitAsciiDelimiters,
                    fn($val) => $val['display'] === false
                ),
                'latex-pro.primary_block_asciimath_delimiter_alias' => Arr::first(
                    $aliasAsciiDelimiters,
                    fn($val) => $val['display'] === true
                ),
                'latex-pro.primary_inline_asciimath_delimiter_alias' => Arr::first(
                    $aliasAsciiDelimiters,
                    fn($val) => $val['display'] === false
                ),
            ]);
        }

        return $settings;
    }
}
