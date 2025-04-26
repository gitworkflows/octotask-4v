import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import TaskList from "@/components/task-list"
import DashboardHeader from "@/components/dashboard-header"

export default async function Dashboard() {
  const supabase = createClient()

  // Check if user is logged in
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Fetch user's tasks
  const { data: tasks } = await supabase.from("user_tasks").select("*").order("created_at", { ascending: false })

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={session.user} />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Tasks</h1>
        <TaskList initialTasks={tasks || []} />
      </main>
    </div>
  )
}
