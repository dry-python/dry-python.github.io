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
  })

  // Initial page load isn't fast enough.  Gitter create it's styles
  // at runtime.  So first page view will have slight glitch when
  // Gitter chat popup quickly open and close.  We put "display:
  // none;" style directly on the element node to prevent it.  After
  // we initiate the chat we need to remove it.
  for (let elem of document.getElementsByClassName('gitter-chat-embed')) {
    elem.removeAttribute('style')
  }
})

document.addEventListener('turbolinks:load', () => {
  const blocks = document.getElementsByTagName('code')

  for (let block of blocks) {
    hljs.highlightBlock(block)
  }
})
