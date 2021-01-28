import {components} from './component'
import reactive from './reactive'
import change from './change'


// выполняет обновление DOM компонента
export default function($parent, index = components.get(this).index.get($parent),
    newNode = components.get(this).values.get($parent), oldNode = $parent.childNodes[index]) {

  // если в цикле нет новой ноды, то создать и добавить новую ноду
  if(!oldNode) $parent.append(reactive.call(this, newNode.cloneNode(true)))
  
  // иначе, перебрать все дочерние узлы цикла
  else for(let i = 0; i < newNode.childNodes.length; i++) change.call(this, $parent.childNodes[i + index])

  // увеличить смещение индекса в текущем цикле на количество элементов в его шаблоне
  components.get(this).index.set($parent, index + newNode.childNodes.length)
}