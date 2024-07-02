import { Pagination } from "@nextui-org/react"

export const Paginations = () => {
    return(
        
      <Pagination
        className="w-full flex justify-end my-6 text-black"
        classNames={{
          cursor: "bg-transparent border-2 border-dark-blue/60 text-black",
          next: "bg-transparent !text-black",
          prev: "bg-transparent !text-black",
        }}
        size="sm"
        showControls
        total={1}
        initialPage={1}
      />
    )
}