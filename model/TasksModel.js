import { BaseModel } from 'startupjs/orm'

export default class TasksModel extends BaseModel {
  async addSelf () {
    await this.root.addAsync(this.getCollection(), {
      id: this.getId(),
      list: []
    })
  }

  async addTask (text) {
    if (!text) throw new Error("You didn't enter text")
    const id = this.id()
    const task = {
      id,
      text,
      completed: false,
      createdAt: Date.now()
    }
    await this.pushAsync('list', task)
    return id
  }

  async removeTask (id) {
    if (id !== 0 && !id) throw new Error('Error remove task')
    await this.removeAsync('list', id)
  }

  async toggleCompleted (id) {
    if (id !== 0 && !id) throw new Error('Error toggle completed task')
    const completed = this.get(`list.${id}.completed`)
    await this.setAsync(`list.${id}.completed`, !completed)
  }

  async saveTask (id, text) {
    if (id !== 0 && !id) throw new Error('Error save task')
    await this.setAsync(`list.${id}.text`, text)
  }

  async removeAllTasks () {
    await this.setAsync('list', [])
  }
}
