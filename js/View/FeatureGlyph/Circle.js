define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'JBrowse/View/FeatureGlyph/Box'
],
function (
    declare,
    lang,
    Box
) {
    return declare(Box, {
        renderFeature: function (context, fRect) {
            var style = lang.hitch(this, 'getStyle');
            if (this.track.config.clearRect) {
                context.clearRect(Math.floor(fRect.l), fRect.t, Math.ceil(fRect.w - Math.floor(fRect.l) + fRect.l), fRect.h);
            }

            this.renderBox(context, fRect.viewInfo, fRect.f, fRect.t, fRect.rect.h, fRect.f, style);
            this.renderLabel(context, fRect);
            this.renderDescription(context, fRect);
            this.renderArrowhead(context, fRect);
        },
        renderBox: function (context, viewInfo, feature, top, overallHeight, parentFeature, style) {
            var left  = viewInfo.block.bpToX(feature.get('start'));
            var width = style(feature, 'width') || 10;

            var height = this._getFeatureHeight(viewInfo, feature);
            if (!height) {
                return;
            }

            context.beginPath();
            context.lineWidth = 0;
            var ret = style(feature, 'borderColor');
            context.arc(left + width / 2, top + width / 2, width / 2, 0, 2 * Math.PI, false);
            context.fillStyle = style(feature, 'color');
            context.fill();
            if (ret) {
                context.strokeStyle = ret;
                context.stroke();
            }
        },

        _defaultConfig: function () {
            return this._mergeConfigs(this.inherited(arguments), {
                style: {
                    borderColor: 'black'
                }
            });
        }
    });
});
