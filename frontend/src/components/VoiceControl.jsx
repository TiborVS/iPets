import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceControl = () => {
    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    useEffect(() => {
        if (!browserSupportsSpeechRecognition) {
            alert("Tvoj brskalnik ne podpira glasovnega upravljanja.");
        }
    }, [browserSupportsSpeechRecognition]);

    useEffect(() => {
        if (transcript.includes('domov')) {
            window.location.href = '/';
        }
        if (transcript.includes('dodaj')) {
            window.location.href = '/pets/new';
        }
        if (transcript.includes('hrana')) {
            window.location.href = '/food/all';
        }
        if (transcript.includes('zdravila')) {
            window.location.href = '/medications';
        }
    }, [transcript]);

    return (
        <div style={{ textAlign: 'center'}}>
            <button
                onClick={SpeechRecognition.startListening}
                disabled={listening}
            >
                {listening ? 'Poslušam...' : 'Začni poslušati'}
            </button>

            <p>
                <strong>Rekel si:</strong> {transcript}
            </p>

            <details>
                <summary>Pokaži možne ukaze</summary>
                <div>
                    <p>Reci <strong>"DODAJ"</strong> za dodajanje novega ljubljenčka</p>
                    <p>Reci <strong>"HRANA"</strong> za pregled hrane in prigrizkov</p>
                    <p>Reci <strong>"ZDRAVILA"</strong> za pregled zdravil</p>
                    <p>Reci <strong>"DOMOV"</strong> za vrnitev na prvo stran</p>
                </div>
            </details>
        </div>
    );

};

export default VoiceControl;
