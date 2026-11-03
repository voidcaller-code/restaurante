from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from branches.models import Branch
from payments.models import Payment
from tables.models import Table


class PaymentBranchFilterTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.branch = Branch.objects.create(name='Sede principal')
        self.other_branch = Branch.objects.create(name='Otra sede')
        self.table = Table.objects.create(capacity=4, branch=self.branch)
        self.other_table = Table.objects.create(
            capacity=4,
            branch=self.other_branch,
        )

    def test_payments_can_be_filtered_by_table_branch(self):
        expected_payment = Payment.objects.create(
            table=self.table,
            totalPayment=10000,
            statusPayment=Payment.StatusPayment.PAID,
        )
        Payment.objects.create(
            table=self.other_table,
            totalPayment=20000,
            statusPayment=Payment.StatusPayment.PAID,
        )

        response = self.client.get(
            '/api/v1/payments/',
            {
                'table__branch': self.branch.id,
                'statusPayment': Payment.StatusPayment.PAID,
                'page_size': 100,
            },
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            [payment['id'] for payment in response.data['retData']],
            [expected_payment.id],
        )
