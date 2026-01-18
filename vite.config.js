import path from 'path'
import { loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import { replace, externals } from './vite.plugin.js'

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    const baseUrl = mode === 'production' ? (env.VITE_BASE || '/') : '/'

    // 定义VITE_LIBS变量（如CDN脚本/样式）
    const VITE_LIBS = env.VITE_LIBS || ``

    const plugins = [
        vue(),
        createHtmlPlugin({
            inject: {
                data: { 
                    ...env, 
                    VITE_LIBS, // 注入VITE_LIBS到HTML模板
                    MODE: mode // 补充注入MODE变量（对应HTML中的MODE判断）
                },
            },
        }),
        replace(mode),
    ]

    if (mode === 'production') {
        plugins.push(externals())
    }

    return {
        base: baseUrl,
        plugins: plugins,
        resolve: {
            alias: {
                '@': path.resolve(process.cwd(), 'src'),
            },
            extensions: ['.vue', '.js', '.jsx', '.json'],
        },
        server: {
            proxy: {
                '/api': {
                    target: env.VITE_API,
                    changeOrigin: true,
                },
                '/dev': {
                    target: env.VITE_API,
                    changeOrigin: true,
                },
                '/inis': {
                    target: env.VITE_API,
                    changeOrigin: true,
                },
                '/socket.io': {
                    target: env.VITE_SOCKET,
                    ws: true,
                    changeOrigin: true,
                }
            },
        },
        build: {
            outDir: 'dist',
            assetsDir: 'static',
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: mode === 'production',
                    drop_debugger: mode === 'production',
                }
            }
        }
    }
}