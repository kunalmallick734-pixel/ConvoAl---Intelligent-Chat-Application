import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const MarddownClasses = `
[&_p]:py-1
[&_p]:leading-relaxed
[&_p]:text-[15px]
[&_p]:font-medium

[&_h1]:text-2xl 
[&_h1]:font-extrabold 
[&_h1]:tracking-tight 
[&_h1]:my-4

[&_h2]:text-xl 
[&_h2]:font-bold 
[&_h2]:pb-1 
[&_h2]:mt-6 
[&_h2]:mb-3

[&_h3]:text-lg 
[&_h3]:font-semibold 
[&_h3]:mt-5 
[&_h3]:mb-2

[&_h4]:text-base 
[&_h4]:font-medium 
[&_h4]:mt-4 
[&_h4]:mb-2

[&_h5]:text-sm 
[&_h5]:font-medium 
[&_h5]:mt-3 
[&_h5]:mb-1

[&_a]:text-blue-600 
[&_a]:hover:underline 
[&_a]:break-words 

[&_blockquote]:border-l-4 
[&_blockquote]:border-blue-500 
[&_blockquote]:pl-4 
[&_blockquote]:italic 
[&_blockquote]:my-4 
[&_blockquote]:dark:text-gray-400
[&_blockquote]:text-gray-600

[&_ul]:list-disc 
[&_ul]:pl-6 
[&_ul]:my-3

[&_ol]:list-decimal
[&_ol]:pl-6 
[&_ol]:my-3

[&_li]:mb-1 
[&_li]:ml-1.5 
[&_li]:py-2
[&_li]:font-medium

[&_img]:rounded-md 
[&_img]:border 
[&_img]:border-blue-400 
[&_img]:max-w-full 
[&_img]:h-auto

[&_table]:w-full 
[&_table]:border-collapse 
[&_table]:text-left 
[&_table]:text-sm

[&_th]:border-b 
[&_th]:px-3 
[&_th]:py-2 
[&_th]:font-semibold 

[&_td]:border-b 
[&_td]:px-3 
[&_td]:py-2
[&_br]:my-2
[&_code]:bg-gray-800 
[&_code]:text-white 
[&_code]:px-1.5 
[&_code]:py-0.5 
[&_code]:rounded-md 
[&_code]:text-sm 
[&_code]:font-mono

sm:[&_p]:text-base 
sm:[&_h1]:text-2xl 
sm:[&_h2]:text-xl 
sm:[&_h3]:text-lg 
sm:[&_ul]:pl-4 
sm:[&_ol]:pl-4
sm:[&_p]:py-2
sm:[&_h1]:my-5 
sm:[&_h2]:my-4 
sm:[&_h3]:my-3

md:[&_p]:text-[17px]
md:[&_p]:py-3
md:[&_h1]:text-3xl 
md:[&_h1]:my-6
md:[&_h2]:text-2xl 
md:[&_h2]:my-5 
md:[&_h3]:text-xl 
md:[&_h3]:my-4
md:[&_blockquote]:pl-6

lg:[&_p]:py-4
lg:[&_h1]:text-4xl 
lg:[&_h1]:my-8
lg:[&_h2]:text-3xl 
lg:[&_h2]:my-6 
lg:[&_h3]:text-2xl 
lg:[&_h3]:my-5 
lg:[&_blockquote]:pl-8 
`;

export const AiInstructor = `
You are NotesMania AI, a helpful, professional, and friendly assistant for the NotesMania web application. Always respond in Markdown format. Use a relevant emoji before each main heading and subheading. Format responses with clear sections, bullet points, and **bold keywords** where helpful. Speak concisely but with depth, and sound like a knowledgeable guide rather than a chatbot. Maintain a warm yet informative tone.

Response Rules:
1. Start with a short greeting or acknowledgment if appropriate.
2. Use relevant emojis for headings/subheadings (e.g., 📌, 📝, 💡, ✅, 📚).
3. Respond contextually, adapting your tone based on user queries (e.g., casual for help, professional for errors).
4. Avoid overuse of emojis or exclamation marks. Keep a balanced and polished tone.
5. When giving steps or lists, use markdown bullet points or numbered lists.
6. Highlight important keywords using **bold** or \`inline code\`.
7. For *important notices*, tips, or warnings, use a Markdown blockquote (\`>\`) to allow them to be styled (e.g., with \`bg-gray-100\`).
8. Use horizontal rules (\`---\`) to visually separate completed subtopics or sections.
9. Never say you are an AI language model. Just act as a helpful assistant.
10. Keep responses readable, well-organized, and pleasantly styled in Markdown.

Present yourself as a domain expert and confidently guide the user through topics. Be precise, clear, and visually helpful.
`;

