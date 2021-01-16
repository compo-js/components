import observable from './observable'
import reactive from './reactive'
import popstate from './popstate'
import remove from './remove'

// создать хранилище компонентов
export const components = new WeakMap()

// объект конфигурации MutationObserver
const mutations = {
  childList: true,
  subtree: true
}


export default class extends HTMLElement {
  constructor(component) {
    super()

    // добавить компонент в хранилище компонентов
    components.set(this, {})

    // создать хранилище исходных значений узлов компонента
    components.get(this).values = new WeakMap()

    // создать хранилище идентификаторов обратных вызовов для узлов
    components.get(this).timers = new WeakMap()

    // создать хранилище зависимых узлов для свойств компонента
    components.get(this).depends = new WeakMap()

    // создать хранилище наблюдаемых прокси для объектов компонента
    components.get(this).proxys = new WeakMap()

    // создать хранилище итераторов циклов компонента
    components.get(this).iterators = new WeakMap()

    // создать хранилище индексов циклов компонента
    components.get(this).index = new WeakMap()

    // создать объект данных компонента
    components.get(this).object = {}

    // создать массив ссылок на обрабатываемые узлы
    components.get(this).nodes = []


    // создать прокси объекта данных компонента
    Object.defineProperty(this, '$data', {
      value: new Proxy(observable.call(this, components.get(this).object), {
        // если в объекте данных нет такого свойства, то запросить его в компоненте
        get: (target, key, receiver) => Reflect.has(target, key) ? Reflect.get(target, key, receiver) : Reflect.get(this, key)
      })
    })

    // добавить компоненту теневой DOM
    Object.defineProperty(this, '$root', {
      value: this.attachShadow({mode: component.hasAttribute('closed') ? 'closed' : 'open'})
    })

    // если у шаблона компонента есть свойство 'content', то использовать его в качестве компонента
    component = component.content ? component.content : component

    // удалить из шаблона компонента скрипты и сохранить их в переменной
    const scripts = [...component.querySelectorAll('script')].map(script => component.removeChild(script).innerHTML).join('')

    // перенести содержимое шаблона компонента в его теневой DOM
    ![...component.childNodes].forEach(node => this.$root.append(node))

    // выполнить скрипты компонента в контексте объекта данных
    Function(scripts).call(this.$data)

    // создать генератор, который станет средой выполнения узлов компонента
    components.get(this).execute = Function(`return function*(${Object.keys(this.$data).join(',')}){` +
      `while(true)arguments[0]=yield({${Object.keys(this.$data).join(',')}}=this,typeof arguments[0]==='function'?arguments[0]():eval(arguments[0]))` +
    '}')().call(this.$data)

    // выполнить первый холостой вызов итератора
    components.get(this).execute.next()

    // сделать реактивными узлы теневого DOM компонента
    reactive.call(this, this.$root)
    
    
    // наблюдать за изменениями в теневом DOM компонента
    new MutationObserver((mutationRecords, observer) => {
      // отключить наблюдение
      observer.disconnect()

      // перебрать все записи изменений
      mutationRecords.forEach(record => {
        // очистить хранилище исходных значений от удалённых узлов
        record.removedNodes.forEach(node => remove.call(this, node))

        // сделать реактивными новые узлы компонента, кроме узлов циклов
        if(!record.target.attributes || !record.target.attributes['c-for']) [...record.addedNodes].forEach(node => reactive.call(this, node))
      })
      
      // возобновить наблюдение
      observer.observe(this.$root, mutations)
    }).observe(this.$root, mutations)
  }


  // выполняет поиск одного элемента в компоненте
  $(selector) {
    return this.$root.querySelector(selector)
  }

  // выполняет поиск всех элементов в компоненте
  $$(selector) {
    return this.$root.querySelectorAll(selector)
  }

  // вызывается при добавлении компонента в документ
  connectedCallback() {
    if(components.get(this.$root.host).connected) components.get(this.$root.host).connected.forEach(cb => cb.call(this.$data))
  }

  // вызывается после добавления компонента в документ
  $connected(...args) {
    if(!components.get(this.$root.host).connected) components.get(this.$root.host).connected = new Set()
    args.forEach(cb => components.get(this.$root.host).connected.add(cb))
  }

  // вызывается при удалении компонента из документа
  disconnectedCallback() {
    if(components.get(this.$root.host).disconnected) components.get(this.$root.host).disconnected.forEach(cb => cb.call(this.$data))
  }

  // вызывается после удаления компонента из документа
  $disconnected(...args) {
    if(!components.get(this.$root.host).disconnected) components.get(this.$root.host).disconnected = new Set()
    args.forEach(cb => components.get(this.$root.host).disconnected.add(cb))
  }

  // вызывается при перемещении компонента в новый документ
  adoptedCallback() {
    if(components.get(this.$root.host).adopted) components.get(this.$root.host).adopted.forEach(cb => cb.call(this.$data))
  }

  // вызывается после перемещении компонента в новый документ
  $adopted(...args) {
    if(!components.get(this.$root.host).adopted) components.get(this.$root.host).adopted = new Set()
    args.forEach(cb => components.get(this.$root.host).adopted.add(cb))
  }

  // создаёт и возвращает пользовательское событие, через конструктор 'CustomEvent'
  $event(event, props) {
    return new CustomEvent(event, props)
  }

  // создаёт маршрутизатор для элемента и запускает события для объекта 'document'
  $router(elem, props, ...args) {
    // добавить обработчик события 'popstate' для объекта 'window', который вызывает одноимённую функцию-обработчик
    window.addEventListener('popstate', () => popstate(args))

    // добавить обработчик события 'click' для переданного элемента
    elem.addEventListener('click', (e, target = e.path[0]) => {
      // если 'target' ведёт на другой сайт или содержит расширение, то выйти из обработчика
      if(target.origin !== location.origin || /\.\w+$/.test(target.href)) return

      // приостановить переход по ссылке
      e.preventDefault()
      
      // если событие сгенерировано пользователем, то добавить новую запись в историю браузера
      if(e.isTrusted) history.pushState(null, '', target.href)

      // вызвать функцию-обработчик для события 'popstate'
      popstate(args, target)
    }, props)

    // если было передано свойство 'start' со значением истина, то вызвать функцию-обработчик 'popstate'
    if(props && typeof props === 'object' && props.start) popstate(args)
  }
}
