const HOST = 'http://172.18.34.66:8415/mock/xxl';
export default {
    ACTUATOR: {
        LIST: `${HOST}/actuator/search`,
        DELETE: `${HOST}/success`,
        SAVE: `${HOST}/success`,
        GETACTUATOR: `${HOST}/actuator/info`,
        EDIT: `${HOST}/success`,
        SELECT_LIST: `${HOST}/actuator/list`
    },
    SCHEDULE: {
        GETSCHEDULE: `${HOST}/schedule/info`,
        JOBLIST: `${HOST}/job/list`,
        ADDNODE: `${HOST}/success`,
        EDITNODE: `${HOST}/success`,
        DELETENODE: `${HOST}/success`,
        SAVE: `${HOST}/success`,
        GETNODEINFO: `${HOST}/node/info`
    },
    JOB: {
        STRATEGY_LIST: `${HOST}/job/strategy/list`,
        RUN_MODE_LIST: `${HOST}/job/strategy/list`,
        ADD_JOB: `${HOST}/success`,
        UPDATE_JOB: `${HOST}/success`,
        DELETE_JOB: `${HOST}/success`,
        GET_JOB: `${HOST}/job/info`,
        SEARCH: `${HOST}/job/search`
    },
    CODE: {
        GET_CODE: `${HOST}/code/getCode`,
        SAVE_CODE: `${HOST}/success`,
        UPLOAD: `${HOST}/success`
    },
    TASK: {
        LIST: `${HOST}/taskManage/list`,
        DELETE: `${HOST}/success`,
        ADD: `${HOST}/success`,
        EDIT: `${HOST}/success`,
        TOGGLE_STATUS: `${HOST}/success`,
        DETAIL: `${HOST}/taskManage/detail`
    },
    LOG: {
        TASK_LIST: `${HOST}/taskLog/list`,
        JOB_LIST: `${HOST}/logJob/list`,
        RE_IMPL: `${HOST}/success`,
    }
};
