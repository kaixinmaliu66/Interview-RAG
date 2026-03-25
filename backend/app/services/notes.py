import hashlib
from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models import KnowledgeBase
from app.core.exceptions import BusinessException

class NoteService:
    @staticmethod
    async def create_note(db: AsyncSession, title: str, category: str, content: str):
        # 1. 计算内容哈希（用于去重）
        c_hash = hashlib.md5(content.encode()).hexdigest()
        
        # 2. 检查哈希是否已存在 (健壮性检查)
        statement = select(KnowledgeBase).where(KnowledgeBase.content_hash == c_hash)
        result = await db.execute(statement)
        if result.first():
            raise BusinessException(message="该笔记内容已存在，请勿重复添加", code=400)
            
        # 3. 写入数据库
        new_note = KnowledgeBase(
            title=title,
            category=category,
            content=content,
            content_hash=c_hash
        )
        db.add(new_note)
        await db.commit()
        await db.refresh(new_note)
        return new_note

    @staticmethod
    async def get_all(db: AsyncSession):
        statement = select(KnowledgeBase).order_by(KnowledgeBase.updated_at.desc())
        result = await db.execute(statement)
        return result.scalars().all()