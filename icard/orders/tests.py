from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from branches.models import Branch
from orders.models import Order
from products.models import BranchProduct, Product
from tables.models import Table


class OrderStockTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.branch = Branch.objects.create(name='Sede principal')
        self.table = Table.objects.create(capacity=4, branch=self.branch)
        self.product = Product.objects.create(
            title='Producto de prueba',
            price=10000,
            active=True,
        )
        self.inventory = BranchProduct.objects.create(
            branch=self.branch,
            product=self.product,
            stock=2,
            active=True,
        )

    def create_order(self):
        return self.client.post(
            '/api/v1/orders/',
            {
                'table': self.table.id,
                'product': self.product.id,
                'status': Order.Status.PENDING,
            },
            format='json',
        )

    def test_create_order_decreases_branch_stock(self):
        response = self.create_order()

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Order.objects.count(), 1)

        self.inventory.refresh_from_db()
        self.assertEqual(self.inventory.stock, 1)

    def test_create_order_rejects_product_without_stock(self):
        self.inventory.stock = 0
        self.inventory.save(update_fields=['stock'])

        response = self.create_order()

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Order.objects.count(), 0)

        self.inventory.refresh_from_db()
        self.assertEqual(self.inventory.stock, 0)

    def test_create_order_rejects_inactive_inventory(self):
        self.inventory.active = False
        self.inventory.save(update_fields=['active'])

        response = self.create_order()

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Order.objects.count(), 0)

        self.inventory.refresh_from_db()
        self.assertEqual(self.inventory.stock, 2)

    def test_create_order_uses_table_branch_inventory(self):
        other_branch = Branch.objects.create(name='Otra sede')
        self.inventory.delete()
        other_inventory = BranchProduct.objects.create(
            branch=other_branch,
            product=self.product,
            stock=5,
            active=True,
        )

        response = self.create_order()

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Order.objects.count(), 0)

        other_inventory.refresh_from_db()
        self.assertEqual(other_inventory.stock, 5)


class OrderBranchFilterTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.branch = Branch.objects.create(name='Sede principal')
        self.other_branch = Branch.objects.create(name='Otra sede')
        self.table = Table.objects.create(capacity=4, branch=self.branch)
        self.other_table = Table.objects.create(
            capacity=4,
            branch=self.other_branch,
        )
        self.product = Product.objects.create(
            title='Producto de prueba',
            price=10000,
            active=True,
        )

    def test_orders_can_be_filtered_by_table_branch(self):
        expected_order = Order.objects.create(
            table=self.table,
            product=self.product,
        )
        Order.objects.create(
            table=self.other_table,
            product=self.product,
        )

        response = self.client.get(
            '/api/v1/orders/',
            {'table__branch': self.branch.id, 'page_size': 100},
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            [order['id'] for order in response.data['retData']],
            [expected_order.id],
        )
