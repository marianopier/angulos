
import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import Spinner from './components/Spinner';
import { generateImageAngle } from './services/geminiService';
import { CAMERA_ANGLES } from './constants';
import { GeneratedImage } from './types';
import { ErrorIcon } from './components/Icons';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<{ url: string; file: File } | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (base64: string, file: File) => {
    setOriginalImage({ url: base64, file });
    setIsLoading(true);
    setError(null);

    // Set up placeholders
    const placeholders = CAMERA_ANGLES.map(angle => ({
        id: angle.id,
        label: angle.label,
        src: null,
    }));
    setGeneratedImages(placeholders);

    const generationPromises = CAMERA_ANGLES.map(angle =>
      generateImageAngle(base64, file.type, angle.prompt)
        .then(src => ({ ...angle, src, error: false }))
        .catch(() => ({ ...angle, src: null, error: true }))
    );

    const results = await Promise.all(generationPromises);

    setGeneratedImages(results);
    setIsLoading(false);
  }, []);
  
  const handleReset = () => {
    setOriginalImage(null);
    setGeneratedImages([]);
    setError(null);
    setIsLoading(false);
  };


  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            Generador de Ángulos de Cámara
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            Sube una imagen y nuestra IA generará automáticamente 5 perspectivas de cámara diferentes para una cobertura visual completa.
          </p>
        </header>

        {error && (
            <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative max-w-3xl mx-auto mb-6" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}

        {!originalImage ? (
            <ImageUploader onImageUpload={handleImageUpload} isLoading={isLoading} />
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 flex flex-col items-center">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-300">Imagen Original</h2>
                    <div className="aspect-square w-full max-w-sm lg:max-w-none bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700">
                        <img src={originalImage.url} alt="Original" className="w-full h-full object-cover" />
                    </div>
                    <button 
                        onClick={handleReset}
                        className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Generando...' : 'Empezar de Nuevo'}
                    </button>
                </div>

                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-semibold mb-4 text-center lg:text-left text-gray-300">Ángulos Generados</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {generatedImages.map(({ id, label, src, error: genError }) => (
                            <div key={id} className="flex flex-col items-center">
                                <div className="aspect-square w-full bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 flex items-center justify-center">
                                    {isLoading && !src ? (
                                        <Spinner className="w-10 h-10 text-indigo-400" />
                                    ) : genError ? (
                                        <div className="text-center p-4 text-red-400">
                                            <ErrorIcon className="w-10 h-10 mx-auto mb-2" />
                                            <p className="text-xs">Fallo al generar</p>
                                        </div>
                                    ) : src ? (
                                        <img src={src} alt={`Generated - ${label}`} className="w-full h-full object-cover" />
                                    ) : (
                                       <Spinner className="w-10 h-10 text-indigo-400" />
                                    )}
                                </div>
                                <h3 className="mt-2 text-md font-medium text-gray-400">{label}</h3>
                            </div>
                        ))}
                         {/* Placeholder for the 6th grid item to balance layout */}
                         <div className="hidden sm:block xl:hidden aspect-square w-full"></div>
                    </div>
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

export default App;
