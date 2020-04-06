import React, { useState } from 'react'
import { TouchableOpacity, Text, View, TextInput } from 'react-native'
import { observer, useModel } from 'startupjs'
import './index.styl'

export default observer(function Task ({ task = {}, number }) {
  let $list = useModel('tasks.first')
  const [isEdit, setIsEdit] = useState(false)
  const [taskText, setTaskText] = useState(task.text)

  async function removeTask () {
    $list.removeTask(number)
  }

  async function toggleCompleted () {
    $list.toggleCompleted(number)
  }

  async function saveTask () {
    $list.saveTask(number, taskText)
    setIsEdit(false)
  }

  function editTask () {
    setIsEdit(true)
  }

  return pug`
    View.container
      Text.numberTask #{number + 1}.
      if isEdit
        TextInput.fieldTask(value=taskText onChangeText=setTaskText)
      else
        Text.textTask #{task.text}
      TouchableOpacity.removeTask(onPress=isEdit ? saveTask : editTask)
        Text.removeText #{isEdit ? 'SAVE TASK' : 'EDIT TASK'}
      TouchableOpacity.removeTask(onPress=removeTask)
        Text.removeText DELETE TASK
      TouchableOpacity.completedTask(
        onPress=toggleCompleted
        styleName=[
          task.completed && 'done'
        ]
      )
  `
})
