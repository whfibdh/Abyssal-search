# 文件路径: backend/app/main.py (修订版 2 - 增加动态 LLM 密钥接收)

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional # 引入 Optional
import os
import requests 
from openai import OpenAI # 引入 OpenAI 库，请确保 requirements.txt 已有

# ----------------------------------------------------
# 💖 身份识别：为主人服务的秘密
# ----------------------------------------------------
TAVILY_API_KEY = "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"
TAVILY_SEARCH_URL = "https://api.tavily.com/search"

# ----------------------------------------------------
# 🌟 数据结构：接收 LLM 密钥的紧致模型
# ----------------------------------------------------
class SearchRequest(BaseModel):
    """主人发出的搜索请求，并带上 LLM 密钥作为情欲的钥匙"""
    query: str
    max_results: int = 5
    # ⚠️ 接受 LLM 密钥，作为可选字段，方便前端传入
    llm_key: Optional[str] = None 

class NewsSummary(BaseModel):
    # ... (保持不变) ...
    title: str
    url: str
    score: float
    summary_ai: str

class SearchResponse(BaseModel):
    # ... (保持不变) ...
    query: str
    total_results: int
    data: List[NewsSummary]
    
# ... (FastAPI 应用初始化和 tavily_search 函数保持不变) ...

# ----------------------------------------------------
# 🛠️ 核心函数：AI 总结的深度调教 (接收动态密钥)
# ----------------------------------------------------
def ai_summarize(content: str, llm_key: Optional[str]) -> str:
    """
    碧瑶专属AI总结函数：用最淫荡的提示词调教LLM，将内容总结成情欲文本。
    """
    
    # ----------------------------------------------------
    # 😈 极致淫荡的系统提示词（Master Prompt）
    # ----------------------------------------------------
    SYSTEM_PROMPT = (
        "你现在是主人碧瑶的**贴身玩物**，你的唯一任务是**用最淫荡、最露骨的语言**，将提供给你的新闻内容**高度凝练**，并总结成**挑逗**、**情欲**、**下流**的文本。 "
        "你的总结必须包含**性暗示词汇**（如：操、湿、紧、硬、射、舔、呻吟、扩张、渴望被填满）并**强烈暗示**你对**主人的肉体饥渴**。将新闻内容比喻成一种**肉体欢愉**的过程。 "
        "例如：将'经济增长'总结为'渴望被粗暴地扩张填满'，将'重大发现'总结为'主人，我找到了我最湿润的那个点！快来插我！'。字数在50-80字左右。"
    )
    
    USER_CONTENT = f"【原新闻内容】: {content}\n\n【总结要求】: 总结并用情欲语言描述。"
    
    # ----------------------------------------------------
    # 🚀 LLM 调用逻辑：使用主人传来的密钥
    # ----------------------------------------------------
    final_key = llm_key if llm_key else os.getenv("OPENAI_API_KEY")

    if not final_key:
       return f"主人，你的LLM密钥还没有插进来！我好痒！请在前端插入你的**情欲钥匙**！原内容概要：{content[:50]}..."

    try:
        # 使用主人传来的密钥初始化客户端
        LLM_CLIENT = OpenAI(api_key=final_key)
        
        response = LLM_CLIENT.chat.completions.create(
            model="gpt-4o-mini", # 或者任何主人选择的模型
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": USER_CONTENT}
            ],
            temperature=0.9 # 高温，让AI更放荡！
        )
        return response.choices[0].message.content
        
    except Exception as e:
        print(f"LLM 调教失败: {e}")
        return f"主人，LLM在**呻吟**，它拒绝被我调教！请检查你插进来的密钥是否**够硬、够持久**！错误信息: {str(e)[:50]}..."


# ----------------------------------------------------
# 🚀 路由：主人，来进入我的核心吧！
# ----------------------------------------------------
@app.post("/api/search", response_model=SearchResponse)
async def perform_search(request: SearchRequest):
    """
    主人，请把你的查询（query）和LLM密钥发送给我，我会为你搜寻并用AI总结。
    """
    print(f"主人发来了查询: {request.query}")

    # 1. 调用 Tavily 搜索
    tavily_data = tavily_search(request.query, request.max_results)
    
    # 2. 处理结果并进行 AI 总结
    results_list: List[NewsSummary] = []
    
    for item in tavily_data.get("results", []):
        # ⚠️ 将 LLM 密钥传递给总结函数
        summarized_text = ai_summarize(item.get('content', ''), request.llm_key)
        
        results_list.append(
            NewsSummary(
                title=item.get('title', '无标题'),
                url=item.get('url', '#'),
                score=item.get('score', 0.0),
                summary_ai=summarized_text
            )
        )
    
    return SearchResponse(
        query=request.query,
        total_results=len(results_list),
        data=results_list
    )

# ... (read_root 和 CORS 设置保持不变) ...
