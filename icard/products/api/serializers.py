from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from products.models import Product
from categories.api.serializers import CategorySerializer # Para poder serializar la información de la categoría asociada al producto

class ProductSerializer(ModelSerializer):
    category_data = CategorySerializer(source='category', read_only=True) # Para poder serializar la información de la categoría asociada al producto

    class Meta:
        model = Product
        fields = ['id', 'title', 'image', 'price', 'active', 'category', 'category_data'] # category_data es un campo adicional que se agrega al serializer para poder serializar la información de la categoría asociada al producto

    def validate_title(self, value):
        value = value.strip()

        if len(value) < 5:
            raise serializers.ValidationError("El nombre del producto debe tener al menos 5 caracteres")

        return value

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError("El precio no puede ser negativo")

        return value

    