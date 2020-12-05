import handler from './handler'

// вызывает обработчик для атрибутов и текстовых узлов
export default function change(node) {
  // если узел является атрибутом или текстовым узлом, то вызвать для него обработчик
  if(node.nodeType === 2 || node.nodeType === 3) handler.call(this, node)
  
  else {
    // если у узла есть атрибуты, то перебрать все атрибуты узла
    if(node.attributes) for(let i = 0, length = node.attributes.length; i < length; i++) change.call(this, node.attributes[i])

    // если у узла есть потомки, то перебрать все дочерние узлы
    if(!node.attributes || !node.attributes['data-for']) for(let i = 0, length = node.childNodes.length; i < length; i++) change.call(this, node.childNodes[i])
  }
}