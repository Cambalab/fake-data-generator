# Fake Data Generator

<h4 align="center">Just a small open-source script to create fake data given a simple JSON model.</h4>

<p align="center">
  <a href="https://travis-ci.com/Cambalab/fake-data-generator">
    <img src="https://travis-ci.com/Cambalab/fake-data-generator.svg?branch=develop" alt="Build Status">
  </a>
  <a href="https://codecov.io/gh/Cambalab/fake-data-generator">
    <img src="https://codecov.io/gh/Cambalab/fake-data-generator/branch/develop/graph/badge.svg" />
    </a>
  <a href="https://www.npmjs.com/package/fake-data-generator">
    <img src="https://img.shields.io/npm/v/fake-data-generator.svg" alt="Npm version">
  </a>
  <a href="https://github.com/Cambalab/fake-data-generator/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/fake-data-generator.svg" alt="License">
  </a>
  <a href="https://github.com/Cambalab/fake-data-generator/blob/master/.github/CODE_OF_CONDUCT.md">
    <img src="https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg" alt="License">
  </a>
</p>

## Introduction

This is a tiny package motivated by the need of generating certain amount of fake data to populate backend fixtures. We started implementing and editing a single `.js` file with specific characteristics of some backend models and the desired amount we wanted to generate until we ended up with something like this. We personally decided to use the output files in the API endpoints of a test server but you could use them any way you like, they're just `.json` files.

## Built-In Dependencies

