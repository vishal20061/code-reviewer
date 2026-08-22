import { useState, useEffect } from 'react';
// import "prismjs/themes/prism-tomorrow.css";
import "prismjs/themes/prism-dark.css";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import prism from "prismjs";
import EditorModule from 'react-simple-code-editor';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import MarkDown from 'react-markdown';
import axios from 'axios';

const Hero = () => {
    const Editor = EditorModule.default;
    const [code, setCode] = useState(`function sum(a, b) {
    retunr a + b
}`)
    const [review, setReview] = useState(``);

    async function reviewCode() {
        const responce = await axios.post('https://code-reviewer-t32d.onrender.com/ai/get-review', { code });
        setReview(responce.data);
    }

    useEffect(() => {
        prism.highlightAll();
    }, [])
    return (
        <>
            < div className="flex p-4 h-screen gap-[1%] bg-[#524646]" >

                <div className="h-full w-[35%] bg-[#f5f0f0] rounded-4xl relative">
                    <div className="h-full overflow-auto scrollbar-none">
                        <Editor value={code} onValueChange={code => setCode(code)} highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")} padding={16} style={{ fontFamily: '"Fira code","Fira Mono","monospace"', fontSize: 20, border: "1px solid black", borderRadius: '30px', minHeight: "100%", width: "100%" }} />
                    </div>
                    <button className="absolute right-4 bottom-4 rounded-xl bg-black text-white px-10 py-2 active:scale-103 cursor-pointer transition-transform font-medium" onClick={reviewCode}>Submit</button>
                </div>
                <div className="h-full w-[65%] bg-[#FCF2E5] p-5 rounded-4xl text-lg overflow-y-scroll scrollbar-none">
                    <MarkDown
                        rehypePlugins={[rehypeHighlight]}
                        components={{
                            pre: ({ children }) => (
                                <pre className="bg-[#1e1e1e] p-1 rounded-lg overflow-x-auto my-2 border border-gray-800 shadow-lg">
                                    {children}
                                </pre>
                            )
                        }}
                    >
                        {review}
                    </MarkDown>
                </div>
            </div >
        </>
    )
}

export default Hero