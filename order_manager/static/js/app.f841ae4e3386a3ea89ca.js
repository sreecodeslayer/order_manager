webpackJsonp([1],{"7zck":function(t,e){},NHnr:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=r("7+uW"),n={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",[["Login","Register"].indexOf(t.$route.name)<=-1?r("v-navigation-drawer",{attrs:{persistent:"","mini-variant":t.miniVariant,clipped:t.clipped,"enable-resize-watcher":"",fixed:"",dark:"",app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[r("v-list",{staticClass:"pt-0",attrs:{dense:""}},t._l(t.items,function(e){return r("v-list-tile",{key:e.title,attrs:{ripple:!0,href:e.href}},[r("v-list-tile-action",[r("v-icon",{domProps:{innerHTML:t._s(e.icon)}})],1),t._v(" "),r("v-list-tile-content",[r("v-list-tile-title",{domProps:{textContent:t._s(e.title)}})],1)],1)}))],1):t._e(),t._v(" "),r("v-toolbar",{attrs:{app:"","clipped-left":t.clipped,dark:""}},[r("v-toolbar-title",{domProps:{textContent:t._s(t.title)}}),t._v(" "),r("v-spacer"),t._v(" "),t.$auth.isAuthenticated()?r("v-btn",{attrs:{flat:"",icon:""},on:{click:function(e){return e.preventDefault(),t.logout(e)}}},[r("v-icon",[t._v("power_settings_new")])],1):t._e()],1),t._v(" "),r("v-content",[r("router-view")],1),t._v(" "),r("v-footer",{attrs:{fixed:t.fixed,app:""}},[r("v-layout",{attrs:{column:"","align-center":""}},[r("span",[t._v("Sreenadh TC© 2018")])])],1)],1)},staticRenderFns:[]},i=r("VU/8")({data:function(){return{clipped:!0,drawer:!0,fixed:!1,items:[{icon:"add_shopping_cart",title:"New Order",href:"#/"},{icon:"view_list",title:"Orders",href:"#/orders"}],miniVariant:!1,right:!0,rightDrawer:!1,title:"Order Manager"}},name:"App",methods:{logout:function(){this.$auth.isAuthenticated()&&this.$auth.logout(),this.$router.push("/login")}}},n,!1,null,null,null).exports,a=r("/ocq"),o={name:"Home",data:function(){return{newOrderForm:!0,newOrder:{},crops:[],headers:[{text:"Item",align:"center",sortable:!1},{text:"Quantity",align:"center",sortable:!1},{text:"Price",align:"center",sortable:!1}],orderItems:[{qty:0,selectedCrop:{id:"",price:0}}]}},methods:{getAllCrops:function(){var t=this;this.$http.get("/api/v1/crops").then(function(e){t.crops=e.data,console.log(t.crops)},function(e){401===t.err.response.status&&(t.$auth.logout(),t.$router.push("/login"))})},finalizeOrder:function(){var t=this;this.newOrder.items=[];for(var e=this.orderItems.length-1;e>=0;e--)console.log(this.orderItems[e].selectedCrop.id),this.orderItems[e].selectedCrop.id&&this.orderItems[e].qty>0&&this.newOrder.items.push({qty:this.orderItems[e].qty,id:this.orderItems[e].selectedCrop.id});console.log(this.newOrder.items),this.newOrder.items.length>0&&this.$http.patch("/api/v1/users/cart",this.newOrder).then(function(e){200===e.status&&(t.orderItems=[{qty:0,selectedCrop:{id:"",price:0}}],t.newOrder={},t.$refs.newOrderForm.reset(),t.$http.post("/api/v1/orders").then(function(t){},function(t){console.log(t.response)}))},function(t){console.log(t.response)})}},computed:{cartTotal:function(){for(var t=0,e=this.orderItems.length-1;e>=0;e--)t+=this.orderItems[e].selectedCrop.price*this.orderItems[e].qty;return t}},created:function(){this.getAllCrops()}},l={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",{attrs:{fluid:""}},[r("v-slide-y-transition",{attrs:{mode:"out-in"}},[r("v-layout",{attrs:{row:"",wrap:""}},[r("v-flex",{attrs:{xs12:""}},[r("v-card",[r("v-card-title",[t._v("New order")]),t._v(" "),r("v-form",{ref:"newOrderForm",model:{value:t.newOrderForm,callback:function(e){t.newOrderForm=e},expression:"newOrderForm"}},[r("v-card-text",[r("v-layout",{attrs:{row:"",wrap:""}},[r("v-flex",{attrs:{xs4:""}},[r("v-text-field",{attrs:{name:"name",label:"Enter customer name",id:"customerName"},model:{value:t.newOrder.customer,callback:function(e){t.$set(t.newOrder,"customer",e)},expression:"newOrder.customer"}})],1)],1),t._v(" "),r("v-layout",{attrs:{row:"",wrap:""}},[r("v-flex",{attrs:{xs12:""}},[r("div",{staticClass:"table__overflow"},[r("table",{staticClass:"datatable table"},[r("thead",[r("tr",[r("th",{staticClass:"column text-xs-center"},[t._v("Item")]),t._v(" "),r("th",{staticClass:"column text-xs-center"},[t._v("Quantity(Kg)")]),t._v(" "),r("th",{staticClass:"column text-xs-center"},[t._v("Price(Rs.)")]),t._v(" "),r("th",{staticClass:"column text-xs-center"},[t._v("Action")])])]),t._v(" "),r("tbody",[t._l(t.orderItems,function(e,s){return r("tr",{key:s},[r("td",[r("v-select",{attrs:{items:t.crops,"item-text":"name",label:"Select Crop",required:""},model:{value:e.selectedCrop,callback:function(r){t.$set(e,"selectedCrop",r)},expression:"item.selectedCrop"}})],1),t._v(" "),r("td",{staticClass:"text-xs-center"},[r("v-text-field",{attrs:{name:"itemQty",label:"Enter quantity",id:"itemQty",type:"number"},on:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.orderItems.push({qty:0,selectedCrop:{price:1,id:""}})}},model:{value:e.qty,callback:function(r){t.$set(e,"qty",r)},expression:"item.qty"}})],1),t._v(" "),e.selectedCrop?r("td",{staticClass:"text-xs-center subheading red--text"},[r("pre",[t._v(t._s(e.selectedCrop.price*e.qty))])]):t._e(),t._v(" "),r("td",{staticClass:"justify-center layout px-0"},[r("v-btn",{attrs:{color:"error",flat:"",icon:""},nativeOn:{click:function(e){t.orderItems.splice(s,1)}}},[r("v-icon",[t._v("cancel")])],1)],1)])}),t._v(" "),r("tr",[r("td",{staticClass:"text-xs-right subheading",attrs:{colspan:"3"}},[t._v("Grand Total ("+t._s(t.orderItems.length)+" Items)")]),t._v(" "),r("td",{staticClass:"text-xs-center subheading green--text darken-3"},[r("pre",[t._v(t._s(t.cartTotal))])])])],2)]),t._v(" "),r("div",{staticClass:"datatable table"},[r("div",{staticClass:"datatable__actions"},[r("v-btn",{attrs:{color:"success",flat:"",icon:""},on:{click:function(e){return e.preventDefault(),t.finalizeOrder(e)}}},[r("v-icon",[t._v("check")])],1)],1)])])])],1)],1)],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var c=r("VU/8")(o,l,!1,function(t){r("gTiV")},"data-v-5a2993aa",null).exports,u={data:function(){return{loginView:!0,valid:!1,title:"Login",err:!1,signupErr:!1,signup:{email:"",phone:"",passwd_digest:""},signupErr_msg:"",err_msg:"",email:"",emailRules:[function(t){return!!t||"E-mail is required"},function(t){return/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(t)||"E-mail must be valid"}],password:"",passwordRules:[function(t){return!!t||"Password is required"},function(t){return t.length>=8||"Password must be greater than 7 characters"}]}},methods:{authLogin:function(){var t=this,e={email:this.email,password:this.password};this.$auth.isAuthenticated()&&this.$auth.logout();this.$auth.login(e,{method:"POST",headers:{"Content-type":"application/json"}}).then(function(e){200===e.status&&(t.err=!1,t.$router.push("/"))},function(e){t.err=!0,404===e.response.status&&(t.err_msg="No user found in that email"),400===e.response.status&&(t.err_msg=e.response.data.msg)})},doSignup:function(){var t=this;this.$http.post("/auth/signup",this.signup).then(function(e){200===e.status&&(t.loginView=!t.loginView,t.$refs.loginForm.reset())},function(e){console.log(e.response),t.signupErr_msg=e.response.data.msg,t.signupErr=!0})},clear:function(){this.$refs.loginForm.reset()}}},d={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",{attrs:{fluid:""}},[r("div",{attrs:{id:"login-content"}},[r("v-slide-y-transition",{attrs:{mode:"out-in"}},[r("v-layout",{attrs:{column:"","align-center":""}},[t.loginView?r("v-card",{attrs:{id:"loginForm"}},[r("v-card-title",{attrs:{"primary-title":""}},[r("div",[r("h3",{staticClass:"heading"},[t._v("Login")]),t._v(" "),r("p",{staticClass:"caption"},[t._v("Please login to view the dashboard")])])]),t._v(" "),r("v-card-text",[r("v-form",{ref:"loginForm",attrs:{"lazy-validation":""},on:{submit:function(e){return e.preventDefault(),t.authLogin(e)}},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[r("div",[r("v-text-field",{attrs:{label:"Email",rules:t.emailRules,required:""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1),t._v(" "),r("div",[r("v-text-field",{attrs:{type:"password",label:"Password",rules:t.passwordRules,counter:8,required:""},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),t._v(" "),r("div",[r("v-alert",{attrs:{type:"error"},model:{value:t.err,callback:function(e){t.err=e},expression:"err"}},[t._v(t._s(t.err_msg))])],1),t._v(" "),r("div",[r("p",[t._v("New User? "),r("a",{attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.loginView=!t.loginView}}},[t._v("Register")])])]),t._v(" "),r("v-btn",{attrs:{color:"success",type:"submit",disabled:!t.valid}},[t._v("Login")]),t._v(" "),r("v-btn",{attrs:{color:"default"},on:{click:t.clear}},[t._v("Reset")])],1)],1)],1):r("v-card",[r("v-card-title",{attrs:{"primary-title":""}},[r("div",[r("h3",{staticClass:"heading"},[t._v("Signup")]),t._v(" "),r("p",{staticClass:"caption"},[t._v("Please signup to login to dashboard")])])]),t._v(" "),r("v-card-text",[r("v-form",{ref:"signupForm",attrs:{"lazy-validation":""},on:{submit:function(e){return e.preventDefault(),t.doSignup(e)}},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[r("div",[r("v-text-field",{attrs:{label:"Email",rules:t.emailRules,required:""},model:{value:t.signup.email,callback:function(e){t.$set(t.signup,"email",e)},expression:"signup.email"}})],1),t._v(" "),r("div",[r("v-text-field",{attrs:{label:"Phone"},model:{value:t.signup.phone,callback:function(e){t.$set(t.signup,"phone",e)},expression:"signup.phone"}})],1),t._v(" "),r("div",[r("v-text-field",{attrs:{type:"password",label:"Password",rules:t.passwordRules,counter:8,required:""},model:{value:t.signup.passwd_digest,callback:function(e){t.$set(t.signup,"passwd_digest",e)},expression:"signup.passwd_digest"}})],1),t._v(" "),r("div",[r("v-alert",{attrs:{type:"error"},model:{value:t.signupErr,callback:function(e){t.signupErr=e},expression:"signupErr"}},[t._v(t._s(t.signupErr_msg))])],1),t._v(" "),r("div",[r("p",[t._v("Existing User? "),r("a",{attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.loginView=!t.loginView}}},[t._v("Login")])])]),t._v(" "),r("v-btn",{attrs:{color:"success",type:"submit",disabled:!t.valid}},[t._v("Signup")]),t._v(" "),r("v-btn",{attrs:{color:"default"},on:{click:function(e){t.$refs.signupForm.reset(),t.signupErr=!1}}},[t._v("Reset")])],1)],1)],1)],1)],1)],1)])},staticRenderFns:[]};var v=r("VU/8")(u,d,!1,function(t){r("X14A")},null,null).exports,p={name:"Orders",data:function(){return{orders:[]}},methods:{getOrders:function(){var t=this;this.$http.get("/api/v1/orders").then(function(e){t.orders=e.data},function(t){console.log(t.response)})}},created:function(){this.getOrders()}},m={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",{attrs:{fluid:"","grid-list-xs":""}},[r("v-layout",{attrs:{row:"",wrap:""}},t._l(t.orders,function(e,s){return r("v-flex",{key:e.id,attrs:{xs12:""}},[r("v-card",{staticClass:"elevation-7"},[r("v-card-title",{attrs:{"primary-title":""}},[t._v("Order ID : "),r("pre",[t._v(t._s(e.id))])]),t._v(" "),r("v-divider"),t._v(" "),r("v-card-text",[r("v-layout",{attrs:{row:"",wrap:""}},[r("v-flex",{attrs:{xs12:""}},[r("span",[t._v("Customer : "),r("span",{staticClass:"title"},[t._v(t._s(e.customer))])])])],1),t._v(" "),r("v-spacer"),t._v(" "),r("br"),t._v(" "),r("span",{staticClass:"subheading"},[t._v("Ordered Items:")]),t._v(" "),r("br"),t._v(" "),r("br"),t._v(" "),t._l(e.items,function(e){return r("v-layout",{key:e.id,attrs:{row:"",wrap:""}},[r("v-flex",{attrs:{xs4:""}},[r("p",[t._v(t._s(e.item.name))])]),t._v(" "),r("v-flex",{attrs:{xs4:""}},[r("p",[t._v(t._s(e.qty)+" KG")])]),t._v(" "),r("v-flex",{attrs:{xs4:""}},[r("p",[t._v("Rs. "+t._s(e.total))])])],1)}),t._v(" "),r("v-layout",{attrs:{row:"",wrap:""}},[r("v-flex",{attrs:{xs12:""}},[r("p",{staticClass:"subheading green--text"},[t._v("Grand Total: "),r("strong",{staticClass:"red--text"},[t._v(t._s(e.total))])])])],1)],2)],1)],1)}))],1)},staticRenderFns:[]},f=r("VU/8")(p,m,!1,null,null,null).exports;s.a.use(a.a);var _=new a.a({routes:[{path:"/",name:"Home",component:c,meta:{permissions:{roles:["user"],permissions:["can_view"],redirectTo:"/login"}}},{path:"/orders",name:"Orders",component:f,meta:{permissions:{roles:["user"],permissions:["can_view"],redirectTo:"/login"}}},{path:"/login",name:"Login",component:v}]}),h=r("3EgV"),g=r.n(h),w=(r("7zck"),r("Rf8U")),x=r.n(w),b=r("mtWM"),y=r.n(b),C=r("WrNK"),k=r("5Eot");y.a.defaults.headers.post["Content-Type"]="application/json",s.a.use(g.a),s.a.use(x.a,y.a),s.a.config.productionTip=!1;var $=window.location.origin;s.a.use(C.a,{tokenName:"auth_token",baseUrl:$,storageType:"cookieStorage",providers:{}}),s.a.use(k.a,{roles:{user:{handler:function(){return this.$auth.isAuthenticated()},permissions:["can_view"]}},permissions:{can_view:function(){return!0}}}),_.beforeEach(function(t,e,r){if(t.meta&&t.meta.permissions){var s=t.meta.permissions.roles,n=t.meta.permissions.permissions;_.app.$authorize.isAuthorized(s,n).then(function(){r()}).catch(function(){r(t.meta.permissions.redirectTo||"/login")})}else r()}),new s.a({el:"#app",router:_,components:{App:i},template:"<App/>"})},X14A:function(t,e){},gTiV:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.f841ae4e3386a3ea89ca.js.map