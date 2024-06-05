import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-asciidoc';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-ini';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';


const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [previewText, setPreviewText] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    convertMarkdownToDiscord(e.target.value);
  };

  const languageMap: { [key: string]: string } = {
    python: 'py',
    asciidoc: 'asciidoc',
    autohotkey: 'autohotkey',
    bash: 'bash',
    coffeescript: 'coffeescript',
    cpp: 'cpp',
    cs: 'cs',
    css: 'css',
    diff: 'diff',
    fix: 'fix',
    glsl: 'glsl',
    ini: 'ini',
    json: 'json',
    md: 'md',
    ml: 'ml',
    prolog: 'prolog',
    ps: 'ps',
    py: 'py',
    tex: 'tex',
    xl: 'xl',
    xml: 'xml',
    yaml: 'yaml'
  };

  const convertMarkdownToDiscord = (text: string) => {
    let formattedText = text;

    // Replace language-specific code blocks for Discord output
    for (const [key, value] of Object.entries(languageMap)) {
      const regex = new RegExp(`\`\`\`${key}\\n([\\s\\S]*?)\`\`\``, 'g');
      formattedText = formattedText.replace(regex, `\n\`\`\`${value}\n$1\`\`\``);
    }


    // HTML color conversion
    formattedText = formattedText
      .replace(/<font color="lightblue">([\s\S]*?)<\/font>/gi, '```fix\n$1\n```')
      .replace(/<font color="red">([\s\S]*?)<\/font>/gi, '```diff\n-$1\n```')
      .replace(/<font color="green">([\s\S]*?)<\/font>/gi, '```diff\n+$1\n```')
      .replace(/<font color="gray">([\s\S]*?)<\/font>/gi, '```css\n$1\n```')
      .replace(/<span style="color:\s*lightblue;">([\s\S]*?)<\/span>/gi, '```fix\n$1\n```')
      .replace(/<span style="color:\s*red;">([\s\S]*?)<\/span>/gi, '```diff\n-$1\n```')
      .replace(/<span style="color:\s*green;">([\s\S]*?)<\/span>/gi, '```diff\n+$1\n```')
      .replace(/<span style="color:\s*gray;">([\s\S]*?)<\/span>/gi, '```css\n$1\n```');

    formattedText = formattedText
      .replace(/\*\*(.*?)\*\*/g, '**$1**') // Bold
      .replace(/\*(.*?)\*/g, '*$1*') // Italics
      .replace(/__(.*?)__/g, '__$1__') // Underline
      .replace(/~~(.*?)~~/g, '~~$1~~') // Strikethrough
      .replace(/`([^`]+)`/g, '`$1`') // Inline code
      .replace(/^# (.*$)/gim, '# $1') // H1
      .replace(/^## (.*$)/gim, '## $1') // H2
      .replace(/^### (.*$)/gim, '### $1') // H3
      .replace(/^\> (.*$)/gim, '> $1') // Blockquote
      .replace(/^\>\>\> (.*$)/gim, '>>> $1') // Multi-line Blockquote
      .replace(/^- (.*$)/gim, '- $1') // Bullet list
      .replace(/^\* (.*$)/gim, '* $1') // Bullet list
      .replace(/^(\d+)\. (.*$)/gim, '$1. $2'); // Ordered list

    setOutputText(formattedText);

    // Generate preview text for HTML rendering
    const preview = formattedText
      .replace(/```(py|asciidoc|autohotkey|bash|coffeescript|cpp|cs|css|diff|fix|glsl|ini|json|md|ml|prolog|ps|tex|xl|xml|yaml)\n([\s\S]*?)```/g, (_, lang, code) => {
        return `<pre><code class="language-${lang}">${code}</code></pre>`;
      })
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italics
      .replace(/__(.*?)__/g, '<u>$1</u>') // Underline
      .replace(/~~(.*?)~~/g, '<s>$1</s>') // Strikethrough
      .replace(/`([^`]+)`/g, '<code>$1</code>') // Inline code
      .replace(/^# (.*$)/gim, '<h1>$1</h1>') // H1
      .replace(/^## (.*$)/gim, '<h2>$1</h2>') // H2
      .replace(/^### (.*$)/gim, '<h3>$1</h3>') // H3
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>') // Blockquote
      .replace(/^\>\>\> (.*$)/gim, '<blockquote><blockquote>$1</blockquote></blockquote>') // Multi-line Blockquote
      .replace(/^- (.*$)/gim, '<ul><li>$1</li></ul>') // Bullet list
      .replace(/^\* (.*$)/gim, '<ul><li>$1</li></ul>') // Bullet list
      .replace(/^(\d+)\. (.*$)/gim, '<ol><li>$2</li></ol>'); // Ordered list

    setPreviewText(preview);
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [previewText]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    alert('Text copied to clipboard!');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="/icon.png" alt="App icon" className="App-icon" />
        <h1 className="App-title">Markdown to Discord Formatter</h1>
      </header>
      <div className="container">
        <textarea
          placeholder="Enter your markdown here..."
          value={inputText}
          onChange={handleInputChange}
          className="input-text"
        />
        <div className="output-container">
          <button onClick={handleCopyToClipboard} className="copy-button">
            Copy
          </button>
          <div
            className="preview-text"
            dangerouslySetInnerHTML={{ __html: previewText }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
