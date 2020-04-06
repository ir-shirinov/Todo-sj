import React from 'react'
import { Text } from 'react-native'
import { Task } from '../'
import './index.styl'

export default function Tasks ({ tasks = [] }) {
  if (!tasks.length) return pug`Text.text You don't have tasks`
  return pug`
    each item, index in tasks
      Task(key=item.id task=item number=index)
  `
}
