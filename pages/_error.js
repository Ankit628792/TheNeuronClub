import Image from 'next/image'
function Error() {
    return (
      <div className="w-full pt-28 min-h-[550px] grid place-items-center p-10">
          <div className="relative w-full h-full">
        <Image src="/images/error.svg" layout="fill" objectFit="contain" />
          </div>
      </div>
    )
  }
  
  export default Error