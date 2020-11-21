# What are Components?

![components](logo.png)

**Components** (or **Compo.js** for short) is a reactive JavaScript library built on top of standard Web Components to quickly build client-tier web applications. The library is distributed under the MIT license, is small in size and does not require a lot of time to study it. Basic knowledge of HTML, CSS and JavaScript will be enough to start working with it.

- **[Tutorial](http://www.compojs.ru/guide)**

An example of a simple component is shown below:

```html
<my-component>
  <h1>${ message }</h1>

  <div c-for="obj of users">
    <div c-for="prop in obj">
      <p>
        <b>${ prop }</b>: ${ obj[prop] }
      </p>
    </div>
    <br>
  </div>
    
  <style>
    h1 {
      margin-bottom: 50px;
      color: ${ color() };
    }
  </style>

  <script>
    this.message = 'My component!'
    this.color = () => 'orangered'
    this.users = [
      {
        name: 'Dmitry',
        age: 28
      },
      {
        name: 'Olga',
        age: 25
      },
      {
        name: 'Mark',
        age: 30
      }
    ]
  </script>
</my-component>
```

## Author

- **[compojs.ru](http://www.compojs.ru)**
