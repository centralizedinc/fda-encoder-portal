
import TaskApi from '../../api/TaskApi';

const state = {
    tasks: null
}

const mutations = {
    SET_TASKS(state, task) {
        console.log("mutations")
        state.tasks = null;
        state.tasks = task;
        console.log("mutations state: " + JSON.stringify(state.tasks))
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