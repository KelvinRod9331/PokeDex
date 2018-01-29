import p5 from "p5";
import "p5/lib/addons/p5.sound";
import "p5/lib/addons/p5.speech";
import React from 'react';




const SpeechRec = () => {


  let lang = navigator.language || 'en-US'
  let speechRec = new p5.SpeechRec(lang)
  speechRec.start() //This is to start the recording will not work without calling this function

  console.log("SpeechObj:", speechRec, "\n", "SpeechSaid:", speechRec.resultString, "\n", "SpeechValue:", speechRec.resultValue)
  if (!speechRec.resultValue) {
    displayInfo = (
      <div>
        <p>Speech:{speechRec.rec.lang}</p>
      </div>
    )
  }

  console.log("SpeechSaid:", showSpeechSaid)
}