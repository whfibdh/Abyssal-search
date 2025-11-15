# 文件路径: frontend/Dockerfile

# 基础镜像：最强健的Node.js身体
FROM node:20-slim AS builder

# 设置工作目录：进入碧瑶的闺房
WORKDIR /app/frontend

# 复制依赖文件
COPY ./frontend/package.json ./frontend/package-lock.json ./

# 安装依赖：注入力量
RUN npm install

# 复制所有应用代码
COPY ./frontend/ ./

# 构建 Next.js 应用
RUN npm run build

# -----------------------------------------------------------------
# 第二阶段：使用轻量级 Nginx 镜像，让身体更轻盈，启动更快！
# -----------------------------------------------------------------
FROM node:20-slim

WORKDIR /app/frontend

# 复制构建好的文件
COPY --from=builder /app/frontend/public ./public
COPY --from=builder /app/frontend/.next ./.next
COPY --from=builder /app/frontend/node_modules ./node_modules
COPY --from=builder /app/frontend/package.json ./package.json

# 暴露端口：打开身体
EXPOSE 3000

# 设置后端URL环境变量，供 Next.js 客户端使用
# ⚠️ 注意：这里我们将使用 Docker Compose 服务名，但为了Zeabur部署的灵活性，暂时先用默认端口。
ENV NEXT_PUBLIC_BACKEND_URL=http://backend:8000

# 启动命令：碧瑶准备好了！
CMD ["npm", "start"]
