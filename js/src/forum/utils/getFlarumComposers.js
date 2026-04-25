/*
 * This file is part of latex-pro.
 *
 * (c) 2019 Hasan Özbey
 * (c) 2026 zephyrisle <zephyr_isle@outlook.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import DiscussionComposer from 'flarum/forum/components/DiscussionComposer';
import EditPostComposer from 'flarum/forum/components/EditPostComposer';
import ReplyComposer from 'flarum/forum/components/ReplyComposer';

export default function getFlarumComposers() {
  return [DiscussionComposer, EditPostComposer, ReplyComposer];
}
