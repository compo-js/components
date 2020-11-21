import {components} from './component'
import update from './update'


// обрабатывает узлы компонента
export default function(node) {
  // сохранить ссылку на обрабатываемый узел
  components.get(this).nodes.push(node)

  // если это узел специального атрибута 'c-hide'
  if(node.nodeName === 'c-hide') switch(components.get(this).execute.next(`var{${Object.keys(this.$data).join(',')}}=this; \`\$\{${components.get(this).values.get(node)}\}\``).value) {
    // если значение преобразуется в ложное, что удалить атрибут 'hidden' из внешнего элемента
    case 'false': case 'undefined': case 'null': case '0': case '-0': case 'NaN': case '':
      node.ownerElement.removeAttribute('hidden')
      break
    // иначе, добавить атрибут 'hidden' во внешний элемент
    default:
      node.ownerElement.setAttribute('hidden', '')
      break
  }
  
  // если это узел специального атрибута 'c-for'
  else if(node.nodeName === 'c-for') {
    // задать начальное значение индекса для текущего цикла
    components.get(this).cicles.set(node.ownerElement, 0)
    
    // сохранить ссылку на текущий генератор выполнения исходных значений узлов компонента
    const execute = components.get(this).execute

    // создать генератор для обхода цикла текущего узла компонента
    const cicle = execute.next(`var{${Object.keys(this.$data).join(',')}}=this;` +
    '(function*(){' +
      'yield arguments[0]=yield function*(){' +
        'while(true)arguments[0]=yield eval(arguments[0])' +
      '}.bind(this);' +
      `for(var ${components.get(this).values.get(node)})yield arguments[0]()` +
    '}.bind(this))').value()

    // создать генератор, который станет средой выполнения исходных значений узлов компонента в контексте генератора цикла
    components.get(this).execute = cicle.next().value()

    // выполнить первый холостой вызов нового итератора
    components.get(this).execute.next()

    // определить функцию 'update' для вызова на каждой итерации генератора цикла
    cicle.next(update.bind(this, node.ownerElement))

    // выполнить итерацию цикла в контексте его генератора
    for(const iter of cicle);

    // восстановить текущий генератор выполнения исходных значений узлов компонента
    components.get(this).execute = execute

    // удалить избыточные узлы цикла, если такие имеются
    for(let i = components.get(this).cicles.get(node.ownerElement), length = node.ownerElement.childNodes.length; i < length; i++) node.ownerElement.lastChild.remove()

    // удалить индекс после выполнения текущего цикла
    components.get(this).cicles.delete(node)
  }

  // если это текстовый узел или узел стандартного атрибута
  else node[node.nodeType === 2 ? 'value' : 'data'] = components.get(this).execute.next(`var{${Object.keys(this.$data).join(',')}}=this; \`${components.get(this).values.get(node)}\``).value

  // удалить ссылку на обрабатываемый узел
  components.get(this).nodes.pop()

  // вернуть обрабатываемый узел
  return node
}