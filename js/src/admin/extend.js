/*
 * This file is part of latex-pro.
 *
 * (c) 2019 Hasan Özbey
 * (c) 2026 zephyrisle <zephyr_isle@outlook.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Extend from 'flarum/common/extenders';
import app from 'flarum/admin/app';

export default [
  new Extend.Admin()
    .setting(() => ({
      setting: 'zephyrisle-latex-pro.block_delimiters',
      label: app.translator.trans('zephyrisle-latex-pro.admin.settings.block_delimiters_text', {}, true),
      type: 'text',
      placeholder: '[math]%e%[/math]'
    }))
    .setting(() => ({
      setting: 'zephyrisle-latex-pro.inline_delimiters',
      label: app.translator.trans('zephyrisle-latex-pro.admin.settings.inline_delimiters_text', {}, true),
      type: 'text',
      placeholder: '[imath]%e%[/imath]'
    }))
    .setting(() => ({
      setting: 'zephyrisle-latex-pro.alias_block_delimiters',
      label: app.translator.trans('zephyrisle-latex-pro.admin.settings.alias_block_delimiters_text', {}, true),
      type: 'text',
      placeholder: '$%e%$,₺₺%e%₺₺'
    }))
    .setting(() => ({
      setting: 'zephyrisle-latex-pro.alias_inline_delimiters',
      label: app.translator.trans('zephyrisle-latex-pro.admin.settings.alias_inline_delimiters_text', {}, true),
      type: 'text',
      placeholder: '\\(%e%\\)'
    }))
    .setting(() => ({
      setting: 'zephyrisle-latex-pro.enable_editor_buttons',
      label: app.translator.trans('zephyrisle-latex-pro.admin.settings.enable_editor_buttons_label', {}, true),
      type: 'boolean'
    }))
    .setting(() => ({
      setting: 'zephyrisle-latex-pro.enable_copy_tex',
      label: app.translator.trans('zephyrisle-latex-pro.admin.settings.enable_copy_tex_label', {}, true),
      type: 'boolean'
    }))
    .setting(() => ({
      setting: 'zephyrisle-latex-pro.aliases_as_primary',
      label: app.translator.trans('zephyrisle-latex-pro.admin.settings.aliases_as_primary_label', {}, true),
      type: 'boolean'
    }))
    .setting(() => ({
      setting: 'zephyrisle-latex-pro.allow_asciimath',
      label: app.translator.trans('zephyrisle-latex-pro.admin.settings.allow_asciimath_label', {}, true),
      type: 'boolean'
    }))
];
