/**
 * 生产注意要关闭，对性能有影响
 * @param {*} store
 */
export const actionPlugin = store => {
  store.subscribeAction((action, state) => {
    console.log('vuex.action', action)
    if (action.type === 'CHAT') {

    }
  })
}

export const commitPlugin = store => {
  store.subscribe((mutation, state) => {
    console.log('vuex.commit', mutation)
  })
}
