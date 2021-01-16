// очищает HTML-содержимое элементов от мусорных узлов
export default function clear(node) {
  if(node.nodeType === 8 || node.nodeType === 3 && !node.data.trim()) return node.remove()
  return [...node.childNodes].forEach(clear), node
}