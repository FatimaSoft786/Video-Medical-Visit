import React from 'react'

const UserIcon = () => {
  return (
    <div className="flex-1 min-w-[150px] max-md:min-w-16 flex max-md:flex-col items-center gap-2">
      <Image src="/svg/user.svg" className="size-8" alt="User Icon" /> Hamza
      Yasin
    </div>
  );
}

export default UserIcon
