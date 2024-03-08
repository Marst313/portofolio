import { sosialLinks } from '@/utils/static';
import { FaArrowRightLong } from 'react-icons/fa6';
import Image from 'next/image';

const Contact = () => {
  return (
    <section className=" flex pt-0 xl:pt-5 flex-col">
      <h1 className="font-bold xl:text-5xl">Contact Me</h1>

      <div className="flex gap-5 mt-2 lg:mt-5  z-50 relative ">
        {sosialLinks.map((social) => {
          return (
            <a href={social.url} key={social.name} target="_blank" className="hover:scale-110 w-6 h-6 xl:w-7 xl:h-7">
              <Image src={social.image} height={30} width={30} alt={`${social.name} logo`} />
            </a>
          );
        })}
      </div>

      <div className="self-center mt-2 lg:mt-8 bg-white/30 p-5 lg:p-10 relative w-full 2xl:w-[70%] rounded-md  flex gap-2 lg:gap-10 flex-col xl:flex-row ">
        <Image src="/assets/contact/top.svg" height={100} width={120} alt="images-decoration-top" className="absolute top-0 right-0 hidden md:block -z-10" />
        <Image src="/assets/contact/bottom.svg" height={100} width={150} alt="images-decoration-bottom" className="absolute bottom-0 right-0 hidden md:block -z-10" />

        <div className="xl:w-1/2 w-full">
          <div className="flex items-center gap-5">
            <Image src="/assets/contact/email.svg" height={40} width={40} alt="email icon" className="w-7 lg:w-10" />
            <h1 className="text-base lg:text-2xl">Get In Touch</h1>
          </div>

          <form className="lg:mt-10 mt-2 w-full  flex flex-col gap-5">
            <input type="text" className="xl:w-96 w-full shadow-lg h-10 p-5 text-black outline-blue-300 " placeholder="Your Name" />
            <input type="email" className="xl:w-96 w-full shadow-lg h-10 p-5 text-black outline-blue-300" placeholder="Email Address" />
            <textarea className="xl:w-96 w-full lg:h-52 outline-blue-300 p-5 text-black" placeholder="Message" />
            <button type="button" className="xl:w-96 w-full bg-blue-600 py-2 lg:py-3 font-semibold flex items-center justify-center gap-5 hover:bg-blue-700">
              Send Now
              <FaArrowRightLong className="w-7 h-7" />
            </button>
          </form>
        </div>

        <div className="h-64 w-[1px] bg-white items-center self-center rounded-full hidden xl:block"></div>

        <ul className="w-1/2 flex flex-col items-start justify-center gap-5">
          <li className="flex items-center gap-3">
            <Image src="/assets/contact/gmail.svg" height={40} width={40} alt="email icon" />
            <h5>dlegoinyoman1@gmail.com</h5>
          </li>

          <li className="flex items-center gap-3">
            <Image src="/assets/contact/instagram.svg" height={40} width={40} alt="email icon" />
            <h5>@inyoman_dharma</h5>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Contact;
