# robot

This is a Node JS program implemented the toy robot.

# Installation

To install dependencies, please do

```
$ npm install
```

# Testing

To run the test, please do

```
$ npm test
```

The test code can be found under `test/specs`.

# Running

Please do a gulp build

```
$ gulp build
```

then

```
$ node . <relative path of the test file>
```

# Running Test Cases Provided

```
$ node . test/cases/case-10
$ node . test/cases/case-20
$ node . test/cases/case-100
```

# Running Example Cases

```
$ node . test/cases/example-a
$ node . test/cases/example-b
$ node . test/cases/example-c
```

# Generate Test Cases

Please see `test/utils/gen.js`

# Files

`src/parser.js` the code to parse file into actions
`src/robot.js` the code to execute actions
`test/specs/parser.js` unit tests for the parser code
`test/specs/robot.js` unit tests for the robot code
