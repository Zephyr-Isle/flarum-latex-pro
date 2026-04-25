/*
 * This file is part of latex-pro.
 *
 * (c) 2019 Hasan Özbey
 * (c) 2026 zephyrisle <zephyr_isle@outlook.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Select from 'flarum/common/components/Select';
import Switch from 'flarum/common/components/Switch';

app.initializers.add('zephyrisle-latex-pro', () => {
  app.extensionData.for('zephyrisle-latex-pro').registerSetting(function () {
    return (
      <div className="LatexPro-SettingsContainer">
        <div className="LatexPro-KatexOptions">
          <h3>{app.translator.trans('zephyrisle-latex-pro.admin.settings.katex_options_heading')}</h3>
          <hr />
          <h4>{app.translator.trans('zephyrisle-latex-pro.admin.settings.delimiters_label')}</h4>
          <div className="helpText">{app.translator.trans('zephyrisle-latex-pro.admin.settings.delimiters_text')}</div>
          <div className="helpText">
            <i className="fa-icon fas fa-exclamation-circle" />
            {app.translator.trans('zephyrisle-latex-pro.admin.settings.bbcode_delimiters_rule_text')}
          </div>
          <div className="LatexPro--flex LatexPro--binary">
            <div className="LatexPro--delimiterGroup">
              <div className="helpText">{app.translator.trans('zephyrisle-latex-pro.admin.settings.block_delimiters_text')}</div>
              <div className="Form-group">
                <input className="FormControl" type="text" bidi={this.setting('zephyrisle-latex-pro.block_delimiters')} placeholder="[math]%e%[/math]" />
              </div>
            </div>
            <div className="LatexPro--delimiterGroup">
              <div className="helpText">{app.translator.trans('zephyrisle-latex-pro.admin.settings.block_asciimath_delimiters_text')}</div>
              <div className="Form-group">
                <input className="FormControl" type="text" bidi={this.setting('zephyrisle-latex-pro.block_asciimath_delimiters')} placeholder="[asmath]%e%[asmath]" />
              </div>
            </div>
          </div>
          <div className="LatexPro--flex">
            <div className="LatexPro--delimiterGroup">
              <div className="helpText">{app.translator.trans('zephyrisle-latex-pro.admin.settings.inline_delimiters_text')}</div>
              <div className="Form-group">
                <input className="FormControl" type="text" bidi={this.setting('zephyrisle-latex-pro.inline_delimiters')} placeholder="[imath]%e%[/imath]" />
              </div>
            </div>
            <div className="LatexPro--delimiterGroup">
              <div className="helpText">{app.translator.trans('zephyrisle-latex-pro.admin.settings.inline_asciimath_delimiters_text')}</div>
              <div className="Form-group">
                <input className="FormControl" type="text" bidi={this.setting('zephyrisle-latex-pro.inline_asciimath_delimiters')} placeholder="[iasmath]%e%[iasmath]" />
              </div>
            </div>
          </div>
          <div className="LatexPro--flex">
            <div className="LatexPro--delimiterGroup">
              <div className="helpText">{app.translator.trans('zephyrisle-latex-pro.admin.settings.alias_block_delimiters_text')}</div>
              <div className="Form-group">
                <input className="FormControl" type="text" bidi={this.setting('zephyrisle-latex-pro.alias_block_delimiters')} placeholder="$%e%$,₺₺%e%₺₺" />
              </div>
            </div>
            <div className="LatexPro--delimiterGroup">
              <div className="helpText">{app.translator.trans('zephyrisle-latex-pro.admin.settings.alias_block_asciimath_delimiters_text')}</div>
              <div className="Form-group">
                <input className="FormControl" type="text" bidi={this.setting('zephyrisle-latex-pro.alias_block_asciimath_delimiters')} placeholder="\$%e%\$" />
              </div>
            </div>
          </div>
          <div className="LatexPro--flex">
            <div className="LatexPro--delimiterGroup">
              <div className="helpText">{app.translator.trans('zephyrisle-latex-pro.admin.settings.alias_inline_delimiters_text')}</div>
              <div className="Form-group">
                <input type="text" className="FormControl" bidi={this.setting('zephyrisle-latex-pro.alias_inline_delimiters')} placeholder="\(%e%\)" />
              </div>
            </div>
            <div className="LatexPro--delimiterGroup">
              <div className="helpText">{app.translator.trans('zephyrisle-latex-pro.admin.settings.alias_inline_asciimath_delimiters_text')}</div>
              <div className="Form-group">
                <input type="text" className="FormControl" bidi={this.setting('zephyrisle-latex-pro.alias_inline_asciimath_delimiters')} placeholder="\{%e%\}" />
              </div>
            </div>
          </div>
          <div className="helpText">
            <i className="fa-icon fas fa-exclamation-circle" />
            {app.translator.trans('zephyrisle-latex-pro.admin.settings.primary_delimiters_text')}
          </div>
          <div className="LatexPro--flex">
            <div className="Form-group">
              <label>{app.translator.trans('zephyrisle-latex-pro.admin.settings.output_mode_label')}</label>
              <div className="helpText">{app.translator.trans('zephyrisle-latex-pro.admin.settings.output_mode_text')}</div>
            </div>
            <div className="Form-group">
              <Select
                value={this.setting(['zephyrisle-latex-pro.output_mode'])()}
                options={{ html: 'HTML', mathml: 'MathML', htmlAndMathml: 'HTML & MathML' }}
                buttonClassName="Button"
                onchange={this.settings['zephyrisle-latex-pro.output_mode']}
              />
            </div>
          </div>
          <div className="Form-group">
            <Switch state={!!this.setting(['zephyrisle-latex-pro.enable_fleqn'])() && this.setting(['zephyrisle-latex-pro.enable_fleqn'])() !== '0'} onchange={this.settings['zephyrisle-latex-pro.enable_fleqn']}>
              {app.translator.trans('zephyrisle-latex-pro.admin.settings.enable_fleqn_label')}
            </Switch>
          </div>
          <div className="Form-group">
            <Switch state={!!this.setting(['zephyrisle-latex-pro.enable_leqno'])() && this.setting(['zephyrisle-latex-pro.enable_leqno'])() !== '0'} onchange={this.settings['zephyrisle-latex-pro.enable_leqno']}>
              {app.translator.trans('zephyrisle-latex-pro.admin.settings.enable_leqno_label')}
            </Switch>
          </div>
          <div className="Form-group">
            <Switch state={!!this.setting(['zephyrisle-latex-pro.color_is_text_color'])() && this.setting(['zephyrisle-latex-pro.color_is_text_color'])() !== '0'} onchange={this.settings['zephyrisle-latex-pro.color_is_text_color']}>
              {app.translator.trans('zephyrisle-latex-pro.admin.settings.color_is_text_color_label')}
            </Switch>
          </div>
          <div className="Form-group">
            <Switch state={!!this.setting(['zephyrisle-latex-pro.throw_on_error'])() && this.setting(['zephyrisle-latex-pro.throw_on_error'])() !== '0'} onchange={this.settings['zephyrisle-latex-pro.throw_on_error']}>
              {app.translator.trans('zephyrisle-latex-pro.admin.settings.throw_on_error_label')}
            </Switch>
          </div>
          <div className="LatexPro--flex">
            <div className="Form-group">
              <label>{app.translator.trans('zephyrisle-latex-pro.admin.settings.error_color_label')}</label>
              <div className="helpText">{app.translator.trans('zephyrisle-latex-pro.admin.settings.error_color_text')}</div>
            </div>
            <div className="Form-group">
              <input type="color" className="FormControl" bidi={this.setting('zephyrisle-latex-pro.error_color')} />
            </div>
          </div>
          <h4>{app.translator.trans('zephyrisle-latex-pro.admin.settings.sizing_options_heading')}</h4>
          <div className="LatexPro--flex">
            <div className="helpText">{app.translator.trans('zephyrisle-latex-pro.admin.settings.minimum_thickness_text')}</div>
            <div className="Form-group">
              <input type="number" lang="en-US" min="0" step=".01" className="FormControl" bidi={this.setting('zephyrisle-latex-pro.min_rule_thickness')} placeholder="0.05" />
            </div>
          </div>
          <div className="LatexPro--flex">
            <div className="helpText">{app.translator.trans('zephyrisle-latex-pro.admin.settings.maximum_size_text')}</div>
            <div className="Form-group">
              <input type="number" min="0" className="FormControl" bidi={this.setting('zephyrisle-latex-pro.max_size')} placeholder="10" />
            </div>
          </div>
          <div className="Form-group">
            <label>{app.translator.trans('zephyrisle-latex-pro.admin.settings.macros_label')}</label>
            <div className="helpText">{app.translator.trans('zephyrisle-latex-pro.admin.settings.macros_text')}</div>
            <div className="helpText">
              <i className="fa-icon fas fa-exclamation-circle" />
              {app.translator.trans('zephyrisle-latex-pro.admin.settings.java_syntax_text')}
            </div>
            <textarea className="FormControl" bidi={this.setting('zephyrisle-latex-pro.macros')} placeholder='"\\RR": "\\mathbb{R}"' />
          </div>
          <div className="LatexPro--flex">
            <div className="helpText">{app.translator.trans('zephyrisle-latex-pro.admin.settings.maximum_expand_limit_text')}</div>
            <div className="Form-group">
              <input type="number" min="0" className="FormControl" bidi={this.setting('zephyrisle-latex-pro.max_expand')} placeholder="1000" />
            </div>
          </div>
        </div>
        <div className="LatexPro-CDNOptions">
          <h3>{app.translator.trans('zephyrisle-latex-pro.admin.settings.cdn_options_heading')}</h3>
          <hr />
          <div className="LatexPro--flex LatexPro--binary">
            <div className="LatexPro--cdnGroup">
              <div className="helpText">{app.translator.trans('zephyrisle-latex-pro.admin.settings.cdn_katex_text')}</div>
              <div className="Form-group">
                <input className="FormControl" type="text" bidi={this.setting('zephyrisle-latex-pro.cdn_katex')} />
              </div>
            </div>
            <div className="LatexPro--cdnGroup">
              <div className="helpText">{app.translator.trans('zephyrisle-latex-pro.admin.settings.sri_katex_text')}</div>
              <div className="Form-group">
                <input className="FormControl" type="text" bidi={this.setting('zephyrisle-latex-pro.sri_katex')} />
              </div>
            </div>
          </div>
          <div className="LatexPro--flex LatexPro--binary">
            <div className="LatexPro--cdnGroup">
              <div className="helpText">{app.translator.trans('zephyrisle-latex-pro.admin.settings.cdn_asciimath2tex_text')}</div>
              <div className="Form-group">
                <input className="FormControl" type="text" bidi={this.setting('zephyrisle-latex-pro.cdn_asciimath2tex')} />
              </div>
            </div>
            <div className="LatexPro--cdnGroup">
              <div className="helpText">{app.translator.trans('zephyrisle-latex-pro.admin.settings.sri_asciimath2tex_text')}</div>
              <div className="Form-group">
                <input className="FormControl" type="text" bidi={this.setting('zephyrisle-latex-pro.sri_asciimath2tex')} />
              </div>
            </div>
          </div>
        </div>
        <div className="LatexPro-OtherOptions">
          <h3>{app.translator.trans('zephyrisle-latex-pro.admin.settings.other_options_heading')}</h3>
          <hr />
          <div className="Form-group">
            <Switch state={!!this.setting(['zephyrisle-latex-pro.enable_editor_buttons'])() && this.setting(['zephyrisle-latex-pro.enable_editor_buttons'])() !== '0'} onchange={this.settings['zephyrisle-latex-pro.enable_editor_buttons']}>
              {app.translator.trans('zephyrisle-latex-pro.admin.settings.enable_editor_buttons_label')}
            </Switch>
          </div>
          <div className="Form-group">
            <Switch state={!!this.setting(['zephyrisle-latex-pro.aliases_as_primary'])() && this.setting(['zephyrisle-latex-pro.aliases_as_primary'])() !== '0'} onchange={this.settings['zephyrisle-latex-pro.aliases_as_primary']}>
              {app.translator.trans('zephyrisle-latex-pro.admin.settings.aliases_as_primary_label')}
            </Switch>
          </div>
          <div className="Form-group">
            <Switch state={!!this.setting(['zephyrisle-latex-pro.allow_asciimath'])() && this.setting(['zephyrisle-latex-pro.allow_asciimath'])() !== '0'} onchange={this.settings['zephyrisle-latex-pro.allow_asciimath']}>
              {app.translator.trans('zephyrisle-latex-pro.admin.settings.allow_asciimath_label')}
            </Switch>
          </div>
          <div className="Form-group">
            <Switch state={!!this.setting(['zephyrisle-latex-pro.enable_copy_tex'])() && this.setting(['zephyrisle-latex-pro.enable_copy_tex'])() !== '0'} onchange={this.settings['zephyrisle-latex-pro.enable_copy_tex']}>
              {app.translator.trans('zephyrisle-latex-pro.admin.settings.enable_copy_tex_label')}
            </Switch>
          </div>
          <div className="helpText">
            <i className="fa-icon fas fa-exclamation-circle" />
            {app.translator.trans('zephyrisle-latex-pro.admin.settings.quote_button_text')}
          </div>
        </div>
      </div>
    );
  });
});
