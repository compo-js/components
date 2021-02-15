// функция-обработчик события 'popstate' для объекта 'window'
export default function (events, target = location) {
  // перебрать массив событий 'events'
  events.forEach(event => {
    // если тип события соответствует 'href' без 'origin'
    if(new RegExp(`[/]?${event.type}$`).test(target.href.replace(target.origin, ''))) {
      // изменить стандартное значение свойства 'target' у объекта события
      Object.defineProperty(event, 'target', { value: target, enumerable: true, writable: true })
      
      // вызвать обработчики этого события для 'document'
      document.dispatchEvent(event)
    }
  })
}