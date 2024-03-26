import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";

const SocialShareButtons = ({ url }) => {
  return (
    <div className="w-full flex justify-between">
      <a
        href={`https://facebook.com/dialog/share?app_id=3648988545420686&display=popup&href=${url}`}
        target="_blank"
        rel="noref"
      >
        <FaFacebook className="text-[#3b5998] w-12 h-auto" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${url}`}
        target="_blank"
        rel="noref"
      >
        <FaSquareTwitter className="text-[#00acee] w-12 h-auto" />
      </a>

      <a
        href={`https://api.whatsapp.com/send?text=${url}`}
        target="_blank"
        rel="noref"
      >
        <IoLogoWhatsapp className="text-[#25D366] w-12 h-auto" />
      </a>
    </div>
  );
};

export default SocialShareButtons;
