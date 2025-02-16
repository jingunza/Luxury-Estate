"""empty message

Revision ID: 82a451bd3e45
Revises: 
Create Date: 2022-09-23 14:49:41.873662

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '82a451bd3e45'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('full_name', sa.String(length=80), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('imagen_perfil', sa.String(length=120), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('inmueble',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tipo_operacion', sa.String(length=80), nullable=False),
    sa.Column('comunidad', sa.String(length=80), nullable=False),
    sa.Column('provincia', sa.String(length=80), nullable=False),
    sa.Column('direccion', sa.String(length=300), nullable=False),
    sa.Column('descripcion', sa.String(length=300), nullable=True),
    sa.Column('precio', sa.Integer(), nullable=False),
    sa.Column('tipo_vivienda', sa.String(length=80), nullable=False),
    sa.Column('habitaciones', sa.Integer(), nullable=False),
    sa.Column('baños', sa.Integer(), nullable=False),
    sa.Column('pet', sa.Boolean(), nullable=False),
    sa.Column('piscina', sa.Boolean(), nullable=False),
    sa.Column('terraza', sa.Boolean(), nullable=False),
    sa.Column('garage', sa.Boolean(), nullable=False),
    sa.Column('latitud', sa.Float(), nullable=True),
    sa.Column('longitud', sa.Float(), nullable=True),
    sa.Column('premium', sa.Boolean(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('imagen',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('imagen_url', sa.String(length=180), nullable=True),
    sa.Column('inmueble_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['inmueble_id'], ['inmueble.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('message',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('sender_email', sa.String(length=30), nullable=False),
    sa.Column('sender_name', sa.String(length=30), nullable=False),
    sa.Column('sender_phone', sa.Integer(), nullable=False),
    sa.Column('body', sa.String(length=300), nullable=False),
    sa.Column('recipient_id', sa.Integer(), nullable=True),
    sa.Column('inmueble_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['inmueble_id'], ['inmueble.id'], ),
    sa.ForeignKeyConstraint(['recipient_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('message')
    op.drop_table('imagen')
    op.drop_table('inmueble')
    op.drop_table('user')
    # ### end Alembic commands ###
