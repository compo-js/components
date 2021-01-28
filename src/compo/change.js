import handler from './handler'

// вызывает обработчик для атрибутов и текстовых узлов
export default function change(node) {
  // если узел является атрибутом или текстовым узлом, то вызвать для него обработчик
  if(node.nodeType === 2 || node.nodeType === 3) handler.call(this, node)
  
  // иначе, обработать атрибуты и потомки узла
  else {
    // если у узла есть атрибуты, то вызвать для них функцию обработки
    if(node.attributes) {
      for(let i = 0, length = node.attributes.length; i < length; i++) change.call(this, node.attributes[i])
      if(node.attributes['c-for']) return // если имеется атрибут цикла, то выйти
    }

    // если у узла есть потомки, то перебрать все дочерние ноды
    for(let i = 0; i < node.childNodes.length; i++) change.call(this, node.childNodes[i])
  }
}