"use client";

export function NavigationLoadingBar() {
  return (
    <div
      className="fixed left-0 right-0 top-0 z-100 h-1 w-full overflow-hidden bg-(--foreground)/10"
      role="progressbar"
      aria-label="Carregando"
      aria-valuetext="Carregando"
    >
      <div
        className="h-full w-1/3 animate-navigation-loading rounded-r-full bg-(--primary)"
        aria-hidden
      />
    </div>
  );
}
