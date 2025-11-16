import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import { BookCover, CoverData, TextElement } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import { generateCoverArt } from './services/geminiService';
import { PUBLISHING_TEMPLATES, GENRES, FONTS } from './constants';
import { DownloadIcon, SaveIcon, ShareIcon, SparklesIcon, TrashIcon } from './components/icons';

const App: React.FC = () => {
    const [savedCovers, setSavedCovers] = useLocalStorage<BookCover[]>('savedCovers', []);

    const [title, setTitle] = useState<TextElement>({ text: "The Last Comet", fontFamily: 'font-display', fontSize: 64, color: '#FFFFFF', top: 10, left: 10, width: 80 });
    const [author, setAuthor] = useState<TextElement>({ text: "Jane Doe", fontFamily: 'font-serif', fontSize: 24, color: '#FFFFFF', top: 85, left: 10, width: 80 });
    const [genre, setGenre] = useState<string>(GENRES[0]);
    const [templateKey, setTemplateKey] = useState<string>(Object.keys(PUBLISHING_TEMPLATES)[0]);
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const art = await generateCoverArt(title.text, author.text, genre, PUBLISHING_TEMPLATES[templateKey]);
            setBackgroundImage(art);
        } catch (e) {
            setError(e instanceof Error ? e.message : "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = () => {
        if (!backgroundImage) return;
        const newCover: BookCover = {
            id: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            data: {
                title,
                author,
                genre,
                templateKey,
                backgroundImage,
            },
        };
        setSavedCovers([newCover, ...savedCovers]);
    };
    
    const handleLoadCover = (coverData: CoverData) => {
        setTitle(coverData.title);
        setAuthor(coverData.author);
        setGenre(coverData.genre);
        setTemplateKey(coverData.templateKey);
        setBackgroundImage(coverData.backgroundImage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteCover = (id: string) => {
        setSavedCovers(savedCovers.filter(cover => cover.id !== id));
    };

    const handleDownload = () => {
        if (!backgroundImage) return;
        const template = PUBLISHING_TEMPLATES[templateKey];
        const canvas = document.createElement('canvas');
        canvas.width = template.width;
        canvas.height = template.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const drawText = (element: TextElement) => {
                const fontClass = FONTS.find(f => f.value === element.fontFamily)?.label || 'sans-serif';
                ctx.font = `${element.fontSize}px ${fontClass}`;
                ctx.fillStyle = element.color;
                ctx.textAlign = 'center';
                const x = canvas.width / 2;
                const y = (element.top / 100) * canvas.height + (element.fontSize / 2);
                ctx.fillText(element.text, x, y);
            };

            drawText(title);
            drawText(author);
            
            const link = document.createElement('a');
            link.download = `${title.text.replace(/\s/g, '_')}-cover.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        };
        img.src = backgroundImage;
    };
    
    const handleShare = () => {
        const subject = `Check out this book cover for "${title.text}"!`;
        const body = `I created this book cover using Maan AI Book Cover Generator. Check it out!`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const template = PUBLISHING_TEMPLATES[templateKey];

    const EditorPanel = ({ element, setElement }: { element: TextElement, setElement: React.Dispatch<React.SetStateAction<TextElement>>}) => (
        <div className="space-y-3 p-3 bg-brand-primary/50 rounded-lg">
            <input type="text" value={element.text} onChange={(e) => setElement(p => ({ ...p, text: e.target.value }))} className="w-full bg-brand-accent p-2 rounded focus:outline-none focus:ring-2 focus:ring-brand-highlight" />
            <div className="grid grid-cols-2 gap-2">
                <select value={element.fontFamily} onChange={(e) => setElement(p => ({ ...p, fontFamily: e.target.value }))} className="bg-brand-accent p-2 rounded focus:outline-none focus:ring-2 focus:ring-brand-highlight">
                    {FONTS.map(font => <option key={font.value} value={font.value}>{font.label}</option>)}
                </select>
                <input type="color" value={element.color} onChange={(e) => setElement(p => ({ ...p, color: e.target.value }))} className="w-full h-10 bg-brand-accent p-1 rounded" />
            </div>
            <div className="flex items-center space-x-2">
                <label className="text-sm">Size</label>
                <input type="range" min="12" max="120" value={element.fontSize} onChange={(e) => setElement(p => ({ ...p, fontSize: Number(e.target.value) }))} className="w-full" />
            </div>
            <div className="flex items-center space-x-2">
                <label className="text-sm">Position</label>
                <input type="range" min="0" max="95" value={element.top} onChange={(e) => setElement(p => ({ ...p, top: Number(e.target.value) }))} className="w-full" />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-brand-primary">
            <Header />
            <main className="p-4 md:p-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
                    
                    {/* Left Panel: Controls */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-brand-secondary p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-bold mb-4 font-display text-brand-light">1. Describe Your Book</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-brand-light">Title</label>
                                    <input type="text" value={title.text} onChange={(e) => setTitle(p => ({ ...p, text: e.target.value }))} className="w-full bg-brand-accent p-2 rounded focus:outline-none focus:ring-2 focus:ring-brand-highlight" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-brand-light">Author</label>
                                    <input type="text" value={author.text} onChange={(e) => setAuthor(p => ({ ...p, text: e.target.value }))} className="w-full bg-brand-accent p-2 rounded focus:outline-none focus:ring-2 focus:ring-brand-highlight" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-brand-light">Genre</label>
                                    <select value={genre} onChange={e => setGenre(e.target.value)} className="w-full bg-brand-accent p-2 rounded focus:outline-none focus:ring-2 focus:ring-brand-highlight">
                                        {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-brand-light">Template</label>
                                    <select value={templateKey} onChange={e => setTemplateKey(e.target.value)} className="w-full bg-brand-accent p-2 rounded focus:outline-none focus:ring-2 focus:ring-brand-highlight">
                                        {Object.entries(PUBLISHING_TEMPLATES).map(([key, details]) => <option key={key} value={key}>{details.name}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-brand-secondary p-6 rounded-xl shadow-lg">
                            <button onClick={handleGenerate} disabled={isLoading} className="w-full flex items-center justify-center bg-brand-highlight text-brand-primary font-bold py-3 px-4 rounded-lg hover:bg-opacity-80 transition-all duration-300 disabled:bg-brand-accent disabled:cursor-not-allowed">
                                {isLoading ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                ) : (
                                    <SparklesIcon />
                                )}
                                {isLoading ? 'Generating...' : `Generate Cover Art`}
                            </button>
                            {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
                        </div>

                         <div className="bg-brand-secondary p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-bold mb-4 font-display text-brand-light">2. Edit Text</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold mb-2 text-brand-light">Title Editor</h3>
                                    <EditorPanel element={title} setElement={setTitle} />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2 text-brand-light">Author Editor</h3>
                                    <EditorPanel element={author} setElement={setAuthor} />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Panel: Display */}
                    <div className="lg:col-span-3">
                        <div className="sticky top-8">
                            <div className="bg-brand-secondary p-4 rounded-xl shadow-lg">
                                <div 
                                    className="relative mx-auto bg-brand-primary overflow-hidden" 
                                    style={{ width: `${template.width}px`, height: `${template.height}px`, maxWidth: '100%', maxHeight: `calc(100vw * ${template.height / template.width})`}}
                                >
                                    {isLoading ? (
                                        <div className="absolute inset-0 bg-brand-accent animate-pulse flex items-center justify-center">
                                            <p className="text-brand-light">Generating masterpiece...</p>
                                        </div>
                                    ) : backgroundImage ? (
                                        <img src={backgroundImage} alt="Generated book cover art" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 border-2 border-dashed border-brand-accent flex items-center justify-center">
                                            <p className="text-brand-light text-center p-4">Your generated cover art will appear here.</p>
                                        </div>
                                    )}

                                    <div className={`absolute select-none text-center ${title.fontFamily}`} style={{ top: `${title.top}%`, left: `${title.left}%`, width: `${title.width}%`, color: title.color, fontSize: `${title.fontSize}px` }}>
                                        {title.text}
                                    </div>
                                     <div className={`absolute select-none text-center ${author.fontFamily}`} style={{ top: `${author.top}%`, left: `${author.left}%`, width: `${author.width}%`, color: author.color, fontSize: `${author.fontSize}px` }}>
                                        {author.text}
                                    </div>
                                </div>
                            </div>
                             <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <button onClick={handleSave} disabled={!backgroundImage} className="flex items-center justify-center bg-brand-accent text-brand-text font-bold py-2 px-4 rounded-lg hover:bg-brand-light hover:text-brand-primary transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"><SaveIcon /> Save</button>
                                <button onClick={handleDownload} disabled={!backgroundImage} className="flex items-center justify-center bg-brand-accent text-brand-text font-bold py-2 px-4 rounded-lg hover:bg-brand-light hover:text-brand-primary transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"><DownloadIcon /> Download</button>
                                <button onClick={handleShare} disabled={!backgroundImage} className="flex items-center justify-center bg-brand-accent text-brand-text font-bold py-2 px-4 rounded-lg hover:bg-brand-light hover:text-brand-primary transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"><ShareIcon/> Share</button>
                            </div>
                        </div>
                    </div>
                </div>

                 {/* Saved Covers Section */}
                <div className="max-w-7xl mx-auto mt-16">
                    <h2 className="text-3xl font-bold mb-6 font-display text-center text-brand-light">My Saved Covers</h2>
                    {savedCovers.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {savedCovers.map(cover => {
                                const savedTemplate = PUBLISHING_TEMPLATES[cover.data.templateKey];
                                return (
                                <div key={cover.id} className="group relative aspect-[6/9] bg-brand-secondary rounded-lg overflow-hidden shadow-lg">
                                    <img src={cover.data.backgroundImage} alt={cover.data.title.text} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex flex-col p-2 justify-end">
                                        <h3 className="text-white font-bold text-sm truncate">{cover.data.title.text}</h3>
                                        <p className="text-gray-300 text-xs truncate">{cover.data.author.text}</p>
                                    </div>
                                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center space-y-2 p-4">
                                        <button onClick={() => handleLoadCover(cover.data)} className="w-full bg-brand-highlight text-brand-primary font-semibold text-sm py-2 px-3 rounded hover:bg-opacity-80">Load</button>
                                        <button onClick={() => handleDeleteCover(cover.id)} className="w-full bg-red-500 text-white font-semibold text-sm py-2 px-3 rounded hover:bg-red-600 flex items-center justify-center"><TrashIcon/></button>
                                    </div>
                                </div>
                            )})}
                        </div>
                    ) : (
                        <p className="text-center text-brand-light">You have no saved covers yet. Generate and save a cover to see it here!</p>
                    )}
                </div>

            </main>
        </div>
    );
};

export default App;