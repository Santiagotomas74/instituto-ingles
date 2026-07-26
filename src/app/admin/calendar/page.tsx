import Calendar from "./components/Calendar";

export default function CalendarPage() {
  return (
    <main
      className="
      min-h-screen
      bg-gradient-to-br
      from-slate-50
      via-white
      to-cyan-50
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-8
        "
      >
        <Calendar />
      </div>
    </main>
  );
}
