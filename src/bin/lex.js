
class Token {
  constructor (s, index) {
    this.index = index
    this.isLambda = lambdaRegex.test(s)
    this.isIdentifier = idRegex.test(s)
    this.type = s
    this.identifier = s
    if (this.isIdentifier) {
      this.type = 'id'
    }
    this.isBracketsStart = bracketsStart.test(s)
    this.isBracketsEnd = bracketsEnd.test(s)
    this.isDot = dotRegex.test(s)
    if (!this.isLambda && !this.isIdentifier && !this.isDot && !this.isBracketsStart && !this.isBracketsEnd) {
      throw new Error(`unexpected token input ${this.index}`)
    }
    this.key = '' + Math.random()
  }
  toString () {
    return this.type
  }
  unparse () {
    return this.identifier
  }
}

const idRegex = /[a-z]/
const lambdaRegex = /λ/
const dotRegex = /\./
const escapeRegex = /[ |\t|\n]/
const bracketsStart = /\(/
const bracketsEnd = /\)/

/*
    string -> [ Token ]
 */
const lex = (str) => {
  const ret = []
  for (let i = 0; i < str.length; i++) {
    if (escapeRegex.test(str[i])) continue
    ret.push(new Token(str[i], i))
  }
  ret.push({type: '$', index: str.length + 1})
  return ret
}

export default lex
