from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from branches.models import Branch
from categories.models import Category
from products.models import BranchProduct, Product
from tables.models import Table


class AvailableProductsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.branch = Branch.objects.create(name='Sede principal')
        self.other_branch = Branch.objects.create(name='Otra sede')
        self.table = Table.objects.create(capacity=4, branch=self.branch)
        self.category = Category.objects.create(title='Bebidas')

    def create_inventory(
        self,
        title,
        stock=1,
        inventory_active=True,
        product_active=True,
        branch=None,
    ):
        product = Product.objects.create(
            title=title,
            price=10000,
            active=product_active,
            category=self.category,
        )
        inventory = BranchProduct.objects.create(
            branch=branch or self.branch,
            product=product,
            stock=stock,
            active=inventory_active,
        )
        return inventory

    def test_available_filter_returns_only_orderable_products_for_table(self):
        available = self.create_inventory('Producto disponible')
        self.create_inventory('Producto agotado', stock=0)
        self.create_inventory('Inventario inactivo', inventory_active=False)
        self.create_inventory('Producto inactivo', product_active=False)
        self.create_inventory(
            'Producto otra sede',
            branch=self.other_branch,
        )

        response = self.client.get(
            '/api/v1/branch-products/',
            {
                'table': self.table.id,
                'product__category': self.category.id,
                'available': 'true',
                'page_size': 100,
            },
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            [item['id'] for item in response.data['retData']],
            [available.id],
        )

    def test_available_filter_with_unknown_table_returns_empty_list(self):
        self.create_inventory('Producto disponible')

        response = self.client.get(
            '/api/v1/branch-products/',
            {'table': 99999, 'available': 'true'},
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['retData'], [])
