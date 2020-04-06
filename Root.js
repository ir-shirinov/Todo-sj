import { BASE_URL } from '@env'
import init from 'startupjs/init'
import orm from './model'
import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'
import {
  observer,
  useDoc
} from 'startupjs'
import './Root.styl'
import { Tasks } from './components'

// Init startupjs connection to server and the ORM.
// baseUrl option is required for the native to work - it's used
// to init the websocket connection and axios.
// Initialization must start before doing any subscribes to data.
init({ baseUrl: BASE_URL, orm })

export default observer(function Root () {
  const [tasks, $tasks] = useDoc('tasks', 'first')
  if (!tasks) throw $tasks.addSelf()
  const [taskText, setTaskText] = useState('')
  const [loading, setLoading] = useState(false)

  async function addTask () {
    setLoading(true)
    await $tasks.addTask(taskText)
    setTaskText('')
    setLoading(false)
  }

  async function removeAllTasks () {
    await $tasks.removeAllTasks(taskText)
  }

  return pug`
    View.body
      TextInput.field(value=taskText onChangeText=setTaskText editable=!loading)
      TouchableOpacity(
        onPress=addTask
        disabled = !taskText || loading
        styleName=[
          'button',
          taskText && !loading && 'active'
        ]
      )
        Text.label Add task
      Tasks(tasks = tasks && tasks.list)
      Text.result Not completed tasks: #{tasks && tasks.list && tasks.list.filter(item => !item.completed).length}
      Text.result Total tasks: #{tasks && tasks.list && tasks.list.length}
      if tasks && tasks.list && tasks.list.length
        TouchableOpacity.button(
          onPress=removeAllTasks
        )
          Text.label Remove All Tasks
  `
})
