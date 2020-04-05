# pick-date-react

A date picker for your React applications, based on regular expression checks.

It represents a whole new approach to play with dates based on the regex provided. It provides with pure JavaScript Date objects in return, and internally no other library is used.

## Features

- Works on pattern matching, which means it will format and validate a date based on the regular expression provided.
- Accordingly formats the date and returns a JavaScript date object.
- If the regex does not match, it will always return false. 
- Live typing - Your date will be validated while you type in the input box, if it matches the regular expression. This means that the Calendar will be updated automatically if it is valid. 
- Theme - You can change the color of the Calendar. 
- The Calendar could be used as a stand alone component, without the input box. 

## Get Started

To install the package, simply run:
```npm install react-date-selector```

```js
import React, { useState } from "react";
import DatePicker from "react-date-selector";

const App = () => {
  const [value, setValue] = useState(new Date());

  const handleOnChange = value => {
    setValue(value);
  };

  return (
      <DatePicker
        date={value}
        handleOnChange={handleOnChange}
      />
  );
};

export default App;
```

## Props

These are the props which can be passed in:

- `date` - A JavaScript Date object, if not passed, the default value would be today's date. 
- `handleOnChange` - An onChange handler, to receive back the Date object.
- `minDay` - The minimum date parameter, should be a JavaScript Date object.
- `maxDay` - The maximum date parameter, should be a JavaScript Date object.
- `isInputDisabled` - Value to disable the input value, and only get values from the Calendar.
- `format` - A regular expression for date, if not specified, would default to `mm/dd/yyyy`. Can be one of these four `mm/dd/yyyy, dd/mm/yyyy, dd-mm-yyyy, yyyy-mm-dd`
- `config` - An object which takes in 3 parameters, format, regular expression, and separator.
- `children` - An element or a component could be passed to render. 
-  `theme` - A background color, and a hover color can be provided in object, to change the theme color of the picker.

## Examples

### Minimum Day and Maximum Day

```js
<DatePicker
    date={new Date()}
    handleOnChange={handleOnChange}
    minDay={new Date()}
    maxDay={new Date()}
/>
```

### config object
**Note: The config object needs to have all three parameters to work.**

```js
<DatePicker
    date={new Date()}
    handleOnChange={handleOnChange}
    config={{
        format: "dd/mm/yyyy",
        regex: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
        separator: "/"
    }}
/>
```

### theme object

```js
<DatePicker
    date={new Date()}
    handleOnChange={handleOnChange}
    theme={{
        backgroundColor: 'red',
        hoverColor: 'pink'
    }}
/>
```

### Calendar component
In addition, the Calendar component can directly be used too. 

```js
<Calendar
    date={new Date()}
    handleOnChange={handleOnChange}
/>
```

### Scripts

## `npm run test`
Runs the test cases.

## `npm run test:watch`
Runs the test cases in watch mode.