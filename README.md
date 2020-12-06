# What are Components?

![components](logo.png)

**Components** (or **Compo.js** for short) is a reactive JavaScript library built on top of standard Web Components to quickly build client-tier web applications. The library is distributed under the MIT license, is small in size and does not require a lot of time to study it. Basic knowledge of HTML, CSS and JavaScript will be enough to start working with it.

- **[Tutorial](http://www.compojs.ru/guide)**

<hr>

## Upgrade to version 2.0.0

To meet the validator requirements: [https://validator.w3.org](https://validator.w3.org)

1) It is recommended to use the custom attribute **'data-name'** in the **\<template\>** tags of built-in components, instead of the **'name'** attribute used in the first version. But this is not the case for external components, where the **'name'** attribute is still used if the **\<template\>** tag is selected as the container.

2) Special attributes: **'c-for'** and **'c-hide'** have been replaced with valid custom attributes: ['data-for'](http://compojs.ru/guide#Циклы) and ['data-hide'](http://compojs.ru/guide#Скрытие).

<hr>

Below is an example of a simple component with a header and three loops available in the library:

```html
<my-component>
  <h1>${ title }</h1>

  <div data-for="obj of users">
    <div class="user">
      <p>
        <b>Имя</b>: ${ obj.name }
      </p>
      <p>
        <b>Возраст</b>: ${ obj.age }
      </p>
      <div data-for="category in obj.skills">
        <b>${ category[0].toUpperCase() + category.slice(1) }</b>:
        <ol data-for="i = 0; i < obj.skills[category].length; i++">
          <li>${ obj.skills[category][i] }</li>
        </ol>
      </div>
    </div>
    <hr>
  </div>
  
  <style>
    h1 {
      margin-bottom: 40px;
      color: ${ color() };
    }
    .user {
      margin: 30px 0;
    }
    hr:last-of-type {
      display: none;
    }
  </style>

  <script>
    this.title = 'Пользователи'
    this.color = () => 'orangered'
    this.users = [
      {
        name: 'Дмитрий',
        age: 28,
        skills: {
          frontend: ['HTML', 'CSS'],
          backend: ['PHP', 'Ruby', 'MySQL']
        }
      },
      {
        name: 'Ольга',
        age: 25,
        skills: {
          frontend: ['HTML', 'JavaScript'],
          backend: ['PHP']
        }
      },
      {
        name: 'Максим',
        age: 30,
        skills: {
          frontend: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
          backend: ['Ruby', 'MySQL']
        }
      }
    ]
  </script>
</my-component>
```

In addition to a convenient way to create Web components and add reactivity to them using a proxy, the library uses the event system available in the browser as an observer and provides a router based on the observer and the pushState () method.

## Author

The Compo.js library was built without looking back, which explains the lack of support in older browsers. Its purpose was to make application development simple and accessible to everyone, which would have been impossible without the use of modern Web technologies.

- **[compojs.ru](http://www.compojs.ru)**

## Contacts

- **[https://vk.com/compojs](https://vk.com/compojs)**
- **[compo.js@mail.ru](compo.js@mail.ru)**