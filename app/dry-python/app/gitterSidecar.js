import Sidecar from 'gitter-sidecar';

document.addEventListener('turbolinks:load', () => {
  // Gitter sidecar is a singleton with a stateful constructor.  We
  // does not use returned object any where and can not avoid usage of
  // the `new` keyword.
  // eslint-disable-next-line no-new
  new Sidecar({
    room: 'dry-python/dry-python',
    targetElement: '.gitter-chat-embed',
    activationElement: '.gitter-open-chat-button',
  });

  // Initial page load isn't fast enough.  Gitter create it's styles
  // at runtime.  So first page view will have slight glitch when
  // Gitter chat popup quickly open and close.  We put "display:
  // none;" style directly on the element node to prevent it.  After
  // we initiate the chat we need to remove it.
  const chat = document.getElementsByClassName('gitter-chat-embed');

  Array.from(chat).forEach((elem) => {
    elem.removeAttribute('style');
  });
});
