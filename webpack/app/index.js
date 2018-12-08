import './index.css'
import Turbolinks from 'turbolinks'
import Sidecar from 'gitter-sidecar'


Turbolinks.start()


let chatButton = new Sidecar({room: 'dry-python/dry-python'})
