import Camera from "./svg/Camera";

export const FileInputButton = () => (
  <button
    type="button"
    className="h-full w-full overflow-hidden text-gray-300 transition-shadow hover:bg-gray-50 hover:shadow-button"
  >
    <label
      className="flex h-full w-full items-center justify-center"
      htmlFor="file-input"
    >
      <Camera />
    </label>
  </button>
);
