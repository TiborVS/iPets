import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { voiceControlStyles, buttonStyles } from "../utils/Theme.js";
import '../styles/VoiceControl.css';

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
        <div style={voiceControlStyles.container}>
            <button
                onClick={() => {SpeechRecognition.startListening({language: 'sl'})}}
                disabled={listening}
                style={{
                    ...voiceControlStyles.button,
                    ...(listening ? buttonStyles.disabledButton : {})
                }}
            >
                {listening ? 'Poslušam...' : 'Začni poslušati'}
            </button>

            <div>
                <strong>Rekel si:</strong> {transcript}
            </div>

            <details style={voiceControlStyles.details}>
                <summary style={voiceControlStyles.summary}>Pokaži možne ukaze</summary>
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
