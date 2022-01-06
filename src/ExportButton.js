export default function ExportButton({ onClick }) {
  return (
    <div
      className="max-w-md min-w-[200px] rounded-lg overflow-hidden shadow-lg border-4 border-blue-800 basis-1/6 aspect-square my-4 grid grid-cols-1 place-content-center text-center cursor-pointer bg-blue-100 text-blue-800"
      onClick={onClick}
    >
      <div className="px-6 py-4 text-2xl font-black mb-2 grow">Export Data</div>
    </div>
  );
}
