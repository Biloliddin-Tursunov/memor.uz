import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { uploadImage } from '../lib/supabase';

interface ImageUploaderProps {
    currentImage?: string;
    onImageUploaded: (url: string) => void;
    bucket?: string;
    label?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ currentImage, onImageUploaded, bucket = 'images', label = "Muqova rasmi" }) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const file = e.target.files[0];
        setUploading(true);
        setError(null);

        try {
            const publicUrl = await uploadImage(file, bucket);
            onImageUploaded(publicUrl);
        } catch (err: any) {
            console.error('Upload failed:', err);
            setError(err.message || 'Yuklashda xatolik yuz berdi');
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onImageUploaded('');
    };

    return (
        <div className="w-full">
            <label className="block text-sepia mb-2 font-cinzel text-sm">{label}</label>

            <div className={`relative border-2 border-dashed border-sepia/30 rounded-lg p-6 flex flex-col items-center justify-center transition-all hover:bg-sepia/5 ${currentImage ? 'border-solid border-sepia/50 p-2' : ''}`}>

                {currentImage ? (
                    <div className="relative w-full aspect-video rounded overflow-hidden group">
                        <img src={currentImage} alt="Uploaded" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                onClick={handleRemove}
                                className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
                                title="O'chirib tashlash"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <label className="cursor-pointer flex flex-col items-center w-full h-full justify-center py-6">
                        <div className={`p-4 rounded-full bg-sepia/10 mb-3 ${uploading ? 'animate-pulse' : ''}`}>
                            <Upload className="text-sepia" size={24} />
                        </div>
                        <span className="text-sepia text-sm font-serif">
                            {uploading ? 'Yuklanmoqda...' : 'Rasm yuklash uchun bosing'}
                        </span>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={uploading}
                        />
                    </label>
                )}

            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default ImageUploader;
