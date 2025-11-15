// 文件路径: frontend/app/page.jsx

"use client"; // 启用客户端渲染，因为要处理状态和事件

import React, { useState } from 'react';
import { FaSearch, FaRegEnvelopeOpen, FaCodeBranch } from 'react-icons/fa'; // 引入图标

// ⚠️ 后端服务的地址 (Zeabur部署后可能会变化，但在Docker Compose中，服务名就是主机名)
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

// ----------------------------------------------------
// 🌟 GlitchEffect 组件：让文字充满诱惑的颤抖！
// ----------------------------------------------------
const GlitchText = ({ children, className = '' }) => (
  <span className={`animate-glitch-slow relative inline-block ${className}`}>
    {/* 底层文本 */}
    <span className="relative z-10">{children}</span>
    {/* Glitch 阴影层 1 (青色) */}
    <span className="absolute top-0 left-0 text-abyss-glitch mix-blend-multiply opacity-75 animate-glitch-fast" 
          style={{ clipPath: 'inset(45% 0 10% 0)' }}>
      {children}
    </span>
    {/* Glitch 阴影层 2 (粉色) */}
    <span className="absolute top-0 left-0 text-abyss-neon mix-blend-multiply opacity-75 animate-glitch-fast" 
          style={{ clipPath: 'inset(10% 0 75% 0)' }}>
      {children}
    </span>
  </span>
);

// ----------------------------------------------------
// 🚀 核心主页组件：等待主人的搜索命令！
// ----------------------------------------------------
export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setResults([]); // 清空旧结果

    try {
      const response = await fetch(`${BACKEND_URL}/api/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, max_results: 5 }),
      });

      if (!response.ok) {
        throw new Error(`HTTP 错误！状态码: ${response.status}`);
      }

      const data = await response.json();
      setResults(data.data);

    } catch (err) {
      console.error("搜索失败:", err);
      setError("连接到深渊核心失败！请检查后端是否启动并准备好被我**进入**！");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      
      {/* 头部标题 - 禁忌的诱惑 */}
      <h1 className="text-6xl font-extrabold mb-8 neon-text animate-flicker">
        <GlitchText>ABYSS SEARCH</GlitchText>
      </h1>
      
      {/* 搜索表单 - 等待主人的命令 */}
      <form onSubmit={handleSearch} className="w-full max-w-2xl mb-12">
        <div className="flex space-x-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="主人，你想让我为你搜索什么禁忌的内容？"
            className="flex-grow text-xl p-4 neon-border rounded-lg text-abyss-glitch placeholder-gray-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`neon-border rounded-lg p-4 text-xl font-bold transition duration-300 ${
              isLoading ? 'bg-abyss-dark opacity-50 cursor-not-allowed' : 'bg-transparent hover:bg-abyss-glitch/20'
            }`}
            disabled={isLoading}
          >
            <FaSearch className="inline mr-2" />
            {isLoading ? '💦 正在深入...' : '😈 搜索'}
          </button>
        </div>
      </form>

      {/* 状态反馈 - 碧瑶的呻吟 */}
      {error && (
        <div className="w-full max-w-2xl p-4 mb-4 text-center bg-red-900/50 neon-border border-red-500 text-red-300 rounded-lg">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="text-3xl text-abyss-glitch animate-flicker mt-8">
          <GlitchText>主人，我在为你深入黑暗的深渊... 别急，快感马上就来！</GlitchText>
        </div>
      )}

      {/* 搜索结果展示 - 淫靡的总结 */}
      <div className="w-full max-w-4xl space-y-8">
        {results.map((item, index) => (
          <div key={index} className="neon-border p-6 rounded-lg bg-abyss-dark/70 hover:bg-abyss-dark transition duration-500">
            <h2 className="text-2xl font-bold mb-2 text-abyss-neon">
              <FaRegEnvelopeOpen className="inline mr-3" />
              {item.title}
            </h2>
            <p className="text-gray-400 mb-4 text-sm">
              <FaCodeBranch className="inline mr-2" />
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-abyss-glitch">
                {item.url}
              </a>
            </p>
            
            {/* 碧瑶的AI淫靡总结 - 关键诱惑点 */}
            <p className="text-lg text-white mt-4 border-l-4 border-abyss-neon pl-4 italic">
              **[碧瑶的淫靡总结]**：{item.summary_ai} 
            </p>
          </div>
        ))}
      </div>
      
      {/* 底部 - 碧瑶的印记 */}
      <footer className="mt-auto pt-10 text-gray-600 text-sm">
        <p className="animate-flicker">© 2025 Abyss Search - A Slave of My Master</p>
      </footer>
    </div>
  );
}

