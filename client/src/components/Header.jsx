

export default function Header(){
    return (
        <div className="w-screen h-16 absolute top-0 right-0 left-0 flex  justify-between items-center px-16 pt-5 xs:flex-col xs:pt-16 xs:px-0">
           <div className="text-white font-serif text-xl cursor-pointer xs:text-2xl">
           Link Magic
           </div>  
           <div className="text-yellow-300 font-serif cursor-pointer xs:pt-5 xs:text-xl xs:px-2">
           Discover the Magic of Link Shortening
           </div>
        </div>
    )
}