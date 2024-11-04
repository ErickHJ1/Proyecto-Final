# Generated by Django 5.1.1 on 2024-10-24 18:02

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('api', '0008_usuariot_edad_usuariot_lugar_vivienda'),
    ]

    operations = [
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_enviado', models.DateField(auto_now_add=True)),
                ('mensaje', models.CharField(max_length=144)),
                ('emisor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='uwu', to='api.usuariot')),
                ('receptor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owo', to='api.usuariot')),
            ],
        ),
    ]
