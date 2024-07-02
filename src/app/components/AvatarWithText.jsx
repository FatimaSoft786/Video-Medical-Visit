import React from "react";

const AvatarWithText = ({ apatientName }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Image src="/svg/user.svg" className="size-8" alt="User Icon" />
      {apatientName}
    </div>
  );
};

export default AvatarWithText;
