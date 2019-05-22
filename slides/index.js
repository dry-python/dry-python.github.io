import 'highlight.js/styles/zenburn.css';
import hljs from 'highlight.js';

import 'reveal.js/css/reveal.css';
import 'reveal.js/css/theme/white.css';
import Reveal from 'reveal.js/js/reveal';

hljs.initHighlightingOnLoad();

Reveal.initialize({
  controls: false,
  progress: false,
  slideNumber: true,
  history: true,
  center: true,
  transition: 'none',
});
