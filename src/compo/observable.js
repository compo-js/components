import {components} from './component'
import handler from './handler'


// символ для добавления всем наблюдаемым объектам
const isProxy = Symbol()

// символ для получения примитивных значений
const getValue = Symbol()

// прототип объекта для примитивных значений
const primitive = {
  [Symbol.toPrimitive]() {
    return this[getValue]()
  },
  toString() {
    return this[getValue]()
  },
  valueOf() {
    return this[getValue]()
  },
  toJSON() {
    return this[getValue]()
  }
}


// вызывает обработчик для каждого узла компонента
function notify(dep) {
  dep.forEach(node => {
    // удалить идентификатор обратного вызова для обрабатываемого узла
    clearTimeout(components.get(this).timers.get(node))

    // если узел удалён их хранилища исходных значений, то удалить его из множества зависимых узлов
    if(!components.get(this).values.has(node)) dep.delete(node)

    // иначе, добавить идентификатор обратного вызова для узла и вычислить его исходное значение
    else components.get(this).timers.set(node, setTimeout(() => components.get(this).timers.delete(handler.call(this, node)), 0))
  })
}


// возвращает перехватчики наблюдаемого объекта
function hooks(dep, node) {
  return {
    apply: (target, thisArg, args) => {
      // если вызывается метод toString, то вернуть JSON строку
      if(target.name === 'toString') return JSON.stringify(thisArg, null, ' ')

      // для всех остальных методов, просто вернуть функцию
      return target.apply(thisArg, args)
    },
    
    get: (target, key, receiver) => {
      // если свойство не является методом 'toString' или собственным свойством объекта, то вернуть его значение
      if(key !== 'toString' && !target.hasOwnProperty(key)) return Reflect.get(target, key, receiver)

      // сохранить обрабатываемый в текущий момент узел компонента
      if(components.get(this).nodes.length) node = components.get(this).nodes[0]
      
      // добавить обрабатываемый узел во множество зависимых узлов для 'target'
      if(typeof dep === 'object' && node) dep.add(node)

      // сохранить значение запрашиваемого свойства
      const value = Reflect.get(target, key, receiver)

      // получить объект зависимых узлов для всех свойств 'target'
      let deps = components.get(this).depends.get(target)

      // если у 'target' ещё нет свойств с зависимыми узлами, то создать в хранилище новый объект
      if(!deps) components.get(this).depends.set(target, deps = {})

      // если нет зависимых узлов для свойства 'key', то создать новое множество зависимостей
      if(!deps[key]) deps[key] = new Set()

      // если 'key' истина и является объектом или функцией, то вернуть существующий или новый наблюдаемый прокси
      if(value && typeof value === 'object' || typeof value === 'function')
        return components.get(this).proxys.has(value) ? components.get(this).proxys.get(value) : observable.call(this, value, deps[key], node)

      // если обрабатывается DOM компонента ,то вернуть объект примитивных значений, иначе, вернуть значение свойства как есть
      return components.get(this).nodes.length ? Object.create(primitive, {[getValue]: {value: () => (deps[key].add(node), value), writable: true}}) : value
    },

    set: (target, key, value, receiver) => {
      // если старое и новое значения 'key' совпадают, то выйти и вернуть успешность операции
      if(target.hasOwnProperty(key) && value === Reflect.get(target, key, receiver)) return true

      // присвоить 'key' новое значение и в случае неудачи, выйти и вернуть неуспешность операции
      if(!Reflect.set(target, key, value, receiver)) return false

      // если обрабатывается узел компонента, то выйти и вернуть успешность операции
      if(components.get(this).nodes.length) return true

      // получить объект зависимых узлов для всех свойств 'target'
      const deps = components.get(this).depends.get(target)

      // если у 'target' нет свойств с зависимыми узлами, то вернуть успешность операции
      if(!deps) return true
      
      // получить множество зависимых узлов для 'key' или для 'target'
      dep = deps[key] || dep

      // обработать все узлы из полученного множества зависимостей
      if(dep) notify.call(this, dep)

      // вернуть успешность операции присвоения
      return true
    }
  }
}


// создаёт и возвращает для любого объекта новый наблюдаемый прокси
export default function observable(obj, dep, node) {
  // если объект является примитивным значением, то вернуть его как есть
  if(obj.hasOwnProperty(getValue) || obj[isProxy]) return obj

  // создать новый наблюдаемый прокси
  const proxy =  new Proxy(obj, hooks.call(this, dep, node))

  // добавить наблюдаемому прокси символ
  proxy[isProxy] = true

  // добавить прокси в хранилище и вернуть его в качестве результата
  return components.get(this).proxys.set(obj, proxy).get(obj)
}