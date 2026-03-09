"use client";

export function LanguageLoader() {
  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-(--background)"
      role="status"
      aria-label="Carregando idioma"
    >
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-(--foreground) border-t-transparent"
        aria-hidden
      />
    </div>
  );
}
