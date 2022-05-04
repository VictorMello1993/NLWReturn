import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenshotButtonProps{
  onScreenshotTook: (screenshot: string | null) => void;
  screenshot: string | null
}

export function ScreenshotButton({screenshot, onScreenshotTook}: ScreenshotButtonProps) {
  const[isTakingScreenshot, setIsTakingScreenshot] = useState(false) 

  async function handleTakeScreenshot(){
    setIsTakingScreenshot(true)

    //Selecionando toda a janela do browser para tirar print
    const canvas = await html2canvas(document.querySelector('html')!)

    //Convertendo para o formato de texto que representa uma imagem png na base 64
    const base64image = canvas.toDataURL('image/png')

    //Armazenando a imagem decodificada para o componente pai FeedbackContentStep
    onScreenshotTook(base64image)

    setIsTakingScreenshot(false)
  }

  // Botão de apagar o print
  if(screenshot){
    return (
      <button
        type="button"
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        onClick={() => onScreenshotTook(null)}
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 180
        }}
      >
        <Trash weight="fill"/>
      </button>
    )
  }

  return (
    <button
      type="button"
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
      onClick={handleTakeScreenshot}
    >
      {isTakingScreenshot ? <Loading/> : <Camera className="w-6 h-6" />}      
    </button>
  )
}