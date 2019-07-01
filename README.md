# cronversant

Simple, dependency-free crontab schedule expression parser, formatter, and canonicalizer.

The parser returns a data structure representing the schedule string, and the formatter
returns a schedule string representing the data structure. Round-trip parsing and formatting
return the original string (i.e. `formatCron(parseCron(str)) === str`, assuming that each
field is separated by a single space character and numbers do not have leading zeros).

Canonicalization transforms a parsed schedule into its most concise representation and
guarantees that any two expressions yielding the same schedule will have the same form.
It also annotates the data structure with useful derived information, such as the actual
values yielded by each field expression. This simplifies the implementation of tools that
operate on the parsed structure.

## API

### parseCron

```js
function parseCron(str, options = {})
```

Parses the given crontab schedule string into an object describing its individual fields.
The only option currently defined is `withSeconds`, indicating that there are six fields:
seconds, minutes, hours, days of the month, months, and days of the week. Otherwise, five
fields are expected, staring with minutes.

#### Parser output

The parser returns an object with the following properties:

| Property | Description |
|----------|-------------|
| `macro` | The name of the shorthand/macro, if one is used. For instance, a schedule of `@hourly` has the `macro` value `"hourly"`. |
| `seconds` | The field expression for seconds of each matching minute, if the `withSeconds` option is `true`. |
| `minutes` | The field expression for minutes of each matching hour. |
| `hours` | The field expression for hours of each matching day. |
| `daysOfMonth` | The field expression for days of each matching month. |
| `months` | The field expression for months of each year. |
| `daysOfWeek` | The field expression for days of the week, with further restrict the matching days. |
| `command` | The remainder of the expression string, if any. |

Field expressions are represented by various types of values and objects, depending on how they were expressed in the string:

| Expression | Representation |
|------------|----------------|
| an integer | A number or an object with a `value` property that is a number. |
| a month or day-of-week alias, such as `JAN` or `MON` | An object with `alias` and `value` properties. |
| a range, such as `1-5` | An object with `min` and `max` properties, which are also field expressions. |
| a wildcard, such as `*` or `?` | A range object with a `wild` property containing the wildcard character. |
| a step, such as `1-7/2` | A field expression object with a `step` property that is a number. |
| a sequence, such as `1,3-5` | An object with a `sequence` property that is an array of field expressions. |

The following macros are supported. With the exception of the special `@reboot` macro, the macros are expanded as shown.

| Macro | Expansion |
|-------|-----------|
| `@yearly`, `@annually` | `(0) 0 0 1 1 *` |
| `@monthly` | `(0) 0 0 1 * *` |
| `@weekly` | `(0) 0 0 * * 0` |
| `@daily`, `@midnight` | `(0) 0 0 * * *` |
| `@hourly` | `(0) 0 * * * *` |
| `@reboot` | _N/A_ |

For example, `parseCron('@hourly go')` yields the following object:

```js
{ macro: 'hourly',
  command: 'go',
  minutes: 0,
  hours: { wild: '*', min: 0, max: 23 },
  daysOfMonth: { wild: '*', min: 1, max: 31 },
  months: { wild: '*', min: 1, max: 12 },
  daysOfWeek: { wild: '*', min: 0, max: 7 } }
```

### formatCron

```js
function formatCron(cron, options = {})
```

Formats a string representation of the given cron schedule object, such as returned by `parseCron`.
Each field in the string is separated by a single space character.

By default, if the cron object contains a `macro` value, it is formatted as a macro.
To format using the macro expansion (in the case of macros other than `@reboot`), specify the `withMacros` option as `false`.

Similarly, if the cron field expression contains an `alias` value, the field is formatted using that alias.
To format fields using only numerical values, specify the `withAliases` option as `false`.

Similarly, if the cron object contains a `command` value, that is included as well.
To disable the inclusion of any command, specify the `withCommand` option as `false`.

### canonicalCron

```js
function canonicalCron(cron)
```

Returns a copy of the given cron schedule object in canonical form.
The canonical form includes the property `canonical: true`,
so calling this function on an already-canonical object just returns the given object.

Note that canonicalization will preserve aliases, but will not introduce them,
so the presence of aliases should not be considered part of the canonical form.
If it is important that canonical objects produce identical strings when formatting,
set the `withAliases` option to `false` when using `formatCron`.

#### Canonicalization rules

 1. Each field has an Object value with a `values` array containing all of its values in ascending order.
    Missing fields get the minimum value of the range.
 2. Day of week value 7 (Sunday) is replaced with 0.
 3. If a field covers the entire range, it is converted to a wildcard.
    This includes a step starting from the minimum value.
 4. If a range or non-wildcard step contains only two values, it is converted to a sequence.
 5. Sequences are sorted and duplicate values are removed.
 6. If a subsequence of three or more values can be replaced with an equivalent range or step, it is.
 7. Sequences of one value (or range or step) are replaced with that value.
 8. Steps of 1 are converted to a range.
 9. The maximum value of a step is its last value.
10. Steps that cover every value in the field range have a `periods` property containing the number of
    periods in the range (i.e. range divided by step) and a `regular` property indicating whether the
    step evenly divides the field range (i.e. `periods` is an integer).
