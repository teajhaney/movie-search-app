import { footerItems } from "../constant/constant";
import Button from "./button";

const Footer = () => {
  return (
    <div className="flex flex-col gap-5 pb-10  md:mt-32 lg:px-10  max-w-7xl relative left-1/2 transform -translate-x-1/2  z-0   w-full  text-white px-10">
      <div className="place-self-center flex gap-3">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email address"
          className="h-12 w-56 p-2 lg:w-80 items-center text-sm  border  focus:border-[#030014] text-[#030014] focus:border-1 border-[#AB8BFF]  rounded-lg] rounded-lg"
        />
        <Button
          className="bg-[#AB8BFF] text-black transition rounded-sm"
          text="Get newsletter"
          spanIcon=">"
        />
      </div>
      <h3>Questions? Call 0800 123 3627</h3>
      <ul className=" grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {footerItems.map((footerItem) => (
          <p key={footerItem}>{footerItem}</p>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
