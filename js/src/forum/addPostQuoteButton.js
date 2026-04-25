/*
 * This file is part of latex-pro.
 *
 * (c) 2019 Hasan Özbey
 * (c) 2026 zephyrisle <zephyr_isle@outlook.com>
 *
 * Original quote button logic Copyright Stichting Flarum (Flarum Foundation).
 * Licensed under the MIT License.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/common/components/CommentPost';

import copyDelimiters from './utils/katex/copyDelimiters';
import getPrimaryDelimiters from './utils/katex/getPrimaryDelimiters';
import selectedText from './utils/mentions/selectedText';

export default function addPostQuoteButton() {
  extend(CommentPost.prototype, 'oncreate', function () {
    if (!('flarum-mentions' in flarum.extensions) || !app.forum.attribute('latex-pro.enable_copy_tex')) return;

    const PostQuoteButton = require('flarum/mentions/fragments/PostQuoteButton');
    const post = this.attrs.post;
    const delimiters = getPrimaryDelimiters.bind(this, app.forum)();

    if (post.isHidden() || (app.session.user && !post.discussion().canReply())) return;

    const $postBody = this.$('.Post-body');
    const $container = $('<div class="LatexPro-quoteButtonContainer"></div>');
    const button = new PostQuoteButton(post);

    const handler = function (e) {
      setTimeout(() => {
        const content = selectedText($postBody, copyDelimiters(delimiters));
        if (content) {
          button.content = content;
          m.render($container[0], button.render());

          const rects = window.getSelection().getRangeAt(0).getClientRects();
          const firstRect = rects[0];

          if (e.clientY < firstRect.bottom && e.clientX - firstRect.right < firstRect.left - e.clientX) {
            button.showStart(firstRect.left, firstRect.top);
          } else {
            const lastRect = rects[rects.length - 1];
            button.showEnd(lastRect.right, lastRect.bottom);
          }
        }
      }, 1);
    };

    this.$().after($container).on('mouseup', handler);
    if ('ontouchstart' in window) {
      document.addEventListener('selectionchange', handler, false);
    }
  });
}
