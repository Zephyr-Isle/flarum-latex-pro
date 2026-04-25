/*
 * This file is part of latex-pro.
 *
 * (c) 2019 Hasan Özbey
 * (c) 2026 zephyrisle <zephyr_isle@outlook.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { extend, override } from 'flarum/common/extend';

import app from 'flarum/common/app';
import Page from 'flarum/common/components/Page';
import TextEditor from 'flarum/common/components/TextEditor';

import addCopyListener from './addCopyListener';
import addPostQuoteButton from './addPostQuoteButton';
import addTextEditorButton from './addTextEditorButton';
import delimiterReplacer from './utils/katex/delimiterReplacer';
import getPrimaryDelimiters from './utils/katex/getPrimaryDelimiters';
import getFlarumComposers from './utils/getFlarumComposers';

app.initializers.add(
  'zephyrisle-latex-pro',
  () => {
    const replaceDelimiters = (text = '', reverse = false, returnAsText = true) => {
      const span = document.createElement('span');
      span.textContent = text;
      return delimiterReplacer(span, delimiterReplacerOptions(reverse), returnAsText);
    };

    const preserveAliasesInCodeTag = (element) => {
      if (!app.forum.attribute('latex-pro.aliases_as_primary')) return;
      const codeNodeList = element.querySelectorAll('code');
      codeNodeList.forEach((c) => {
        if (c.classList.contains('hljs')) return;
        c.textContent = replaceDelimiters(c.textContent, true);
      });
    };

    const delimiterReplacerOptions = (reverse = false) => {
      const primaryDelimiters = getPrimaryDelimiters.bind(this, app.forum, !reverse)();
      const bbDelimiters = app.forum.attribute('latex-pro.bbcode_delimiters');
      const explicitBBDelimiters = app.forum.attribute('latex-pro.explicit_bbcode_delimiters');
      const aliasDelimiters = app.forum.attribute('latex-pro.alias_delimiters');
      const splitAtDelimiters = reverse ? bbDelimiters.concat(explicitBBDelimiters) : aliasDelimiters;

      let options = {
        primaryBlockDelimiter: primaryDelimiters.block,
        primaryInlineDelimiter: primaryDelimiters.inline,
        splitAtDelimiters,
      };

      if (app.forum.attribute('latex-pro.allow_asciimath')) {
        options['primaryBlockAsciiMathDelimiter'] = primaryDelimiters.block_asciimath;
        options['primaryInlineAsciiMathDelimiter'] = primaryDelimiters.inline_asciimath;
      }

      return options;
    };

    addPostQuoteButton();
    addTextEditorButton();
    addCopyListener();

    extend(Page.prototype, ['oncreate', 'onupdate'], () => preserveAliasesInCodeTag(document));

    if (s9e && s9e.TextFormatter) {
      override(s9e.TextFormatter, 'preview', function (original, preview, element) {
        original(replaceDelimiters(preview), element);
        preserveAliasesInCodeTag(element);
      });
    }

    getFlarumComposers().forEach((composer) => {
      override(composer.prototype, 'onsubmit', function (original) {
        this.composer.fields.content(replaceDelimiters(this.composer.fields.content()));
        original();
      });
    });

    extend(TextEditor.prototype, 'oncreate', function (original, vnode) {
      const $textarea = vnode.dom.querySelector('textarea');
      const composerClass = app.composer.body.componentClass;

      if (getFlarumComposers().indexOf(composerClass) === -1) {
        $textarea.addEventListener('input', function () {
          $textarea.value = replaceDelimiters($textarea.value);
        });
      } else {
        if (!app.forum.attribute('latex-pro.aliases_as_primary')) return;
        $textarea.value = replaceDelimiters(this.value, true);
      }
    });
  },
  -500
);
