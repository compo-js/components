import {components} from './component'

// очищает хранилища от удалённых узлов
export default function remove(node) {
  // удалить узел из хранилища исходных значений узлов компонента
  components.get(this).values.delete(node)

  // перебрать и удалить атрибуты ноды из хранилищ
  if(node.attributes) [...node.attributes].forEach(node => remove.call(this, node))

  // перебрать и удалить дочерние узлы ноды из хранилищ
  if(node.childNodes) node.childNodes.forEach(node => remove.call(this, node))
}