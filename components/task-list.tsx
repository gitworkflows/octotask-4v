"use client"

import { useState } from "react"
import type { Task } from "@/lib/database.types"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import TaskItem from "@/components/task-item"
import CreateTaskDialog from "@/components/create-task-dialog"

export default function TaskList({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const addTask = (task: Task) => {
    setTasks([task, ...tasks])
  }

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Tasks ({tasks.length})</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/50">
          <p className="text-muted-foreground">You don&apos;t have any tasks yet.</p>
          <Button variant="outline" className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
            Create your first task
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onUpdate={updateTask} onDelete={deleteTask} />
          ))}
        </div>
      )}

      <CreateTaskDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} onTaskCreated={addTask} />
    </div>
  )
}
