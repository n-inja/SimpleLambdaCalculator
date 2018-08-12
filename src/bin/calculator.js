const DEBUG = false
let step = 0
const MAX_STEP = 1000
let index = 0

class Environment {
  constructor (parent) {
    this.parent = parent
    this.map = new Map()
  }
  search (s) {
    if (!this.parent) return this.map.get(s)
    if (this.map.get(s) === undefined) return this.parent.search(s)
    return this.map.get(s)
  }
  set (key, value) {
    if (this.map.get(key)) throw new Error('CalcError: Name collision')
    if (this.map.set) this.map.set(key, value)
  }
  toString () {
    let ret = ''
    this.map.forEach((value, key) => { ret += `${key} -> ${value} ` })
    if (this.parent) ret += ` {${this.parent.toString()}}`
    return ret
  }
}

/*
class LambdaResult {
  constructor (str) {
    this.str = str
  }
  toString () {
    return this.str
  }
  eval (env) {
    if (DEBUG) console.log(`LambdaResult eval ${this.toString()} ${env.toString()}`)
    return this
  }
  calc (env, lambda) {
    if (DEBUG) console.log(`LambdaResult calc ${this.toString()} ${lambda.toString()} ${env.toString()}`)
    return new LambdaResult(`(${this.str}${lambda.toString()})`)
  }
}
*/

class Lambda {
  constructor (arg, statement) {
    this.arg = arg
    this.statement = statement
  }
  toString () {
    return `(λ${this.arg.toString()}.${this.statement.toString()})`
  }
  eval (env) {
    step++
    if (step >= MAX_STEP) throw new Error(`CalcError: Calculation is too complicated`)
    if (DEBUG) console.log(`Lambda eval ${this.toString()} ${env.toString()}`)
    env = new Environment(env)
    const id = index++
    const newId = new LambdaIdentifier(this.arg.toString(), id)
    env.set(this.arg.toKey(), newId)
    return new Lambda(newId, this.statement.eval(env))
  }
  calc (env, lambda) {
    step++
    if (step >= MAX_STEP) throw new Error(`CalcError: Calculation is too complicated`)
    if (DEBUG) console.log(`Lambda calc ${this.toString()} ${lambda.toString()} ${env.toString()}`)
    env = new Environment(env)
    env.set(this.arg.toKey(), lambda)
    return this.statement.eval(env)
  }
}

class LambdaApplication {
  constructor (l1, l2) {
    this.l1 = l1
    this.l2 = l2
  }
  toString () {
    return `(${this.l1.toString()}${this.l2.toString()})`
  }
  eval (env) {
    step++
    if (step >= MAX_STEP) throw new Error(`CalcError: Calculation is too complicated`)
    if (DEBUG) console.log(`LambdaApplication eval ${this.toString()} ${env.toString()}`)
    return this.l1.calc(env, this.l2.eval(env))
  }
  calc (env, lambda) {
    step++
    if (step >= MAX_STEP) throw new Error(`CalcError: Calculation is too complicated`)
    if (DEBUG) console.log(`LambdaApplication calc ${this.toString()} ${lambda.toString()} ${env.toString()}`)
    const evaled = this.eval(env)
    if (evaled instanceof LambdaApplication) return new LambdaApplication(evaled, lambda)
    return this.eval(env).calc(env, lambda)
  }
}

class LambdaIdentifier {
  constructor (s, id) {
    this.str = s
    this.id = id
  }
  toString () {
    return this.str
  }
  toKey () {
    return this.str + this.id
  }
  eval (env) {
    step++
    if (step >= MAX_STEP) throw new Error(`CalcError: Calculation is too complicated`)
    if (DEBUG) console.log(`LambdaIdentifier eval ${this.toString()} ${env.toString()}`)
    const searched = env.search(this.str + this.id)
    if (searched === 0) return this
    return searched || this
  }
  calc (env, lambda) {
    step++
    if (step >= MAX_STEP) throw new Error(`CalcError: Calculation is too complicated`)
    if (DEBUG) console.log(`LambdaIdentifier calc ${this.toString()} ${lambda.toString()} ${env.toString()}`)
    const evaled = this.eval(env)
    if (evaled instanceof LambdaIdentifier) return new LambdaApplication(evaled, lambda)
    return evaled.calc(env, lambda)
  }
}

const conv = (ast) => {
  if (ast.name === 'Lambda-define') {
    return new Lambda(new LambdaIdentifier(ast.children[2].children[0].identifier, -1), conv(ast.children[4]))
  } else if (ast.name === 'Lambda-apply') {
    return new LambdaApplication(conv(ast.children[1]), conv(ast.children[2]))
  } else if (ast.name === 'Lambda-identifier') {
    return new LambdaIdentifier(ast.children[0].children[0].identifier, -1)
  }
}

const calc = (ast) => {
  step = 0
  index = 0
  const converted = conv(ast)
  console.log(converted)
  const result = converted.eval(new Environment())
  console.log(result)
  return result.toString()
}

export default calc
