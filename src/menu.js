export default [
    {text: '任务管理', icon: 'futbol-o', children: [
        {text: '任务管理', link: 'task/index'}
    ]},
    {text: '日志', icon: 'futbol-o', children: [
        {text: '任务日志', link: 'log/task'},
        {text: 'job日志', link: 'log/job'}
    ]},
    {text: 'job管理', icon: 'tachometer', children: [
        {text: 'job列表', link: 'job/list'}
    ]},
    {text: '执行管理器', icon: 'tachometer', link: 'actuator/index'},
    {text: '组件管理', icon: 'tachometer', children: [
        {text: '新增组件', link: 'module/create'}
    ]},
    {text: '表单页', icon: 'th', children: [
        {text: '基础表单', link: 'form/base'},
        {text: '高级表单', link: 'form/advanced'}
    ]},
    {text: 'dashboard', icon: 'th', children: [
        {text: 'dashboard', link: 'dashboard/analysis'},
        {text: '高级表单', link: 'form/advanced'}
    ]},
    {text: '系统监控', icon: 'code', children: [
        {text: '主机监控', link: 'monitor/host'}
    ]},
    {text: '信用分', icon: 'futbol-o', link: 'xyf/index'},
    {text: 'Profile', icon: 'futbol-o', link: 'profile/index'}
];
