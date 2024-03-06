import PhotoSection from "./components/PhotoSection";

const App = () => {
  return (
    <div className="min-h-screen px-[10%]">
      <div className="h-[20vh]" />
      <div className="mx-auto min-h-screen max-w-[1400px] rounded bg-gray-50 px-8 pt-4">
        <h1 className="mx-auto mb-4 max-w-[930px] text-xl font-normal text-[#333333]">
          Разместить объявление
        </h1>
        <main className="mx-auto flex max-w-[930px] flex-col gap-4 rounded bg-white p-4 shadow-main">
          <div className="h-20 bg-gray-50" />
          <PhotoSection />
          <div className="h-60 bg-gray-50" />
          <div className="h-60 bg-gray-50" />
          <div className="h-60 bg-gray-50" />
        </main>
      </div>
    </div>
  );
};

export default App;
