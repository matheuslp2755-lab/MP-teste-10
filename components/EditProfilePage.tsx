import React from 'react';
import { ChevronLeftIcon } from './Icons';

interface EditProfilePageProps {
    onBack: () => void;
}

const EditProfilePage: React.FC<EditProfilePageProps> = ({ onBack }) => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // In a real app, you would handle the form submission here.
      // For this simulation, we'll just navigate back.
      onBack();
    };

    return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center mb-6">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-700 transition mr-4">
                        <ChevronLeftIcon className="w-6 h-6 text-white" />
                    </button>
                    <h1 className="text-3xl font-bold text-white">Editar Perfil</h1>
                </div>

                <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="text-sm font-medium text-gray-300" htmlFor="edit-name">Nome</label>
                            <input
                                id="edit-name"
                                type="text"
                                defaultValue="Seu Nome"
                                className="mt-2 w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-300" htmlFor="edit-bio">Bio</label>
                            <textarea
                                id="edit-bio"
                                rows={4}
                                defaultValue="Esta é uma bio de exemplo. Fale um pouco sobre você, seus hobbies e interesses."
                                className="mt-2 w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button type="button" onClick={onBack} className="bg-gray-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-gray-500 transition">
                                Cancelar
                            </button>
                            <button type="submit" className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-indigo-500 transition">
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default EditProfilePage;
