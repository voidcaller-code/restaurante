from django.db import transaction
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from orders.models import Order
from products.models import BranchProduct
from products.api.serializers import ProductSerializer
from tables.api.serializers import TableSerializer

class OrderSerializer(ModelSerializer):
    product_data = ProductSerializer(source='product', read_only=True)
    table_data = TableSerializer(source='table', read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'status', 'table', 'table_data', 'product', 'product_data', 'payment', 'close', 'created_at']

    @transaction.atomic
    def create(self, validated_data):
        table = validated_data.get('table')
        product = validated_data.get('product')

        if table is None or product is None:
            raise serializers.ValidationError({
                'detail': 'La mesa y el producto son obligatorios.'
            })

        try:
            inventory = BranchProduct.objects.select_for_update().get(
                branch_id=table.branch_id,
                product_id=product.id,
            )
        except BranchProduct.DoesNotExist as error:
            raise serializers.ValidationError({
                'detail': (
                    'El producto no está registrado en el inventario '
                    'de esta sede.'
                )
            }) from error

        if not product.active or not inventory.active:
            raise serializers.ValidationError({
                'detail': 'El producto no está disponible en esta sede.'
            })

        if inventory.stock < 1:
            raise serializers.ValidationError({
                'detail': 'No hay stock disponible para este producto.'
            })

        inventory.stock -= 1
        inventory.save(update_fields=['stock'])

        return super().create(validated_data)
