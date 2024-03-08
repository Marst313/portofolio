import Link from 'next/link';

const NotFound = () => {
  return (
    <section className="flex flex-col ">
      <h1>
        Not Found !!!
        <br />
        <span>Could not find requested resource</span>
      </h1>

      <Link href="/" className="z-50  bg-blue-500  px-5 py-1 mt-10 w-fit shadow-black rounded-lg text-3xl">
        Return Home
      </Link>
    </section>
  );
};

export default NotFound;
