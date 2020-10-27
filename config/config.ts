import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: false,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/home',
            },
            {
              name: '数据概况',
              icon: 'home',
              path: '/home',
              component: './home',
            },
            {
              name: '用户详情页',
              path: '/manage_user/detail',
              component: './manage_user/detail',
              hideInMenu: true,
            },
            {
              name: '用户管理',
              icon: 'user',
              path: '/manage_user',
              component: './manage_user',
            },
            {
              name: '作品详情页',
              path: '/manage_works/detail',
              component: './manage_works/detail',
              hideInMenu: true,
            },
            {
              name: '作品管理',
              icon: 'gold',
              path: '/manage_works',
              component: './manage_works',
            },
            {
              name: '商品详情页',
              path: '/manage_commodity/detail',
              component: './manage_commodity/detail',
              hideInMenu: true,
            },
            {
              name: '商品管理',
              icon: 'shopping',
              path: '/manage_commodity',
              component: './manage_commodity',
            },
            {
              name: '订单管理',
              icon: 'ordered-list',
              path: '/manage_order',
              component: './manage_order',
            },
            {
              name: 'banner详情页',
              path: '/manage_operation/banner_detail',
              component: './manage_operation/banner_detail',
              hideInMenu: true,
            },
            {
              name: '活动详情页',
              path: '/manage_operation/activity_detail',
              component: './manage_operation/activity_detail',
              hideInMenu: true,
            },
            {
              name: '运营管理',
              icon: 'flag',
              path: '/manage_operation',
              component: './manage_operation',
            },
            {
              name: '资金管理',
              icon: 'fund',
              path: '/manage_funds',
              component: './manage_funds',
            },
            {
              name: '账户明细',
              path: '/manage_funds/detail',
              component: './manage_funds/detail',
              hideInMenu: true,
            },
            {
              name: '系统管理',
              icon: 'setting',
              path: '/manage_system',
              // redirect: '/manage_system/authority',
              routes: [
                {
                  name: '权限',
                  path: '/manage_system/authority',
                  component: './manage_system/authority',
                },
                {
                  name: '推送',
                  path: '/manage_system/push',
                  component: './manage_system/push',
                },
                {
                  name: '用户反馈',
                  path: '/manage_system/customer_feedback',
                  component: './manage_system/customer_feedback',
                },
                {
                  name: '举报列表',
                  path: '/manage_system/report_list',
                  component: './manage_system/report_list',
                },
                {
                  name: '推荐配置',
                  path: '/manage_system/recommend_config',
                  component: './manage_system/recommend_config',
                },
                {
                  name: '订单分账配置',
                  path: '/manage_system/order_ledger_config',
                  component: './manage_system/order_ledger_config',
                },
                {
                  name: '风格标签',
                  path: '/manage_system/style_tags',
                  component: './manage_system/style_tags',
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': '#FF5400',
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: {
    '/admin': {
      target: 'https://admin-api.yu-zuo.com/',
      changeOrigin: true,
      secure: true,
    },
  },
} as IConfig;
