export function DashboardPreview() {
  return (
    <div className="ring-background relative mx-auto aspect-5/4 w-full max-w-6xl overflow-hidden rounded-lg bg-white p-1.5 shadow-lg ring-1 inset-shadow-2xs shadow-zinc-950/15 sm:aspect-4/3 sm:rounded-xl sm:p-2.5 md:aspect-15/8 dark:bg-zinc-800 dark:inset-shadow-black/20">
      {/* Dashboard Skeleton - JetBrains Islands Style */}
      <div className="flex h-full gap-1.5 sm:gap-2.5">
        {/* Sidebar Island - Hidden on mobile, visible from sm */}
        <div className="hidden w-28 shrink-0 flex-col rounded-lg bg-zinc-100 p-2 shadow-sm sm:flex md:w-36 lg:w-44 lg:p-2.5 dark:bg-zinc-900/90">
          {/* Logo */}
          <div className="mb-2 flex items-center gap-1.5 px-1 lg:mb-3 lg:gap-2">
            <div className="bg-primary/25 size-5 animate-pulse rounded-md lg:size-6"></div>
            <div className="h-3 w-12 animate-pulse rounded bg-zinc-200 lg:h-3.5 lg:w-16 dark:bg-zinc-700"></div>
          </div>
          {/* Search - Subtle inset */}
          <div className="mb-2 flex h-6 items-center gap-1 rounded-md bg-white px-1.5 lg:mb-3 lg:h-7 lg:gap-1.5 lg:px-2 dark:bg-zinc-800/50">
            <div className="size-2.5 rounded bg-zinc-300 lg:size-3 dark:bg-zinc-600"></div>
            <div className="h-1.5 w-10 rounded bg-zinc-200 lg:h-2 lg:w-14 dark:bg-zinc-600"></div>
          </div>
          {/* Nav Items - Clear active state */}
          <div className="space-y-0.5">
            <div className="bg-primary/10 flex h-6 items-center gap-1.5 rounded-md px-1.5 lg:h-7 lg:gap-2 lg:px-2">
              <div className="bg-primary/60 size-2.5 rounded lg:size-3"></div>
              <div className="bg-primary/40 h-1.5 w-10 rounded lg:h-2 lg:w-12"></div>
            </div>
            <div className="flex h-6 items-center gap-1.5 rounded-md px-1.5 lg:h-7 lg:gap-2 lg:px-2">
              <div className="size-2.5 rounded bg-zinc-300 lg:size-3 dark:bg-zinc-600"></div>
              <div className="h-1.5 w-12 rounded bg-zinc-200 lg:h-2 lg:w-14 dark:bg-zinc-600"></div>
            </div>
            <div className="flex h-6 items-center gap-1.5 rounded-md px-1.5 lg:h-7 lg:gap-2 lg:px-2">
              <div className="size-2.5 rounded bg-zinc-300 lg:size-3 dark:bg-zinc-600"></div>
              <div className="h-1.5 w-8 rounded bg-zinc-200 lg:h-2 lg:w-10 dark:bg-zinc-600"></div>
            </div>
            <div className="hidden h-6 items-center gap-1.5 rounded-md px-1.5 lg:flex lg:h-7 lg:gap-2 lg:px-2">
              <div className="size-2.5 rounded bg-zinc-300 lg:size-3 dark:bg-zinc-600"></div>
              <div className="h-1.5 w-10 rounded bg-zinc-200 lg:h-2 lg:w-12 dark:bg-zinc-600"></div>
            </div>
          </div>
          {/* User - Bottom section */}
          <div className="mt-auto flex items-center gap-1.5 rounded-md bg-white/50 p-1 lg:gap-2 lg:p-1.5 dark:bg-zinc-800/30">
            <div className="size-5 animate-pulse rounded-full bg-zinc-200 lg:size-6 dark:bg-zinc-600"></div>
            <div className="flex-1">
              <div className="mb-0.5 h-1.5 w-10 animate-pulse rounded bg-zinc-200 lg:h-2 lg:w-14 dark:bg-zinc-600"></div>
              <div className="h-1 w-14 rounded bg-zinc-100 lg:h-1.5 lg:w-18 dark:bg-zinc-700"></div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col gap-1.5 sm:gap-2.5">
          {/* Header Island */}
          <div className="flex items-center justify-between rounded-md bg-zinc-100 p-1.5 shadow-sm sm:rounded-lg sm:p-2.5 dark:bg-zinc-900/90">
            <div className="min-w-0 flex-1">
              <div className="mb-0.5 h-2.5 w-16 animate-pulse rounded bg-zinc-200 sm:mb-1 sm:h-4 sm:w-28 dark:bg-zinc-700"></div>
              <div className="h-1.5 w-24 rounded bg-zinc-200/50 sm:h-2 sm:w-40 dark:bg-zinc-700/50"></div>
            </div>
            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              <div className="bg-primary/15 hidden h-7 items-center gap-1.5 rounded-md px-2.5 sm:flex">
                <div className="bg-primary/50 size-3 rounded"></div>
                <div className="bg-primary/40 h-2 w-12 rounded"></div>
              </div>
              <div className="size-6 rounded bg-zinc-200/50 sm:size-8 sm:rounded-md dark:bg-zinc-700"></div>
              <div className="size-6 animate-pulse rounded-full bg-zinc-200 sm:size-8 dark:bg-zinc-600"></div>
            </div>
          </div>

          {/* Stats Grid - 2 cols on mobile, 4 on lg */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5 lg:grid-cols-4">
            <div className="rounded-md bg-zinc-100 p-1.5 shadow-sm sm:rounded-lg sm:p-2.5 dark:bg-zinc-900/90">
              <div className="mb-0.5 flex items-center justify-between sm:mb-1.5">
                <div className="h-1.5 w-8 rounded bg-zinc-200 sm:h-2 sm:w-14 dark:bg-zinc-700"></div>
                <div className="size-4 rounded bg-blue-100 sm:size-6 sm:rounded-md dark:bg-blue-900/30"></div>
              </div>
              <div className="mb-0.5 h-4 w-8 animate-pulse rounded bg-zinc-300 sm:mb-1 sm:h-6 sm:w-12 dark:bg-zinc-600"></div>
              <div className="h-0.5 w-6 rounded-full bg-emerald-200 sm:h-1 sm:w-10 dark:bg-emerald-800/50"></div>
            </div>
            <div className="rounded-md bg-zinc-100 p-1.5 shadow-sm sm:rounded-lg sm:p-2.5 dark:bg-zinc-900/90">
              <div className="mb-0.5 flex items-center justify-between sm:mb-1.5">
                <div className="h-1.5 w-6 rounded bg-zinc-200 sm:h-2 sm:w-12 dark:bg-zinc-700"></div>
                <div className="size-4 rounded bg-emerald-100 sm:size-6 sm:rounded-md dark:bg-emerald-900/30"></div>
              </div>
              <div className="mb-0.5 h-4 w-6 animate-pulse rounded bg-zinc-300 sm:mb-1 sm:h-6 sm:w-10 dark:bg-zinc-600"></div>
              <div className="h-0.5 w-8 rounded-full bg-zinc-200 sm:h-1 sm:w-12 dark:bg-zinc-700"></div>
            </div>
            <div className="hidden rounded-lg bg-zinc-100 p-2.5 shadow-sm lg:block dark:bg-zinc-900/90">
              <div className="mb-1.5 flex items-center justify-between">
                <div className="h-2 w-10 rounded bg-zinc-200 dark:bg-zinc-700"></div>
                <div className="size-6 rounded-md bg-amber-100 dark:bg-amber-900/30"></div>
              </div>
              <div className="mb-1 h-6 w-8 animate-pulse rounded bg-zinc-300 dark:bg-zinc-600"></div>
              <div className="h-1 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700"></div>
            </div>
            <div className="hidden rounded-lg bg-zinc-100 p-2.5 shadow-sm lg:block dark:bg-zinc-900/90">
              <div className="mb-1.5 flex items-center justify-between">
                <div className="h-2 w-12 rounded bg-zinc-200 dark:bg-zinc-700"></div>
                <div className="size-6 rounded-md bg-purple-100 dark:bg-purple-900/30"></div>
              </div>
              <div className="mb-1 h-6 w-10 animate-pulse rounded bg-zinc-300 dark:bg-zinc-600"></div>
              <div className="h-1 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700"></div>
            </div>
          </div>

          {/* Table Island - Main content area */}
          <div className="min-h-0 flex-1 overflow-hidden rounded-md bg-zinc-100 shadow-sm sm:rounded-lg dark:bg-zinc-900/90">
            {/* Table Header */}
            <div className="flex items-center gap-1.5 border-b border-zinc-200/50 px-1.5 py-1 sm:gap-3 sm:px-3 sm:py-2 dark:border-zinc-700/50">
              <div className="size-2.5 rounded bg-zinc-200 sm:size-3 dark:bg-zinc-700"></div>
              <div className="h-1.5 w-10 rounded bg-zinc-200 sm:h-2 sm:w-20 dark:bg-zinc-700"></div>
              <div className="hidden h-2 w-20 rounded bg-zinc-200 sm:block dark:bg-zinc-700"></div>
              <div className="ms-auto h-1.5 w-8 rounded bg-zinc-200 sm:h-2 sm:w-12 dark:bg-zinc-700"></div>
            </div>
            {/* Table Rows */}
            <div className="divide-y divide-zinc-200/30 dark:divide-zinc-700/30">
              <div className="flex items-center gap-1.5 px-1.5 py-1.5 sm:gap-3 sm:px-3 sm:py-2.5">
                <div className="size-2.5 shrink-0 rounded bg-zinc-200/50 sm:size-3 dark:bg-zinc-700/50"></div>
                <div className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2.5">
                  <div className="size-6 shrink-0 rounded-full bg-linear-to-br from-blue-400 to-blue-600 sm:size-8"></div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 h-2.5 w-full max-w-16 animate-pulse rounded bg-zinc-200 sm:mb-1 sm:h-3 sm:max-w-24 dark:bg-zinc-700"></div>
                    <div className="h-1.5 w-full max-w-24 rounded bg-zinc-200/50 sm:h-2 sm:max-w-32 dark:bg-zinc-700/50"></div>
                  </div>
                </div>
                <div className="h-4 w-10 shrink-0 rounded-full bg-emerald-100 sm:h-5 sm:w-14 dark:bg-emerald-900/30"></div>
              </div>
              <div className="flex items-center gap-1.5 px-1.5 py-1.5 opacity-90 sm:gap-3 sm:px-3 sm:py-2.5">
                <div className="size-2.5 shrink-0 rounded bg-zinc-200/50 sm:size-3 dark:bg-zinc-700/50"></div>
                <div className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2.5">
                  <div className="size-6 shrink-0 rounded-full bg-linear-to-br from-purple-400 to-purple-600 sm:size-8"></div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 h-2.5 w-full max-w-20 animate-pulse rounded bg-zinc-200 sm:mb-1 sm:h-3 sm:max-w-28 dark:bg-zinc-700"></div>
                    <div className="h-1.5 w-full max-w-28 rounded bg-zinc-200/50 sm:h-2 sm:max-w-36 dark:bg-zinc-700/50"></div>
                  </div>
                </div>
                <div className="h-4 w-10 shrink-0 rounded-full bg-amber-100 sm:h-5 sm:w-14 dark:bg-amber-900/30"></div>
              </div>
              <div className="flex items-center gap-1.5 px-1.5 py-1.5 opacity-75 sm:gap-3 sm:px-3 sm:py-2.5">
                <div className="size-2.5 shrink-0 rounded bg-zinc-200/50 sm:size-3 dark:bg-zinc-700/50"></div>
                <div className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2.5">
                  <div className="size-6 shrink-0 rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 sm:size-8"></div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 h-2.5 w-full max-w-14 animate-pulse rounded bg-zinc-200 sm:mb-1 sm:h-3 sm:max-w-20 dark:bg-zinc-700"></div>
                    <div className="h-1.5 w-full max-w-20 rounded bg-zinc-200/50 sm:h-2 sm:max-w-28 dark:bg-zinc-700/50"></div>
                  </div>
                </div>
                <div className="h-4 w-10 shrink-0 rounded-full bg-blue-100 sm:h-5 sm:w-14 dark:bg-blue-900/30"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Border Beam Effects - Desktop */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] border-(length:--border-beam-width) border-transparent mask-[linear-gradient(transparent,transparent),linear-gradient(#000,#000)] mask-intersect [mask-clip:padding-box,border-box]"
        style={{ '--border-beam-width': '1px' } as React.CSSProperties}
      >
        <div
          className="from-destructive dark:from-destructive absolute aspect-square animate-[border-beam_8s_linear_infinite_0s] rounded-full bg-linear-to-l via-amber-600 to-transparent max-md:hidden dark:via-amber-400"
          style={
            {
              width: '300px',
              offsetPath: 'rect(0px auto auto 0px round 16px)',
            } as React.CSSProperties
          }
        ></div>
      </div>
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] border-(length:--border-beam-width) border-transparent mask-[linear-gradient(transparent,transparent),linear-gradient(#000,#000)] mask-intersect [mask-clip:padding-box,border-box]"
        style={{ '--border-beam-width': '1px' } as React.CSSProperties}
      >
        <div
          className="absolute aspect-square animate-[border-beam_8s_linear_infinite_-2.67s] rounded-full bg-linear-to-l from-green-600 via-sky-600 to-transparent max-md:hidden dark:from-green-400 dark:via-sky-400"
          style={
            {
              width: '300px',
              offsetPath: 'rect(0px auto auto 0px round 16px)',
            } as React.CSSProperties
          }
        ></div>
      </div>
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] border-(length:--border-beam-width) border-transparent mask-[linear-gradient(transparent,transparent),linear-gradient(#000,#000)] mask-intersect [mask-clip:padding-box,border-box]"
        style={{ '--border-beam-width': '1px' } as React.CSSProperties}
      >
        <div
          className="from-primary/80 via-primary/30 absolute aspect-square animate-[border-beam_8s_linear_infinite_-5.33s] rounded-full bg-linear-to-l to-transparent max-md:hidden"
          style={
            {
              width: '350px',
              offsetPath: 'rect(0px auto auto 0px round 16px)',
            } as React.CSSProperties
          }
        ></div>
      </div>

      {/* Border Beam Effects - Mobile */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] border-(length:--border-beam-width) border-transparent mask-[linear-gradient(transparent,transparent),linear-gradient(#000,#000)] mask-intersect [mask-clip:padding-box,border-box]"
        style={{ '--border-beam-width': '1px' } as React.CSSProperties}
      >
        <div
          className="from-destructive dark:from-destructive absolute aspect-square animate-[border-beam_8s_linear_infinite_0s] rounded-full bg-linear-to-l via-amber-600 to-transparent md:hidden dark:via-amber-400"
          style={
            {
              width: '300px',
              offsetPath: 'rect(0px auto auto 0px round 16px)',
            } as React.CSSProperties
          }
        ></div>
      </div>
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] border-(length:--border-beam-width) border-transparent mask-[linear-gradient(transparent,transparent),linear-gradient(#000,#000)] mask-intersect [mask-clip:padding-box,border-box]"
        style={{ '--border-beam-width': '1px' } as React.CSSProperties}
      >
        <div
          className="absolute aspect-square animate-[border-beam_8s_linear_infinite_-4s] rounded-full bg-linear-to-l from-green-600 via-sky-600 to-transparent md:hidden dark:from-green-400 dark:via-sky-400"
          style={
            {
              width: '300px',
              offsetPath: 'rect(0px auto auto 0px round 16px)',
            } as React.CSSProperties
          }
        ></div>
      </div>
    </div>
  )
}
