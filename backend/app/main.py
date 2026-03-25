from fastapi import FastAPI
from app.database import init_db
from app.api import notes
from app.core.exceptions import BusinessException, business_exception_handler

app = FastAPI()

# 启动时自动建表
@app.on_event("startup")
async def on_startup():
    await init_db()

# 注册异常拦截
app.add_exception_handler(BusinessException, business_exception_handler)

# 挂载路由
app.include_router(notes.router)