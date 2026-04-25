/*
 * This file is part of latex-pro.
 *
 * (c) 2019 Hasan Özbey
 * (c) 2026 zephyrisle <zephyr_isle@outlook.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import app from 'flarum/common/app';
import Button from 'flarum/common/components/Button';
import Component from 'flarum/common/Component';
import Dropdown from 'flarum/common/components/Dropdown';
import Separator from 'flarum/common/components/Separator';
import ItemList from 'flarum/common/utils/ItemList';
import icon from 'flarum/common/helpers/icon';

import getPrimaryDelimiters from '../utils/katex/getPrimaryDelimiters';
import getFlarumComposers from '../utils/getFlarumComposers';

export default class TextEditorButton extends Component {
  oninit(vnode) {
    this.isAsciiMath = false;
    super.oninit(vnode);
  }

  oncreate(vnode) {
    $(vnode.dom)
      .find('label.checkbox')
      .on('click', function (e) {
        e.stopPropagation();
      });
    super.oncreate(vnode);
  }

  view() {
    return Dropdown.component(
      {
        className: 'LatexPro-buttonsDropdown',
        buttonClassName: 'Button Button--flat',
        label: icon('fas fa-square-root-variable'),
      },
      this.items().toArray()
    );
  }

  items() {
    const items = new ItemList();

    items.add(
      'latex-pro-blockButton',
      Button.component(
        {
          icon: 'fas fa-vector-square',
          onclick: () => this.wrapSelection(true),
        },
        app.translator.trans('zephyrisle-latex-pro.forum.composer.block_expression' + (this.isAsciiMath ? '_asciimath' : ''))
      ),
      50
    );

    items.add(
      'latex-pro-inlineButton',
      Button.component(
        {
          icon: 'fas fa-grip-lines',
          onclick: () => this.wrapSelection(),
        },
        app.translator.trans('zephyrisle-latex-pro.forum.composer.inline_expression' + (this.isAsciiMath ? '_asciimath' : ''))
      ),
      0
    );

    if (app.forum.attribute('latex-pro.allow_asciimath')) {
      items.add('latex-pro-separator', Separator.component());
      items.add(
        'latex-pro-asciiMath',
        <label className="checkbox">
          <input
            type="checkbox"
            onchange={(e) => {
              this.isAsciiMath = e.target.checked;
              m.redraw.sync();
              e.redraw = false;
            }}
          />
          {app.translator.trans('zephyrisle-latex-pro.forum.composer.asciimath_only')}
        </label>
      );
    }

    return items;
  }

  wrapSelection(displayMode = false) {
    const composerClass = app.composer.body.componentClass;
    this.delimiters = getPrimaryDelimiters.bind(this, app.forum, getFlarumComposers().indexOf(composerClass) === -1)();

    const leftDelim = displayMode
      ? this.isAsciiMath ? this.delimiters.block_asciimath['left'] : this.delimiters.block['left']
      : this.isAsciiMath ? this.delimiters.inline_asciimath['left'] : this.delimiters.inline['left'];

    const rightDelim = displayMode
      ? this.isAsciiMath ? this.delimiters.block_asciimath['right'] : this.delimiters.block['right']
      : this.isAsciiMath ? this.delimiters.inline_asciimath['right'] : this.delimiters.inline['right'];

    const selectionRange = this.attrs.textEditor.getSelectionRange();

    if (selectionRange[0] != selectionRange[1]) {
      this.attrs.textEditor.insertAt(selectionRange[0], leftDelim);
      this.attrs.textEditor.insertAt(selectionRange[1] + leftDelim.length, rightDelim);
    } else {
      this.attrs.textEditor.replaceBeforeCursor(selectionRange[0], leftDelim + rightDelim);
      this.attrs.textEditor.moveCursorTo(selectionRange[0] + leftDelim.length);
    }
  }
}
