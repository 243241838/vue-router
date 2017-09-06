//一个view
var routes = [
    {
        path: '/',
        component: {
            template: '<div><h1>首页</h1></div>'
        }
    },
    {
        path: '/about',
        component: {
            template: '<div><h1>关于我们</h1></div>'
        }
    },
    {
        path: '/user/:name',
        name: 'user', //路由名称
        component: {
            //两种传参方式1.to="/user/哈哈"  path: '/user/:name', 获取{{$route.params.name}} 2.?age= 获取 {{$route.query.age}}
            //<div><div>我叫：{{$route.params.name}}</div><div>我今年{{$route.query.age}}岁了</div></div>
            template: '<div><div>我叫：{{$route.params.name}}</div><router-link to="/more" append>更多详细</router-link><router-view></router-view></div>'
        },
        //嵌套路由
        children: [
            {
                path: '/more',
                component: {
                    template: '<div>用户{{$route.params.more}}的详细资料<br>哈哈哈哈哈哈哈</div>'
                }
            }
        ]
    }
];
//多个view
var routes1 = [
    {
        path: '/',
        component: {
            template: '<div><h1>首页</h1></div>'
        }
    },
    {
        path: '/user',
        components: {
            sidebar: {
                template: 
                '<div><ul>' + 
                '<li>用户列表</li><li>权限管理</li>' + 
                '</ul></div>'
            },
            content: {
                template:'<div>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>'
            }
        }
    },
    {
        path: '/post',
        components: {
            sidebar: {
                template: 
                '<div><ul>' + 
                '<li>帖子列表</li><li>标签类表</li>' + 
                '</ul></div>'
            },
            content: {
                template:'<div>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>'
            }
        }
    }
]
//三级路由加自定义属性meta
var routes2 = [
    {
        path: '/',
        component: {
            template: '<h1>首页</h1>'
        }
    },
    {
        path: '/a',
        meta: {
            login_required: true
        },
        component: {
            template: '<h1>a</h1>'
        }
    },
    {
        path: '/login',
        component: {
            template: '<h1>登录</h1>'
        }
    },
    {
        path: '/post',
        meta: {
            login_required: true //自定义
        },
        component: {
            template: 
            '<div>' + 
               '<h1>帖子管理</h1>' +
               '<router-link to="rain" append>后座</router-link>' +
               '<router-view></router-view>' +
            '</div>'
        },
        children: [
            {
                path: 'rain',
                component: {
                    template: 
                    '<div>' + 
                       '<h2>雨天rerewr后座</h2>' + 
                       '<router-link to="aa" append>第三级路由导航</router-link>' +
                       '<router-view></router-view>' +
                    '</div>'   
                },
                children: [
                    {
                        path: 'aa',
                        component: {
                            template: '<div>第三级路由</div>'
                        }
                    }
                ]
            }
        ]
    }
]
var router = new VueRouter({
    routes: routes2
})
//路由访问之前之前的事件
router.beforeEach((to, from, next) => {
    // console.log(to);
    // console.log(from)
    // if (from.path === '/login') {
    //     alert('从登陆不允许过来');
    //     return false;
    // }
    var logged_in = false;
    if (!logged_in && to.matched.some((item) => {
        // return item.path == '/post'; //防止子路由
        console.log(item)
        return item.meta.login_required; //自定义参数
    })) {
        next('/login')
        // next();
    } else {
        next();
    }
    // next(); //括号里可以是blean值，也可以是地址 '/login'(必须要有一个next()和next('/login')要同时存在，否则报错)
})
//路由之后
router.afterEach((to, from) => {
    
})
new Vue({
    el: '#app',
    router: router,
    methods: {
        surf() {
            setTimeout(function () {
                this.router.push('/about');
                setTimeout(function () {
                    //手动访问传参
                    this.router.push({name: 'user', params: {name: '王大拿'}})
                }, 3000)
            }, 1000)
        }
    }
})