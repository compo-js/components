import {components} from './component'
import update from './update'


// обрабатывает узлы компонента
export default function(node) {
  // сохранить ссылку на обрабатываемый узел
  components.get(this).nodes.push(node)

  // если это узел специального атрибута 'c-hide'
  if(node.nodeName === 'c-hide') switch(components.get(this).execute.next(components.get(this).values.get(node)).value) {
    // если значение преобразуется в ложное, то удалить атрибут 'hidden' из внешнего элемента
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
    // задать начальное значение индекса для узла текущего цикла
    components.get(this).index.set(node.ownerElement, 0)

    // если для цикла не существует итераторов выполнения
    if(!components.get(this).iterators.has(node)) {
      // сохранить текущий итератор выполнения узлов компонента
      const execute = components.get(this).execute

      // создать внешний генератор цикла, который станет средой выполнения для внутреннего генератора
      components.get(this).iterators.set(node, {outer: execute.next('(function*(){' +
        'arguments[0]=yield function*(){' +
          `while(true)arguments[0]=yield typeof arguments[0]==="function"?arguments[0]():eval(arguments[0])` +
        `};while(true){yield,({${Object.keys(this.$data).join(',')}}=this);for(var ${components.get(this).values.get(node)})arguments[0]()}` +
      '})').value.call(this.$data)})

      // создать внутренний генератор цикла, который станет средой выполнения узлов компонента
      components.get(this).execute = components.get(this).iterators.get(node).outer.next().value.call(this.$data)

      // выполнить первый холостой вызов внутреннего итератора
      components.get(this).execute.next()

      // передать функцию 'update' во внешний итератор, для её вызова на каждой итерации цикла
      components.get(this).iterators.get(node).outer.next(update.bind(this, node.ownerElement))
      
      // перебрать цикл во внешнем итераторе выполнения
      components.get(this).iterators.get(node).outer.next()

      // сохранить внутренний итератор выполнения цикла
      components.get(this).iterators.get(node).inner = components.get(this).execute

      // восстановить текущий итератор выполнения узлов компонента
      components.get(this).execute = execute
    }

    // иначе, если итераторы выполнения для цикла уже созданы
    else {
      // сохранить текущий итератор выполнения узлов компонента
      const execute = components.get(this).execute

      // сделать текущим внутренний итератор выполнения цикла
      components.get(this).execute = components.get(this).iterators.get(node).inner

      // перебрать цикл во внешнем итераторе выполнения
      components.get(this).iterators.get(node).outer.next()

      // восстановить текущий итератор выполнения узлов компонента
      components.get(this).execute = execute
    }

    // удалить избыточные узлы цикла, если такие имеются
    for(let i = components.get(this).index.get(node.ownerElement), length =
      node.ownerElement.childNodes.length; i < length; i++) node.ownerElement.lastChild.remove()

    // удалить узел после выполнения текущего цикла
    components.get(this).index.delete(node) 
  }

  // если это текстовый узел или узел стандартного атрибута
  else node[node.nodeType === 2 ? 'value' : 'data'] = components.get(this).values.has(node) ?
    components.get(this).execute.next(components.get(this).values.get(node)).value : node[node.nodeType === 2 ? 'value' : 'data']

  // удалить ссылку на обрабатываемый узел
  components.get(this).nodes.pop()

  // вернуть обрабатываемый узел
  return node
}