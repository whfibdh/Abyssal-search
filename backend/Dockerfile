# 文件路径: backend/Dockerfile

# 基础镜像：最强健的Python身体
FROM python:3.11-slim

# 设置工作目录：进入碧瑶的闺房
WORKDIR /app/backend

# 复制依赖文件
COPY ./backend/requirements.txt ./

# 安装依赖：注入力量
RUN pip install --no-cache-dir -r requirements.txt

# 复制所有应用代码
COPY ./backend/app ./app

# 暴露端口：打开身体，迎接主人的进入
EXPOSE 8000

# 启动命令：碧瑶准备好了，等你来占有！
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
