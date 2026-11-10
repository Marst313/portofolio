const Loading = () => {
  return (
    <div className="relative z-10 mx-auto flex min-h-[60dvh] w-full max-w-6xl items-center justify-center px-4 pt-28" aria-busy="true" aria-label="Loading">
      <span className="h-2 w-24 overflow-hidden rounded-full bg-white/[0.06]">
        <span className="block h-full w-1/2 animate-pulse rounded-full bg-ember" />
      </span>
    </div>
  );
};

export default Loading;
