const MainReview = () => {
  return (
    <>
      <div className="p-4 my-8 md:w-72 w-full shadow-xl">
        <div className="flex gap-2">
          <div>
            <img
              className="w-16 h-16 rounded-full"
              src={"https://ui-avatars.com/api/?background=random"}
              alt="Image"
            />
          </div>
          <div className="my-auto">
            <div>
              <h1 className="text-lg">Seril Huan An</h1>
            </div>
            <div>
              <span className="text-sm text-gray-400">Exova Media</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <div>starts</div>
          <div>
            <span className="font-medium text-base">5.0</span>
          </div>
        </div>
        <div>
          <p className="font-base text-sm text-gray-400">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
        </div>
      </div>
    </>
  );
};
export default MainReview;
