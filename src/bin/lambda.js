import lex from '@/bin/lex'
import parser from '@/bin/parser'

export default (str) => {
  return parser(lex(str))
}
