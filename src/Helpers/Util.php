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

namespace Zephyrisle\LatexPro\Helpers;

use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Support\Str;

class Util
{
    const EXPRESSION_PLACEHOLDER = '%e%';

    protected $prefix = 'zephyrisle-latex-pro.';

    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function get(string $key, string $default = ''): string
    {
        return $this->settings->get($this->prefix.$key, $default);
    }

    public function getKatexOptions(): array
    {
        return [
            'fleqn'            => \boolval($this->get('enable_fleqn')),
            'leqno'            => \boolval($this->get('enable_leqno')),
            'output'           => $this->get('output_mode'),
            'throwOnError'     => \boolval($this->get('throw_on_error')),
            'errorColor'       => $this->get('error_color'),
            'minRuleThickness' => \floatval($this->get('min_rule_thickness')),
            'maxSize'          => \floatval($this->get('max_size')),
            'maxExpand'        => \intval($this->get('max_expand')),
            'macros'           => \json_decode('{'.$this->get('macros').'}'),
            'colorIsTextColor' => \boolval($this->get('color_is_text_color')),
        ];
    }

    public function getClasses(): array
    {
        return [
            'block'  => 'latex-pro-block',
            'inline' => 'latex-pro-inline',
        ];
    }

    private function _getDelimitersByType(): array
    {
        return [
            'block'            => $this->_commaToArray($this->get('block_delimiters')),
            'blockAscii'       => $this->_commaToArray($this->get('block_asciimath_delimiters')),
            'inline'           => $this->_commaToArray($this->get('inline_delimiters')),
            'inlineAscii'      => $this->_commaToArray($this->get('inline_asciimath_delimiters')),
            'aliasBlock'       => $this->_commaToArray($this->get('alias_block_delimiters')),
            'aliasBlockAscii'  => $this->_commaToArray($this->get('alias_block_asciimath_delimiters')),
            'aliasInline'      => $this->_commaToArray($this->get('alias_inline_delimiters')),
            'aliasInlineAscii' => $this->_commaToArray($this->get('alias_inline_asciimath_delimiters')),
        ];
    }

    public function getDelimitersWithOptions(string $type, bool $isAsciiMathDelimiter = false): array
    {
        $categorizedDelimiters = $this->_getDelimitersByType();
        $delimitersWithOptions = [];
        $desiredKeys = [];

        switch ($type) {
            case 'bbcode':
                $desiredKeys = $isAsciiMathDelimiter ? ['blockAscii', 'inlineAscii'] : ['block', 'inline'];
                break;
            case 'alias':
                $desiredKeys = $isAsciiMathDelimiter ? ['aliasBlockAscii', 'aliasInlineAscii'] : ['aliasBlock', 'aliasInline'];
                break;
            default:
                $desiredKeys = $isAsciiMathDelimiter
                    ? ['blockAscii', 'aliasBlockAscii', 'inlineAscii', 'aliasInlineAscii']
                    : ['block', 'inline', 'aliasBlock', 'aliasInline'];
                break;
        }

        foreach ($categorizedDelimiters as $key => $delimiterArray) {
            if (!in_array($key, $desiredKeys)) {
                continue;
            }

            $displayMode = in_array($key, ['block', 'blockAscii', 'aliasBlock', 'aliasBlockAscii']);

            foreach ($delimiterArray as $delimiter) {
                $delimitersWithOptions = array_merge(
                    $delimitersWithOptions,
                    $this->_setOptions($delimiter, $displayMode, $isAsciiMathDelimiter)
                );
            }

            if ($type == 'alias') {
                $environments = ['equation', 'align', 'alignat', 'gather', 'CD'];
                foreach ($environments as $environment) {
                    array_push($delimitersWithOptions, [
                        'left'    => '\\\begin{'.$environment.'}',
                        'right'   => '\\\end{'.$environment.'}',
                        'display' => true,
                        'ascii'   => false,
                    ]);
                }
            }
        }

        return $delimitersWithOptions;
    }

    private function _setOptions(string $syntax, bool $displayMode = false, bool $asciiMath = false): array
    {
        return [[
            'left'    => Str::before($syntax, self::EXPRESSION_PLACEHOLDER),
            'right'   => Str::after($syntax, self::EXPRESSION_PLACEHOLDER),
            'display' => $displayMode,
            'ascii'   => $asciiMath,
        ]];
    }

    private function _commaToArray(string $list): array
    {
        if (empty($list)) {
            return [];
        }
        return array_unique(array_filter(preg_split('/[\s,]+/', trim($list))));
    }
}
