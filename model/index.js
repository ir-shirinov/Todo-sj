import Tasks from './TasksModel'

export default function (racer) {
  racer.orm('tasks.*', Tasks)
}
