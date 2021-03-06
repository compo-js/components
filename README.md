# What are Components?

![components](logo.png)

**Components** (or **CompoJS** for short) is a reactive JavaScript library built on top of standard Web Components to quickly build client-tier web applications. The library is distributed under the MIT license, is small in size and does not require a lot of time to study it. Basic knowledge of HTML, CSS and JavaScript will be enough to start working with it.

- **[Tutorial](http://www.compojs.ru/guide)**
- **[Example](http://compojs.ru/example)**
- **[Server](http://compojs.ru/server)**
- **[Builder](https://www.npmjs.com/package/gulp-compo-builder)**

Below is an example of a simple component with a header and three loops available in the library:

```html
<my-component>
  <h1>${ message }</h1>

  <div c-for="obj of users">
    <div class="user">
      <p>
        <b>Имя</b>: ${ obj.name }
      </p>
      <p>
        <b>Возраст</b>: ${ obj.age }
      </p>
      <div c-for="category in obj.skills">
        <b>${ category[0].toUpperCase() + category.slice(1) }</b>:
        <ol c-for="i = 0; i < obj.skills[category].length; i++">
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
    this.message = 'Пользователи'
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

The **CompoJS** library was built without looking back, which explains the lack of support in older browsers. Its purpose was to make application development simple and accessible to everyone, which would have been impossible without the use of modern Web technologies.

- **[compojs.ru](http://www.compojs.ru)**

## Contacts

- **[compo.js@mail.ru](mailto:compo.js@mail.ru)**
