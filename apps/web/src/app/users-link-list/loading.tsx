export default function Loading() {
  const arr: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <section
      data-cy="loading-users-link-list"
      className="max-w-5xl w-full flex flex-col justify-center items-center"
    >
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex justify-center items-center space-x-3">
          <div className="w-52 h-10 bg-slate-300 dark:bg-accent animate-pulse"></div>
          <div className="rounded-full w-10 h-10 animate-pulse bg-slate-300 dark:bg-accent"></div>
        </div>
        <div className="h-5 w-32 bg-slate-300 dark:bg-accent animate-pulse mt-4"></div>
        <div className="mt-8 w-full space-y-2">
          {arr.map((item) => (
            <div
              key={item}
              className="h-12 bg-slate-300 dark:bg-accent animate-pulse w-full"
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
