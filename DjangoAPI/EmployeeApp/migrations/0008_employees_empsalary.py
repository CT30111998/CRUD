# Generated by Django 4.0.3 on 2022-03-30 06:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EmployeeApp', '0007_alter_employees_phoneno'),
    ]

    operations = [
        migrations.AddField(
            model_name='employees',
            name='EmpSalary',
            field=models.FloatField(null=True),
        ),
    ]
