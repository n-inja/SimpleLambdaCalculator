
class Token {
  constructor (s) {
    this.lambda = lambdaRegex.test(s)
    this.isIdentifier = idRegex.test(s)
    this.identifier = s
    this.isDot = dotRegex.test(s)
    if (!this.lambda && !this.identifier && !this.isDot) {
      throw new Error('unexpected token')
    }
  }

}

const idRegex = /[a-z]/
const lambdaRegex = /λ/
const dotRegex = /./
const escapeRegex = /[ |\t|\n]/

/*
    string -> [ Token ]
 */
const lex = (str) => {
  const ret = []
  for (let i = 0; i < str.length; i++) {
    if (escapeRegex.test(str[i])) continue
    ret.push(new Token(str[i]))
  }
  return ret
}

export default lex
