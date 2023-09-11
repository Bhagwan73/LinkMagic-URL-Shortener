import { useState } from "react";
import Header from "./Header";


export default function Home() {
    const [url, setUrl] = useState("")
    const [shortUrl, setShortUrl] = useState("")

    const handleClick = function () {
        if(!url) {
            alert("Please enter a URL before continuing.")
            return;
        }
        setShortUrl("Please wait ...")
        fetch(`${process.env.REACT_APP_BACKEND_URL}/shortURL`, {
            method: 'POST',
            body:JSON.stringify({longUrl:url}),
            headers:{'Content-Type':'application/json'}
        }).then((result) => result.json().then((responce) => {
            console.log(responce)
            if (responce.status) { 
                setShortUrl(`${process.env.REACT_APP_BACKEND_URL}/${responce.URL.shortId}`)
            }else {
                alert(`${responce.message}`)
            }
        }))
        .catch((err)=>console.log(err))
    }

    const handleCopied=function() {
        navigator.clipboard.writeText(shortUrl)
        .then(()=>{
            alert("link is copied on clipbord")
            setShortUrl("")
            setUrl("")
        })
        .catch((err)=>console.log(err))
    }

    return (
        <div className="h-screen w-screen bg-cover relative z-0" style={{ backgroundImage: `url('bg.jpg')` }}>
            <Header />

            <div className="text-white flex flex-col justify-center items-center h-full pb-8">
                <div className="text-xl pt-5 italic  xs:text-2xl">Your Ultimate URL Shortener</div>
                <div className="uppercase text-4xl py-5 font-serif xs:text-2xl">Link Magic</div>

                <section
                    className={` ${shortUrl ? 'hidden' : 'visibble'} w-2/5 h-12 rounded-r-full rounded-l-full bg-slate-50 bg-opacity-40 pl-5 flex items-center xs:w-11/12 xs:mb-2`}
                >
                    <input 
                        type="text"
                        placeholder="Your URL Here"
                        value={url}
                        className="w-full h-full focus:outline-none placeholder:text-white mx-5 bg-transparent font-semibold font-sans text-black text-xl"
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <i 
                    className={`bx bx-right-arrow-circle text-black w-16 h-full text-4xl flex items-center cursor-pointer bg-yellow-300  ${url ? "bg-yellow-300" : 'bg-opacity-50'} hover:bg-yellow-300 rounded-full justify-center`}
                    onClick={handleClick}
                    ></i>
                </section>
  
                <section className={` ${shortUrl ? 'visible' :'hidden'} w-2/5 h-12  rounded-r-full rounded-l-full bg-slate-50 bg-opacity-40 p-2 pr-0 flex justify-between pl-10 items-center text-black font-sans font-semibold xs:w-11/12 xs:mb-2 xs:text-2xl`}>
                           {shortUrl}
                      <i 
                      className={`bx bx-copy  bg-yellow-400  ml-1 cursor-pointer text-2xl text-black bg-opacity-90 px-3 py-2 rounded-full`}
                      onClick={handleCopied}
                      >
                      </i>
                </section>

                <button
                    className="text-sm mt-5 px-5 py-2 rounded-3xl bg-black  font-extralight font-serif text-white  hover:text-yellow-200 hover:border-black shadow-yellow-200 shadow-inner border-b-2 border-yellow-300 xs:text-xl"
                    onClick={shortUrl ? handleCopied : handleClick}
                >
                    {shortUrl ? 'Copy' :'Short URL' }  
                </button>

                
            </div>
        </div>

    )
}