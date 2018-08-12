webpackJsonp([1],{BEva:function(t,e){},NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("7+uW"),r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("h1",[this._v("Simple Lambda Calculator")]),this._v(" "),e("router-view")],1)},staticRenderFns:[]};var a=i("VU/8")({name:"App"},r,!1,function(t){i("BEva")},null,null).exports,s=i("/ocq"),o=i("Zrlr"),c=i.n(o),u=i("wxAW"),h=i.n(u),l=function(){function t(e,i){if(c()(this,t),this.index=i,this.isLambda=d.test(e),this.isIdentifier=p.test(e),this.type=e,this.identifier=e,this.isIdentifier&&(this.type="id"),this.isBracketsStart=m.test(e),this.isBracketsEnd=y.test(e),this.isDot=v.test(e),!(this.isLambda||this.isIdentifier||this.isDot||this.isBracketsStart||this.isBracketsEnd))throw new Error("LexicalError: Unexpected charactor input["+this.index+"]:"+e);this.key=""+Math.random()}return h()(t,[{key:"toString",value:function(){return this.type}},{key:"unparse",value:function(){return this.identifier}}]),t}(),p=/[a-z]/,d=/λ/,v=/\./,f=/[ |\t|\n]/,m=/\(/,y=/\)/,g=function(t){for(var e=[],i=0;i<t.length;i++)f.test(t[i])||e.push(new l(t[i],i));return e.push({type:"$",index:t.length+1,identifier:"$"}),e},_=[{"(":{a:"s",i:2},id:{a:"s",i:4},L:{a:"g",i:1},I:{a:"g",i:3}},{$:{a:"a"}},{"(":{a:"s",i:2},"λ":{a:"s",i:5},id:{a:"s",i:4},L:{a:"g",i:6},I:{a:"g",i:3}},{"(":{a:"r",i:3},")":{a:"r",i:3},id:{a:"r",i:3},$:{a:"r",i:3}},{"(":{a:"r",i:4},".":{a:"r",i:4},")":{a:"r",i:4},id:{a:"r",i:4},$:{a:"r",i:4}},{id:{a:"s",i:4},I:{a:"g",i:7}},{"(":{a:"s",i:2},id:{a:"s",i:4},L:{a:"g",i:8},I:{a:"g",i:3}},{".":{a:"s",i:9}},{")":{a:"s",i:10}},{"(":{a:"s",i:2},id:{a:"s",i:4},L:{a:"g",i:11},I:{a:"g",i:3}},{"(":{a:"r",i:2},")":{a:"r",i:2},id:{a:"r",i:2},$:{a:"r",i:2}},{")":{a:"s",i:12}},{"(":{a:"r",i:1},")":{a:"r",i:1},id:{a:"r",i:1},$:{a:"r",i:1}}],w=[{left:"S",right:["L"],name:"start"},{left:"L",right:["(","λ","I",".","L",")"],name:"Lambda-define"},{left:"L",right:["(","L","L",")"],name:"Lambda-apply"},{left:"L",right:["I"],name:"Lambda-identifier"},{left:"I",right:["id"],name:"Identifier"}],k=function(){function t(e,i){c()(this,t);for(var n=w[e],r=!0,a=0;a<n.right.length;a++)n.right[a]!==""+i[a]&&(r=!1);if(!r)throw new Error("SyntaxError: Unexpected syntax "+e);this.type=w[e].left,this.children=i,this.key=""+Math.random(),this.name=w[e].name}return h()(t,[{key:"toString",value:function(){return this.type}},{key:"unparse",value:function(){return this.children.map(function(t){return t.unparse()}).join("")}}]),t}(),S=function(){function t(){c()(this,t),this.arr=["⊥"]}return h()(t,[{key:"top",value:function(){return this.arr[this.arr.length-1]}},{key:"pop",value:function(){var t=this.arr.pop();return 0===this.arr.length&&this.arr.push("⊥"),t}},{key:"push",value:function(t){this.arr.push(t)}}]),t}(),x=function(t){var e=new S;e.push(0);return t.forEach(function t(i){if(!_[e.top()][i.type])throw new Error("SyntaxError: Input["+i.index+"]:"+i.identifier);if("s"===_[e.top()][i.type].a){var n=e.top();e.push(i),e.push(_[n][i.type].i)}else if("r"===_[e.top()][i.type].a){for(var r=[],a=w[_[e.top()][i.type].i],s=_[e.top()][i.type].i;r.length!==a.right.length;){var o=e.pop();"number"!=typeof o&&r.unshift(o)}var c=e.top();if(e.push(new k(s,r)),!_[c][""+e.top()])throw new Error("SyntaxError: Unknown syntax");e.push(_[c][""+e.top()].i),t(i)}}),e.pop(),e.top()},E=i("ifoU"),L=i.n(E),b=0,C=0,I=function(){function t(e){c()(this,t),this.parent=e,this.map=new L.a}return h()(t,[{key:"search",value:function(t){return this.parent&&void 0===this.map.get(t)?this.parent.search(t):this.map.get(t)}},{key:"set",value:function(t,e){if(this.map.get(t))throw new Error("CalcError: Name collision");this.map.set&&this.map.set(t,e)}},{key:"toString",value:function(){var t="";return this.map.forEach(function(e,i){t+=i+" -> "+e+" "}),this.parent&&(t+=" {"+this.parent.toString()+"}"),t}}]),t}(),O=function(){function t(e,i){c()(this,t),this.arg=e,this.statement=i}return h()(t,[{key:"toString",value:function(){return"(λ"+this.arg.toString()+"."+this.statement.toString()+")"}},{key:"eval",value:function(e){if(++b>=1e3)throw new Error("CalcError: Calculation is too complicated");e=new I(e);var i=C++,n=new A(this.arg.toString(),i);return e.set(this.arg.toKey(),n),new t(n,this.statement.eval(e))}},{key:"calc",value:function(t,e){if(++b>=1e3)throw new Error("CalcError: Calculation is too complicated");return(t=new I(t)).set(this.arg.toKey(),e),this.statement.eval(t)}}]),t}(),$=function(){function t(e,i){c()(this,t),this.l1=e,this.l2=i}return h()(t,[{key:"toString",value:function(){return"("+this.l1.toString()+this.l2.toString()+")"}},{key:"eval",value:function(t){if(++b>=1e3)throw new Error("CalcError: Calculation is too complicated");return this.l1.calc(t,this.l2.eval(t))}},{key:"calc",value:function(e,i){if(++b>=1e3)throw new Error("CalcError: Calculation is too complicated");var n=this.eval(e);return n instanceof t?new t(n,i):this.eval(e).calc(e,i)}}]),t}(),A=function(){function t(e,i){c()(this,t),this.str=e,this.id=i}return h()(t,[{key:"toString",value:function(){return this.str}},{key:"toKey",value:function(){return this.str+this.id}},{key:"eval",value:function(t){if(++b>=1e3)throw new Error("CalcError: Calculation is too complicated");var e=t.search(this.str+this.id);return 0===e?this:e||this}},{key:"calc",value:function(e,i){if(++b>=1e3)throw new Error("CalcError: Calculation is too complicated");var n=this.eval(e);return n instanceof t?new $(n,i):n.calc(e,i)}}]),t}(),B=function(t){b=0,C=0;var e=function t(e){return"Lambda-define"===e.name?new O(new A(e.children[2].children[0].identifier,-1),t(e.children[4])):"Lambda-apply"===e.name?new $(t(e.children[1]),t(e.children[2])):"Lambda-identifier"===e.name?new A(e.children[0].children[0].identifier,-1):void 0}(t);console.log(e);var i=e.eval(new I);return console.log(i),i.toString()},U=function(t){return x(g(t))},N=function(t){return B(x(g(t)))},T={name:"AST",props:{model:Object},data:function(){return{isOpened:!1}},methods:{toggle:function(){this.isOpened=!this.isOpened}},computed:{pm:function(){return this.isOpened?"-":"+"}}},R={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"top"},[i("div",[i("div",[i("span",[t._v("\n        "+t._s(t.model.type)+"\n      ")]),t._v(" "),t.model.children?i("span",{on:{click:t.toggle}},[t._v("\n        ["+t._s(t.pm)+"]\n      ")]):t._e()])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.isOpened&&t.model.children,expression:"isOpened && model.children"}],staticClass:"children"},t._l(t.model.children,function(t){return i("div",{key:t.key},[i("AST",{attrs:{model:t}})],1)}))])},staticRenderFns:[]};var j={name:"HelloWorld",data:function(){return{input:"(λx.((he)((ll)o)))",output:{type:"",key:0},error:"",result:"",isOpenSyntax:!0}},methods:{check:function(){this.error="";try{U(this.input)}catch(t){this.error=t.toString()}},parse:function(){this.error="",this.output={type:"",key:0};try{this.output=U(this.input)}catch(t){this.error=t.toString()}},calc:function(){this.error="",this.result=this.input;try{this.result+=" -> "+N(this.input)}catch(t){this.error=t.toString()}},toggleSyntax:function(){this.isOpenSyntax=!this.isOpenSyntax}},components:{AST:i("VU/8")(T,R,!1,function(t){i("QJw0")},"data-v-72adb7c4",null).exports},computed:{syntaxButton:function(){return this.isOpenSyntax?"-":"+"}}},q={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"container"},[i("h2",[i("span",[t._v("Syntax")]),t._v(" "),i("span",{on:{click:t.toggleSyntax}},[t._v("["+t._s(t.syntaxButton)+"]")])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.isOpenSyntax,expression:"isOpenSyntax"}]},[i("p",[t._v("\n        0: S -> L\n      ")]),t._v(" "),i("p",[t._v("\n        1: L -> ( λ I . L )\n      ")]),t._v(" "),i("p",[t._v("\n        2: L -> ( L L )\n      ")]),t._v(" "),i("p",[t._v("\n        3: L -> I\n      ")]),t._v(" "),i("p",[t._v("\n        4: I -> id\n      ")]),t._v(" "),i("p",[t._v("\n        id : [a-z]\n      ")])])]),t._v(" "),i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.input,expression:"input"}],staticClass:"editor",attrs:{contenteditable:"true"},domProps:{value:t.input},on:{input:function(e){e.target.composing||(t.input=e.target.value)}}}),t._v(" "),i("br"),t._v(" "),i("button",{on:{click:t.check}},[t._v("\n    check\n  ")]),t._v(" "),i("button",{on:{click:t.parse}},[t._v("\n    parse\n  ")]),t._v(" "),i("button",{on:{click:t.calc}},[t._v("\n    calc\n  ")]),t._v(" "),i("br"),t._v(" "),i("div",{staticClass:"container"},[i("h2",[t._v("Error")]),t._v(" "),i("p",{staticClass:"error-message"},[t._v(t._s(t.error))])]),t._v(" "),i("div",{staticClass:"container"},[i("h2",[t._v("Abstract Syntax Tree")]),t._v(" "),t.output.key?i("AST",{attrs:{model:t.output}}):t._e()],1),t._v(" "),i("div",{staticClass:"container"},[i("h2",[t._v("Result")]),t._v(" "),i("div",[t._v("\n      "+t._s(t.result)+"\n    ")])])])},staticRenderFns:[]};var F=i("VU/8")(j,q,!1,function(t){i("mmaq")},"data-v-4302d2ce",null).exports;n.a.use(s.a);var H=new s.a({routes:[{path:"/",name:"Lambda",component:F}]});n.a.config.productionTip=!1,new n.a({el:"#app",router:H,components:{App:a},template:"<App/>"})},QJw0:function(t,e){},mmaq:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.823eabf62b056b48aa0a.js.map