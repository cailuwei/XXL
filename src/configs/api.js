// 開發環境
// const HOST = 'http://172.18.34.66:8415/mock/xxl';
// export default {
//     TYPE: 'development',
//     HEADER: {
//         'Accept': 'application/json',
//             'Content-Type': 'application/json; charset=UTF-8'
//     },
//     ACTUATOR: {
//         LIST: `${HOST}/actuator/search`,
//         DELETE_ACTUATOR: `${HOST}/success`,
//         SAVE_ACTUATOR: `${HOST}/success`,
//         GET_ACTUATOR_INFO: `${HOST}/actuator/info`,
//         EDIT_ACTUATOR: `${HOST}/success`
//     },
//     SCHEDULE: {
//         GET_SCHEDULE: `${HOST}/schedule/info`,
//         GET_JOB_INFO: `${HOST}/schedule/job/info`,
//         ADD_NODE: `${HOST}/success`,
//         EDIT_NODE: `${HOST}/success`,
//         DELETE_NODE: `${HOST}/success`,
//         SAVE_NODE: `${HOST}/success`,
//         GET_NODE_INFO: `${HOST}/node/info`
//     },
//     JOB: {
//         BASE_LIST: `${HOST}/job/strategy/list`,
//         ADD_JOB: `${HOST}/success`,
//         EDIT_JOB: `${HOST}/success`,
//         DELETE_JOB: `${HOST}/success`,
//         GET_JOB_INFO: `${HOST}/job/info`,
//         LIST: `${HOST}/job/search`
//     },
//     CODE: {
//         GET_CODE: `${HOST}/code/getCode`,
//         SAVE_CODE: `${HOST}/success`,
//         UPLOAD: `${HOST}/success`
//     },
//     TASK: {
//         LIST: `${HOST}/taskManage/list`,
//         DELETE_TASK: `${HOST}/success`,
//         ADD_TASK: `${HOST}/success`,
//         EDIT_TASK: `${HOST}/success`,
//         START: `${HOST}/success`,
//         PAUSE: `${HOST}/success`,
//         TRIGGER: `${HOST}/success`,
//         GET_TASK_INFO: `${HOST}/taskManage/detail`
//     },
//     LOG: {
//         TASK_LIST: `${HOST}/taskLog/list`,
//         JOB_LIST: `${HOST}/logJob/list`,
//         RE_IMPL: `${HOST}/success`,
//         GTE_LOG_INFO:  `${HOST}/logJob/detail`
//     },
//     LOGIN: `${HOST}/success`,
//     LOGOUT: `${HOST}/success`,
//     LOGIN_HTML: './login.html',
//     CODE_HTML: './code.html',
//     LOG_HTML: './log.html',
//     INDEX_HTML: '/'
// };

// 生產環境
const HOST = CONTEXT_PATH;
// const HOST = 'cmcc-job-admin';
export default {
    TYPE: 'production',
    HEADER: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
    },
    ACTUATOR: {
        LIST: `${HOST}/jobgroup/base`,
        DELETE_ACTUATOR: `${HOST}/jobgroup/remove`,
        SAVE_ACTUATOR: `${HOST}/jobgroup/save`,
        GET_ACTUATOR: `${HOST}/`,
        EDIT_ACTUATOR: `${HOST}/jobgroup/update`,
    },
    SCHEDULE: {
        GET_SCHEDULE: `${HOST}/taskJobRelation/relationInfo`,
        GET_JOB_INFO: `${HOST}/taskJobRelation/base`,
        ADD_NODE: `${HOST}/taskJobRelation/add`,
        EDIT_NODE: `${HOST}/taskJobRelation/edit`,
        DELETE_NODE: `${HOST}/taskJobRelation/delete`,
        SAVE_NODE: `${HOST}/taskJobRelation/updateRelation`,
        GET_NODE_INFO: `${HOST}/`
    },
    JOB: {
        BASE_LIST: `${HOST}/jobinfo/base`,
        ADD_JOB: `${HOST}/jobinfo/add`,
        EDIT_JOB: `${HOST}/jobinfo/edit`,
        DELETE_JOB: `${HOST}/jobinfo/remove`,
        GET_JOB_INFO: `${HOST}/`,
        LIST: `${HOST}/jobinfo/pageList`
    },
    CODE: {
        GET_CODE: `${HOST}/jobcode`,
        SAVE_CODE: `${HOST}/jobcode/save`,
        UPLOAD: `${HOST}/fileUpload/upload`
    },
    TASK: {
        LIST: `${HOST}/taskinfo/pageList`,
        DELETE_TASK: `${HOST}/taskinfo/remove`,
        ADD_TASK: `${HOST}/taskinfo/add`,
        EDIT_TASK: `${HOST}/taskinfo/edit`,
        START: `${HOST}/taskinfo/start`,
        PAUSE: `${HOST}/taskinfo/pause`,
        TRIGGER: `${HOST}/taskinfo/trigger`,
        GET_TASK_INFO: `${HOST}/`
    },
    LOG: {
        TASK_LIST: `${HOST}/taskMonitor/loadByTaskId`,
        JOB_LIST: `${HOST}/joblog/pageList`,
        RE_IMPL: `${HOST}/taskMonitor/reStart`,
        GET_LOG_INFO: `${HOST}/joblog/logDetailCat`,
    },
    LOGIN: `${HOST}/login`,
    LOGOUT: `${HOST}/logout`,
    LOGIN_HTML: `${HOST}/toLogin`,
    CODE_HTML: `${HOST}/jobcode`,
    LOG_HTML: `${HOST}/joblog/logDetailPage`,
    INDEX_HTML: `${HOST}/`
};
