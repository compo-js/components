import Component from './component'

// сохранить ссылку на функцию создания компонентов в глобальной переменной
const script = document.querySelector('script[data-compo-name]')
if(script) window[script.dataset.compoName] = create
else window.Compo = create


// выбрать содержимое всех файлов компонентов и передать его функции создания
Promise.all([...document.querySelectorAll('template[src],template[data-src]')]
  .map(template => fetch((template.attributes['src'] || template.attributes['data-src']).value).then(response => response.text())))
  .then(html => create(html.join('')))


// функция создания компонентов
function create(html) {
  // создать хранилище компонентов
  const template = document.createElement('template')
  // добавить в хранилище шаблоны компонентов
  template.innerHTML = html

  // перебрать все созданные в хранилище шаблоны компонентов
  ![...template.content.children].forEach(component =>
    // создать компонент с именем из атрибута 'data-name', 'name' или из свойства 'nodeName' его шаблона
    customElements.define((component.getAttribute('data-name') || component.getAttribute('name') || component.nodeName).toLocaleLowerCase(), class extends Component {
      constructor() {
        // передать компонент в родительский класс
        super(component.cloneNode(true))
      }
      // если шаблон компонента содержал атрибут 'to', то модифицировать встроенный элемент
    }, component.hasAttribute('to') ? {extends: component.getAttribute('to').toLocaleLowerCase()} : null)
  )
}