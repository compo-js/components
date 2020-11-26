// функция-обработчик события 'popstate' для объекта 'window'
export default function (events, target = location, href = target.href.replace(target.origin, '')) {
  // перебрать массив событий 'events'
  events.forEach(event => {
    // если тип события соответствует 'href'
    if(new RegExp(`^[/]?${event.type}$`).test(href)) {
      // изменить стандартное значение свойства 'target' у объекта события
      Object.defineProperty(event, 'target', { value: target, enumerable: true, writable: true })
      
      // вызвать обработчики этого события для 'document'
      document.dispatchEvent(event)
    }
  })
}