import 'highlight.js/styles/zenburn.css'
import hljs from 'highlight.js'

import 'reveal.js/css/reveal.css'
import 'reveal.js/css/theme/beige.css'
import Reveal from 'reveal.js/js/reveal.js'

hljs.initHighlightingOnLoad()

Reveal.initialize({
  controls: false,
  progress: false,
  slideNumber: true,
  history: true,
  center: true,
  transition: 'none'
})
