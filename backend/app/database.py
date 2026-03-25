from sqlmodel import create_engine, SQLModel, Session
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import sessionmaker

# 数据库文件存放在 data/ 目录下
sqlite_url = "sqlite+aiosqlite:///./data/interview.db"

engine = create_async_engine(sqlite_url, echo=True)

async def init_db():
    """初始化表结构"""
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

async def get_session() -> AsyncSession:
    """提供给 FastAPI 依赖注入的 Session"""
    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )
    async with async_session() as session:
        yield session