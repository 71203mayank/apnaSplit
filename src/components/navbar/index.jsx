import Image from "next/image";
import Logo from "/public/Logo.svg"
const Navbar = () => {
    return(
        <div className="h-[50px] flex item-center bg-[#3F4347]">
            <Image src={Logo} alt='logo' height={36} width={'auto'} />
        </div>
    );
};

export default Navbar;