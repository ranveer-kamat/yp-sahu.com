export function Button({ children, ...props }) {
  return (
    <button
      className="px-4 py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-800"
      {...props}
    >
      {children}
    </button>
  );
}
