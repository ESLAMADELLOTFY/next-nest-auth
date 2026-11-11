"use client";
import Link from "next/link";
import { useGetUser } from "@/shared/hooks/get_user.hook";
import api from "../api";

const stats = [
  {
    label: "Total Projects",
    value: "24",
    change: "+12%",
    description: "Compared to last month",
    icon: "▦",
  },
  {
    label: "Active Tasks",
    value: "18",
    change: "+8%",
    description: "Compared to last month",
    icon: "✓",
  },
  {
    label: "Completed",
    value: "156",
    change: "+24%",
    description: "Compared to last month",
    icon: "↗",
  },
  {
    label: "Team Members",
    value: "12",
    change: "+2",
    description: "New members this month",
    icon: "♧",
  },
];

const activities = [
  {
    title: "Website redesign completed",
    description: "You completed the website redesign project.",
    time: "10 minutes ago",
    status: "Completed",
  },
  {
    title: "New task assigned",
    description: "A new task was assigned to your workspace.",
    time: "2 hours ago",
    status: "In Progress",
  },
  {
    title: "Project updated",
    description: "The mobile application project was updated.",
    time: "Yesterday",
    status: "Updated",
  },
];

const navigation = [
  { label: "Overview", icon: "⌂", href: "/dashboard", active: true },
  { label: "Projects", icon: "▦", href: "/dashboard/projects" },
  { label: "Tasks", icon: "✓", href: "/dashboard/tasks" },
  { label: "Team", icon: "♧", href: "/dashboard/team" },
  { label: "Settings", icon: "⚙", href: "/dashboard/settings" },
];

export const logoutUser = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export default function DashboardPage() {
  const { user, loading, error } = useGetUser();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Not authenticated</div>;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-white p-5 md:flex">
          <Link href="/dashboard" className="mb-10 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-xl font-bold text-white">
              S
            </div>
            <span className="text-xl font-bold tracking-tight">Solara</span>
          </Link>

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted">
            Workspace
          </p>

          <nav className="flex flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:bg-surface-hover hover:text-primary"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto rounded-xl bg-surface p-4">
            <p className="font-semibold">Need some help?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Check our help center to learn more about Solara.
            </p>
            <Link
              href="/help"
              className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
            >
              Visit help center →
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          {/* Header */}
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-white px-5 py-4 sm:px-8">
            <div>
              <p className="text-sm text-muted-foreground">Workspace</p>
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                aria-label="Notifications"
                className="relative flex size-10 items-center justify-center rounded-full border border-border text-lg hover:bg-surface"
              >
                ♧
                <span className="absolute right-2 top-2 size-2 rounded-full bg-error" />
              </button>

              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-secondary-light font-bold text-primary">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <Link
                href="/login"
                className="rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-surface"
              >
                <button onClick={logoutUser}>Sign out</button>
              </Link>
            </div>
          </header>

          {/* Dashboard content */}
          <div className="mx-auto max-w-7xl p-5 sm:p-8">
            {/* Welcome */}
            <section className="mb-8">
              <p className="text-sm font-medium text-secondary-dark">
                {new Date().toLocaleDateString()}
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Welcome back, {user.name}! 👋
              </h2>
              <p className="mt-2 text-muted-foreground">
                Here&apos;s what&apos;s happening with your workspace today.
              </p>
            </section>

            {/* Statistics */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <span className="flex size-10 items-center justify-center rounded-lg bg-surface text-xl text-primary">
                      {stat.icon}
                    </span>
                  </div>

                  <div className="mt-5 flex items-end gap-3">
                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                    <span className="mb-1 text-sm font-semibold text-success">
                      {stat.change}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              ))}
            </section>

            {/* Main sections */}
            <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
              {/* Activity */}
              <div className="rounded-xl border border-border bg-white p-5 xl:col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">Recent Activity</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Keep track of your latest updates.
                    </p>
                  </div>

                  <Link
                    href="/dashboard/activity"
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    View all
                  </Link>
                </div>

                <div className="mt-6 divide-y divide-border">
                  {activities.map((activity) => (
                    <div
                      key={activity.title}
                      className="flex flex-wrap items-center justify-between gap-3 py-5 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1 size-2 shrink-0 rounded-full bg-secondary" />
                        <div>
                          <p className="text-sm font-semibold">
                            {activity.title}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {activity.description}
                          </p>
                          <p className="mt-2 text-xs text-muted">
                            {activity.time}
                          </p>
                        </div>
                      </div>

                      <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-primary">
                        {activity.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div className="rounded-xl border border-border bg-white p-5">
                <h3 className="text-lg font-bold">Quick Actions</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Get things done faster.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href="/dashboard/projects/new"
                    className="flex items-center justify-between rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                  >
                    Create New Project
                    <span>+</span>
                  </Link>

                  <Link
                    href="/dashboard/tasks/new"
                    className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm font-semibold transition-colors hover:bg-surface"
                  >
                    Add New Task
                    <span className="text-primary">+</span>
                  </Link>

                  <Link
                    href="/dashboard/team"
                    className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm font-semibold transition-colors hover:bg-surface"
                  >
                    Invite Team Member
                    <span className="text-primary">+</span>
                  </Link>
                </div>

                <div className="mt-8 rounded-xl bg-surface p-4">
                  <p className="text-sm font-semibold">Your workspace is ready</p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    Start organizing your projects and tracking your progress.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
