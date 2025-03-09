import Image from "next/image";
import Github from "/public/github.svg"
const Footer = () => {
    return (
        <div className="h-[200px] border border-blue-400 bg-[#20BD9C] text-white text-center px-4 flex flex-col justify-center items-center gap-4">
            <div>
                Developed by <a href="https://www.linkedin.com/in/mayank-gupta-715210242" className="italic underline">Gupta Ji</a> &ndash; Because your one friend who ordered only water shouldn&apos;t go broke!
            </div>
            <div>
                <a href="https://github.com/71203mayank/apnaSplit"><Image src={Github} alt = 'github' height={36} width={36}/></a>
                
            </div>
        </div>
    );
};

export default Footer;