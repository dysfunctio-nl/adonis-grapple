## Registering provider

Like any other provider, you need to register the provider inside `start/app.js` file.

```js
const providers = [
  'adonis-grapple/providers/GrappleProvider'
]
```

## Dependencies

This module has dependencies on `@adonisjs/bodyparser`.

## Config

The configuration is saved inside `config/grapple.js` file. Tweak it accordingly.