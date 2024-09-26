Zrobiliśmy sobie tutaj server side rendering bez użycia next.js

- server.js ma kod który będzie przekształcony w HTML i nie będzie wgl interaktywny

```
const renderedReact = renderToString(<Home />);
const html = htmlTemplate.replace("%content%", renderedReact);
```

- client.js zawiera interaktywność strony - jsx / js która zostaje dodana w procesie zwanym hydration

```
ReactDOM.hydrateRoot(document.getElementById("root"), <Home />);
```
