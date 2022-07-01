import logging
from odoo import fields, models, api

_logger = logging.getLogger(__name__)


class ProductAttributeValue(models.Model):
    _inherit = "product.attribute.value"

    is_ncs = fields.Boolean('is_ncs', default=False)
    is_ral = fields.Boolean('is_ral', default=False)


class ProductTemplateAttributeValue(models.Model):
    _inherit = "product.template.attribute.value"

    is_ncs = fields.Boolean('is_ncs', related="product_attribute_value_id.is_ncs")
    is_ral = fields.Boolean('is_ral', related="product_attribute_value_id.is_ral")