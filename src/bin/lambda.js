import lex from '@/bin/lex'
import parser from '@/bin/parser'
import calc from '@/bin/calculator'

export default {
  check (str) {
    return lex(str)
  },
  parse (str) {
    return parser(lex(str))
  },
  calc (str) {
    return calc(parser(lex(str)))
  }
}
