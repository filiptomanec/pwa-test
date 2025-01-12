import React, { useState, useRef, useEffect } from 'react';

const CameraComponent = () => {
    const [isCameraOpen, setIsCameraOpen] = useState(false); // Stav pro otevření/zavření fotoaparátu
    const [photo, setPhoto] = useState(null); // Stav pro uloženou fotografii
    const videoRef = useRef(null); // Ref pro video element
    const canvasRef = useRef(null); // Ref pro canvas element

    // Funkce pro otevření fotoaparátu
    const openCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsCameraOpen(true);
            }
        } catch (error) {
            console.error('Chyba při přístupu k fotoaparátu:', error);
        }
    };

    // Funkce pro pořízení fotky
    const takePhoto = () => {
        const canvas = canvasRef.current;
        if (videoRef.current && canvas) {
            const context = canvas.getContext('2d');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const photoUrl = canvas.toDataURL('image/png');
            setPhoto(photoUrl);
            closeCamera(); // Zavře fotoaparát po pořízení fotky
        }
    };

    // Funkce pro zavření fotoaparátu
    const closeCamera = () => {
        const stream = videoRef.current?.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
        }
        setIsCameraOpen(false);
    };

    useEffect(() => {
        return () => {
            // Uvolnění zdrojů při unmountu
            closeCamera();
        };
    }, []);

    return (
        <div>
            {!isCameraOpen && !photo && (
                <button onClick={openCamera}>Otevřít fotoaparát</button>
            )}

            {isCameraOpen && (
                <div>
                    <video ref={videoRef} autoPlay width="100%" height="auto" />
                    <button onClick={takePhoto}>Pořídit fotku</button>
                    <button onClick={closeCamera}>Zavřít fotoaparát</button>
                </div>
            )}

            {photo && (
                <div>
                    <h3>Vaše fotka:</h3>
                    <img src={photo} alt="Pořízená fotka" width="100%" />
                </div>
            )}

            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default CameraComponent;
