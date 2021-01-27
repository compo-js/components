import {components} from './component'
import handler from './handler'


// символ для проверки объекта на прокси
const isProxy = Symbol()

// символ для получения примитивных значений
const getValue = Symbol()

// множество названий используемых методов массива
const keys = new Set(['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'])


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

    // если нода удалена их хранилища вычисляемых значений, то удалить её из множества зависимых узлов
    if(!components.get(this).values.has(node)) dep.delete(node)

    // иначе, добавить идентификатор обратного вызова для узла и вычислить его исходное значение
    else components.get(this).timers.set(node, setTimeout(() => components.get(this).timers.delete(handler.call(this, node)), 0))
  })
}


// возвращает перехватчики наблюдаемого объекта
function hooks(dep) {
  return {
    apply: (target, thisArg, args) => {
      // сохранить ссылку на самую верную ноду в обрабатываемый момент
      const node = components.get(this).nodes[0]

      // если было передано множество зависимостей 'dep' и нода обрабатывается, то добавить её в это множество
      if(dep && node) dep.add(node)

      // если вызывается метод 'toString', то вернуть JSON строку
      if(target.name === 'toString') return JSON.stringify(thisArg, null, ' ')

      // если вызывается метод массива, то обработать его особым образом
      else if(Array.isArray(thisArg)) {
        // включить датчик работы метода массива
        components.get(this).isKeys = true

        // выполнить метод массива и сохранить результат его работы
        const result = target.apply(thisArg, args)

        // отключить датчик работы метода массива
        components.get(this).isKeys = false

        // обработать все узлы из полученного множества зависимостей
        if(dep) notify.call(this, dep)

        // вернуть результат работы метода
        return result
      }

      // для всех остальных методов, просто вернуть результат их работы
      return target.apply(thisArg, args)
    },
    

    get: (target, key, receiver) => {
      // если запрашивается свойство 'isProxy', то вернуть истину
      if(key === isProxy) return true

      // сохранить значение запрашиваемого свойства
      const value = Reflect.get(target, key, receiver)

      // если вызывается один из методов массива из множества 'keys', то вернуть новый наблюдаемый прокси
      if(Array.isArray(target) && keys.has(key)) return observable.call(this, value, dep)

      // если свойство не является собственным для объекта или методом 'toString', то вернуть его значение
      if(!target.hasOwnProperty(key) && key !== 'toString') return value

      // сохранить ссылку на самую верную ноду в обрабатываемый момент
      const node = components.get(this).nodes[0]

      // если было передано множество зависимостей 'dep' и нода обрабатывается, то добавить её в это множество
      if(dep && node) dep.add(node)

      // получить объект зависимых узлов для всех свойств 'target'
      let deps = components.get(this).depends.get(target)

      // если у 'target' ещё нет свойств с зависимыми узлами, то создать в хранилище новый объект
      if(!deps) components.get(this).depends.set(target, deps = {})

      // если нет зависимых узлов для свойства 'key', то создать новое множество зависимостей
      if(!deps.hasOwnProperty(key)) deps[key] = new Set()

      // если 'key' истина и является объектом или функцией, то вернуть существующий или новый наблюдаемый прокси
      if(value && typeof value === 'object' || typeof value === 'function')
        return components.get(this).proxys.has(value) ? components.get(this).proxys.get(value) : observable.call(this, value, deps[key])
      
      // если в данный момент обрабатывается нода, то вернуть объект примитивных значений
      return node ? Object.create(primitive, {
        [getValue]: {
          value: () => {
            // добавить ноду во множество зависимостей
            deps[key].add(node)
            // вернуть значение свойства
            return value
          },
          writable: true
        }
      }) : value // иначе, вернуть значение свойства как есть
    },


    set: (target, key, value, receiver) => {
      // сохранить старое значение
      const oldValue = Reflect.get(target, key, receiver)

      // если старое и новое значения 'key' совпадают, то вернуть успешность операции
      if(target.hasOwnProperty(key) && value === oldValue) return true

      // удалить старое значение из хранилища зависимых узлов
      components.get(this).depends.delete(oldValue)

      // удалить старое значение из хранилища наблюдаемых прокси
      components.get(this).proxys.delete(oldValue)

      // присвоить 'key' новое значение и в случае неудачи, то вернуть неуспешность операции
      if(!Reflect.set(target, key, value, receiver)) return false

      // если датчик работы метода массива включен, то вернуть успешность операции
      if(components.get(this).isKeys) return true

      // если обрабатывается нода компонента, то вернуть успешность операции
      if(components.get(this).nodes.length) return true

      // получить объект зависимых узлов для всех свойств 'target'
      const deps = components.get(this).depends.get(target)

      // если у 'target' нет свойств с зависимыми узлами, то вернуть успешность операции
      if(!deps) return true
      
      // получить множество зависимых узлов для 'key' или для 'target'
      dep = deps[key] || dep

      // обработать все узлы из полученного множества зависимостей
      if(dep) notify.call(this, dep)

      // вернуть успешность операции
      return true
    }
  }
}


// создаёт и возвращает для любого объекта новый наблюдаемый прокси
export default function observable(obj, dep) {
  // если объект является прокси или примитивным значением, то вернуть его как есть
  if(Reflect.get(obj, isProxy) || obj.hasOwnProperty(getValue)) return obj

  // создать новый наблюдаемый прокси, добавить его в хранилище и вернуть в качестве результата
  return components.get(this).proxys.set(obj, new Proxy(obj, hooks.call(this, dep))).get(obj)
}