/*

Start: S

Nonterminal symbols
: S, L, I

Terminal symbols
: (, id, ., )

BNF

```
0: S -> L
1: L -> ( λ I . L )
2: L -> ( L L )
3: L -> I
4: I -> id
```

LR table

|state|"("|"λ"|"."|")"|id|"$"| S| L| I|
|-----|---|---|---|---|--|---|--|--|--|
|    0| s2|   |   |   |s4|   |  | 1| 3|
|    1|   |   |   |   |  |acc|  |  |  |
|    2| s2| s5|   |   |s4|   |  | 6| 3|
|    3| r3|   |   | r3|r3| r3|  |  |  |
|    4| r4|   | r4| r4|r4| r4|  |  |  |
|    5|   |   |   |   |s4|   |  |  | 7|
|    6| s2|   |   |   |s4|   |  | 8| 3|
|    7|   |   | s9|   |  |   |  |  |  |
|    8|   |   |   |s10|  |   |  |  |  |
|    9| s2|   |   |   |s4|   |  |11| 3|
|   10| r2|   |   | r2|r2| r2|  |  |  |
|   11|   |   |   |s12|  |   |  |  |  |
|   12| r1|   |   | r1|r1| r1|  |  |  |
 */
const table = [
  {'(': {a: 's', i: 2}, id: {a: 's', i: 4}, L: {a: 'g', i: 1}, I: {a: 'g', i: 3}},
  {'$': {a: 'a'}},
  {'(': {a: 's', i: 2}, λ: {a: 's', i: 5}, id: {a: 's', i: 4}, L: {a: 'g', i: 6}, I: {a: 'g', i: 3}},
  {'(': {a: 'r', i: 3}, ')': {a: 'r', i: 3}, id: {a: 'r', i: 3}, '$': {a: 'r', i: 3}},
  {'(': {a: 'r', i: 4}, '.': {a: 'r', i: 4}, ')': {a: 'r', i: 4}, id: {a: 'r', i: 4}, '$': {a: 'r', i: 4}},
  {id: {a: 's', i: 4}, I: {a: 'g', i: 7}},
  {'(': {a: 's', i: 2}, id: {a: 's', i: 4}, L: {a: 'g', i: 8}, I: {a: 'g', i: 3}},
  {'.': {a: 's', i: 9}},
  {')': {a: 's', i: 10}},
  {'(': {a: 's', i: 2}, id: {a: 's', i: 4}, L: {a: 'g', i: 11}, I: {a: 'g', i: 3}},
  {'(': {a: 'r', i: 2}, ')': {a: 'r', i: 2}, id: {a: 'r', i: 2}, '$': {a: 'r', i: 2}},
  {')': {a: 's', i: 12}},
  {'(': {a: 'r', i: 1}, ')': {a: 'r', i: 1}, id: {a: 'r', i: 1}, '$': {a: 'r', i: 1}}
]

const syntax = [
  {left: 'S', right: ['L'], name: 'start'},
  {left: 'L', right: ['(', 'λ', 'I', '.', 'L', ')'], name: 'Lambda-define'},
  {left: 'L', right: ['(', 'L', 'L', ')'], name: 'Lambda-apply'},
  {left: 'L', right: ['I'], name: 'Lambda-identifier'},
  {left: 'I', right: ['id'], name: 'Identifier'}
]

class AST {
  constructor (id, arr) {
    const s = syntax[id]
    let b = true
    for (let i = 0; i < s.right.length; i++) if (s.right[i] !== '' + arr[i]) b = false
    console.log(`${arr}`)
    if (!b) throw new Error(`unexpected syntax ${id}`)
    this.type = syntax[id].left
    this.children = arr
    this.key = '' + Math.random()
    this.name = syntax[id].name
  }
  toString () {
    return this.type
  }
  unparse () {
    return this.children.map(child => child.unparse()).join('')
  }
}

class Stack {
  constructor () {
    this.arr = ['⊥']
  }
  top () {
    return this.arr[this.arr.length - 1]
  }
  pop () {
    let ret = this.arr.pop()
    if (this.arr.length === 0) this.arr.push('⊥')
    return ret
  }
  push (e) {
    this.arr.push(e)
  }
}

const parser = (tokens) => {
  const stack = new Stack()
  stack.push(0)
  const f = token => {
    console.log(token, stack, table[stack.top()][token.type])
    if (!table[stack.top()][token.type]) throw new Error(`syntax error input ${token.index}`)
    if (table[stack.top()][token.type].a === 's') {
      const state = stack.top()
      stack.push(token)
      stack.push(table[state][token.type].i)
    } else if (table[stack.top()][token.type].a === 'r') {
      const right = []
      const s = syntax[table[stack.top()][token.type].i]
      const id = table[stack.top()][token.type].i
      while (right.length !== s.right.length) {
        const top = stack.pop()
        if (typeof top === 'number') continue
        right.unshift(top)
      }
      const state = stack.top()
      stack.push(new AST(id, right))
      if (!table[state]['' + stack.top()]) throw new Error(`syntax error`)
      stack.push(table[state]['' + stack.top()].i)
      f(token)
    }
  }
  tokens.forEach(f)
  stack.pop()
  return stack.top()
}

export default parser
