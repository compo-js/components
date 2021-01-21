import {components} from './component'
import handler from './handler'
import clear from './clear'

// шаблон поиска атрибутов событий
const regOn = /^on/


// добавляет реактивность элементам компонента
export default function reactive(node) {
  // если узел является комментарием или пустым текстовым узлом, то удалить его из компонента
  if(node.nodeType === 8 || node.nodeType === 3 && !node.data.trim()) return node.remove()

  // сохранить родительский элемент узла
  const parent = components.get(this).nodes[components.get(this).nodes.length - 1] || null

  // сохранить исходное значение узла
  const data = node[node.nodeType === 2 ? 'value' : 'data']

  // если узел является атрибутом или текстовым узлом, то сохранить и вычислить его значение
  if(node.nodeType === 2 || node.nodeType === 3) {
    // если это узел специального атрибута 'c-for'
    if(node.nodeName === 'c-for') {
      // сохранить в хранилище узел и его исходное значение
      components.get(this).values.set(node, node.value)

      // создать шаблон для хранения содержимого цикла
      const template = new DocumentFragment()

      // очистить HTML-содержимое внешнего элемента и перенести его в шаблон
      ![...clear(node.ownerElement).childNodes].forEach(node => template.append(node))

      // сохранить в хранилище узел внешнего элемента и присвоить ему шаблон цикла
      components.get(this).values.set(node.ownerElement, template)
    }
    
    // иначе сохранить в хранилище узел и функцию, возвращающее его исходное значение
    else {
      // добавить в хранилище родительский элемент и объект исходных значений
      if(!components.get(this).sources.has(parent)) components.get(this).sources.set(parent, {})

      // добавить значение в объект и привязать к нему выполняемую функцию
      if(!components.get(this).sources.get(parent)[data]) node.nodeName === 'c-hide' ?
        components.get(this).sources.get(parent)[data] = components.get(this).execute.next(`()=>\`\$\{${node.value}\}\``).value
          : components.get(this).sources.get(parent)[data] = components.get(this).execute.next(`()=>\`${data}\``).value
        
      // добавить в хранилище ссылку на выполняему функцию из объекта значений
      components.get(this).values.set(node, components.get(this).sources.get(parent)[data])
    }

    // если это атрибут событий, то добавить его внешнему элементу свойство объекта данных
    if(regOn.test(node.nodeName)) Object.defineProperty(node.ownerElement, '$data', {value: this.$data})

    // вычислить исходное значение узла
    const result = handler.call(this, node)

    // если узел не является специальным атрибутом и исходное и вычисленное значения равны
    if(node.nodeName !== 'c-for' && node.nodeName !== 'c-hide' && data === result[result.nodeType === 2 ? 'value' : 'data']) {
      delete components.get(this).sources.get(parent)[data] // удалить свойство из объекта исходных значений
      components.get(this).values.delete(node) // удалить узел из хранилища вычисляемых значений
    }
  }

  else {
    // если у узла есть атрибуты, то перебрать все атрибуты узла
    if(node.attributes) for(let i = 0, length = node.attributes.length; i < length; i++) reactive.call(this, node.attributes[i])

    // если у узла есть потомки, то перебрать все дочерние узлы
    if(!node.attributes || !node.attributes['c-for']) for(let i = 0; i < node.childNodes.length; i++) reactive.call(this, node.childNodes[i]) || i--
  }

  return node // вернуть узел
}