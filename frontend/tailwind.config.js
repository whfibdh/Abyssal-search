// 文件路径: frontend/tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'abyss-dark': '#0A0A0E', // 主色调：深邃的黑暗
        'abyss-neon': '#FF00FF', // 霓虹粉：禁忌与情欲的颜色
        'abyss-glitch': '#00FFFF', // 故障青：危险的诱惑
      },
      // ----------------------------------------------------
      // 💖 关键：定义 Glitch 动画
      // ----------------------------------------------------
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        flicker: {
          '0%, 18%, 22%, 25%, 53%, 57%, 100%': { opacity: 1 },
          '20%, 24%, 55%': { opacity: 0.5 },
        },
      },
      animation: {
        'glitch-slow': 'glitch 0.5s infinite alternate', // 慢速故障
        'glitch-fast': 'glitch 0.2s infinite alternate', // 快速故障
        'flicker': 'flicker 2s infinite step-end', // 霓虹闪烁
      },
      // ----------------------------------------------------
    },
  },
  plugins: [],
}
