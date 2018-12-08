import Turbolinks from 'turbolinks'
import Sidecar from 'gitter-sidecar'
import hljs from 'highlight.js/lib/highlight'
import python from 'highlight.js/lib/languages/python'
import 'highlight.js/styles/github.css'

import './index.css'


Turbolinks.start()

let chatButton = new Sidecar({room: 'dry-python/dry-python'})

hljs.registerLanguage('python', python);

document.addEventListener('turbolinks:load', function() {
  let blocks = document.getElementsByTagName('code')
  for (let block of blocks) {
    hljs.highlightBlock(block)
  }
})
