export default function AddButton({ onClick }) {
  return (
    <div
      className="max-w-md min-w-[200px] rounded-lg overflow-hidden shadow-lg border-4 border-green-800 basis-1/6 aspect-square my-4 grid grid-cols-1 place-content-center text-center cursor-pointer bg-green-100 text-emerald-800"
      onClick={onClick}
    >
      <div className="px-6 py-4 text-2xl font-black mb-2 grow">Add Product</div>
    </div>
  );
}
