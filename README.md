# Fake Data Generator

#### Just a small open-source script to create fake data given a simple JSON model.

## Introduction

***This is a tiny package motivated by the development of a real-world frontend project where we needed to generate tons of fake data while the backend was being built. We started implementing and editing a single .js file with specific characteristics of the backend models and the desired amount we wanted to generate until we ended up with something like this. We personally decided to use the output files in the API endpoints of a testing server but you could use them any way you like, they're just JSON files :)***

## Dependencies

+   **[Faker](https://www.npmjs.com/package/faker)**: we take advantage of the Faker API to create fake data

## Installation

***Install from npm or clone/fork the repository***

### Install as a standalone forked repository

+   **First Clone or fork the repository** (thumbsup for forking :D)

+   **Install dependencies**

```bash
  npm install
```

### Install as an npm dependency for your own project

```bash
  npm install --save-dev fake-data-generator
```

### Or if you want to use it globally from a terminal

```bash
  npm install -g fake-data-generator
```

## Usage

### Usage from a forked or cloned repository

#### 1. Write a simple JSON model in the models directory

[***Article Example***](/models/example.json)

#### 2. Run the generate script from a terminal

***Writes a .json file with an array of 50 articles to the output directory where:***

+   **1st param** ***(example):*** is the name of your model.json
+   **2nd param** ***(10):*** the numbers of models to generate
+   **3rd param** ***(example.json):*** the name of the output file

```bash
  npm run generate example 10 example.json
```

[***Output Example***](/output/example.json)

### Usage as an npm dependency

#### 1. Write a simple JSON model as explained before

#### 2. Use it in your own module

```javascript
  // Requires the package
  const { generateModel } = require('fake-data-generator')
  // Requires a model
  const model = require('./models/example.json')
  // Generate the model
  const amountArg = 50
  const modelArg = 'example'
  const outputType = 'object'
  const generatedModel = generateModel({ amountArg, modelArg, outputType })
```

#### generateModel function

*   **amountArg:** *the quantity of models to generate*
*   **modelArg:** *the name of your model in the models directory*
*   **outputType:** *one of the following:*
    +   **object:** *Returns a javascript object or array*
    +   **json:** *Outputs a json file to the output directory*

### Usage as a global npm dependency

#### 1. Create a models and an output directory and write a simple JSON model as explained before

```bash
  mkdir models
  mkdir output
```

#### 2. Run the global npm bin script

```bash
  fake-data-generator example 10 example.json
```

## Models Format

*   **config:** *General configuration*
    +   **locale:** *language used for faker.locale*
*   **model:** *This is where you declare the model*
    +   **attribute** *an attribute of your model. Example:* ***id***    
        +   **type** *One of* ***"faker", "randomNumberBetween", "Object", "Array"***
        +   **value** *A value corresponding to the specified type*
        +   **options** *configuration options for the specified type. (required by some types)*

#### Types and Values

##### faker

*Currently the script supports faker methods that return Date, String or Number data only. It's not ready to handle faker methods that receive arguments* ***yet.***

If you're not familiar with **faker**, take a look at their [**docs**](https://www.npmjs.com/package/faker#api-methods), it's really simple to use.

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

##### Object

This is how the script knows we want to nest objects

*say we want to declare a more complex company model:*

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

##### Numbers

+   **randomNumberBetween**

*the script provides a simple way to get a random number between a range of numbers*

```json
{
  "timesIWatchedNicolasCageMovies": {
    "type": "randomNumberBetween",
    "value": [150, 2587655]
  }
}
```

##### Array

Defines an Array of objects to be created with the same type.

**options**
- `size: Number` How many objects to create. **required**

*Extending the company model a little further:*

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

## Contributing and Future features

We plan to keep improving this script. We'd at least like to give support to all faker methods and *(why not?)* for any other fake data module from npm.

If you feel like contributing or just share an idea for us to improve the script usage, please do not hesitate to open an issue with the **nice to have** label.

---

**With :green_heart::purple_heart::heart: from [Cambá Coop](https://camba.coop), Buenos Aires, Argentina.**
