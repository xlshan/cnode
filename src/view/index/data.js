const data = {
    "success": true,
    "data": [
        {
            "id": "5d5bed6ed53e9171e98a975b",
            "author_id": "516f989a6d38277306ae8c1b",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><p>这是一次硬核的地下铁沙龙，\n我们深入 Node.js 运行时底层，\n来讨论如何进行运行时的优化和诊断，\n让它可以在 Serverless，IoT 等等场景释放更大的价值。</p>\n<p>五位重量级的嘉宾，\n有 Node.js 基金会技术委员会（TSC）唯一中国成员，\n有来自浏览器厂商的骨灰级技术专家，\n还有阿里、Rokid 的大牛。</p>\n<p>欢迎你和我们一起，进入深海。</p>\n<p><strong>Agenda</strong>\n<img src=\"https://img.alicdn.com/tfs/TB10BqFdLb2gK0jSZK9XXaEgFXa-1408-2040.png\" alt=\"Agenda\"></p>\n<p>时 间：2019.09.08 下午 2 点\n地 点：杭州浙江大学玉泉校区（具体地址详见邀约）</p>\n<p>报 名 链 接: <a href=\"https://survey.alibaba.com/apps/zhiliao/QlwUc77lF\">https://survey.alibaba.com/apps/zhiliao/QlwUc77lF</a>\n活 动 主 页: <a href=\"https://fed.taobao.org/subway/\">https://fed.taobao.org/subway/</a></p>\n</div>",
            "title": "Node 地下铁第九期「杭州站」线下沙龙邀约 - Let's Go Deep",
            "last_reply_at": "2019-08-21T07:31:24.548Z",
            "good": false,
            "top": true,
            "reply_count": 5,
            "visit_count": 701,
            "create_at": "2019-08-20T12:54:06.836Z",
            "author": {
                "loginname": "mariodu",
                "avatar_url": "//gravatar.com/avatar/1cb272a2b4347c9a15b502ce7e4802ba?size=48"
            }
        },
        {
            "id": "5cbfd9aca86ae80ce64b3175",
            "author_id": "4f447c2f0a8abae26e01b27d",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><h2>前言</h2>\n<p>时隔一年，Node.js 12 如约而至，正式发布第一个 <a href=\"https://github.com/nodejs/Release\">Current</a> 版本。</p>\n<p>该版本带来了诸如：</p>\n<ul>\n<li>V8 更新带来好多不错的特性。</li>\n<li>HTTP 解析速度提升。</li>\n<li>启动速度大幅提升。</li>\n<li>更好的诊断报告和堆分析工具。</li>\n<li>ESM 模块更新。</li>\n</ul>\n<p>原文地址：<a href=\"https://medium.com/@nodejs/introducing-node-js-12-76c41a1b3f3f\">https://medium.com/@nodejs/introducing-node-js-12-76c41a1b3f3f</a>\n语雀地址：<a href=\"https://www.yuque.com/egg/nodejs/nodejs-12\">https://www.yuque.com/egg/nodejs/nodejs-12</a></p>\n<h2>LTS vs Current</h2>\n<p><img src=\"https://cdn.nlark.com/yuque/0/2019/png/84182/1556074709431-35af45b8-ec7a-4a81-83d8-155eb519f04a.png#align=left&amp;display=inline&amp;height=389&amp;name=image.png&amp;originHeight=500&amp;originWidth=960&amp;size=58313&amp;status=done&amp;width=746\" alt=\"image.png\"></p>\n<p>如果你不了解 Node.js 的  Long Term Support 发布策略的话，一定要看看 <a href=\"https://github.com/nodejs/Release\">https://github.com/nodejs/Release</a> 。</p>\n<p>就目前而言，Node.js 6.x 和 8.x 将在 2019 年末结束 LTS 的支持，大家尽快升级到 10.x 吧。</p>\n<h2>快速体验</h2>\n<pre class=\"prettyprint language-bash\"><code>$ nvs add node&#x2F;12\n$ nvs use 12\n$ node -v\nv12.0.0\n</code></pre><p>具体参考这篇文章：<a href=\"https://zhuanlan.zhihu.com/p/63403762\">科普文：使用 nvs 管理本地 Node.js 版本</a></p>\n<h2>V8 更新到 7.4</h2>\n<blockquote>\n<p>大部分情况下，我们不用去考虑性能问题，坐等 V8 版本更新就好了。（大雾）</p>\n</blockquote>\n<p>本次版本更新，也带来了好几个不错的特性：</p>\n<ul>\n<li><a href=\"https://v8.dev/blog/v8-release-72#async-stack-traces\">异步堆栈跟踪</a></li>\n<li><a href=\"https://v8.dev/blog/v8-release-74#faster-calls-with-arguments-mismatch\">参数调用不匹配时的调用速度优化</a></li>\n<li><a href=\"https://v8.dev/blog/v8-release-73#faster-await\">更快的 await</a></li>\n<li><a href=\"https://v8.dev/blog/v8-release-72#javascript-parsing\">更快的 JavaScript 解析速度</a></li>\n</ul>\n<p><strong>同时，跑了下我们 Egg 的一些内部测试，发现序列化有 10~20% 的性能提升，恐怖如斯！</strong></p>\n<p>另，奇丑无比的 <a href=\"https://github.com/tc39/proposal-class-fields\">Private Class Fields</a> 也能用了：</p>\n<pre class=\"prettyprint language-javascript\"><code>class IncreasingCounter {\n  #count = 0;\n  \n  get value() {\n    console.log(&#x27;Getting the current value!&#x27;);\n    return this.#count;\n  }\n  increment() {\n    this.#count++;\n  }\n}\n</code></pre><h2>HTTP 解析速度提升</h2>\n<p>默认的 HTTP 解析器切换为 <a href=\"https://github.com/nodejs/llhttp\">llhttp</a> ，性能提升恐怖如斯：</p>\n<p><img src=\"https://cdn.nlark.com/yuque/0/2019/png/84182/1556072499637-686bb0e3-c75c-424c-851f-ad88aff183a2.png#align=left&amp;display=inline&amp;height=231&amp;name=image.png&amp;originHeight=404&amp;originWidth=1302&amp;size=88775&amp;status=done&amp;width=746\" alt=\"image.png\"></p>\n<blockquote>\n<p>点评：恐怖如斯。</p>\n</blockquote>\n<h2>启动速度提升</h2>\n<p>通过 <a href=\"https://v8.dev/blog/code-caching\">v8 code cache</a> 的支持，<a href=\"https://github.com/nodejs/node/pull/27161\">在构建时提前为内置库生成代码缓存</a>，从而提升 30% 的启动耗时。\n同时，通过<a href=\"https://github.com/nodejs/node/pull/24950\">重用主进程缓存</a>，Workers Threads 的启动速度提升了 60% 。</p>\n<blockquote>\n<p>点评：恐怖如斯。</p>\n</blockquote>\n<h2>Workers Threads</h2>\n<p>在 10.x 已经引入的 <a href=\"https://nodejs.org/api/worker_threads.html\">Workers Threads</a> 特性，在 12.x 里面默认启用，无需使用 <code>--experimental-worker</code> 开启。同时基于上一条的介绍，启动的速度也得到大幅提升。</p>\n<p>相关介绍：<a href=\"https://medium.com/@Trott/using-worker-threads-in-node-js-80494136dbb6\">https://medium.com/@Trott/using-worker-threads-in-node-js-80494136dbb6</a></p>\n<h2>诊断报告</h2>\n<p>提供了新的实验性功能『诊断报告』，一个非常有用的特性。\n可用于帮助分析诸如：崩溃，性能问题，内存泄漏，高 CPU 占用等等问题。详见 <a href=\"https://medium.com/the-node-js-collection/easily-identify-problems-in-node-js-applications-with-diagnostic-report-dc82370d8029\">这篇文章</a>。</p>\n<blockquote>\n<p>点评：这也是 <a href=\"https://www.aliyun.com/product/nodejs\">AliNode</a> 之前的一个卖点之一。</p>\n</blockquote>\n<h2>Heap Dump</h2>\n<p>以前我们分析问题的时候，需要手动安装对应的类库或者使用 AliNode。</p>\n<p>在 12.x 里面内置了该功能，详见：</p>\n<ul>\n<li><a href=\"https://github.com/nodejs/node/pull/27133\">https://github.com/nodejs/node/pull/27133</a></li>\n<li><a href=\"https://github.com/nodejs/node/pull/26501\">https://github.com/nodejs/node/pull/26501</a></li>\n</ul>\n<blockquote>\n<p>点评：又一个 <a href=\"https://www.aliyun.com/product/nodejs\">AliNode</a> 的功能被内置了。但其实影响不大，AliNode 的核心在于分析平台，这块的采集能力，本来他们就打算开源回馈出去的。</p>\n</blockquote>\n<p>同时，由于上述提到的 V8 升级，现在可以按照可用内存动态调整堆大小了。</p>\n<h2>ESM 模块方案更新</h2>\n<p>ES6 模块仍然还在实验阶段，不过有了新的方式，具体参见<a href=\"https://medium.com/@nodejs/announcing-a-new-experimental-modules-1be8d2d6c2ff\">这篇文章</a>。</p>\n<blockquote>\n<p>点评：让子弹再飞一会，该特性真的不是痛点，不急。</p>\n</blockquote>\n<h2>其他更新</h2>\n<ul>\n<li>更好的原生模块支持，<a href=\"https://nodejs.org/api/n-api.html#n_api_n_api\">N-API</a> 升级为版本 4，并 backport 到 Node.js 8.x 和 10.x。详细参见<a href=\"https://medium.com/the-node-js-collection/new-features-bring-native-add-ons-close-to-being-on-par-with-js-modules-cd4f9b8e4b4\">这篇文章</a>。</li>\n<li>TLS 升级为 1.3， <a href=\"https://developer.ibm.com/blogs/openssl-111-has-landed-in-nodejs-master-and-why-its-important-for-nodejs-lts-releases/\">增强安全功能</a>。</li>\n<li>随着 C++ 编译器的更新，现在要求 <code>GCC 6</code> 和 <code>glibc 2.17</code> ，对应的操作系统 Win7 和 macOS 10，详细参见<a href=\"https://github.com/nodejs/node/blob/v12.x/BUILDING.md#platform-list\">这篇文章</a>。</li>\n</ul>\n<p>不过目前 node-gyp 的一些原生模块会编译失败：</p>\n<pre class=\"prettyprint language-bash\"><code>nunjucks@3.2.0 › chokidar@2.1.5 › fsevents@^1.2.7 optional error: Error: Run &quot;sh -c node install&quot; error, exit code 1\n    at ChildProcess.&lt;anonymous&gt; (&#x2F;Users&#x2F;tz&#x2F;.npm-global&#x2F;lib&#x2F;node_modules&#x2F;tnpm&#x2F;node_modules&#x2F;_runscript@1.3.0@runscript&#x2F;index.js:74:21)\n    at ChildProcess.emit (events.js:196:13)\n    at maybeClose (internal&#x2F;child_process.js:1000:16)\n    at Process.ChildProcess._handle.onexit (internal&#x2F;child_process.js:267:5)\n</code></pre></div>",
            "title": "Node 12 值得关注的新特性",
            "last_reply_at": "2019-08-19T09:55:20.970Z",
            "good": false,
            "top": true,
            "reply_count": 57,
            "visit_count": 115853,
            "create_at": "2019-04-24T03:36:12.582Z",
            "author": {
                "loginname": "atian25",
                "avatar_url": "https://avatars2.githubusercontent.com/u/227713?v=4&s=120"
            }
        },
        {
            "id": "5bd4772a14e994202cd5bdb7",
            "author_id": "504c28a2e2b845157708cb61",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><p>2018年10月27日晚上，突然收到服务器不能访问的告警通知，拜托了狼叔 <a href=\"/user/i5ting\">@i5ting</a> 帮忙看看，结果登不上也ping不通。\n后来收到短信，发现是被ucloud封了，短信内容如下：</p>\n<blockquote>\n<p>【UCloud】尊敬的UCloud用户，您的IP：123.59.77.142  存在URL ：<a href=\"https://cnodejs.org/topic/57239bce5a26c4a841ecbf01\">https://cnodejs.org/topic/57239bce5a26c4a841ecbf01</a> （详细信息请查看邮箱）包含违禁内容（包括但不限于翻墙等），违反了国家有关法律法规。目前依主管单位要求，对您的IP予以封停，请您尽快处理违规内容。待处理完成后请联系技术支持重新开启业务。[4000188113]</p>\n</blockquote>\n<p>然后联系了ucloud的客服，一下就打通了，对方态度挺好处理问题也快。ucloud说是运营商那边封的，不是他们的检测机制。所以需要联系运营商解决。\n考虑到各位亲爱的网友们的行为我无法控制，那么一直跟越来越严格的审查系统对抗只会让自己疲惫，所以我就站点迁到国外。来到了aws jp。</p>\n<p>我大致测了测，电信和移动的访问速度非常快，100ms以内，联通会慢一点，400ms以内吧。</p>\n<p>建议翻墙访问。</p>\n</div>",
            "title": "服务器迁移至 aws 日本机房",
            "last_reply_at": "2019-08-18T03:16:56.213Z",
            "good": false,
            "top": true,
            "reply_count": 202,
            "visit_count": 93838,
            "create_at": "2018-10-27T14:33:14.694Z",
            "author": {
                "loginname": "alsotang",
                "avatar_url": "https://avatars1.githubusercontent.com/u/1147375?v=4&s=120"
            }
        },
        {
            "id": "5d2bd8ebfa8ef0094e064cca",
            "author_id": "4f4c779a940ce2e60b1e3b3f",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><p>用 MacOS 做开发已经六七年了，真的很爽。体验上比 Linux 稳定，UI更完善，还兼容强大的 Terminal。比 Windows 颜值高很多，与 nix 的兼容互通性很强（当然 Linux 有自由而丰富的社区资源，Windows 有完备而坚实的应用生态）。虽然不同系统都各有所长，但就开发体验而言 MacOS 略胜一筹（毕竟能自如地进行移动端和前后端开发）。</p>\n<p>一直以来，MacOS 的 Finder 和终端直接的切换让我很手残，没有便捷的路径复制，一直cdcdcd。。。最后，我只能打开终端，然后cd拖过去的文件夹 -_-||| 而且有时候，一个项目会涉及到文档、设计稿、资源、代码等多个目录，每次都重复打开多个 Finder 窗口来回切换，真的很晕。。。</p>\n<p>于是就在想，能不能开发一款带有Chrome式地址栏（直接输入地址、拷贝地址。。想想就很爽），并且能把窗口切分成 N 个视图区域，最好还能一直保持工作区状态的小工具？想的差不多了就开干，从设计到coding完成，大概花了两周左右的时间，QSpace 第一个版本终于上线了！</p>\n<p>第一个版本完成了以下功能：</p>\n<p>【多视图工作区】</p>\n<ul>\n<li>支持 12 种视图布局，一键灵活切换。</li>\n<li>支持创建多个工作区，并可快速切换。</li>\n<li>所有工作区状态自动保存，再次打开即可恢复！</li>\n</ul>\n<p>【文件管理增强】</p>\n<ul>\n<li>浏览器式地址栏：支持前进、后退、前往上级、拷贝或直接输入路径等操作。</li>\n<li>终端快捷键：一键在指定终端打开已选择目录（支持 Terminal、iTerm、Hyper）</li>\n<li>编辑器快捷键：一键在指定编辑器打开已选择的文件或目录（支持 VSCode、Atom、Sublime）</li>\n<li>支持在任意位置创建空文件、文件夹。</li>\n<li>支持工作区视图之间拷贝、粘贴、拖拽等操作。</li>\n<li>支持工作区视图与其他应用之间拷贝、粘贴、拖拽等操作。</li>\n<li>按回车可直接打开文件或进入目录。</li>\n</ul>\n<p>欢迎有类似困扰的开发者加入体验！\n<a href=\"https://apps.apple.com/cn/app/id1469774098\">https://apps.apple.com/cn/app/id1469774098</a></p>\n<p><img src=\"//static.cnodejs.org/FgMAoG9Mq4zvBU4XlxzVJOQVgWlK\" alt=\"屏幕快照 2019-07-15 上午9.28.58.jpg\">\n<img src=\"//static.cnodejs.org/FlFsr4bv1lNcdL9GvrOxYQizArCB\" alt=\"屏幕快照 2019-07-15 上午9.29.18.jpg\"></p>\n</div>",
            "title": "一款 MacOS 多视图 \"Finder\" 效率工具，尤其适合前后端开发者。",
            "last_reply_at": "2019-08-22T03:29:47.151Z",
            "good": false,
            "top": false,
            "reply_count": 3,
            "visit_count": 801,
            "create_at": "2019-07-15T01:37:47.462Z",
            "author": {
                "loginname": "vendar",
                "avatar_url": "//gravatar.com/avatar/246abe2445d43c1497ff0481c0ab524c?size=48"
            }
        },
        {
            "id": "5d5ccaede79eaa6628beb2e8",
            "author_id": "5c8e65d77ce0df3732428f89",
            "tab": "ask",
            "content": "<div class=\"markdown-text\"><p><strong>关键字</strong>：<strong>egg扩展,helper</strong>\n<strong>背景</strong>：egg框架中extend下可以扩展框架里面的东西，包括helper.js, application.js等等。但是指定的命名方式为Helper。\n<strong>问题</strong>：自己在使用中会使用很多helper函数，在这个过程中helper.js的单个文件会越来越大，且不同类别的方法放在同一个file里面会使得框架越来越大，如何分成多个helper文件呢？网上找了半天没有找到。</p>\n</div>",
            "title": "egg中如何定义多个helper扩展文件？",
            "last_reply_at": "2019-08-22T03:20:12.828Z",
            "good": false,
            "top": false,
            "reply_count": 13,
            "visit_count": 270,
            "create_at": "2019-08-21T04:39:09.771Z",
            "author": {
                "loginname": "oneWalker",
                "avatar_url": "https://avatars1.githubusercontent.com/u/18098166?v=4&s=120"
            }
        },
        {
            "id": "5ba523da37a6965f59051bbd",
            "author_id": "53210f5661ed405564023e05",
            "tab": "ask",
            "content": "<div class=\"markdown-text\"><p>或许是 sequelize 基础知识不牢靠，并不关 egg 问题，我先描述一下：</p>\n<p>有两个表： <code>brand</code> 和 <code>ris</code>, 都是多对多关系，另外还有一个关系表 <code>ris_to_brand</code>。</p>\n<p>brand 表关联写法如下：</p>\n<pre class=\"prettyprint\"><code>Brands.associate = function() {\n    app.model.Brands.belongsToMany(app.model.Ris, { as: &#x27;bri&#x27;, through: &#x27;ris_to_brand&#x27;, foreignKey: &#x27;brand_id&#x27; });\n  };\n</code></pre><p>ris 表关联写法如下：</p>\n<pre class=\"prettyprint\"><code>Ris.associate = function() {\n    app.model.Ris.belongsToMany(app.model.Brands, { as: &#x27;rib&#x27;, through: &#x27;ris_to_brand&#x27;, foreignKey: &#x27;ris_id&#x27; });\n  };\n</code></pre><p>ris_to_brand 表结构分别是 <code>id, ris_id, brand_id</code>。</p>\n<p>我运行的时候报如下错误：\n<img src=\"//static.cnodejs.org/FkiiD_M4XyRNghUSAyh_rswCKE2d\" alt=\"image.png\"></p>\n<p>说我 <code>ris_to_brands</code> 表不存在，按我的理解，我指定的是 <code>through: ris_to_brand</code> ，怎么会去寻找 <code>ris_to_brands</code> 这个名称的表呢？\n不明白。</p>\n</div>",
            "title": "egg-sequelize 关联查询请教",
            "last_reply_at": "2019-08-22T03:11:39.279Z",
            "good": false,
            "top": false,
            "reply_count": 6,
            "visit_count": 1439,
            "create_at": "2018-09-21T17:01:14.455Z",
            "author": {
                "loginname": "littledu",
                "avatar_url": "https://avatars2.githubusercontent.com/u/1784673?v=4&s=120"
            }
        },
        {
            "id": "5d5dfd85421846662d983e2b",
            "author_id": "593129689a99de3b489289c5",
            "tab": "ask",
            "content": "<div class=\"markdown-text\"><p>使用egg-redis\n想用reids做一个消息队列，但是redis的连接数一直上涨，没有释放\n简单的demo\nasync pull() {\nthis.redisBlocking = this.app.redis.duplicate();\nconst result = await this.redisBlocking.brpoplpush(‘MSGQ’, ‘MSGQ_BK’, 10);\nif (result) {\nconst flag = await this.ctx.service.gameservice.addSql(JSON.parse(result));\nif (flag) {\nthis.app.redis.lrem(‘MSGQ_BK’, -1, this.result);\n}\n}\nthis.redisBlocking = null;\nreturn result;\n}\nfor (; ;) {\nawait ctx.service.queue.pull();\n}</p>\n</div>",
            "title": "egg-redis 没有释放连接， 连接数一直上涨导致错误",
            "last_reply_at": "2019-08-22T02:27:17.709Z",
            "good": false,
            "top": false,
            "reply_count": 0,
            "visit_count": 99,
            "create_at": "2019-08-22T02:27:17.709Z",
            "author": {
                "loginname": "qqxwbtt",
                "avatar_url": "https://avatars3.githubusercontent.com/u/28970770?v=4&s=120"
            }
        },
        {
            "id": "5d5dfa78e79eaa6628beb62f",
            "author_id": "59b7a76ee483de126798458e",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><h1>斯坦福编程范式第二课笔记（数据类型在内存中的表示）</h1>\n<p>内存的最小单位是字节，一个字节等于8位（bit），每一位要么是0要么是1，也就是用二进制来表示。</p>\n<p>一个字节在内存中的表示为：</p>\n<p><img src=\"https://image.coder.cat/bit.png\" alt></p>\n<h2>无符号整数的表示</h2>\n<p>无符号二进制转成十进制公式：</p>\n<p><img src=\"https://image.coder.cat/dd2fc7ee8cc062f42a633e67c9cd7fe6.png\" alt></p>\n<ul>\n<li><code>w</code>：二进制位的长度。</li>\n<li><code>i</code>：二进制位从右往左开始的下标，从0开始计数。</li>\n<li><code>w-1</code>：由于i是从0开始计数，所以最后一个下标就是w-1。</li>\n<li><code>x(i)</code>：第<code>i</code>位的值，要么是0要么是1。</li>\n<li><code>2^i</code>：2的第<code>i</code>次幂。</li>\n</ul>\n<p>例如：\n无符号二进制数<code>10010</code> 按照公式展开就是：</p>\n<p><img src=\"https://image.coder.cat/ce0c541a239b16c32885adb9f36cc850.png\" alt></p>\n<p>如果把这个数用1个字节在计算机中存储，内存中就表示为：</p>\n<p><img src=\"https://image.coder.cat/bit 2.png\" alt></p>\n<p>不足8位，左边补0。</p>\n<p>1个字节的无符号正式能表示<code>2^8 = 256</code>个不同的数。能表示最大的数是8个二进位全是1的数等于255，也就是求一个<code>公比为2</code>，<code>首项是1</code>的<code>等比数列</code>前8项和。二进制位求和公式为<code>(2^n) - 1</code>。总结下来一个n位的二进制数能表示最大的数是<code>(2^n) - 1</code>，能够表示<code>2^n</code>个不同的数，之所以是2^n个不同的数，是因为可以表示<code>0~(2^n) - 1</code>，从0开始的所以还需要<code>+1</code>个长度。</p>\n<h2>Char在内存中的表示</h2>\n<blockquote>\n<p>Char类型是用来存储单个字符，在内存中占用1个字节的大小，它使用8个bit来表示256个字符。\nChar类型实际存储的是字符的<code>ASCII</code>码，由于<code>ASCII</code>码是整数。所以Char最终在内存中是一个8bit的整型。</p>\n</blockquote>\n<p>比如字符<code>A</code>的<code>ASCII</code>码是65，65 = 2^0 + 2^6，所以在内存中的表示为：\n<img src=\"https://image.coder.cat/bit 3.png\" alt></p>\n<pre class=\"prettyprint language-c\"><code>char ch = &#x27;A&#x27;;\nprintf(&quot;%d&quot;, ch); &#x2F;&#x2F; output is 65\n</code></pre><h2>Short在内存中的表示</h2>\n<blockquote>\n<p>Short 表示的是短整型，一般占用2个字节的内存大小。</p>\n</blockquote>\n<p>它的取值范围是<code>(-2)^15~(2^15)-1</code>包含0。最大值这里是<code>(2^15)-1</code>，是因为short有符号位，需要用最高位（用从左到右第一位）来表示符号，0表示正数，1表示负数。 最大值的二进制表示为<code>0111111111111111</code>(16个二进制位)，十进制就是<code>(2^15)-1</code>。 之所以是<code>(2^15)-1</code>，也是之前说的求和公式(<code>(2^n)-1</code>。</p>\n<h2>实现加减法</h2>\n<blockquote>\n<p>二进制加减法和十进制一样，把对应<code>位</code>相加，大于1就向前进位。例如<code>0111 + 1 = 1000</code></p>\n</blockquote>\n<p>如果想要把7和-7相加使结果等于0。按照在计算机中使用二进制的最高位来当做符号位的，0表示正数，1表示负数。那么7表示为<code>0000111</code>，-7就表示为<code>1000111</code> 。0000111 + 1000111 按照二进制先前的加法法则得出来是<code>1001110</code>，结果不是我们想要的0。</p>\n<blockquote>\n<p>怎么才能让2个二进制数相加得到0呢？</p>\n</blockquote>\n<p>想要得到0，就需要利用进位，比如在<code>11111111</code>（8个1）的基础上加1就可以得到<code>100000000</code>(一共9位，左边第一位是1，后面8个0) ，舍掉最左边的那个1就得到了8个0最终结果就等于0。把原码按位取反然后与原码相加就可以得到全1的二进制数。比如<code>0000111</code>按位取反就是<code>1111000</code>，他们俩相加得到<code>11111111</code>。 再把它加1就得到最后的结果0。整个过程需要3步，我们把最后两步合并成一个步骤，也就是把按位取反和加1合并到一起，其实就是把原码的反码加1。如<code>1111000</code>加1得到<code>1111001</code>。最后这两步合在一起叫做取原码的补码。最后得到的<code>1111001</code>就叫做<code>0000111</code>的补码。</p>\n<ul>\n<li>正整数的补码是其本身。</li>\n<li>负整数的补码是把它对应的正整数二进制码按位取反，也就做原码的反码然后再加1。</li>\n</ul>\n<p>比如正整数<code>7</code>的二进制码是<code>0000111</code>，它的补码还是它本身。再比如<code>-7</code>对应的正整数二进制码是<code>0000111</code>，它的反码就是<code>1111000</code>（把原码按位取反）。然后再<code>加1</code>就得到<code>1111001</code>。<code>1111001</code>就是<code>-7</code>的补码。我们再次把<code>1111001</code>和<code>0000111</code>按照二进制加法法则相加刚好得到0。这里需要注意的是，这里左边会产生一个溢出位，这个溢出位是去掉不要的，得到结果就是0。</p>\n<p>-1的补码全是1，因为它加上1之后就变成了0。</p>\n<blockquote>\n<p>计算机系统都是用补码来表示二进制码，这样的好处之一就是可以让加减法运算统一处理。</p>\n</blockquote>\n<h2>位模式拷贝</h2>\n<blockquote>\n<p>当把<code>char</code>类型的变量赋值给<code>short</code>类型的变量时，会把<code>char</code>的8个bit放在<code>short</code>的低八位（从右往左第一个字节）上。</p>\n</blockquote>\n<p>例如：</p>\n<pre class=\"prettyprint language-c\"><code>char ch = &#x27;A&#x27;; &#x2F;&#x2F; &#x27;A&#x27; ASCII：65 内存表示为 01000001\nshort s = ch; &#x2F;&#x2F; 内存表示为 00000000 | 01000001\n</code></pre><p>一个特殊的情况就是当把一个<code>short</code>的<code>-1</code>赋值给一个<code>int</code>变量的时候，并不会得到<code>00000000 | 00000000 | 11111111 | 11111111</code>，因为如果这样的话表示的值就不是<code>-1</code>了。所以正确的做法就是把<code>所有的1</code>全部拷贝给<code>int</code>。\n例如：</p>\n<pre class=\"prettyprint language-c\"><code>short s = -1; &#x2F;&#x2F; 内存表示为 11111111 | 11111111\nint i = s; &#x2F;&#x2F; 内存表示为 11111111 | 11111111 | 11111111 | 11111111\n</code></pre><p>相反如果把<code>short</code>类型的变量赋值给<code>char</code>类型的变量时，会把<code>short</code>的低八位（从右往左第一个字节）放在<code>char</code>仅有的一个字节上。会把多的字节自动剔除。\n例如：</p>\n<pre class=\"prettyprint language-c\"><code>short s = 65; &#x2F;&#x2F; 内存表示为 00000001 | 01000001\nchar ch = s; &#x2F;&#x2F; 内存表示为 01000001\n</code></pre><h2>浮点数的表示</h2>\n<p>我们已经知道无符号二进制转成十进制公式为：</p>\n<p><img src=\"https://image.coder.cat/dd2fc7ee8cc062f42a633e67c9cd7fe6.png\" alt></p>\n<p>这里的<code>i</code>是从0开始的也就是从右边的第一位是<code>2^0</code>，如果我们从一个负整数开始的话，就会存在负整数次幂，那么也就会出现小数部分了。\n例如有一个16位的二进制数<code>000000011 | 11000000</code>  用它的前八位来表示整数部分，后八位来表示小数部分，就也可以这样表示<code>000000011.11000000</code>。这样后八位也就不再是整数次幂了，而是从左到右每一位分别是<code>2^(-1)~2^(-8)</code>。这个数就可以表示成：</p>\n<p><img src=\"https://image.coder.cat/8c7bdb11f670c587afe6a694ed948c90.png\" alt></p>\n<p>这是其中一种浮点数表示方法，这种方法表示的浮点数会出现精度不够，表示的数值区间比较小，所以计算机实际并没有用该方法来表示浮点数。</p>\n<p>下面这种方法就是计算机内部真实表示浮点数的方法。</p>\n<p>我们先来看下十进制的科学计数法，用科学计数法表示123.45的话就是<code>1.2345 * 10^2</code>。其中1.2345 为<code>尾数</code>，10为<code>基数</code>，2为<code>指数</code>。计算机在表示浮点数的时候，也借用了十进制的科学计数法的思想，只不过基数为<code>2</code>了。</p>\n<p>例如<code>1000.01</code> 可以表示成<code>1.00001 * 2^3</code>，几次幂，小数点就向右移动几位。</p>\n<p>用<code>32位</code>的<code>float</code>来举例，首位是符号位<code>S</code>，紧跟后面<code>8位</code>是指数位<code>E</code>，最后<code>23位</code>称为尾数位<code>M</code>。</p>\n<p>计算公式：</p>\n<p><img src=\"https://image.coder.cat/cb4484727e77374e1bec9da86a091c4e.png\" alt></p>\n<ul>\n<li>S：符号位</li>\n</ul>\n<blockquote>\n<p>S为0时刚好是正数，为1时是负数。</p>\n</blockquote>\n<ul>\n<li>M：尾数部分</li>\n</ul>\n<blockquote>\n<p>它的取值范围是<code>1≤M＜2</code>，取值方式是从左到右每一位分别表示的是<code>2^-1~2^-23</code>，值就是然后对各个位的表示值求和，这里跟先前浮点数表示的办法一致，都是从负整数次幂开始。由于尾数的整数部分始终都是<code>1</code>，所以这个<code>1</code>可以被省略，这样就可以多出一位来提升精度。</p>\n</blockquote>\n<ul>\n<li>E：指数部分</li>\n</ul>\n<blockquote>\n<p>减去127是因为偏移量是127。</p>\n</blockquote>\n<p>例如<code>0 | 10000010 | 11110000000000000000000</code>的每一部分别是：</p>\n<ul>\n<li>S：<code>0</code></li>\n</ul>\n<blockquote>\n<p>表示整数。</p>\n</blockquote>\n<ul>\n<li>M：<code>11110000000000000000000</code></li>\n</ul>\n<blockquote>\n<p>这里需要再加1，因为为了提升小数精度省略了1，所以要加回来。所以完整的尾数部分应该是<code>1.1111</code>（省略了后面的0）。 2^0 + 2^-1 + 2^-2 + 2^-3 + 2^-4  = 1.9375</p>\n</blockquote>\n<ul>\n<li>E：<code>10000010</code></li>\n</ul>\n<blockquote>\n<p>2^7 + 2^1 = 130</p>\n</blockquote>\n<p>分别带入公式得：</p>\n<p>二进制形式：</p>\n<p><img src=\"https://image.coder.cat/7174f02edf01c94699f4b0a1a5f0dede.png\" alt></p>\n<p>十进制形式：</p>\n<p><img src=\"https://image.coder.cat/c49854e22c96541aad7f80c6d0644331.png\" alt></p>\n<p>详细过程：\n<code>1 * 1.1111 * 2^(130-127)</code> =&gt; <code>1 * 1.1111 * 2^3</code> =&gt; <code>1 * 1111.1</code>（几次幂，小数点就向右移动几位） =&gt; <code>1 * (2^3 + 2^2 + 2^1 + 2^0 + 2^-1)</code> =&gt; <code>1 * (8 + 4 + 2 + 1 + 0.5)</code> =&gt; 15.5</p>\n<h2>浮点数与整数相互赋值</h2>\n<p>当我们在把浮点数与整数相互赋值的时候，并不会直接拷贝bit位，而是重新计算出在新的类型中的位模式。\n例如：</p>\n<pre class=\"prettyprint language-c\"><code>int i = 5; &#x2F;&#x2F; 内存表示 00000000 | 00000000 | 00000000 | 00000101\n&#x2F;&#x2F; 重新计算5在float中的表示方式\nfloat f = i; &#x2F;&#x2F; 内存表示 0 | 00000000 | 00000000000000000000101\nprintf(&quot;%f&quot;, f) &#x2F;&#x2F; output is 5.0\n</code></pre><p>来一点更刺激的！！！</p>\n<pre class=\"prettyprint language-c\"><code>&#x2F;&#x2F; 2^30\nint i = 1073741824; &#x2F;&#x2F; 内存表示 01000000 | 00000000 | 00000000 | 00000000\n&#x2F;&#x2F; 这里就不会重新计算在float中的表示方式了，而是直接把bit位拷贝过去。用float的解析方式去解析int的那块内存。\nfloat f = *(float *)&amp;i; &#x2F;&#x2F; 内存表示 0 | 10000000 |00000000000000000000000\n\n&#x2F;&#x2F; 1 * 2^(128-127) * 1 = 2\nprintf(&quot;%f&quot;, f) &#x2F;&#x2F; output is 2.0\n</code></pre><p>这里就不会重新计算<code>1073741824</code>在float中的表示方式了，而是直接把<code>int</code>的<code>bit位拷贝过去</code>。用float的解析方式去<code>解析int的那块内存</code>。</p>\n</div>",
            "title": "斯坦福编程范式第二课笔记（数据类型在内存中的表示）",
            "last_reply_at": "2019-08-22T02:14:16.720Z",
            "good": false,
            "top": false,
            "reply_count": 0,
            "visit_count": 100,
            "create_at": "2019-08-22T02:14:16.720Z",
            "author": {
                "loginname": "acodercat",
                "avatar_url": "https://avatars3.githubusercontent.com/u/16076835?v=4&s=120"
            }
        },
        {
            "id": "5d5d2e64421846662d983c4c",
            "author_id": "5942903bff5813233faad8a9",
            "tab": "ask",
            "content": "<div class=\"markdown-text\"><pre class=\"prettyprint\"><code>sudo docker run -d \\\n--name gitlab-runner \\\n--restart always \\\n-v &#x2F;usr&#x2F;local&#x2F;gitlab-runner&#x2F;config:&#x2F;etc&#x2F;gitlab-runner \\\n-v &#x2F;usr&#x2F;local&#x2F;gitlab-runner&#x2F;run&#x2F;docker.sock:&#x2F;var&#x2F;run&#x2F;docker.sock \\\n-v &#x2F;usr&#x2F;local&#x2F;node&#x2F;client-admin:&#x2F;etc&#x2F;client-admin \\\ngitlab&#x2F;gitlab-runner:latest\n</code></pre><pre class=\"prettyprint\"><code>docker exec -it gitlab-runner gitlab-ci-multi-runner register \\\n  --non-interactive \\\n  --url https:&#x2F;&#x2F;gitlab.com&#x2F; \\\n  --registration-token &quot;xxxxxxxxxxx&quot; \\\n  --tag-list=ci \\\n  --description &quot;ci&quot; \\\n  --docker-pull-policy=&quot;if-not-present&quot; \\\n  --executor=docker \\\n  --docker-privileged=true \\\n  --docker-image &quot;node:10.16.3&quot; \\\n  --docker-volumes &#x2F;usr&#x2F;local&#x2F;gitlab-runner&#x2F;run&#x2F;docker.sock:&#x2F;var&#x2F;run&#x2F;docker.sock \\\n  --docker-volumes &#x2F;usr&#x2F;local&#x2F;node&#x2F;client-admin:&#x2F;etc&#x2F;client-admin\n</code></pre><p>这个是我的配置，实际项目中，无法拿到挂载目录。\n脑壳都试破了，不知道哪里出了问题。</p>\n</div>",
            "title": "卡了24小时了，有没有了解docker和gitlab-runner的大佬在？",
            "last_reply_at": "2019-08-22T02:09:30.662Z",
            "good": false,
            "top": false,
            "reply_count": 2,
            "visit_count": 159,
            "create_at": "2019-08-21T11:43:32.131Z",
            "author": {
                "loginname": "wbget",
                "avatar_url": "https://avatars0.githubusercontent.com/u/12776391?v=4&s=120"
            }
        },
        {
            "id": "5d5c0fc5e79eaa6628beb132",
            "author_id": "57a878fd4653749872ec6ecf",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><p>一款用游戏框架开发的web框架meiru。借鉴了cnode社\n区，开发出skynetlua社区，<a href=\"https://www.skynetlua.com\">https://www.skynetlua.com</a>\nmeiru框架使用lua的协程，完全不使用任何回调函数。使用skynet框架，在业务层实现多核处理</p>\n</div>",
            "title": "一款新的web框架meiru，欢迎支持",
            "last_reply_at": "2019-08-22T02:05:04.078Z",
            "good": false,
            "top": false,
            "reply_count": 18,
            "visit_count": 672,
            "create_at": "2019-08-20T15:20:37.812Z",
            "author": {
                "loginname": "linyouhappy",
                "avatar_url": "https://avatars0.githubusercontent.com/u/1627891?v=4&s=120"
            }
        },
        {
            "id": "5d14cb08cdb1f967c157669c",
            "author_id": "596dc452db0b6aec18a2862f",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><p><img src=\"http://images.boblog.com/BOBLOG-03.png?imageView2/1/w/400/h/200\" alt=\"img\"></p>\n<h2>这是个什么的项目？</h2>\n<p>使用 Node.js + Koa2 + MySQL + Vue.js 实战开发一套完整个人博客项目网站。</p>\n<ul>\n<li>博客线上地址：<a href=\"http://www.boblog.com\">www.boblog.com</a></li>\n<li>Github地址：<a href=\"https://github.com/liangfengbo/nodejs-koa-blog\">https://github.com/liangfengbo/nodejs-koa-blog</a></li>\n</ul>\n<h2>解决了什么问题？</h2>\n<ul>\n<li>服务端：使用 Node.js 的 Koa2 框架二次开发 Restful API。</li>\n<li>前端：Vue.js 打造了前端网站和后台管理系统。</li>\n</ul>\n<h2>项目包含什么功能？</h2>\n<p><a href=\"https://www.npmjs.com/package/koa\"><img src=\"https://img.shields.io/badge/koa-^2.7.0-brightgreen.svg\" alt=\"koa\"> </a> <a href=\"https://www.npmjs.com/package/koa-router\"><img src=\"https://img.shields.io/badge/koa--router-^7.4.0-brightgreen.svg\" alt=\"koa-router\"></a> <a href=\"https://www.npmjs.com/package/sequelize\"><img src=\"https://img.shields.io/badge/sequelize-^5.6.1-brightgreen.svg\" alt=\"sequelize\"></a> <a href=\"https://www.npmjs.com/package/mysql2\"><img src=\"https://img.shields.io/badge/mysql2-^1.6.5-brightgreen.svg\" alt=\"mysql2\"></a></p>\n<ul>\n<li>Koa2服务端\n<ul>\n<li>管理员与权限控制</li>\n<li>文章</li>\n<li>文章分类</li>\n<li>评论文章</li>\n</ul>\n</li>\n<li>前端博客网站 Vue.js</li>\n<li>后台管理系统 Vue.js</li>\n</ul>\n<h2>项目的特点</h2>\n<ul>\n<li>Koa 与 Koa 二次开发API</li>\n<li>多 koa-router 拆分路由</li>\n<li>require-directory 自动路由加载</li>\n<li>异步编程 - async/await</li>\n<li>异步异常链与全局异常处理</li>\n<li>Sequelize ORM 管理 MySQL</li>\n<li>JWT 权限控制中间件</li>\n<li>参数验证器 Validator</li>\n<li>nodemon 修改文件自动重启</li>\n<li>前后端分离</li>\n<li>使用 Vue.js 搭建前端网站和后台管理系统</li>\n</ul>\n<h2>如何使用和学习？</h2>\n<h3>数据库</h3>\n<p>启动项目前一定要在创建好 <code>boblog</code> 数据库。</p>\n<pre class=\"prettyprint\"><code># 登录数据库\n$ mysql -uroot -p密码\n\n# 创建 wxapp 数据库\n$ CREATE DATABASE IF NOT EXISTS boblog DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\n</code></pre><h3>克隆项目</h3>\n<p>首先使克隆项目，然后进入项目根目录使用命令安装包，最后命令启动项目，代码会根据模型自动创建数据库表的。</p>\n<p>根目录都是 Node.js + Koa2 API开发源代码，根目录下的 web 文件夹下都是前端网站项目源代码，根目录下的 admin 文件夹下都是后台管理系统的源代码。</p>\n<pre class=\"prettyprint\"><code># 克隆项目代码\n$ git clone https:&#x2F;&#x2F;github.com&#x2F;liangfengbo&#x2F;nodejs-koa-blog.git\n\n# 进入koa项目根目录\n$ cd nodejs-koa-blog\n\n# 安装包\n$ npm install\n\n# 运行服务\n$ npm run dev\n\n# 打开浏览器输入回车：http:&#x2F;&#x2F;localhost:3000\n\n&#x2F;&#x2F; 前端项目使用\n1. 在根目录下进入web项目：cd web，\n2. 安装包，执行: npm install 命令，\n3. 启动服务: npm run dev; 浏览器打开：http:&#x2F;&#x2F;localhost:8080&#x2F; 即可以访问。\n\n&#x2F;&#x2F; 后台管理系统使用\n1. 在根目录下进入admin项目：cd admin，\n2. 安装包，执行: npm install 命令，\n3. 启动服务: npm run dev; 浏览器打开：http:&#x2F;&#x2F;localhost:8083&#x2F; 即可以访问。\n</code></pre><h3>接口说明（重要）</h3>\n<p>项目的所有接口文档都这里，可以逐个文档看。</p>\n<ul>\n<li><a href=\"https://github.com/liangfengbo/nodejs-koa-blog/blob/master/doc/admin.md\">管理员接口文档说明</a></li>\n<li><a href=\"https://github.com/liangfengbo/nodejs-koa-blog/blob/master/doc/article.md\">文章接口文档说明</a></li>\n<li><a href=\"https://github.com/liangfengbo/nodejs-koa-blog/blob/master/doc/category.md\">分类接口文档说明</a></li>\n<li><a href=\"https://github.com/liangfengbo/nodejs-koa-blog/blob/master/doc/comments.md\">评论接口文档说明</a></li>\n</ul>\n<h2>License</h2>\n<p>项目已实现管理员、权限管理、文章、分类、评论等接口，前端模板网站和后台管理系统。自己可以根据项目代码学习，可以到 postman 软件中测试API或学习。</p>\n<p>喜欢或对你有帮助的话，请你点一个星星 <a href=\"https://github.com/liangfengbo/nodejs-koa-blog\">star</a> 鼓励我，或者您有更好的建议和意见，请提出来告知我，可以留言 <a href=\"https://github.com/liangfengbo/nodejs-koa-blog/issues/new\">Issues</a>。希望能够帮助到你学习！Thanks！</p>\n<p><a href=\"https://github.com/liangfengbo/nodejs-koa-blog/blob/master/LICENSE\">MIT</a>, by 梁凤波</p>\n<hr>\n</div>",
            "title": "分享Node.js + Koa2 + MySQL + Vue.js 实战开发一套完整个人博客项目网站",
            "last_reply_at": "2019-08-22T01:15:03.074Z",
            "good": false,
            "top": false,
            "reply_count": 12,
            "visit_count": 1190,
            "create_at": "2019-06-27T13:56:24.884Z",
            "author": {
                "loginname": "liangfengbo",
                "avatar_url": "https://avatars3.githubusercontent.com/u/26264225?v=4&s=120"
            }
        },
        {
            "id": "5d54b29a697873456c6bd697",
            "author_id": "5aebafbcadea947348e76068",
            "tab": "ask",
            "content": "<div class=\"markdown-text\"><p>请问一下大家有好的code review机制么？\n平常团队review的时候总是会出现偏差，比如突然讲到了业务细节，感觉效率好低，求大佬们分享和建议，\n评论也会给其他需要review的coder建议🤗</p>\n</div>",
            "title": "code review机制",
            "last_reply_at": "2019-08-21T14:09:35.187Z",
            "good": false,
            "top": false,
            "reply_count": 22,
            "visit_count": 974,
            "create_at": "2019-08-15T01:17:14.594Z",
            "author": {
                "loginname": "Rabbitzzc",
                "avatar_url": "https://avatars0.githubusercontent.com/u/26913511?v=4&s=120"
            }
        },
        {
            "id": "5d2e803f51637b492bb0f5d0",
            "author_id": "5c05dd981c62d8334935059c",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><p><img src=\"//static.cnodejs.org/Fj9lYwgwM5z9Z-s36JRZIiWFUExp\" alt=\"image.png\">\n简洁、大方、收录全。希望大家喜欢~\n<a href=\"https://geekdocs.cn/\">程序员导航 - 国内最专业的程序员网址导航！</a></p>\n</div>",
            "title": "给大家分享一个程序员网址导航站~",
            "last_reply_at": "2019-08-21T13:31:04.600Z",
            "good": false,
            "top": false,
            "reply_count": 11,
            "visit_count": 2041,
            "create_at": "2019-07-17T01:56:15.006Z",
            "author": {
                "loginname": "WuYinMan",
                "avatar_url": "https://avatars2.githubusercontent.com/u/28140607?v=4&s=120"
            }
        },
        {
            "id": "5a22bfbc8eab6ee92a694618",
            "author_id": "57b08034a4f7e29c763413ef",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><p>#Stickpackage</p>\n<h2>StickPackage，NodeJs中TCP粘包、分包解决方案！</h2>\n<p><a href=\"https://github.com/lvgithub/stickPackage.git\">持续更新，源码地址，喜欢的话请点star，想订阅点watch</a></p>\n<hr>\n<h2>目录</h2>\n<ul>\n<li>安装</li>\n<li>配置介绍</li>\n<li>API</li>\n<li>更新记录</li>\n<li>使用方法</li>\n<li>案例演示</li>\n</ul>\n<hr>\n<h2>安装</h2>\n<pre class=\"prettyprint\"><code>npm i stickpackage\n</code></pre><hr>\n<h2>配置介绍</h2>\n<ul>\n<li>[x] 提供对TCP粘包处理的解决方案</li>\n<li>[x] 默认缓冲512个字节，当接收数据超过512字节，自动以512倍数扩大缓冲空间</li>\n<li>[x] 本默认采用包头两个字节表示包长度</li>\n<li>[x] 默认采用大端接模式接收数据</li>\n<li>[x] 可以配置大端小端读取</li>\n<li>[x] 可以配置自定义包头长度</li>\n<li>[x] 支持自动拆解包</li>\n</ul>\n<hr>\n<h2>API</h2>\n<ul>\n<li>stick(bufferSize) =&gt; 直接处理字节类型的包</li>\n</ul>\n<pre class=\"prettyprint\"><code>    bufferSize:设置stick处理粘包的缓存空间\n</code></pre><ul>\n<li>stick.setReadIntBE(type) =&gt; 设置为大端模式&lt;依据数据包最大值选择合适type&gt;</li>\n</ul>\n<pre class=\"prettyprint\"><code>    setReadIntBE(type)  type:16  包头长度为2,short类型\n    setReadIntBE(type)  type:32  包头长度为4,int类型\n</code></pre><ul>\n<li>stick.setReadIntLE =&gt; 设置为小端模式&lt;依据数据包最大值选择合适type&gt;</li>\n</ul>\n<pre class=\"prettyprint\"><code>    setReadIntLE(type)  type:16  包头长度为2,short类型\n    setReadIntLE(type)  type:32  包头长度为4,int类型\n</code></pre><ul>\n<li>stick.putData(buffer) =&gt; 向stick中推送需要处理粘包的字节流</li>\n<li>stick.onData(buffer) =&gt; 监听stick解包好的一个个完整消息(包头+包体),用户自己的数据存储在包体中，如果不想处理包头用msgCenter已经封装好</li>\n<li>msgCenter(options) =&gt; 可直接发送字符串消息,基于stick封装，屏蔽stick层需要自己组装包头和拆包头的步骤</li>\n</ul>\n<pre class=\"prettyprint\"><code>    options.bufferSize: 设置用户处理粘包的缓存空间\n    options.type：设置包头为16位或者32位模式(16|32)\n    options.bigEndian: 设置大端、小端字节流模式,默认为打断模式,为false时为小端模式(true|false)\n</code></pre><ul>\n<li>msgCenter.putMsg(msg) =&gt; 向消息中心推送字符串消息</li>\n<li>msgCenter.publish(msg) =&gt; 发布一个消息,返回一个被打包好的buffer(包头+包体),用户clent发包时使用</li>\n</ul>\n<pre class=\"prettyprint\"><code>    msgCenter.publish(&#x27;123&#x27;) \n    =&gt; &lt;Buffer 00 03 31 32 33&gt; &#x2F;&#x2F; 00 03 包长度  31 32 33 字符串123的ascii码\n</code></pre><ul>\n<li>msgCenter.onMsgRecv(msgHandleFun) =&gt; 处理经过粘包处理后的消息</li>\n</ul>\n<pre class=\"prettyprint\"><code>    msgHandleFun:业务上处理消息的函数\n    msgCenter.onMsgRecv(msg =&gt; {\n        console.log(&#96;recv data: &#96; + msg.toString())\n        ...do something\n    })\n</code></pre><hr>\n<h2>更新记录:</h2>\n<ul>\n<li>设置大端,小端接收,添加setReadIntBE,添加setReadIntLE方法</li>\n<li>支持直接发送字符串消息,自动化组装包头</li>\n</ul>\n<hr>\n<h2>使用方法</h2>\n<ul>\n<li>服务端处理粘包</li>\n</ul>\n<pre class=\"prettyprint\"><code>    &#x2F;&#x2F; 默认client.js 采用 msgCenter.publish(&#x27;...&#x27;) 向服务端发消息\n    &#x2F;&#x2F; 以下是服务端收到消息后，进行粘包处理\n    const MsgCenter = require(&#x27;stickpackage&#x27;).msgCenter\n    const msgCenter = new MsgCenter()\n\n    &#x2F;&#x2F; server 监听分包后的消息\n    msgCenter.onMsgRecv(data =&gt; {\n        console.log(&#96;recv data: &#96; + data.toString())\n    })\n\n    &#x2F;&#x2F; 把 tcp server 监听到的字节流，put到msgCenter中\n    msgCenter.putData(Buffer.from([0x00, 0x02, 0x31, 0x32, 0x00, 0x04, 0x31, 0x32, 0x33, 0x34]))\n    &#x2F;&#x2F;=&gt; recv data: 12\n    &#x2F;&#x2F;=&gt; recv data: 1234\n\n</code></pre><hr>\n<ul>\n<li>发送二进制数据</li>\n</ul>\n<pre class=\"prettyprint\"><code>    &#x2F;&#x2F; 默认client.js 采用 stick 配置的组包式向服务器发送消息\n    &#x2F;&#x2F; 以下是服务端收到消息后，进行粘包处理\n\n    const Stick = require(&#x27;stickpackage&#x27;).stick;\n    const stick = new Stick(1024).setReadIntBE(&#x27;16&#x27;)\n\n    &#x2F;*\n    *  包含两个数据包,10个字节,包头为short，两个字节：[0x00, 0x02],[ 0x00, 0x04]\n    *  数据包1:[0x00, 0x02, 0x66, 0x66]\n    *  数据包2:[0x00, 0x04, 0x88, 0x02, 0x11, 0x11]\n    *&#x2F;\n    const data = Buffer.from([0x00, 0x02, 0x66, 0x66, 0x00, 0x04, 0x88, 0x02, 0x11, 0x11]);\n\n    &#x2F;*  构造两个buffer\n    *   data2_1包含:  第一个数据包的全部数据,第二个数据包的部分数据\t\n    *   data2_2包含:  第二个数据包的剩余数据\n    *&#x2F;\n    const data2_1 = Buffer.from([0x00, 0x00, 0x00, 0x02, 0x66, 0x66, 0x00, 0x04, 0x88, 0x02, 0x11]);\n    const data2_2 = Buffer.from([0x11]);\n\n    &#x2F;&#x2F; 设置收到完整数据触发器\n    stick.onData(function (data) {\n        console.log(&#x27;receive data,length:&#x27; + data.length);\n        console.log(data)\n    });\n\n    stick.putData(data);        \n    stick.putData(data2_1);\n    stick.putData(data2_2);  \n\n    &#x2F;&#x2F;  运行结果：   \n    &#x2F;&#x2F;  receive data,length:4 &lt;Buffer 00 02 66 66&gt;  \n    &#x2F;&#x2F;  receive data,length:6 &lt;Buffer 00 04 88 02 11 11&gt;\n    &#x2F;&#x2F;  receive data,length:2 &lt;Buffer 00 00&gt; receive data, length:4 &lt; Buffer 00 02 66 66&gt; receive data, length:6&lt; Buffer 00 04 88 02 11 11&gt;\n</code></pre><hr>\n<h2>案例演示</h2>\n<ul>\n<li>tcp client和tcp server 之间通过stick进行粘包处理通信,详细内容见example文件夹</li>\n<li>[tcp-msg]本demo主要演示TCP中处理粘包的方法，不需要自己组装包头，直接发送和接收文本消息，组包解包操作本类库已经封装在底层</li>\n</ul>\n<pre class=\"prettyprint\"><code>&#x2F;&#x2F; Client.js\n    const net = require(&#x27;net&#x27;)\n    const stick = require(&#x27;..&#x2F;..&#x2F;index&#x27;)\n    const msgCenter = new stick.msgCenter()\n\n    const client = net.createConnection({ port: 8080, host: &#x27;127.0.0.1&#x27; }, function () {\n\n    const msgBuffer = msgCenter.publish(&#x27;username=123&amp;password=1234567,qwe&#x27;)\n\n    client.write(msgBuffer)\n\n})\n\n    client.on(&#x27;data&#x27;, function (data) {\n        console.log(data.toString())\n    })\n    client.on(&#x27;end&#x27;, function () {\n        console.log(&#x27;disconnect from server&#x27;)\n    })\n</code></pre><pre class=\"prettyprint\"><code>&#x2F;&#x2F; Server.js\n    const net = require(&#x27;net&#x27;)\n    const stick = require(&#x27;..&#x2F;..&#x2F;index&#x27;)\n\n    const tcp_server = net.createServer(function (socket) {\n        const msgCenter = new stick.msgCenter()\n\n        socket.on(&#x27;data&#x27;, function (data) {\n            msgCenter.putData(data)\n        })\n\n        msgCenter.onMsgRecv(function (data) {\n            console.log(&#x27;recv data: &#x27; + data.toString())\n        })\n\n        socket.on(&#x27;close&#x27;, function (error) {\n            console.log(&#x27;client disconnected&#x27;)\n        })\n\n        socket.on(&#x27;error&#x27;, function (error) {\n            console.log(&#96;error:客户端异常断开: ${error}&#96;)\n        })\n    })\n\n    tcp_server.on(&#x27;error&#x27;, function (err) {\n        throw err\n    })\n    tcp_server.listen(8080, function () {\n        console.log(&#x27;tcp_server listening on 8080&#x27;)\n    })\n</code></pre><ul>\n<li>[tcp-buffer]本demo主要演示TCP中直接处理字节流粘包，展示出如何自己组装包头包体和解包,如不向自己进行组装包头解包操作，请看demo tcp-msg</li>\n</ul>\n<pre class=\"prettyprint\"><code>&#x2F;&#x2F; Clinet.js\n    const net = require(&#x27;net&#x27;)\n\n    const client = net.createConnection({ port: 8080, host: &#x27;127.0.0.1&#x27; }, function () {\n        const body = Buffer.from(&#x27;username=123&amp;password=1234567,qwe&#x27;)\n\n        &#x2F;&#x2F; 写入包头\n        const headBuf = new Buffer(4)\n        headBuf.writeUInt32BE(body.byteLength, 0)\n        console.log(&#x27;data length: &#x27; + headBuf.readInt32BE())\n\n        &#x2F;&#x2F; 发送包头\n        client.write(headBuf)\n        &#x2F;&#x2F; 发送包内容\n        client.write(body)\n        console.log(&#x27;data body: &#x27; + body.toString())\n\n    })\n\n    client.on(&#x27;data&#x27;, function (data) {\n        console.log(data.toString())\n    })\n    client.on(&#x27;end&#x27;, function () {\n        console.log(&#x27;disconnect from server&#x27;)\n    })\n</code></pre><pre class=\"prettyprint\"><code>&#x2F;&#x2F; Server.js\n    const net = require(&#x27;net&#x27;)\n    const stick_package = require(&#x27;..&#x2F;..&#x2F;index&#x27;).stick\n\n    const tcp_server = net.createServer(function (socket) {\n        socket.stick = new stick_package(1024).setReadIntBE(&#x27;32&#x27;)\n        socket.on(&#x27;data&#x27;, function (data) {\n            socket.stick.putData(data)\n        })\n\n        socket.stick.onData(function (data) {\n            &#x2F;&#x2F; 解析包头长度\n            const head = new Buffer(4)\n            data.copy(head, 0, 0, 4)\n\n            &#x2F;&#x2F; 解析数据包内容\n            const body = new Buffer(head.readInt32BE())\n            data.copy(body, 0, 4, head.readInt32BE())\n\n            console.log(&#x27;data length: &#x27; + head.readInt32BE())\n            console.log(&#x27;body content: &#x27; + body.toString())\n        })\n\n        socket.on(&#x27;close&#x27;, function (error) {\n            console.log(&#x27;client disconnected&#x27;)\n        })\n\n        socket.on(&#x27;error&#x27;, function (error) {\n            console.log(&#96;error:客户端异常断开: ${error}&#96;)\n        })\n    })\n\n    tcp_server.on(&#x27;error&#x27;, function (err) {\n        throw err\n    })\n    tcp_server.listen(8080, function () {\n        console.log(&#x27;tcp_server listening on 8080&#x27;)\n    })\n</code></pre><hr>\n<h2><a href=\"https://github.com/lvgithub/stickPackage.git\">源码地址，喜欢的话请点star，想订阅点watch</a></h2>\n</div>",
            "title": "tcp 粘包处理方案升级版(带TCP通信demo)",
            "last_reply_at": "2019-08-21T11:32:36.952Z",
            "good": false,
            "top": false,
            "reply_count": 21,
            "visit_count": 6900,
            "create_at": "2017-12-02T14:59:08.964Z",
            "author": {
                "loginname": "lvgithub",
                "avatar_url": "https://avatars1.githubusercontent.com/u/16065346?v=4&s=120"
            }
        },
        {
            "id": "5d5a723ed53e9171e98a92db",
            "author_id": "55c56e8a39273b9219336288",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><p><img src=\"https://raw.githubusercontent.com/timqian/images/master/20190819131226.gif\" alt></p>\n<h2>如何食用</h2>\n<ul>\n<li>github 地址: <a href=\"http://github.com/timqian/chart.xkcd\">github.com/timqian/chart.xkcd</a></li>\n<li>正在写作中的文档: <a href=\"http://timqian.com/chart.xkcd\">timqian.com/chart.xkcd</a></li>\n<li>在 codepen 上试用\n<ul>\n<li><a href=\"https://codepen.io/timqian/pen/GRKqLaL\">line chart</a></li>\n<li><a href=\"https://codepen.io/timqian/pen/VwZjOPR\">pie chart</a></li>\n<li><a href=\"https://codepen.io/timqian/pen/QWLERdG\">bar chart</a></li>\n</ul>\n</li>\n</ul>\n<h2>为什么要做手绘风格的图表库</h2>\n<p>市面上已经有很多成熟的图表库了, chart.js, echart,… 都可以画出精美而准确的图表. 但有些时候, 我们不想图表看起来那么准确.</p>\n<p>比如我之前做的查看 github 项目 star 历史的工具 <a href=\"https://github.com/timqian/star-history\">star-history</a>. 某个时间点的 star 数其实没有意义, 我们想要了解的是项目的趋势. 对于这种图表, 手绘风格可能更加适合</p>\n<p>虽然已经花了 2 周多时间了, 但因为缺乏制作图表库方面的经验, 磕磕绊绊得做了三个常用图表, 也还存在者挺多已知和未知的 bug, 之后计划加入更多图表, 欢迎大家的试用和建议</p>\n</div>",
            "title": "做了一个 xkcd 风格 (手绘风格) 的图表库",
            "last_reply_at": "2019-08-21T11:29:30.308Z",
            "good": false,
            "top": false,
            "reply_count": 7,
            "visit_count": 446,
            "create_at": "2019-08-19T09:56:14.947Z",
            "author": {
                "loginname": "timqian",
                "avatar_url": "https://avatars3.githubusercontent.com/u/5512552?v=4&s=120"
            }
        },
        {
            "id": "57e17beac4ae8ff239776de5",
            "author_id": "57ddffa7b11d78e3659db597",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><h3>关于axios在node中的post使用</h3>\n<h4>起因：</h4>\n<ul>\n<li>最近做的东西需要用到网络请求库，之前接触过的只有request，很强大好用。但是这个项目中需要用到Promise，我又不想重新封装，于是选择了另一款库axios。</li>\n<li>在node中，axios的get请求加上原生支持的Promise语法使用起来很方便，很丝滑，但是后面碰到了一个需求，就是要向另一个服务器post数据，并且这个数据是以form-data的形式post过去的，这时，问题就出现了。</li>\n</ul>\n<h4>问题：</h4>\n<ul>\n<li>当我想在node中使用axios以post的方式发送一张图片给某个server时，最先我是尝试这样做：<strong>方案一</strong></li>\n</ul>\n<pre class=\"prettyprint language-js\"><code>\t\tlet data = fs.createReadStream(__dirname + &#x27;&#x2F;test.jpg&#x27;)\n\t\taxios.post(url,{media:data,type:&quot;image&quot;})\n\t\t.then(function (response) {\n\t\tconsole.log(response.data);\n\t\t})\n\t\t.catch(function (error) {\n\t\tconsole.log(error);\n\t\t})\n</code></pre><p>事实证明，这样做是完全没有用的，我尝试向另一个服务器poststream，返回的总是错误。然而，如果我使用request，下面这样的代码是完全没有问题的：<strong>方案二</strong></p>\n<pre class=\"prettyprint language-js\"><code>\t\tlet data = fs.createReadStream(__dirname + &#x27;&#x2F;test.jpg&#x27;)\n\t\tlet form = {\n\t\ttype:&quot;image&quot;,\n\t\tmedia:data\n\t\t}\n\t\t\n\t\trequest.post({url:url,formData:form},(err,res,body)=&gt;{\n\t\tif(err) console.log(err)\n\t\tconsole.log(body)\n\t\t})\n</code></pre><h4>探索：</h4>\n<ul>\n<li>于是，我陷入了思考，WTF！！\n<ul>\n<li>我打算简单的写一个服务器，用于打印HTTP请求，然后查看区别（别问我为什么不用抓包工具，任性！），代码呼之欲出：</li>\n</ul>\n<pre class=\"prettyprint language-javascript\"><code>\timport Koa from &#x27;koa&#x27;\n\n\tconst app = new Koa()\n\n\tapp.use(ctx=&gt;{\n\t\tconsole.log(&quot;===============================================&quot;)\n\t\tconsole.log(ctx.request)\n\t\tconsole.log(&quot;===============================================&quot;)\n\t\tctx.body = {foo:&quot;bar&quot;}\n\t})\n\n\tapp.listen(3000,()=&gt;{\n\t\tconsole.log(&quot;listening on 3000 port&quot;)\n\t})\n</code></pre><ul>\n<li>此时，将url设置为:<code>http://127.0.0.1:3000/</code>,再分别执行<strong>方案一</strong>和<strong>方案二</strong>\n这时打印出了这样的结果：</li>\n</ul>\n</li>\n</ul>\n<pre class=\"prettyprint\"><code>\t listening on 3000 port\n\t ===============================================\n\t { method: &#x27;POST&#x27;,\n\t url: &#x27;&#x2F;&#x27;,\n\t header: \n\t { accept: &#x27;application&#x2F;json, text&#x2F;plain, *&#x2F;*&#x27;,\n\t &#x27;content-type&#x27;: &#x27;application&#x2F;json;charset=utf-8&#x27;,\n\t &#x27;user-agent&#x27;: &#x27;axios&#x2F;0.14.0&#x27;,\n\t &#x27;content-length&#x27;: &#x27;587&#x27;,\n\t host: &#x27;127.0.0.1:3000&#x27;,\n\t connection: &#x27;close&#x27; } }\n\t ===============================================\n\t ===============================================\n\t { method: &#x27;POST&#x27;,\n\t url: &#x27;&#x2F;&#x27;,\n\t header: \n\t { host: &#x27;127.0.0.1:3000&#x27;,\n\t &#x27;content-type&#x27;: &#x27;multipart&#x2F;form-data; boundary=--------------------------949095406788084443059291&#x27;,\n\t &#x27;content-length&#x27;: &#x27;186610&#x27;,\n\t connection: &#x27;close&#x27; } }\n\t ===============================================\n</code></pre><pre class=\"prettyprint\"><code>- 上面的是方案一，下面的是方案二\n</code></pre><ul>\n<li>这时可以看出，方案一和二的差别最明显的是<code>content-type</code>,是的，这也是决定了方案一不可行的因素。\n既然是<code>content-type</code>导致的，那么方案一PLUS就比较明了了，查阅axios的文档后，我决定手动设置<code>content-type</code>，于是乎：</li>\n</ul>\n<pre class=\"prettyprint language-js\"><code>\t\tlet data = fs.createReadStream(__dirname + &#x27;&#x2F;test.jpg&#x27;)\n\t\tlet header = {\n\t\t\t&#x27;content-type&#x27;: &#x27;multipart&#x2F;form-data&#x27;\n\t\t}\n\t\taxios.post(url,{media:data,type:&quot;image&quot;},{headers:header})\n\t\t.then(function (response) {\n\t\t\tconsole.log(response.data);\n\t\t})\n\t\t.catch(function (error) {\n\t\t\tconsole.log(error);\n\t\t})\n</code></pre><pre class=\"prettyprint\"><code>- 这时，请求是这样的：\n</code></pre><pre class=\"prettyprint\"><code>    ===============================\n    { method: &#x27;POST&#x27;,\n      url: &#x27;&#x2F;&#x27;,\n      header: \n       { accept: &#x27;application&#x2F;json, text&#x2F;plain, *&#x2F;*&#x27;,\n         &#x27;content-type&#x27;: &#x27;multipart&#x2F;form-data&#x27;,\n         &#x27;user-agent&#x27;: &#x27;axios&#x2F;0.14.0&#x27;,\n         &#x27;content-length&#x27;: &#x27;587&#x27;,\n         host: &#x27;127.0.0.1:3000&#x27;,\n         connection: &#x27;close&#x27; } }\n    ================================\n</code></pre><p>貌似差别不大，但我先试着往服务器post数据时，仍然返回错误。实际上这时候没有<code>boundary</code>，文件其实并没有被绑定上去，所以现在仍然没有解决问题。至于boundary,这里有个<a href=\"http://stackoverflow.com/questions/3508338/what-is-the-boundary-in-multipart-form-data\">链接</a>非常能说明问题。</p>\n<ul>\n<li>到这里，我们就要耐下心来好好思考了，区别就在于，request中能够设置正确的请求头，那么它是怎么办到的呢，于是我开始翻看request的源码，发现了这一段：</li>\n</ul>\n<pre class=\"prettyprint language-javascript\"><code>\t\tif (options.formData) {\n\t\t\tvar formData = options.formData\n\t\t\tvar requestForm = self.form()\n\t\t\tvar appendFormValue = function (key, value) {\n\t\t\t  if (value &amp;&amp; value.hasOwnProperty(&#x27;value&#x27;) &amp;&amp; value.hasOwnProperty(&#x27;options&#x27;)) {\n\t\t\t\trequestForm.append(key, value.value, value.options)\n\t\t\t  } else {\n\t\t\t\trequestForm.append(key, value)\n\t\t\t  }\n\t\t\t}\n\t\t\tfor (var formKey in formData) {\n\t\t\t  if (formData.hasOwnProperty(formKey)) {\n\t\t\t\tvar formValue = formData[formKey]\n\t\t\t\tif (formValue instanceof Array) {\n\t\t\t\t  for (var j = 0; j &lt; formValue.length; j++) {\n\t\t\t\t\tappendFormValue(formKey, formValue[j])\n\t\t\t\t  }\n\t\t\t\t} else {\n\t\t\t\t  appendFormValue(formKey, formValue)\n\t\t\t\t}\n\t\t\t  }\n\t\t\t}\n\t\t  }\n</code></pre><p>这一段是request在初始化参数中的formData，其中调用了它自身的form()方法，追踪这个函数：</p>\n<pre class=\"prettyprint language-javascript\"><code>\t\tRequest.prototype.form = function (form) {\n\t\t  var self = this\n\t\t  if (form) {\n\t\t\tif (!&#x2F;^application\\&#x2F;x-www-form-urlencoded\\b&#x2F;.test(self.getHeader(&#x27;content-type&#x27;))) {\n\t\t\t  self.setHeader(&#x27;content-type&#x27;, &#x27;application&#x2F;x-www-form-urlencoded&#x27;)\n\t\t\t}\n\t\t\tself.body = (typeof form === &#x27;string&#x27;)\n\t\t\t  ? self._qs.rfc3986(form.toString(&#x27;utf8&#x27;))\n\t\t\t  : self._qs.stringify(form).toString(&#x27;utf8&#x27;)\n\t\t\treturn self\n\t\t  }\n\t\t  &#x2F;&#x2F; create form-data object\n\t\t  self._form = new FormData()\n\t\t  self._form.on(&#x27;error&#x27;, function(err) {\n\t\t\terr.message = &#x27;form-data: &#x27; + err.message\n\t\t\tself.emit(&#x27;error&#x27;, err)\n\t\t\tself.abort()\n\t\t  })\n\t\t  return self._form\n\t\t}\n</code></pre><p>发现了request调用了另一个库<code>form-data</code>，先通过self.form()创建出一个formData对象，再遍历options里的formData项，递归地将内容通过formData的append方法放进去，也就是说是formData实现了post文件，于是乎，我在axios中插入formData，形成了<strong>方案三</strong>：</p>\n<ul>\n<li>方案三：<pre class=\"prettyprint language-javascript\"><code>\tlet data = fs.createReadStream(__dirname + &#x27;&#x2F;test.jpg&#x27;)\n\tlet form = new FormData()\n\tform.append(&#x27;type&#x27;,&#x27;image&#x27;)\n\tform.append(&#x27;media&#x27;,data,&#x27;test.jpg&#x27;)\n\n\taxios.post(url,form).then((response)=&gt;{\n\t\tconsole.log(response.data)\n\t})\n\t.catch(e=&gt;{console.log(e)})\n</code></pre></li>\n</ul>\n<p>但是，事实告诉我，我还是悲剧了，请求打印出来是这样的：</p>\n<pre class=\"prettyprint\"><code>\t\t===============================================\n\t\t{ method: &#x27;POST&#x27;,\n\t\t  url: &#x27;&#x2F;&#x27;,\n\t\t  header: \n\t\t   { accept: &#x27;application&#x2F;json, text&#x2F;plain, *&#x2F;*&#x27;,\n\t\t\t &#x27;content-type&#x27;: &#x27;application&#x2F;x-www-form-urlencoded&#x27;,\n\t\t\t &#x27;user-agent&#x27;: &#x27;axios&#x2F;0.14.0&#x27;,\n\t\t\t host: &#x27;127.0.0.1:3000&#x27;,\n\t\t\t connection: &#x27;close&#x27;,\n\t\t\t &#x27;transfer-encoding&#x27;: &#x27;chunked&#x27; } }\n\t\t===============================================\n</code></pre><p>再次<code>content-type</code>还是不对，于是我再去翻axios的文档和issue，发现，默认设置的<code>content-type</code>就是<code>application/x-www-form-urlencoded</code>，于是我判断，一定还是要手动设置headers的</p>\n<ul>\n<li>于是，基于<strong>方案三</strong>，我又添加了和改动了这两行形成了<strong>方案四</strong>：<pre class=\"prettyprint language-javascript\"><code>\tlet header = {\n\t\t&#x27;content-type&#x27;: &#x27;multipart&#x2F;form-data&#x27;\n\t}\n\n\taxios.post(url,form,{headers:header}).then((response)=&gt;{\n\t\tconsole.log(response.data)\n\t})\n</code></pre></li>\n</ul>\n<p>但结果还是不理想，直接设置content-type是不行的，因为要将待发送文件绑定，就一定会有<code>boundary</code>出现，另外在<strong>方案三</strong>和<strong>方案四</strong>的请求中，出现了<code>transfer-encoding</code>这个值，关于这个<code>chunked</code>,可以参考<a href=\"https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Transfer-Encoding\">MDN</a>和这篇<a href=\"http://www.cnblogs.com/jcli/archive/2012/10/19/2730440.html\">博客</a></p>\n<ul>\n<li>一边google一边看文档的我，发现formData的文档中出现过form.getHeaders()的写法，于是<strong>方案五</strong>出现了：<pre class=\"prettyprint language-javascript\"><code>\tlet data = fs.createReadStream(__dirname + &#x27;&#x2F;test.jpg&#x27;)\n\tlet form = new FormData()\n\tform.append(&#x27;type&#x27;,&#x27;image&#x27;)\n\tform.append(&#x27;media&#x27;,data,&#x27;test.jpg&#x27;)\n\n\taxios.post(url,form,{headers:form.getHeaders()}).then((response)=&gt;{\n\t\tconsole.log(response.data)\n\t})\n\t.catch(e=&gt;{console.log(e)})\n</code></pre></li>\n</ul>\n<p>但是结果表明，这样还是不行，现在的请求是这样：</p>\n<pre class=\"prettyprint\"><code>\t\t===============================================\n\t\t{ method: &#x27;POST&#x27;,\n\t\t  url: &#x27;&#x2F;&#x27;,\n\t\t  header: \n\t\t   { accept: &#x27;application&#x2F;json, text&#x2F;plain, *&#x2F;*&#x27;,\n\t\t\t &#x27;content-type&#x27;: &#x27;multipart&#x2F;form-data; boundary=--------------------------171407872885673042671614&#x27;,\n\t\t\t &#x27;user-agent&#x27;: &#x27;axios&#x2F;0.14.0&#x27;,\n\t\t\t host: &#x27;127.0.0.1:3000&#x27;,\n\t\t\t connection: &#x27;close&#x27;,\n\t\t\t &#x27;transfer-encoding&#x27;: &#x27;chunked&#x27; } }\n\t\t===============================================\n</code></pre><p>但是我目前项目需求是，不使用<code>chunked</code>而采用<code>content-length</code>的方法来传输，这意味着，我要想办法搞到form的长度</p>\n<ul>\n<li>在成功案例中，使用requests，于是我翻看了部分源码：\n在<code>request/request.js</code>里出现了</li>\n</ul>\n<pre class=\"prettyprint language-javascript\"><code>\t\tfunction setContentLength () {\n\t\t\tif (isTypedArray(self.body)) {\n\t\t\t  self.body = new Buffer(self.body)\n\t\t\t}\n\t\t\n\t\t\tif (!self.hasHeader(&#x27;content-length&#x27;)) {\n\t\t\t  var length\n\t\t\t  if (typeof self.body === &#x27;string&#x27;) {\n\t\t\t\tlength = Buffer.byteLength(self.body)\n\t\t\t  }\n\t\t\t  else if (Array.isArray(self.body)) {\n\t\t\t\tlength = self.body.reduce(function (a, b) {return a + b.length}, 0)\n\t\t\t  }\n\t\t\t  else {\n\t\t\t\tlength = self.body.length\n\t\t\t  }\n\t\t\n\t\t\t  if (length) {\n\t\t\t\tself.setHeader(&#x27;content-length&#x27;, length)\n\t\t\t  } else {\n\t\t\t\tself.emit(&#x27;error&#x27;, new Error(&#x27;Argument error, options.body.&#x27;))\n\t\t\t  }\n\t\t\t}\n\t\t  }\n</code></pre><p>它采用Buffer来计算长度，然后添加到headers中去</p>\n<ul>\n<li>然后看看在axios里是如何做的：\n<code>axios/lib/adapters/http.js</code>里出现了</li>\n</ul>\n<pre class=\"prettyprint language-javascript\"><code>\t\tif (data &amp;&amp; !utils.isStream(data)) {\n\t\t\t  if (utils.isArrayBuffer(data)) {\n\t\t\t\tdata = new Buffer(new Uint8Array(data));\n\t\t\t  } else if (utils.isString(data)) {\n\t\t\t\tdata = new Buffer(data, &#x27;utf-8&#x27;);\n\t\t\t  } else {\n\t\t\t\treturn reject(createError(\n\t\t\t\t  &#x27;Data after transformation must be a string, an ArrayBuffer, or a Stream&#x27;,\n\t\t\t\t  config\n\t\t\t\t));\n\t\t\t  }\n\t\t\n\t\t\t  &#x2F;&#x2F; Add Content-Length header if data exists\n\t\t\t  headers[&#x27;Content-Length&#x27;] = data.length;\n\t\t\t}\n</code></pre><p>下文并没有出现else，所以，当data是stream的时候，并没有自动设置<code>content-length</code>\n所以，我需要在formData.getHeaders()后，再添加一个<code>content-length</code>的key</p>\n<ul>\n<li>想要计算长度，自然想到去看看源码，于是在<code>form-data/lib/form_data.js</code>中出现了惊喜:</li>\n</ul>\n<pre class=\"prettyprint language-javascript\"><code>\t\tFormData.prototype.getLength = function(cb) {\n\t\t  var knownLength = this._overheadLength + this._valueLength;\n\t\t\n\t\t  if (this._streams.length) {\n\t\t\tknownLength += this._lastBoundary().length;\n\t\t  }\n\t\t\n\t\t  if (!this._valuesToMeasure.length) {\n\t\t\tprocess.nextTick(cb.bind(this, null, knownLength));\n\t\t\treturn;\n\t\t  }\n\t\t\n\t\t  asynckit.parallel(this._valuesToMeasure, this._lengthRetriever, function(err, values) {\n\t\t\tif (err) {\n\t\t\t  cb(err);\n\t\t\t  return;\n\t\t\t}\n\t\t\n\t\t\tvalues.forEach(function(length) {\n\t\t\t  knownLength += length;\n\t\t\t});\n\t\t\n\t\t\tcb(null, knownLength);\n\t\t  });\n\t\t};\n</code></pre><p>formData已经封装好了得到长度的方法，只不过它是异步的，不过没关系，在实际项目中，可以将它手动Promise化。<strong>最终方案</strong>的代码也就自然出现了：</p>\n<ul>\n<li>方案六：</li>\n</ul>\n<pre class=\"prettyprint language-javascript\"><code>\t\tlet data = fs.createReadStream(__dirname + &#x27;&#x2F;test.jpg&#x27;)\n\t\tlet form = new FormData()\n\t\tform.append(&#x27;type&#x27;,&#x27;image&#x27;)\n\t\tform.append(&#x27;media&#x27;,data,&#x27;test.jpg&#x27;)\n\t\tform.getLength((err,length)=&gt;{\n\t\t\tif(err) console.log(err)\n\t\t\tlet headers = Object.assign({&#x27;Content-Length&#x27;:length},form.getHeaders())\n\t\t\taxios.post(url,form,{headers:headers}).then((response)=&gt;{\n\t\t\t\tconsole.log(response.data)\n\t\t\t})\n\t\t\t.catch(e=&gt;{console.log(e)})\n\t\t})\n</code></pre><p>这时的请求打印后是这样的：</p>\n<pre class=\"prettyprint\"><code>\t\t===============================================\n\t\t{ method: &#x27;POST&#x27;,\n\t\turl: &#x27;&#x2F;&#x27;,\n\t\theader: \n\t\t{ accept: &#x27;application&#x2F;json, text&#x2F;plain, *&#x2F;*&#x27;,\n\t\t&#x27;content-type&#x27;: &#x27;multipart&#x2F;form-data; boundary=--------------------------424584867554529984619649&#x27;,\n\t\t&#x27;content-length&#x27;: &#x27;186610&#x27;,\n\t\t&#x27;user-agent&#x27;: &#x27;axios&#x2F;0.14.0&#x27;,\n\t\thost: &#x27;127.0.0.1:3000&#x27;,\n\t\tconnection: &#x27;close&#x27; } }\n\t\t===============================================\n</code></pre><p>事实证明它是可以工作的。</p>\n<ul>\n<li>更进一步，我们把异步代码Promise一下,得到<strong>最终方案</strong>:<pre class=\"prettyprint language-javascript\"><code>\tlet data = fs.createReadStream(__dirname + &#x27;&#x2F;test.jpg&#x27;)\n\tlet form = new FormData()\n\tform.append(&#x27;type&#x27;,&#x27;image&#x27;)\n\tform.append(&#x27;media&#x27;,data,&#x27;test.jpg&#x27;)\n\n\tlet getHeaders = (form=&gt;{\n\t\treturn new Promise((resolve,reject)=&gt;{\n\t\t\tform.getLength((err,length)=&gt;{\n\t\t\t\tif(err) reject(err)\n\t\t\t\tlet headers = Object.assign({&#x27;Content-Length&#x27;:length},form.getHeaders())\n\t\t\t\tresolve(headers)\n\t\t\t})\n\t\t})\n\t})\n\n\tgetHeaders(form)\n\t.then(headers=&gt;{\n\t\treturn axios.post(url,form,{headers:headers})\n\t})\n\t.then((response)=&gt;{\n\t\tconsole.log(response.data)\n\t})\n\t.catch(e=&gt;{console.log(e)})\n</code></pre></li>\n</ul>\n<h4>最后：</h4>\n<p>得到一个结论，多多看issue，多多看源码，多多了解基础知识（HTTP协议），对于问题的解决十分重要。最后这一套的实验代码放在github上了，需要研究研究的同学们可以看看:<a href=\"https://github.com/chux0519/axios-request\">axios-request</a></p>\n</div>",
            "title": "关于axios在node中post的使用",
            "last_reply_at": "2019-08-21T10:38:24.937Z",
            "good": false,
            "top": false,
            "reply_count": 13,
            "visit_count": 47148,
            "create_at": "2016-09-20T18:11:54.404Z",
            "author": {
                "loginname": "chux0519",
                "avatar_url": "https://avatars1.githubusercontent.com/u/14276970?v=4&s=120"
            }
        },
        {
            "id": "5d5bc34012a01945444180c0",
            "author_id": "5d1c66a334bca667bc6e5023",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><p>有兴趣的可以瞧瞧代码不多，这是部署在我自己云服务器上 <a href=\"http://down.ningto.com\">http://down.ningto.com</a>。<br>\n平时拷烤文件还是蛮方便的，当一个小网盘在使用。<br>\n我的服务器只有1M带宽所以大家就不要试速度了，可以自己部署试试在内网是非常快的。<br>\n由于博客是对外的所以禁用掉了删除和移动操作<br>\n效果图：\n<img src=\"//static.cnodejs.org/FtSJSUkgEvNTJVhfxnHjwu_bYPVr\" alt=\"node_file_mng.png\">\n启动</p>\n<pre class=\"prettyprint\"><code>npm start\n</code></pre><p>dev使用nodemon启动</p>\n<pre class=\"prettyprint\"><code>npm install -g  nodemon\nnpm run dev\n</code></pre><p>部署使用pm2</p>\n<pre class=\"prettyprint\"><code>npm install pm2 -g \nnpm run deploy\n</code></pre><h1>文件管理</h1>\n<p>通过浏览器很方便的对远程文件进行管理</p>\n<h2>Download 下载</h2>\n<p>点击文件可以直接下载，也可以勾选下载多个文件</p>\n<h2>Delete 删除</h2>\n<p>可以同时删除多个文件和目录</p>\n<h2>Move 移动</h2>\n<p>将文件，目录移动到其他目录或者更改名字</p>\n<h2>Archive 打包</h2>\n<p>可以将多个文件或目录压缩成一个zip格式的文件进行下载</p>\n<h2>Upload 上传</h2>\n<p>可以批量上传文件</p>\n<h2>New Folder 新建目录</h2>\n<p>新建目录</p>\n<h2>sort 排序</h2>\n<p>默认是升序，点击标题切换排序</p>\n<ul>\n<li>Default Sort：不排序，显示的顺序就是文件所在服务器目录下的顺序</li>\n<li>Type Sort：文件类型排序，文件或目录</li>\n<li>Name Sort：根据名字排序</li>\n<li>Size Sort：大小排序</li>\n<li>Time Sort：时间排序</li>\n</ul>\n<blockquote>\n<p>单个文件上传大小限制为1G</p>\n</blockquote>\n</div>",
            "title": "用nodejs写了个文件管理的网页",
            "last_reply_at": "2019-08-21T09:38:51.379Z",
            "good": false,
            "top": false,
            "reply_count": 1,
            "visit_count": 390,
            "create_at": "2019-08-20T09:54:08.906Z",
            "author": {
                "loginname": "tujiaw",
                "avatar_url": "https://avatars0.githubusercontent.com/u/5338512?v=4&s=120"
            }
        },
        {
            "id": "5d5d0935421846662d983bad",
            "author_id": "553f7f8b2bd4939b1e90557a",
            "tab": "ask",
            "content": "<div class=\"markdown-text\"><p>线上用的是 KOA 框架，但是最进发现有内存泄露的问题。</p>\n<p>利用 losf -p 1441  // 1441 node 的进程\n有大量如下的 无效 TCP连接</p>\n<pre class=\"prettyprint\"><code>node    1441 root  633u     sock                0,7      0t0 1303582007 protocol: TCP\nnode    1441 root  634u     sock                0,7      0t0 1304269214 protocol: TCP\nnode    1441 root  635u     sock                0,7      0t0 1303710205 protocol: TCP\nnode    1441 root  636u     sock                0,7      0t0 1303582123 protocol: TCP\nnode    1441 root  637u     sock                0,7      0t0 1303775234 protocol: TCP\nnode    1441 root  638u     sock                0,7      0t0 1303610276 protocol: TCP\nnode    1441 root  639u     sock                0,7      0t0 1303611228 protocol: TCP\nnode    1441 root  640u     sock                0,7      0t0 1304141344 protocol: TCP\nnode    1441 root  641u     sock                0,7      0t0 1303660211 protocol: TCP\nnode    1441 root  642u     sock                0,7      0t0 1303661306 protocol: TCP\nnode    1441 root  643u     sock                0,7      0t0 1303661321 protocol: TCP\nnode    1441 root  644u     sock                0,7      0t0 1304409789 protocol: TCP\nnode    1441 root  645u     sock                0,7      0t0 1303661359 protocol: TCP\nnode    1441 root  646u     sock                0,7      0t0 1303560180 protocol: TCP\n</code></pre><p>netstat -an | awk ‘/^tcp/ {++y[$NF]} END {for(w in y) print w, y[w]}’   // 该命令显示的连接情况是正常的</p>\n<pre class=\"prettyprint\"><code>LAST_ACK 73\nLISTEN 8\nSYN_RECV 11\nCLOSE_WAIT 8\nESTABLISHED 121\nFIN_WAIT2 16\nTIME_WAIT 73\n</code></pre><p>但是利用 ss -s 命令\n有大量closed 的连接  跟 losf 命令显示的数量级大概是一致的</p>\n<pre class=\"prettyprint\"><code>Total: 1079 (kernel 1102)\nTCP:   1061 (estab 121, closed 851, orphaned 74, synrecv 0, timewait 57&#x2F;0), ports 0\n\nTransport Total     IP        IPv6\n1102      -         -\nRAW\t  0         0         0\nUDP\t  3         2         1\nTCP\t  210       37        173\nINET\t  213       39        174\nFRAG\t  0         0         0\n</code></pre><p>有没有大佬知道什么原因？</p>\n</div>",
            "title": "Koa socket 泄露的问题",
            "last_reply_at": "2019-08-21T09:04:53.390Z",
            "good": false,
            "top": false,
            "reply_count": 0,
            "visit_count": 488,
            "create_at": "2019-08-21T09:04:53.390Z",
            "author": {
                "loginname": "ChangMM",
                "avatar_url": "https://avatars0.githubusercontent.com/u/10186775?v=4&s=120"
            }
        },
        {
            "id": "5d52864f12a0194544416542",
            "author_id": "57fef4a9fdf3bd3d6511858f",
            "tab": "ask",
            "content": "<div class=\"markdown-text\"><p>想用egg-socket.io实现一个对弈的房间，包括两个player，其余为观战者</p>\n<p>看文档房间是用 <a href=\"https://github.com/socketio/socket.io-redis\">socket.io-redis</a>实现的，好像只能通过nsp.adapter.clients获取到房间内所有users，而每个user没有角色属性</p>\n<p>如果想实现这个需求应该怎么做，小白请教</p>\n<p>我理解好像不对，redis里没有存数据？只是做消息订阅发布？\n那请问，房间的信息，用户id这些存哪了，源码没看懂</p>\n</div>",
            "title": "使用egg-socket.io实现房间如何自定义房间属性",
            "last_reply_at": "2019-08-21T07:41:17.940Z",
            "good": false,
            "top": false,
            "reply_count": 5,
            "visit_count": 728,
            "create_at": "2019-08-13T09:43:43.932Z",
            "author": {
                "loginname": "IEfucker",
                "avatar_url": "https://avatars0.githubusercontent.com/u/3446876?v=4&s=120"
            }
        },
        {
            "id": "5507c24c53ad0efa46bc4fe3",
            "author_id": "5346577b4a4548d26e002499",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><p>尤其是在上海的，已经工作的。\n<img src=\"//static.cnodejs.org/FntYK3IAEbOoKL1ycJeqvjpjyRLH\" alt=\"1.pic.jpg\"></p>\n</div>",
            "title": "Node.js  微信群聊",
            "last_reply_at": "2019-08-21T07:39:40.874Z",
            "good": false,
            "top": false,
            "reply_count": 2,
            "visit_count": 4267,
            "create_at": "2015-03-17T05:57:32.210Z",
            "author": {
                "loginname": "wehtta",
                "avatar_url": "https://avatars.githubusercontent.com/u/5134256?v=3&s=120"
            }
        },
        {
            "id": "59da48aceab6a6536873ff29",
            "author_id": "598b49862d4b0af475035433",
            "tab": "ask",
            "content": "<div class=\"markdown-text\"><p>如题，不知这样的微信群是否已经存在，我的微信名：jc13125335</p>\n</div>",
            "title": "求一个 Node 微信群，只谈技术，项目",
            "last_reply_at": "2019-08-21T07:36:11.091Z",
            "good": false,
            "top": false,
            "reply_count": 9,
            "visit_count": 2135,
            "create_at": "2017-10-08T15:47:56.815Z",
            "author": {
                "loginname": "leavesdrift",
                "avatar_url": "https://avatars3.githubusercontent.com/u/26841163?v=4&s=120"
            }
        },
        {
            "id": "5d5382ca12a019454441677c",
            "author_id": "5d5381af12a0194544416770",
            "tab": "ask",
            "content": "<div class=\"markdown-text\"><p><img src=\"//static.cnodejs.org/FifsZE-dAZyRNUYsIjHbyiMgdrZ2\" alt=\"微信截图_20190814112945.png\"><img src=\"//static.cnodejs.org/FjBN1WITDRPzTNe_LYqA9fUR5OZ-\" alt=\"微信截图_20190814113043.png\"></p>\n</div>",
            "title": "mongoose连接不上数据库，求帮忙",
            "last_reply_at": "2019-08-21T03:52:50.772Z",
            "good": false,
            "top": false,
            "reply_count": 9,
            "visit_count": 637,
            "create_at": "2019-08-14T03:40:58.710Z",
            "author": {
                "loginname": "allenfwj",
                "avatar_url": "https://avatars1.githubusercontent.com/u/48193012?v=4&s=120"
            }
        },
        {
            "id": "5d5cbb25421846662d983a25",
            "author_id": "5d5104cc697873456c6bca69",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><p><img src=\"https://cdn.nlark.com/yuque/0/2019/png/208152/1565939536696-3e768b07-72ce-4605-8cb6-310a60278cf4.png\" alt=\"众测 Banner 01.png\"></p>\n<p><strong>Nebulan Graph 捉虫计划</strong> 是开源的分布式图数据库 —— Nebula 发起的「找 Bug」活动，旨在发动开源社区的力量共建图数据库 Nebula。</p>\n<blockquote>\n<p><a href=\"https://strace.co/r/cnode\">Nebula Graph</a>：一个开源的分布式图数据库。作为唯一能够存储万亿个带属性的节点和边的在线图数据库，Nebula Graph 不仅能够在高并发场景下满足毫秒级的低时延查询要求，还能够实现服务高可用且保障数据安全性。</p>\n</blockquote>\n<h3>🙋 如何参与捉虫</h3>\n<h4>提 issue</h4>\n<p>阅读 Nebula Graph 文档或 Clone 代码运行，发现当中存在文档错误、运行错误前往 Nebula Graph 的 GitHub 提 issue 或在 Nebula Graph 交流群里提交 issue 即可。</p>\n<h4>提 pr</h4>\n<p>优秀如你发现了一个 Bug，顺手修复该 Bug，欢迎前往 Nebula Graph 的 GitHub 提 pr。</p>\n<h3>✊什么是捉虫奖励</h3>\n<p>Nebula Graph 官方将会对提交的 issue &amp; pr 进行定级，每个级别的 issue 和 pr 有对应的积分，积分可累计兑换对应的奖品。</p>\n<p>*说明：如遇到类似 issue 或 pr 先提交者获得积分，后者将不会得到积分。</p>\n<h4>issue &amp; pr 等级</h4>\n<table>\n<thead>\n<tr>\n<th>等级</th>\n<th>等级说明</th>\n<th>对应积分</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>0 级</td>\n<td>发现并修复一个 P1 的 Bug</td>\n<td>100 个积分</td>\n</tr>\n<tr>\n<td>1 级</td>\n<td>发现并修复一个 P2 的 Bug</td>\n<td>50 个积分</td>\n</tr>\n<tr>\n<td>2 级</td>\n<td>提交一个 pr 并被接受（代码）</td>\n<td>30 个积分</td>\n</tr>\n<tr>\n<td>3 级</td>\n<td>发现一个 P1 Bug（服务 Crash或者数据丢失）</td>\n<td>10 个积分</td>\n</tr>\n<tr>\n<td>4 级</td>\n<td>发现一个 P2 Bug（未正确返回结果，或者严重文档错误）或提交一个文档 pr 并接受</td>\n<td>3 个积分</td>\n</tr>\n<tr>\n<td>5 级</td>\n<td>发现一个 P3 Bug（其他不严重的 Bug），或者提出一个 issue 被接受</td>\n<td>1 个积分</td>\n</tr>\n</tbody>\n</table>\n<h4>积分对应奖励</h4>\n<table>\n<thead>\n<tr>\n<th>积分</th>\n<th>物品&amp;数量</th>\n<th>积分</th>\n<th>物品&amp;数量</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>250 个积分</td>\n<td>AirPods *2</td>\n<td>205 个积分</td>\n<td>KindlePaper White *2</td>\n</tr>\n<tr>\n<td>200 个积分</td>\n<td>Filco 侧刻键盘 *2</td>\n<td>100 个积分</td>\n<td>IKBC 樱桃轴键盘 / 树莓派 4B*10</td>\n</tr>\n<tr>\n<td>90 个积分</td>\n<td>苹果 magic 2 代鼠标 *5</td>\n<td>80 个积分</td>\n<td>索尼小音箱 *5</td>\n</tr>\n<tr>\n<td>10 个积分</td>\n<td>¥100 京东E卡 / ¥100 星巴克券 / 小米无线充电器 *15</td>\n<td>8 个积分</td>\n<td>GitHub 帽 / GitHub 背包 / GitHub T恤 / 404 帽 *40</td>\n</tr>\n<tr>\n<td>7 个积分</td>\n<td>诺西N3 笔记本铝合金支架 *10</td>\n<td>5 个积分</td>\n<td>淘宝心选 U型枕 *20</td>\n</tr>\n<tr>\n<td>3 个积分</td>\n<td>GitHub 帆布袋 / GitHub 贴纸一套 *40</td>\n<td>2 个积分</td>\n<td>减压大 Enter 键 / ¥ 20 话费 *75</td>\n</tr>\n<tr>\n<td>1 个积分</td>\n<td>调试神器——小鸭子 / GitHub 贴纸一张（不单发）/ 胸章 *250</td>\n<td></td>\n<td></td>\n</tr>\n</tbody>\n</table>\n<h4>奖品一览</h4>\n<p><img src=\"https://cdn.nlark.com/yuque/0/2019/png/208152/1566353429831-19675eb3-6481-4659-a34c-708d8aec1f39.png\" alt=\"image.png\"></p>\n<p><img src=\"https://cdn.nlark.com/yuque/0/2019/png/208152/1566353461875-1dbf1e9b-191e-4d20-bd36-e4535700bded.png\" alt=\"image.png\"></p>\n<p>*说明：</p>\n<ol>\n<li>兑换之后积分将被扣除；</li>\n<li>所有积分可折现为兑换物官方售价的 70% ，折现之后积分同上会扣除；</li>\n<li>由于本次捉虫积分有限，全部 1,000 个积分兑换之后，未兑换的积分将被冻结，下期「捉虫计划」积分上新时自动解冻。</li>\n</ol>\n<h4>兑换奖品</h4>\n<p>官方会统计每个在交流群或 GitHub 提交 issue &amp; pr 作者的 ID，兑奖需联系官方小助手：nbot 微信号：NebulaGraphbot 进行兑奖并扣除对应积分。</p>\n<h4>积分查看 &amp; 兑换记录</h4>\n<p>本次活动「积分表」和「兑换记录」可通过 NebulaGraph 小助手朋友圈或 NebulaGraph 知乎专栏 《众测 Nebula Graph | 捉虫计划已开启，这项有礼》查看，官方将在每日 12:00 更新「积分表」和「兑换记录」。</p>\n<h4>第一个积分获得者</h4>\n<p><img src=\"//static.cnodejs.org/Fs3UowpJwzGd590cC0_pA8Few7Rx\" alt=\"1.jpeg\"></p>\n<p><img src=\"//static.cnodejs.org/FjaQDX9I4Y0EegfEmcAwfCpX64pX\" alt=\"2.jpeg\"></p>\n<h3>⏰ 活动时间</h3>\n<p>即日 至 1,000 个积分兑换完毕</p>\n<h3>📚 合作社区</h3>\n<p>感谢以下技术社区对 Nebula Graph 捉虫计划的支持，再次鸣谢 😁</p>\n<p><img src=\"https://cdn.nlark.com/yuque/0/2019/png/208152/1566353591782-f7fa21f9-8435-499d-9f4c-15e7f51b285e.png\" alt=\"掘金.png\"></p>\n<p><img src=\"https://cdn.nlark.com/yuque/0/2019/png/208152/1566353616014-92eedf18-0501-4f28-a86f-ede4bdf9226c.png\" alt=\"sf.png\"></p>\n<p><img src=\"https://cdn.nlark.com/yuque/0/2019/png/208152/1566353633159-f84526bb-0015-4556-902f-e71caa9e30af.png\" alt=\"Untitled.png\"></p>\n<p><img src=\"https://cdn.nlark.com/yuque/0/2019/png/208152/1566353616018-6898ab6c-8b28-44a3-b3eb-32d9a9ccd297.png\" alt=\"Slice.png\"></p>\n<p><img src=\"//static.cnodejs.org/FkrdQEKRzHXi8Hkf6YSdOQaJUllM\" alt=\"Untitled 2.png\"></p>\n<h3>📖 合作博客 &amp; 公众号</h3>\n<p>感谢以下个人博客&amp;公众号对 Nebula Graph 捉虫计划的支持 😁</p>\n<p><img src=\"https://cdn.nlark.com/yuque/0/2019/png/208152/1566353753897-2e2e0836-d271-4cee-b618-9e2add863468.png\" alt=\"Untitled 3.png\"></p>\n<h3>🎊 官方助手</h3>\n<p>对「捉虫计划」有任何疑问，欢迎微信 Nebula Graph 小助手：NebulaGraphbot</p>\n<h3>🚪 活动传送门</h3>\n<p>点击<a href=\"https://strace.co/r/cnode\">👉这里</a>前往 GitHub 提 issue 🎉</p>\n</div>",
            "title": "众测图数据库 Nebula Graph | 捉虫计划已开启，这项有礼",
            "last_reply_at": "2019-08-21T03:31:49.789Z",
            "good": false,
            "top": false,
            "reply_count": 0,
            "visit_count": 486,
            "create_at": "2019-08-21T03:31:49.789Z",
            "author": {
                "loginname": "QingZ11",
                "avatar_url": "https://avatars0.githubusercontent.com/u/38887077?v=4&s=120"
            }
        },
        {
            "id": "5d36c34effed731686461c92",
            "author_id": "5ccfb46f5a5bae6e078134e7",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><h5>接入前准备</h5>\n<ul>\n<li>通过 <a href=\"https://payjq.cn\">Payjq</a> 注册个人收款接口，原理是帮助你签约微信和支付宝（不需要营业执照），大概几分钟可以开通，开通后即可永久使用。</li>\n</ul>\n<h6><a href=\"https://help.payjq.cn/api-lie-biao/sao-ma-zhi-fu-ff08-zhu-sao-ff09.html\">NATIVE 扫码支付</a></h6>\n<ul>\n<li>\n<p>效果：用户点击支付后，前端网络请求你的后台，你后台再请求 Payjq支付接口返回支付二维码到前台，页面展示微信或者支付宝二维码，用户用手机微信或支付宝扫码支付</p>\n</li>\n<li>\n<p>扫码请求步骤：</p>\n<ul>\n<li>构建请求参数</li>\n<li>POST 参数到请求地址</li>\n<li>根据返回内容展示二维码</li>\n<li>用户支付成功后接收异步通知</li>\n</ul>\n</li>\n<li>\n<p>适用场景：PC网站、PC软件、APP</p>\n</li>\n</ul>\n<h6><a href=\"https://help.payjq.cn/api-lie-biao/jsapizhi-fu.html\">JSAPI 支付</a></h6>\n<ul>\n<li>\n<p>效果：用户在微信浏览器内点击支付后，跳出支付页面，输入指纹/支付密码完成支付</p>\n</li>\n<li>\n<p>JSAPI接口请求步骤：</p>\n<ul>\n<li>获得 OPENID</li>\n<li>通过该 api 构造订单参数获取 jsapi 支付参数</li>\n<li>通过 jssdk 或 WeixinJsBridge 方式自行发起支付</li>\n<li>服务端接收异步通知</li>\n</ul>\n</li>\n<li>\n<p>适用场景：用户在微信内进行的H5页面，页面内调用JSSDK完成支付。例如：微信公众号</p>\n</li>\n</ul>\n<h6><a href=\"https://help.payjq.cn/api-lie-biao/shou-yin-tai-zhi-fu.html\">收银台支付</a></h6>\n<ul>\n<li>\n<p>效果：收银台方式同样是通过JSAPI方式发起的支付，只是简化了步骤和流程。适用于微信webview环境</p>\n</li>\n<li>\n<p>收银台请求步骤：</p>\n<ul>\n<li>构建请求参数</li>\n<li>使用浏览器携带参数跳转至收银台地址</li>\n<li>用户在收银台界面点击按钮发起支付</li>\n<li>服务端接收异步通知</li>\n</ul>\n</li>\n</ul>\n<h4>PayJQ支付平台介绍</h4>\n<blockquote>\n<p>PayJQ 定位为个人 / 独立开发者 / 个体户 / 小微企业提供安全、简单、稳定、正规的收款服务。支持微信 NATIVE / JSAPI / 收银台 等支付方式，资金由微信官方T+1结算自动下发个人银行卡。支付宝支付渠道也在内测。</p>\n</blockquote>\n<h4>为什么开发 PayJQ 支付平台</h4>\n<blockquote>\n<p>我们知道作为个人或者初创团队产品需要收款是多么麻烦，注册公司维护成本太高。市面上各种收款工具要么是监听，稳定性差，体验不好；要么是二清，资金随时都有风险。于是我们开发了「PayJQ 支付平台」用来解决这个问题，提交资料，极速开通使用。</p>\n</blockquote>\n<h4>支持接口</h4>\n<ul>\n<li><a href=\"https://help.payjq.cn/api-lie-biao/sao-ma-zhi-fu-ff08-zhu-sao-ff09.html\">NATIVE 扫码支付</a></li>\n<li><a href=\"https://help.payjq.cn/api-lie-biao/fu-kuan-ma-zhi-fu-ff08-bei-sao-ff09.html\">付款码支付</a></li>\n<li><a href=\"https://help.payjq.cn/api-lie-biao/shou-yin-tai-zhi-fu.html\">收银台支付</a></li>\n<li><a href=\"https://help.payjq.cn/api-lie-biao/jsapizhi-fu.html\">JSAPI 网页支付</a></li>\n<li><a href=\"https://help.payjq.cn/api-lie-biao/ding-dan-cha-xun.html\">订单查询</a></li>\n<li><a href=\"https://help.payjq.cn/api-lie-biao/tui-kuan.html\">退款</a></li>\n<li><a href=\"https://help.payjq.cn/api-lie-biao/yi-bu-tong-zhi.html\">异步通知</a></li>\n<li><a href=\"https://help.payjq.cn/api-lie-biao/huo-qu-openid.html\">获取 OPENID</a></li>\n<li><a href=\"https://help.payjq.cn/api-lie-biao/qian-ming-suan-fa.html\">签名算法</a></li>\n</ul>\n<h4>链接</h4>\n<ul>\n<li><a href=\"https://payjq.cn\">PayJQ官网</a></li>\n<li><a href=\"https://help.payjq.cn\">API文档</a></li>\n</ul>\n<h4>客服</h4>\n<ul>\n<li>客服微信：payjq_cn</li>\n<li>客服QQ：51653872</li>\n</ul>\n</div>",
            "title": "个人网站实现收款的几种方式",
            "last_reply_at": "2019-08-21T03:23:36.655Z",
            "good": false,
            "top": false,
            "reply_count": 18,
            "visit_count": 2630,
            "create_at": "2019-07-23T08:20:30.845Z",
            "author": {
                "loginname": "zilin9980",
                "avatar_url": "https://avatars3.githubusercontent.com/u/50311116?v=4&s=120"
            }
        },
        {
            "id": "5b7f8a2c944cb8340c27e335",
            "author_id": "5b72f6727271129a2f32a97f",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><p>2018年Nodejs Koa2 Typescript Eggjs Vue2最新教程资源网盘分享：\n<a href=\"https://pan.baidu.com/s/1O2C6TolDzYpMnKIfQaaqog\">Nodejs视频教程</a>\n<a href=\"https://pan.baidu.com/s/1KNaA97kGwNhavch5rP_G7w\">Koa2教程</a>\n<a href=\"https://pan.baidu.com/s/17jllW0igIOWjM3YCvWS-bg\">6月Typescript教程</a>\n<a href=\"https://pan.baidu.com/s/1a8-RY-aBm3YkH2ZqJKmztg\">8月Eggjs视频教程</a>\n需要更多学习资源可留下邮箱，有的就分享</p>\n</div>",
            "title": "2018年Nodejs Koa2 Typescript Eggjs Vue2最新教程资源网盘分享",
            "last_reply_at": "2019-08-21T02:20:18.249Z",
            "good": false,
            "top": false,
            "reply_count": 46,
            "visit_count": 9366,
            "create_at": "2018-08-24T04:31:40.973Z",
            "author": {
                "loginname": "chengl123",
                "avatar_url": "https://avatars3.githubusercontent.com/u/42384077?v=4&s=120"
            }
        },
        {
            "id": "5d5b66ba12a0194544417e5c",
            "author_id": "5a9e3400ce4a27f867526ddd",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><p>源码： <a href=\"https://github.com/fuxingZhang/row_count\">https://github.com/fuxingZhang/row_count</a></p>\n<h2>electron版截图</h2>\n<ul>\n<li>\n<p>启动<br>\n<img src=\"//static.cnodejs.org/Fln-pmUqYl63ghGjh95nIzS11ncE\" alt=\"image.png\"></p>\n</li>\n<li>\n<p>运行完毕<br>\n<img src=\"//static.cnodejs.org/Ft9hGThKNr_x2HNX-pAo8kWH-PUl\" alt=\"image.png\"></p>\n</li>\n<li>\n<p>生成的文档<br>\n<img src=\"//static.cnodejs.org/Fn4X1gaV3XaYgN1zr5p4OdTbwjlb\" alt=\"image.png\"></p>\n</li>\n</ul>\n<h2>nodejs版本</h2>\n<h3>配置</h3>\n<pre class=\"prettyprint language- js\"><code>module.exports = {\n  &#x2F;&#x2F; 需要统计代码的目录\n  dir: &#x27;C:&#x2F;Users&#x2F;star&#x2F;Desktop&#x2F;des&#x27;,\n  &#x2F;&#x2F; 需要包含的文件后缀\n  extensions: [&#x27;.js&#x27;],\n  &#x2F;&#x2F; 需要排除的文件目录\n  excludeSubDir: [&#x27;node_modules&#x27;, &#x27;public&#x27;, &#x27;dist&#x27;]\n}\n</code></pre><h3>run</h3>\n<p>执行脚本</p>\n<blockquote>\n<p>node app</p>\n</blockquote>\n<h3>xlsx file</h3>\n<p>生成的excel文件在</p>\n<blockquote>\n<p>./xlsx</p>\n</blockquote>\n</div>",
            "title": "代码行数统计",
            "last_reply_at": "2019-08-21T02:11:14.421Z",
            "good": false,
            "top": false,
            "reply_count": 3,
            "visit_count": 398,
            "create_at": "2019-08-20T03:19:22.928Z",
            "author": {
                "loginname": "fuxingZhang",
                "avatar_url": "https://avatars3.githubusercontent.com/u/25921552?v=4&s=120"
            }
        },
        {
            "id": "5d5bae52d53e9171e98a9657",
            "author_id": "5d5bae02d53e9171e98a9652",
            "tab": "ask",
            "content": "<div class=\"markdown-text\"><p>log4js的这句配置 replaceConsole: true 怎么用呢？</p>\n</div>",
            "title": "log4js的这句配置 replaceConsole: true 怎么用呢？",
            "last_reply_at": "2019-08-21T01:12:15.562Z",
            "good": false,
            "top": false,
            "reply_count": 1,
            "visit_count": 210,
            "create_at": "2019-08-20T08:24:50.078Z",
            "author": {
                "loginname": "code0816",
                "avatar_url": "https://avatars3.githubusercontent.com/u/51862007?v=4&s=120"
            }
        },
        {
            "id": "5c0a929c15a4d545e3f4c5d6",
            "author_id": "5bc9f0ca9545eaf107b9ccdd",
            "tab": "ask",
            "content": "<div class=\"markdown-text\"><p>如何学习</p>\n</div>",
            "title": "如何学习vue框架",
            "last_reply_at": "2019-08-20T15:28:29.272Z",
            "good": false,
            "top": false,
            "reply_count": 29,
            "visit_count": 4536,
            "create_at": "2018-12-07T15:32:44.120Z",
            "author": {
                "loginname": "hhffhh",
                "avatar_url": "https://avatars0.githubusercontent.com/u/3991376?v=4&s=120"
            }
        },
        {
            "id": "5d4d509412a019454441596f",
            "author_id": "5b9fdb0337a6965f59051a70",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><p>最近注册了好多账号，有点头疼，所以拿TypeScript写了个简易的密码管理器\n（个人不是很喜欢第三方密码管理器）</p>\n<p>npm i -g pass-vault</p>\n<p>复制代码源码地址：<a href=\"https://github.com/tiancihe/pass-vault\">https://github.com/tiancihe/pass-vault</a>\n欢迎大家体验和使用，ISSUE和PR都是欢迎的</p>\n</div>",
            "title": "简易密码管理器",
            "last_reply_at": "2019-08-20T14:02:11.594Z",
            "good": false,
            "top": false,
            "reply_count": 7,
            "visit_count": 1273,
            "create_at": "2019-08-09T10:53:08.167Z",
            "author": {
                "loginname": "tiancihe",
                "avatar_url": "https://avatars0.githubusercontent.com/u/36734012?v=4&s=120"
            }
        },
        {
            "id": "5b7ac9c7c52ad1482eb940bf",
            "author_id": "5b52cbf1fb9e84ec69cc1ca2",
            "tab": "ask",
            "content": "<div class=\"markdown-text\"><p>Egg.js现在用的人多吗？那些公司在用有知道的吗？</p>\n<p>同上，老铁们出来吧。</p>\n</div>",
            "title": "Egg.js现在用的人多吗？那些公司在用有知道的吗？",
            "last_reply_at": "2019-08-20T13:33:13.704Z",
            "good": false,
            "top": false,
            "reply_count": 137,
            "visit_count": 21146,
            "create_at": "2018-08-20T14:01:43.981Z",
            "author": {
                "loginname": "nodeper",
                "avatar_url": "https://avatars2.githubusercontent.com/u/41500847?v=4&s=120"
            }
        },
        {
            "id": "5d5a55c1697873456c6be798",
            "author_id": "59aa34b3ea0aea6b0c64e731",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><h1>ForestBlog V2.0</h1>\n<p>之前学习 GOLANG 写的博客，现在重构了 2.0 , 没有第三方 golang 库，没有使用数据库，读取 git 仓库生成博客，喜欢的一起学习和修改吧。</p>\n<p>示例： <a href=\"http://xusenlin.com\">xusenlin.com</a> （个人博客，正在使用）</p>\n<p>源码： <a href=\"https://github.com/xusenlin/ForestBlog\">github.com/xusenlin/ForestBlog</a></p>\n<h3>使用</h3>\n<ul>\n<li>\n<p>请将你的博客文档克隆到ForestBlog的resources下，\nForestBlog会6个小时自动根据app.json的documentPath key切换到你的博客目录下执行git pull 命令来更新你的文章,\n所以正确配置documentPath指向你的博客文档很关键。</p>\n</li>\n<li>\n<p>还有，你的博客文档目录里面最少需要assets、<a href=\"http://xn--contentAbout-4l2uk58i877e.md\">content目录和About.md</a>、Works.md文件(未来完成todo这个将不再是强制性的)。\ncontent目录下的一级目录代表一个分类，如果有多个子级目录也不会产生分类,子级的文档也会属于第一级的分类。\n如下：</p>\n</li>\n</ul>\n<pre class=\"prettyprint\"><code>    |-- assets       &#x2F;&#x2F;博客静态文件，存放一下图片资源，方便显示到文档里\n    |-- content\n    |   |-- GOLANG   &#x2F;&#x2F;分类目录\n    |       |-- GOLANG基础   &#x2F;&#x2F;  子分类目录，但是在页面上不会产生分类目录\n    |       |--- ForestBlog使用文档.md   \n    |   |-- 其他分类\n    |       |--- xxx.md\n    |-- About.md    &#x2F;&#x2F;关于\n    |-- Works.md    &#x2F;&#x2F;作品\n    \n</code></pre><ul>\n<li>在文章的开头可以配置一些文章的属性，我觉得这个应该是必须的，最少也应该有一个日期，否则默认使用文件创建的时间，\n当你迁移文档时间就会改变导致文章排序到前面，添加上时间则不会有这个问题。</li>\n</ul>\n<pre class=\"prettyprint\"><code>    &#96;&#96;&#96;json\n    {\n        &quot;date&quot;:&quot;2019.01.02 14:33&quot;，&#x2F;&#x2F;最少需要\n        &quot;tags&quot;: [&quot;BLOG&quot;，&quot;其它tag&quot;]，&#x2F;&#x2F;可以不填，不过最好添加一些tag，后面可以做一些好玩的东西。\n        &quot;title&quot;: &quot;文章的标题，一般不用填写，默认使用文件名&quot;，\n        &quot;description&quot;: &quot;文章描述，不填写自动取正文200个字，可以在app.json中配置&quot;，\n        &quot;author&quot;: &quot;xusenlin&quot; &#x2F;&#x2F;文章作者，可以不用填写，现在也没有使用到\n    }\n    &#96;&#96;&#96;\n</code></pre><p>我会根据关键字```json来解析，不用担心这个会显示到文章内容里面，我在解析的时候就将它去掉了，同时会生成缓存，直到文章被更新。\n如果不再文章前面添加这一段json也是可以的，不过我不建议这么做，因为这样就和V1.0版本没什么区别了，没有了文章属性，排序都是个问题。\n最后，markdown文章编辑器推荐Typora。</p>\n<blockquote>\n<p>提示：```json 前面不能有其它字符。</p>\n</blockquote>\n<ul>\n<li>更多配置请自行查看app.json</li>\n</ul>\n<h2>TODO</h2>\n<ul>\n<li>[ ] 1.移动端更好的适配</li>\n<li>[ ] 2.根目录可以添加其他文件生成导航</li>\n<li>[ ] 3.支持主题和添加多套主题</li>\n<li>[ ] 4.支持搜索</li>\n<li>[ ] 5.tags的展示</li>\n</ul>\n<h2>优点</h2>\n<ol>\n<li>响应迅速  —没有什么依赖，得益于GOLANG的运行速度，部署在阿里云的博客平均响应在50毫秒内。</li>\n<li>迁移方便  —GOLANG交叉编译可以方便的发布二进制文件到不同的操作系统，执行二进制文件并克隆博客文件即可运行你的博客。</li>\n<li>小巧精美  —非常简单的代码方便学习和改造，即使有一天你厌倦ForestBlog，你的文章也能很好的迁移和阅读。</li>\n</ol>\n</div>",
            "title": "基于 go 语言开发的无第三方依赖的适合初学者学习的用来展示 Markdown 文档的精美博客。",
            "last_reply_at": "2019-08-20T08:46:24.735Z",
            "good": false,
            "top": false,
            "reply_count": 2,
            "visit_count": 424,
            "create_at": "2019-08-19T07:54:41.593Z",
            "author": {
                "loginname": "xusenlin",
                "avatar_url": "https://avatars1.githubusercontent.com/u/14531906?v=4&s=120"
            }
        },
        {
            "id": "5d54c518697873456c6bd792",
            "author_id": "550973933135610a365b01fa",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><p><a href=\"https://zhuanlan.zhihu.com/p/68477600\">Vue Function-based API RFC</a>这篇文章给了我很多的灵感，\n<a href=\"https://stackblitz.com/edit/hook-setup?file=index.js\">now, setup for react is comming</a>，有兴趣的小伙伴可以先睹为快。</p>\n<ul>\n<li><code>hook</code>, <code>renderProps</code>,<code>class</code> 3种写法高度统一，任君切换</li>\n<li><code>watch</code>  <code>computed</code> <code>effect</code> <code>sync</code>等高级特性，赋能react更多开发模式</li>\n<li>完成的中间件机制和插件机制，满足你的自定义需求。</li>\n</ul>\n<p>powered by <a href=\"https://github.com/concentjs/concent\">concent</a></p>\n</div>",
            "title": "concent 1.5蓄势待发，hook&setup给你不一样的体验",
            "last_reply_at": "2019-08-20T06:53:49.102Z",
            "good": false,
            "top": false,
            "reply_count": 3,
            "visit_count": 522,
            "create_at": "2019-08-15T02:36:08.788Z",
            "author": {
                "loginname": "fantasticsoul",
                "avatar_url": "https://avatars0.githubusercontent.com/u/7334950?v=4&s=120"
            }
        },
        {
            "id": "5ce6a9d54036f24194cf5f1e",
            "author_id": "5bc6779d37a6965f5905229a",
            "tab": "ask",
            "content": "<div class=\"markdown-text\"><p>請問node.js有像java 一樣的流程引擎嗎？例如jBPM、Activiti，謝謝前輩們~</p>\n</div>",
            "title": "請問node.js有像java 一樣的流程引擎嗎？例如jBPM、Activiti，謝謝前輩們~",
            "last_reply_at": "2019-08-20T06:44:10.042Z",
            "good": false,
            "top": false,
            "reply_count": 14,
            "visit_count": 1874,
            "create_at": "2019-05-23T14:10:29.327Z",
            "author": {
                "loginname": "Solomonqoo",
                "avatar_url": "https://avatars3.githubusercontent.com/u/44214486?v=4&s=120"
            }
        },
        {
            "id": "5d5b65e612a0194544417e54",
            "author_id": "5a0d348fe2f4b8ea22496498",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><p>管理API的需求源自于Web API开展业务。从2006年开始，然后逐渐成熟，并在2016年之前进入市场。无论是通过代理现有API的管理网关、本身作为用于部署API本身的网关的一部分，还是作为连接层在代码中，API管理就是针对API进行编辑、测试、发布、身份验证，计量，分析报告、监控等。在过去十年中，API管理提供商共同定义了一些使用Web API完成业务的常用方法。虽然API技术非常技术化，但它依旧与API业务密切有关，并且通过使用Web提供对数据，内容，算法和其他数字资源的访问所产生的价值。下面将通过几个关键词的形式说明API管理的重要性和实现方式。</p>\n<h3>1.安全性：</h3>\n<h4>API认证</h4>\n<p>如果你经常向合作伙伴提供API访问权限，那限制API访问合作伙伴IP地址的防御力（白名单）非常强大。但你仍需要进行身份验证和速率限制，只要将流量减少到只有已知的合作伙伴，这会消除在对更广泛的互联网开放的API上看到的大量恶意流量，例如蛮力企图获取访问权限和拒绝服务攻击。即便使用IP白名单，建立API网关仍然是最佳做法。这有助于身份验证并确保后端仅接收正确返回的API调用。</p>\n<p>最常见的是OAuth和OAuth2，用于在API之间进行通信和保护通信。即便使用OAuth，其他人的Token也可能是一个问题。如何管理Token的生命周期？Token是否得到刷新？在一些成功的基础架构中，使用了一次性Token来严格限制正在尝试的操作类型，它是一种归结为安全Token管理和基于证书的身份验证。</p>\n<p>在授权之前始终对API进行身份验证 ，有许多方法可以进行API身份验证，但多因素身份验证是常用的方法。对于API，使用外部进程（例如通过OAuth协议）获取访问Token是很常见的。身份验证密钥最敏感，必须保持安全，建议使用管理存储来自动执行整个过程。</p>\n<p>也就是说，仅凭身份验证不足以授予对API的访问权限，应该有一个授权步骤来确定哪些资源可以访问API。检查授权的各种方法包括基于内容的访问控制（CBAC），基于角色的访问控制（RBAC）或基于策略的访问控制（PBAC），这些方法可确保业务数据保持完全受到保护，以防止未经批准的访问。</p>\n<p><img src=\"//static.cnodejs.org/Fiz-FLNSnWWesuYjg2J_i-g_lNcO\" alt=\"1_9oK18ZPQX75ophT4s6Ee6A.png\"></p>\n<h4>限制访问API的资源</h4>\n<p>保护API环境涉及每个API接触点，对API客户端（第三方应用程序和开发人员或微服务）进行身份验证和授权，限速API调用以缓解分布式拒绝服务（DDoS）攻击并保护处理后端应用程序API调用。</p>\n<p><strong>用于保护API的一些技术和工具是：</strong></p>\n<p>1）使用JSON Web Token（JWT）来验证和授权API客户端，JWT包括有关客户端的信息，例如管理权限或到期日期。当客户端向JWT提供其API请求时，API网关会验证JWT并验证其中的声明是否与你为客户端请求的资源设置的访问策略相匹配。</p>\n<p>2）定义和实施访问控制策略，仅允许某些类型的客户端执行写入操作或访问敏感数据（如定价）。</p>\n<p>3）定义基于角色的访问控制，该控制仅允许某些用户（例如特定组织内的开发人员）发布敏感信息（如定价或库存水平）的API。</p>\n<p>4）通过应用速率限制策略来保护API本身，该策略设置API网关从指定源（例如客户端IP地址）每秒（或其他时间段）接受的请求数量的阈值。</p>\n<p>5）使用HTTPS保护后端应用程序 - 应该在API网关和处理API请求的后端系统之间使用HTTPS协议。</p>\n<p>限制和配额的断路器，一个好的做法是强制执行每个应用程序的数据使用配额，以便在DoS，DDoS攻击或防止未经授权的用户不正当使用API时，后端不会受到影响。每个资源的节流和配额不仅可以作为断路器，还可以防止系统产生负面影响。具有配额和限制等策略的复杂API管理平台可提供此功能。</p>\n<h4>三个关键领域</h4>\n<p><strong>API安全方法的三个关键领域：</strong></p>\n<p>1）采用说明性方法。客户转向OAuth 2并使用Open ID Connect进行覆盖，OAuth 2有很多选择，Open ID虽然限制了选择但也指导出最佳实践。</p>\n<p>2）仔细考虑应用程序ID如何与用户身份相关联。</p>\n<p>3）从最广泛的意义上考虑API安全性，以减少入侵企图。可以采取分发安全实施的方法。默认情况下，API管理专注于提供API网关，而API网关应该专注于流量的身份验证和授权。建议采用多层方法，并在Apache Mod Security的单独层中包含Web应用防火墙。</p>\n<p><img src=\"//static.cnodejs.org/Fvlq1dpgy2RU5-xStxSMUJ-Aajj2\" alt=\"10100191-screen-shot-2018-08-28-at-25821-pm.png\"></p>\n<h3>2.易用性：</h3>\n<p>部署API有许多重要元素，包括身份验证，保护/可用性和货币化。但是如果不使用API，其中许多都无关紧要。易于使用和成功完成用例是被使用的关键。我们的集成平台使API易于使用。通过我们的应用程序连接器，我们可以简化许多API的使用。</p>\n<p>API中的最后一个字母是“界面”，因此明确定义该界面如何工作是十分重要的。客户如何使用你的API，以及开发人员如何将这些API推向市场，你需要提前做出一些重要的架构决策。随着API数量的增长，保持命名和数据格式的一致性变得很重要。当你提供5-10个API时，这并不是什么大问题，但是当数量超过100时，你可能有多个人（或多个团队）在不同的时间段创建它们，作为不同产品的一部分引入等等，让所有团队轻松了解并执行现有规范至关重要。如果这些规范不统一且难以阅读，那它一定会导致问题。</p>\n<h3>3.API生命周期管理：</h3>\n<p>具有以下四个主要元素：</p>\n<p><strong>1.API生命周期管理</strong>，提供管理API整个生命周期的能力，从API的设计、开发、发布和管理（包括维护和版本控制），从而允许公司通过撰写创新解决方案来加速创新，提高开发效率，促进企业数据的更好安全性，并允许用户轻松发现和使用API。</p>\n<p><strong>2.API网关</strong>，API网关充当一组API的入口点。使用API网关的好处是为每个客户端提供最佳API，减少客户端需要进行的请求数量并实施适当的安全性和控制。</p>\n<p><strong>3.文件</strong>，Developer Portal是提高API采用率和粘性的关键。这是开发人员学习和使用API的第一点，也是开发人员了解身份验证/授权机制的地方。此外，他们还将了解哪些API可供使用，并利用每个API请求的描述和示例。</p>\n<p><strong>4.API分析/监控</strong>，API分析和监控可帮助了解和理解其API的使用情况，从而提供有关各种API使用的见解。或者，开发者可以强制执行API配额，限制和API流量，以阻止/限制与你的业务目标不一致的使用。</p>\n<p>在国内的API接口管理工具中，能完整实现API管理全流程并且体验较好的平台和工具就是 <a href=\"https://s.growingio.com/gke2DD\">EOLINKER</a>了，包括接口文档编辑、API测试、自动化测试和API监控和API网关等功能，能体验到完整的API研发方案。而国外的诸如POSTMAN、Swagger功能也很强大，但是前者注重测试，后者注重接口管理，可能并不全面，而且全英的语言对国人也不是很友好。因此有需求或者感兴趣可以各自了解下 <a href=\"https://s.growingio.com/gke2DD\">EOLINKER</a>、POSTMAN、Swagger。</p>\n<p>在选择API管理解决方案时，最好的建议是始终保持关系简单，模块化，强独立性并与API生命周期中的其他模块分离，并保持业务参与度有限，使得可以在没有冗长合同的情况下不断使用成长。API生命周期中的每一阶段都应该反映API的理念，并保持小巧，分离，专注做好该阶段目标。</p>\n<p>参考资料：</p>\n<p><em>Kin Lane，API Life Cycle Basics: API Management，<a href=\"https://dzone.com/articles/api-life-cycle-basics-api-management\">https://dzone.com/articles/api-life-cycle-basics-api-management</a></em>\n<em>Tom Smith，Keys to API Management，<a href=\"https://dzone.com/articles/keys-to-api-management\">https://dzone.com/articles/keys-to-api-management</a></em></p>\n</div>",
            "title": "实现API管理系统的几个重要关键词",
            "last_reply_at": "2019-08-20T03:15:50.308Z",
            "good": false,
            "top": false,
            "reply_count": 0,
            "visit_count": 577,
            "create_at": "2019-08-20T03:15:50.308Z",
            "author": {
                "loginname": "wardennn",
                "avatar_url": "https://avatars0.githubusercontent.com/u/33686934?v=4&s=120"
            }
        },
        {
            "id": "5d5647df697873456c6bde7a",
            "author_id": "5d564543697873456c6bde56",
            "tab": "ask",
            "content": "<div class=\"markdown-text\"><p>users.js  koa路由实例代码：\n<img src=\"//static.cnodejs.org/Fh1eYKcDc0QUiqCeFw4Ew_4_wWph\" alt=\"users.png\">\n报错信息：\n<img src=\"//static.cnodejs.org/Fk4csfhD2iRTjyuop6CDzIf53EA3\" alt=\"node.png\">\nindex.js  koa实例配置\n<img src=\"//static.cnodejs.org/FkOBFNqzFz-JJbs3ZFa5RUkZwUgA\" alt=\"koa1.png\"><img src=\"//static.cnodejs.org/FvIKvihttDwaW3kPn0LAjpa-NbCM\" alt=\"koa2.png\"></p>\n</div>",
            "title": "前端ssr-Koa报错：Error: connect ECONNREFUSED 127.0.0.1:80",
            "last_reply_at": "2019-08-20T03:12:50.894Z",
            "good": false,
            "top": false,
            "reply_count": 4,
            "visit_count": 408,
            "create_at": "2019-08-16T06:06:23.228Z",
            "author": {
                "loginname": "withCHen",
                "avatar_url": "https://avatars3.githubusercontent.com/u/26160896?v=4&s=120"
            }
        },
        {
            "id": "5d5a8084d53e9171e98a932a",
            "author_id": "55c56e8a39273b9219336288",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><p>一直在 HN 首页, reddit 效果也不错, github 几小时涨了 500 多 star. 分享一些还热乎的感想</p>\n<p><a href=\"https://blog.t9t.io/t9t-week14-2019-08-19/\">https://blog.t9t.io/t9t-week14-2019-08-19/</a></p>\n</div>",
            "title": "记录一次成功的产品发布现场",
            "last_reply_at": "2019-08-20T02:10:33.930Z",
            "good": false,
            "top": false,
            "reply_count": 4,
            "visit_count": 422,
            "create_at": "2019-08-19T10:57:08.009Z",
            "author": {
                "loginname": "timqian",
                "avatar_url": "https://avatars3.githubusercontent.com/u/5512552?v=4&s=120"
            }
        },
        {
            "id": "5d51302d12a0194544416048",
            "author_id": "5d47c83b4f472f7fee152927",
            "tab": "ask",
            "content": "<div class=\"markdown-text\"><p>我在尝试给 Date 添加一个方法</p>\n<pre class=\"prettyprint\"><code>interface Date {\n  f(): string\n}\nDate.prototype.f = function(){\n  return &#x27;hello&#x27;;\n}\nconsole.log(new Date().f());\n</code></pre><p>这样是没有问题的。</p>\n<p>可是导出就出现了问题，也就是添加一行 export {} 之后，就编译不了了。</p>\n<p><img src=\"//static.cnodejs.org/FjbhT9G2UCMuRf38793OaxT1wDP-\" alt=\"TIM截图20190812171924.png\"></p>\n</div>",
            "title": "typescript 中修改 Date 的 prototype，添加了 export 语句后出现了问题。",
            "last_reply_at": "2019-08-20T01:27:45.396Z",
            "good": false,
            "top": false,
            "reply_count": 5,
            "visit_count": 684,
            "create_at": "2019-08-12T09:23:57.856Z",
            "author": {
                "loginname": "daGaiGuanYu",
                "avatar_url": "https://avatars2.githubusercontent.com/u/27003009?v=4&s=120"
            }
        },
        {
            "id": "5b8de66137b3005a0b0e6b3f",
            "author_id": "5b8de41bbf116a8c0e42579f",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><p>Egg.js入门视频教程主要讲了Egg的环境搭建   egg的控制器      egg服务  egg中间件   egg路由 egg扩展   egg模板引擎  egg cookie   egg session</p>\n<p><strong>Eggjs 视频教程百度网盘分享接</strong>： <a href=\"https://pan.baidu.com/s/1t6XHpny8-H8mApLkzcsS8w\">https://pan.baidu.com/s/1t6XHpny8-H8mApLkzcsS8w</a></p>\n<p><strong>或者此连接Egg.js视频教程10讲入门链接</strong>： <a href=\"https://pan.baidu.com/s/1-jdCXKGgfk9yI8xJOOhPhg\">https://pan.baidu.com/s/1-jdCXKGgfk9yI8xJOOhPhg</a>  <strong>密码</strong>：4b6i</p>\n<p><strong>来源</strong>  <a href=\"https://cnodejs.org/topic/5b7ac9c7c52ad1482eb940bf\">https://cnodejs.org/topic/5b7ac9c7c52ad1482eb940bf</a></p>\n<p>希望老铁门能喜欢\n<img src=\"//static.cnodejs.org/FoPZNWCMpHqWFAb2QDns-UhIMX-3\" alt=\"egg01.png\"></p>\n<p><img src=\"//static.cnodejs.org/Fu4_-OevpWiKHFqeEGBOW53MCdnE\" alt=\"egg02.png\"></p>\n<p><img src=\"//static.cnodejs.org/FtOEkaeRTUNyuWE2mhvazrxPc6cd\" alt=\"egg03.png\"></p>\n<p><img src=\"//static.cnodejs.org/FtJsuDe3kbcNYWWcJyfxuE08wVs5\" alt=\"egg05.png\"></p>\n<p><img src=\"//static.cnodejs.org/Fp8erhbPkGZrsYFsd-gxn2z4Gssb\" alt=\"222.png\"></p>\n<p><img src=\"//static.cnodejs.org/FhCAuCKVwbQnTCJWtkGKv6ZR8toN\" alt=\"06.png\"></p>\n</div>",
            "title": "Egg.js视频教程-Eggjs入门视频教程网盘免费分享-10讲入门基础希望老铁门能喜欢",
            "last_reply_at": "2019-08-20T01:18:58.602Z",
            "good": false,
            "top": false,
            "reply_count": 97,
            "visit_count": 17945,
            "create_at": "2018-09-04T01:56:49.179Z",
            "author": {
                "loginname": "zlyuanteng",
                "avatar_url": "https://avatars0.githubusercontent.com/u/42952042?v=4&s=120"
            }
        },
        {
            "id": "5befe1b1be1b120abac5a592",
            "author_id": "5b5a7729b71aedfe4c12652b",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><p>6套经典node.js+vue项目实战视频教程，大家看看下面具体教程，有需要的可以学习一下哦</p>\n<p><img src=\"//static.cnodejs.org/FisDxxcRtOtl7qWtIwYMfYzDTr2G\" alt=\"11111.jpg\"></p>\n<p><strong>教程如下：</strong>\n[node]7天搞定NodeJS微信公众号开发\n[vue]vue2.0+node.js+MongoDB全栈打造商城（新录制）\nVue+Node+MongoDB小程序公众号全栈项目开发实战\nnode.js从入门到实战教育项目\nVue+Node+MongoDB小程序公众号全栈项目开发实战\n【实战】Node.js + Web Socket 打造即时通讯聊天程序</p>\n<p>下载地址：<a href=\"http://www.sucaihuo.com/video/378.html\">http://www.sucaihuo.com/video/378.html</a></p>\n</div>",
            "title": "6套经典node.js+vue项目实战视频教程",
            "last_reply_at": "2019-08-19T14:46:55.105Z",
            "good": false,
            "top": false,
            "reply_count": 34,
            "visit_count": 8933,
            "create_at": "2018-11-17T09:38:57.164Z",
            "author": {
                "loginname": "codeofking",
                "avatar_url": "https://avatars2.githubusercontent.com/u/41748064?v=4&s=120"
            }
        },
        {
            "id": "5d5a7690d53e9171e98a92f1",
            "author_id": "5d5a75c912a0194544417ca5",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><p><img src=\"//static.cnodejs.org/FljIztELo8Qufw8Yj05WljBfNJlr\" alt=\"image.png\">\n<img src=\"//static.cnodejs.org/FhMDcnv0MaFWENCRF-cICOnOJJrh\" alt=\"image.png\">\n<img src=\"//static.cnodejs.org/FgfSo8h6iwoXmr8j4Fe0m48ffA7P\" alt=\"image.png\"></p>\n<p><strong>课程简介：</strong>\n本课程从基础的 Vue源码目录设计、源码构建开始讲起，包括数据驱动，响应式原理，让同学们深入全面理解Vue的实现原理，掌握源码分析技巧，牢固对Vue的使用，斩断BAT进阶拦路虎，快人一步进名企。</p>\n<p><strong>适合人群</strong>\n有一定前端基础和 Vue.js 的基础</p>\n<p><strong>技术储备要求</strong>\n1、已经用过 Vue.js 做过 2 个以上的实际项目，对 Vue.js 的思想有了一定的了解，对绝大部分的 API 都已经有使用。\n2、有一定的原生 JavaScript 的功底，并对代码调试有一定的了解。\n3、对常用的数据结构、正则表达式等都有一定了解。</p>\n<p><strong><a href=\"http://www.97yrbl.com/t-167.html\">点击进入资源下载页</a></strong></p>\n</div>",
            "title": "分享一门课程《Vue.js源码全方位深入解析》 真的不错——分享推荐",
            "last_reply_at": "2019-08-19T10:14:40.853Z",
            "good": false,
            "top": false,
            "reply_count": 0,
            "visit_count": 538,
            "create_at": "2019-08-19T10:14:40.853Z",
            "author": {
                "loginname": "kabasiji123456",
                "avatar_url": "https://avatars1.githubusercontent.com/u/49689048?v=4&s=120"
            }
        }
    ]
}

export default data;