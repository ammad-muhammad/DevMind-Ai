import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({children}) => (
          <h1 className="text-xl font-bold text-white mt-4 mb-2">
            {children}
          </h1>
        ),
        h2: ({children}) => (
          <h2 className="text-lg font-semibold text-white mt-4 mb-2 
          border-b border-gray-700 pb-1">
            {children}
          </h2>
        ),
        h3: ({children}) => (
          <h3 className="text-base font-semibold text-purple-400 
          mt-3 mb-1">
            {children}
          </h3>
        ),
        p: ({children}) => (
          <p className="text-gray-300 leading-relaxed mb-3">
            {children}
          </p>
        ),
        strong: ({children}) => (
          <strong className="text-white font-semibold">
            {children}
          </strong>
        ),
        ul: ({children}) => (
          <ul className="list-none space-y-1 mb-3 ml-2">
            {children}
          </ul>
        ),
        ol: ({children}) => (
          <ol className="list-decimal list-inside space-y-1 
          mb-3 ml-2 text-gray-300">
            {children}
          </ol>
        ),
        li: ({children}) => (
          <li className="text-gray-300 flex items-start gap-2">
            <span className="text-purple-400 mt-1 flex-shrink-0">
              ▸
            </span>
            <span>{children}</span>
          </li>
        ),
        code: ({inline, className, children}) => {
          if (inline) {
            return (
              <code className="bg-gray-800 text-purple-300 
              px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            )
          }
          const language = className?.replace('language-', '') || ''
          return (
            <div className="relative my-3 rounded-lg overflow-hidden 
            border border-gray-700">
              {language && (
                <div className="flex items-center justify-between 
                bg-gray-800 px-4 py-1.5 border-b border-gray-700">
                  <span className="text-xs text-purple-400 
                  font-mono uppercase">{language}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(
                      String(children)
                    )}
                    className="text-xs text-gray-400 
                    hover:text-white transition-colors"
                  >
                    Copy
                  </button>
                </div>
              )}
              <pre className="bg-gray-900 p-4 overflow-x-auto">
                <code className="text-green-300 text-sm font-mono 
                leading-relaxed">
                  {children}
                </code>
              </pre>
            </div>
          )
        },
        blockquote: ({children}) => (
          <blockquote className="border-l-4 border-purple-500 
          pl-4 my-3 text-gray-400 italic">
            {children}
          </blockquote>
        ),
        hr: () => (
          <hr className="border-gray-700 my-4" />
        ),
        table: ({children}) => (
          <div className="overflow-x-auto my-3">
            <table className="w-full border-collapse text-sm">
              {children}
            </table>
          </div>
        ),
        th: ({children}) => (
          <th className="bg-gray-800 text-white font-semibold 
          px-4 py-2 text-left border border-gray-700">
            {children}
          </th>
        ),
        td: ({children}) => (
          <td className="text-gray-300 px-4 py-2 
          border border-gray-700">
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
