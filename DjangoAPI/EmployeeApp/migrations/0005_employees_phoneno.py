# Generated by Django 4.0.3 on 2022-03-29 10:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EmployeeApp', '0004_rename_emailid_employees_emailid'),
    ]

    operations = [
        migrations.AddField(
            model_name='employees',
            name='PhoneNo',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
