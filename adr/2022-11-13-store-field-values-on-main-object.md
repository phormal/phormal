# Store field values on main object
Date: 2022-11-13

## Background
In order to support an intuitive API for accessing field values, the main object of the library, SuperForm, needs to store the values of the fields. This has two main benefits:

1.  Implementers can access a field values easily like so:

```js
const form = new SuperForm({
	fields: {
		firstName: {
			name: 'firstName',
			value: 'John',
		},
	},
});

form.firstName; // 'John'
```

2. Managing dependencies between fields is facilitated:

If a field **A** depends on the value of another field **B**, the relationship between the two fields is much easier to handle from a central **SuperForm** instance. This way, if **B** changes, **A** can be notified and update its value and/or DOM-nodes accordingly.

## Implications

Because SuperForm now dynamically assigns field names to its own main instance, some field names will be reserved, since the main instance also has its own properties and methods. These reserved field names are:

- `formConfig`
- `fields`
- `VNodes`
- `projector`
- `init`
- `values`
- `setValue`
- `getValues`