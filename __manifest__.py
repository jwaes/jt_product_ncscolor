# -*- coding: utf-8 -*-
{
    'name': "jt_product_ncscolor",

    'summary': "NCS custom field",

    'description': "",

    'author': "jaco tech",
    'website': "https://jaco.tech",
    "license": "AGPL-3",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/15.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.16',

    # any module necessary for this one to work correctly
    'depends': [
        'base',
        'sale',
    ],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/product_attribute_views.xml',
        'views/sale_variant_templates.xml',
    ],
    'assets': {
        'web.assets_common': [
            'jt_product_ncscolor/static/lib/w3color.js',
            'jt_product_ncscolor/static/lib/ralcolors.js',
            'jt_product_ncscolor/static/src/js/variant_mixin.js',
            'jt_product_ncscolor/static/src/scss/*',
        ],
    },       
}
