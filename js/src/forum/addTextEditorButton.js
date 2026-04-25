/*
 * This file is part of latex-pro.
 *
 * (c) 2019 Hasan Özbey
 * (c) 2026 zephyrisle <zephyr_isle@outlook.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { extend } from 'flarum/common/extend';
import TextEditor from 'flarum/common/components/TextEditor';

import TextEditorButton from './components/TextEditorButton';

export default function addTextEditorButton() {
  extend(TextEditor.prototype, 'toolbarItems', function (items) {
    if (app.forum.attribute('latex-pro.enable_editor_buttons')) {
      items.add('zephyrisle-latex-pro', <TextEditorButton textEditor={this.attrs.composer.editor} />);
    }
  });
}
