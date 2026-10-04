from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from tables.models  import Table

class TableSerializer(ModelSerializer):
    tipo_display = serializers.CharField(
        source='get_tipo_display',
        read_only=True
    )

    class Meta:
        model = Table
        fields = [
            'id',
            'capacity',
            'tipo',
            'tipo_display',
        ]