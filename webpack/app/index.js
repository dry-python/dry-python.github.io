import Turbolinks from 'turbolinks'
import Sidecar from 'gitter-sidecar'
import hljs from 'highlight.js/lib/highlight'
import python from 'highlight.js/lib/languages/python'
import 'highlight.js/styles/github.css'

import './index.css'

Turbolinks.start()

hljs.registerLanguage('python', python)

document.addEventListener('turbolinks:load', () => {
  const chat = new Sidecar({
    room: 'dry-python/dry-python',
    targetElement: '.gitter-chat-embed',
    activationElement: '.gitter-open-chat-button'
  });

  const blocks = document.getElementsByTagName('code')

  for (let block of blocks) {
    hljs.highlightBlock(block)
  }
})
