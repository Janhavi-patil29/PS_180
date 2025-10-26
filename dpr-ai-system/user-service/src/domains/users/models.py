from sqlalchemy import Column, Integer, String, TIMESTAMP, ForeignKey, Table, UUID as PgUUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base
import uuid

Base = declarative_base()

# Association table for many-to-many relationship between roles and permissions
role_permissions = Table(
    'role_permissions',
    Base.metadata,
    Column('role_id', Integer, ForeignKey('roles.role_id'), primary_key=True),
    Column('permission_id', Integer, ForeignKey('permissions.permission_id'), primary_key=True)
)

class User(Base):
    __tablename__ = 'users'

    user_id = Column(PgUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role_id = Column(Integer, ForeignKey('roles.role_id'), nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), default=func.now(), onupdate=func.now())

    role = relationship("Role", back_populates="users")

    def __repr__(self):
        return f"<User(username='{self.username}', email='{self.email}')>"

class Role(Base):
    __tablename__ = 'roles'

    role_id = Column(Integer, primary_key=True, autoincrement=True)
    role_name = Column(String, unique=True, nullable=False) # e.g., 'Admin', 'Reviewer'

    users = relationship("User", back_populates="role")
    permissions = relationship("Permission", secondary=role_permissions, back_populates="roles")

    def __repr__(self):
        return f"<Role(role_name='{self.role_name}')>"

class Permission(Base):
    __tablename__ = 'permissions'

    permission_id = Column(Integer, primary_key=True, autoincrement=True)
    permission_name = Column(String, unique=True, nullable=False) # e.g., 'upload_dpr', 'view_analysis'

    roles = relationship("Role", secondary=role_permissions, back_populates="permissions")

    def __repr__(self):
        return f"<Permission(permission_name='{self.permission_name}')>"