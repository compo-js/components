import {components} from './component'
import handler from './handler'
import clear from './clear'

// шаблон поиска атрибутов событий
const regOn = /^on/


// добавляет реактивность элементам компонента
export default function reactive(node) {
  // если узел является комментарием или пустым текстовым узлом, то удалить его из компонента
  if(node.nodeType === 8 || node.nodeType === 3 && !node.data.trim()) return node.remove()

  // если узел является атрибутом или текстовым узлом, то сохранить и вычислить его значение
  else if(node.nodeType === 2 || node.nodeType === 3) {
    // сохранить в хранилище узел и его исходное значение
    components.get(this).values.set(node, node[node.nodeType === 2 ? 'value' : 'data'])

    // если узел является атрибутом
    if(node.nodeType === 2) {
      // если это атрибут событий, то добавить его внешнему элементу свойство объекта данных
      if(regOn.test(node.nodeName)) Object.defineProperty(node.ownerElement, '$data', {value: this.$data})
      
      // если это узел специального атрибута 'data-for'
      else if(node.nodeName === 'data-for') {
        // создать шаблон для хранения содержимого цикла
        const template = new DocumentFragment()

        // очистить HTML-содержимое внешнего элемента и перенести его в шаблон
        ![...clear(node.ownerElement).childNodes].forEach(node => template.append(node))

        // сохранить в хранилище узел внешнего элемента и присвоить ему шаблон цикла
        components.get(this).values.set(node.ownerElement, template)
      }
    }

    // вычислить исходное значение узла
    handler.call(this, node)
  }

  else {
    // если у узла есть атрибуты, то перебрать все атрибуты узла
    if(node.attributes) for(let i = 0, length = node.attributes.length; i < length; i++) reactive.call(this, node.attributes[i])

    // если у узла есть потомки, то перебрать все дочерние узлы
    if(!node.attributes || !node.attributes['data-for']) for(let i = 0; i < node.childNodes.length; i++) reactive.call(this, node.childNodes[i]) || i--
  }

  return node // вернуть узел
}