+   **[Faker](https://www.npmjs.com/package/faker)**: we use the Faker API to create fake data

## Installation

There are a few ways you can get this library installed:

+   Install as a standalone forked repository

```bash
# clone our project or fork your own
git clone https://github.com/Cambalab/fake-data-generator.git
# install dependencies
npm install
```

+   Install as an npm dependency for your own project

```bash
# install it as a dependency or dev-dependency of our own project
npm install --save-dev fake-data-generator
```

+   Use it globally from a terminal

```bash
# install it globally
npm install -g fake-data-generator
```

## Usage

### Usage from a forked or cloned repository

1. Write a `.json` model in the `models` directory. [**Article Example**](/models/example.json)

2. Run the `generate` script from a terminal

*The following command writes a .json file with an array of 50 elements to the output directory, where:*

+   **1st param** `example`: is the name of your `model.json` file.
+   **2nd param** `10`: the numbers of models to generate.
+   **3rd param** `example.json`: the name of the output file.

```bash
npm run generate example 50 example.json
```

[***Output Example***](/output/example.json)

### Usage as an npm dependency

1. Write a model as explained before. It can be a `.json` file or a javascript `Object`
2. Use it in your own module

#### Params description

**amountArg:**
+   **Type:** `Number`
+   **Description:** describes how many elements should be created from a given model
+   **Required**

**modelArg:**
+   **Type:** `Object | Json file`
+   **Description:** when **inputType** param is `json`, **modelArg** behaves as a file path to that json file. For `object` **inputType** values, **modelArg** behaves like a javascript object, where the model should be defined.
+   **Required**

**fileName:**
+   **Type:** `String`
+   **Description** when **inputType** is `json` **fileName** will describe the output path where the file will be writen to.

**inputType:**
+   **Type:** `String`
+   **Options:** `object | json`
+   **Description:** describes the kind of input the generator will receive and read the model from.

**outputType:**
+   **Type:** `String`
+   **Options:** `object | json`
+   **Description:** describes the kind of output the generator will write or return. 

```javascript
// Requires the package
const { generateModel } = require('fake-data-generator')
// Requires a model
const model = require('./models/example.json')
// Generate the model
const amountArg = 50
const modelArg = model
const inputType = 'object'
const outputType = 'object'
const generatedModel = generateModel({ amountArg, modelArg, inputType, outputType })
```

> Note that when using `required` or `import` on a `.json` file the returned value behaves like a javascript Object.

### Usage as a global npm dependency

1. Create a `models` directory, an `output` directory and write a `.json` model as explained before. <br /><br />

    ```bash
    mkdir models
    mkdir output
    ```

2. Run the global npm bin script. <br /><br />

    ```bash
    fake-data-generator example 10 example.json
    ```

## Models Format

### config

+   **Type:** *(optional)* `Object`

+   **Details:** general configuration.

+   **Properties:**
    +   **locale:** *language used for `faker.locale`.*

### amount

+   **Type:** *(optional)* `Number`

+   **Details:** an amount of objects to generate.

> *When this value is present, the amount value given from a cli or the generateModel function from the npm package is overwritten.*
    

### model

+   **Type:** `Object`

+   **Details:** A declaration of your object model

+   **Properties:**
    +   **attributeName** *an attribute of your model. Example:* ***`id`***
        +   **type** *one of fake-data-generator types. Example:* ***`faker`, `randomNumberBetween`, `Object`, `Array`***.
        +   **value** *a value corresponding to the specified type*.
        +   **options** *configuration options for the specified type (required by some types)*.

# <Divider>

### Types and Values

A valid format would be an object with the following keys:  
+   **type**
+   **value**
+   **options** *(optional)*

# <Divider>

#### faker

Currently the script supports faker methods that return `Date`, `String` or `Number` data only. It's not ready to handle faker methods that receive arguments ***yet.***

If you're not familiar with `faker`, take a look at their [**docs**](https://www.npmjs.com/package/faker#api-methods), it's really simple to use.

Any other faker method can be used in the **value** attribute like this:

*suppose we want to generate a company attribute with faker, then we would declare in the model:*

```json
{
  "company": {    
    "type": "faker",
    "value": "company.companyName"
  }
}  
```

# <Divider>

#### Literal

This is simply a pass-through for those occasions when a known value is desired.

`value: any`

Case with a `String`
```json
{
  "operating_system": {    
    "type": "Literal",
    "value": "Linux"
  }
}
```

Case using an `Array` of elements
```json
{
  "resources": {    
    "type": "Literal",
    "value": ["memory", "disk", "network", "cpu"]
  }
}
```

# <Divider>

#### Object

This is how the script knows we want to nest objects

*say we want to declare a more complex company model:*

`value: Object` an object with a type, value, options structure

```json
{
  "company": {    
    "type": "Object",
    "value": {
      "name": {    
        "type": "faker",
        "value": "company.companyName"
      },
      "address": {
        "type": "Object",
        "value": {
          "street": {
            "type": "faker",
            "value": "address.streetAddress"
          },
          "city": {
            "type": "faker",
            "value": "address.city"
          },
          "state": {
            "type": "faker",
            "value": "address.state"
          }
        }
      }
    }
  }
}
```

# <Divider>

#### Numbers

##### randomNumberBetween

*The script provides a simple way to get a random number between a range of numbers*

`value: Array<Number>` a range of values to compute the random number

```json
{
  "timesIWatchedNicolasCageMovies": {
    "type": "randomNumberBetween",
    "value": [150, 2587655]
  }
}
```

##### randomElementInArray

*The script provides a simple way to get a random element from an array of options.*

`value: Array` a list of options to pick from.

```json
{
  "whichMovieToWatchTonight": {
    "type": "randomElementInArray",
    "value": ["Frozen", "Mulan", "The Lion King", "Aladdin", "Pulp Fiction"]
  }
}
```

*output*
```json
{
  "whichMovieToWatchTonight": "Pulp Fiction"
}
```

##### randomElementsInArray

*This one returns a random group of elements from an array of options.*

`value: Array` a list of options to pick from.

```json
{
  "whichMoviesToWatchTonight": {
    "type": "randomElementsInArray",
    "value": ["Frozen", "Mulan", "The Lion King", "Aladdin", "Pulp Fiction"]
  }
}
```

*output*
```json
{
  "whichMoviesToWatchTonight": ["Pulp Fiction", "Aladdin"]
}
```

##### randomNumberBetweenWithString

*Just another version of randomNumberBetween that accepts a range of numbers, a prefix as a string and a suffix as a string*

***options:***  
+   `prefix: String` a value to be interpolated as the number prefix
+   `suffix: String` a value to be interpolated as the number suffix

```json
{
  "publication": {
    "type": "randomNumberBetweenWithString",
    "value": [1, 2500000],
    "options": {
      "prefix": "#",
      "suffix": "*"
    }
  }
}
```

##### incrementNumber

*You can get incremental numbers based on the given amount for a model*

> The `value` attribute is ignored

***options:***
+   `from: Number` starts incrementing from a given number

```json
{
  "brownies": {
    "type": "incrementNumber",
    "options": {
      "from": 420
    }
  }
}
```

*Output using an amount of 3:*

```json
[
  {
    "brownies": 420
  },
  {
    "brownies": 421
  },
  {
    "brownies": 422
  },
]
```

# <Divider>

#### Array

Defines an `Array` of elements to be created with the same type.

***options***
+   `size: Number` How many objects to create. **Required, is mutually exclusive with size: `Array`**
+   `size: Array`  A two value array where the first value is the minimum number of entries and the second is the maximum. **Required, is mutually exclusive with size: `Number`**

*Extending the company model a little further:*

__as a Number__
```json
{
  "company": {    
    "type": "Object",
    "value": {
      "name": {    
        "type": "faker",
        "value": "company.companyName"
      },
      "addresses": {
        "type": "Array",
        "options": {
          "size": 10
        },
        "value": {
          "type": "Object",
          "value": {
            "street": {
              "type": "faker",
              "value": "address.streetAddress"
            },
            "city": {
              "type": "faker",
              "value": "address.city"
            },
            "state": {
              "type": "faker",
              "value": "address.state"
            }
          }
        }
      }
    }
  }
}
```

__as an Array__
```json
{
  "company": {    
    "type": "Object",
    "value": {
      "name": {    
        "type": "faker",
        "value": "company.companyName"
      },
      "addresses": {
        "type": "Array",
        "options": {
          "size": [5, 20]
        },
        "value": {
          "type": "Object",
          "value": {
            "street": {
              "type": "faker",
              "value": "address.streetAddress"
            },
            "city": {
              "type": "faker",
              "value": "address.city"
            },
            "state": {
              "type": "faker",
              "value": "address.state"
            }
          }
        }
      }
    }
  }
}
```

##### Concatenate

###### prepend

Adds a fixed `String` in front of another dynamic value generated by one of the other datatypes.

***options***
  - `text: String` The text to be prepended. **required**

```json
{
  "issue": {
    "type": "prepend",
    "options": {"text": "#"},
    "value": {
      "type": "randomNumberBetween",
      "value": [1, 2500]
    }
  }
}
```

###### append

Adds a fixed `String` at the back of another dynamic value generated by one of the other datatypes.

***options***
  - `text: String` The text to be appended. **required**

```json
{
  "fileName": {
    "type": "append",
    "options": {"text": ".pdf"},
    "value": {
      "type": "faker",
      "value": "random.words"
    }
  }
}
```

## Contribution

Please make sure to read the [**Contributing Guide**](https://github.com/Cambalab/fake-data-generator/blob/master/.github/CONTRIBUTING.md) before submitting pull requests. There you'll find development environment instructions, common scripts and the project structure summary.

Feel free to open an issue if any faker method is not working as expcected or if you would like support for another data generator module.

## License

[**GNU General Public License version 3**](https://github.com/Cambalab/fake-data-generator/blob/master/LICENSE)

# <Divider>

<p align="center">
  <strong>👩‍💻 With :green_heart: :purple_heart: :heart: by <a href="https://camba.coop" target="_blank" rel="noopener noreferrer"><img width="20" src="http://camba.coop/assets/signature/no_text_logo.png" /> Cambá Coop</a> :earth_americas: Buenos Aires, Argentina
  </strong>
</p>
