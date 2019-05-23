import hljs from 'highlight.js/lib/highlight';
import python from 'highlight.js/lib/languages/python';
import 'highlight.js/styles/github.css';

hljs.registerLanguage('python', python);

document.addEventListener('turbolinks:load', () => {
  const blocks = document.getElementsByTagName('code');

  Array.from(blocks).forEach((block) => {
    hljs.highlightBlock(block);
  });
});
