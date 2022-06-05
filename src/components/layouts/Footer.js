const Footer = () => {
  return (
    <>
      <footer className="bg-white mt-20">
        <div className="container px-6 py-4 mx-auto">
          <div>
            <p className="text-center text-gray-800">
              © Wendys Cake {new Date().getFullYear()} - All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
