### Install & Start

```enter shell
npm i       安装node加载的依赖
npm start   运行服务器
```

open http://localhost:8080/

### Build

```//TODO: 项目使用webpack打包代码压缩，生成的文件夹为dist文件夹，src为源代码文件夹，如果要修改请修改源代码文件夹下的文件
//TODO: 路由配置文件在src根目录下的router.jsx
//TODO: 项目所需要的图标放在dist目录的fonts文件夹内
//TODO: 各个模块的组件在src目录下的components目录下，根据模块分了8个文件夹，public为一些公用的组件，router为路由组件
//TODO: 使用less编写高质量的stylesheets，通过webpack插件自动补全浏览器内核前缀，编写时可不用写浏览器内核前缀
//TODO: 公用的样式放在src源代码文件夹的styles目录下的libs文件夹内
//TODO: 由于webpack的loader加载，在编写组件的时候只能建立jsx文件，引入css样式文件可以直接在jsx文件内import
```

```/file/cache/companyMalldetail.json商品详情、评价详情一起
/ buyer_comment  卖家给买家的评论
/ seller_comment 买家给卖家的评论
//d.content是详情
//username卖家seller
/ yer买家

交易评价模块http://localhost:8080/#/concat/peng;
`avatarpic` `头像`
  `task_title` `标题`

  `mark_id`'记录编号',

  `origin_id`  '源对象编号',


  `mark_status` '''评价状态'' (0为尚未评 1好 2中 3差) ',
  `mark_content` '评价内容',
  `mark_time`   '评价时间',
  `uid`  '被评者编号',
  `username`  '被评者姓名',

  `by_username`  '评论人用户名',
  `aid`  '''评价项'' (12,3=>对威客的评价项,4,5=>对雇主的评价项) ',
  `aid_star`  '对应的评价项的星数',

  `mark_type`  '''评论者角色'' (1任务发布者或买家 2为任务威客或卖家) ',


  /file/cache/commentTypeOne.json      //信誉等级 评论更加复杂 为中标者对雇主的评价  mark_type = 1  高手评价雇主
  /file/cache/commentTypeTwo.json
