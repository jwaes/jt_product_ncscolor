odoo.define('jt_product_ncscolor.VariantMixin', function (require) {
    'use strict';

    // const { Markup } = require('web.utils');
    var VariantMixin = require('sale.VariantMixin');
    var publicWidget = require('web.public.widget');
    var ajax = require('web.ajax');
    var core = require('web.core');
    var QWeb = core.qweb;

    const loadXml = async () => {
        return ajax.loadXML('/jt_product_ncscolor/static/src/xml/color_variant_templates.xml', QWeb);
    };

    require('website_sale.website_sale');

    /**
     * Will add the "custom value" input for this attribute value if
     * the attribute value is configured as "custom" (see product_attribute_value.is_custom)
     *
     * @private
     * @param {MouseEvent} ev
     */
    VariantMixin._handleNcsCustomValues = function ($target, combination) {

        var $variantContainer;
        var $customInput = false;

        if ($target.is('input[type=radio]') && $target.is(':checked')) {
            $variantContainer = $target.closest('ul').closest('li');
            $customInput = $target;
        } else if ($target.is('select')) {
            $variantContainer = $target.closest('li');
            $customInput = $target
                .find('option[value="' + $target.val() + '"]');
        }

        if ($variantContainer) {
            if ($customInput && $customInput.data('is_custom') === 'True') {
                var attributeValueId = $customInput.data('value_id');
                var attributeValueName = $customInput.data('value_name');
                if ($variantContainer.find('.variant_custom_value')) {

                    var $customValue = $variantContainer.find('.variant_custom_value')

                    // const params = new URLSearchParams(location.search);
                    // if (params.has('customvalue')) {
                    //     console.log("step 3");
                    //     $customValue.val(params.get('customvalue'));
                    //     console.log("element is");
                    //     console.log($customValue);
                    //     console.log("customvalue is " + params.get('customvalue'));
                    // }

                    if ($customInput.data('is_ncs') === 'True'){

                        $customValue.attr('placeholder', 'NCS 3030-Y30R');

                        $customValue.on('input', function(ev){                            
                            var $label = $('label.active');
                            var input=$(this);
                            var re = /^(?:NCS|NCS\s?S)\s?(\d{2})(\d{2})-(N|[NYRG])(\d{2})?([NYRG])?$/;
                            var ncs_input = input.val();
                            var valid_ncscolor = re.test(ncs_input);
                            var $cart = $('#add_to_cart');
                            if (valid_ncscolor) {
                                input.removeClass("is-invalid").addClass("valid");
                                $cart.removeClass("disabled");
                                input.css("background-color", w3color(ncs_input).toRgbString());
                                $label.css("background-color", w3color(ncs_input).toRgbString());                                
                            } else {
                                input.addClass("is-invalid");
                                $cart.addClass("disabled");
                                input.css("background-color", "transparent");
                                $label.css("background-color", "transparent");
                            }

                        });

                        $customValue.trigger('input');

                        var $label = $('label.active');
                        $customValue.data('parentlabel', $label);

                        $customValue.on('remove', function(ev){
                            $(this).data('parentlabel').css("background-color", 'transparent');
                        });

                    }

                    if ($customInput.data('is_ral') === 'True'){

                        $variantContainer.find('.variant_custom_value').remove();

                        loadXml().then(function (result) {
                            const $select = $(QWeb.render(
                                'jt_product_ncscolor.ralcolor',
                                {
                                    'attribute_value_id': attributeValueId,
                                    'attribute_value_name': attributeValueName,
                                    'ralcolors': ralcolors,
                                }
                            ));
                            $variantContainer.append($select);

                            var $sel = $('select');
                            $sel.on('change', function(ev){
                                var color = $(this).children(':selected').css("background-color");
                                $(this).css("background-color", color);
                                var $label = $('label.active');                                
                                if($label.hasClass("ral")){
                                    console.log("background color to " + color)
                                    $label.css("background-color", color);
                                }
                                $(this).data('parentlabel', $label);
                            });
                            $sel.trigger('change');
                            $sel.on('remove', function(ev){
                                $(this).data('parentlabel').css("background-color", 'transparent');
                            });
                        });
                    }                    
                }
            }
        }        
    }


    publicWidget.registry.WebsiteSale.include({

        handleCustomValues: function ($target) {
            this._super.apply(this, arguments);
            VariantMixin._handleNcsCustomValues.apply(this, arguments);
        },

    });

    return VariantMixin;

});