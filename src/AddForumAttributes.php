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

use Flarum\Api\Context;
use Flarum\Api\Schema\Attribute;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Zephyrisle\LatexPro\Helpers\Util;

class AddForumAttributes
{
    protected $util;

    public function __construct(Util $util)
    {
        $this->util = $util;
    }

    /**
     * Returns the extra field definitions to add to ForumResource.
     */
    public function __invoke(): array
    {
        $util = $this->util;

        return [
            Attribute::make('latex-pro.katex_options')
                ->get(fn () => $util->getKatexOptions()),

            Attribute::make('latex-pro.bbcode_delimiters')
                ->get(fn () => $util->getDelimitersWithOptions('bbcode')),

            Attribute::make('latex-pro.alias_delimiters')
                ->get(fn () => $util->getDelimitersWithOptions('alias')),

            Attribute::make('latex-pro.explicit_bbcode_delimiters')
                ->get(fn () => $this->buildExplicitDelimiters()),

            Attribute::make('latex-pro.primary_block_delimiter')
                ->get(fn () => $this->primaryDelimiter($util->getDelimitersWithOptions('bbcode'), true)),

            Attribute::make('latex-pro.primary_inline_delimiter')
                ->get(fn () => $this->primaryDelimiter($util->getDelimitersWithOptions('bbcode'), false)),

            Attribute::make('latex-pro.primary_block_delimiter_alias')
                ->get(fn () => $this->primaryDelimiter($util->getDelimitersWithOptions('alias'), true)),

            Attribute::make('latex-pro.primary_inline_delimiter_alias')
                ->get(fn () => $this->primaryDelimiter($util->getDelimitersWithOptions('alias'), false)),
        ];
    }

    private function buildExplicitDelimiters(): array
    {
        $bbCodeDelimiters = $this->util->getDelimitersWithOptions('bbcode');
        $allowAsciiMath   = \boolval($this->util->get('allow_asciimath'));

        if ($allowAsciiMath) {
            $bbCodeDelimiters = array_merge(
                $this->util->getDelimitersWithOptions('bbcode', true),
                $bbCodeDelimiters
            );
        }

        $explicit = [];
        foreach ($bbCodeDelimiters as $delimiter) {
            $explicit[] = [
                'left'    => Str::before($delimiter['left'], ']').':0'.']',
                'right'   => Str::before($delimiter['right'], ']').':0'.']',
                'display' => $delimiter['display'],
                'ascii'   => $delimiter['ascii'],
            ];
        }

        return $explicit;
    }

    private function primaryDelimiter(array $delimiters, bool $display): ?array
    {
        return Arr::first($delimiters, fn ($v) => $v['display'] === $display);
    }
}
