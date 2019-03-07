
import TaskApi from '../../api/TaskApi';

const state = {
    tasks: null
}

const mutations = {
    SET_TASKS(state, task) {        
        state.tasks = task;        
    },
    CLEAR(state){
        state.tasks = null;
    }
}

var actions = {
    GET_TASKS(context) {
        return new Promise((resolve, reject) => {
            console.log("actions")
            new TaskApi(context.rootState.user_session.token).getTask((task, err) => {
                console.log("actions task")
                if (!err) {
                    context.commit('SET_TASKS', task)
                    resolve()
                } else {
                    console.log(JSON.stringify(err))
                    reject()
                }
            })
        })
    }

}

export default {
    state,
    mutations,
    actions
}