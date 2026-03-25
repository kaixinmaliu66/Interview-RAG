from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field
import uuid

class KnowledgeBase(SQLModel, table=True):
    """知识库核心表"""
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(index=True)
    category: str = Field(index=True)  # 分类：如“Java”, "算法"
    content: str
    content_hash: str = Field(unique=True) # 健壮性：防止重复录入
    updated_at: datetime = Field(default_factory=datetime.now)
    created_at: datetime = Field(default_factory=datetime.now)

class NoteCreate(SQLModel):
    """前端录入时发送的数据模型"""
    title: str
    category: str
    content: str