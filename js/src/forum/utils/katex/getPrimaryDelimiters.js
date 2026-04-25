/*
 * This file is part of latex-pro.
 *
 * (c) 2019 Hasan Özbey
 * (c) 2026 zephyrisle <zephyr_isle@outlook.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export default function getPrimaryDelimiters(forum, reverse = false) {
  let delimiters = {};

  if (forum.attribute('latex-pro.aliases_as_primary') && reverse === false) {
    delimiters = {
      inline: forum.attribute('latex-pro.primary_inline_delimiter_alias'),
      block: forum.attribute('latex-pro.primary_block_delimiter_alias'),
    };
    if (forum.attribute('latex-pro.allow_asciimath')) {
      delimiters['inline_asciimath'] = forum.attribute('latex-pro.primary_inline_asciimath_delimiter_alias');
      delimiters['block_asciimath'] = forum.attribute('latex-pro.primary_block_asciimath_delimiter_alias');
    }
    return delimiters;
  }

  delimiters = {
    inline: forum.attribute('latex-pro.primary_inline_delimiter'),
    block: forum.attribute('latex-pro.primary_block_delimiter'),
  };
  if (forum.attribute('latex-pro.allow_asciimath')) {
    delimiters['inline_asciimath'] = forum.attribute('latex-pro.primary_inline_asciimath_delimiter');
    delimiters['block_asciimath'] = forum.attribute('latex-pro.primary_block_asciimath_delimiter');
  }
  return delimiters;
}
