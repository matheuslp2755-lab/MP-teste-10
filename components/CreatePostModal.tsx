
import React, { useState, useRef } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import { SparklesIcon, ImageUploadIcon } from './Icons';

interface CreatePostModalProps {
  onClose: () => void;
  onAddPost: (content: string, image?: string) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose, onAddPost }) => {
  const [content, setContent] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
        setGeneratedImage(null); // User image takes precedence
      };
      reader.readAsDataURL(file);
    }
  };


  const handleGenerate = async () => {
    if (!prompt) {
      setError("Por favor, insira uma ideia para a IA.");
      return;
    }
    setError(null);
    setIsGenerating(true);
    setGeneratedImage(null);
    setUserImage(null);
    setContent('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

      const captionPromise = ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Crie uma legenda criativa e curta para um post em uma rede social sobre "${prompt}". Inclua hashtags relevantes.`,
      });

      const imagePromise = ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: { responseModalities: [Modality.IMAGE] },
      });

      const [captionResponse, imageResponse] = await Promise.all([captionPromise, imagePromise]);
      
      setContent(captionResponse.text);

      const imagePart = imageResponse.candidates?.[0]?.content?.parts?.[0];
      if (imagePart && imagePart.inlineData) {
        const base64Image = imagePart.inlineData.data;
        const imageUrl = `data:${imagePart.inlineData.mimeType};base64,${base64Image}`;
        setGeneratedImage(imageUrl);
      }

    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao gerar o conteúdo. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;
    onAddPost(content, userImage || generatedImage || undefined);
  };
  
  const imageToDisplay = userImage || generatedImage;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Criar Nova Publicação</h2>
             <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 space-y-3">
              <label htmlFor="ai-prompt" className="text-sm font-medium text-indigo-300">
                Gerar com IA
              </label>
              <input
                  id="ai-prompt"
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Descreva sua ideia para uma imagem e legenda..."
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed transition-colors"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Gerando...</span>
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-5 h-5" />
                    <span>Gerar com IA</span>
                  </>
                )}
              </button>
              {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="O que está acontecendo?"
              rows={5}
              className="w-full p-4 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {imageToDisplay && (
              <div className="relative group">
                <img src={imageToDisplay} alt="Post preview" className="w-full h-auto rounded-lg" />
                <button
                  type="button"
                  onClick={() => {setUserImage(null); setGeneratedImage(null);}}
                  className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            )}
            
            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-gray-400 hover:text-indigo-400"
                aria-label="Upload an image"
              >
                  <ImageUploadIcon className="w-6 h-6"/>
              </button>

              <div className="flex space-x-4">
                  <button type="button" onClick={onClose} className="bg-gray-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-gray-500 transition">
                    Cancelar
                  </button>
                  <button type="submit" className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed transition" disabled={!content}>
                    Publicar
                  </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
