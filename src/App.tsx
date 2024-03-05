import PhotoSection from "./components/PhotoSection";

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1200px] bg-gray-100 min-h-screen flex flex-col justify-center mx-auto px-8 mt-[10%] rounded">
        <h1 className="text-[#333333] mb-4 text-xl font-normal">
          Разместить объявление
        </h1>
        <main className="bg-white p-4 shadow-main rounded flex flex-col gap-4">
          <div className="h-20 bg-gray-100" />
          <PhotoSection />
          <div className="h-60 bg-gray-100" />
          <div className="h-60 bg-gray-100" />
          <div className="h-60 bg-gray-100" />
        </main>
      </div>
    </div>
  );
};

export default App;
