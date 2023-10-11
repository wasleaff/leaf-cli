1.创建可执行脚本，配置bin字段（环境变量路径下添加软链）
2.将包链接到全局 npm link（默认以包名为全局指令 执行包名就是在执行全局软链-》bin路径下的可执行脚本）

tips：如果想配置多个指令
~~~javascript
"bin": {
  "leaf": "./bin/leaf",
  "leaf-cli": "./bin/leaf",
}
~~~

项目使用esm，fs-extra的模块使用cjs，需要使用以下格式才能导入
~~~javascript
import pkg from 'fs-extra';
const { existsSync, remove } = pkg;
~~~