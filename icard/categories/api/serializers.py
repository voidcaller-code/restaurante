from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from categories.models import Category

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title', 'image']

    def validate_title(self, value):
        value = value.strip()

        if len(value) < 5:
            raise serializers.ValidationError("El nombre de la categoria debe tener al menos 5 caracteres")

        return value