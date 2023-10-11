import chalk from "chalk";
import ora from "ora";
import util from 'util'

export const wrapLoading = async function (fn, massage,...args) {
  const loading = ora(chalk.green(massage));
  try {
    //开启加载
    loading.start();
    let result = await fn(...args);
    //成功
    loading.succeed();
    return result;
  } catch (error) {
    loading.fail(chalk.red("Request fail, refetch ..."));
    await sleep(2000);
    return wrapLoading(fn, massage,...args);
  }
};

export const sleep = function (time) {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve()
    }, time);
  });
};

export const promisify = function (fn) {
  return util.promisify(fn)
};
